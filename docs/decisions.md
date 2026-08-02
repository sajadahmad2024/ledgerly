# Architectural Decision Records (ADRs)

## ADR-001: Use Drizzle ORM instead of Prisma
- **Decision**: Use Drizzle ORM for PostgreSQL interaction.
- **Reason**: Lightweight SQL-first approach, zero codegen step needed, excellent TypeScript inference via `$inferSelect` and `$inferInsert`.
- **Status**: Accepted

## ADR-002: UUID Primary Keys across Schemas
- **Decision**: Use PostgreSQL `UUID` with `gen_random_uuid()` for primary keys across all tables.
- **Reason**: Prevents sequential enumeration attacks, supports distributed system scaling.
- **Status**: Accepted

## ADR-003: Fail-Fast Environment Configuration using Zod
- **Decision**: Validate `process.env` on application boot using a strict Zod schema passed to `@nestjs/config`.
- **Reason**: Prevents silent startup failures and runtime crashes caused by missing or misconfigured environment variables. Converts string environment values to native types automatically.
- **Status**: Accepted

## ADR-004: Custom Database Module with Lifecycle Cleanup
- **Decision**: Register Drizzle ORM as a `@Global()` custom provider (`DRIZZLE`) in `DatabaseModule` and implement `OnApplicationShutdown`.
- **Reason**: Decouples database client instantiation from domain services, allows mock injection during unit testing, and ensures PostgreSQL connection pool closes cleanly (`pool.end()`) on server teardown.
- **Status**: Accepted

## ADR-005: Standardized API Envelope & Global Exception Filter
- **Decision**: Intercept all thrown exceptions using a custom `GlobalExceptionFilter` registered in `main.ts`.
- **Reason**: Guarantees a consistent JSON response envelope `{ success, error: { statusCode, message, error }, timestamp }` across all endpoints and masks raw database stack traces to prevent security leaks.
- **Status**: Accepted

## ADR-006: JWT Passport Authentication & User Param Decorator
- **Decision**: Implement stateless JWT authentication using `@nestjs/passport` (`JwtStrategy`) and custom `@CurrentUser()` param decorator.
- **Reason**: Provides clean, declarative route protection (`@UseGuards(JwtAuthGuard)`) and type-safe user extraction without manually accessing Express request objects in controllers. Protects against User Enumeration attacks by standardizing auth error messages.
- **Status**: Accepted

## ADR-007: User-Scoped Data Isolation & Soft Archiving
- **Decision**: Require `userId` in all repository queries (`where: and(eq(table.userId, userId), ...)`), and use `isArchived = true` boolean flags for accounts instead of hard SQL `DELETE`.
- **Reason**: Eliminates Insecure Direct Object Reference (IDOR) vulnerabilities by ensuring users can never read, update, or archive records belonging to other tenants. Soft archiving preserves historical transaction records for financial audit integrity.
- **Status**: Accepted

## ADR-008: Hybrid System & Custom Categories Architecture
- **Decision**: Store both System Default Categories (`userId = NULL`, `isDefault = true`) and Custom User Categories (`userId = <user_uuid>`) in a single `categories` table, guarded by service-level immutability checks (`ForbiddenException`).
- **Reason**: Eliminates table duplication, allows global default categories out-of-the-box for all users while granting individual users the ability to create custom categories. Prevents users from mutating or deleting system default categories.
- **Status**: Accepted



