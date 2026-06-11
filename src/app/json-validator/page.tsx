"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Footer from "../components/Footer";

export default function JsonValidatorPage() {
  const [input, setInput] = useState("");

  const { error, valid } = useMemo(() => {
    if (!input.trim()) return { error: null, valid: null };
    try {
      JSON.parse(input);
      return { error: null, valid: true };
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Invalid JSON";
      const match = msg.match(/at position (\d+)/);
      if (match) {
        const pos = parseInt(match[1], 10);
        const lines = input.slice(0, pos).split("\n");
        const line = lines.length;
        const column = lines[lines.length - 1].length + 1;
        return { error: `Line ${line}, Column ${column}: ${msg}`, valid: false };
      }
      return { error: msg, valid: false };
    }
  }, [input]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      <header className="border-b border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center">
          <Link href="/" className="text-lg font-bold tracking-tight"><span className="text-emerald-400">{`{`}</span>SafeJSON<span className="text-emerald-400">{`}`}</span></Link>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-4 pt-12 pb-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-3">JSON <span className="text-emerald-400">Validator</span></h1>
        <p className="text-sm text-zinc-500 max-w-xl mx-auto">Validate JSON with line and column error reporting. Paste JSON to check syntax, find missing commas, and fix malformed data. 100% client-side — your data never leaves your browser.</p>
      </section>

      <section className="max-w-4xl mx-auto px-4 pb-8">
        <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/50">
          <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800">
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">JSON Input</span>
          </div>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder='Paste JSON to validate...' spellCheck={false} className="w-full h-[360px] bg-transparent text-sm font-mono p-4 text-zinc-300 placeholder:text-zinc-600 focus:outline-none resize-none" />
        </div>

        <div className="mt-4">
          {valid === true && (
            <div className="flex items-center gap-2 p-4 rounded-xl bg-emerald-400/5 border border-emerald-400/20">
              <span className="text-emerald-400 text-sm font-medium">Valid JSON</span>
            </div>
          )}
          {error && (
            <div className="flex items-start gap-3 p-4 rounded-xl bg-red-400/5 border border-red-400/20">
              <span className="text-red-400 shrink-0 mt-0.5">!</span>
              <div><p className="text-sm font-medium text-red-400">Invalid JSON</p><p className="text-sm text-red-300/70 mt-1 font-mono">{error}</p></div>
            </div>
          )}
          {!input.trim() && (
            <div className="flex items-center justify-center py-16 text-zinc-600 text-sm"><div className="text-center"><p className="text-4xl mb-3 font-mono text-zinc-800">{`{ }`}</p><p>Paste JSON to validate it</p></div></div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}
