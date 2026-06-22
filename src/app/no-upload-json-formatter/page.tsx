import type { Metadata } from "next";
import Link from "next/link";
import { JsonLdScript } from "../components/StructuredData";

export const metadata: Metadata = {
  title: "No-Upload JSON Formatter - Verify Browser-Local JSON | SafeJSON",
  description:
    "Use a no-upload JSON formatter for sensitive API responses, logs, and config files. SafeJSON lets you verify browser-local formatting in DevTools Network.",
  openGraph: {
    title: "No-Upload JSON Formatter You Can Verify",
    description:
      "Format JSON in a browser-local workflow and verify that no request contains your pasted JSON during core formatting.",
    url: "/no-upload-json-formatter",
  },
  alternates: {
    canonical: "/no-upload-json-formatter",
  },
};

const verificationSteps = [
  "Open SafeJSON or another JSON formatter in your browser.",
  "Open DevTools with F12 or your browser menu.",
  "Go to the Network tab and clear existing requests.",
  "Paste harmless test JSON and run the formatter.",
  "Inspect any new request and confirm the payload does not contain your pasted JSON.",
  "For a stronger check, switch DevTools Network to Offline after the page loads and run the formatter again.",
];

const faqs = [
  {
    q: "What is a no-upload JSON formatter?",
    a: "A no-upload JSON formatter processes pasted JSON in your browser workflow instead of sending that pasted content to a remote formatting endpoint. The important test is whether network requests contain your pasted JSON during formatting.",
  },
  {
    q: "How can I verify that a JSON formatter does not upload my data?",
    a: "Open DevTools, watch the Network tab, paste test JSON, and run the formatter. If no request payload contains your pasted JSON, the core formatting workflow is browser-local for that test.",
  },
  {
    q: "Does no-upload mean the website makes zero network requests?",
    a: "No. A site may still load static assets, analytics, billing, or license checks. The privacy boundary is whether pasted JSON, JWTs, schemas, queries, formatted output, license keys, or clipboard content are sent in those requests.",
  },
  {
    q: "When should I use a no-upload JSON formatter?",
    a: "Use one when inspecting API responses, webhook payloads, logs, JWTs, config snapshots, or any JSON that may contain tokens, customer data, internal URLs, database names, or private identifiers.",
  },
  {
    q: "Does SafeJSON upload pasted JSON?",
    a: "SafeJSON core formatting, validation, viewing, parsing, diff, JWT decoding, JSONPath, and schema validation workflows are designed so pasted content is not intentionally uploaded. You can verify this yourself in DevTools Network.",
  },
];

export default function NoUploadJsonFormatterPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
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
      <JsonLdScript
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "How to verify a no-upload JSON formatter",
          description:
            "Use DevTools Network to confirm that a JSON formatter does not upload pasted JSON during core formatting.",
          step: verificationSteps.map((text, index) => ({
            "@type": "HowToStep",
            position: index + 1,
            name: `Step ${index + 1}`,
            text,
          })),
        }}
      />
      <JsonLdScript
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "SafeJSON",
              item: "https://www.safejson.dev",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "No-Upload JSON Formatter",
              item: "https://www.safejson.dev/no-upload-json-formatter",
            },
          ],
        }}
      />

      <header className="border-b border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <Link href="/" className="text-lg font-bold tracking-tight">
            <span className="text-emerald-400">{`{`}</span>SafeJSON
            <span className="text-emerald-400">{`}`}</span>
          </Link>
          <Link
            href="/"
            className="text-sm text-zinc-400 hover:text-emerald-300 transition-colors"
          >
            Open formatter
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <section className="mb-12">
          <p className="text-xs uppercase tracking-[0.22em] text-emerald-400 mb-4">
            Browser-local JSON workflow
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-5">
            No-upload JSON formatter for sensitive API data
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed max-w-3xl mb-7">
            SafeJSON formats and validates pasted JSON in a browser-local
            workflow. Open DevTools, watch the Network tab, and verify that no
            request contains your pasted JSON during core formatting.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex min-h-11 items-center rounded-lg bg-emerald-500 px-5 text-sm font-semibold text-black hover:bg-emerald-400 transition-colors"
            >
              Try the formatter
            </Link>
            <Link
              href="/privacy/verify-local-processing"
              className="inline-flex min-h-11 items-center rounded-lg border border-zinc-700 px-5 text-sm font-semibold text-zinc-200 hover:border-emerald-400 hover:text-emerald-300 transition-colors"
            >
              Verify local processing
            </Link>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-3 mb-12">
          {[
            ["API responses", "Inspect production-like JSON without sending payloads to a formatter endpoint."],
            ["Webhook payloads", "Format nested event bodies while keeping pasted content in the browser workflow."],
            ["Config and logs", "Review JSON that may contain tokens, internal IDs, hostnames, or customer traces."],
          ].map(([title, body]) => (
            <div key={title} className="border border-zinc-800 rounded-lg p-4">
              <h2 className="text-sm font-semibold text-zinc-200 mb-2">
                {title}
              </h2>
              <p className="text-sm text-zinc-500 leading-relaxed">{body}</p>
            </div>
          ))}
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            What no-upload means in practice
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            A no-upload JSON formatter does not send pasted JSON to a remote
            server for the core formatting operation. This matters because API
            responses, logs, and config files often include secrets or private
            identifiers that should not be copied into random server-side tools.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            It does not mean the page makes zero network requests. SafeJSON can
            still load static assets, aggregate analytics, billing pages, and
            license checks. The trust boundary is narrower and testable: pasted
            JSON should not appear inside those requests during core tool use.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            Verify it in 30 seconds
          </h2>
          <ol className="space-y-3 text-sm text-zinc-400 leading-relaxed">
            {verificationSteps.map((step, index) => (
              <li key={step} className="flex gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-xs font-semibold text-emerald-400 ring-1 ring-zinc-800">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            No-upload vs server-side formatters
          </h2>
          <div className="overflow-x-auto border border-zinc-800 rounded-lg">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="bg-zinc-900/70">
                <tr>
                  <th className="text-left py-3 px-4 text-zinc-400 font-medium">
                    Check
                  </th>
                  <th className="text-left py-3 px-4 text-emerald-400 font-medium">
                    SafeJSON core workflow
                  </th>
                  <th className="text-left py-3 px-4 text-zinc-400 font-medium">
                    Server-side formatter
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {[
                  ["Pasted JSON sent for formatting", "No, verify in Network", "Usually yes"],
                  ["Offline-after-load test", "Formatter continues working", "Formatter usually fails"],
                  ["Best use case", "Sensitive API, log, and config JSON", "Non-sensitive quick formatting"],
                  ["What to inspect", "Requests should not contain pasted JSON", "POST payloads may include JSON"],
                ].map(([label, safejson, server]) => (
                  <tr key={label}>
                    <td className="py-3 px-4 text-zinc-300 font-medium">
                      {label}
                    </td>
                    <td className="py-3 px-4 text-zinc-400">{safejson}</td>
                    <td className="py-3 px-4 text-zinc-500">{server}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            Related SafeJSON tools
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["/json-validator", "JSON Validator", "Catch syntax errors with line and column context."],
              ["/json-viewer", "JSON Viewer", "Inspect nested objects in a collapsible tree."],
              ["/json-diff", "JSON Diff", "Compare API responses, webhooks, and config snapshots."],
              ["/jwt-decoder", "JWT Decoder", "Decode JWT headers and claims locally."],
            ].map(([href, title, body]) => (
              <Link
                key={href}
                href={href}
                className="rounded-lg border border-zinc-800 p-4 hover:border-emerald-500/60 transition-colors"
              >
                <h3 className="text-sm font-semibold text-zinc-200 mb-2">
                  {title}
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{body}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-t border-zinc-800 pt-10">
          <h2 className="text-2xl font-semibold mb-6">FAQ</h2>
          <dl className="space-y-6">
            {faqs.map((item) => (
              <div key={item.q}>
                <dt className="text-sm font-semibold text-zinc-200 mb-2">
                  {item.q}
                </dt>
                <dd className="text-sm text-zinc-500 leading-relaxed">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </main>

      <footer className="border-t border-zinc-800 py-8 text-center text-xs text-zinc-600">
        <p>SafeJSON. No pasted-content upload for core tools.</p>
      </footer>
    </div>
  );
}
