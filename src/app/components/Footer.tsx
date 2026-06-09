import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 py-8 text-center text-xs text-zinc-600">
      <div className="max-w-4xl mx-auto px-4 space-y-3">
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
          <span className="text-zinc-500 font-medium">Free Tools:</span>
          <Link href="/" className="hover:text-zinc-400 transition-colors">Formatter</Link>
          <Link href="/json-beautifier" className="hover:text-zinc-400 transition-colors">Beautifier</Link>
          <Link href="/json-viewer" className="hover:text-zinc-400 transition-colors">Viewer</Link>
          <Link href="/json-parser" className="hover:text-zinc-400 transition-colors">Parser</Link>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
          <span className="text-zinc-500 font-medium">Pro Tools:</span>
          <Link href="/diff" className="hover:text-zinc-400 transition-colors">Diff</Link>
          <Link href="/jwt" className="hover:text-zinc-400 transition-colors">JWT</Link>
          <Link href="/jsonpath" className="hover:text-zinc-400 transition-colors">JSONPath</Link>
          <Link href="/schema" className="hover:text-zinc-400 transition-colors">Schema</Link>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
          <span className="text-zinc-500 font-medium">Compare:</span>
          <Link href="/compare" className="hover:text-zinc-400 transition-colors">vs jsonformatter.org</Link>
          <Link href="/vs/codebeautify" className="hover:text-zinc-400 transition-colors">vs codebeautify</Link>
          <Link href="/vs/jsonformatter-extension" className="hover:text-zinc-400 transition-colors">vs extension</Link>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 pt-2">
          <Link href="/about" className="hover:text-zinc-400 transition-colors">About</Link>
          <Link href="/support" className="hover:text-zinc-400 transition-colors">Help</Link>
          <Link href="/blog/safest-json-formatter" className="hover:text-zinc-400 transition-colors">Blog</Link>
          <Link href="/privacy" className="hover:text-zinc-400 transition-colors">Privacy</Link>
          <Link href="/pricing" className="hover:text-zinc-400 transition-colors">Pricing</Link>
        </div>
      </div>
      <p className="mt-4">SafeJSON. All processing happens in your browser. We never see your data.</p>
    </footer>
  );
}
