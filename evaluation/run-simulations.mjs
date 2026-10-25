#!/usr/bin/env node
// Simulated learner runs + item analysis — PENDING PIPELINE (requires API key).
//
// What it does when run for real:
//   - Plays each persona (from docs/design/personas.md) at two prior-knowledge
//     levels through the relevant module/lesson content and quiz items,
//     reading the actual content files from docs/.
//   - 5 personas x 2 levels = 10 runs (spec requires >= 8).
//   - Uses MODEL_A (and MODEL_B for the same runs, to compare two models on
//     item quality). A model never judges its own authorship: the content was
//     AI-drafted, so results are item-quality/clarity signals only — NEVER
//     learning gains.
//   - Writes raw outputs to evaluation/results/simulations/ and a summary to
//     evaluation/results/simulations-summary.md.
//
// Honesty rules encoded here:
//   - Output is labeled "AI-simulated persona" everywhere it is written.
//   - Results tables start empty with "PENDING: requires API key" until a real run.
//
// Usage:
//   node evaluation/run-simulations.mjs            (real run; needs .env)
//   node evaluation/run-simulations.mjs --dry-run  (stub outputs to dry-run/, no network)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { requireSlots, isDryRun, ensureDir, writeJson, chat, extractJson, DRY_RUN_HEADER } from "./lib/env.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const resultsDir = path.join(repoRoot, "evaluation", "results");
const rawDir = path.join(resultsDir, "simulations");
const dryDir = path.join(repoRoot, "dry-run", "simulations");
const dry = isDryRun(process.argv);

const PERSONAS = [
  {
    id: "P1",
    name: "Lena, 27 — customer service agent (fictional)",
    track: "workplace",
    priorUse: "daily, uncritical",
    levels: { low: "has never thought about AI errors; trusts fluent output", high: "has read about hallucinations but has no routine" },
    content: ["docs/workplace/module-2-checking-outputs.md", "docs/workplace/module-3-data-and-privacy.md"],
    quizItems: ["Q4", "Q5", "Q6", "Q7", "Q8", "Q9"]
  },
  {
    id: "P2",
    name: "Joris, 45 — operations planner (fictional)",
    track: "workplace",
    priorUse: "occasional, skeptical",
    levels: { low: "trusts numbers in AI summaries", high: "checks totals but not citations" },
    content: ["docs/workplace/module-2-checking-outputs.md"],
    quizItems: ["Q4", "Q5", "Q6"]
  },
  {
    id: "P3",
    name: "Sofia, 38 — HR administrator (fictional)",
    track: "workplace",
    priorUse: "low",
    levels: { low: "has not considered bias in tools", high: "knows the word 'bias' but not where it hides" },
    content: ["docs/workplace/module-4-oversight-and-escalation.md"],
    quizItems: ["Q10", "Q11", "Q12"]
  },
  {
    id: "P4",
    name: "Ayo, 15 — student (fictional)",
    track: "school",
    priorUse: "high, fluent chatbot user",
    levels: { low: "believes the chatbot 'knows things'", high: "knows it can be wrong, not why" },
    content: ["docs/school/lesson-2-when-ai-gets-it-wrong.md", "docs/school/handouts/fact-check-worksheet.md"],
    quizItems: []
  },
  {
    id: "P5",
    name: "Mr. Daniels — non-specialist teacher (fictional)",
    track: "school",
    priorUse: "low-medium",
    levels: { low: "anxious about technical questions", high: "comfortable, wants timing details" },
    content: ["docs/school/teacher-guide.md", "docs/school/lesson-1-how-ai-makes-text.md"],
    quizItems: []
  }
];

const SYSTEM_PROMPT = `You are helping evaluate the clarity of a learning design by role-playing a learner. This is a SIMULATION for item-quality analysis:
- You are NOT a real person and your answers are NOT evidence of learning.
- Role-play the persona faithfully, including their misconceptions. Do not invent knowledge the persona would not have.
- Flag anything confusing, ambiguous, or unrealistic IN THE MATERIALS — that is the main output.
- Answer in strict JSON only, matching the requested schema.`;

function personaPrompt(persona, level) {
  const contentFiles = persona.content.map((rel) => {
    const text = fs.readFileSync(path.join(repoRoot, rel), "utf8");
    return `--- CONTENT FILE: ${rel} ---\n${text.slice(0, 12000)}`;
  });
  let itemsBlock = "";
  if (persona.quizItems.length) {
    const itemsPath = path.join(repoRoot, "docs/assessment/scenario-quiz/items.json");
    const all = JSON.parse(fs.readFileSync(itemsPath, "utf8")).items;
    const subset = all.filter((it) => persona.quizItems.includes(it.id));
    itemsBlock = `\n--- QUIZ ITEMS (answer each as the persona) ---\n${JSON.stringify(
      subset.map((it) => ({ id: it.id, stem: it.stem, options: it.options.map((o) => o.text) })),
      null,
      1
    )}`;
  }
  return `Persona: ${persona.name}
Prior AI use: ${persona.priorUse}
Prior-knowledge level for THIS run: ${level} — ${persona.levels[level]}

Read the learning materials below as this persona would (skimming like a busy person, trusting what sounds plausible), then:
1. Answer the quiz items (if any) with the option index (0-based) the persona would pick.
2. List confusion points: anything the persona would misunderstand or stumble on.
3. List ambiguous items: quiz items where two answers seem defensible, with the competing option indexes.
4. List unrealistic scenario elements (things that would not happen in this workplace/school).
5. State whether the persona would have dropped off (given up) and where.

${contentFiles.join("\n\n")}${itemsBlock}

Respond with JSON exactly like:
{
  "run_id": "RUN_ID",
  "persona_id": "PERSONA_ID",
  "level": "${level}",
  "simulated": true,
  "answers": [{"id": "Q4", "choice": 1, "confidence": "high|medium|low", "why": "one line"}],
  "confusion_points": [{"where": "module/section or item id", "what": "one line"}],
  "ambiguous_items": [{"id": "Q5", "defensible_options": [0, 2], "why": "one line"}],
  "unrealistic_elements": ["..."],
  "would_drop_off": false,
  "drop_off_where": null
}`;
}

function stubRun(persona, level, slotName) {
  return {
    dry_run: true,
    notice: DRY_RUN_HEADER,
    run_id: `${persona.id}-${level}`,
    persona_id: persona.id,
    level,
    model: `${slotName} (stub)`,
    simulated: true,
    answers: persona.quizItems.map((id) => ({ id, choice: null, confidence: null, why: "STUB – pipeline not run" })),
    confusion_points: [],
    ambiguous_items: [],
    unrealistic_elements: [],
    would_drop_off: null,
    drop_off_where: null
  };
}

async function runReal() {
  const slots = requireSlots(["MODEL_A", "MODEL_B"]); // exits(1) before any network if unset
  ensureDir(rawDir);

  const runs = [];
  for (const persona of PERSONAS) {
    for (const level of ["low", "high"]) {
      for (const [slotName, slot] of Object.entries(slots)) {
        runs.push({ persona, level, slotName, slot });
      }
    }
  }
  console.log(`[Simulations] ${runs.length} simulated runs (10 persona-level combos x ${Object.keys(slots).length} models). Label: AI-simulated personas — not real learners.`);

  for (const { persona, level, slotName, slot } of runs) {
    const runId = `${persona.id}-${level}-${slotName.toLowerCase()}`;
    process.stdout.write(`[Simulations] run ${runId} … `);
    try {
      const text = await chat(slot, [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: personaPrompt(persona, level).replace("RUN_ID", runId).replace("PERSONA_ID", persona.id) }
      ]);
      const parsed = extractJson(text);
      const record = { run_id: runId, persona_id: persona.id, level, model: slotName, model_name: slot.model, simulated: true, notice: "AI-simulated persona run — not a real learner", ...parsed };
      writeJson(path.join(rawDir, `${runId}.json`), record);
      console.log("ok");
    } catch (err) {
      console.log("FAILED");
      writeJson(path.join(rawDir, `${runId}.failed.json`), { run_id: runId, error: String(err.message || err) });
    }
  }

  writeSummary(slots);
  console.log(`[Simulations] Raw outputs in evaluation/results/simulations/. Summary: evaluation/results/simulations-summary.md`);
  console.log(`[Simulations] NEXT: follow the rerun procedure in evaluation/METHODS.md to refresh METHODS.md and README status lines.`);
}

function writeSummary(slots) {
  const modelNames = Object.values(slots).map((s) => s.model).join(", ");
  const lines = [];
  lines.push("# Simulated learner runs — results summary");
  lines.push("");
  lines.push(`Generated: ${new Date().toISOString().slice(0, 10)} · Method: **AI-simulated personas** (models: ${modelNames}) · 10 runs (5 personas × 2 prior-knowledge levels × 2 models).`);
  lines.push("");
  lines.push("> **These are simulated runs. They CANNOT show learning gains** (the personas may already know the content). They surface item-quality and clarity problems only.");
  lines.push("");
  lines.push("## Per-run overview");
  lines.push("");
  lines.push("| Run | Persona (fictional) | Level | Model | Dropped off | Confusion points | Ambiguous items |");
  lines.push("|---|---|---|---|---|---|---|");
  for (const persona of PERSONAS) {
    for (const level of ["low", "high"]) {
      for (const slotName of Object.keys(slots)) {
        const runId = `${persona.id}-${level}-${slotName.toLowerCase()}`;
        const file = path.join(rawDir, `${runId}.json`);
        if (fs.existsSync(file)) {
          const r = JSON.parse(fs.readFileSync(file, "utf8"));
          lines.push(`| ${runId} | ${persona.name} | ${level} | ${r.model_name || slotName} | ${r.would_drop_off ? `yes (${r.drop_off_where ?? "?"})` : "no"} | ${(r.confusion_points || []).length} | ${(r.ambiguous_items || []).length} |`);
        } else {
          lines.push(`| ${runId} | ${persona.name} | ${level} | PENDING: requires API key | – | – | – |`);
        }
      }
    }
  }
  lines.push("");
  lines.push("## Item analysis (quiz items answered across runs)");
  lines.push("");
  lines.push("| Item | Objective | Picked-correct rate (simulated) | Notes from confusion points |");
  lines.push("|---|---|---|---|");
  lines.push("| Q1–Q12 | see items.json | PENDING: requires API key | PENDING: requires API key |");
  lines.push("");
  lines.push("## Agreement between the two models (item choices)");
  lines.push("");
  lines.push("Reported as the share of items where MODEL_A and MODEL_B personas made the same choice, per persona-level. PENDING: requires API key.");
  lines.push("");
  fs.writeFileSync(path.join(resultsDir, "simulations-summary.md"), lines.join("\n") + "\n");
}

async function runDry() {
  ensureDir(dryDir);
  const slotNames = ["MODEL_A", "MODEL_B"];
  for (const persona of PERSONAS) {
    for (const level of ["low", "high"]) {
      for (const slotName of slotNames) {
        const runId = `${persona.id}-${level}-${slotName.toLowerCase()}`;
        writeJson(path.join(dryDir, `${runId}.json`), stubRun(persona, level, slotName));
      }
    }
  }
  const header = [DRY_RUN_HEADER, "", "Stub outputs produced by `node evaluation/run-simulations.mjs --dry-run`.", "The pipeline code path was exercised WITHOUT any network call.", ""].join("\n");
  fs.writeFileSync(path.join(dryDir, "README.md"), header);
  // also produce a dry summary to prove the summary generator works
  const summaryLines = [
    DRY_RUN_HEADER,
    "",
    "# Simulated learner runs — DRY RUN summary (stub)",
    "",
    "| Run | Persona (fictional) | Level | Model | Dropped off | Confusion points | Ambiguous items |",
    "|---|---|---|---|---|---|---|",
    ...PERSONAS.flatMap((p) =>
      ["low", "high"].flatMap((lvl) => slotNames.map((s) => `| ${p.id}-${lvl}-${s.toLowerCase()} | ${p.name} | ${lvl} | ${s} (stub) | STUB | STUB | STUB |`))
    ),
    ""
  ].join("\n");
  fs.writeFileSync(path.join(dryDir, "simulations-summary.md"), summaryLines + "\n");
  console.log(`[Simulations] DRY RUN: ${PERSONAS.length * 2 * 2} stub run files written to dry-run/simulations/. No network calls were made.`);
}

if (dry) {
  await runDry();
} else {
  await runReal();
}
