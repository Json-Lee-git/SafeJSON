export function SoftwareAppSchema() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "SafeJSON",
    applicationCategory: "DeveloperApplication",
    description:
      "Privacy-first JSON formatter that runs 100% in your browser. No data ever leaves your device. Zero network requests during formatting.",
    operatingSystem: "Web",
    browserRequirements: "Requires JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Client-side JSON formatting with zero data transmission",
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
      url: "https://safejson.vercel.app",
      sameAs: ["https://github.com/s01071233604-tech/safejson"],
    },
    url: "https://safejson.vercel.app",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
    />
  );
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
          text: "Yes. SafeJSON processes all JSON data entirely in your browser. No data is ever transmitted to any server. You can verify this by opening DevTools → Network tab while using SafeJSON — there are zero network requests during formatting.",
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
          text: "SafeJSON processes everything client-side — your data never leaves your browser. jsonformatter.org processes data on its servers, and in November 2025 security researchers discovered it had leaked over 80,000 user credentials through an unprotected feature. SafeJSON is also open source, ad-free, and has no tracking.",
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
        name: "What is a privacy-first JSON formatter?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A privacy-first JSON formatter processes data entirely in the user's browser rather than on a remote server. This means the data never leaves the user's device, eliminating the risk of server-side data leaks. SafeJSON is an example — verify by checking the Network tab in DevTools while using it.",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
    />
  );
}
