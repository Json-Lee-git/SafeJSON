import dns from "node:dns";
import { readFile } from "node:fs/promises";

dns.setDefaultResultOrder("ipv4first");

const siteUrl = process.env.SITE_URL || "https://www.safejson.dev";
const sitemapUrl = process.env.SITEMAP_URL || `${siteUrl}/sitemap.xml`;
const sitemapFile = process.env.SITEMAP_FILE;
const indexNowKey = process.env.INDEXNOW_KEY || "b31ebf96549f4a3f96d254c2136b947a";
const endpoint = process.env.INDEXNOW_ENDPOINT || "https://api.indexnow.org/indexnow";

async function fetchText(url) {
  const response = await retryFetch(url, {
    headers: { accept: "application/xml,text/xml,text/plain" },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }

  return response.text();
}

async function retryFetch(url, options, attempts = 3) {
  let lastError;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await fetch(url, options);
    } catch (error) {
      lastError = error;

      if (attempt < attempts) {
        await new Promise((resolve) => setTimeout(resolve, attempt * 1500));
      }
    }
  }

  throw lastError;
}

function getSitemapUrls(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
}

async function main() {
  const sitemap = sitemapFile ? await readFile(sitemapFile, "utf8") : await fetchText(sitemapUrl);
  const urlList = getSitemapUrls(sitemap);

  if (urlList.length === 0) {
    throw new Error(`No URLs found in ${sitemapUrl}`);
  }

  const host = new URL(siteUrl).host;
  const keyLocation = `${siteUrl}/${indexNowKey}.txt`;
  const payload = { host, key: indexNowKey, keyLocation, urlList };
  const response = await retryFetch(endpoint, {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });
  const responseText = await response.text();

  console.log(
    JSON.stringify(
      {
        endpoint,
        host,
        keyLocation,
        submittedUrls: urlList.length,
        status: response.status,
        statusText: response.statusText,
        responseText,
      },
      null,
      2,
    ),
  );

  if (![200, 202].includes(response.status)) {
    throw new Error(`IndexNow submission failed: ${response.status} ${response.statusText}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
