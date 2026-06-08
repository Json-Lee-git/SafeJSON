import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "JSON Viewer — Explore & Navigate JSON Online | SafeJSON",
  description: "Explore and navigate JSON data with a collapsible tree view. Paste JSON to see its structure. 100% client-side, no data upload.",
  openGraph: {
    title: "JSON Viewer — SafeJSON",
    description:
      "Explore JSON data with a collapsible tree view. Client-side, no data upload.",
    url: "/json-viewer",
  },
  alternates: { canonical: "/json-viewer" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
