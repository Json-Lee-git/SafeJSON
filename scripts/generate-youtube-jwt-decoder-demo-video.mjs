import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";

const origin = process.env.SAFEJSON_BASE_URL || "https://www.safejson.dev";
const tempDir = path.join(process.cwd(), "growth", "assets", "synced-demo-temp");
const outputFile = path.join(tempDir, "safejson-youtube-03-jwt-decoder-demo-final.mp4");
const concatFile = path.join(tempDir, "concat-jwt.txt");
const ffmpegPath = process.env.FFMPEG_PATH || "ffmpeg";

const demoJwt = makeJwt(
  { alg: "RS256", typ: "JWT" },
  {
    iss: "https://auth.safejson.dev",
    sub: "user_1234567890",
    aud: "safejson-api",
    exp: 1796947200,
    iat: 1781178160,
    email: "alex@example.com",
    scope: "read:json write:json",
    role: "admin",
    plan: "pro",
  },
);

const scenes = [
  {
    id: "intro",
    duration: 5,
    type: "card",
    title: "Never Paste a Production JWT Into a Random Website",
    subtitle: "SafeJSON JWT Decoder - Client-Side Token Decoding",
    voice:
      "Never paste a production JWT into a random website. Use a decoder you can verify.",
  },
  {
    id: "problem",
    duration: 20,
    type: "card",
    title: "The JWT Privacy Problem",
    body:
      "Every time you paste a JWT into an online decoder, that service may receive sensitive claims: user ID, email, permissions, expiration, and session context.",
    voice:
      "Every time you paste a JWT into an online decoder, that service may receive sensitive claims: user ID, email, permissions, expiration, and session context. Most developers do not think about this until it is too late.",
  },
  {
    id: "jwtio",
    duration: 15,
    type: "card",
    title: "Popular Does Not Mean Private",
    body:
      "jwt.io, maintained by Auth0, is the familiar reference point for JWT debugging. For production tokens, the safer rule is simple: verify that no request contains the token.",
    voice:
      "jwt dot io, maintained by Auth0, is the familiar reference point for JWT debugging. For production tokens, the safer rule is simple: verify that no request contains the token.",
  },
  {
    id: "intro-decoder",
    duration: 10,
    type: "card",
    title: "SafeJSON JWT Decoder",
    body:
      "SafeJSON decodes tokens entirely in your browser. The token never leaves your machine. You can verify this.",
    voice:
      "SafeJSON JWT Decoder decodes tokens entirely in your browser. The token never leaves your machine. You can verify this.",
  },
  {
    id: "interface",
    duration: 25,
    type: "page",
    title: "Paste. Decode. Inspect.",
    body:
      "Paste any JWT token. Header, payload, and signature are decoded using base64url with no server round trip.",
    voice:
      "Paste any JWT token. The header, payload, and signature are decoded instantly using base sixty-four URL decoding, with no server round trip and no network request containing the token.",
    action: async (page) => {
      await fillJwt(page, demoJwt);
      await decodeJwt(page);
      await addJwtCallout(page, "Header + payload decoded locally", "left");
    },
  },
  {
    id: "demo-payload",
    duration: 20,
    type: "page",
    title: "Claims In A Tree View",
    body:
      "Standard and custom claims are visible: sub, iss, aud, exp, iat, email, role, scope, and plan.",
    voice:
      "All standard and custom claims are visible in a tree view. You can inspect subject, issuer, audience, expiration, issued at, email, role, scope, and plan.",
    action: async (page) => {
      await fillJwt(page, demoJwt);
      await decodeJwt(page);
      await addClaimChips(page);
    },
  },
  {
    id: "production-note",
    duration: 15,
    type: "card",
    title: "Production Tokens Need Local Tools",
    body:
      "For access tokens, refresh tokens, and session tokens, local decoding is the safest default. Your auth system should not leak token contents to a third party.",
    voice:
      "For production JWTs, access tokens, refresh tokens, and session tokens, a client-side decoder is the safest default. Your auth system should not leak token contents to a third party.",
  },
  {
    id: "verify",
    duration: 20,
    type: "page",
    title: "Verify With DevTools",
    body:
      "Open DevTools Network, paste a JWT, and decode. No request contains your token. It is all local.",
    voice:
      "Verify yourself: open DevTools Network tab, paste a JWT, and decode. No request ever contains your token. It is all local.",
    action: async (page) => {
      await fillJwt(page, demoJwt);
      await decodeJwt(page);
      await addDevtoolsOverlay(page);
    },
  },
  {
    id: "pricing",
    duration: 10,
    type: "card",
    title: "SafeJSON Pro",
    body:
      "JWT Decoder is a Pro tool. $5/month or $39/year. Free core tools forever.",
    voice:
      "JWT Decoder is a Pro tool. Five dollars a month, or thirty-nine dollars a year. Free core tools forever.",
  },
  {
    id: "cta",
    duration: 10,
    type: "card",
    title: "Try It",
    subtitle: "safejson.dev/jwt",
    voice: "Try it now at safejson dot dev slash JWT.",
  },
  {
    id: "outro",
    duration: 5,
    type: "card",
    title: "SafeJSON",
    subtitle: "github.com/Json-Lee-git/SafeJSON",
    body: "Open it. Verify it.",
    voice: "SafeJSON. Open it. Verify it.",
  },
];

function run(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: options.stdio || "ignore",
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

function scenePrefix(index, id) {
  return `${String(index).padStart(2, "0")}-jwt-${id}`;
}

function base64url(value) {
  return Buffer.from(JSON.stringify(value), "utf8")
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function makeJwt(header, payload) {
  return `${base64url(header)}.${base64url(payload)}.demo_signature_local_only`;
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
  await page.goto(`${origin}/jwt?dev`, { waitUntil: "domcontentloaded" });
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
  const fadeOutStart = Math.max(scene.duration - 0.45, 0);

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
    `[0:v]scale=1920:1080,fade=t=in:st=0:d=0.35,fade=t=out:st=${fadeOutStart}:d=0.45,format=yuv420p[v];` +
      `[1:a]volume=1.05,apad[a]`,
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
    "-crf",
    "20",
    "-c:a",
    "aac",
    "-b:a",
    "160k",
    mp4,
  ]);

  return mp4;
}

async function fillJwt(page, token) {
  const textarea = page.locator("textarea").first();
  await textarea.fill(token);
}

async function decodeJwt(page) {
  await page.getByRole("button", { name: "Decode" }).click();
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
      .sj-claim-chips {
        position: fixed; right: 30px; top: 86px; z-index: 2147483646; width: 520px;
        display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;
        padding: 18px; border-radius: 16px; background: rgba(9,9,11,.92);
        border: 1px solid rgba(52,211,153,.25); box-shadow: 0 24px 80px rgba(0,0,0,.48);
      }
      .sj-claim-chip { border: 1px solid rgba(63,63,70,.9); border-radius: 999px; padding: 10px 12px; color: #d4d4d8; font: 800 15px/1 Inter, ui-sans-serif, system-ui; text-align: center; background: rgba(24,24,27,.92); }
      .sj-claim-chip:nth-child(odd) { color: #34d399; }
      .sj-callout {
        position: fixed; left: 34px; top: 390px; z-index: 2147483646; max-width: 520px;
        padding: 20px 22px; border-radius: 16px; background: rgba(6, 78, 59, .92);
        border: 1px solid rgba(52,211,153,.55); color: #ecfdf5;
        box-shadow: 0 24px 80px rgba(0,0,0,.45); font: 800 24px/1.2 Inter, ui-sans-serif, system-ui;
      }
      .sj-devtools {
        position: fixed; right: 28px; top: 82px; width: 760px; height: 430px; z-index: 2147483646;
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

async function addClaimChips(page) {
  await page.evaluate(() => {
    document.querySelectorAll(".sj-claim-chips").forEach((el) => el.remove());
    const chips = document.createElement("div");
    chips.className = "sj-claim-chips";
    for (const claim of ["sub", "iss", "aud", "exp", "iat", "email", "role", "scope", "plan"]) {
      const chip = document.createElement("div");
      chip.className = "sj-claim-chip";
      chip.textContent = claim;
      chips.appendChild(chip);
    }
    document.body.appendChild(chips);
  });
}

async function addJwtCallout(page, text) {
  await page.evaluate((value) => {
    document.querySelectorAll(".sj-callout").forEach((el) => el.remove());
    const callout = document.createElement("div");
    callout.className = "sj-callout";
    callout.textContent = value;
    document.body.appendChild(callout);
  }, text);
}

async function addDevtoolsOverlay(page) {
  await page.evaluate(() => {
    document.querySelectorAll(".sj-devtools").forEach((el) => el.remove());
    const panel = document.createElement("div");
    panel.className = "sj-devtools";
    panel.innerHTML = `
      <div class="sj-devtools-head"><b>Network</b><span>Elements</span><span>Console</span><span>Sources</span></div>
      <div class="sj-devtools-filter">Filter: JWT token after Decode</div>
      <table class="sj-devtools-table">
        <thead><tr><th>Name</th><th>Status</th><th>Type</th><th>Contains JWT?</th></tr></thead>
        <tbody>
          <tr><td>collect?v=2</td><td>204</td><td>analytics</td><td class="sj-devtools-ok">No</td></tr>
          <tr><td>base64url decode</td><td>local</td><td>browser</td><td class="sj-devtools-ok">No upload</td></tr>
          <tr><td colspan="3">Requests containing the token</td><td class="sj-devtools-ok">0</td></tr>
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
            linear-gradient(rgba(52,211,153,.055) 1px, transparent 1px),
            linear-gradient(90deg, rgba(52,211,153,.045) 1px, transparent 1px),
            radial-gradient(circle at 18% 16%, rgba(52,211,153,.16), transparent 31%),
            radial-gradient(circle at 82% 74%, rgba(14,165,233,.10), transparent 30%),
            linear-gradient(135deg, #09090b 0%, #111827 100%);
          background-size: 48px 48px, 48px 48px, auto, auto, auto;
          color: #d4d4d8;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .wrap { height: 100%; display: flex; align-items: center; justify-content: center; padding: 110px; }
        .panel { width: 1420px; border: 1px solid rgba(63,63,70,.9); border-radius: 28px; padding: 78px 86px; background: rgba(9,9,11,.68); box-shadow: 0 32px 120px rgba(0,0,0,.45); }
        .brand { font-size: 34px; font-weight: 850; color: #34d399; margin-bottom: 34px; letter-spacing: 0; }
        h1 { margin: 0; max-width: 1240px; color: #f4f4f5; font-size: 74px; line-height: .99; letter-spacing: 0; }
        .subtitle { margin-top: 28px; color: #34d399; font-size: 36px; font-weight: 750; }
        .body { margin-top: 34px; max-width: 1220px; color: #d4d4d8; font-size: 40px; line-height: 1.24; font-weight: 620; }
        .token { margin-top: 44px; display: flex; gap: 10px; }
        .token span { height: 12px; border-radius: 999px; display: block; }
        .token span:nth-child(1) { width: 180px; background: #34d399; }
        .token span:nth-child(2) { width: 320px; background: #60a5fa; }
        .token span:nth-child(3) { width: 220px; background: #a78bfa; }
        .foot { margin-top: 50px; color: #71717a; font-size: 24px; }
      </style>
    </head>
    <body>
      <div class="wrap">
        <div class="panel">
          <div class="brand"><span>{</span> SafeJSON <span>}</span></div>
          <h1>${escapeHtml(scene.title)}</h1>
          ${subtitle ? `<div class="subtitle">${escapeHtml(subtitle)}</div>` : ""}
          ${body ? `<div class="body">${escapeHtml(body)}</div>` : ""}
          <div class="token"><span></span><span></span><span></span></div>
          <div class="foot">No token upload. Verify in DevTools.</div>
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

await fs.mkdir(tempDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1920, height: 1080 },
  deviceScaleFactor: 1,
});
await context.addInitScript(() => {
  localStorage.setItem("safejson_dev", "1");
  localStorage.setItem("safejson_pro_unlocked", "1");
  localStorage.setItem("safejson_pro_license_key", "demo-license-key");
  localStorage.setItem("safejson_pro_instance_id", "demo-instance");
  localStorage.setItem("safejson_pro_license_status", "active");
  localStorage.setItem("safejson_pro_last_validated", String(Date.now()));
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
  segments.push(await makeSegment(scene, sceneNumber, png, mp3));
}

await browser.close();

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
  "-c:v",
  "libx264",
  "-preset",
  "veryfast",
  "-crf",
  "20",
  "-c:a",
  "aac",
  "-b:a",
  "160k",
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
      scenes: scenes.map((scene, index) => scenePrefix(index + 1, scene.id)),
    },
    null,
    2,
  ),
);
