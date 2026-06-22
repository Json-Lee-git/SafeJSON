import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import LazyGoogleAnalytics from "./components/LazyGoogleAnalytics";
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
    "Format, validate, and debug pasted JSON in browser-local workflows. Open DevTools -> Network and verify pasted JSON is not uploaded during core tool use.",
  keywords: [
    "JSON formatter",
    "JSON validator",
    "JSON beautifier",
    "JSON tree view",
    "format JSON online",
    "JSON parser",
    "privacy",
    "browser-local JSON formatter",
  ],
  openGraph: {
    title: "SafeJSON - Verifiable JSON Tools with No Pasted-Content Upload",
    description:
      "Format, validate, and debug pasted JSON in browser-local workflows. Verify the pasted-content boundary with DevTools Network.",
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "SafeJSON - Verifiable JSON Tools with No Pasted-Content Upload",
    description:
      "Format, validate, and debug pasted JSON in browser-local workflows. Verify the pasted-content boundary with DevTools Network.",
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
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://stats.g.doubleclick.net" />
        <link rel="preconnect" href="https://jsonlee.lemonsqueezy.com" />
      </head>
      <body className="min-h-full flex flex-col">
        <LazyGoogleAnalytics gaId="G-18261586928" />
        <OrganizationSchema />
        <WebSiteSchema />
        {children}
      </body>
    </html>
  );
}
