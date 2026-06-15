# Migrate the landing identity to the Fenchem brand book

**Status:** accepted

We are replacing the landing page's editorial forest-green/serif identity
(preserved at the `landing-v1-editorial` tag) with the official Fenchem brand
book — Brand Blue `#0743AE`, Brand Green `#64A733`, Clean White, Neutral Gray,
six division accents, and Source Han Sans typography — because the marketing
site must match the corporate brand, not a bespoke theme. Exact tokens live in
`docs/brand/fenchem-brand-book.md`.

## Decisions that a future reader will question

- **Green-led, not blue-led.** The brand book lists Brand Blue first as the
  corporate lead, so the obvious choice is blue-dominant. We deliberately make
  the landing variants **green-led** (green is the primary accent; blue is the
  secondary structural accent) per the site owner's call: it keeps continuity
  with the wellness/botanical positioning and the prior design. Blue-led remains
  a valid alternative if the brand team overrules — the tokens support either.

- **A serif display survives on variant D only.** The brand book is all
  sans-serif. Variant D (Botanical Editorial) keeps a serif headline font
  (`--font-editorial`, Newsreader) as a single, scoped exception to preserve its
  magazine character; every other variant and all body text uses Source Han
  Sans. This is an explicit, contained deviation — not a license to reintroduce
  serifs elsewhere.

- **Source Han Sans is delivered as Google Fonts "Noto Sans SC."** Source Han
  Sans and Noto Sans CJK are the same Adobe/Google typeface; Noto Sans SC is its
  Google Fonts delivery and carries Latin + Simplified-Chinese glyphs, so one
  family covers EN + 中文 without self-hosting.

- **Brand colors are authored in OKLCH.** Values are exact conversions of the
  brand book's sRGB; OKLCH gives perceptually even tint/shade ramps at constant
  hue. All source colors are sRGB, so no Display-P3 fallback is needed.

## Considered options

- **Recolor the single existing landing page in place.** Rejected for now: the
  site owner wants to compare layouts under the brand constraints first. We are
  prototyping four green-led variants (D/E/F/G ← A/B/C + hybrid) behind
  `?variant=` and will fold the winner in later (see `prototype/NOTES.md`).
- **Literal recolor of A/B/C.** Rejected: A's identity is its serif + warm
  cream and C's is dark forest-green — both removed by the brand book — so the
  variants are reinterpreted (D keeps a scoped serif; F becomes deep *green*
  immersive) rather than mechanically repainted.
