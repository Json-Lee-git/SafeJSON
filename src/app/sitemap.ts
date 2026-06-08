import type { MetadataRoute } from "next";

const siteUrl = "https://safejson.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: siteUrl, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/diff`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/jwt`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/jsonpath`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/schema`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/pricing`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/blog/safest-json-formatter`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/vs/jsonformatter-org`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/vs/jsonformatter-extension`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/vs/codebeautify`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/support`, lastModified, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteUrl}/about`, lastModified, changeFrequency: "yearly", priority: 0.4 },
    { url: `${siteUrl}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}
