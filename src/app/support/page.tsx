import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "JSON Formatter Help & FAQ — SafeJSON Support",
  description:
    "Learn how to use SafeJSON safely. How to format JSON, verify privacy, decode JWT tokens, compare JSON, and use JSONPath. Frequently asked questions with step-by-step guides.",
  openGraph: {
    title: "SafeJSON Help & FAQ",
    description:
      "Step-by-step SafeJSON guides for formatting JSON, verifying privacy, decoding JWTs, comparing JSON, and using JSONPath.",
    url: "/support",
  },
  alternates: {
    canonical: "/support",
  },
};

const steps = [
  {
    q: "How do I format JSON in SafeJSON?",
    id: "format",
    steps: [
      "Open https://safejson.vercel.app in your browser.",
      "Paste your JSON into the left panel (labeled Input).",
      "The formatting happens automatically. You can also press Cmd+Enter (Mac) or Ctrl+Enter (Windows).",
      "Your formatted JSON appears in the right panel. Switch between Tree view and Raw view using the tabs.",
      "Click Copy to copy the formatted result, or Download to save it as a .json file.",
    ],
  },
  {
    q: "How do I verify that SafeJSON does not upload my data?",
    id: "verify",
    steps: [
      "Open SafeJSON in your browser.",
      "Open DevTools: press F12, or right-click anywhere and select Inspect.",
      "Go to the Network tab in DevTools.",
      "Paste any JSON data into SafeJSON.",
      "Observe the Network tab: there are zero new network requests. This confirms all processing happens locally in your browser.",
      "For an even stronger test, switch to the Network tab's Offline mode before pasting. SafeJSON still works perfectly.",
    ],
  },
  {
    q: "How do I compare two JSON objects (Diff)?",
    id: "diff",
    steps: [
      "Go to https://safejson.vercel.app/diff.",
      "Paste the old version of your JSON into the left panel (Old).",
      "Paste the new version into the right panel (New).",
      "Click Compare, or press Cmd+Enter.",
      "The diff result shows: green for added values, red for removed values, amber for changed values, and gray for unchanged values.",
      "Click Sample to see an example comparison.",
    ],
  },
  {
    q: "How do I decode a JWT token?",
    id: "jwt",
    steps: [
      "Go to https://safejson.vercel.app/jwt.",
      "Paste your JWT token into the input field. A JWT token has three parts separated by dots, like: header.payload.signature.",
      "Click Decode.",
      "The decoded header and payload appear in the output panel. Switch between Header and Payload tabs.",
      "The signature is displayed at the bottom. It cannot be verified without the secret key, but you can confirm the token has not been tampered with by comparing signatures.",
      "Click Sample to see a working example.",
    ],
  },
  {
    q: "How do I query JSON with JSONPath?",
    id: "jsonpath",
    steps: [
      "Go to https://safejson.vercel.app/jsonpath.",
      "Paste your JSON data into the upper panel.",
      "Enter a JSONPath expression in the lower input. For example: $.store.books[*].title returns all book titles.",
      "Click Query or press Enter.",
      "Results appear on the right, each with its own tree view.",
    ],
  },
  {
    q: "How do I validate JSON against a Schema?",
    id: "schema",
    steps: [
      "Go to https://safejson.vercel.app/schema.",
      "Paste your JSON data into the left panel.",
      "Paste your JSON Schema into the right panel. A JSON Schema defines the expected structure, required fields, and data types.",
      "Click Validate.",
      "If valid, a green confirmation appears. If invalid, each error is listed with the specific path and reason.",
      "Click Sample to see an example.",
    ],
  },
  {
    q: "Is SafeJSON really free?",
    id: "free",
    steps: [
      "Core JSON formatting, validation, and tree view are free forever with no limits.",
      "Pro tools — JSON Diff, JWT Decoder, JSONPath Query, and Schema Validator — are available for $5/month or $39/year.",
      "Pro tools remain 100% client-side. Your data never leaves your browser even with a Pro subscription.",
      "View pricing: https://safejson.vercel.app/pricing.",
    ],
  },
  {
    q: "What happened to jsonformatter.org?",
    id: "breach",
    steps: [
      "In November 2025, security researchers at watchTowr discovered that jsonformatter.org and codebeautify.org had an unprotected Recent Links feature that publicly exposed user-submitted code snippets.",
      "Over 80,000 snippets were leaked, containing AWS keys, GitHub tokens, database passwords, Active Directory credentials, and banking PII.",
      "The data had accumulated over five years. Attackers were confirmed to be actively scraping it within 48 hours of the researchers planting canary tokens.",
      "The root cause was server-side processing: user data was stored on remote servers without adequate protection.",
      "SafeJSON eliminates this risk entirely by processing all data in your browser. There is no server to leak from.",
      "Read more: https://safejson.vercel.app/vs/jsonformatter-org.",
    ],
  },
  {
    q: "What browsers does SafeJSON support?",
    id: "browsers",
    steps: [
      "SafeJSON works on all modern browsers, including Chrome, Edge, Firefox, Safari, Brave, and Arc.",
      "The browser extension is available on the Edge Add-ons store. It automatically formats JSON responses on any URL.",
      "To install manually: clone the GitHub repository, open chrome://extensions (or edge://extensions), enable Developer mode, and load the extension/ folder.",
    ],
  },
  {
    q: "Can I use SafeJSON offline?",
    id: "offline",
    steps: [
      "Once the page is loaded, SafeJSON works without an internet connection. The formatting, validation, and all tools run entirely in your browser.",
      "To test: load SafeJSON, then disconnect from the internet or use DevTools Offline mode. Paste any JSON and format it. It works.",
      "The initial page load requires an internet connection to download the JavaScript bundle. After that, the tool is self-contained.",
    ],
  },
];

export default function SupportPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: steps.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.steps.join(" "),
      },
    })),
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
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
          Help & Frequently Asked Questions
        </h1>
        <p className="text-zinc-500 mb-10">
          Step-by-step guides for every SafeJSON feature. If you do not find
          what you need, open an issue on{" "}
          <a
            href="https://github.com/s01071233604-tech/safejson"
            className="text-emerald-400 hover:underline"
          >
            GitHub
          </a>
          .
        </p>

        {/* Quick nav */}
        <nav className="mb-12 p-4 rounded-xl border border-zinc-800 bg-zinc-900/30">
          <p className="text-xs text-zinc-600 mb-3 uppercase tracking-wider">
            Jump to
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
            {steps.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors py-1"
              >
                {s.q}
              </a>
            ))}
          </div>
        </nav>

        {/* Q&A sections */}
        <div className="space-y-16">
          {steps.map((s) => (
            <section key={s.id} id={s.id}>
              <h2 className="text-lg font-semibold mb-4">{s.q}</h2>
              <ol className="list-decimal pl-5 space-y-3">
                {s.steps.map((step, i) => (
                  <li key={i} className="text-sm text-zinc-400 leading-relaxed">
                    {step}
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-zinc-800/50 text-center">
          <p className="text-sm text-zinc-500 mb-4">
            Still have questions?
          </p>
          <Link
            href="/"
            className="inline-flex px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-xl transition-colors text-sm"
          >
            Back to SafeJSON
          </Link>
        </div>
      </main>

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
        }}
      />
    </div>
  );
}
