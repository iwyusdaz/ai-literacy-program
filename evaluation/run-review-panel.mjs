#!/usr/bin/env node
// Multi-model review panel — PENDING PIPELINE (requires API key).
//
// What it does when run for real:
//   - Reviews the curriculum with >= 2 models (MODEL_A, MODEL_B; MODEL_C optional)
//     in THREE reviewer roles: L&D practitioner, accessibility & plain language,
//     curriculum alignment. Roles rotate across models so every role is covered
//     by more than one model where possible.
//   - Reads the actual content files from docs/ — reviewers see the same text
//     the reviewer-agent sees.
//   - Reports agreement: page-level overlap of flagged issues (Jaccard) and
//     matched issues (same page + same severity, tolerant text overlap).
//   - Writes raw outputs to evaluation/results/review-panel/ and a summary to
//     evaluation/results/review-panel-summary.md.
//
// Honesty rules encoded here:
//   - Method label: "Agent review" / "AI review panel" — NEVER "educator review"
//     or "expert feedback". Output may share the author's underlying model —
//     stated as a limitation in every summary.
//
// Usage:
//   node evaluation/run-review-panel.mjs            (real run; needs .env)
//   node evaluation/run-review-panel.mjs --dry-run  (stub outputs to dry-run/, no network)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { requireSlots, isDryRun, ensureDir, writeJson, chat, extractJson, DRY_RUN_HEADER } from "./lib/env.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const resultsDir = path.join(repoRoot, "evaluation", "results");
const rawDir = path.join(resultsDir, "review-panel");
const dryDir = path.join(repoRoot, "dry-run", "review-panel");
const dry = isDryRun(process.argv);

const REVIEW_TARGETS = [
  "docs/design/learning-objectives.md",
  "docs/workplace/module-1-what-ai-is.md",
  "docs/workplace/module-2-checking-outputs.md",
  "docs/workplace/module-3-data-and-privacy.md",
  "docs/workplace/module-4-oversight-and-escalation.md",
  "docs/workplace/job-aid-verify-before-you-send.md",
  "docs/school/teacher-guide.md",
  "docs/school/lesson-1-how-ai-makes-text.md",
  "docs/school/lesson-2-when-ai-gets-it-wrong.md",
  "docs/school/lesson-3-bias-and-fairness.md",
  "docs/school/lesson-4-using-ai-to-learn-not-to-skip.md",
  "docs/assessment/scenario-quiz/items.json"
];

const ROLES = [
  {
    id: "R1",
    name: "L&D practitioner reviewer (role-played by a model — NOT a human expert)",
    focus: `Judge as an experienced corporate L&D practitioner would:
- clarity and credibility of the scenarios for busy employees
- whether the objectives are observable and the practice matches them
- usefulness of the job aid at the moment of need
- anything a stakeholder would push back on`
  },
  {
    id: "R2",
    name: "Accessibility & plain-language reviewer (role-played by a model — NOT a human expert)",
    focus: `Judge as an accessibility and plain-language reviewer would:
- B1 plain-language: long sentences, idioms, unexplained jargon
- heading structure, link text meaning out of context
- instructions that assume mouse use or color vision
- cognitive load: chunks, word counts, reading order`
  },
  {
    id: "R3",
    name: "Curriculum alignment reviewer (role-played by a model — NOT a human expert)",
    focus: `Judge as a curriculum design reviewer would:
- objective/content/assessment alignment (docs/design/alignment-matrix.md mapping)
- quiz item quality: plausible distractors, single defensible answer, feedback quality
- rubric coverage of the performance task
- honest framework mapping (AILit/Article 4) without overclaiming`
  }
];

const SCHEMA = `{
  "role": "ROLE_ID",
  "target": "FILE_PATH",
  "issues": [
    {"page": "FILE_PATH", "section": "heading or location", "severity": "major|minor", "issue": "one paragraph", "suggestion": "one line"}
  ],
  "scores": {"clarity": 1-5, "accuracy": 1-5, "usefulness": 1-5, "completeness": 1-5},
  "overall_note": "one paragraph"
}`;

function buildPrompt(role, targetRel) {
  const targetAbs = path.join(repoRoot, targetRel);
  const text = fs.readFileSync(targetAbs, "utf8").slice(0, 20000);
  return `You are role-playing a structured design review. You are a MODEL, not a human; label nothing as human judgment.

Role: ${role.name}
Focus:
${role.focus}

Review the following file for those qualities. Ignore pure style preferences. Report at most 6 issues, each tied to a location.

--- FILE: ${targetRel} ---
${text}

Respond with JSON exactly like:
${SCHEMA}`;
}

function tokenize(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9 ]+/g, " ").split(/\s+/).filter((w) => w.length > 3);
}
function textOverlap(a, b) {
  const A = new Set(tokenize(a));
  const B = new Set(tokenize(b));
  if (!A.size || !B.size) return 0;
  let inter = 0;
  for (const w of A) if (B.has(w)) inter++;
  return inter / Math.min(A.size, B.size);
}

function agreementBetween(modelA, modelB) {
  const pagesA = new Set(modelA.map((i) => i.page));
  const pagesB = new Set(modelB.map((i) => i.page));
  const union = new Set([...pagesA, ...pagesB]);
  const inter = [...pagesA].filter((p) => pagesB.has(p)).length;
  const jaccard = union.size ? inter / union.size : null;
  let matched = 0;
  for (const a of modelA) {
    if (modelB.some((b) => b.page === a.page && b.severity === a.severity && textOverlap(a.issue, b.issue) >= 0.3)) matched++;
  }
  return {
    jaccard_pages: jaccard === null ? null : Number(jaccard.toFixed(2)),
    matched_issues: matched,
    total_a: modelA.length,
    total_b: modelB.length
  };
}

async function runReal() {
  const slotEntries = Object.entries(requireSlots(["MODEL_A", "MODEL_B"])); // >=2 models required
  const optionalC = slotStatusSafe("MODEL_C");
  ensureDir(rawDir);

  // Every required model reviews every role (so agreement is measurable per
  // role); MODEL_C, if configured, adds a third voice on all roles.
  const assignments = [];
  for (const role of ROLES) {
    for (const [slotName, slot] of slotEntries) {
      assignments.push({ role, slotName, slot });
    }
    if (optionalC) assignments.push({ role, slotName: "MODEL_C", slot: optionalC });
  }

  console.log(`[Review panel] ${assignments.length} reviews: ${ROLES.length} roles x ${slotEntries.length} required model(s)${optionalC ? " + MODEL_C" : ""}. Label: Agent review (AI) — not human expert review.`);

  for (const target of REVIEW_TARGETS) {
    for (const { role, slotName, slot } of assignments) {
      const fileId = target.replace(/^docs\//, "").replace(/[/.]/g, "-");
      const outName = `${fileId}-${role.id}-${slotName.toLowerCase()}.json`;
      process.stdout.write(`[Review panel] ${target} · ${role.id} · ${slotName} … `);
      try {
        const text = await chat(slot, [
          { role: "system", content: "You are a model performing a structured curriculum review. Respond with strict JSON only." },
          { role: "user", content: buildPrompt(role, target) }
        ]);
        const parsed = extractJson(text);
        const record = { model: slotName, model_name: slot.model, method: "Agent review (AI) — not human expert review", target, role: role.id, role_name: role.name, ...parsed };
        writeJson(path.join(rawDir, outName), record);
        console.log("ok");
      } catch (err) {
        console.log("FAILED");
        writeJson(path.join(rawDir, outName.replace(".json", ".failed.json")), { target, role: role.id, model: slotName, error: String(err.message || err) });
      }
    }
  }

  writeSummary(assignments, optionalC);
  console.log(`[Review panel] Raw outputs in evaluation/results/review-panel/. Summary: evaluation/results/review-panel-summary.md`);
  console.log(`[Review panel] NEXT: follow the rerun procedure in evaluation/METHODS.md to refresh METHODS.md and README status lines.`);
}

function slotStatusSafe(prefix) {
  // probe without exiting (process.env is already populated by requireSlots -> loadDotenv)
  const missing = [`${prefix}_BASE_URL`, `${prefix}_API_KEY`, `${prefix}_NAME`].filter((k) => {
    const v = process.env[k];
    return !v || String(v).trim() === "" || String(v).trim().startsWith("YOUR_");
  });
  if (missing.length) return null;
  return {
    baseUrl: process.env[`${prefix}_BASE_URL`].replace(/\/+$/, ""),
    apiKey: process.env[`${prefix}_API_KEY`],
    model: process.env[`${prefix}_NAME`]
  };
}

function collectIssues(slotName) {
  const issues = [];
  if (!fs.existsSync(rawDir)) return issues;
  for (const f of fs.readdirSync(rawDir)) {
    if (!f.endsWith(`-${slotName.toLowerCase()}.json`)) continue;
    try {
      const r = JSON.parse(fs.readFileSync(path.join(rawDir, f), "utf8"));
      (r.issues || []).forEach((i) => issues.push({ page: i.page || r.target, severity: i.severity, issue: i.issue }));
    } catch { /* skip unreadable */ }
  }
  return issues;
}

function writeSummary(assignments, optionalC) {
  const lines = [];
  lines.push("# Multi-model review panel — results summary");
  lines.push("");
  lines.push(`Generated: ${new Date().toISOString().slice(0, 10)} · Method: **Agent review / AI review panel** (roles × models).`);
  lines.push("");
  lines.push("> **Limitation (always stated):** panel models may share the underlying model that drafted the content; they are not human experts, and this is not educator feedback.");
  lines.push("");
  lines.push("## Reviews completed");
  lines.push("");
  lines.push("| Target | Role | Model | Scores (clarity/accuracy/usefulness/completeness) | Issues (major/minor) |");
  lines.push("|---|---|---|---|---|");
  for (const target of REVIEW_TARGETS) {
    for (const { role, slotName } of assignments) {
      const fileId = target.replace(/^docs\//, "").replace(/[/.]/g, "-");
      const file = path.join(rawDir, `${fileId}-${role.id}-${slotName.toLowerCase()}.json`);
      if (fs.existsSync(file)) {
        const r = JSON.parse(fs.readFileSync(file, "utf8"));
        const s = r.scores || {};
        const majors = (r.issues || []).filter((i) => i.severity === "major").length;
        const minors = (r.issues || []).filter((i) => i.severity === "minor").length;
        lines.push(`| ${target} | ${role.id} | ${r.model_name || slotName} | ${s.clarity ?? "?"}/${s.accuracy ?? "?"}/${s.usefulness ?? "?"}/${s.completeness ?? "?"} | ${majors}/${minors} |`);
      } else {
        lines.push(`| ${target} | ${role.id} | PENDING: requires API key | – | – |`);
      }
    }
  }
  lines.push("");
  lines.push("## Agreement between models");
  lines.push("");
  lines.push("| Comparison | Page-level Jaccard | Matched issues (page+severity, tolerant text overlap) |");
  lines.push("|---|---|---|");
  const a = collectIssues("MODEL_A");
  const b = collectIssues("MODEL_B");
  if (a.length || b.length) {
    const ag = agreementBetween(a, b);
    lines.push(`| MODEL_A vs MODEL_B (all roles) | ${ag.jaccard_pages ?? "–"} | ${ag.matched_issues} matched (A: ${ag.total_a}, B: ${ag.total_b}) |`);
  } else {
    lines.push("| MODEL_A vs MODEL_B | PENDING: requires API key | PENDING: requires API key |");
  }
  if (optionalC) {
    const c = collectIssues("MODEL_C");
    if (c.length) {
      const agC = agreementBetween(a, c);
      lines.push(`| MODEL_A vs MODEL_C (all roles) | ${agC.jaccard_pages ?? "–"} | ${agC.matched_issues} matched (A: ${agC.total_a}, C: ${agC.total_b ?? c.length}) |`);
    } else {
      lines.push("| MODEL_A vs MODEL_C | PENDING: requires API key | PENDING: requires API key |");
    }
  }
  lines.push("");
  lines.push("## How to read this");
  lines.push("");
  lines.push("- Agreement is a heuristic (page overlap + tolerant text match), not inter-rater reliability in the psychometric sense.");
  lines.push("- Issues feed the same revision log as the reviewer-agent's findings; accepted changes are recorded in the evaluation report.");
  lines.push("");
  fs.writeFileSync(path.join(resultsDir, "review-panel-summary.md"), lines.join("\n") + "\n");
}

async function runDry() {
  ensureDir(dryDir);
  const slotNames = ["MODEL_A", "MODEL_B"];
  for (const target of REVIEW_TARGETS) {
    for (const role of ROLES) {
      for (const slotName of slotNames) {
        const fileId = target.replace(/^docs\//, "").replace(/[/.]/g, "-");
        writeJson(path.join(dryDir, `${fileId}-${role.id}-${slotName.toLowerCase()}.json`), {
          dry_run: true,
          notice: DRY_RUN_HEADER,
          method: "Agent review (AI) — not human expert review",
          target,
          role: role.id,
          model: `${slotName} (stub)`,
          issues: [],
          scores: null,
          overall_note: "STUB – pipeline not run"
        });
      }
    }
  }
  fs.writeFileSync(
    path.join(dryDir, "README.md"),
    [DRY_RUN_HEADER, "", "Stub outputs produced by `node evaluation/run-review-panel.mjs --dry-run`.", "The pipeline code path was exercised WITHOUT any network call.", ""].join("\n")
  );
  fs.writeFileSync(
    path.join(dryDir, "review-panel-summary.md"),
    [DRY_RUN_HEADER, "", "# Review panel — DRY RUN summary (stub)", "", "| Target | Role | Model | Scores | Issues |", "|---|---|---|---|---|", "| STUB | STUB | STUB | STUB | STUB |", ""].join("\n")
  );
  console.log(`[Review panel] DRY RUN: ${REVIEW_TARGETS.length * ROLES.length * 2} stub files written to dry-run/review-panel/. No network calls were made.`);
}

if (dry) {
  await runDry();
} else {
  await runReal();
}
