import { chromium } from "playwright";

const origin = process.env.SAFEJSON_ORIGIN ?? "https://www.safejson.dev";

const pagePaths = [
  "/",
  "/pricing",
  "/answers",
  "/formatter",
  "/json-diff",
  "/jwt-decoder",
  "/jsonpath-query",
  "/json-schema-validator",
  "/privacy/verify-local-processing",
  "/llms.txt",
  "/llms-full.txt",
  "/.well-known/security.txt",
];

function isHtmlPath(path) {
  return !path.endsWith(".txt");
}

function isInterestingRuntimeRequest(request) {
  const url = new URL(request.url());
  const pathname = url.pathname;
  const method = request.method();

  if (method === "GET" || method === "HEAD") return false;

  if (pathname.startsWith("/_next/")) return false;
  if (pathname === "/favicon.ico") return false;
  if (pathname.includes(".")) return false;
  if (url.hostname.includes("google-analytics.com")) return false;
  if (url.hostname.includes("googletagmanager.com")) return false;

  return true;
}

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext();

const results = [];
const failures = [];

for (const path of pagePaths) {
  const page = await context.newPage();
  const response = await page.goto(`${origin}${path}`, {
    waitUntil: "domcontentloaded",
    timeout: 30_000,
  });

  const status = response?.status() ?? 0;
  let title = "";
  let ldJson = 0;

  if (isHtmlPath(path)) {
    title = await page.title();
    ldJson = await page.locator('script[type="application/ld+json"]').count();
  }

  const result = { path, status, title, ldJson };
  results.push(result);

  if (status < 200 || status >= 400) {
    failures.push(`${path} returned ${status}`);
  }

  if (isHtmlPath(path) && !title) {
    failures.push(`${path} has an empty title`);
  }

  await page.close();
}

const formatterPage = await context.newPage();
await formatterPage.goto(`${origin}/formatter`, {
  waitUntil: "networkidle",
  timeout: 30_000,
});

const runtimeRequests = [];
formatterPage.on("request", (request) => {
  if (isInterestingRuntimeRequest(request)) {
    runtimeRequests.push({
      method: request.method(),
      url: request.url(),
    });
  }
});

const textareaCount = await formatterPage.locator("textarea").count();
if (textareaCount === 0) {
  failures.push("/formatter has no textarea");
} else {
  await formatterPage
    .locator("textarea")
    .first()
    .fill('{"safe":true,"items":[1,2,3]}');

  const formatButtons = formatterPage.getByRole("button", {
    name: /format|beautify|validate/i,
  });

  if ((await formatButtons.count()) > 0) {
    await formatButtons.first().click();
  }

  await formatterPage.waitForTimeout(1_000);
}

if (runtimeRequests.length > 0) {
  failures.push(
    `/formatter triggered data upload requests after local JSON input: ${runtimeRequests
      .map((request) => `${request.method} ${request.url}`)
      .join(", ")}`,
  );
}

await formatterPage.close();
await browser.close();

console.log(
  JSON.stringify(
    {
      origin,
      pages: results,
      formatter: {
        textareaCount,
        runtimeRequestsAfterInput: runtimeRequests,
      },
    },
    null,
    2,
  ),
);

if (failures.length > 0) {
  console.error(`Playwright production check failed:\n- ${failures.join("\n- ")}`);
  process.exit(1);
}

console.log("Playwright production check passed");
