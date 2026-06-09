import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "../../components/StructuredData";
import {
  ComparisonTable,
  RelatedComparisons,
  VerificationTutorial,
} from "../../components/ComparisonContent";

export const metadata: Metadata = {
  title: "SafeJSON vs JSON Formatter Extension - Open Source Alternative 2026",
  description:
    "Compare SafeJSON with the JSON Formatter Extension after the 2M-user adware incident. Open source code, zero tracking, no ads, and verifiable local JSON processing.",
  openGraph: {
    title: "SafeJSON vs JSON Formatter Extension",
    description:
      "SafeJSON is open source, ad-free, and verifiable. Compare it with post-sale JSON Formatter extensions.",
    url: "/vs/jsonformatter-extension",
  },
  alternates: {
    canonical: "/vs/jsonformatter-extension",
  },
};

const rows = [
  ["Feature", "SafeJSON", "JSON Formatter Extension (post-sale)"],
  ["Open source", "Yes. MIT license on GitHub.", "Closed after sale."],
  ["Tracking", "None.", "Injected third-party tracking and ad scripts."],
  ["Data collection", "None. Local processing.", "User data monetization concerns after ownership change."],
  ["User base at incident", "Newer tool.", "2M+ users affected by adware injection."],
  ["Verifiable privacy", "Yes. Open DevTools -> Network.", "Compromised by injected scripts."],
  ["Web tools", "Formatter, Viewer, Parser, Diff, JWT, JSONPath, Schema.", "Extension-focused viewer."],
  ["Ads", "None.", "Adware behavior reported."],
  ["Price", "Free core tools, $5/month Pro.", "Free but monetized through ads/tracking."],
];

export default function VsExtensionPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      <BreadcrumbSchema
        items={[
          { name: "SafeJSON", url: "https://www.safejson.dev" },
          {
            name: "SafeJSON vs JSON Formatter Extension",
            url: "https://www.safejson.dev/vs/jsonformatter-extension",
          },
        ]}
      />
      <header className="border-b border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold tracking-tight">
            <span className="text-emerald-400">{`{`}</span>SafeJSON
            <span className="text-emerald-400">{`}`}</span>
          </Link>
          <Link
            href="/compare"
            className="text-sm text-zinc-500 transition-colors hover:text-zinc-300"
          >
            Compare all
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold tracking-tight mb-4">
          SafeJSON vs JSON Formatter Extension
        </h1>
        <p className="text-lg text-zinc-400 mb-8">
          The original JSON Formatter Chrome extension reached 2M+ users before
          being sold, closed-sourced, and turned into adware. SafeJSON keeps the
          code open and the JSON processing local.
        </p>

        <section className="mb-12">
          <ComparisonTable rows={rows} />
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">
            Why ownership changes matter
          </h2>
          <p className="text-sm leading-relaxed text-zinc-400">
            Browser extensions can change owners, permissions, and bundled
            scripts. SafeJSON makes the web tool and extension source available
            for audit, avoids ads, and gives developers a simple Network tab
            verification workflow.
          </p>
        </section>

        <section className="mb-12">
          <VerificationTutorial />
        </section>

        <div className="mb-12 text-center">
          <Link
            href="/pricing"
            className="inline-flex px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-xl transition-colors text-sm"
          >
            Get SafeJSON Pro
          </Link>
        </div>

        <RelatedComparisons current="/vs/jsonformatter-extension" />
      </main>
    </div>
  );
}
