# STATUS — ai-literacy-program

Last updated: **2026-11-11** (v1.0.0 build, agent-review revision round, and agent-simulated evaluation complete)

## Current state

| Item | Status |
|---|---|
| Repository | github.com/iwyusdaz/ai-literacy-program (created and pushed 2026-10-25) |
| Live site | https://iwyusdaz.github.io/ai-literacy-program/ (GitHub Pages, main branch, `/docs`, Jekyll + Just the Docs v0.12.0 pinned) |
| Workplace track (4 modules + job aid) | Complete |
| School track (teacher guide, 4 lessons, 4 handouts, final project) | Complete (built in v1.0, not deferred) |
| Assessment (12-item scenario quiz, performance task, rubric) | Complete |
| Interactive (next-word, vanilla JS) | Complete, axe-clean, 20/20 scripted keyboard checks |
| three.js embedding-space experiment | Skipped by decision (DECISIONS.md D1) |
| Evaluation: axe audit | Done — 0 critical/serious (local on standalone pages; full-page audit re-run on live Pages build) |
| Evaluation: scripted task tests | Done — 20/20 (keyboard, reflow, step counts, live regions) |
| Evaluation: Agent review (reviewer agent, structured form) | **Done 2026-10-26** — `evaluation/agent-review.md` (10 ranked findings); all fixed the same round, see the log below |
| Evaluation: agent-simulated learner runs + item analysis | **Done 2026-11-11** (one AI agent, single model, 10 runs): `evaluation/results/simulations-summary.md` |
| Evaluation: agent-simulated review panel | **Done 2026-11-11** (one AI agent, single model, 12 reviews; 2 major and 14 minor issues, open): `evaluation/results/review-panel-summary.md` |
| Evaluation: real learner pilot | Not run — full protocol ready in `evaluation/human-protocol/` (adults only) |
| Manual VoiceOver check | Not run — script provided in `evaluation/human-protocol/manual-voiceover-check.md` (Guidepup unavailable on macOS 27) |
| Social preview image | Generated and committed at `docs/assets/social-preview.png` (1280×640); **uploading it in Settings → General is an owner task** (no API) |

## Verification log (2026-10-25)

| Check | Command | Result |
|---|---|---|
| axe: interactive + quiz (local) | `node tooling/audit-axe.mjs <urls> --out /tmp/axe-final` | 0 violations (after fixing `landmark-unique`) |
| axe: all 33 site pages (live Pages build) | `node tooling/audit-axe.mjs <all live urls> --out /tmp/axe-live*` | **0 critical/serious on every page**; fixed en route: unlabeled GFM checkboxes (project-planner, critical) and blank corner table headers (needs-analysis, personas) — re-audited clean at commit ce7e300 |
| Keyboard/reflow tests | `node evaluation/tests/keyboard-tests.mjs` (local) and `… https://iwyusdaz.github.io/ai-literacy-program` (live) | Local: 20/20 + 31 content-page SKIPs (no Jekyll build); **live after the fix: 51/51 PASS on all 33 pages** |
| Internal links (source mapping) | link-mapping check over docs/**.md (Jekyll .md→.html) | 0 broken (148 links) |
| Live linkcheck | `node tooling/linkcheck.mjs https://iwyusdaz.github.io/ai-literacy-program/ --max 200` | **38 pages, 0 broken links** (fixed en route: interactive README.html → README.md) |
| External links | curl over all 28 unique external URLs | 200s verified; OECD/McKinsey bot-blocked (403/000) — see notes in `research/sources.md`; github.com links resolve post-publish |
| Secrets | `gitleaks detect --no-git` (re-run after the review round) | no leaks found |
| No committed .env | `git log --all --name-only \| grep -E "(^\|/)\.env$"` | nothing found |
| No files > 50MB | `git rev-list --objects --all` size check | none (largest: LICENSE 18.7 KB) |
| Pages build | `gh api repos/iwyusdaz/ai-literacy-program/pages/builds/latest` | `built`, no errors; site live at first build |
| Repo hygiene | description + 7 topics set via `gh repo edit --add-topic` | instructional-design, ai-literacy, curriculum-design, eu-ai-act, accessibility, oer, assessment-design |

## Agent review + revision round (2026-10-26)

A separate reviewer agent (fresh context) ran the structured review; full report: `evaluation/agent-review.md`. Verdict: strong, coherent build (Clarity 4/5, Accuracy 5/5, Usefulness 5/5, Completeness 4/5; all heuristic severities ≤ 2). Findings → revisions (all committed 2026-10-26; details in `docs/design/evaluation-report.md` §4 and DECISIONS.md D13):

1. **Reflow (Major, blocking):** workplace modules 1–4 overflowed at 320 CSS px (61–332 px; rendered Mermaid blocks and wide tables) — Mermaid replaced by numbered lists, scroll-in-place CSS added via `docs/_includes/head_custom.html`; `testReflow()` extended to all 33 pages. Live pre-fix 46/51 (also caught lesson 3, missed by the review); post-fix **51/51 live**.
2. **Evaluation-status chain (Major, blocking):** METHODS.md §4, evaluation report §1/§2 and this file now mark the review done with a pointer to the report; findings transferred into the report's revision log.
3. **Quiz feedback (Moderate):** options carry visible A./B./C./D. letters ("the better answer is option B" is now findable — verified live); Q6 realigned with the taught Claim→Numbers order; "Correct. Correct." duplication removed.
4. **Smaller fixes (Minor):** next-word README role corrected to `group`; METHODS.md step-count wording softened to the honest end state; final-project brief + planner ask students to cite their AI help; lesson 1 unplugged example words aligned with the interactive's table.

Verification for the round: extended keyboard/reflow suite local 20/20 (+31 SKIPs) → live **51/51**; axe re-audit of the 4 modules + quiz + interactive: 0 violations; `gitleaks detect --no-git`: clean; Pages build for commit 022bcee: built, no errors.

## Agent-simulated evaluation round (2026-11-11)
The owner decided that no repository should need an API key (DECISIONS.md D14). The API pipelines, `.env.example` and their npm scripts were removed. Instead, one AI agent (the Kiro build agent, single model, no API) ran 10 simulated learner runs and a 12-review panel in this workspace. Results: `evaluation/results/simulations-summary.md` and `evaluation/results/review-panel-summary.md`; 2 major and 14 minor issues plus 8 confusion points, all open (not yet applied). The planned blind cross-model comparison could not be reproduced and is stated as a limitation.
Verification for the round (local, before push): `npm run test:keyboard` against a static server of `docs/`: 20/20 (+31 content-page SKIPs, no Jekyll build); axe on the interactive and quiz: 0 violations; `git grep -i "api key\|API_KEY\|eval:pending"`: only notes that the keys were removed (CHANGELOG, DECISIONS D14, METHODS "Environment").
## Owner to-do list

1. Decide which open revision candidates from the agent-simulated runs to apply (`docs/design/evaluation-report.md` §4).
2. Upload `docs/assets/social-preview.png` in repo Settings → General → Social preview (no API available).
3. Run `evaluation/human-protocol/manual-voiceover-check.md` (15 min) and record results in this file + README accessibility statement.
4. Reviewer agent: run the structured review (`evaluation/human-protocol/review-form.md`) and merge findings into `docs/design/evaluation-report.md`.
5. Optionally run the real-learner pilot using `evaluation/human-protocol/`.
6. Fill the `[Email]` / `[LinkedIn]` placeholders on the profile side (none exist in this repo by design).

## LinkedIn post draft ([HUMAN] reviews and posts; from plan Phase 6)

> Most workplace AI training teaches prompt tricks. The research says that's backwards: 75% of knowledge workers already use generative AI at work — mostly self-taught — and corporate training still skews toward productivity over risk (Interface EU). Meanwhile, EU AI Act Article 4 obliges employers to take measures to support staff AI literacy — explicitly without mandating any specific level for any individual.
>
> So I designed a small, complete AI literacy program and published it as open content: what the critical decisions actually are (Can I trust this output? May I paste this data? Who decides?), taught through scenarios — not definitions.
>
> One design finding I keep coming back to: the deliverable that matters most may be the one-page job aid ("Verify before you send"), not the four modules. Verification is an infrequent, error-prone task — performance support at the moment of need beats memorization.
>
> Live program: https://iwyusdaz.github.io/ai-literacy-program/ · Design decisions and evaluation methods (including what the evidence can't show) are in the repo. Content CC BY 4.0, code MIT.

## Known limitations (disclosed, not hidden)

- No real learners, no educator/expert review, no VoiceOver run, no daily-AT-user review — all stated in README/METHODS/evaluation report.
- Agent-simulated runs cannot show learning gains, and they used one model only (the planned cross-model comparison was not reproduced).
- AILit coverage gaps (energy, tool comparison, Shape AI domain) documented in framework-mapping.md.
- McKinsey statistic verified via search (site blocks bots) — flagged in `research/sources.md`.
