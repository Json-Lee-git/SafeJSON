import type { Metadata } from "next";
import Link from "next/link";
import { JsonLdScript } from "../components/StructuredData";

export const metadata: Metadata = {
  title:
    "Client-Side JSON Formatter — Verify Local Processing | SafeJSON",
  description:
    "A client-side JSON formatter can process pasted JSON in the browser. SafeJSON has no pasted-content upload for core formatting. Verify with DevTools Network tab.",
  openGraph: {
    title: "Client-Side JSON Formatter — Verify in DevTools",
    description:
      "Format pasted JSON in a browser-local workflow. Verify with DevTools Network tab that no request contains your pasted content.",
    url: "/client-side-json-formatter",
  },
  alternates: {
    canonical: "/client-side-json-formatter",
  },
};

const faqs = [
  {
    q: "What is a client-side JSON formatter?",
    a: "A client-side JSON formatter processes pasted JSON data in browser JavaScript. Unlike server-side tools, it does not transmit pasted JSON to a remote server for formatting.",
  },
  {
    q: "How do I verify a JSON formatter is truly client-side?",
    a: "Open the tool, then open DevTools (F12) and switch to the Network tab. Paste any JSON and use the formatter. If no new network request contains your pasted JSON, the tool is processing client-side. If you see XHR or fetch requests with your data, the tool is server-side.",
  },
  {
    q: "Why should I use a client-side JSON formatter instead of jsonformatter.org?",
    a: "In November 2025, security researchers discovered that jsonformatter.org — a server-side tool — had leaked over 80,000 user-submitted code snippets including AWS keys, GitHub tokens, and database passwords. A browser-local formatter avoids the server-side pasted-content processing path behind that category of risk.",
  },
  {
    q: "Does a client-side JSON formatter work offline?",
    a: "After the page has loaded, browser-local formatting should continue to work with DevTools Offline mode enabled. This is a useful verification test for the formatting workflow.",
  },
  {
    q: "Can a client-side JSON formatter handle large files?",
    a: "SafeJSON Formatter and Beautifier are tested with 50MB JSON using a Web Worker to keep the UI responsive during parsing.",
  },
];

export default function ClientSideFormatterPage() {
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
      <header className="border-b border-zinc-800">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center">
          <Link href="/" className="text-lg font-bold tracking-tight">
            <span className="text-emerald-400">{`{`}</span>SafeJSON
            <span className="text-emerald-400">{`}`}</span>
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold tracking-tight mb-4">
          What Is a Client-Side JSON Formatter?
        </h1>

        <p className="text-lg text-zinc-400 leading-relaxed mb-8">
          A client-side JSON formatter processes pasted JSON data in your
          browser. SafeJSON core formatting avoids pasted-content upload. You
          can verify this yourself: open DevTools → Network tab while
          formatting and check that no request contains your pasted JSON.
        </p>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">
            Why Client-Side Matters
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-3">
            In November 2025, security researchers at{" "}
            <a
              href="https://labs.watchtowr.com/stop-putting-your-passwords-into-random-websites-yes-seriously-you-are-the-problem/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 underline"
            >
              watchTowr
            </a>{" "}
            discovered that popular server-side JSON tools had been leaking user
            data for over five years. An unprotected feature exposed 80,000+
            code snippets containing AWS access keys, GitHub tokens, database
            passwords, and banking PII — all because the tools processed data on
            a server.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-3">
            A client-side JSON formatter reduces this risk at the architecture
            level. If pasted JSON is processed in the browser workflow with no
            pasted-content upload, there is no JSON processing endpoint to leak
            from, no database to scrape, and no shareable URL to guess.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">
            The 30-Second Verification Test
          </h2>
          <ol className="list-decimal pl-5 space-y-2 text-zinc-400 mb-4">
            <li>Open any JSON formatter in your browser</li>
            <li>Open DevTools (F12) → Network tab</li>
            <li>Paste JSON and run the formatter</li>
            <li>
              Check whether any new request contains your pasted content
            </li>
            <li>
              For a stronger test: switch the Network tab to Offline mode first
              — a client-side tool still works perfectly
            </li>
          </ol>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">
            SafeJSON: A Complete Client-Side JSON Toolkit
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            SafeJSON is a browser-based JSON formatter and developer toolkit
            with verifiable browser-local workflows:
          </p>

          <h3 className="text-lg font-semibold mb-3">Free Tools</h3>
          <ul className="list-disc pl-5 space-y-1 text-zinc-400 mb-6">
            <li>JSON Formatter — instant formatting with syntax highlighting</li>
            <li>JSON Validator — error detection with line and column numbers</li>
            <li>JSON Beautifier — configurable indentation</li>
            <li>JSON Viewer — collapsible tree view</li>
            <li>JSON Parser — parse and inspect JSON structure</li>
            <li>CSV to JSON / JSON to CSV conversion</li>
          </ul>

          <h3 className="text-lg font-semibold mb-3">Pro Tools ($5/month)</h3>
          <ul className="list-disc pl-5 space-y-1 text-zinc-400 mb-6">
            <li>JSON Diff — compare two JSON objects side by side</li>
            <li>JWT Decoder — decode tokens without sending them to a server</li>
            <li>JSONPath Query — query JSON with XPath-like expressions</li>
            <li>JSON Schema Validator — validate JSON against schema definitions</li>
          </ul>

          <p className="text-zinc-500 text-sm">
            Pro tools keep the same no pasted-content upload boundary for core
            inputs. Analytics, billing, licensing, and static assets may still
            use normal network requests.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">
            Client-Side vs Server-Side JSON Tools
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left py-3 pr-4 text-zinc-400 font-medium"></th>
                  <th className="text-left py-3 pr-4 text-emerald-400 font-medium">
                    Client-Side
                  </th>
                  <th className="text-left py-3 text-red-400 font-medium">
                    Server-Side
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {[
                  ["Where data is processed", "Your browser", "Remote server"],
                  ["Data leaves your device", "No", "Yes"],
                  ["Risk of server data breach", "None", "Server is a target"],
                  [
                    "DevTools Network tab shows",
                    "No requests containing pasted JSON",
                    "XHR/fetch requests with data",
                  ],
                  ["Works offline", "Yes", "No"],
                  [
                    "Examples",
                    "SafeJSON, Firefox built-in viewer, jq (CLI)",
                    "jsonformatter.org, codebeautify.org, jwt.io",
                  ],
                ].map(([label, client, server], i) => (
                  <tr key={i} className="hover:bg-white/[0.02]">
                    <td className="py-3 pr-4 text-zinc-300 font-medium">
                      {label}
                    </td>
                    <td className="py-3 pr-4 text-zinc-400">{client}</td>
                    <td className="py-3 text-zinc-500">{server}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="border-t border-zinc-800/50 pt-10">
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
      </main>

      <footer className="border-t border-zinc-800 py-8 text-center text-xs text-zinc-600">
        <p>
          SafeJSON. No pasted-content upload for core tools.
        </p>
      </footer>
    </div>
  );
}
