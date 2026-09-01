import { lazy, type ComponentType } from "react";

/*
 * PROTOTYPE — single source of truth for the Fenchem landing variants.
 * Code-split with React.lazy so heavy prototype dependencies (Three.js for
 * Waterfall, GSAP for Variant J, and individual prototype stylesheets)
 * are loaded strictly on-demand per active variant, minimizing initial JS bundle.
 */

type VariantEntry = {
  key: string;
  Component: ComponentType;
  name: string;
  /** Brand variant → the original editorial prototype it reinterprets. */
  twinOf?: string;
};

export const VARIANTS = [
  {
    key: "a",
    Component: lazy(() => import("./variant-a").then((m) => ({ default: m.VariantA }))),
    name: "Botanical Editorial · original",
  },
  {
    key: "d",
    Component: lazy(() => import("./variant-d").then((m) => ({ default: m.VariantD }))),
    name: "Botanical Editorial · brand",
    twinOf: "a",
  },
  {
    key: "b",
    Component: lazy(() => import("./variant-b").then((m) => ({ default: m.VariantB }))),
    name: "Innovation Lab · original",
  },
  {
    key: "e",
    Component: lazy(() => import("./variant-e").then((m) => ({ default: m.VariantE }))),
    name: "Innovation Lab · brand",
    twinOf: "b",
  },
  {
    key: "c",
    Component: lazy(() => import("./variant-c").then((m) => ({ default: m.VariantC }))),
    name: "Deep Forest · original",
  },
  {
    key: "f",
    Component: lazy(() => import("./variant-f").then((m) => ({ default: m.VariantF }))),
    name: "Deep Green · brand",
    twinOf: "c",
  },
  {
    key: "g",
    Component: lazy(() => import("./variant-g").then((m) => ({ default: m.VariantG }))),
    name: "Hybrid · brand",
  },
  {
    key: "h",
    Component: lazy(() => import("./variant-h").then((m) => ({ default: m.VariantH }))),
    name: "Production · recommended",
  },
  {
    key: "i",
    Component: lazy(() => import("./variant-i").then((m) => ({ default: m.VariantI }))),
    name: "Market Portal · Seppic-style",
  },
  {
    key: "j",
    Component: lazy(() => import("./variant-j/index").then((m) => ({ default: m.VariantJ }))),
    name: "Greenhouse Ledger · motion",
  },
  {
    key: "k",
    Component: lazy(() => import("./variant-k").then((m) => ({ default: m.VariantK }))),
    name: "Color Block · campaign",
  },
  {
    key: "v",
    Component: lazy(() => import("./variant-v").then((m) => ({ default: m.VariantV }))),
    name: "Production · vivid",
    twinOf: "h",
  },
  {
    key: "w",
    Component: lazy(() =>
      import("./variant-waterfall").then((m) => ({ default: m.VariantWaterfall })),
    ),
    name: "Three.js Waterfall Fountain",
  },
] as const satisfies readonly VariantEntry[];

export type VariantKey = (typeof VARIANTS)[number]["key"];

export const VARIANT_KEYS: readonly VariantKey[] = VARIANTS.map((v) => v.key);

export const DEFAULT_VARIANT: VariantKey = "v";
