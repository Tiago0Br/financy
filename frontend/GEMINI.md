# Financy Frontend - GEMINI.md

## Project Overview
Financy is a modern financial management web application. This frontend is built with React 19 and Vite 8, utilizing TanStack Router for type-safe routing and Tailwind CSS 4 for styling. The project aims to provide a robust interface for managing user transactions and categories, with a strong emphasis on performance through the use of the React Compiler.

- **Main Technologies:** React 19, Vite 8, TanStack Router v1, Tailwind CSS v4, Biome, TypeScript.
- **Architecture:** Component-based architecture with type-safe routing handled by `@tanstack/react-router`. Routes are defined in `src/pages/` and automatically synchronized to `src/route-tree.gen.ts`.
- **Planned Backend Integration:** GraphQL (as per `roadmap.md`, though not yet implemented).

## Building and Running
The following commands are available via `pnpm` (or `npm/yarn`):

- **Development:** `pnpm dev` - Starts the Vite development server.
- **Build:** `pnpm build` - Runs TypeScript checks and builds the production-ready application.
- **Lint & Format:** `pnpm lint` - Uses Biome to check for linting errors and automatically formats files.
- **Preview:** `pnpm preview` - Starts a local server to preview the production build.

## Development Conventions
- **Routing:** Use file-based routing with TanStack Router. New routes should be created as files in `src/pages/`.
- **Styling:** Use Tailwind CSS utility classes. Version 4 is configured via the `@tailwindcss/vite` plugin.
- **Code Style & Linting:** 
  - Biome is used for both linting and formatting. 
  - **Formatting Rules:** Spaces for indentation (2), single quotes for JS/TS strings, double quotes for JSX, no semicolons (unless required for parsing), and no trailing commas.
  - Run `pnpm lint` before committing changes to ensure consistency.
- **React Compiler:** The project uses the experimental React Compiler via `@rolldown/plugin-babel` and `babel-plugin-react-compiler`. Avoid manual `useMemo` or `useCallback` unless strictly necessary for non-rendering performance optimizations.
- **Type Safety:** TypeScript is used throughout the project. Maintain strict type safety, especially when defining routes and handling data.

## Roadmap & Status
The project is in its initial setup phase. Key upcoming tasks include:
- [ ] Setting up a GraphQL client (e.g., Apollo or Urql).
- [ ] Implementing Authentication (Login and Register pages).
- [ ] Creating Transaction and Category management features (CRUD).
- [ ] Aligning the UI with the designated Figma layout.

*Refer to `roadmap.md` for a more detailed task list.*
