import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Beautifier - Beautify Minified JSON Online | SafeJSON",
  description:
    "Beautify minified JSON instantly in your browser. Handles 50MB+ files locally with no upload, no ads, and verifiable local processing with no pasted-content upload.",
  openGraph: {
    title: "JSON Beautifier - SafeJSON",
    description:
      "Beautify minified JSON locally in your browser. No data upload.",
    url: "/json-beautifier",
  },
  alternates: { canonical: "/json-beautifier" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
