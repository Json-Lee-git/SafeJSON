import type { Metadata } from "next";
export const metadata: Metadata = {
  title:"JSON Validator - Validate JSON Online | SafeJSON",
  description:"Validate JSON with line and column error reporting. Check syntax, find missing commas, and fix malformed JSON in a browser-local workflow.",
  openGraph:{title:"JSON Validator - SafeJSON",description:"Validate JSON online with exact error locations and no pasted-content upload for this workflow.",url:"/json-validator"},
  alternates:{canonical:"/json-validator"},
};
export default function Layout({children}:{children:React.ReactNode}){return children}
