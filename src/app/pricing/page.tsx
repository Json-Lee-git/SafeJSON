import Link from "next/link";
import { BreadcrumbSchema, SoftwareAppSchema } from "../components/StructuredData";
import Footer from "../components/Footer";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      <BreadcrumbSchema
        items={[
          { name: "SafeJSON", url: "https://safejson.dev" },
          { name: "Pricing", url: "https://safejson.dev/pricing" },
        ]}
      />
      <SoftwareAppSchema />
      <header className="border-b border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center">
          <Link
            href="/"
            className="text-lg font-bold tracking-tight hover:opacity-80 transition-opacity"
          >
            <span className="text-emerald-400">{`{`}</span>
            SafeJSON
            <span className="text-emerald-400">{`}`}</span>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Simple,{" "}
            <span className="text-emerald-400">privacy-first</span> pricing
          </h1>
          <p className="text-zinc-500 max-w-lg mx-auto">
            Core JSON formatting is free forever. Advanced tools for developers
            who debug JSON every day.
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-14 p-6 rounded-2xl border border-red-400/10 bg-red-400/[0.03]">
          <p className="text-sm text-zinc-300 font-semibold mb-4">
            You paste sensitive data into online tools every day. Here&apos;s
            why that matters.
          </p>
          <p className="text-sm text-zinc-500 leading-relaxed mb-3">
            jsonformatter.org leaked 80K credentials in November 2025,
            including AWS keys, GitHub tokens, database passwords, and banking
            details.
          </p>
          <p className="text-sm text-zinc-500 leading-relaxed mb-3">
            The JSON Formatter extension was sold, closed-sourced, and turned
            into adware after reaching 2M users.
          </p>
          <p className="text-sm text-zinc-500 leading-relaxed mb-3">
            Every time you paste an API response, a JWT token, or a config file
            into a server-side tool, your data makes a round trip through
            infrastructure you do not control.
          </p>
          <p className="text-sm text-zinc-400 leading-relaxed">
            SafeJSON Pro gives you Diff, JWT, JSONPath, and Schema - all 100%
            client-side. Your data never leaves your browser. Prove it: open
            DevTools while using any Pro tool.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <div className="p-8 rounded-2xl border border-zinc-800 bg-zinc-900/30">
            <h2 className="text-lg font-semibold mb-1">Free</h2>
            <p className="text-4xl font-bold mb-6">
              $0
              <span className="text-base font-normal text-zinc-500">
                /forever
              </span>
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "JSON Formatter & Validator",
                "Tree view with collapse",
                "Error detection (line + column)",
                "Dark mode",
                "Copy & Download",
                "100% client-side privacy",
              ].map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2 text-sm text-zinc-400"
                >
                  <span className="text-emerald-400 shrink-0 mt-0.5">
                    &#10003;
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
            <Link
              href="/"
              className="block w-full text-center py-3 rounded-xl border border-zinc-700 text-sm font-medium text-zinc-300 hover:bg-zinc-800 transition-colors"
            >
              Use Free
            </Link>
          </div>

          <div className="p-8 rounded-2xl border border-emerald-400/30 bg-emerald-400/5 relative">
            <div className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-emerald-400 text-black text-xs font-semibold">
              Pro
            </div>
            <h2 className="text-lg font-semibold mb-1 mt-1">Pro</h2>
            <p className="text-4xl font-bold mb-1">
              $5
              <span className="text-base font-normal text-zinc-500">
                /month
              </span>
            </p>
            <p className="text-xs text-zinc-600 mb-6">
              or $39/year (save 35%)
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Everything in Free",
                "JSON Diff Checker",
                "JWT Decoder",
                "JSONPath Query",
                "Schema Validator",
                "Large file support (50MB+)",
                "Priority support",
              ].map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2 text-sm text-zinc-300"
                >
                  <span className="text-emerald-400 shrink-0 mt-0.5">
                    &#10003;
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
            <div className="space-y-2">
              <a
                href="https://jsonlee.lemonsqueezy.com/checkout/buy/6a37f7c4-32a2-4390-8545-99864d388725"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm transition-colors"
              >
                Get Pro Monthly - $5
              </a>
              <a
                href="https://jsonlee.lemonsqueezy.com/checkout/buy/924b3488-c62c-4628-ad09-7ed793b081d9"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-3 rounded-xl border border-zinc-700 hover:border-zinc-500 text-zinc-300 font-medium text-sm transition-colors"
              >
                Get Pro Yearly - $39
              </a>
            </div>
            <p className="text-xs text-zinc-600 text-center mt-3">
              Cancel anytime. No questions asked. Payment handled securely by
              Lemon Squeezy.
            </p>
          </div>
        </div>

        <section className="max-w-3xl mx-auto mt-14">
          <h2 className="text-center text-xl font-semibold mb-6">
            Why developers trust SafeJSON
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: "Open Source (MIT)",
                desc: "Audit every line on GitHub. No obfuscated tracking scripts.",
              },
              {
                title: "Verifiable",
                desc: "Open DevTools -> Network. Zero requests. You do not have to trust us.",
              },
              {
                title: "Independent",
                desc: "Solo developer, self-funded. No VC pressure to monetize data.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5"
              >
                <h3 className="text-sm font-semibold text-zinc-200">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-zinc-500">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-16 text-center">
          <p className="text-xs text-zinc-600 max-w-md mx-auto leading-relaxed">
            All tools run entirely in your browser. We never see your data.
            Payment is handled securely by Lemon Squeezy - we never see your
            payment details either.
          </p>
        </div>
      </main>
    </div>
  );
}
