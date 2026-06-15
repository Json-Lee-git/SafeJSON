# Homepage Phase 2A Audit — Read-Only

**Date:** 2026-06-15
**Scope:** Homepage positioning, trust path, component inventory
**Action:** No code changes. Findings only.

---

## 1. Files Audited

| File | Role |
|------|------|
| `src/app/page.tsx` | Homepage route — hero, tools, features, Pro cards, footer |
| `src/app/layout.tsx` | Root layout — metadata, preconnect, GA |
| `src/app/components/Footer.tsx` | Shared footer — tool links, privacy, about, pricing |
| `src/app/components/StructuredData.tsx` | JSON-LD schemas |
| `src/app/privacy/verify-local-processing/page.tsx` | Privacy verification page |

---

## 2. Homepage Structure

| Element | Content | Status |
|---------|---------|:--:|
| Trust badge | "Your data never leaves your browser" | Present |
| H1 | "The JSON tool that never sees your data. Prove it yourself." | Present |
| Subtitle L1 | "Format, validate, and debug JSON. Entirely in your browser." | Present |
| Subtitle L2 | "Open DevTools -> Network. You won't see pasted content uploaded. That's the whole point." | Present |
| Size claim | "Handles 50MB+ JSON files that crash VS Code. All in your browser. No upload." | Present |
| Leak context | "In November 2025, popular online JSON tools were caught leaking over 80,000 credentials..." | Present |
| CTA | Link to /support: "How to verify this yourself →" | Present |
| Pro tools | 4 cards (Diff, JWT, JSONPath, Schema) with benefit bridges | Present |
| Features | 6 cards (Verify, don't trust; Instant Results; Built for Developers; Open Source; Free Forever; Browser Extension) | Present |
| Footer | Free Tools / Pro Tools / Compare / About/Help/Blog/Privacy/Pricing/Product Hunt | Present |

---

## 3. Forbidden Phrase Check

**Result: ZERO violations.** Pages audited: `page.tsx`, `layout.tsx`, `Footer.tsx`.

No instances of: zero network requests, no tracking, 100% secure, completely safe, guaranteed private, enterprise-grade security, military-grade encryption, no data ever leaves.

---

## 4. `/privacy/verify-local-processing` Visibility

| Surface | Linked? |
|---------|:--:|
| Homepage hero | No |
| Homepage "How to verify" link | No — links to `/support` |
| Footer | No — links to `/privacy` (generic) |
| Header/nav | No |
| Sitemap | Yes |

**Finding:** The page exists and is in the sitemap, but has zero inbound links from any user-facing surface. A user cannot navigate to it without knowing the URL.

---

## 5. Recommended Changes (do NOT apply)

### 5.1 — Add Verify link to Footer

**File:** `src/app/components/Footer.tsx`
**Current:** Links to `/privacy` only
**Suggested:** Add `/privacy/verify-local-processing` next to the Privacy link:

```
<Link href="/privacy/verify-local-processing" className={linkClass}>Verify Privacy</Link>
```

**Why:** The P0 privacy route hardening created this page as a trust signal. It needs at least one discovery path.

### 5.2 — Point "How to verify" CTA to verification page

**File:** `src/app/page.tsx`, line 300
**Current:** `<Link href="/support" ...>How to verify this yourself →</Link>`
**Suggested:** `<Link href="/privacy/verify-local-processing" ...>How to verify this yourself →</Link>`

**Why:** The `/privacy/verify-local-processing` page is the canonical verification page. The homepage CTA should point directly to it. `/support` can remain linked from the footer.

### 5.3 — Add verification page to Footer Compare section

**File:** `src/app/components/Footer.tsx`
**Current:** Compare section has vs jsonformatter.org, vs codebeautify, vs extension
**Suggested:** Add: `<Link href="/privacy/verify-local-processing" className={linkClass}>Verify no upload</Link>`

**Why:** Footer is scanned by AI crawlers on every page. Linking the verification page from the footer signals it as a site-wide trust page.

---

## 6. Summary

**Safe to apply?** Yes — all three changes are additive links in existing components. They change zero privacy wording, zero UI layout, and zero styling. They only create discovery paths for a page that already exists and passes all production checks.

**Forbidden phrases:** Zero found across all audited files.

**Risk:** None. The verification page already returns 200, already passes privacy sentinel, already in sitemap. These changes would only make it reachable.
