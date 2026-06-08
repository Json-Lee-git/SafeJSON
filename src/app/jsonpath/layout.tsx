import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSONPath Query — Evaluate JSONPath Expressions Online | SafeJSON",
  description:
    "Query JSON data with XPath-like expressions. Extract nested values, filter arrays, and slice data. All processing happens in your browser.",
  openGraph: {
    title: "JSONPath Query — SafeJSON",
    description:
      "Query JSON data with JSONPath expressions. Client-side evaluation, no data upload.",
    url: "/jsonpath",
  },
  alternates: {
    canonical: "/jsonpath",
  },
};

export default function JsonPathLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
