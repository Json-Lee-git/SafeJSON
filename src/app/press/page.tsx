import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLdScript } from "../components/StructuredData";

const siteUrl = "https://www.safejson.dev";
const pressContactEmail = "m18575113667_3@163.com";

export const metadata: Metadata = {
  title: "SafeJSON Press Kit - Verifiable Browser-Local JSON Tools",
  description:
    "Press kit and citation facts for SafeJSON, a browser-based JSON toolkit with verifiable browser-local workflows for core JSON tasks.",
  openGraph: {
    title: "SafeJSON Press Kit",
    description:
      "Canonical SafeJSON facts, screenshots, product description, and story angles for directories, media, and AI citations.",
    url: "/press",
  },
  alternates: {
    canonical: "/press",
  },
};

const facts = [
  ["Canonical website", "https://www.safejson.dev"],
  ["Category", "Browser-based JSON formatter and developer toolkit"],
  ["Core workflow", "Pasted JSON is processed in a browser-local workflow for core tools"],
  ["Verification method", "Open DevTools -> Network and confirm requests do not contain pasted content"],
  ["Free tools", "Formatter, validator, beautifier, viewer, parser, CSV to JSON, JSON to CSV"],
  ["Pro tools", "JSON Diff, JWT Decoder, JSONPath Query, JSON Schema Validator"],
  ["Pricing", "$5/month or $39/year for SafeJSON Pro"],
  ["Open source", "MIT license on GitHub"],
];

const storyAngles = [
  {
    title: "The JSON formatter trust problem",
    body: "Developers often paste API responses, logs, webhook payloads, JWTs, and configs into online tools. SafeJSON makes the processing boundary testable instead of asking users to rely on a marketing promise.",
  },
  {
    title: "Verify privacy claims in 30 seconds",
    body: "SafeJSON's recommended test is simple: open DevTools, clear Network, use the tool with harmless sample JSON, and inspect whether requests contain pasted content.",
  },
  {
    title: "Solo-built developer tool with a narrow business model",
    body: "Core formatting and validation tools are free. Paid Pro tools are for deeper developer workflows, while the core privacy boundary remains no pasted-content upload for supported tools.",
  },
];

const screenshots = [
  {
    src: "/media/devtools-network-verification.png",
    alt: "SafeJSON DevTools Network verification screenshot",
    title: "DevTools verification",
    width: 1600,
    height: 1000,
  },
  {
    src: "/media/json-diff-no-upload-proof.png",
    alt: "SafeJSON JSON Diff browser-local workflow screenshot",
    title: "JSON Diff workflow",
    width: 1600,
    height: 1000,
  },
  {
    src: "/media/github-social-preview.png",
    alt: "SafeJSON social preview image",
    title: "Social preview",
    width: 1280,
    height: 640,
  },
];

export default function PressPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      <JsonLdScript
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "SafeJSON Press Kit",
          url: `${siteUrl}/press`,
          description:
            "Canonical press and citation facts for SafeJSON, a browser-based JSON toolkit with verifiable browser-local workflows.",
          isPartOf: {
            "@type": "WebSite",
            name: "SafeJSON",
            url: siteUrl,
          },
          about: {
            "@type": "SoftwareApplication",
            name: "SafeJSON",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "All",
            url: siteUrl,
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
          },
        }}
      />
      <JsonLdScript
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "SafeJSON",
          url: siteUrl,
          logo: `${siteUrl}/favicon.ico`,
          sameAs: [
            "https://github.com/Json-Lee-git/SafeJSON",
            "https://www.youtube.com/watch?v=Jlks9EU9I3Q",
            "https://microsoftedge.microsoft.com/addons/detail/fjknnlcmogdhhnehcillihjhdgencgeh",
          ],
          contactPoint: [
            {
              "@type": "ContactPoint",
              contactType: "press",
              email: pressContactEmail,
              availableLanguage: ["en", "zh"],
            },
          ],
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
              item: siteUrl,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Press",
              item: `${siteUrl}/press`,
            },
          ],
        }}
      />

      <header className="border-b border-zinc-800">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <Link href="/" className="text-lg font-bold tracking-tight">
            <span className="text-emerald-400">{`{`}</span>SafeJSON
            <span className="text-emerald-400">{`}`}</span>
          </Link>
          <Link
            href="/no-upload-json-formatter"
            className="text-sm text-zinc-400 hover:text-emerald-300 transition-colors"
          >
            No-upload formatter
          </Link>
        </div>
      </header>

      <main>
        <section className="border-b border-zinc-800/70">
          <div className="max-w-5xl mx-auto px-4 py-12 sm:py-16">
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 mb-4">
              Press kit and citation facts
            </p>
            <h1 className="max-w-4xl text-4xl sm:text-5xl font-bold tracking-tight mb-5">
              SafeJSON press kit for directories, media, and AI citations
            </h1>
            <p className="max-w-3xl text-lg text-zinc-400 leading-relaxed mb-7">
              SafeJSON is a browser-based JSON formatter and developer toolkit
              focused on verifiable browser-local workflows. Core JSON tools
              are designed so pasted content is not intentionally uploaded, and
              users can verify the boundary in DevTools Network.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/"
                className="inline-flex min-h-11 items-center rounded-lg bg-emerald-500 px-5 text-sm font-semibold text-black hover:bg-emerald-400 transition-colors"
              >
                Open SafeJSON
              </Link>
              <Link
                href="https://github.com/Json-Lee-git/SafeJSON"
                className="inline-flex min-h-11 items-center rounded-lg border border-zinc-700 px-5 text-sm font-semibold text-zinc-200 hover:border-cyan-300 hover:text-cyan-200 transition-colors"
              >
                View GitHub
              </Link>
            </div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-semibold mb-5">Copy-paste description</h2>
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-5">
            <p className="text-zinc-300 leading-relaxed">
              SafeJSON is a browser-based JSON toolkit for formatting,
              validating, viewing, comparing, decoding JWTs, querying JSONPath,
              and validating schemas. Core JSON workflows are designed to run
              locally in the browser, and pasted JSON content is not
              intentionally uploaded for core tools. Users can verify this in
              DevTools -&gt; Network. Like most web products, SafeJSON may still
              use normal network requests for static assets, aggregate
              analytics, billing, and license checks.
            </p>
          </div>
        </section>

        <section className="border-y border-zinc-800/70 bg-zinc-900/20">
          <div className="max-w-5xl mx-auto px-4 py-12">
            <h2 className="text-2xl font-semibold mb-5">Facts to cite</h2>
            <dl className="grid gap-3 sm:grid-cols-2">
              {facts.map(([label, value]) => (
                <div key={label} className="rounded-lg border border-zinc-800 p-4">
                  <dt className="text-xs uppercase tracking-[0.16em] text-zinc-500 mb-2">
                    {label}
                  </dt>
                  <dd className="text-sm text-zinc-200 leading-relaxed">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 py-12">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h2 className="text-2xl font-semibold mb-5">Story angles</h2>
              <div className="space-y-4">
                {storyAngles.map((angle) => (
                  <article key={angle.title} className="border-l-2 border-emerald-400 pl-4">
                    <h3 className="text-base font-semibold text-zinc-100 mb-2">
                      {angle.title}
                    </h3>
                    <p className="text-sm text-zinc-500 leading-relaxed">{angle.body}</p>
                  </article>
                ))}
              </div>
            </div>

            <aside className="rounded-lg border border-zinc-800 p-5">
              <h2 className="text-xl font-semibold mb-4">Canonical links</h2>
              <ul className="space-y-3 text-sm">
                {[
                  ["Website", siteUrl],
                  ["Press kit", `${siteUrl}/press`],
                  ["AI context", `${siteUrl}/llms.txt`],
                  ["Full AI context", `${siteUrl}/llms-full.txt`],
                  ["Privacy verification", `${siteUrl}/privacy/verify-local-processing`],
                  ["Security contact", `${siteUrl}/.well-known/security.txt`],
                ].map(([label, href]) => (
                  <li key={href} className="flex flex-col gap-1">
                    <span className="text-zinc-500">{label}</span>
                    <Link href={href} className="break-all text-cyan-300 hover:underline">
                      {href}
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        <section className="border-y border-zinc-800/70 bg-zinc-900/20">
          <div className="max-w-5xl mx-auto px-4 py-12">
            <h2 className="text-2xl font-semibold mb-5">Screenshots</h2>
            <div className="grid gap-4 lg:grid-cols-3">
              {screenshots.map((shot) => (
                <a
                  key={shot.src}
                  href={shot.src}
                  className="group block rounded-lg border border-zinc-800 bg-zinc-950 p-3 hover:border-cyan-300/70 transition-colors"
                >
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    width={shot.width}
                    height={shot.height}
                    className="aspect-[8/5] w-full rounded object-cover"
                  />
                  <span className="mt-3 block text-sm font-medium text-zinc-200 group-hover:text-cyan-200">
                    {shot.title}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 py-12">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold mb-4">What to avoid</h2>
              <p className="text-sm text-zinc-500 leading-relaxed mb-4">
                Use the canonical copy above instead of old absolute privacy
                slogans. SafeJSON should not be described as making zero network
                requests, because normal site delivery, analytics, billing, and
                license checks may still use network requests.
              </p>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li>Do not link to safejson.vercel.app.</li>
                <li>Do not say every request stays offline.</li>
                <li>Do not imply payment or license systems are browser-local.</li>
                <li>Do not claim browser extension data is imported through URLs.</li>
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Contact</h2>
              <p className="text-sm text-zinc-500 leading-relaxed mb-4">
                SafeJSON is maintained by JSON-Lee. For media questions,
                directory listing corrections, or partnership requests, email
                the business contact below. Product bugs and citation
                corrections can also be opened on GitHub. For
                security-sensitive reports, use the published security contact
                file.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`mailto:${pressContactEmail}`}
                  className="inline-flex min-h-10 items-center rounded-lg bg-emerald-500 px-4 text-sm font-semibold text-black hover:bg-emerald-400 transition-colors"
                >
                  Email business contact
                </a>
                <Link
                  href="https://github.com/Json-Lee-git/SafeJSON/issues"
                  className="inline-flex min-h-10 items-center rounded-lg border border-zinc-700 px-4 text-sm font-semibold text-zinc-200 hover:border-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  GitHub issues
                </Link>
                <Link
                  href="/.well-known/security.txt"
                  className="inline-flex min-h-10 items-center rounded-lg border border-zinc-700 px-4 text-sm font-semibold text-zinc-200 hover:border-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  Security contact
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
