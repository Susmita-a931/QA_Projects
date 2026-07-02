# ShopEase Bug Log

## Summary

Ten product defects are currently documented and covered by automated checks.

| ID | Severity | Area | Status |
| --- | --- | --- | --- |
| SE-WEB-001 | High | Login validation | Open |
| SE-WEB-002 | Medium | Login error handling | Open |
| SE-WEB-003 | High | Dashboard order management | Open |
| SE-WEB-004 | High | Store search | Open |
| SE-WEB-005 | Medium | Store sorting | Open |
| SE-WEB-006 | Medium | Product feedback | Open |
| SE-WEB-007 | High | Contact validation | Open |
| SE-WEB-008 | Medium | Contact validation | Open |
| SE-WEB-009 | Low | Content consistency | Open |
| SE-WEB-010 | Medium | Navigation | Open |

## SE-WEB-001: Empty Email Bypasses Login Validation

Status: Open

Severity: High

Area: Login validation

Steps:

1. Open `https://antester.com/demo/shopease/login.html`.
2. Leave the email field empty.
3. Enter any password.
4. Click `Sign In`.

Expected:

The page should show `Email is required` and the user should not be logged in.

Actual:

The login succeeds and the page shows a welcome message.

Risk:

Authentication validation can be bypassed.

Automation:

Covered by `login requires email before accepting credentials` and marked as a known defect.

## SE-WEB-002: Invalid Password Shows Internal Server Error

Status: Open

Severity: Medium

Area: Login error handling

Steps:

1. Open `https://antester.com/demo/shopease/login.html`.
2. Enter `user@test.com`.
3. Enter an incorrect password.
4. Click `Sign In`.

Expected:

The page should show `Invalid email or password`.

Actual:

The page shows `Server Error 500`.

Risk:

The user receives a misleading error and internal implementation details are exposed.

Automation:

Covered by `login shows safe error message for invalid password` and marked as a known defect.

## SE-WEB-003: Delete Order Does Not Remove Order Row

Status: Open

Severity: High

Area: Dashboard order management

Steps:

1. Open `https://antester.com/demo/shopease/dashboard.html`.
2. Click `Delete` for order `#1001`.
3. Review the order table.

Expected:

The deleted order row should be removed from the table.

Actual:

A success toast appears, but the order row remains visible.

Risk:

Users receive false confirmation and may believe an order was removed when it was not.

Automation:

Covered by `dashboard delete removes the selected order row` and marked as a known defect.

## SE-WEB-004: Product Search Excludes Matching Laptop Results

Status: Open

Severity: High

Area: Store search

Steps:

1. Open `https://antester.com/demo/shopease/store.html`.
2. Search for `Laptop`.
3. Review the visible product list.

Expected:

Laptop products should remain visible, including `Laptop Pro` and `Budget Laptop`.

Actual:

Laptop products disappear and non-matching products remain visible.

Risk:

Customers searching by product name may not find available inventory.

Automation:

Covered by `store search narrows products by keyword` and marked as a known defect.

## SE-WEB-005: Price Sort Order Is Inverted

Status: Open

Severity: Medium

Area: Store sorting

Steps:

1. Open `https://antester.com/demo/shopease/store.html`.
2. Select `Price: Low to High`.
3. Review the visible product price order.

Expected:

Products should display from lowest price to highest price.

Actual:

Products display from highest price to lowest price.

Risk:

Customers cannot rely on price sorting during product comparison.

Automation:

Covered by `store low-to-high price sort displays products in ascending order` and marked as a known defect.

## SE-WEB-006: Add To Cart Shows Wishlist Confirmation

Status: Open

Severity: Medium

Area: Product detail

Steps:

1. Open `https://antester.com/demo/shopease/product.html`.
2. Click `Add to Cart`.
3. Review the confirmation toast.

Expected:

The confirmation should clearly state that the product was added to the cart.

Actual:

The toast says `Added to Wishlist!`.

Risk:

Customers may not trust whether the product was added to cart or wishlist.

Automation:

Covered by `product quantity cannot be reduced below one and cart action gives feedback` and marked as a known defect.

## SE-WEB-007: Contact Form Submits Without Required Name

Status: Open

Severity: High

Area: Contact validation

Steps:

1. Open `https://antester.com/demo/shopease/contact.html`.
2. Leave the name field empty.
3. Fill email and message.
4. Click `Send Message`.

Expected:

The page should show `Name is required` and the form should not submit.

Actual:

The form shows a success message.

Risk:

Required contact data can be missing from submitted messages.

Automation:

Covered by `contact page blocks submission when required name is missing` and marked as a known defect.

## SE-WEB-008: Phone Field Accepts Non-Numeric Characters

Status: Open

Severity: Medium

Area: Contact validation

Steps:

1. Open `https://antester.com/demo/shopease/contact.html`.
2. Fill required fields.
3. Enter `abcdef` in the phone field.
4. Click `Send Message`.

Expected:

The page should show a phone format validation error or reject non-numeric input.

Actual:

The phone value is accepted and the form submits.

Risk:

Invalid contact data can enter downstream support workflows.

Automation:

Covered by `contact page validates phone number format` and marked as a known defect.

## SE-WEB-009: Founding Year Is Inconsistent

Status: Open

Severity: Low

Area: Content consistency

Steps:

1. Open `https://antester.com/demo/shopease/about.html`.
2. Compare the founding year in the About copy with the footer year.

Expected:

The founding year and footer year should be consistent.

Actual:

The About page says `Founded in 2019`, while the footer says `(c) 2018 ShopEase`.

Risk:

Conflicting public content reduces trust and polish.

Automation:

Covered by `about page founding year matches the site footer year` and marked as a known defect.

## SE-WEB-010: Meet The Team Navigation Opens Wrong Page

Status: Open

Severity: Medium

Area: Navigation

Steps:

1. Open `https://antester.com/demo/shopease/`.
2. Open the About dropdown.
3. Click `Meet the Team`.

Expected:

The user should navigate to `team.html`.

Actual:

The user navigates to `contact.html`.

Risk:

Users cannot reach the team page through the expected navigation path.

Automation:

Covered by `about menu Meet the Team link opens the team page` and marked as a known defect.
