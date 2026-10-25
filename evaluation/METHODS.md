# Evaluation methods — what was done, by whom or what, and what it can show

**Read this before trusting any claim in this repository.** Every method is listed with its status (done / pending / not run), who or what performed it, its settings, and the limits of what it can show. The rule everywhere: AI output is labeled with its method and never presented as human judgment.

Repo: `ai-literacy-program` · Site: https://iwyusdaz.github.io/ai-literacy-program/ · Last updated: 2026-10-25

---

## Method inventory

| # | Method | Status | Performed by | Output |
|---|---|---|---|---|
| 1 | Automated accessibility audit (axe-core) | **Done** | axe-core 4.11.1 via `tooling/audit-axe.mjs` (build-time scripted runs) | JSON per page + summary; see below |
| 2 | Scripted task tests (keyboard-only, 320 px, 400% zoom, step counts) | **Done** | Playwright 1.57.0, `evaluation/tests/keyboard-tests.mjs` | Test output in commit history / run log |
| 3 | Manual VoiceOver check | **Script provided, not run** | A human operator; script in `evaluation/human-protocol/manual-voiceover-check.md` | (Guidepup automation unavailable on macOS 27; `ariaSnapshot` structural checks used as fallback) |
| 4 | Structured design review | **Done** (2026-10-26) | Reviewer agent (separate context, did not build the repo), using `evaluation/human-protocol/review-form.md`; full report: `evaluation/agent-review.md` | Verdict + 10 findings; revisions transferred to `docs/design/evaluation-report.md` §4 |
| 5 | Multi-model AI review panel | **Pending — requires API key** | `evaluation/run-review-panel.mjs` with MODEL_A/MODEL_B (+optional MODEL_C) | `evaluation/results/review-panel-summary.md` (placeholder until run) |
| 6 | AI-simulated learner runs + item analysis | **Pending — requires API key** | `evaluation/run-simulations.mjs` with MODEL_A/MODEL_B | `evaluation/results/simulations-summary.md` (placeholder until run) |
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
- **Limitation (stated wherever results appear):** the reviewer agent may run on the same underlying model family as the author agent. A model effectively reviewing its own family's output is a structural bias; the multi-model panel (rule 5) exists partly to mitigate this.
- **What it can show:** usability and clarity gaps a careful reader finds. **What it cannot show:** domain expert endorsement, classroom usability, or any "approved by educators" claim.

## 5. Multi-model AI review panel — PENDING: requires API key

- **Pipeline:** `evaluation/run-review-panel.mjs`.
- **Reviewer roles (model-role-played, never human):** R1 L&D practitioner lens, R2 accessibility & plain-language lens, R3 curriculum-alignment lens.
- **Models:** at least 2 (`MODEL_A`, `MODEL_B`; `MODEL_C` optional), configured via `.env` (OpenAI-compatible chat endpoints). Both required models review all roles so agreement is measurable per role.
- **Settings:** temperature 0.4; JSON response; each review reads the actual file content (up to 20k chars) and returns at most 6 severity-tagged issues + 1–5 scores.
- **Agreement:** page-level Jaccard overlap of flagged pages, and matched issues (same page + severity, tolerant token-overlap ≥ 0.3) — reported as heuristics, not psychometric inter-rater reliability.
- **Prompts:** the role focus text and JSON schema are embedded in `run-review-panel.mjs` (functions `ROLES`, `SCHEMA`, `buildPrompt`) — the exact strings sent to the models.
- **What it can show:** gap-finding with model diversity; agreement between independent models.
- **What it cannot show:** expert endorsement; anything about real learners.
- **Run when keys exist:** `npm run eval:pending` (or `npm run eval:panel`).

## 6. AI-simulated learner runs + item analysis — PENDING: requires API key

- **Pipeline:** `evaluation/run-simulations.mjs`.
- **Persona specs (all fictional; full table in `docs/design/personas.md`):**

| ID | Persona | Prior AI use | Low level | High level | Content used | Quiz items |
|---|---|---|---|---|---|---|
| P1 | Lena, 27, customer service agent | daily, uncritical | never considered AI errors | read about hallucinations, no routine | Module 2 + 3 | Q4–Q9 |
| P2 | Joris, 45, ops planner | occasional, skeptical | trusts summary numbers | checks totals, not citations | Module 2 | Q4–Q6 |
| P3 | Sofia, 38, HR administrator | low | unaware of tool bias | knows the word, not the mechanism | Module 4 | Q10–Q12 |
| P4 | Ayo, 15, student | high, fluent | "chatbot knows things" | knows it errs, not why | Lesson 2 + worksheet | — |
| P5 | Mr. Daniels, non-specialist teacher | low–medium | anxious about questions | comfortable, wants timings | Teacher guide + Lesson 1 | — |

- **Runs:** 5 personas × 2 prior-knowledge levels × 2 models = **20 runs** (spec minimum: 8).
- **System prompt (verbatim, from `run-simulations.mjs`):** `You are helping evaluate the clarity of a learning design by role-playing a learner. This is a SIMULATION for item-quality analysis: - You are NOT a real person and your answers are NOT evidence of learning. - Role-play the persona faithfully, including their misconceptions. Do not invent knowledge the persona would not have. - Flag anything confusing, ambiguous, or unrealistic IN THE MATERIALS — that is the main output. - Answer in strict JSON only, matching the requested schema.`
- **Content:** the pipeline reads the actual module/lesson files from `docs/` (up to 12k chars each) plus the relevant `items.json` entries — simulations see exactly what learners would see.
- **Settings:** temperature 0.4 (default in `chat()`), JSON output, per-run raw JSON saved.
- **What it can show:** item-quality problems (ambiguous items, obviously-attractive distractors), confusing steps, unrealistic scenario elements, likely drop-off points.
- **What it CANNOT show:** learning gains, engagement, or transfer. AI personas often already know the content; simulated pre/post differences would be meaningless. This is stated on every results artifact.
- **Run when keys exist:** `npm run eval:pending` (or `npm run eval:simulations`).

## 7. Real learner pilot — NOT RUN (protocol ready)

The complete protocol lives in `evaluation/human-protocol/`: consent text, interview guide (secondary-research context), parallel pre/post forms A and B (6 scenario items each), 5-item survey, think-aloud script, and the review form. Flow: consent → pre-test (A) → Modules 2–3 → post-test (B) → performance task → survey; think-aloud with 2–3 participants. Analysis: median pre/post, per-item results, rubric distributions, quotes; **no significance claims with n < 10**. The consent text excludes minors; any school-track testing with under-16s would require guardian consent and local approval first.

**When real data exists:** add it under a dated section in `docs/design/evaluation-report.md`, labeled as human data, and update the README evaluation status line. Nothing in this repository may present simulated or agent output as human data.

## Rerun procedure (after adding API keys)

1. Copy `.env.example` → `.env` at the repo root; fill `MODEL_A_*` and `MODEL_B_*` (`MODEL_C_*` optional). Never commit `.env`.
2. Run `npm run eval:pending`. Both pipelines validate the env first: any missing or `YOUR_`-placeholder value exits with code 1 and zero network calls.
3. Pipelines write raw outputs to `evaluation/results/<pipeline>/` and regenerate `evaluation/results/simulations-summary.md` and `evaluation/results/review-panel-summary.md` from them.
4. **Manual refresh (the only auto-generation beyond the summaries):**
   - Update the status table in **this file** (`evaluation/METHODS.md`): mark rules 5 and 6 "Done", add run dates and model names, and paste the headline agreement/item-analysis numbers.
   - Update the **README evaluation status line** (top of `README.md`) to reflect the new state, keeping the same honesty rules (simulated runs still cannot show learning gains).
   - Update `docs/design/evaluation-report.md` with the findings and any revisions they triggered, and `STATUS.md`.
5. Re-run `npm run test:keyboard` and the axe audit if any content files changed as a result.

## Environment

- `.env.example` documents the slot format (OpenAI-compatible chat completion endpoints; MODEL_A/B/C). Placeholders only — a real `.env` is never committed (enforced by `.gitignore` and pre-publish `gitleaks` checks).
- Shared pinned tooling (Playwright 1.57.0, axe-core 4.11.1, dotenv 17.3.1) resolves from the workspace root `node_modules`; nothing is duplicated in this repo.
