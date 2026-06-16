import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JWT Decoder - Inspect JWT Claims with No Token Upload | SafeJSON",
  description:
    "Decode JWT header, payload, and signature in a browser-local workflow. Inspect exp, iss, aud, and auth claims with no pasted-content upload.",
  openGraph: {
    title: "JWT Decoder - SafeJSON",
    description:
      "Decode JWT tokens, inspect claims, and debug auth payloads with no pasted-content upload.",
    url: "/jwt-decoder",
  },
  alternates: {
    canonical: "/jwt-decoder",
  },
};

export default function JwtLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
