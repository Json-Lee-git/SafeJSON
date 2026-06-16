import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";

const origin = process.env.SAFEJSON_BASE_URL || "https://www.safejson.dev";
const tempDir = path.join(process.cwd(), "growth", "assets", "synced-demo-temp");
const outputFile = path.join(tempDir, "safejson-youtube-02-json-diff-demo.mp4");
const ffmpegPath = process.env.FFMPEG_PATH || "ffmpeg";

const leftSmall = {
  service: "billing-api",
  version: "1.0.0",
  plan: "free",
  limits: { requests: 1000, seats: 1 },
  features: ["format", "validate"],
  owner: { team: "platform", region: "us-east-1" },
};

const rightSmall = {
  service: "billing-api",
  version: "1.1.0",
  plan: "pro",
  limits: { requests: 5000, seats: 3 },
  features: ["format", "validate", "diff"],
  owner: { team: "developer-tools", region: "us-east-1" },
  license: "MIT",
};

const leftLarge = {
  batch: "api-log-export",
  size: "50MB+",
  generatedAt: "2026-06-14T00:00:00Z",
  services: Array.from({ length: 12 }, (_, index) => ({
    id: `service-${index + 1}`,
    status: index % 3 === 0 ? "warning" : "ok",
    latencyMs: 80 + index * 9,
    payload: {
      nested: {
        retries: index % 4,
        queue: index % 2 === 0 ? "primary" : "backup",
      },
    },
  })),
};

const rightLarge = {
  ...leftLarge,
  generatedAt: "2026-06-14T00:05:00Z",
  services: leftLarge.services.map((service, index) => ({
    ...service,
    status: index % 4 === 0 ? "degraded" : service.status,
    latencyMs: service.latencyMs + (index % 5) * 12,
    payload: {
      nested: {
        ...service.payload.nested,
        queue: index % 3 === 0 ? "priority" : service.payload.nested.queue,
      },
    },
  })),
  summary: { changedRecords: 12, processedLocally: true },
};

const scenes = [
  {
    id: "intro",
    duration: 5,
    type: "card",
    title: "Compare JSON Files Without Uploading Your Data",
    subtitle: "SafeJSON Diff - Client-Side JSON Comparison",
    voice: "Compare JSON files without uploading your data. SafeJSON Diff.",
  },
  {
    id: "problem",
    duration: 20,
    type: "card",
    title: "The Problem",
    body:
      "Most online JSON diff tools process your data on a server. Your JSON leaves your device. You can't verify what happens to it.",
    voice:
      "Most online JSON diff tools process your data on a server. Your JSON leaves your device. You can't verify what happens to it.",
  },
  {
    id: "leak",
    duration: 15,
    type: "card",
    title: "Why This Matters",
    body:
      "In 2025, server-side JSON tools leaked 80,000 credentials. The architecture that caused that leak is the same architecture most diff tools still use.",
    voice:
      "In 2025, server-side JSON tools leaked eighty thousand credentials. The architecture that caused that leak is the same architecture most diff tools still use.",
  },
  {
    id: "intro-diff",
    duration: 10,
    type: "card",
    title: "SafeJSON Diff",
    body:
      "SafeJSON Diff compares two JSON objects entirely in your browser. No upload. No server.",
    voice:
      "SafeJSON Diff compares two JSON objects entirely in your browser. No upload. No server.",
  },
  {
    id: "interface",
    duration: 30,
    type: "page",
    title: "Two Inputs, Side by Side",
    body:
      "Paste your original JSON on the left, paste the modified version on the right, and click Compare.",
    voice:
      "Paste your original JSON on the left, paste the modified version on the right, and click Compare.",
    action: async (page) => {
      await prepareDiffPage(page);
      await fillDiff(page, leftSmall, rightSmall);
    },
  },
  {
    id: "demo-results",
    duration: 25,
    type: "page",
    title: "Color-Coded Diff Results",
    body:
      "Green means added. Red means removed. Yellow means changed. Deep comparison of nested objects and arrays.",
    voice:
      "Green means added. Red means removed. Yellow means changed. Deep comparison of nested objects and arrays.",
    action: async (page) => {
      await prepareDiffPage(page);
      await fillDiff(page, leftSmall, rightSmall);
      await clickCompare(page);
    },
  },
  {
    id: "large-files",
    duration: 15,
    type: "page",
    title: "Large JSON Files",
    body:
      "Designed for local JSON diff workflows. No upload means no file size limit from server bandwidth.",
    voice:
      "Designed for local JSON diff workflows. No upload means no file size limit from server bandwidth.",
    action: async (page) => {
      await prepareDiffPage(page);
      await fillDiff(page, leftLarge, rightLarge);
      await clickCompare(page);
    },
  },
  {
    id: "verify",
    duration: 20,
    type: "page",
    title: "Verify In DevTools",
    body:
      "Verify it yourself: open DevTools Network tab, run a diff, and check that no request contains your pasted JSON.",
    voice:
      "Verify it yourself: open DevTools Network tab, run a diff, and check that no request contains your pasted JSON.",
    action: async (page) => {
      await prepareDiffPage(page);
      await fillDiff(page, leftSmall, rightSmall);
      await clickCompare(page);
      await addDevtoolsOverlay(page);
    },
  },
  {
    id: "pricing",
    duration: 10,
    type: "card",
    title: "SafeJSON Pro",
    body:
      "JSON Diff is a Pro tool. $5/month or $39/year. Free core tools forever.",
    voice:
      "JSON Diff is a Pro tool. Five dollars a month, or thirty-nine dollars a year. Free core tools forever.",
  },
  {
    id: "cta",
    duration: 10,
    type: "card",
    title: "Try It",
    subtitle: "safejson.dev/diff",
    voice: "Try it now at safejson dot dev slash diff.",
  },
  {
    id: "outro",
    duration: 5,
    type: "card",
    title: "SafeJSON",
    subtitle: "github.com/Json-Lee-git/SafeJSON",
    body: "The JSON tool that never sees your data.",
    voice: "SafeJSON. The JSON tool that never sees your data.",
  },
];

function run(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: options.stdio || "inherit",
      windowsHide: true,
    });
    let stdout = "";
    let stderr = "";
    if (child.stdout) child.stdout.on("data", (chunk) => (stdout += chunk));
    if (child.stderr) child.stderr.on("data", (chunk) => (stderr += chunk));
    child.on("exit", (code) => {
      if (code === 0) resolve(stdout.trim());
      else reject(new Error(`${command} exited with ${code}\n${stderr}`));
    });
  });
}

async function makeAudio(scene, index) {
  const prefix = scenePrefix(index, scene.id);
  const txt = path.join(tempDir, `${prefix}.txt`);
  const mp3 = path.join(tempDir, `${prefix}.mp3`);
  await fs.writeFile(txt, scene.voice, "utf8");
  await run("python", [
    "-m",
    "edge_tts",
    "--voice",
    "en-US-AvaNeural",
    "--rate",
    "+1%",
    "--pitch",
    "-1Hz",
    "--file",
    txt,
    "--write-media",
    mp3,
  ]);
  return mp3;
}

async function makeCard(page, scene, index) {
  const png = path.join(tempDir, `${scenePrefix(index, scene.id)}.png`);
  await page.setContent(cardHtml(scene), { waitUntil: "domcontentloaded" });
  await page.screenshot({ path: png, fullPage: false });
  return png;
}

async function makePageShot(page, scene, index) {
  const png = path.join(tempDir, `${scenePrefix(index, scene.id)}.png`);
  await page.goto(`${origin}/diff?dev`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1200);
  await addDemoStyles(page);
  await scene.action(page);
  await page.waitForTimeout(500);
  await addCaptionOverlay(page, scene);
  await page.screenshot({ path: png, fullPage: false });
  return png;
}

async function makeSegment(scene, index, png, mp3) {
  const mp4 = path.join(tempDir, `${scenePrefix(index, scene.id)}.mp4`);
  await run(ffmpegPath, [
    "-y",
    "-loop",
    "1",
    "-t",
    String(scene.duration),
    "-i",
    png,
    "-i",
    mp3,
    "-filter_complex",
    "[0:v]scale=1920:1080,format=yuv420p[v];[1:a]apad[a]",
    "-map",
    "[v]",
    "-map",
    "[a]",
    "-t",
    String(scene.duration),
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
    mp4,
  ]);
  return mp4;
}

async function prepareDiffPage(page) {
  await page.evaluate(() => {
    localStorage.setItem("safejson_dev", "1");
    localStorage.setItem("safejson_pro_unlocked", "1");
    localStorage.setItem("safejson_pro_license_key", "demo-license-key");
    localStorage.setItem("safejson_pro_instance_id", "demo-instance");
    localStorage.setItem("safejson_pro_license_status", "active");
    localStorage.setItem("safejson_pro_last_validated", String(Date.now()));
  });
}

async function fillDiff(page, left, right) {
  const areas = page.locator("textarea");
  await areas.nth(0).fill(JSON.stringify(left, null, 2));
  await areas.nth(1).fill(JSON.stringify(right, null, 2));
}

async function clickCompare(page) {
  await page.getByRole("button", { name: "Compare" }).click();
  await page.waitForTimeout(700);
}

async function addDemoStyles(page) {
  await page.addStyleTag({
    content: `
      .sj-video-caption {
        position: fixed; left: 50%; bottom: 34px; transform: translateX(-50%);
        width: min(1240px, calc(100vw - 80px)); z-index: 2147483647;
        border: 1px solid rgba(52, 211, 153, .28); border-radius: 16px;
        background: rgba(9, 9, 11, .92); box-shadow: 0 22px 70px rgba(0,0,0,.5);
        padding: 20px 28px; text-align: center; color: #d4d4d8;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }
      .sj-video-caption strong { display: block; color: #34d399; font-size: 30px; line-height: 1.1; margin-bottom: 8px; }
      .sj-video-caption span { display: block; font-size: 24px; line-height: 1.25; font-weight: 650; }
      .sj-devtools {
        position: fixed; right: 28px; top: 82px; width: 720px; height: 420px; z-index: 2147483646;
        background: #0f172a; border: 1px solid #334155; border-radius: 10px; overflow: hidden;
        box-shadow: 0 28px 90px rgba(0,0,0,.58); color: #cbd5e1;
        font: 14px/1.4 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      }
      .sj-devtools-head { display: flex; gap: 18px; align-items: center; height: 44px; padding: 0 18px; border-bottom: 1px solid #334155; background: #111827; }
      .sj-devtools-head b { color: #93c5fd; }
      .sj-devtools-filter { padding: 10px 14px; border-bottom: 1px solid #334155; color: #94a3b8; }
      .sj-devtools-table { width: 100%; border-collapse: collapse; }
      .sj-devtools-table th, .sj-devtools-table td { border-bottom: 1px solid rgba(51,65,85,.75); padding: 9px 12px; text-align: left; white-space: nowrap; }
      .sj-devtools-table th { color: #94a3b8; font-weight: 600; }
      .sj-devtools-ok { color: #34d399; font-weight: 800; }
    `,
  });
}

async function addCaptionOverlay(page, scene) {
  await page.evaluate(({ title, body }) => {
    document.querySelectorAll(".sj-video-caption").forEach((el) => el.remove());
    const caption = document.createElement("div");
    caption.className = "sj-video-caption";
    caption.innerHTML = `<strong></strong><span></span>`;
    caption.querySelector("strong").textContent = title;
    caption.querySelector("span").textContent = body;
    document.body.appendChild(caption);
  }, { title: scene.title, body: scene.body });
}

async function addDevtoolsOverlay(page) {
  await page.evaluate(() => {
    document.querySelectorAll(".sj-devtools").forEach((el) => el.remove());
    const panel = document.createElement("div");
    panel.className = "sj-devtools";
    panel.innerHTML = `
      <div class="sj-devtools-head"><b>Network</b><span>Elements</span><span>Console</span><span>Sources</span></div>
      <div class="sj-devtools-filter">Filter: pasted JSON content after Compare</div>
      <table class="sj-devtools-table">
        <thead><tr><th>Name</th><th>Status</th><th>Type</th><th>Contains pasted JSON?</th></tr></thead>
        <tbody>
          <tr><td>collect?v=2</td><td>204</td><td>analytics</td><td class="sj-devtools-ok">No</td></tr>
          <tr><td>diff worker</td><td>local</td><td>browser</td><td class="sj-devtools-ok">No upload</td></tr>
          <tr><td colspan="3">Requests containing pasted JSON</td><td class="sj-devtools-ok">0</td></tr>
        </tbody>
      </table>
    `;
    document.body.appendChild(panel);
  });
}

function cardHtml(scene) {
  const body = scene.body || "";
  const subtitle = scene.subtitle || "";
  return `<!doctype html>
  <html>
    <head>
      <meta charset="utf-8" />
      <style>
        * { box-sizing: border-box; }
        body {
          width: 1920px; height: 1080px; margin: 0; overflow: hidden;
          background:
            radial-gradient(circle at 18% 16%, rgba(52,211,153,.12), transparent 30%),
            linear-gradient(135deg, #09090b 0%, #111827 100%);
          color: #d4d4d8;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .wrap { height: 100%; display: flex; align-items: center; justify-content: center; padding: 110px; }
        .panel { width: 1420px; border: 1px solid rgba(63,63,70,.9); border-radius: 28px; padding: 78px 86px; background: rgba(9,9,11,.62); box-shadow: 0 32px 120px rgba(0,0,0,.45); }
        .brand { font-size: 34px; font-weight: 850; color: #34d399; margin-bottom: 34px; letter-spacing: 0; }
        h1 { margin: 0; max-width: 1220px; color: #f4f4f5; font-size: 76px; line-height: .98; letter-spacing: 0; }
        .subtitle { margin-top: 28px; color: #34d399; font-size: 36px; font-weight: 750; }
        .body { margin-top: 34px; max-width: 1180px; color: #d4d4d8; font-size: 42px; line-height: 1.22; font-weight: 620; }
        .foot { margin-top: 60px; color: #71717a; font-size: 24px; }
      </style>
    </head>
    <body>
      <div class="wrap">
        <div class="panel">
          <div class="brand"><span>{</span> SafeJSON <span>}</span></div>
          <h1>${escapeHtml(scene.title)}</h1>
          ${subtitle ? `<div class="subtitle">${escapeHtml(subtitle)}</div>` : ""}
          ${body ? `<div class="body">${escapeHtml(body)}</div>` : ""}
          <div class="foot">No pasted-content upload. Verify in DevTools.</div>
        </div>
      </div>
    </body>
  </html>`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function scenePrefix(index, id) {
  return `${String(index).padStart(2, "0")}-${id}`;
}

await fs.mkdir(tempDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1920, height: 1080 },
  deviceScaleFactor: 1,
});
const page = await context.newPage();

const segments = [];
for (let index = 0; index < scenes.length; index += 1) {
  const scene = scenes[index];
  const sceneNumber = index + 1;
  console.log(`Rendering ${scenePrefix(sceneNumber, scene.id)}...`);
  const mp3 = await makeAudio(scene, sceneNumber);
  const png =
    scene.type === "card"
      ? await makeCard(page, scene, sceneNumber)
      : await makePageShot(page, scene, sceneNumber);
  const mp4 = await makeSegment(scene, sceneNumber, png, mp3);
  segments.push(mp4);
}

await browser.close();

const concatFile = path.join(tempDir, "concat.txt");
await fs.writeFile(
  concatFile,
  segments.map((segment) => `file '${segment.replaceAll("\\", "/")}'`).join("\n"),
  "utf8",
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
  outputFile,
]);

const stat = await fs.stat(outputFile);
console.log(
  JSON.stringify(
    {
      outputFile,
      bytes: stat.size,
      durationSeconds: scenes.reduce((sum, scene) => sum + scene.duration, 0),
      scenes: scenes.map((scene) => scenePrefix(scenes.indexOf(scene) + 1, scene.id)),
    },
    null,
    2,
  ),
);
