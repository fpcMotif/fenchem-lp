# Variant H — continuous improvement (cross-discipline reviews)

Running log of cross-discipline findings from `/interfaces:better-interface`
reviews of the production-recommended landing page
(`apps/web/src/components/prototype/variant-h.tsx`). Newest entry first. When a
finding lands, append a `Resolved:` line under it rather than deleting the row —
the log is the memory. UI-polish-only findings live in the sibling log,
`landing-ui-polish-ci-notes.md`.

## 2026-08-31 — Layout stress-test (better-layout review, browser-verified) + production rationale

Layout-only pass over the rendered page at 320 / 375 / 768 / 1440 px (dev
server, variant H) plus a code-level logical-property sweep. Line numbers are
as of the 2026-08-31 source (post-polish, 1545 lines).

Independently re-confirmed both open HIGHs below with fresh measurements:

- Hero image column measured **375×1 px** and **768×1 px** (`variant-h.tsx:507`)
  — the wrapper has only absolutely-positioned children below `lg`. Fix stays
  the page's own idiom: `min-h-80`, exactly what the Dossier image already does
  at `:856`.
- Portfolio dropdown left edge measured **−37 px** at a 768 px viewport
  (`variant-h.tsx:227`, still `w-[640px]` centered on its trigger). Fix: drop
  `relative` from the menu root and anchor to the sticky header —
  `absolute inset-x-0 top-full mx-auto w-[min(640px,calc(100vw-2.5rem))]` —
  the pattern `MobileNav` already uses.
- Nav CTA wrap re-confirmed at 375 px too: "Request a Specification"
  (`variant-h.tsx:410`) renders 60 px tall vs the 44 px single-line height.

### New findings (not previously in the log)

| Severity | Finding                                                                                                                                                                                                                                                                                                                                                      | Location                            | Fix                                                                                                                                                                                                                                              |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| MEDIUM   | Industries photo `md:col-span-1 md:aspect-square` renders **34×34 px** at 768 px (90×90 at 1440) — a 1/12 track cannot hold a photograph, so the image reads as noise through the whole `md` range                                                                                                                                                           | `variant-h.tsx:691`                 | `hidden lg:block` (rebalance copy to `md:col-span-6`), or give the image `md:col-span-2`                                                                                                                                                         |
| MEDIUM   | 15 physical utilities pin the layout when mirrored for RTL — a brand shipping into 40+ regulated markets will localize. `origin-left` :423, `right-2` :566, `pr-8` :593, `right-3` :719, `text-right` :786/:794/:902/:1162, `lg:border-l/r` :507/:856/:1264, `left-4` :864, `border-l-2 pl-5` :1241; `landing-page.tsx` `focus:left-4` :46, `md:ml-auto` :93 | `variant-h.tsx`, `landing-page.tsx` | Tailwind logical variants: `end-2`, `pe-8`, `text-end`, `border-s-2 ps-5`, `lg:border-s/e`, `rtl:origin-right`, `md:ms-auto`, `focus:start-4`. Symmetric pairs (ticker edge fades, full-width caption badges) are direction-neutral — leave them |
| LOW      | Footer grid fills 11 of 12 tracks (`col-span-5` + 3×`col-span-2`) — stray empty trailing column off the shared alignment edge                                                                                                                                                                                                                                | `variant-h.tsx:1440`                | `md:col-span-6` on the brand block, or rebalance to reach the trailing edge                                                                                                                                                                      |
| LOW      | Hero `min-h-[80vh]` while the sibling landing page uses `svh` — overshoots under mobile browser chrome                                                                                                                                                                                                                                                       | `variant-h.tsx:445`                 | `min-h-[80svh]`                                                                                                                                                                                                                                  |

Verification record: browser-verified at 320/375/768/1440 (dropdown geometry,
image measurements, horizontal-overflow scan — none found, watermark
containment). Approximated: 200% zoom via 320 px reflow; pseudo-localization
(English already wraps at 375 px). Not verified: in-browser RTL mirror
(logical-property rows are code inspection); variants A–G untouched layouts.

### Why Variant H is the aesthetic step forward (production rationale)

Recorded here so the design side carries the argument, not just the defects.
The 2026-08 review judged Variant G's hybrid — B/E's spec discipline, a calmer
industries list, F's deep-green mood as a finale instead of a page wash — the
right production direction, and H is that direction with every measured finding
applied. The review's verdict formally supersedes G. Same structure, now
legible, brand-consistent, and finished.

Measured, not vibes:

- Primary CTAs: green-950 on green-500 = 5.18:1, hover green-400 = 6.92:1;
  white-on-green-500 is banned (failed 2.95:1). All four CTAs use the passing
  pair.
- Blue is interactive-only ("blue is never a surface"); eyebrows and section
  numerals moved to green-700 (5.73:1) where G set static text in blue.
- Type floors: small text at mute-600 (6.00:1), mono micro-labels ≥11 px via
  one shared `TECH_LABEL` constant — G carried 22 sub-floor 9/10 px labels, H
  carries zero.
- Badges over photography: solid paper chip + ink text + division dot — G's
  white-on-food chip measured 2.76:1.
- Dark finale: full-opacity green-400/green-300 labels (6.92:1 / 9.35:1)
  replace alpha-muted greens that failed at 2.2–2.8:1.
- Rejected imagery overridden: competitor-branded tube → dew-macro leaf
  (FN-068); pharma pill piles → soil/seedling (FN-014) and clean-label food
  (FN-052). Origin photography remains the durable fix.
- Hero rebalanced: black-dominant with one green phrase (G's two-of-three green
  headline lines "read promotional"); division accents stay matrix-only.
- Editorial beat restored: C's "Grown with patience." pull-quote — "the best
  copy moment on any page" — ported in ahead of Standards.
- Stale math fixed: "25+ years since 1995" (carried by all of A–G) → "30+".
- Motion unified: one easing `cubic-bezier(0.22,1,0.36,1)`, one reveal, 0.08 s
  stagger, everything reduced-motion gated — replacing G's hardcoded delays.

What H adds over G — the three modules the set was missing: the **Portfolio
nav dropdown** (live ingredient data, three division columns, full keyboard
dismissal — G's nav was flat anchors), the **Product Dossier** (KSM-66 spec
table, serif-italic Latin, format chips — the product-depth beat G lacked), and
the **Formulation Presenter** (pickers composing a live dark spec sheet — the
only stateful conversion tool in the set; the hero's secondary CTA now points
at it instead of a mailto).

Carried principle: restraint is the house style — trust argued in spec-sheet
numbers, color roles proven by measured ratios, one easing, one reveal, and
spectacle spent only where it proves the claim.

## 2026-08-28 — Variant H (better-interface review, browser-verified)

Review ran all six domains (accessibility / layout / writing / typography /
colors / UI polish) against the rendered page: keyboard walk, 320/375/768px
viewports, computed focus styles, and exact WCAG ratios computed from the OKLCH
tokens. Line numbers are as of the 2026-08-28 polish pass.

### HIGH — release-blocking

| Finding                                                                                                                                                                                                                                                                                                                                                                                                                            | Location                                                | Fix                                                                                                                                                                 |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Submit discards the configured spec.** "Submit this specification" / "Request this specification" / "Technical data sheet" all resolve through `createInquiryHref()`, whose unknown sources (`"formulation"`, `"dossier"`, `"tds"`) silently fall back to the generic "Fenchem partnership inquiry" mailto with a static body. A formulator picks application, delivery form and regulatory chips; the email carries none of it. | `variant-h.tsx:1177,928,938` · `landing-content.ts:462` | Serialize the presenter selection into the mailto subject/body; give dossier/TDS their own subjects. Drop the `FileDown` icon unless a document actually downloads. |
| **Hero image never renders on mobile.** The image column has only absolutely-positioned children and no height below `lg` — measured 375×1 px. Image and caption badge (tagline, "Since 1995") are invisible for every mobile visitor.                                                                                                                                                                                             | `variant-h.tsx:508`                                     | The page's own idiom: `min-h-72` below `lg` (Origin and Standards columns already do this at `:1216`/`:1260`).                                                      |
| **Portfolio dropdown clips off-viewport at tablet widths.** The 640px menu centered on its trigger sits at `left: −37px` at a 768px viewport; the first column's division dot and label starts are cut with no way to scroll to them.                                                                                                                                                                                              | `variant-h.tsx:227`                                     | `w-[min(640px,calc(100vw-2rem))]` or edge-aware positioning. Re-measure at 768/800/900px after the fix.                                                             |

> The dropdown finding is HIGH per f (2026-08-28, recorded in
> `landing-ui-polish-ci-notes.md`): it is the recommended production variant's
> primary nav surface — treat as release-blocking.

### MEDIUM — schedule next

| Finding                                                                                                                                                                                                                          | Location                                  | Fix                                                                                         |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------- |
| Hero `alt` says "lush green botanical leaves in morning light"; the photo renders as a soil scoop with fertilizer granules. Misdescribes for screen-reader users and strays from the "raw botanical material" imagery direction. | `variant-h.tsx:512`                       | Rewrite the alt to the rendered photo, or swap the photo to match the intended direction.   |
| No "Skip to content" link — keyboard users pay 6+ nav stops on every visit.                                                                                                                                                      | `variant-h.tsx` root                      | Visually-hidden-until-focused skip link as the first focusable element.                     |
| Footer certification chips are static text styled blue (`border-brand-blue-200 bg-brand-blue-50 text-brand-blue-700`); this page's own contract (header comment) declares blue interactive-only.                                 | `variant-h.tsx:1450`                      | Restyle neutral/green — the division-badge (paper chip + ink) or green format-chip pattern. |
| CTA capitalization mixes title case and sentence case ("Request a Specification" vs "Request this specification", "Build a Formulation" vs "Build a formulation").                                                               | nav / hero / menu / dossier / matrix CTAs | One policy per element type; sentence case is the safer default.                            |

### LOW — polish backlog

| Finding                                                                                                              | Location            | Fix                                                                                             |
| -------------------------------------------------------------------------------------------------------------------- | ------------------- | ----------------------------------------------------------------------------------------------- |
| At 320px the nav CTA wraps to two lines (152×60) flush against the viewport edge, consuming the right layout margin. | `variant-h.tsx:408` | Shorten the label below `md` or move the CTA into the mobile menu (which has no contact entry). |
| `MobileNav` disclosure lacks the Escape-close + outside-pointer close `PortfolioMenu` implements.                    | `variant-h.tsx:283` | Reuse `PortfolioMenu`'s handlers.                                                               |

Resolved (2026-08-28 polish pass, concurrent session): `transition-all` on CTAs
→ named transition properties everywhere; press scale unified at
`active:scale-[0.96]`.

### Verified clean — keep these decisions

- **Contrast is genuinely measured.** Every ratio in the file's header comment
  verifies to the decimal (green-950/green-500 = 5.18, hover 6.92, mute-600 =
  6.00, green-700 = 5.73, finale 6.92/9.35). Worst small-text pair in use:
  mute-600 on green-50 at 5.55. Don't regress these when touching colors.
- Keyboard: radiogroup roving tabindex, Escape-close + focus-return on the
  Portfolio menu, ticker pause with `aria-pressed` — verified working.
- Reduced motion honored centrally (`motion.tsx`) plus the CSS kill-switch;
  marquee has `motion-reduce:animate-none` and a visible pause control.
- Structure: one `h1`, one `main`, coherent outline, `lang="en"`, no 320px
  horizontal overflow.

### Maintenance

Re-run `/interfaces:better-interface` after the three HIGH rows land. CONTEXT.md
still says default variant is `d` with variants A–G only — update it when the
variant shake-out settles.
