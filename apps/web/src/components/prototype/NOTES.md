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

- **S — Strontium · periodic index** (default, twin of V) · direction derived
  from a 96-char random seed (`UOksd3dz…DlkM`, header comment in
  `variant-s.tsx`): 96 = 12 × 8 → 12-col / 8px / 96px rhythm; its digits
  `383 724 503 529` open with the content's own 3·8·3 shape (industries ·
  ingredients · pillars) and are drawn literally as the hero ruler; the lone
  `0` at char 64 = ⅔ puts the single dark band in the last third of the page; "Sr" ×2 +
  leading 38 (strontium) → ingredients as specimen tiles (code · symbol ·
  Latin · assay); 41 upper / 43 lower case → Newsreader italic phrases at
  equal rank with Plus Jakarta. Adds the equirectangular map with arcs from
  Nanjing and a hover-flip tile index. Same content seam and motion system.

- **T — Chevron · kinetic poster** · seed `ehvVxOx5…Qyq4`: `V` is the top
  character (8×) → diagonal V-cut hero seam with a green-500 stripe, a `V`
  glyph breaking each section rule, "vitality" as the one italic word;
  palindromes `xOx`/`VmV` → mirrored chapters; exact 41/41 case → 50/50 hero;
  42 case flips → word-by-word headline, chevron marquee, parallax; zeros at
  60/67 → two dark beats (stats, finale). Plus Jakarta 800 caps, sharp corners.
- **U — Ledger · Stitch corporate** · seed `Q1cdjc45…txb4`: 24/96 digits →
  KPI band, 8-row ingredient table, 6-row regions table, tabular numerals;
  `456`/`567` → numbered ledgers; `72DF68` ≈ brand-green-400 → green only as
  dots/rules; `Q1` → report-cover hero with a spec card. Applies the Stitch
  "Fenchem B2B Corporate Identity" system (2026-09-08) literally: navy ink,
  navy CTA, one sans, no dark band — a deliberate deviation from the
  green-led landing principles, for comparison.
- **X — Folio · magazine spread** · seed `N4vpKltT…0lrH`: doubled letters
  `II UU 00 ll` → diptych with a column rule and real two-column prose;
  vertical-stroke top chars → sideways sticky folios; `II` → Roman chapters
  I–IV; four zeros, ends on `0` → ringed round portraits and a single dark
  band at the end; no element symbols → print devices (drop cap, standfirst,
  pull quote, colophon). Newsreader-led.
- **Y — Atlas · dark globe hero** · seed `ThR6AQsb…2BgA`: `M`×6 / `A`×5 →
  Plus Jakarta 800 caps wide-tracked; `fAZ5` → A–Z ingredient index with a
  letter rail and sticky preview; digits open `6 5 6 6` → six-cell hairline
  grids; lone `0` at char 31 ≈ ⅓ → the dark act comes first (full-viewport
  green-950 atlas hero with arcs from Nanjing), then light, light finale.

Comparison page (captures, seed fingerprints, side-by-side picker) is the
published artifact "Fenchem Landing Directions"; captures live in the session
scratchpad and are regenerated with the Playwright `shoot*.mjs` scripts.

**Winner:** _undecided — fill in after flipping through the variants._
Hybrid feedback ("D's hero with E's matrix") is the most useful kind.

**When decided:** fold the winner into `src/routes/index.tsx` properly (rewrite,
don't promote prototype code as-is), delete the losing variant files +
`prototype-switcher.tsx`, and record the verdict here + in an ADR.
