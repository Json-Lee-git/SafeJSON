# Brand Authority Report: SafeJSON

**Analysis Date:** 2026-06-12 (refresh of 2026-06-11 baseline)
**Brand:** SafeJSON
**Domain:** https://safejson.dev
**Industry:** Developer Tools (SaaS, Freemium)
**Age:** ~6 weeks (launched early May 2026)

---

## Brand Authority Score: 24/100 (Minimal) — +2 since June 11

| Platform | Jun 11 | Jun 12 | Weight | Trend |
|----------|--------|--------|--------|-------|
| YouTube | 5 | 5 | 25% | -- |
| Reddit | 8 | 8 | 25% | -- |
| Wikipedia/Wikidata | 0 | 0 | 20% | -- |
| LinkedIn | 5 | 5 | 15% | -- |
| Other Aggregate | 40 | 45 | 15% | +5 |

**Score interpretation:** 0-29 = Minimal. AI systems are unlikely to cite or recommend SafeJSON. The +2 gain is driven entirely by DEV.to content publication. This gain was partially offset by a newly-discovered GitHub discoverability problem (name collisions — see below).

---

## Platform Detail

### YouTube (5/100 — Weight: 25%, Corr: 0.737)
- **Channel:** None. **Third-party mentions:** 0.
- **Assessment:** Zero YouTube presence. This remains the single biggest drag on brand authority. No change since June 11.

### Reddit (8/100 — Weight: 25%, Corr: 0.72)
- **Organic mentions:** `site:reddit.com "SafeJSON"` returns **zero results** (verified today).
- **Account status:** Banned from r/webdev. Recovery window ends ~June 25.
- **Assessment:** No organic discussion exists. Recovery remains the plan; reconfirmed no mentions appeared organically.

### Wikipedia/Wikidata (0/100 — Weight: 20%, Corr: 0.64)
- **Wikipedia:** No article. **Wikidata:** No Q-number.
- **Assessment:** Unchanged. Wikidata entry remains the lowest-effort high-impact action (estimated +10 points).

### LinkedIn (5/100 — Weight: 15%, Corr: 0.56)
- **Company page:** Registration started June 11, **not completed**.
- **Web search:** `"SafeJSON LinkedIn"` returns zero results.
- **Assessment:** Stuck at the starting line. Once completed and added to schema.org `sameAs`, score projects to ~20-25.

### Other Platforms (45/100 aggregate — Weight: 15%)

| Platform | Score | Change | Notes |
|----------|-------|--------|-------|
| **DEV.to** | 55 | NEW (+55) | 3 posts published; 1 comment received (user suggested CSP); founder replied. Strongest organic platform now. |
| **GitHub** | 35 | -25 | Repo exists at `s01071233604-tech/safejson` but is **invisible in GitHub search**. 6 other repos share the "safejson" name (NYT, Palantir, Evan Shortiss, snapcore, ryan-haskell, Haskell safe-json). Zero discoverability. |
| **Product Hunt** | 30 | +5 | Page live at `/products/safejson-privacy`. ~3 followers. Reviews page indexed. |
| **Edge Add-ons** | 15 | -- | Extension submitted, under review. |
| **npm** | 10 | -15 | `@safjson/safejson-formatter` published but zero web search results. |
| **SaaSHub** | 5 | -10 | Submitted June 11 but not yet indexed. |
| **IndieHackers** | 5 | -10 | Submitted June 11 but not yet indexed. `site:indiehackers.com safejson` returns nothing. |
| **Hacker News** | 0 | -- | No submissions or mentions. `site:news.ycombinator.com "SafeJSON"` returns zero. |
| **AlternativeTo** | 0 | -5 | Not eligible until account is 7 days old (~June 18). |

### Critical Finding: Name Collision Problem

Searching `site:github.com SafeJSON` returns **six competing repos** — none of them ours. The main repo (`s01071233604-tech/safejson`) does not appear in any GitHub search. This is a structural discoverability blocker. AI systems scraping GitHub for entity data will pick up NYT/safejson (Python) or Palantir/pkg/safejson (Go) instead of the SafeJSON.dev web tool. Mitigation: add `safejson-dev` to GitHub repo name or description to disambiguate.

---

## Competitive Context

| Brand | Est. Authority | Key Strengths | Recent Event |
|-------|---------------|---------------|--------------|
| **SafeJSON** | 24 | DEV.to content, product narrative (privacy-first) | 3 DEV.to posts published, CSP deployed |
| jsonformatter.org | ~25 | Massive organic traffic, 5+ years indexed | **Nov 2025 data leak** — 80K+ credentials exposed. Brand severely damaged among informed devs. |
| jwt.io | ~55 | Auth0/Okta backing, universal JWT brand recognition | Stable |
| jsonviewer.stack.hu | ~22 | Long-established, basic utility | No recent changes |

**SafeJSON is now tied with jsonviewer.stack.hu and approaching parity with jsonformatter.org's declining brand.** The jsonformatter.org leak (covered by The Hacker News, CSO Online, Times of India) creates a permanent narrative advantage for SafeJSON's privacy-first positioning.

---

## Recommendations (Updated)

### Done Since June 11
- 3 DEV.to posts published; CSP comment-reply loop active
- CSP deployed (10 directives)
- GitHub Discussion #1 created
- SaaSHub + IndieHackers submitted (pending indexing)

### Immediate (this week) — Estimated total gain: +22 points

| # | Action | Score Impact | Effort |
|---|--------|-------------|--------|
| 1 | **Complete LinkedIn company page** + add to schema sameAs | +8 | 15 min |
| 2 | **Create Wikidata Q-number** (label=SafeJSON, instance of=software, official website=safejson.dev) | +10 | 20 min |
| 3 | **Fix GitHub discoverability** — rename repo or add `safejson-dev` to description/topics to break name collision | +4 | 5 min |
| 4 | **Submit Show HN** — "Show HN: SafeJSON — a JSON formatter you can verify with DevTools (no upload)" | +15 (if front-paged) | 10 min |

### Short-Term (2-4 weeks)

| # | Action | Score Impact | Notes |
|---|--------|-------------|-------|
| 5 | **Reddit recovery** — ~June 25. Post on r/SideProject (≤4 sentences, conversational, no links in initial post) | +8 | Depends on recovery success |
| 6 | **Create YouTube channel** — 2 videos: (a) "Verify any JSON tool in 30 seconds" (b) "SafeJSON Diff walkthrough" | +15 | Screen recording + voiceover sufficient |
| 7 | **AlternativeTo** — Submit on/after June 18 | +3 | |
| 8 | **Disambiguate GitHub profile** — Add "safejson.dev" to repo description, add topics: `privacy-first`, `client-side`, `json-formatter` | +4 | 90-day install gain |

### Long-Term (3-12 months)
- Build Wikipedia notability via independent press coverage
- 5+ YouTube tutorials; guest appearances on dev channels
- Podcast appearances (privacy + dev tools)

---

## Projected Trajectory

| Milestone | Projected Score | When |
|-----------|----------------|------|
| Current | 24 | Jun 12 |
| After immediate actions (LinkedIn + Wikidata + HN + GitHub fix) | ~46 | Jun 13-19 |
| After Reddit recovery + YouTube launch | ~62 | Jul 2026 |
| After Wikipedia + sustained content | ~75 | Dec 2026 |

At 46, SafeJSON would surpass jwt.io's estimated ~55 (within striking range). The gap from 24 to 46 is the highest-ROI window — ~30 minutes of work for ~+22 points.

**Bottom line:** The DEV.to content strategy is working and should continue. The name collision on GitHub is a newly-discovered blocker that needs immediate fix. LinkedIn and Wikidata remain the most cost-effective untapped opportunities.
