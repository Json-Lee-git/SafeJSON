import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — SafeJSON Pro | JSON Tools for Developers",
  description:
    "Simple, privacy-first pricing. Core JSON formatting is free forever. Pro tools including JSON Diff, JWT Decoder, JSONPath, and Schema Validator — $5/month.",
  openGraph: {
    title: "SafeJSON Pro Pricing",
    description:
      "Get JSON Diff, JWT Decoder, JSONPath, and Schema Validator for $5/month.",
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
