import type { Metadata } from "next";
export const metadata: Metadata = {
  title:"CSV to JSON Converter — Convert CSV to JSON Online | SafeJSON",
  description:"Convert CSV data to JSON instantly. Paste CSV and get formatted JSON output. Free client-side CSV to JSON converter. No data upload.",
  openGraph:{title:"CSV to JSON Converter — SafeJSON",description:"Convert CSV to JSON online. Free, client-side, no upload.",url:"/csv-to-json"},
  alternates:{canonical:"/csv-to-json"},
};
export default function Layout({children}:{children:React.ReactNode}){return children}
