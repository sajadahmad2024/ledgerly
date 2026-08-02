# API Design

## Base URL

/api/v1

---

# Authentication

POST /auth/register

POST /auth/login

POST /auth/refresh

POST /auth/logout

GET /auth/me

---

# Accounts

GET /accounts

GET /accounts/:id

POST /accounts

PATCH /accounts/:id

DELETE /accounts/:id

---

# Categories

GET /categories

POST /categories

PATCH /categories/:id

DELETE /categories/:id

---

# Transactions

GET /transactions

GET /transactions/:id

POST /transactions

PATCH /transactions/:id

DELETE /transactions/:id

---

# Dashboard

GET /dashboard

Returns:

- Total Balance
- Monthly Income
- Monthly Expense
- Recent Transactions
- Spending by Category

---

# Reports

GET /reports/monthly

GET /reports/category

GET /reports/income-expense
