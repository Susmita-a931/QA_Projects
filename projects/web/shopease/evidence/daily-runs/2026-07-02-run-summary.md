# Daily QA Run: 2026-07-02

## Scope

Initial automated validation for the ShopEase public demo website.

## Environment

- Target: `https://antester.com/demo/shopease/`
- Framework: Playwright with TypeScript
- Browsers: Chromium desktop and mobile Chrome profile
- Execution: Local

## Commands Run

```bash
pnpm install
pnpm test
pnpm lint
```

## Result

- Total checks: 44
- Passed: 44
- Known product defects covered as expected failures: 20 results across 10 defects and 2 browser profiles
- Failed unexpectedly: 0

## Coverage

- Home page smoke checks.
- Internal page load checks.
- Store search, filtering, and sort controls.
- Product quantity and cart feedback.
- Contact form validation and valid submission.
- Login and registration panel behavior.
- Dashboard order deletion behavior.
- About page content consistency.
- Team page navigation.
- Desktop and mobile coverage.
- Browser console monitoring for severe errors.

## Bugs Found

- `SE-WEB-001`: Empty email bypasses login validation.
- `SE-WEB-002`: Invalid password shows internal server error.
- `SE-WEB-003`: Delete order does not remove order row.
- `SE-WEB-004`: Product search excludes matching laptop results.
- `SE-WEB-005`: Price sort order is inverted.
- `SE-WEB-006`: Add To Cart shows wishlist confirmation.
- `SE-WEB-007`: Contact form submits without required name.
- `SE-WEB-008`: Phone field accepts non-numeric characters.
- `SE-WEB-009`: Founding year is inconsistent.
- `SE-WEB-010`: Meet The Team navigation opens wrong page.

## Evidence

- Playwright HTML report generated locally under `evidence/reports/playwright-html/`.
- JUnit result generated locally under `evidence/reports/junit/results.xml`.
- Failure traces, screenshots, and videos generated for known defect checks.

## Follow-Up

- Keep known defect tests marked until the product behavior is fixed.
- Add visual evidence snapshots for the next public proof update.
- Add an accessibility smoke check after the stable defect baseline.
