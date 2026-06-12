# Why I Built a Privacy-First JSON Formatter After the jsonformatter.org Data Leak

In November 2025, security researchers dropped a bombshell: jsonformatter.org and codebeautify.org had been silently leaking user data for years. Over 80,000 code snippets — including AWS keys, GitHub tokens, database passwords, and banking details — were publicly accessible through an unprotected "Recent Links" feature. Attackers were actively scraping the data within 48 hours of the researchers planting canary tokens.

I was one of the developers who had used these tools. And I had no idea my data was at risk.

## The Problem With Every Online JSON Tool

Here is the uncomfortable truth: almost every online JSON formatter, validator, and beautifier processes your data on a server. When you paste JSON into one of these tools, your data makes a round trip through someone else's infrastructure before the formatted result appears on your screen.

For most developers, this is invisible. You copy an API response, paste it into a formatter, get pretty JSON back, and move on. But that JSON might contain:

- API keys and tokens
- Customer PII from your database
- JWT tokens with session data
- Internal configuration with server IPs and credentials
- Proprietary data structures that reveal your architecture

None of this data should leave your machine. But with server-side tools, it does.

## How SafeJSON Is Different

I built SafeJSON to solve this exact problem. The core principle is simple: **all processing happens in your browser. No pasted JSON is uploaded.**

Here is how you can verify this claim yourself:

1. Open [safejson.dev](https://www.safejson.dev)
2. Open DevTools → Network tab
3. Paste any JSON
4. Observe: **no request contains your pasted JSON**

Every line of formatting, validation, and tree view rendering runs in client-side JavaScript. Your data never leaves your device. There is no server to leak from because there is no server.

## What SafeJSON Does

SafeJSON is a full JSON toolkit, not just a formatter:

- **JSON Formatter & Validator** — Instant formatting with syntax highlighting, collapsible tree view, and error detection with line/column numbers. Free forever.
- **JSON Diff** — Compare two JSON objects side by side. Added, removed, and changed values are color-coded.
- **JWT Decoder** — Decode JWT header, payload, and signature. Your token never leaves your browser.
- **JSONPath Query** — Query JSON data with XPath-like expressions. Extract nested values and filter arrays.
- **Schema Validator** — Validate JSON against JSON Schema definitions.

There is also a browser extension that auto-formats JSON responses on any URL — again, 100% client-side.

## The Ecosystem Has a Trust Problem

The jsonformatter.org breach was not an isolated incident. Around the same time, the most popular JSON Formatter Chrome extension — with over 2 million users — was sold to a new owner. They closed the source, injected adware, and started harvesting user data.

These are not hypothetical risks. Real developers had their credentials exposed. Real extensions turned into spyware. The convenience of free online tools comes with a hidden cost that most developers do not think about until it is too late.

## Open Source and Verifiable

SafeJSON is open source (MIT license). Every line of code is on [GitHub](https://github.com/s01071233604-tech/safejson). You do not need to trust my claims — you can audit the code yourself.

The entire application is a static Next.js site deployed on Vercel. There is no backend. No database. No API routes that process user data. The only network requests are for loading the page itself.

## Try It

The tool is live at [safejson.dev](https://www.safejson.dev). Core formatting is free forever. Pro features (Diff, JWT, JSONPath, Schema) are $5/month — and everything is still client-side.

If you have been using jsonformatter.org or similar tools out of habit, take 30 seconds to check: open DevTools → Network tab while using your current formatter. If you see requests going out, your data is on someone else's server.

---

*I built this as a solo developer. Feedback, bug reports, and contributions are welcome on [GitHub](https://github.com/s01071233604-tech/safejson).*
