---
title: "Lesson 1: How AI makes text"
parent: School track
nav_order: 2
description: "Core question: Does a chatbot 'know' things? Next-word interactive + human predictor game. 50 minutes."
---

# Lesson 1: How AI makes text

**Core question: Does a chatbot "know" things?**
Objective: **S1.1** — describe how a chatbot produces text (prediction) and correct the misconception that it "knows" or "looks things up".
Handout: [Next-word recording sheet](handouts/next-word-recording-sheet.html) · Teacher support: [misconception table](teacher-guide.html#misconceptions-to-watch-for-and-what-to-say)

*Last reviewed: 2026-10-25*

---

## Hook — 5 min

**Teacher script prompt:** "I'm going to write a sentence on the board, but I'll stop in the middle. You tell me the next word. 'The goalkeeper caught the…'"

Take 4–5 answers (ball, ball, ball, ball, ball). Ask: "Why did almost everyone say *ball*?" → *because it's the word that usually comes next.* "Congratulations — for one sentence, you are now a language model. Today we find out what chatbots actually do, and why 'it just knows things' is wrong."

## Main activity — 25 min

### Part A: the human predictor game (10 min, works with or without devices)

In pairs, students play the game properly:

1. Student A writes a sentence starter (5–8 words) on the [recording sheet](handouts/next-word-recording-sheet.html).
2. Student B predicts the next word. A writes it and continues the sentence. Repeat for 5–8 steps.
3. Round 2: same game, but B must sometimes pick a **surprising but possible** word (that is what the temperature slider does — see Part B).
4. Both record: *Which words were easy to predict? When did it get weird?*

**Point to land:** B was never "thinking about" what the sentence *means*. B was predicting. Yet the sentences came out sensible — and sometimes nonsense. That is exactly how a chatbot works, just with vastly more patterns.

### Part B: the next-word interactive (15 min, devices; [no-devices version below](#no-devices))

Students open the [interactive](../interactives/next-word/index.html) and, on the recording sheet:

1. Generate a sentence word by word at **low temperature**. What do they notice? (Predictable, boring, safe.)
2. Reset. Same starter, **high temperature**. (Surprising, creative, sometimes nonsense.)
3. Watch the probability bars: the model doesn't "choose" one word — it has **probabilities for every next word**; the slider changes how adventurous the pick is.
4. Record answers to: *Does the model know if a sentence is true? How can you tell from the interactive that it doesn't?*

**Key observation to fish for:** at no point does the interactive ask whether the sentence is *true*. Truth is not part of the machinery. Students should write this in their own words.

## Discussion — 10 min

- "So: does a chatbot know things?" → It predicts likely text. It can produce true things, false things, and perfect-sounding nonsense — with the same confident tone.
- "If it doesn't know anything, why do answers often look right?" → Because likely text is often right — and *sometimes not*. You can't tell from the tone.
- "When could this help you, and when could it trick you?" → Collect on the board; Lesson 4 returns to this list.

## Exit ticket — 5 min

Students write **two sentences** without looking at anything:
1. How does a chatbot produce text?
2. Why is "it looked it up" wrong?

Meet the objective = both sentences correct the misconception in their own words.

## No devices

Skip Part B. Run two more rounds of Part A: Round 3 at "temperature 0.1" (B must pick the most predictable word every time) vs. Round 4 at "temperature 1.5" (B must surprise). Draw the probability bars on the board for "The goalkeeper caught the ___": tall bar for *ball*, thin bars for *rebound*, *cold* and *trophy* (the same words the interactive offers). The lesson works identically on paper.

## Differentiation

**Support:** sentence starters provided on the recording sheet; sentence frames for the exit ticket ("A chatbot doesn't ___; it ___").
**Stretch:** "Why do companies add a temperature control for customers? Name one product where you'd want it low and one where you'd want it high." Also: connect to Lesson 2 — if truth isn't in the machinery, *what has to be*?

---
[Next lesson: When AI gets it wrong →](lesson-2-when-ai-gets-it-wrong.html)
