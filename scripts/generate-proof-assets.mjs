import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const origin = process.env.SAFEJSON_ORIGIN || "https://www.safejson.dev";
const outDir = path.join(process.cwd(), "growth", "assets", "proof-assets");

const proStorage = {
  safejson_dev: "1",
  safejson_pro_unlocked: "1",
  safejson_pro_license_key: "demo-proof-license",
  safejson_pro_instance_id: "demo-proof-instance",
  safejson_pro_instance_name: "SafeJSON Proof Browser",
  safejson_pro_license_status: "active",
  safejson_pro_last_validated: String(Date.now()),
};

function htmlEscape(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function dataUrl(buffer) {
  return `data:image/png;base64,${buffer.toString("base64")}`;
}

function truncate(value, length = 84) {
  if (!value) return "";
  return value.length > length ? `${value.slice(0, length - 1)}...` : value;
}

function isStaticRequest(url) {
  try {
    const parsed = new URL(url);
    if (parsed.pathname.startsWith("/_next/")) return true;
    if (parsed.pathname.includes(".")) return true;
    return false;
  } catch {
    return false;
  }
}

function requestRows(requests, marker) {
  const rows = requests
    .filter((request) => !isStaticRequest(request.url))
    .slice(-8)
    .map((request) => {
      const contains =
        request.url.includes(marker) || (request.postData || "").includes(marker);
      return `<tr>
        <td>${htmlEscape(request.method)}</td>
        <td>${htmlEscape(truncate(request.url, 96))}</td>
        <td class="${contains ? "bad" : "ok"}">${contains ? "contains pasted data" : "clean"}</td>
      </tr>`;
    })
    .join("");

  return rows || `<tr><td colspan="3">No non-static requests after the action.</td></tr>`;
}

async function renderHtmlToPng(browser, html, outputPath, width, height) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: "load" });
  await page.screenshot({ path: outputPath, fullPage: false });
  await page.close();
}

async function withPage(context, pathName) {
  const page = await context.newPage();
  await page.addInitScript((storage) => {
    for (const [key, value] of Object.entries(storage)) {
      window.localStorage.setItem(key, value);
    }
  }, proStorage);
  await page.goto(`${origin}${pathName}`, { waitUntil: "networkidle", timeout: 45_000 });
  return page;
}

async function captureProof(browser, context, config) {
  const page = await withPage(context, config.pathName);
  const requests = [];

  page.on("request", (request) => {
    requests.push({
      method: request.method(),
      url: request.url(),
      postData: request.postData() || "",
    });
  });

  await config.perform(page);
  await page.waitForTimeout(config.waitMs || 1200);

  const containsPastedContent = requests.some(
    (request) =>
      request.url.includes(config.marker) ||
      (request.postData || "").includes(config.marker),
  );

  const appShot = await page.screenshot({ fullPage: false });
  await page.close();

  const outputPath = path.join(outDir, config.outputName);
  const rows = requestRows(requests, config.marker);
  const statusText = containsPastedContent
    ? "A request contained the test marker"
    : config.cleanMessage;
  const statusClass = containsPastedContent ? "bad" : "ok";

  await renderHtmlToPng(
    browser,
    `<!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          * { box-sizing: border-box; }
          body {
            margin: 0;
            width: 1600px;
            height: 1000px;
            background: #09090b;
            color: #e4e4e7;
            font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          }
          .wrap { display: grid; grid-template-columns: 1030px 1fr; gap: 26px; padding: 36px; height: 100%; }
          .screen {
            border: 1px solid #27272a;
            border-radius: 18px;
            overflow: hidden;
            background: #18181b;
            box-shadow: 0 24px 80px rgba(0, 0, 0, .42);
          }
          .screen img { display: block; width: 100%; height: 100%; object-fit: cover; object-position: top left; }
          .panel {
            border: 1px solid #27272a;
            border-radius: 18px;
            background: linear-gradient(180deg, rgba(24,24,27,.94), rgba(9,9,11,.94));
            padding: 28px;
            display: flex;
            flex-direction: column;
            gap: 18px;
          }
          .brand { color: #34d399; font-weight: 800; letter-spacing: .02em; }
          h1 { margin: 0; font-size: 38px; line-height: 1.06; letter-spacing: -.025em; }
          p { margin: 0; color: #a1a1aa; font-size: 18px; line-height: 1.45; }
          .badge {
            display: inline-flex;
            width: fit-content;
            align-items: center;
            gap: 10px;
            border: 1px solid rgba(52, 211, 153, .25);
            background: rgba(52, 211, 153, .1);
            color: #6ee7b7;
            padding: 10px 12px;
            border-radius: 999px;
            font-size: 14px;
            font-weight: 700;
          }
          .dot { width: 8px; height: 8px; border-radius: 999px; background: #34d399; box-shadow: 0 0 22px #34d399; }
          .metric { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
          .box { border: 1px solid #27272a; border-radius: 12px; padding: 14px; background: rgba(39,39,42,.4); }
          .label { color: #71717a; text-transform: uppercase; font-size: 11px; font-weight: 800; letter-spacing: .12em; }
          .value { margin-top: 6px; color: #f4f4f5; font-size: 22px; font-weight: 800; }
          table { width: 100%; border-collapse: collapse; font-size: 12px; color: #d4d4d8; overflow: hidden; border-radius: 12px; }
          td, th { border-bottom: 1px solid #27272a; padding: 8px 6px; text-align: left; vertical-align: top; }
          th { color: #71717a; font-size: 11px; text-transform: uppercase; letter-spacing: .08em; }
          .ok { color: #34d399; }
          .bad { color: #f87171; }
          .foot { margin-top: auto; color: #71717a; font-size: 13px; }
        </style>
      </head>
      <body>
        <div class="wrap">
          <div class="screen"><img src="${dataUrl(appShot)}" /></div>
          <div class="panel">
            <div class="brand">{SafeJSON}</div>
            <h1>${htmlEscape(config.title)}</h1>
            <p>${htmlEscape(config.description)}</p>
            <div class="badge"><span class="dot"></span><span class="${statusClass}">${htmlEscape(statusText)}</span></div>
            <div class="metric">
              <div class="box"><div class="label">Requests after action</div><div class="value">${requests.length}</div></div>
              <div class="box"><div class="label">Pasted marker found</div><div class="value ${statusClass}">${containsPastedContent ? "Yes" : "No"}</div></div>
            </div>
            <table>
              <thead><tr><th>Method</th><th>URL</th><th>Check</th></tr></thead>
              <tbody>${rows}</tbody>
            </table>
            <div class="foot">${htmlEscape(origin + config.pathName)} · generated ${new Date().toISOString().slice(0, 10)}</div>
          </div>
        </div>
      </body>
    </html>`,
    outputPath,
    1600,
    1000,
  );

  return {
    output: outputPath,
    path: `${origin}${config.pathName}`,
    requestCount: requests.length,
    containsPastedContent,
  };
}

async function makeSocialPreview(browser) {
  const outputPath = path.join(outDir, "github-social-preview.png");
  await renderHtmlToPng(
    browser,
    `<!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          * { box-sizing: border-box; }
          body {
            margin: 0;
            width: 1280px;
            height: 640px;
            background:
              radial-gradient(circle at 78% 18%, rgba(52, 211, 153, .22), transparent 28%),
              linear-gradient(135deg, #09090b 0%, #111827 58%, #09090b 100%);
            color: #f4f4f5;
            font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            overflow: hidden;
          }
          .grid {
            position: absolute;
            inset: 0;
            background-image:
              linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px);
            background-size: 36px 36px;
            mask-image: linear-gradient(to bottom, rgba(0,0,0,.8), transparent);
          }
          .wrap { position: relative; display: grid; grid-template-columns: 1fr 420px; height: 100%; padding: 72px 78px; gap: 54px; }
          .logo { color: #34d399; font-weight: 900; font-size: 30px; letter-spacing: -.02em; }
          h1 { margin: 64px 0 0; font-size: 76px; line-height: .98; letter-spacing: -.06em; max-width: 700px; }
          .accent { color: #34d399; }
          p { margin: 28px 0 0; color: #d4d4d8; font-size: 28px; line-height: 1.25; max-width: 780px; }
          .panel {
            align-self: center;
            height: 420px;
            border: 1px solid rgba(52, 211, 153, .22);
            border-radius: 28px;
            background: rgba(9, 9, 11, .84);
            box-shadow: 0 34px 110px rgba(0,0,0,.48);
            padding: 28px;
          }
          .bar { display: flex; gap: 8px; margin-bottom: 22px; }
          .bar span { width: 12px; height: 12px; border-radius: 999px; background: #3f3f46; }
          .line { height: 16px; margin: 15px 0; border-radius: 999px; background: #27272a; }
          .line.good { width: 76%; background: rgba(52, 211, 153, .75); }
          .line.short { width: 52%; }
          .json {
            margin-top: 28px;
            color: #a7f3d0;
            font-family: "SFMono-Regular", Consolas, monospace;
            font-size: 24px;
            line-height: 1.45;
          }
          .badge {
            position: absolute;
            left: 78px;
            bottom: 66px;
            color: #6ee7b7;
            border: 1px solid rgba(52, 211, 153, .25);
            background: rgba(52, 211, 153, .1);
            border-radius: 999px;
            padding: 12px 18px;
            font-size: 18px;
            font-weight: 800;
          }
        </style>
      </head>
      <body>
        <div class="grid"></div>
        <div class="wrap">
          <main>
            <div class="logo">{SafeJSON}</div>
            <h1>Verify pasted-content <span class="accent">privacy</span> in DevTools</h1>
            <p>JSON formatter, diff, JWT decoder, JSONPath, and schema validator. Client-side by design.</p>
            <div class="badge">No request contains pasted content</div>
          </main>
          <aside class="panel">
            <div class="bar"><span></span><span></span><span></span></div>
            <div class="line good"></div>
            <div class="line"></div>
            <div class="line short"></div>
            <pre class="json">{
  "network": "clean",
  "upload": false,
  "verify": "DevTools"
}</pre>
          </aside>
        </div>
      </body>
    </html>`,
    outputPath,
    1280,
    640,
  );
  return outputPath;
}

function makeJwt(marker) {
  const encode = (value) =>
    Buffer.from(JSON.stringify(value))
      .toString("base64url");
  return [
    encode({ alg: "HS256", typ: "JWT" }),
    encode({
      sub: "safejson-proof-user",
      email: "proof@example.com",
      role: "admin",
      marker,
      exp: 1893456000,
      iat: 1781178160,
    }),
    "demo_signature_only",
  ].join(".");
}

async function setTextarea(page, index, value) {
  await page.locator("textarea").nth(index).evaluate((node, text) => {
    node.value = text;
    node.dispatchEvent(new Event("input", { bubbles: true }));
  }, value);
}

async function main() {
  await fs.mkdir(outDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1365, height: 900 },
    deviceScaleFactor: 1,
  });

  const socialPreview = await makeSocialPreview(browser);

  const formatterMarker = "SAFEJSON_PROOF_FORMATTER_2026_06_15";
  const formatter = await captureProof(browser, context, {
    pathName: "/",
    marker: formatterMarker,
    outputName: "devtools-network-verification.png",
    title: "DevTools Network verification",
    description:
      "Paste JSON and format it. The browser request log is checked for the exact test marker.",
    cleanMessage: "No request contains pasted JSON",
    perform: async (page) => {
      await setTextarea(
        page,
        0,
        JSON.stringify(
          {
            product: "SafeJSON",
            proof: formatterMarker,
            secret_like_value: "do-not-upload-demo",
            nested: { enabled: true, count: 3 },
          },
          null,
          2,
        ),
      );
      await page.keyboard.press("Control+Enter");
    },
  });

  const diffMarker = "SAFEJSON_PROOF_DIFF_2026_06_15";
  const diff = await captureProof(browser, context, {
    pathName: "/diff?dev=1",
    marker: diffMarker,
    outputName: "json-diff-no-upload-proof.png",
    title: "JSON Diff local comparison",
    description:
      "Two objects are compared side by side. The request log is checked for the pasted marker.",
    cleanMessage: "No request contains diff input",
    perform: async (page) => {
      await setTextarea(
        page,
        0,
        JSON.stringify({ id: 1, feature: "diff", marker: diffMarker, plan: "free" }, null, 2),
      );
      await setTextarea(
        page,
        1,
        JSON.stringify(
          { id: 1, feature: "diff", marker: diffMarker, plan: "pro", added: true },
          null,
          2,
        ),
      );
      await page.getByRole("button", { name: /^Compare$/i }).click();
    },
  });

  const jwtMarker = "SAFEJSON_PROOF_JWT_2026_06_15";
  const jwt = await captureProof(browser, context, {
    pathName: "/jwt?dev=1",
    marker: jwtMarker,
    outputName: "jwt-decoder-no-upload-proof.png",
    title: "JWT Decoder local decoding",
    description:
      "A demo JWT containing a unique marker is decoded in the browser. Requests are checked for the token marker.",
    cleanMessage: "No request contains the JWT marker",
    perform: async (page) => {
      await setTextarea(page, 0, makeJwt(jwtMarker));
      await page.getByRole("button", { name: /^Decode$/i }).click();
    },
  });

  const largeMarker = "SAFEJSON_PROOF_LARGE_LOCAL_2026_06_15";
  const largePayload = {
    product: "SafeJSON",
    marker: largeMarker,
    note: "Generated locally for proof asset. Real production file content is not used.",
    records: Array.from({ length: 30_000 }, (_, index) => ({
      id: index,
      service: "api",
      status: index % 7 === 0 ? "changed" : "ok",
      message: `local-processing-row-${index}-${largeMarker}`,
      metadata: {
        region: "local",
        latency: index % 120,
        flags: ["formatter", "worker", "no-pasted-content-upload"],
      },
    })),
  };
  const largeText = JSON.stringify(largePayload);
  const large = await captureProof(browser, context, {
    pathName: "/",
    marker: largeMarker,
    outputName: "large-file-local-processing-proof.png",
    title: "Large JSON processed locally",
    description: `Generated ${(Buffer.byteLength(largeText) / 1024 / 1024).toFixed(1)} MB JSON sample. The request log is checked for the marker after formatting.`,
    cleanMessage: "No request contains large JSON content",
    waitMs: 3500,
    perform: async (page) => {
      await setTextarea(page, 0, largeText);
      await page.keyboard.press("Control+Enter");
    },
  });

  await browser.close();

  const manifest = {
    generatedAt: new Date().toISOString(),
    origin,
    assets: {
      socialPreview,
      formatter,
      diff,
      jwt,
      large,
    },
  };

  const manifestPath = path.join(outDir, "proof-assets-manifest.json");
  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(JSON.stringify(manifest, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
