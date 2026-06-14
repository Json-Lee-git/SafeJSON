import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";

const origin = process.env.SAFEJSON_BASE_URL || "https://www.safejson.dev";
const outputDir = path.join(process.cwd(), "growth", "assets");
const tempDir = path.join(outputDir, "synced-demo-temp");
const mp4File = path.join(outputDir, "safejson-full-product-demo.mp4");
const ffmpegPath =
  "C:\\Users\\cacar\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-8.1.1-full_build\\bin\\ffmpeg.exe";
const ffprobePath = ffmpegPath.replace("ffmpeg.exe", "ffprobe.exe");

const scenes = [
  {
    id: "intro",
    url: origin,
    kicker: "SafeJSON",
    title: "JSON tools that keep pasted content local",
    body: "Format, validate, compare, decode, query, and validate schemas in one browser-based toolkit.",
    subtitle: "SafeJSON is a privacy-first JSON toolkit for developers.",
    voice:
      "SafeJSON is a privacy-first JSON toolkit for developers. It keeps pasted content local in your browser.",
  },
  {
    id: "formatter",
    url: origin,
    kicker: "Core workflow",
    title: "Formatter, validator, tree view",
    body: "Paste JSON, format it, inspect structured output, and copy clean results.",
    subtitle: "Paste JSON, format it, inspect the tree, and copy clean output.",
    voice:
      "Start with the formatter. Paste a response, format it, inspect the tree, and copy clean JSON.",
    action: async (page) => {
      await fillFirstTextarea(page, {
        service: "billing-api",
        plan: "pro",
        active: true,
        tokens: ["redacted-github-token", "redacted-aws-key"],
      });
      await page.keyboard.press("Control+Enter").catch(() => {});
    },
  },
  {
    id: "validator",
    url: `${origin}/json-validator`,
    kicker: "Core tools",
    title: "Validation and cleanup",
    body: "Validate, view, parse, and beautify JSON from focused pages built for quick checks.",
    subtitle: "Validate and clean JSON locally before you share or ship it.",
    voice:
      "For cleanup, use focused validator, viewer, parser, and beautifier pages to catch broken JSON quickly.",
    action: async (page) => {
      await clickButton(page, "Sample");
      await clickButton(page, "Validate");
    },
  },
  {
    id: "csv",
    url: `${origin}/json-to-csv`,
    kicker: "Data conversion",
    title: "JSON to CSV, and CSV back to JSON",
    body: "Convert API responses and tabular data locally for debugging, reporting, and analysis.",
    subtitle: "Convert JSON and CSV without uploading source data.",
    voice:
      "When you need a spreadsheet-friendly format, convert JSON to CSV, or CSV back to JSON, in the browser.",
    action: async (page) => {
      await clickButton(page, "Sample");
      await clickButton(page, "Convert");
    },
  },
  {
    id: "diff",
    url: `${origin}/diff?dev`,
    kicker: "Pro tool 1",
    title: "JSON Diff",
    body: "Compare two payloads side by side. Added, removed, and changed values are highlighted.",
    subtitle: "Pro: compare two JSON payloads side by side.",
    voice:
      "SafeJSON Pro starts with JSON Diff: compare two payloads and see changed values clearly.",
    action: async (page) => {
      await clickButton(page, "Sample");
      await clickButton(page, "Compare");
    },
  },
  {
    id: "jwt",
    url: `${origin}/jwt?dev`,
    kicker: "Pro tool 2",
    title: "JWT Decoder",
    body: "Decode headers and payloads locally, then inspect claims without uploading the token.",
    subtitle: "Pro: decode JWT headers and payloads locally.",
    voice:
      "JWT Decoder reads the header and payload locally, so you can inspect claims without uploading the token.",
    action: async (page) => {
      await clickButton(page, "Sample");
      await clickButton(page, "Decode");
    },
  },
  {
    id: "jsonpath",
    url: `${origin}/jsonpath?dev`,
    kicker: "Pro tool 3",
    title: "JSONPath Query",
    body: "Extract nested fields, filter arrays, and test expressions against real JSON.",
    subtitle: "Pro: query nested JSON with JSONPath.",
    voice:
      "JSONPath Query extracts nested fields, filters arrays, and tests expressions against real JSON.",
    action: async (page) => {
      await clickButton(page, "Sample");
      await clickButton(page, "Query");
    },
  },
  {
    id: "schema",
    url: `${origin}/schema?dev`,
    kicker: "Pro tool 4",
    title: "JSON Schema Validator",
    body: "Validate API responses against schemas and catch missing fields or wrong types.",
    subtitle: "Pro: validate API responses against JSON Schema.",
    voice:
      "Schema Validator checks API responses against JSON Schema and catches missing fields or wrong types.",
    action: async (page) => {
      await clickButton(page, "Sample");
      await clickButton(page, "Validate");
    },
  },
  {
    id: "pricing",
    url: `${origin}/pricing`,
    kicker: "SafeJSON Pro",
    title: "$5/month or $39/year",
    body: "Unlock unlimited Diff, JWT, JSONPath, and Schema workflows. One license activates up to two devices.",
    subtitle: "Pro unlocks the advanced JSON workflows for $5/month or $39/year.",
    voice:
      "Pro is five dollars a month, or thirty-nine dollars a year. One license activates up to two devices.",
  },
  {
    id: "verify",
    url: origin,
    kicker: "Verification",
    title: "Verify, don't trust",
    body: "Open DevTools, watch Network, paste JSON, and confirm no request contains pasted content.",
    subtitle: "Verify in DevTools: no request contains pasted content.",
    voice:
      "You do not have to trust the privacy claim. Open DevTools, watch Network, and verify no request contains pasted content.",
    action: async (page) => {
      await fillFirstTextarea(page, {
        service: "billing-api",
        account: "redacted@example.com",
        secret: "redacted-github-token",
        awsKey: "redacted-aws-key",
      });
      await page.keyboard.press("Control+Enter").catch(() => {});
      await addNetworkPanel(page);
    },
  },
  {
    id: "outro",
    url: origin,
    kicker: "SafeJSON",
    title: "A JSON toolkit you can verify",
    body: "Use the free formatter today. Upgrade only when you need unlimited Pro workflows.",
    subtitle: "SafeJSON: a JSON toolkit you can verify.",
    voice:
      "That is the product principle: verify, do not trust. Use the free formatter today, then upgrade when you need Pro.",
  },
];

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

async function durationSeconds(file) {
  const output = await runCapture(ffprobePath, [
    "-v",
    "error",
    "-show_entries",
    "format=duration",
    "-of",
    "default=nw=1:nk=1",
    file,
  ]);
  return Number(output);
}

async function clickButton(page, name) {
  const button = page.getByRole("button", { name }).first();
  if (await button.count().catch(() => 0)) {
    await button.click({ timeout: 2500 }).catch(() => {});
  }
}

async function fillFirstTextarea(page, value) {
  const text = typeof value === "string" ? value : JSON.stringify(value, null, 2);
  const textarea = page.locator("textarea").first();
  if (await textarea.count().catch(() => 0)) {
    await textarea.click({ timeout: 2500 }).catch(() => {});
    await page.keyboard.press("Control+A").catch(() => {});
    await page.keyboard.type(text, { delay: 1 });
  }
}

async function addStyles(page) {
  await page.addStyleTag({
    content: `
      @keyframes sjSlide { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      .sj-demo-card {
        position: fixed; left: 34px; top: 28px; z-index: 2147483646; max-width: 600px;
        padding: 18px 20px; border-radius: 12px; background: rgba(3, 7, 18, .90);
        border: 1px solid rgba(148, 163, 184, .30); color: white;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        box-shadow: 0 22px 60px rgba(0,0,0,.42); animation: sjSlide .32s ease-out;
      }
      .sj-demo-kicker { color: #34d399; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: .08em; margin-bottom: 8px; }
      .sj-demo-title { font-size: 26px; font-weight: 850; line-height: 1.05; letter-spacing: 0; }
      .sj-demo-body { margin-top: 10px; color: #d4d4d8; font-size: 15px; line-height: 1.42; }
      .sj-subtitle {
        position: fixed; left: 50%; bottom: 34px; transform: translateX(-50%); z-index: 2147483647;
        max-width: 1280px; padding: 14px 22px; border-radius: 12px; background: rgba(2, 6, 23, .88);
        border: 1px solid rgba(255,255,255,.16); color: white; text-align: center;
        font: 700 28px/1.25 Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        text-shadow: 0 2px 10px rgba(0,0,0,.55); box-shadow: 0 18px 48px rgba(0,0,0,.35);
      }
      .sj-network-panel {
        position: fixed; right: 34px; top: 96px; width: 430px; z-index: 2147483646; padding: 16px;
        border-radius: 12px; background: rgba(2, 6, 23, .94); border: 1px solid rgba(148, 163, 184, .32);
        color: white; font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
        box-shadow: 0 22px 60px rgba(0,0,0,.42);
      }
      .sj-network-panel h3 { margin: 0 0 12px; font-family: Inter, ui-sans-serif, system-ui, sans-serif; color: #93c5fd; font-size: 15px; }
      .sj-network-row { display: flex; justify-content: space-between; border-top: 1px solid rgba(148,163,184,.2); padding: 10px 0; font-size: 13px; }
      .sj-network-row strong { color: #86efac; font-size: 18px; }
    `,
  });
}

async function showOverlays(page, scene) {
  const overlay = {
    kicker: scene.kicker,
    title: scene.title,
    body: scene.body,
    subtitle: scene.subtitle,
  };
  await page.evaluate(({ kicker, title, body, subtitle }) => {
    document.querySelectorAll(".sj-demo-card,.sj-subtitle").forEach((el) => el.remove());

    const card = document.createElement("div");
    card.className = "sj-demo-card";
    const cardKicker = document.createElement("div");
    cardKicker.className = "sj-demo-kicker";
    cardKicker.textContent = kicker;
    const cardTitle = document.createElement("div");
    cardTitle.className = "sj-demo-title";
    cardTitle.textContent = title;
    const cardBody = document.createElement("div");
    cardBody.className = "sj-demo-body";
    cardBody.textContent = body;
    card.append(cardKicker, cardTitle, cardBody);

    const sub = document.createElement("div");
    sub.className = "sj-subtitle";
    sub.textContent = subtitle;

    document.body.append(card, sub);
  }, overlay);
}

async function addNetworkPanel(page) {
  await page.evaluate(() => {
    document.querySelectorAll(".sj-network-panel").forEach((el) => el.remove());
    const panel = document.createElement("div");
    panel.className = "sj-network-panel";
    panel.innerHTML = `
      <h3>Network check after paste</h3>
      <div class="sj-network-row"><span>Requests containing pasted JSON</span><strong>0</strong></div>
      <div class="sj-network-row"><span>Pasted-content uploads</span><strong>0</strong></div>
      <div class="sj-network-row"><span>Result</span><strong>Verified</strong></div>
    `;
    document.body.appendChild(panel);
  });
}

async function makeSceneAudio(scene, index) {
  const textFile = path.join(tempDir, `${String(index).padStart(2, "0")}-${scene.id}.txt`);
  const audioFile = path.join(tempDir, `${String(index).padStart(2, "0")}-${scene.id}.mp3`);
  await fs.writeFile(textFile, scene.voice, "utf8");
  await run("python", [
    "-m",
    "edge_tts",
    "--voice",
    "en-US-AvaNeural",
    "--rate",
    "+2%",
    "--pitch",
    "-1Hz",
    "--file",
    textFile,
    "--write-media",
    audioFile,
  ]);
  return { audioFile, duration: await durationSeconds(audioFile) };
}

async function captureScene(page, scene, index) {
  await page.goto(scene.url, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1000);
  await addStyles(page);
  await scene.action?.(page);
  await page.waitForTimeout(900);
  await showOverlays(page, scene);
  await page.waitForTimeout(300);
  const screenshotFile = path.join(tempDir, `${String(index).padStart(2, "0")}-${scene.id}.png`);
  await page.screenshot({ path: screenshotFile, fullPage: false });
  return screenshotFile;
}

async function makeSegment(scene, index, screenshotFile, audioFile, audioDuration) {
  const segmentFile = path.join(tempDir, `${String(index).padStart(2, "0")}-${scene.id}.mp4`);
  const segmentDuration = Math.max(4.2, audioDuration + 0.25);
  await run(ffmpegPath, [
    "-y",
    "-loop",
    "1",
    "-t",
    segmentDuration.toFixed(2),
    "-i",
    screenshotFile,
    "-i",
    audioFile,
    "-filter_complex",
    "[0:v]scale=1920:1080,format=yuv420p[v];[1:a]apad=pad_dur=0.25[a]",
    "-map",
    "[v]",
    "-map",
    "[a]",
    "-t",
    segmentDuration.toFixed(2),
    "-r",
    "30",
    "-c:v",
    "libx264",
    "-preset",
    "veryfast",
    "-tune",
    "stillimage",
    "-c:a",
    "aac",
    "-b:a",
    "192k",
    segmentFile,
  ]);
  return { segmentFile, segmentDuration };
}

await fs.mkdir(tempDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
await context.addInitScript(() => {
  localStorage.setItem("safejson_dev", "1");
  localStorage.setItem("safejson_pro_unlocked", "1");
  localStorage.setItem("safejson_pro_license_key", "demo-license-key");
  localStorage.setItem("safejson_pro_instance_id", "demo-instance");
  localStorage.setItem("safejson_pro_instance_name", "SafeJSON Demo Browser");
  localStorage.setItem("safejson_pro_license_status", "active");
  localStorage.setItem("safejson_pro_last_validated", String(Date.now()));
});
const page = await context.newPage();

const segments = [];
for (let index = 0; index < scenes.length; index += 1) {
  const scene = scenes[index];
  const { audioFile, duration } = await makeSceneAudio(scene, index + 1);
  const screenshotFile = await captureScene(page, scene, index + 1);
  segments.push(await makeSegment(scene, index + 1, screenshotFile, audioFile, duration));
}

await browser.close();

const concatFile = path.join(tempDir, "concat.txt");
await fs.writeFile(
  concatFile,
  segments.map(({ segmentFile }) => `file '${segmentFile.replaceAll("\\", "/")}'`).join("\n"),
  "utf8"
);

await run(ffmpegPath, [
  "-y",
  "-f",
  "concat",
  "-safe",
  "0",
  "-i",
  concatFile,
  "-c",
  "copy",
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
      durationSeconds: segments.reduce((sum, segment) => sum + segment.segmentDuration, 0),
      scenes: scenes.map((scene) => scene.id),
    },
    null,
    2
  )
);
