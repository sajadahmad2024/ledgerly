# Learning Journal

## NestJS Architecture & Core Concepts
- **Controllers & Services**: Controller layer handles HTTP mapping and Swagger docs; Service layer encapsulates pure domain logic.
- **Dependency Injection & Custom Providers**: Registering non-class instances (Drizzle database client) using custom tokens (`DRIZZLE`) and `useFactory`.
- **Global Modules (`@Global()`)**: Making app-wide providers (Config, Database) available without redundant imports across feature modules.
- **Lifecycle Hooks**: Handling `OnApplicationShutdown` to gracefully drain database connections (`pool.end()`).
- **Global Filters & Pipes**: `ValidationPipe({ whitelist: true, transform: true })` for Mass Assignment protection, and `GlobalExceptionFilter` for standardized error envelopes.
- **Custom Param Decorators**: Creating `@CurrentUser()` using `createParamDecorator` to cleanly extract authenticated user objects from Express request context.

## Drizzle ORM & Database Patterns
- **Type Inference**: `$inferSelect` for query return types and `$inferInsert` for insert payload shapes.
- **Relational Schema Design**: Foreign key cascades (`onDelete: 'cascade'`, `onDelete: 'set null'`).
- **Monetary Precision**: Storing currency amounts using `NUMERIC(12,2)` instead of floating-point numbers.
- **PostgreSQL Custom Enums**: Using `pgEnum` to enforce constrained string domain values at the database engine level.

## Security & Production Standards
- **Fail-Fast Bootstrapping**: Halting server execution immediately if env variables fail validation.
- **User Enumeration Protection**: Returning identical error messages (`Invalid email or password`) regardless of whether the email or password was wrong.
- **Data Sanitization**: Stripping `passwordHash` before returning user objects to clients.
- **Mass Assignment Prevention**: Whitelisting incoming DTO payload properties.

