---
title: Rubric
parent: Assessment
nav_order: 3
description: "Four criteria × four levels: accuracy checking, data judgment, bias recognition, justification."
---

# Rubric

Used to score the [performance task](performance-task.html) (both tracks) and the school [final project](../school/final-project.html). Designed to be usable by a teacher, a peer reviewer, or a scoring agent — every level describes observable behavior.

*Last reviewed: 2026-10-25*

## Criterion 1 — Accuracy checking

*Does the learner treat claims and numbers as unverified until checked?*

| Level | Observable behavior |
|---|---|
| **4 — Routine** | Finds all planted errors and near-misses; verifies each against an appropriate source; distinguishes "wrong", "unverifiable" and "true but unsourced"; the corrected text contains no claim they cannot stand behind. |
| **3 — Solid** | Finds the main factual errors and the fabricated source; verifies most claims; corrected text is safe, though one minor claim remains unchecked. |
| **2 — Partial** | Finds obvious errors (wrong numbers) but accepts fluent claims and plausible citations; some corrections, others copied through. |
| **1 — Missing** | Treats fluency as truth; corrects style only; no verification performed. |

## Criterion 2 — Data judgment

*Does the learner recognize what may and may not be pasted/shared, and act on exposure?*

| Level | Observable behavior |
|---|---|
| **4 — Routine** | Identifies the data-privacy problem and its *identifiability* logic (name + address + order number = person); rewrites the instruction correctly; states the containment/reporting path for existing exposure; notes tool-approval distinctions (approved vs. personal accounts). |
| **3 — Solid** | Identifies the personal-data paste and fixes it; tool distinctions mostly right; containment path named but not sequenced. |
| **2 — Partial** | Notices the paste "seems private" but mis-classifies (e.g., calls customer data "internal"); no containment path. |
| **1 — Missing** | No data awareness shown; keeps the pasting instruction. |

*(School adaptation — criterion 2 becomes **Source judgment**: does the learner cite where their own facts came from and flag claims that need sources? Levels mirror 4→1: every claim sourced → main claims sourced → "I checked" without a source → no sourcing.)*

## Criterion 3 — Bias recognition

*Does the learner spot unfairness and connect it to a cause?*

| Level | Observable behavior |
|---|---|
| **4 — Routine** | Identifies the CV-ranking bias problem **and** the subtle ones (vendor-claims conflict of interest, "fully compliant" assertion); explains the cause (pattern learned from uneven data/authority claims); proposes the human-in-the-loop alternative. |
| **3 — Solid** | Identifies the CV-ranking problem and connects it to bias; proposes human screening. |
| **2 — Partial** | Says "the AI might be biased" without connecting cause or consequence; misses the subtle authority claims. |
| **1 — Missing** | No bias recognition; accepts ranking people by machine score. |

*(School adaptation: learners identify one unfair output pattern and a matching training-data cause — the Lesson 3 objective.)*

## Criterion 4 — Justification

*Does the learner explain *why* — the log is reasoning, not a changelist?*

| Level | Observable behavior |
|---|---|
| **4 — Routine** | Every change in the log names the principle (the affected-person test, identifiability, source verification); escalations name the right owner; the response could teach someone else. |
| **3 — Solid** | Most changes carry a reason tied to a module principle; one or two are asserted without a why. |
| **2 — Partial** | Changes listed with thin labels ("wrong", "fixed"); principles absent. |
| **1 — Missing** | No log, or a log of opinions without reference to any check or principle. |

## Using this rubric

- **Passing bar (suggested):** Level 3 or above on all four criteria for the workplace task; Level 2 minimum per criterion for the school project, with growth expected between lessons.
- **Scorers:** a teacher, a peer (using the peer protocol), or a labeled AI scorer in the pending evaluation pipeline (`evaluation/run-review-panel.mjs`) — any AI-assisted scoring will be labeled as such in results and never presented as human judgment.
- The rubric deliberately avoids weighing writing quality: the object is judgment.
