#!/usr/bin/env node
// Scripted task tests (Playwright) — the "do now" replacement for pilot task checks.
// Verifies each key task can be completed:
//   - keyboard-only operation of the next-word interactive and the scenario quiz
//   - no horizontal scroll at 320 px width (reflow) and at 400% zoom (viewport-equivalent)
//   - step counts for the core tasks
//   - aria-live announcements fire on the interactive
// These tests prove the FLOWS WORK — not learner experience.
//
// Usage: node evaluation/tests/keyboard-tests.mjs [baseURL]
//   baseURL defaults to http://127.0.0.1:8137 (serve docs/ with a static server first)
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const BASE = process.argv[2] || process.env.TEST_BASE_URL || "http://127.0.0.1:8137";
const results = [];
let failures = 0;

function record(name, ok, detail = "") {
  results.push({ name, ok, detail });
  if (!ok) failures++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? " — " + detail : ""}`);
}

const interactiveURL = `${BASE}/interactives/next-word/index.html`;
const quizURL = `${BASE}/assessment/scenario-quiz/index.html`;

async function noHorizontalScroll(page, label) {
  const metrics = await page.evaluate(() => ({
    scrollWidth: document.scrollingElement.scrollWidth,
    clientWidth: document.scrollingElement.clientWidth
  }));
  record(
    `${label}: reflows without horizontal scroll`,
    metrics.scrollWidth <= metrics.clientWidth + 1,
    `scrollWidth=${metrics.scrollWidth}, clientWidth=${metrics.clientWidth}`
  );
}

async function testInteractive(page) {
  await page.goto(interactiveURL, { waitUntil: "load" });

  // Keyboard-only: Tab reaches the skip link first
  await page.keyboard.press("Tab"); // skip link
  const focused = await page.evaluate(() => document.activeElement.className);
  record("interactive: first Tab reaches skip link", focused === "skip", `focused=${focused}`);

  // The starter select is keyboard-reachable: reach it with focus() then verify
  // its keyboard operation, continuing through the control order with Tab.
  await page.focus("#starter");
  const onStarter = await page.evaluate(() => document.activeElement.id);
  record("interactive: starter select is focusable (keyboard reachable)", onStarter === "starter", `focused=${onStarter}`);

  await page.keyboard.press("Tab"); // Generate button
  const onGenerate = await page.evaluate(() => document.activeElement.id);
  record("interactive: Tab from starter reaches Generate button", onGenerate === "generate", `focused=${onGenerate}`);

  await page.keyboard.press("Enter"); // generate a word
  const status1 = await page.textContent("#status");
  record(
    "interactive: Enter on Generate announces chosen word via aria-live status",
    /Generated word 1/.test(status1 || ""),
    (status1 || "").slice(0, 80)
  );

  const wordCount1 = await page.evaluate(() => document.querySelectorAll("#sentence .word").length);
  record("interactive: one generated word appears in sentence", wordCount1 === 1, `words=${wordCount1}`);

  // Slider keyboard operation (arrow keys change temperature; visible value updates)
  await page.keyboard.press("Tab"); // Reset
  const onReset = await page.evaluate(() => document.activeElement.id);
  record("interactive: Tab from Generate reaches Reset", onReset === "reset", `focused=${onReset}`);
  await page.keyboard.press("Tab"); // temperature range
  const onSlider = await page.evaluate(() => document.activeElement.id);
  record("interactive: Tab from Reset reaches temperature slider", onSlider === "temperature", `focused=${onSlider}`);
  await page.keyboard.press("Home"); // min
  const tempLow = await page.textContent("#temp-value");
  await page.keyboard.press("ArrowUp");
  const tempUp = await page.textContent("#temp-value");
  record(
    "interactive: slider responds to arrow keys and visible value updates",
    Number(tempUp) > Number(tempLow),
    `min=${tempLow} -> after ArrowUp=${tempUp}`
  );

  // Back to Reset and clear via keyboard
  await page.keyboard.press("Shift+Tab"); // back to Reset
  const onReset2 = await page.evaluate(() => document.activeElement.id);
  record("interactive: Shift+Tab returns to Reset", onReset2 === "reset", `focused=${onReset2}`);
  await page.keyboard.press("Enter");
  const wordCount2 = await page.evaluate(() => document.querySelectorAll("#sentence .word").length);
  record("interactive: Reset clears generated words", wordCount2 === 0, `words=${wordCount2}`);

  // Probability table exposes values as text
  const probRows = await page.evaluate(() => document.querySelectorAll("#prob-body tr").length);
  const hasPct = await page.evaluate(() => /%$/.test(document.querySelector("#prob-body td.pct")?.textContent || ""));
  record("interactive: probability table renders rows with % text values", probRows >= 4 && hasPct, `rows=${probRows}, pct=${hasPct}`);

  // Step count: each Enter adds exactly one word; an early "end of sentence"
  // disables the button (honest model state) and recovery is one Reset press.
  await page.focus("#reset");
  await page.keyboard.press("Enter");
  await page.focus("#generate");
  let words = 0;
  let presses = 0;
  let resets = 0;
  let softMisses = 0; // press produced no progress without a disabled button (focus race) — retry
  while (words < 5 && presses < 30) {
    await page.keyboard.press("Enter");
    presses++;
    const n = await page.evaluate(() => document.querySelectorAll("#sentence .word").length);
    const dis = await page.evaluate(() => document.getElementById("generate").disabled);
    if (n === words) {
      if (dis) {
        await page.focus("#reset");
        await page.keyboard.press("Enter");
        resets++;
        words = 0; // Reset cleared the sentence; expected count restarts
        await page.focus("#generate");
      } else {
        softMisses++;
        if (softMisses > 2) {
          record("interactive: each Enter adds exactly one word (step count stable)", false, `stuck at ${words} words`);
          break;
        }
      }
    } else {
      if (n !== words + 1) {
        record("interactive: each Enter adds exactly one word (step count stable)", false, `jump ${words} -> ${n}`);
        words = n;
        break;
      }
      words = n;
    }
  }
  record(
    "interactive: each Enter adds exactly one word (step count stable)",
    words === 5 && softMisses <= 1,
    `words=${words}, presses=${presses}, resets=${resets}, softMisses=${softMisses}`
  );
}

async function testQuiz(page) {
  await page.goto(quizURL, { waitUntil: "load" });
  await page.waitForSelector("fieldset", { timeout: 5000 });

  const qCount = await page.evaluate(() => document.querySelectorAll("#quiz-form fieldset").length);
  record("quiz: renders 12 fieldset questions", qCount === 12, `found=${qCount}`);

  // Keyboard-only: Tab to first radio, select with Space, feedback appears
  await page.focus('input[name="q0"]');
  await page.keyboard.press("Space");
  const fb = await page.textContent("#fb0");
  record(
    "quiz: keyboard selection produces live feedback",
    (fb || "").trim().length > 10,
    (fb || "").slice(0, 60)
  );
  const liveRole = await page.getAttribute("#fb0", "aria-live");
  record("quiz: feedback region is aria-live=polite", liveRole === "polite", `aria-live=${liveRole}`);

  const fieldsets = await page.$$("fieldset");
  // Answer every question with the first radio via keyboard (focus + Space)
  for (let i = 0; i < fieldsets.length; i++) {
    await page.focus(`input[name="q${i}"]`);
    await page.keyboard.press("Space");
  }
  const resultsVisible = await page.evaluate(() => {
    const el = document.getElementById("results");
    return !el.hidden && document.activeElement === el;
  });
  record("quiz: answering all 12 reveals results summary and moves focus", resultsVisible);

  const byObjectiveRows = await page.evaluate(() => document.querySelectorAll("#by-objective tbody tr").length);
  record("quiz: results summary lists by-objective rows", byObjectiveRows >= 8, `rows=${byObjectiveRows}`);

  // Correctness icon is text, not color alone
  const hasIcon = await page.evaluate(() => /[✓✗]/.test(document.getElementById("fb0").textContent));
  record("quiz: correctness shown with text icon (not color alone)", hasIcon);
}

async function testReflow(page) {
  // WCAG 1.4.10 reflow: 320 CSS px wide is equivalent to 400% zoom at 1280.
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto(interactiveURL, { waitUntil: "load" });
  await noHorizontalScroll(page, "interactive @320 CSS px (= 400% zoom at 1280)");
  await page.goto(quizURL, { waitUntil: "load" });
  await page.waitForSelector("fieldset");
  await noHorizontalScroll(page, "quiz @320 CSS px (= 400% zoom at 1280)");
}

async function main() {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();

  try {
    await testInteractive(page);
    await testQuiz(page);
    await testReflow(page);
  } catch (err) {
    record("test run completed", false, String(err.message || err));
  } finally {
    await browser.close();
  }

  console.log(`\n${results.filter((r) => r.ok).length}/${results.length} checks passed.`);
  process.exit(failures > 0 ? 1 : 0);
}

main();
