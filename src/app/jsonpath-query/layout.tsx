import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSONPath Query - Evaluate JSONPath Online | SafeJSON",
  description:
    "Query JSON data with JSONPath expressions. Extract nested values, filter arrays, and slice data locally in your browser.",
  openGraph: {
    title: "JSONPath Query - SafeJSON",
    description:
      "Query JSON data with JSONPath expressions. Client-side evaluation with no pasted-content upload.",
    url: "/jsonpath-query",
  },
  alternates: {
    canonical: "/jsonpath-query",
  },
};

export default function JsonPathQueryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
