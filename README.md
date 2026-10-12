# fenchem-lp

This project was created with [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack), a modern TypeScript stack that combines React, TanStack Start, and more.

## Features

- **TypeScript** - For type safety and improved developer experience
- **TanStack Start** - SSR framework with TanStack Router
- **StyleX** - Atomic CSS-in-JS, compiled by `@stylexswc/unplugin` (see [ADR-0003](docs/adr/0003-stylex-swc-compiler.md))
- **Base UI** - Accessible, unstyled primitives behind the shared components in `packages/ui`
- **Oxlint** - Oxlint + Oxfmt (linting & formatting)
- **Vite+** - Unified Vite toolchain, workspace task runner, linting, and formatting

## Getting Started

First, install the dependencies:

```bash
bun install
```

Then, run the development server:

```bash
bun run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser to see the web application.

## UI Customization

The shared UI package `packages/ui` holds the design tokens and a small set of components built on Base UI and styled with StyleX.

- Change StyleX tokens in `packages/ui/src/tokens.stylex.ts`
- Change the brand color variables those tokens read in `apps/web/src/index.css`
- Change base CSS variables and global styles in `packages/ui/src/styles/globals.css`
- Update shared components in `packages/ui/src/components/*`

### Add a shared component

Create the component in `packages/ui/src/components/`. Use a `@base-ui/react` primitive for behavior, style it with `stylex.create`, and accept an `sx?: StyleXStyles` prop for caller overrides. `bun run check:stylex` checks that prop.

Import shared components like this:

```tsx
import { Button } from "@fenchem-lp/ui/components/button";
```

## Deployment (Cloudflare via Alchemy)

- Target: web
- Dev: bun run dev
- Deploy: bun run deploy
- Destroy: bun run destroy

For more details, see the guide on [Deploying to Cloudflare with Alchemy](https://www.better-t-stack.dev/docs/guides/cloudflare-alchemy).

## Git Hooks and Formatting

- Pre-commit hooks run Oxlint and Oxfmt on staged files through `hk` (`hk.pkl`).
- Run checks: `bun run check:lint` and `bun run check-types`

## Project Structure

```
fenchem-lp/
├── apps/
│   ├── web/         # Frontend application (React + TanStack Start)
├── packages/
│   ├── ui/          # Shared tokens and Base UI + StyleX components
│   ├── infra/       # Alchemy deployment to Cloudflare
│   ├── config/      # Shared TypeScript config
```

## Available Scripts

- `bun run dev`: Start all applications in development mode
- `bun run build`: Build all applications
- `bun run dev:web`: Start only the web application
- `bun run check-types`: Check TypeScript types across all apps
- `bun run check:lint`: Run Oxlint, format with Oxfmt, and run the StyleX check
- `bun run check:stylex`: Check StyleX usage and that no legacy styling packages are installed
- `bun run test`: Run the web unit tests
- `bun run lint`: Run Vite+ lint checks
- `bun run format`: Run Vite+ formatting
- `bun run staged`: Run Vite+ checks against staged files
