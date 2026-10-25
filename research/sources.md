# Annotated sources

All sources were accessed and verified on **2026-10-25** unless noted. Where a claim in this repository rests on a source, the source is listed here with what it supports and any cautions.

## Policy and framework (primary)

1. **AI Act Service Desk (European Commission), "Article 4 — AI literacy"** — <https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-4>
   - *What it is:* Consolidated text of Article 4 as amended by the Digital Omnibus on AI (consolidation shown as at 27 July 2026).
   - *Supports:* The exact current obligation structure: Art. 4(1) — providers and deployers shall take measures to support the development of AI literacy of their staff and other persons dealing with the operation and use of AI systems on their behalf, accounting for technical knowledge, experience, education and training, context of use, and the persons or groups affected; the amendment adds "This obligation does not require providers or deployers to guarantee any specific level of AI literacy of any individual." Art. 4(2) — Commission and Member States support and facilitate efforts (especially SMEs) and publish practical examples. Art. 4(3) — the (AI) Board adopts recommendations taking into account European competence frameworks.
   - *Caution:* Not legal advice; text may be further amended. Check the service desk for the current consolidation.

2. **European Commission, "AI talent, skills and literacy" policy page** — <https://digital-strategy.ec.europa.eu/en/policies/ai-talent-skills-and-literacy>
   - *Supports:* Timeline: Article 4 applies since **2 February 2025**; amended by the Digital Omnibus on AI (entered into force mid-July 2026); supervision and enforcement by national market surveillance authorities began **2 August 2026**. Replicating practices from the Commission's repository does not create a presumption of compliance.

3. **European Commission, "AI literacy — Questions & Answers"** — <https://digital-strategy.ec.europa.eu/faqs/ai-literacy-questions-answers> (page last updated 2026-10-20; accessed 2026-10-25)
   - *Supports:* Clarifications used throughout the modules: no mandatory format or "one-size-fits-all" training; formal training is not required (relying only on user instructions is often ineffective); no certificates, specific governance structure, or AI officer required; high-risk-system deployers keep separate Article 26 human-oversight training duties; even routine uses (ad text, translation) fall under the obligation.

4. **OECD & European Commission, *Empowering Learners for the Age of AI: An AI Literacy Framework for Primary and Secondary Education* (AILit framework), June 2026** — <https://ailiteracyframework.org> (interactive: <https://ailiteracyframework.org/frameworks>; OECD record: <https://www.oecd.org/en/publications/empowering-learners-for-the-age-of-ai_65cd27d4-en.html>)
   - *Supports:* The four **final** domain names — **Engage with AI, Create with AI, Manage AI, Shape AI** — and the 19 competences with three progression levels (Basic, Intermediate, Advanced). Note: the 2025 draft named the fourth domain "Designing AI"; the final version renamed it "Shape AI". Exact competence names are quoted in [framework-mapping.md](../docs/design/framework-mapping.md).
   - *Caution:* The OECD publication page returns 403 to some automated fetches; the framework site and interactive were used as the verification source.

## Evidence on workplace AI use and training (secondary research)

5. **Teamed, "L&D Skills Landscape 2026: What's hot, what's not"** — <https://www.teamedforlearning.com/ld-skills-landscape-2026-whats-hot-whats-not/>
   - *Supports:* AI appears in **43.3%** of L&D job postings in the most recent three-month period (up from 14.6% before 2026), but only **8.3%** of postings name a specific generative AI tool, model or practice. Used in the needs analysis as evidence of demand-without-specification.

6. **Microsoft & LinkedIn, 2024 Work Trend Index, "AI at Work Is Here. Now Comes the Hard Part" (May 2024)** — <https://www.microsoft.com/en-us/worklab/work-trend-index/ai-at-work-is-here-now-comes-the-hard-part>
   - *Supports:* **75% of knowledge workers** use generative AI at work; **46%** of users started in the previous six months. Survey of 31,000 workers and leaders across 31 countries. Used as evidence that use is already widespread and largely self-taught.

7. **McKinsey, "The State of AI" global survey (published November 2025)** — <https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai>
   - *Supports:* **88% of respondent organizations** report using AI in at least one business function; organizational adoption is broad but scaling is uneven. Used for the adoption context.
   - *Verification note:* mckinsey.com blocks automated access (verified 2026-10-25: both direct fetch and reader tools are denied). The 88% figure was confirmed against McKinsey's own chart page ("AI at work but not at scale") as surfaced in web search on 2026-10-25, but it could not be fetched directly. If precision matters for your use, verify this figure manually before citing.

8. **Interface (EU), "An operational framework for AI literacy in the workplace"** — <https://www.interface-eu.org/publications/ai-literacy-workplace-framework>
   - *Supports (phrasing matters):* Corporate AI training "often prioritises productivity and tool use" while responsible use also requires understanding of limitations, failure modes, potential harms and applicable obligations; and validated assessment methods for workplace AI literacy are lacking (few validated scales tested beyond basic validity, none tested across cultures; citing Lintner 2024).
   - *Caution:* This brief does **not** say "no AI literacy program has ever worked" — it argues measurement tools are insufficient to verify that Article 4 measures improve understanding. Do not overstate this claim.

## Learning design evidence

9. **Makransky, G. K., et al., "Adding Immersive Virtual Reality to a Science Lab Simulation Causes More Presence but Less Learning"** — <https://www.researchgate.net/publication/321978607>
   - *Supports:* The decision to make the 2D next-word interactive the default (immersive formats can increase presence while reducing learning). See [design decisions](../docs/design/design-decisions.md).

10. **Thalheimer, W., "LTEM: Learning–Transfer–Evaluation Model"** — <https://www.worklearning.com/ltem/>
    - *Supports:* The structure of the [evaluation plan](../docs/design/evaluation-plan.md) (Tier 8 = perception; Tier 5 = decision-making competence; Tiers 1–3 = activity/attendance, which we deliberately do not present as evidence).

11. **Frontiers in Psychology (2026), systematic review: Generative AI and cognitive load** — <https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2026.1921504/full>
    - *Supports:* Cognitive-load rationale for short, chunked modules and a 2D-first interactive. (Review of GenAI's effects on cognitive load.)

## Web standards

12. **W3C, "Web Content Accessibility Guidelines (WCAG) 2.1"** — <https://www.w3.org/TR/WCAG21/>
    - *Supports:* The accessibility baseline (contrast, keyboard, reflow, etc.) in the repository README and the accessibility statement.
