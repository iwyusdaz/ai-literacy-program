# Agent review — ai-literacy-program

Reviewer: separate AI reviewer agent (fresh context), 2026-10-26. Limitation: the reviewer may share the same underlying model as the author. This is not human or educator review.

**Method:** cognitive walkthrough of the key learner tasks as the personas would experience them; heuristic evaluation (Nielsen's 10) against the live site (https://iwyusdaz.github.io/ai-literacy-program/) and repo sources; structured review using `evaluation/human-protocol/review-form.md`; targeted content-quality probes; axe spot-check on 3 live URLs; Playwright keyboard spot-check on the live interactive and quiz. Live checks were performed 2026-10-26. (Note: the live Pages site intermittently served "404 Site not found" for valid URLs twice during this review and resolved on retry — infrastructure, not a repo defect.)

**Scope read in full:** README.md, DECISIONS.md, STATUS.md, all docs/ content pages, design documentation, assessment artifacts (`items.json`, `quiz.js`, quiz HTML), interactive (`index.html`, `script.js`, README), `evaluation/METHODS.md`, `evaluation/run-simulations.mjs`, `evaluation/run-review-panel.mjs`, `evaluation/lib/env.mjs`, `evaluation/tests/keyboard-tests.mjs`, `evaluation/results/*` placeholders, research notes and sources.

---

## 1. Cognitive walkthrough

### Task A — Workplace (Lena persona): complete Module 2, take the scenario quiz, use the job aid

**Path and step counts.** Home → "Start the workplace track" → Module 2: 2 clicks, both links descriptive ("Checking outputs"). Module 2 is ~950 words across 7 chunks; at B1 speed with the practice details opened, the "~20 minutes" budget is plausible. Practice ("find the errors") works with native `<details>` — keyboard-operable, answers reveal on demand. Job aid is linked inline from Module 2 §3 ("it is on the job aid you can keep open all day") and from the track page — 1 click from where it is first needed.

**Can the target user complete it? Yes.** The scenario-first structure, the worked example table, and the "Pattern to remember" line give a low-prior-knowledge reader a clear route. The five-step check appears as a mermaid diagram (renders as a raw code block on the Pages build) with a text summary immediately below — the summary carries the content, but the code block itself is noise for a B1 reader (see Finding 5) and causes the 320px reflow failure (Finding 1).

**Where they stumble:**
1. **Quiz feedback references option letters that are not displayed.** On a wrong answer the live region says, e.g., "✗ Not quite — the better answer is option B." (verified live). The rendered options are radio inputs with text only — no A/B/C/D labels are shown or exposed to AT. The learner must count options to find "option B". (Finding 3.)
2. **Q6 wording can be defended two ways** (see Finding 4): the stem asks what "comes FIRST" using the job aid, and the keyed answer is "check every number", while the taught order is Claim (1) → Numbers (2). Distractors are weak enough that only one answer is *best*, but a careful learner notices the tension.
3. On completion the quiz works well: results summary appears, focus moves to it, per-objective rows link back to the right module for re-reading (verified live).

**Job aid used alone (Lena at the moment of need):** the page stands alone completely — five imperative checks with one-line criteria, a "Situation → Your move" pattern table, the incident rule ("Already pasted something prohibited? Stop, report today"), and a print tip. No module knowledge required; it explicitly says the policy is the fictional Northwind one and to adapt it. No stumbles.

### Task B — School (Mr. Daniels persona): teach Lesson 1 from the teacher guide, run the next-word interactive

**Path and step counts.** Teacher: School track index → Teacher guide (linked first on the track page, correctly) → Lesson 1 → print recording sheet → open interactive in a tab. The one-minute prep checklist covers exactly this. Lesson 1 has a verbatim hook script, timed parts (10 + 15 min), a "point to land", discussion questions with target answers, exit-ticket criteria, a no-devices variant, and differentiation. The misconception table pre-answers the five most likely student questions. **A non-specialist can teach this without improvising technical content — this is the strongest artifact in the repo.**

**Interactive as a student (Ayo persona):** verified live by keyboard — Tab order is skip link → breadcrumbs → starter select → Generate → Reset → slider → probability table; each Enter adds exactly one word; the `role="status"` region announces "Generated word 3: 'kept'. Sentence so far: …" (word count correct after the fix recorded in the evaluation report); the probability table renders 10 rows with visible % text and marks the chosen row; arrow keys move the slider and the visible value updates ("1.1"); Reset clears and re-enables. The end-state message ("The model has reached the end of what it learned for this sentence. Press Reset…") is honest and teaches the right lesson. Operation ≈ 11 keyboard interactions for the recording-sheet task; no mouse required.

**Where they stumble:**
1. The Lesson 1 **no-devices variant** draws board bars for "cold, fame, bus" — `fame` and `bus` are not in the interactive's probability table for that starter (which has ball/rebound/corner/flag/cold/trophy). Pedagogically harmless, but a teacher who runs both versions may get "why isn't *fame* in the computer's list?" (Finding 10.)
2. Nothing else: the recording-sheet questions match what the interactive actually shows, and the unplugged fallback genuinely works on paper.

---

## 2. Heuristic evaluation (Nielsen's 10) — live site

Severity scale 0 = no problem, 4 = catastrophic.

| # | Heuristic | Severity | Evidence |
|---|---|---|---|
| 1 | Visibility of system status | **1** | Good: "Loading questions…" status; interactive announces "Generated word 3: 'kept'. Sentence so far: …" (verified live); quiz results focus moves to the summary. Deduction: no visible A/B/C/D on quiz options, so "the better answer is option B" is status the user cannot directly map to the UI (Finding 3). |
| 2 | Match between system and real world | **2** | Workplace language, traffic-light metaphor, logistics scenarios all fit. Deduction: raw mermaid code blocks (Modules 1–4) are developer-speak for a B1 audience; the text summaries carry the meaning but the code blocks undermine the plain-language promise on the Pages build (Finding 5). |
| 3 | User control and freedom | **0** | Reset (interactive), Start over (quiz reload), skip links, back links on every page; answers can be changed before finishing. |
| 4 | Consistency and standards | **1** | Traffic-light colors always paired with words (🟢 Permitted / 🟡 Restricted / 🔴 Prohibited) — not color-alone. Correctness is ✓/✗ text, not color-alone (verified live). Deduction: the invisible option-letter inconsistency above; several correct-option feedbacks begin with "Correct.", producing "✓ Correct. Correct. …" (Finding 8). |
| 5 | Error prevention | **0** | Job aid, traffic-light rule, incident path, and quiz distractors all restate the taught rule at the decision point. |
| 6 | Recognition rather than recall | **0** | Feedback ties each miss back to the module section; results table links by objective; job aid is the external memory. |
| 7 | Flexibility and efficiency of use | **0** | Skip links, native controls, short modules, printable handouts, unplugged fallbacks. |
| 8 | Aesthetic and minimalist design | **1** | Modules are tight (844–1,187 words; all under the 1,500-word budget). Deduction: the mermaid code blocks again; otherwise disciplined. |
| 9 | Help users recognize, diagnose, recover from errors | **0** | Per-option feedback is exemplary; the quiz fetch-failure message ("Open this page through the website… not as a file:// URL") anticipates the most likely real error. |
| 10 | Help and documentation | **0** | Teacher guide, job aid, misconception table, "if a student asks X, say Y" support — all present and used consistently. |

**Not covered by Nielsen but found and more severe than any of the above:** WCAG 1.4.10 Reflow fails on the four workplace module pages at 320 CSS px (Finding 1).

---

## 3. Structured review form (completed)

### Part 1 — Scores

| Dimension | Score | One-line reason |
|---|---|---|
| Clarity (could the target audience follow it?) | **4 / 5** | B1 claim credible (Flesch–Kincaid ≈ 6.9–8.5, median sentence 11–13 words, modules 844–1,187 words); deductions for raw mermaid blocks on B1 pages and the invisible option-letter mismatch in quiz feedback. |
| Accuracy (are AI/policy claims correct and sourced?) | **5 / 5** | Article 4 characterization (measures; no required individual level; Art. 26 separation) and AILit domain names (Engage/Create/Manage/Shape — independently re-verified against ailiteracyframework.org during this review) are correct and cited with access dates; the one imprecision found is the Q6 "comes FIRST" elision (Finding 4). |
| Usefulness (does practice match the objectives?) | **5 / 5** | Every objective has matched practice and assessment; quiz items rehearse exactly the taught decisions; the job aid is genuinely usable at the moment of need; teacher guide is teachable as written. |
| Completeness (gaps a learner would notice?) | **4 / 5** | All 12 objectives assessed; framework gaps stated honestly. Deductions: content-page reflow not covered by any test (Finding 1), VoiceOver pass still outstanding (disclosed), PDF job aid deferred (documented decision D4). |

### Part 2 — Findings (ranked)

| # | Location | Severity | Issue | Suggested change |
|---|---|---|---|---|
| 1 | `docs/workplace/module-1…4` (live Pages build); README "Accessibility" bullet; `evaluation/tests/keyboard-tests.mjs` `testReflow()` | **Major** | WCAG 1.4.10 Reflow fails at 320 CSS px on all four workplace modules (live-measured: Module 2 = 332 px horizontal overflow from the mermaid code block; Module 3 = 263 px from the traffic-light/practice table; Module 4 = 187 px; Module 1 = 61 px). The scripted reflow test covers only the interactive and quiz ("both pages"); the README bullet "reflow verified at 320 CSS px (400% zoom at 1280)" reads as site-wide. Mobile access is an explicit constraint for this audience. | Add `overflow-x: auto` wrappers (or responsive tables) for `pre`/`code` and wide tables in the content CSS; extend `testReflow()` to all content pages; correct the README bullet to say what was actually covered; re-run and record. |
| 2 | `docs/design/evaluation-report.md` §1, `evaluation/METHODS.md` method 4, README evaluation-status line | **Major** | Honesty-chain coherence: the README mandated status line says "agent-based design reviews are complete", but the evaluation report still says "Scheduled post-build — Pending" and METHODS.md #4 says "scheduled". Now that this review exists, the chain is inconsistent until updated. | Mark method 4 "Done" in METHODS.md with the date and pointer to `evaluation/agent-review.md`; replace the report §1 "Scheduled post-build" row with the review result and add a "changes made because of the Agent review" list (the review-form sign-off requires transferring findings to the revision log). |
| 3 | `docs/assessment/scenario-quiz/quiz.js` (`onAnswer` verdict text) and quiz rendering | Moderate | Wrong-answer feedback says "the better answer is option B", but options have no visible letters (radio + text only), so the learner must count to find option B; screen-reader users get no letter either. Verified live. | Prefix each option label with a visible letter ("A.", "B.", …) at render time, or replace the letter with the correct option's text in the verdict line. |
| 4 | `docs/assessment/scenario-quiz/items.json` Q6 | Moderate | Stem asks which check "comes FIRST"; the keyed answer is "Check every number…" and its feedback says "the job aid order starts with claims and numbers" — but the taught order (job aid §1–2, Module 2 §3) is Claim first, Numbers second. A rigorous learner can defensibly argue "check every claim" should be first; feedback elides the difference. | Reword the correct option to "Run the job aid in order — for a summary, that means every claim and every figure against the source" (or change the stem to "what does the job aid have you do with the numbers, and before what?"). |
| 5 | `docs/workplace/module-1…4` mermaid blocks (Pages rendering) | Minor | On the Pages build the three/four mermaid diagrams render as raw code blocks (`C1["1. Claim…"] --> C2…`). The text summaries below them carry the content (decision D10 is honest about this), but for a B1 audience the code block is noise and is the cause of the Module 1/2 overflow in Finding 1. | Keep mermaid in design docs; for B1 modules, either wrap the code block in a `<details>` ("Show the diagram source") or drop mermaid and keep only the text summary/steps list. |
| 6 | `docs/interactives/next-word/README.md` "Accessibility notes" | Minor | README says the probability table "sits in a scrollable `role="region"`"; `index.html` actually uses `role="group"` (changed after the axe `landmark-unique` fix, per evaluation report §4.1). Doc is stale relative to code. | Update the README line to `role="group"`. |
| 7 | `evaluation/METHODS.md` §2 task list | Minor | Claims "5 Enter presses = 5 words (step count)" as a verified invariant; live spot-check at default settings had a sentence end after 4 words (honest end-state; generation disables until Reset). The test itself handles this correctly; the METHODS bullet overstates it. | Reword: "each Enter adds exactly one word until the honest end-of-sentence state, from which Reset is one press." |
| 8 | `items.json` several correct options (Q2, Q5, …) + `quiz.js` verdict prefix | Minor | Rendered feedback reads "✓ Correct. Correct. Text drafting…" — duplicated because option feedback begins with "Correct." and quiz.js prepends "✓ Correct. ". | Strip the leading "Correct." from `items.json` feedback strings (or drop the prefix in quiz.js). |
| 9 | `docs/design/framework-mapping.md` school table, "Create with AI 4" row | Minor | Row claims "Lesson 4 touches citing AI use in the final project" (●), but the student-facing final-project brief and planner never ask students to cite their AI use. Micro-inflation of coverage. | Either add a "cite any AI help" line to the final-project brief (it fits the honesty tone) or mark Create 4 as ○ with a one-line reason. |
| 10 | `docs/school/lesson-1-how-ai-makes-text.md` "No devices" section | Minor | Unplugged board example uses thin bars for "cold, fame, bus"; `fame` and `bus` are not in the interactive's probability table for that starter. A teacher running both versions may face the question "why isn't *fame* in the computer's list?" | Align the example words with the interactive's table, or add "(the paper game and the computer use different example words — same idea)" to the prep note. |

### Part 3 — Specific probes

1. **Are all 12 quiz items unambiguous — exactly one defensible answer each?** Yes, with two caveats. Q6 is the one real tension ("comes FIRST" vs. taught Claim→Numbers order — Finding 4; the distractors are still clearly wrong, so only one answer is *best*). Q4's option text says "a factual error plus an unverifiable claim" while its feedback labels both parts "unverified/unverifiable" — defensible, but tighten the pairing (the fabricated conversation is the unverifiable claim; the delivery promise is the unverified factual claim). Distractors across the set are plausible, teachable mistakes — this is a genuinely strong item set. One test-wiseness note: Q10's correct option is markedly longer than its distractors; acceptable for a formative quiz, worth shortening when the item analysis runs.
2. **Is any module over 1,500 words or over its ~20-minute budget?** No. Measured: Module 1 ≈ 997, Module 2 ≈ 951, Module 3 ≈ 844, Module 4 ≈ 1,187, job aid ≈ 348 (excluding frontmatter/tables/code). All within budget at B1 reading speed.
3. **Does any page overclaim (compliance, certification, learning gains, human testing)?** No. "Designed to support" discipline holds everywhere checked (README, index, about, needs analysis, framework mapping, modules, quiz results: "This is practice feedback, not a certificate"). No learning-gain, statistical, or "validated with users" claims anywhere. The Article 4 "does not require any specific individual level" caveat is correctly restated.
4. **Does the job aid stand alone?** Yes, completely (see Task A).
5. **Is the teacher guide usable by a non-specialist without improvising?** Yes — misconception table with scripted responses, exact timings, prep checklist, answer keys, unplugged fallbacks, and the no-judgment rules for personal AI use (see Task B).
6. **Are fictional elements labeled clearly wherever they appear?** Yes — checked on: index ("Honest labels you will see here"), personas ("All personas are fictional"), all four modules ("Northwind is fictional"), module 3 rule ("fictional, for teaching"), performance task (dedicated "Honesty label" block), quiz `items.json` note, job aid footer, needs analysis status note.

**Sign-off**

- Findings transferred to the evaluation report revision log: **N — not yet; the report still lists the Agent review as "Scheduled post-build". Transferring these findings is required (Finding 2).**
- Major findings blocking publication: (1) content-page reflow failure (Finding 1); (2) evaluation-status reconciliation (Finding 2). Neither requires redesign; both are small, concrete fixes.

---

## 4. Content-quality probes (builder-flagged)

### 4.1 `docs/design/alignment-matrix.md`
**Pass.** All 8 workplace and 4 school objectives map to content, practice, at least one assessment item, and a final-named AILit competence. Reverse check: all 12 quiz items are mapped (Q1→W1.1; Q2–Q3→W1.2; Q4–Q5→W2.1; Q6→W2.2; Q7–Q8→W3.1; Q9→W3.2; Q10–Q11→W4.1; Q12→W4.2); no orphan items, no unassessed objectives. The performance task and final project rows cover the cross-cutting objectives. No gaps found.

### 4.2 `docs/assessment/scenario-quiz/items.json`
**Pass with two notes.** Each item has exactly one `correct: true` option; the math/logic of every scenario checked out (Joris's 312 vs. 813 damaged parcels; the 240-CV funnel argument in Q10; Q12's signal mapping — "signals 1, 2 and 5" correctly matches Module 4's list: affects a person / at scale / legal-safety). Distractors are the plausible mistakes each persona would actually make, and per-option feedback is accurate and teaches the underlying rule rather than restating the key. Notes: Q6 wording (Finding 4), Q4 label slippage, Q10 length asymmetry (Part 3, probe 1).

### 4.3 `docs/design/framework-mapping.md`
**Pass.** Uses the final AILit names (Engage with AI / Create with AI / Manage AI / Shape AI) — independently verified against ailiteracyframework.org during this review; the draft→final rename ("Designing AI" → "Shape AI") is documented in `research/framework-notes.md`. The gaps section is genuinely honest, not papered over: Shape AI entirely out of scope with a stated reason; Engage 5 (energy) and Manage 2 (tool comparison) named as the first additions; Create with AI flagged as light; Basic progression level claimed, nothing higher. Only defect is the micro-inflated Create 4 school row (Finding 9).

### 4.4 `evaluation/run-simulations.mjs`
**Pass.** Persona specs are faithful to `docs/design/personas.md` (names, ages, prior-use patterns, low/high knowledge levels; content-to-persona assignment matches the METHODS.md table; quiz subsets match the alignment matrix). The system prompt correctly forbids learning-gain interpretation and instructs flagging confusing/unrealistic material; the output schema asks for per-item choices with competing-option candidates, confusion points, unrealistic elements, and drop-off — these would plausibly surface the Q6-style ambiguity and the option-letter problem. Appropriate guardrails: placeholder `.env` exits 1 before any network (verified in `lib/env.mjs`); dry-run stubs are headed "DRY RUN – NOT REAL RESULTS"; results tables start as PENDING placeholders (verified in `evaluation/results/`). One limitation worth noting: content is truncated at 12k chars per file, which is sufficient for all persona content files as built.

### 4.5 `docs/school/lesson-3-bias-and-fairness.md`
**Pass.** The constructed output pairs are clearly labeled: the prep note instructs the teacher that the pairs "are **constructed for teaching purposes** — not real model outputs. Present them as such… Do not claim a real AI produced them." The "what to fish for" notes frame the unfairness as a data-pattern problem rather than villainy, which is the right model.

### 4.6 Reading level (B1 claim)
**Pass.** Sampled all four workplace modules with a Flesch–Kincaid estimate (after stripping frontmatter/tables/code): grades ≈ 6.9 / 7.8 / 8.2 / 8.5 — consistent with the "about grade 8 / B1" target. Median sentence length 11–13 words; only 5–7 sentences per module exceed 25 words, and most of those are list-bearing. Technical terms are defined on first use (narrow vs. generative AI, DPO). The claim is credible; the main plain-language threat is the rendered mermaid code (Finding 5), not the prose.

### 4.7 Honesty sweep
**Pass, with one coherence task.** Verified: README evaluation-status line matches the mandated wording and, post-this-review, describes reality; no learning-gain or compliance claims anywhere; AI-assistance disclosure in README ("AI-assistance disclosure" section) and about page; fictional labels pervasive (probe 6 above); PENDING markers intact in `evaluation/results/simulations-summary.md` and `review-panel-summary.md`; no contact placeholders in the repo (by design, per STATUS.md); dry-run stubs labeled and gitignored; `.env.example` placeholders only; no committed `.env`. The one incoherence is the Agent-review status chain (Finding 2), which this file itself resolves once the report and METHODS.md are updated. Also accurate: DECISIONS.md claims (no three.js directory exists; job-aid HTML-as-primary; no interviews-summary; secondary-research.md exists) all match the repo state.

---

## 5. Accessibility spot-check

`node tooling/audit-axe.mjs` against 3 live URLs (home, quiz, interactive), output in `/tmp/review01-axe`:

| URL | Violations | Notes |
|---|---|---|
| Home | 0 (critical=0, serious=0, moderate=0, minor=0) | 1 incomplete: axe `color-contrast` on the active nav-list link — indeterminate due to the theme's background gradient. Needs a one-time manual contrast confirmation (Just the Docs active-link style); not a failure. |
| Scenario quiz | 0 | none |
| Interactive | 0 | none |

Consistent with the builder's reported full audit. **The axe pass does not cover reflow** — see Finding 1, found by measurement, not by axe. No VoiceOver run has happened (disclosed); this review adds no AT-user evidence.

## 6. Keyboard spot-check (live, Playwright)

- **Interactive:** Tab order = skip link → 3 breadcrumb links → starter select → Generate → Reset → slider → probability-table wrapper. 3 Enter presses = 3 words; status region (`role="status"`, `aria-live="polite"`) announced each word with the correct count; chosen row visually marked in the table with % as text ("18.0%", "14.0%"); slider ArrowRight 1.0→1.1 with visible label update; Reset cleared and re-enabled Generate. One sentence ended after 4 words at default temperature (honest end-state message shown).
- **Quiz:** 12 fieldsets/legends render; privacy note present; keyboard Space selection produced feedback in the live region with ✓/✗ text icons (verified both a wrong and a correct pick); answering all 12 revealed the results summary, moved focus to it (`id="results"`), listed 8 by-objective rows, and offered module re-read links.
- **Reflow:** interactive and quiz = 0 px horizontal overflow at 320 px; **workplace modules 1–4 = 61–332 px overflow** (Finding 1). Design docs, teacher guide, lessons, job aid, performance task, final project, handouts: 0 px.

---

## 7. Verdict

This is a strong, coherent build: the objectives→practice→assessment chain is real, the quiz is the best artifact of its type in this reviewer's experience of scenario item sets (per-option feedback that teaches, distractors that are the actual mistakes), the teacher guide does what non-specialist support is supposed to do, the honesty discipline is close to airtight, and the B1/plain-language claim survives measurement. The two blocking items are both small and mechanical: a CSS-level reflow fix on the workplace modules (with the reflow test extended and the README bullet corrected), and the evaluation-status reconciliation now that this review exists. After those, the moderate quiz fixes (option letters, Q6 wording) are the highest-value polish.
