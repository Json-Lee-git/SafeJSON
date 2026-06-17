# Phase 7C External Trust Updates

Date: 2026-06-16

Purpose: align public listings with SafeJSON's verifiable privacy positioning after the URL-payload hotfix.

## Remove Everywhere

Remove or replace these phrases in external listings, profiles, package registries, and screenshots:

- `safejson.vercel.app`
- `zero network requests`
- `never sees your data`
- `no data ever leaves your browser`
- `100% inside your browser`
- `100% client-side`
- `zero user data uploaded`
- `zero data upload`
- `privacy-first` as a standalone tagline
- unqualified `50MB+`
- any claim that JSON is automatically imported into SafeJSON from the extension or CLI

## Universal External Copy

Use this where a longer product description is allowed:

> SafeJSON is a browser-based JSON toolkit for formatting, validating, viewing, comparing, decoding JWTs, querying JSONPath, and validating schemas. Core JSON workflows are designed to run locally in the browser, and pasted JSON content is not intentionally uploaded for core tools. You can verify this in DevTools -> Network. Like most web products, SafeJSON may still use normal network requests for static assets, analytics, billing, and license checks.

Short version:

> Browser-based JSON toolkit with verifiable browser-local workflows. Format, validate, view, compare, decode JWTs, query JSONPath, and validate schemas. Verify no pasted-content upload for core tools in DevTools -> Network.

## GitHub Repo Description

Recommended description:

> Browser-based JSON toolkit with verifiable browser-local workflows for formatting, validation, viewing, diffing, JWT decoding, JSONPath querying, and schema validation. Verify no pasted-content upload for core tools in DevTools -> Network.

Recommended homepage:

> https://www.safejson.dev/

Recommended topics:

> json, json-formatter, json-validator, json-diff, jwt-decoder, jsonpath, json-schema, developer-tools, browser-local, verifiable-privacy, no-pasted-content-upload

## GitHub README Intro

Recommended intro:

> SafeJSON is a browser-based JSON toolkit with verifiable browser-local workflows for developers who inspect sensitive JSON, JWTs, schemas, logs, and API payloads. Core tools are designed so pasted content is not intentionally uploaded. You can verify the boundary yourself in DevTools -> Network.

Recommended boundary note:

> SafeJSON may still use normal network requests for static assets, aggregate analytics, billing, and license activation. The trust boundary is that pasted JSON, JWTs, schemas, and query expressions are not intentionally uploaded during core tool operations.

## npm Registry / Package

Recommended package description:

> Open SafeJSON, a browser-based JSON toolkit with verifiable browser-local workflows, from your terminal.

Recommended README snippet:

> The SafeJSON CLI opens https://www.safejson.dev. If stdin is provided, the CLI does not transfer the payload through the URL. Paste JSON manually into the browser to keep the workflow browser-local and verifiable in DevTools -> Network.

Required npm cleanup:

- Replace old homepage URLs with `https://www.safejson.dev`
- Remove `zero network requests`
- Remove `never sees your data`
- Remove `privacy-first` as standalone package positioning
- Remove any claim that piped JSON is automatically imported into the site

## Edge Add-ons Listing

Recommended title:

> SafeJSON - Local JSON Formatter

Recommended short description:

> Detect raw JSON responses, format them locally in the page, and open SafeJSON for browser-local JSON workflows.

Recommended detailed description:

> SafeJSON detects raw JSON responses and formats them for readability in the current browser tab. Use the toolbar to copy JSON locally and open SafeJSON for formatting, validation, viewing, diffing, JWT decoding, JSONPath querying, and schema validation. The extension does not send page JSON through URL parameters.

Permission explanation:

> The extension uses host access to detect raw JSON responses on pages you visit. It uses clipboard access only after a user action to copy formatted JSON locally. It does not add ads, affiliate code, or remote code.

## Chrome Web Store Listing Draft

Use the same copy as Edge Add-ons.

Required Chrome review note:

> Chrome Web Store review is pending. Do not claim Chrome is live until the listing is approved.

Avoid:

- Pro tool keyword stuffing in the extension listing
- `no tracking`
- `zero data collection`
- `100% private`
- `never leaves browser`
- `JSON Diff`, `JWT Decoder`, `JSONPath`, or `Schema Validator` as stacked extension keywords

## SourceForge Listing

Recommended long description:

> SafeJSON is a browser-based JSON toolkit for developers who inspect JSON, JWTs, schemas, API responses, webhook payloads, and config snapshots. Core JSON workflows are designed to run locally in the browser, and pasted JSON content is not intentionally uploaded for core tools. Users can verify this in DevTools -> Network. SafeJSON includes free formatter, validator, beautifier, viewer, parser, and CSV conversion tools. Pro adds JSON Diff, JWT Decoder, JSONPath Query, and JSON Schema Validator for $5/month or $39/year.

Required SourceForge cleanup:

- Remove `100% inside your browser`
- Remove `zero user data uploaded`
- Remove unqualified `50MB+`
- Remove any claim that every feature has zero network interaction

## DEV Profile / Snippet

Recommended profile summary:

> Building SafeJSON, a browser-based JSON toolkit with verifiable browser-local workflows. Core tools avoid pasted-content upload, and users can verify the boundary in DevTools -> Network.

Recommended website:

> https://www.safejson.dev

Required DEV cleanup:

- Remove `safejson.vercel.app`
- Remove `no data ever leaves your browser`
- Remove `100% client-side`

## Product Hunt

Recommended tagline:

> Verifiable browser-local JSON toolkit

Recommended short description:

> Format, validate, view, diff, decode JWTs, query JSONPath, and validate schemas. Core JSON workflows are browser-local and can be verified in DevTools -> Network.

Recommended first comment:

> SafeJSON is built around verifiable privacy rather than trust-only marketing. Open DevTools -> Network, use the formatter or Pro tools, and confirm no request contains pasted JSON, JWTs, schemas, or query expressions during core tool operations. Normal site delivery, aggregate analytics, billing, and license checks may still use network requests.

## SaaSHub

Recommended title:

> SafeJSON

Recommended description:

> Browser-based JSON toolkit with verifiable browser-local workflows. Format, validate, view, compare JSON, decode JWTs, query JSONPath, and validate schemas. Core tools are designed so pasted content is not intentionally uploaded, and users can verify this in DevTools -> Network.

Recommended categories:

> JSON Formatter, Developer Tools, JSON Validator, JWT Decoder, JSON Diff, JSON Schema

## Manual Verification Checklist

- [ ] GitHub repo description updated
- [ ] GitHub README intro updated after repo changes are pushed
- [ ] npm package metadata updated and republished if needed
- [ ] Edge Add-ons title/description updated
- [ ] Chrome Web Store draft updated before resubmission
- [ ] SourceForge listing updated
- [ ] DEV profile/snippet updated
- [ ] Product Hunt listing updated if editable
- [ ] SaaSHub listing updated if editable
- [ ] Any screenshots with old claims replaced
- [ ] Any links pointing to `safejson.vercel.app` replaced
