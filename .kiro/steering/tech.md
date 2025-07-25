# Technology Stack

## Package Management

- **Package Manager**: pnpm (v10.13.1) - specified in packageManager field
- **Monorepo**: Turborepo for workspace management and build orchestration
- **Node.js**: v22 (configured in devcontainer)

## Frontend Stack

- **Framework**: Next.js with App Router
- **Language**: TypeScript (strict mode enforced)
- **UI Components**: shadcn/ui component library
- **Styling**: Tailwind CSS for utility-first styling
- **State Management**: React Query/TanStack Query for server state
- **Forms**: React Hook Form with Zod validation
- **Internationalization**: next-i18next for Japanese/English support

## Backend Stack

- **API Framework**: Hono for lightweight, fast API development
- **Database**: PostgreSQL with Prisma ORM
- **Vector Search**: pgvector extension for semantic search
- **Authentication**: NextAuth.js with OAuth providers (GitHub, Google)
- **Email Service**: Resend for transactional emails
- **File Storage**: Cloud storage integration for image uploads

## Development Tools

- **Code Quality**: Biome for linting and formatting (replaces ESLint/Prettier)
- **Testing**: Vitest for unit tests, Testing Library for components, Playwright for E2E
- **Documentation**: Storybook for component documentation
- **Container**: Docker with devcontainer configuration (Ubuntu 22.04 base)

## AI Development Tools

- **Code Generation**: GitHub Copilot integration
- **CLI Tools**: @anthropic-ai/claude-code, @google/gemini-cli for AI assistance
- **Environment**: Configured for AI-driven development workflows

## Common Commands

### Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Run tests
pnpm test
pnpm test:e2e

# Lint and format
pnpm lint
pnpm format

# Database operations
pnpm db:migrate
pnpm db:seed
pnpm db:studio
```

### AI Assistance

```bash
# Claude AI assistance
pnpm claude

# Gemini AI assistance
pnpm gemini
```

### Container Development

```bash
# Rebuild devcontainer
Ctrl+Shift+P -> "Dev Containers: Rebuild Container"

# Attach to running container
Ctrl+Shift+P -> "Dev Containers: Attach to Running Container"
```

## Environment Configuration

- **Development**: Uses .env.local with devcontainer
- **Production**: Environment variables managed through Vercel
- **Required Variables**: GEMINI_API_KEY, database URLs, OAuth secrets
- **File Watching**: CHOKIDAR_USEPOLLING and WATCHPACK_POLLING enabled for container compatibility
