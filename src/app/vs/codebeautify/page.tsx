import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "../../components/StructuredData";
import Footer from "../../components/Footer";
import {
  ComparisonTable,
  RelatedComparisons,
  VerificationTutorial,
} from "../../components/ComparisonContent";

export const metadata: Metadata = {
  title: "SafeJSON vs codebeautify.org - Client-side JSON Tools 2026",
  description:
    "Compare SafeJSON and codebeautify.org on privacy, client-side JSON processing, the 2025 credential leak, ads, JSON Diff, JWT, JSONPath, Schema, and pricing.",
  openGraph: {
    title: "SafeJSON vs codebeautify.org",
    description:
      "SafeJSON processes JSON locally in your browser. Compare it with codebeautify.org.",
    url: "/vs/codebeautify",
  },
  alternates: {
    canonical: "/vs/codebeautify",
  },
};

const rows = [
  ["Feature", "SafeJSON", "codebeautify.org"],
  ["Processing", "Client-side. No data transmission during JSON work.", "Server-side workflow."],
  ["Verifiable privacy", "Yes. Check DevTools -> Network.", "No clear zero-request verification path."],
  ["Data breach history", "None.", "Part of the November 2025 80K+ credential exposure."],
  ["Open source", "Yes. MIT license.", "No."],
  ["Ads", "None.", "Heavy ad placements."],
  ["JSON Diff", "Yes (Pro).", "No focused JSON Diff workflow."],
  ["JWT Decoder", "Yes (Pro).", "Not a privacy-verifiable JWT workflow."],
  ["JSONPath", "Yes (Pro).", "No."],
  ["Schema Validator", "Yes (Pro).", "Limited."],
  ["Large files", "50MB+ local handling.", "Limited by upload and browser/server workflow."],
  ["Price", "Free core tools, $5/month Pro.", "Free with ads."],
];

export default function VsCodeBeautifyPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      <BreadcrumbSchema
        items={[
          { name: "SafeJSON", url: "https://www.safejson.dev" },
          {
            name: "SafeJSON vs codebeautify.org",
            url: "https://www.safejson.dev/vs/codebeautify",
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
          SafeJSON vs codebeautify.org
        </h1>
        <p className="text-lg text-zinc-400 mb-8">
          codebeautify.org was part of the same November 2025 credential leak
          that exposed 80K+ snippets. SafeJSON removes that failure mode by
          processing JSON locally in your browser.
        </p>

        <section className="mb-12">
          <ComparisonTable rows={rows} />
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">
            The codebeautify.org incident
          </h2>
          <p className="text-sm leading-relaxed text-zinc-400">
            The reported 2025 exposure affected jsonformatter.org and
            codebeautify.org. For developers pasting logs, API responses,
            tokens, configs, or customer data, the problem is not only one
            incident. The problem is any workflow where sensitive JSON leaves
            the browser.
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

        <RelatedComparisons current="/vs/codebeautify" />
      </main>
    </div>
  );
}
