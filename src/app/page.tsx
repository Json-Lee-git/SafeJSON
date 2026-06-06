"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import JsonTreeView, { type JsonValue } from "./components/JsonTreeView";
import Link from "next/link";
import {
  ShieldCheck,
  Lightning,
  Crosshair,
  Code,
  Heart,
  Plug,
} from "@phosphor-icons/react";

type Tab = "tree" | "raw";

export default function Home() {
  const [input, setInput] = useState("");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [tab, setTab] = useState<Tab>("tree");
  const [error, setError] = useState<string | null>(null);
  const [parsed, setParsed] = useState<JsonValue | null>(null);
  const [formattedText, setFormattedText] = useState("");
  const [copied, setCopied] = useState(false);

  // Load JSON from ?json= URL parameter (sent by Chrome extension)
  useEffect(() => {
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
      } catch (_) {
        // Invalid JSON in URL, ignore
      }
    }
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
      return;
    }
    try {
      const data = JSON.parse(input);
      setParsed(data);
      setFormattedText(JSON.stringify(data, null, 2));
      setError(null);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg);
      setParsed(null);
      setFormattedText("");

      // Try to extract line/column from the error message
      const match = msg.match(/at position (\d+)/);
      if (match) {
        const pos = parseInt(match[1], 10);
        const lines = input.slice(0, pos).split("\n");
        const line = lines.length;
        const column = lines[lines.length - 1].length + 1;
        setError(`Line ${line}, Column ${column}: ${msg}`);
      }
    }
  }, [input]);

  const handleClear = useCallback(() => {
    setInput("");
    setError(null);
    setParsed(null);
    setFormattedText("");
  }, []);

  const handleCopy = useCallback(async () => {
    if (!formattedText) return;
    await navigator.clipboard.writeText(formattedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [formattedText]);

  const handleDownload = useCallback(() => {
    if (!formattedText) return;
    const blob = new Blob([formattedText], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.json";
    a.click();
    URL.revokeObjectURL(url);
  }, [formattedText]);

  const handleSample = useCallback(() => {
    const sample = {
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
    const text = JSON.stringify(sample, null, 2);
    setInput(text);
    setParsed(sample);
    setFormattedText(text);
    setError(null);
  }, []);

  // Syntax-highlighted raw text output
  const highlightedRaw = useMemo(() => {
    if (!formattedText) return "";
    return formattedText
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
  }, [formattedText]);

  const hasOutput = parsed !== null && !error;

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
              <span className="text-xs px-2 py-1 rounded bg-emerald-400/10 text-emerald-400 font-medium">
                Formatter
              </span>
              <Link
                href="/diff"
                className="text-xs text-zinc-500 hover:text-zinc-300 px-2 py-1 rounded transition-colors"
              >
                Diff
              </Link>
              <Link
                href="/jwt"
                className="text-xs text-zinc-500 hover:text-zinc-300 px-2 py-1 rounded transition-colors"
              >
                JWT
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/s01071233604-tech/safejson"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              GitHub
            </a>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-zinc-800 transition-colors text-zinc-400"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? "☀" : "☽"}
            </button>
          </div>
        </div>
      </header>

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
            <span className="block">The JSON tool that never</span>
            <span className="text-emerald-400">sees your data</span>
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-4 text-pretty">
            Format, validate, and debug JSON. Entirely in your browser. No
            server. No ads. No tracking.
          </p>
          <p className="text-sm text-zinc-600 max-w-xl mx-auto text-pretty">
            In November 2025, popular online JSON tools were caught leaking over
            80,000 credentials, including AWS keys, GitHub tokens, and bank
            details. SafeJSON runs 100% client-side.{" "}
            <span className="text-zinc-500">
              Open DevTools → Network tab → you{"'"}ll see zero requests.
            </span>
          </p>
        </div>
      </section>

      {/* Tool */}
      <section className="max-w-6xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Input panel */}
          <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/50">
            <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800">
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Input
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSample}
                  className="text-xs text-zinc-500 hover:text-zinc-300 px-2 py-1 rounded hover:bg-zinc-800 transition-colors"
                >
                  Sample
                </button>
                <button
                  onClick={handleClear}
                  className="text-xs text-zinc-500 hover:text-zinc-300 px-2 py-1 rounded hover:bg-zinc-800 transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>
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
            <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setTab("tree")}
                  className={`text-xs px-3 py-1 rounded transition-colors ${
                    tab === "tree"
                      ? "bg-zinc-800 text-zinc-200"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  Tree
                </button>
                <button
                  onClick={() => setTab("raw")}
                  className={`text-xs px-3 py-1 rounded transition-colors ${
                    tab === "raw"
                      ? "bg-zinc-800 text-zinc-200"
                      : "text-zinc-500 hover:text-zinc-300"
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
                      className="text-xs text-zinc-500 hover:text-zinc-300 px-2 py-1 rounded hover:bg-zinc-800 transition-colors"
                    >
                      {copied ? "Copied!" : "Copy"}
                    </button>
                    <button
                      onClick={handleDownload}
                      className="text-xs text-zinc-500 hover:text-zinc-300 px-2 py-1 rounded hover:bg-zinc-800 transition-colors"
                    >
                      Download
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="flex-1 h-[420px] overflow-auto">
              {error ? (
                <div className="p-4">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-red-400/10 border border-red-400/20">
                    <span className="text-red-400 shrink-0 mt-0.5">✕</span>
                    <div>
                      <p className="text-sm font-medium text-red-400">
                        Invalid JSON
                      </p>
                      <p className="text-sm text-red-300/70 mt-1 font-mono">
                        {error}
                      </p>
                    </div>
                  </div>
                </div>
              ) : hasOutput ? (
                tab === "tree" ? (
                  <JsonTreeView data={parsed} />
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

      {/* Features */}
      <section className="border-t border-zinc-800/50 bg-zinc-900/30">
        <div className="max-w-4xl mx-auto px-4 py-20">
        <h2 className="text-2xl font-bold text-center mb-10">Why developers choose SafeJSON</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              Icon: ShieldCheck,
              title: "Privacy First",
              desc: "All processing happens in your browser. Your JSON is never uploaded to any server. Open DevTools and verify, zero network requests.",
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
              desc: "The entire codebase is on GitHub. You can audit every line. No obfuscated tracking scripts. No surprises.",
            },
            {
              Icon: Heart,
              title: "Free Forever",
              desc: "Core formatting, validation, and tree view are always free. Advanced tools like JSON diff and JWT decoder coming as optional Pro features.",
            },
            {
              Icon: Plug,
              title: "Chrome Extension Soon",
              desc: "Auto-detect and format JSON responses directly in your browser. No copy-paste needed.",
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
              <p className="text-xs text-zinc-500 leading-relaxed text-pretty">{desc}</p>
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
            <p className="text-sm text-zinc-500 max-w-md mx-auto">
              Advanced tools for developers who work with JSON every day. All
              client-side, all privacy-first.
            </p>
          </div>
          <div className="max-w-2xl mx-auto divide-y divide-zinc-800/50">
            {[
              {
                title: "JSON Diff",
                desc: "Compare two JSON objects side by side. Added, removed, and changed values highlighted in color.",
                href: "/diff",
              },
              {
                title: "JWT Decoder",
                desc: "Decode JWT tokens instantly. Header, payload, and signature decoded in your browser.",
                href: "/jwt",
              },
              {
                title: "JSONPath",
                desc: "Query JSON with XPath-like expressions. Extract nested values and filter arrays.",
                href: "/jsonpath",
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
                  <p className="text-xs text-zinc-500 text-pretty">{tool.desc}</p>
                </div>
                <span className="text-zinc-600 group-hover:text-emerald-400 transition-colors text-sm">
                  →
                </span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/pricing"
              className="inline-flex px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-xl transition-colors text-sm"
            >
              Get Pro — $5/month
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8 text-center text-xs text-zinc-600">
        <p>
          SafeJSON. All processing happens in your browser. We never see your
          data.
        </p>
      </footer>
    </div>
  );
}
