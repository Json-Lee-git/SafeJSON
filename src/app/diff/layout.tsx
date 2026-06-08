import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Diff Checker — Compare JSON Online | SafeJSON",
  description:
    "Compare two JSON objects side by side with color-coded differences. Added, removed, and changed values highlighted. 100% client-side, no data upload.",
  openGraph: {
    title: "JSON Diff Checker — SafeJSON",
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
