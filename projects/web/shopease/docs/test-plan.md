# ShopEase Test Plan

## Smoke

- Verify home page loads with the hero heading and featured products.
- Verify primary navigation reaches store, about, contact, login, and product detail pages.
- Verify no severe browser console errors appear on core pages.

## Store

- Search filters products by entered keyword.
- Category filter narrows products to the selected category.
- Sort control changes product ordering by price.
- Low-to-high price sorting is verified against visible product prices.
- Empty search state is handled clearly.

## Product

- Product detail page displays name, price, key details, and availability.
- Quantity increment and decrement controls update correctly.
- Quantity does not go below one.
- Add to cart gives visible feedback.

## Contact

- Required field validation prevents blank submission.
- Required name validation prevents submission when only name is missing.
- Phone validation rejects non-numeric characters.
- Invalid email is not accepted.
- Complete valid message can be submitted.

## Login And Registration

- Login panel is visible by default.
- Registration panel can be opened.
- Login fields and registration fields are distinct.
- Empty submit shows validation.
- Empty email with password does not log the user in.
- Invalid password shows a safe authentication error.

## Dashboard

- Dashboard is reachable.
- Deleting an order removes the selected order row.

## Content And Navigation

- About page founding year is consistent with the site footer.
- Meet the Team navigation opens the team page.

## Cross-Viewport

- Core content is visible on desktop.
- Core content is visible on mobile.
