"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import Footer from "../components/Footer";

const SAMPLE = '[{"name":"Alex","email":"alex@example.com","role":"admin"},{"name":"Sam","email":"sam@example.com","role":"editor"}]';

function jsonToCsv(json: unknown): string {
  if (!Array.isArray(json) || json.length === 0) return "";
  const keys = Object.keys(json[0] as Record<string, unknown>);
  const header = keys.join(",");
  const rows = (json as Record<string, unknown>[]).map((row) =>
    keys.map((k) => {
      const v = row[k];
      if (v === null || v === undefined) return "";
      const s = String(v);
      return s.includes(",") || s.includes('"') || s.includes("\n") ? `"${s.replace(/"/g, '""')}"` : s;
    }).join(",")
  );
  return header + "\n" + rows.join("\n");
}

export default function JsonToCsvPage() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  const { csv, error } = useMemo(() => {
    if (!input.trim()) return { csv: "", error: null };
    try {
      const data = JSON.parse(input);
      const result = jsonToCsv(data);
      if (!result) return { csv: "", error: "Paste a JSON array of objects (e.g. [{\"name\":\"...\"}])" };
      return { csv: result, error: null };
    } catch (e) {
      return { csv: "", error: e instanceof Error ? e.message : "Invalid JSON" };
    }
  }, [input]);

  const handleSample = useCallback(() => setInput(SAMPLE), []);
  const handleCopy = useCallback(async () => {
    if (!csv) return;
    await navigator.clipboard.writeText(csv);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  }, [csv]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      <header className="border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-6">
          <Link href="/" className="text-lg font-bold tracking-tight"><span className="text-emerald-400">{`{`}</span>SafeJSON<span className="text-emerald-400">{`}`}</span></Link>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-4 pt-12 pb-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-3">JSON to <span className="text-emerald-400">CSV</span></h1>
        <p className="text-sm text-zinc-500 max-w-xl mx-auto">Convert JSON arrays to CSV instantly. Paste JSON, get a downloadable CSV file. 100% client-side — your data never leaves your browser.</p>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/50">
            <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800">
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">JSON Array</span>
              <button onClick={handleSample} className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">Sample</button>
            </div>
            <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder='[{"name":"Alex","email":"alex@example.com"}]' spellCheck={false} className="w-full h-[360px] bg-transparent text-sm font-mono p-4 text-zinc-300 placeholder:text-zinc-600 focus:outline-none resize-none" />
          </div>
          <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/50 flex flex-col">
            <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800">
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">CSV Output</span>
              {csv && <div className="flex gap-2"><button onClick={handleCopy} className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">{copied ? "Copied!" : "Copy"}</button><button onClick={() => {const b=new Blob([csv],{type:"text/csv"});const u=URL.createObjectURL(b);const a=document.createElement("a");a.href=u;a.download="data.csv";a.click();URL.revokeObjectURL(u)}} className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">Download</button></div>}
            </div>
            <div className="flex-1 min-h-[360px] overflow-auto">
              {error ? (
                <div className="p-4"><div className="flex items-start gap-3 p-3 rounded-lg bg-red-400/10 border border-red-400/20"><span className="text-red-400 shrink-0">!</span><p className="text-sm text-red-300/80 font-mono">{error}</p></div></div>
              ) : csv ? (
                <pre className="p-4 text-sm font-mono text-emerald-400 whitespace-pre-wrap break-words">{csv}</pre>
              ) : (
                <div className="flex items-center justify-center h-full text-zinc-600 text-sm"><p>Paste a JSON array to convert it to CSV</p></div>
              )}
            </div>
          </div>
        </div>
        <div className="text-center mt-6">
          <Link href="/pricing" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">Need JSON Diff, JWT Decoder, or Schema Validator? Try SafeJSON Pro — $5/month</Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
