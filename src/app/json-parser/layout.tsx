import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Parser - Parse and Analyze JSON Structure Online | SafeJSON",
  description:
    "Parse JSON and inspect every field with data type and path. Designed for large local JSON workflows with no upload.",
  openGraph: {
    title: "JSON Parser - SafeJSON",
    description:
      "Parse JSON and inspect its structure locally in your browser. No data upload.",
    url: "/json-parser",
  },
  alternates: { canonical: "/json-parser" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
