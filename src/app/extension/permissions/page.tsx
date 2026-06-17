import type { Metadata } from "next";
import Link from "next/link";
import { JsonLdScript } from "../../components/StructuredData";

export const metadata: Metadata = {
  title: "Extension Permissions & Trust – SafeJSON",
  description:
    "How the SafeJSON browser extension works, what permissions it requests, and how to verify it does not upload pasted content.",
  openGraph: {
    title: "SafeJSON Extension Permissions & Trust",
    description:
      "How the SafeJSON browser extension works, what permissions it uses, and how to verify it.",
    url: "/extension/permissions",
  },
  alternates: {
    canonical: "/extension/permissions",
  },
};

const faqs = [
  {
    q: "Does the extension upload JSON content?",
    a: "No page JSON is sent through URL parameters. The extension detects raw JSON responses on the page and formats them using browser JavaScript. You can verify this by opening DevTools Network tab while the extension formats a JSON response.",
  },
  {
    q: "Why does the extension need content script / host access?",
    a: "The host permission allows the extension to detect raw JSON responses on any URL you visit. When it finds JSON, it formats it for readability in the current page. The extension does not send page JSON through URL parameters. It only reads the current page to check whether the response is JSON.",
  },
  {
    q: "How can I verify the extension behavior?",
    a: "Open DevTools (F12) and go to the Network tab. Visit any URL that returns raw JSON. The extension formats it and does not open SafeJSON with page JSON in the URL. For a stronger test, switch the Network tab to Offline mode before loading the page.",
  },
];

export default function ExtensionPermissionsPage() {
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
          SafeJSON Extension: How It Works
        </h1>
        <p className="text-lg text-zinc-400 mb-12">
          The SafeJSON browser extension auto-detects and formats raw JSON
          responses on any URL. It formats the response in the current page and
          does not send page JSON through URL parameters. The source code is
          open and auditable on GitHub.
        </p>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">
            What the extension does
          </h2>
          <div className="space-y-3 text-sm leading-relaxed text-zinc-400">
            <p>
              When you open a URL that returns raw JSON, most browsers show a
              wall of unformatted text. The SafeJSON extension detects JSON
              responses and renders them with syntax highlighting, collapsible
              tree view, and copy-to-clipboard in the current page.
            </p>
            <p>
              The extension does not send page JSON through URL parameters. It
              reads the page content, formats it with browser JavaScript, and
              replaces the raw text display. When you click the extension icon,
              it opens the full SafeJSON toolkit in a new tab without a payload
              query string.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">
            Permissions explained
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-zinc-300 mb-1">
                storage
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Used only to save local preferences: theme (dark/light mode),
                tree view collapse state, and Pro license activation status.
                No JSON content is synced through this permission.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-zinc-300 mb-1">
                clipboardWrite
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Used only when you click the Copy button to copy formatted
                JSON to your clipboard. The extension never reads your
                clipboard. Writes happen only on your explicit action.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-zinc-300 mb-1">
                Content script / host access
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                The extension reads the current page only to detect and format
                JSON responses. No page content is stored, sent through URL
                parameters, or collected for analytics. The host permission scope
                is broad so the extension can format JSON on any URL you visit,
                but it only activates on pages that return JSON content.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Remote code</h2>
          <p className="text-sm text-zinc-500 leading-relaxed">
            The SafeJSON extension does not load any remote code. All scripts
            are bundled with the extension package. The full source is available
            on GitHub under the MIT license — every line is auditable.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">
            Ads and affiliate
          </h2>
          <p className="text-sm text-zinc-500 leading-relaxed">
            The extension does not inject ads, affiliate links, checkout
            popups, or tracking scripts into any page. It does one thing:
            detects JSON and formats it locally. There is no pasted-content
            analytics, no advertising network, and no data broker integration.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">How to verify</h2>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-zinc-500 mb-4">
            <li>Open any URL that returns raw JSON</li>
            <li>Open DevTools (F12) → Network tab</li>
            <li>
              The extension formats the JSON in the current page — check that
              it does not open SafeJSON with JSON in the URL
            </li>
            <li>
              For a stronger test, switch the Network tab to Offline mode
              before loading the page — the extension still works
            </li>
          </ol>
          <p className="text-sm text-zinc-500">
            Detailed verification guide:{" "}
            <Link
              href="/privacy/verify-local-processing"
              className="text-emerald-400 hover:text-emerald-300 underline"
            >
              How to verify SafeJSON does not upload your JSON
            </Link>
          </p>
          <p className="text-sm text-zinc-500 mt-3">
            <Link
              href="/security/check-json-formatter-upload"
              className="text-emerald-400 hover:text-emerald-300 underline"
            >
              Use the same DevTools approach to check online JSON tools
            </Link>
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Source audit</h2>
          <p className="text-sm text-zinc-500 leading-relaxed">
            The extension source code is in the same public repository as the
            web app. Every permission, content script, and formatting routine
            is auditable.{" "}
            <a
              href="https://github.com/Json-Lee-git/SafeJSON"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 underline"
            >
              View source on GitHub
            </a>
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Install</h2>
          <div className="space-y-3 text-sm text-zinc-500">
            <p>
              <strong className="text-zinc-300">Edge Add-ons:</strong>{" "}
              <a
                href="https://microsoftedge.microsoft.com/addons/detail/fjknnlcmogdhhnehcillihjhdgencgeh"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 underline"
              >
                Install from Microsoft Edge Add-ons
              </a>
            </p>
            <p>
              <strong className="text-zinc-300">Chrome Web Store:</strong>{" "}
              Pending review. Until approved, you can install manually from
              source:
            </p>
            <pre className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-xs text-zinc-400 overflow-x-auto">
              git clone https://github.com/Json-Lee-git/SafeJSON{"\n"}
              {"# "}Open chrome://extensions → Enable Developer Mode{"\n"}
              {"# "}Load unpacked → select the extension/ folder
            </pre>
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

        <p className="mt-8 text-sm text-zinc-500 text-center">
          <Link
            href="/pricing"
            className="text-emerald-400 hover:text-emerald-300 underline"
          >
            Need Diff, JWT, JSONPath, or Schema? Try each Pro tool 5 times free
          </Link>
        </p>
      </main>

      <footer className="border-t border-zinc-800 py-8 text-center text-xs text-zinc-600">
        <p>
          SafeJSON. No pasted-content upload for core tools.
        </p>
      </footer>
    </div>
  );
}
