export const siteUrl = "https://www.safejson.dev";

export type BlogPostMeta = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  excerpt: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: string;
  category: string;
  tags: string[];
  canonicalPath: string;
};

export const blogPosts: BlogPostMeta[] = [
  {
    slug: "safest-json-formatter",
    title: "Safest JSON Formatter 2026 - 5 Client-Side Tools Compared",
    metaTitle: "Safest JSON Formatter 2026 - 5 Client-Side Tools | SafeJSON",
    description:
      "Compare five safe JSON formatters in 2026 and learn how to verify local processing, avoid server-side tools, and protect credentials.",
    excerpt:
      "A practical comparison of browser-local JSON formatters, the DevTools Network test, and the server-side risks exposed by the 2025 JSON tool leaks.",
    publishedAt: "2026-06-08",
    updatedAt: "2026-06-22",
    readingTime: "8 min read",
    category: "JSON privacy",
    tags: [
      "JSON formatter",
      "client-side JSON tools",
      "developer security",
      "no-upload JSON formatter",
      "DevTools Network test",
    ],
    canonicalPath: "/blog/safest-json-formatter",
  },
  {
    slug: "is-it-safe-to-paste-json-online",
    title: "Is It Safe to Paste JSON Online? What You Need to Know in 2026",
    metaTitle: "Is It Safe to Paste JSON Online? What You Need to Know in 2026",
    description:
      "Most online JSON tools send data to a server. Learn the 30-second Network tab test and how to choose a client-side JSON formatter.",
    excerpt:
      "A clear answer for developers handling tokens, API responses, configs, logs, and other sensitive JSON in online tools.",
    publishedAt: "2026-06-09",
    updatedAt: "2026-06-22",
    readingTime: "6 min read",
    category: "JSON security",
    tags: [
      "online JSON tools",
      "JSON privacy",
      "server-side JSON formatter",
      "client-side JSON formatter",
      "sensitive developer data",
    ],
    canonicalPath: "/blog/is-it-safe-to-paste-json-online",
  },
];

export function absoluteUrl(path: string): string {
  return path === "/" ? siteUrl : `${siteUrl}${path}`;
}

export function getAllBlogPosts(): BlogPostMeta[] {
  return [...blogPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getBlogPost(slug: string): BlogPostMeta {
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    throw new Error(`Blog post not found: ${slug}`);
  }

  return post;
}

export function getBlogArticleSchema(post: BlogPostMeta) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: absoluteUrl("/media/github-social-preview.png"),
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Person",
      name: "JSON-Lee",
      url: absoluteUrl("/about"),
      sameAs: [
        "https://github.com/Json-Lee-git/SafeJSON",
        "https://dev.to/_6a9b7b682ef6dfb20e506",
      ],
    },
    publisher: {
      "@type": "Organization",
      name: "SafeJSON",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/media/github-social-preview.png"),
      },
    },
    mainEntityOfPage: absoluteUrl(post.canonicalPath),
    keywords: post.tags.join(", "),
    articleSection: post.category,
  };
}

export function getBlogCollectionSchema(posts = getAllBlogPosts()) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "SafeJSON Blog",
    description:
      "SafeJSON guides for safe JSON formatting, client-side JSON tools, DevTools Network verification, and developer data privacy.",
    url: absoluteUrl("/blog"),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: post.title,
        url: absoluteUrl(post.canonicalPath),
      })),
    },
  };
}
