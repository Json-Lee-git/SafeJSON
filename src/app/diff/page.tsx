"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import EventOnView from "../components/EventOnView";
import JsonDiffView from "../components/JsonDiffView";
import { type JsonValue } from "../components/JsonTreeView";
import { ProBanner, ProLimitNotice, useProUsage } from "../components/ProGate";
import { ToolFaq, diffFaqs } from "../components/ToolFaq";
import { trackEvent } from "../components/analytics";

type DiffSampleKey = "api" | "webhook" | "config";

const diffSamples: Record<
  DiffSampleKey,
  { label: string; left: JsonValue; right: JsonValue }
> = {
  api: {
    label: "API response sample",
    left: {
      requestId: "req_7a1",
      status: "active",
      user: {
        id: "usr_123",
        plan: "free",
        flags: ["format_json"],
      },
      limits: { diffRuns: 5, schemaRuns: 5 },
    },
    right: {
      requestId: "req_7a2",
      status: "active",
      user: {
        id: "usr_123",
        plan: "pro",
        flags: ["format_json", "json_diff", "schema_validator"],
      },
      limits: { diffRuns: 5, schemaRuns: 5, jwtRuns: 5 },
    },
  },
  webhook: {
    label: "Webhook payload sample",
    left: {
      event: "invoice.paid",
      id: "evt_1001",
      data: {
        customerId: "cus_42",
        plan: "monthly",
        amount: 500,
      },
      deliveredAt: "2026-06-15T10:00:00Z",
    },
    right: {
      event: "invoice.paid",
      id: "evt_1001",
      data: {
        customerId: "cus_42",
        plan: "yearly",
        amount: 3900,
        taxRegion: "US",
      },
      deliveredAt: "2026-06-15T10:00:04Z",
    },
  },
  config: {
    label: "Config snapshot sample",
    left: {
      service: "safejson-api",
      environment: "staging",
      features: {
        jsonDiff: true,
        schemaValidator: false,
      },
      rateLimit: { window: "1m", max: 60 },
    },
    right: {
      service: "safejson-api",
      environment: "production",
      features: {
        jsonDiff: true,
        schemaValidator: true,
      },
      rateLimit: { window: "1m", max: 120 },
    },
  },
};

const scenarios = [
  {
    title: "API response diff",
    body: "Compare API responses before and after a deploy when a field changed, a nullable value disappeared, or a customer sees different payloads than expected.",
    sensitivity:
      "API responses often include account IDs, plan state, feature flags, or internal error details.",
    help: "SafeJSON highlights added, removed, and changed values in a browser-local JSON workflow with no pasted-content upload for core tools.",
  },
  {
    title: "webhook payload diff",
    body: "Compare webhook payloads from retry attempts, sandbox events, or provider migrations to see which event fields changed.",
    sensitivity:
      "Webhook payloads can include customer identifiers, subscription state, invoice amounts, and operational metadata.",
    help: "Use the sample button or paste two payloads, then verify local processing with DevTools Network.",
  },
  {
    title: "config snapshot diff",
    body: "Compare config snapshots across staging and production when flags, rate limits, or nested options drift.",
    sensitivity:
      "Config snapshots may expose service names, rollout flags, regions, and internal operational assumptions.",
    help: "SafeJSON keeps the comparison lightweight: no API governance platform, just a private JSON diff workflow for sensitive payloads.",
  },
];

export default function DiffPage() {
  const { increment, isOverLimit, remaining, limit, isUnlocked } =
    useProUsage("diff");
  const [leftInput, setLeftInput] = useState("");
  const [rightInput, setRightInput] = useState("");
  const [leftParsed, setLeftParsed] = useState<JsonValue | null>(null);
  const [rightParsed, setRightParsed] = useState<JsonValue | null>(null);
  const [leftError, setLeftError] = useState<string | null>(null);
  const [rightError, setRightError] = useState<string | null>(null);

  const handleCompare = useCallback(() => {
    if (isOverLimit) {
      setLeftError("Free JSON Diff runs used up. Upgrade to Pro to continue.");
      setRightError(null);
      return;
    }

    let success = true;

    if (!leftInput.trim()) {
      setLeftError("Paste JSON to compare");
      setLeftParsed(null);
      success = false;
    } else {
      try {
        setLeftParsed(JSON.parse(leftInput));
        setLeftError(null);
      } catch (e) {
        setLeftError(e instanceof Error ? e.message : "Invalid JSON");
        setLeftParsed(null);
        success = false;
      }
    }

    if (!rightInput.trim()) {
      setRightError("Paste JSON to compare");
      setRightParsed(null);
      success = false;
    } else {
      try {
        setRightParsed(JSON.parse(rightInput));
        setRightError(null);
      } catch (e) {
        setRightError(e instanceof Error ? e.message : "Invalid JSON");
        setRightParsed(null);
        success = false;
      }
    }

    if (success) increment();
  }, [leftInput, rightInput, increment, isOverLimit]);

  const handleSample = useCallback((sampleKey: DiffSampleKey) => {
    const sample = diffSamples[sampleKey];
    setLeftInput(JSON.stringify(sample.left, null, 2));
    setRightInput(JSON.stringify(sample.right, null, 2));
    setLeftParsed(sample.left);
    setRightParsed(sample.right);
    setLeftError(null);
    setRightError(null);
    trackEvent("json_diff_sample_loaded", { sample: sampleKey });
  }, []);

  const handleClear = useCallback(() => {
    setLeftInput("");
    setRightInput("");
    setLeftParsed(null);
    setRightParsed(null);
    setLeftError(null);
    setRightError(null);
  }, []);

  const hasOutput = leftParsed !== null && rightParsed !== null;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      <EventOnView name="pro_tool_view_json_diff" />
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
              <span className="text-xs px-2 py-1 rounded bg-emerald-400/10 text-emerald-400 font-medium">
                Diff
              </span>
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
              <Link
                href="/json-schema-validator"
                className="text-xs text-zinc-500 hover:text-zinc-300 px-2 py-1 rounded transition-colors"
              >
                Schema
              </Link>
            </nav>
          </div>
          <a
            href="https://github.com/Json-Lee-git/SafeJSON"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            GitHub
          </a>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-4 pt-12 pb-6 text-center">
        <p className="text-xs font-medium text-emerald-400/80 uppercase tracking-wider mb-3">
          Browser-local JSON diff for sensitive workflows
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Compare API responses, Compare webhook payloads, and Compare config
          snapshots
        </h1>
        <p className="text-sm text-zinc-500 max-w-2xl mx-auto">
          SafeJSON JSON Diff helps compare JSON from production-like payloads:
          API responses, webhook payload diff cases, and config diff snapshots.
          No pasted-content upload for core tools. Try 5 free runs, then
          upgrade to Pro when the workflow becomes part of your debugging loop.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#json-diff-tool"
            className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-xl transition-colors text-sm"
          >
            Try JSON Diff free
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
              trackEvent("verify_link_clicked", { source: "json_diff_hero" })
            }
            className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            Verify local processing
          </Link>
          <Link
            href="/security/check-json-formatter-upload"
            onClick={() =>
              trackEvent("security_guide_link_clicked", {
                source: "json_diff_hero",
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
          {scenarios.map((scenario) => (
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

      <section id="json-diff-tool" className="max-w-6xl mx-auto px-4 pb-8">
        <ProBanner tool="JSON Diff" />
        <ProLimitNotice
          tool="JSON Diff"
          remaining={remaining}
          limit={limit}
          isUnlocked={isUnlocked}
        />
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-zinc-800 bg-zinc-900/35 px-4 py-3">
          <p className="text-xs text-zinc-500">
            Load a realistic sample without sending payload content to
            analytics.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {Object.entries(diffSamples).map(([key, sample]) => (
              <button
                key={key}
                onClick={() => handleSample(key as DiffSampleKey)}
                className="rounded-lg border border-zinc-700 px-3 py-1.5 text-xs text-zinc-300 hover:border-emerald-400/50 hover:text-emerald-300 transition-colors"
              >
                {sample.label}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/50">
            <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800">
              <span className="text-xs font-medium text-red-400/70 uppercase tracking-wider">
                Old (Left)
              </span>
              <button
                onClick={() => handleSample("api")}
                className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                API sample
              </button>
            </div>
            <textarea
              value={leftInput}
              onChange={(e) => setLeftInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                  e.preventDefault();
                  handleCompare();
                }
              }}
              placeholder='{"status": "old", ...}'
              spellCheck={false}
              className="w-full h-[300px] bg-transparent text-sm font-mono p-4 text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-red-400/20 resize-none transition-colors"
            />
            {leftError && (
              <p className="px-4 py-2 text-xs text-red-400/80 bg-red-400/5 border-t border-red-400/10">
                {leftError}
              </p>
            )}
          </div>

          <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/50">
            <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800">
              <span className="text-xs font-medium text-emerald-400/70 uppercase tracking-wider">
                New (Right)
              </span>
              <button
                onClick={() => handleSample("webhook")}
                className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                Webhook sample
              </button>
            </div>
            <textarea
              value={rightInput}
              onChange={(e) => setRightInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                  e.preventDefault();
                  handleCompare();
                }
              }}
              placeholder='{"status": "new", ...}'
              spellCheck={false}
              className="w-full h-[300px] bg-transparent text-sm font-mono p-4 text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-emerald-400/20 resize-none transition-colors"
            />
            {rightError && (
              <p className="px-4 py-2 text-xs text-red-400/80 bg-red-400/5 border-t border-red-400/10">
                {rightError}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 mb-4">
          <button
            onClick={handleCompare}
            className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-xl transition-colors text-sm"
          >
            Compare
          </button>
          <button
            onClick={() => handleSample("config")}
            className="px-4 py-2.5 text-zinc-500 hover:text-zinc-300 text-sm transition-colors"
          >
            Config sample
          </button>
          <button
            onClick={handleClear}
            className="px-4 py-2.5 text-zinc-500 hover:text-zinc-300 text-sm transition-colors"
          >
            Clear
          </button>
        </div>

        <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/50">
          <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800">
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
              Diff Result
            </span>
            {hasOutput && (
              <span className="text-xs text-zinc-600">
                Browser-local comparison result
              </span>
            )}
          </div>
          <div className="min-h-[300px]">
            {hasOutput ? (
              <JsonDiffView left={leftParsed!} right={rightParsed!} />
            ) : (
              <div className="flex items-center justify-center h-[300px] text-zinc-600 text-sm">
                <div className="text-center">
                  <p className="text-3xl mb-3">
                    <span className="text-red-400/60">{`{ }`}</span>{" "}
                    <span className="text-emerald-400/60">{`{ }`}</span>
                  </p>
                  <p>Paste JSON in both panels and click Compare</p>
                  <p className="text-xs text-zinc-700 mt-1">
                    Cmd+Enter to compare
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12 border-t border-zinc-800/50">
        <div className="text-center">
          <span className="text-xs font-medium text-emerald-400/80 uppercase tracking-wider bg-emerald-400/10 px-3 py-1 rounded-full">
            Pro workflow
          </span>
          <h2 className="text-2xl font-bold mt-4 mb-2">
            Compare sensitive JSON without making it a platform project
          </h2>
          <p className="text-sm text-zinc-500 max-w-md mx-auto mb-6">
            JSON Diff, JWT Decoder, JSONPath Query, and Schema Validator are
            built for API responses, webhook payloads, configs, and schema
            errors. No pasted-content upload for core tools.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/pricing"
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-xl transition-colors text-sm"
            >
              View pricing
            </Link>
            <Link
              href="/json-schema-validator"
              className="px-5 py-2.5 border border-zinc-700 text-zinc-300 hover:border-zinc-500 rounded-xl transition-colors text-sm"
            >
              Try Schema Validator free
            </Link>
          </div>
          <p className="text-xs text-zinc-600 text-center mt-4">
            <Link
              href="/privacy/verify-local-processing"
              onClick={() =>
                trackEvent("verify_link_clicked", { source: "json_diff_cta" })
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
                  source: "json_diff_cta",
                })
              }
              className="hover:text-zinc-400 transition-colors"
            >
              Read security guide
            </Link>
            {" | "}
            <Link
              href="/pricing"
              className="hover:text-zinc-400 transition-colors"
            >
              Upgrade to Pro
            </Link>
          </p>
        </div>
      </section>

      <ToolFaq
        toolName="SafeJSON Diff"
        toolDescription="SafeJSON Diff compares API responses, webhook payloads, and config snapshots side by side with no pasted-content upload for core tools."
        faqs={diffFaqs}
      />
      <footer className="border-t border-zinc-800 py-8 text-center text-xs text-zinc-600">
        <p>SafeJSON. No pasted-content upload for core tools.</p>
      </footer>
    </div>
  );
}
