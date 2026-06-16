import Link from "next/link";
import {
  BreadcrumbSchema,
  JsonLdScript,
  ProductSchema,
} from "../components/StructuredData";
import EventOnView from "../components/EventOnView";
import TrackedAnchor from "../components/TrackedAnchor";

const teamLiteIssueUrl =
  "https://github.com/Json-Lee-git/SafeJSON/issues/new?title=Team%20Lite%20license%20request&body=Team%20size%3A%0AUse%20case%3A%0AInvoice%20need%3A%0ASecurity%20requirement%3A%0ASSO%2Fcompliance%20required%3A";

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
          text: "SafeJSON Pro tools use the same browser-local JSON workflow as the free tools. Payment and license activation happen through Lemon Squeezy, but pasted JSON, JWTs, JSONPath queries, and schemas are not sent to analytics.",
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
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="text-lg font-bold tracking-tight hover:opacity-80 transition-opacity"
          >
            <span className="text-emerald-400">{`{`}</span>
            SafeJSON
            <span className="text-emerald-400">{`}`}</span>
          </Link>
          <nav className="hidden md:flex items-center gap-4 text-sm text-zinc-500">
            <Link href="/json-diff" className="hover:text-zinc-300">
              JSON Diff
            </Link>
            <Link href="/jwt-decoder" className="hover:text-zinc-300">
              JWT
            </Link>
            <Link href="/jsonpath-query" className="hover:text-zinc-300">
              JSONPath
            </Link>
            <Link href="/json-schema-validator" className="hover:text-zinc-300">
              Schema
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-14">
          <p className="text-xs font-medium text-emerald-400/80 uppercase tracking-wider mb-3">
            Pro tools for sensitive JSON workflows
          </p>
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Pricing for API payloads, JWTs, schemas, and config debugging
          </h1>
          <p className="text-zinc-500 max-w-2xl mx-auto">
            Core JSON formatting is free. Pro is for developers comparing API
            responses, inspecting JWT claims, querying nested payloads,
            validating webhook schemas, and doing it with no pasted-content
            upload for core tools. Try each Pro tool 5 times free.
          </p>
        </div>

        <section className="max-w-3xl mx-auto mb-12 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6">
          <h2 className="text-lg font-semibold mb-4">
            What SafeJSON Pro adds
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "JSON Diff for API/webhook/config payloads",
              "JWT claim inspection",
              "JSONPath query for nested API responses",
              "Schema validation for API/webhook payloads",
              "5 free runs before upgrading",
              "No pasted-content upload for core tools",
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-zinc-800 bg-zinc-950/40 px-4 py-3 text-sm text-zinc-300"
              >
                {item}
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            <Link
              href="/json-diff"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
            >
              Try JSON Diff free
            </Link>
            <Link
              href="/jwt-decoder"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
            >
              Try JWT Decoder free
            </Link>
            <Link
              href="/jsonpath-query"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
            >
              Try JSONPath Query free
            </Link>
            <Link
              href="/json-schema-validator"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
            >
              Try Schema Validator free
            </Link>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
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
                "JSON Formatter and Validator",
                "Tree view with collapse",
                "Error detection with line and column",
                "Dark mode",
                "Copy and Download",
                "No pasted-content upload",
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
                "JSON Diff for API and webhook payloads",
                "JWT Decoder for auth claim inspection",
                "JSONPath Query for nested API responses",
                "Schema Validator for API and webhook data",
                "5 free runs on each Pro workflow",
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
                secondaryEventName="pricing_upgrade_clicked"
                secondaryEventParams={{ plan: "monthly", price_usd: 5 }}
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
                secondaryEventName="pricing_upgrade_clicked"
                secondaryEventParams={{ plan: "yearly", price_usd: 39 }}
                className="block w-full text-center py-3 rounded-xl border border-zinc-700 hover:border-zinc-500 text-zinc-300 font-medium text-sm transition-colors"
              >
                Get Pro Yearly - $39
              </TrackedAnchor>
            </div>
            <p className="text-xs text-zinc-600 text-center mt-3">
              Cancel anytime. Payment and license delivery are handled by Lemon
              Squeezy.
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
        </section>

        <section className="max-w-3xl mx-auto mt-12 rounded-2xl border border-amber-400/20 bg-amber-400/[0.04] p-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-xs font-medium text-amber-300 uppercase tracking-wider mb-3">
                Demand test
              </p>
              <h2 className="text-2xl font-semibold mb-3">
                Need SafeJSON for a small team?
              </h2>
              <p className="text-sm leading-relaxed text-zinc-400 max-w-xl">
                For small dev teams handling API payloads, JWTs, schemas, and
                webhook data. Simple team license. No pasted-content upload for
                core tools. Invoice-friendly purchase can be discussed. No SSO, admin dashboard, compliance package, or SLA.
              </p>
              <p className="mt-3 text-sm text-zinc-500">
                Small team licenses can start around 5 seats. Early Team Lite
                pricing is being tested for small teams.
              </p>
            </div>
            <TrackedAnchor
              href={teamLiteIssueUrl}
              target="_blank"
              rel="noopener noreferrer"
              eventName="pricing_team_lite_clicked"
              secondaryEventName="team_lite_request_clicked"
              className="shrink-0 rounded-xl bg-amber-300 px-5 py-3 text-sm font-semibold text-zinc-950 hover:bg-amber-200 transition-colors"
            >
              Request Team Lite
            </TrackedAnchor>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-5">
            {[
              "team size",
              "use case",
              "invoice need",
              "security requirement",
              "whether SSO/compliance is required",
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-zinc-800 bg-zinc-950/40 px-3 py-2 text-xs text-zinc-400"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-3xl mx-auto mt-12 text-center">
          <p className="text-xs text-zinc-500">
            Before upgrading, verify the browser-local workflow:{" "}
            <TrackedAnchor
              href="/privacy/verify-local-processing"
              eventName="verify_link_clicked"
              eventParams={{ source: "pricing_trust_links" }}
              className="text-emerald-400 hover:text-emerald-300 underline"
            >
              Verify in DevTools
            </TrackedAnchor>
            ,{" "}
            <TrackedAnchor
              href="/security/check-json-formatter-upload"
              eventName="security_guide_link_clicked"
              eventParams={{ source: "pricing_trust_links" }}
              className="text-emerald-400 hover:text-emerald-300 underline"
            >
              security guide
            </TrackedAnchor>
            ,{" "}
            <Link
              href="/extension/permissions"
              className="text-emerald-400 hover:text-emerald-300 underline"
            >
              extension permissions
            </Link>
          </p>
        </section>

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
                desc: "Open DevTools Network and check that requests do not contain pasted content.",
              },
              {
                title: "Focused",
                desc: "Built for JSON payloads, JWTs, JSONPath, schemas, and config snapshots without adding a team backend.",
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
                q: "Do Pro tools keep the same privacy boundary?",
                a: "Yes. Diff, JWT Decoder, JSONPath, and Schema Validator keep the no pasted-content upload boundary for core tool operations. License activation is the server-backed step.",
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
            Core tool operations use a browser-local workflow with no
            pasted-content upload. Payment is handled by Lemon Squeezy; SafeJSON
            does not receive your payment details.
          </p>
        </div>
      </main>
    </div>
  );
}
