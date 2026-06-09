#!/usr/bin/env node

// safejson-cli — Open SafeJSON from your terminal
// https://www.safejson.dev

const url = "https://www.safejson.dev";

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
    // If JSON is piped in, encode it and append to URL
    const encoded = encodeURIComponent(stdinInput.trim());
    const fullUrl = `${url}?json=${encoded}`;

    if (platform === "darwin") {
      command = `open "${fullUrl}"`;
    } else if (platform === "win32") {
      command = `start "" "${fullUrl}"`;
    } else {
      command = `xdg-open "${fullUrl}"`;
    }
  } else {
    if (platform === "darwin") {
      command = `open "${url}"`;
    } else if (platform === "win32") {
      command = `start "" "${url}"`;
    } else {
      command = `xdg-open "${url}"`;
    }
  }

  exec(command, (err) => {
    if (err) {
      console.error("Failed to open SafeJSON:", err.message);
      console.log(`Open manually: ${url}`);
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
