# Project Overview

This is a full-stack portfolio application built with a modern TypeScript monorepo. It uses `pnpm` as the package manager and `Turborepo` to manage the monorepo.

The project is structured as a monorepo with the following components:

- **`apps/api`**: A backend API built with Hono.
- **`apps/web`**: A web frontend built with Next.js.
- **`apps/storybook`**: A Storybook component library for the UI components.
- **`packages/auth`**: A shared package for authentication.
- **`packages/database`**: A shared package for database management using Prisma.
- **`packages/ui`**: A shared package for UI components.
- **`packages/types`**: A shared package for TypeScript types.
- **`packages/typescript-config`**: A shared package for TypeScript configuration.
- **`packages/tailwind-config`**: A shared package for Tailwind CSS configuration.
- **`packages/biome-config`**: A shared package for Biome configuration.

## Building and Running

The following commands are available at the root of the project:

- `pnpm dev`: To start the development servers for all applications.
- `pnpm build`: To build all applications.
- `pnpm lint`: To lint all applications.
- `pnpm check-types`: To check for TypeScript errors.
- `pnpm db:migrate:dev`: To run database migrations in development.
- `pnpm db:migrate:deploy`: To run database migrations in production.
- `pnpm db:push`: To push the database schema to the database.
- `pnpm db:seed`: To seed the database with initial data.
- `pnpm studio`: To open the Prisma Studio.

## Development Conventions

- **Code Formatting**: This project uses `Biome` for code formatting. You can run `pnpm format` to format the code.
- **Linting**: This project uses `Biome` for linting. You can run `pnpm lint` to lint the code.
- **Git Hooks**: This project uses `lefthook` to manage git hooks. The hooks are configured in `lefthook.yml`.
- **Commits**: This project follows the Conventional Commits specification.
