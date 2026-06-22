import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import { BreadcrumbSchema, JsonLdScript } from "../components/StructuredData";
import { absoluteUrl, getAllBlogPosts, getBlogCollectionSchema } from "./blog-data";

export const metadata: Metadata = {
  title: "SafeJSON Blog - Safe JSON Formatter Guides and Privacy Research",
  description:
    "Guides on safe JSON formatting, client-side JSON tools, DevTools Network verification, JWT privacy, JSON Schema validation, and developer data security.",
  openGraph: {
    title: "SafeJSON Blog",
    description:
      "Safe JSON formatter guides, client-side JSON privacy research, and DevTools Network verification workflows.",
    url: "/blog",
    type: "website",
  },
  alternates: {
    canonical: "/blog",
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00.000Z`));
}

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();
  const topics = Array.from(new Set(posts.flatMap((post) => post.tags))).slice(0, 8);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      <BreadcrumbSchema
        items={[
          { name: "SafeJSON", url: absoluteUrl("/") },
          { name: "Blog", url: absoluteUrl("/blog") },
        ]}
      />
      <JsonLdScript data={getBlogCollectionSchema(posts)} />

      <header className="border-b border-zinc-800">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <Link href="/" className="text-lg font-bold tracking-tight">
            <span className="text-emerald-400">{`{`}</span>SafeJSON
            <span className="text-emerald-400">{`}`}</span>
          </Link>
          <a
            href="/rss.xml"
            className="inline-flex min-h-10 items-center rounded px-2 text-sm text-zinc-400 transition-colors hover:text-emerald-300"
          >
            RSS
          </a>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12">
        <section className="max-w-3xl mb-10">
          <p className="text-sm font-medium text-emerald-400 mb-3">SafeJSON Blog</p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Practical guides for safer JSON workflows.
          </h1>
          <p className="text-zinc-400 leading-relaxed">
            Privacy-focused notes for developers who paste API responses, JWTs,
            schemas, logs, and config files into JSON tools and need a workflow
            they can verify.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-[minmax(0,1fr)_18rem] items-start">
          <div className="space-y-5">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="rounded-lg border border-zinc-800 bg-zinc-900/30 p-5 transition-colors hover:border-zinc-700"
              >
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-500 mb-3">
                  <span className="text-emerald-400">{post.category}</span>
                  <span>{formatDate(post.updatedAt)}</span>
                  <span>{post.readingTime}</span>
                </div>
                <h2 className="text-xl font-semibold tracking-tight mb-3">
                  <Link href={post.canonicalPath} className="hover:text-emerald-300 transition-colors">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-sm leading-relaxed text-zinc-400 mb-4">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded border border-zinc-800 px-2 py-1 text-xs text-zinc-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <aside className="rounded-lg border border-zinc-800 bg-zinc-900/30 p-5">
            <h2 className="text-sm font-semibold text-zinc-200 mb-4">Topics</h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {topics.map((topic) => (
                <span key={topic} className="rounded border border-zinc-800 px-2 py-1 text-xs text-zinc-500">
                  {topic}
                </span>
              ))}
            </div>

            <h2 className="text-sm font-semibold text-zinc-200 mb-3">Useful pages</h2>
            <div className="space-y-2 text-sm">
              <Link href="/no-upload-json-formatter" className="block text-zinc-400 hover:text-emerald-300">
                No-upload JSON formatter
              </Link>
              <Link href="/security/check-json-formatter-upload" className="block text-zinc-400 hover:text-emerald-300">
                Check JSON upload behavior
              </Link>
              <Link href="/compare" className="block text-zinc-400 hover:text-emerald-300">
                JSON formatter comparison
              </Link>
              <Link href="/answers" className="block text-zinc-400 hover:text-emerald-300">
                SafeJSON answers
              </Link>
            </div>
          </aside>
        </section>
      </main>

      <Footer />
    </div>
  );
}
