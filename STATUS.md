# STATUS — ai-literacy-program

Last updated: **2026-10-25** (v1.0.0 build complete)

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
| Evaluation: Agent review (reviewer agent, structured form) | Scheduled post-build — form ready at `evaluation/human-protocol/review-form.md`; findings go to the evaluation report |
| Evaluation: simulated learner runs + item analysis | **PENDING: requires API key** (`evaluation/run-simulations.mjs`; dry-run tested) |
| Evaluation: multi-model review panel | **PENDING: requires API key** (`evaluation/run-review-panel.mjs`; dry-run tested) |
| Evaluation: real learner pilot | Not run — full protocol ready in `evaluation/human-protocol/` (adults only) |
| Manual VoiceOver check | Not run — script provided in `evaluation/human-protocol/manual-voiceover-check.md` (Guidepup unavailable on macOS 27) |
| Social preview image | Generated and committed at `docs/assets/social-preview.png` (1280×640); **uploading it in Settings → General is an owner task** (no API) |
| Pending-pipeline guardrails | Verified: placeholder `.env` → exit 1, zero network; `--dry-run` → stubs in `dry-run/` headed "DRY RUN – NOT REAL RESULTS" |

## Verification log (2026-10-25)

| Check | Command | Result |
|---|---|---|
| axe: interactive + quiz (local) | `node tooling/audit-axe.mjs <urls> --out /tmp/axe-final` | 0 violations (after fixing `landmark-unique`) |
| axe: all 33 site pages (live Pages build) | `node tooling/audit-axe.mjs <all live urls> --out /tmp/axe-live*` | **0 critical/serious on every page**; fixed en route: unlabeled GFM checkboxes (project-planner, critical) and blank corner table headers (needs-analysis, personas) — re-audited clean at commit ce7e300 |
| Keyboard/reflow tests | `node evaluation/tests/keyboard-tests.mjs` (local) and `… https://iwyusdaz.github.io/ai-literacy-program` (live) | **20/20 PASS on both** |
| Internal links (source mapping) | link-mapping check over docs/**.md (Jekyll .md→.html) | 0 broken (148 links) |
| Live linkcheck | `node tooling/linkcheck.mjs https://iwyusdaz.github.io/ai-literacy-program/ --max 200` | **38 pages, 0 broken links** (fixed en route: interactive README.html → README.md) |
| External links | curl over all 28 unique external URLs | 200s verified; OECD/McKinsey bot-blocked (403/000) — see notes in `research/sources.md`; github.com links resolve post-publish |
| Pipeline dry-run | `node evaluation/run-simulations.mjs --dry-run && node evaluation/run-review-panel.mjs --dry-run` | 92 stub files in `dry-run/`, all headed "DRY RUN – NOT REAL RESULTS", no network |
| Pipeline placeholder-env guard | `cp .env.example .env && npm run eval:pending` | exit 1, clear message, zero network calls; `.env` deleted after test |
| Secrets | `gitleaks detect --no-git` | no leaks found |
| No committed .env | `git log --all --name-only \| grep -E "(^\|/)\.env$"` | nothing found |
| No files > 50MB | `git rev-list --objects --all` size check | none (largest: LICENSE 18.7 KB) |
| Pages build | `gh api repos/iwyusdaz/ai-literacy-program/pages/builds/latest` | `built`, no errors; site live at first build |
| Repo hygiene | description + 7 topics set via `gh repo edit --add-topic` | instructional-design, ai-literacy, curriculum-design, eu-ai-act, accessibility, oer, assessment-design |

## Owner to-do list

1. Add API keys to `.env` (copy `.env.example`), run `npm run eval:pending`, then follow the rerun procedure in `evaluation/METHODS.md` §"Rerun procedure" to refresh status lines.
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
- Simulated runs cannot show learning gains even after they run.
- AILit coverage gaps (energy, tool comparison, Shape AI domain) documented in framework-mapping.md.
- McKinsey statistic verified via search (site blocks bots) — flagged in `research/sources.md`.
