import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { OrganizationSchema, WebSiteSchema } from "./components/StructuredData";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SafeJSON - JSON Formatter You Can Verify",
  description:
    "Format, validate, and debug JSON entirely in your browser. Open DevTools -> Network and verify zero new requests while your data is processed locally.",
  keywords: [
    "JSON formatter",
    "JSON validator",
    "JSON beautifier",
    "JSON tree view",
    "format JSON online",
    "JSON parser",
    "privacy",
    "client-side JSON formatter",
  ],
  openGraph: {
    title: "SafeJSON - The JSON tool that never sees your data",
    description:
      "Format, validate, and debug JSON entirely in your browser. Prove it yourself with DevTools Network.",
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "SafeJSON - The JSON tool that never sees your data",
    description:
      "Format, validate, and debug JSON entirely in your browser. Prove it yourself with DevTools Network.",
  },
  metadataBase: new URL("https://www.safejson.dev"),
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "r4KEIdIxrxAz55Mc",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col">
        <OrganizationSchema />
        <WebSiteSchema />
        {children}
      </body>
    </html>
  );
}
