---
title: Needs analysis
parent: Design documentation
nav_order: 1
description: Performance gap, root causes, task analysis and constraints for the workplace track (fictional client, grounded in cited secondary research).
---

# Needs analysis — workplace track

**Status note:** Northwind Logistics is a **fictional client** created for this portfolio. Client-specific claims (e.g., "agents paste customer data into AI tools") are hypothetical for the fictional client. Population-level evidence comes from published research, cited inline and in [research/sources.md](https://github.com/iwyusdaz/ai-literacy-program/blob/main/research/sources.md) (secondary research; no interviews were conducted).

*Last reviewed: 2026-10-25*

## 1. The business goal and the stakeholder request

**Stakeholder request (fictional, Northwind Logistics):** *"We need AI training for everyone by Q1 so we're covered under the AI Act."*

**Reframe.** Article 4 of the EU AI Act requires providers and deployers to take measures to support AI literacy — and explicitly does not require any individual to reach a specific level ([AI Act Service Desk](https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-4), accessed 2026-10-25). A completion certificate is therefore the wrong target. The performance goal that actually matters:

> **Staff use AI outputs safely and correctly in real tasks** — they verify before sending, protect data, and keep humans in decisions that affect people.

**Business goal:** safe, correct AI use in customer service, operations planning and HR administration, without data incidents and without wrong decisions reaching customers or applicants.

## 2. The performance gap

| Aspect | Current state (hypothetical, fictional client) | Desired state |
|---|---|---|
| Verification | Send AI drafts after a skim; fluent text feels correct | Claims, numbers and sources checked before sending |
| Data | Paste anything into the AI assistant to "give it context" | Classify data first; never paste customer personal data |
| Judgment on fit | Use AI for anything, including decisions about people | Choose tasks where AI helps; keep human decisions where people are affected |
| Escalation | Quietly delete a chat after a mistake | Report incidents; use defined escalation paths |

This gap pattern matches external evidence: use is already widespread and self-taught (75% of knowledge workers use gen AI at work — [Microsoft/LinkedIn WTI 2024](https://www.microsoft.com/en-us/worklab/work-trend-index/ai-at-work-is-here-now-comes-the-hard-part)), training emphasizes productivity over risk (Interface EU), and L&D demand for "AI capability" is broad but unspecified (43.3% of postings vs. 8.3% with specifics — [Teamed 2026](https://www.teamedforlearning.com/ld-skills-landscape-2026-whats-hot-whats-not/)).

## 3. Root causes

Sorted into knowledge, skill, motivation and environment. Environment causes get **non-training fixes** (flagged), because training cannot compensate for a missing policy.

| Cause | Type | Training response |
|---|---|---|
| Staff believe AI "looks things up", so they trust fluent output | Knowledge | Module 1: how text generation actually works (prediction, not lookup) |
| No verification routine exists | Skill | Module 2: teach a 5-step routine + [job aid](../workplace/job-aid-verify-before-you-send.html) |
| Staff can't distinguish safe vs. unsafe inputs | Skill + environment | Module 3: traffic-light classification. **Non-training fix (recommended): publish the data classification policy the modules reference** |
| "Everyone does it" normalization of pasting data | Motivation | Module 3: consequences + realistic alternatives; manager messaging recommended |
| No defined escalation path for AI mistakes | Environment | Module 4 teaches the (fictional) path. **Non-training fix (recommended): the organization must actually define one** |
| Compliance framing makes training feel like paperwork | Motivation | Scenario-based content about real decisions, not policy recitation |

## 4. Task analysis: where judgment is needed

| Task (Northwind context) | AI helps with… | Judgment steps where errors occur |
|---|---|---|
| Draft customer reply (Lena) | Tone, speed, first draft | 1. Paste request text (data?) → 2. Check claims (SLA times, prices) → 3. Check name/order details → 4. Send decision |
| Summarize operations report (Joris) | First-pass summary | 1. Numbers in summaries can be invented → 2. Check every figure against the source → 3. Act on the summary, not the source (risk) |
| Screen incoming CVs (Sofia) | Not recommended without safeguards | 1. Affected persons → 2. Bias in ranking → 3. Human must decide → 4. Escalate to DPO/lead before any AI use |

## 5. Constraints

- **20 minutes per module** (self-paced, in work time)
- **Mobile-friendly** (shop-floor and on-the-road access)
- **Multilingual workforce** — plain English at B1 reading level (~grade 8); sentences short; idioms avoided
- **No LMS packaging** in v1.0 (SCORM noted as a next step)
- No real customer data in examples

## 6. Critical behaviors the program must change

1. **Verify before sending** — claims, numbers, sources, names (Modules 2 + job aid)
2. **Classify data before pasting** — never paste prohibited data; know what restricted means (Module 3)
3. **Keep a human decision** where people are affected (hiring, discipline, compensation, safety) (Module 4)
4. **Escalate and report** suspected data leaks and AI errors instead of hiding them (Modules 3–4)
5. **Use the job aid at the moment of need** — performance support beats memorization for infrequent tasks

These five behaviors drive the [learning objectives](learning-objectives.html) and the [alignment matrix](alignment-matrix.html).
