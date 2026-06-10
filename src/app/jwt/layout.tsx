import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JWT Decoder — Decode JWT Client-Side, No Token Upload | SafeJSON",
  description:
    "Decode JWT header, payload, and signature instantly in your browser. Safe alternative to jwt.io. Your token never leaves your device — 100% client-side.",
  openGraph: {
    title: "JWT Decoder - SafeJSON",
    description:
      "Decode JWT tokens in your browser. Header, payload, and signature with no data upload.",
    url: "/jwt",
  },
  alternates: {
    canonical: "/jwt",
  },
};

export default function JwtLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
