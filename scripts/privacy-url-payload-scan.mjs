import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { globSync } from "node:fs";

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);

const scanGlobs = [
  "src/**/*.{ts,tsx,js,jsx,md,mdx}",
  "extension/**/*.{js,json,html,md}",
  "npm-package/**/*.{js,json,md}",
  "public/**/*.{txt,md,json,xml}",
  "README.md",
  "package.json",
  "next.config.ts",
];

const forbiddenPatterns = [
  {
    name: "URL JSON query payload",
    regex: /\?json=/i,
  },
  {
    name: "Homepage JSON query reader",
    regex: /searchParams\.get\(\s*["']json["']\s*\)/i,
  },
  {
    name: "SafeJSON JSON query URL",
    regex: /safejson\.dev[^"'`\s)]*\?json/i,
  },
  {
    name: "Old Vercel domain",
    regex: /safejson\.vercel\.app/i,
  },
  {
    name: "JSON query import variable",
    regex: /\b(jsonParam|fullUrl)\b/i,
  },
];

function filesForGlob(pattern) {
  return globSync(pattern, {
    cwd: repoRoot,
    nodir: true,
    withFileTypes: false,
  });
}

function unique(values) {
  return [...new Set(values)].sort();
}

async function main() {
  const files = unique(scanGlobs.flatMap(filesForGlob)).filter((file) =>
    existsSync(path.join(repoRoot, file)),
  );
  const failures = [];

  for (const file of files) {
    const absolute = path.join(repoRoot, file);
    const text = await readFile(absolute, "utf8");
    const lines = text.split(/\r?\n/);

    for (const [index, line] of lines.entries()) {
      for (const pattern of forbiddenPatterns) {
        if (pattern.regex.test(line)) {
          failures.push({
            file,
            line: index + 1,
            pattern: pattern.name,
            text: line.trim().slice(0, 220),
          });
        }
      }
    }
  }

  if (failures.length > 0) {
    console.error("Privacy URL payload scan failed:");
    for (const failure of failures) {
      console.error(
        `${failure.file}:${failure.line} [${failure.pattern}] ${failure.text}`,
      );
    }
    process.exit(1);
  }

  console.log(`Privacy URL payload scan passed: ${files.length} files checked`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
