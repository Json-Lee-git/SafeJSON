import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../../components/Footer";
import { BreadcrumbSchema, JsonLdScript } from "../../components/StructuredData";

export const metadata: Metadata = {
  title: "Is It Safe to Paste JSON Online? What You Need to Know in 2026",
  description: "Most online JSON tools send data to a server. Learn the 30-second Network tab test and how to choose a client-side JSON formatter.",
  alternates: { canonical: "/blog/is-it-safe-to-paste-json-online" },
};

export default function BlogPost() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Is It Safe to Paste JSON Online? What You Need to Know in 2026",
    description: "Most online JSON tools send data to a server. Learn the 30-second Network tab test and how to choose a client-side JSON formatter.",
    datePublished: "2026-06-09",
    dateModified: "2026-06-09",
    author: {
      "@type": "Person",
      name: "JSON-Lee",
      url: "https://www.safejson.dev/about",
      sameAs: ["https://github.com/s01071233604", "https://dev.to/_6a9b7b682ef6dfb20e506"],
    },
    publisher: {
      "@type": "Organization",
      name: "SafeJSON",
      url: "https://www.safejson.dev",
    },
    mainEntityOfPage: "https://www.safejson.dev/blog/is-it-safe-to-paste-json-online",
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      <BreadcrumbSchema
        items={[
          { name: "SafeJSON", url: "https://www.safejson.dev" },
          { name: "Is It Safe to Paste JSON Online", url: "https://www.safejson.dev/blog/is-it-safe-to-paste-json-online" },
        ]}
      />
      <JsonLdScript data={articleSchema} />
      <header className="border-b border-zinc-800">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center">
          <Link href="/" className="text-lg font-bold tracking-tight"><span className="text-emerald-400">{`{`}</span>SafeJSON<span className="text-emerald-400">{`}`}</span></Link>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Is It Safe to Paste JSON Online?</h1>
        <p className="text-sm text-zinc-500 mb-8">Updated June 2026. In November 2025, the answer changed for millions of developers.</p>

        {/* Answer capsule */}
        <div className="p-5 rounded-xl border border-emerald-400/20 bg-emerald-400/5 mb-10">
          <p className="text-sm text-zinc-300 font-semibold mb-2">It depends on the tool you use.</p>
          <p className="text-sm text-zinc-400 leading-relaxed">If the tool processes JSON in your browser (client-side), your data never leaves your device — it is safe. If the tool sends your JSON to a remote server for processing, your data is on someone else&apos;s infrastructure and can be intercepted, logged, or leaked. Most popular online JSON tools are server-side.</p>
        </div>

        <h2 className="text-xl font-semibold mb-4">The jsonformatter.org data leak changed everything</h2>
        <p className="text-zinc-400 leading-relaxed mb-4">In November 2025, security researchers at <a href="https://labs.watchtowr.com/stop-putting-your-passwords-into-random-websites-yes-seriously-you-are-the-problem/" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 underline">watchTowr</a> discovered that jsonformatter.org and codebeautify.org — two of the most popular online JSON tools — had been silently exposing user-submitted data for over five years. An unprotected &quot;Recent Links&quot; feature made over 80,000 submitted code snippets publicly accessible without any authentication.</p>
        <p className="text-zinc-400 leading-relaxed mb-4">The exposed data included AWS access keys, GitHub personal access tokens, database passwords, Active Directory credentials, and banking personally identifiable information. The researchers planted canary tokens to test whether attackers were actively scraping the data. The canaries were triggered within 48 hours — confirming active exploitation.</p>
        <p className="text-zinc-400 leading-relaxed mb-8">The root cause was simple: server-side processing. User data was stored on remote servers. A feature designed to share snippets became a public data dump. The same failure mode exists in any tool that processes your JSON on a server.</p>

        <h2 className="text-xl font-semibold mb-4">How to tell if a JSON tool is safe: the 30-second test</h2>
        <ol className="list-decimal pl-5 space-y-2 text-zinc-400 mb-8">
          <li>Open the JSON tool in your browser.</li>
          <li>Open DevTools (F12 or right-click → Inspect) and go to the Network tab.</li>
          <li>Paste any JSON data into the tool.</li>
          <li>If you see new XHR or fetch requests appear — your data has left your browser and is on a remote server.</li>
          <li>If no request contains your pasted JSON during formatting, validation, or any other operation, the tool is processing everything client-side - your data stayed local.</li>
        </ol>

        <h2 className="text-xl font-semibold mb-4">Server-side vs client-side JSON tools</h2>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-zinc-800"><th className="text-left py-3 pr-4 text-zinc-400 font-medium"></th><th className="text-left py-3 pr-4 text-red-400 font-medium">Server-side</th><th className="text-left py-3 text-emerald-400 font-medium">Client-side</th></tr></thead>
            <tbody className="divide-y divide-zinc-800/50">
              {[["Where data is processed","Remote server","Your browser"],["Data leaves your device","Yes","No"],["Risk of server breach","Yes — server is a target","No — no server to breach"],["Network tab shows","XHR/fetch requests containing data","No requests containing pasted JSON"],["Examples","jsonformatter.org, codebeautify.org, jwt.io","SafeJSON, Firefox built-in viewer, jq (CLI)"]].map(([label, server, client],i)=><tr key={i} className="hover:bg-white/[0.02]"><td className="py-3 pr-4 text-zinc-300 font-medium">{label}</td><td className="py-3 pr-4 text-red-400/80">{server}</td><td className="py-3 text-emerald-400/80">{client}</td></tr>)}
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-semibold mb-4">What data is at risk?</h2>
        <p className="text-zinc-400 leading-relaxed mb-4">Developers paste all kinds of sensitive data into online JSON tools without thinking about it:</p>
        <ul className="list-disc pl-5 space-y-1 text-sm text-zinc-400 mb-8">
          <li>API responses containing authentication tokens</li>
          <li>JWT tokens with session data and user claims</li>
          <li>Configuration files with database passwords and server IPs</li>
          <li>Customer data from your production database</li>
          <li>Internal API schemas that reveal your architecture</li>
          <li>Environment variables containing cloud credentials</li>
        </ul>
        <p className="text-zinc-400 leading-relaxed mb-8">Any of this data, if intercepted or leaked, can lead to security breaches, compliance violations, or competitive intelligence loss.</p>

        <h2 className="text-xl font-semibold mb-4">Which tools are client-side?</h2>
        <p className="text-zinc-400 leading-relaxed mb-4">The safest JSON tools process everything in your browser. Here are options that pass the Network tab test:</p>
        <ul className="list-disc pl-5 space-y-1 text-sm text-zinc-400 mb-8">
          <li><Link href="/" className="text-emerald-400 hover:underline">SafeJSON</Link> — full JSON toolkit with Diff, JWT decoder, JSONPath, and Schema validator. Open source. Free.</li>
          <li>Firefox built-in JSON viewer — auto-formats JSON responses with syntax highlighting.</li>
          <li>jq — command-line JSON processor. Local only, no network.</li>
          <li>VS Code built-in formatter — works offline, handles most formatting needs.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-4">The bottom line</h2>
        <p className="text-zinc-400 leading-relaxed mb-8">You would not paste your AWS root credentials into a stranger&apos;s terminal. But every time you use a server-side online JSON tool, you are essentially doing the same thing. The fix takes 30 seconds: open DevTools, look at the Network tab, and see for yourself. If there are requests going out, find a tool that does not need to send your data anywhere.</p>

        <div className="text-center pt-8 border-t border-zinc-800/50">
          <Link href="/" className="inline-flex px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-xl transition-colors text-sm">Try SafeJSON - No JSON Upload</Link>
        </div>
      </article>
      <Footer />
    </div>
  );
}
