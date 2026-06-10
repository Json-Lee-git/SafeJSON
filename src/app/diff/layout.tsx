import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Diff & Object Comparison — Compare JSON Online, No Server Upload | SafeJSON",
  description:
    "Compare two JSON objects side by side with color-coded differences. Free client-side JSON diff tool — your data never leaves your browser. No server upload.",
  openGraph: {
    title: "JSON Diff Checker - SafeJSON",
    description:
      "Compare two JSON objects side by side. All processing happens in your browser.",
    url: "/diff",
  },
  alternates: {
    canonical: "/diff",
  },
};

export default function DiffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
