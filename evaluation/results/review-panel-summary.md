# Agent-simulated review panel: results

Run date: 2026-11-11 · Method: **agent-simulated review panel, single model** · Performed by: one AI agent (the Kiro build agent working in this repository's workspace), role-playing all three reviewer roles itself. No API pipeline, no second model, no human reviewers.

> **Read this first.** This is an agent review. It is **not** educator review, expert feedback or peer review, and it says nothing about real learners. The same agent played every role, and it may share the model family that drafted the content.

## What was run

- **Reviews:** 12 (3 reviewer roles × 4 target files × 1 model). The original plan was 3 roles × 12 files × at least 2 independent models with cross-model agreement; this smaller run covers one file per artifact type.
- **Roles (role-played, never human):** R1 L&D practitioner lens; R2 accessibility and plain-language lens; R3 curriculum-alignment lens. The focus list for each role is in `evaluation/METHODS.md` §5.
- **Targets:** `docs/workplace/module-2-checking-outputs.md` (module), `docs/workplace/job-aid-verify-before-you-send.md` (job aid), `docs/school/teacher-guide.md` (teacher material), `docs/assessment/scenario-quiz/items.json` (assessment).
- **Output per review:** at most 6 issues (major or minor, tied to a location) and 1 to 5 scores for clarity, accuracy, usefulness and completeness.

## Limitations

1. **Single model, same model.** One agent played all three roles, so the roles are not independent and **no agreement figure is reported**. The original cross-model blind design (two or three different models, page-level overlap and matched issues) could not be reproduced without an API.
2. **Not blind.** The agent had already read the rest of the repository, including the answer key and the earlier agent review, before reviewing.
3. **Scores are one agent's judgment** on a 1 to 5 scale, not a validated rating instrument.

## Reviews completed

| Target | Role | Clarity / Accuracy / Usefulness / Completeness | Issues (major / minor) |
|---|---|---|---|
| Module 2: Checking outputs | R1 L&D practitioner | 4 / 4 / 5 / 4 | 0 / 2 |
| Module 2: Checking outputs | R2 Accessibility and plain language | 4 / 5 / 4 / 4 | 0 / 1 |
| Module 2: Checking outputs | R3 Curriculum alignment | 4 / 4 / 5 / 4 | 0 / 1 |
| Job aid: Verify before you send | R1 L&D practitioner | 5 / 5 / 5 / 4 | 0 / 1 |
| Job aid: Verify before you send | R2 Accessibility and plain language | 5 / 5 / 5 / 5 | 0 / 1 |
| Job aid: Verify before you send | R3 Curriculum alignment | 4 / 4 / 5 / 4 | 0 / 1 |
| Teacher guide | R1 L&D practitioner | 4 / 4 / 5 / 4 | 0 / 1 |
| Teacher guide | R2 Accessibility and plain language | 4 / 4 / 4 / 4 | 0 / 1 |
| Teacher guide | R3 Curriculum alignment | 3 / 3 / 4 / 3 | 1 / 1 |
| Scenario quiz items | R1 L&D practitioner | 4 / 5 / 5 / 4 | 0 / 1 |
| Scenario quiz items | R2 Accessibility and plain language | 4 / 5 / 4 / 4 | 0 / 1 |
| Scenario quiz items | R3 Curriculum alignment | 4 / 4 / 4 / 4 | 1 / 2 |

Totals: 2 major, 14 minor.

## Issues

### Major

1. **Teacher guide, "Answer keys", Lesson 2 (R3).** The key describes a different sample answer ("in 1842 the bridge collapsed twice", a non-existent book, an unverified date) from the Great Wall text that Lesson 2 and the fact-check worksheet actually use. A non-specialist teacher who relies on the guide gets the wrong key. *Suggestion:* replace the Lesson 2 key with the Great Wall key from the worksheet.
2. **Scenario quiz, all items (R3).** The keyed option is the longest option in 11 of 12 items (word counts computed from `items.json`). This is a known test-wiseness cue. *Suggestion:* shorten keyed options or lengthen distractors so length no longer predicts the answer.

### Minor

| # | Target and location | Role | Issue | Suggestion |
|---|---|---|---|---|
| 1 | Module 2 §4, corrected reply | R1 | The reply adds a "10% discount code" that no check covers; a stakeholder would ask who authorized it | Remove the discount or add "if your policy allows it" |
| 2 | Module 2 §4, "Lena's AI draft again" | R1 | The quoted draft includes a €6.90 refund line that Module 1's draft does not have | Align the draft with Module 1, or drop "again" |
| 3 | Module 2 §2, "AI and numbers" | R2 | "Number-shaped text" is a metaphor that may not land at B1 | Add a plain gloss, for example "text that looks like a number" |
| 4 | Module 2 §2, "AI and numbers" | R3 | "Language models do not calculate" is absolute; some assistants call a calculator or run code | "Do not reliably calculate unless a tool does the maths" |
| 5 | Job aid, end | R1 | The "sized to print on one page" claim was not checked in this review | Verify with a print preview and keep or reword |
| 6 | Job aid §3 | R2 | "No source you would show your manager = no source" uses "=" in running text | Write it as a sentence |
| 7 | Job aid §4 | R3 | "Internal figures: approved tools only" can be read against Module 3, where anonymized totals are green | Say "internal, non-anonymized figures" |
| 8 | Teacher guide, intro | R1 | "Every technical answer you might be asked for is in the misconception table" overpromises; for example, the Lesson 2 hook has no key for which Great Fire claims are wrong | Soften the promise or add the hook key |
| 9 | Teacher guide, "Prerequisites and requirements" | R2 | Says one device per pair for Lessons 1 and 2, while Lesson 2 says no devices are needed at any point | Make the two pages agree |
| 10 | Teacher guide, misconception table, row 1 | R3 | "It has no notes, no memory of facts" oversimplifies; models do reproduce many facts from training | "It has no fact list it looks up; facts come out only when they are likely text" |
| 11 | Quiz Q5, option D | R1 | The distractor "ask the AI to confirm" depends on an idea that Module 2 never teaches; only the feedback explains it | Add one sentence to Module 2 §3 step 3 |
| 12 | Quiz Q4 and Q7 stems | R2 | The two longest stems (38 and 37 words) carry the highest reading load at B1 | Split the scenario and the question into two sentences each |
| 13 | Quiz Q4, keyed option | R3 | "A factual error plus an unverifiable claim": the stem establishes two unverified claims, not a factual error; the feedback itself says "unverifiable" and "unverified" | Reword the keyed option to "two claims you cannot verify" |
| 14 | Quiz coverage | R3 | Q1 to Q3 (Module 1) had no simulated persona in this run, so they received no persona-level check | Assign a persona to Module 1 in a future run |

## How these results are used

All 16 issues are listed as **open revision candidates** in `docs/design/evaluation-report.md` §4. None has been applied yet. Revisions, when made, are recorded there and in `DECISIONS.md`.
