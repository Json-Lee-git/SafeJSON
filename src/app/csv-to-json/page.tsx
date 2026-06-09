"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import Footer from "../components/Footer";

const SAMPLE = "name,email,role\nAlex,alex@example.com,admin\nSam,sam@example.com,editor";

function csvToJson(csv: string): string {
  const lines = csv.trim().split("\n");
  if (lines.length < 2) throw new Error("CSV must have at least a header row and one data row");
  const headers = parseLine(lines[0]);
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const values = parseLine(lines[i]);
    const row: Record<string, string> = {};
    headers.forEach((h, j) => { row[h] = values[j] || ""; });
    rows.push(row);
  }
  return JSON.stringify(rows, null, 2);
}

function parseLine(line: string): string[] {
  const result: string[] = [];
  let current = "", inQuotes = false;
  for (const ch of line) {
    if (inQuotes) {
      if (ch === '"') { inQuotes = false; continue; }
      current += ch;
    } else {
      if (ch === '"') { inQuotes = true; continue; }
      if (ch === ",") { result.push(current.trim()); current = ""; continue; }
      current += ch;
    }
  }
  result.push(current.trim());
  return result;
}

export default function CsvToJsonPage() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  const { json, error } = useMemo(() => {
    if (!input.trim()) return { json: "", error: null };
    try { return { json: csvToJson(input), error: null }; }
    catch (e) { return { json: "", error: e instanceof Error ? e.message : "Invalid CSV" }; }
  }, [input]);

  const handleSample = useCallback(() => setInput(SAMPLE), []);
  const handleCopy = useCallback(async () => {
    if (!json) return; await navigator.clipboard.writeText(json);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  }, [json]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      <header className="border-b border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center">
          <Link href="/" className="text-lg font-bold tracking-tight"><span className="text-emerald-400">{`{`}</span>SafeJSON<span className="text-emerald-400">{`}`}</span></Link>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-4 pt-12 pb-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-3">CSV to <span className="text-emerald-400">JSON</span></h1>
        <p className="text-sm text-zinc-500 max-w-xl mx-auto">Convert CSV data to JSON instantly. Paste CSV, get formatted JSON output. 100% client-side — your data never leaves your browser.</p>
      </section>

      <section className="max-w-4xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/50">
            <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800">
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">CSV Input</span>
              <button onClick={handleSample} className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">Sample</button>
            </div>
            <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="name,email,role" spellCheck={false} className="w-full h-[360px] bg-transparent text-sm font-mono p-4 text-zinc-300 placeholder:text-zinc-600 focus:outline-none resize-none" />
          </div>
          <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/50 flex flex-col">
            <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800">
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">JSON Output</span>
              {json && <div className="flex gap-2"><button onClick={handleCopy} className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">{copied ? "Copied!" : "Copy"}</button><button onClick={() => {const b=new Blob([json],{type:"application/json"});const u=URL.createObjectURL(b);const a=document.createElement("a");a.href=u;a.download="data.json";a.click();URL.revokeObjectURL(u)}} className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">Download</button></div>}
            </div>
            <div className="flex-1 min-h-[360px] overflow-auto">
              {error ? (
                <div className="p-4"><div className="flex items-start gap-3 p-3 rounded-lg bg-red-400/10 border border-red-400/20"><span className="text-red-400 shrink-0">!</span><p className="text-sm text-red-300/80 font-mono">{error}</p></div></div>
              ) : json ? (
                <pre className="p-4 text-sm font-mono text-emerald-400 whitespace-pre-wrap break-words">{json}</pre>
              ) : (
                <div className="flex items-center justify-center h-full text-zinc-600 text-sm"><p>Paste CSV data to convert it to JSON</p></div>
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
