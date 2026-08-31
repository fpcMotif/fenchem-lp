# Plan 002: Build Variant V — the duotone division-color landing, alongside Color Block

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving on. If
> anything in the "STOP conditions" section occurs, stop and report — do not
> improvise. Your reviewer maintains `plans/README.md`.
>
> **Drift check (run first)**: this repo has multiple agents editing the
> working tree concurrently. The authoritative drift check is comparing every
> "Current state" excerpt below against the live code before touching it. The
> four Variant H anchor sites (hero image, industries map, matrix card image,
> dossier image) must exist; small line-number shifts and minor text drift
> around them are EXPECTED and fine — edit against the live code. If an anchor
> site is structurally gone, STOP.

## Status

- **Priority**: P1
- **Effort**: M
- **Risk**: LOW-MED (new file on an uncontested key; live tree has active
  concurrent agents)
- **Depends on**: plans/001 (executed 2026-08-28; its scaffolding —
  `--color-cosmetics-200` token, `k` registry slot, route-test pattern — is
  already in the tree)
- **Category**: direction (design)
- **Planned at**: commit `d7368a3`, 2026-08-31

## Why this matters

Owner decision (2026-08-31): **keep both** vivid directions. Plan 001's
executed duotone build of "Variant K" was overwritten minutes later by a
concurrent agent's different interpretation ("Color Block" — division washes
at 8–15% plus saturated trims), which now lives at key `k` and has been
committed and deployed. Rather than fighting an actively edited file, this
plan (a) relabels `k` honestly as "Color Block · campaign" and (b) rebuilds
the planned duotone design on the uncontested key **`v` — "Production ·
vivid"** (`variant-v.tsx`, clone of Variant H, becomes the default), so the
switcher offers H · Color Block (k) · duotone (v) · Greenhouse Ledger (j)
side by side.

The duotone design itself: the owner's four reference images (subjects on
saturated orange/purple/teal/yellow seamless backdrops) map onto Fenchem's
auxiliary division accents (Food `#E48336`, Cosmetics `#A05EB5`, Nutrition
`#FFF67F`). Variant V uses those accents as full-saturation section-scale
color fields with **duotone photography** (grayscale image multiplied onto
the division's field) and Pantone/HEX "specimen" labels — the
reference-image look, unified stock imagery, and spec-sheet rigor in one CSS
treatment. Full rationale: `plans/001-vivid-division-color-system.md`.

## Current state

### Repo facts

- Monorepo: Bun workspaces + vite-plus. Frontend at `apps/web` (React 19,
  TanStack Start/Router, Tailwind v4, `motion/react`). Package manager
  **bun**, never npm/npx.
- `/` renders a landing prototype selected by `?variant=`; registry:
  `apps/web/src/components/prototype/variants.ts`, currently keys
  `a d b e c f g h i j k w`, `DEFAULT_VARIANT = "k"`. Key `v` is free.
- `apps/web/src/components/prototype/variant-h.tsx` (~1545 lines, tracked,
  receives ongoing polish from another agent) is the clone base. Its four
  anchor sites as of `d7368a3`+WIP:
  - ~line 506: `{/* Right: botanical image */}` hero image column
  - ~line 669: `industries.map((industry, i) => (` in `IndustriesSection`
  - ~line 766: matrix card hover overlay `bg-brand-green-950/0 …`
  - ~line 863: dossier overlay `bg-gradient-to-t from-brand-green-950/25 …`
- `apps/web/src/components/prototype/variant-k.tsx` is the concurrent
  agent's "Color Block" build (`export function VariantK`, ~723 lines). You
  will NOT modify this file — another agent actively edits it.
- Content seam: `apps/web/src/components/landing/landing-content.ts`
  (ingredients, industries, `divisionForApplication`, …). Variants render
  through it; no data changes there.
- Motion: `Reveal` from `@/components/prototype/motion`, `EASE`/`STAGGER`
  from `motion-constants`, inside `<LazyMotion features={domAnimation} strict>`.
- Brand tokens in `apps/web/src/index.css` `@theme`: `--color-paper`,
  `--color-ink`, `--color-line`, `--color-mute-*`, brand green/blue ramps,
  division accents `--color-nutrition` (oklch L 0.957), `--color-food`
  (L 0.703), `--color-cosmetics` (L 0.59), `--color-cosmetics-200` (L 0.90,
  added by plan 001 — already present, do not re-add), plus feed/agro/chem.
- Fonts per ADR-0002: `font-display` Newsreader, `font-body` Plus Jakarta
  Sans, `font-tech` JetBrains Mono. Do not change.

### Design constraints (from intent docs — quoted)

- Brand book: auxiliary colors are division accents — "Use sparingly, as
  category/section accents — never as a page's primary surface"; "Auxiliary
  colors = wayfinding. Tag a division/category, never a whole page."
  Compliance: each accent appears ONLY in UI representing its own division;
  Clean White canvas; Brand Green stays lead. Three division hues total
  (nutrition, food, cosmetics) — feed/agro/chem unused.
- Design review: no alpha-muted text on color fields; `font-tech`
  micro-labels ≥ 11px; no new text/background pairs beyond the table below.
- Vocabulary (`CONTEXT.md`): "division", "auxiliary color", "Brand Green /
  Brand Blue / Clean White / Neutral Gray" in code comments.

### Contrast table (pre-computed — do not invent new pairs)

| Text                             | On field                    | Approx WCAG                | Allowed use                   |
| -------------------------------- | --------------------------- | -------------------------- | ----------------------------- |
| `text-ink` full opacity          | `bg-nutrition` (L 0.957)    | ~11:1                      | any size                      |
| `text-ink` full opacity          | `bg-food` (L 0.703)         | ~5.9:1                     | any size                      |
| `text-ink` full opacity          | `bg-cosmetics-200` (L 0.90) | ~9:1                       | any size                      |
| `text-ink` on `bg-paper/95` chip | over any image/field        | ~15:1                      | badges                        |
| —                                | `bg-cosmetics` (L 0.59)     | white and ink both fail AA | imagery only, never bare text |

## Commands

From repo root, bash. Install `bun install`; typecheck `bun run check-types`
(exit 0); tests `bun run test` (all pass); lint `bun run lint` (exit 0).
Do NOT run `bun run check` (repo-wide `oxfmt --write`). No git write
operations; no dev server; browser verification is the reviewer's.

## Scope

**In scope**: `apps/web/src/components/prototype/variant-v.tsx` (create),
`apps/web/src/components/prototype/variants.ts` (relabel `k`, register `v`,
flip default), `apps/web/src/routes/-index.test.tsx` (extend tests).

**Out of scope**: `variant-k.tsx` (actively edited by another agent),
`variant-h.tsx` (read/copy only), `variant-j/`, `variant-a..i`,
`variant-w*.tsx`/`variant-waterfall.tsx`, `landing-content.ts`,
`landing-page.tsx`, `apps/web/src/index.css` (token already exists),
`packages/ui`, `prototype-switcher.tsx`, `routes/index.tsx`, fonts, copy,
section order, motion timings.

## Steps

### Step 0: Baseline

Drift-check the anchors and registry excerpts against live code. Then
`bun install && bun run check-types && bun run test` → all exit 0/pass.
Red baseline → STOP.

### Step 1: Relabel `k` and reserve `v` in the registry

In `variants.ts`: change the `k` entry's name `"Production · vivid"` →
`"Color Block · campaign"` and REMOVE its `twinOf: "h"` (Color Block is its
own direction); leave its `key`/`Component` untouched. Then add after it:
`{ key: "v", Component: VariantV, name: "Production · vivid", twinOf: "h" },`
with `import { VariantV } from "./variant-v";` and flip
`DEFAULT_VARIANT` to `"v"`. (Typecheck will fail until Step 2 creates the
file — that's expected; do Step 2 before verifying.)

### Step 2: Create Variant V as a clone of Variant H

Copy live `variant-h.tsx` → `variant-v.tsx`; rename the single
`export function VariantH()` → `VariantV`; replace the top header comment
with the Variant V header from plan 001 Step 2.3 (same text, "Variant K" →
"Variant V", same measured color rules and "Section order: unchanged from
VariantH").

**Verify**: `bun run check-types && bun run test` → green.

### Step 3: Duotone primitives

In `variant-v.tsx`, below `DIVISION_DOT`, add `DIVISION_FIELD`
(division → `bg-nutrition`/`bg-food`/`bg-cosmetics`/`bg-chem`/`bg-agro`/
`bg-feed`) and
`const DUOTONE_IMG = "grayscale contrast-110 mix-blend-multiply";`
exactly as specified in plan 001 Step 3.

### Step 4: Hero duotone (Brand Green)

At the hero anchor (~506): wrapper `<div ref={imgRef} className="absolute
inset-0">` gains `bg-brand-green-600 isolate`; the `m.img` className gains
`${DUOTONE_IMG}`. Keep the green-950/30 gradient overlay and caption badge.

### Step 5: Industries → three division color-field panels

At the industries anchor (~669): replace the `industries.map` row list with
the `INDUSTRY_PANELS` config + three-panel grid JSX **exactly as given in
plan 001 Step 5** (open `plans/001-vivid-division-color-system.md` and use
its Step 5 code blocks verbatim): panels bg-nutrition / bg-food /
bg-cosmetics-with-`bg-cosmetics-200`-text-zone, duotone images on the
full-saturation fields, paper specimen chips, full-opacity `text-ink` text,
Pantone/HEX specimen lines, `ArrowUpRight`, preserved `<a href="#matrix">`

- `aria-label`. Keep the `SectionHeader` above it unchanged. Remove imports
  only the old rows used.

### Step 6: Matrix card duotone

At the matrix anchor (~761–770): image container gains
`isolate ${DIVISION_FIELD[divisionForApplication(item.application)]}`; the
`<img>` gains `${DUOTONE_IMG}` (preserve its existing classes, including any
`outline*` utilities); hover overlay `bg-brand-green-950/0…/10` becomes
`bg-ink/0 … group-hover:bg-ink/10`. `DivisionBadge` unchanged.

### Step 7: Dossier duotone

At the dossier anchor (~861–868): container gains
`isolate ${DIVISION_FIELD[division]}`; `<img>` gains `${DUOTONE_IMG}`;
DELETE the `from-brand-green-950/25` gradient overlay div. Paper chips
unchanged.

**Verify (steps 3–7)**: `bun run check-types && bun run lint` → exit 0.

### Step 8: Tests

In `-index.test.tsx`: add `expect(validate({ variant: "v" })).toEqual({
variant: "v" });` beside the existing `"k"` assertion, and a
`renders the vivid duotone variant (v)` test mirroring the existing `"k"`
render test (mock `useSearch` → `{ variant: "v" }`, assert
`container.textContent` contains `FENCHEM`).

**Verify**: `bun run test` → all pass including both new assertions.

### Step 9: Final gates

`bun run check-types && bun run test && bun run lint` → all green. Confirm
with read-only `git status --porcelain` that only the three in-scope files
changed (plus whatever OTHER agents changed concurrently — list any files
that changed during your run that you did not touch).

## Done criteria

- [ ] gates green (typecheck 0, lint 0, tests incl. two new `"v"` assertions)
- [ ] `rg -c "DUOTONE_IMG" variant-v.tsx` ≥ 5; `rg -c "mix-blend-multiply"` ≥ 1
- [ ] `rg -n "DEFAULT_VARIANT: VariantKey = \"v\"" variants.ts` matches
- [ ] `k` entry reads `name: "Color Block · campaign"` with no `twinOf`
- [ ] `variant-h.tsx` and `variant-k.tsx` untouched by you (reviewer verifies
      against snapshots)
- [ ] only in-scope files modified by you

## STOP conditions

- An anchor site is structurally missing from live `variant-h.tsx`.
- Baseline red before any change.
- A text/field pairing seems to need a color outside the contrast table.
- Any fix appears to require touching `variant-k.tsx`, `variant-h.tsx`,
  `variant-j/`, `landing-content.ts`, `index.css`, or `packages/ui`.
- A file you already edited changes under you mid-run (another agent
  collided) — stop rather than overwrite.

## Maintenance notes

- Dosage is the design: division accents stay scoped to their own divisions'
  UI; reject spread into nav/footer/formulation/finale.
- Three vivid-family candidates now exist (k Color Block, v duotone,
  j Greenhouse Ledger). When a winner is declared, fold it into
  `routes/index.tsx`, delete losers + switcher, record an ADR.
- The tree's agent fleet commits directly to main; commit promptly after
  review to protect this work (the plan-001 duotone build was lost to an
  uncommitted overwrite).
