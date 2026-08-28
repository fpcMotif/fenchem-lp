# Landing continuous-improvement log

Standing log of measured findings against the shipped landing variant. Each
entry records what improved, what was verified, and what is still open —
numbers over vibes, same standard as the design review.

## 2026-08 — Variant H ships as production default

**Status: 2 HIGH layout findings open — fix before ship. Everything else is the
step forward.**

Variant H ("Production · recommended") replaced Variant D as the routed default
(`DEFAULT_VARIANT` in `apps/web/src/components/prototype/variants.ts`).

### Why Variant H is the aesthetic step forward

The 2026-08 review judged Variant G's hybrid — B/E's spec discipline, a calmer
industries list, F's deep-green mood as a finale instead of a page wash — the
right production direction, and H is that direction with every measured finding
applied. The review's verdict formally supersedes G: H ships as "Production ·
recommended," its header comment recording the ratio behind each color
decision, while G remains the pre-fix hybrid. The result is the same structure,
now legible, brand-consistent, and finished.

**Measured, not vibes**

- Primary CTAs: green-950 text on green-500 = 5.18:1, hover green-400 = 6.92:1.
  White-on-green-500 is banned — it failed at 2.95:1. All four CTAs in H use
  the passing pair.
- Blue is interactive-only (links, outline CTAs; "Blue is never a surface").
  Eyebrows and section numerals move to green-700 — 5.73:1 on paper — where G
  set static text in blue.
- Type floors: small text floors at mute-600 (6.00:1); mute-400/500 demoted to
  border/decoration tier; mono micro-labels floor at 11px. G carries 22
  sub-floor 9/10px labels; H carries zero, via one shared `TECH_LABEL`
  constant.
- Badges over photography: solid paper chip + ink text + division color dot —
  never colored text on an image. G's white-on-food chip measured 2.76:1.
- Dark finale: full-opacity green-400 labels (6.92:1) and green-300 coordinates
  (9.35:1) replace alpha-muted greens that failed at 2.2–2.8:1.
- Rejected imagery overridden: the competitor-branded tube ("a hard no")
  becomes a dew-macro leaf (FN-068); the two worst pharma pill piles become
  soil/seedling (FN-014) and clean-label food (FN-052). Full origin-photography
  replacement stays an open content task.
- Stale math fixed: "25+ years … since 1995" — carried by all of A–G —
  corrected to "30+ Years, botanical expertise since 1995."
- Hero rebalanced per polish priority #2: black-dominant with one green phrase,
  replacing G's two-of-three green headline lines that "read promotional."
  Division accents stay matrix-only — G's dosage, "which is correct," against
  E's six-hue overload.
- Editorial beat restored: C's "Grown with patience." pull-quote — "the best
  copy moment on any page" and the one thing the hybrid lost — ported in ahead
  of Standards.
- Motion unified: one easing `cubic-bezier(0.22, 1, 0.36, 1)`, one reveal
  (~0.8–0.9s, 24–32px lift, 0.08s stagger), everything reduced-motion gated —
  replacing G's hardcoded 0.1/0.18/0.26/0.34 delays.

**What H adds over G**

- **Portfolio nav dropdown** — a real disclosure menu built from live
  ingredient data (three division columns, compound count,
  Escape-closes-and-returns-focus, outside-click close) plus a mobile
  hamburger. G's nav was flat anchor links.
- **Product Dossier** — a single-ingredient deep section (KSM-66: 5-row spec
  table, serif-italic Latin name, format chips, dual CTAs). The product-depth
  beat missing from G's entire section map.
- **Formulation Presenter** — application/form/regulatory pickers composing a
  live dark spec sheet of matching actives; the only stateful conversion tool
  in the variant set, and the hero's secondary CTA now points at it instead of
  a mailto.

**Carried principle:** restraint is the house style — trust argued in
spec-sheet numbers, color roles proven by measured ratios, one easing, one
reveal, and spectacle spent only where it proves the claim.

### Open layout findings (2026-08 stress-test, browser-verified)

| Severity | Location                                                                                                               | Finding                                                                                                                                                                                                                     | Fix (project styling system)                                                                                                                  |
| -------- | ---------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| HIGH     | `variant-h.tsx:490`                                                                                                    | Hero image column has only absolutely-positioned children — measured **1px tall** at 375px and 768px; the hero photo and caption badge never render below `lg`                                                              | Add `min-h-80` to the wrapper (the Dossier-image pattern at `:830`)                                                                           |
| HIGH     | `variant-h.tsx:227`                                                                                                    | Portfolio dropdown `w-[640px]` centered on its trigger — left edge at **−37px** at a 768px viewport; the Nutrition column's text and links are clipped off-screen                                                           | Drop `relative` from the menu root; `absolute inset-x-0 top-full mx-auto w-[min(640px,calc(100vw-2.5rem))]` (the MobileNav pattern at `:302`) |
| MEDIUM   | `variant-h.tsx:388`                                                                                                    | Nav CTA "Request a Specification" wraps to two lines at ≤375px (measured 60px vs the 44px single-line height); translation growth makes it worse                                                                            | Short label below `sm`: `<span className="sm:hidden">Request Spec</span>` + full label from `sm:`                                             |
| MEDIUM   | `variant-h.tsx:663`                                                                                                    | Industries photo `md:col-span-1 md:aspect-square` renders **34×34px** at 768px — a 1/12 track cannot hold a photograph                                                                                                      | `hidden lg:block` (rebalance copy to `md:col-span-6`), or give the image `md:col-span-2`                                                      |
| MEDIUM   | 14 locations: `variant-h.tsx` 405, 548, 563, 691, 760, 768, 830, 838, 878, 1124, 1199, 1222; `landing-page.tsx` 46, 93 | Physical utilities (`right-2`, `pr-8`, `text-right`, `border-l-2`, `lg:border-l/r`, `origin-left`, `md:ml-auto`, `focus:left-4`) pin the layout when mirrored for RTL — a brand serving 40+ regulated markets will localize | Tailwind logical variants: `end-2`, `pe-8`, `text-end`, `border-s-2`, `lg:border-s/e`, `rtl:origin-right`, `md:ms-auto`, `focus:start-4`      |
| LOW      | `variant-h.tsx:1394`                                                                                                   | Footer grid fills 11 of 12 tracks (`col-span-5` + 3×`col-span-2`) — stray empty trailing column off the shared alignment edge                                                                                               | `md:col-span-6` on the brand block, or rebalance to reach the trailing edge                                                                   |
| LOW      | `variant-h.tsx:427`                                                                                                    | Hero `min-h-[80vh]` while the sibling landing page uses `svh` — overshoots under mobile browser chrome                                                                                                                      | `min-h-[80svh]`                                                                                                                               |

### Verification record

- Browser-verified (dev server, variant H) at 320 / 375 / 768 / 1440 px:
  dropdown geometry, hero and industries image measurements,
  horizontal-overflow scan (none found), watermark containment at desktop.
- Approximated: 200% zoom via 320px-viewport reflow; pseudo-localization
  (English labels already wrap at 375px).
- Not verified: in-browser RTL mirror (logical-property findings are from code
  inspection); the untouched layouts of variants A–G.

### Sync record

- Claude Design project: this log at
  `guidelines/docs/brand/landing-continuous-improvement.md`, highlight card at
  `notes/LayoutReview2026-08.html`, and the VariantH prompt doc carry the same
  findings.
- FigJam board: [Fenchem LP — Continuous
  Improvement](https://www.figma.com/board/BSvfEPrVSHxCFE6KO7DEP6).
