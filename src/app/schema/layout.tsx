import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "JSON Schema Validator — Validate JSON Against Schema | SafeJSON",
  description:
    "Validate JSON data against JSON Schema definitions. Catch missing fields, wrong types, and invalid patterns. 100% client-side validation.",
  openGraph: {
    title: "JSON Schema Validator — SafeJSON",
    description:
      "Validate JSON against JSON Schema. All processing happens in your browser.",
  },
};

export default function SchemaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
