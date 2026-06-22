import { absoluteUrl, getAllBlogPosts, siteUrl } from "../blog/blog-data";

export const revalidate = 86400;

function escapeXml(value: string): string {
  return value.replace(/[<>&'"]/g, (char) => {
    switch (char) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
      default:
        return char;
    }
  });
}

function rssDate(date: string): string {
  return new Date(`${date}T00:00:00.000Z`).toUTCString();
}

export function GET() {
  const posts = getAllBlogPosts();
  const lastBuildDate = posts[0] ? rssDate(posts[0].updatedAt) : new Date().toUTCString();

  const items = posts
    .map((post) => {
      const url = absoluteUrl(post.canonicalPath);

      return [
        "    <item>",
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <pubDate>${rssDate(post.publishedAt)}</pubDate>`,
        `      <description>${escapeXml(post.excerpt)}</description>`,
        `      <category>${escapeXml(post.category)}</category>`,
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>SafeJSON Blog</title>
    <link>${siteUrl}/blog</link>
    <description>Safe JSON formatter guides, client-side JSON privacy research, and DevTools Network verification workflows.</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
