import type { MetadataRoute } from "next";
import { getAllBlogPosts } from "./blog/blog-data";

const siteUrl = "https://www.safejson.dev";

type SitemapEntry = MetadataRoute.Sitemap[number];
type ChangeFrequency = NonNullable<SitemapEntry["changeFrequency"]>;

function entry(
  path: string,
  lastModified: string,
  changeFrequency: ChangeFrequency,
  priority: number,
): SitemapEntry {
  return {
    url: path === "/" ? siteUrl : `${siteUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const blogEntries = [
    entry("/blog", "2026-06-22", "weekly", 0.75),
    ...getAllBlogPosts().map((post) =>
      entry(post.canonicalPath, post.updatedAt, "monthly", 0.8),
    ),
  ];

  return [
    entry("/", "2026-06-17", "weekly", 1),
    entry("/json-diff", "2026-06-16", "monthly", 0.8),
    entry("/jwt-decoder", "2026-06-16", "monthly", 0.8),
    entry("/jsonpath-query", "2026-06-16", "monthly", 0.7),
    entry("/json-schema-validator", "2026-06-16", "monthly", 0.7),
    entry("/pricing", "2026-06-16", "monthly", 0.6),
    entry("/answers", "2026-06-16", "monthly", 0.8),
    entry("/press", "2026-06-22", "monthly", 0.7),
    entry("/no-upload-json-formatter", "2026-06-22", "monthly", 0.85),
    entry("/client-side-json-formatter", "2026-06-14", "monthly", 0.85),
    entry("/compare", "2026-06-15", "monthly", 0.85),
    ...blogEntries,
    entry("/vs/jsonformatter-org", "2026-06-16", "monthly", 0.7),
    entry("/vs/jsonformatter-extension", "2026-06-16", "monthly", 0.7),
    entry("/vs/codebeautify", "2026-06-15", "monthly", 0.6),
    entry("/support", "2026-06-16", "monthly", 0.5),
    entry("/security/check-json-formatter-upload", "2026-06-16", "monthly", 0.75),
    entry("/about", "2026-06-16", "yearly", 0.4),
    entry("/json-viewer", "2026-06-16", "monthly", 0.8),
    entry("/json-beautifier", "2026-06-16", "monthly", 0.8),
    entry("/json-parser", "2026-06-16", "monthly", 0.8),
    entry("/json-validator", "2026-06-16", "monthly", 0.8),
    entry("/csv-to-json", "2026-06-16", "monthly", 0.7),
    entry("/json-to-csv", "2026-06-16", "monthly", 0.7),
    entry("/vs/jsonlint", "2026-06-16", "monthly", 0.65),
    entry("/vs/jwt-io", "2026-06-16", "monthly", 0.65),
    entry("/vs/jsoncrack", "2026-06-16", "monthly", 0.65),
    entry("/privacy", "2026-06-11", "yearly", 0.3),
    entry("/extension/permissions", "2026-06-16", "monthly", 0.7),
    entry("/privacy/verify-local-processing", "2026-06-16", "yearly", 0.7),
  ];
}
