import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Parser - Parse and Analyze JSON Structure Online | SafeJSON",
  description:
    "Parse JSON and inspect every field with data type and path. Designed for large browser-local JSON workflows with no pasted-content upload for this workflow.",
  openGraph: {
    title: "JSON Parser - SafeJSON",
    description:
      "Parse JSON and inspect its structure locally in your browser with no pasted-content upload for this workflow.",
    url: "/json-parser",
  },
  alternates: { canonical: "/json-parser" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
