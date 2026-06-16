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
        sameAs: [
          "https://github.com/Json-Lee-git/SafeJSON",
          "https://www.youtube.com/watch?v=Jlks9EU9I3Q",
        ],
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
      "Privacy-first JSON formatter that runs 100% in your browser. Pasted JSON is processed locally and is not uploaded during formatting.",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Verifiable privacy via DevTools Network tab",
      "Client-side JSON formatting without pasted-content upload",
      "Large local JSON handling in formatter and beautifier workflows",
      "Web Worker parsing in formatter and beautifier to avoid blocking the main UI thread",
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
      sameAs: ["https://github.com/Json-Lee-git/SafeJSON"],
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
          text: "Yes. SafeJSON processes pasted JSON entirely in your browser. The JSON content is not transmitted to a SafeJSON server. You can verify this by opening DevTools -> Network tab while using SafeJSON and checking that no request contains your pasted content.",
        },
      },
      {
        "@type": "Question",
        name: "Does SafeJSON send my JSON data to a server?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. SafeJSON processes pasted JSON locally in your browser using JavaScript. Core formatting, validation, diff, JWT decoding, JSONPath, and schema validation do not upload pasted content. Unlike server-side tools such as jsonformatter.org (which leaked over 80,000 credentials in 2025), SafeJSON is designed to keep pasted JSON in the browser.",
        },
      },
      {
        "@type": "Question",
        name: "How is SafeJSON different from jsonformatter.org?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "SafeJSON processes pasted JSON client-side, so the content is not uploaded to a SafeJSON server. jsonformatter.org processes data on its servers, and in November 2025 security researchers discovered it had leaked over 80,000 user credentials through an unprotected feature. SafeJSON is also open source, ad-free, and does not send pasted JSON to analytics.",
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
          text: "Yes. SafeJSON Formatter and Beautifier are tested with 50MB JSON locally in the browser. Viewer and Parser are designed for large local JSON workflows. Formatting is processed with a Web Worker so the main interface stays responsive.",
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

export function VideoObjectSchema() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "How to Verify Any JSON Formatter Is Safe (30-Second Test)",
    description:
      "Learn how to check whether a JSON formatter uploads your pasted data using DevTools Network tab. Covers client-side vs server-side JSON processing, a SafeJSON toolkit walkthrough, and how to verify no pasted-content upload.",
    thumbnailUrl: "https://www.safejson.dev/favicon.ico",
    contentUrl: "https://www.youtube.com/watch?v=Jlks9EU9I3Q",
    embedUrl: "https://www.youtube.com/embed/Jlks9EU9I3Q",
    uploadDate: "2026-06-14",
    publisher: {
      "@type": "Organization",
      name: "SafeJSON",
      url: "https://www.safejson.dev",
    },
  };

  return <JsonLdScript data={ld} />;
}
