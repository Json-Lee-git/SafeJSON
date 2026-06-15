"use client";

import { useState, useCallback, useMemo } from "react";
import JsonTreeView, { type JsonValue } from "../components/JsonTreeView";
import { useProUsage, ProBanner, ProLimitNotice } from "../components/ProGate";
import { ToolFaq, jwtFaqs } from "../components/ToolFaq";
import Link from "next/link";

function decodeBase64Url(str: string): string {
  // Replace URL-safe chars and add padding
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4 !== 0) base64 += "=";
  try {
    return decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
  } catch {
    return atob(base64);
  }
}

type DecodedPart = {
  json: JsonValue;
  text: string;
};

const SAMPLE_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsZXggQ2hlbiIsImVtYWlsIjoiYWxleEBzYWZlanNvbi5kZXYiLCJpYXQiOjE3MTYyMzkwMjIsImV4cCI6MTcxNjMyNTQyMiwicm9sZSI6ImFkbWluIiwiZmVhdHVyZXMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl0sIm1ldGFkYXRhIjp7ImF1dGhfbWV0aG9kIjoicGFzc3dvcmQiLCJpcCI6IjE5Mi4xNjguMS4xIn19.hs8kLm3XpQwR7tYvN9bZ2cF5jK6aB1dE4gH0iA3oJ8";

export default function JwtPage() {
  const { increment, isOverLimit, remaining, limit, isUnlocked } =
    useProUsage("jwt");
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [header, setHeader] = useState<DecodedPart | null>(null);
  const [payload, setPayload] = useState<DecodedPart | null>(null);
  const [signature, setSignature] = useState("");
  const [activeTab, setActiveTab] = useState<"header" | "payload">("payload");

  const handleDecode = useCallback(() => {
    if (isOverLimit) {
      setError("Free JWT Decoder runs used up. Upgrade to Pro to continue.");
      setHeader(null);
      setPayload(null);
      setSignature("");
      return;
    }

    const trimmed = input.trim();
    if (!trimmed) {
      setError("Paste a JWT token to decode");
      setHeader(null);
      setPayload(null);
      setSignature("");
      return;
    }

    const parts = trimmed.split(".");
    if (parts.length !== 3) {
      setError(
        "Invalid JWT format. A JWT token has 3 parts separated by dots: header.payload.signature"
      );
      setHeader(null);
      setPayload(null);
      setSignature("");
      return;
    }

    try {
      const headerJson = JSON.parse(decodeBase64Url(parts[0]));
      setHeader({ json: headerJson, text: JSON.stringify(headerJson, null, 2) });
    } catch {
      setError("Failed to decode JWT header. The token may be malformed.");
      setHeader(null);
      setPayload(null);
      setSignature("");
      return;
    }

    try {
      const payloadJson = JSON.parse(decodeBase64Url(parts[1]));
      setPayload({
        json: payloadJson,
        text: JSON.stringify(payloadJson, null, 2),
      });
    } catch {
      setError("Failed to decode JWT payload. The token may be malformed.");
      setHeader(null);
      setPayload(null);
      setSignature("");
      return;
    }

    setSignature(parts[2]);
    setError(null);
    increment();
  }, [input, increment, isOverLimit]);

  const handleSample = useCallback(() => {
    setInput(SAMPLE_TOKEN);
    // Auto-decode
    const parts = SAMPLE_TOKEN.split(".");
    const headerJson = JSON.parse(decodeBase64Url(parts[0]));
    const payloadJson = JSON.parse(decodeBase64Url(parts[1]));
    setHeader({
      json: headerJson,
      text: JSON.stringify(headerJson, null, 2),
    });
    setPayload({
      json: payloadJson,
      text: JSON.stringify(payloadJson, null, 2),
    });
    setSignature(parts[2]);
    setError(null);
  }, []);

  const handleClear = useCallback(() => {
    setInput("");
    setError(null);
    setHeader(null);
    setPayload(null);
    setSignature("");
  }, []);

  const hasResult = header !== null && payload !== null;

  // Format signature for display
  const signatureDisplay = useMemo(() => {
    if (!signature) return "";
    // Truncate long signatures
    if (signature.length > 80) {
      return signature.slice(0, 40) + "..." + signature.slice(-20);
    }
    return signature;
  }, [signature]);

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
              <Link
                href="/"
                className="text-xs text-zinc-500 hover:text-zinc-300 px-2 py-1 rounded transition-colors"
              >
                Formatter
              </Link>
              <Link
                href="/json-diff"
                className="text-xs text-zinc-500 hover:text-zinc-300 px-2 py-1 rounded transition-colors"
              >
                Diff
              </Link>
              <span className="text-xs px-2 py-1 rounded bg-emerald-400/10 text-emerald-400 font-medium">JWT</span>
              <Link href="/jsonpath-query" className="text-xs text-zinc-500 hover:text-zinc-300 px-2 py-1 rounded transition-colors">JSONPath</Link>
              <Link href="/json-schema-validator" className="text-xs text-zinc-500 hover:text-zinc-300 px-2 py-1 rounded transition-colors">Schema</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Json-Lee-git/SafeJSON"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 pt-12 pb-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-3">
          JWT <span className="text-emerald-400">Decoder</span>
        </h1>
        <p className="text-sm text-zinc-500 max-w-xl mx-auto">
          Decode JWT tokens instantly in your browser. Header, payload, and
          signature are decoded client-side - your token never leaves your
          device.
        </p>
      </section>

      {/* Tool area */}
      <section className="max-w-6xl mx-auto px-4 pb-8">
        <ProBanner tool="JWT Decoder" />
        <ProLimitNotice
          tool="JWT Decoder"
          remaining={remaining}
          limit={limit}
          isUnlocked={isUnlocked}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Input */}
          <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/50">
            <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800">
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                JWT Token
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
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="eyJhbGciOiJIUzI1NiIs..."
              spellCheck={false}
              className="w-full h-[200px] bg-transparent text-sm font-mono p-4 text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-emerald-400/20 resize-none transition-colors"
            />
            <div className="px-4 py-3 border-t border-zinc-800">
              <button
                onClick={handleDecode}
                className="px-6 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-lg transition-colors text-sm"
              >
                Decode
              </button>
            </div>
          </div>

          {/* Output */}
          <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/50 flex flex-col">
            <div className="flex items-center border-b border-zinc-800">
              <button
                onClick={() => setActiveTab("payload")}
                className={`text-xs px-4 py-2.5 transition-colors ${
                  activeTab === "payload"
                    ? "bg-zinc-800 text-zinc-200 border-b border-emerald-400"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                Payload
              </button>
              <button
                onClick={() => setActiveTab("header")}
                className={`text-xs px-4 py-2.5 transition-colors ${
                  activeTab === "header"
                    ? "bg-zinc-800 text-zinc-200 border-b border-emerald-400"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                Header
              </button>
            </div>

            <div className="flex-1 min-h-[280px] overflow-auto">
              {error ? (
                <div className="p-4">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-red-400/10 border border-red-400/20">
                    <span className="text-red-400 shrink-0 mt-0.5">!</span>
                    <p className="text-sm text-red-300/80 font-mono">
                      {error}
                    </p>
                  </div>
                </div>
              ) : hasResult ? (
                <JsonTreeView
                  data={
                    activeTab === "payload" ? payload!.json : header!.json
                  }
                />
              ) : (
                <div className="flex items-center justify-center h-full text-zinc-600 text-sm">
                  <div className="text-center">
                    <p className="text-3xl mb-3 font-mono text-zinc-800">JWT</p>
                    <p>Paste a JWT token and click Decode</p>
                  </div>
                </div>
              )}
            </div>

            {/* Signature bar */}
            {hasResult && (
              <div className="px-4 py-2.5 border-t border-zinc-800 bg-zinc-900/50">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-600 shrink-0">
                    Signature
                  </span>
                  <code className="text-xs text-zinc-500 font-mono truncate">
                    {signatureDisplay}
                  </code>
                  <span className="text-[10px] text-zinc-700 ml-auto shrink-0">
                    Cannot be verified without secret
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* JWT Structure Guide */}
      <section className="max-w-4xl mx-auto px-4 py-12 border-t border-zinc-800/50">
        <h2 className="text-lg font-semibold mb-6 text-center text-zinc-400">
          How JWT works
        </h2>
        <div className="grid grid-cols-3 gap-4 text-center mb-12">
          <div className="p-4 rounded-xl border border-red-400/10 bg-red-400/5">
            <p className="text-xs text-red-400 font-medium mb-1">HEADER</p>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Algorithm &amp; token type. Base64URL-encoded JSON.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-emerald-400/10 bg-emerald-400/5">
            <p className="text-xs text-emerald-400 font-medium mb-1">PAYLOAD</p>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Claims and data. Not encrypted - anyone can decode it.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-zinc-700/50 bg-zinc-900/30">
            <p className="text-xs text-zinc-400 font-medium mb-1">SIGNATURE</p>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Verifies the token hasn&apos;t been tampered with.
            </p>
          </div>
        </div>

        {/* Pro CTA */}
        <div className="text-center">
          <span className="text-xs font-medium text-emerald-400/80 uppercase tracking-wider bg-emerald-400/10 px-3 py-1 rounded-full">
            Pro Feature
          </span>
          <h2 className="text-2xl font-bold mt-4 mb-2">
            Keep your tokens safe
          </h2>
          <p className="text-sm text-zinc-500 max-w-md mx-auto mb-6">
            JWT tokens contain sensitive data. SafeJSON Pro ensures your tokens
            never leave your browser - $5/month, cancel anytime.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link
              href="/pricing"
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-xl transition-colors text-sm"
            >
              View Pricing
            </Link>
            <Link
              href="/"
              className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              Back to Formatter
            </Link>
          </div>
        </div>
      </section>

      <ToolFaq toolName="SafeJSON JWT Decoder" toolDescription="SafeJSON JWT Decoder decodes JWT tokens entirely in your browser; the token is not uploaded. Header, payload, and signature are decoded locally." faqs={jwtFaqs} />
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
