# Manual VoiceOver check — macOS script

**Status: script provided, NOT run.** VoiceOver automation (Guidepup) does not work on macOS 27 in this environment, and no human operator ran VoiceOver during the build. This script exists so the repo owner (or any sighted+VoiceOver user) can complete the check in about 15 minutes. **Do not describe VoiceOver testing as done until this has been run and the log filled in.**

Fallback already performed at build time: Playwright `ariaSnapshot()`-style structural checks (roles, names, live regions) and scripted keyboard tests — these verify structure, not the listening experience.

---

## Setup (2 min)

1. macOS: System Settings → Accessibility → VoiceOver. Turn on "Use VoiceOver" or press **Cmd+F5**.
2. VoiceOver Utility → Verbosity: set Speech to default; enable "Announce live regions" (usually default).
3. Open Safari (VoiceOver works best there) and load the live site.
4. Start the log below. Write down anything that differs from "Expected".

## Check A — Next-word interactive (`/interactives/next-word/`)

| # | Action | Expected VoiceOver output |
|---|---|---|
| A1 | VO+U → open the rotor → navigate by headings | Headings read in order: "How a chatbot picks the next word", "1. Choose a sentence starter", "2. Generate words", "3. What the model considers next", "What is happening here" |
| A2 | Tab once | "Skip to the interactive, link" |
| A3 | Tab to the starter select | "Sentence starter, pop-up button, The goalkeeper caught the" (or similar) |
| A4 | Change the starter with VO+Space → arrows | New starter announced in the status region: "New starter chosen…" |
| A5 | Tab to "Generate next word" and press VO+Space | Status announces "Generated word 1: "…" — sentence so far…" |
| A6 | Generate 3 more words | Each press announces the new word number, word, and sentence. The sentence `<output>` reads coherently when re-read with VO+A |
| A7 | Tab to the temperature slider | "Temperature (adventurousness): 1.0, slider" — the visible value output is part of the label |
| A8 | Arrow left/right | Value changes (0.2–2.0); the probability table updates; screen reader does NOT spam (table is not a live region) |
| A9 | Navigate to the probability table (VO+arrows) | Each row reads: word, bar (no announcement needed), percentage as text, e.g. "ball 58.0%" |
| A10 | Reach the end of a word chain | Status announces the end-of-sentence message; Generate is announced as "dimmed" |
| A11 | Press Reset (VO+Space) | Status: "Reset. The sentence is back to the starter…" |

## Check B — Scenario quiz (`/assessment/scenario-quiz/`)

| # | Action | Expected VoiceOver output |
|---|---|---|
| B1 | VO+U → headings | "Scenario quiz", then one heading "Quiz questions" (visually hidden), later "Your results" |
| B2 | Tab to the first question's radios | Legend is read with the group: "1 of 12 — <stem>, radio group" — each option reads its full text with state ("selected"/"not selected") |
| B3 | Select an option with VO+Space | Feedback region announces automatically (aria-live=polite): "✓ Correct. …" or "✗ Not quite — the better answer is option C. …" |
| B4 | Navigate between questions | Each fieldset's legend announces its number and stem; options are individually labeled |
| B5 | Answer all 12 | Focus moves to "Your results"; the summary reads "You answered N of 12…" and the by-objective table reads row-wise: objective, result with ✓/✗, questions |
| B6 | Check the privacy line at the top | Read once at page start: "Your privacy: this quiz stores nothing and sends nothing anywhere…" |

## Check C — General pages (spot check 3 pages)

| # | Action | Expected |
|---|---|---|
| C1 | On a module page, VO+A (read all) | Heading order logical; tables read with headers; details/summary elements announce as disclosure triangles and toggle |
| C2 | Links list (VO+U → Links) | No bare "click here"; links make sense out of context |
| C3 | Navigate with Tab through a module | Focus never disappears; no keyboard trap in details/tables |

## Log

| Check | Result (match / differs) | Notes |
|---|---|---|
| A1–A11 | | |
| B1–B6 | | |
| C1–C3 | | |

Any "differs": note the page, the step, and what VoiceOver actually said — then file it as an accessibility issue in the repository issue tracker, and only claim "manual VoiceOver check passed" once every diff is fixed or explicitly accepted in writing.

*When done: record the date, operator role (owner/volunteer), and results in `STATUS.md` and the README accessibility statement.*
