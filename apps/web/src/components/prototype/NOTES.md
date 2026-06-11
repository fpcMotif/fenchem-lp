# Prototype verdict — Fenchem landing page

**Question:** What should the Fenchem company landing page look like?

**How to evaluate:** run `cd apps/web && bun run dev:bare`, open
http://localhost:3001/ and flip variants with the floating bottom bar,
`←`/`→` arrow keys, or `?variant=a|b|c`.

- **A — Botanical Editorial** · warm cream wellness-magazine, serif hero,
  blob-masked imagery, asymmetric cards (closest to the Stitch
  "Natural Vitality" screen)
- **B — Innovation Lab** · clinical white spec-sheet, mono micro-labels,
  bordered grid, grayscale→color ingredient matrix, ticker marquee (closest
  to the Stitch "Innovation Lab" screen)
- **C — Deep Forest** · immersive cinematic dark, full-viewport hero,
  parallax chapters, horizontal ingredient rail, glowing mint CTA

**Winner:** _undecided — fill in after flipping through the variants._
Hybrid feedback ("hero from C with B's ingredient matrix") is the most
useful kind.

**When decided:** fold the winner into `src/routes/index.tsx` properly
(rewrite, don't promote prototype code as-is), delete the losing variant
files + `prototype-switcher.tsx`, and remove the PROTOTYPE guards in
`__root.tsx` once a real Convex deployment exists (`bun dev:setup`).
