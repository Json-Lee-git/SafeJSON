import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Viewer - Explore and Navigate JSON Online | SafeJSON",
  description:
    "Explore JSON data with a collapsible tree view. Handles 50MB+ JSON locally in your browser with no upload and verifiable local processing with no pasted-content upload.",
  openGraph: {
    title: "JSON Viewer - SafeJSON",
    description:
      "Explore JSON data locally with a collapsible tree view. No data upload.",
    url: "/json-viewer",
  },
  alternates: { canonical: "/json-viewer" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
