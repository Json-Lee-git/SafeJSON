"use client";

import { useState, useCallback, useMemo } from "react";
import JsonTreeView, { type JsonValue } from "../components/JsonTreeView";
import Link from "next/link";
import LocalProcessingNote from "../components/LocalProcessingNote";
import { useJsonWorker } from "../hooks/useJsonWorker";
import Footer from "../components/Footer";

const SAMPLE = '{"user":{"id":"usr_01","name":"Alex","email":"alex@example.com","active":true,"score":42,"meta":null},"items":[{"sku":"A1","qty":3,"price":9.99},{"sku":"B2","qty":1,"price":24.99}]}';

type TypeInfo = { key: string; type: string; path: string };

function getTypeInfo(obj: JsonValue, prefix = "$"): TypeInfo[] {
  if (obj === null) return [{ key: "(root)", type: "null", path: prefix }];
  if (typeof obj !== "object") return [{ key: "(root)", type: typeof obj, path: prefix }];
  if (Array.isArray(obj)) {
    const results: TypeInfo[] = [{ key: "(root)", type: `array[${obj.length}]`, path: prefix }];
    obj.forEach((item, i) => {
      results.push(...getTypeInfo(item, `${prefix}[${i}]`));
    });
    return results;
  }
  const results: TypeInfo[] = [{ key: "(root)", type: `object{${Object.keys(obj).length}}`, path: prefix }];
  for (const [k, v] of Object.entries(obj)) {
    if (v === null) results.push({ key: k, type: "null", path: `${prefix}.${k}` });
    else if (Array.isArray(v)) results.push({ key: k, type: `array[${v.length}]`, path: `${prefix}.${k}` });
    else if (typeof v === "object") results.push({ key: k, type: `object{${Object.keys(v).length}}`, path: `${prefix}.${k}` });
    else results.push({ key: k, type: typeof v, path: `${prefix}.${k}` });
  }
  return results;
}

export default function JsonParserPage() {
  const [input, setInput] = useState("");
  const [parsed, setParsed] = useState<JsonValue | null>(null);
  const [error, setError] = useState<string | null>(null);
  const {
    state: jsonWorker,
    run: runJsonWorker,
    reset: resetJsonWorker,
  } = useJsonWorker();

  const handleParse = useCallback(() => {
    if (!input.trim()) { setError(null); setParsed(null); resetJsonWorker(); return; }
    setError(null);
    setParsed(null);
    runJsonWorker("parse", input);
  }, [input, resetJsonWorker, runJsonWorker]);

  const handleSample = useCallback(() => {
    const t = JSON.stringify(JSON.parse(SAMPLE), null, 2);
    setInput(t); setParsed(JSON.parse(SAMPLE)); setError(null); resetJsonWorker();
  }, [resetJsonWorker]);

  const currentError = jsonWorker.error || error;
  const currentParsed = jsonWorker.result?.data ?? parsed;
  const typeInfo = useMemo(() => currentParsed ? getTypeInfo(currentParsed) : [], [currentParsed]);

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
            <Link href="/json-beautifier" className="text-xs text-zinc-500 hover:text-zinc-300 px-2 py-1 rounded transition-colors">Beautifier</Link>
            <span className="text-xs px-2 py-1 rounded bg-emerald-400/10 text-emerald-400 font-medium">Parser</span>
          </nav>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-4 pt-12 pb-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-3">JSON <span className="text-emerald-400">Parser</span></h1>
        <p className="text-sm text-zinc-500 max-w-xl mx-auto">Parse JSON and inspect every field with its data type and path. See the full structure of your JSON at a glance. 100% client-side - your data never leaves your browser.</p>
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
            <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder='Paste JSON to parse...' spellCheck={false} className="w-full h-[300px] bg-transparent text-sm font-mono p-4 text-zinc-300 placeholder:text-zinc-600 focus:outline-none resize-none" />
            <div className="px-4 py-3 border-t border-zinc-800">
              <button onClick={handleParse} className="px-6 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-lg transition-colors text-sm">Parse JSON</button>
            </div>
          </div>
          <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/50 flex flex-col">
            <div className="px-4 py-2 border-b border-zinc-800"><span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Parsed Structure{typeInfo.length > 0 ? ` (${typeInfo.length} fields)` : ""}</span></div>
            <div className="flex-1 min-h-[360px] overflow-auto">
              {jsonWorker.processing ? (
                <div className="flex h-full items-center justify-center text-zinc-600 text-sm"><p>Parsing locally in your browser...</p></div>
              ) : currentError ? (
                <div className="p-4"><div className="flex items-start gap-3 p-3 rounded-lg bg-red-400/10 border border-red-400/20"><span className="text-red-400 shrink-0">!</span><p className="text-sm text-red-300/80 font-mono">{currentError}</p></div></div>
              ) : currentParsed ? (
                <div className="p-4">
                  <div className="mb-4"><p className="text-xs text-zinc-500 mb-2">Type Overview</p>
                    <table className="w-full text-xs font-mono">
                      <thead><tr className="border-b border-zinc-800"><th className="text-left py-2 text-zinc-500 font-medium">Key</th><th className="text-left py-2 text-zinc-500 font-medium">Type</th><th className="text-left py-2 text-zinc-500 font-medium">Path</th></tr></thead>
                      <tbody className="divide-y divide-zinc-800/50">
                        {typeInfo.map((t, i) => (
                          <tr key={i} className="hover:bg-white/[0.02]">
                            <td className="py-1.5 pr-3 text-purple-400">{t.key}</td>
                            <td className={`py-1.5 pr-3 ${t.type.startsWith("array") ? "text-amber-400" : t.type.startsWith("object") ? "text-cyan-400" : t.type === "null" ? "text-zinc-600" : t.type === "string" ? "text-emerald-400" : t.type === "number" ? "text-amber-400" : "text-cyan-400"}`}>{t.type}</td>
                            <td className="py-1.5 text-zinc-600">{t.path}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-zinc-600 mt-4">Tree View</p>
                  <div className="mt-2 border border-zinc-800 rounded-lg bg-zinc-900/30"><JsonTreeView data={currentParsed} /></div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-zinc-600 text-sm"><div className="text-center"><p className="text-3xl mb-3 font-mono text-zinc-800">{`{ }`}</p><p>Paste JSON and click Parse JSON</p></div></div>
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
