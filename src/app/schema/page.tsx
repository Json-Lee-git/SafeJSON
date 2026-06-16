"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import EventOnView from "../components/EventOnView";
import { ProBanner, ProLimitNotice, useProUsage } from "../components/ProGate";
import { ToolFaq, schemaFaqs } from "../components/ToolFaq";
import { trackEvent } from "../components/analytics";

type ValidationError = {
  path: string;
  message: string;
  keyword?: string;
};

type SchemaSampleKey = "api" | "webhook" | "request";

const schemaSamples: Record<
  SchemaSampleKey,
  {
    label: string;
    payload: unknown;
    schema: Record<string, unknown>;
  }
> = {
  api: {
    label: "API response sample",
    payload: {
      requestId: "req_7b",
      user: {
        id: "usr_123",
        email: "developer@example.com",
        plan: "pro",
      },
      limits: { diffRuns: 5, schemaRuns: 5 },
    },
    schema: {
      type: "object",
      required: ["requestId", "user", "limits"],
      properties: {
        requestId: { type: "string" },
        user: {
          type: "object",
          required: ["id", "plan"],
          properties: {
            id: { type: "string" },
            email: { type: "string" },
            plan: { enum: ["free", "pro"] },
          },
        },
        limits: {
          type: "object",
          required: ["diffRuns", "schemaRuns"],
          properties: {
            diffRuns: { type: "number" },
            schemaRuns: { type: "number" },
          },
        },
      },
    },
  },
  webhook: {
    label: "Webhook payload sample",
    payload: {
      event: "subscription.updated",
      id: "evt_2002",
      data: {
        customerId: "cus_42",
        previousPlan: "monthly",
        currentPlan: "yearly",
      },
    },
    schema: {
      type: "object",
      required: ["event", "id", "data"],
      properties: {
        event: { const: "subscription.updated" },
        id: { type: "string" },
        data: {
          type: "object",
          required: ["customerId", "currentPlan"],
          properties: {
            customerId: { type: "string" },
            previousPlan: { type: "string" },
            currentPlan: { enum: ["monthly", "yearly"] },
          },
        },
      },
    },
  },
  request: {
    label: "Request/response sample",
    payload: {
      method: "POST",
      path: "/v1/licenses/activate",
      body: {
        licenseKey: "sample-key",
        instanceName: "SafeJSON Browser",
      },
      response: {
        ok: true,
        activationLimit: 2,
      },
    },
    schema: {
      type: "object",
      required: ["method", "path", "body", "response"],
      properties: {
        method: { enum: ["POST"] },
        path: { type: "string" },
        body: {
          type: "object",
          required: ["licenseKey", "instanceName"],
          properties: {
            licenseKey: { type: "string" },
            instanceName: { type: "string" },
          },
        },
        response: {
          type: "object",
          required: ["ok"],
          properties: {
            ok: { type: "boolean" },
            activationLimit: { type: "number" },
          },
        },
      },
    },
  },
};

const schemaScenarios = [
  {
    title: "API response validation",
    body: "Validate API response schemas when a deployed endpoint starts returning missing fields, wrong types, or unexpected enum values.",
    sensitivity:
      "API examples can include account state, field names, feature flags, and internal contract assumptions.",
    help: "SafeJSON keeps this as a lightweight schema debugging workflow with no pasted-content upload for core tools.",
  },
  {
    title: "webhook payload shape validation",
    body: "Validate webhook payloads from sandbox and production-like events before changing handlers or retry logic.",
    sensitivity:
      "Webhook data can include customer identifiers, billing state, event IDs, and provider-specific metadata.",
    help: "Paste the payload and schema, review Error path and Error message, then verify local processing with DevTools.",
  },
  {
    title: "request/response example validation",
    body: "Validate request/response examples used in docs, support tickets, and debugging notes without building an API governance platform.",
    sensitivity:
      "Examples often reveal endpoint paths, object shapes, and validation assumptions.",
    help: "Use the sample pair to debug schema errors quickly while keeping the workflow browser-local.",
  },
];

export default function SchemaPage() {
  const { increment, isOverLimit, remaining, limit, isUnlocked } =
    useProUsage("schema");
  const [jsonInput, setJsonInput] = useState("");
  const [schemaInput, setSchemaInput] = useState("");
  const [valid, setValid] = useState<boolean | null>(null);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [parseError, setParseError] = useState<string | null>(null);

  const handleValidate = useCallback(async () => {
    setParseError(null);
    setValid(null);
    setErrors([]);

    if (isOverLimit) {
      setParseError(
        "Free Schema Validator runs used up. Upgrade to Pro to continue.",
      );
      return;
    }

    if (!jsonInput.trim()) {
      setParseError("Paste JSON data to validate");
      return;
    }
    if (!schemaInput.trim()) {
      setParseError("Paste a JSON Schema");
      return;
    }

    let data: unknown;
    let schema: Record<string, unknown> | boolean;

    try {
      data = JSON.parse(jsonInput);
    } catch (e) {
      setParseError(
        "Invalid JSON data: " + (e instanceof Error ? e.message : ""),
      );
      return;
    }

    try {
      schema = JSON.parse(schemaInput);
    } catch (e) {
      setParseError(
        "Invalid JSON Schema: " + (e instanceof Error ? e.message : ""),
      );
      return;
    }

    try {
      const Ajv = (await import("ajv")).default;
      const ajv = new Ajv({ allErrors: true, verbose: true });
      const validate = ajv.compile(schema);
      const result = validate(data);

      if (result) {
        setValid(true);
        setErrors([]);
      } else {
        setValid(false);
        setErrors(
          (validate.errors || []).map((error) => ({
            path: error.instancePath || "(root)",
            message: error.message || "Unknown validation error",
            keyword: error.keyword,
          })),
        );
      }
      increment();
    } catch (e) {
      setParseError(
        "Schema compilation error: " + (e instanceof Error ? e.message : ""),
      );
    }
  }, [jsonInput, schemaInput, increment, isOverLimit]);

  const handleSample = useCallback((sampleKey: SchemaSampleKey) => {
    const sample = schemaSamples[sampleKey];
    setJsonInput(JSON.stringify(sample.payload, null, 2));
    setSchemaInput(JSON.stringify(sample.schema, null, 2));
    setValid(null);
    setErrors([]);
    setParseError(null);
    trackEvent("schema_sample_loaded", { sample: sampleKey });
  }, []);

  const handleClear = useCallback(() => {
    setJsonInput("");
    setSchemaInput("");
    setValid(null);
    setErrors([]);
    setParseError(null);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      <EventOnView name="pro_tool_view_schema" />
      <header className="border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-lg font-bold tracking-tight hover:opacity-80 transition-opacity"
            >
              <span className="text-emerald-400">{`{`}</span>
              SafeJSON
              <span className="text-emerald-400">{`}`}</span>
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              <Link
                href="/"
                className="text-xs text-zinc-500 hover:text-zinc-300 px-2 py-1 rounded transition-colors"
              >
                Formatter
              </Link>
              <Link
                href="/json-diff"
                className="text-xs text-zinc-500 hover:text-zinc-300 px-2 py-1 rounded transition-colors"
              >
                Diff
              </Link>
              <Link
                href="/jwt-decoder"
                className="text-xs text-zinc-500 hover:text-zinc-300 px-2 py-1 rounded transition-colors"
              >
                JWT
              </Link>
              <Link
                href="/jsonpath-query"
                className="text-xs text-zinc-500 hover:text-zinc-300 px-2 py-1 rounded transition-colors"
              >
                JSONPath
              </Link>
              <span className="text-xs px-2 py-1 rounded bg-emerald-400/10 text-emerald-400 font-medium">
                Schema
              </span>
            </nav>
          </div>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-4 pt-12 pb-6 text-center">
        <p className="text-xs font-medium text-emerald-400/80 uppercase tracking-wider mb-3">
          API and webhook schema debugging
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Validate API response schemas, Validate webhook payloads, and Debug schema errors
        </h1>
        <p className="text-sm text-zinc-500 max-w-2xl mx-auto">
          SafeJSON Schema Validator helps validate API responses, webhook
          payloads, and request/response examples against JSON Schema. It keeps
          the workflow lightweight: browser-local JSON workflow, no
          pasted-content upload for core tools, and 5 free runs before upgrade.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#schema-validator-tool"
            className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-xl transition-colors text-sm"
          >
            Try Schema Validator free
          </a>
          <Link
            href="/pricing"
            className="px-5 py-2.5 border border-zinc-700 text-zinc-300 hover:border-zinc-500 rounded-xl transition-colors text-sm"
          >
            Upgrade to Pro
          </Link>
          <Link
            href="/privacy/verify-local-processing"
            onClick={() =>
              trackEvent("verify_link_clicked", { source: "schema_hero" })
            }
            className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            Verify local processing
          </Link>
          <Link
            href="/security/check-json-formatter-upload"
            onClick={() =>
              trackEvent("security_guide_link_clicked", {
                source: "schema_hero",
              })
            }
            className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            Read security guide
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {schemaScenarios.map((scenario) => (
            <article
              key={scenario.title}
              className="rounded-xl border border-zinc-800 bg-zinc-900/35 p-5"
            >
              <h2 className="text-sm font-semibold text-zinc-100">
                {scenario.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-500">
                {scenario.body}
              </p>
              <p className="mt-3 text-xs leading-relaxed text-zinc-600">
                Sensitive because: {scenario.sensitivity}
              </p>
              <p className="mt-3 text-xs leading-relaxed text-zinc-400">
                {scenario.help}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="schema-validator-tool" className="max-w-6xl mx-auto px-4 pb-8">
        <ProBanner tool="Schema Validator" />
        <ProLimitNotice
          tool="Schema Validator"
          remaining={remaining}
          limit={limit}
          isUnlocked={isUnlocked}
        />
        <div className="mb-4 rounded-xl border border-zinc-800 bg-zinc-900/35 px-4 py-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-zinc-500">
              Load sample schema and payload pairs for API, webhook, or
              request/response validation.
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {Object.entries(schemaSamples).map(([key, sample]) => (
                <button
                  key={key}
                  onClick={() => handleSample(key as SchemaSampleKey)}
                  className="rounded-lg border border-zinc-700 px-3 py-1.5 text-xs text-zinc-300 hover:border-emerald-400/50 hover:text-emerald-300 transition-colors"
                >
                  {sample.label}
                </button>
              ))}
            </div>
          </div>
          <p className="mt-3 text-xs text-zinc-600">
            Draft support clarity: The current validator uses Ajv 8 default JSON Schema behavior. Check the validator output for supported schema behavior.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/50">
            <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800">
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                JSON Data
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleSample("api")}
                  className="text-xs text-zinc-500 hover:text-zinc-300 px-2 py-1 rounded hover:bg-zinc-800 transition-colors"
                >
                  API sample
                </button>
                <button
                  onClick={handleClear}
                  className="text-xs text-zinc-500 hover:text-zinc-300 px-2 py-1 rounded hover:bg-zinc-800 transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>
            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder='{"requestId": "req_7b", "user": {...}}'
              spellCheck={false}
              className="w-full h-[260px] bg-transparent text-sm font-mono p-4 text-zinc-300 placeholder:text-zinc-600 focus:outline-none resize-none"
            />
          </div>
          <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/50">
            <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800">
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                JSON Schema
              </span>
              <button
                onClick={() => handleSample("webhook")}
                className="text-xs text-zinc-500 hover:text-zinc-300 px-2 py-1 rounded hover:bg-zinc-800 transition-colors"
              >
                Webhook sample
              </button>
            </div>
            <textarea
              value={schemaInput}
              onChange={(e) => setSchemaInput(e.target.value)}
              placeholder='{"type": "object", "required": [...]}'
              spellCheck={false}
              className="w-full h-[260px] bg-transparent text-sm font-mono p-4 text-zinc-300 placeholder:text-zinc-600 focus:outline-none resize-none"
            />
          </div>
        </div>

        <div className="flex justify-center mb-4">
          <button
            onClick={handleValidate}
            className="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-xl transition-colors text-sm"
          >
            Validate
          </button>
        </div>

        <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/50">
          <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800">
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
              Result
            </span>
            <span className="text-xs text-zinc-600">
              Error path and Error message are shown separately
            </span>
          </div>
          <div className="min-h-[200px]">
            {parseError ? (
              <div className="p-4">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-red-400/10 border border-red-400/20">
                  <span className="text-red-400 shrink-0 mt-0.5">!</span>
                  <div>
                    <p className="text-xs font-semibold text-red-300">
                      Input issue
                    </p>
                    <p className="mt-1 text-sm text-red-300/80 font-mono">
                      {parseError}
                    </p>
                  </div>
                </div>
              </div>
            ) : valid === true ? (
              <div className="p-8 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 text-sm font-medium mb-3">
                  Valid
                </div>
                <p className="text-sm text-zinc-500">
                  JSON data passes the current schema constraints.
                </p>
              </div>
            ) : valid === false ? (
              <div className="p-4">
                <div className="flex items-center gap-2 mb-4 px-4 py-2 rounded-lg bg-red-400/10 border border-red-400/20">
                  <span className="text-red-400 text-sm font-medium">
                    {errors.length} validation{" "}
                    {errors.length === 1 ? "error" : "errors"}
                  </span>
                </div>
                <div className="space-y-2">
                  {errors.map((error, index) => (
                    <div
                      key={`${error.path}-${index}`}
                      className="grid grid-cols-1 gap-3 rounded-lg border border-zinc-800 bg-zinc-900/50 p-3 md:grid-cols-[minmax(0,180px)_1fr]"
                    >
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-zinc-600">
                          Error path
                        </p>
                        <code className="mt-1 block rounded bg-zinc-800 px-2 py-1 text-xs text-zinc-300">
                          {error.path}
                        </code>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-zinc-600">
                          Error message
                        </p>
                        <p className="mt-1 text-sm text-red-300/80 font-mono">
                          {error.message}
                          {error.keyword ? ` (${error.keyword})` : ""}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[200px] text-zinc-600 text-sm">
                <div className="text-center">
                  <p className="text-3xl mb-3 font-mono text-zinc-800">{`{ }`}</p>
                  <p>Paste JSON data and a Schema, then click Validate</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12 border-t border-zinc-800/50 text-center">
        <span className="text-xs font-medium text-emerald-400/80 uppercase tracking-wider bg-emerald-400/10 px-3 py-1 rounded-full">
          Pro workflow
        </span>
        <h2 className="text-2xl font-bold mt-4 mb-2">
          Validate API contracts without building a governance platform
        </h2>
        <p className="text-sm text-zinc-500 max-w-md mx-auto mb-6">
          Schema Validator, JSON Diff, JSONPath, and JWT Decoder are built for
          sensitive JSON workflows: API responses, webhook payloads, configs,
          and auth debugging. No pasted-content upload for core tools.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/pricing"
            className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-xl transition-colors text-sm inline-flex"
          >
            View pricing
          </Link>
          <Link
            href="/json-diff"
            className="px-5 py-2.5 border border-zinc-700 text-zinc-300 hover:border-zinc-500 rounded-xl transition-colors text-sm"
          >
            Try JSON Diff free
          </Link>
        </div>
        <p className="text-xs text-zinc-600 text-center mt-4">
          <Link
            href="/privacy/verify-local-processing"
            onClick={() =>
              trackEvent("verify_link_clicked", { source: "schema_cta" })
            }
            className="hover:text-zinc-400 transition-colors"
          >
            Verify local processing
          </Link>
          {" | "}
          <Link
            href="/security/check-json-formatter-upload"
            onClick={() =>
              trackEvent("security_guide_link_clicked", {
                source: "schema_cta",
              })
            }
            className="hover:text-zinc-400 transition-colors"
          >
            Read security guide
          </Link>
          {" | "}
          <Link href="/pricing" className="hover:text-zinc-400 transition-colors">
            Upgrade to Pro
          </Link>
        </p>
      </section>

      <ToolFaq
        toolName="SafeJSON Schema Validator"
        toolDescription="SafeJSON Schema Validator validates API responses, webhook payloads, and request/response examples against JSON Schema with no pasted-content upload for core tools."
        faqs={schemaFaqs}
      />
      <footer className="border-t border-zinc-800 py-8 text-center text-xs text-zinc-600">
        <p>SafeJSON. No pasted-content upload for core tools.</p>
      </footer>
    </div>
  );
}
