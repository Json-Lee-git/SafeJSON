#!/usr/bin/env node

// safejson-cli — Open SafeJSON from your terminal
// https://www.safejson.dev

const siteUrl = "https://www.safejson.dev";

// Accept optional JSON input via stdin
let input = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => {
  input += chunk;
});

process.stdin.on("end", () => {
  openSafeJson(input);
});

async function openSafeJson(stdinInput) {
  const { exec } = await import("node:child_process");
  const platform = process.platform;
  let command;

  if (stdinInput.trim()) {
    console.log(
      "SafeJSON no longer transfers JSON through URLs. Paste your JSON manually to keep the workflow browser-local."
    );
  }

  if (platform === "darwin") {
    command = `open "${siteUrl}"`;
  } else if (platform === "win32") {
    command = `start "" "${siteUrl}"`;
  } else {
    command = `xdg-open "${siteUrl}"`;
  }

  exec(command, (err) => {
    if (err) {
      console.error("Failed to open SafeJSON:", err.message);
      console.log(`Open manually: ${siteUrl}`);
      process.exit(1);
    }
  });
}

// If no stdin data within 100ms, just open the URL
setTimeout(() => {
  if (!input) {
    process.stdin.end();
  }
}, 100);
