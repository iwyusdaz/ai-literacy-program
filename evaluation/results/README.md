# evaluation/results/

Output folder for the pending evaluation pipelines. **Nothing here is real until a pipeline is run with a configured `.env`.**

| File | Written by | Status |
|---|---|---|
| `simulations-summary.md` | `evaluation/run-simulations.mjs` (real run) | Pre-run placeholder — all results "PENDING: requires API key" |
| `simulations/*.json` | `evaluation/run-simulations.mjs` (real run) | Does not exist yet |
| `review-panel-summary.md` | `evaluation/run-review-panel.mjs` (real run) | Pre-run placeholder — all results "PENDING: requires API key" |
| `review-panel/*.json` | `evaluation/run-review-panel.mjs` (real run) | Does not exist yet |

Dry-run stubs (never results) go to `dry-run/` at the repository root and are gitignored; every stub file is headed "DRY RUN – NOT REAL RESULTS".

Raw model outputs are saved here on a real run so results are reproducible and auditable. See `evaluation/METHODS.md` for the rerun procedure.
