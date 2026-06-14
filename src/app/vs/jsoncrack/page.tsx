import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "../../components/StructuredData";
import {
  ComparisonTable,
  RelatedComparisons,
  VerificationTutorial,
} from "../../components/ComparisonContent";
import { JsonLdScript } from "../../components/StructuredData";

export const metadata: Metadata = {
  title:
    "JSON Crack vs SafeJSON — Visualization vs Private JSON Workflows",
  description:
    "JSON Crack is a great JSON visualization tool. SafeJSON is built for large-file formatting, JSON diff, JWT decoding, JSONPath, schema validation, and DevTools-verifiable privacy.",
  openGraph: {
    title: "JSON Crack vs SafeJSON — Visualization vs Private JSON Workflows",
    description:
      "JSON Crack is excellent for visualizing JSON structure. SafeJSON is built for sensitive JSON workflows you can verify in DevTools.",
    url: "/vs/jsoncrack",
  },
  alternates: {
    canonical: "/vs/jsoncrack",
  },
};

const rows = [
  ["Capability", "JSON Crack", "SafeJSON"],
  [
    "Primary use case",
    "Visual graph exploration — understand JSON structure at a glance",
    "Private JSON developer workflow — format, diff, decode, query, validate",
  ],
  [
    "JSON visualization",
    "Yes. Interactive node-based graphs. Core strength.",
    "Tree view with collapsible nodes. Focus is on data inspection, not graph visualization.",
  ],
  [
    "JSON Formatter",
    "Yes. Formats and beautifies JSON.",
    "Yes. Free. Syntax-highlighted output.",
  ],
  [
    "JSON Diff",
    "Not available.",
    "Yes (Pro). Compare two JSON objects with color-coded additions, removals, and changes.",
  ],
  [
    "JWT Decoder",
    "Not available.",
    "Yes (Pro). Decode tokens locally — your JWT never leaves your browser.",
  ],
  [
    "JSONPath Query",
    "Not available.",
    "Yes (Pro). Evaluate JSONPath expressions client-side.",
  ],
  [
    "JSON Schema Validator",
    "Not available.",
    "Yes (Pro). Validate against draft-04 through 2020-12. Powered by Ajv in the browser.",
  ],
  [
    "Large file workflow",
    "Practical limits depend on complexity and hardware. Node limit prevents browser crashes.",
    "Designed for large local JSON. Handles 50MB+ files using Web Workers.",
  ],
  [
    "Browser extension",
    "Visualizes JSON in-browser on demand.",
    "Auto-detects and formats raw JSON responses on any URL. Available on Edge Add-ons.",
  ],
  [
    "DevTools verification",
    "Claims client-side processing.",
    "Explicit verification flow: open DevTools → Network, paste JSON, confirm no request contains your pasted content.",
  ],
  [
    "Open source",
    "Yes. GPL v3.",
    "Yes. MIT license.",
  ],
  [
    "Pricing path",
    "Free tool → ToDiagram (separate commercial product, ~$9/mo per G2).",
    "Free core tools → Pro $5/month or $39/year. Single-brand upgrade path.",
  ],
  [
    "Best fit",
    "Exploring and sharing JSON structure visually.",
    "Sensitive JSON workflows: logs, configs, API responses, JWTs, schema validation.",
  ],
];

const faqs = [
  {
    q: "Is JSON Crack a SafeJSON competitor?",
    a: "They are adjacent tools serving different needs. JSON Crack is a visualization tool — it turns JSON into interactive node graphs. SafeJSON is a developer toolkit for formatting, diffing, decoding JWTs, querying JSONPath, and validating schemas, with verifiable client-side privacy. Many developers use both.",
  },
  {
    q: "When should I use JSON Crack instead of SafeJSON?",
    a: "Use JSON Crack when you need to understand the structure of unfamiliar JSON at a glance, or when you want to share a visual representation of JSON structure with a colleague. Its graph visualization makes nested relationships immediately clear.",
  },
  {
    q: "When should I use SafeJSON instead of JSON Crack?",
    a: "Use SafeJSON when you need to format large JSON files (50MB+), compare two JSON objects, decode JWT tokens locally, query JSON with JSONPath, or validate JSON against a schema — all without uploading pasted content. Use SafeJSON when you need to verify that your data stays in your browser.",
  },
];

export default function VsJsonCrackPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      <BreadcrumbSchema
        items={[
          { name: "SafeJSON", url: "https://www.safejson.dev" },
          {
            name: "SafeJSON vs JSON Crack",
            url: "https://www.safejson.dev/vs/jsoncrack",
          },
        ]}
      />
      <JsonLdScript
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.a,
            },
          })),
        }}
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
          JSON Crack vs SafeJSON
        </h1>
        <p className="text-lg text-zinc-400 mb-8">
          JSON Crack is excellent for visualizing JSON structure. SafeJSON is
          built for sensitive JSON workflows you can verify in DevTools.
          Different tools for different jobs.
        </p>

        <section className="mb-12">
          <ComparisonTable rows={rows} />
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">
            Different tools for different jobs
          </h2>
          <div className="space-y-3 text-sm leading-relaxed text-zinc-400">
            <p>
              JSON Crack is not a bad tool — it is a very good one. Its
              interactive node-based graphs are a fast and intuitive way to
              understand unfamiliar JSON structure at a glance. The project
              has earned its 44,000+ GitHub stars through years of active
              development and a genuine focus on visualization.
            </p>
            <p>
              SafeJSON takes a different approach. Instead of visualizing
              structure, it focuses on providing a complete toolkit for
              production-like JSON workflows: formatting, diffing, decoding
              JWTs, querying with JSONPath, and validating against schemas —
              all while keeping pasted content in the browser and verifiable
              through DevTools.
            </p>
            <p>
              Many developers use both: JSON Crack to explore unfamiliar data
              visually, and SafeJSON when they need to process sensitive JSON
              without uploading it.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">
            Working with large JSON files
          </h2>
          <div className="space-y-3 text-sm leading-relaxed text-zinc-400">
            <p>
              Visualization tools can become difficult to use with very large
              or deeply nested JSON — the graph becomes hard to navigate, and
              JSON Crack applies a node limit to prevent browser crashes.
            </p>
            <p>
              SafeJSON is designed for large local JSON. Formatter,
              beautifier, viewer, and parser workflows handle 50MB+ files
              using a Web Worker so the interface stays responsive. JSON
              Diff, JWT Decoder, JSONPath, and Schema Validator all run
              locally — no pasted-content upload, regardless of file size.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <VerificationTutorial />
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-6">FAQ</h2>
          <dl className="space-y-6">
            {faqs.map((item) => (
              <div key={item.q}>
                <dt className="text-sm font-semibold text-zinc-300 mb-2">
                  {item.q}
                </dt>
                <dd className="text-sm text-zinc-500 leading-relaxed">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="mb-12 text-center">
          <Link
            href="/pricing"
            className="inline-flex px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-xl transition-colors text-sm"
          >
            Get SafeJSON Pro
          </Link>
        </div>

        <RelatedComparisons current="/vs/jsoncrack" />
      </main>
    </div>
  );
}
