# Senior AI-QA Portfolio Master Plan

## Purpose

This workspace will hold multiple proof projects that demonstrate senior QA ownership across web, API, mobile, database, reporting, CI, observability, and release confidence.

The repository should not look like a tutorial dump. It should look like a maintained engineering workspace where every project has a clear test strategy, reliable automation, useful reporting, and evidence that can be reviewed by hiring teams.

## Portfolio Positioning

The public story should be:

- Designed and maintained as a senior QA automation portfolio.
- Covers real user workflows, API contracts, database validation, mobile automation, CI execution, and operational reporting.
- Produces video evidence, screenshots, traces, reports, daily run logs, spreadsheet updates, and Slack-style notifications.
- Uses clean architecture, readable test names, stable selectors, controlled test data, and deterministic assertions.
- Shows judgement, not just tool usage.

Avoid public wording that sounds generated. Public files should focus on engineering value, defects found, decisions made, and evidence produced.

## Top-Level Repository Structure

```text
QA_Projects/
  README.md
  Documents/
    QA_PORTFOLIO_MASTER_PLAN.md
    Rulebook.md
    Common_Bugs_And_Test_Ideas.md
    Temp_Document/
      README.md
  Projects/
    Website/
      <project-name>/
        app/
        tests/
        docs/
        evidence/
        .github/
    Android/
      <app-name>/
        app/
        tests/
        docs/
        evidence/
        .github/
    FullStackApps/
      <app-name>/
        frontend/
        backend/
        database/
        tests/
        docs/
        evidence/
        .github/
  Shared/
    libraries/
      web/
      api/
      mobile/
      database/
      reporting/
    configs/
      playwright/
      appium/
      eslint/
      prettier/
      test-data/
    test-data/
      factories/
      seeds/
      fixtures/
    reporting/
      templates/
      dashboards/
  Evidence/
    videos/
    screenshots/
    traces/
    reports/
    daily-runs/
  Tools/
    scripts/
      run-daily-tests.ps1
      collect-evidence.ps1
      update-test-summary.ps1
      notify-slack.ps1
    local-ci/
```

## Project Categories

### Website Projects

Website projects will cover public websites, demo apps, and custom full stack applications built specifically for test proof.

Expected coverage:

- Smoke, sanity, regression, and critical path tests.
- Authentication, authorization, role permissions, and session behavior.
- Forms, validation, error handling, uploads, downloads, pagination, filters, search, sorting, and responsive UI.
- API contract checks for key backend calls.
- Database checks for important create, update, delete, and audit events.
- Accessibility checks for core screens.
- Performance smoke checks for important pages and API calls.
- Security-focused checks such as input validation, broken access control, sensitive data exposure, and unsafe redirects.

Preferred tooling:

- Playwright for web UI and API tests.
- Allure or Playwright HTML reports for execution reporting.
- GitHub Actions for CI workflow definitions.
- Local scripts for repeatable execution.

### Android Projects

Android projects will cover APK testing, emulator execution, and real-device ready test design.

Expected coverage:

- App launch, login, navigation, forms, offline behavior, permission prompts, deep links, push notification readiness, file upload if available, and crash checks.
- API and database verification behind important mobile actions.
- Device matrix notes for Android version, resolution, network mode, orientation, and permission state.
- Video proof for important flows.

Preferred tooling:

- Appium with UiAutomator2 for Android automation.
- Android emulator for local execution.
- ADB for logs, install, uninstall, permissions, and screen recording.
- Allure or equivalent report output.

### Full Stack Test Apps

When no suitable website or APK is provided, build a small production-style app to test.

Candidate apps:

- E-commerce checkout app with inventory, cart, payment mock, order status, and admin panel.
- CRM lead pipeline with roles, notes, attachments, and audit logs.
- Booking app with calendars, availability, cancellation rules, and email notification mock.
- Support ticket system with SLA rules, priority changes, assignment, and notifications.
- Fintech-style expense tracker with budgets, approvals, exports, and data integrity checks.

Each full stack app should include:

- Frontend, backend, database, seed data, API docs, and test automation.
- Intentional edge cases that allow senior-level testing.
- Clear defect examples and fixed bug history.

## Daily Testing Standard

One meaningful test activity should be completed every day.

Daily work can be:

- Add or improve one automated test.
- Run the suite and publish a daily evidence entry.
- Investigate and fix one flaky test.
- Add one API or database assertion to an existing flow.
- Record one video proof.
- Update spreadsheet-style test summary data.
- Improve CI reporting or Slack notification quality.
- Write a defect analysis note.
- Add a new test idea to the common bugs document.

Daily output should create a dated record under:

```text
Evidence/daily-runs/YYYY-MM-DD/
  run-summary.md
  report/
  screenshots/
  videos/
  traces/
```

Daily summary template:

```md
# Daily QA Run: YYYY-MM-DD

## Scope

## Environment

## Commands Run

## Result

## Evidence

## Bugs Found

## Follow-up
```

## Standard Project Structure

Every project should follow this structure unless there is a strong reason not to.

```text
<project-name>/
  README.md
  docs/
    test-strategy.md
    test-plan.md
    risk-analysis.md
    bug-log.md
    release-notes.md
  app/
  tests/
    e2e/
    api/
    database/
    accessibility/
    performance/
    visual/
    fixtures/
    pages/
    helpers/
  evidence/
    videos/
    screenshots/
    traces/
    reports/
  test-results/
  playwright.config.ts
  package.json
  .env.example
  .gitignore
  .github/
    workflows/
      qa.yml
```

For Android:

```text
<app-name>/
  README.md
  docs/
  app/
    apk/
  tests/
    appium/
    api/
    database/
    fixtures/
    helpers/
  evidence/
  appium.config.*
  .github/
    workflows/
      mobile-qa.yml
```

## Automation Architecture

Use a layered structure:

- Specs: readable business scenarios.
- Page objects or screen objects: UI interactions and locators.
- API clients: typed request helpers and response validation.
- Database clients: read-only verification helpers where possible.
- Fixtures: environment setup, users, tokens, seeded data, cleanup.
- Assertions: specific checks close to the behavior being verified.
- Report hooks: screenshots, videos, traces, request logs, and useful metadata.

Senior-level expectations:

- No hard-coded waits unless justified in a comment.
- Locators should prefer accessible roles, labels, stable test ids, and visible text when appropriate.
- Tests should be independent and safe to run in parallel.
- Test data should be generated, seeded, or cleaned predictably.
- Assertions should verify business outcomes, not only UI presence.
- Failure evidence should make debugging fast.
- Flaky tests should be tracked and fixed with priority.

## Tooling Plan

### Web

- Playwright with TypeScript.
- Playwright trace viewer for failure debugging.
- HTML or Allure report.
- Axe checks for focused accessibility coverage.
- APIRequestContext or a typed HTTP client for API checks.

### Mobile

- Appium 2.
- UiAutomator2 driver for Android.
- ADB for logs, recordings, installs, and environment control.
- Emulator matrix for at least one stable local profile.

### API

- Playwright API tests, Postman collection export, or REST client helpers.
- Schema validation where useful.
- Contract checks for status codes, response shape, headers, auth, permissions, idempotency, and error payloads.

### Database

- Read-only validation queries for test verification.
- Seed and cleanup scripts for local apps.
- Checks for audit tables, timestamps, status transitions, duplicate records, deleted state, and referential integrity.

### Reporting

- Playwright HTML report for fast local debugging.
- Allure report for polished portfolio evidence.
- JUnit XML for CI parsing.
- Markdown daily summaries for public readability.
- Screenshots, videos, traces, console logs, and network logs for failed tests.

### Spreadsheet Updates

Use a spreadsheet or CSV-style tracker for:

- Project name.
- Date.
- Build or commit.
- Environment.
- Total tests.
- Passed.
- Failed.
- Skipped.
- Flaky.
- Bugs opened.
- Evidence link.
- Notes.

Implementation options:

- Local CSV first for public-safe proof.
- Google Sheets integration later when credentials are available.
- Never commit real credentials or private sheet IDs.

### Slack Messaging

Use Slack messaging for local or real workspace notifications once credentials are available.

Message should include:

- Project.
- Environment.
- Run status.
- Pass, fail, skip, flaky counts.
- Report path.
- Top failures.
- Next action.

Never commit tokens. Use `.env.example` and local environment variables.

### CI/CD

Use GitHub Actions workflow files for public proof, while all pushing remains manual.

Standard CI stages:

- Install dependencies.
- Lint.
- Type check.
- Unit or component tests if available.
- API tests.
- E2E tests.
- Upload reports and traces as artifacts.
- Publish test summary.

Local CI:

- Provide scripts that run the same commands locally.
- Use `act` only if Docker setup is available and useful.

## Git Workflow

Rules:

- Work locally only.
- Never push from automation.
- Create focused branches for meaningful work.
- Commit in small chunks.
- Keep commit messages clear and professional.
- Do not mix app code, test code, report output, and documentation changes in one commit unless they are tightly related.

Branch examples:

```text
main
project/ecommerce-web-foundation
tests/ecommerce-checkout-e2e
fix/ecommerce-flaky-login
docs/daily-run-template
ci/playwright-report-artifacts
```

Commit style:

```text
docs: add senior qa portfolio plan
test: add checkout smoke coverage
fix: stabilize login selector strategy
ci: upload playwright traces as artifacts
chore: add daily run script
```

Before each commit:

- Run relevant tests.
- Check `git diff`.
- Check secrets are not staged.
- Keep generated heavy files out unless they are intentional evidence.

## Evidence Strategy

Every serious project should include proof.

Evidence types:

- Video recording of critical flows.
- Test report screenshots.
- Playwright traces for failures.
- API request and response summaries with sensitive data removed.
- Database validation output.
- Slack notification screenshot or sanitized log.
- Spreadsheet update screenshot or sanitized CSV.
- Daily run markdown summary.

Public evidence should be sanitized:

- No real credentials.
- No private workspace URLs.
- No private customer data.
- No tokens, session cookies, or internal IDs that should not be public.

## Senior Defect Categories To Demonstrate

These are the types of issues that separate shallow automation from senior QA work:

- Race conditions around async UI updates.
- Data created in UI but missing or wrong in the database.
- Role permission mismatch between UI, API, and database.
- Soft delete visible in API or search results.
- Duplicate submissions after double click or network retry.
- Idempotency failures on payment, booking, or order APIs.
- Bad timezone handling around dates, expiry, booking windows, and reports.
- Cache stale data after update or logout.
- Pagination count mismatch after filter changes.
- Sorting broken with mixed case, nulls, dates, and numbers.
- API accepts invalid state transitions.
- Frontend hides a button but API still allows the action.
- Missing audit record for sensitive changes.
- Error messages leak implementation details.
- File upload accepts unsafe types or wrong size boundaries.
- Mobile permission denial leaves app stuck.
- Offline or slow network causes duplicate actions or lost state.
- Accessibility labels missing from important controls.
- CI-only failures caused by environment differences.

## Public Quality Bar

Code should show:

- Clear names.
- Small helpers.
- Typed data where possible.
- No secret values.
- No fake complexity.
- No copied tutorial comments.
- No unused generated files.
- No unstable sleep-based testing.
- No exaggerated claims in documentation.

Documentation should show:

- Why the project exists.
- What risks are covered.
- How to run it.
- What evidence is produced.
- What bugs were found.
- What remains uncovered.

## First 30 Days Roadmap

### Week 1: Foundation

- Create repository structure.
- Add rulebook and common bug checklist.
- Create one web automation starter project.
- Add Playwright, report config, and first smoke test.
- Add daily run template.
- Add local execution script.

### Week 2: Web Project Depth

- Add login, role, form, API, and database checks.
- Add video, screenshot, trace, and HTML report evidence.
- Add CI workflow.
- Add Slack-style local notification output.
- Add spreadsheet-style CSV update.

### Week 3: Full Stack Project

- Build a small app with realistic risks.
- Add seeded database and API tests.
- Add defect examples and fixes.
- Add release readiness report.

### Week 4: Android Project

- Add Appium setup.
- Add APK or sample app.
- Add launch, login, navigation, permission, and API-backed checks.
- Add ADB video evidence.
- Add mobile-specific bug notes.

## Recurring Weekly Review

Every week:

- Review flaky tests.
- Improve one helper or architecture area.
- Add one senior-level bug pattern to the common bugs document.
- Clean temporary documents.
- Review git history for clean chunks.
- Update portfolio status.

## Source Notes

Planning was informed by current public and official references:

- Playwright CI and best practices: https://playwright.dev/docs/ci and https://playwright.dev/docs/best-practices
- GitHub Actions documentation: https://docs.github.com/actions
- GitHub Actions artifacts: https://docs.github.com/en/actions/tutorials/store-and-share-data
- Allure Report documentation: https://allurereport.org/docs/
- Appium documentation: https://appium.io/docs/en/
- Slack `chat.postMessage` documentation: https://docs.slack.dev/reference/methods/chat.postMessage
- Recent QA checklist and flaky test guidance reviewed from Testomat, TestRail, Ranorex, and related QA engineering publications.
