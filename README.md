# Senior AI-QA Project Proofs

Professional QA automation portfolio for senior-level project proof.

This repository is designed to show practical ownership across web automation, Android testing, API validation, database checks, CI workflows, reporting, daily execution evidence, spreadsheet updates, and Slack-style run notifications.

The focus is not only on writing tests. The focus is on building maintainable QA systems that explain risk, produce useful evidence, and make failures easy to investigate.

## What This Repository Demonstrates

| Area | Proof Target |
| --- | --- |
| Web automation | Playwright-based UI, API, accessibility, and regression coverage |
| Android automation | Appium-based APK testing with emulator and device-ready structure |
| Full stack testing | Custom apps built when no external product is provided |
| API quality | Contract checks, auth behavior, error handling, and state validation |
| Database validation | Data integrity checks after important user and API workflows |
| Reporting | HTML or Allure reports, traces, screenshots, videos, and daily summaries |
| Operations | Spreadsheet-style status updates and Slack-style notifications |
| CI/CD | Local-first workflow with GitHub Actions-ready pipelines |
| Git practice | Small local commits, focused branches, clean history, no automated push |

## Quick Links

- [qa-portfolio-master-plan.md](docs/qa-portfolio-master-plan.md)
- [qa-rulebook.md](docs/qa-rulebook.md)
- [senior-bug-patterns-and-test-ideas.md](docs/senior-bug-patterns-and-test-ideas.md)
- [temporary documents](docs/temp-documents/README.md)

## Repository Structure

```text
QA_Projects/
  docs/
    qa-portfolio-master-plan.md
    qa-rulebook.md
    senior-bug-patterns-and-test-ideas.md
    temp-documents/
  projects/
    web/
    android/
    full-stack-apps/
  shared/
    libraries/
    configs/
    test-data/
    reporting/
  evidence/
    videos/
    screenshots/
    reports/
    daily-runs/
  tools/
    scripts/
    local-ci/
```

## Working Standard

- Build every project as if it will be reviewed by a senior engineering panel.
- Keep test code readable, deterministic, and maintainable.
- Verify outcomes across UI, API, database, reports, and notifications where relevant.
- Record proof for meaningful execution through videos, reports, traces, screenshots, and daily notes.
- Commit locally in small, reviewable chunks.
- Keep secrets, private data, and credentials out of the repository.
- Never push from automation. Remote publishing stays manual.

## Review Path

For a quick review, start with [qa-portfolio-master-plan.md](docs/qa-portfolio-master-plan.md), then check the rulebook and common bug checklist. Project-level folders will contain their own README, test strategy, commands, reports, and selected evidence once each project is added.

## Current Status

Foundation is ready. Project implementations will be added under `projects/` with daily evidence under `evidence/daily-runs/`.
