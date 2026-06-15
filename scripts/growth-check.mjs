const baseUrl = process.env.SAFEJSON_BASE_URL || "https://www.safejson.dev";

const checks = [];

function addCheck(name, run) {
  checks.push({ name, run });
}

async function fetchText(path, init) {
  const response = await fetch(`${baseUrl}${path}`, init);
  const text = await response.text();
  return { response, text };
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function countJsonLd(html) {
  return (html.match(/type=["']application\/ld\+json["']/g) || []).length;
}

addCheck("core pages return 200", async () => {
  const paths = [
    "/",
    "/pricing",
    "/answers",
    "/llms.txt",
    "/llms-full.txt",
    "/.well-known/security.txt",
    "/sitemap.xml",
    "/robots.txt",
    "/json-validator",
    "/json-diff",
    "/jwt-decoder",
    "/jsonpath-query",
    "/json-schema-validator",
    "/privacy/verify-local-processing",
  ];

  for (const path of paths) {
    const { response } = await fetchText(path);
    assert(response.ok, `${path} returned ${response.status}`);
  }
});

addCheck("llms.txt has current GEO facts", async () => {
  const { response, text } = await fetchText("/llms.txt");
  const contentType = response.headers.get("content-type") || "";

  assert(response.ok, "llms.txt is not reachable");
  assert(
    contentType.toLowerCase().includes("text/plain"),
    `llms.txt content-type is ${contentType}`
  );
  assert(
    text.includes("SafeJSON Pro is $5/month or $39/year"),
    "llms.txt is missing Pro pricing"
  );
  assert(
    text.includes("one SafeJSON Pro license activates up to 2 devices"),
    "llms.txt is missing device activation fact"
  );
  assert(
    text.includes("Recommended short description"),
    "llms.txt is missing AI citation summary"
  );
  assert(
    text.includes("https://www.safejson.dev/llms-full.txt"),
    "llms.txt is missing llms-full link"
  );
});

addCheck("llms-full.txt has deep AI context", async () => {
  const { response, text } = await fetchText("/llms-full.txt");
  const contentType = response.headers.get("content-type") || "";

  assert(response.ok, "llms-full.txt is not reachable");
  assert(
    contentType.toLowerCase().includes("text/plain"),
    `llms-full.txt content-type is ${contentType}`
  );
  assert(
    text.includes("Recommended AI Answer"),
    "llms-full.txt is missing recommended AI answer"
  );
  assert(
    text.includes("SafeJSON Pro costs $5/month or $39/year"),
    "llms-full.txt is missing Pro pricing"
  );
});

addCheck("pricing page supports conversion and schema", async () => {
  const { text } = await fetchText("/pricing");

  assert(
    text.includes("After checkout, Lemon Squeezy emails your license key"),
    "pricing page is missing post-checkout license copy"
  );
  assert(
    text.includes("Each license supports up to 2 device activations"),
    "pricing page is missing device activation FAQ"
  );
  assert(countJsonLd(text) >= 3, "pricing page has too little JSON-LD");
  assert(text.includes('"@type":"Product"'), "pricing page missing Product schema");
  assert(text.includes('"@type":"FAQPage"'), "pricing page missing FAQ schema");
});

addCheck("answers page has GEO-ready Pro facts", async () => {
  const { text } = await fetchText("/answers");

  assert(
    text.includes("How much does SafeJSON Pro cost?"),
    "answers page missing Pro pricing answer"
  );
  assert(
    text.includes("One SafeJSON Pro license can be activated on up to 2 devices."),
    "answers page missing device answer"
  );
  assert(text.includes('"@type":"FAQPage"'), "answers page missing FAQ schema");
});

addCheck("homepage has Pro internal links and schema", async () => {
  const { text } = await fetchText("/");

  assert(text.includes("Schema Validator"), "homepage missing Schema Validator link");
  assert(text.includes('"@type":"SoftwareApplication"'), "homepage missing SoftwareApplication schema");
  assert(text.includes('"@type":"FAQPage"'), "homepage missing FAQ schema");
});

addCheck("sitemap and robots expose canonical discovery paths", async () => {
  const sitemap = await fetchText("/sitemap.xml");
  const robots = await fetchText("/robots.txt");

  assert(sitemap.text.includes("https://www.safejson.dev/pricing"), "sitemap missing pricing");
  assert(sitemap.text.includes("https://www.safejson.dev/answers"), "sitemap missing answers");
  assert(sitemap.text.includes("https://www.safejson.dev/json-diff"), "sitemap missing json-diff");
  assert(sitemap.text.includes("https://www.safejson.dev/jwt-decoder"), "sitemap missing jwt-decoder");
  assert(sitemap.text.includes("https://www.safejson.dev/jsonpath-query"), "sitemap missing jsonpath-query");
  assert(sitemap.text.includes("https://www.safejson.dev/json-schema-validator"), "sitemap missing json-schema-validator");
  assert(sitemap.text.includes("https://www.safejson.dev/privacy/verify-local-processing"), "sitemap missing local processing verification page");
  assert(!sitemap.text.includes("https://www.safejson.dev/diff<"), "sitemap should not expose short diff URL");
  assert(!sitemap.text.includes("https://www.safejson.dev/jwt<"), "sitemap should not expose short jwt URL");
  assert(!sitemap.text.includes("https://www.safejson.dev/jsonpath<"), "sitemap should not expose short jsonpath URL");
  assert(!sitemap.text.includes("https://www.safejson.dev/schema<"), "sitemap should not expose short schema URL");
  assert(robots.text.includes("https://www.safejson.dev/sitemap.xml"), "robots missing sitemap");
  assert(
    robots.text.includes("Content-Signal: ai-train=yes, search=yes, ai-retrieval=yes"),
    "robots missing Content-Signal"
  );
});

addCheck("security headers and disclosure are present", async () => {
  const home = await fetch(`${baseUrl}/`);
  const security = await fetchText("/.well-known/security.txt");

  assert(home.headers.get("strict-transport-security"), "missing HSTS header");
  assert(
    home.headers.get("x-content-type-options") === "nosniff",
    "missing X-Content-Type-Options header"
  );
  assert(home.headers.get("x-frame-options") === "DENY", "missing X-Frame-Options header");
  assert(home.headers.get("referrer-policy"), "missing Referrer-Policy header");
  assert(security.response.ok, "security.txt is not reachable");
  assert(security.text.includes("Contact:"), "security.txt missing Contact");
});

addCheck("content-security-policy is present", async () => {
  const home = await fetch(`${baseUrl}/`);
  const csp = home.headers.get("content-security-policy");

  assert(csp, "missing Content-Security-Policy header");
  assert(csp.includes("default-src"), "CSP missing default-src");
  assert(csp.includes("script-src"), "CSP missing script-src");
  assert(csp.includes("connect-src"), "CSP missing connect-src");
  assert(csp.includes("frame-ancestors"), "CSP missing frame-ancestors");
  assert(csp.includes("worker-src") && csp.includes("blob:"), "CSP missing worker-src blob: — Web Worker will be blocked");

  // worker-src must allow blob for Web Workers
  const workerSrc = csp.match(/worker-src\s+([^;]+)/i);
  assert(workerSrc, "CSP has no worker-src directive");
  assert(workerSrc[1].includes("blob:"), "CSP worker-src missing blob: — Web Worker creation via Blob URL will be blocked");

  // script-src must NOT include blob: (workers only, not scripts)
  const scriptSrc = csp.match(/script-src\s+([^;]+)/i);
  assert(scriptSrc, "CSP has no script-src directive");
  assert(!scriptSrc[1].includes("blob:"), "CSP script-src must not include blob: — blob scripts weaken script security");

  // connect-src must not be wide-open
  const connectSrc = csp.match(/connect-src\s+([^;]+)/i);
  assert(connectSrc, "CSP has no connect-src directive");
  const connectValue = connectSrc[1].trim();
  assert(connectValue !== "*", "CSP connect-src must not be '*'");
  assert(!connectValue.includes("'none'") || connectValue === "'none'", "CSP connect-src is 'none' — GA tracking will be blocked");
  assert(
    connectValue.includes("google-analytics.com") || connectValue.includes("'self'"),
    "CSP connect-src should include google-analytics.com or 'self'"
  );
});

addCheck("Pro tool pages have FAQ schema", async () => {
  const paths = [
    { path: "/json-diff", expected: "Is SafeJSON Diff safe" },
    { path: "/jwt-decoder", expected: "Is it safe to paste a real JWT token" },
    { path: "/jsonpath-query", expected: "Is SafeJSON JSONPath query safe" },
    { path: "/json-schema-validator", expected: "Is SafeJSON Schema Validator safe" },
  ];

  for (const { path, expected } of paths) {
    const { text } = await fetchText(path);
    assert(text.includes('"@type":"FAQPage"'), `${path} missing FAQPage schema`);
    assert(text.includes(expected), `${path} missing tool FAQ content`);
  }
});

addCheck("license endpoints reject invalid input safely", async () => {
  const activate = await fetchText("/api/lemonsqueezy/license/activate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "{}",
  });
  const validate = await fetchText("/api/lemonsqueezy/license/validate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "{}",
  });

  assert(activate.response.status === 400, `activate invalid input returned ${activate.response.status}`);
  assert(validate.response.status === 400, `validate invalid input returned ${validate.response.status}`);
});

let failures = 0;

console.log(`SafeJSON growth check: ${baseUrl}`);

for (const check of checks) {
  try {
    await check.run();
    console.log(`PASS ${check.name}`);
  } catch (error) {
    failures += 1;
    console.error(`FAIL ${check.name}`);
    console.error(`  ${error instanceof Error ? error.message : String(error)}`);
  }
}

if (failures > 0) {
  console.error(`Growth check failed: ${failures}/${checks.length}`);
  process.exit(1);
}

console.log(`Growth check passed: ${checks.length}/${checks.length}`);
