# Turborepo starter

https://stackoverflow.com/questions/76844744/when-implementing-reverse-infinite-scrolling-and-wanting-to-keep-the-scroll-posi

This is an official starter Turborepo.

## Using this example

Install dependencies:

```sh
cd monorepo
pnpm install
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `client`: a [React](https://vitejs.dev/) frontend
- `server`: a [Hono](https://hono.dev/) backend
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [Biome](https://biomejs.dev/ja/) for code linting and code formatting

### Build

To build all apps and packages, run the following command:

```sh
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```sh
pnpm dev
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
