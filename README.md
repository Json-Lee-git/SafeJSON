# SafeJSON — Privacy-First JSON Toolkit for Developers

SafeJSON is a privacy-first JSON toolkit for developers who need to format,
diff, decode, query, and validate sensitive JSON without uploading pasted
content. Every tool runs in your browser. You can verify it yourself with
DevTools.

**Website:** [safejson.dev](https://www.safejson.dev)

---

## DevTools verification

You do not have to trust the claim. You can verify it:

1. Open [safejson.dev](https://www.safejson.dev)
2. Open DevTools (F12) → Network tab
3. Paste any JSON and run the formatter, diff, JWT decoder, JSONPath, or Schema
4. Confirm: **no request contains your pasted content**

---

## Feature matrix

| Feature | What it does | Client-side privacy | Free / Pro |
|---------|-------------|---------------------|------------|
| JSON Formatter | Instant syntax-highlighted formatting with collapsible tree view | All pasted JSON processed locally | Free |
| JSON Validator | Error detection with line and column numbers | Pasted JSON not uploaded | Free |
| JSON Beautifier | Configurable indentation (2, 3, or 4 spaces) | Pasted JSON not uploaded | Free |
| JSON Tree Viewer | Collapsible nodes for navigating large objects | Pasted JSON not uploaded | Free |
| JSON Parser | Inspect JSON structure, types, and nesting depth | Pasted JSON not uploaded | Free |
| CSV to JSON / JSON to CSV | Convert between JSON and CSV formats | Pasted data not uploaded | Free |
| JSON Diff | Compare two JSON objects with color-coded results (added/removed/changed) | Both JSON inputs compared locally | Pro |
| JWT Decoder | Decode JWT header, payload, and signature | No request contains the token while decoding | Pro |
| JSONPath Query | Evaluate JSONPath expressions against JSON data | All queries evaluated client-side | Pro |
| JSON Schema Validator | Validate JSON against draft-04 through 2020-12 schemas (powered by Ajv) | Schemas and JSON not uploaded | Pro |
| Browser Extension | Auto-detect and format raw JSON responses on any URL | All formatting local | Free |

---

## Why SafeJSON exists

Online JSON tools often process pasted data on a server. Developers paste
API responses, JWTs, credentials, config files, logs, and production payloads
into these tools every day — often without checking where that data goes.

In November 2025, popular JSON formatting sites were found to have leaked
over 80,000 credentials through server-side processing.

SafeJSON is designed so users can verify pasted-content privacy themselves.
Open DevTools → Network, paste JSON, and confirm that no request contains
your pasted content. That is the whole point.

---

## Pricing

**Core tools remain free forever.** Formatter, validator, beautifier, viewer,
parser, and CSV conversion.

**Pro is $5/month or $39/year.** Unlocks JSON Diff, JWT Decoder, JSONPath
Query, and JSON Schema Validator. One license activates up to 2 devices.

Payment and license delivery handled by Lemon Squeezy.

[View pricing →](https://www.safejson.dev/pricing)

---

## Browser extension

Auto-detects and formats raw JSON responses on any URL.

- **Extension permissions:** [How the extension works](https://www.safejson.dev/extension/permissions)
- **Edge Add-ons:** [Live on Microsoft Edge Add-ons](https://microsoftedge.microsoft.com/addons/detail/fjknnlcmogdhhnehcillihjhdgencgeh)
- **Chrome Web Store:** pending review

Manual install from source:

```bash
git clone https://github.com/Json-Lee-git/SafeJSON
# Open chrome://extensions or edge://extensions
# Enable Developer Mode → Load unpacked → select extension/ folder
```

---

## Large JSON support

SafeJSON Formatter and Beautifier are tested with 50MB JSON. Viewer and
Parser support large local workflows. Large JSON is parsed with a Web
Worker so the UI stays
responsive during processing, with no pasted-content upload.

---

## Tech stack

Next.js 16 · React 19 · Tailwind CSS · Phosphor Icons · Vercel (static prerendering) · Lemon Squeezy License API

---

## Links

- **Website:** [safejson.dev](https://www.safejson.dev)
- **Product Hunt:** [SafeJSON on Product Hunt](https://www.producthunt.com/products/safejson-privacy?launch=safejson-privacy)
- **SaaSHub:** [SafeJSON on SaaSHub](https://www.saashub.com/safejson-alternatives)
- **Indie Hackers:** [SafeJSON on Indie Hackers](https://www.indiehackers.com/product/safejson-2)
- **Edge Add-ons:** [SafeJSON on Edge Add-ons](https://microsoftedge.microsoft.com/addons/detail/fjknnlcmogdhhnehcillihjhdgencgeh)
- **YouTube:** [How to Verify Any JSON Formatter Is Safe](https://www.youtube.com/watch?v=Jlks9EU9I3Q)
- **GitHub Discussions:** [Join the discussion](https://github.com/Json-Lee-git/SafeJSON/discussions)

---

## Development

```bash
npm install
npm run dev
```

---

## License

MIT
