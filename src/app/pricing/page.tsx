import Link from "next/link";
import {
  BreadcrumbSchema,
  JsonLdScript,
  ProductSchema,
} from "../components/StructuredData";
import EventOnView from "../components/EventOnView";
import TrackedAnchor from "../components/TrackedAnchor";

export default function PricingPage() {
  const pricingFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What happens after I buy SafeJSON Pro?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Lemon Squeezy sends a SafeJSON Pro license key by email. Open the SafeJSON unlock page, paste the license key, and the browser is activated for Pro tools.",
        },
      },
      {
        "@type": "Question",
        name: "How many devices can use one SafeJSON Pro license?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Each SafeJSON Pro license can be activated on up to 2 devices.",
        },
      },
      {
        "@type": "Question",
        name: "Does SafeJSON Pro upload my JSON, JWT, or schema data?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. SafeJSON Pro tools run locally in the browser. Payment and license activation happen through Lemon Squeezy, but pasted JSON, JWTs, JSONPath queries, and schemas are processed client-side.",
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      <EventOnView name="pricing_viewed" params={{ surface: "pricing_page" }} />
      <BreadcrumbSchema
        items={[
          { name: "SafeJSON", url: "https://www.safejson.dev" },
          { name: "Pricing", url: "https://www.safejson.dev/pricing" },
        ]}
      />
      <ProductSchema />
      <JsonLdScript data={pricingFaqSchema} />
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
            who debug JSON every day. Try each Pro tool 5 times free.
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
                "Large local JSON workflow support",
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
              <TrackedAnchor
                href="https://jsonlee.lemonsqueezy.com/checkout/buy/6a37f7c4-32a2-4390-8545-99864d388725"
                target="_blank"
                rel="noopener noreferrer"
                eventName="checkout_click"
                eventParams={{ plan: "monthly", price_usd: 5 }}
                className="block w-full text-center py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm transition-colors"
              >
                Get Pro Monthly - $5
              </TrackedAnchor>
              <TrackedAnchor
                href="https://jsonlee.lemonsqueezy.com/checkout/buy/924b3488-c62c-4628-ad09-7ed793b081d9"
                target="_blank"
                rel="noopener noreferrer"
                eventName="checkout_click"
                eventParams={{ plan: "yearly", price_usd: 39 }}
                className="block w-full text-center py-3 rounded-xl border border-zinc-700 hover:border-zinc-500 text-zinc-300 font-medium text-sm transition-colors"
              >
                Get Pro Yearly - $39
              </TrackedAnchor>
            </div>
            <p className="text-xs text-zinc-600 text-center mt-3">
              Cancel anytime. No questions asked. Payment handled securely by
              Lemon Squeezy.
            </p>
            <p className="text-xs text-zinc-500 text-center mt-3">
              After checkout, Lemon Squeezy emails your license key. One license
              activates up to 2 devices.
            </p>
            <p className="text-xs text-zinc-500 text-center mt-3">
              Already purchased?{" "}
              <Link
                href="/unlock"
                className="text-emerald-400 hover:text-emerald-300"
              >
                Unlock Pro in this browser
              </Link>
              .
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
                desc: "Audit every line on GitHub. No obfuscated data-collection scripts.",
              },
              {
                title: "Verifiable",
                desc: "Open DevTools -> Network. Check that pasted content is not uploaded. You do not have to trust us.",
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

        <section className="max-w-3xl mx-auto mt-14 border-t border-zinc-800/50 pt-10">
          <h2 className="text-center text-xl font-semibold mb-6">
            SafeJSON Pro questions
          </h2>
          <div className="space-y-5">
            {[
              {
                q: "What happens after checkout?",
                a: "Lemon Squeezy redirects you back to SafeJSON and emails your license key. Paste that key on the unlock page to activate Pro in this browser.",
              },
              {
                q: "Can I use Pro on more than one device?",
                a: "Yes. Each license supports up to 2 device activations, so you can use it on your main browser and one backup device.",
              },
              {
                q: "Do Pro tools still run locally?",
                a: "Yes. Diff, JWT Decoder, JSONPath, and Schema Validator still process your data in the browser. License activation is the only server-backed step.",
              },
            ].map((item) => (
              <div key={item.q}>
                <h3 className="text-sm font-semibold text-zinc-200">
                  {item.q}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                  {item.a}
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
