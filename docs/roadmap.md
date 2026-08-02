# Phase 1

- [x] Setup

# Ledgerly Product & Engineering Roadmap

## Phase 1: Core Infrastructure & Setup
- [x] Fail-Fast Environment Validation (`@nestjs/config` + Zod)
- [x] Custom Global `DatabaseModule` with Drizzle ORM
- [x] PostgreSQL Schema Definitions (`users`, `accounts`, `categories`, `transactions`)
- [x] Drizzle Migration Workflow (`drizzle-kit generate` & `migrate`)
- [x] Repository Pattern Foundation (`UsersRepository`)
- [x] Global Exception Filter & Standardized API Response Envelope
- [x] OpenAPI Swagger UI Integration (`/api`)

## Phase 2: User Authentication & Security Module
- [x] Password Hashing with `bcrypt`
- [x] `RegisterDto` & `LoginDto` validation with `class-validator`
- [x] `AuthService` (Registration, Authentication, Token Generation)
- [x] JWT Strategy & Passport Integration
- [x] Protected Route Guard (`JwtAuthGuard`) & `@CurrentUser()` Decorator
- [x] `POST /auth/register`, `POST /auth/login`, `GET /auth/me`

## Phase 3: Accounts Feature Module
- [x] `AccountsRepository` (User-scoped queries & IDOR protection)
- [x] `CreateAccountDto` & `UpdateAccountDto` with `class-validator`
- [x] `AccountsService` (Create, List, Update, Soft Archive)
- [x] `AccountsController` (REST API Endpoints guarded by `JwtAuthGuard` and `ParseUUIDPipe`)


## Phase 4: Categories & System Defaults
- [x] Dual retrieval query logic (`userId IS NULL OR userId = currentUser`)
- [x] `CreateCategoryDto` & `UpdateCategoryDto` validation
- [x] `CategoriesService` (System category modification protection)
- [x] `CategoriesController` (REST API Endpoints)


## Phase 5: Transactions & Balance Aggregation
- [ ] Income & Expense Transactions CRUD
- [ ] Dynamic Virtual Balance Calculation
- [ ] Database Transactions (ACID Atomicity)

## Phase 6: Reports & Financial Analytics
- [ ] Income vs Expense Aggregation Queries
- [ ] Category Breakdown Analytics
