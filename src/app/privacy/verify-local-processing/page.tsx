import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema, HowToSchema, JsonLdScript } from "../../components/StructuredData";

export const metadata: Metadata = {
  title: "Verify Local JSON Processing | SafeJSON Privacy",
  description:
    "How to verify that SafeJSON processes JSON locally in your browser. Use DevTools Network, offline mode, and documented privacy boundaries.",
  openGraph: {
    title: "Verify SafeJSON Local Processing",
    description:
      "Use DevTools Network to verify that SafeJSON core tools process pasted JSON without uploading it.",
    url: "/privacy/verify-local-processing",
  },
  alternates: {
    canonical: "/privacy/verify-local-processing",
  },
};

const localTools = [
  ["JSON Formatter", "Formats and validates pasted JSON in the browser."],
  ["JSON Viewer", "Parses JSON and renders a local tree view."],
  ["JSON Beautifier", "Beautifies minified JSON locally."],
  ["JSON Parser", "Inspects fields and types without sending JSON to a server."],
  ["JSON Diff", "Compares two pasted JSON objects in the browser."],
  ["JWT Decoder", "Decodes header and payload locally. It does not verify signatures."],
  ["JSONPath Query", "Evaluates JSONPath expressions client-side."],
  ["JSON Schema Validator", "Runs schema validation in the browser with Ajv."],
];

const neverPaste = [
  "Production access tokens or refresh tokens",
  "Private keys, database URLs, or cloud credentials",
  "Customer PII, medical records, banking data, or regulated data",
  "Incident payloads that your company policy forbids in browser tools",
];

const faq = [
  {
    q: "Does SafeJSON upload my pasted JSON?",
    a: "SafeJSON core tools are designed to process pasted JSON, JWTs, JSONPath queries, and schemas in your browser. You can verify this with DevTools Network by checking that no request contains your pasted content while the tool runs.",
  },
  {
    q: "Does SafeJSON make any network requests?",
    a: "Yes. The website may load static assets, Google Analytics for aggregate product analytics, and Lemon Squeezy license endpoints when you activate Pro. The privacy boundary is that core tool operations must not send pasted JSON, JWTs, schemas, query expressions, or formatted output.",
  },
  {
    q: "Can I use SafeJSON for any secret or regulated data?",
    a: "No tool should be treated as a universal approval to paste secrets. SafeJSON is built to reduce upload risk for local browser workflows, but you should still follow your company's data handling policy.",
  },
];

export default function VerifyLocalProcessingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      <BreadcrumbSchema
        items={[
          { name: "SafeJSON", url: "https://www.safejson.dev" },
          { name: "Privacy", url: "https://www.safejson.dev/privacy" },
          {
            name: "Verify local processing",
            url: "https://www.safejson.dev/privacy/verify-local-processing",
          },
        ]}
      />
      <HowToSchema
        name="How to verify SafeJSON local processing"
        description="Use browser DevTools to verify that SafeJSON core tools do not upload pasted content during processing."
        steps={[
          "Open SafeJSON in your browser.",
          "Open DevTools and switch to the Network tab.",
          "Paste test JSON into a SafeJSON tool and run the operation.",
          "Inspect new requests and confirm that no request contains your pasted content.",
          "Optionally switch DevTools Network to Offline after the page loads and repeat the local operation.",
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

      <header className="border-b border-zinc-800">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <Link href="/" className="text-lg font-bold tracking-tight">
            <span className="text-emerald-400">{`{`}</span>
            SafeJSON
            <span className="text-emerald-400">{`}`}</span>
          </Link>
          <nav className="flex items-center gap-3 text-sm">
            <Link href="/privacy" className="text-zinc-400 hover:text-zinc-200">
              Privacy
            </Link>
            <Link href="/support" className="text-zinc-400 hover:text-zinc-200">
              Help
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-14">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
          Verify, do not trust
        </p>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl">
          How to verify SafeJSON does not upload your JSON
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-zinc-400">
          SafeJSON is built around a simple privacy test: open DevTools, watch
          the Network tab, paste JSON, and check whether any request contains
          your pasted content. This page documents the test and the boundaries.
        </p>

        <section className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
            <h2 className="text-lg font-semibold">Network tab test</h2>
            <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-zinc-400">
              <li>Open SafeJSON and wait for the page to finish loading.</li>
              <li>Open DevTools with F12 or your browser menu.</li>
              <li>Switch to the Network tab and clear the existing log.</li>
              <li>Paste test JSON and run the tool.</li>
              <li>Inspect requests created after the action.</li>
              <li>Confirm that no request URL or body contains your pasted JSON.</li>
            </ol>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
            <h2 className="text-lg font-semibold">Offline test</h2>
            <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-zinc-400">
              <li>Load the SafeJSON page first.</li>
              <li>In DevTools Network, choose Offline.</li>
              <li>Paste JSON and run a local operation.</li>
              <li>
                If the operation still works, that is evidence the processing
                happened in the browser rather than through a server round trip.
              </li>
            </ol>
          </div>
        </section>

        <section className="mt-10 rounded-xl border border-emerald-400/15 bg-emerald-400/[0.04] p-6">
          <h2 className="text-xl font-semibold">Core tools covered by this boundary</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {localTools.map(([name, description]) => (
              <div key={name} className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-4">
                <h3 className="text-sm font-semibold text-zinc-100">{name}</h3>
                <p className="mt-1 text-sm leading-relaxed text-zinc-500">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
            <h2 className="text-lg font-semibold">Network boundaries</h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              SafeJSON may load static assets, run aggregate analytics, and call
              Lemon Squeezy license endpoints when you activate Pro. Those flows
              are separate from core tool processing. Pasted JSON, JWTs,
              schemas, JSONPath expressions, and formatted output should not be
              included in those requests.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
            <h2 className="text-lg font-semibold">Data you still should not paste</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-zinc-400">
              {neverPaste.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-10 rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
          <h2 className="text-lg font-semibold">If you find an unexpected request</h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            Capture the request URL, method, and the SafeJSON page where it
            happened. Do not share real secrets or production payloads. Open a
            GitHub issue so the behavior can be inspected and fixed.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="https://github.com/Json-Lee-git/SafeJSON"
              className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-black hover:bg-emerald-400"
            >
              View source on GitHub
            </Link>
            <Link
              href="/"
              className="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-semibold text-zinc-200 hover:border-zinc-500"
            >
              Start verification
            </Link>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold">FAQ</h2>
          <dl className="mt-5 space-y-5">
            {faq.map((item) => (
              <div key={item.q}>
                <dt className="text-sm font-semibold text-zinc-200">{item.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-zinc-500">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </main>
    </div>
  );
}
