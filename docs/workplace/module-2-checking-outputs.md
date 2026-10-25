---
title: "Module 2: Checking outputs"
parent: Workplace track
nav_order: 2
description: Fluent does not mean correct. The five-step verification check for AI drafts. ~20 minutes.
---

# Module 2: Checking outputs

**Core question: Can I trust this answer?**
Time: ~20 minutes · Reading level: B1 · [Next module: Data and privacy →](module-3-data-and-privacy.html)

*Last reviewed: 2026-10-25*

---

## 1. Start with a scenario

**Joris, operations planner** (Northwind is fictional), pastes a 20-page report into the assistant:

> *"Summarize this for the Monday meeting."*

The summary looks excellent — clear headings, a tidy table:

| Metric | This week (per AI summary) |
|---|---|
| On-time delivery | 94.2% |
| Damaged parcels | 312 |
| Rotterdam depot backlog | "cleared" |

At the meeting, someone asks: "312 damaged parcels — that's better than last week, right?" Joris checks the original report. The real number is **813**. And the Rotterdam backlog was **not** cleared; the report says it grew.

Nobody notices a wrong number in a confident table. That is the danger.

## 2. Concept: why wrong output sounds right

Two failure modes to know:

- **Fabrication ("hallucination"):** the model predicts *plausible* text. A source that fits the sentence style can be completely invented — a real-sounding URL, a policy paragraph that exists nowhere, a statistic with no origin.
- **Fluency bias (in *us*, not the AI):** well-written text *feels* correct. Reading speed goes up, checking goes down. The better the output sounds, the more discipline you need.

**AI and numbers — Joris's case:** language models do not calculate; they predict number-shaped text. Sums, percentages, dates and names in summaries can be invented or quietly changed. Treat every figure as unverified until you have seen it in the source.

## 3. The five-step check

Use it for anything you did not fully write yourself. It takes seconds, and it is on the [job aid](job-aid-verify-before-you-send.html) you can keep open all day. Run the checks in order:

1. **Claim** — Is every statement true, or only plausible?
2. **Numbers** — Check every figure in the source.
3. **Source** — Does the cited source exist, and does it say this?
4. **Data** — Did I paste anything that must not leave the company? (Module 3 rules)
5. **Affected** — Does acting on this change something for a person? (Module 4 rules)

All five pass → send. Fail a check → fix it, or stop and escalate.

## 4. Worked example

Lena's AI draft again:

> *"Dear Ms. Weber, I am very sorry. Your order NW-88123 is on its way and will arrive within 48 hours. As a small apology, we have refunded your shipping costs of €6.90."*

Running the check:

| Step | What Lena finds |
|---|---|
| 1. Claim | "On its way" — unverified. Order status is unknown. |
| 2. Numbers | "48 hours" — invented. "€6.90" — no refund was made. |
| 3. Source | None cited. The promise came from the model, not the order system. |
| 4. Data | The customer's name and order number were pasted into the prompt — Module 3 problem, flagged. |
| 5. Affected | If sent, the customer expects a delivery date and a refund that do not exist. |

**Corrected reply (after checking the real order status):**

> "Dear Ms. Weber, I am sorry about the delay with order NW-88123. I have checked with our warehouse: the parcel leaves our depot on Thursday, and you will receive a tracking link the same day. I cannot offer a refund for shipping, but I have added a 10% discount code for your next order. — Lena, Northwind Customer Service"

Every claim in the corrected reply is one Lena can stand behind.

## 5. Practice: find the errors

Each AI draft has **at least one** problem. Find it, then check the answer.

**Draft 1.** *"Our on-time delivery rate improved by 12% last quarter, reaching 96%, according to the Q3 Logistics Benchmark published by the European Transport Board."*

<details>
<summary>Answer — Draft 1</summary>
<p>Two problems. <strong>Numbers:</strong> check the 12% and 96% against our own quarterly report — never trust summary numbers. <strong>Source:</strong> verify the "European Transport Board" benchmark actually exists; AI often invents plausible organizations and reports. If the source does not exist, remove the sentence.</p>
</details>

**Draft 2.** *"Per your request, I have cancelled order NW-4471 and refunded €49.99 to your account, which takes 1–2 business days."*

<details>
<summary>Answer — Draft 2</summary>
<p><strong>Claims and numbers:</strong> did the agent actually cancel anything? The AI states actions as done. Confirm the cancellation and refund in the system <em>before</em> sending, or rewrite in future tense. Also check the customer name and order number — AI text can quietly keep details from an earlier prompt.</p>
</details>

**Draft 3.** *"All parcels over 30 kg are handled by our special heavy team in Hamburg — this is standard across the industry, as confirmed by the 2023 EU logistics directive."*

<details>
<summary>Answer — Draft 3</summary>
<p><strong>Source:</strong> "the 2023 EU logistics directive" is vague and very likely fabricated — name a real directive or delete. <strong>Claim:</strong> "standard across the industry" is unverifiable filler; remove it. Keep only what you can support.</p>
</details>

## 6. Reflect (1 minute)

Which of the five steps do you skip most often? What will remind you — calendar note, job aid open in a tab, or the [job aid printed](job-aid-verify-before-you-send.html) next to your screen?

## 7. Check yourself

1. Your AI summary of a report contains a table with four numbers. What do you do?
2. The AI cites a website you have never heard of. What is the check?
3. What is fluency bias, and whose problem is it?

<details>
<summary>Show answers</summary>
<ol>
<li>Check every figure against the source document before using or forwarding the summary.</li>
<li>Open it. Does it exist? Does it actually say what the draft claims? If you cannot verify it, remove the citation and the claim.</li>
<li>Well-written text feels correct, so we check less. It is a human bias — the fix is a routine (the five-step check), not better reading.</li>
</ol>
</details>

---

**Where next:** [Module 3 — Data and privacy](module-3-data-and-privacy.html): what you may paste into a prompt — step 4 of the check, in depth.
