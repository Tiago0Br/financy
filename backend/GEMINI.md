# Financy Backend - Project Context

## Project Overview
Financy is a personal finance management application. This repository contains the backend service, which is a GraphQL API built with Node.js, TypeScript, and Apollo Server.

### Core Technologies
- **Runtime:** Node.js (ESM)
- **API Architecture:** GraphQL (Apollo Server 4 + Express 5 integration)
- **Schema Definition:** Type-GraphQL (Code-first approach)
- **ORM:** Prisma 7 (using SQLite with `better-sqlite3` adapter)
- **Validation:** Zod (for environment variables and potential inputs)
- **Linting & Formatting:** Biome

## Project Structure
- `prisma/`: Contains `schema.prisma` and database migrations.
- `src/`: Core source code.
  - `dtos/`: Data Transfer Objects (GraphQL inputs/outputs).
    - `input/`: Input types for mutations and queries.
    - `output/`: Output types for mutations.
  - `errors/`: Standardized error handling system (Custom classes and formatter).
  - `generated/prisma/`: Generated Prisma Client.
  - `graphql/`: GraphQL specific configurations.
    - `context/`: Apollo Server context builder.
    - `decorators/`: Custom Type-GraphQL decorators (e.g., `@GqlUser`).
  - `lib/`: Shared utilities and service instances (e.g., `prisma.ts`).
  - `middlewares/`: Type-GraphQL middlewares (e.g., `IsAuth`).
  - `models/`: Type-GraphQL object types mapping to database entities.
  - `resolvers/`: GraphQL resolvers.
  - `use-cases/`: Application business logic and use cases.
  - `utils/`: Common utilities (JWT, hashing, etc.).
  - `env.ts`: Environment variable validation using Zod.
  - `server.ts`: Application entry point.
- `schema.graphql`: Automatically generated GraphQL schema (do not modify manually).
- `roadmap.md`: Current project status and pending tasks.

## Building and Running

### Prerequisites
- Node.js (v20+ recommended)
- PNPM (v10+ as per `packageManager` in `package.json`)

### Development Commands
- **Start Dev Server:** `pnpm dev`
  - Runs `tsx watch` with `.env` file loading.
- **Lint & Format:** `pnpm lint`
  - Runs `biome check --write .` to automatically fix formatting and linting issues.
- **Check Types:** `pnpm check-types`
  - Runs `tsc --noEmit` to verify type safety.
- **Database Migrations:** `pnpm dlx prisma migrate dev`
- **Generate Prisma Client:** `pnpm dlx prisma generate`

## Development Conventions

### Coding Style & Standards
- **ESM (ECMAScript Modules):** Always use `.js` extensions in imports.
- **Code Style:** Adhered to via Biome. Run `pnpm lint` before committing.
- **GraphQL Schema:** Use Type-GraphQL decorators to define the schema.
- **Environment Variables:** All variables must be defined and validated in `src/env.ts`.

### Architecture Patterns
- **Resolvers:** Handle GraphQL requests and delegate business logic to use cases.
- **Use Cases:** Contain the core business logic and database interactions via Prisma.
- **Standardized Errors:** Use custom error classes from `src/errors/app-error.ts` (e.g., `NotFoundError`, `UnauthorizedError`). All GraphQL errors are formatted to include a machine-readable `type` string.
- **Models:** Define the GraphQL object types that represent data entities.
- **DTOs:** Define specific input and output structures for API operations.
- **Middlewares:** Used for cross-cutting concerns like authentication (`IsAuth`).
- **Prisma Client:** Always use the instance exported from `src/lib/prisma.ts`.

## Roadmap
- [X] User account creation and login.
- [X] CRUD operations for categories.
- [X] CRUD operations for transactions.
- [X] User-specific data isolation (global security check).
- [X] Zod integration for input validation in DTOs (implemented in use cases).
- [X] Standardized GraphQL error handling.
- [X] Implement refresh token logic.
