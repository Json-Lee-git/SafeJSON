"use client";

import { useState, useCallback } from "react";
import { useProUsage, ProBanner, ProLimitNotice } from "../components/ProGate";
import { ToolFaq, schemaFaqs } from "../components/ToolFaq";
import Link from "next/link";

type ValidationError = {
  path: string;
  message: string;
};

export default function SchemaPage() {
  const { increment, isOverLimit, remaining, limit, isUnlocked } =
    useProUsage("schema");
  const [jsonInput, setJsonInput] = useState("");
  const [schemaInput, setSchemaInput] = useState("");
  const [valid, setValid] = useState<boolean | null>(null);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [parseError, setParseError] = useState<string | null>(null);

  const handleValidate = useCallback(async () => {
    setParseError(null);
    setValid(null);
    setErrors([]);

    if (isOverLimit) {
      setParseError(
        "Free Schema Validator runs used up. Upgrade to Pro to continue."
      );
      return;
    }

    if (!jsonInput.trim()) {
      setParseError("Paste JSON data to validate");
      return;
    }
    if (!schemaInput.trim()) {
      setParseError("Paste a JSON Schema");
      return;
    }

    let data: unknown;
    let schema: Record<string, unknown> | boolean;

    try {
      data = JSON.parse(jsonInput);
    } catch (e) {
      setParseError(
        "Invalid JSON data: " + (e instanceof Error ? e.message : "")
      );
      return;
    }

    try {
      schema = JSON.parse(schemaInput);
    } catch (e) {
      setParseError(
        "Invalid JSON Schema: " + (e instanceof Error ? e.message : "")
      );
      return;
    }

    try {
      const Ajv = (await import("ajv")).default;
      const ajv = new Ajv({ allErrors: true, verbose: true });
      const validate = ajv.compile(schema);
      const result = validate(data);

      if (result) {
        setValid(true);
        setErrors([]);
      } else {
        setValid(false);
        setErrors(
          (validate.errors || []).map((e) => ({
            path: e.instancePath || "(root)",
            message: e.message || "Unknown error",
          }))
        );
      }
      increment();
    } catch (e) {
      setParseError(
        "Schema compilation error: " +
          (e instanceof Error ? e.message : "")
      );
    }
  }, [jsonInput, schemaInput, increment, isOverLimit]);

  const handleSample = useCallback(() => {
    const data = {
      name: "SafeJSON",
      version: "1.0.0",
      author: "Dev",
    };
    const schema = {
      type: "object",
      required: ["name", "version"],
      properties: {
        name: { type: "string" },
        version: { type: "string", pattern: "^\\d+\\.\\d+\\.\\d+$" },
        author: { type: "string" },
        license: { type: "string" },
      },
    };
    setJsonInput(JSON.stringify(data, null, 2));
    setSchemaInput(JSON.stringify(schema, null, 2));
    setValid(null);
    setErrors([]);
    setParseError(null);
  }, []);

  const handleClear = useCallback(() => {
    setJsonInput("");
    setSchemaInput("");
    setValid(null);
    setErrors([]);
    setParseError(null);
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
              <Link href="/json-diff" className="text-xs text-zinc-500 hover:text-zinc-300 px-2 py-1 rounded transition-colors">Diff</Link>
              <Link href="/jwt-decoder" className="text-xs text-zinc-500 hover:text-zinc-300 px-2 py-1 rounded transition-colors">JWT</Link>
              <Link href="/jsonpath-query" className="text-xs text-zinc-500 hover:text-zinc-300 px-2 py-1 rounded transition-colors">JSONPath</Link>
              <span className="text-xs px-2 py-1 rounded bg-emerald-400/10 text-emerald-400 font-medium">Schema</span>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 pt-12 pb-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-3">
          JSON Schema <span className="text-emerald-400">Validator</span>
        </h1>
        <p className="text-sm text-zinc-500 max-w-xl mx-auto">
          Validate JSON data against a JSON Schema. Catch missing fields, wrong
          types, and invalid patterns - all in your browser.
        </p>
      </section>

      {/* Tool */}
      <section className="max-w-6xl mx-auto px-4 pb-8">
        <ProBanner tool="Schema Validator" />
        <ProLimitNotice
          tool="Schema Validator"
          remaining={remaining}
          limit={limit}
          isUnlocked={isUnlocked}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          {/* JSON Data */}
          <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/50">
            <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800">
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">JSON Data</span>
              <div className="flex items-center gap-2">
                <button onClick={handleSample} className="text-xs text-zinc-500 hover:text-zinc-300 px-2 py-1 rounded hover:bg-zinc-800 transition-colors">Sample</button>
                <button onClick={handleClear} className="text-xs text-zinc-500 hover:text-zinc-300 px-2 py-1 rounded hover:bg-zinc-800 transition-colors">Clear</button>
              </div>
            </div>
            <textarea value={jsonInput} onChange={(e) => setJsonInput(e.target.value)} placeholder='{"name": "SafeJSON", "version": "1.0.0"}' spellCheck={false} className="w-full h-[260px] bg-transparent text-sm font-mono p-4 text-zinc-300 placeholder:text-zinc-600 focus:outline-none resize-none" />
          </div>
          {/* Schema */}
          <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/50">
            <div className="px-4 py-2 border-b border-zinc-800">
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">JSON Schema</span>
            </div>
            <textarea value={schemaInput} onChange={(e) => setSchemaInput(e.target.value)} placeholder='{"type": "object", "required": [...], "properties": {...}}' spellCheck={false} className="w-full h-[260px] bg-transparent text-sm font-mono p-4 text-zinc-300 placeholder:text-zinc-600 focus:outline-none resize-none" />
          </div>
        </div>

        {/* Validate button */}
        <div className="flex justify-center mb-4">
          <button onClick={handleValidate} className="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-xl transition-colors text-sm">Validate</button>
        </div>

        {/* Result */}
        <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/50">
          <div className="px-4 py-2 border-b border-zinc-800">
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Result</span>
          </div>
          <div className="min-h-[200px]">
            {parseError ? (
              <div className="p-4">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-red-400/10 border border-red-400/20">
                  <span className="text-red-400 shrink-0 mt-0.5">!</span>
                  <p className="text-sm text-red-300/80 font-mono">{parseError}</p>
                </div>
              </div>
            ) : valid === true ? (
              <div className="p-8 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 text-sm font-medium mb-3">
                  Valid
                </div>
                <p className="text-sm text-zinc-500">JSON data passes all schema constraints.</p>
              </div>
            ) : valid === false ? (
              <div className="p-4">
                <div className="flex items-center gap-2 mb-4 px-4 py-2 rounded-lg bg-red-400/10 border border-red-400/20">
                  <span className="text-red-400 text-sm font-medium">{errors.length} validation {errors.length === 1 ? "error" : "errors"}</span>
                </div>
                <div className="space-y-2">
                  {errors.map((e, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-zinc-900/50 border border-zinc-800">
                      <span className="text-xs text-zinc-600 font-mono shrink-0 mt-0.5 bg-zinc-800 px-1.5 py-0.5 rounded">{e.path}</span>
                      <span className="text-sm text-red-300/80 font-mono">{e.message}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[200px] text-zinc-600 text-sm">
                <div className="text-center">
                  <p className="text-3xl mb-3 font-mono text-zinc-800">{`{ }`}</p>
                  <p>Paste JSON data and a Schema, then click Validate</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Pro CTA */}
      <section className="max-w-4xl mx-auto px-4 py-12 border-t border-zinc-800/50 text-center">
        <span className="text-xs font-medium text-emerald-400/80 uppercase tracking-wider bg-emerald-400/10 px-3 py-1 rounded-full">Pro Feature</span>
        <h2 className="text-2xl font-bold mt-4 mb-2">Validate anything</h2>
        <p className="text-sm text-zinc-500 max-w-md mx-auto mb-6">JSON Schema Validator, JSONPath, Diff, and JWT Decoder - $5/month. All client-side.</p>
        <Link href="/pricing" className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-xl transition-colors text-sm inline-flex">View Pricing</Link>
      </section>

      <ToolFaq toolName="SafeJSON Schema Validator" toolDescription="SafeJSON Schema Validator validates JSON against JSON Schema locally in your browser. It supports draft-04 through 2020-12. Your JSON and schema never leave your device." faqs={schemaFaqs} />
      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8 text-center text-xs text-zinc-600">
        <p>SafeJSON. No pasted-content upload for core tools.</p>
      </footer>
    </div>
  );
}
