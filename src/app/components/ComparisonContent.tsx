import Link from "next/link";

export const comparisonRows = [
  ["Feature", "SafeJSON", "jsonformatter.org", "jsonviewer.stack.hu", "Firefox Native", "VS Code"],
  ["Client-side", "Yes", "No (server)", "No clear claim", "Yes", "Yes"],
  ["Verifiable in Network tab", "Yes", "No", "No", "Yes", "Yes"],
  ["Data breach history", "None", "80K credentials leaked", "None", "None", "None"],
  ["Open source", "MIT", "No", "No", "Yes", "Yes"],
  ["JSON Diff", "Yes (Pro)", "No", "No", "No", "No"],
  ["JWT Decoder", "Yes (Pro)", "No", "No", "No", "No"],
  ["JSONPath", "Yes (Pro)", "No", "No", "No", "No"],
  ["Schema Validator", "Yes (Pro)", "No", "No", "No", "No"],
  ["Ads", "None", "Yes", "None", "None", "None"],
  ["Large file handling", "50MB+", "Limited", "Limited", "Limited", "~10MB"],
  ["Price", "Free / $5 Pro", "Free (ads)", "Free", "Free", "Free"],
];

export function ComparisonTable({
  rows = comparisonRows,
}: {
  rows?: string[][];
}) {
  const [header, ...body] = rows;

  return (
    <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900/30">
      <table className="w-full min-w-[760px] text-sm">
        <thead>
          <tr className="border-b border-zinc-800 bg-zinc-950/50">
            {header.map((cell, index) => (
              <th
                key={cell}
                className={`px-4 py-3 text-left font-medium ${
                  index === 1 ? "text-emerald-400" : "text-zinc-400"
                }`}
              >
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800/50">
          {body.map((row) => (
            <tr key={row[0]} className="hover:bg-white/[0.02]">
              {row.map((cell, index) => (
                <td
                  key={`${row[0]}-${index}`}
                  className={`px-4 py-3 align-top ${
                    index === 0
                      ? "font-medium text-zinc-300"
                      : index === 1
                        ? "text-zinc-200"
                        : "text-zinc-500"
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function VerificationTutorial() {
  return (
    <section className="rounded-xl border border-emerald-400/15 bg-emerald-400/[0.04] p-6">
      <h2 className="text-xl font-semibold">How to verify any JSON tool</h2>
      <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-zinc-400">
        <li>Open the tool in your browser.</li>
        <li>Open DevTools and switch to the Network tab.</li>
        <li>Paste JSON and run the formatter, viewer, diff, decoder, or parser.</li>
        <li>
          If a new request contains your data, the tool uploaded it. SafeJSON
          does not upload pasted JSON while processing it.
        </li>
      </ol>
    </section>
  );
}

export function RelatedComparisons({ current }: { current?: string }) {
  const links = [
    { href: "/compare", label: "All JSON formatter comparisons" },
    { href: "/vs/jsonformatter-org", label: "SafeJSON vs jsonformatter.org" },
    { href: "/vs/codebeautify", label: "SafeJSON vs codebeautify.org" },
    {
      href: "/vs/jsonformatter-extension",
      label: "SafeJSON vs JSON Formatter Extension",
    },
    { href: "/vs/jsonlint", label: "SafeJSON vs JSONLint" },
    { href: "/vs/jwt-io", label: "SafeJSON vs jwt.io" },
  ].filter((link) => link.href !== current);

  return (
    <section className="border-t border-zinc-800/50 pt-8">
      <p className="mb-3 text-xs uppercase tracking-wider text-zinc-600">
        Related comparisons
      </p>
      <div className="flex flex-wrap gap-x-5 gap-y-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm text-zinc-500 transition-colors hover:text-emerald-400"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
