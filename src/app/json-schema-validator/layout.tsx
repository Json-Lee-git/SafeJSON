import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Schema Validator - Validate JSON Against Schema | SafeJSON",
  description:
    "Validate JSON against JSON Schema definitions in your browser. Catch missing fields, wrong types, and invalid patterns with no pasted-content upload.",
  openGraph: {
    title: "JSON Schema Validator - SafeJSON",
    description:
      "Validate JSON against JSON Schema. All validation happens in your browser.",
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
