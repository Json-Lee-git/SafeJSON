import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "SafeJSON — Privacy-first JSON formatter",
  description:
    "Format, validate, and debug JSON entirely in your browser. No server. No ads. No tracking. Your data never leaves your computer.",
  keywords: [
    "JSON formatter",
    "JSON validator",
    "JSON beautifier",
    "JSON tree view",
    "format JSON online",
    "JSON parser",
    "privacy",
  ],
  openGraph: {
    title: "SafeJSON — The JSON tool that never sees your data",
    description:
      "Format, validate, and debug JSON entirely in your browser. No server uploads. Open source.",
    type: "website",
    url: "https://safejson.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "SafeJSON — The JSON tool that never sees your data",
    description:
      "Format, validate, and debug JSON entirely in your browser. No server uploads. Open source.",
  },
  metadataBase: new URL("https://safejson.vercel.app"),
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
