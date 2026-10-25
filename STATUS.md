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
| axe: interactive + quiz | `node tooling/audit-axe.mjs <urls> --out /tmp/axe-final` | 0 violations (after fixing `landmark-unique`) |
| Keyboard/reflow tests | `node evaluation/tests/keyboard-tests.mjs` | 20/20 PASS |
| Internal links | link-mapping check over docs/**.md (Jekyll .md→.html) | 0 broken (148 links) |
| External links | curl over all 28 unique external URLs | 200s verified; OECD/McKinsey bot-blocked (403/000) — see notes in `research/sources.md`; github.com links 404 until repo publish, resolve after |
| Pipeline dry-run | `node evaluation/run-simulations.mjs --dry-run && node evaluation/run-review-panel.mjs --dry-run` | 92 stub files in `dry-run/`, all headed "DRY RUN – NOT REAL RESULTS", no network |
| Pipeline placeholder-env guard | `cp .env.example .env && npm run eval:pending` | exit 1, clear message, zero network calls; `.env` deleted after test |
| Secrets | `gitleaks detect` | clean (see below for command output) |
| No committed .env | `git log --all --name-only \| grep -E "(^\|/)\.env$"` | nothing found |
| No files > 50MB | `git rev-list --objects --all` size check | none |
| Live Pages build + site | Pages API + curl | verified after publish (see git history / section below) |

## Owner to-do list

1. Add API keys to `.env` (copy `.env.example`), run `npm run eval:pending`, then follow the rerun procedure in `evaluation/METHODS.md` §"Rerun procedure" to refresh status lines.
2. Upload `docs/assets/social-preview.png` in repo Settings → General → Social preview (no API available).
3. Run `evaluation/human-protocol/manual-voiceover-check.md` (15 min) and record results in this file + README accessibility statement.
4. Reviewer agent: run the structured review (`evaluation/human-protocol/review-form.md`) and merge findings into `docs/design/evaluation-report.md`.
5. Optionally run the real-learner pilot using `evaluation/human-protocol/`.
6. Fill the `[Email]` / `[LinkedIn]` placeholders on the profile side (none exist in this repo by design).

## Known limitations (disclosed, not hidden)

- No real learners, no educator/expert review, no VoiceOver run, no daily-AT-user review — all stated in README/METHODS/evaluation report.
- Simulated runs cannot show learning gains even after they run.
- AILit coverage gaps (energy, tool comparison, Shape AI domain) documented in framework-mapping.md.
- McKinsey statistic verified via search (site blocks bots) — flagged in `research/sources.md`.
