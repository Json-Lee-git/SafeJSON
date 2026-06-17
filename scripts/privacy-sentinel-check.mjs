import { chromium } from "playwright";

const origin = process.env.SAFEJSON_ORIGIN || "https://www.safejson.dev";
const sentinel = "SAFEJSON_SENTINEL_SHOULD_NOT_LEAVE_BROWSER_7C";

const canonicalRoutes = [
  ["/diff", "/json-diff"],
  ["/jwt", "/jwt-decoder"],
  ["/schema", "/json-schema-validator"],
  ["/jsonpath", "/jsonpath-query"],
];

function makeJwt(marker) {
  const encode = (value) => Buffer.from(JSON.stringify(value)).toString("base64url");
  return [
    encode({ alg: "HS256", typ: "JWT" }),
    encode({ sub: "sentinel-user", marker, role: "test", exp: 1893456000 }),
    "signature",
  ].join(".");
}

async function installSentinelHooks(context) {
  await context.addInitScript((marker) => {
    window.__safejsonLeaks = [];

    const leak = (channel, value) => {
      const text =
        typeof value === "string"
          ? value
          : value === undefined || value === null
            ? ""
            : (() => {
                try {
                  return JSON.stringify(value);
                } catch {
                  return String(value);
                }
              })();
      if (text.includes(marker)) {
        window.__safejsonLeaks.push({ channel, sample: text.slice(0, 240) });
      }
    };

    const originalFetch = window.fetch;
    window.fetch = (...args) => {
      leak("fetch.url", args[0]);
      leak("fetch.init", args[1]);
      return originalFetch(...args);
    };

    const originalOpen = XMLHttpRequest.prototype.open;
    const originalSend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.open = function patchedOpen(method, url, ...rest) {
      this.__safejsonUrl = String(url);
      leak("xhr.url", url);
      return originalOpen.call(this, method, url, ...rest);
    };
    XMLHttpRequest.prototype.send = function patchedSend(body) {
      leak("xhr.body", body);
      return originalSend.call(this, body);
    };

    if (navigator.sendBeacon) {
      const originalBeacon = navigator.sendBeacon.bind(navigator);
      navigator.sendBeacon = (url, data) => {
        leak("sendBeacon.url", url);
        leak("sendBeacon.data", data);
        return originalBeacon(url, data);
      };
    }

    const NativeWebSocket = window.WebSocket;
    window.WebSocket = new Proxy(NativeWebSocket, {
      construct(target, args) {
        leak("websocket.url", args[0]);
        const socket = Reflect.construct(target, args);
        const originalSendSocket = socket.send.bind(socket);
        socket.send = (data) => {
          leak("websocket.message", data);
          return originalSendSocket(data);
        };
        return socket;
      },
    });

    for (const [storageName, storage] of [
      ["localStorage", window.localStorage],
      ["sessionStorage", window.sessionStorage],
    ]) {
      const originalSetItem = storage.setItem.bind(storage);
      storage.setItem = (key, value) => {
        leak(`${storageName}.key`, key);
        leak(`${storageName}.value`, value);
        return originalSetItem(key, value);
      };
    }

    const originalConsoleError = console.error.bind(console);
    console.error = (...args) => {
      leak("console.error", args);
      return originalConsoleError(...args);
    };

    for (const method of ["pushState", "replaceState"]) {
      const original = history[method].bind(history);
      history[method] = (...args) => {
        leak(`history.${method}`, args);
        return original(...args);
      };
    }
  }, sentinel);
}

async function setValue(locator, value) {
  await locator.evaluate((node, text) => {
    node.value = text;
    node.dispatchEvent(new Event("input", { bubbles: true }));
  }, value);
}

async function assertNoLeaks(page, networkLeaks, label) {
  await page.waitForTimeout(900);
  const browserLeaks = await page.evaluate((marker) => {
    const urlLeak = window.location.href.includes(marker)
      ? [{ channel: "location.href", sample: window.location.href }]
      : [];
    return [...(window.__safejsonLeaks || []), ...urlLeak];
  }, sentinel);

  const leaks = [...networkLeaks, ...browserLeaks];
  if (leaks.length > 0) {
    throw new Error(`${label} leaked sentinel: ${JSON.stringify(leaks, null, 2)}`);
  }
}

async function openPage(context, path) {
  const page = await context.newPage();
  const networkLeaks = [];
  page.on("request", (request) => {
    const postData = request.postData() || "";
    if (request.url().includes(sentinel) || postData.includes(sentinel)) {
      networkLeaks.push({
        channel: "network.request",
        method: request.method(),
        url: request.url(),
      });
    }
  });
  await page.goto(`${origin}${path}`, { waitUntil: "networkidle", timeout: 45_000 });
  return { page, networkLeaks };
}

async function checkRedirects(context) {
  for (const [from, to] of canonicalRoutes) {
    const page = await context.newPage();
    await page.goto(`${origin}${from}`, { waitUntil: "domcontentloaded", timeout: 45_000 });
    const finalPath = new URL(page.url()).pathname;
    await page.close();
    if (finalPath !== to) {
      throw new Error(`${from} should redirect to ${to}, got ${finalPath}`);
    }

    const canonicalPage = await context.newPage();
    await canonicalPage.goto(`${origin}${to}`, {
      waitUntil: "domcontentloaded",
      timeout: 45_000,
    });
    const canonical = await canonicalPage
      .locator('link[rel="canonical"]')
      .first()
      .getAttribute("href");
    await canonicalPage.close();
    if (!canonical || new URL(canonical, origin).pathname !== to) {
      throw new Error(`${to} canonical should point to itself, got ${canonical}`);
    }
  }
}

async function checkDevUnlockDisabled(context) {
  const { page } = await openPage(context, "/json-diff?dev=1");
  const devValue = await page.evaluate(() => window.localStorage.getItem("safejson_dev"));
  const unlocked = await page.getByText(/Pro unlocked in this browser/i).count();
  await page.close();
  if (devValue === "1" || unlocked > 0) {
    throw new Error("?dev unlocked Pro outside development mode");
  }
}

async function checkFormatter(context) {
  const { page, networkLeaks } = await openPage(context, "/");
  await setValue(
    page.locator("textarea").first(),
    JSON.stringify({ tool: "formatter", sentinel, nested: { ok: true } }, null, 2),
  );
  await page.keyboard.press("Control+Enter");
  await assertNoLeaks(page, networkLeaks, "formatter");
  await page.close();
}

async function checkDiff(context) {
  const { page, networkLeaks } = await openPage(context, "/json-diff");
  await setValue(
    page.locator("textarea").nth(0),
    JSON.stringify({ version: 1, sentinel, status: "old" }, null, 2),
  );
  await setValue(
    page.locator("textarea").nth(1),
    JSON.stringify({ version: 2, sentinel, status: "new", added: true }, null, 2),
  );
  await page.getByRole("button", { name: /^Compare$/i }).click();
  await assertNoLeaks(page, networkLeaks, "diff");
  await page.close();
}

async function checkJwt(context) {
  const { page, networkLeaks } = await openPage(context, "/jwt-decoder");
  await setValue(page.locator("textarea").first(), makeJwt(sentinel));
  await page.getByRole("button", { name: /^Decode$/i }).click();
  await assertNoLeaks(page, networkLeaks, "jwt");
  await page.close();
}

async function checkJsonPath(context) {
  const { page, networkLeaks } = await openPage(context, "/jsonpath-query");
  await setValue(
    page.locator("textarea").first(),
    JSON.stringify({ records: [{ id: 1, sentinel }, { id: 2, value: "ok" }] }, null, 2),
  );
  await page.locator("input").first().fill("$.records[*].sentinel");
  await page.getByRole("button", { name: /^Query$/i }).click();
  await assertNoLeaks(page, networkLeaks, "jsonpath");
  await page.close();
}

async function checkSchema(context) {
  const { page, networkLeaks } = await openPage(context, "/json-schema-validator");
  await setValue(
    page.locator("textarea").nth(0),
    JSON.stringify({ name: "SafeJSON", sentinel }, null, 2),
  );
  await setValue(
    page.locator("textarea").nth(1),
    JSON.stringify(
      {
        type: "object",
        required: ["name", "sentinel"],
        properties: { name: { type: "string" }, sentinel: { type: "string" } },
      },
      null,
      2,
    ),
  );
  await page.getByRole("button", { name: /^Validate$/i }).click();
  await assertNoLeaks(page, networkLeaks, "schema");
  await page.close();
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  await installSentinelHooks(context);

  const checks = [
    ["canonical redirects", () => checkRedirects(context)],
    ["production dev unlock disabled", () => checkDevUnlockDisabled(context)],
    ["formatter sentinel", () => checkFormatter(context)],
    ["diff sentinel", () => checkDiff(context)],
    ["jwt sentinel", () => checkJwt(context)],
    ["jsonpath sentinel", () => checkJsonPath(context)],
    ["schema sentinel", () => checkSchema(context)],
  ];

  const failures = [];
  for (const [name, run] of checks) {
    try {
      await run();
      console.log(`PASS ${name}`);
    } catch (error) {
      failures.push(`${name}: ${error instanceof Error ? error.message : String(error)}`);
      console.error(`FAIL ${name}`);
      console.error(`  ${failures.at(-1)}`);
    }
  }

  await browser.close();

  if (failures.length > 0) {
    console.error(`Privacy sentinel check failed: ${failures.length}/${checks.length}`);
    process.exit(1);
  }

  console.log(`Privacy sentinel check passed: ${checks.length}/${checks.length}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
