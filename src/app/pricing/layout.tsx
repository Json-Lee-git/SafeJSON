import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing - SafeJSON Pro | Client-side JSON Tools for Developers",
  description:
    "Core JSON formatting is free. Pro adds JSON Diff, JWT Decoder, JSONPath, Schema Validator, and large local JSON workflow support. All client-side.",
  openGraph: {
    title: "SafeJSON Pro Pricing",
    description:
      "Get JSON Diff, JWT Decoder, JSONPath, Schema Validator, and large file support. All client-side.",
    url: "/pricing",
  },
  alternates: {
    canonical: "/pricing",
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
