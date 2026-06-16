import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Schema Validator for API and Webhook Payloads | SafeJSON",
  description:
    "Validate API response schemas, webhook payload validation cases, and schema errors with no pasted-content upload.",
  openGraph: {
    title: "JSON Schema Validator for API Payloads - SafeJSON",
    description:
      "Validate API responses, webhook payloads, and request/response examples against JSON Schema.",
    url: "/json-schema-validator",
  },
  alternates: {
    canonical: "/json-schema-validator",
  },
};

export default function JsonSchemaValidatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
