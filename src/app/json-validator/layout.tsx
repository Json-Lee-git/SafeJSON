import type { Metadata } from "next";
export const metadata: Metadata = {
  title:"JSON Validator — Validate JSON Online | SafeJSON",
  description:"Validate JSON with line and column error reporting. Check syntax, find missing commas, fix malformed JSON. 100% client-side, no data upload.",
  openGraph:{title:"JSON Validator — SafeJSON",description:"Validate JSON online with exact error locations. Client-side, no data upload.",url:"/json-validator"},
  alternates:{canonical:"/json-validator"},
};
export default function Layout({children}:{children:React.ReactNode}){return children}
