import Link from "next/link";

export default function Footer() {
  const linkClass =
    "inline-flex min-h-10 items-center rounded px-2 text-zinc-400 transition-colors hover:text-zinc-200";

  return (
    <footer className="border-t border-zinc-800 py-8 text-center text-xs text-zinc-500">
      <div className="max-w-4xl mx-auto px-4 space-y-3">
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          <span className="font-medium text-zinc-300">Free Tools:</span>
          <Link href="/" className={linkClass}>Formatter</Link>
          <Link href="/json-beautifier" className={linkClass}>Beautifier</Link>
          <Link href="/json-viewer" className={linkClass}>Viewer</Link>
          <Link href="/json-parser" className={linkClass}>Parser</Link>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          <span className="font-medium text-zinc-300">Pro Tools:</span>
          <Link href="/json-diff" className={linkClass}>Diff</Link>
          <Link href="/jwt-decoder" className={linkClass}>JWT</Link>
          <Link href="/jsonpath-query" className={linkClass}>JSONPath</Link>
          <Link href="/json-schema-validator" className={linkClass}>Schema</Link>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          <span className="font-medium text-zinc-300">Compare:</span>
          <Link href="/compare" className={linkClass}>vs jsonformatter.org</Link>
          <Link href="/vs/codebeautify" className={linkClass}>vs codebeautify</Link>
          <Link href="/vs/jsonformatter-extension" className={linkClass}>vs extension</Link>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 pt-2">
          <Link href="/about" className={linkClass}>About</Link>
          <Link href="/support" className={linkClass}>Help</Link>
          <Link href="/blog/safest-json-formatter" className={linkClass}>Blog</Link>
          <Link href="/privacy" className={linkClass}>Privacy</Link>
          <Link href="/extension/permissions" className={linkClass}>Extension</Link>
          <Link href="/no-upload-json-formatter" className={linkClass}>No-upload formatter</Link>
          <Link href="/privacy/verify-local-processing" className={linkClass}>Verify local processing</Link>
          <Link href="/security/check-json-formatter-upload" className={linkClass}>Security guide</Link>
          <Link href="/pricing" className={linkClass}>Pricing</Link>
          <Link href="https://www.producthunt.com/products/safejson-privacy" className={linkClass}>Product Hunt</Link>
        </div>
      </div>
      <p className="mt-4">SafeJSON. No pasted-content upload for core tools.</p>
    </footer>
  );
}
