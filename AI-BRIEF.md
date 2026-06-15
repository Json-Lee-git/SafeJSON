# SafeJSON — AI Briefing Document

> Paste this at the start of any conversation with ChatGPT or another AI to
> give it full context about SafeJSON.

---

## Who I am

I'm a solo founder building SafeJSON. I go by **JSON-Lee** across platforms
(GitHub: Json-lee-gitle, DEV.to: same handle). This is a bootstrapped project
— no VC, no team, no budget. I do the product and growth; Claude and Codex
help with code and content.

---

## What SafeJSON is

SafeJSON is a privacy-first JSON developer toolkit. Every tool runs entirely
in the browser:

**Free tools (forever):**
JSON Formatter, Validator, Beautifier, Viewer, Parser, CSV ↔ JSON

**Pro tools ($5/month or $39/year):**
JSON Diff, JWT Decoder, JSONPath Query, JSON Schema Validator

**Browser extension:**
Auto-detects and formats raw JSON responses on any URL. Live on Edge Add-ons,
pending review on Chrome Web Store.

**Website:** https://www.safejson.dev
**GitHub:** https://github.com/Json-Lee-git/SafeJSON

---

## Core differentiator

The pitch is NOT generic "privacy-first." It's **verifiable privacy:**

Users can open DevTools → Network tab, paste JSON, run any tool, and confirm
that no request contains their pasted content. This is observable, repeatable,
and does not require trusting marketing copy.

Built after jsonformatter.org leaked 80,000 credentials through server-side
processing in November 2025.

---

## Critical wording rules

NEVER use these phrases (they are false because GA is installed):
- "zero network requests"
- "no tracking"
- "no analytics"
- "military-grade security"

ALWAYS use these instead:
- "no pasted-content upload"
- "no request contains pasted content"
- "no pasted-content analytics"
- "verify in DevTools"
- "Open DevTools → Network and confirm"

---

## Current state (June 14, 2026)

**Traffic:** 51 users in last 28 days. 94% direct. 1 click from Google. Zero
paying customers.

**Platforms live:**
- GitHub: Json-Lee-git/SafeJSON
- DEV.to: 3 posts published, 1 comment replied
- Product Hunt: live listing (cleaned up)
- SaaSHub: submitted
- Indie Hackers: submitted
- Edge Add-ons: approved and live
- Chrome Web Store: pending review
- YouTube: channel created, 1 video published
- GitHub Discussions: #1 active

**Platforms pending:**
- AlternativeTo: blocked until June 18 (account age requirement)
- Reddit: recovery post planned June 25 (banned from r/webdev earlier)
- LinkedIn: company page registration started, not complete
- Hacker News: Show HN draft ready, deferred

**SEO/GEO:**
- 36 pages statically prerendered (Next.js 16 + Turbopack)
- CSP deployed (10 directives, frame-ancestors 'none')
- security.txt, llms.txt, llms-full.txt live
- robots.txt with Content-Signal
- Sitemap: 26 URLs submitted to Google + Bing
- GEO audit score: 66/100
- Brand authority: 24/100

**Key growth docs (in repo):**
- `growth/MARKETING-PLAN.md` — 12-month plan
- `growth/OUTREACH-WAVE-001.md` — platform copy
- `growth/SUBMISSION-TRACKER.md` — external platform tracker
- `growth/COMPETITOR-DEEP-DIVE-JSONCRACK.md` — JSON Crack analysis
- `growth/CONTENT-STRATEGY.md` — blog calendar
- `growth/YOUTUBE-CONTENT-CLUSTER.md` — 3-video plan
- `growth/PROOF-ASSETS-PLAN.md` — screenshots/GIFs needed
- `growth/GITHUB-DISCOVERABILITY-CHECKLIST.md` — repo optimization

---

## Design constraints

- Do NOT redesign the site
- Do NOT change theme, colors, layout, or visual style
- Dark mode only (zinc-950 background)
- Developer-focused, minimal, utilitarian
- English only

---

## What I need help with

- Filling in platform profile descriptions, directory submissions, social bios
- Writing developer-facing copy that sounds human, not AI
- SEO content that ranks without keyword stuffing
- Reddit comments that sound like a real person
- Growth strategy and competitive positioning
- Any task where pasting this document gives you enough context to work
  independently

---

## Competitive landscape

- **jsonformatter.org** — server-side, 3.2M visits/mo, 80K credential leak
- **jwt.io** — Auth0/Okta lead gen, server-side JWT decoding
- **JSON Crack** — adjacent (visualization), not direct competitor; proves
  open-source JSON tools can grow through GitHub + multi-platform distribution

---

## Do NOT do

- Don't redesign the site or change the UI
- Don't change my pricing ($5/mo, $39/yr)
- Don't create fake reviews, fake accounts, or black-hat SEO
- Don't write copy that sounds like corporate marketing
- Don't use "zero network requests" or "no tracking"
- Don't propose features that require a backend server

---

## Output optimization

These constraints are derived from community benchmarks showing structured
output beats free-form reasoning for DeepSeek V4 code and content tasks.

### Structured output format

Every response must follow this structure:

[ONE LINE — what you did or the answer]

[The actual work: code, content, or detailed answer — in one block]

[ONE LINE — verification: what you checked, whether it passed]

Do not open with "I'll" or "Let me." Open with the result. Do not add
explanations, alternatives, or planning commentary outside this structure.
If the task is trivial, skip the verification line.

### Self-check before declaring done

After every code change or content piece, silently verify:
- Did I read the file before editing it?
- Does my edit use correct privacy wording?
- Did I run the relevant check (lint / build / growth:check)?

If you skipped a check, say so. Do not pretend you ran it.

### Verification pairing

Each file edit must be followed by its matching verification:
- Edit any `src/` file → run `npm run lint && npm run build`
- Edit any `growth/` or `public/` doc → run `npm run growth:check`
- Edit `next.config.ts` → run all three

Unless the user explicitly says skip, always run the check.
