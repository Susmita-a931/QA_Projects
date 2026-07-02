# QA Portfolio Rulebook

## Non-Negotiables

- Work locally only. Do not push.
- Never commit secrets, tokens, passwords, cookies, private URLs, real user data, or private sheet IDs.
- Keep public code clean enough for senior review.
- Use clear engineering language in docs and commits.
- Add evidence for meaningful automation work.
- Prefer stable, maintainable tests over large numbers of weak tests.
- Track flaky tests as defects in the test suite.
- Keep temporary notes inside `Documents/Temp_Document/`.

## Code Rules

- Use existing project patterns once a project exists.
- Keep tests independent.
- Avoid hard waits.
- Use stable selectors.
- Put repeated UI actions in page or screen objects.
- Put API calls in clients or helpers.
- Put database reads in dedicated verification helpers.
- Keep assertions specific and business-focused.
- Add comments only when they explain a non-obvious decision.

## Test Data Rules

- Use factories, seed scripts, or isolated fixtures.
- Clean up data when the test creates persistent records.
- Do not rely on test execution order.
- Do not reuse the same account across parallel tests unless the account is read-only.
- Use unique names, emails, order IDs, or timestamps where needed.

## Reporting Rules

- Capture screenshots on failure.
- Capture videos for portfolio-critical flows.
- Capture traces for failed Playwright runs.
- Save reports under the project evidence folder or daily run folder.
- Keep reports that prove a milestone.
- Avoid committing noisy temporary report files unless they are selected evidence.

## Git Rules

- Create branches for focused work.
- Commit small, meaningful chunks.
- Review `git diff` before committing.
- Review staged files before committing.
- Keep generated evidence separate from code changes when practical.
- Never push from automation.

## Commit Message Examples

```text
docs: add qa portfolio rulebook
test: add login smoke coverage
test: add database assertion for order creation
fix: remove flaky wait from checkout flow
ci: upload playwright reports and traces
chore: add sanitized daily run template
```

## Daily Rule

Complete at least one meaningful QA action each day and write a dated summary.
