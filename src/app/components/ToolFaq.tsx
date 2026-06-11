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
    a: "Yes. SafeJSON Diff runs entirely in your browser. Both JSON inputs are compared locally; the pasted content is not transmitted to a SafeJSON server. You can verify this by opening DevTools Network tab while running a diff comparison and checking that no request contains your JSON.",
  },
  {
    q: "How does JSON Diff work?",
    a: "SafeJSON Diff compares two JSON objects and highlights added, removed, and changed values in color. Green indicates added values, red indicates removed values, and yellow indicates modified values. The comparison is recursive, so nested objects and arrays are compared deeply.",
  },
  {
    q: "What makes SafeJSON Diff different from other JSON diff tools?",
    a: "Most online JSON diff tools process your data on a remote server. SafeJSON Diff performs all comparison locally in your browser using client-side JavaScript. Your JSON data never leaves your device.",
  },
];

export const jwtFaqs: FaqItem[] = [
  {
    q: "Is it safe to paste a real JWT token into SafeJSON?",
    a: "Yes. SafeJSON JWT Decoder runs entirely in your browser. The token is decoded locally and never transmitted to any server. For production JWTs that contain sensitive claims, a client-side decoder avoids sending the token to a third-party server.",
  },
  {
    q: "How does the JWT Decoder work?",
    a: "SafeJSON decodes the JWT header and payload in your browser using base64url decoding. It displays the decoded JSON in a tree view and raw format. The signature is shown but not cryptographically verified; SafeJSON is a decoder, not a validator. No server round-trip is needed.",
  },
  {
    q: "What JWT claims can I see?",
    a: "The decoder displays all standard and custom claims from the JWT payload, including sub, iss, aud, exp, iat, nbf, and any custom claims. The header shows the algorithm (alg) and token type (typ). All decoding happens locally without uploading the token.",
  },
];

export const jsonpathFaqs: FaqItem[] = [
  {
    q: "Is SafeJSON JSONPath query safe for sensitive data?",
    a: "Yes. All JSONPath queries are evaluated entirely in your browser. The JSON data and query expressions are not uploaded. You can verify this by opening DevTools Network tab and checking that no request contains your JSON or query.",
  },
  {
    q: "What JSONPath expressions are supported?",
    a: "SafeJSON supports common JSONPath expressions including dot notation, bracket notation, wildcards, recursive descent, filters, and array slices. It uses the jsonpath-plus library in the browser.",
  },
  {
    q: "How is SafeJSON JSONPath different from server-side query tools?",
    a: "Server-side JSONPath tools require uploading your JSON to a remote server for evaluation. SafeJSON evaluates queries client-side in your browser, so sensitive configuration files, API responses, and payloads stay local.",
  },
];

export const schemaFaqs: FaqItem[] = [
  {
    q: "Is SafeJSON Schema Validator safe for validating production schemas?",
    a: "Yes. All schema validation runs locally in your browser. Neither your JSON data nor your JSON Schema is transmitted to any server. This matters for internal API schemas that may reveal system architecture.",
  },
  {
    q: "What JSON Schema version does SafeJSON support?",
    a: "SafeJSON Schema Validator supports JSON Schema draft-04, draft-06, draft-07, draft 2019-09, and draft 2020-12. Validation is powered by Ajv running client-side in your browser.",
  },
  {
    q: "How does the Schema Validator report errors?",
    a: "SafeJSON reports validation errors with the exact JSON path where the error occurred, the specific constraint that failed, and the violating value. All validation runs locally without uploading your JSON or schema.",
  },
];
