import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — SafeJSON",
  description:
    "SafeJSON does not collect, store, or transmit any user data. All processing happens in your browser.",
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
