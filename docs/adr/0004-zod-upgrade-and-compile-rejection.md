# Zod upgraded to 4.5.4; `z.compile()` rejected on measured bundle and runtime constraints

**Status:** accepted

Zod is upgraded from `4.4.3` to `4.5.4` via a single workspace catalog pin (`package.json`). All six breaking changes in Zod 4.5 were audited against the codebase. The proposal to adopt `z.compile()` is **rejected** based on measured bundle overhead on the client and runtime code-generation constraints in Cloudflare Workers.

## Context & Problem Statement

We were two minors behind on Zod (`4.4.3` resolved, catalog pinned `^4.1.13`). Zod 4.5 ships runtime improvements:

- **~9x reduction in per-schema retained heap** (7.5 kB → 784 B per `z.string()`, [#6318](https://github.com/colinhacks/zod/pull/6318), [#6415](https://github.com/colinhacks/zod/pull/6415))
- **~7.5x faster `.safeParse()` failure path** without eager stack capture ([#6316](https://github.com/colinhacks/zod/pull/6316), [#6450](https://github.com/colinhacks/zod/pull/6450))

These runtime wins land across all Zod consumers in the workspace (`better-auth`, `@better-auth/core`, `@convex-dev/better-auth`, `better-call`, and TanStack plugins) without requiring code modifications.

Zod 4.5 also introduces `z.compile()`, an in-process JIT schema compiler using `new Function()`. We evaluated adopting `z.compile()` for our auth form validation schemas.

## Measured Results

All metrics measured against clean baseline builds (`rm -rf apps/web/dist && bun run build`, raw file bytes + `gzipSync` via `perf/measure-assets.mjs`):

| State                          | Client zod chunk<br/>raw / gzip | Client JS total<br/>raw / gzip | Server zod chunk<br/>raw / gzip | Server JS total<br/>raw / gzip |
| ------------------------------ | ------------------------------- | ------------------------------ | ------------------------------- | ------------------------------ |
| **A** · zod 4.4.3 _(baseline)_ | 77.93 kB / **19.79 kB**         | 1914.88 kB / **556.12 kB**     | 159.67 kB / **30.46 kB**        | 4233.51 kB / **940.60 kB**     |
| **B** · zod 4.5.4              | 81.41 kB / **20.76 kB**         | 1918.36 kB / **557.11 kB**     | 167.28 kB / **32.61 kB**        | 4241.11 kB / **942.75 kB**     |
| **C** · 4.5.4 + `z.compile()`  | 113.49 kB / **28.93 kB**        | 1950.44 kB / **565.26 kB**     | 231.65 kB / **46.19 kB**        | 4305.49 kB / **956.33 kB**     |

### Deltas

| Delta               | Client zod chunk                         | Client JS total               | Server zod chunk                | Server JS total                |
| ------------------- | ---------------------------------------- | ----------------------------- | ------------------------------- | ------------------------------ |
| **A → B** (upgrade) | +3.48 kB raw / **+0.97 kB gz (+4.9%)**   | +3.48 / **+0.99 gz (+0.18%)** | +7.61 / **+2.15 gz (+7.1%)**    | +7.60 / **+2.15 gz (+0.23%)**  |
| **B → C** (compile) | +32.08 kB raw / **+8.17 kB gz (+39.4%)** | +32.08 / **+8.15 gz (+1.5%)** | +64.37 / **+13.58 gz (+41.6%)** | +64.38 / **+13.58 gz (+1.4%)** |
| **A → C** (both)    | +35.56 kB raw / **+9.14 kB gz (+46.2%)** | +35.56 / **+9.14 gz (+1.6%)** | +71.98 / **+15.73 gz (+51.6%)** | +71.98 / **+15.73 gz (+1.7%)** |

### Findings

1. **4.5.4 size is a minor regression (+0.99 kB gz client, +2.15 kB gz server), not a reduction.** The locale tree-shaking improvements ([#6384](https://github.com/colinhacks/zod/pull/6384), [#5959](https://github.com/colinhacks/zod/pull/5959)) were offset by other additions in 4.5. The justification for 4.5 is heap reduction and failure path throughput, not bundle reduction.
2. **`z.compile()` in Cloudflare Workers is dead weight.** The SSR server bundle runs on Cloudflare Workers (`workerd 4.100.0`), where runtime dynamic code generation (`new Function()`, `eval()`) throws:
   ```json
   {
     "newFunction": "EvalError: Code generation from strings disallowed for this context",
     "eval": "EvalError: Code generation from strings disallowed for this context"
   }
   ```
   On `EvalError`, Zod falls back to standard interpretation ([#6479](https://github.com/colinhacks/zod/pull/6479)). Adopting `z.compile()` on the server would ship **+13.58 kB gz** into the Worker for a guaranteed runtime fallback.
3. **`z.compile()` on client adds +8.17 kB gz (+39.4% on the auth chunk) for unobservable gain.** First-party Zod usage consists of two flat schemas in `apps/web/src/components/sign-up-form.tsx` and `apps/web/src/components/sign-in-form.tsx`, executed once per submit attempt before an asynchronous network request (`better-auth` $\rightarrow$ Convex). Saving sub-microsecond parse time cannot justify +8.17 kB gz of compiler runtime on a lazily loaded chunk.

## Audit of Zod 4.5 Breaking Changes

All six breaking changes were checked against the codebase:

| #    | Change                                                                           | Upstream PR                                                                                                                                                      | Audit Finding                                                                                                                                                                                                                                                                                                                                                             |
| ---- | -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ⚠️ 1 | **String length counts Unicode code points**, not UTF-16 units                   | [#6441](https://github.com/colinhacks/zod/pull/6441)                                                                                                             | **Active in codebase.** Hits `z.minLength(8)` on passwords and `z.minLength(2)` on names in `sign-up-form.tsx` and `sign-in-form.tsx`. E.g., `"😀😀😀😀"` (8 UTF-16 units, 4 code points) was accepted in 4.4 but is correctly rejected in 4.5 with `"Password must be at least 8 characters"`. Covered by unit tests in `apps/web/src/components/sign-up-form.test.tsx`. |
| ⚠️ 2 | `z.iso.datetime()` requires seconds                                              | [#6457](https://github.com/colinhacks/zod/pull/6457)                                                                                                             | **Inert.** No first-party use. Transitive usage in `better-auth` uses internal date parsing.                                                                                                                                                                                                                                                                              |
| ⚠️ 3 | Record keys / intersections match TypeScript; `unrecognized_keys` does not abort | [#6412](https://github.com/colinhacks/zod/pull/6412)                                                                                                             | **Inert.** No records, intersections, or `.strict()` schemas in first-party code.                                                                                                                                                                                                                                                                                         |
| ⚠️ 4 | `__proto__` always stripped                                                      | [#6386](https://github.com/colinhacks/zod/pull/6386), [#6354](https://github.com/colinhacks/zod/pull/6354)                                                       | **Inert.** Security hardening; no schema in workspace relies on prototype pollution.                                                                                                                                                                                                                                                                                      |
| ⚠️ 5 | Stricter `ipv6` / `ulid` / `httpUrl` / `emoji`                                   | [#6442](https://github.com/colinhacks/zod/pull/6442), [#6095](https://github.com/colinhacks/zod/pull/6095), [#6035](https://github.com/colinhacks/zod/pull/6035) | **Inert.** No usage. `z.email()` regex is unchanged. URL checks in `packages/env/src/web.ts` use hand-written validation and do not import Zod.                                                                                                                                                                                                                           |
| ⚠️ 6 | Number vs bigint formats split at type level                                     | [#6052](https://github.com/colinhacks/zod/pull/6052)                                                                                                             | **Inert.** Verified clean via `bun run check-types`.                                                                                                                                                                                                                                                                                                                      |

## First-Party Zod Surface & Dependency Hygiene

1. **`zod/mini` retained:** First-party forms import from `zod/mini` to prevent pulling the full schema engine into client bundles.
2. **Landing route isolated:** The landing page entry chunk (`index-*.js`) contains zero Zod tokens. Zod is bundled exclusively in the lazy auth route chunk (`route-*.js`).
3. **Dead dependency cleanup:** Unused `"zod": "catalog:"` declarations in `packages/backend/package.json` and `packages/infra/package.json` were removed after verifying 0 imports. `packages/backend/convex/*.ts` uses Convex's native `v` validators.

## Reopen Trigger

Revisit `z.compile()` only if the application introduces a validation hot path meeting **both** criteria:

1. High-throughput parsing (e.g. Node/Bun request handlers validating multi-megabyte payloads, bulk CSV/JSON imports with $>1,000$ rows, or $>10,000$ parses/sec).
2. Runtime environment allows code generation (Node.js or Bun runtime, not Cloudflare Workers / workerd without special capability bindings).
