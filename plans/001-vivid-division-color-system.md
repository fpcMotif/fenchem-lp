# Plan 001: Ship Variant K — a vivid division-color landing page with spec-sheet rigor

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: several in-scope files are intentionally dirty
> against HEAD (`4100896`) — the working tree IS the baseline. The
> authoritative drift check is comparing every "Current state" excerpt below
> against the live code before touching it; on a mismatch, treat it as a STOP
> condition.

## Status

- **Priority**: P1
- **Effort**: M
- **Risk**: LOW (new prototype variant; Variant H stays untouched as rollback)
- **Depends on**: none
- **Category**: direction (design)
- **Planned at**: commit `4100896`, 2026-08-28. **Reconciled 2026-08-28**:
  the originally planned key `j` was claimed in the meantime by a separate
  in-progress build ("Greenhouse Ledger · motion", `variant-j/` directory) —
  this plan's variant is now **K** (`variant-k.tsx`). Do not touch the
  Greenhouse Ledger files.

## Why this matters

The site owner wants the landing page to feel **more modern and more colorful
while keeping scientific rigor and a professional B2B voice**. The current
production candidate (Variant H, the default on `/`) is disciplined and
credible — white canvas, green-led, mono spec labels — but chromatically quiet:
the only hues on the page are Brand Green and a trace of Brand Blue, and its
stock photography reads as mismatched full-color Unsplash picks (a problem the
2026-08 design review flagged as the set's worst offender).

The owner supplied four reference images: subjects photographed on bold,
saturated single-color seamless backgrounds (orange, purple, teal, yellow).
Those backdrops map almost exactly onto Fenchem's own **auxiliary division
accents** from the brand book — Food `#E48336`, Cosmetics `#A05EB5`,
Agrochemical `#55A695`, Nutrition `#FFF67F`. So "more colorful" can be done
**on-brand**: use the division accents as section-scale color fields, render
all category photography as **duotones** (grayscale image multiplied onto the
division's color field), and label each field with its Pantone/HEX like a
calibrated lab specimen. One CSS treatment simultaneously (a) delivers the
reference-image look, (b) unifies the mismatched stock photography, and
(c) keeps the spec-sheet rigor that earns B2B trust.

This plan builds **Variant K ("Production · vivid")** as a clone of Variant H
with the color system applied, registers it in the variant switcher, and makes
it the default — so the owner can flip K↔H side by side and H remains the
instant rollback. (A separate motion-led direction, Variant J "Greenhouse
Ledger", is being built in parallel by someone else; K competes in the same
switcher, it does not replace J.)

## Current state

### Repo facts

- Monorepo: Bun workspaces + vite-plus (`vp`). Frontend at `apps/web`
  (React 19, TanStack Start/Router, Tailwind v4, `motion/react`). Package
  manager is **bun** — never npm/npx.
- `/` renders one of ten landing prototypes selected by `?variant=` — see
  `apps/web/src/routes/index.tsx`. The registry is
  `apps/web/src/components/prototype/variants.ts`; `DEFAULT_VARIANT` is
  currently `"h"`.
- Variant H (`apps/web/src/components/prototype/variant-h.tsx`, 1536 lines)
  is "Production · recommended": nav with portfolio menu → hero with stat band
  → ingredient ticker → industries → ingredient matrix → product dossier →
  formulation presenter → origin + standards → deep-green finale → footer.
- All stable domain data comes from the **content seam**
  `apps/web/src/components/landing/landing-content.ts` (ingredients,
  industries, regions, certifications, `divisionForApplication`, …). Variants
  render _through_ it; only prose and presentation live in variant files.
  Do not add data to variant files that belongs in the seam.
- Shared motion primitives: `apps/web/src/components/prototype/motion.tsx`
  (`Reveal`, `Intro`) and `motion-constants.ts` (`EASE`, `STAGGER`). Variants
  render inside `<LazyMotion features={domAnimation} strict>`.
- Brand tokens live at the app layer in `apps/web/src/index.css` inside a
  Tailwind v4 `@theme` block (NOT in `packages/ui`). Existing tokens include
  `--color-paper`, `--color-ink`, `--color-line`, `--color-mute-*`,
  `--color-brand-green-50…950`, `--color-brand-blue-50…950`, and the six
  flat division accents:

  ```css
  /* apps/web/src/index.css:73-78 */
  --color-feed: oklch(0.81 0.157 128.606); /* #A2D45E 饲料 */
  --color-cosmetics: oklch(0.59 0.145 317.586); /* #A05EB5 化妆品 */
  --color-agro: oklch(0.669 0.084 178.19); /* #55A695 农化 */
  --color-food: oklch(0.703 0.148 55.168); /* #E48336 食品 */
  --color-chem: oklch(0.631 0.146 250.852); /* #3A8DDE 化工 */
  --color-nutrition: oklch(0.957 0.141 104.856); /* #FFF67F 营养 */
  ```

- Fonts (per ADR-0002, `docs/adr/0002-english-site-typography.md`):
  `font-display` = Newsreader (serif display), `font-body` = Plus Jakarta
  Sans, `font-tech` = JetBrains Mono. Do not change the type system.

### Design constraints you must honor (from the intent docs — quoted, since you have not read them)

- Brand book (`docs/brand/fenchem-brand-book.md`): auxiliary colors are
  division accents — _"Use sparingly, as category/section accents — never as a
  page's primary surface."_ And: _"Auxiliary colors = wayfinding. Tag a
  division/category, never a whole page."_
  **Compliance argument this plan relies on**: each accent appears **only in
  the UI that represents its own division** (the Nutrition panel is yellow,
  the Food panel orange, the Personal Care panel purple; matrix cards are
  tinted by the division of the ingredient they show). The page canvas stays
  Clean White and Brand Green stays the lead accent. Do not extend division
  colors beyond the placements in this plan.
- Design review (`docs/brand/landing-variants-design-review.md`) findings that
  bound this work:
  - _"E uses six hues on one page … the clinical concept thrives on
    restraint."_ → K uses exactly **three** division hues (nutrition, food,
    cosmetics — the three applications actually sold on the page) plus Brand
    Green/Blue. Feed/agro/chem stay unused.
  - _"Stock imagery undermines the brand story."_ → the duotone treatment is
    the code-side mitigation; real origin photography remains a content task.
  - Variant H's header comment records measured WCAG ratios for every color
    decision — _"the alpha-muted greens failed at 2.2–2.8:1"_. Follow the same
    discipline: **no alpha-muted text on color fields** and no new
    text/background pairs beyond the table in this plan.
- Vocabulary (`CONTEXT.md`): say **division** (not department/sector),
  **auxiliary color** (not secondary/theme color), **Brand Green / Brand
  Blue / Clean White / Neutral Gray** for the four brand colors. Use these
  words in code comments.

### Contrast rules for this plan (pre-computed — do not invent new pairs)

`--color-ink` is `oklch(0.22 0 0)` (near-black); `--color-paper` is white.

| Text                             | On field                               | Approx WCAG                   | Allowed use                                  |
| -------------------------------- | -------------------------------------- | ----------------------------- | -------------------------------------------- |
| `text-ink` (full opacity)        | `bg-nutrition` (L 0.957)               | ~11:1                         | any text size                                |
| `text-ink` (full opacity)        | `bg-food` (L 0.703)                    | ~5.9:1                        | any text size                                |
| `text-ink` (full opacity)        | `bg-cosmetics-200` (L 0.90, new token) | ~9:1                          | any text size                                |
| `text-ink` on `bg-paper/95` chip | over any image/field                   | ~15:1                         | badges on imagery                            |
| —                                | `bg-cosmetics` (L 0.59)                | white fails 4.5:1, ink ~4.0:1 | **imagery only — never text directly on it** |

Rules: (1) on full-saturation fields all text is full-opacity `text-ink` — no
`text-ink/70`, no `text-mute-600`; (2) the full cosmetics purple carries
images and paper-chip badges only, never bare text; (3) `font-tech`
micro-labels never go below 11px (Variant H's floor).

### Key excerpts of the code as it exists today

`apps/web/src/components/prototype/variants.ts:34-51` (registry — you will
extend it; note `"j"` is already taken by the Greenhouse Ledger build):

```ts
export const VARIANTS = [
  { key: "a", Component: VariantA, name: "Botanical Editorial · original" },
  { key: "d", Component: VariantD, name: "Botanical Editorial · brand", twinOf: "a" },
  { key: "b", Component: VariantB, name: "Innovation Lab · original" },
  { key: "e", Component: VariantE, name: "Innovation Lab · brand", twinOf: "b" },
  { key: "c", Component: VariantC, name: "Deep Forest · original" },
  { key: "f", Component: VariantF, name: "Deep Green · brand", twinOf: "c" },
  { key: "g", Component: VariantG, name: "Hybrid · brand" },
  { key: "h", Component: VariantH, name: "Production · recommended" },
  { key: "i", Component: VariantI, name: "Production+ · map & WebGL" },
  { key: "j", Component: VariantJ, name: "Greenhouse Ledger · motion" },
] as const satisfies readonly VariantEntry[];
...
export const DEFAULT_VARIANT: VariantKey = "h";
```

`apps/web/src/components/prototype/variant-h.tsx:507-516` (hero image column —
you will duotone it in the K clone):

```tsx
{/* Right: botanical image */}
<div className="relative overflow-hidden border-t border-line lg:col-span-5 lg:border-l lg:border-t-0">
  <div ref={imgRef} className="absolute inset-0">
    <m.img
      src={IMG.hero}
      alt="Lush green botanical leaves in morning light — representing Fenchem's natural ingredient sourcing"
      className="h-[116%] w-full object-cover"
      style={{ y: reduce ? 0 : imgY }}
```

`apps/web/src/components/prototype/variant-h.tsx:672` — the industries rows
(`industries.map((industry, i) => (` inside `IndustriesSection`), replaced by
color-field panels in the K clone. Today each industry renders as a quiet
white row: number, title, copy, a small `aspect-square` image, and an
`ArrowUpRight`, all wrapped in `<a href="#matrix">` with
`aria-label={`${industry.title} — view in the ingredient matrix`}`.

`apps/web/src/components/prototype/variant-h.tsx:761-770` (matrix card image —
gets the duotone backplate in the K clone):

```tsx
<div className="relative aspect-[4/3] overflow-hidden border-b border-line">
  <img
    src={imgFor(item).src}
    alt={imgFor(item).alt}
    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
    loading="lazy"
  />
  <DivisionBadge ingredient={item} />
  <div className="absolute inset-0 bg-brand-green-950/0 transition-colors duration-500 group-hover:bg-brand-green-950/10" />
</div>
```

`apps/web/src/components/prototype/variant-h.tsx:861-868` (dossier image
column — gets the division duotone; note the green gradient overlay you will
remove in the clone):

```tsx
<div className="relative min-h-80 overflow-hidden border-b border-line lg:col-span-5 lg:border-b-0 lg:border-r">
  <img
    src={imgFor(DOSSIER).src}
    alt={imgFor(DOSSIER).alt}
    className="absolute inset-0 h-full w-full object-cover"
    loading="lazy"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-brand-green-950/25 via-transparent to-transparent" />
```

`apps/web/src/routes/-index.test.tsx:12-21` (the tests you will extend; note
the symbolic use of `DEFAULT_VARIANT`, which keeps them green when the default
flips):

```tsx
test("validates the variant search param and defaults to the production candidate", () => {
  ...
  expect(validate({})).toEqual({ variant: DEFAULT_VARIANT });
  expect(validate({ variant: "g" })).toEqual({ variant: "g" });
```

## Commands you will need

Run from the repo root (`C:\Users\fenchem\fenchem-lp`), shell is bash.

| Purpose                   | Command                           | Expected on success                  |
| ------------------------- | --------------------------------- | ------------------------------------ |
| Install                   | `bun install`                     | exit 0                               |
| Typecheck                 | `bun run check-types`             | exit 0, no errors                    |
| Unit tests                | `bun run test`                    | all pass (runs vitest in `apps/web`) |
| Lint                      | `bun run lint`                    | exit 0                               |
| Dev server (visual check) | `cd apps/web && bun run dev:bare` | serves on http://localhost:3001      |

Do NOT run `bun run check` — it runs `oxfmt --write` repo-wide and would
reformat unrelated work-in-progress files.

## Scope

**In scope** (the only files you should create/modify):

- `apps/web/src/index.css` — add ONE token to the `@theme` block
- `apps/web/src/components/prototype/variant-k.tsx` — **create** (clone of variant-h)
- `apps/web/src/components/prototype/variants.ts` — register K, flip default
- `apps/web/src/routes/-index.test.tsx` — extend tests
- `plans/README.md` — status row update at the end (skip if your reviewer
  maintains the index)

**Out of scope** (do NOT touch, even though they look related):

- `apps/web/src/components/prototype/variant-j/` (all files) and
  `docs/brand/variant-j-direction.md` — the parallel "Greenhouse Ledger"
  build. Not yours. In `variants.ts`, touch nothing about the `"j"` entry.
- `apps/web/src/components/prototype/variant-a.tsx` … `variant-i.tsx` — H is
  the untouched rollback baseline; A–G/I are comparison history.
- `apps/web/src/components/landing/landing-page.tsx` and
  `landing-content.ts` — the content seam's data and the folded-in landing
  page. No copy changes, no data changes, no new ingredients.
- `apps/web/package.json`, `bun.lock` — this plan adds no dependencies.
- `packages/ui/src/styles/globals.css` — shared shadcn tokens; brand tokens
  live at the app layer.
- `apps/web/src/components/prototype/prototype-switcher.tsx` — reads the
  registry; needs no change.
- `apps/web/src/routes/index.tsx` — the registry drives it; needs no change
  (its "seven variants" comment is stale, but leave it; see maintenance notes).
- Fonts, copy/prose, nav structure, section order, motion timings.

## Git workflow

The working tree contains unrelated in-progress work. **Perform no git
operations at all**: no branch, no commit, no stash, no restore. Leave all
changes uncommitted for the reviewer; verification is via the commands above,
not via git state.

## Steps

### Step 0: Baseline

Compare every "Current state" excerpt above against the live files (this is
the drift check). Then confirm the tree is green before you change anything:

**Verify**: `bun install && bun run check-types && bun run test` → all exit 0.
If the baseline is already red, STOP and report.

### Step 1: Add the cosmetics tint token

In `apps/web/src/index.css`, inside the existing `@theme` block, directly
below the division-accent lines quoted in "Current state" (after
`--color-nutrition`), add:

```css
/* Cosmetics division tint — text zone for the vivid color-field panels
 * (variant K). Full-saturation cosmetics (L 0.59) cannot carry AA text in
 * either polarity, so its panel text sits on this L 0.90 tint (ink ≈ 9:1).
 * Same hue, chroma tapered — matches the brand-book tint methodology. */
--color-cosmetics-200: oklch(0.9 0.06 317.586);
```

No other token is needed: nutrition (L 0.957) and food (L 0.703) carry
full-opacity ink text at ≥ ~5:1 at book value.

**Verify**: `bun run check-types` → exit 0.

### Step 2: Create Variant K as a clone of Variant H and register it

1. Copy `apps/web/src/components/prototype/variant-h.tsx` to
   `apps/web/src/components/prototype/variant-k.tsx`.
2. In the new file, rename the exported component `VariantH` → `VariantK`
   (one occurrence, near the bottom — `export function VariantH()` at ~line
   1516 of the clone).
3. Replace the header comment (the `/* ... */` block at the very top) with:

   ```tsx
   /*
    * PROTOTYPE — Variant K: "Production · vivid" — VariantH plus the vivid
    * division color system. Category imagery renders as duotones (grayscale
    * photo multiplied onto a division auxiliary-color field), the industries
    * section becomes three division color-field panels labeled with their
    * brand-book Pantone/HEX like calibrated specimens, and matrix/dossier
    * imagery is tinted by the division it belongs to.
    *
    * Brand-book compliance: auxiliary colors are wayfinding — each accent
    * appears ONLY in the UI representing its own division (three hues total:
    * nutrition, food, cosmetics). Clean White stays the canvas; Brand Green
    * stays the lead accent. Do not extend division color beyond these
    * placements.
    *
    * Measured color rules (see plans/001-vivid-division-color-system.md):
    *   - Full-opacity ink on bg-nutrition (~11:1), bg-food (~5.9:1),
    *     bg-cosmetics-200 (~9:1). No alpha-muted text on color fields.
    *   - bg-cosmetics (L 0.59) carries imagery and paper-chip badges only —
    *     never bare text (white fails 4.5:1, ink ~4.0:1).
    *   - font-tech micro-labels floor at 11px (inherited from VariantH).
    *
    * Section order: unchanged from VariantH.
    */
   ```

4. In `apps/web/src/components/prototype/variants.ts`:
   - `import { VariantK } from "./variant-k";` (keep the import group's a→k order)
   - Append to `VARIANTS` after the `"j"` entry:
     `{ key: "k", Component: VariantK, name: "Production · vivid", twinOf: "h" },`
   - Change `export const DEFAULT_VARIANT: VariantKey = "h";` to `"k"`.
   - In the file's block comment, add one line noting K is H's vivid twin
     (←/→ toggles H↔K). Do not alter the `"j"` entry or its comment.

**Verify**: `bun run check-types && bun run test` → exit 0 (the route tests
use `DEFAULT_VARIANT` symbolically, so they stay green). Then
`cd apps/web && bun run dev:bare`, open http://localhost:3001 — the page
renders identically to H (it is still a byte-level clone apart from the
rename) and the switcher bar shows "Production · vivid" active.

### Step 3: Add the duotone primitive and the division field map

In `variant-k.tsx`, below the `DIVISION_DOT` constant, add:

```tsx
/** Division → full-saturation auxiliary field for duotone backplates. */
const DIVISION_FIELD: Record<string, string> = {
  nutrition: "bg-nutrition",
  food: "bg-food",
  cosmetics: "bg-cosmetics",
  chem: "bg-chem",
  agro: "bg-agro",
  feed: "bg-feed",
};

/** Duotone classes for an <img> sitting on a division color field. */
const DUOTONE_IMG = "grayscale contrast-110 mix-blend-multiply";
```

(No wrapper component is needed — the treatment is a background class on the
existing image container plus `DUOTONE_IMG` on the existing `<img>`; this
keeps the hero's parallax `m.img` untouched structurally.)

**Verify**: `bun run check-types` → exit 0. (Unused-constant lint may warn
until steps 4–6 use them; if `bun run lint` fails on unused vars here, fold
this step's edit into step 4's commit unit.)

### Step 4: Duotone the hero image (Brand Green)

In `variant-k.tsx` `HeroSection`, on the excerpt shown in "Current state":

- Add `bg-brand-green-600 isolate` to the inner wrapper:
  `<div ref={imgRef} className="absolute inset-0 bg-brand-green-600 isolate">`
- Add the duotone classes to the `m.img`:
  `className={`h-[116%] w-full object-cover ${DUOTONE_IMG}`}`
- Keep the existing `bg-gradient-to-t from-brand-green-950/30` overlay and the
  caption badge exactly as they are (the badge is a paper chip — safe on any
  field).

**Verify**: dev server — the hero photo now reads as a green duotone (a
graphic, single-hue image, not a grey photo). If it renders as plain
grayscale, the blend is escaping its stacking context — confirm the `isolate`
class is on the wrapper that carries the background color.

### Step 5: Rebuild the industries section as division color-field panels

This is the headline move — the section that delivers the reference-image
look. In `variant-k.tsx`, replace the body of `IndustriesSection`'s inner
`<div>` (the block that maps `industries` into row `<a>` elements — the
`industries.map` at ~line 672 of the clone) with a three-panel grid. Keep the
`SectionHeader` call above it unchanged.

Add this config next to `INDUSTRY_COPY` (index-aligned with `industries` from
the content seam: 0 = Nutrition & Supplements, 1 = Food & Beverage,
2 = Personal Care & Cosmeceuticals — confirm that order in
`landing-content.ts` before wiring):

```tsx
/*
 * Panel presentation per application — index-aligned with `industries`.
 * Auxiliary accents are wayfinding: each division's color appears only on
 * its own panel. Specimen lines quote the brand book's Pantone/HEX so the
 * color fields read as calibrated standards, not decoration.
 * Cosmetics text sits on its 200 tint — see the contrast table in the plan.
 */
const INDUSTRY_PANELS = [
  {
    imageField: "bg-nutrition",
    textField: "bg-nutrition",
    specimen: "Pantone Yellow 012 · #FFF67F — Nutrition Division",
  },
  {
    imageField: "bg-food",
    textField: "bg-food",
    specimen: "Pantone 164 C · #E48336 — Food Division",
  },
  {
    imageField: "bg-cosmetics",
    textField: "bg-cosmetics-200",
    specimen: "Pantone 2583 C · #A05EB5 — Cosmetics Division",
  },
] as const;
```

Replacement JSX (preserve the existing `<a href="#matrix">` wrapper semantics
and `aria-label` — screen-reader behavior must not regress):

```tsx
<div className="grid gap-px bg-line lg:grid-cols-3">
  {industries.map((industry, i) => {
    const panel = INDUSTRY_PANELS[i];
    return (
      <a
        key={industry.title}
        href="#matrix"
        aria-label={`${industry.title} — view in the ingredient matrix`}
        className="group block focus-visible:outline-2"
      >
        <Reveal delay={i * STAGGER} className="flex h-full flex-col">
          {/* Duotone image on the division's full-saturation field */}
          <div className={`relative isolate aspect-[4/3] overflow-hidden ${panel.imageField}`}>
            <img
              src={industry.image.src}
              alt={industry.image.alt}
              className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05] ${DUOTONE_IMG}`}
              loading="lazy"
            />
            {/* Paper specimen chip — readable over any field (VariantH badge pattern) */}
            <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-sm border border-line bg-paper/95 px-2 py-1 font-tech text-[11px] uppercase tracking-[0.16em] text-ink backdrop-blur-sm">
              <span aria-hidden className={`size-1.5 rounded-full ${panel.imageField}`} />
              {String(i + 1).padStart(2, "0")}
            </span>
          </div>
          {/* Text zone — full-opacity ink on a ≥5:1 field */}
          <div className={`flex flex-1 flex-col px-5 py-8 md:px-7 ${panel.textField}`}>
            <h3 className="font-body text-2xl font-bold tracking-[-0.03em] text-ink md:text-3xl">
              {industry.title}
            </h3>
            <p className="mt-3 text-pretty font-body text-sm leading-relaxed text-ink">
              {INDUSTRY_COPY[i]}
            </p>
            <div className="mt-auto flex items-center justify-between gap-4 pt-8">
              <span className="font-tech text-[11px] uppercase tracking-[0.18em] text-ink">
                {panel.specimen}
              </span>
              <ArrowUpRight
                aria-hidden
                className="size-5 shrink-0 text-ink transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </div>
          </div>
        </Reveal>
      </a>
    );
  })}
</div>
```

Notes:

- Every piece of text in the panels is full-opacity `text-ink` — do not
  "improve" it to `mute-600` or `ink/70`; those fail contrast on the orange
  field.
- The specimen line may wrap to two lines on narrow panels — that is fine; do
  not shrink it below 11px.
- If an import (`ArrowUpRight`) is already present from the clone, don't
  duplicate it. Remove any now-unused imports the old rows used exclusively.

**Verify**: `bun run check-types && bun run lint` → exit 0. Dev server —
section 01 shows three tall panels: yellow, orange, purple-tinted, each with a
duotone photo on its saturated field, ink text, and a mono Pantone specimen
line. Keyboard-tab onto each panel shows a visible focus outline.

### Step 6: Duotone the matrix card imagery per division

In `variant-k.tsx` `MatrixSection`, inside the `getFeaturedIngredients().map`
card, change the image block (excerpt in "Current state"):

- Container: add the division field + `isolate`:

  ```tsx
  <div className={`relative isolate aspect-[4/3] overflow-hidden border-b border-line ${DIVISION_FIELD[divisionForApplication(item.application)]}`}>
  ```

- Image: append `${DUOTONE_IMG}` to its className.
- Hover overlay: the green wash looks wrong on yellow/orange/purple fields —
  change `bg-brand-green-950/0 ... group-hover:bg-brand-green-950/10` to
  `bg-ink/0 ... group-hover:bg-ink/10`.
- `DivisionBadge` stays exactly as is (paper chip + ink + accent dot — safe on
  any field).

Everything below the image (code, name, latin, purity/form `dl`, Request Spec
link) stays on white and is unchanged.

**Verify**: dev server — the six matrix cards now carry division-tinted
duotone images (four yellow-tinted Nutrition, one orange Food, one purple
Personal Care) with the paper badges still crisp on top. `bun run check-types`
→ exit 0.

### Step 7: Duotone the dossier image (division of the featured active)

In `variant-k.tsx` `DossierSection` (excerpt in "Current state"):

- Container: add `isolate` and the division field:

  ```tsx
  <div className={`relative isolate min-h-80 overflow-hidden border-b border-line lg:col-span-5 lg:border-b-0 lg:border-r ${DIVISION_FIELD[division]}`}>
  ```

  (`division` is already computed in this component via
  `divisionForApplication(DOSSIER.application)`.)

- Image: append `${DUOTONE_IMG}` to its className.
- **Delete** the `bg-gradient-to-t from-brand-green-950/25` overlay `div` —
  a green veil over a yellow field would muddy it.
- Both paper chips (top-left division badge, bottom caption bar) stay
  unchanged.

**Verify**: dev server — the Ashwagandha dossier photo reads as a warm yellow
duotone with legible paper chips. `bun run check-types` → exit 0.

### Step 8: Extend the route tests

In `apps/web/src/routes/-index.test.tsx`:

1. In the `validateSearch` test, add one assertion:
   `expect(validate({ variant: "k" })).toEqual({ variant: "k" });`
2. Add a render test for the new default, modeled on the existing
   `renders the active variant and prototype switcher` test:

   ```tsx
   test("renders the vivid production variant (k)", () => {
     const Component = Route.options.component as React.ComponentType;
     vi.spyOn(Route, "useSearch").mockReturnValue({ variant: "k" } as never);

     const { container } = render(<Component />);
     expect(container.textContent).toContain("FENCHEM");
   });
   ```

**Verify**: `bun run test` → all pass, including the two new assertions.
(Escape hatch: if the `"k"` render test fails on a jsdom environment error —
e.g. a missing browser API also failing when you render variant `"h"` the
same way — fall back to the `expect(container).toBeTruthy()` assertion style
used by the existing `"d"` test, and note it in your report.)

### Step 9: Final gates

1. `bun run check-types && bun run test && bun run lint` → all exit 0.
2. Visual verification in a browser is performed by the reviewer — skip it if
   you have no browser tooling; say so in your report rather than claiming it.

## Test plan

- Extended: `apps/web/src/routes/-index.test.tsx` — (a) search-param
  validation accepts `"k"`; (b) variant K renders through the route component
  and contains the FENCHEM wordmark. Model both on the existing tests in the
  same file.
- Existing tests must stay green untouched apart from the additions above —
  in particular the default-variant test, which references `DEFAULT_VARIANT`
  symbolically.
- Verification: `bun run test` → all pass.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `bun run check-types` exits 0
- [ ] `bun run lint` exits 0
- [ ] `bun run test` exits 0, including the new `"k"` assertions
- [ ] `rg -c "mix-blend-multiply" apps/web/src/components/prototype/variant-k.tsx` ≥ 1 (the `DUOTONE_IMG` constant) and `rg -c "DUOTONE_IMG" apps/web/src/components/prototype/variant-k.tsx` ≥ 5 (definition + hero + industries + matrix + dossier)
- [ ] `rg -n "DEFAULT_VARIANT: VariantKey = \"k\"" apps/web/src/components/prototype/variants.ts` matches
- [ ] `rg -n "cosmetics-200" apps/web/src/index.css` matches
- [ ] `variant-h.tsx` is byte-identical to its pre-execution state (reviewer
      verifies against a snapshot; you simply never open it for writing)
- [ ] No files outside the in-scope list are modified
- [ ] `plans/README.md` status row updated (or left to the reviewer)

## STOP conditions

Stop and report back (do not improvise) if:

- Any "Current state" excerpt doesn't match the live code.
- The baseline (`check-types` / `test`) is red before you change anything.
- `bg-cosmetics-200` produces no styling in the browser after step 1 + step 5
  (i.e. Tailwind is not emitting the class) — do not work around it with
  arbitrary values; report.
- The duotone renders as a plain grayscale photo even with `isolate` on the
  colored wrapper (blend-mode not compositing against the field).
- Achieving any text/field pairing seems to require a color not in this
  plan's contrast table — do not invent tints; report.
- Any fix appears to require touching `variant-h.tsx`, `variant-j/`,
  `landing-content.ts`, or `packages/ui`.

## Maintenance notes

- **Dosage is the design.** The whole system depends on division accents
  staying scoped to their own divisions' UI. A reviewer should reject any
  follow-up that spreads yellow/orange/purple into nav, footer, formulation,
  or finale — that recreates the "six hues on one page" failure the design
  review documented for Variant E.
- **When a winner is declared** (see `apps/web/src/components/prototype/NOTES.md`):
  fold the winning variant into `src/routes/index.tsx` properly, delete the
  losers and the switcher, and record an ADR. If K wins, the
  `--color-cosmetics-200` token and the duotone/panels move with it. Also
  update the stale "seven variants" comments in `routes/index.tsx` at that
  point.
- **Variant J ("Greenhouse Ledger")** is a parallel motion-led direction with
  its own art-direction doc (`docs/brand/variant-j-direction.md`). K and J
  answer different briefs (color vs motion); they may eventually merge — the
  duotone/color-field system in K is section-local and portable.
- **Imagery remains a content task.** Duotone masks the stock-photo mismatch
  but the design review's call for real origin/lab photography still stands;
  when real photography lands, re-evaluate whether the industries panels keep
  duotone or switch to cut-out subjects on the color fields (closer still to
  the owner's reference images).
- Deferred out of this plan: ticker/division-colored separators (dosage risk,
  low value), any copy changes, dark-mode treatment (the landing variants are
  single-theme by design).
