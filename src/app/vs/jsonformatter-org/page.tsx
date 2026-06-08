import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SafeJSON vs jsonformatter.org — Comparison 2026",
  description:
    "SafeJSON processes JSON 100% client-side. jsonformatter.org processes server-side and leaked 80,000+ credentials in 2025. Compare features, privacy, and pricing.",
  alternates: {
    canonical: "/vs/jsonformatter-org",
  },
};

export default function VsJsonFormatterPage() {
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
          SafeJSON vs jsonformatter.org
        </h1>
        <p className="text-lg text-zinc-400 mb-8">
          SafeJSON is the only major JSON formatter that processes data entirely
          in your browser. jsonformatter.org was caught leaking over 80,000
          credentials in November 2025.
        </p>

        <div className="overflow-x-auto mb-12">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="text-left py-3 pr-4 text-zinc-400 font-medium w-1/3">Feature</th>
                <th className="text-left py-3 pr-4 text-emerald-400 font-medium">SafeJSON</th>
                <th className="text-left py-3 text-zinc-500 font-medium">jsonformatter.org</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {[
                ["Processing", "Client-side. Your data never leaves your browser.", "Server-side. Data transmitted to remote servers."],
                ["Privacy", "Zero data collection. Verified via DevTools Network tab.", "Data stored on servers. Accessible via Recent Links feature."],
                ["Data breach history", "None. No server to breach.", "80,000+ credentials leaked (November 2025). AWS keys, GitHub tokens, banking data exposed."],
                ["Open source", "Yes. MIT license. Code on GitHub.", "No. Closed source."],
                ["Ads", "None.", "Multiple ad placements."],
                ["Tracking", "None. No analytics scripts.", "Multiple tracking scripts."],
                ["JSON Diff", "Yes (Pro). Color-coded, side-by-side.", "Not available."],
                ["JWT Decoder", "Yes (Pro). Client-side.", "Not available."],
                ["JSONPath", "Yes (Pro).", "Not available."],
                ["Schema Validator", "Yes (Pro).", "Not available."],
                ["Price", "Free (core). $5/month (Pro).", "Free (ad-supported)."],
                ["Verifiable privacy claim", "Yes. Open DevTools, see zero network requests.", "Cannot be verified."],
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

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">
            What happened at jsonformatter.org
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-3">
            In November 2025, security researchers at watchTowr discovered that
            jsonformatter.org and codebeautify.org had an unprotected
            &quot;Recent Links&quot; feature. This feature publicly displayed
            saved code snippets without any authentication.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-3">
            Over 80,000 user-submitted code snippets were exposed, containing
            Active Directory credentials, AWS access keys, GitHub personal
            access tokens, database passwords, and banking PII. The data had
            been accumulating for over five years.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            The researchers planted canary tokens to test whether attackers were
            actively scraping the data. The canaries were triggered within 48
            hours, confirming that malicious actors were harvesting credentials
            from the site.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">
            Why SafeJSON is different
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-3">
            SafeJSON processes all data in your browser using client-side
            JavaScript. There is no server to leak from because there is no
            server processing your data. You can verify this claim: open
            DevTools, go to the Network tab, and paste any JSON into SafeJSON.
            You will see zero new network requests.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            SafeJSON is also open source under the MIT license. Every line of
            code is available on GitHub. You do not need to trust claims — you
            can audit the implementation yourself.
          </p>
        </section>

        <div className="flex items-center justify-center gap-4 mb-6">
          <Link href="/blog/safest-json-formatter" className="text-sm text-zinc-500 hover:text-emerald-400 transition-colors">Read: Safest JSON formatters compared</Link>
          <Link href="/pricing" className="text-sm text-zinc-500 hover:text-emerald-400 transition-colors">SafeJSON Pro pricing</Link>
        </div>
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-xl transition-colors text-sm"
          >
            Try SafeJSON
          </Link>
        </div>
      </main>
    </div>
  );
}
