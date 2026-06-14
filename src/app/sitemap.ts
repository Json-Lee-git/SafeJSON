import type { MetadataRoute } from "next";

const siteUrl = "https://www.safejson.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: siteUrl, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/diff`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/jwt`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/jsonpath`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/schema`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/pricing`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/answers`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/client-side-json-formatter`, lastModified, changeFrequency: "monthly", priority: 0.85 },
    { url: `${siteUrl}/compare`, lastModified, changeFrequency: "monthly", priority: 0.85 },
    { url: `${siteUrl}/blog/safest-json-formatter`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/blog/is-it-safe-to-paste-json-online`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/vs/jsonformatter-org`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/vs/jsonformatter-extension`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/vs/codebeautify`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/support`, lastModified, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteUrl}/about`, lastModified, changeFrequency: "yearly", priority: 0.4 },
    { url: `${siteUrl}/json-viewer`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/json-beautifier`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/json-parser`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/json-validator`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/csv-to-json`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/json-to-csv`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/vs/jsonlint`, lastModified, changeFrequency: "monthly", priority: 0.65 },
    { url: `${siteUrl}/vs/jwt-io`, lastModified, changeFrequency: "monthly", priority: 0.65 },
    { url: `${siteUrl}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}
