# Evaluation methods — what was done, by whom or what, and what it can show

**Read this before trusting any claim in this repository.** Every method is listed with its status (done / not run), who or what performed it, its settings, and the limits of what it can show. The rule everywhere: AI output is labeled with its method and never presented as human judgment.

Repo: `ai-literacy-program` · Site: https://iwyusdaz.github.io/ai-literacy-program/ · Last updated: 2026-11-11

---

## Method inventory

| # | Method | Status | Performed by | Output |
|---|---|---|---|---|
| 1 | Automated accessibility audit (axe-core) | **Done** | axe-core 4.11.1 via `tooling/audit-axe.mjs` (build-time scripted runs) | JSON per page + summary; see below |
| 2 | Scripted task tests (keyboard-only, 320 px, 400% zoom, step counts) | **Done** | Playwright 1.57.0, `evaluation/tests/keyboard-tests.mjs` | Test output in commit history / run log |
| 3 | Manual VoiceOver check | **Script provided, not run** | A human operator; script in `evaluation/human-protocol/manual-voiceover-check.md` | (Guidepup automation unavailable on macOS 27; `ariaSnapshot` structural checks used as fallback) |
| 4 | Structured design review | **Done** (2026-10-26) | Reviewer agent (separate context, did not build the repo), using `evaluation/human-protocol/review-form.md`; full report: `evaluation/agent-review.md` | Verdict + 10 findings; revisions transferred to `docs/design/evaluation-report.md` §4 |
| 5 | Agent-simulated review panel (single model) | **Done** (2026-11-11) | One AI agent role-playing 3 reviewer roles over 4 files (12 reviews); not human, not multi-model | `evaluation/results/review-panel-summary.md` |
| 6 | Agent-simulated learner runs + item analysis (single model) | **Done** (2026-11-11) | One AI agent role-playing 5 personas × 2 levels (10 runs); not human, not multi-model | `evaluation/results/simulations-summary.md` |
| 7 | Real learner pilot (pre/post + performance task + survey + think-aloud) | **Not run** | Would be run by the repo owner with 5–8 adults; full protocol in `evaluation/human-protocol/` | — |
| 8 | Secondary research synthesis (replaces interviews) | **Done** | Build agent, from published surveys/reports with full citations | `research/secondary-research.md`, `research/sources.md` |

## 1. Automated accessibility audit — DONE

- **Tool:** axe-core 4.11.1 (WCAG 2.1 A/AA + best-practice rules) driven by the shared `tooling/audit-axe.mjs`, run against every page served locally.
- **What was checked:** every Jekyll page, the quiz, and the interactive.
- **Standard applied:** critical/serious violations = 0 before publishing (verified during the build; the run log is recorded in `STATUS.md`).
- **What it can show:** rule-based WCAG 2.1 failures detectable from the DOM.
- **What it cannot show:** whether the site is actually usable with a screen reader (use rule 3 and rule 4), readable, or understandable. Automated checks catch a minority of accessibility issues.

## 2. Scripted task tests — DONE

- **Tool:** Playwright 1.57.0 (`evaluation/tests/keyboard-tests.mjs`), run against a local static server.
- **Tasks verified:**
  - Interactive: Tab order reaches starter → Generate → Reset → slider; Enter generates a word and the `aria-live` status announces it; slider arrow keys update the visible value; Reset clears; probability table exposes % as text; **each Enter adds exactly one word until the honest end-of-sentence state, from which Reset is one press** (step count).
  - Quiz: 12 fieldsets render; keyboard (focus + Space) answers produce feedback in a live region; correctness shows a text icon (✓/✗), not color alone; completing all items reveals the by-objective summary and moves focus to it.
  - Reflow: **every page of the site** checked for horizontal scroll at 320 CSS px viewport (the WCAG 1.4.10 equivalent of 400% zoom at 1280) — `testReflow()` in `evaluation/tests/keyboard-tests.mjs` covers the full page list (33 pages), not just the two interactive artifacts. Content pages need a Jekyll build: against a plain static server they are recorded as SKIP, and the full list is verified against the live Pages URL.
- **What it can show:** the flows work without a mouse, at small sizes/zoom, in a predictable number of steps.
- **What it cannot show:** whether a real learner finds the interactive understandable, or how a daily screen-reader user experiences it (see rule 3/7).

## 3. Manual VoiceOver check — script provided, NOT run

- Guidepup/VoiceOver automation does not work on macOS 27 (documented in the workspace TOOLS.md); the build agent therefore made **no VoiceOver claims**.
- **Fallback used now:** Playwright `ariaSnapshot()`-style structural checks (roles, names, live regions) and the scripted keyboard tests above.
- **What remains for a human:** follow `evaluation/human-protocol/manual-voiceover-check.md` (macOS, Cmd+F5), which lists every step and the announcement expected at each step for the interactive and the quiz.
- **Limitation stated:** no review by someone who uses assistive technology daily has happened. That gap is disclosed in the README accessibility statement.

## 4. Structured design review — DONE (Agent review, 2026-10-26)

- **Who:** a **reviewer agent** — a separate agent instance in a fresh context that did not build this repository — using the form in `evaluation/human-protocol/review-form.md` (clarity, accuracy, usefulness, completeness; severity-ranked findings). Full report: **`evaluation/agent-review.md`**.
- **Result (summary):** cognitive walkthrough (Lena + Mr. Daniels tasks), Nielsen-10 heuristic evaluation (all severities ≤ 2), structured review scores Clarity 4/5, Accuracy 5/5, Usefulness 5/5, Completeness 4/5. Verdict: strong, coherent build; two blocking findings — content-page reflow failure (WCAG 1.4.10) on the four workplace modules and the evaluation-status reconciliation — plus 8 smaller findings. **All 10 findings are addressed in the 2026-10-26 revisions** (`docs/design/evaluation-report.md` §4, DECISIONS.md).
- **Label:** this is an **Agent review**. It is not "educator review", not "peer review", and not "expert feedback".
- **Limitation (stated wherever results appear):** the reviewer agent may run on the same underlying model family as the author agent. A model effectively reviewing its own family's output is a structural bias; the single-model panel in §5 does not remove this bias.
- **What it can show:** usability and clarity gaps a careful reader finds. **What it cannot show:** domain expert endorsement, classroom usability, or any "approved by educators" claim.

## 5. Agent-simulated review panel: DONE (2026-11-11, single model)
- **Who:** one AI agent (the Kiro build agent working in this repository's workspace) role-played all three reviewer roles. No API, no second model, no human reviewer. Results: `evaluation/results/review-panel-summary.md`.
- **Reviewer roles (role-played, never human):**
  - R1 L&D practitioner lens: scenario credibility for busy employees; observable objectives and matching practice; job-aid usefulness at the moment of need; likely stakeholder pushback.
  - R2 accessibility and plain-language lens: B1 plain language (long sentences, idioms, jargon); headings and link text; mouse- or color-dependent instructions; cognitive load.
  - R3 curriculum-alignment lens: objective, content and assessment alignment (`docs/design/alignment-matrix.md`); quiz item quality (plausible distractors, one defensible answer, feedback); rubric coverage; honest framework mapping.
- **Scope:** 3 roles × 4 files = 12 reviews, one file per artifact type: Module 2, the job aid, the teacher guide, and the quiz items (`items.json`). Each review lists at most 6 location-tied issues (major or minor) and gives 1 to 5 scores for clarity, accuracy, usefulness and completeness.
- **Result (summary):** scores between 3 and 5 on every dimension; 2 major issues (the teacher-guide Lesson 2 answer key describes a different sample text from the one Lesson 2 uses; the keyed option is the longest option in 11 of 12 quiz items) and 14 minor issues. All are listed as open revision candidates in `docs/design/evaluation-report.md` §4; none has been applied yet.
- **Limitation (stated wherever results appear):** the original design was a blind multi-model panel (two or three independent models, with page-level overlap and matched-issue agreement). That design could not be reproduced without an API. Here one agent played every role, may share the model family that drafted the content, and had already read the repository, so the roles are not independent and **no agreement figure is reported**.
- **What it can show:** gaps a careful reader with each lens finds. **What it cannot show:** expert or educator endorsement, or anything about real learners.
## 6. Agent-simulated learner runs + item analysis: DONE (2026-11-11, single model)
- **Who:** the same AI agent role-played every persona. No API, no second model, no real people. Results: `evaluation/results/simulations-summary.md`.
- **Persona specs (all fictional; full table in `docs/design/personas.md`):**
| ID | Persona | Prior AI use | Low level | High level | Content used | Quiz items |
|---|---|---|---|---|---|---|
| P1 | Lena, 27, customer service agent | daily, uncritical | never considered AI errors | read about hallucinations, no routine | Module 2 + 3 | Q4 to Q9 |
| P2 | Joris, 45, ops planner | occasional, skeptical | trusts summary numbers | checks totals, not citations | Module 2 | Q4 to Q6 |
| P3 | Sofia, 38, HR administrator | low | unaware of tool bias | knows the word, not the mechanism | Module 4 | Q10 to Q12 |
| P4 | Ayo, 15, student | high, fluent | "chatbot knows things" | knows it errs, not why | Lesson 2 + worksheet | none |
| P5 | Mr. Daniels, non-specialist teacher | low to medium | anxious about questions | comfortable, wants timings | Teacher guide + Lesson 1 | none |
- **Runs:** 5 personas × 2 prior-knowledge levels × 1 model = **10 runs** (spec minimum: 8). One pass per run.
- **Procedure per run:** the agent read the actual content files in `docs/` and the assigned items in `items.json`, skimming as the persona would, then recorded: the option the persona would most likely pick, confusion points, items where two options seem defensible, unrealistic scenario elements, and whether the persona would give up and where.
- **Result (summary):** the keyed answer was picked in 22 of 24 item answers (both misses by P1-low, on Q5 and Q6); no persona would give up, with one conditional risk (P4-low at the worksheet's verification step if no sources are available in class); 8 confusion points in the materials. Q1 to Q3 were not answered because no persona is assigned Module 1.
- **Limitations:** single model, so no cross-model comparison; not blind, because the agent could see the answer key in `items.json` and may share the model family that drafted the content. The picked-keyed counts are the agent's judgment of what each persona would pick, **not** item difficulty data.
- **What it can show:** possible wording, alignment and realism problems for readers with a given background. **What it CANNOT show:** learning gains, engagement, transfer, or what real employees, students or teachers would do. This is stated on every results file.
- **Rerun:** repeat the procedure above with the same persona table and record a new dated results file. Running it with a different model, or with real participants (§7), would address the single-model limitation.
## 7. Real learner pilot — NOT RUN (protocol ready)

The complete protocol lives in `evaluation/human-protocol/`: consent text, interview guide (secondary-research context), parallel pre/post forms A and B (6 scenario items each), 5-item survey, think-aloud script, and the review form. Flow: consent → pre-test (A) → Modules 2–3 → post-test (B) → performance task → survey; think-aloud with 2–3 participants. Analysis: median pre/post, per-item results, rubric distributions, quotes; **no significance claims with n < 10**. The consent text excludes minors; any school-track testing with under-16s would require guardian consent and local approval first.

**When real data exists:** add it under a dated section in `docs/design/evaluation-report.md`, labeled as human data, and update the README evaluation status line. Nothing in this repository may present simulated or agent output as human data.

## Updating results
1. Record new runs of §5 or §6 in `evaluation/results/` with the run date and who or what performed them.
2. Update the status table in this file, the README evaluation status line, `docs/design/evaluation-report.md` and `STATUS.md`, keeping the same honesty rules (simulated runs still cannot show learning gains).
3. Re-run `npm run test:keyboard` and the axe audit if any content files changed as a result.
## Environment
- No API keys or model endpoints are used anywhere in this repository. The evaluations in §5 and §6 were run by an agent in its own working session.
- Shared pinned tooling (Playwright 1.57.0, axe-core 4.11.1) resolves from the workspace root `node_modules`; nothing is duplicated in this repo.
