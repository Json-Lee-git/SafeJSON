"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import LocalProcessingNote from "../components/LocalProcessingNote";
import { useJsonWorker } from "../hooks/useJsonWorker";
import Footer from "../components/Footer";

const SAMPLE = '{"store":{"name":"Acme Books","books":[{"id":1,"title":"The Pragmatic Programmer","price":49.99,"inStock":true},{"id":2,"title":"Clean Code","price":39.99,"inStock":true}]}}';

export default function JsonBeautifierPage() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);
  const {
    state: jsonWorker,
    run: runJsonWorker,
    reset: resetJsonWorker,
  } = useJsonWorker();

  const output = jsonWorker.result?.formatted || "";
  const error = jsonWorker.error;

  const handleSample = useCallback(() => {
    setInput(SAMPLE);
    runJsonWorker("format", SAMPLE);
  }, [runJsonWorker]);

  const handleInputChange = useCallback(
    (value: string) => {
      setInput(value);
      if (!value.trim()) {
        resetJsonWorker();
        return;
      }
      runJsonWorker("format", value);
    },
    [resetJsonWorker, runJsonWorker]
  );

  const handleCopy = useCallback(async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  }, [output]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      <header className="border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-6">
          <Link href="/" className="text-lg font-bold tracking-tight"><span className="text-emerald-400">{`{`}</span>SafeJSON<span className="text-emerald-400">{`}`}</span></Link>
          <nav className="flex items-center gap-1">
            <Link href="/" className="text-xs text-zinc-500 hover:text-zinc-300 px-2 py-1 rounded transition-colors">Formatter</Link>
            <Link href="/json-diff" className="text-xs text-zinc-500 hover:text-zinc-300 px-2 py-1 rounded transition-colors">Diff</Link>
            <Link href="/jwt-decoder" className="text-xs text-zinc-500 hover:text-zinc-300 px-2 py-1 rounded transition-colors">JWT</Link>
            <Link href="/json-viewer" className="text-xs text-zinc-500 hover:text-zinc-300 px-2 py-1 rounded transition-colors">Viewer</Link>
            <span className="text-xs px-2 py-1 rounded bg-emerald-400/10 text-emerald-400 font-medium">Beautifier</span>
          </nav>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-4 pt-12 pb-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-3">JSON <span className="text-emerald-400">Beautifier</span></h1>
        <p className="text-sm text-zinc-500 max-w-xl mx-auto">Beautify minified JSON instantly. Paste compressed JSON and get a clean, readable, properly indented output. 100% client-side - your data never leaves your browser.</p>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/50">
            <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800">
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Minified JSON</span>
              <button onClick={handleSample} className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">Sample</button>
            </div>
            <LocalProcessingNote
              processing={jsonWorker.processing}
              sizeBytes={jsonWorker.sizeBytes}
            />
            <textarea value={input} onChange={(e) => handleInputChange(e.target.value)} placeholder='{"name":"SafeJSON","version":"1.0"}' spellCheck={false} className="w-full h-[360px] bg-transparent text-sm font-mono p-4 text-zinc-300 placeholder:text-zinc-600 focus:outline-none resize-none" />
          </div>
          <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/50 flex flex-col">
            <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800">
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Beautified JSON</span>
              {output && <button onClick={handleCopy} className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">{copied ? "Copied!" : "Copy"}</button>}
            </div>
            <div className="flex-1 min-h-[360px] overflow-auto">
              {jsonWorker.processing ? (
                <div className="flex h-full items-center justify-center text-zinc-600 text-sm"><p>Parsing locally in your browser...</p></div>
              ) : error ? (
                <div className="p-4"><div className="flex items-start gap-3 p-3 rounded-lg bg-red-400/10 border border-red-400/20"><span className="text-red-400 shrink-0">!</span><p className="text-sm text-red-300/80 font-mono">{error}</p></div></div>
              ) : output ? (
                <pre
                  className="p-4 text-sm font-mono text-emerald-400 whitespace-pre-wrap break-words"
                  dangerouslySetInnerHTML={{ __html: highlight(output) }}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-zinc-600 text-sm"><p>Paste minified JSON to beautify it</p></div>
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

function highlight(text: string) {
  return text
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .split("\n")
    .map((line) => {
      let h = line;
      h = h.replace(/^(\s*)("(?:[^"\\]|\\.)*")(\s*:)/gm, '$1<span class="text-purple-400">$2</span>$3');
      h = h.replace(/(:\s*)("(?:[^"\\]|\\.)*")/g, '$1<span class="text-emerald-400">$2</span>');
      h = h.replace(/(:\s*)(-?\d+\.?\d*)/g, '$1<span class="text-amber-400">$2</span>');
      h = h.replace(/(:\s*)(true|false)/g, '$1<span class="text-cyan-400">$2</span>');
      h = h.replace(/(:\s*)(null)/g, '$1<span class="text-zinc-500">$2</span>');
      return `<div>${h}</div>`;
    })
    .join("");
}
