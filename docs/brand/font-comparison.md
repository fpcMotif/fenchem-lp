# Font comparison — D / E / F: 思源黑体 (before) vs current (after)

_Date: 2026-06-15. A visual before/after of the brand variants' typography._
_Decision + measured rationale: [font-adoption-comparison.md](./font-adoption-comparison.md) · [ADR-0002](../adr/0002-english-site-typography.md)._

## What's being compared

- **Before — Source Han Sans (思源黑体 / Noto Sans SC)**: the brand-book typeface, captured
  from tag `brand-variants-v1-sourcehan` (commit `52ead35`).
- **After — current**: **Newsreader** (serif display) + **Plus Jakarta Sans** (body/UI) +
  **JetBrains Mono** (labels), captured from `HEAD`.

Screenshots are real captures at 1366×860 (reduced-motion), saved under
`docs/brand/screenshots/font-{before,after}-{d,e,f}.png`.

> **Honest caveats.**
> • **D** was always the "editorial" variant, so its _headline_ is Newsreader serif in **both**
> shots — D's change is the **body** font (Noto → Plus Jakarta) **plus** the hero contrast
> fix (commit `78811c8`), so its "after" is crisper for more than one reason.
> • **E** and **F** are the clean _font-only_ comparisons. F's headline flipped Source Han Sans →
> Newsreader serif; **E's** flipped Source Han Sans → **Plus Jakarta Sans** (grotesque — the Swiss choice).

---

## D — Botanical Editorial

| Before · Source Han Sans body              | After · Plus Jakarta body + contrast fix |
| ------------------------------------------ | ---------------------------------------- |
| ![D before](screenshots/font-before-d.png) | ![D after](screenshots/font-after-d.png) |

The serif headline is unchanged. In the **after**, the lede/body switches to Plus Jakarta
(cleaner, less generic than Noto's Latin) and the headline reads darker and more solid (the
green veil no longer washes it, weight 300→400, accent green-500→green-700). **After wins.**

## E — Innovation Lab

| Before · Source Han Sans grotesque         | After · Plus Jakarta Sans grotesque      |
| ------------------------------------------ | ---------------------------------------- |
| ![E before](screenshots/font-before-e.png) | ![E after](screenshots/font-after-e.png) |

A like-for-like swap — both are heavy **sans** headlines, which is right for E's Swiss /
spec-sheet identity. **Before** is Source Han Sans (Noto SC) bold: on-genre, but its Latin
letterforms are generic. **After** is **Plus Jakarta Sans** at its heaviest weight — same Swiss
energy, cleaner and more characterful Latin. (A Newsreader serif was trialled here and rejected:
elegant, but too "editorial" for a lab look.) **After wins** — keeps the grotesque genre,
upgrades the letterforms.

## F — Deep Green

| Before · Source Han Sans headline          | After · Newsreader serif headline        |
| ------------------------------------------ | ---------------------------------------- |
| ![F before](screenshots/font-before-f.png) | ![F after](screenshots/font-after-f.png) |

Decisive. **Before** is a plain sans on the dark hero; **after** is Newsreader with an italic
"_Refined by Science._" — exactly the luxury-flagship register this variant wants. **After
wins clearly.**

---

## Verdict

| Variant | Better setting      | Why                                                                                                                           |
| ------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **D**   | **After** (current) | Cleaner body font + the hero contrast fix; headline serif unchanged.                                                          |
| **E**   | **After** (current) | Plus Jakarta grotesque keeps the Swiss/lab genre with cleaner Latin than Source Han. (Serif was trialled and rejected for E.) |
| **F**   | **After** (current) | Serif italic is perfect for the dark luxury flagship; Source Han looked generic.                                              |

**Overall:** the current pairing (Newsreader + Plus Jakarta + JetBrains Mono) is the stronger,
more premium choice for the **English** site across all three — the win is largest on F and on
**body text everywhere** (Plus Jakarta vs Noto's CJK-harmonized Latin). Source Han Sans remains
correct for **Chinese** materials (kept as a local CJK fallback).

## Resolved — E uses Plus Jakarta Sans

E's headline is now **Plus Jakarta Sans** (heavy grotesque), not the serif — giving the Swiss
spec-sheet its proper voice while **D** and **F** keep the Newsreader serif. Each variant now
has the type personality its layout wants: D/F editorial-serif, E grotesque-sans.
