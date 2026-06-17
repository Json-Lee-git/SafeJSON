import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Beautifier - Beautify Minified JSON Online | SafeJSON",
  description:
    "Beautify minified JSON instantly in your browser. Formatter and Beautifier are tested with 50MB JSON locally, with no pasted-content upload for this workflow.",
  openGraph: {
    title: "JSON Beautifier - SafeJSON",
    description:
      "Beautify minified JSON locally in your browser with no pasted-content upload for this workflow.",
    url: "/json-beautifier",
  },
  alternates: { canonical: "/json-beautifier" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
