# Changelog

All notable changes to this project are documented here. Format based on Keep a Changelog; versioning is date-based for content (curricula change as sources change).

## [1.0.0] — 2026-10-25

### Added
- Workplace track: 4 self-paced modules (What AI is; Checking outputs; Data and privacy; Oversight and escalation) + "Verify before you send" job aid.
- School track: teacher guide, 4 × 50-minute lessons, printable handouts, final project.
- Assessment: 12-item scenario quiz (per-option feedback, by-objective results), performance task with constructed "AI-drafted" documents (workplace memo + school essay variant), 4×4 rubric.
- Shared interactive: "How a chatbot picks the next word" (vanilla JS, hard-coded probabilities, no network).
- Design documentation: needs analysis, personas, learning objectives, alignment matrix, framework mapping (final AILit domains), design decisions, evaluation plan, evaluation report.
- Research: annotated sources, framework notes (Article 4 as amended; AILit final), secondary-research synthesis replacing interviews.
- Evaluation: METHODS.md method inventory; human-protocol kit (consent text, interview guide, pre/post forms A/B, survey, think-aloud script, review form, manual VoiceOver check script); pending pipelines (`run-simulations.mjs`, `run-review-panel.mjs`) with `--dry-run` support and zero-network env guard; pending results tables.
- Site: Jekyll + Just the Docs v0.12.0 (pinned), deployed from `/docs`.

### Deliberately excluded
- Optional three.js "embedding space" experiment (see DECISIONS.md D1: skipped — no human comparison test available; the 2D interactive satisfies the interactive criterion).
- PDF versions of the job aid (HTML/print page is the primary format; see DECISIONS.md D4).
- LMS/SCORM packaging (next step for adopters).
