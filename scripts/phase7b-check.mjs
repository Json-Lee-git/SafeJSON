import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

function read(path) {
  return readFileSync(join(root, path), "utf8");
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function includesAll(text, phrases, label) {
  for (const phrase of phrases) {
    assert(text.includes(phrase), `${label} missing: ${phrase}`);
  }
}

const targetFiles = [
  "src/app/diff/page.tsx",
  "src/app/diff/layout.tsx",
  "src/app/json-diff/layout.tsx",
  "src/app/schema/page.tsx",
  "src/app/schema/layout.tsx",
  "src/app/json-schema-validator/layout.tsx",
  "src/app/pricing/page.tsx",
  "src/app/pricing/layout.tsx",
  "src/app/components/ToolFaq.tsx",
  "src/app/components/ProGate.tsx",
  "src/app/components/TrackedAnchor.tsx",
  "src/app/components/StructuredData.tsx",
];

const forbiddenPhrases = [
  "zero network requests",
  "no tracking",
  "100% private",
  "guaranteed secure",
  "never leaves your browser",
  "your data never leaves your browser",
  "all processing happens in your browser",
  "enterprise-grade security",
  "100% client-side",
  "never leave your device",
  "50MB diff",
  "handles 50MB+",
  "no slowdown",
  "unlimited file size",
  "enterprise ready",
  "priority support",
];

function checkForbiddenPhrases() {
  for (const file of targetFiles) {
    const text = read(file).toLowerCase();
    for (const phrase of forbiddenPhrases) {
      assert(!text.includes(phrase), `${file} contains forbidden phrase: ${phrase}`);
    }
  }
}

function checkJsonDiff() {
  const page = read("src/app/diff/page.tsx");
  const layout = read("src/app/json-diff/layout.tsx") + read("src/app/diff/layout.tsx");

  includesAll(
    page,
    [
      "Compare API responses",
      "Compare webhook payloads",
      "Compare config snapshots",
      "API response diff",
      "webhook payload diff",
      "config snapshot diff",
      "Try JSON Diff free",
      "Upgrade to Pro",
      "Verify local processing",
      "Read security guide",
      "pro_tool_view_json_diff",
      "json_diff_sample_loaded",
    ],
    "JSON Diff page",
  );
  includesAll(
    layout,
    [
      "compare API responses",
      "webhook payloads",
      "config diffs",
      "private JSON diff",
    ],
    "JSON Diff metadata",
  );
}

function checkSchemaValidator() {
  const page = read("src/app/schema/page.tsx");
  const layout =
    read("src/app/json-schema-validator/layout.tsx") + read("src/app/schema/layout.tsx");

  includesAll(
    page,
    [
      "Validate API response schemas",
      "Validate webhook payloads",
      "Debug schema errors",
      "API response validation",
      "webhook payload shape validation",
      "request/response example validation",
      "Error path",
      "Error message",
      "Check the validator output for supported schema behavior.",
      "Try Schema Validator free",
      "Upgrade to Pro",
      "Verify local processing",
      "Read security guide",
      "pro_tool_view_schema",
      "schema_sample_loaded",
    ],
    "Schema Validator page",
  );
  includesAll(
    layout,
    ["API response schemas", "webhook payload validation", "schema errors"],
    "Schema metadata",
  );
}

function checkPricingAndTeamLite() {
  const pricing = read("src/app/pricing/page.tsx");
  const layout = read("src/app/pricing/layout.tsx");

  includesAll(
    pricing,
    [
      "JSON Diff for API/webhook/config payloads",
      "JWT claim inspection",
      "JSONPath query for nested API responses",
      "Schema validation for API/webhook payloads",
      "Need SafeJSON for a small team?",
      "Simple team license",
      "No SSO, admin dashboard, compliance package, or SLA.",
      "Request Team Lite",
      "team size",
      "use case",
      "invoice need",
      "security requirement",
      "whether SSO/compliance is required",
      "Small team licenses can start around 5 seats.",
      "pricing_team_lite_clicked",
      "team_lite_request_clicked",
      "pricing_upgrade_clicked",
      "verify_link_clicked",
      "security_guide_link_clicked",
    ],
    "Pricing page",
  );
  includesAll(
    layout,
    ["Pro tools for sensitive JSON workflows", "API payloads", "Team Lite"],
    "Pricing metadata",
  );
}

function checkTrackingSafety() {
  const trackedAnchor = read("src/app/components/TrackedAnchor.tsx");
  const allTargets = targetFiles.map(read).join("\n");

  includesAll(
    trackedAnchor,
    ["secondaryEventName", "secondaryEventParams"],
    "TrackedAnchor secondary event support",
  );
  for (const variableName of [
    "schemaInput",
    "jsonInput",
    "leftInput",
    "rightInput",
    "pathExpr",
    "input.trim",
  ]) {
    const pattern = new RegExp(`trackEvent\\([^)]*${variableName.replace(".", "\\.")}`, "i");
    assert(
      !pattern.test(allTargets),
      `Phase 7B tracking appears to include ${variableName}`,
    );
  }
}

const checks = [
  ["forbidden target phrases", checkForbiddenPhrases],
  ["json diff workflow", checkJsonDiff],
  ["schema validator workflow", checkSchemaValidator],
  ["pricing and team lite", checkPricingAndTeamLite],
  ["tracking safety", checkTrackingSafety],
];

let failures = 0;
for (const [name, run] of checks) {
  try {
    run();
    console.log(`PASS ${name}`);
  } catch (error) {
    failures += 1;
    console.error(`FAIL ${name}`);
    console.error(`  ${error instanceof Error ? error.message : String(error)}`);
  }
}

if (failures > 0) {
  console.error(`Phase 7B check failed: ${failures}/${checks.length}`);
  process.exit(1);
}

console.log(`Phase 7B check passed: ${checks.length}/${checks.length}`);
