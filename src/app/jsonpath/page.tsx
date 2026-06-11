"use client";

import { useState, useCallback } from "react";
import JsonTreeView, { type JsonValue } from "../components/JsonTreeView";
import { useProUsage, ProBanner, ProLimitNotice } from "../components/ProGate";
import { ToolFaq, jsonpathFaqs } from "../components/ToolFaq";
import Link from "next/link";

export default function JsonPathPage() {
  const { increment, isOverLimit, remaining, limit, isUnlocked } =
    useProUsage("jsonpath");
  const [jsonInput, setJsonInput] = useState("");
  const [pathExpr, setPathExpr] = useState("");
  const [results, setResults] = useState<JsonValue[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleQuery = useCallback(async () => {
    setError(null);
    setResults(null);

    if (isOverLimit) {
      setError("Free JSONPath runs used up. Upgrade to Pro to continue.");
      return;
    }

    if (!jsonInput.trim()) {
      setError("Paste JSON data");
      return;
    }
    if (!pathExpr.trim()) {
      setError("Enter a JSONPath expression");
      return;
    }

    let data: JsonValue;
    try {
      data = JSON.parse(jsonInput);
    } catch (e) {
      setError("Invalid JSON: " + (e instanceof Error ? e.message : ""));
      return;
    }

    try {
      const { JSONPath } = await import("jsonpath-plus");
      const result = JSONPath({ path: pathExpr, json: data });
      setResults(result as JsonValue[]);
      increment();
      if (result.length === 0) {
        setError("No matches found for: " + pathExpr);
      }
    } catch (e) {
      setError(
        "Invalid JSONPath expression: " +
          (e instanceof Error ? e.message : "")
      );
    }
  }, [jsonInput, pathExpr, increment, isOverLimit]);

  const handleSample = useCallback(() => {
    const sample = {
      store: {
        name: "Bookstore",
        books: [
          {
            title: "The Pragmatic Programmer",
            author: "David Thomas",
            price: 49.99,
            category: "software",
          },
          {
            title: "Designing Data-Intensive Applications",
            author: "Martin Kleppmann",
            price: 39.99,
            category: "software",
          },
          {
            title: "The Mythical Man-Month",
            author: "Fred Brooks",
            price: 29.99,
            category: "classic",
          },
        ],
      },
    };
    setJsonInput(JSON.stringify(sample, null, 2));
    setPathExpr("$.store.books[*].title");
    setResults(null);
    setError(null);
  }, []);

  const handleClear = useCallback(() => {
    setJsonInput("");
    setPathExpr("");
    setResults(null);
    setError(null);
  }, []);

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
              <Link href="/" className="text-xs text-zinc-500 hover:text-zinc-300 px-2 py-1 rounded transition-colors">Formatter</Link>
              <Link href="/diff" className="text-xs text-zinc-500 hover:text-zinc-300 px-2 py-1 rounded transition-colors">Diff</Link>
              <Link href="/jwt" className="text-xs text-zinc-500 hover:text-zinc-300 px-2 py-1 rounded transition-colors">JWT</Link>
              <span className="text-xs px-2 py-1 rounded bg-emerald-400/10 text-emerald-400 font-medium">JSONPath</span>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 pt-12 pb-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-3">
          JSONPath <span className="text-emerald-400">Query</span>
        </h1>
        <p className="text-sm text-zinc-500 max-w-xl mx-auto">
          Query JSON data with XPath-like expressions. Extract nested values,
          filter arrays, and slice data - all in your browser.
        </p>
      </section>

      {/* Tool */}
      <section className="max-w-6xl mx-auto px-4 pb-8">
        <ProBanner tool="JSONPath" />
        <ProLimitNotice
          tool="JSONPath"
          remaining={remaining}
          limit={limit}
          isUnlocked={isUnlocked}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left: Input + Path */}
          <div className="space-y-4">
            <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/50">
              <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800">
                <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">JSON Data</span>
                <div className="flex items-center gap-2">
                  <button onClick={handleSample} className="text-xs text-zinc-500 hover:text-zinc-300 px-2 py-1 rounded hover:bg-zinc-800 transition-colors">Sample</button>
                  <button onClick={handleClear} className="text-xs text-zinc-500 hover:text-zinc-300 px-2 py-1 rounded hover:bg-zinc-800 transition-colors">Clear</button>
                </div>
              </div>
              <textarea value={jsonInput} onChange={(e) => setJsonInput(e.target.value)} placeholder='{"store": {"books": [...]}}' spellCheck={false} className="w-full h-[260px] bg-transparent text-sm font-mono p-4 text-zinc-300 placeholder:text-zinc-600 focus:outline-none resize-none" />
            </div>
            <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/50">
              <div className="px-4 py-2 border-b border-zinc-800">
                <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">JSONPath Expression</span>
              </div>
              <div className="flex items-center">
                <input value={pathExpr} onChange={(e) => setPathExpr(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") handleQuery(); }} placeholder="$.store.books[*].title" spellCheck={false} className="flex-1 bg-transparent text-sm font-mono p-4 text-emerald-400 placeholder:text-zinc-600 focus:outline-none" />
                <button onClick={handleQuery} className="shrink-0 mr-3 px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-lg transition-colors text-sm">Query</button>
              </div>
            </div>
            {/* Quick reference */}
            <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/30 p-4">
              <p className="text-xs text-zinc-600 mb-2 uppercase tracking-wider">Quick Reference</p>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                {[
                  ["$.key", "Child key"],
                  ["$..key", "Deep scan"],
                  ["$[0]", "Array index"],
                  ["$[-1:]", "Last item"],
                  ["$[0:3]", "Slice 0-3"],
                  ['$[?(@.price<10)]', "Filter"],
                ].map(([expr, desc]) => (
                  <button key={expr} onClick={() => setPathExpr(expr)} className="text-left px-2 py-1 rounded hover:bg-zinc-800 transition-colors group">
                    <span className="text-emerald-400 group-hover:text-emerald-300">{expr}</span>
                    <span className="text-zinc-600 ml-2">{desc}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Results */}
          <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/50 flex flex-col">
            <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800">
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Results{results !== null ? ` (${results.length})` : ""}
              </span>
            </div>
            <div className="flex-1 min-h-[420px] overflow-auto">
              {error ? (
                <div className="p-4">
                  <div className={`flex items-start gap-3 p-3 rounded-lg border ${error.startsWith("No matches") ? "bg-amber-400/5 border-amber-400/20" : "bg-red-400/10 border-red-400/20"}`}>
                    <span className={error.startsWith("No matches") ? "text-amber-400 shrink-0 mt-0.5" : "text-red-400 shrink-0 mt-0.5"}>{error.startsWith("No matches") ? "~" : "!"}</span>
                    <p className="text-sm text-zinc-400 font-mono">{error}</p>
                  </div>
                </div>
              ) : results !== null && results.length > 0 ? (
                <div className="divide-y divide-zinc-800/50">
                  {results.map((item, i) => (
                    <div key={i} className="p-4">
                      <p className="text-[10px] text-zinc-600 mb-2 font-mono">[{i}]</p>
                      <JsonTreeView data={item} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-zinc-600 text-sm">
                  <div className="text-center">
                    <p className="text-3xl mb-3 font-mono text-zinc-800">$.</p>
                    <p>Paste JSON, enter a JSONPath, click Query</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Pro CTA */}
      <section className="max-w-4xl mx-auto px-4 py-12 border-t border-zinc-800/50 text-center">
        <span className="text-xs font-medium text-emerald-400/80 uppercase tracking-wider bg-emerald-400/10 px-3 py-1 rounded-full">Pro Feature</span>
        <h2 className="text-2xl font-bold mt-4 mb-2">Query anything in your JSON</h2>
        <p className="text-sm text-zinc-500 max-w-md mx-auto mb-6">JSONPath, Diff, JWT Decoder, and Schema Validator - $5/month. All client-side.</p>
        <Link href="/pricing" className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-xl transition-colors text-sm inline-flex">View Pricing</Link>
      </section>

      <ToolFaq toolName="SafeJSON JSONPath Query" toolDescription="SafeJSON JSONPath evaluates XPath-like queries against JSON data entirely in your browser. All query expressions and JSON data stay local with zero network requests." faqs={jsonpathFaqs} />
      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8 text-center text-xs text-zinc-600">
        <p>SafeJSON. All processing happens in your browser. We never see your data.</p>
      </footer>
    </div>
  );
}
