# Project Structure

## Monorepo Organization

This project follows a Turborepo monorepo structure with clear separation of concerns between frontend, backend, and shared packages.

```bash
├── apps/
│   ├── web/                 # Next.js frontend application
│   └── api/                 # Hono backend API
├── packages/
│   ├── ui/                  # Shared UI components (shadcn/ui)
│   ├── database/            # Prisma schema and migrations
│   ├── auth/                # Authentication logic and types
│   ├── shared/              # Shared utilities and types
│   └── config/              # Shared configuration (ESLint, TypeScript, etc.)
├── docs/
│   ├── adr/                 # Architecture Decision Records
│   └── api/                 # API documentation
└── tools/
    ├── scripts/             # Build and deployment scripts
    └── docker/              # Docker configurations
```

## Clean Architecture Principles

### Feature-Based Organization

Each major feature follows a consistent structure:

```bash
src/
├── features/
│   ├── auth/
│   │   ├── components/      # Feature-specific UI components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # API calls and business logic
│   │   ├── types/           # TypeScript interfaces
│   │   └── utils/           # Feature utilities
│   ├── posts/
│   ├── users/
│   └── admin/
├── shared/
│   ├── components/          # Reusable UI components
│   ├── hooks/               # Global hooks
│   ├── services/            # Shared API services
│   ├── utils/               # Global utilities
│   └── types/               # Global type definitions
├── entities/                # Domain models and business rules
└── pages/                   # Next.js pages (App Router)
```

## File Naming Conventions

### Components

- **React Components**: PascalCase (`UserProfile.tsx`)
- **Component Files**: Include `.component.tsx` suffix for clarity
- **Test Files**: `.test.tsx` or `.spec.tsx`
- **Story Files**: `.stories.tsx` for Storybook

### API Routes

- **Route Files**: kebab-case (`user-profile.ts`)
- **Handler Functions**: camelCase (`getUserProfile`)
- **Type Definitions**: PascalCase (`UserProfileResponse`)

### Database

- **Schema Files**: snake_case for database fields
- **Migration Files**: Prisma auto-generated timestamps
- **Seed Files**: descriptive names (`seed-users.ts`)

## Import Organization

Imports should be organized in the following order:

1. External libraries (React, Next.js, etc.)
2. Internal packages (`@/packages/*`)
3. Relative imports (`./`, `../`)
4. Type-only imports (grouped separately)

```typescript
import React from 'react'
import { NextPage } from 'next'
import { Button } from '@/packages/ui'

import { UserService } from '../services/user.service'
import { validateUser } from './utils'

import type { User } from '@/packages/shared/types'
```

## Configuration Files Location

- **Root Level**: Package.json, Turborepo config, Docker files
- **Apps**: App-specific configurations (next.config.js, etc.)
- **Packages**: Package-specific configurations
- **.kiro/**: Kiro-specific files (steering, specs, settings)

## Environment Management

- **Development**: `.env.local` (gitignored)
- **Example**: `.env.example` (committed)
- **Production**: Platform environment variables (Vercel)
- **Container**: `.devcontainer/devcontainer.env`

## Testing Structure

Tests should mirror the source structure:

```bash
src/
├── features/auth/
│   ├── components/
│   │   ├── LoginForm.tsx
│   │   └── LoginForm.test.tsx
│   └── services/
│       ├── auth.service.ts
│       └── auth.service.test.ts
└── __tests__/
    ├── e2e/                 # Playwright tests
    ├── integration/         # Integration tests
    └── setup/               # Test configuration
```

## Documentation Standards

- **README.md**: Project overview and quick start
- **ADRs**: Architecture decisions in `docs/adr/`
- **API Docs**: OpenAPI specs in `docs/api/`
- **Component Docs**: Storybook stories for UI components
- **Inline Comments**: JSDoc for functions, TSDoc for types

## Git Workflow

- **Branch Naming**: `feature/`, `fix/`, `chore/` prefixes
- **Commit Messages**: Conventional Commits format
- **PR Templates**: Include checklist and testing notes
- **Protected Branches**: Main branch requires PR and CI checks
