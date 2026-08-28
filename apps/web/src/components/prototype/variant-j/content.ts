import type { Ingredient } from "@/components/landing/landing-content";

/*
 * PROTOTYPE — Variant I content: imagery manifest + page-specific copy.
 *
 * Asset provenance — all photography is hot-linked from Unsplash under the
 * Unsplash License (free commercial use, no attribution required; credited
 * here regardless). Pool restricted to the raw-botanical direction fixed by
 * docs/brand/landing-variants-design-review.md: no pill piles, no third-party
 * branded products, no microscopy, no people presented as customers.
 */

export const IMAGES = {
  /** Hero — hands cupping soil and a seedling (Unsplash photo-1542601906990). */
  hero: {
    src: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=2000&q=80",
    alt: "Hands cupping dark soil around a young seedling",
  },
  /** Origin chapter — eucalyptus branch against soft light (photo-1416879595882). */
  origin: {
    src: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1400&q=80",
    alt: "Eucalyptus branches in soft natural light",
  },
  /** Standards — dense leaf canopy, near-dark (photo-1441974231531). */
  standards: {
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=80",
    alt: "Sunlight breaking through a deep forest canopy",
  },
  /** Dossier — macro leaf with dew (photo-1518531933037). */
  dossier: {
    src: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1200&q=80",
    alt: "Macro leaf covered in dew droplets",
  },
} as const;

/**
 * Per-ingredient imagery overrides, carried over from variant-h's curation:
 * the upstream registry still points three codes at off-direction stock.
 */
export const IMAGE_OVERRIDES: Record<string, { src: string; alt: string }> = {
  "FN-014": {
    src: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=900&q=80",
    alt: "Hands holding soil and a young seedling — the root origin of Ashwagandha KSM-66",
  },
  "FN-052": {
    src: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=80",
    alt: "Fresh food bowl with vibrant natural ingredients — curcumin as clean-label color",
  },
  "FN-068": {
    src: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=900&q=80",
    alt: "Macro leaf covered in dew droplets — hydration, the signature of hyaluronic acid",
  },
};

export const imgFor = (item: Ingredient): { src: string; alt: string } =>
  IMAGE_OVERRIDES[item.code] ?? item.image;

/** Shared ledger-label class (mono, tracked, uppercase — 11px floor). */
export const TECH_LABEL = "font-tech text-[11px] uppercase tracking-[0.26em] text-mute-600";

/** Dark-ground variant of the ledger label. */
export const TECH_LABEL_DARK =
  "font-tech text-[11px] uppercase tracking-[0.26em] text-brand-green-400";

export const HERO = {
  eyebrow: "Botanical Intelligence Since 1995",
  lede: "Premium botanical and functional ingredients for the world's most demanding formulations — grown with patience, perfected in the laboratory, documented to specification.",
  primaryCta: "Explore the Portfolio",
  secondaryCta: "Request a Specification",
} as const;

export const ORIGIN_QUOTE = {
  eyebrow: "05 — Origin",
  lines: [
    "Nature holds the keys",
    "to human vitality.",
    "We refuse to lose them",
    "in translation.",
  ],
  attribution: "The Fenchem principle — field coordinate to finished certificate of analysis",
} as const;
