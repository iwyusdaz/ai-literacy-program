---
title: "Module 4: Oversight and escalation"
parent: Workplace track
nav_order: 4
description: When a human must decide. The affected-person test, high-risk signals, and the escalation path. ~20 minutes.
---

# Module 4: Oversight and escalation

**Core question: When should a human decide?**
Time: ~20 minutes · Reading level: B1 · After this: the [scenario quiz](../assessment/scenario-quiz/index.html) and the [performance task](../assessment/performance-task.html)

*Last reviewed: 2026-10-25*

---

## 1. Start with a scenario

**Sofia, HR administrator** (Northwind is fictional), has 240 applications for 6 warehouse jobs. A colleague suggests:

> "Paste the CVs into the assistant, ask it to score each one 1–100, and invite the top 20. Saves a whole day."

Sofia imagines the shortcut. Then she imagines the risks:

- **Bias:** the model learned from internet text. It may score names, schools, career gaps or genders unequally — systematically, at scale, with no one noticing.
- **Affected persons:** 234 people get rejected by a pattern they never knew existed. Some never get a human look at all.
- **Data:** pasting 240 CVs somewhere external — a 🔴 wall in Module 3 terms.
- **Accountability:** if a candidate asks "why was I rejected?", "the AI scored me" is not an answer a person can stand behind.

## 2. Concept: the affected-person test

One question sorts most cases: **does acting on this output change something for a person** — their money, job, health, safety, rights or reputation? Work through it in order:

1. The AI suggests an action.
2. Ask: does acting on it change something for a person?
   - **No** → run the five-step check (Module 2) and proceed.
   - **Yes** → a human decides. AI may *inform* (draft, summarize, flag), never replace.
3. Name the person who owns the decision.
4. Unclear, or pressure to skip the human? → escalate (the path below).

**Signals that a use is high-risk** (the more signals, the more care):

1. The decision **affects a person** (hiring, pricing for a customer, discipline, benefits, safety).
2. It happens **at scale** (every applicant, every route, every claim).
3. The person **cannot contest or even see** the decision.
4. Bias has **somewhere to hide** (scores, rankings, "the system says").
5. There is a **legal or safety dimension** (employment law, GDPR, driving rules).

Sofia's plan trips signals 1, 2, 3, 4 and 5. It is not a shortcut; it is a hazard.

**A helpful distinction:** *AI informs* (drafts, summarizes, flags patterns for a human to weigh) — fine. *AI decides* (scores, ranks, approves, rejects) — a human belongs in the loop, especially for anything on the high-risk list. For companies deploying high-risk AI systems, separate legal duties for human oversight exist (Art. 26 territory — your compliance team owns that; this module gives you the working judgment).

## 3. Worked example: escalation done right

Sofia's manager repeats the request: "We need those interviews scheduled." Sofia's path:

| Step | What she does | What she says |
|---|---|---|
| 1. Name the risk plainly | Writes two sentences, not a lecture | "Ranking people by an AI score is a decision about people made by a system. If the pattern is biased, we discriminate at scale — and we would not know." |
| 2. Offer an alternative | Keeps the goal (speed) | "The assistant can draft the interview questions and a rejection-letter template. Screening stays with us — we can screen in pairs to be faster." |
| 3. Escalate if pressed | Names the right contact | "If we still want AI screening, that decision needs the data protection officer and HR leadership — not me and you today." |

Note what Sofia does **not** do: she does not quietly comply, and she does not refuse and walk away. She moves the decision to the right person with an alternative on the table. That is escalation.

## 4. Practice: branching mini-scenario — "The HR shortcut"

Make a choice at each step. The scenario is fictional; the judgment is real.

**Step 1.** You are Sofia. The manager wants AI-scored CV ranking. You first…

- **A.** Do it — the manager asked, and it saves a day.
- **B.** Explain the risk, offer the alternative (drafting questions, paired human screening), and offer to raise it with the DPO if they insist.
- **C.** Refuse and email the works council immediately.

<details>
<summary>Feedback</summary>
<p><strong>B</strong> is the strong move: it names the risk, preserves the goal, and moves the decision to the right owner. <strong>A</strong> outsources a decision about people and takes on a data problem (240 CVs pasted). <strong>C</strong> skips a conversation the manager deserves first — escalate <em>after</em> the direct attempt fails or pressure continues.</p>
</details>

**Step 2.** The manager says: "It's just a pre-filter, humans still make the final call." You respond…

- **A.** "A pre-filter is still a decision — the humans only see the survivors of the pattern, and the pattern may be biased."
- **B.** "OK, as long as a human looks at the final list."
- **C.** "Fine, but let's not tell anyone we did this."

<details>
<summary>Feedback</summary>
<p><strong>A</strong> is right: when a filter removes 220 of 240 people, the "human decision" happens inside a biased funnel. That is exactly signal 3 (the person cannot contest what they never see). <strong>B</strong> accepts the funnel. <strong>C</strong> is the hiding move — always wrong (Module 3, "too late? do this").</p>
</details>

**Step 3.** The manager escalates pressure: "Everyone does this." You…

- **A.** Comply — it must be normal then.
- **B.** Keep the alternative, and state that if AI screening is wanted, it goes to the DPO and HR leadership as a formal decision.
- **C.** Quietly score the CVs but tell no one.

<details>
<summary>Feedback</summary>
<p><strong>B</strong> — "everyone does this" is normalization, not policy (root cause from the needs analysis). The escalation path exists precisely for this moment. <strong>A</strong> and <strong>C</strong> repeat Module 3's core lesson: quiet compliance is the expensive failure.</p>
</details>

## 5. Practice: signal spotting

For each use, name **which high-risk signals** (1–5 above) you see:

1. AI sets individual prices for insurance customers automatically.
2. AI drafts the text of a company announcement.
3. AI flags "unusual" expense claims for human review.
4. AI recommends delivery routes that skip legally required driver breaks.

<details>
<summary>Answers</summary>
<ol>
<li>Signals 1, 2, 3, 5: affects people's money, at scale, uncontested, legal dimension. A human belongs in pricing exceptions and the system needs audit.</li>
<li>No signals: text drafting with human checks — Module 2 territory.</li>
<li>Signals 1, 2, 3 in a <em>weaker</em> form: it flags, humans still decide — but check what "unusual" encodes and who gets flagged more often (bias can hide in thresholds). Signal 4 candidate.</li>
<li>Signals 1, 2, 5 and a hard stop: safety and law. Never act on it; escalate immediately.</li>
</ol>
</details>

## 6. Reflect (1 minute)

Think of your own work: which decision closest to you should never be delegated to a model, even though a model *could* draft the paperwork for it?

## 7. Check yourself

1. State the affected-person test in one sentence.
2. Name three high-risk signals.
3. What are the three moves of good escalation?

<details>
<summary>Show answers</summary>
<ol>
<li>If acting on the AI output changes something for a person — their money, job, health, safety, rights or reputation — a human decides.</li>
<li>Any three of: affects a person; at scale; person cannot contest or see it; bias can hide; legal/safety dimension.</li>
<li>Name the risk plainly; offer an alternative that keeps the goal; if pressed, move the decision to the right owner (DPO / leadership).</li>
</ol>
</details>

---

**Where next:** Test your judgment on all four modules in the [scenario quiz](../assessment/scenario-quiz/index.html), then try the [performance task](../assessment/performance-task.html) — correcting a flawed AI-drafted memo. Keep the [job aid](job-aid-verify-before-you-send.html) for the moment of need.
