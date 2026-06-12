# SafeJSON Submission Tracker

This tracker turns SEO/GEO distribution into an execution loop. Update it after every external submission, community post, directory listing, or citation-worthy mention.

## Current Readiness

| Area | Status | Evidence |
| --- | --- | --- |
| Production site | Ready | https://www.safejson.dev |
| SEO/GEO health check | Ready | `npm run growth:check` should pass before each distribution wave |
| Posting copy | Ready | `growth/POSTING-PACK-001.md` |
| Pricing and license flow | Ready | `/pricing`, `/unlock`, Lemon Squeezy license activation |
| AI crawler files | Ready | `/llms.txt`, `/llms-full.txt`, `/robots.txt` |
| Trust signals | Ready | Open source repo, security headers, `/.well-known/security.txt` |

## Ownership Rules

Codex can complete tasks when they are low-risk, technical, and do not require a personal account, captcha, payment account, or community judgment.

The user should complete tasks when the platform depends on founder identity, account reputation, anti-spam judgment, or private dashboard access.

## Submission Pipeline

| Platform | Owner | Current Status | Risk | Copy Source | Proof Needed | Next Action |
| --- | --- | --- | --- | --- | --- | --- |
| GitHub README | Codex | Done | Low | Repo copy | Repo URL | Keep README aligned with pricing and privacy claims |
| GitHub Discussion or Issue | User or Codex with logged-in browser | Not started | Medium | `POSTING-PACK-001.md` GitHub draft | Discussion/issue URL | Create feedback thread asking whether DevTools verification is clear |
| AlternativeTo | User | Not started | Low | Directory Submission Copy | Listing URL or pending screenshot | Submit SafeJSON as a privacy-first JSON formatter |
| SaaSHub | User | Not started | Low | Directory Submission Copy | Listing URL or pending screenshot | Submit SafeJSON under Developer Tools / JSON |
| Betalist | User | Not started | Low | Directory Submission Copy | Listing URL or pending screenshot | Submit product listing |
| Toolify | User | Not started | Low | Directory Submission Copy | Listing URL or pending screenshot | Submit product listing if it accepts non-AI developer tools |
| DEV.to | User, or Codex if already logged in and approved | Draft ready | Medium | DEV.to Article Draft | Article URL | Publish article, then add canonical link if needed |
| Indie Hackers | User | Draft ready | Medium | Indie Hackers Post | Post URL | Publish as founder update, respond to comments manually |
| Hacker News | User only | Draft ready | High | Show HN Draft | HN thread URL | Post manually from a real account; do not repost if it fails |
| Product Hunt | User only | Not started | High | Directory copy plus founder story | Launch URL or draft screenshot | Create draft first; launch only when profile and visuals are ready |
| Reddit | User only | Not started | High | Custom human-written comments | Thread/comment URLs | Post only in relevant threads with real context, not generic promotion |
| LinkedIn founder profile | User only | Not started | Medium | Short founder post | Post URL | Publish founder-side launch note and link to SafeJSON |
| LinkedIn company page | User only | Not started | Medium | Product description | Company page URL | Create page if desired; add website and GitHub |
| YouTube | User with Codex script help | Not started | Medium | Video script to be written | Video URL | Publish DevTools verification demo, 60-120 seconds |
| Wikipedia | User only, later | Not ready | Very high | N/A | N/A | Do not attempt until there is independent notability coverage |

## Proof Log

| Date | Platform | Status | Proof Link | Notes |
| --- | --- | --- | --- | --- |
| 2026-06-11 | Production SEO/GEO health | Passed | https://www.safejson.dev | Site-side quick wins are live; external citations are the next bottleneck |
| 2026-06-12 | Google Search Console sitemap | Success | `/sitemap.xml` in GSC | Submitted sitemap discovered 24 pages; status successful |
| 2026-06-12 | Bing Webmaster sitemap | Processing | `https://www.safejson.dev/sitemap.xml` | Known sitemaps: 1; errors: 0; warnings: 0; total URLs discovered: 24 |
| 2026-06-12 | IndexNow | Submitted | `npm run indexnow` | Submitted 24 sitemap URLs; IndexNow returned 200 OK |

## Weekly Execution Checklist

1. Run `npm run growth:check`.
2. Check Google Search Console indexing screenshots and Bing Webmaster status if available.
3. Pick one SEO/GEO content improvement and one distribution action.
4. Update `public/llms.txt` and `public/llms-full.txt` if product facts changed.
5. Run `npm run lint` and `npm run build` before code/content deploys.
6. Commit, push, and verify Vercel production.
7. Submit IndexNow when indexable pages changed.
8. Add external submission proof links to this tracker.

## This Week's Priority Order

1. Submit AlternativeTo.
2. Submit SaaSHub.
3. Publish DEV.to article.
4. Create GitHub feedback thread.
5. Publish LinkedIn founder post.
6. Prepare Product Hunt draft, but do not launch until the profile, screenshots, and first-user feedback are stronger.

## Decision Rules

- If the site is still not indexed, prioritize crawl/index proof over more copywriting.
- If pages are indexed but impressions are low, add external mentions and target narrower long-tail pages.
- If impressions exist but clicks are low, rewrite titles and meta descriptions.
- If clicks exist but Pro trials are low, strengthen tool-page CTAs and Pro gating copy.
- If Pro trials exist but purchases are low, improve pricing proof, checkout clarity, and license activation support.
