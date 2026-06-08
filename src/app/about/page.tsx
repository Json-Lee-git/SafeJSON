import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About SafeJSON — Privacy-first JSON Tools",
  description:
    "SafeJSON is built by an independent developer who believes developer tools should not require trusting strangers with your data. Learn about the project and its mission.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
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
            making a security decision — whether you realize it or not.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            We believe the safest tools are the ones that never see your data in
            the first place. Every SafeJSON feature runs entirely in your
            browser. No server processes your JSON. No data leaves your device.
            This is verifiable: open DevTools → Network tab while using SafeJSON
            and you will see zero new requests.
          </p>
        </section>

        {/* Origin story */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Why SafeJSON was built</h2>
          <p className="text-zinc-400 leading-relaxed mb-3">
            In November 2025, security researchers at watchTowr revealed that
            jsonformatter.org and codebeautify.org — two of the most popular
            online JSON tools — had been leaking user data for over five years.
            An unprotected feature exposed 80,000+ code snippets containing AWS
            access keys, GitHub personal access tokens, database passwords, and
            banking PII. Attackers were actively harvesting the data within 48
            hours of the discovery.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-3">
            Around the same time, the most popular JSON Formatter Chrome
            extension — with over 2 million users — was sold to a new owner.
            The extension was closed-sourced and injected with tracking scripts,
            checkout popups, and a hardcoded API key for harvesting user
            location data.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            SafeJSON was built as a direct response: if all processing happens
            in the browser, there is nothing for a server to leak.
          </p>
        </section>

        {/* Technology */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">How it works</h2>
          <p className="text-zinc-400 leading-relaxed mb-3">
            SafeJSON is a static web application built with Next.js and Tailwind
            CSS, deployed on Vercel. There is no backend server processing user
            data. All JSON formatting, validation, diff comparison, JWT
            decoding, JSONPath evaluation, and schema validation runs in
            client-side JavaScript using the browser&apos;s native capabilities.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            The entire codebase is open source under the MIT license and
            available on{" "}
            <a
              href="https://github.com/s01071233604-tech/safejson"
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
            privacy-first tools. The project is self-funded and independent —
            no venture capital, no external investors, no corporate parent
            company.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            Being independent means we answer only to our users. There is no
            pressure to monetize through data collection, advertising, or
            tracking. The business model is straightforward: core tools are free
            forever, and Pro features are available through a paid subscription
            that is still 100% client-side.
          </p>
        </section>

        {/* Contact */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Contact</h2>
          <p className="text-zinc-400 leading-relaxed">
            For questions, feedback, or bug reports, open an issue on{" "}
            <a
              href="https://github.com/s01071233604-tech/safejson"
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
