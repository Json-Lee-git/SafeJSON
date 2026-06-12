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
| GitHub Discussion or Issue | User | Done 2026-06-12 | Medium | `OUTREACH-WAVE-001.md` GitHub draft | https://github.com/s01071233604-tech/safejson/discussions/1 | Monitor for developer feedback; reply thoughtfully |
| SaaSHub | User | Public candidate URL provided | Low | `OUTREACH-WAVE-001.md` SaaSHub copy | https://www.saashub.com/safejson-alternatives | Verify in browser after Cloudflare challenge; monitor listing status |
| Indie Hackers | User | Proof URL provided | Medium | `OUTREACH-WAVE-001.md` Indie Hackers copy | https://www.indiehackers.com/product/safejson-2 | Monitor for comments/referrals |
| AlternativeTo | User | Blocked — account must be 7 days old (~June 18) | Low | `OUTREACH-WAVE-001.md` AlternativeTo copy | Listing URL or pending screenshot | Submit on/after June 18 |
| Betalist | User | Blocked — site inaccessible from user's region | Low | `OUTREACH-WAVE-001.md` Betalist copy | Listing URL or pending screenshot | Retry with alternative network or skip |
| Toolify.ai | User | Skipped — paid submission required | Low | N/A | N/A | Skip unless free tier becomes available |
| TAAFT | User | Skipped — paid submission required | Low | N/A | N/A | Skip unless free tier becomes available |
| DEV.to | User | 3 posts live; 1 comment replied by founder | Medium | `OUTREACH-WAVE-001.md` DEV.to draft | Public article URLs | Monitor for further comments; add exact article URLs when available |
| Hacker News | User only | Draft ready | High | `OUTREACH-WAVE-001.md` Show HN draft | HN thread URL | Post manually from a real account; do not repost if it fails |
| Product Hunt | User only | Public candidate URL provided; launch not confirmed | High | `OUTREACH-WAVE-001.md` Product Hunt draft | https://www.producthunt.com/products/safejson-privacy?launch=safejson-privacy | Keep as draft unless launch page is publicly visible and ready |
| Reddit | User only | Banned from r/webdev; recovery window ends ~June 25 | High | `OUTREACH-WAVE-001.md` Reddit recovery draft | Thread/comment URLs | Wait until June 25; post short casual SideProject note |
| LinkedIn founder profile | User only | Not started | Medium | `OUTREACH-WAVE-001.md` LinkedIn draft | Post URL | Publish founder-side launch note |
| LinkedIn company page | User only | In progress (registration started 2026-06-11) | Medium | Product description | Company page URL | Complete registration; add to Person + Organization schema sameAs |
| Edge Add-ons | User | Submitted; under review | Low | Extension listing | Store URL | Wait for review; add listing URL when approved |
| YouTube | User with Codex script help | Not started | Medium | Video script TBD | Video URL | Record DevTools verification demo, 60–120 seconds |
| Wikipedia | User only, later | Not ready | Very high | N/A | N/A | Do not attempt until independent notability coverage exists |

## Proof Log

| Date | Platform | Status | Proof Link | Notes |
| --- | --- | --- | --- | --- |
| 2026-06-11 | Production SEO/GEO health | Passed | https://www.safejson.dev | Site-side quick wins are live; external citations are the next bottleneck |
| 2026-06-11 | SaaSHub | Public candidate URL provided | https://www.saashub.com/safejson-alternatives | URL shape is public; CLI fetch is blocked by Cloudflare, verify in browser |
| 2026-06-11 | Indie Hackers | Proof URL provided | https://www.indiehackers.com/product/safejson-2 | Product page URL provided by user |
| 2026-06-11 | Product Hunt | Public candidate URL provided | https://www.producthunt.com/products/safejson-privacy?launch=safejson-privacy | URL shape is public; CLI fetch is blocked by Cloudflare, verify in browser before launch |
| 2026-06-11 | Edge Add-ons | Submitted, under review | _pending_ | Extension submitted to Edge Add-ons store |
| 2026-06-12 | Google Search Console sitemap | Success | `/sitemap.xml` in GSC | Submitted sitemap discovered 24 pages; status successful |
| 2026-06-12 | Bing Webmaster sitemap | Success | `https://www.safejson.dev/sitemap.xml` | Known sitemaps: 1; errors: 0; warnings: 0; total URLs discovered: 24 |
| 2026-06-12 | GitHub Discussion | Created | https://github.com/s01071233604-tech/safejson/discussions/1 | General feedback thread: "a JSON formatter that lets you verify no pasted-content upload" |
| 2026-06-12 | DEV.to | 3 posts live; 1 comment replied | DEV.to dashboard screenshot | Founder replied to the "CSP as trust signal" comment; monitor for further discussion |
| 2026-06-12 | Content-Security-Policy | Deployed | `npm run growth:check` — CSP check | CSP header live on production; 10 directives including frame-ancestors 'none', connect-src restricted to GA only |
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

1. ~~Verify SaaSHub and Indie Hackers claimed submissions~~ ✓ Proof URLs recorded.
2. ~~Reply to the DEV.to comment~~ ✓ Founder replied 2026-06-12.
3. ~~Create GitHub Discussion feedback thread~~ ✓ https://github.com/s01071233604-tech/safejson/discussions/1
4. Complete LinkedIn company page registration; add to schema sameAs.
5. Publish LinkedIn founder post (draft in `OUTREACH-WAVE-001.md`).
6. Prepare Product Hunt full launch draft (do not launch until profile and visuals are ready).
7. Submit AlternativeTo on/after June 18 (account age requirement).
8. Prepare Reddit recovery post for June 25 (draft in `OUTREACH-WAVE-001.md`).

## Decision Rules

- If the site is still not indexed, prioritize crawl/index proof over more copywriting.
- If pages are indexed but impressions are low, add external mentions and target narrower long-tail pages.
- If impressions exist but clicks are low, rewrite titles and meta descriptions.
- If clicks exist but Pro trials are low, strengthen tool-page CTAs and Pro gating copy.
- If Pro trials exist but purchases are low, improve pricing proof, checkout clarity, and license activation support.
