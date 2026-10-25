---
title: Evaluation plan
parent: Design documentation
nav_order: 7
description: What is measured, at which LTEM tier, with which method — and what is feasible in a portfolio build.
---

# Evaluation plan

Structured with Thalheimer's [LTEM](https://www.worklearning.com/ltem/) (Learning–Transfer–Evaluation Model), which forces honesty about what evidence actually shows. The pilot and reviews were **not run with real learners** in this portfolio build; the replacement methods and their statuses are documented in the [evaluation report](evaluation-report.html) and `evaluation/METHODS.md`.

*Last reviewed: 2026-10-25*

## What we measure, at which tier

| LTEM tier | Question | Method | Feasible here? | Status |
|---|---|---|---|---|
| Tier 8 — Payoff | Fewer incidents, complaints? | Incident logs (proposed) | No — describe as a plan | Not attempted |
| Tier 7 — Transfer | Do staff verify outputs at work? | Spot-check audit of AI-assisted tickets (proposed) | No — describe as a plan | Not attempted |
| Tier 6 — Task performance | Can a learner correct a flawed AI document? | Performance task scored with the [rubric](../assessment/rubric.html) | Yes, with real participants | Protocol ready, **not run** |
| Tier 5 — Decision-making | Better verify/paste/escalate decisions? | Pre/post scenario test, parallel [forms A/B](https://github.com/iwyusdaz/ai-literacy-program/tree/main/evaluation/human-protocol) | Yes, small n | Protocol ready, **not run** |
| Tier 4 — Knowledge | Recall | (Deliberately not used as an outcome) | — | n/a |
| Tier 3 — Learning | — | — | — | n/a |
| Tier 2 — Participation | Attendance/completion | Completion tracking | Trivially yes, but says nothing | Not presented as evidence |
| Tier 1 — Activity | — | — | — | n/a |
| (Perception, above Tier 8 in LTEM) | Was it usable and relevant? | 5-item [survey](https://github.com/iwyusdaz/ai-literacy-program/blob/main/evaluation/human-protocol/survey.md) + think-aloud | Yes, with real participants | Protocol ready, **not run** |

## What replaces the human pilot in this build (and its limits)

| [HUMAN] task | Replacement | Status | What it can show / can't show |
|---|---|---|---|
| Interviews | Secondary research synthesis ([research/secondary-research.md](https://github.com/iwayanusada/github-portfolio-building/repos/ai-literacy-program)) | Done | Real, citable population evidence; not first-hand, not client-specific |
| Pilot (5–8 adults) | Cognitive walkthrough + heuristic evaluation by a **reviewer agent** (labeled "Agent review") | Reviewer agent (post-build) | Usability/clarity gaps; not real users |
| Pilot task checks | **Scripted task tests** (Playwright: keyboard-only, 320 px, 400% zoom, step counts) | Done, this build | Flows work; not learner experience |
| Learner testing | **AI-simulated learner runs + item analysis**, ≥8 runs across personas and prior-knowledge levels (`evaluation/run-simulations.mjs`) | Pipeline ready, **pending API key** | Item-quality/clarity problems; **cannot** show learning gains (personas may already know the content) |
| Educator/expert review | **Multi-model AI review panel**, ≥2 models in reviewer roles (`evaluation/run-review-panel.mjs`) | Pipeline ready, **pending API key** | Gap-finding with model diversity; not expert endorsement |
| VoiceOver pass | Manual VoiceOver check script (Guidepup unavailable on macOS 27); ariaSnapshot + scripted keyboard tests now | Script provided; aria tests done | Structure/announcements; not a daily screen-reader user's experience |

## Pilot protocol (kept ready in `evaluation/human-protocol/`)

- **Participants:** 5–8 adult volunteers; informed consent ([consent text](https://github.com/iwyusdaz/ai-literacy-program/blob/main/evaluation/human-protocol/consent-text.md)); no names in data; withdraw at any time.
- **Flow:** pre-test (form A, 6 items) → Modules 2 + 3 → post-test (form B, 6 items) → performance task → survey. Think-aloud with 2–3 participants on the interactive and quiz.
- **Analysis:** median pre/post score, per-item results, rubric distributions, selected quotes. **No statistical-significance claims with n < 10.**
- If minors were ever involved (school track), guardian consent would be required first — the current consent text excludes minors.

## Decision thresholds (what triggers a revision)

- Any quiz item where a *wrong* option attracts most responses from simulated **and** human reviewers → item rewrite
- Any keyboard/reflow failure in scripted tests → fix before release (blocking)
- Agent/panel reviews finding ambiguity in objectives or scenarios → wording fixes, logged in the report
