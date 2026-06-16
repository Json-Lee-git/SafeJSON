import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Diff for API Responses and Webhooks | SafeJSON",
  description:
    "Use SafeJSON to compare API responses, webhook payloads, and config diffs in a private JSON diff workflow with no pasted-content upload.",
  openGraph: {
    title: "JSON Diff for API and Webhook Payloads - SafeJSON",
    description:
      "Compare API responses, webhook payloads, and config snapshots with no pasted-content upload for core tools.",
    url: "/json-diff",
  },
  alternates: {
    canonical: "/json-diff",
  },
};

export default function DiffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
