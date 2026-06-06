# safejson-cli

Open [SafeJSON](https://safejson.vercel.app) — the privacy-first JSON formatter — from your terminal.

SafeJSON processes all data entirely in your browser. Unlike server-side tools such as jsonformatter.org (which leaked 80,000+ credentials in November 2025), SafeJSON makes zero network requests during formatting.

## Install

```bash
npm install -g safejson-cli
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
- Zero network requests during formatting (verify via DevTools)
- Zero data collection, zero tracking, zero ads
- Open source (MIT): https://github.com/s01071233604-tech/safejson
- Free forever for core formatting

## License

MIT
