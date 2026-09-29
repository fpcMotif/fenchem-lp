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
    key: "s",
    Component: lazy(() => import("./variant-s").then((m) => ({ default: m.VariantS }))),
    name: "Strontium · periodic index",
    twinOf: "v",
  },
  {
    key: "t",
    Component: lazy(() => import("./variant-t").then((m) => ({ default: m.VariantT }))),
    name: "Chevron · kinetic poster",
  },
  {
    key: "u",
    Component: lazy(() => import("./variant-u").then((m) => ({ default: m.VariantU }))),
    name: "Ledger · Stitch corporate",
  },
  {
    key: "x",
    Component: lazy(() => import("./variant-x").then((m) => ({ default: m.VariantX }))),
    name: "Folio · magazine spread",
  },
  {
    key: "y",
    Component: lazy(() => import("./variant-y").then((m) => ({ default: m.VariantY }))),
    name: "Atlas · dark globe hero",
  },
  {
    key: "o",
    Component: lazy(() => import("./variant-o/index").then((m) => ({ default: m.VariantO }))),
    name: "Official site · Figma 官网设计",
  },
  {
    key: "oo",
    Component: lazy(() => import("./variant-oo/index").then((m) => ({ default: m.VariantOO }))),
    name: "Official site · refined",
    twinOf: "o",
  },
  {
    key: "oo1",
    Component: lazy(() => import("./variant-oo1/index").then((m) => ({ default: m.VariantOO1 }))),
    name: "Official site · candidate 1",
    twinOf: "o",
  },
  {
    key: "oo2",
    Component: lazy(() => import("./variant-oo2/index").then((m) => ({ default: m.VariantOO2 }))),
    name: "Official site · candidate 2",
    twinOf: "o",
  },
  {
    key: "oos",
    Component: lazy(() => import("./variant-oos/index").then((m) => ({ default: m.VariantOOS }))),
    name: "Official site · O campus",
    twinOf: "o",
  },
  {
    key: "ooss",
    Component: lazy(() => import("./variant-ooss/index").then((m) => ({ default: m.VariantOOSS }))),
    name: "Official site · O campus polish",
    twinOf: "o",
  },
  {
    key: "oox",
    Component: lazy(() => import("./variant-oox/index").then((m) => ({ default: m.VariantOOX }))),
    name: "Official site · Crosscut markets",
    twinOf: "oos",
  },
  {
    key: "oox1",
    Component: lazy(() => import("./variant-oox1/index").then((m) => ({ default: m.VariantOOX1 }))),
    name: "Official site · Deck markets",
    twinOf: "oos",
  },
  {
    key: "oox2",
    Component: lazy(() => import("./variant-oox2/index").then((m) => ({ default: m.VariantOOX2 }))),
    name: "Official site · Fork markets",
    twinOf: "oos",
  },
  {
    key: "oox3",
    Component: lazy(() => import("./variant-oox3/index").then((m) => ({ default: m.VariantOOX3 }))),
    name: "Official site · Aperture markets",
    twinOf: "oos",
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

export const DEFAULT_VARIANT: VariantKey = "s";
