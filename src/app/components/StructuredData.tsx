type JsonLd = Record<string, unknown>;

export function JsonLdScript({ data }: { data: JsonLd }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function OrganizationSchema() {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "SafeJSON",
        url: "https://www.safejson.dev",
        logo: "https://www.safejson.dev/favicon.ico",
        sameAs: ["https://github.com/s01071233604-tech/safejson"],
      }}
    />
  );
}

export function WebSiteSchema() {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "SafeJSON",
        url: "https://www.safejson.dev",
        description:
          "Privacy-first JSON formatter and developer tools that process data entirely in the browser.",
        inLanguage: "en",
        publisher: {
          "@type": "Organization",
          name: "SafeJSON",
          url: "https://www.safejson.dev",
        },
      }}
    />
  );
}

export function BreadcrumbSchema({
  items,
}: {
  items: Array<{ name: string; url: string }>;
}) {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  );
}

export function ProductSchema() {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "Product",
        name: "SafeJSON Pro",
        description:
          "Privacy-first JSON developer tools including JSON Diff, JWT Decoder, JSONPath Query, Schema Validator, and large file support. All user data is processed client-side.",
        brand: {
          "@type": "Brand",
          name: "SafeJSON",
        },
        category: "DeveloperApplication",
        url: "https://www.safejson.dev/pricing",
        offers: [
          {
            "@type": "Offer",
            name: "SafeJSON Pro Monthly",
            price: "5",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            url: "https://www.safejson.dev/pricing",
          },
          {
            "@type": "Offer",
            name: "SafeJSON Pro Yearly",
            price: "39",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            url: "https://www.safejson.dev/pricing",
          },
        ],
      }}
    />
  );
}

export function HowToSchema({
  name,
  description,
  steps,
}: {
  name: string;
  description: string;
  steps: string[];
}) {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "HowTo",
        name,
        description,
        step: steps.map((text, index) => ({
          "@type": "HowToStep",
          position: index + 1,
          name: `Step ${index + 1}`,
          text,
        })),
      }}
    />
  );
}

export function SoftwareAppSchema() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "SafeJSON",
    applicationCategory: "DeveloperApplication",
    image: "https://www.safejson.dev/favicon.ico",
    description:
      "Privacy-first JSON formatter that runs 100% in your browser. No data ever leaves your device. Zero network requests during formatting.",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Verifiable privacy via DevTools Network tab",
      "Client-side JSON formatting with zero data transmission",
      "50MB+ local JSON handling in formatter, beautifier, viewer, and parser workflows",
      "Web Worker parsing to avoid blocking the main UI thread",
      "Collapsible tree view with syntax highlighting",
      "Error detection with line and column numbers",
      "JSON Diff with color-coded comparison",
      "JWT decoder that never sends tokens to a server",
      "JSONPath query evaluator",
      "JSON Schema validator",
      "Dark mode",
    ],
    author: {
      "@type": "Organization",
      name: "SafeJSON",
      url: "https://www.safejson.dev",
      sameAs: ["https://github.com/s01071233604-tech/safejson"],
    },
    url: "https://www.safejson.dev",
  };

  return <JsonLdScript data={ld} />;
}

export function FAQSchema() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is SafeJSON safe to use with sensitive data?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. SafeJSON processes all JSON data entirely in your browser. No data is ever transmitted to any server. You can verify this by opening DevTools -> Network tab while using SafeJSON - there are zero network requests during formatting.",
        },
      },
      {
        "@type": "Question",
        name: "Does SafeJSON send my JSON data to a server?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. SafeJSON is 100% client-side. All formatting, validation, and processing happens in your browser using JavaScript. Unlike server-side tools such as jsonformatter.org (which leaked over 80,000 credentials in 2025), SafeJSON never transmits user data.",
        },
      },
      {
        "@type": "Question",
        name: "How is SafeJSON different from jsonformatter.org?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "SafeJSON processes everything client-side - your data never leaves your browser. jsonformatter.org processes data on its servers, and in November 2025 security researchers discovered it had leaked over 80,000 user credentials through an unprotected feature. SafeJSON is also open source, ad-free, and has no tracking.",
        },
      },
      {
        "@type": "Question",
        name: "Is SafeJSON free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Core JSON formatting is free forever. Pro tools including JSON Diff, JWT Decoder, JSONPath Query, and Schema Validator are available for $5/month or $39/year.",
        },
      },
      {
        "@type": "Question",
        name: "Can SafeJSON handle large JSON files?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. SafeJSON is designed to handle 50MB+ JSON files locally in the browser for formatter, beautifier, viewer, and parser workflows. Large JSON is parsed with a Web Worker so the main interface stays responsive.",
        },
      },
      {
        "@type": "Question",
        name: "What is a privacy-first JSON formatter?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A privacy-first JSON formatter processes data entirely in the user's browser rather than on a remote server. This means the data never leaves the user's device, eliminating the risk of server-side data leaks. SafeJSON is an example - verify by checking the Network tab in DevTools while using it.",
        },
      },
    ],
  };

  return <JsonLdScript data={ld} />;
}
