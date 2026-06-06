import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JWT Decoder — Decode JSON Web Tokens Online | SafeJSON",
  description:
    "Decode JWT header, payload, and signature instantly in your browser. Your token never leaves your device. 100% client-side JWT decoder.",
  openGraph: {
    title: "JWT Decoder — SafeJSON",
    description:
      "Decode JWT tokens in your browser. Header, payload, and signature — no data upload.",
  },
};

export default function JwtLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
