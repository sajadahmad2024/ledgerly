# Engineering Log

## Session 1: Setup & Initial Vision
- Repository structure cleanup and docs organization.
- Initial NestJS backend setup with pnpm.

## Session 2: Core Infrastructure, Schemas & Auth Module

### Completed
- **Fail-Fast Environment Configuration**: Implemented `@nestjs/config` with Zod schema validation to ensure the application fails at boot time if critical environment variables are missing or malformed.
- **NestJS Global Database Module**: Configured custom provider `DRIZZLE` token in `DatabaseModule` with NestJS `OnApplicationShutdown` hook to close the PostgreSQL connection pool gracefully.
- **Database Schema Definitions & Migrations**: Built complete PostgreSQL tables in Drizzle for `users`, `accounts`, `categories`, and `transactions`. Executed migration `0001_remarkable_energizer.sql`.
- **Repository Pattern**: Implemented `UsersRepository` encapsulating Drizzle queries (`create`, `findByEmail`, `findById`).
- **Global Exception Filter & API Envelope**: Implemented `GlobalExceptionFilter` returning standard envelope `{ success, data / error, timestamp }` and preventing sensitive stack trace leaks.
- **Auth Feature Module**:
  - `RegisterDto` & `LoginDto` with `class-validator` rules.
  - Password hashing with `bcrypt` (10 salt rounds).
  - JWT token issuance & `JwtStrategy` Passport validation.
  - Custom `@CurrentUser()` param decorator for route parameter extraction.
  - Protected route `GET /auth/me` with `JwtAuthGuard`.
  - Swagger UI integrated at `/api` with Bearer auth support.

### Next Session
- Implement **Accounts Module** (`AccountsRepository`, `AccountsService`, `AccountsController`).
- User-scoped data isolation (preventing IDOR vulnerabilities).
- Soft deletion / archiving workflows for accounts.

