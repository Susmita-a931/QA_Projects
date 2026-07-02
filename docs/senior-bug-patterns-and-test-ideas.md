# Common Bugs And Senior Test Ideas

This document collects reusable bug patterns and test ideas for web, API, database, mobile, CI, and reporting projects.

## Authentication And Sessions

- Login succeeds but session cookie is missing secure flags.
- Logout clears UI state but API token still works.
- Password reset link can be reused.
- User remains logged in after password change.
- Account lockout works in UI but not through API.
- Session expires without a useful recovery path.

## Authorization

- UI hides admin actions but API still allows them.
- User can access another user's record by changing an ID.
- Role permissions differ between web and mobile.
- Deleted or disabled user can still call APIs.
- Export endpoint ignores role restrictions.

## Forms And Validation

- Client validates required fields but API accepts blank values.
- Leading or trailing spaces create duplicate records.
- Unicode, long strings, and special characters break search or display.
- Error message appears but submit button still sends the request.
- Double click creates duplicate records.

## API

- Wrong status code for validation, auth, conflict, and server errors.
- Response schema changes without versioning.
- Pagination metadata does not match returned rows.
- Sorting handles numbers as strings.
- Retry creates duplicate transactions.
- Invalid state transition is accepted.
- Rate limit response does not include useful retry information.

## Database

- UI success message appears but database row is missing.
- Status updates without audit history.
- Soft-deleted records appear in search or reports.
- Foreign key relationship breaks after delete.
- Timestamp saved in local time instead of UTC.
- Duplicate records created under parallel requests.
- Report totals do not match transaction records.

## E-Commerce And Booking

- Inventory goes negative after concurrent checkout.
- Cart price differs from order price.
- Discount applies more than once.
- Cancelled order can still be paid.
- Booking accepts unavailable slots.
- Timezone changes booking date.
- Refund status updates in UI but not ledger.

## Files

- Upload accepts blocked file type.
- Large file fails without a useful error.
- File preview exposes private URL.
- File delete removes UI reference but not storage object.
- Downloaded file name or content type is wrong.

## Search, Filter, Sort, Pagination

- Filter resets page count incorrectly.
- Search ignores recently created data because of cache.
- Sorting by date breaks around null values.
- Pagination skips or duplicates rows after deletion.
- Export ignores active filters.

## Mobile

- App freezes after permission denial.
- Back button exits instead of navigating back.
- Rotation loses form data.
- Offline mode creates duplicate sync records.
- Slow network leaves loader stuck.
- Deep link opens wrong screen when logged out.
- Push notification opens stale content.

## Accessibility

- Important controls have no accessible name.
- Focus order does not match visual order.
- Keyboard user cannot complete primary flow.
- Error message is not announced.
- Color alone communicates status.

## Performance And Reliability

- Page works locally but fails in CI due to timing.
- Spinner disappears before data is ready.
- Test depends on external third party service.
- Cache serves stale user data after update.
- Memory leak after repeated navigation.

## CI And Environment

- Tests pass locally but fail on Linux runner.
- Tests depend on local timezone.
- Parallel tests share mutable data.
- Missing artifact upload hides failure evidence.
- Environment variables differ between local and CI.
- Browser, driver, or emulator version drift breaks runs.
