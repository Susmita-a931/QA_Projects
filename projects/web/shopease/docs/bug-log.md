# ShopEase Bug Log

## SE-WEB-001: Product Search Excludes Matching Laptop Results

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

## SE-WEB-002: Add To Cart Shows Wishlist Confirmation

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
