import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JWT Decoder - Decode JWT Client-Side, No Token Upload | SafeJSON",
  description:
    "Decode JWT header, payload, and signature instantly in your browser. Safe alternative to server-side JWT decoders. No token upload.",
  openGraph: {
    title: "JWT Decoder - SafeJSON",
    description:
      "Decode JWT tokens in your browser. Header, payload, and signature with no token upload.",
    url: "/jwt-decoder",
  },
  alternates: {
    canonical: "/jwt-decoder",
  },
};

export default function JwtDecoderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
