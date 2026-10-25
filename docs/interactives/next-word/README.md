# Interactive: How a chatbot picks the next word

Shared learning interactive for the [AI Literacy Program](../../index.html) — used in [School Lesson 1](../../school/lesson-1-how-ai-makes-text.html) and as an optional reinforcement in [Workplace Module 1](../../workplace/module-1-what-ai-is.html).

**Live location:** `/interactives/next-word/` on the site (open `index.html`).

## Learning goal

> Students see that output is a probability choice, and that "temperature" changes how predictable the output is — and therefore that *fluent is not the same as correct*: nothing in the machinery checks truth.

## How it works

- **Vanilla JS, no API calls, no storage, works offline.** The "model" is a small hard-coded bigram chain: each sentence starter (6 provided) maps every generated word to a probability distribution over the next word.
- **Generate next word** samples one word from the current distribution (weighted random).
- **Temperature slider (0.2–2.0)** reshapes the distribution: `p^(1/T)` renormalized. Low T sharpens (the likely word dominates); high T flattens (unlikely words get real chances).
- **Probability table** shows every candidate with its adjusted percentage and a bar — values as text, not just visuals.
- Reaching the chain's end shows a clear "end of what it learned for this sentence" message and disables generation until Reset.

## Accessibility notes

- The current distribution is a real `<table>` with header cells and text values.
- The chosen word and full sentence are announced through an `aria-live="polite"` status region (`role="status"`); the sentence itself is a visible `<output>`.
- The temperature `<input type="range">` has a visible label with its current value shown in an `<output>`; arrow keys work as native slider behavior.
- All controls are native buttons/select — full keyboard support; visible `:focus-visible` outlines.
- Bar-width animation only runs when `prefers-reduced-motion: no-preference`.
- The probability table sits in a scrollable `role="group"` with a heading label so keyboard users can reach horizontal overflow.
- Works at 320 px width and 400% zoom (tested — see `evaluation/tests/`).

## Known simplifications (deliberate)

- The model is a bigram chain, not a neural network: distributions depend only on the last word. That is the point — the mechanism (probable words, temperature, no truth check) is visible and inspectable.
- Word chains are 2 steps deep; generation then ends honestly ("the model reached the end of what it learned") rather than looping fake-profoundly.
- Everything is in English; adapting the `MODEL` table for other languages is trivial (CC BY 4.0 content, MIT code).

## Files

| File | Purpose |
|---|---|
| `index.html` | Page structure, controls, live regions |
| `style.css` | Styling incl. reduced-motion guard |
| `script.js` | Hard-coded model, sampling, rendering |

*Last reviewed: 2026-10-25*
