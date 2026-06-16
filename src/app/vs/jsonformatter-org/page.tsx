import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "../../components/StructuredData";
import {
  ComparisonTable,
  RelatedComparisons,
  VerificationTutorial,
} from "../../components/ComparisonContent";

export const metadata: Metadata = {
  title: "SafeJSON vs jsonformatter.org - JSON Formatter Alternative 2026",
  description:
    "Compare SafeJSON and jsonformatter.org on local processing, verifiable privacy, breach history, ads, JSON Diff, JWT, JSONPath, Schema, and pricing.",
  openGraph: {
    title: "SafeJSON vs jsonformatter.org",
    description:
      "A privacy and feature comparison between SafeJSON and jsonformatter.org.",
    url: "/vs/jsonformatter-org",
  },
  alternates: {
    canonical: "/vs/jsonformatter-org",
  },
};

const rows = [
  ["Feature", "SafeJSON", "jsonformatter.org"],
  ["Processing", "Client-side. No pasted-content upload.", "Server-side. Data is transmitted to remote infrastructure."],
  ["Verifiable privacy", "Yes. Open DevTools -> Network and check that no request contains pasted JSON.", "No. The tool depends on server-side processing."],
  ["Data breach history", "None. No server-side JSON storage pipeline.", "80K+ credentials exposed in November 2025."],
  ["Open source", "Yes. MIT license on GitHub.", "No. Closed source."],
  ["Ads", "None.", "Yes. Ad-supported."],
  ["JSON Diff", "Yes (Pro).", "No."],
  ["JWT Decoder", "Yes (Pro).", "No."],
  ["JSONPath", "Yes (Pro).", "No."],
  ["Schema Validator", "Yes (Pro).", "No."],
  ["Large files", "Large local handling (Formatter tested with 50MB).", "Limited by upload and server workflow."],
  ["Price", "Free core tools, $5/month Pro.", "Free with ads."],
];

export default function VsJsonFormatterPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      <BreadcrumbSchema
        items={[
          { name: "SafeJSON", url: "https://www.safejson.dev" },
          {
            name: "SafeJSON vs jsonformatter.org",
            url: "https://www.safejson.dev/vs/jsonformatter-org",
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
          SafeJSON vs jsonformatter.org
        </h1>
        <p className="text-lg text-zinc-400 mb-8">
          SafeJSON is a jsonformatter.org alternative built around verifiable
          privacy. Open DevTools -&gt; Network, paste JSON, and check that no
          request contains your data while it is processed locally.
        </p>

        <section className="mb-12">
          <ComparisonTable rows={rows} />
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">
            What happened at jsonformatter.org
          </h2>
          <div className="space-y-3 text-sm leading-relaxed text-zinc-400">
            <p>
              In November 2025, security researchers reported that
              jsonformatter.org and codebeautify.org exposed more than 80,000
              user-submitted snippets through an unprotected feature.
            </p>
            <p>
              The exposed data included Active Directory credentials, AWS keys,
              GitHub tokens, database passwords, and banking PII. The core
              lesson is simple: if a JSON tool sends your data to a server, that
              server becomes part of your threat model.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">
            Why SafeJSON is different
          </h2>
          <p className="text-sm leading-relaxed text-zinc-400">
            SafeJSON processes JSON with client-side JavaScript. There is no
            server-side JSON formatter endpoint receiving your data, no ads, and
            no analytics event that includes pasted JSON. You can verify the
            privacy claim yourself instead of trusting marketing copy.
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

        <RelatedComparisons current="/vs/jsonformatter-org" />
      </main>
    </div>
  );
}
