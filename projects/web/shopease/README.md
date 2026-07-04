# ShopEase Web QA Automation

Playwright automation suite for the [ShopEase demo website](https://antester.com/demo/shopease/).

## Coverage

- Home page smoke checks.
- Header navigation and dropdown links.
- Store search, category filtering, and sorting.
- Product detail quantity and cart interaction.
- Contact form validation and successful submission path.
- Login and registration panel behavior.
- Dashboard order deletion behavior.
- About page content consistency.
- Team page navigation.
- Basic console error and broken internal link checks.
- Desktop and mobile browser coverage.

## Current Findings

The suite currently documents 10 confirmed product defects in [docs/bug-log.md](docs/bug-log.md).

## Commands

```bash
pnpm install
pnpm test
pnpm test:smoke
pnpm test:headed
pnpm report
```

Headed mode runs with one worker so the browser flow is easy to observe. Normal test runs stay parallel for faster feedback.

For a human-readable page-by-page browser demo:

```bash
tools/run-demo.cmd
```

## Test Architecture

```text
tests/
  data/       shared test data and known defect labels
  fixtures/   page objects and page-level actions
  helpers/    reusable assertions and parsers
  specs/      feature-focused test suites
```

The suite keeps scenarios readable by placing page interactions in page objects and reusable catalog parsing in helpers.

## Evidence

Selected reports, screenshots, videos, and run summaries are stored under `evidence/`.

## Public Safety

This project uses only the public demo website. No real credentials or private data are required.
