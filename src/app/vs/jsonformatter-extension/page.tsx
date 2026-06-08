import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "../../components/StructuredData";

export const metadata: Metadata = {
  title: "SafeJSON vs JSON Formatter Extension — Comparison 2026",
  description:
    "The original JSON Formatter Chrome extension (2M+ users) was sold, closed-sourced, and turned into adware. SafeJSON is open source with zero tracking.",
  openGraph: {
    title: "SafeJSON vs JSON Formatter Extension",
    description:
      "Compare SafeJSON with post-sale JSON Formatter extensions on open source code, tracking, ads, and local JSON processing.",
    url: "/vs/jsonformatter-extension",
  },
  alternates: {
    canonical: "/vs/jsonformatter-extension",
  },
};

export default function VsExtensionPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      <BreadcrumbSchema
        items={[
          { name: "SafeJSON", url: "https://safejson.vercel.app" },
          {
            name: "SafeJSON vs JSON Formatter Extension",
            url: "https://safejson.vercel.app/vs/jsonformatter-extension",
          },
        ]}
      />
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
          SafeJSON vs JSON Formatter Extension
        </h1>
        <p className="text-lg text-zinc-400 mb-8">
          The original JSON Formatter Chrome extension (2M+ users) was sold to a
          new owner in 2025, closed-sourced, and injected with adware and
          tracking scripts. SafeJSON is open source with zero tracking, zero
          ads, and zero data collection.
        </p>
        <div className="overflow-x-auto mb-12">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="text-left py-3 pr-4 text-zinc-400 font-medium w-1/3">Feature</th>
                <th className="text-left py-3 pr-4 text-emerald-400 font-medium">SafeJSON Extension</th>
                <th className="text-left py-3 text-zinc-500 font-medium">JSON Formatter Extension (post-sale)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {[
                ["Open source", "Yes. MIT license. Code on GitHub.", "No. Closed after sale."],
                ["Tracking", "None.", "Injected Give Freely tracking scripts, geolocation, checkout popups."],
                ["Data collection", "None. All processing local.", "Hardcoded MaxMind API key found. User data harvested."],
                ["User base at time of incident", "N/A (newer tool)", "2 million+ users affected by adware injection."],
                ["Processing", "100% client-side.", "Client-side but with injected third-party scripts."],
                ["Web tool integration", "Yes. Open in SafeJSON button links to full web tool.", "None."],
                ["Price", "Free.", "Free (but monetized via adware)."],
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
