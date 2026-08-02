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

### Completed
- **`AccountsRepository`**: Created user-scoped repository methods (`create`, `findByUserId`, `findById`, `update`) enforcing multi-tenant data isolation (`where: and(eq(accounts.userId, userId), ...)`).
- **`CreateAccountDto` & `UpdateAccountDto`**: Integrated `class-validator` rules, `AccountType` enum (`CASH`, `BANK`, `CREDIT_CARD`, `WALLET`), and Swagger `@ApiProperty()` tags.
- **`AccountsService`**: Implemented account creation, listing, updating, and soft-archiving logic (`isArchived = true`).
- **`AccountsController`**: Created protected REST endpoints (`POST /accounts`, `GET /accounts`, `GET /accounts/:id`, `PATCH /accounts/:id`, `DELETE /accounts/:id`) guarded by `JwtAuthGuard` and `ParseUUIDPipe`.

### Next Session
- Implement **Categories Module** (System Default Categories vs Custom User Categories).


