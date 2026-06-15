"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import JsonTreeView, { type JsonValue } from "./components/JsonTreeView";
import { FAQSchema, SoftwareAppSchema, VideoObjectSchema } from "./components/StructuredData";
import LocalProcessingNote from "./components/LocalProcessingNote";
import NetworkRequestIndicator from "./components/NetworkRequestIndicator";
import Footer from "./components/Footer";
import Link from "next/link";
import { inputSizeBucket, trackEvent } from "./components/analytics";
import {
  ShieldCheck,
  Lightning,
  Crosshair,
  Code,
  Heart,
  Plug,
  Moon,
  Sun,
} from "@phosphor-icons/react";
import { useJsonWorker } from "./hooks/useJsonWorker";

type Tab = "tree" | "raw";

function getSampleJson() {
  const data = {
    name: "SafeJSON",
    version: "1.0.0",
    description: "Privacy-first JSON formatter",
    features: [
      "Instant formatting",
      "Tree view with collapse",
      "Error detection",
      "Dark mode",
      "100% client-side",
    ],
    author: {
      name: "Dev",
      role: "Solo founder",
    },
    stats: {
      downloads: 0,
      rating: 5,
      isFree: true,
      config: null,
    },
  };

  return {
    data,
    text: JSON.stringify(data, null, 2),
  };
}

export default function Home() {
  const initialSample = getSampleJson();
  const [input, setInput] = useState(initialSample.text);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [tab, setTab] = useState<Tab>("tree");
  const [error, setError] = useState<string | null>(null);
  const [parsed, setParsed] = useState<JsonValue | null>(initialSample.data);
  const [formattedText, setFormattedText] = useState(initialSample.text);
  const [copied, setCopied] = useState(false);
  const {
    state: jsonWorker,
    run: runJsonWorker,
    reset: resetJsonWorker,
  } = useJsonWorker();

  // Load JSON from ?json= URL parameter (sent by Chrome extension)
  useEffect(() => {
    const handle = window.setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      const jsonParam = params.get("json");
      if (jsonParam) {
        try {
          const decoded = decodeURIComponent(jsonParam);
          const data = JSON.parse(decoded);
          setInput(decoded);
          setParsed(data);
          setFormattedText(JSON.stringify(data, null, 2));
          setError(null);
        } catch {
          // Invalid JSON in URL, ignore
        }
      }
    }, 0);

    return () => window.clearTimeout(handle);
  }, []);

  const toggleTheme = useCallback(() => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
  }, [theme]);

  const handleFormat = useCallback(() => {
    if (!input.trim()) {
      setError(null);
      setParsed(null);
      setFormattedText("");
      resetJsonWorker();
      return;
    }
    trackEvent("tool_run", {
      tool: "formatter",
      input_size_bucket: inputSizeBucket(input),
    });
    setError(null);
    setParsed(null);
    setFormattedText("");
    runJsonWorker("format", input);
  }, [input, resetJsonWorker, runJsonWorker]);

  const handleClear = useCallback(() => {
    setInput("");
    setError(null);
    setParsed(null);
    setFormattedText("");
    resetJsonWorker();
  }, [resetJsonWorker]);

  const currentError = jsonWorker.error || error;
  const currentParsed = jsonWorker.result?.data ?? parsed;
  const currentFormattedText = jsonWorker.result?.formatted || formattedText;

  const handleCopy = useCallback(async () => {
    if (!currentFormattedText) return;
    await navigator.clipboard.writeText(currentFormattedText);
    trackEvent("tool_output_copy", { tool: "formatter" });
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [currentFormattedText]);

  const handleDownload = useCallback(() => {
    if (!currentFormattedText) return;
    trackEvent("tool_output_download", { tool: "formatter" });
    const blob = new Blob([currentFormattedText], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.json";
    a.click();
    URL.revokeObjectURL(url);
  }, [currentFormattedText]);

  const loadSample = useCallback(() => {
    const { data, text } = getSampleJson();
    setInput(text);
    setParsed(data);
    setFormattedText(text);
    setError(null);
    resetJsonWorker();
  }, [resetJsonWorker]);

  const handleSample = useCallback(() => {
    loadSample();
    trackEvent("tool_sample_loaded", { tool: "formatter" });
  }, [loadSample]);

  useEffect(() => {
    if (!jsonWorker.result) return;

    trackEvent("tool_success", {
      tool: "formatter",
      input_size_bucket: inputSizeBucket(input),
    });
  }, [input, jsonWorker.result]);

  // Syntax-highlighted raw text output
  const highlightedRaw = useMemo(() => {
    if (!currentFormattedText) return "";
    return currentFormattedText
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(
        /("(?:\\.|[^"\\])*")\s*:/g,
        '<span class="text-purple-400">$1</span>:'
      )
      .replace(
        /:\s*("(?:\\.|[^"\\])*")/g,
        ': <span class="text-emerald-400">$1</span>'
      )
      .replace(
        /:\s*(-?\d+\.?\d*(?:[eE][+-]?\d+)?)/g,
        ': <span class="text-amber-400">$1</span>'
      )
      .replace(
        /:\s*(true|false)/g,
        ': <span class="text-cyan-400">$1</span>'
      )
      .replace(
        /:\s*(null)/g,
        ': <span class="text-gray-500 italic">$1</span>'
      );
  }, [currentFormattedText]);

  const hasOutput =
    currentParsed !== null && !currentError && !jsonWorker.processing;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="text-lg font-bold tracking-tight">
              <span className="text-emerald-400">{`{`}</span>
              SafeJSON
              <span className="text-emerald-400">{`}`}</span>
            </span>
            <nav className="flex items-center gap-1">
              <span className="inline-flex min-h-10 items-center rounded bg-emerald-400/10 px-3 text-xs font-medium text-emerald-300">
                Formatter
              </span>
              <Link
                href="/json-diff"
                className="inline-flex min-h-10 items-center rounded px-3 text-xs text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-zinc-200"
              >
                Diff
              </Link>
              <Link href="/jwt-decoder" className="inline-flex min-h-10 items-center rounded px-3 text-xs text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-zinc-200">JWT</Link>
              <Link href="/jsonpath-query" className="inline-flex min-h-10 items-center rounded px-3 text-xs text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-zinc-200">JSONPath</Link>
              <Link href="/json-schema-validator" className="inline-flex min-h-10 items-center rounded px-3 text-xs text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-zinc-200">Schema</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Json-Lee-git/SafeJSON"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center rounded px-2 text-sm text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-zinc-200"
            >
              GitHub
            </a>
            <button
              onClick={toggleTheme}
              className="min-h-10 min-w-10 rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-200"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun size={16} weight="bold" />
              ) : (
                <Moon size={16} weight="bold" />
              )}
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
      <section className="relative max-w-4xl mx-auto px-4 pt-20 pb-12 text-center overflow-hidden">
        {/* Decorative JSON braces background */}
        <div
          className="absolute inset-0 select-none pointer-events-none flex items-center justify-center"
          aria-hidden="true"
        >
          <span className="text-[20rem] leading-none font-mono font-bold text-zinc-800/30 -translate-y-8">
            {`{ }`}
          </span>
        </div>

        <div className="relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 text-xs font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Your data never leaves your browser
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            <span className="block">The JSON tool</span>
            <span className="text-emerald-400">
              that never sees your data.
            </span>
            <span className="block text-white">
              Prove it yourself.
            </span>
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-4 text-pretty">
            <span className="block">Format, validate, and debug JSON. Entirely in your browser.</span>
            <span>
              Open DevTools -&gt; Network. You won&apos;t see pasted content uploaded.
              That&apos;s the whole point.
            </span>
          </p>
          <p className="text-sm font-medium text-zinc-400 max-w-2xl mx-auto mb-4 text-pretty">
            Tested with 50MB JSON for local formatting. No upload.
          </p>
          <p className="text-sm text-zinc-400 max-w-xl mx-auto text-pretty">
            In November 2025, popular online JSON tools were caught leaking over
            80,000 credentials, including AWS keys, GitHub tokens, and bank
            details. SafeJSON runs 100% client-side.{" "}
            <span className="text-zinc-300">
              Open DevTools -&gt; Network, format once -&gt; no JSON upload.
            </span>
          </p>
          <p className="text-xs text-zinc-400 max-w-xl mx-auto mt-3 text-center">
            <Link href="/privacy/verify-local-processing" className="inline-flex min-h-10 items-center rounded px-2 transition-colors hover:text-emerald-300">
              How to verify local processing
            </Link>
          </p>
        </div>
      </section>

      {/* Tool */}
      <section className="max-w-6xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Input panel */}
          <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/50">
            <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800">
              <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                Input
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSample}
                  className="min-h-10 rounded px-3 text-xs text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-200"
                >
                  Sample
                </button>
                <button
                  onClick={handleClear}
                  className="min-h-10 rounded px-3 text-xs text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-200"
                >
                  Clear
                </button>
              </div>
            </div>
            <LocalProcessingNote
              processing={jsonWorker.processing}
              sizeBytes={jsonWorker.sizeBytes}
            />
            <div className="relative">
              {/* Line-number gutter */}
              <div className="absolute left-0 top-0 bottom-0 w-10 border-r border-zinc-800/50 pointer-events-none" />
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                    e.preventDefault();
                    handleFormat();
                  }
                }}
                placeholder='Paste your JSON here... (Cmd+Enter to format)'
                spellCheck={false}
                className="w-full h-[420px] bg-transparent text-sm font-mono p-4 pl-12 text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-emerald-400/20 focus:bg-emerald-400/[0.02] resize-none transition-colors"
              />
            </div>
          </div>

          {/* Output panel */}
          <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/50 flex flex-col">
            <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2 border-b border-zinc-800">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setTab("tree")}
                  className={`text-xs px-3 py-1 rounded transition-colors ${
                    tab === "tree"
                      ? "bg-zinc-800 text-zinc-200"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  Tree
                </button>
                <button
                  onClick={() => setTab("raw")}
                  className={`text-xs px-3 py-1 rounded transition-colors ${
                    tab === "raw"
                      ? "bg-zinc-800 text-zinc-200"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  Raw
                </button>
              </div>
              <div className="flex items-center gap-2">
                {hasOutput && (
                  <>
                    <button
                      onClick={handleCopy}
                      className="min-h-10 rounded px-3 text-xs text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-200"
                    >
                      {copied ? "Copied!" : "Copy"}
                    </button>
                    <button
                      onClick={handleDownload}
                      className="min-h-10 rounded px-3 text-xs text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-200"
                    >
                      Download
                    </button>
                  </>
                )}
                <NetworkRequestIndicator />
              </div>
            </div>

            <div className="flex-1 h-[420px] overflow-auto">
              {jsonWorker.processing ? (
                <div className="flex h-full items-center justify-center text-sm text-zinc-400">
                  <div className="text-center">
                    <p className="mb-3 text-3xl font-mono text-zinc-800">{`{ }`}</p>
                    <p>Parsing locally in your browser...</p>
                  </div>
                </div>
              ) : currentError ? (
                <div className="p-4">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-red-400/10 border border-red-400/20">
                    <span className="text-red-400 shrink-0 mt-0.5">✕</span>
                    <div>
                      <p className="text-sm font-medium text-red-400">
                        Invalid JSON
                      </p>
                      <p className="text-sm text-red-300/70 mt-1 font-mono">
                        {currentError}
                      </p>
                    </div>
                  </div>
                </div>
              ) : hasOutput ? (
                tab === "tree" ? (
                  <JsonTreeView data={currentParsed!} />
                ) : (
                  <pre
                    className="p-4 text-sm font-mono text-zinc-300 whitespace-pre"
                    dangerouslySetInnerHTML={{ __html: highlightedRaw }}
                  />
                )
              ) : (
                <div className="flex items-center justify-center h-full text-zinc-600 text-sm">
                  <div className="text-center">
                    <p className="text-4xl mb-3">{`{ }`}</p>
                    <p>Paste JSON on the left, see it formatted here</p>
                    <p className="text-xs text-zinc-700 mt-1">
                      Cmd+Enter to format
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Format button */}
        <div className="flex justify-center mt-4 lg:hidden">
          <button
            onClick={handleFormat}
            className="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-xl transition-colors text-sm"
          >
            Format JSON
          </button>
        </div>
      </section>

      {/* Quick links - high-authority internal linking */}
      <section className="border-t border-zinc-800/50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
            <span className="text-zinc-400 text-xs">Explore:</span>
            <Link href="/blog/safest-json-formatter" className="inline-flex min-h-10 items-center rounded px-2 text-zinc-400 transition-colors hover:text-emerald-300">What is the safest JSON formatter</Link>
            <Link href="/answers" className="inline-flex min-h-10 items-center rounded px-2 text-zinc-400 transition-colors hover:text-emerald-300">SafeJSON answers</Link>
            <Link href="/compare" className="inline-flex min-h-10 items-center rounded px-2 text-zinc-400 transition-colors hover:text-emerald-300">JSON formatter comparison</Link>
            <Link href="/vs/jsonformatter-org" className="inline-flex min-h-10 items-center rounded px-2 text-zinc-400 transition-colors hover:text-emerald-300">SafeJSON vs jsonformatter.org</Link>
            <Link href="/vs/jsonformatter-extension" className="inline-flex min-h-10 items-center rounded px-2 text-zinc-400 transition-colors hover:text-emerald-300">Extension comparison</Link>
            <Link href="/pricing" className="inline-flex min-h-10 items-center rounded px-2 text-zinc-400 transition-colors hover:text-emerald-300">Free vs Pro</Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-zinc-800/50 bg-zinc-900/30">
        <div className="max-w-4xl mx-auto px-4 py-20">
        <h2 className="text-2xl font-bold text-center mb-10">Why developers choose SafeJSON</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              Icon: ShieldCheck,
              title: "Verify, don't trust",
              desc: "We don't ask you to trust us. Open DevTools -> Network tab -> paste any JSON. No pasted-content upload request. Formatter, diff, JWT decoder, and JSONPath work the same way.",
            },
            {
              Icon: Lightning,
              title: "Instant Results",
              desc: "No loading spinners. No waiting. Paste your JSON and see formatted output immediately.",
            },
            {
              Icon: Crosshair,
              title: "Built for Developers",
              desc: "Tree view with collapsible nodes, error location with line numbers, dark mode, keyboard shortcuts. No clutter, no ads.",
            },
            {
              Icon: Code,
              title: "Open Source",
              desc: "The entire codebase is on GitHub. You can audit every line. No obfuscated data-collection scripts. No surprises.",
            },
            {
              Icon: Heart,
              title: "Free Forever",
              desc: "Core formatting, validation, and tree view are always free. Advanced tools like JSON diff, JWT decoder, JSONPath, and Schema are optional Pro features.",
            },
            {
              Icon: Plug,
              title: "Browser Extension",
              desc: "Auto-detect and format JSON responses on any URL. Available on Edge Add-ons. No pasted-content analytics, no data collection.",
            },
          ].map(({ Icon, title, desc }) => (
            <div
              key={title}
              className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/30 hover:border-zinc-700 transition-colors"
            >
              <Icon
                size={24}
                weight="duotone"
                className="text-emerald-400 mb-3"
              />
              <h3 className="font-semibold text-sm mb-2">{title}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed text-pretty">{desc}</p>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* Pro teaser
      <section className="max-w-4xl mx-auto px-4 py-16 border-t border-zinc-800">
        <h2 className="text-2xl font-bold text-center mb-8">Coming Soon: Pro</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/30">
            <h3 className="font-semibold mb-1">Free</h3>
            <p className="text-3xl font-bold mb-4">$0</p>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>✓ JSON Formatting</li>
              <li>✓ Tree View</li>
              <li>✓ Error Detection</li>
              <li>✓ Dark Mode</li>
              <li>✓ Copy & Download</li>
            </ul>
          </div>
          <div className="p-6 rounded-xl border border-emerald-400/30 bg-emerald-400/5">
            <h3 className="font-semibold mb-1">Pro</h3>
            <p className="text-3xl font-bold mb-4">$5<span className="text-base font-normal text-zinc-400">/mo</span></p>
            <ul className="space-y-2 text-sm text-zinc-300">
              <li>✓ Everything in Free</li>
              <li>✓ JSON Diff</li>
              <li>✓ JWT Decoder</li>
              <li>✓ JSONPath Query</li>
              <li>✓ Schema Validation</li>
              <li>✓ Large File Support (&gt;5MB)</li>
              <li>✓ History (localStorage)</li>
            </ul>
          </div>
        </div>
      </section>
      */}

      {/* Pro tools */}
      <section className="border-t border-zinc-800/50">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <span className="text-xs font-medium text-emerald-400/80 uppercase tracking-wider bg-emerald-400/10 px-3 py-1 rounded-full">
              Pro Tools
            </span>
            <h2 className="text-2xl font-bold mt-4 mb-2">
              More than a formatter
            </h2>
            <p className="text-sm text-zinc-400 max-w-md mx-auto">
              Advanced tools for developers who work with JSON every day. All
              client-side, all privacy-first.
            </p>
          </div>
          <div className="max-w-2xl mx-auto divide-y divide-zinc-800/50">
            {[
              {
                title: "JSON Diff",
                desc: "Compare two JSON objects side by side. Added, removed, and changed values highlighted in color. All comparison runs locally — your JSON is not uploaded.",
                href: "/json-diff",
              },
              {
                title: "JWT Decoder",
                desc: "Decode JWT tokens instantly. Header, payload, and signature decoded in your browser. Your token stays local — safe for production JWTs.",
                href: "/jwt-decoder",
              },
              {
                title: "JSONPath",
                desc: "Query JSON with XPath-like expressions. Extract nested values and filter arrays. All queries run client-side — your data stays in your browser.",
                href: "/jsonpath-query",
              },
              {
                title: "Schema Validator",
                desc: "Validate JSON against JSON Schema locally. Catch missing fields, wrong types, and malformed payloads. Your API responses and schemas are not uploaded.",
                href: "/json-schema-validator",
              },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="flex items-center gap-4 py-4 px-2 hover:bg-white/[0.02] transition-colors group -mx-2 rounded-lg"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-sm mb-0.5 group-hover:text-emerald-400 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-xs text-zinc-400 text-pretty">{tool.desc}</p>
                </div>
                <span className="text-zinc-600 group-hover:text-emerald-400 transition-colors text-sm">
                  {"->"}
                </span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/pricing"
              className="inline-flex px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-xl transition-colors text-sm"
            >
              Get Pro - $5/month
            </Link>
          </div>
        </div>
      </section>

      </main>

      <Footer />

      <SoftwareAppSchema />
      <VideoObjectSchema />
      <FAQSchema />
    </div>
  );
}
