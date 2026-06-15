# English landing site uses Plus Jakarta + Newsreader, not Source Han Sans

**Status:** accepted (refines the typography decision in
[ADR-0001](./0001-fenchem-brand-book-migration.md))

For the **English-language** landing site we use the A/B/C typographic system —
**Newsreader** (serif display), **Plus Jakarta Sans** (body/UI), **JetBrains
Mono** (technical labels) — instead of the brand book's **Source Han Sans / Noto
Sans SC**, because Source Han Sans is a CJK typeface whose Latin glyphs are
designed to harmonize with Han characters and read as generic for an English
brand. The full evidence (rendered-width parity, 537 vs ~5 `@font-face` rules,
payload, and a visual specimen) is in
[docs/brand/font-adoption-comparison.md](../brand/font-adoption-comparison.md).
**The brand color palette is unchanged.**

## Why a future reader will question this — and the answer

- **It deviates from the brand book**, which mandates Source Han Sans for both
  Chinese and English. We treat that as correct for **Chinese-language** materials
  (and for any 中文 glyphs, via a local `Noto Sans SC` fallback in the stack), but
  not for the English marketing site, where purpose-built Latin faces look more
  premium and credible for a science-led B2B supplier. This is a scoped,
  documented exception — not a license to abandon the brand book elsewhere.
- **Width was not the reason.** Measurement showed Noto Sans SC is only ~0.1–1.6%
  wider than Plus Jakarta; the decision rests on letterform design intent,
  `@font-face` declaration bloat, and the editorial serif option Source Han Sans
  can't provide.

## Considered options

- **Keep Source Han Sans everywhere (brand-book literal).** Rejected for the
  English site on letterform/identity grounds; retained for Chinese content.
- **Plus Jakarta for everything, no serif.** Rejected: the owner wants the
  Newsreader serif display "as in A/B/C"; the serif suits a heritage/science brand.
- **Self-host a Latin-companion of Source Han Sans.** Rejected as overkill for a
  prototype; revisit if brand governance requires a single family.

## Consequences

- Variants D–G switch `font-brand` → `font-body`/`font-display`; the Noto Sans SC
  web-font import is removed (eliminating ~500 `@font-face` rules). Chinese glyphs
  fall back to a locally-installed Noto Sans SC or the system CJK font.
- If the site later needs server-rendered Chinese content, re-add a scoped Source
  Han Sans web-font import for those routes.
