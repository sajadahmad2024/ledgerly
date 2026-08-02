# Database Design

## Overview

Ledgerly uses PostgreSQL as its primary relational database.

The database is designed to:

- Maintain data integrity through foreign keys and constraints.
- Keep the schema simple and scalable.
- Avoid data duplication.
- Support future features without major schema changes.

---

# Entity Relationship Diagram

```text
                    Users
                      │
          ┌───────────┴───────────┐
          │                       │
      Accounts              Categories
          │                       │
          └───────────┬───────────┘
                      │
                Transactions
```

---

# Tables

## Users

Stores registered users.

### Columns

| Column        | Type         | Description           |
| ------------- | ------------ | --------------------- |
| id            | UUID         | Primary Key           |
| name          | VARCHAR(100) | User's full name      |
| email         | VARCHAR(255) | Unique email address  |
| password_hash | TEXT         | Hashed password       |
| created_at    | TIMESTAMP    | Creation timestamp    |
| updated_at    | TIMESTAMP    | Last update timestamp |

### Constraints

- Primary Key: `id`
- Unique: `email`

---

## Accounts

Represents financial accounts owned by a user.

Examples:

- Cash
- HDFC Bank
- SBI Bank
- ICICI Credit Card
- Wallet

### Columns

| Column      | Type         | Description           |
| ----------- | ------------ | --------------------- |
| id          | UUID         | Primary Key           |
| user_id     | UUID         | Owner of the account  |
| name        | VARCHAR(100) | Account name          |
| type        | ENUM         | Account type          |
| currency    | CHAR(3)      | ISO Currency Code     |
| is_archived | BOOLEAN      | Soft archive flag     |
| created_at  | TIMESTAMP    | Creation timestamp    |
| updated_at  | TIMESTAMP    | Last update timestamp |

### Relationship

One User → Many Accounts

---

## Categories

Stores transaction categories.

Categories can be:

- Default system categories
- User-created categories

### Columns

| Column     | Type            | Description              |
| ---------- | --------------- | ------------------------ |
| id         | UUID            | Primary Key              |
| user_id    | UUID (Nullable) | Owner of custom category |
| name       | VARCHAR(100)    | Category name            |
| type       | ENUM            | Income / Expense         |
| icon       | VARCHAR(100)    | Icon identifier          |
| color      | VARCHAR(20)     | Category color           |
| is_default | BOOLEAN         | System category flag     |
| created_at | TIMESTAMP       | Creation timestamp       |
| updated_at | TIMESTAMP       | Last update timestamp    |

### Relationship

One User → Many Categories

System categories have:

user_id = NULL

---

## Transactions

Represents every financial transaction.

Transaction Types:

- Income
- Expense

Transfers will be introduced in Version 2.

### Columns

| Column           | Type          | Description           |
| ---------------- | ------------- | --------------------- |
| id               | UUID          | Primary Key           |
| user_id          | UUID          | Owner                 |
| account_id       | UUID          | Account used          |
| category_id      | UUID          | Transaction category  |
| type             | ENUM          | Income / Expense      |
| amount           | NUMERIC(12,2) | Transaction amount    |
| description      | VARCHAR(255)  | Short description     |
| notes            | TEXT          | Optional notes        |
| transaction_date | TIMESTAMP     | Transaction date      |
| created_at       | TIMESTAMP     | Creation timestamp    |
| updated_at       | TIMESTAMP     | Last update timestamp |

### Relationship

One Account → Many Transactions

One Category → Many Transactions

One User → Many Transactions

---

# Enumerations

## Account Type

- CASH
- BANK
- CREDIT_CARD
- WALLET

---

## Transaction Type

- INCOME
- EXPENSE

---

## Category Type

- INCOME
- EXPENSE

---

# Design Decisions

## UUID

All primary keys use UUID instead of auto-increment IDs.

Reason:

- Better security
- Harder to guess IDs
- Easier future scaling
- Better support for distributed systems

---

## Monetary Values

Money is stored using:

NUMERIC(12,2)

Reason:

Floating point values can introduce rounding errors.

---

## Account Balance

Account balances are **not stored**.

The balance is calculated from transactions.

Reason:

- Avoid data inconsistency
- Simpler implementation
- Easier maintenance
- Good enough for Version 1

---

## Categories

A category can be either:

- System Category
- User Category

System categories have:

user_id = NULL

This avoids maintaining two separate tables.

---

## Future Improvements

- Transfer Transactions
- Budgets
- Savings Goals
- Recurring Transactions
- Multi Currency
- Shared Wallets
- Attachments
- Receipt OCR
