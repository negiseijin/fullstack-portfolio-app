# Repository Guidelines

## Project Structure & Module Organization

- `apps/web`: Next.js app (App Router) and UI pages.
- `apps/api`: Hono-based API server (`src/routes`, `src/middleware`).
- `apps/storybook`: Storybook for UI components.
- `packages/ui`: Shared React UI library (`src/components/*`).
- `packages/database`: Prisma schema, migrations, and seed.
- `packages/*`: Shared configs (`biome-config`, `typescript-config`), types, and auth.
- `data`, `memAgent`, `.github`: Local data, agent tooling, and CI config.

## Build, Test, and Development Commands

- `pnpm dev`: Run all apps in dev via Turbo (hot reload).
- `pnpm build`: Build the monorepo (respects task graph).
- `pnpm lint`: Lint with Biome across packages.
- `pnpm check-types`: Type-check all packages.
- `pnpm format`: Format sources with Biome.
- Database (from repo root): `pnpm db:migrate:dev | db:migrate:deploy | db:push | db:seed | studio` (proxies to `@repo/database`).
- App-specific: `pnpm --filter @repo/web dev`, `pnpm --filter @repo/api dev`, `pnpm --filter @repo/storybook storybook`.

## Coding Style & Naming Conventions

- Indentation: 2 spaces, LF endings, UTF-8 (see `.editorconfig`).
- Language: TypeScript-first. Prefer ES modules.
- Naming: React components `PascalCase`, files/folders `kebab-case` under feature dirs (e.g., `theme-toggle-button/ThemeToggleButton.tsx`).
- Lint/format: Biome; hooks enforced via Lefthook (`pnpm prepare` installs hooks).

## Testing Guidelines

- UI: Storybook with Vitest setup under `apps/storybook` (snapshot and interaction tests).
- API: Place tests in `apps/api/tests` (organize by route); keep unit tests close to modules when practical.
- Run tests from each app/package using its local script; add coverage reports when adding substantial features.

## Commit & Pull Request Guidelines

- Commits: Conventional style (`feat:`, `fix:`, `chore:`, `docs:`). Scope optional (e.g., `feat(web): add profile page`).
- PRs: Clear description, linked issues, UI screenshots if applicable, notes on DB/schema changes, and manual test steps.
- Required checks before requesting review: `pnpm lint`, `pnpm check-types`, project tests, and database migrations synced.

## Security & Configuration

- Env: Copy `*.env.example` to `.env` per app/package. Never commit secrets.
- Database: Set `DATABASE_URL` for Prisma before running migrations/seed.
- Logs/PII: Avoid logging sensitive data in API (`pino` is configured; prefer structured logs).
