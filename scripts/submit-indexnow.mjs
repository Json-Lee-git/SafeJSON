const siteUrl = process.env.SITE_URL || "https://safejson.vercel.app";
const sitemapUrl = process.env.SITEMAP_URL || `${siteUrl}/sitemap.xml`;
const indexNowKey = process.env.INDEXNOW_KEY || "b31ebf96549f4a3f96d254c2136b947a";
const endpoint = process.env.INDEXNOW_ENDPOINT || "https://api.indexnow.org/indexnow";

async function fetchText(url) {
  const response = await fetch(url, { headers: { accept: "application/xml,text/xml,text/plain" } });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }

  return response.text();
}

function getSitemapUrls(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
}

async function main() {
  const sitemap = await fetchText(sitemapUrl);
  const urlList = getSitemapUrls(sitemap);

  if (urlList.length === 0) {
    throw new Error(`No URLs found in ${sitemapUrl}`);
  }

  const host = new URL(siteUrl).host;
  const keyLocation = `${siteUrl}/${indexNowKey}.txt`;
  const payload = { host, key: indexNowKey, keyLocation, urlList };
  const response = await fetch(endpoint, {
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
