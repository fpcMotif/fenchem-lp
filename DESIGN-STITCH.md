---
name: Fenchem Brand System
colors:
  surface: "#ffffff"
  surface-dim: "#f3f5fa"
  surface-bright: "#ffffff"
  surface-container-lowest: "#ffffff"
  surface-container-low: "#f3f5fa"
  surface-container: "#f0f4fa"
  surface-container-high: "#e8eefc"
  surface-container-highest: "#d0d0d0"
  on-surface: "#1a1a1a"
  on-surface-variant: "#4c566a"
  inverse-surface: "#0d1b36"
  inverse-on-surface: "#ffffff"
  outline: "#808080"
  outline-variant: "#d0d0d0"
  surface-tint: "#0743ae"
  primary: "#0743ae"
  on-primary: "#ffffff"
  primary-container: "#0743ae"
  on-primary-container: "#ffffff"
  inverse-primary: "#b3c5ff"
  secondary: "#64a733"
  on-secondary: "#ffffff"
  secondary-container: "#eff9e6"
  on-secondary-container: "#1b3d0a"
  tertiary: "#e48336"
  on-tertiary: "#ffffff"
  tertiary-container: "#fdf1e6"
  on-tertiary-container: "#5c2b06"
  error: "#ba1a1a"
  on-error: "#ffffff"
  error-container: "#ffdad6"
  on-error-container: "#93000a"
  primary-fixed: "#e8eefc"
  primary-fixed-dim: "#b3c5ff"
  on-primary-fixed: "#00174a"
  on-primary-fixed-variant: "#0743ae"
  secondary-fixed: "#eff9e6"
  secondary-fixed-dim: "#bfe49b"
  on-secondary-fixed: "#0d2614"
  on-secondary-fixed-variant: "#356614"
  tertiary-fixed: "#fdf1e6"
  tertiary-fixed-dim: "#f3b988"
  on-tertiary-fixed: "#381600"
  on-tertiary-fixed-variant: "#8a420b"
  background: "#ffffff"
  on-background: "#1a1a1a"
  surface-variant: "#f3f5fa"
  brand-blue: "#0743ae"
  brand-green: "#64a733"
  clean-white: "#ffffff"
  neutral-gray: "#d0d0d0"
  ink: "#1a1a1a"
  division-feed: "#a2d45e"
  division-cosmetics: "#a05eb5"
  division-agro: "#55a695"
  division-food: "#e48336"
  division-chem: "#3a8dde"
  division-nutrition: "#fff67f"
typography:
  h1:
    fontFamily: Newsreader
    fontSize: 48px
    fontWeight: "600"
    lineHeight: "1.08"
    letterSpacing: -0.02em
  h2:
    fontFamily: Newsreader
    fontSize: 36px
    fontWeight: "500"
    lineHeight: "1.15"
    letterSpacing: -0.015em
  h3:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: "600"
    lineHeight: "1.25"
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: "400"
    lineHeight: "1.6"
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: "400"
    lineHeight: "1.6"
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: "500"
    lineHeight: "1.2"
    letterSpacing: 0.14em
rounded:
  none: 0px
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  section-gap: 96px
---

## Brand & Style

**Fenchem (泛成生物)** — _"Rooted in Nature, Refined by Science" / 全球智研，服务无界._ Founded in 1995, Fenchem is a global B2B manufacturer and supplier of specialty ingredients across six divisions: Human Nutrition, Food & Beverage, Animal Nutrition (Feed), Personal & Home Care (Cosmetics), Agrochemicals, and Performance Materials (Chemicals).

The visual identity replaces the retired warm-cream editorial palette with the authoritative **Fenchem Brand Book** (`docs/brand/fenchem-brand-book.md`, `ADR-0001`, `ADR-0002`):

- **Scientific Specification & Editorial Precision:** Layouts treat ingredients, assays, CAS numbers, and lot documentation (`CoA`, `SDS`, `TDS`) as first-class specimen artifacts on a crisp **Clean White (`#FFFFFF`)** canvas separated by **1px Neutral Gray (`#D0D0D0`)** hairlines.
- **Dual Surface Polarity:**
  - **English Global Landing Variants (`S`, `V`, `H`, `D–G`):** **Green-led** (`#64A733` primary vitality accent, `#0743AE` secondary structural accent, deep green `#0D2614` for single high-impact dark bands).
  - **Chinese Official Corporate Site (`OOS1` Campus Shell, Solutions Lab, Contact Dialog Lab):** **Blue-led** (`#0743AE` corporate cobalt primary, `#64A733` vitality co-primary, `#F0F4FA` cool tint surfaces).

## Colors

### Primary Brand Palette (品牌色)

- **Brand Blue (`#0743AE` · Pantone 2728 C · `oklch(0.424 0.18 261.523)`):** Corporate structural lead. Used for primary corporate CTAs, navigation markers, active filter chips in `OOS1` / Solutions Lab, and technical anchors.
- **Brand Green (`#64A733` · Pantone 7737 C · `oklch(0.66 0.163 134.705)`):** Co-primary vitality and natural-science signal. Leads the English landing variants (`D–G`, `H`, `V`, `S`).
- **Clean White (`#FFFFFF` · `oklch(1 0 0)`):** Default page canvas (`--color-paper`). Never substitute warm cream or parchment on brand-book surfaces.
- **Neutral Gray (`#D0D0D0` · Cool Gray 2C · `oklch(0.858 0 0)`):** Structural hairlines, 1px borders, and table rules only (`--color-line`). Never use as a large area fill.
- **Ink (`#1A1A1A` · `oklch(0.22 0 0)`):** Primary high-contrast typography (`--color-ink`).

### Auxiliary Division Accents (辅助色 — Wayfinding & Category Tags Only)

Used strictly for business-unit wayfinding badges, specimen swatches, and division matrix markers — never as full-page themes:

- **Feed (饲料部):** `#A2D45E` (Pantone 367 C)
- **Cosmetics (化妆品部):** `#A05EB5` (Pantone 2583 C)
- **Agrochemical (农化部):** `#55A695` (Pantone 2232 C)
- **Food (食品部):** `#E48336` (Pantone 164 C)
- **Chemical (化工部):** `#3A8DDE` (Pantone 2727 C)
- **Nutrition (营养部):** `#FFF67F` (Pantone Yellow 012 C)

## Typography

### English Global Site (`ADR-0002`)

- **Display Serif (`Newsreader`):** Literary, high-authority display headlines (`h1`, `h2`) and selective italic emphasis phrases. Tight tracking (`-0.02em`) at large scales.
- **Body & Functional UI (`Plus Jakarta Sans`):** Clean geometric grotesk for body copy, navigation, interactive controls, and dense B2B product descriptions (`15px–18px`, line-height `1.55–1.65`).
- **Technical & Specimen Mono (`JetBrains Mono`):** Used for ingredient codes (`FN-027`), CAS numbers, purity assays (`≥ 98.0%`), coordinates, UTC offsets, and tabular indices (`font-variant-numeric: tabular-nums`, uppercase tracking `0.12em–0.18em`).

### Chinese Corporate Site (`OOS1` & Labs)

- **Source Han Sans SC / Noto Sans SC (思源黑体):** Bold (`700`) for section headings, Medium (`500`) for active rows and ingredient names, Regular (`400`) for body copy, paired with `Plus Jakarta Sans` / `Inter` tabular numerals for bilingual indices (`01`, `02`) and English eyebrows (`SOLUTIONS`, `PRODUCTS`, `CONTACT`).

## Layout & Spacing

- **Modular Grid:** 8px spatial unit (`96px` desktop section rhythm, `1280px–1440px` max container width, 12-column grid or `7 | 5` asymmetric architectural split as in Variant `S`).
- **Hairline Ledger Architecture:** Sections, specimen tiles, CoA release tables, and global supply hubs (Nanjing HQ, Hackensack, Frankfurt, Johannesburg, São Paulo, Kuala Lumpur) are organized with crisp `1px solid #D0D0D0` rules rather than floating drop-shadow cards.

## Elevation & Depth

- **Predominantly Flat & Structural:** Hierarchy is driven by crisp `1px` borders, typographic scale contrast, and subtle surface tinting (`#FAFAFA` neutral or `#F0F4FA` cobalt tint against `#FFFFFF` paper).
- **Restrained Tinted Shadows:** When floating elevation is required (dialogs, popovers, active sheets), use ultra-diffused brand-tinted shadows (`0 16px 40px -24px rgba(7, 67, 174, 0.18)` or `0 24px 48px -12px oklch(0.288 0.04 160.598 / 0.08)`).

## Components

- **Specimen Tiles & Periodic Index (Variant `S` / `V`):** Hairline grid cells displaying ingredient code (`FN-027`), 3-letter botanical symbol (`Tag`), Latin binomial, active assay percentage, and authentic extract appearance swatch.
- **CoA & Lot Documentation Strip:** Technical verification rows for Certificate of Analysis (`CoA`), Safety Data Sheet (`SDS`), Technical Data Sheet (`TDS`), and ISO/FAMI-QS/REACH/Halal/Kosher certifications.
- **Division Filter Chips & Index Rows (`OOS1` / Solutions Lab):** `40px` pill chips or tabular index rows (`01–40`) with `#F0F4FA` inactive tint and `#0743AE` active fill.
- **B2B Inquiry & Contact Dialogs (`Contact Dialog Lab`):** Structured multi-mode inquiry surfaces (`Split`, `Drawer`, `Route`, `Letter`) routing sample requests, CoA/spec downloads, and regional office inquiries across Fenchem's 6 global hubs.

## Do not

- Do not tint the page background lime-green (`#F7FBED`) or warm cream — the page canvas and card surfaces must remain pure white `#FFFFFF` with cool neutral `#F3F5FA` / `#F0F4FA` panels only.
- Do not use gradients, glowing blobs, glassmorphism, or dark SaaS dashboards.
- Do not use emojis, stock icons in circles, or generic template grids.
- Do not exceed one primary CTA (`#0743AE` or `#64A733`) per fold.
- Do not use heavy black shadows — use `1px solid #D0D0D0` or `rgba(7, 67, 174, 0.12)` hairlines and soft blue-tinted elevation (`0 16px 40px -24px rgba(7, 67, 174, 0.18)`).
