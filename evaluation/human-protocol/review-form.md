# Structured review form

**Used by the reviewer agent (post-build "Agent review") — and reusable for human reviewers.** This is an Agent review: the reviewer is a model (or a human, if the owner chooses), and results are always labeled by method — never "educator review" or "expert feedback". Limitation to state with any results: the reviewer agent may share the author agent's underlying model.

Reviewer: ______ (method label) · Date: ______

## Scope

Review these artifacts as a whole (read them all before scoring):
- [Learning objectives](../../docs/design/learning-objectives.md) and [alignment matrix](../../docs/design/alignment-matrix.md)
- Workplace modules 1–4 and the [job aid](../../docs/workplace/job-aid-verify-before-you-send.html)
- [Teacher guide](../../docs/school/teacher-guide.md) and school lessons 1–4
- [Quiz items](../../docs/assessment/scenario-quiz/items.json), [performance task](../../docs/assessment/performance-task.html), [rubric](../../docs/assessment/rubric.html)

Review from a fresh context: do not read the build agent's rationale first — judge the artifacts as a learner or adopter would see them.

## Part 1 — Scores (1–5 each)

| Dimension | Score | One-line reason |
|---|---|---|
| Clarity (could the target audience follow it?) | | |
| Accuracy (are AI/policy claims correct and sourced?) | | |
| Usefulness (does practice match the objectives?) | | |
| Completeness (gaps a learner would notice?) | | |

## Part 2 — Findings

For each issue: location, severity, description, suggestion. Max ~10 issues total; rank by severity.

| # | Location (page + section/item) | Severity (major/minor) | Issue | Suggested change |
|---|---|---|---|---|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |

Severity guide: **major** = would mislead a learner, break an objective's assessment, or fail an accessibility need; **minor** = clarity, wording, polish.

## Part 3 — Specific probes (answer briefly)

1. Are all 12 quiz items unambiguous — exactly one defensible answer each? Name any exception.
2. Is any module over 1,500 words or over its ~20-minute budget?
3. Does any page overclaim (compliance, certification, learning gains, human testing)?
4. Does the job aid stand alone (usable without the modules)?
5. Is the teacher guide usable by a non-specialist without improvising technical answers?
6. Are fictional elements (Northwind, personas, constructed documents) labeled clearly wherever they appear?

## Sign-off

- Findings transferred to the evaluation report revision log: Y/N
- Major findings blocking publication: ___ (list)
