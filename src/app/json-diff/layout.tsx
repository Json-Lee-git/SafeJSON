import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Diff Checker - Compare JSON Online | SafeJSON",
  description:
    "Compare two JSON objects side by side with color-coded differences. Client-side JSON diff with no pasted-content upload.",
  openGraph: {
    title: "JSON Diff Checker - SafeJSON",
    description:
      "Compare two JSON objects side by side. All comparison happens in your browser.",
    url: "/json-diff",
  },
  alternates: {
    canonical: "/json-diff",
  },
};

export default function JsonDiffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
