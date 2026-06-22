# SafeJSON Authority and Cold-Start Plan

Date: 2026-06-22

Goal: move SafeJSON from "technically crawlable" to "externally cited, safely described, and easier for search/AI systems to trust."

## Diagnosis

SafeJSON's current indexing problem is no longer mainly a robots, sitemap, or canonical-domain problem. The stronger bottleneck is cold-start authority:

- Bing has discovered the sitemap successfully, but search and AI performance have not shown meaningful impressions yet.
- The site now has targeted pages for JSON formatter, no-upload JSON formatter, comparisons, privacy verification, and AI context.
- External authority is thin, and some existing external listings still use stale or overbroad privacy copy.
- One live external listing, SourceForge, currently describes SafeJSON with outdated absolute claims. That should be corrected before chasing more backlinks.

## Owned Authority Page

New source-of-truth URL:

https://www.safejson.dev/press

Use this page when filling directory profiles, journalist pitches, community posts, AI citation prompts, or "About" fields.

Safe copy:

> SafeJSON is a browser-based JSON toolkit for formatting, validating, viewing, comparing, decoding JWTs, querying JSONPath, and validating schemas. Core JSON workflows are designed to run locally in the browser, and pasted JSON content is not intentionally uploaded for core tools. Users can verify this in DevTools -> Network. Like most web products, SafeJSON may still use normal network requests for static assets, aggregate analytics, billing, and license checks.

Short copy:

> Browser-based JSON toolkit with verifiable browser-local workflows. Format, validate, view, compare, decode JWTs, query JSONPath, and validate schemas. Verify no pasted-content upload for core tools in DevTools -> Network.

## Priority 0: Clean Existing Authority

Do this before adding a large new submission wave.

| Platform | Why it matters | Action | Owner |
| --- | --- | --- | --- |
| SourceForge | Indexed public directory page with stale privacy claims | Replace description with the safe copy from `/press`; remove absolute "100%" and "zero user data uploaded" language; remove unqualified large-file claims | User |
| Product Hunt | High-authority launch page and frequently scraped | Confirm website is `https://www.safejson.dev`; update tagline to "Verifiable browser-local JSON toolkit"; replace first comment with safe copy if editable | User |
| GitHub repo settings | GitHub profile has strong search weight | Set description, homepage, and topics from `growth/PHASE-7C-EXTERNAL-TRUST-UPDATES.md` | User |
| Edge Add-ons | Store listing can rank for extension and JSON formatter terms | Update title and description from `growth/PHASE-7C-EXTERNAL-TRUST-UPDATES.md`; avoid broad tracking/privacy claims | User |
| DEV profile | Already updated and visible with the correct verifiable-positioning summary | Keep current profile; add `/press` link in future posts when asking for citations or media | User |
| SaaSHub / Indie Hackers | Existing proof URLs should be monitored | Verify public listing text and replace any old `safejson.vercel.app` or absolute privacy slogans | User |

## Priority 1: Add High-Fit Directory Links

These are suitable because SafeJSON is a developer tool, not a broad AI app.

| Target | URL | Suggested category | Copy source | Notes |
| --- | --- | --- | --- | --- |
| AlternativeTo | https://alternativeto.net | Developer tools / JSON editor | `/press` short copy | Account-age block should now be over; submit manually |
| DevHunt | https://devhunt.org | Developer tools | `/press` short copy | Good fit for indie dev tools |
| Uneed | https://www.uneed.best | Developer tools | `/press` short copy | Founder-friendly product directory |
| Fazier | https://fazier.com | Developer tools | `/press` short copy | Low-friction startup directory |
| MicroLaunch | https://microlaunch.net | Developer tools | `/press` short copy | Use the no-upload angle, not "AI" positioning |
| StackShare | https://stackshare.io | Developer tools / utilities | `/press` short copy | Stronger if GitHub repo topics are cleaned first |
| Slant | https://www.slant.co | JSON editors / developer tools | `/press` short copy | Use careful comparison language |
| SaaSHub | https://www.saashub.com | JSON formatter / developer tools | `/press` short copy | Verify existing candidate before creating duplicates |
| SourceForge | https://sourceforge.net/software/product/SafeJSON/ | JSON editors | `/press` long copy | Cleanup first, then treat as active backlink |

## Priority 2: Cold-Start Community Loop

Do not mass-post. Use one useful artifact per channel.

| Channel | Timing | Post angle | CTA |
| --- | --- | --- | --- |
| DEV.to | This week | "I made a press/citation page so directories stop copying vague privacy claims" | Ask for feedback on wording |
| Hacker News | Only once, when ready | Show HN: SafeJSON - JSON tools with a DevTools-verifiable privacy boundary | Link homepage and `/press` in comments if asked |
| Reddit r/SideProject | After June 25 recovery window | Short founder note about changing from vague privacy copy to verifiable claims | Ask whether the positioning is clear |
| Indie Hackers | This week | Build-in-public update: fixed indexing signals, added no-upload landing page and press kit | Ask for directory/channel suggestions |
| LinkedIn founder post | This week | "Privacy copy for developer tools should be testable" | Link `/privacy/verify-local-processing` and `/press` |
| GitHub Discussion | This week | Add a comment with the `/press` page and ask for correction requests | Invite technical feedback |

## UTM Links

Use these for the next wave:

- SourceForge cleanup link: `https://www.safejson.dev/press?utm_source=sourceforge&utm_medium=profile&utm_campaign=authority_cleanup`
- AlternativeTo: `https://www.safejson.dev/?utm_source=alternativeto&utm_medium=directory&utm_campaign=cold_start`
- DevHunt: `https://www.safejson.dev/?utm_source=devhunt&utm_medium=directory&utm_campaign=cold_start`
- Uneed: `https://www.safejson.dev/?utm_source=uneed&utm_medium=directory&utm_campaign=cold_start`
- Indie Hackers: `https://www.safejson.dev/press?utm_source=indiehackers&utm_medium=community&utm_campaign=authority_cleanup`
- DEV.to: `https://www.safejson.dev/security/check-json-formatter-upload?utm_source=devto&utm_medium=community&utm_campaign=verification`
- LinkedIn: `https://www.safejson.dev/privacy/verify-local-processing?utm_source=linkedin&utm_medium=social&utm_campaign=verification`

## 7-Day Execution

1. Update SourceForge first and record proof in `growth/SUBMISSION-TRACKER.md`.
2. Update GitHub repo description, homepage, and topics.
3. Check Product Hunt, SaaSHub, and Indie Hackers for old domain or old claims.
4. Submit AlternativeTo with the safe short copy.
5. Publish one founder/community update that links to `/press`.
6. Run `npm run growth:check`, `npm run growth:playwright`, and `npm run indexnow` after any indexable site changes.

## 30-Day Measurement

Track weekly:

- Indexed pages in Google Search Console and Bing Webmaster Tools.
- Branded query impressions for `SafeJSON`, `safejson.dev`, and `SafeJSON JSON formatter`.
- Long-tail impressions for `no upload json formatter`, `browser local json formatter`, and `verify json formatter upload`.
- Referral sessions from directory and community UTMs.
- AI citation appearances in Bing AI Performance or other available AI answer tracking.

## Rule

Authority growth should not reintroduce vague privacy copy. Every new external mention should point back to a verifiable claim, a canonical URL, and a narrow privacy boundary.
