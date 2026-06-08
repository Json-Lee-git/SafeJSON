import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SafeJSON vs codebeautify.org — Comparison 2026",
  description:
    "SafeJSON processes everything client-side. codebeautify.org is server-side and was part of the 2025 credential leak affecting 80,000+ users. Compare features and privacy.",
  alternates: {
    canonical: "/vs/codebeautify",
  },
};

export default function VsCodeBeautifyPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      <header className="border-b border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center">
          <Link href="/" className="text-lg font-bold tracking-tight">
            <span className="text-emerald-400">{`{`}</span>SafeJSON
            <span className="text-emerald-400">{`}`}</span>
          </Link>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold tracking-tight mb-4">
          SafeJSON vs codebeautify.org
        </h1>
        <p className="text-lg text-zinc-400 mb-8">
          codebeautify.org was part of the same November 2025 credential leak
          that exposed 80,000+ user data entries. SafeJSON eliminates the risk
          by processing everything client-side.
        </p>
        <div className="overflow-x-auto mb-12">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="text-left py-3 pr-4 text-zinc-400 font-medium w-1/3">Feature</th>
                <th className="text-left py-3 pr-4 text-emerald-400 font-medium">SafeJSON</th>
                <th className="text-left py-3 text-zinc-500 font-medium">codebeautify.org</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {[
                ["Processing", "Client-side. No data transmission.", "Server-side. Data sent to remote servers."],
                ["Data breach history", "None.", "80,000+ credentials leaked (Nov 2025). Same breach as jsonformatter.org."],
                ["Open source", "Yes. MIT license.", "No."],
                ["Ads", "None.", "Heavy ad placements including misleading download buttons."],
                ["Tools", "JSON Formatter, Diff, JWT, JSONPath, Schema.", "Multiple formatters (HTML, CSS, JS, JSON, SQL, XML)."],
                ["JWT Decoder", "Yes (Pro). Client-side.", "Not available."],
                ["JSON Diff", "Yes (Pro).", "Not available."],
                ["Price", "Free (core). $5/month (Pro).", "Free (ad-supported)."],
              ].map(([feature, safejson, competitor]) => (
                <tr key={feature} className="hover:bg-white/[0.02]">
                  <td className="py-3 pr-4 text-zinc-300 font-medium">{feature}</td>
                  <td className="py-3 pr-4 text-zinc-400">{safejson}</td>
                  <td className="py-3 text-zinc-500">{competitor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-center">
          <Link href="/" className="inline-flex px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-xl transition-colors text-sm">Try SafeJSON</Link>
        </div>
      </main>
    </div>
  );
}
