---
name: Botanical Essence
colors:
  surface: "#fbf9f4"
  surface-dim: "#dbdad5"
  surface-bright: "#fbf9f4"
  surface-container-lowest: "#ffffff"
  surface-container-low: "#f5f3ee"
  surface-container: "#f0eee9"
  surface-container-high: "#eae8e3"
  surface-container-highest: "#e4e2dd"
  on-surface: "#1b1c19"
  on-surface-variant: "#424844"
  inverse-surface: "#30312e"
  inverse-on-surface: "#f2f1ec"
  outline: "#727973"
  outline-variant: "#c2c8c2"
  surface-tint: "#496455"
  primary: "#173124"
  on-primary: "#ffffff"
  primary-container: "#2d4739"
  on-primary-container: "#98b5a3"
  inverse-primary: "#b0cdbb"
  secondary: "#536350"
  on-secondary: "#ffffff"
  secondary-container: "#d6e8cf"
  on-secondary-container: "#596955"
  tertiary: "#590e14"
  on-tertiary: "#ffffff"
  tertiary-container: "#772527"
  on-tertiary-container: "#fe8e8c"
  error: "#ba1a1a"
  on-error: "#ffffff"
  error-container: "#ffdad6"
  on-error-container: "#93000a"
  primary-fixed: "#ccead6"
  primary-fixed-dim: "#b0cdbb"
  on-primary-fixed: "#062014"
  on-primary-fixed-variant: "#324c3e"
  secondary-fixed: "#d6e8cf"
  secondary-fixed-dim: "#bacbb4"
  on-secondary-fixed: "#111f10"
  on-secondary-fixed-variant: "#3c4b39"
  tertiary-fixed: "#ffdad8"
  tertiary-fixed-dim: "#ffb3b0"
  on-tertiary-fixed: "#410006"
  on-tertiary-fixed-variant: "#7d2a2c"
  background: "#fbf9f4"
  on-background: "#1b1c19"
  surface-variant: "#e4e2dd"
typography:
  h1:
    fontFamily: Newsreader
    fontSize: 48px
    fontWeight: "600"
    lineHeight: "1.1"
    letterSpacing: -0.02em
  h2:
    fontFamily: Newsreader
    fontSize: 36px
    fontWeight: "500"
    lineHeight: "1.2"
  h3:
    fontFamily: Newsreader
    fontSize: 24px
    fontWeight: "500"
    lineHeight: "1.3"
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
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: "600"
    lineHeight: "1.2"
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  section-gap: 120px
---

## Brand & Style

The brand personality is rooted in the intersection of nature and science. It is nurturing, transparent, and sophisticated. The design system evokes a sense of "premium wellness"—where the efficiency of a laboratory meets the restorative power of the forest.

The chosen style is a **Tactile Minimalism**. This approach prioritizes heavy whitespace and a restricted palette to convey purity, while utilizing soft shadows and organic shapes to prevent the interface from feeling clinical. The goal is to make the user feel grounded and cared for, fostering a deep sense of trust and vitality.

## Colors

The palette is derived from a Mediterranean botanical garden at dawn.

- **Primary (Forest):** Used for primary actions, deep headlines, and navigational grounding. It represents stability and growth.
- **Secondary (Sage & Mint):** Used for backgrounds, secondary buttons, and success states. These shades provide a soothing, low-stress environment for information consumption.
- **Tertiary (Poppy):** A vibrant botanical accent used sparingly for call-to-actions that require immediate attention or to highlight specific health benefits.
- **Neutral (Cream & Stone):** Replacing harsh whites with warm, earthy tones to reduce eye strain and enhance the "organic" feel of the digital canvas.

## Typography

This design system utilizes a high-contrast typographic pairing to balance tradition with modernity.

**Newsreader** is used for headlines to provide a literary, authoritative, and elegant editorial feel. It should be typeset with slightly tighter letter-spacing in larger sizes to emphasize its serif detail.

**Plus Jakarta Sans** is used for all functional text. Its soft, rounded terminals complement the organic shape language of the design system, ensuring that even dense nutritional information feels approachable and easy to read.

## Layout & Spacing

The layout follows a **fixed-grid philosophy** within a maximum container width, emphasizing generous margins to create a "gallery" effect for product photography.

A 12-column grid is used for desktop, but the layout should prioritize asymmetrical compositions to mimic natural growth patterns. Spacing between major sections is intentionally large (120px+) to ensure the "Vitality" keyword is felt through breathing room. Gutters are kept wide to prevent content from feeling cramped.

## Elevation & Depth

Hierarchy is established through **Ambient Shadows** and **Tonal Layering**.

Shadows are never pure black; they are tinted with the Primary Forest Green at very low opacities (5-8%). This creates a "soft focus" depth that feels like a physical object resting on a matte paper surface.

Backgrounds utilize "Stone" and "Cream" tiers to separate content without the need for hard lines. Elevated elements, such as cards, use a slightly lighter fill than the background beneath them to "lift" toward the user naturally.

## Shapes

The shape language is defined by **organic softness**. With a base roundedness of 0.5rem (8px), the system scales up to 1.5rem (24px) for larger containers like cards and image frames.

In addition to standard rounded rectangles, this design system incorporates "blob" geometries—subtle, non-geometric vector shapes—used as background decorative elements or masks for botanical imagery. These shapes should be slightly irregular to reinforce the organic brand pillar.

## Components

- **Buttons:** Primary buttons are fully rounded (pill-style) or use a 16px radius, featuring a solid Forest Green fill. Secondary buttons use a Sage border with a transparent center.
- **Chips:** Small, pill-shaped tags used for ingredient callouts (e.g., "Vegan," "Non-GMO"). They use a soft Mint background with dark Forest Green text.
- **Cards:** Large 24px corner radius. Cards should have no border, using a subtle ambient shadow and plenty of internal padding (min 32px) to frame product photography.
- **Input Fields:** Soft beige backgrounds with a 12px radius. The focus state transitions the border to Sage Green rather than a harsh blue.
- **Lists:** Ingredient lists should use custom botanical icons (leaves, drops) instead of standard bullet points.
- **Organic Masks:** Image containers for botanical macro-photography should occasionally use "pebble" or "leaf" masks rather than standard rectangles to break the grid.
