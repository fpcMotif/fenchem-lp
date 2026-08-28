# Fenchem landing design principles (2026-08)

Distilled from the four independently built landing systems (repo VariantH/I,
the two WXWork prototypes, the Material 3 preview). Where all four converge,
the convergence is the brand's real design DNA — treat these as law for every
Fenchem landing/marketing surface.

**Scope note:** these principles govern the landing page. Product pages,
forms, and navigation-menu patterns are deliberately NOT specified here —
they will be designed later; do not extrapolate menu or form law from the
landing prototypes.

## The seven principles

1. **Green leads on a light ground; dark green is a moment, never the page.**
   Pages are light-first (`--color-paper`); one or two inverted
   `brand-green-950` bands (finale, a mid-page beat) do the emotional work.
   Blue is never a surface.
2. **Trust is argued with specifications, not adjectives.** Stat bands,
   certification strings (ISO 9001 · GMP · FSSC 22000 · HACCP · Kosher ·
   Halal), response-time SLAs, purity/form data. Copy earns credibility with
   numbers a formulator can check.
3. **Hairline structure beats card shadows.** 1px rules and divided bands are
   the primary structural device — the `gap-px` grid over a line-color
   background is the house trick. Shadows are a hover reward, never resting
   structure.
4. **Three typefaces, three jobs — numerals never use the body face.**
   Newsreader (display + big numerals + botanical Latin italics), Plus
   Jakarta Sans (prose/UI), JetBrains Mono (uppercase micro-labels, spec
   codes, coordinates). For zh-CN surfaces: Source Han Sans (Noto Sans SC)
   carries CJK text, the display face carries numerals/Latin only; no
   uppercase-tracking or italics on CJK — use weight + color instead.
5. **Numbered indexing is information design.** Section numerals, 01–05
   division strips, FN- spec codes — used only where the sequence or taxonomy
   is real, never as decoration.
6. **The globe is the centerpiece proof.** The "global supply chain, sourced
   at origin" story gets the page's wow budget: the interactive world map
   (VariantI), arcs traced from Nanjing. Keyboard/touch/AT access and
   reduced-motion gating are part of the pattern, not optional.
7. **One easing, one reveal, tiny token sets.** Every entrance uses `EASE`
   `cubic-bezier(0.22, 1, 0.36, 1)` (~0.8–0.9s, 24–32px lift, `STAGGER`
   0.08s). Restraint is the house style: ≤1 gradient per page, one hover
   signature, no new colors outside the token ramps.

## The measured color law (from the 2026-08 review, WCAG-checked)

- Primary CTAs: `text-brand-green-950` on `bg-brand-green-500` (5.18:1);
  hover `bg-brand-green-400` (6.92:1). Never white-on-green-500 (2.95:1).
- **Blue is interactive-only** (`text-brand-blue-700` links, outline CTAs).
  Eyebrows and section numerals use `text-brand-green-700` (5.73:1 on paper).
- Small-text floor: `text-mute-600` (6.00:1); `mute-400/500` are
  border/decoration tier only. `font-tech` micro-labels floor at 11px.
- Badges over photography: solid paper chip + ink text + division color dot —
  never colored text directly on an image.
- On the dark `brand-green-950` ground: full-opacity `brand-green-400`
  labels (6.92:1) / `brand-green-300` data (9.35:1); never alpha-muted greens.
- Division accents (nutrition/food/cosmetics/chem/agro/feed) are wayfinding
  dots and tags only — never surfaces, never body text.

## Non-negotiables carried by every variant

- `prefers-reduced-motion` gates every animation (Reveal/Intro do this
  centrally; WebGL renders a single static frame; marquees and dash-flows
  stop).
- Every hover affordance has a keyboard/touch path; menus close on Escape
  and return focus.
- Token-only color — no inline hex in components.
- Images: lazy-load below the fold, explicit dimensions or aspect ratios,
  no base64 payloads in the document.
