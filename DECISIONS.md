# DECISIONS — process decisions log

Every ambiguity encountered while building this repository → the choice made → why. Learning-design decisions live in [docs/design/design-decisions.md](docs/design/design-decisions.md); this file records build-process decisions. Author: build agent (AI-assisted), 2026-10-25.

## D1. Optional three.js "embedding space" experiment — SKIPPED

- **Ambiguity:** the plan marked the 3D embedding-space interactive as optional and tied it to a human comparison test ("test both with 3–4 people, document which helped understanding more").
- **Choice:** skip it entirely; do not create `interactives/embedding-space-3d/`.
- **Why:** the comparison test that would justify the experiment is not available in this build (no human participants; simulating a comparison would violate the honesty rules). The 2D next-word interactive fully satisfies the "at least one accessible interactive built and tested" success criterion. Building an untestable experiment would be gold-plating with real accessibility cost. Recorded as a portfolio decision with rationale in [design decisions D4](docs/design/design-decisions.md).
- **Revisit when:** a human comparison test becomes possible (then build both and document).

## D2. School track built now, not deferred to v1.1

- **Ambiguity:** the plan allows the school track to be released as v1.1 if needed.
- **Choice:** build it fully in v1.0 (4 lessons + teacher guide + 4 handouts + final project).
- **Why:** build capacity existed; releasing both tracks shows the "same core concepts, two audiences" design goal that is central to the portfolio story.

## D3. Interviews replaced by secondary research; `research/interviews-summary.md` not created

- **Ambiguity:** the repo structure lists `research/interviews-summary.md` (optional).
- **Choice:** no interviews; created `research/secondary-research.md` (synthesis of published surveys with full citations + access dates) and kept the interview guide + consent text in `evaluation/human-protocol/` for future use.
- **Why:** binding [HUMAN] replacement rule — secondary research is real citable evidence; a fabricated interviews-summary would be dishonest.

## D4. Job aid: no PDF in v1.0; HTML/print page is the primary format

- **Ambiguity:** the plan asks for a "Markdown page + accessible PDF".
- **Choice:** the job aid is an HTML page styled to print on one page (browser print). No PDF committed.
- **Why:** plan section 9 explicitly allows "or offer an HTML version as the primary format". Generating a genuinely *tagged, reading-order-verified* PDF is not reliably possible in this environment; shipping an unverified PDF would be an accessibility risk disguised as a deliverable. Recorded as the documented deviation.

## D5. Fact verification before dependent content; one plan claim corrected

- **Ambiguity:** plan drafted framework domains as "engaging with / creating with / managing / designing AI".
- **Choice:** verified against the official framework site before writing the mapping: final domains are **Engage with AI / Create with AI / Manage AI / Shape AI** (19 competences, June 2026). All mapping uses final names.
- **Why:** binding fact-verification rule. The draft→final rename ("Designing AI" → "Shape AI") is noted in the research notes and the mapping page.
- Also corrected at verification: the Interface claim is stated precisely (productivity skew + measurement gap), not as the stronger "no published evidence any program works" phrasing.

## D6. Article 4 wording discipline

- **Choice:** the program is described as "designed to support Article 4 AI literacy measures" everywhere; never "compliant", "certified", "covers your obligations".
- **Why:** honesty rules + the amended Article 4 explicitly does not require any specific level; certification claims would overstate both the law and this program.

## D7. Reviewer-agent review labeled "Agent review", scheduled post-build

- **Ambiguity:** the plan's Phase 4 peer review and the [HUMAN] replacements require a structured review by a separate reviewer agent, which runs after this build completes.
- **Choice:** prepared `evaluation/human-protocol/review-form.md`; documented the review in METHODS.md as **Agent review** with status "scheduled post-build" and the same-underlying-model limitation; the README uses the mandated evaluation-status line. The reviewer agent's findings will land in the evaluation report and issue tracker.
- **Why:** it is never labeled "educator review" or "expert feedback"; sequencing is disclosed rather than implied.

## D8. Pipeline results regeneration: documented procedure, not auto-rewriting docs

- **Ambiguity:** "after a real run the pipeline regenerates results tables, METHODS.md status, README notice" vs. "don't implement auto-generation beyond a documented rerun procedure".
- **Choice:** pipelines regenerate their own summary tables (`evaluation/results/*-summary.md`) from raw outputs automatically; updating METHODS.md / README / evaluation-report status lines is a **documented manual rerun procedure** (METHODS.md → "Rerun procedure", step 4).
- **Why:** auto-rewriting prose documents from a script risks silent overwrites of hand-written context; a checklist is auditable.

## D9. Standalone HTML for quiz and interactive (no Jekyll chrome)

- **Ambiguity:** quiz and interactive could be wrapped in the theme layout or standalone.
- **Choice:** standalone HTML documents with their own CSS, linked from the themed pages.
- **Why:** full control over every element (a11y requirement), no theme CSS interference at 400% zoom, and the pages work identically when served statically or offline. Trade-off: they don't appear in the Just the Docs sidebar nav; they are linked from the home page, track pages, lessons and the assessment index instead.

## D10. Mermaid diagrams on a Jekyll site

- **Ambiguity:** GitHub renders Mermaid in Markdown; the Jekyll build does not.
- **Choice:** used Mermaid blocks for the three process diagrams, each with a **text summary immediately below** ("Text summary: …").
- **Why:** per build instructions. On the Pages site the diagrams render as code blocks — the text summary carries the content; on github.com they render as diagrams. No information is lost in either rendering.

## D11. Quiz fetch + noscript fallback

- **Choice:** `items.json` is fetched at runtime (keeps items editable as data); the page includes a noscript block linking to the raw `items.json` and the module content for JS-free access.
- **Why:** the plan specifies loading items from `items.json`. The fetch requires the page to be served over HTTP (as it is on Pages); the error message and noscript cover `file://` opens.

## D12. VoiceOver claims discipline

- **Choice:** zero VoiceOver claims anywhere. The manual check script is provided with expected announcements; the README accessibility statement says a review by a daily assistive-technology user has not happened.
- **Why:** Guidepup automation is non-functional on macOS 27 (environment fact); fabricating AT evidence is prohibited.
