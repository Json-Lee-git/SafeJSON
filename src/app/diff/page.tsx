"use client";

import { useState, useCallback } from "react";
import JsonDiffView from "../components/JsonDiffView";
import { type JsonValue } from "../components/JsonTreeView";
import { useProUsage, ProBanner, ProLimitNotice } from "../components/ProGate";
import { ToolFaq, diffFaqs } from "../components/ToolFaq";
import Link from "next/link";

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

  const handleSample = useCallback(() => {
    const old = {
      name: "SafeJSON",
      version: "1.0.0",
      description: "Privacy-first JSON formatter",
      author: "Dev",
      stats: { users: 100, rating: 4.5 },
    };
    const updated = {
      name: "SafeJSON Pro",
      version: "1.1.0",
      description: "Privacy-first JSON toolkit",
      author: "JSON-Lee",
      license: "MIT",
      stats: { users: 250, rating: 4.8, downloads: 1200 },
    };
    setLeftInput(JSON.stringify(old, null, 2));
    setRightInput(JSON.stringify(updated, null, 2));
    setLeftParsed(old);
    setRightParsed(updated);
    setLeftError(null);
    setRightError(null);
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
      {/* Header */}
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
            <nav className="flex items-center gap-1">
              <Link
                href="/"
                className="text-xs text-zinc-500 hover:text-zinc-300 px-2 py-1 rounded transition-colors"
              >
                Formatter
              </Link>
              <span className="text-xs px-2 py-1 rounded bg-emerald-400/10 text-emerald-400 font-medium">
                Diff
              </span>
              <Link href="/jwt-decoder" className="text-xs text-zinc-500 hover:text-zinc-300 px-2 py-1 rounded transition-colors">JWT</Link>
              <Link href="/jsonpath-query" className="text-xs text-zinc-500 hover:text-zinc-300 px-2 py-1 rounded transition-colors">JSONPath</Link>
              <Link href="/json-schema-validator" className="text-xs text-zinc-500 hover:text-zinc-300 px-2 py-1 rounded transition-colors">Schema</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Json-Lee-git/SafeJSON"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 pt-12 pb-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-3">
          JSON Diff{" "}
          <span className="text-emerald-400">Checker</span>
        </h1>
        <p className="text-sm text-zinc-500 max-w-xl mx-auto">
          Compare API responses, webhook payloads, and config snapshots side by
          side. Added, removed, and changed values are highlighted. All
          comparison runs locally. No pasted-content upload. Use 5 free
          runs before upgrading.
        </p>
      </section>

      {/* Tool area */}
      <section className="max-w-6xl mx-auto px-4 pb-8">
        <ProBanner tool="JSON Diff" />
        <ProLimitNotice
          tool="JSON Diff"
          remaining={remaining}
          limit={limit}
          isUnlocked={isUnlocked}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          {/* Left input */}
          <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/50">
            <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800">
              <span className="text-xs font-medium text-red-400/70 uppercase tracking-wider">
                Old (Left)
              </span>
              <button onClick={handleSample} className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">Sample</button>
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
              placeholder='{"name": "v1", ...}'
              spellCheck={false}
              className="w-full h-[300px] bg-transparent text-sm font-mono p-4 text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-red-400/20 resize-none transition-colors"
            />
            {leftError && (
              <p className="px-4 py-2 text-xs text-red-400/80 bg-red-400/5 border-t border-red-400/10">
                {leftError}
              </p>
            )}
          </div>

          {/* Right input */}
          <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/50">
            <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800">
              <span className="text-xs font-medium text-emerald-400/70 uppercase tracking-wider">
                New (Right)
              </span>
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
              placeholder='{"name": "v2", ...}'
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

        {/* Action buttons */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <button
            onClick={handleCompare}
            className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-xl transition-colors text-sm"
          >
            Compare
          </button>
          <button
            onClick={handleSample}
            className="px-4 py-2.5 text-zinc-500 hover:text-zinc-300 text-sm transition-colors"
          >
            Sample
          </button>
          <button
            onClick={handleClear}
            className="px-4 py-2.5 text-zinc-500 hover:text-zinc-300 text-sm transition-colors"
          >
            Clear
          </button>
        </div>

        {/* Diff output */}
        <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/50">
          <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800">
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
              Diff Result
            </span>
            {hasOutput && (
              <span className="text-xs text-zinc-600">
                All processing client-side - no JSON upload
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

      {/* Pro teaser */}
      <section className="max-w-4xl mx-auto px-4 py-12 border-t border-zinc-800/50">
        <div className="text-center">
          <span className="text-xs font-medium text-emerald-400/80 uppercase tracking-wider bg-emerald-400/10 px-3 py-1 rounded-full">
            Pro Feature
          </span>
          <h2 className="text-2xl font-bold mt-4 mb-2">
            Unlock all Pro tools
          </h2>
          <p className="text-sm text-zinc-500 max-w-md mx-auto mb-6">
            JSON Diff, JWT Decoder, JSONPath Query, and Schema Validator — built
            for sensitive JSON workflows. $5/month. No pasted-content upload.
            Cancel anytime.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link
              href="/pricing"
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-xl transition-colors text-sm"
            >
              View Pricing
            </Link>
            <Link
              href="/"
              className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              Back to Formatter
            </Link>
          </div>
          <p className="text-xs text-zinc-600 text-center mt-4">
            <Link href="/privacy/verify-local-processing" className="hover:text-zinc-400 transition-colors">Verify local processing</Link>
            {" · "}
            <Link href="/security/check-json-formatter-upload" className="hover:text-zinc-400 transition-colors">Security guide</Link>
            {" · "}
            <Link href="/pricing" className="hover:text-zinc-400 transition-colors">Pricing</Link>
          </p>
        </div>
      </section>

      <ToolFaq toolName="SafeJSON Diff" toolDescription="SafeJSON Diff compares two JSON objects side by side with color-coded results. All comparison runs locally with no pasted-content upload." faqs={diffFaqs} />
      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8 text-center text-xs text-zinc-600">
        <p>
          SafeJSON. No pasted-content upload for core tools.
        </p>
      </footer>
    </div>
  );
}
