# Outreach Wave 001 — First External Distribution

**Date:** 2026-06-12
**Goal:** Get SafeJSON listed, linked, and discoverable on developer platforms. Turn "zero external presence" into "measurable referral sources."
**Constraint:** Do not change site UI, redesign pages, or do broad copy tweaks. Site-side SEO/GEO and payment are solid enough for a first wave.

---

## Wave Goal

1. Submit or verify presence on 4–6 high-DA directories (DA 65–85).
2. Publish 1 owned content piece (DEV.to) with canonical backlink.
3. Create 1 GitHub community touchpoint (Discussion).
4. Prepare founder-voice drafts for HN, Product Hunt, LinkedIn, and Reddit — ready to post, not auto-posted.
5. Every platform gets a proof link slot filled in `growth/SUBMISSION-TRACKER.md`.

---

## Platform Priority & Ownership

| # | Platform | DA | Owner | Risk | Status |
|---|----------|-----|-------|------|--------|
| 1 | SaaSHub | 73 | User (verify) | Low | Claimed submitted 2026-06-11 |
| 2 | Indie Hackers | 78 | User (verify) | Medium | Claimed submitted 2026-06-11 |
| 3 | DEV.to | — | User | Medium | Draft ready |
| 4 | GitHub Discussion | — | Claude/Codex can open if logged in | Medium | Not started |
| 5 | LinkedIn founder post | — | User only | Medium | Not started |
| 6 | AlternativeTo | 85 | User (on/after June 18) | Low | Blocked by account age |
| 7 | Hacker News | — | User only | High | Draft ready |
| 8 | Product Hunt | — | User only | High | Claimed submitted; full draft needed |
| 9 | Reddit | — | User only | High | Recovery window ends ~June 25 |

---

## Who Does What

### Claude/Codex Can Do

- Open a GitHub Discussion if the browser session is authenticated.
- Update `growth/SUBMISSION-TRACKER.md` with proof links after each submission.
- Run `npm run growth:check`, `npm run growth:playwright`, `npm run lint`, `npm run build` before and after.
- Commit and push tracker updates.

### User Must Do

- Any platform that requires a personal account, captcha, or community reputation (HN, Reddit, Product Hunt, LinkedIn, DEV.to).
- Any platform where the submission was claimed but proof is missing — verify and add the URL.
- Any comment thread or reply that needs founder voice.

---

## Platform Copy

### 1. SaaSHub

**Action:** Verify the claimed 2026-06-11 submission. If not found, submit fresh.

**URL:** https://www.saashub.com

**Name:** SafeJSON

**URL:** https://safejson.dev

**Description:**
SafeJSON is a privacy-first JSON toolkit with formatter, validator, beautifier, viewer, parser, diff checker, JWT decoder, JSONPath query, schema validator, and CSV conversion. JSON processing runs client-side in the browser — pasted content is not uploaded. Open source (MIT).

**Categories:** Developer Tools, JSON, Data Formatting

**Pricing:** Freemium — free core tools, Pro at $5/month or $39/year

**Proof link:** `[ ]`

---

### 2. Indie Hackers

**Action:** Verify the claimed 2026-06-11 submission. If not found, publish fresh.

**URL:** https://www.indiehackers.com/products

**Title:** I launched a privacy-first JSON formatter with a simple paid Pro tier

**Body:**
```
I launched SafeJSON: https://www.safejson.dev

It is a JSON formatter and developer toolkit built around one idea: users should be able to verify that their JSON never leaves the browser.

The test is simple:

Open DevTools -> Network -> paste JSON -> use the tool -> confirm there are no data-upload requests for pasted content.

Free:
- formatter
- validator
- beautifier
- viewer
- parser
- CSV conversion

Pro ($5/month or $39/year):
- JSON Diff
- JWT Decoder
- JSONPath
- JSON Schema Validator

The payment and license flow is now live through Lemon Squeezy. Each license activates up to 2 devices.

I am using this as a small, focused experiment in developer-tool monetization: no ads, no pasted-content analytics, no uploading user JSON.

Would love feedback on the positioning and pricing.
```

**Proof link:** `[ ]`

---

### 3. DEV.to

**Action:** Publish from your DEV.to account. Do not auto-post.

**Title:** I built a JSON formatter you can verify with DevTools

**Tags:** `webdev`, `javascript`, `security`, `opensource`

**Body:**
```markdown
I kept seeing the same developer habit: copy a production API response, paste it into a random JSON formatter, fix the bug, move on.

That is convenient, but it is also a weird amount of trust.

In November 2025, security researchers reported that JSONFormatter and CodeBeautify exposed 80,000+ saved snippets with credentials and sensitive data. The lesson is not "never format JSON online." The lesson is: a JSON tool should not need your data to leave your browser.

So I built SafeJSON:

https://www.safejson.dev

The core idea is verifiable privacy.

You do not have to trust the homepage copy. You can check it:

1. Open SafeJSON
2. Open DevTools
3. Open the Network tab
4. Paste JSON
5. Format, validate, diff, or inspect it
6. Confirm that pasted content is not uploaded

The free tools include:

- JSON formatter
- JSON validator
- JSON beautifier
- JSON viewer
- JSON parser
- CSV to JSON
- JSON to CSV

Pro tools are:

- JSON Diff
- JWT Decoder
- JSONPath Query
- JSON Schema Validator

The project is open source:

https://github.com/s01071233604-tech/safejson

I am trying to keep the product simple: free core formatter, paid advanced tools, no ads, no pasted-content analytics, and no server-side JSON processing.

Feedback I am especially looking for:

- Does the DevTools verification feel clear?
- Which JSON workflow is still annoying in your day-to-day work?
- Would you trust a browser-only JSON tool more than a server-side formatter?
```

**Proof link:** `[ ]`

---

### 4. GitHub Discussion

**Status (2026-06-12):** Done — created by user.

**Repo:** https://github.com/s01071233604-tech/safejson

**Category:** General

**Title:** `Feedback wanted: a JSON formatter that lets you verify no pasted-content upload`

**Body (copy-paste ready):**
```markdown
I'm building SafeJSON, a privacy-first JSON formatter and developer toolkit.

The core idea is simple: you should not have to trust the tool. You should be able to verify it.

Verification flow:
1. Open DevTools
2. Go to the Network tab
3. Paste JSON into SafeJSON
4. Confirm that no request contains your pasted content

SafeJSON currently includes:
- JSON formatting and validation
- JSON diff
- JWT decoding
- JSONPath queries
- JSON Schema validation

The product is open source and runs pasted JSON locally in the browser.

I'm looking for feedback from developers who regularly paste logs, API responses, config files, JWTs, or production JSON into online tools.

Specific feedback I'd love:
- Is the "verify in DevTools" privacy model clear enough?
- What would make you trust this tool more?
- Which JSON workflow should be improved next?
- Are there any claims that feel too broad or need tighter wording?

Website: https://www.safejson.dev
Source: https://github.com/s01071233604-tech/safejson
```

**Proof link:** https://github.com/s01071233604-tech/safejson/discussions/1

---

### 5. LinkedIn Founder Post

**Action:** User must post from their personal LinkedIn account. Do not auto-post.

**Draft:**
```
I launched a JSON formatter after 80,000 credentials leaked through server-side tools.

SafeJSON is built around one idea: you should be able to verify that your JSON never leaves your browser. Open DevTools -> Network, paste JSON, use the tool, and confirm that no request contains your pasted content.

Free core tools. Pro tools (Diff, JWT, JSONPath, Schema) at $5/month.

Open source: github.com/s01071233604-tech/safejson

Would love feedback from developers — especially on the privacy verification flow.
```

**Proof link:** `[ ]`

---

### 6. AlternativeTo

**Action:** Submit on/after June 18 (account must be 7 days old). Do not submit earlier or the form will reject.

**URL:** https://alternativeto.net/software/jsonformatter/ → "Suggest an alternative"

**Name:** SafeJSON

**URL:** https://safejson.dev

**Description:**
Privacy-first JSON formatter and developer toolkit. Format, validate, view, diff, decode JWTs, query JSONPath, and validate JSON Schema — all in your browser. SafeJSON is open source (MIT), ad-free, and built around verifiable privacy: open DevTools -> Network and confirm that pasted JSON is not uploaded. Built after jsonformatter.org leaked 80,000 credentials in 2025.

**Tags:** json, formatter, validator, developer-tools, privacy, open-source

**Proof link:** `[ ]`

---

### 7. Hacker News — Show HN

**Action:** User must post from a real HN account. Do not auto-post. If it gets no traction, do not repost — move on and try a different angle later.

**Title:** Show HN: SafeJSON — a JSON formatter you can verify with DevTools

**Body:**
```
Hi HN, I built SafeJSON, a browser-based JSON formatter and developer toolkit:

https://www.safejson.dev

The main idea is verifiable privacy. Open DevTools -> Network, paste JSON, use the formatter, and confirm that the pasted data is not uploaded.

It includes free formatter/validator/viewer/parser tools, plus paid Pro tools for JSON Diff, JWT decoding, JSONPath, and JSON Schema validation.

The project is open source:
https://github.com/s01071233604-tech/safejson

I built it after seeing how often developers paste production API responses, JWTs, and config blobs into random online tools. Feedback welcome, especially on the privacy verification flow.
```

**Best time to post:** Tuesday–Thursday, 7–10 AM ET. Wait until the AlternativeTo listing and at least one directory submission are confirmed live.

**Proof link:** `[ ]`

---

### 8. Product Hunt — Full Launch Draft

**Action:** User only. The claimed submission may be a "coming soon" or placeholder. Prepare a full launch draft but do not launch until:
- Profile image, tagline, and screenshots are ready
- At least 3 external directory listings are live
- First-user feedback exists (DEV.to comments, GitHub stars, etc.)

**Tagline:** The JSON tool that never sees your data. Prove it yourself.

**Description:**
SafeJSON is a privacy-first JSON toolkit for developers. Every tool runs entirely in your browser — formatter, validator, diff checker, JWT decoder, JSONPath query, and schema validator. You do not have to trust the claim. Open DevTools -> Network, paste JSON, and confirm that pasted content is not uploaded.

Built after jsonformatter.org leaked 80,000 credentials through server-side processing in November 2025.

**Key features to highlight:**
- All tools run client-side — verifiable with DevTools
- Free core tools, Pro at $5/month or $39/year
- Open source (MIT) on GitHub
- Browser extension for auto-formatting JSON responses
- Large JSON support (50MB+) via Web Workers
- No ads, no pasted-content analytics

**Maker comment draft (post immediately after launch):**
```
I built SafeJSON after the jsonformatter.org data leak. The core idea is simple: you should never need to upload your JSON to format it. Every tool runs in your browser, and you can verify that with DevTools.

This is a solo project. I would love early feedback on the privacy verification flow, the Pro gating, and what JSON workflows are still annoying in your day-to-day work.
```

**Proof link:** `[ ]`

---

### 9. Reddit — Recovery Post

**Action:** User only. Wait until June 25 (2-week cooldown after r/webdev ban). Post on r/SideProject with a short, casual, non-promotional tone. Do not mention the ban. Do not use structured/promotional formatting.

**Subreddit:** r/SideProject

**Title options (pick one that feels natural):**
- "I built a JSON formatter after 80K credentials leaked — all processing is client-side"
- "Built a privacy-first JSON toolkit after the jsonformatter.org data leak"
- "My side project: a JSON formatter you can verify with DevTools"

**Body draft (3–4 sentences max, casual tone):**
```
After the jsonformatter.org leak last year, I built a JSON formatter where all processing happens in your browser. You can verify it by opening DevTools -> Network and confirming that pasted content is not uploaded.

It has free formatting tools and paid Pro tools (Diff, JWT, JSONPath, Schema) at $5/month.

Would love feedback from other dev tool builders on the privacy positioning.
```

**Rules:**
- Do not post from a new/throwaway account.
- Do not link to SafeJSON in the first hour — add it only if someone asks.
- Do not reply defensively to criticism.
- If the post gets removed, wait another 2 weeks before trying a different subreddit.

**Proof link:** `[ ]`

---

## Execution Checklist

- [x] SaaSHub: listing URL recorded in tracker
- [x] Indie Hackers: listing URL recorded in tracker
- [x] DEV.to: 3 posts published; 1 comment replied by founder 2026-06-12
- [x] CSP trust signal: deployed 2026-06-12 (10 directives, verified via growth:check)
- [x] GitHub Discussion: created https://github.com/s01071233604-tech/safejson/discussions/1
- [ ] LinkedIn: publish founder post, add proof URL
- [ ] LinkedIn company page: complete registration, add to schema
- [ ] AlternativeTo: submit on/after June 18, add proof URL
- [ ] Product Hunt: prepare full launch materials (do not launch yet)
- [ ] HN: post when 3+ directories are confirmed live
- [ ] Reddit: post on/after June 25 on r/SideProject

---

## Post-Wave Verification

After each submission or when the wave is complete, run:

```bash
npm run growth:check
npm run growth:playwright
npm run lint
npm run build
```

Then update this file and `growth/SUBMISSION-TRACKER.md` with proof links. Commit and push.
