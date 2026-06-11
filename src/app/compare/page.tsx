import type { Metadata } from "next";
import Link from "next/link";
import {
  BreadcrumbSchema,
  HowToSchema,
  JsonLdScript,
} from "../components/StructuredData";
import Footer from "../components/Footer";
import {
  ComparisonTable,
  RelatedComparisons,
  VerificationTutorial,
} from "../components/ComparisonContent";

export const metadata: Metadata = {
  title: "JSON Formatter Comparison 2026 | SafeJSON",
  description:
    "Compare SafeJSON with jsonformatter.org, JSON Viewer, Firefox, and VS Code on privacy, local processing, ads, breach history, and advanced JSON tools.",
  openGraph: {
    title: "JSON Formatter Comparison 2026 - SafeJSON",
    description:
      "SafeJSON vs jsonformatter.org, jsonviewer.stack.hu, Firefox Native, and VS Code. See which JSON tools are client-side and verifiable.",
    url: "/compare",
  },
  alternates: {
    canonical: "/compare",
  },
};

const faq = [
  {
    q: "What is the safest JSON formatter in 2026?",
    a: "The safest JSON formatter is one you can verify. SafeJSON processes JSON locally in your browser and shows zero new network requests while formatting, viewing, parsing, diffing, decoding JWTs, querying JSONPath, or validating schemas.",
  },
  {
    q: "How can I tell if a JSON tool uploads my data?",
    a: "Open DevTools, go to the Network tab, paste JSON, and run the tool. If a new request contains your data, the tool uploaded it. SafeJSON is designed so JSON processing creates zero new requests.",
  },
  {
    q: "Why compare SafeJSON with jsonformatter.org?",
    a: "jsonformatter.org and codebeautify.org were reported to have exposed more than 80,000 credentials through an unprotected feature in November 2025. SafeJSON avoids this class of risk by never sending user JSON to a server.",
  },
];

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      <BreadcrumbSchema
        items={[
          { name: "SafeJSON", url: "https://www.safejson.dev" },
          {
            name: "JSON Formatter Comparison",
            url: "https://www.safejson.dev/compare",
          },
        ]}
      />
      <JsonLdScript
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.a,
            },
          })),
        }}
      />
      <HowToSchema
        name="How to verify whether a JSON tool uploads your data"
        description="Use DevTools Network tab to check whether a JSON formatter sends pasted JSON to a server."
        steps={[
          "Open the JSON tool in your browser.",
          "Open DevTools and switch to the Network tab.",
          "Paste JSON and run the formatter, viewer, diff, decoder, or parser.",
          "Check whether a new request contains your JSON data.",
          "If there are zero new requests while processing, the JSON stayed local.",
        ]}
      />

      <header className="border-b border-zinc-800">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold tracking-tight">
            <span className="text-emerald-400">{`{`}</span>SafeJSON
            <span className="text-emerald-400">{`}`}</span>
          </Link>
          <Link
            href="/pricing"
            className="text-sm text-zinc-500 transition-colors hover:text-zinc-300"
          >
            Pricing
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-16">
        <section className="mb-10">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-emerald-400/80">
            JSON tool comparison
          </p>
          <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
            JSON Formatter Comparison 2026
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-zinc-400">
            SafeJSON is built around verifiable privacy: open DevTools -&gt;
            Network, paste JSON, and see zero new requests. Compare that with
            server-side JSON tools, browser-native viewers, and editor workflows.
          </p>
        </section>

        <section className="mb-12">
          <ComparisonTable />
        </section>

        <section className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
            <h2 className="text-xl font-semibold">
              Why SafeJSON is different
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400">
              Most JSON tools ask you to trust their privacy claim. SafeJSON
              turns that claim into something you can verify. Once the page is
              loaded, formatting, parsing, viewing, diffing, JWT decoding,
              JSONPath querying, and schema validation run in the browser.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              That also changes large file workflows: SafeJSON handles 50MB+
              JSON locally, so sensitive logs do not need to leave your machine.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
            <h2 className="text-xl font-semibold">
              The jsonformatter.org incident
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400">
              In November 2025, jsonformatter.org and codebeautify.org were
              reported to have exposed more than 80,000 submitted snippets,
              including cloud keys, tokens, passwords, and banking details.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              SafeJSON avoids that failure mode by design: there is no
              server-side JSON processing pipeline for user content to leak
              from.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <VerificationTutorial />
        </section>

        <section className="mb-12 text-center">
          <Link
            href="/pricing"
            className="inline-flex rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-emerald-400"
          >
            Get SafeJSON Pro
          </Link>
        </section>

        <RelatedComparisons current="/compare" />
      </main>
      <Footer />
    </div>
  );
}
