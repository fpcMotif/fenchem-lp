# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- `hk.pkl` configuration to drive Git pre-commit hooks via `hk`, enforcing `oxlint` and `oxfmt`.
- `apps/web/wrangler.json` supporting zero-config Cloudflare Workers Git integration with TanStack Start server entrypoint.

### Changed

- Migrated pre-commit hook runner from `lefthook` to `hk` with automatic `doc-lock` integration.
- Unified ignore patterns in `.oxfmtrc.json` and `.oxlintrc.json`.
- Completed StyleX migration across workspace packages and integrated `@stylexswc/unplugin` compiler.
- Decoupled client runtime environment initialization from external Convex backend variables.

### Removed

- Removed `.github/workflows/deploy.yml` in favor of native Cloudflare dashboard Git integration.
- Removed `lefthook` configuration (`lefthook.yml`) and package dependency.
- Removed unused legacy prototype variants (`variant-w.tsx`, `variant-j.tsx`).
