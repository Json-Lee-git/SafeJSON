import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About SafeJSON - Verifiable Browser-Local JSON Tools",
  description:
    "SafeJSON is an independent JSON toolkit built around verifiable browser-local workflows. Learn how to verify pasted content is not uploaded during core tool use.",
  openGraph: {
    title: "About SafeJSON",
    description:
      "SafeJSON is a browser-based JSON toolkit with verifiable browser-local workflows.",
    url: "/about",
  },
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "JSON-Lee",
            url: "https://www.safejson.dev/about",
            sameAs: ["https://github.com/Json-lee-gitle", "https://dev.to/_6a9b7b682ef6dfb20e506"],
            knowsAbout: ["JSON", "Web Security", "Privacy", "Developer Tools", "Client-Side Processing"],
            description: "Solo developer building verifiable browser-local developer tools. Creator of SafeJSON.",
          }).replace(/</g, "\\u003c"),
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
        <h1 className="text-3xl font-bold tracking-tight mb-8">
          About SafeJSON
        </h1>

        {/* Mission */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Our mission</h2>
          <p className="text-zinc-400 leading-relaxed mb-3">
            SafeJSON exists because developer tools should not require trusting
            strangers with your data. Every time you paste an API response, a
            JWT token, or a configuration file into an online tool, you are
            making a security decision - whether you realize it or not.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            We believe sensitive developer tools should make their processing
            boundary verifiable. SafeJSON core workflows run in the browser and
            are designed so pasted content is not intentionally uploaded.
            This is verifiable: open DevTools -&gt; Network tab while using
            SafeJSON and check that no request contains your pasted content.
          </p>
        </section>

        {/* Origin story */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Why SafeJSON was built</h2>
          <p className="text-zinc-400 leading-relaxed mb-3">
            In November 2025, security researchers at watchTowr revealed that
            jsonformatter.org and codebeautify.org - two of the most popular
            online JSON tools - had been leaking user data for over five years.
            An unprotected feature exposed 80,000+ code snippets containing AWS
            access keys, GitHub personal access tokens, database passwords, and
            banking PII. Attackers were actively harvesting the data within 48
            hours of the discovery.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-3">
            Around the same time, the most popular JSON Formatter Chrome
            extension - with over 2 million users - was sold to a new owner.
            The extension was closed-sourced and injected with tracking scripts,
            checkout popups, and a hardcoded API key for harvesting user
            location data.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            SafeJSON was built as a direct response: keep core JSON workflows
            browser-local and make the pasted-content boundary easy to verify.
          </p>
        </section>

        {/* Technology */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">How it works</h2>
          <p className="text-zinc-400 leading-relaxed mb-3">
            SafeJSON is a static web application built with Next.js and Tailwind
            CSS, deployed on Vercel. Core JSON formatting, validation, diff
            comparison, JWT decoding, JSONPath evaluation, and schema
            validation run in browser JavaScript for pasted input. Normal site
            delivery, analytics, billing, and license activation may still use
            network requests.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            The entire codebase is open source under the MIT license and
            available on{" "}
            <a
              href="https://github.com/Json-lee-gitle-tech/safejson"
              className="text-emerald-400 hover:underline"
            >
              GitHub
            </a>
            . You can audit every line of code to verify these claims
            independently.
          </p>
        </section>

        {/* The team */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Built by an independent developer</h2>
          <p className="text-zinc-400 leading-relaxed mb-3">
            SafeJSON is developed and maintained by a solo developer who builds
            verifiable browser-local tools. The project is self-funded and independent -
            no venture capital, no external investors, no corporate parent
            company.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            Being independent means we answer only to our users. There is no
            pressure to monetize through data collection, advertising, or
            tracking. The business model is straightforward: core tools are free
            forever, and Pro features are available through a paid subscription
            while preserving the no pasted-content upload boundary for core
            tool inputs.
          </p>
        </section>

        {/* Contact */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Contact</h2>
          <p className="text-zinc-400 leading-relaxed">
            For questions, feedback, or bug reports, open an issue on{" "}
            <a
              href="https://github.com/Json-lee-gitle-tech/safejson"
              className="text-emerald-400 hover:underline"
            >
              GitHub
            </a>
            . For security-sensitive matters, refer to the repository&apos;s
            security policy.
          </p>
        </section>

        <div className="text-center pt-8 border-t border-zinc-800/50">
          <Link
            href="/"
            className="inline-flex px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-xl transition-colors text-sm"
          >
            Back to SafeJSON
          </Link>
        </div>
      </main>
    </div>
  );
}
