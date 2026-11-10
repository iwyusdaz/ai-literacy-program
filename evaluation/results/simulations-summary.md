# Agent-simulated learner runs: results

Run date: 2026-11-11 · Method: **agent-simulated personas, single model** · Performed by: one AI agent (the Kiro build agent working in this repository's workspace), role-playing every persona itself. No API pipeline, no second model, no real people.

> **Read this first.** These are simulated runs by one AI agent. They are **not** human data and **not** real-learner results, and they **cannot show learning gains** (the agent already knows the content). They only point at places where the materials or quiz items may be unclear.

## What was run

- **Runs:** 10 (5 fictional personas × 2 prior-knowledge levels × 1 model). The original plan was 20 runs across 2 independent models; that cross-model design was not reproduced (see Limitations).
- **Personas and content:** the same specs as `docs/design/personas.md` and the table in `evaluation/METHODS.md` §6. For each run the agent read the actual content files from `docs/` and, where assigned, the quiz items from `docs/assessment/scenario-quiz/items.json`.
- **Per run, the agent recorded:** the option each persona would most likely pick, confusion points in the materials, items where two options seem defensible, unrealistic scenario elements, and whether the persona would give up.

## Limitations (apply to every number below)

1. **Single model, same model.** One agent played all ten runs. The original design compared two independent models to see whether they stumbled in the same places; that comparison was not possible, so no cross-model agreement is reported.
2. **Not blind.** The agent could see the answer key (each option in `items.json` carries a `correct` flag) and may share the model family that drafted the content. The "picked keyed answer" counts are the agent's judgment of what each persona would pick. They are not item difficulty data.
3. **One pass per run.** No repeated sampling, so there is no measure of run-to-run variation.
4. **Q1 to Q3 were not answered**, because no persona is assigned Module 1 content (same as the original plan).

## Per-run overview

| Run | Persona (fictional) | Level | Content read | Items answered (keyed / total) | Would give up? | Main confusion point |
|---|---|---|---|---|---|---|
| P1-low | Lena, 27, customer service agent | low | Module 2, Module 3 | 4 / 6 (Q5 picked option D, Q6 picked option B) | No | Module 2 §4 says "Lena's AI draft again", but this draft adds a refund sentence not in Module 1's draft |
| P1-high | Lena, 27, customer service agent | high | Module 2, Module 3 | 6 / 6 | No | The corrected reply in Module 2 §4 offers a "10% discount code" that none of the five checks covers |
| P2-low | Joris, 45, operations planner | low | Module 2 | 3 / 3 | No | "Language models do not calculate" reads as absolute; a skeptic asks about assistants that run a calculator or code |
| P2-high | Joris, 45, operations planner | high | Module 2 | 3 / 3 | No | None beyond P2-low |
| P3-low | Sofia, 38, HR administrator | low | Module 4 | 3 / 3 | No | Module 4 practice uses "works council" and "Art. 26 territory" without explaining them |
| P3-high | Sofia, 38, HR administrator | high | Module 4 | 3 / 3 | No | Module 4 says bias may hide in scores but gives no way to check for it |
| P4-low | Ayo, 15, student | low | Lesson 2, fact-check worksheet | (no quiz items) | Possibly, at worksheet Step 3, if no sources are available in class | Without devices, the class cannot prove the 1998 book "does not exist"; the best honest verdict is "can't tell" |
| P4-high | Ayo, 15, student | high | Lesson 2, fact-check worksheet | (no quiz items) | No | The hook asks about "all four facts", but the Great Fire passage holds five checkable claims |
| P5-low | Mr. Daniels, non-specialist teacher | low | Teacher guide, Lesson 1 | (no quiz items) | No | The misconception answer "it has no notes, no memory of facts" leaves him without a reply when a student says "but it knows the capital of France" |
| P5-high | Mr. Daniels, non-specialist teacher | high | Teacher guide, Lesson 1 | (no quiz items) | No | Lesson 1 "No devices" adds Rounds 3 and 4 but gives no timing for them inside the 25-minute main activity |

## Item analysis (agent-simulated, not difficulty data)

| Item | Objective | Runs that answered | Picked keyed answer | Notes from the runs |
|---|---|---|---|---|
| Q1 to Q3 | W1.1, W1.2 | 0 | n/a | Not covered by any persona's content |
| Q4 | W2.1 | 4 (P1, P2) | 4 / 4 | The keyed option calls the sentence "a factual error plus an unverifiable claim", but the stem only shows two **unverified** claims; P1-low could not say which part is the "factual error" |
| Q5 | W2.1 | 4 (P1, P2) | 3 / 4 | P1-low picked D ("ask the AI to confirm"). Module 2 never says that asking the same AI is not verification; only the item feedback says so |
| Q6 | W2.2 | 4 (P1, P2) | 3 / 4 | P1-low picked B ("check only the numbers that look odd"), a plausible choice for someone who trusts fluent output |
| Q7 | W3.1 | 2 (P1) | 2 / 2 | P1-high weighed D ("prohibited, but only because the address is a home address") as partly right; the feedback already handles it as a near miss |
| Q8 | W3.1 | 2 (P1) | 2 / 2 | No issues found |
| Q9 | W3.2 | 2 (P1) | 2 / 2 | Matches Module 3 §5 directly |
| Q10 | W4.1 | 2 (P3) | 2 / 2 | Matches the Module 4 opening scenario directly |
| Q11 | W4.1 | 2 (P3) | 2 / 2 | No issues found |
| Q12 | W4.2 | 2 (P3) | 2 / 2 | No issues found |

**Pattern found by measurement, not by role-play:** in 11 of the 12 items the keyed option is also the longest option (word counts computed from `items.json` on 2026-11-11; Q2 is the exception). A test-wise learner could pick the longest option and score well without the judgment the quiz is meant to check.

## Confusion points and unrealistic elements (all runs, deduplicated)

- **Module 2 §4 continuity:** "Lena's AI draft again" quotes a longer draft (with a €6.90 refund) than the one in Module 1.
- **Module 2 §4 corrected reply:** the "10% discount code" is a new commitment nobody checked or authorized, inside an example meant to show only claims you can stand behind.
- **Module 2 §2:** "language models do not calculate" is stated without the exception of tools that do the arithmetic.
- **Module 3 §2 vs §4:** the combination rule names "a name and address", but practice item 2 (name + order number, no address) is red. A low-knowledge reader may think the address is required.
- **Module 4 §4:** "works council" and "Art. 26 territory" are unexplained for a B1 reader; Step 3 feedback calls quiet compliance "Module 3's core lesson", but Module 3 is about reporting a data paste.
- **Lesson 2 hook:** "all four facts" vs five claims in the passage, and no answer key for which Great Fire claims are wrong.
- **Lesson 2 / worksheet:** a fabricated book cannot be shown not to exist with printed sources alone; the answer key expects "does not exist".
- **Lesson 1 no-devices version:** no timing for the replacement rounds.

## What these runs can and cannot show

- **Can show:** possible wording and alignment problems for a reader with a given background, as judged by one AI agent.
- **Cannot show:** learning, engagement, transfer, item difficulty, or what real employees, students or teachers would do.

The findings are listed as open revision candidates in `docs/design/evaluation-report.md` §4. None has been applied yet.
