# SafeJSON Growth Workflow

Goal: turn SafeJSON from "working product" into repeatable discovery, trial, and paid Pro activation.

## Operating Principle

Every growth action should strengthen one of four loops:

1. Search discovery: more indexable, useful pages for developer queries.
2. AI discovery: direct facts that AI search engines can cite.
3. Developer trust: verifiable privacy, open source, clear evidence.
4. Revenue: visitors try Pro tools, hit the free limit, buy, and activate a license key.

## Weekly Loop

### 1. Monday - Health Check

Codex can run:

```bash
npm run growth:check
npm run growth:playwright
npm run lint
npm run build
```

Check:

- `https://www.safejson.dev/llms.txt` is live and current.
- `/pricing` explains checkout, license keys, and 2-device activation.
- `/answers` contains direct Pro and privacy facts for AI search.
- Core pages return 200.
- Lemon Squeezy license endpoints reject invalid input correctly.
- Sitemap and robots are reachable.

User only needs to step in if Google Search Console, Lemon Squeezy, or external platform dashboards require manual login.

### 2. Tuesday - SEO/GEO Content

Codex can do:

- Refresh one existing page with a clearer answer, FAQ, or comparison table.
- Add one buyer-intent page when a keyword gap is clear.
- Update `public/llms.txt` when pricing, licensing, or positioning changes.
- Add structured data when the page has clear FAQ, Product, SoftwareApplication, HowTo, or Breadcrumb intent.

User should provide:

- Semrush/GSC screenshots when available.
- Any real customer question or complaint.
- Any claim that needs first-hand founder voice.

### 3. Wednesday - Distribution

Codex can do:

- Prepare final copy for directories, GitHub, DEV.to, Indie Hackers, Hacker News, and Product Hunt.
- Update GitHub README and repo metadata.
- Submit low-risk forms only when the platform is open, logged in, and does not require human community judgment.
- Update `growth/SUBMISSION-TRACKER.md` with owner, status, proof URL, and next action after each submission.

User should do:

- Reddit posts/comments.
- Product Hunt launch account actions.
- Any platform with high anti-spam sensitivity.
- Any comment thread that needs a real founder voice.

### 4. Thursday - Conversion

Codex can do:

- Audit pricing and unlock flow.
- Verify Lemon Squeezy license activation.
- Improve "what happens after checkout" copy.
- Add support answers for failed activation, refund, and device-limit questions.

User should do:

- Refund/customer support decisions.
- Lemon Squeezy dashboard changes that expose private account controls.
- Payment-provider identity or tax settings.

### 5. Friday - Measurement

Codex can compile:

- Indexed pages from GSC screenshots.
- Bing/IndexNow submission status.
- GitHub stars/referrers if available.
- Pro checkout clicks and completed purchases if the dashboard is available.
- Top pages and queries from GA/GSC screenshots.

Decision rule:

- If pages are not indexed: prioritize crawl/index fixes.
- If indexed but no clicks: improve titles, snippets, and external links.
- If traffic but no Pro trials: improve tool-page CTAs.
- If Pro trials but no purchases: improve pricing, limit timing, or checkout clarity.
- If purchases but activation problems: improve license flow and support copy.

## Current SafeJSON Positioning

Primary message:

> The JSON tool that never sees your data. Prove it yourself.

Verification:

> Open DevTools -> Network, paste JSON, use the tool, and confirm there are no data-upload requests for pasted content.

Revenue offer:

> Free core JSON formatter. Pro tools for JSON Diff, JWT Decoder, JSONPath, and JSON Schema Validator at $5/month or $39/year. One license activates up to 2 devices.

## Codex Runbook

For each growth iteration:

1. Inspect git state and do not touch unrelated untracked files.
2. Review production pages before changing content.
3. Make the smallest useful change to one loop.
4. Run `npm run growth:check`, the Playwright production check, `npm run lint`, and `npm run build`.
5. Commit with a clear message.
6. Push to GitHub and verify Vercel production.
7. Submit IndexNow after deploy when indexable pages changed.
8. Update `growth/SUBMISSION-TRACKER.md` when external distribution status changed.
9. Report what changed, what was verified, and what needs user action.

## User Escalation Triggers

Ask the user only when:

- A platform requires identity, billing, tax, or account-risk action.
- A community post could look spammy without founder context.
- A claim needs legal, security, or first-hand confirmation.
- A dashboard has private customer/payment data that should not be exposed in chat.
