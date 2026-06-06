import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://safejson.vercel.app";

  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/diff`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/jwt`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/jsonpath`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/schema`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/pricing`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];
}
