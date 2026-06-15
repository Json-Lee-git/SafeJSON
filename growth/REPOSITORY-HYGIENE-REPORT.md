# Repository Hygiene Report

**Date:** 2026-06-15
**Scope:** All uncommitted and untracked files
**Action:** Report only — no deletions, no commits

---

## 1. Classification Summary

| Category | Count | Disposition |
|----------|:----:|-------------|
| Video 1 intermediate artifacts | 16 | Archive or delete |
| Video 2 intermediate artifacts | 16 | Archive or delete |
| Video 3 intermediate artifacts | 16 | Archive or delete |
| Final rendered videos | 3 | Archive externally |
| Contact sheets | 2 | Archive or delete |
| Render logs | 3 | Delete |
| Proof assets | 6 | Commit |
| Voice samples | 4 | Commit (small, already tracked) |
| Video generation scripts | 4 | Commit (reusable) |
| Growth doc | 1 | Commit (P0 acceptance report) |

---

## 2. Video Intermediate Artifacts

**Path:** `growth/assets/synced-demo-temp/`

These are per-segment `.mp3` / `.mp4` / `.png` / `.txt` files generated
as intermediate steps by the video generation pipeline. Each segment
renders a title card, voiceover, and short video clip that gets
concatenated into the final video.

### Video 1 — "How to Verify Any JSON Formatter Is Safe" (16 files)

Segments 01 through 11 (intro, problem, leak, intro-diff, interface,
demo-results, large-files, verify, pricing, cta, outro). Plus `concat.txt`
and `contact-sheet.log`.

### Video 2 — "JSON Diff Demo" (16 files)

Segments named with pattern `NN-description.mp*`. Plus
`safejson-youtube-02-contact-sheet.jpg` and intermediate renders.

### Video 3 — "JWT Decoder Demo" (16 files)

Segments named with pattern `NN-jwt-description.mp*`. Plus
`safejson-youtube-03-contact-sheet.jpg`, `concat-jwt.txt`, and
intermediate renders.

**Recommendation:** Archive externally (Google Drive, cloud storage)
or delete. Do NOT commit to Git. These are large binary artifacts
(~200–600KB per PNG, ~40–75KB per MP3, ~150–290KB per MP4). Total
directory size exceeds 25MB. They are reproducible from the scripts.

---

## 3. Final Rendered Videos

| File | Size | Status |
|------|------|--------|
| `safejson-youtube-02-json-diff-demo-final.mp4` | Unknown | Final render |
| `safejson-youtube-03-jwt-decoder-demo-final.mp4` | Unknown | Final render |
| `safejson-youtube-03-jwt-decoder-demo.mp4` | Unknown | Intermediate render |

**Recommendation:** Upload to YouTube, then archive externally.
Do NOT commit to Git. Binary video files in a code repository degrade
clone performance and inflate repository size.

---

## 4. Render Logs

| File | Recommendation |
|------|---------------|
| `render-final.log` | Delete |
| `contact-sheet.log` | Delete |
| `jwt-contact-sheet.log` | Delete |

These are build logs with no lasting value. They document transient
render runs and should be deleted.

---

## 5. Proof Assets

**Path:** `growth/assets/proof-assets/`

| File | Purpose | ContainsPastedContent |
|------|---------|:--:|
| `devtools-network-verification.png` | Homepage DevTools verification screenshot | false |
| `github-social-preview.png` | GitHub repo social preview (1280×640) | N/A |
| `json-diff-no-upload-proof.png` | JSON Diff — DevTools verification | false |
| `jwt-decoder-no-upload-proof.png` | JWT Decoder — DevTools verification | false |
| `large-file-local-processing-proof.png` | Large file local processing | false |
| `proof-assets-manifest.json` | Machine-readable metadata | N/A |

**Recommendation:** Commit. These are the deliverable proof assets
described in `growth/PROOF-ASSETS-PLAN.md`. All five screenshots
passed the no-upload verification (containsPastedContent: false).
The manifest provides structured metadata for automated tooling.

---

## 6. Voice Samples

**Path:** `growth/assets/voice-samples/`

| File | Size |
|------|------|
| `en-US-AndrewNeural.mp3` | 70KB |
| `en-US-AvaNeural.mp3` | 72KB |
| `en-US-BrianNeural.mp3` | 75KB |
| `en-US-EmmaNeural.mp3` | 71KB |

**Recommendation:** Commit. These are small (~70KB each), reusable
across video projects, and may serve as reference voice samples for
future video production. They were already committed in earlier
sessions and may appear in git history.

---

## 7. Video Generation Scripts

| File | Purpose | Reusable |
|------|---------|:--:|
| `scripts/generate-proof-assets.mjs` | Generates DevTools verification screenshots | Yes |
| `scripts/generate-youtube-json-diff-demo-video.mjs` | Generates Video 2 segments | Yes |
| `scripts/generate-youtube-jwt-decoder-demo-video.mjs` | Generates Video 3 segments | Yes |
| `scripts/generate-full-product-demo-video.mjs` | Generates Video 1 segments | Yes |

**Recommendation:** Commit. These are reusable scripts that programmatically
generate video segments and proof assets. They encode the production
pipeline and enable reproducible asset generation. Future video projects
can reuse or adapt them.

---

## 8. Recommended .gitignore Additions

```gitignore
# Video production intermediate artifacts
growth/assets/synced-demo-temp/*.mp3
growth/assets/synced-demo-temp/*.mp4
growth/assets/synced-demo-temp/*.png
growth/assets/synced-demo-temp/*.txt
growth/assets/synced-demo-temp/*.log
growth/assets/synced-demo-temp/*.jpg
growth/assets/synced-demo-temp/concat*.txt

# Final rendered videos
growth/assets/synced-demo-temp/*-final.mp4

# Render logs
growth/assets/synced-demo-temp/*.log
```

This preserves the directory structure while excluding the large binary
intermediates and renders. The generation scripts remain committed so
assets are reproducible.

---

## 9. Recommended Actions (do NOT execute — report only)

| Action | Files | Rationale |
|--------|-------|-----------|
| **Commit** | `growth/assets/proof-assets/` (6 files) | Final deliverable proof screenshots |
| **Commit** | `scripts/generate-*.mjs` (4 files) | Reusable generation scripts |
| **Commit** | `growth/P0-PRODUCTION-ACCEPTANCE.md` | Growth documentation |
| **Archive** | Video intermediates (~50 files in synced-demo-temp) | Reproducible, large binaries |
| **Archive** | Final `.mp4` renders (3 files) | Upload to YouTube first |
| **Delete** | Render logs (3 files) | No lasting value |
| **gitignore** | Add patterns from Section 8 | Prevent future accidental commits |

---

## 10. Current State Risk Assessment

**Risk: LOW.** No sensitive files (credentials, API keys, `.env`) are
uncommitted. No `src/` or config files are dirty. All uncommitted content
is in `growth/assets/` and `scripts/` — non-critical, non-blocking for
production.

The proof assets in `growth/assets/proof-assets/` are the most valuable
uncommitted content and should be committed in a future round.
