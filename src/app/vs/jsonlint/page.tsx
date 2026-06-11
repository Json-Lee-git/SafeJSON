import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../../components/Footer";
import { BreadcrumbSchema } from "../../components/StructuredData";
import { RelatedComparisons } from "../../components/ComparisonContent";

export const metadata: Metadata = {
  title: "SafeJSON vs JSONLint — JSON Validator Comparison | SafeJSON",
  description: "SafeJSON validates JSON 100% client-side with zero data upload. JSONLint processes on servers. Compare features, privacy, and security.",
  alternates: { canonical: "/vs/jsonlint" },
};

export default function VsJsonLintPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      <BreadcrumbSchema items={[{ name: "SafeJSON", url: "https://www.safejson.dev" },{ name: "vs JSONLint", url: "https://www.safejson.dev/vs/jsonlint" }]} />
      <header className="border-b border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center"><Link href="/" className="text-lg font-bold tracking-tight"><span className="text-emerald-400">{`{`}</span>SafeJSON<span className="text-emerald-400">{`}`}</span></Link></div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold tracking-tight mb-4">SafeJSON vs JSONLint</h1>
        <p className="text-lg text-zinc-400 mb-8">SafeJSON validates JSON entirely in your browser. JSONLint processes on its server — your data makes a round trip. Here is the comparison.</p>
        <div className="overflow-x-auto mb-12">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-zinc-800"><th className="text-left py-3 pr-4 text-zinc-400 font-medium w-1/3">Feature</th><th className="text-left py-3 pr-4 text-emerald-400 font-medium">SafeJSON</th><th className="text-left py-3 text-zinc-500 font-medium">JSONLint</th></tr></thead>
            <tbody className="divide-y divide-zinc-800/50">
              {[["Processing","100% client-side, no server upload","Server-side, data transmitted for validation"],["Privacy verifiable","Yes — open DevTools, zero network requests","No — data leaves your browser"],["Error reporting","Line and column numbers","Error message only"],["Open source","Yes (MIT)","No"],["Ads","None","Yes"],["Extra tools","Diff, JWT, JSONPath, Schema, CSV conversion","None"],["Price","Free / $5 Pro","Free (ad-supported)"]].map(([f,s,j],i)=><tr key={i} className="hover:bg-white/[0.02]"><td className="py-3 pr-4 text-zinc-300 font-medium">{f}</td><td className="py-3 pr-4 text-zinc-400">{s}</td><td className="py-3 text-zinc-500">{j}</td></tr>)}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-zinc-500 mb-4">JSONLint is a useful tool, but it processes JSON server-side. If you paste sensitive data — API keys, tokens, customer PII — it leaves your browser. SafeJSON keeps everything local.</p>
        <RelatedComparisons current="/vs/jsonlint" />
        <div className="text-center mt-8"><Link href="/" className="inline-flex px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-xl transition-colors text-sm">Try SafeJSON</Link></div>
      </main>
      <Footer />
    </div>
  );
}
