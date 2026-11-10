---
title: Evaluation report
parent: Design documentation
nav_order: 8
description: What was measured, what it shows and cannot show, and the revisions it triggered. Honest statuses for done and not-run methods.
---

# Evaluation report

**Read with [evaluation plan](evaluation-plan.html) and `evaluation/METHODS.md`** (the full method inventory, prompts, persona specs and rerun procedure live there). This report states results *as of 2026-11-11* (build date 2026-10-25; agent-review revision round 2026-10-26; agent-simulated panel and learner runs 2026-11-11). Everything here is labeled by method: nothing in this project has been tested with real learners, and no claim below says otherwise.

*Last reviewed: 2026-11-11*

## 1. What we measured (and the status of each measurement)

| Question | Method | Status | Result |
|---|---|---|---|
| Do the interactive and quiz work keyboard-only, at small sizes/zoom, in few steps? | Scripted task tests (Playwright 1.57.0, `evaluation/tests/keyboard-tests.mjs`) | **Done** — 51/51 checks pass (reflow now on every page) | See §2 |
| Do the pages pass automated WCAG 2.1 A/AA checks? | axe-core 4.11.1 audit of every page | **Done** — 0 critical/serious violations | See §2 |
| Is the design clear, accurate, useful, complete? | **Agent review** (reviewer agent, fresh context, `evaluation/human-protocol/review-form.md`) | **Done** (2026-10-26) — full report: `evaluation/agent-review.md` | See §2 |
| What gaps do reviewers with different lenses find? | **Agent-simulated review panel**, one AI agent playing 3 reviewer roles over 4 files (12 reviews, single model) | **Done** (2026-11-11) | 2 major, 14 minor issues; see §2 and `evaluation/results/review-panel-summary.md` |
| Where might learners stumble; are any quiz items ambiguous? | **Agent-simulated persona runs**, one AI agent playing 5 personas × 2 knowledge levels (10 runs, single model) | **Done** (2026-11-11) | 8 confusion points, 2 item-wording issues; see §2 and `evaluation/results/simulations-summary.md` |
| Was it usable and relevant? (perception) | 5-item survey + think-aloud | **Not run** — protocol ready in `evaluation/human-protocol/` | — |
| Do learners make better verify/paste/escalate decisions? | Pre/post parallel forms A/B | **Not run** — protocol ready | — |
| Can learners correct a flawed AI document? | Performance task scored with the rubric | **Not run** — task and rubric published | — |
| Do staff verify outputs at work? (transfer) | Spot-check audit of AI-assisted tickets | **Not attempted** — described as a plan only | — |
| Fewer incidents? (payoff) | Incident logs | **Not attempted** — described as a plan only | — |

## 2. Results from the completed methods

### Scripted task tests — 51/51 checks; reflow verified on every page

Keyboard-only flows verified with Playwright against the interactive and the quiz:

- Tab order reaches the skip link, all controls, and moves logically between them; Enter/Space activate controls; the slider responds to arrow keys with a visible value update.
- Each Enter press on "Generate next word" adds exactly one word; the `aria-live` status announces the chosen word and full sentence; Reset clears (one keyboard press).
- Quiz: 12 fieldset questions render; keyboard answers produce feedback in an `aria-live="polite"` region; correctness shows a text icon (✓/✗), not color alone; completing all items reveals the by-objective summary and moves focus to it.
- Reflow: no horizontal scroll at 320 CSS px width (= 400% zoom at 1280) — **now checked on every page of the site** (`testReflow()` in `evaluation/tests/keyboard-tests.mjs` covers the full page list), not just the two interactive artifacts. See §4 for the reflow failure this uncovered.

**Can show:** the flows work without a mouse, at small sizes/zoom, with stable step counts. **Cannot show:** learner comprehension, motivation, or how a daily screen-reader user experiences the pages (no VoiceOver run — see below).

### Agent review — done 2026-10-26

A separate reviewer agent (fresh context; may share the author's underlying model — stated limitation) performed a cognitive walkthrough, a Nielsen-10 heuristic evaluation, the structured review form, and live keyboard/axe spot checks. Full report: `evaluation/agent-review.md`. Verdict: strong, coherent build; Clarity 4/5, Accuracy 5/5, Usefulness 5/5, Completeness 4/5; all heuristic severities ≤ 2. Two blocking findings (content-page reflow failure; evaluation-status reconciliation) and 8 smaller ones — **all addressed in the revisions below**.

### Agent-simulated review panel and learner runs: done 2026-11-11 (single model)
One AI agent role-played three reviewer roles (L&D practitioner, accessibility and plain language, curriculum alignment) over Module 2, the job aid, the teacher guide and the quiz items, and role-played the five fictional personas at two prior-knowledge levels each. Main findings:
- **Teacher guide, Lesson 2 answer key (major):** it describes a different sample answer (a bridge collapse in 1842) from the Great Wall text that Lesson 2 and the worksheet use.
- **Quiz length cue (major):** the keyed option is the longest option in 11 of 12 items (measured from `items.json`).
- **Item wording:** Q4's keyed option names a "factual error" the stem does not establish; Q5's "ask the AI to confirm" distractor relies on an idea Module 2 never teaches.
- **Materials:** continuity and realism gaps in Module 2 §4 (the "again" draft, an unchecked discount code), unexplained terms in Module 4 ("works council", "Art. 26 territory"), and small timing or counting gaps in Lessons 1 and 2.

**Limitations:** the original design was a blind comparison of two or three independent models; it could not be reproduced without an API. One agent played every role and persona, could see the answer key, and may share the model family that drafted the content, so no agreement figure is reported and the item counts are not difficulty data. **Cannot show:** learning, expert endorsement, or what real learners would do.

### Automated accessibility audit — 0 critical/serious violations

axe-core (WCAG 2.1 A/AA + best practice) over the quiz and interactive pages: 0 critical, 0 serious, 0 moderate violations after fixes (§4). The Jekyll-rendered content pages were audited on the live Pages build after publishing (no local Jekyll in the build environment — same rules, same standard).

**Can show:** rule-based WCAG failures detectable from the DOM. **Cannot show:** whether the site is usable with a screen reader in practice. A **manual VoiceOver check has not been performed** (automation unavailable on macOS 27); the step-by-step script with expected announcements is provided in `evaluation/human-protocol/manual-voiceover-check.md`. **No review by someone who uses assistive technology daily has happened** — stated as a limitation in the README.

## 3. What this evidence cannot show

- **No learning gains.** No real learner has taken any part of this program. The agent-simulated runs cannot show learning, because the agent already knows the content.
- **No usability endorsement.** The Agent review and the agent-simulated panel find gaps; they are not user research and not educator or expert endorsement.
- **No transfer or payoff evidence.** LTEM Tiers 6–8 remain described plans, honestly marked not-attempted.
- **No compliance claim.** The program is *designed to support* Article 4 AI literacy measures; it certifies nothing, and Article 4 requires no specific individual level.

## 4. Revisions made because of evidence (so far)

Build-time evidence (automated tests + scripted task runs) already triggered real revisions; each is visible in the commit history:

1. **Landmark duplication fixed** (axe: `landmark-unique`, moderate): the interactive's scrollable probability table used `role="region"` duplicating its section's accessible name — changed to `role="group"`. Re-audit: 0 violations.
2. **Off-by-one announcement fixed** (scripted test caught the status announcing "Generated word 2" for the first word): status now counts the word just generated.
3. **Interactive model depth fixed** (sentence-length sanity check showed sentences ending after 1–2 words because unknown continuations fell to a 45%-END generic fallback): added shared continuation tables for common words and clamped end-of-sentence probability at 12%; average generated sentence length went from ~2.3 to ~7.9 words across all six starters.
4. **Test correctness fixes**: the step-count test now handles the honest "end of what it learned" state (Reset with keyboard) instead of failing; the 400%-zoom check was corrected to the WCAG 1.4.10 definition (320 CSS px) after a CSS-zoom emulation produced uninterpretable metrics.

5. **Content-page reflow fixed** (Agent review, Finding 1, Major): the four workplace modules overflowed at 320 CSS px by 61–332 px (rendered Mermaid code blocks on Modules 1–2, wide tables on Modules 3–4). Fixes: the modules now carry the same content as numbered lists instead of Mermaid blocks (also Finding 5 — no more developer-speak code on the Pages build); `docs/_includes/head_custom.html` adds scroll-in-place CSS (`overflow-x: auto`) for code blocks and wide tables site-wide as a safety net; `testReflow()` in the scripted tests now covers **all 33 pages** (was 2); the README accessibility bullet now states exactly what is covered.
6. **Evaluation-status chain reconciled** (Agent review, Finding 2, Major): `evaluation/METHODS.md` method 4 and this report's §1/§2 mark the Agent review **done** (2026-10-26) with a pointer to `evaluation/agent-review.md`; DECISIONS.md records the round (D13).
7. **Quiz option letters made visible** (Finding 3, Moderate): options render a visible A./B./C./D. prefix, so wrong-answer feedback ("the better answer is option B") points at something on screen.
8. **Q6 realigned with the taught order** (Finding 4, Moderate): the stem now asks what you do with the numbers in a summary, and the keyed option states the job-aid sequence (claims first, then every figure) — it no longer suggests "numbers first".
9. **Feedback de-duplication** (Finding 8, Minor): the leading "Correct." was stripped from option feedback (quiz.js already prefixes "✓ Correct. "), removing the "✓ Correct. Correct." doubling.
10. **Smaller doc fixes** (Findings 6, 7, 9, 10, Minor): next-word README updated to the actual `role="group"`; METHODS.md step-count bullet softened to the honest end-of-sentence behavior; the final-project brief and planner now ask students to cite their AI help (making the framework-mapping Create-4 row accurate); Lesson 1's unplugged example words now match the interactive's probability table.

**Open revision candidates from the agent-simulated panel and learner runs (2026-11-11, not yet applied):**
- Teacher guide: replace the Lesson 2 answer key with the Great Wall key (major); soften "every technical answer is in the misconception table"; align the device requirement with Lesson 2; refine "no memory of facts".
- Quiz: remove the length cue across items (major); reword Q4's keyed option; teach "asking the same AI is not verification" in Module 2 (Q5); shorten the Q4 and Q7 stems.
- Module 2: align the "again" draft with Module 1; remove or qualify the discount code; qualify "do not calculate"; gloss "number-shaped text".
- Module 3 and the job aid: say whether name + order number alone is red; say "internal, non-anonymized figures".
- Module 4, Lessons 1 and 2: explain "works council" and "Art. 26"; fix the Step 3 feedback reference; give timings for the no-devices rounds; fix "all four facts" and add a hook key; allow "no evidence found" as the expected verdict for the invented book.

Full lists: `evaluation/results/review-panel-summary.md` and `evaluation/results/simulations-summary.md`.

## 5. Decision this evaluation supports

The completed evidence supports publishing v1.0 as a **design artifact with verified mechanics** (flows, accessibility rules). It does not support effectiveness claims, and none are made. The next evidence step, in order of value: (1) act on the open revision candidates above, (2) a small real pilot using `evaluation/human-protocol/`.
