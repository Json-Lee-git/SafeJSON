# Proof Assets Plan

**Date:** 2026-06-14

---

## 1. DevTools Network verification

| Field | Value |
|-------|-------|
| Message | Open DevTools → Network, paste JSON, format once. No request contains your pasted content. |
| Format | GIF (screen recording of DevTools Network tab + formatter) |
| Where to use | README top section, homepage, /client-side-json-formatter, /support, /vs/jsoncrack |
| Verification required | None — asset captures observable browser behavior |
| Owner | User (screen recording) |

## 2. Large file local processing

| Field | Value |
|-------|-------|
| Message | SafeJSON handles 50MB+ JSON files locally. No upload, no server timeout, UI stays responsive. |
| Format | GIF or screenshot (formatter + Web Worker indicator) |
| Where to use | README, /client-side-json-formatter, /vs/jsoncrack |
| Risk | 50MB+ must be tested with real large JSON before publishing the claim as a proof asset. If not yet stress-tested, use "Designed for large local JSON workflows" instead of "Handles 50MB+". |
| Verification required | Test with a real 50MB JSON file; confirm no browser crash and no request contains pasted content. |
| Owner | User (test + screen recording) |

## 3. JWT decoder no-upload proof

| Field | Value |
|-------|-------|
| Message | Paste a JWT token into SafeJSON. The header, payload, and signature are decoded instantly in your browser. No request contains your token. |
| Format | GIF (JWT decoder interface + DevTools Network tab in split view) |
| Where to use | README, /jwt page, YouTube video #3, /vs/jwt-io |
| Risk | Do not use a real production token. Generate a test token or use an expired example JWT. |
| Owner | User (screen recording) |

## 4. JSON Diff no-upload proof

| Field | Value |
|-------|-------|
| Message | Compare two JSON objects side by side. All comparison runs locally — no pasted-content upload. |
| Format | GIF (diff interface with color-coded results + DevTools Network tab) |
| Where to use | README, /diff page, YouTube video #2, /vs/jsoncrack |
| Owner | User (screen recording) |
