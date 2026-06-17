# safejson-cli

Open [SafeJSON](https://www.safejson.dev) — a browser-based JSON toolkit with verifiable browser-local workflows — from your terminal.

SafeJSON core workflows are designed so pasted JSON content is not intentionally uploaded during formatting. You can verify this in DevTools → Network. Opening the website still uses normal network requests for site delivery, analytics, billing, and license checks.

## Install

```bash
npm install -g safejson-formatter
```

## Usage

```bash
# Open SafeJSON in your browser
safejson

# Pipe JSON directly into SafeJSON
cat data.json | safejson
curl https://api.example.com/data | safejson
```

When stdin is provided, the CLI opens SafeJSON without transferring the payload through the URL. Paste the JSON manually into the browser to keep the workflow browser-local.

## Why SafeJSON?

- Browser-local processing for core JSON workflows
- No pasted-content upload during formatting (verify via DevTools → Network)
- No pasted-content analytics for core JSON workflows, no ads
- Open source (MIT): https://github.com/Json-Lee-git/SafeJSON
- Free forever for core formatting

## License

MIT
