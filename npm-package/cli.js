#!/usr/bin/env node

// safejson-cli - Open SafeJSON from your terminal
// https://www.safejson.dev

const siteUrl = "https://www.safejson.dev";

const args = process.argv.slice(2);

if (args.includes("--help") || args.includes("-h")) {
  console.log(`safejson - open SafeJSON from your terminal

Usage:
  safejson
  cat data.json | safejson

When stdin is provided, SafeJSON opens without transferring the payload through the URL.
Paste JSON manually into the browser to keep the workflow browser-local.`);
  process.exit(0);
}

if (args.includes("--version") || args.includes("-v")) {
  console.log("0.1.1");
  process.exit(0);
}

// Accept optional JSON input via stdin
let input = "";
let opened = false;
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => {
  input += chunk;
});

process.stdin.on("end", () => {
  openSafeJsonOnce(input);
});

function openSafeJsonOnce(stdinInput) {
  if (opened) return;
  opened = true;
  openSafeJson(stdinInput);
}

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

// If no stdin data arrives within 100ms, just open the URL.
setTimeout(() => {
  if (!input) {
    openSafeJsonOnce("");
  }
}, 100);
