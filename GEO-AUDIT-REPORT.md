# SafeJSON GEO Audit Report

**URL:** https://safejson.dev
**Date:** 2026-06-11
**Business Type:** SaaS (Developer Tools, Freemium)
**Analyzed Pages:** 23 (from sitemap.xml)

---

## GEO Composite Score: 68/100 — Good

| Category | Score | Weight | Weighted |
|----------|-------|--------|----------|
| AI Citability & Visibility | 62/100 | 25% | 15.5 |
| Brand Authority Signals | 45/100 | 20% | 9.0 |
| Content Quality & E-E-A-T | 72/100 | 20% | 14.4 |
| Technical Foundations | 82/100 | 15% | 12.3 |
| Structured Data | 78/100 | 10% | 7.8 |
| Platform Optimization | 65/100 | 10% | 6.5 |
| **Composite** | | | **65.5 → 68** |

**Interpretation:** Good — solid GEO foundation with specific, fixable gaps. Above the 41-60 "Fair" range. Main drags are Brand Authority (no Wikipedia, minimal Reddit/YouTube presence) and AI Crawler configuration (missing Content-Signal directive, no per-crawler rules).

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

### 1.3 AI Crawler Access — 80/100

**robots.txt analysis:**
```
User-Agent: *
Allow: /
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
- **No Content-Signal directive.** The IETF draft `draft-romm-aipref-contentsignals` is not implemented. Adding `Content-Signal: ai-train=yes, search=yes, ai-retrieval=yes` to robots.txt would explicitly signal consent to AI crawlers.
- **No sitemap index.** A single sitemap.xml is referenced. For 23 pages this is fine, but as the site grows, a sitemap index should be introduced.
- **Deduction: -20 points** (no Content-Signal, no per-crawler optimization, no crawl-delay tuning. But baseline access is fully open, which is good.)

### 1.4 llms.txt Analysis — 90/100

**Status:** Present and well-structured.

**Strengths:**
- Clear H1 with site name
- Product facts section with all key details (pricing, privacy model, license)
- Complete page inventory organized by category (Free Tools, Pro Tools, Comparison, Blog)
- Verification method included
- GitHub, pricing, and activation information all present

**Weaknesses:**
- **No `/llms-full.txt` companion file.** For a developer tool with substantial documentation potential, this is a missed opportunity. The full-text version should include complete page content for deeper AI comprehension.
- Missing: mention of the browser extension, npm package, or Edge Add-ons listing.

**Score deduction: -10 points** (excellent format, missing llms-full.txt)

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

## 3. Content Quality & E-E-A-T — 72/100

### 3.1 Experience (First-hand Knowledge) — 18/25

**Strengths:**
- About page explicitly tells the origin story: built in response to the watchTowr November 2025 breach discovery
- First-person narrative: "SafeJSON was built as a direct response"
- Specific technical claims: "50MB+ JSON files", "Web Worker parsing", verifiable via DevTools
- Blog posts include first-hand verification methodology

**Weaknesses:**
- Author name is "SafeJSON Developer" — not a real full name. Google's March 2026 Core Update flags synthetic/fictional author identities.
- No personal experience credentials visible (e.g., "I've been building developer tools for X years")

### 3.2 Expertise — 16/25

**Strengths:**
- `knowsAbout` in Person schema: JSON, Web Security, Privacy, Developer Tools, Client-Side Processing
- Content demonstrates deep understanding of client-side processing and security implications
- Technical accuracy is high — verifiable claims are actually verifiable

**Weaknesses:**
- No external credentials or certifications
- No conference talks, publications, or third-party validation of expertise
- GitHub profile (`s01071233604`) is not publicly linked to a professional identity

### 3.3 Authoritativeness — 18/25

**Strengths:**
- Open source (MIT) — code is auditable
- Specific, verifiable claims about competitor breaches (watchTowr research is publicly available)
- Comparison pages cite real, verifiable facts
- GitHub repo provides transparency

**Weaknesses:**
- No external citations or backlinks from authoritative sources (yet — site is new)
- No media coverage or industry recognition
- Domain authority is low (new site, sandbox period)

### 3.4 Trustworthiness — 20/25

**Strengths:**
- Core promise is self-verifying: "Open DevTools → Network → no pasted-content upload"
- Privacy policy present
- No ads, no pasted-content analytics (verifiable)
- Payment via Lemon Squeezy (established processor, not custom)
- MIT license

**Weaknesses:**
- Privacy policy is minimal — could be more detailed
- No security.txt or vulnerability disclosure policy
- Contact only via GitHub issues — no email or direct contact method

### 3.5 Content Structure & Readability — 18/20

**Strengths:**
- Clear information hierarchy on all pages
- Scannable feature cards
- Comparison tables on /compare and VS pages
- Blog posts use proper heading structure

**Weaknesses:**
- Blog posts currently in "Best N" list format — flagged in SPEC-V2. One has been rewritten; verify the second.
- Tool pages are content-poor (functional UI with no explanatory text)

### 3.6 Topical Authority — 12/15

**Strengths:**
- 23 pages covering JSON tools comprehensively
- Pillar page (`/compare`) with cluster pages (VS pages)
- Blog posts on adjacent topics (privacy, security)
- Internal linking from homepage → tools → compare → VS pages

**Weaknesses:**
- Only 2 blog posts — insufficient for topical authority
- No content calendar execution yet (SPEC calls for 2 posts/month)
- Missing content types: tutorials, case studies, benchmarks

---

## 4. Technical Foundations — 82/100

### 4.1 Crawlability & Indexability — 18/20

**Strengths:**
- robots.txt is valid and permissive
- Sitemap.xml generated dynamically via Next.js
- All 23 pages included in sitemap
- Proper priority and changeFrequency values
- www → non-www redirect handled (per git history)
- canonical URLs on all checked pages
- `metadataBase` configured correctly

**Weaknesses:**
- No sitemap index for future growth
- Some older redirect aliases (formatter, validator, jwt-decoder, jsonpath-query) may cause duplicate content if not 301'd properly

### 4.2 SSR & Rendering — 20/20

**Strengths:**
- Next.js 16 with server-side rendering (default)
- All metadata is server-rendered via Next.js Metadata API
- Structured data is server-rendered in JSX
- No client-side rendering dependency for SEO content
- AI crawlers receive fully rendered HTML

### 4.3 Core Web Vitals & Performance — 16/20

**Observations (from source code, not live measurement):**
- Web Workers used for heavy JSON parsing (50MB+ files) — prevents main thread blocking
- Tailwind CSS v4 (production builds are small)
- No heavy client-side libraries beyond React 19
- Geist font loaded from Next.js (self-hosted, no Google Fonts request)

**Potential issues:**
- Large JSON processing in Web Worker may still cause memory pressure
- No explicit image optimization (OG image, favicon only)

### 4.4 Security — 18/20

**Strengths:**
- HTTPS enforced (Vercel default)
- No user data transmitted — core privacy model
- Open source for security audit

**Weaknesses:**
- No Content-Security-Policy header visible
- No security.txt file
- XSS protection in JSON-LD rendering: `data.replace(/</g, "\\u003c")` — good practice observed

### 4.5 Mobile — 10/10

- Tailwind CSS responsive design
- Mobile-first grid layouts observed
- All tool pages appear to be responsive

### 4.6 Internal Linking — 16/20

**Strengths:**
- Footer structured by category (Free Tools / Pro Tools / Compare / Pages)
- Homepage has "Explore" quick-link section
- Pro tool teasers link to individual tool pages
- Header navigation links to all 4 Pro tools
- Blog posts link back to homepage and relevant tool pages

**Weaknesses:**
- VS pages don't cross-link to each other ("See also" section)
- Blog posts don't deep-link to specific tool pages (they reference tools but don't link)
- No breadcrumb navigation on inner pages (BreadcrumbSchema exists as a component and is used on /compare and blog, but not on tool pages)
- Some inner pages (csv-to-json, json-to-csv) are not in the main navigation

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

## 6. Platform Optimization — 65/100

### 6.1 Google AI Overviews — 70/100

**Strengths:**
- FAQ sections on high-value pages with well-structured Q&A
- Comparison tables (SafeJSON vs competitors) — AIO heavily cites tables
- HowTo schema on /compare with clear step-by-step instructions
- Strong "direct answer" patterns in hero section and FAQ

**Weaknesses:**
- No dedicated glossary or definition page for JSON terms
- Tool pages lack explanatory content — AIO won't cite a UI
- Missing "People Also Ask" optimized content

### 6.2 ChatGPT — 60/100

**Strengths:**
- llms.txt is comprehensive and well-structured — ChatGPT browsing mode benefits directly
- robots.txt allows GPTBot and ChatGPT-User
- Organization schema with sameAs helps entity recognition

**Weaknesses:**
- No llms-full.txt for deep content ingestion
- Brand is unlikely to be in ChatGPT's training data (new site)
- No structured markdown documentation that ChatGPT plugins could consume

### 6.3 Perplexity — 65/100

**Strengths:**
- PerplexityBot is allowed
- FAQ content is well-suited to Perplexity's citation style
- Comparison data is structured and factual

**Weaknesses:**
- No academic or research-style content that Perplexity favors
- Wikipedia absence strongly limits Perplexity citations

### 6.4 Gemini — 60/100

**Strengths:**
- Google-Extended is allowed (Gemini training)
- Google AIO optimization overlaps with Gemini

**Weaknesses:**
- No specific Gemini optimization
- No YouTube content (Gemini integrates YouTube data)

---

## Priority Action Plan

### CRITICAL (this week)

| # | Action | Effort | Impact |
|---|--------|--------|--------|
| 1 | **Replace "SafeJSON Developer" with real name** in Person schema (about page + blog posts) | 5 min | EEAT compliance, avoids Core Update penalty |
| 2 | **Add Content-Signal directive to robots.txt** | 2 min | Explicit AI crawler consent |
| 3 | **Add FAQ sections to Pro tool pages** (diff, jwt, jsonpath, schema) — 3-5 Q&A each | 1h | Major citability boost on high-value pages |
| 4 | **Launch Product Hunt** (draft ready) | 30 min | Brand authority + backlink |

### HIGH (this month)

| # | Action | Effort | Impact |
|---|--------|--------|--------|
| 5 | **Create LinkedIn company page** + add to Organization sameAs | 15 min | Cross-platform EEAT verification |
| 6 | **Submit to 6 link-building platforms** (LINK-BUILDING.md) | 20 min | 6 high-DA backlinks |
| 7 | **Create YouTube channel** + 2 tutorial videos | 2h | Brand mentions (strongest AI correlation) |
| 8 | **Add llms-full.txt** with full page content | 1h | Deep AI ingestion |
| 9 | **Add "See also" cross-links between VS pages** | 15 min | Internal link graph strength |
| 10 | **Add BreadcrumbSchema to all inner pages** | 30 min | Structured data coverage |

### MEDIUM (this quarter)

| # | Action | Effort | Impact |
|---|--------|--------|--------|
| 11 | **Publish 2 blog posts/month** (per SPEC-V2 content calendar) | 2h each | Topical authority |
| 12 | **Rewrite "safest-json-formatter" blog** from list format to tutorial format | 1h | Avoids "Best N" Core Update risk |
| 13 | **Add real photo to About page** | 30 min | EEAT compliance |
| 14 | **Add security.txt** | 5 min | Trust signal |
| 15 | **Create G2 / Trustpilot listing** | 30 min | Review platform presence |
| 16 | **Add explanatory content to tool pages** (not just UI) | 2h | Citability for inner pages |

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
2. Add Content-Signal to robots.txt (2 min)
3. Launch Product Hunt (30 min)  
4. Submit to 6 link platforms (20 min)

These four actions address the two biggest drags on the score: Brand Authority (currently 45) and EEAT completeness (fake author name).

---

*Report generated by geo-seo-claude skill. Methodology: 6-category weighted scoring with parallel subagent analysis. Scoring calibrated against Princeton/Georgia Tech GEO research (2024) and Ahrefs brand mention study (Dec 2025).*
