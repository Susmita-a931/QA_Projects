export const sitePages = [
  { path: './', heading: /quality products/i },
  { path: './store.html', heading: /all products/i },
  { path: './about.html', heading: /our story/i },
  { path: './contact.html', heading: /get in touch/i },
  { path: './login.html', heading: /welcome back/i },
  { path: './dashboard.html', heading: /recent orders/i },
  { path: './team.html', heading: /our team/i },
  { path: './product.html', heading: /laptop pro/i },
] as const;

export const expectedLaptopSearchResults = ['Laptop Pro', 'Budget Laptop'];

export const contactMessages = {
  valid: {
    name: 'Susmita Dey Sarkar',
    email: 'susmita.qa@example.com',
    phone: '9876543210',
    subject: 'Automation test message',
    message: 'This message validates the public demo contact form behavior.',
  },
  missingName: {
    email: 'susmita.qa@example.com',
    message: 'Please confirm whether the required name field is validated.',
  },
  invalidPhone: {
    name: 'Susmita Dey Sarkar',
    email: 'susmita.qa@example.com',
    phone: 'abcdef',
    message: 'Please validate that phone accepts digits only.',
  },
} as const;

export const loginUsers = {
  emptyEmail: {
    password: 'any-password',
  },
  invalidPassword: {
    email: 'user@test.com',
    password: 'wrongpassword',
  },
} as const;

export const knownDefects = {
  search: 'Known defect: searching for Laptop hides laptop products instead of returning them.',
  sort: 'Known defect: low-to-high price sort displays products in descending order.',
  cartToast: 'Known defect: Add to Cart currently shows a wishlist confirmation message.',
  missingContactName: 'Known defect: contact form submits successfully when the required name field is empty.',
  invalidContactPhone: 'Known defect: phone number field accepts non-numeric characters.',
  emptyLoginEmail: 'Known defect: login succeeds when email is empty and password has a value.',
  unsafeLoginError: 'Known defect: invalid password shows Server Error 500 instead of a safe login error.',
  dashboardDelete: 'Known defect: delete success toast appears but the order row remains visible.',
  foundingYear: 'Known defect: About page founding year conflicts with the site footer year.',
  teamNavigation: 'Known defect: Meet the Team navigation opens the contact page instead of the team page.',
} as const;
