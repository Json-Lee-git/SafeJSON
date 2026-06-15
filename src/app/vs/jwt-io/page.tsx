import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../../components/Footer";
import { BreadcrumbSchema } from "../../components/StructuredData";
import { RelatedComparisons } from "../../components/ComparisonContent";

export const metadata: Metadata = {
  title: "SafeJSON vs jwt.io — JWT Decoder Comparison | SafeJSON",
  description:"SafeJSON decodes JWT tokens locally in your browser. jwt.io sends your token to a server. Compare features, privacy, and security.",
  alternates: { canonical: "/vs/jwt-io" },
};

export default function VsJwtIoPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      <BreadcrumbSchema items={[{ name: "SafeJSON", url: "https://www.safejson.dev" },{ name: "vs jwt.io", url: "https://www.safejson.dev/vs/jwt-io" }]} />
      <header className="border-b border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center"><Link href="/" className="text-lg font-bold tracking-tight"><span className="text-emerald-400">{`{`}</span>SafeJSON<span className="text-emerald-400">{`}`}</span></Link></div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold tracking-tight mb-4">SafeJSON vs jwt.io</h1>
        <p className="text-lg text-zinc-400 mb-8">SafeJSON decodes JWT tokens entirely in your browser — the token never leaves your device. jwt.io is the most popular online JWT debugger, but it processes tokens on its server. For production tokens, this matters.</p>
        <div className="overflow-x-auto mb-12">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-zinc-800"><th className="text-left py-3 pr-4 text-zinc-400 font-medium w-1/3">Feature</th><th className="text-left py-3 pr-4 text-emerald-400 font-medium">SafeJSON</th><th className="text-left py-3 text-zinc-500 font-medium">jwt.io</th></tr></thead>
            <tbody className="divide-y divide-zinc-800/50">
              {[["JWT processing","Client-side only. Token never leaves your device.","Server-side. Token transmitted to jwt.io servers."],["Safe for production tokens","Yes - token is decoded locally and not uploaded.","No — production tokens should never leave your machine."],["Verifiable privacy","Yes — open DevTools Network tab.","No — token is sent via network request."],["Open source","Yes (MIT)","Yes (jwt.io debugger is open source)"],["Extra JSON tools","Diff, Validator, JSONPath, Schema, Formatter, CSV conversion","None — JWT decoder only"],["Price","Free / $5 Pro","Free"]].map(([f,s,j],i)=><tr key={i} className="hover:bg-white/[0.02]"><td className="py-3 pr-4 text-zinc-300 font-medium">{f}</td><td className="py-3 pr-4 text-zinc-400">{s}</td><td className="py-3 text-zinc-500">{j}</td></tr>)}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-zinc-500 mb-4">jwt.io is a great learning and debugging tool. But if you are working with production authentication tokens or security-sensitive JWTs, a client-side decoder like SafeJSON ensures your tokens never leave your browser.</p>
        <RelatedComparisons current="/vs/jwt-io" />
        <div className="text-center mt-8"><Link href="/jwt-decoder" className="inline-flex px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-xl transition-colors text-sm">Try SafeJSON JWT Decoder</Link></div>
      </main>
      <Footer />
    </div>
  );
}
