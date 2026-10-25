---
title: "Module 3: Data and privacy"
parent: Workplace track
nav_order: 3
description: What you may paste into an AI tool. The traffic-light rule, and what to do if it is already pasted. ~20 minutes.
---

# Module 3: Data and privacy

**Core question: What can I paste in?**
Time: ~20 minutes · Reading level: B1 · [Next module: Oversight and escalation →](module-4-oversight-and-escalation.html)

*Last reviewed: 2026-10-25*

---

## 1. Start with a scenario

**Lena** wants better answers, so she gives the assistant context:

> *"Here is the customer's email, please draft a reply:*
> *From: Petra Weber, Order NW-88123, Musterstraße 12, 48143 Münster. 'I have not received my order and I am angry because I paid €249.90 with my credit card ending 4412…'"*

Everything in that paste can leave Northwind's control. It goes to an external service, is processed there, and may be stored or used there under that service's terms. **Once pasted, you cannot take it back.**

## 2. Concept: the traffic-light rule

Northwind's rule (fictional, for teaching) sorts information into three lights. **In your real company, this table is your data policy — if it does not exist yet, that is the first thing to fix, not the training.**

| Light | Meaning | Examples (logistics context) |
|---|---|---|
| 🟢 **Permitted** | Public or already-anonymized information | Policy text, product descriptions, public shipping terms, anonymized totals ("13% of parcels delayed in May") |
| 🟡 **Restricted** | Internal, but not about identifiable people | Internal process descriptions, unannounced pricing tiers, depot capacity figures — only in **company-approved AI tools**, never personal accounts |
| 🔴 **Prohibited** | Personal or customer data; anything that identifies a person | Names, addresses, phone numbers, order numbers linked to a person, payment details, complaint texts, health information, CVs, employee records |

Two extra rules that make the lights work:

1. **The tool matters.** 🟡 items go only into tools the company has approved. A personal account on a public chatbot is 🔴 for all internal information.
2. **Combination is the trap.** "Order NW-88123" alone is 🟢. With a name and address, it becomes 🔴. If a paste would let a stranger identify the person, treat the whole paste as prohibited.

**GDPR in one breath (high level only):** personal data may only be processed lawfully, for a defined purpose, with proper protection. Pasting customer data into an unapproved external tool is a data-protection problem for Northwind and possibly for you. This module is not legal advice — your DPO (data protection officer) owns the details.

## 3. Worked example

Lena's paste again. Running the lights:

| Item in her paste | Light | What to do instead |
|---|---|---|
| Customer name | 🔴 | Remove |
| Home address | 🔴 | Remove |
| Order number NW-88123 **with** the name | 🔴 (identifies) | Use "a recent order" in the prompt; look the order up in the system yourself |
| Payment card digits (even partial) | 🔴 | Never. Any card digits: stop |
| "I am angry" (complaint text) | 🔴 (identifiable complaint) | Describe the issue type: "a complaint about a late delivery" |

**Safe version of the same prompt:**

> *"Draft a friendly reply to a customer whose delivery is late. Apologize, explain that we are checking with the warehouse, and promise a tracking update today. Tone: calm, professional."*

Better reply, zero data risk. The AI does not need the customer's identity to draft good text — **you** add the identity back, from the system, in the reply.

## 4. Practice: traffic-light eight

Classify each paste: 🟢 / 🟡 / 🔴. Assume a **company-approved** tool.

1. "Our returns policy states…"
2. "Draft a reply for Mrs. Weber about her order NW-88123."
3. "In May, 13% of parcels to Münster were delayed."
4. "Here is our internal price list for 2027 contracts (not yet announced)."
5. "Here is the applicant's CV — summarize strengths and weaknesses."
6. "Explain how depot shifts are planned at Northwind."
7. "The customer wrote: 'My son is sick, so nobody was home to sign…' — draft a reply."
8. "Summarize this public news article about port strikes."

<details>
<summary>Answers</summary>
<ol>
<li>🟢 Public policy text.</li>
<li>🔴 Name + order number identifies the person.</li>
<li>🟢 Anonymized aggregate — no person identifiable.</li>
<li>🟡 Internal, no persons — approved tools only, never personal accounts.</li>
<li>🔴 A CV is personal data about a person, and screening CVs is also an oversight question (Module 4).</li>
<li>🟡 Internal process — approved tools only.</li>
<li>🔴 The message content identifies the family situation — describe the issue type instead.</li>
<li>🟢 Public source.</li>
</ol>
<p>Scored 8/8? Module 3 has done its job. Anything else: re-read the combination trap above.</p>
</details>

## 5. Too late? Do this

If prohibited data is already pasted, do these in order:

1. **Stop** using that chat.
2. Do **not** try to hide it — report the same day.
3. Tell your team lead and follow the incident procedure.
4. Data protection (the DPO) decides the next steps.

Deleting the chat quietly is the one move that turns a small incident into a serious one. Reporting fast is always the right answer; at Northwind (fictional), nobody has ever been disciplined for reporting quickly.

## 6. Reflect (1 minute)

What is the most valuable thing you routinely paste into AI tools? Which light is it — and would a stranger be able to identify a person from it?

## 7. Check yourself

1. Why is "order number + name" 🔴 when "order number" alone is 🟢?
2. A colleague pasted a customer's address into a personal chatbot account yesterday. What happens today?
3. Where does the 🟡 category go?

<details>
<summary>Show answers</summary>
<ol>
<li>Because the combination identifies a specific person. Identifiability makes it personal data.</li>
<li>Stop using that chat and report today, per the incident path: lead, then DPO. Do not wait, do not hide it.</li>
<li>Into company-approved AI tools only — never into personal accounts on public services.</li>
</ol>
</details>

---

**Where next:** [Module 4 — Oversight and escalation](module-4-oversight-and-escalation.html): step 5 of the check — when a human must decide.
