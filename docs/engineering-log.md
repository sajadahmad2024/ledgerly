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

### Completed
- **`CategoriesRepository`**: Dual-query retrieval logic (`or(isNull(categories.userId), eq(categories.userId, userId))`) combining system default categories with custom user categories.
- **`CreateCategoryDto` & `UpdateCategoryDto`**: Validation for category types (`INCOME`, `EXPENSE`), icons, and hex color codes.
- **`CategoriesService` System Protection**: Enforced `ForbiddenException` blocking attempts to modify or delete system default categories (`userId = null`).
- **`CategoriesController`**: Protected REST API endpoints (`POST /categories`, `GET /categories`, `GET /categories/:id`, `PATCH /categories/:id`, `DELETE /categories/:id`).

### Next Session
- Implement **Transactions Module** & Virtual Balance Aggregation.



