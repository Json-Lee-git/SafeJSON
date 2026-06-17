import type { Metadata } from "next";
export const metadata: Metadata = {
  title:"CSV to JSON Converter — Convert CSV to JSON Online | SafeJSON",
  description:"Convert CSV data to JSON instantly. Paste CSV and get formatted JSON output in your browser. No pasted-content upload for this workflow.",
  openGraph:{title:"CSV to JSON Converter — SafeJSON",description:"Convert CSV to JSON online with no pasted-content upload for this workflow.",url:"/csv-to-json"},
  alternates:{canonical:"/csv-to-json"},
};
export default function Layout({children}:{children:React.ReactNode}){return children}
