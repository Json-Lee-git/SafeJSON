import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing - SafeJSON Pro Tools for Sensitive JSON Workflows",
  description:
    "SafeJSON Pro tools for sensitive JSON workflows: API payloads, JSON Diff, JWT inspection, JSONPath, Schema Validator, and Team Lite demand testing.",
  openGraph: {
    title: "SafeJSON Pro Pricing",
    description:
      "Pro tools for sensitive JSON workflows, API payloads, schemas, webhooks, configs, and Team Lite interest.",
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
