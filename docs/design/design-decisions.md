---
title: Design decisions
parent: Design documentation
nav_order: 6
description: What was decided, alternatives considered, rationale, and evidence. Started at design time and extended as the build progressed.
---

# Design decisions log

Every decision lists: decision → alternatives → rationale → evidence/basis. Build-time decisions are also collected in the repository-level `DECISIONS.md` (process decisions); this page records **learning-design** decisions.

*Last reviewed: 2026-10-25*

## D1. Performance-focused objectives, not "awareness"

- **Decision:** Objectives target observable decisions (identify, classify, decide, produce) — never "raise awareness".
- **Alternatives:** An awareness-only compliance module ("What is AI? What the law says").
- **Rationale:** Article 4 is about literacy proportionate to the context of use; awareness alone does not change behavior. Awareness objectives also cannot be assessed meaningfully.
- **Evidence:** Needs analysis §2; the amended Article 4 text ([AI Act Service Desk](https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-4)).

## D2. Scenario-based assessment, not recall MCQs

- **Decision:** All 12 quiz items are workplace scenarios; every distractor is a *plausible mistake* with its own feedback; results report by objective, not just a score.
- **Alternatives:** Definition-recall MCQs ("What is a hallucination?").
- **Rationale:** The critical behaviors are decisions made under time pressure; the assessment should rehearse the same decision. Per-option feedback turns wrong answers into teaching moments.
- **Evidence:** Alignment matrix; W objectives in [learning objectives](learning-objectives.html).

## D3. A job aid alongside the course

- **Decision:** A 1-page [Verify before you send](../workplace/job-aid-verify-before-you-send.html) checklist is a first-class deliverable, linked from Modules 2–3 and the assessment.
- **Alternatives:** Course only; hope learners memorize the steps.
- **Rationale:** Verification is an infrequent, error-prone task. Performance support at the moment of need beats memorization, and the job aid is the cheapest component to adapt to local policy.
- **Evidence:** Needs analysis root causes ("no verification routine exists"); persona Lena (time pressure).

## D4. 2D interactive by default; 3D skipped as an experiment

- **Decision:** The next-word interactive is a **2D, keyboard-first, vanilla-JS** widget with an accessible table of probabilities. The optional three.js "embedding space" experiment was **skipped**.
- **Alternatives:** 3D-first; or building both and A/B comparing.
- **Rationale:** Immersive formats can increase presence while reducing learning, and 3D adds accessibility cost (canvas, camera controls, text alternatives). The planned human comparison test (3–4 people) was not available in this portfolio build, so there was no fair way to claim the 3D version helped. The next-word interactive fully satisfies the "at least one accessible interactive" criterion.
- **Evidence:** Makransky et al. (presence vs. learning); decision recorded in repo `DECISIONS.md`.

## D5. Same core concepts, two tracks, one shared spine

- **Decision:** School and workplace tracks share the conceptual spine (prediction → verification → bias → oversight/fit) with different scenarios, voices and activities; one alignment matrix; one rubric.
- **Alternatives:** Two unrelated courses.
- **Rationale:** Shows the same analysis→design→build→evaluate process adapted to very different audiences — the explicit portfolio goal. Reuse also cuts maintenance.
- **Evidence:** [Alignment matrix](alignment-matrix.html) (two tables, one structure).

## D6. Plain-language B1 text

- **Decision:** Workplace text targets B1 / ~grade 8: short sentences, no idioms, no unexplained jargon; every technical term defined on first use.
- **Alternatives:** Standard corporate prose.
- **Rationale:** Multilingual workforce (Germany + Netherlands); plain language is also an accessibility win for everyone.
- **Evidence:** Needs analysis §5 constraints.

## D7. Fictional client with realistic texture, clearly labeled

- **Decision:** Northwind Logistics is fictional and labeled as such everywhere; examples are concrete (order numbers, shift plans) but carry no real data.
- **Alternatives:** Abstract generic examples; or a real company case.
- **Rationale:** Concrete scenarios are required for scenario-based assessment; abstraction kills transfer, and real company data is out of bounds.
- **Evidence:** Honesty rules; [personas](personas.html).

## D8. Hard-coded probabilities in the interactive; no API

- **Decision:** The next-word interactive uses a small hard-coded bigram-style probability table for 5–6 sentence starters. No network calls, ever.
- **Alternatives:** Calling a real model API; a tiny local neural net.
- **Rationale:** The learning goal is the *mechanism* (prediction, temperature), not model fidelity. A hard-coded table is transparent, instant, works offline, and is inspectable by students and teachers.
- **Evidence:** Interactive [README](../interactives/next-word/README.md) (learning goal, design notes).

## D9. Verification taught as 5 concrete checks, not "use your judgment"

- **Decision:** The checklist is: check the claim, check the numbers, check the source, check the data, check who's affected.
- **Alternatives:** Generic advice ("be critical").
- **Rationale:** Each check maps to a failure mode (fabrication, arithmetic, dead/fake sources, confidentiality, affected persons) and to a quiz item and rubric criterion.
- **Evidence:** Task analysis; quiz items Q4–Q6; rubric criterion 1.

## D10. Evaluation designed before content, with limits stated up front

- **Decision:** The evaluation plan (LTEM) was written before content; assessment blueprints precede items; the report states what each method can and cannot show.
- **Alternatives:** Retrofit evaluation after building.
- **Rationale:** Alignment is only provable if assessment is designed with the objectives; LTEM prevents overclaiming (e.g., no learning-gain claims without pre/post data).
- **Evidence:** [Evaluation plan](evaluation-plan.html); [evaluation report](evaluation-report.html) limitations section.
