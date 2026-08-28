import type { ComponentType } from "react";

import { VariantA } from "./variant-a";
import { VariantB } from "./variant-b";
import { VariantC } from "./variant-c";
import { VariantD } from "./variant-d";
import { VariantE } from "./variant-e";
import { VariantF } from "./variant-f";
import { VariantG } from "./variant-g";
import { VariantWaterfall } from "./variant-waterfall";

/*
 * PROTOTYPE — single source of truth for the Fenchem landing variants.
 * One ordered registry replaces the four scattered declarations that used to
 * drift apart: the route's VARIANT_KEYS + render ladder, and the switcher's
 * ORDER + VARIANT_NAMES. The route maps over it to render; the switcher reads
 * it for the arrow-key order + labels; VariantKey derives from its keys.
 *
 * Array order IS the switcher order: each original sits beside its brand twin
 * (A↔D, B↔E, C↔F) so ←/→ toggles a pair; G (hybrid, no twin) trails.
 * `twinOf` makes the A↔D / B↔E / C↔F pairing data instead of a comment.
 * Delete this file (and the losing variants) once a direction wins.
 */

type VariantEntry = {
  key: string;
  Component: ComponentType;
  name: string;
  /** Brand variant → the original editorial prototype it reinterprets. */
  twinOf?: string;
};

export const VARIANTS = [
  { key: "a", Component: VariantA, name: "Botanical Editorial · original" },
  { key: "d", Component: VariantD, name: "Botanical Editorial · brand", twinOf: "a" },
  { key: "b", Component: VariantB, name: "Innovation Lab · original" },
  { key: "e", Component: VariantE, name: "Innovation Lab · brand", twinOf: "b" },
  { key: "c", Component: VariantC, name: "Deep Forest · original" },
  { key: "f", Component: VariantF, name: "Deep Green · brand", twinOf: "c" },
  { key: "g", Component: VariantG, name: "Hybrid · brand" },
  { key: "w", Component: VariantWaterfall, name: "Three.js Waterfall Fountain" },
] as const satisfies readonly VariantEntry[];

export type VariantKey = (typeof VARIANTS)[number]["key"];

export const VARIANT_KEYS: readonly VariantKey[] = VARIANTS.map((v) => v.key);

export const DEFAULT_VARIANT: VariantKey = "d";
