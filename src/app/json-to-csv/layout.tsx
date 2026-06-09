import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "JSON to CSV Converter — Convert JSON to CSV Online | SafeJSON",
  description:"Convert JSON arrays to CSV instantly in your browser. Free client-side JSON to CSV converter. No data upload, no server processing.",
  openGraph: { title: "JSON to CSV Converter — SafeJSON", description: "Convert JSON arrays to CSV instantly in your browser. Free and client-side.", url: "/json-to-csv" },
  alternates: { canonical: "/json-to-csv" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
