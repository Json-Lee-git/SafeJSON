(function () {
  "use strict";

  // Skip iframes and already-formatted pages
  if (window.top !== window.self) return;
  if (document.getElementById("safejson-root")) return;

  // Respond to popup status ping
  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message.action === "getStatus") {
      sendResponse({ formatted: !!document.getElementById("safejson-root") });
    }
  });

  // Detect JSON content
  let rawText = null;

  // Case 1: Chrome's built-in JSON viewer wraps JSON in <pre>
  const pre = document.querySelector("body > pre");
  if (pre && document.body.children.length === 1) {
    rawText = pre.textContent;
  }

  // Case 2: Plain text JSON (body only has text nodes)
  if (!rawText && document.body.children.length === 0) {
    rawText = document.body.textContent;
  }

  // Case 3: Application/json served raw
  if (!rawText && document.contentType === "application/json") {
    rawText = document.body.textContent;
  }

  if (!rawText || rawText.trim().length === 0) return;

  // Try to parse as JSON
  let data;
  try {
    data = JSON.parse(rawText.trim());
  } catch {
    return; // Not valid JSON, don't touch the page
  }

  // Format the JSON
  const formatted = JSON.stringify(data, null, 2);
  const jsonUrl = `https://www.safejson.dev`;

  // Marker to prevent double-formatting and for popup detection
  const marker = document.createElement("div");
  marker.id = "safejson-root";
  marker.hidden = true;
  document.body.appendChild(marker);

  // Build the formatted page
  document.head.innerHTML = "";
  document.body.innerHTML = "";

  // Inject styles
  const style = document.createElement("style");
  style.textContent = `
    :root {
      --bg: #09090b;
      --surface: #18181b;
      --border: #27272a;
      --text: #d4d4d8;
      --text-dim: #71717a;
      --accent: #34d399;
      --string: #6ee7b7;
      --number: #fbbf24;
      --boolean: #22d3ee;
      --null: #9ca3af;
      --key: #c4b5fd;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: var(--bg);
      color: var(--text);
      font-family: 'Geist Mono', 'SF Mono', 'Cascadia Code', 'Fira Code', monospace;
      font-size: 14px;
      line-height: 1.6;
      padding: 16px;
      min-height: 100vh;
    }
    #safejson-toolbar {
      position: sticky;
      top: 0;
      z-index: 100;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 16px;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      margin-bottom: 16px;
      flex-wrap: wrap;
    }
    #safejson-toolbar .brand {
      font-weight: 700;
      font-size: 14px;
      letter-spacing: -0.01em;
    }
    #safejson-toolbar .brand span { color: var(--accent); }
    #safejson-toolbar button {
      background: transparent;
      border: 1px solid var(--border);
      color: var(--text-dim);
      padding: 6px 14px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 12px;
      font-family: inherit;
      transition: all 0.15s;
    }
    #safejson-toolbar button:hover {
      background: var(--border);
      color: var(--text);
    }
    #safejson-toolbar button.primary {
      background: var(--accent);
      border-color: var(--accent);
      color: #09090b;
      font-weight: 600;
    }
    #safejson-toolbar button.primary:hover {
      opacity: 0.9;
    }
    #safejson-toolbar .spacer { flex: 1; }
    #safejson-toolbar .badge {
      font-size: 11px;
      color: var(--accent);
      padding: 4px 10px;
      border: 1px solid rgba(52, 211, 153, 0.2);
      border-radius: 20px;
      background: rgba(52, 211, 153, 0.08);
    }

    #safejson-content {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 20px;
      overflow-x: auto;
      white-space: pre-wrap;
      word-break: break-word;
    }

    /* Syntax highlighting */
    .sj-key    { color: var(--key); }
    .sj-string { color: var(--string); }
    .sj-number { color: var(--number); }
    .sj-bool   { color: var(--boolean); }
    .sj-null   { color: var(--null); font-style: italic; }
    .sj-punct  { color: var(--text-dim); }

    #safejson-content.collapsed .sj-collapsible-body { display: none; }
    #safejson-content.collapsed .sj-expand-hint { display: inline; }

    .sj-line {
      padding-left: 4px;
      border-radius: 2px;
    }
    .sj-line:hover {
      background: rgba(255,255,255,0.03);
    }

    #safejson-footer {
      margin-top: 16px;
      text-align: center;
      font-size: 11px;
      color: var(--text-dim);
    }
    #safejson-footer a {
      color: var(--accent);
      text-decoration: none;
    }
  `;
  document.head.appendChild(style);

  // Build toolbar
  const toolbar = document.createElement("div");
  toolbar.id = "safejson-toolbar";
  toolbar.innerHTML = `
    <span class="brand"><span>{</span>SafeJSON<span>}</span></span>
    <span id="sj-status" class="badge">Detected JSON formatted locally</span>
    <span class="spacer"></span>
    <button id="sj-toggle" title="Toggle formatted/raw">Raw</button>
    <button id="sj-copy" title="Copy formatted JSON">Copy</button>
    <button id="sj-open" class="primary" title="Copy JSON locally and open SafeJSON">Copy JSON and open SafeJSON</button>
  `;
  document.body.appendChild(toolbar);

  // Build content area with syntax highlighting
  const content = document.createElement("div");
  content.id = "safejson-content";
  const highlighted = highlightJSON(formatted);
  content.innerHTML = highlighted;
  document.body.appendChild(content);

  // Footer
  const footer = document.createElement("div");
  footer.id = "safejson-footer";
  footer.innerHTML =
    '<p>Formatted by <a href="' +
    jsonUrl +
    '" target="_blank">SafeJSON</a>. No pasted-content upload.</p>';
  document.body.appendChild(footer);

  // State
  let isFormatted = true;
  const rawHighlighted = highlightJSON(rawText.trim());
  const status = document.getElementById("sj-status");

  function setStatus(message, isError) {
    status.textContent = message;
    status.style.color = isError ? "#fbbf24" : "var(--accent)";
    status.style.borderColor = isError
      ? "rgba(251, 191, 36, 0.25)"
      : "rgba(52, 211, 153, 0.2)";
    status.style.background = isError
      ? "rgba(251, 191, 36, 0.08)"
      : "rgba(52, 211, 153, 0.08)";
  }

  // Toggle button
  document.getElementById("sj-toggle").addEventListener("click", function () {
    if (isFormatted) {
      content.innerHTML = rawHighlighted;
      this.textContent = "Format";
    } else {
      content.innerHTML = highlighted;
      this.textContent = "Raw";
    }
    isFormatted = !isFormatted;
  });

  // Copy button
  document.getElementById("sj-copy").addEventListener("click", async function () {
    const text = isFormatted ? formatted : rawText.trim();
    await navigator.clipboard.writeText(text);
    const original = this.textContent;
    this.textContent = "Copied!";
    setTimeout(() => (this.textContent = original), 1500);
  });

  // Open in SafeJSON button. Do not transfer page JSON through the URL.
  document.getElementById("sj-open").addEventListener("click", async function () {
    try {
      await navigator.clipboard.writeText(rawText.trim());
      setStatus("Copied locally. Paste into SafeJSON to format.", false);
    } catch {
      setStatus("Clipboard blocked. Copy manually, then paste into SafeJSON.", true);
    }
    window.open(jsonUrl, "_blank", "noopener");
  });

  // Syntax highlighting function
  function highlightJSON(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .split("\n")
      .map((line) => {
        let html = line;
        // Keys (quoted strings followed by colon)
        html = html.replace(
          /^( *)("(?:[^"\\]|\\.)*")(\s*:)/gm,
          '$1<span class="sj-key">$2</span>$3'
        );
        // String values
        html = html.replace(
          /(:\s*)("(?:[^"\\]|\\.)*")/g,
          '$1<span class="sj-string">$2</span>'
        );
        // Numbers
        html = html.replace(
          /(:\s*)(-?\d+\.?\d*(?:[eE][+-]?\d+)?)(\s*[,}\]]?)$/gm,
          '$1<span class="sj-number">$2</span>$3'
        );
        // Booleans
        html = html.replace(
          /(:\s*)(true|false)/g,
          '$1<span class="sj-bool">$2</span>'
        );
        // Null
        html = html.replace(
          /(:\s*)(null)/g,
          '$1<span class="sj-null">$2</span>'
        );
        // Bare values (no colon, for arrays)
        html = html.replace(
          /^(\s*)(true|false)(\s*,?)$/gm,
          '$1<span class="sj-bool">$2</span>$3'
        );
        html = html.replace(
          /^(\s*)(null)(\s*,?)$/gm,
          '$1<span class="sj-null">$2</span>$3'
        );
        html = html.replace(
          /^(\s*)(-?\d+\.?\d*(?:[eE][+-]?\d+)?)(\s*,?)$/gm,
          '$1<span class="sj-number">$2</span>$3'
        );
        html = html.replace(
          /^(\s*)("(?:[^"\\]|\\.)*")/gm,
          '$1<span class="sj-string">$2</span>'
        );

        return '<div class="sj-line">' + html + "</div>";
      })
      .join("\n");
  }
})();
