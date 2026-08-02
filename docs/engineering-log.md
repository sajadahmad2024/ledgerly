# Engineering Log

## Session 1: Setup & Initial Vision
- Repository structure cleanup and docs organization.
- Initial NestJS backend setup with pnpm.

## Session 2: Core Infrastructure, Schemas & Auth Module
- **Fail-Fast Environment Configuration**: `@nestjs/config` + Zod validation.
- **NestJS Global Database Module**: Drizzle provider with `OnApplicationShutdown` pool cleanup.
- **Database Schemas & Migrations**: `users`, `accounts`, `categories`, and `transactions` tables.
- **Repository Pattern**: `UsersRepository` implementation.
- **Global Exception Filter & API Envelope**: `{ success, data / error, timestamp }` envelope.
- **Auth Feature Module**: `bcrypt` hashing, JWT issuance & Passport `JwtStrategy`, `@CurrentUser()` decorator, and Swagger UI at `/api`.

## Session 3: Accounts Feature Module & User Data Isolation
- **`AccountsRepository`**: User-scoped query filtering (`userId`).
- **`AccountsService` & `AccountsController`**: Account creation, listing, updating, and soft-archiving (`isArchived = true`).

## Session 4: Categories Feature Module & System Protection
- **`CategoriesRepository`**: Dual-query retrieval logic (`or(isNull(categories.userId), eq(categories.userId, userId))`).
- **`CategoriesService` & `CategoriesController`**: Custom category CRUD and system default category immutability enforcement.

## Session 5: Transactions Feature Module & Virtual Balance Calculation

### Completed
- **`TransactionsRepository`**: User-scoped query filtering and SQL aggregate virtual balance calculation (`SUM(INCOME) - SUM(EXPENSE)`).
- **`CreateTransactionDto` & `UpdateTransactionDto`**: Validation for `accountId`, `categoryId`, `type` (`INCOME`, `EXPENSE`), `amount` (max 2 decimals), and ISO `transactionDate`.
- **`TransactionsService`**: Cross-module foreign key verification (`AccountsRepository`, `CategoriesRepository`) and virtual balance calculation.
- **`TransactionsController`**: Protected REST API endpoints (`POST /transactions`, `GET /transactions`, `GET /transactions/balance/:accountId`, `GET /transactions/:id`, `PATCH /transactions/:id`, `DELETE /transactions/:id`).

### Next Steps
- **Phase 6**: Financial Reports & Analytics Endpoints (Income vs Expense aggregations, Category breakdown).




