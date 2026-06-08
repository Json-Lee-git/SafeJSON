import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "JSON Parser — Parse & Analyze JSON Structure Online | SafeJSON",
  description: "Parse JSON and inspect every field with its data type and path. See the full structure at a glance. 100% client-side, no data upload.",
  openGraph: {
    title: "JSON Parser — SafeJSON",
    description:
      "Parse JSON and inspect every field with its data type and path. Client-side, no data upload.",
    url: "/json-parser",
  },
  alternates: { canonical: "/json-parser" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
