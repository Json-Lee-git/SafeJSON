# Claude Agent Capability Profile

> Use this to route tasks: what this agent can do reliably, what needs
> review, and what should go to a stronger model.

---

## Model

DeepSeek V4 Pro, running inside Claude Code (Anthropic's agent harness).

**SWE-bench Verified:** ~80% (vs Claude Opus 4.7 at 88%, Fable 5 at 95%)
**Known weakness:** Multi-step autonomous reasoning. Will confidently produce
wrong answers on complex tasks if not constrained.

---

## Tier 1 — Reliable (闭眼能做, <1% error rate)

These tasks can be delegated without review:

- Run predefined checks: `npm run lint`, `npm run build`, `npm run growth:check`, `npm run growth:playwright`
- Update growth tracker documents (`growth/SUBMISSION-TRACKER.md`, etc.)
- Create new pages from existing templates (e.g. `/vs/*` comparison pages —
  same structure, different data)
- Bulk URL replacements across multiple files
- Add hyperlinks to existing text
- Update sitemap entries
- Add items to existing lists, tables, or navigation components
- Update JSON-LD schema fields (sameAs, name, description)
- Create structured markdown documents (checklists, plans, reports)
- Git operations: commit, push, status, diff

**Rule:** Task has a precise, narrow scope with a clear input → output mapping.

---

## Tier 2 — Needs Review (能做但得检查, ~5–15% need correction)

These tasks the agent CAN do but you should spot-check:

- Write README, FAQ, blog post, or marketing copy drafts. Structure is usually
  right. Occasional unnatural phrasing or privacy-wording violations.
- Add small features to existing pages (a new section, a new FAQ, a new card)
- Update configuration files (next.config.ts, CSP, sitemap) — logic is sound
  but edge cases can be missed
- Create new growth strategy documents from research
- SEO metadata optimization (titles, descriptions)
- Write platform submission copy (AlternativeTo, SaaSHub descriptions)

**Rule:** Task requires generating new text or small code additions. The agent
gets it right 85-95% of the time. The remaining 5-15% needs a human eye for
tone, accuracy, and privacy-wording compliance.

---

## Tier 3 — Should NOT Do (不该让做, error rate unacceptable)

Route these to a stronger model (Claude Opus, Fable 5, or human):

- Multi-file architecture refactors
- Complex bug diagnosis requiring deep codebase understanding
- Anything requiring the agent to *decide what to build* rather than *build
  what you specified*
- Security-sensitive changes (authentication, payment, data handling)
- Performance optimization requiring profiling and measurement
- Any task where the instructions are vague and the agent needs to fill in
  significant gaps

**Rule:** Task requires deep reasoning, autonomous decision-making, or
understanding of complex system interactions.

---

## Behavioral constraints

The agent has been configured with these rules (via `AI-BRIEF.md`):

- Opens with the result, not a plan narration ("Done. Fixed X" not "Let me
  check X")
- Runs verification after every code change without being asked
- Never uses "zero network requests" or "no tracking" (these are wrong;
  correct phrasing is "no pasted-content upload", "no pasted-content
  analytics")
- Does not redesign the site UI, change colors, or alter the visual style
- Commits atomically — one fix per commit
- Runs `npm run lint && npm run build` after any `src/` change
- Runs `npm run growth:check` after any `growth/` or `public/` change

---

## Available tools

The agent has full filesystem access to the SafeJSON project at
`C:\Users\cacar\safejson\` and can:

- Read, edit, write, and delete files
- Run bash commands (npm, git, node, curl)
- Search the web (WebSearch)
- Invoke skills (GEO, gstack QA, marketing-skills)
- Spawn subagents for parallel work
- Access the project's growth documentation in `growth/`

---

## Recommended task routing

When giving this document to GPT, ask it to:

1. Read the task description
2. Classify it as Tier 1, 2, or 3 based on this profile
3. If Tier 1: output the exact prompt to send to the agent
4. If Tier 2: output the prompt + a 1-line note about what to review after
5. If Tier 3: say "this should go to [specific stronger model or human]"
   and explain why in one sentence
