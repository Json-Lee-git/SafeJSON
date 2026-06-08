import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "JSON Beautifier — Beautify Minified JSON Online | SafeJSON",
  description: "Beautify minified JSON instantly. Paste compressed JSON and get clean, readable, indented output. 100% client-side, no data upload.",
  openGraph: {
    title: "JSON Beautifier — SafeJSON",
    description:
      "Beautify minified JSON instantly in your browser. No data upload.",
    url: "/json-beautifier",
  },
  alternates: { canonical: "/json-beautifier" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
