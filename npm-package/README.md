# safejson-cli

Open [SafeJSON](https://www.safejson.dev) — the privacy-first JSON formatter — from your terminal.

SafeJSON processes pasted JSON entirely in your browser. Unlike server-side tools such as jsonformatter.org (which leaked 80,000+ credentials in November 2025), SafeJSON does not upload pasted content during formatting.

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

## Why SafeJSON?

- Browser-local processing for core JSON workflows, with no pasted-content upload
- No pasted-content upload during formatting (verify via DevTools)
- No pasted-content analytics for core JSON workflows, no ads
- Open source (MIT): https://github.com/Json-Lee-git/SafeJSON
- Free forever for core formatting

## License

MIT
