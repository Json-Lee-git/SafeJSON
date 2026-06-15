import type { Metadata } from "next";
import Link from "next/link";
import { JsonLdScript } from "../../components/StructuredData";

export const metadata: Metadata = {
  title:
    "How to Check If an Online JSON Formatter Uploads Your Data – SafeJSON",
  description:
    "Learn how to use DevTools Network to check whether an online JSON formatter uploads pasted JSON, JWTs, logs, or API payloads.",
  openGraph: {
    title: "How to Check If an Online JSON Formatter Uploads Your Data",
    description:
      "Open DevTools, watch the Network tab, and verify whether your pasted JSON is being uploaded.",
    url: "/security/check-json-formatter-upload",
  },
  alternates: {
    canonical: "/security/check-json-formatter-upload",
  },
};

const faqs = [
  {
    q: "Are all online JSON formatters unsafe?",
    a: "No. Some tools process JSON entirely in the browser. Others send your data to a remote server. Neither is inherently unsafe — but you should know which one you are using, especially when pasting sensitive data. The DevTools Network check tells you what category a tool falls into.",
  },
  {
    q: "Is browser-local processing the same as zero network requests?",
    a: "No. A website can load analytics, fonts, or page assets while still processing pasted JSON locally. The relevant question is: does the request contain your pasted content? Analytics requests that carry only page metadata are different from a POST that sends your JSON payload to a server.",
  },
  {
    q: "Can analytics be present without uploading pasted JSON?",
    a: "Yes. Many sites use analytics to measure page views and feature usage. The privacy-relevant distinction is whether the analytics payload includes pasted JSON, JWT tokens, schemas, query expressions, formatted output, license keys, or clipboard content. A site should be able to tell you what it sends to analytics and what it does not.",
  },
  {
    q: "How can I verify SafeJSON myself?",
    a: "Open safejson.dev, then open DevTools (F12) and go to the Network tab. Paste any JSON and run the formatter, diff, JWT decoder, JSONPath query, or Schema validator. Confirm that no request contains your pasted content. For a stronger test, switch the Network tab to Offline mode — the tools still work because all processing is local.",
  },
];

export default function SecurityCheckPage() {
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
          How to Check If an Online JSON Formatter Uploads Your Data
        </h1>
        <p className="text-lg text-zinc-400 mb-12">
          Developers paste API responses, JWTs, logs, and config files into
          online JSON tools every day. Before pasting sensitive data, take 30
          seconds to check whether the tool sends your content to a remote
          server.
        </p>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">
            What not to paste into tools you have not verified
          </h2>
          <div className="space-y-2 text-sm text-zinc-400 leading-relaxed">
            <p>Before you know how a tool handles your data, be cautious with:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Production JWTs or access tokens</li>
              <li>API responses containing user data or PII</li>
              <li>Server logs with internal endpoints or IPs</li>
              <li>Config files with cloud keys or database URLs</li>
              <li>Webhook payloads with customer information</li>
            </ul>
            <p className="mt-3">
              This is not about paranoia. In November 2025, security researchers
              discovered that popular online JSON tools had leaked over 80,000
              code snippets — including AWS keys, GitHub tokens, and banking
              details — through unprotected server-side features. A quick
              DevTools check would have surfaced the risk.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">
            How to verify with DevTools Network
          </h2>
          <ol className="list-decimal pl-5 space-y-3 text-sm text-zinc-400 leading-relaxed">
            <li>
              <strong className="text-zinc-300">Open the tool</strong> in your
              browser.
            </li>
            <li>
              <strong className="text-zinc-300">
                Open DevTools (F12) and switch to the Network tab.
              </strong>
            </li>
            <li>
              <strong className="text-zinc-300">Clear existing requests</strong>{" "}
              so you start with a clean log.
            </li>
            <li>
              <strong className="text-zinc-300">
                Paste a harmless test JSON first.
              </strong>{" "}
              Something small and fake. Check whether any new network request
              appears that contains your pasted content.
            </li>
            <li>
              <strong className="text-zinc-300">
                Run the formatter, validator, or diff tool.
              </strong>{" "}
              Watch the Network tab for POST or PUT requests. Expand any
              suspicious request and check the payload tab.
            </li>
            <li>
              <strong className="text-zinc-300">
                Only after the tool passes this check with test data
              </strong>{" "}
              should you consider using it with real payloads.
            </li>
          </ol>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">What to look for</h2>
          <div className="space-y-3 text-sm text-zinc-400 leading-relaxed">
            <p>
              <strong className="text-zinc-300">
                POST or PUT requests after paste.
              </strong>{" "}
              If the tool sends your JSON in a POST body, it is processing
              server-side.
            </p>
            <p>
              <strong className="text-zinc-300">
                Request payloads containing your JSON.
              </strong>{" "}
              Open the request, check the Payload tab. If your pasted data is
              there, it left your browser.
            </p>
            <p>
              <strong className="text-zinc-300">
                Share or save features.
              </strong>{" "}
              If a tool generates a shareable link or saves your snippet,
              your data is stored on a server.
            </p>
            <p>
              <strong className="text-zinc-300">
                Analytics events that include pasted content.
              </strong>{" "}
              Some analytics implementations send page content alongside
              page metadata. Check whether analytics requests contain your
              JSON.
            </p>
            <p>
              <strong className="text-zinc-300">
                Extension background requests.
              </strong>{" "}
              Browser extensions can make background network requests
              unrelated to the page you are viewing. Check the Network tab
              after installing any extension that interacts with page content.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">
            Browser extensions also need verification
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            JSON formatter extensions have the same access as the web tools
            they interact with — sometimes more. Check what permissions an
            extension requests, whether it loads remote code, and whether its
            source is auditable.{" "}
            <Link
              href="/extension/permissions"
              className="text-emerald-400 hover:text-emerald-300 underline"
            >
              How the SafeJSON extension works
            </Link>
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">
            How SafeJSON handles this
          </h2>
          <div className="space-y-3 text-sm text-zinc-400 leading-relaxed">
            <p>
              SafeJSON processes JSON in your browser. No pasted content is
              uploaded during formatting, validation, diff comparison, JWT
              decoding, JSONPath querying, or schema validation.
            </p>
            <p>
              SafeJSON uses Google Analytics for aggregate product analytics
              — page views and non-sensitive events like checkout clicks.
              Pasted JSON, JWT tokens, schemas, query expressions, formatted
              output, license keys, and clipboard content are never sent to
              analytics.
            </p>
            <p>
              You can verify all of this yourself.{" "}
              <Link
                href="/privacy/verify-local-processing"
                className="text-emerald-400 hover:text-emerald-300 underline"
              >
                Step-by-step verification guide
              </Link>
            </p>
          </div>
        </section>

        <section className="border-t border-zinc-800/50 pt-10 mb-12">
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

        <div className="text-center space-y-3">
          <Link
            href="/"
            className="inline-flex px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-xl transition-colors text-sm"
          >
            Try SafeJSON Formatter
          </Link>
          <p className="text-xs text-zinc-600">
            <Link
              href="/privacy/verify-local-processing"
              className="hover:text-emerald-400 transition-colors"
            >
              Verify local processing
            </Link>
            {" · "}
            <Link
              href="/extension/permissions"
              className="hover:text-emerald-400 transition-colors"
            >
              Read extension permissions
            </Link>
          </p>
        </div>
      </main>

      <footer className="border-t border-zinc-800 py-8 text-center text-xs text-zinc-600">
        <p>
          SafeJSON. All processing happens in your browser. We never see your
          data.
        </p>
      </footer>
    </div>
  );
}
