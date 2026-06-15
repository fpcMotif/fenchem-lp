# Prototype verdict — Fenchem brand-book landing page

**Question:** Which green-led, brand-book landing layout should Fenchem ship?

**How to evaluate:** run `cd apps/web && bun run dev:bare` (or the project's dev
command), open the site, and flip variants with the floating bottom bar,
`←`/`→` arrow keys, or `?variant=a..g`. The bar pairs each original next to its
brand twin (A↔D, B↔E, C↔F) so ←/→ toggles between them.

A/B/C are the **original** prototypes (editorial palette + Newsreader serif,
restored from commit `932b56c`). D/E/F/G are their **brand-book** versions —
Brand Blue `#0743AE`, Brand Green `#64A733`, Clean White, Neutral Gray, six
division accents, Source Han Sans — all **green-led** (green primary, blue
structural accent). See `CONTEXT.md`, `docs/brand/fenchem-brand-book.md`, and
`docs/adr/0001-fenchem-brand-book-migration.md`.

- **A → D — Botanical Editorial** · clean wellness-magazine, serif display (the
  one serif exception in D), blob-masked imagery, asymmetric cards.
- **B → E — Innovation Lab** · clinical spec-sheet, mono micro-labels, hairline
  grid, **division-color-coded ingredient matrix** (D/E), ticker marquee.
- **C → F — Deep Forest / Deep Green** · immersive cinematic dark (forest green
  in C, deep brand-green in F), full-viewport hero, parallax chapters, rail.
- **G — Hybrid (production candidate)** · editorial hero + division matrix +
  deep-green finale, all sans, one cohesive page (brand only).

**Winner:** _undecided — fill in after flipping through the variants._
Hybrid feedback ("D's hero with E's matrix") is the most useful kind.

**When decided:** fold the winner into `src/routes/index.tsx` properly (rewrite,
don't promote prototype code as-is), delete the losing variant files +
`prototype-switcher.tsx`, and record the verdict here + in an ADR.
