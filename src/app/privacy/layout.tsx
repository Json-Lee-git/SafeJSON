import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - SafeJSON",
  description:
    "SafeJSON explains browser-local processing for core JSON tools, no pasted-content upload, and DevTools-verifiable privacy.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
