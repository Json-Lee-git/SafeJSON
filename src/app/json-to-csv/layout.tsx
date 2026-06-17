import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "JSON to CSV Converter — JSON Format to CSV Online | SafeJSON",
  description:"Convert JSON arrays to CSV instantly. Free JSON format to CSV converter. Supports nested JSON, arrays, and browser-local export with no pasted-content upload for this workflow.",
  openGraph: { title: "JSON to CSV Converter — SafeJSON", description: "Convert JSON arrays to CSV in a browser-local workflow.", url: "/json-to-csv" },
  alternates: { canonical: "/json-to-csv" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
