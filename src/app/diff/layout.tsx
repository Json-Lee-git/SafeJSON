import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Diff Checker - Compare JSON Online | SafeJSON",
  description:
    "Compare two JSON objects side by side with color-coded differences. Free client-side JSON diff tool with no server upload.",
  openGraph: {
    title: "JSON Diff Checker - SafeJSON",
    description:
      "Compare two JSON objects side by side. Core processing runs locally with no pasted-content upload.",
    url: "/json-diff",
  },
  alternates: {
    canonical: "/json-diff",
  },
};

export default function DiffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
