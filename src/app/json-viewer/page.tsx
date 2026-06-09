"use client";

import { useState, useCallback } from "react";
import JsonTreeView, { type JsonValue } from "../components/JsonTreeView";
import Link from "next/link";
import LocalProcessingNote from "../components/LocalProcessingNote";
import { useJsonWorker } from "../hooks/useJsonWorker";
import Footer from "../components/Footer";

const SAMPLE = {
  store: {
    name: "Acme Books",
    location: { city: "San Francisco", state: "CA", zip: "94105" },
    books: [
      { id: 1, title: "The Pragmatic Programmer", price: 49.99, inStock: true, tags: ["software", "classic"] },
      { id: 2, title: "Clean Code", price: 39.99, inStock: true, tags: ["software"] },
      { id: 3, title: "Designing Data-Intensive Applications", price: 44.99, inStock: false, tags: ["data", "architecture"] },
    ],
    metadata: { founded: 2019, employees: 42, rating: 4.7, verified: true },
  },
};

export default function JsonViewerPage() {
  const [input, setInput] = useState("");
  const [parsed, setParsed] = useState<JsonValue | null>(null);
  const [error, setError] = useState<string | null>(null);
  const {
    state: jsonWorker,
    run: runJsonWorker,
    reset: resetJsonWorker,
  } = useJsonWorker();

  const handleFormat = useCallback(() => {
    if (!input.trim()) { setError(null); setParsed(null); resetJsonWorker(); return; }
    setError(null);
    setParsed(null);
    runJsonWorker("parse", input);
  }, [input, resetJsonWorker, runJsonWorker]);

  const handleSample = useCallback(() => {
    const t = JSON.stringify(SAMPLE, null, 2);
    setInput(t); setParsed(SAMPLE); setError(null); resetJsonWorker();
  }, [resetJsonWorker]);

  const currentError = jsonWorker.error || error;
  const currentParsed = jsonWorker.result?.data ?? parsed;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      <header className="border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-6">
          <Link href="/" className="text-lg font-bold tracking-tight"><span className="text-emerald-400">{`{`}</span>SafeJSON<span className="text-emerald-400">{`}`}</span></Link>
          <nav className="flex items-center gap-1">
            <Link href="/" className="text-xs text-zinc-500 hover:text-zinc-300 px-2 py-1 rounded transition-colors">Formatter</Link>
            <Link href="/diff" className="text-xs text-zinc-500 hover:text-zinc-300 px-2 py-1 rounded transition-colors">Diff</Link>
            <Link href="/jwt" className="text-xs text-zinc-500 hover:text-zinc-300 px-2 py-1 rounded transition-colors">JWT</Link>
            <Link href="/json-beautifier" className="text-xs text-zinc-500 hover:text-zinc-300 px-2 py-1 rounded transition-colors">Beautifier</Link>
            <span className="text-xs px-2 py-1 rounded bg-emerald-400/10 text-emerald-400 font-medium">Viewer</span>
          </nav>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-4 pt-12 pb-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-3">JSON <span className="text-emerald-400">Viewer</span></h1>
        <p className="text-sm text-zinc-500 max-w-xl mx-auto">Explore and navigate JSON data with a collapsible tree view. Paste any JSON to see its structure. 100% client-side - your data never leaves your browser.</p>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/50">
            <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800">
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">JSON Input</span>
              <button onClick={handleSample} className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">Sample</button>
            </div>
            <LocalProcessingNote
              processing={jsonWorker.processing}
              sizeBytes={jsonWorker.sizeBytes}
            />
            <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder='Paste JSON to explore its structure...' spellCheck={false} className="w-full h-[300px] bg-transparent text-sm font-mono p-4 text-zinc-300 placeholder:text-zinc-600 focus:outline-none resize-none" />
            <div className="px-4 py-3 border-t border-zinc-800">
              <button onClick={handleFormat} className="px-6 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-lg transition-colors text-sm">View JSON</button>
            </div>
          </div>
          <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/50 flex flex-col">
            <div className="px-4 py-2 border-b border-zinc-800"><span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Tree View</span></div>
            <div className="flex-1 min-h-[360px] overflow-auto">
              {jsonWorker.processing ? (
                <div className="flex h-full items-center justify-center text-zinc-600 text-sm"><p>Parsing locally in your browser...</p></div>
              ) : currentError ? (
                <div className="p-4"><div className="flex items-start gap-3 p-3 rounded-lg bg-red-400/10 border border-red-400/20"><span className="text-red-400 shrink-0">!</span><p className="text-sm text-red-300/80 font-mono">{currentError}</p></div></div>
              ) : currentParsed ? (
                <JsonTreeView data={currentParsed} />
              ) : (
                <div className="flex items-center justify-center h-full text-zinc-600 text-sm"><div className="text-center"><p className="text-3xl mb-3 font-mono text-zinc-800">{`{ }`}</p><p>Paste JSON and click View JSON</p></div></div>
              )}
            </div>
          </div>
        </div>
        <div className="text-center mt-6">
          <Link href="/pricing" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">Need JSON Diff, JWT Decoder, or Schema Validator? Try SafeJSON Pro - $5/month</Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
