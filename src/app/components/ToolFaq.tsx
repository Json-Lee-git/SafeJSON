import { JsonLdScript } from "./StructuredData";

interface FaqItem {
  q: string;
  a: string;
}

export function ToolFaq({
  toolName,
  toolDescription,
  faqs,
}: {
  toolName: string;
  toolDescription: string;
  faqs: FaqItem[];
}) {
  return (
    <>
      <JsonLdScript
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.a,
            },
          })),
        }}
      />
      <section className="border-t border-zinc-800/50 mt-12 pt-10">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-xl font-semibold mb-6">About {toolName}</h2>
          <p className="text-sm text-zinc-500 mb-6">{toolDescription}</p>
          <dl className="space-y-6">
            {faqs.map((item) => (
              <div key={item.q}>
                <dt className="text-sm font-semibold text-zinc-300 mb-2">
                  {item.q}
                </dt>
                <dd className="text-sm text-zinc-500 leading-relaxed">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}

export const diffFaqs: FaqItem[] = [
  {
    q: "Is SafeJSON Diff safe for comparing sensitive JSON data?",
    a: "SafeJSON Diff is designed for sensitive JSON workflows. Both JSON inputs are compared in the browser workflow with no pasted-content upload. You can verify this by opening DevTools Network tab while running a diff comparison and checking that no request contains your JSON.",
  },
  {
    q: "How to verify that SafeJSON Diff does not upload your JSON?",
    a: "Open SafeJSON Diff, then open DevTools (F12) and switch to the Network tab. Paste your JSON into both input panels and run the comparison. Check that no network request contains your pasted JSON. That verifies the browser-local JSON diff workflow.",
  },
  {
    q: "How does JSON Diff work?",
    a: "SafeJSON Diff compares two JSON objects and highlights added, removed, and changed values in color. Green indicates added values, red indicates removed values, and yellow indicates modified values. The comparison is recursive, so nested objects and arrays can be inspected clearly.",
  },
  {
    q: "Can SafeJSON Diff handle large JSON files?",
    a: "SafeJSON Diff is best for API responses, webhook payloads, config snapshots, and moderate JSON objects. Very large or deeply nested JSON can be expensive to compare in any browser tab. For large-file parsing, use the formatter, viewer, beautifier, or parser workflow first.",
  },
  {
    q: "What makes SafeJSON Diff different from other JSON diff tools?",
    a: "Many online JSON diff tools process your data on a remote server. SafeJSON Diff uses a browser-local JSON workflow with no pasted-content upload and no pasted-content analytics.",
  },
];

export const jwtFaqs: FaqItem[] = [
  {
    q: "Is it safe to paste a real JWT token into SafeJSON?",
    a: "SafeJSON JWT Decoder is designed for sensitive JWT inspection. The token is decoded in the browser workflow with no pasted-content upload. For production JWTs that contain sensitive claims, verify local processing with DevTools Network before relying on any decoder.",
  },
  {
    q: "How to verify that SafeJSON JWT Decoder does not upload your token?",
    a: "Open SafeJSON JWT Decoder, open DevTools (F12) and go to the Network tab. Paste a JWT token and decode it. Check that no network request contains your token.",
  },
  {
    q: "How does the JWT Decoder work?",
    a: "SafeJSON decodes the JWT header and payload using base64url decoding. It displays the decoded JSON in a tree view and raw format. The signature is shown but not cryptographically verified; SafeJSON is a decoder, not a validator.",
  },
  {
    q: "Why shouldn't I paste a production JWT into a server-side decoder?",
    a: "Server-side JWT decoders can transmit your token to a remote server for processing. If the token is a production access token or contains sensitive claims, that information can end up on third-party infrastructure. A browser-local decoder reduces that exposure.",
  },
  {
    q: "What JWT claims can I see?",
    a: "The decoder displays standard and custom claims from the JWT payload, including sub, iss, aud, exp, iat, nbf, and custom claims. The header shows the algorithm (alg) and token type (typ).",
  },
];

export const jsonpathFaqs: FaqItem[] = [
  {
    q: "Is SafeJSON JSONPath query safe for sensitive data?",
    a: "SafeJSON JSONPath is designed for sensitive payload querying. JSON data and query expressions are evaluated in the browser workflow with no pasted-content upload. You can verify this by opening DevTools Network tab and checking that no request contains your JSON or query expressions.",
  },
  {
    q: "How to verify that SafeJSON JSONPath does not upload your query or data?",
    a: "Open SafeJSON JSONPath, open DevTools (F12) and switch to the Network tab. Paste your JSON, enter a JSONPath expression, and run the query. Check that no network request contains your data or query expression.",
  },
  {
    q: "What JSONPath expressions are supported?",
    a: "SafeJSON supports common JSONPath expressions including dot notation, bracket notation, wildcards, recursive descent, filters, and array slices. It uses the jsonpath-plus library in the browser workflow.",
  },
  {
    q: "How is SafeJSON JSONPath different from server-side query tools?",
    a: "Server-side JSONPath tools require uploading your JSON to a remote server for evaluation. SafeJSON evaluates queries in the browser workflow, so sensitive configuration files, API responses, and internal payloads can be queried with no pasted-content upload.",
  },
];

export const schemaFaqs: FaqItem[] = [
  {
    q: "Is SafeJSON Schema Validator safe for validating production schemas?",
    a: "SafeJSON Schema Validator is designed for sensitive API and webhook schema debugging. JSON data and JSON Schema are validated in the browser workflow with no pasted-content upload. This matters for internal schemas that may reveal system architecture.",
  },
  {
    q: "How to verify that SafeJSON Schema Validator does not upload your data?",
    a: "Open SafeJSON Schema Validator, open DevTools (F12) and go to the Network tab. Paste your JSON, enter your JSON Schema, and run validation. Check that no network request contains your pasted content.",
  },
  {
    q: "What JSON Schema version does SafeJSON support?",
    a: "The current validator uses Ajv 8 default JSON Schema behavior, which is suitable for common draft-07-style schemas. Check the validator output for supported schema behavior.",
  },
  {
    q: "Can I validate internal API schemas without exposing system architecture?",
    a: "SafeJSON Schema Validator is built for internal API schemas, webhook payload shapes, and request/response examples. It uses a browser-local JSON workflow with no pasted-content upload, so you can inspect validation behavior without adding a schema backend.",
  },
  {
    q: "How does the Schema Validator report errors?",
    a: "SafeJSON reports validation errors with the JSON path where the error occurred and a readable message about the failed constraint. The error list is designed to make schema debugging easier without changing the validator engine.",
  },
];
