# SafeJSON — The JSON tool that never sees your data

A privacy-first JSON formatter. Format, validate, and debug JSON entirely in your browser. No server. No ads. No tracking.

## Why SafeJSON?

In November 2025, popular online JSON tools were caught leaking over 80,000 credentials — AWS keys, GitHub tokens, and banking details. Around the same time, the most popular JSON Formatter browser extension (2M+ users) was sold, closed-sourced, and injected with adware.

SafeJSON is different: **all processing happens in your browser. Zero network requests.**

## Features

### Web Tool ([safejson.dev](https://www.safejson.dev))
- Instant JSON formatting with syntax highlighting
- Collapsible tree view for exploring nested structures
- Error detection with line and column numbers
- Copy / Download formatted JSON
- Dark theme by default
- Cmd+Enter to format

### Browser Extension
- Auto-detects JSON responses on any URL
- Syntax highlighting: strings (green), numbers (gold), booleans (cyan), null (gray)
- One-click Copy / Raw toggle
- "Open in SafeJSON" button for full tree view inspection
- Available on Edge Add-ons

## How to verify the privacy claim

1. Open [safejson.dev](https://www.safejson.dev)
2. Open DevTools → Network tab
3. Paste any JSON
4. Observe: **zero network requests**

All formatting runs client-side. Your data never leaves your browser.

## Install the extension

### From Edge Add-ons Store
Search "SafeJSON" in the Edge Add-ons store.

### Manual install (Chrome / Edge / Brave)
1. Download or clone this repository
2. Open `chrome://extensions` (or `edge://extensions`)
3. Enable "Developer mode"
4. Click "Load unpacked"
5. Select the `extension/` folder

## Tech stack

- [Next.js 16](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Phosphor Icons](https://phosphoricons.com)
- Deployed on [Vercel](https://vercel.com)

## How SafeJSON compares to other JSON tools

| Feature | SafeJSON | jsonformatter.org | codebeautify.org |
|---------|----------|-------------------|------------------|
| Client-side processing | Yes | No — server-side | No — server-side |
| Data leaves your device | Never | Yes | Yes |
| Open source | Yes (MIT) | No | No |
| Ads | None | Yes | Yes |
| Data breach history | None | 80K+ credentials leaked (Nov 2025) | Same breach |
| JSON Diff | Yes (Pro) | No | No |
| JWT Decoder | Yes (Pro) | No | No |
| JSONPath | Yes (Pro) | No | No |
| Schema Validator | Yes (Pro) | No | No |
| Price | Free (core), $5/mo (Pro) | Free (ad-supported) | Free (ad-supported) |

## Competitive context

jsonformatter.org and codebeautify.org were found by security researchers at watchTowr (November 2025) to have leaked over 80,000 user credentials — including AWS keys, GitHub tokens, and banking details — through an unprotected "Recent Links" feature. The data was accessible without authentication, and attackers were confirmed to be actively scraping the data within 48 hours.

SafeJSON was built in response: if all processing happens in the browser, there is nothing to leak.

## License

MIT
