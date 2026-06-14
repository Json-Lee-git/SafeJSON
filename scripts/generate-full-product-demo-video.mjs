import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";

const origin = process.env.SAFEJSON_BASE_URL || "https://www.safejson.dev";
const outputDir = path.join(process.cwd(), "growth", "assets");
const tempDir = path.join(outputDir, "full-demo-temp");
const webmFile = path.join(outputDir, "safejson-full-product-demo.raw.webm");
const wavFile = path.join(outputDir, "safejson-full-product-demo-voiceover.wav");
const mp4File = path.join(outputDir, "safejson-full-product-demo.mp4");
const ps1File = path.join(tempDir, "voiceover.ps1");
const voiceoverTextFile = path.join(tempDir, "voiceover.txt");
const neuralMp3File = path.join(tempDir, "voiceover-neural.mp3");
const ffmpegPath =
  "C:\\Users\\cacar\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-8.1.1-full_build\\bin\\ffmpeg.exe";
const ffprobePath = ffmpegPath.replace("ffmpeg.exe", "ffprobe.exe");

const voiceover = `
SafeJSON is a privacy-first JSON toolkit for developers.
It starts with the everyday formatter: paste a response, format it, inspect the tree, and copy clean JSON.
Core tools cover validation, viewing, parsing, beautifying, and CSV conversion.
For heavier workflows, SafeJSON Pro adds JSON Diff, JWT Decoder, JSONPath Query, and JSON Schema Validator.
Here is the important part: the same privacy model applies across every tool.
Diff compares two payloads locally.
JWT Decoder reads the header and payload in your browser.
JSONPath extracts nested values without sending the source JSON anywhere.
Schema Validator checks real API responses against a schema client-side.
Pro is five dollars a month, or thirty-nine dollars a year, and one license activates up to two devices.
But you do not have to trust the privacy claim.
Open DevTools, watch the Network tab, paste JSON, and verify that no request contains your pasted content.
That is the whole product principle: verify, do not trust.
`;

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: "inherit", windowsHide: true });
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} exited with ${code}`));
    });
  });
}

function runCapture(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { windowsHide: true });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk) => {
      stdout += chunk;
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk;
    });
    child.on("exit", (code) => {
      if (code === 0) resolve(stdout.trim());
      else reject(new Error(`${command} exited with ${code}: ${stderr}`));
    });
  });
}

async function mediaDurationSeconds(file) {
  const value = await runCapture(ffprobePath, [
    "-v",
    "error",
    "-show_entries",
    "format=duration",
    "-of",
    "default=nw=1:nk=1",
    file,
  ]);
  return Number(value);
}

async function makeVoiceover() {
  await fs.mkdir(tempDir, { recursive: true });
  await fs.writeFile(voiceoverTextFile, voiceover.trim(), "utf8");

  try {
    await run("python", [
      "-m",
      "edge_tts",
      "--voice",
      "en-US-GuyNeural",
      "--rate",
      "-8%",
      "--pitch",
      "-1Hz",
      "--file",
      voiceoverTextFile,
      "--write-media",
      neuralMp3File,
    ]);
    await run(ffmpegPath, ["-y", "-i", neuralMp3File, "-ar", "44100", "-ac", "1", wavFile]);
    return;
  } catch (error) {
    console.warn(`Neural TTS failed, falling back to Windows SAPI: ${error.message}`);
  }

  const escapedText = voiceover.replace(/`/g, "``").replace(/\$/g, "`$");
  const escapedOut = wavFile.replace(/'/g, "''");
  const ps = `
Add-Type -AssemblyName System.Speech
$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer
$synth.SelectVoice("Microsoft Zira Desktop")
$synth.Rate = 0
$synth.Volume = 100
$synth.SetOutputToWaveFile('${escapedOut}')
$synth.Speak(@'
${escapedText}
'@)
$synth.Dispose()
`;
  await fs.writeFile(ps1File, ps, "utf8");
  await run("powershell.exe", ["-NoProfile", "-ExecutionPolicy", "Bypass", "-File", ps1File]);
}

async function addDemoStyles(page) {
  await page.addStyleTag({
    content: `
      @keyframes sjPulse {
        0%, 100% { box-shadow: 0 0 0 0 rgba(52, 211, 153, .34); }
        50% { box-shadow: 0 0 0 12px rgba(52, 211, 153, 0); }
      }
      @keyframes sjSlide {
        from { opacity: 0; transform: translateY(12px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .sj-demo-card {
        position: fixed;
        left: 34px;
        top: 28px;
        z-index: 2147483646;
        max-width: 580px;
        padding: 18px 20px;
        border-radius: 12px;
        background: rgba(3, 7, 18, .88);
        border: 1px solid rgba(148, 163, 184, .28);
        color: white;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        box-shadow: 0 22px 60px rgba(0,0,0,.42);
        animation: sjSlide .32s ease-out;
      }
      .sj-demo-kicker {
        color: #34d399;
        font-size: 12px;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: .08em;
        margin-bottom: 8px;
      }
      .sj-demo-title {
        font-size: 26px;
        font-weight: 850;
        line-height: 1.05;
        letter-spacing: 0;
      }
      .sj-demo-body {
        margin-top: 10px;
        color: #d4d4d8;
        font-size: 15px;
        line-height: 1.42;
      }
      .sj-demo-badge {
        display: inline-flex;
        margin-top: 14px;
        padding: 8px 10px;
        border-radius: 999px;
        background: rgba(16,185,129,.14);
        border: 1px solid rgba(52,211,153,.32);
        color: #bbf7d0;
        font-size: 12px;
        font-weight: 750;
      }
      .sj-demo-highlight {
        outline: 3px solid rgba(52, 211, 153, .9) !important;
        outline-offset: 4px !important;
        animation: sjPulse 1.65s infinite;
      }
      .sj-network-panel {
        position: fixed;
        right: 34px;
        top: 96px;
        width: 430px;
        z-index: 2147483646;
        padding: 16px;
        border-radius: 12px;
        background: rgba(2, 6, 23, .94);
        border: 1px solid rgba(148, 163, 184, .32);
        color: white;
        font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
        box-shadow: 0 22px 60px rgba(0,0,0,.42);
      }
      .sj-network-panel h3 {
        margin: 0 0 12px;
        font-family: Inter, ui-sans-serif, system-ui, sans-serif;
        color: #93c5fd;
        font-size: 15px;
      }
      .sj-network-row {
        display: flex;
        justify-content: space-between;
        border-top: 1px solid rgba(148,163,184,.2);
        padding: 10px 0;
        font-size: 13px;
      }
      .sj-network-row strong { color: #86efac; font-size: 18px; }
    `,
  });
}

async function showCard(page, kicker, title, body, badge = "") {
  await page.evaluate(
    ({ kicker, title, body, badge }) => {
      document.querySelectorAll(".sj-demo-card").forEach((el) => el.remove());
      const card = document.createElement("div");
      card.className = "sj-demo-card";
      card.innerHTML = `
        <div class="sj-demo-kicker">${kicker}</div>
        <div class="sj-demo-title">${title}</div>
        <div class="sj-demo-body">${body}</div>
        ${badge ? `<div class="sj-demo-badge">${badge}</div>` : ""}
      `;
      document.body.appendChild(card);
    },
    { kicker, title, body, badge }
  );
}

async function highlight(page, locator) {
  await page.evaluate(() => {
    document.querySelectorAll(".sj-demo-highlight").forEach((el) => {
      el.classList.remove("sj-demo-highlight");
    });
  });
  try {
    await locator.first().evaluate((el) => el.classList.add("sj-demo-highlight"));
  } catch {
    // Highlighting is decorative; keep the demo moving if a selector changes.
  }
}

async function clickText(page, text) {
  const target = page.getByText(text, { exact: true }).first();
  if (await target.count().catch(() => 0)) {
    await target.click({ timeout: 3000 }).catch(() => {});
  }
}

async function clickButton(page, name) {
  const target = page.getByRole("button", { name }).first();
  if (await target.count().catch(() => 0)) {
    await target.click({ timeout: 3000 }).catch(() => {});
  }
}

async function scene(page, url, kicker, title, body, badge, durationMs) {
  await page.goto(url, { waitUntil: "networkidle" });
  await addDemoStyles(page);
  await showCard(page, kicker, title, body, badge);
  await wait(durationMs);
}

async function runDemo() {
  await fs.mkdir(outputDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    recordVideo: {
      dir: outputDir,
      size: { width: 1920, height: 1080 },
    },
  });
  const page = await context.newPage();

  const networkEvents = [];
  let captureNetwork = false;
  page.on("request", (request) => {
    if (!captureNetwork) return;
    const postData = request.postData() || "";
    const containsPastedContent =
      postData.includes("redacted-github-token") ||
      postData.includes("redacted-aws-key") ||
      postData.includes("billing-api") ||
      request.url().includes("redacted-github-token") ||
      request.url().includes("billing-api");
    networkEvents.push({ url: request.url(), method: request.method(), containsPastedContent });
  });

  await page.goto(origin, { waitUntil: "networkidle" });
  await page.evaluate(() => {
    localStorage.setItem("safejson_dev", "1");
    localStorage.setItem("safejson_pro_unlocked", "1");
    localStorage.setItem("safejson_pro_license_key", "demo-license-key");
    localStorage.setItem("safejson_pro_instance_id", "demo-instance");
    localStorage.setItem("safejson_pro_instance_name", "SafeJSON Demo Browser");
    localStorage.setItem("safejson_pro_license_status", "active");
    localStorage.setItem("safejson_pro_last_validated", String(Date.now()));
  });

  await scene(
    page,
    origin,
    "SafeJSON",
    "JSON tools that keep pasted content local",
    "Format, validate, compare, decode, query, and validate schemas in one browser-based toolkit.",
    "No pasted-content upload. Verify in DevTools.",
    5200
  );

  await page.locator("textarea").first().click();
  await page.keyboard.press("Control+A");
  await page.keyboard.type(
    JSON.stringify(
      {
        service: "billing-api",
        plan: "pro",
        active: true,
        tokens: ["redacted-github-token", "redacted-aws-key"],
      },
      null,
      2
    ),
    { delay: 1 }
  );
  await page.keyboard.press("Control+Enter");
  await showCard(
    page,
    "Core workflow",
    "Formatter, validator, tree view",
    "Paste JSON, format it, inspect structured output, copy or download the result.",
    "Free core tools"
  );
  await highlight(page, page.locator("textarea").first());
  await wait(6200);
  await clickText(page, "Raw");
  await wait(1800);

  await scene(
    page,
    `${origin}/json-validator`,
    "Core tools",
    "Validation, viewer, parser, beautifier",
    "SafeJSON includes focused pages for common JSON cleanup and inspection workflows.",
    "All client-side",
    4300
  );
  await clickButton(page, "Sample");
  await clickButton(page, "Validate");
  await wait(2600);

  await scene(
    page,
    `${origin}/json-to-csv`,
    "Data conversion",
    "JSON to CSV, and CSV back to JSON",
    "Convert developer payloads and tabular data locally without sending source content to a server.",
    "Useful for logs and API responses",
    5200
  );
  await clickButton(page, "Sample");
  await wait(1200);
  await clickButton(page, "Convert");
  await wait(2200);

  await scene(
    page,
    `${origin}/diff?dev`,
    "Pro tool 1",
    "JSON Diff",
    "Compare two payloads side by side. Added, removed, and changed values are highlighted.",
    "Pro unlocked in this browser",
    3600
  );
  await clickButton(page, "Sample");
  await clickButton(page, "Compare");
  await highlight(page, page.getByRole("button", { name: "Compare" }));
  await wait(4800);

  await scene(
    page,
    `${origin}/jwt?dev`,
    "Pro tool 2",
    "JWT Decoder",
    "Decode headers and payloads locally. Useful for inspecting claims without uploading the token.",
    "Header, payload, signature",
    3600
  );
  await clickButton(page, "Sample");
  await clickButton(page, "Decode");
  await highlight(page, page.getByRole("button", { name: "Decode" }));
  await wait(4800);

  await scene(
    page,
    `${origin}/jsonpath?dev`,
    "Pro tool 3",
    "JSONPath Query",
    "Extract nested fields, filter arrays, and test expressions directly in the browser.",
    "Query large payloads locally",
    3600
  );
  await clickButton(page, "Sample");
  await clickButton(page, "Query");
  await highlight(page, page.getByRole("button", { name: "Query" }));
  await wait(4800);

  await scene(
    page,
    `${origin}/schema?dev`,
    "Pro tool 4",
    "JSON Schema Validator",
    "Validate API responses against JSON Schema and catch missing fields or wrong types.",
    "Client-side schema validation",
    3600
  );
  await clickButton(page, "Sample");
  await clickButton(page, "Validate");
  await highlight(page, page.getByRole("button", { name: "Validate" }));
  await wait(5000);

  await scene(
    page,
    `${origin}/pricing`,
    "SafeJSON Pro",
    "$5/month or $39/year",
    "Pro unlocks unlimited Diff, JWT, JSONPath, and Schema tools. One license activates up to two devices.",
    "Payments handled by Lemon Squeezy",
    6200
  );

  await page.goto(origin, { waitUntil: "networkidle" });
  await addDemoStyles(page);
  await showCard(
    page,
    "Verification",
    "Verify, don't trust",
    "Open DevTools, watch Network, paste JSON, and confirm no request contains pasted content.",
    "Browser-observable privacy"
  );
  captureNetwork = true;
  await page.locator("textarea").first().click();
  await page.keyboard.press("Control+A");
  await page.keyboard.type(
    JSON.stringify(
      {
        service: "billing-api",
        account: "redacted@example.com",
        secret: "redacted-github-token",
        awsKey: "redacted-aws-key",
      },
      null,
      2
    ),
    { delay: 1 }
  );
  await page.keyboard.press("Control+Enter");
  await wait(1800);
  const pastedContentRequests = networkEvents.filter((event) => event.containsPastedContent).length;
  await page.evaluate(
    ({ checked, pastedContentRequests }) => {
      document.querySelectorAll(".sj-network-panel").forEach((el) => el.remove());
      const panel = document.createElement("div");
      panel.className = "sj-network-panel";
      panel.innerHTML = `
        <h3>Network check after paste</h3>
        <div class="sj-network-row"><span>Requests inspected</span><strong>${checked}</strong></div>
        <div class="sj-network-row"><span>Requests containing pasted JSON</span><strong>${pastedContentRequests}</strong></div>
        <div class="sj-network-row"><span>Pasted-content uploads</span><strong>${pastedContentRequests}</strong></div>
      `;
      document.body.appendChild(panel);
    },
    { checked: networkEvents.length, pastedContentRequests }
  );
  await wait(7800);

  await showCard(
    page,
    "SafeJSON",
    "A JSON toolkit you can verify",
    "Use the free formatter today. Upgrade only if you need unlimited Pro workflows.",
    "https://www.safejson.dev"
  );
  await wait(5200);

  const video = page.video();
  await context.close();
  await browser.close();

  if (!video) throw new Error("No video recorded.");
  const tempPath = await video.path();
  await fs.copyFile(tempPath, webmFile);
}

await makeVoiceover();
await runDemo();

await run(ffmpegPath, [
  "-y",
  "-i",
  webmFile,
  "-i",
  wavFile,
  "-filter_complex",
  "[0:v]setpts=0.68*PTS[v];[1:a]apad=pad_dur=8[a]",
  "-map",
  "[v]",
  "-map",
  "[a]",
  "-t",
  "85",
  "-c:v",
  "libx264",
  "-preset",
  "veryfast",
  "-pix_fmt",
  "yuv420p",
  "-c:a",
  "aac",
  "-b:a",
  "192k",
  "-movflags",
  "+faststart",
  mp4File,
]);

const stat = await fs.stat(mp4File);
console.log(
  JSON.stringify(
    {
      outputFile: mp4File,
      bytes: stat.size,
      includes: [
        "Formatter",
        "Validator",
        "JSON to CSV",
        "JSON Diff",
        "JWT Decoder",
        "JSONPath",
        "JSON Schema Validator",
        "Pricing",
        "DevTools-style Network verification",
      ],
    },
    null,
    2
  )
);
