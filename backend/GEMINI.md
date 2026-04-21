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
  - `generated/prisma/`: Generated Prisma Client.
  - `lib/`: Shared utilities and service instances (e.g., `prisma.ts` for database connection).
  - `resolvers/`: GraphQL resolvers.
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
- **Database Migrations:** `pnpm dlx prisma migrate dev` (typical for development)
- **Generate Prisma Client:** `pnpm dlx prisma generate`
  - Note: The client is generated into `src/generated/prisma`.

## Development Conventions

### Coding Style & Standards
- **ESM (ECMAScript Modules):** Always use `.js` extensions in imports (e.g., `import { prisma } from './lib/prisma.js'`).
- **Code Style:** Adhered to via Biome (`biome.json`). Run `pnpm lint` before committing.
- **GraphQL Schema:** Use Type-GraphQL decorators (`@Resolver`, `@Query`, `@Mutation`, `@Field`) to define the schema. The `schema.graphql` file is updated automatically on server start.
- **Environment Variables:** All environment variables should be defined and validated in `src/env.ts` using Zod.

### Architecture Patterns
- **Resolvers:** Logic for handling GraphQL requests should reside in `src/resolvers/`.
- **DTOs:** Define output types and input types in `src/dtos/` to maintain a clear boundary between the database models and the API schema.
- **Prisma Client:** Always use the instance exported from `src/lib/prisma.ts`.

## Roadmap
The project aims to support:
- [ ] User account creation and login.
- [ ] CRUD operations for transactions.
- [ ] CRUD operations for categories.
- [ ] User-specific data isolation (users only see their own data).
