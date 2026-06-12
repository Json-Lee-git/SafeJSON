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

- 100% client-side processing — your data never leaves your browser
- No pasted-content upload during formatting (verify via DevTools)
- No data collection of pasted JSON, no ads
- Open source (MIT): https://github.com/s01071233604-tech/safejson
- Free forever for core formatting

## License

MIT
