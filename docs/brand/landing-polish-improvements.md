# Landing polish — continuous-improvement ledger

> **🟢 CONTINUOUS IMPROVEMENT NOTE — INTERFACE POLISH PASS — 2026-08-28**
> Scope: `VariantH` (production variant) + editorial `LandingPage`.
> Eight micro-decisions, each recorded as _before → after → why the new
> treatment reads better_. The "why" column is the law for future pages:
> when you touch these surfaces, keep the mechanism, not just the class
> names. Rationale was adversarially reviewed — every claim below survived
> a kill-the-fluff pass.

Sources: `apps/web/src/components/prototype/variant-h.tsx`,
`apps/web/src/components/landing/landing-page.tsx`.
Companion boards: the Claude Design project guidelines (this file, synced)
and the Figma board "Fenchem LP — Continuous Improvement".

This ledger records **applied** changes and their rationale. Open findings
live in the running logs: `landing-ui-polish-ci-notes.md` (UI-polish
reviews) and `variant-h-continuous-improvement.md` (cross-discipline
reviews).

---

## 01 — Explicit transition property lists

- **Before:** `transition-all` on 11 interactive sites (CTAs, picker chips,
  hover-shift arrow icons).
- **After:** lists naming exactly what changes —
  `transition-[background-color,scale]` on solid CTAs,
  `transition-[background-color,border-color,color,scale]` on outline
  buttons/chips, `transition-[translate,color]` on arrows,
  `transition-[background-color,scale,box-shadow]` on the glow finale CTA.
- **Why better:** `transition-all` subscribes every animatable property to
  the easing curve, so any incidental change riding along with a state
  toggle — a color meant to switch instantly, a padding nudged by a class
  swap — gets smeared across the 150 ms duration whether or not it was
  designed as motion. Crispness comes from the contrast between what moves
  and what snaps: with explicit lists, only the channels chosen as feedback
  ever ease, so motion reads as deliberate rather than as global mush. The
  lists are also a regression guard — a future style edit can't silently
  acquire an animation because `all` was listening.

## 02 — One press scale, and a press that actually eases

- **Before:** `active:scale-[0.98]` on 8 CTAs, `active:scale-[0.97]` on
  chips; on the editorial page the transition list said `transform` while
  Tailwind v4 `scale-*` sets the CSS `scale` property — the press snapped
  with no easing at all.
- **After:** one uniform `active:scale-[0.96]` everywhere; transition lists
  name `scale`, so the press eases in and back out (interruptible).
- **Why better:** the editorial-page fix is mechanical, not taste: with no
  easing path the press applied in a single frame — a snap that reads as a
  glitch, not a surface depressing. Naming `scale` restores an eased,
  interruptible transition: a fast tap gets a partial press that reverses
  smoothly from wherever it was. Unifying to one 0.96 matters because press
  depth is how an interface teaches its material — two depths imply two
  materials — and the slightly deeper press stays clearly perceptible on
  small chips where a 2 % change barely moves an edge.

## 03 — Icon state changes cross-fade instead of popping

- **Before:** ticker Play/Pause and mobile-nav Menu/X swapped instantly
  (conditional render, binary pop).
- **After:** `AnimatePresence` (`popLayout`, `initial={false}`) cross-fade —
  incoming icon scales 0.25 → 1, opacity 0 → 1, blur 4 px → 0, spring
  `duration 0.3, bounce 0`; instant under `prefers-reduced-motion`.
- **Why better:** a one-frame glyph swap is an abrupt onset that grabs
  attention out of proportion to a utility toggle and breaks the percept of
  one control changing state rather than being replaced. The
  scale-from-0.25 + blur entrance works like a focus pull, and the blur
  does concrete work: it strips high-frequency edges during the overlap so
  mid-fade frames never show two crisp glyphs superimposed as a double
  exposure. Bounce 0 is a damped settle — no overshoot to make a utility
  control feel playful — and `initial={false}` keeps always-present icons
  from performing an entrance on page load.

## 04 — Mobile menu: animated enter, softer exit

- **Before:** the menu mounted/unmounted with zero motion.
- **After:** enter opacity 0 → 1, y −6 → 0 over 0.22 s with the shared
  `EASE`; exit only y −4, no overshoot; opacity-only under reduced motion.
  Mirrors the desktop portfolio dropdown exactly.
- **Why better:** a zero-motion mount gives the eye no causal link between
  the tap and the panel — a block of content appears in one frame and must
  be located by re-scanning — while the 6 px settle supplies the missing
  vector, anchoring the menu to the trigger that spawned it. The softer
  exit follows the enter/exit asymmetry principle: entrances carry new
  information the user just requested and earn emphasis; exits execute a
  decision already made and should clear the stage without demanding a
  second look. Mirroring the desktop dropdown means both disclosures teach
  one behavior instead of two.

## 05 — Optically centered Play glyph

- **Before:** the triangular Play glyph geometrically centered in the round
  pause button.
- **After:** a 1 px right shift (`ml-px`).
- **Why better:** a right-pointing triangle's centroid sits one third of
  its width from the flat left edge — left of the bounding-box midpoint —
  so geometric centering parks the glyph's perceived mass left of the
  circle's center, and the eye centers mass, not boxes. Inside a round
  button the error is maximally conspicuous because the glyph is judged
  against perfect radial symmetry. The 1 px shift moves the perceived
  center onto the circle's true center — the standard optical-over-
  geometric correction, at the smallest increment available.

## 06 — 44 px hit targets without touching the visual design

- **Before:** 32 × 32 px ticker pause button; ~20 px-tall bare-text desktop
  nav links.
- **After:** pause button keeps its 32 px form but carries an invisible
  `::after` extension to 44 × 44 px; nav links became
  `inline-flex min-h-11` (44 px) rows. Zero visual change.
- **Why better:** Fitts's law — acquisition time and miss rate climb
  steeply as target size falls, and a 32 px button sits under the ~10 mm
  fingertip contact patch that the platform guidelines (Apple 44 pt,
  Material 48 dp, WCAG 2.5.5 AAA 44 px) are derived from; on touch the
  finger occludes the target during final approach, so the motor system
  needs margin the eye never uses. The extension decouples the motor target
  from the visual one: the button keeps its jewel scale, the nav keeps its
  hairline density, the hand gets a 44 px band. The bare links had a second
  defect — hit height floated with line-height, so the clickable band was
  small _and_ unpredictable; an explicit min-height makes it a stable,
  learnable region.

## 07 — 1 px pure-black 10 % inset outlines on photography

- **Before:** photos (industry thumbnails, matrix cards, dossier/origin/lab
  images) met the paper ground with raw edges.
- **After:** `outline: 1px solid rgb(0 0 0 / 0.1); outline-offset: -1px` on
  every content photo. Pure black — never a tinted neutral.
- **Why better:** a photograph's edge luminance is uncontrolled: wherever a
  bright photo region meets near-white paper, edge contrast drops toward
  zero and the rectangle's boundary dissolves — one line silently missing
  from a layout whose entire grammar is 1 px rules. Black at 10 % alpha
  composites to 0.9× the underlying luminance, so it defines light edges
  (255 → ~229) while vanishing into dark ones (30 → 27), and it stays
  hue-neutral where a tinted gray would composite to a colored fringe.
  `outline` inset −1 px adds no box size, so the `gap-px` hairline
  arithmetic is untouched and the 1 px weight matches the grid's own line
  language.

## 08 — Designed stroke weight and orphan-free rag

- **Before:** editorial page had no root font smoothing and default greedy
  line-wrapping on body copy.
- **After:** `antialiased` at the root; `text-wrap: pretty` on 7 body
  paragraphs.
- **Why better:** macOS's default font smoothing dilates stroke weight — a
  holdover from the subpixel-rendering era — so body type sat a half-step
  bolder than the 1 px rules around it; `antialiased` renders glyphs at
  their designed weight, putting text in the same stroke-weight register as
  the hairline chrome. Greedy line-breaking optimizes each line in
  isolation and routinely strands one word on a paragraph's last line; the
  orphan is expensive because an isolated short line breaks the block's
  silhouette and draws the eye to the shape discontinuity before a word is
  read. `text-wrap: pretty` trades slack from earlier lines so every
  paragraph ends on a stable multi-word line at negligible layout cost.

---

## Standing rules distilled from this pass

1. Transition lists name properties; `transition-all` never ships.
2. Press feedback is `active:scale-[0.96]`, and `scale` must be in the
   transition list (Tailwind v4 `scale-*` ≠ `transform`).
3. Contextual icon swaps cross-fade: scale 0.25 → 1, blur 4 px → 0, spring
   `bounce: 0`, `initial={false}`, reduced-motion gated.
4. Enter > exit: exits are softer, shorter, never overshoot.
5. Triangular/asymmetric glyphs get optical, not geometric, centering.
6. Interactive targets reach 44 px via invisible extension — never by
   inflating the visual.
7. Content photography carries a 1 px black/10 inset outline; never tinted.
8. Roots get `antialiased`; headings `text-balance`; body copy
   `text-wrap: pretty`.
