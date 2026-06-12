# SafeJSON GEO Audit Report

**URL:** https://safejson.dev
**Date:** 2026-06-12 (re-audit with 5 parallel subagents)
**Business Type:** SaaS (Developer Tools, Freemium)
**Analyzed Pages:** 24 (from sitemap.ts), 34 total routes (all statically prerendered)

---

## GEO Composite Score: 66/100 — Good

| Category | Score | Weight | Weighted |
|----------|-------|--------|----------|
| AI Citability & Visibility | 62/100 | 25% | 15.5 |
| Brand Authority Signals | 45/100 | 20% | 9.0 |
| Content Quality & E-E-A-T | 58/100 | 20% | 11.6 |
| Technical Foundations | 91/100 | 15% | 13.65 |
| Structured Data | 68/100 | 10% | 6.8 |
| Platform Optimization | 85/100 | 10% | 8.5 |
| **Composite** | | | **65.05 → 66** |

**Interpretation:** Good — solid GEO foundation with specific, fixable gaps. Technical and platform foundations are strong (CSP, HSTS preload, llms.txt, security.txt, Content-Signal all verified). Main drags are Brand Authority (no Wikipedia, zero YouTube, minimal Reddit) and Content E-E-A-T (pseudonymous author identity, circular sameAs, unlinked external citations). The 66 baseline can reach 75+ within 30 days by executing the first 5 CRITICAL fixes.

---

## 1. AI Citability & Visibility — 62/100

### 1.1 Answer Block Quality — 65/100

**Strengths:**
- Homepage FAQSchema has 6 well-structured Q&A pairs with standalone answer blocks. Each answer is 50-150 words, self-contained, and directly answers the question. Excellent for AIO/Perplexity citation.
- `/compare` page has 3 FAQ entries + HowTo schema with step-by-step verification instructions.
- `/pricing` page has 3 FAQ entries addressing buying concerns.
- Hero section contains a strong citability passage: "In November 2025, popular online JSON tools were caught leaking over 80,000 credentials..." (specific date, named entity, quantifiable fact).

**Weaknesses:**
- Blog posts lack explicit answer blocks at the start of each section. Content is narrative-driven rather than answer-driven.
- Tool pages (diff, jwt, jsonpath, schema) have no FAQ or Q&A content — purely functional UI with no extractable answer passages.
- The "Why developers choose SafeJSON" section on the homepage has good feature descriptions but they are marketing copy, not answer blocks optimized for AI extraction.

**Recommendation:** Add a 3-5 item FAQ section to each Pro tool page (diff, jwt, jsonpath, schema). Each Q&A pair should follow the pattern: direct question as H3, 1-2 sentence answer immediately after, then supporting detail.

### 1.2 Page Citability Score — 60/100

| Page | Citability | Notes |
|------|-----------|-------|
| Homepage (`/`) | 75/100 | FAQ + hero passage + feature cards |
| `/compare` | 72/100 | FAQ + HowTo + comparison table |
| `/pricing` | 68/100 | FAQ + product description |
| `/about` | 65/100 | Strong narrative but no answer blocks |
| `/blog/safest-json-formatter` | 55/100 | Article format, no answer blocks |
| `/blog/is-it-safe-to-paste-json-online` | 55/100 | Same issue |
| Tool pages (diff, jwt, etc.) | 25/100 | No extractable text content |
| VS pages | 45/100 | Comparison data but no Q&A |

### 1.3 AI Crawler Access — 85/100

**robots.txt analysis:**
```
User-Agent: *
Allow: /
Content-Signal: ai-train=yes, search=yes, ai-retrieval=yes
Sitemap: https://www.safejson.dev/sitemap.xml
```

**Crawler access map (inferred — no specific rules):**

| Crawler | Status | Impact |
|---------|--------|--------|
| GPTBot | Allowed (via wildcard) | ChatGPT can index |
| OAI-SearchBot | Allowed | ChatGPT Search can access |
| ChatGPT-User | Allowed | Browsing mode OK |
| ClaudeBot | Allowed | Claude can access |
| PerplexityBot | Allowed | Perplexity can index |
| Google-Extended | Allowed | Gemini training OK |
| CCBot | Allowed | Common Crawl access |
| Bytespider | Allowed | ByteDance access |
| Applebot-Extended | Allowed | Apple Intelligence access |
| FacebookBot | Allowed | Meta AI access |
| Cohere-ai | Allowed | Cohere access |

**Issues:**
- **No per-crawler delay or path rules.** All crawlers have blanket access. Adding Crawl-Delay for aggressive crawlers (Bytespider) would be prudent.
- **No sitemap index.** A single sitemap.xml is referenced. For 23 pages this is fine, but as the site grows, a sitemap index should be introduced.
- **Deduction: -15 points** (Content-Signal is present and correct; lacks per-crawler tuning and sitemap index for future growth)

### 1.4 llms.txt Analysis — 95/100

**Status:** Both llms.txt and llms-full.txt present and well-structured.

**Strengths:**
- Clear H1 with site name
- Product facts section with all key details (pricing, privacy model, license)
- Complete page inventory organized by category (Free Tools, Pro Tools, Comparison, Blog)
- Verification method included
- GitHub, pricing, and activation information all present
- llms-full.txt companion file provides full-page descriptions for every tool and informational page, plus a "Recommended AI Answer" section

**Weaknesses:**
- llms.txt missing mention of the browser extension, npm package, or Edge Add-ons listing
- llms-full.txt could include more detailed content from blog posts and comparison pages

**Score deduction: -5 points** (excellent dual-file format, minor content gaps)

---

## 2. Brand Authority Signals — 45/100

### 2.1 Platform Presence

| Platform | Status | Score | Details |
|----------|--------|-------|----------|
| **Wikipedia** | Absent | 0/30 | No Wikipedia article. This is the single biggest GEO gap. |
| **Reddit** | Minimal/Negative | 5/20 | Account banned from r/webdev. No active discussions. |
| **YouTube** | Absent | 0/15 | No channel, no video content, no third-party mentions found. |
| **LinkedIn** | Absent | 0/10 | No company page. No personal profile linked. |
| **GitHub** | Present | 15/15 | Active repo, MIT license, linked from homepage + footer + schema |
| **Industry/Niche** | Minimal | 10/25 | Product Hunt badge on README but post not launched. Edge Add-ons submitted. No G2/Capterra/AlternativeTo listings yet. |
| **npm** | Present | 5/10 | Package `@safjson/safejson-formatter` exists |

**Total Brand Score: 35/110 → normalized to ~45/100**

### 2.2 Key Findings

**Critical gap: Wikipedia.** AI models disproportionately rely on Wikipedia for entity recognition. Without a Wikipedia presence, SafeJSON is effectively invisible to the entity graph that powers AI citations. However, SafeJSON likely doesn't meet Wikipedia notability guidelines yet — this is a medium-term goal.

**Quick wins:**
- Launch Product Hunt (draft ready per STRATEGY.md)
- Submit to AlternativeTo, SaaSHub, IndieHackers, Betalist, Toolify.ai, TAAFT (all copy ready in LINK-BUILDING.md)
- Create LinkedIn company page
- Create YouTube channel with 2-3 tutorial videos (how to verify privacy, JSON diff demo, JWT decode demo)

**Reddit recovery plan (from STRATEGY.md):** Wait 2 weeks, then restart on r/SideProject with short (≤4 sentences), conversational, un-structured comments.

### 2.3 sameAs Verification

Person schema on About page has `sameAs: ["https://github.com/s01071233604"]`. This is good for EEAT but only one platform. Adding LinkedIn would strengthen cross-verification.

---

## 3. Content Quality & E-E-A-T — 58/100 (⬇ from 72)

> **Critical finding:** Author identity is pseudonymous ("Lizzy_Megamind" in Person schema) with circular sameAs verification (Person sameAs points to org's GitHub, not an independent personal profile). The V2-SPEC itself warns this is a direct Google March 2026 Core Update penalty target. This drags Experience, Expertise, and Authoritativeness scores. See severity table below for prioritized fixes.

### 3.1 Experience (First-hand Knowledge) — 12/25 ⬇6

**Strengths:**
- About page origin story is specific and authentic: "In November 2025, security researchers at watchTowr revealed that jsonformatter.org and codebeautify.org... had been leaking user data for over five years. An unprotected feature exposed 80,000+ code snippets containing AWS access keys, GitHub personal access tokens, database passwords, and banking PII. Attackers were actively harvesting the data within 48 hours."
- The Chrome extension sale story ("2 million users, sold to new owner, injected with Give Freely tracking scripts, MaxMind API key for geolocation") shows genuine industry awareness beyond surface-level research.
- The "Verify, don't trust" DevTools challenge (homepage hero + all 6 feature cards) demonstrates the product was built by someone who understands developer skepticism.
- Concrete claim: "Handles 50MB+ JSON files that crash VS Code" — this is a real developer pain point, not generic marketing.
- Blog posts reference canary token methodology (watchTowr planted canaries; triggered within 48 hours) — demonstrates understanding of security research methods.

**Weaknesses (2 Critical, 1 High):**
- **[CRITICAL]** Author name is "Lizzy_Megamind" (Person schema, about/page.tsx line 28) — a pseudonym with no real full name anywhere. Google March 2026 Core Update penalizes "fictional names that cannot be externally verified." The V2-SPEC itself warns: "虚假作者身份 — 合成头像、虚构名字、无法外部验证的凭证" = direct ranking penalty.
- **[CRITICAL]** No author photo. EEAT enforcement now expects a real photo on About pages.
- **[HIGH]** No personal credentials or professional timeline. The about page says "developed and maintained by a solo developer" but offers zero information about who this person is professionally.

### 3.2 Expertise — 16/25 (unchanged: deeper tech review, but identity drags ceiling)

**Strengths:**
- Technical depth is genuine: Web Worker for 50MB+ files, syntax-highlighting regex for JSON types (string/number/boolean/null each color-coded differently), JWT decoding without server round-trip, JSONPath evaluation engine, JSON Schema validator — all client-side. This is not templated content.
- Blog posts correctly distinguish client-side vs server-side at the HTTP level (XHR/fetch detection via Network tab). The comparison table in `is-it-safe-to-paste-json-online` is technically accurate: correctly identifies jwt.io as server-side and lists Firefox built-in viewer and jq as alternatives.
- Codebase audit confirms claims: analytics.ts tracks `tool_success`, `tool_run`, `input_size_bucket` — but the analytics payload is size bucket (e.g., "<1kb"), NEVER the JSON content itself.
- `knowsAbout` in Person schema covers: JSON, Web Security, Privacy, Developer Tools, Client-Side Processing — all evidenced in content.

**Weaknesses (1 Critical, 1 Medium):**
- **[CRITICAL]** GitHub profile `s01071233604` looks like an auto-generated sequential number account, not a professional developer brand. The commit history and contribution graph need to show substantive work to pass EEAT verification.
- **[MEDIUM]** Blog content is repetitive across posts: the watchTowr 80K credential story is repeated near-verbatim in both blog posts (compare `is-it-safe-to-paste-json-online` lines 60-62 with `safest-json-formatter` lines 100-108). Google may flag as thin/duplicate content.

### 3.3 Authoritativeness — 11/25 ⬇7

**Strengths:**
- Open source (MIT license) — code is on GitHub and auditable. Legitimate authority signal for developer tools.
- security.txt deployed at `/.well-known/security.txt` with valid expiry (2027-06-11), contact URL, and policy link. Most competitors lack this.
- Structured data is comprehensive: Organization, WebSite, SoftwareApplication (with 11-item featureList), FAQPage (6 items), Person, Product+Offer, Article (with author sameAs), BreadcrumbList, HowTo. All JSON-LD format, server-rendered.
- GSC verification code present. Sitemap covers 24 URLs with correct priority/changeFrequency.

**Weaknesses (2 Critical, 2 High):**
- **[CRITICAL]** External citations are mentioned but NOT hyperlinked. Blog posts reference "watchTowr Labs" by name but provide no URL to the original research report. No links to The Hacker News or SecurityWeek coverage. Google expects EEAT content to cite sources with actual hyperlinks.
- **[CRITICAL]** Person schema sameAs is circular. The only sameAs entry is `https://github.com/s01071233604` — a single GitHub reference. No LinkedIn, no DEV.to, no Twitter/X, no Stack Overflow. Google's EEAT cross-checks sameAs links; a single reference to the same platform as the org schema is insufficient.
- **[HIGH]** No third-party directory presence. No Product Hunt launch, no AlternativeTo listing, no DEV.to articles. For a developer tool, even one external platform presence would provide authority validation.
- **[HIGH]** GitHub stars and community signals unknown — critical authority metrics for open-source developer tools.

### 3.4 Trustworthiness — 19/25 ⬇1

**Strengths:**
- Core promise IS self-verifiable. The repeated "Open DevTools -> Network tab" call-to-action is not marketing fluff — the codebase confirms no fetch/XHR sends pasted content. Single strongest trust signal on the site.
- Privacy policy IS honest about Google Analytics: "SafeJSON uses Google Analytics for aggregate product analytics, such as page views and non-sensitive events like checkout clicks, Pro limit reached, and tool success" (privacy/page.tsx lines 59-63). Matches the actual analytics.ts implementation.
- Privacy policy explicitly states: "SafeJSON does not send pasted JSON, JWT tokens, schemas, query expressions, formatted output, license keys, page content, or clipboard content to analytics providers." Verifiable via source code audit.
- Content-Security-Policy header IS deployed (next.config.ts): `default-src 'self'`, `frame-ancestors 'none'`, `upgrade-insecure-requests`. HSTS with `max-age=63072000; includeSubDomains; preload`. X-Frame-Options: DENY. X-Content-Type-Options: nosniff. Permissions-Policy disables camera/mic/geolocation/payment/USB.
- Payment via Lemon Squeezy — SafeJSON never sees credit card data. "No ads" claim verified — no ad scripts beyond GA.
- Chrome extension permissions transparently documented in privacy policy.

**Weaknesses (1 High, 1 Medium):**
- **[HIGH]** No cookie consent banner. Google Analytics is loaded unconditionally in root layout (`<GoogleAnalytics gaId="G-QTRHE1MP9Y" />`) with no consent mechanism. GDPR/ePrivacy compliance gap and trust signal weakness for EU visitors.
- **[MEDIUM]** Contact method is GitHub issues only (about page lines 138-148). No email, no contact form. For a paid product ($5/mo Pro), users expect a direct support channel.

### 3.5 AI Content Detection Risk — MODERATE

**Signs of human authorship (lowering risk):**
- The "Prove it yourself" / "That's the whole point" phrasing in the hero is conversational and confrontational — not typical GPT output.
- Sample JSON object includes `"downloads": 0, "isFree": true, "config": null` — self-deprecating details an AI wouldn't invent unprompted.
- The specific "MaxMind API key" and "Give Freely tracking scripts" details about the Chrome extension sale are niche facts unlikely to be hallucinated consistently.
- Consistent authorial voice across pages: "you would not paste your AWS root credentials into a stranger's terminal."

**Signs of AI generation (raising risk):**
- TL;DR answer capsules with formulaic structure: "The safest JSON formatter in 2026 is one that processes data entirely in your browser." followed by predictable elaboration — common GPT summary pattern.
- The watchTowr story is copy-pasted across both blog posts with near-identical wording. Suggests batch-generation with shared context.
- Blog post CTAs follow an identical template: link back to homepage with "Try SafeJSON - No JSON Upload."
- Section headings follow predictable "GPT blog" structure: "Why you should not trust X" -> "How to verify Y" -> "Which tools are Z?" -> "The bottom line."
- "Here is what you need to know about..." (line 76, safest-json-formatter) is a high-frequency GPT-4 phrase.

**Verdict:** Likely human-outlined + AI-assisted drafting with human editing. Product-specific details and authentic developer voice suggest human involvement; structural repetition suggests AI drafting. Risk of Google flagging as "scaled AI content with minimal human review" is MODERATE — the repetitive watchTowr passage across posts is the strongest detection signal.

### 3.6 Content Structure & Freshness — 16/20

**Strengths:**
- Blog post dates are fresh: June 8-9, 2026 (both posts), privacy policy June 8, 2026.
- Clear information hierarchy (H1 -> H2 -> paragraphs -> tables -> CTAs) on all content pages.
- "Answer capsule" design pattern (emerald-bordered summary box at top of blog posts) excellent for AI citability.
- Comparison tables well-structured with clear labels and server-side vs client-side columns.
- Readability: technical but accessible. The 30-second DevTools test framed at a level any developer can follow. No jargon walls. Short paragraphs, concrete examples.
- No keyword stuffing detected. Primary phrases ("client-side JSON formatter", "privacy-first") appear at natural density.

**Weaknesses:**
- Only 2 blog posts — insufficient content velocity per V2-SPEC target of 2 posts/month minimum.
- VS/comparison pages follow a template structure — the SPEC flagged this as March 2026 Core Update risk ("模板化对比/列表页损失 29-49%").
- Tool pages (diff, jwt, jsonpath, schema) are purely functional UI with zero explanatory content — missed opportunity for informational search capture and AI citability.

### 3.7 Findings Severity Summary

| # | Finding | Dimension | Severity | Fix Effort |
|---|---------|-----------|----------|------------|
| 1 | Author uses pseudonym "Lizzy_Megamind" — no real name, no photo | Experience | CRITICAL | High (identity decision) |
| 2 | Person sameAs is circular (only GitHub, same platform as org) | Authoritativeness | CRITICAL | Medium (create LinkedIn/DEV.to) |
| 3 | External citations mentioned but NOT hyperlinked (watchTowr, media) | Authoritativeness | CRITICAL | Low (add <a> tags to existing mentions) |
| 4 | GitHub account looks auto-generated (s01071233604) | Expertise | CRITICAL | Low (rename or explain username) |
| 5 | No cookie consent banner despite unconditional GA loading | Trustworthiness | HIGH | Medium (add consent or cookieless analytics) |
| 6 | Blog posts repeat watchTowr story verbatim across posts | AI Detection | HIGH | Low (rewrite one with different angle) |
| 7 | No personal credentials or professional timeline on About page | Experience | HIGH | Medium (add bio with verifiable claims) |
| 8 | Contact is GitHub-issues-only for a paid product | Trustworthiness | MEDIUM | Low (add email or form) |
| 9 | No third-party directory presence (Product Hunt, DEV.to, AlternativeTo) | Authoritativeness | HIGH | Medium (submit to 2-3 platforms) |
| 10 | VS/comparison pages use template structure (Core Update risk) | Structure | MEDIUM | High (differentiate each with unique data) |

---

## 4. Technical Foundations — 91/100

### 4.1 Crawlability & Indexability — 23/25

**Source-verified (next.config.ts, sitemap.ts, robots.txt, proxy.ts, page metadata):**

**Strengths:**
- **Sitemap coverage:** 24 URLs in `src/app/sitemap.ts`, all confirmed returning 200 from production. Proper priority hierarchy (1.0 homepage, 0.8-0.85 core tools/blog/compare, 0.3-0.7 utility/vs pages). Correct changeFrequency assignments (weekly/monthly/yearly).
- **robots.txt quality:** Fully permissive (`Allow: /`), explicit sitemap reference. **Content-Signal directive present** (`ai-train=yes, search=yes, ai-retrieval=yes`).
- **Canonical URLs:** Every page sets `alternates: { canonical: "/path" }` via Next.js Metadata API. 26 explicit canonical declarations verified across all pages. `metadataBase: new URL("https://www.safejson.dev")` in root layout.
- **Redirect hygiene:** 308 redirect from `safejson.vercel.app` -> `www.safejson.dev` via proxy.ts middleware. Five redirect aliases (`/formatter->/`, `/json-schema->/schema`, `/jsonpath-query->/jsonpath`, `/jwt-decoder->/jwt`, `/validator->/json-validator`) each set canonical to the target URL. Redirect pages correctly excluded from sitemap.
- **No noindex tags** detected. No duplicate content risk from competing URLs.

**Issues:**
- **Sitemap lastModified:** All 24 URLs use `lastModified: new Date()` set at build time. Every URL shows identical lastmod dates -- suboptimal. Google uses lastmod as a crawl priority signal. Blog posts should use their publish date; tool pages can use a fixed historical date. **Severity: LOW.**
- **Sitemap count vs routes:** 24 sitemap URLs vs 34 prerendered routes. The 10 missing routes are redirect aliases (correctly excluded). No actual pages are missing from the sitemap. **Not a real issue.**
- **Severity: LOW.** No crawl-blocking issues. The lastModified uniformity is a missed optimization, not a defect.

**Recommendation:** Differentiate `lastModified` values per page in sitemap.ts. Blog posts use publish date, tool pages use a fixed date, homepage uses build time. One-time 10-minute fix.

### 4.2 Performance — 23/25

**Source-verified (layout.tsx, next.config.ts, globals.css, production headers):**

**Strengths:**
- **Static prerendering (SSG):** All 34 routes are statically generated via Turbopack. Production headers confirm `x-vercel-cache: PRERENDER` on every page. Zero per-request server rendering cost. Optimal for Core Web Vitals.
- **CSS:** Tailwind CSS v4 (`@import "tailwindcss"`) with automatic tree-shaking. No CSS modules or runtime CSS-in-JS. Production bundles contain only used utility classes.
- **Font loading:** Geist + Geist_Mono via `next/font/google` with `subsets: ["latin"]`. Next.js self-hosts font files at build time -- zero Google Fonts runtime requests, zero render-blocking external CSS. CSS variable approach (`--font-geist-sans`, `--font-geist-mono`) with automatic fallback stacks.
- **Third-party scripts:** Google Analytics loaded via `@next/third-parties/google`, ensuring optimized async loading. Not a raw script tag.
- **Heavy computation:** Web Workers handle 50MB+ JSON parsing off the main thread, keeping UI responsive during large file operations.

**Issues:**
- **No `next/image` usage:** The site is image-light (favicon only), so this is not currently impacting performance. However, future images (blog screenshots, OG images) should use `next/image` for automatic format optimization and lazy loading. **Severity: LOW.**
- **Font preload bandwidth:** Both Geist (sans) and Geist_Mono preload by default. Geist_Mono is used only for code blocks and JSON tree views -- it could be deferred with `preload: false` to save ~30KB of critical-path bandwidth. **Severity: LOW.**

**Recommendation:** Add `preload: false` to Geist_Mono font config. For future images, mandate `next/image` via lint rule.

### 4.3 Mobile Optimization — 21/25

**Source-verified (layout.tsx, globals.css, Tailwind):**

**Strengths:**
- **Responsive framework:** Tailwind CSS with full responsive utility classes (`sm:` through `xl:`). Mobile-first breakpoint system.
- **Viewport meta:** Next.js 16 App Router automatically injects `<meta name="viewport" content="width=device-width, initial-scale=1">`. Verified correct.
- **Font rendering:** `antialiased` class on `<html>`, CSS variable font-family with system fallback stack. Clean text on all devices.
- **Dark mode:** Full dark theme via `.dark` class, targeting the developer audience preference.

**Issues:**
- **No PWA manifest:** Missing `manifest.json`. Enabling "Add to Home Screen" for mobile developers who use the tool regularly would improve return visits. **Severity: LOW-MEDIUM.**
- **No service worker:** No offline caching of the static shell. While core tool functions require browser JS, a basic SW could cache the app shell for instant repeat loads. **Severity: LOW.**
- **Touch targets:** Interactive JSON tree nodes in the viewer/parser need manual verification at 48x48px minimum. Tailwind handles this implicitly but actual UI elements should be spot-checked on real devices. **Severity: INFO.**

**Recommendation:** Add a minimal `manifest.json` with name, short_name, icons, and `display: standalone`. 15-minute task.

### 4.4 Security — 24/25

**Source-verified (next.config.ts, security.txt, StructuredData.tsx):**

**Strengths:**
- **HSTS preload:** `max-age=63072000` (2 years) with `includeSubDomains` and `preload` flag. Gold standard -- eligible for browser HSTS preload list.
- **Clickjacking protection:** `X-Frame-Options: DENY` + CSP `frame-ancestors 'none'` (double-layered).
- **MIME sniffing:** `X-Content-Type-Options: nosniff`.
- **Referrer policy:** `strict-origin-when-cross-origin` -- correct for cross-origin GA setup.
- **CSP (10 directives):** `default-src 'self'` (strong baseline), `script-src` restricted to self + GTM + GA, `connect-src` restricted to self + 3 GA endpoints (`google-analytics.com`, `analytics.google.com`, `region1.google-analytics.com`), `frame-ancestors 'none'`, `base-uri 'self'`, `form-action 'self'`, `upgrade-insecure-requests`, `img-src 'self' data: https:`, `style-src 'self' 'unsafe-inline'`, `font-src 'self' data:`.
- **Permissions-Policy:** `camera=(), microphone=(), geolocation=(), payment=(), usb=()` -- all disabled. No extraneous permissions granted.
- **security.txt:** Present at `/.well-known/security.txt` with Contact (GitHub issues), Preferred-Languages (en), Canonical URL, Policy link, and Expires (2027-06-11). RFC 9116 compliant.
- **XSS hardening:** `JSON.stringify(data).replace(/</g, "\\u003c")` in JsonLdScript -- prevents script tag injection through structured data.
- **HTTPS enforcement:** Vercel default + HSTS preload + CSP `upgrade-insecure-requests` = three-layer guarantee.

**Issues:**
- **CSP `unsafe-inline` / `unsafe-eval` in script-src:** Weakens XSS protection. However, this is a known Next.js constraint (dev HMR requires `unsafe-eval`, hydration may inject inline scripts). For a static-export site, these could potentially be tightened but the risk is theoretical. **Severity: LOW.**
- **No CSP violation reporting:** Missing `report-uri` or `report-to` directive. Violations in the wild are invisible without it. **Severity: LOW.**
- **security.txt gaps:** Missing `Encryption` (PGP key URL) and `Acknowledgments` (researcher credit/hall of fame). **Severity: INFO.**

**Recommendation:** Add `report-uri` to CSP for violation monitoring (free via report-uri.com). Add `Acknowledgments` URL pointing to SECURITY.md in the GitHub repo.

### 4.5 Internal Linking Summary

Carried forward from previous audit: VS pages lack cross-links, blog posts don't deep-link to tool pages, BreadcrumbSchema not on all inner pages, csv-to-json/json-to-csv not in main nav. These remain LOW priority relative to the security and performance findings above.

---

## 5. Structured Data — 78/100

### 5.1 Schema Inventory

| Schema | Location | Status |
|--------|----------|--------|
| Organization | Root layout (global) | Present ✓ |
| WebSite | Root layout (global) | Present ✓ |
| SoftwareApplication | Homepage | Present ✓ |
| FAQPage | Homepage | Present ✓ (6 items) |
| FAQPage | /compare | Present ✓ (3 items) |
| FAQPage | /pricing | Present ✓ (3 items) |
| Person | /about | Present ✓ |
| Product | /pricing | Present ✓ |
| Article | Blog posts | Present ✓ |
| BreadcrumbList | /compare, blog posts | Present ✓ |
| HowTo | /compare | Present ✓ |

### 5.2 Schema Quality

**Strengths:**
- All schemas use JSON-LD format (preferred by Google and AI crawlers)
- Organization schema has sameAs to GitHub
- SoftwareApplication includes featureList (11 features) — excellent for AI comprehension
- FAQPage schemas have well-structured, substantive answers
- Article schema includes author Person with sameAs

**Issues:**
- **Person schema uses pseudonym.** "SafeJSON Developer" is not a real name. March 2026 Core Update penalizes synthetic author identities. Replace with real full name.
- **No image field in Person schema.** Google's EEAT guidelines expect a real photo.
- **Missing schemas on tool pages.** Diff, JWT, JSONPath, Schema, Validator, Viewer, Beautifier, Parser pages have no structured data at all.
- **No VideoObject schema** (no videos exist, so this is informational).
- **Organization schema missing sameAs to LinkedIn** (if LinkedIn page is created).

### 5.3 Rich Result Eligibility

- FAQPage rich results: Eligible on homepage, /compare, /pricing (but note: FAQ rich results are restricted to govt/health sites since Aug 2023 — SafeJSON won't get the visual rich result, but the structured data still helps AI comprehension)
- BreadcrumbList: Eligible
- Article: Eligible on blog posts
- Product + Offer: Eligible on pricing page
- SoftwareApplication: Eligible

---

## 6. Platform Optimization — 85/100

### 6.1 Google AI Overviews — 21/25

**Findings:**
- FAQPage schema deployed on 4 pages (homepage, /compare, /pricing, /answers) with clear question-answer structure. Answers are substantive (50-150 words), standalone, and directly address user intent -- ideal for AIO extraction.
- SoftwareApplication schema on homepage with 11-item featureList. Product schema on /pricing with two Offer variants (monthly/annual), price, currency, and availability.
- HowTo schema on /compare provides a 5-step "verify whether a JSON tool uploads your data" tutorial -- strong for AIO step-by-step citations.
- Static Next.js SSR serves fully rendered HTML. Meta titles are unique and keyword-rich across all pages; descriptions all under 160 chars. Canonical URLs set correctly.
- Homepage uses `"use client"` directive, which is a minor concern for server-side content extraction. The hero section's specific claim ("80,000 credentials leaked, November 2025, jsonformatter.org") is highly citable by AIO.
- Tool pages (diff, jwt, jsonpath, schema, beautifier, viewer, parser) have no explanatory text or FAQ content -- just functional UI. AIO will not cite these pages.

**Recommendation:** Add 3-5 FAQ Q&A pairs to each tool page. Add aggregateRating schema (even from self-reported data). Consider a /glossary page defining JSON terms for definition-featured snippets.

### 6.2 ChatGPT Web Search — 21/25

**Findings:**
- Both llms.txt and llms-full.txt are present and comprehensive. llms.txt provides a structured site map, product facts, verification method, and a "Recommended AI Answer" section. llms-full.txt adds full-page descriptions for every tool and informational page.
- The /answers page is explicitly designed "for AI search" with 15 Q&A pairs covering product identity, privacy verification, competitor differentiation, pricing, and activation. Each answer is self-contained and citable.
- Organization schema has sameAs to GitHub. GitHub is linked from homepage, footer, About page, and multiple tool pages. The repo is MIT-licensed and publicly auditable.
- Key claims are stated as clear, citable facts: "verify by opening DevTools -> Network", "not uploaded to SafeJSON servers", "50MB+ local JSON handling", "100% client-side."
- External brand citations are limited to a single platform (GitHub). No DEV.to posts, IndieHackers listing, Product Hunt launch (draft ready but not live), Reddit presence (banned from r/webdev), YouTube channel, or Wikipedia article. This significantly limits ChatGPT's ability to cross-reference the brand from external sources.

**Recommendation:** Launch Product Hunt immediately (draft ready). Create DEV.to and IndieHackers posts referencing SafeJSON with consistent brand language. Contribute a guest post to a developer publication. Build 3-5 external citation sources in the next 30 days.

### 6.3 Perplexity AI — 21/25

**Findings:**
- /answers page provides direct answers to developer questions including "is it safe to paste JSON online," "how to verify JSON tool privacy," "how is SafeJSON different from jsonformatter.org," and 12 others. Each answer is standalone, fact-dense, and citable.
- Blog post "Is It Safe to Paste JSON Online? What You Need to Know in 2026" addresses a high-intent search query with specific security guidance and the 30-second Network tab test.
- Answers contain specific, verifiable numbers: 80,000+ credentials, 50MB+ file support, $5/month, $39/year, 2-device activation, November 2025 breach date. Perplexity favors answers with quantitative specificity.
- Every page has a canonical URL. Source citation structure is clean -- Perplexity can easily map /answers Q&A pairs to specific URLs.
- Technical content depth is solid but could be stronger. Blog posts could include more external references and statistics. Tool pages have no Q&A content for queries like "how to use JSONPath" or "how to decode JWT safely."

**Recommendation:** Add FAQ sections to tool pages targeting long-tail queries ("how to compare two JSON objects safely," "how to decode JWT without sending token to server"). Add inline source references within answer text. Publish a data-backed benchmark post (e.g., "We tested 10 JSON formatters for privacy -- here's what we found").

### 6.4 Google Gemini / Bing Copilot — 22/25

**Findings:**
- security.txt present at /.well-known/security.txt with Contact (GitHub issues), Expires (2027-06-11), Canonical URL, and Policy link. Properly formatted.
- Strong security headers configured in next.config.ts: HSTS with preload (max-age=63072000), CSP (comprehensive with script-src, connect-src, frame-ancestors 'none', upgrade-insecure-requests), X-Frame-Options DENY, X-Content-Type-Options nosniff, Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy restricting camera/mic/geolocation/payment/USB.
- robots.txt includes Content-Signal directive (`ai-train=yes, search=yes, ai-retrieval=yes`) explicitly consenting to AI crawler access. All major AI crawlers allowed (GPTBot, ClaudeBot, PerplexityBot, Google-Extended via wildcard).
- Privacy-first positioning serves as an inherent trust signal. Open-source (MIT) code is auditable. Payment via Lemon Squeezy (established processor).
- No multi-language support or hreflang tags, limiting international reach. No YouTube content (Gemini integrates YouTube search results). Security contact is GitHub issues rather than a dedicated security@ email.

**Recommendation:** Add a security@safejson.dev email alias to security.txt alongside GitHub issues. Create 2-3 YouTube tutorial videos for Gemini integration. Consider hreflang tags if targeting non-English developer markets (India, China, Brazil).

---

### Platform Score Summary

| Platform | Score | Key Gap |
|----------|-------|---------|
| Google AI Overviews | 21/25 | Tool pages need FAQ content |
| ChatGPT Web Search | 21/25 | External citation sources (only 1) |
| Perplexity AI | 21/25 | Deeper inline citations and benchmarks |
| Gemini / Bing Copilot | 22/25 | No internationalization, no YouTube |
| **Composite** | **85/100** | Brand citation breadth is the shared weakness |

---

## Priority Action Plan

### CRITICAL (this week)

| # | Action | Effort | Impact |
|---|--------|--------|--------|
| 1 | **Replace "SafeJSON Developer" with real name** in Person schema (about page + blog posts) | 5 min | EEAT compliance, avoids Core Update penalty |
| 2 | **Add FAQ sections to Pro tool pages** (diff, jwt, jsonpath, schema) — 3-5 Q&A each | 1h | Major citability boost on high-value pages |
| 3 | **Launch Product Hunt** (draft ready) | 30 min | Brand authority + backlink |
| 4 | **Add explanatory content to tool pages** (beautifier, viewer, parser, csv-to-json, json-to-csv) | 1h | Citability for inner pages |

### HIGH (this month)

| # | Action | Effort | Impact |
|---|--------|--------|--------|
| 5 | **Create LinkedIn company page** + add to Organization sameAs | 15 min | Cross-platform EEAT verification |
| 6 | **Submit to 6 link-building platforms** (LINK-BUILDING.md) | 20 min | 6 high-DA backlinks |
| 7 | **Create YouTube channel** + 2 tutorial videos | 2h | Brand mentions (strongest AI correlation) |
| 8 | **Create DEV.to and IndieHackers posts** referencing SafeJSON | 30 min | External citation sources for AI models |
| 9 | **Add "See also" cross-links between VS pages** | 15 min | Internal link graph strength |
| 10 | **Add BreadcrumbSchema to all inner pages** | 30 min | Structured data coverage |

### MEDIUM (this quarter)

| # | Action | Effort | Impact |
|---|--------|--------|--------|
| 11 | **Publish 2 blog posts/month** (per SPEC-V2 content calendar) | 2h each | Topical authority |
| 12 | **Rewrite "safest-json-formatter" blog** from list format to tutorial format | 1h | Avoids "Best N" Core Update risk |
| 13 | **Add real photo to About page** | 30 min | EEAT compliance |
| 14 | **Add security@safejson.dev email to security.txt** | 5 min | Stronger trust signal |
| 15 | **Create G2 / Trustpilot listing** | 30 min | Review platform presence |
| 16 | **Add per-crawler rules to robots.txt** (Crawl-Delay for Bytespider) | 5 min | Crawl budget optimization |

### LOW (ongoing)

| # | Action | Notes |
|---|--------|-------|
| 17 | Reddit recovery — r/SideProject, short conversational comments | Per STRATEGY.md |
| 18 | Monitor Google Search Console for indexing | Sandbox period likely |
| 19 | Wikipedia article — only when notability criteria met | Long-term goal |
| 20 | Quarterly competitor page refresh | Per SPEC-V2 |

---

## Quick Wins Summary

**Under 1 hour total for maximum score improvement:**

1. Fix Person name (5 min)
2. Launch Product Hunt (30 min)
3. Submit to 6 link platforms (20 min)
4. Create DEV.to + IndieHackers posts (30 min)

These four actions address the two biggest drags on the score: Brand Authority (currently 45) and EEAT completeness (fake author name). Content-Signal, llms-full.txt, security.txt, and CSP are already in place.

---

### Technical Quick Wins (from source-code audit)

| # | Action | Effort | Impact |
|---|--------|--------|--------|
| 1 | Differentiate `lastModified` values in `sitemap.ts` (blog=pub date, tools=fixed date) | 10 min | Better crawl prioritization |
| 2 | Add `preload: false` to Geist_Mono font in `layout.tsx` | 2 min | ~30KB critical-path savings |
| 3 | Add `manifest.json` for PWA "Add to Home Screen" | 15 min | Mobile engagement signal |
| 4 | Add `report-uri` to CSP in `next.config.ts` | 5 min | CSP violation visibility |
| 5 | Add `Acknowledgments` field to `security.txt` | 2 min | RFC 9116 completeness |

---

*Report generated by geo-seo-claude skill. Methodology: 6-category weighted scoring with parallel subagent analysis. Scoring calibrated against Princeton/Georgia Tech GEO research (2024) and Ahrefs brand mention study (Dec 2025).*
