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
    key: "oos1",
    Component: lazy(() => import("./variant-oos1/index").then((m) => ({ default: m.VariantOOS1 }))),
    name: "Official site · O campus quadrants",
    twinOf: "oos",
  },
  {
    key: "oos1a",
    Component: lazy(() =>
      import("./variant-oos1/abouts/oos1a/index").then((m) => ({ default: m.VariantOOS1A })),
    ),
    name: "O campus about · Lattice / misregistered",
    twinOf: "oos1",
  },
  {
    key: "oos1b",
    Component: lazy(() =>
      import("./variant-oos1/abouts/oos1b/index").then((m) => ({ default: m.VariantOOS1B })),
    ),
    name: "O campus about · Portal / pull back",
    twinOf: "oos1",
  },
  {
    key: "oos1c",
    Component: lazy(() =>
      import("./variant-oos1/abouts/oos1c/index").then((m) => ({ default: m.VariantOOS1C })),
    ),
    name: "O campus about · Panorama / seam",
    twinOf: "oos1",
  },
  {
    key: "oos1d",
    Component: lazy(() =>
      import("./variant-oos1/abouts/oos1d/index").then((m) => ({ default: m.VariantOOS1D })),
    ),
    name: "O campus about · Phi / off-by-one",
    twinOf: "oos1",
  },
  {
    key: "oos1e",
    Component: lazy(() =>
      import("./variant-oos1/abouts/oos1e/index").then((m) => ({ default: m.VariantOOS1E })),
    ),
    name: "O campus about · Dossier / overprint",
    twinOf: "oos1",
  },
  {
    key: "oos1f",
    Component: lazy(() =>
      import("./variant-oos1/abouts/oos1f/index").then((m) => ({ default: m.VariantOOS1F })),
    ),
    name: "O campus about · Strand / twist",
    twinOf: "oos1",
  },
  {
    key: "oos1g",
    Component: lazy(() =>
      import("./variant-oos1/abouts/oos1g/index").then((m) => ({ default: m.VariantOOS1G })),
    ),
    name: "O campus about · Bisect / crosshair",
    twinOf: "oos1",
  },
  {
    key: "oos1h",
    Component: lazy(() =>
      import("./variant-oos1/abouts/oos1h/index").then((m) => ({ default: m.VariantOOS1H })),
    ),
    name: "O campus about · Odometer / ticks",
    twinOf: "oos1",
  },
  {
    key: "oos1i",
    Component: lazy(() =>
      import("./variant-oos1/abouts/oos1i/index").then((m) => ({ default: m.VariantOOS1I })),
    ),
    name: "O campus about · Shear / diagonal wipe",
    twinOf: "oos1",
  },
  {
    key: "oos1j",
    Component: lazy(() =>
      import("./variant-oos1/abouts/oos1j/index").then((m) => ({ default: m.VariantOOS1J })),
    ),
    name: "O campus about · Monument / crop",
    twinOf: "oos1",
  },
  {
    key: "oos1k",
    Component: lazy(() =>
      import("./variant-oos1/abouts/oos1k/index").then((m) => ({ default: m.VariantOOS1K })),
    ),
    name: "O campus about · Constellation / nova",
    twinOf: "oos1",
  },
  {
    key: "oos1l",
    Component: lazy(() =>
      import("./variant-oos1/abouts/oos1l/index").then((m) => ({ default: m.VariantOOS1L })),
    ),
    name: "O campus about · Sentence / full stop",
    twinOf: "oos1",
  },
  {
    key: "oos1m",
    Component: lazy(() =>
      import("./variant-oos1/abouts/oos1m/index").then((m) => ({ default: m.VariantOOS1M })),
    ),
    name: "O campus about · Axonometric / lifted plate",
    twinOf: "oos1",
  },
  {
    key: "oos1n",
    Component: lazy(() =>
      import("./variant-oos1/abouts/oos1n/index").then((m) => ({ default: m.VariantOOS1N })),
    ),
    name: "O campus about · Vessel / spill",
    twinOf: "oos1",
  },
  {
    key: "oos1o",
    Component: lazy(() =>
      import("./variant-oos1/abouts/oos1o/index").then((m) => ({ default: m.VariantOOS1O })),
    ),
    name: "O campus about · Growth rings / open ring",
    twinOf: "oos1",
  },
  {
    key: "oos1p",
    Component: lazy(() =>
      import("./variant-oos1/abouts/oos1p/index").then((m) => ({ default: m.VariantOOS1P })),
    ),
    name: "O campus about · Chronophotograph / reverse trail",
    twinOf: "oos1",
  },
  {
    key: "oos1q",
    Component: lazy(() =>
      import("./variant-oos1/abouts/oos1q/index").then((m) => ({ default: m.VariantOOS1Q })),
    ),
    name: "O campus about · Haiku / kigo",
    twinOf: "oos1",
  },
  {
    key: "oos1r",
    Component: lazy(() =>
      import("./variant-oos1/abouts/oos1r/index").then((m) => ({ default: m.VariantOOS1R })),
    ),
    name: "O campus about · Scale / miniature",
    twinOf: "oos1",
  },
  {
    key: "oos1s",
    Component: lazy(() =>
      import("./variant-oos1/abouts/oos1s/index").then((m) => ({ default: m.VariantOOS1S })),
    ),
    name: "O campus about · Letterbox / closing shot",
    twinOf: "oos1",
  },
  {
    key: "oos1t",
    Component: lazy(() =>
      import("./variant-oos1/abouts/oos1t/index").then((m) => ({ default: m.VariantOOS1T })),
    ),
    name: "O campus about · Sundial / against the light",
    twinOf: "oos1",
  },
  {
    key: "oos1u",
    Component: lazy(() =>
      import("./variant-oos1/abouts/oos1u/index").then((m) => ({ default: m.VariantOOS1U })),
    ),
    name: "O campus about · Weave / indigo thread",
    twinOf: "oos1",
  },
  {
    key: "oos1v",
    Component: lazy(() =>
      import("./variant-oos1/abouts/oos1v/index").then((m) => ({ default: m.VariantOOS1V })),
    ),
    name: "O campus about · Cyanotype / sun print",
    twinOf: "oos1",
  },
  {
    key: "oos1w",
    Component: lazy(() =>
      import("./variant-oos1/abouts/oos1w/index").then((m) => ({ default: m.VariantOOS1W })),
    ),
    name: "O campus about · Elution / past the front",
    twinOf: "oos1",
  },
  {
    key: "oos1x",
    Component: lazy(() =>
      import("./variant-oos1/abouts/oos1x/index").then((m) => ({ default: m.VariantOOS1X })),
    ),
    name: "O campus about · Counterpoise / still point",
    twinOf: "oos1",
  },
  {
    key: "oos1y",
    Component: lazy(() =>
      import("./variant-oos1/abouts/oos1y/index").then((m) => ({ default: m.VariantOOS1Y })),
    ),
    name: "O campus about · Glass / etched",
    twinOf: "oos1",
  },
  {
    key: "oos1z",
    Component: lazy(() =>
      import("./variant-oos1/abouts/oos1z/index").then((m) => ({ default: m.VariantOOS1Z })),
    ),
    name: "O campus about · Corridor / facing frame",
    twinOf: "oos1",
  },
  {
    key: "oos1doubao",
    Component: lazy(() =>
      import("./variant-oos1/products/oos1doubao/index").then((m) => ({
        default: m.VariantOOS1Doubao,
      })),
    ),
    name: "O campus products · Doubao / title banner + underline tabs",
    twinOf: "oos1",
  },
  {
    key: "oos1pa",
    Component: lazy(() =>
      import("./variant-oos1/products/oos1pa/index").then((m) => ({
        default: m.VariantOOS1PA,
      })),
    ),
    name: "O campus products · Frozen-column table / mini-sheet dialog",
    twinOf: "oos1",
  },
  {
    key: "oos1pb",
    Component: lazy(() =>
      import("./variant-oos1/products/oos1pb/index").then((m) => ({
        default: m.VariantOOS1PB,
      })),
    ),
    name: "O campus products · Function matrix / tabbed sheet",
    twinOf: "oos1",
  },
  {
    key: "oos1pc",
    Component: lazy(() =>
      import("./variant-oos1/products/oos1pc/index").then((m) => ({
        default: m.VariantOOS1PC,
      })),
    ),
    name: "O campus products · Region rail tables / ingredient-centre sheet",
    twinOf: "oos1",
  },
  {
    key: "oos1pd",
    Component: lazy(() =>
      import("./variant-oos1/products/oos1pd/index").then((m) => ({
        default: m.VariantOOS1PD,
      })),
    ),
    name: "O campus products · Numbered catalogue / index + content sheets",
    twinOf: "oos1",
  },
  {
    key: "oos1pe",
    Component: lazy(() =>
      import("./variant-oos1/products/oos1pe/index").then((m) => ({
        default: m.VariantOOS1PE,
      })),
    ),
    name: "O campus products · Sortable table / sheet contents",
    twinOf: "oos1",
  },
  {
    key: "oos1pf",
    Component: lazy(() =>
      import("./variant-oos1/products/oos1pf/index").then((m) => ({
        default: m.VariantOOS1PF,
      })),
    ),
    name: "O campus products · Form-grouped table / folder tabs",
    twinOf: "oos1",
  },
  {
    key: "oos1pg",
    Component: lazy(() =>
      import("./variant-oos1/products/oos1pg/index").then((m) => ({
        default: m.VariantOOS1PG,
      })),
    ),
    name: "O campus products · Table + detail card / two-page sheet",
    twinOf: "oos1",
  },
  {
    key: "oos1ph",
    Component: lazy(() =>
      import("./variant-oos1/products/oos1ph/index").then((m) => ({
        default: m.VariantOOS1PH,
      })),
    ),
    name: "O campus products · Pivot table / front-back sheet",
    twinOf: "oos1",
  },
  {
    key: "oos1pi",
    Component: lazy(() =>
      import("./variant-oos1/products/oos1pi/index").then((m) => ({
        default: m.VariantOOS1PI,
      })),
    ),
    name: "O campus products · Region tabs table / card + notes sheets",
    twinOf: "oos1",
  },
  {
    key: "oos1pj",
    Component: lazy(() =>
      import("./variant-oos1/products/oos1pj/index").then((m) => ({
        default: m.VariantOOS1PJ,
      })),
    ),
    name: "O campus products · Expandable rows / compare sheets",
    twinOf: "oos1",
  },
  {
    key: "oos1pk",
    Component: lazy(() =>
      import("./variant-oos1/products/oos1pk/index").then((m) => ({
        default: m.VariantOOS1PK,
      })),
    ),
    name: "O campus products · Filter table / stacked sheets",
    twinOf: "oos1",
  },
  {
    key: "oos1pl",
    Component: lazy(() =>
      import("./variant-oos1/products/oos1pl/index").then((m) => ({
        default: m.VariantOOS1PL,
      })),
    ),
    name: "O campus products · Collapsible groups / scroll-spy sheets",
    twinOf: "oos1",
  },
  {
    key: "oos1pm",
    Component: lazy(() =>
      import("./variant-oos1/products/oos1pm/index").then((m) => ({
        default: m.VariantOOS1PM,
      })),
    ),
    name: "O campus products · Latin A–Z table / facing sheets",
    twinOf: "oos1",
  },
  {
    key: "oos1pn",
    Component: lazy(() =>
      import("./variant-oos1/products/oos1pn/index").then((m) => ({
        default: m.VariantOOS1PN,
      })),
    ),
    name: "O campus products · Two-line table / slide-over sheet",
    twinOf: "oos1",
  },
  {
    key: "oos1po",
    Component: lazy(() =>
      import("./variant-oos1/products/oos1po/index").then((m) => ({
        default: m.VariantOOS1PO,
      })),
    ),
    name: "O campus products · Swatch table / field-grid sheet",
    twinOf: "oos1",
  },
  {
    key: "oos1pp",
    Component: lazy(() =>
      import("./variant-oos1/products/oos1pp/index").then((m) => ({
        default: m.VariantOOS1PP,
      })),
    ),
    name: "O campus products · Sticky-group ledger / printed datasheet",
    twinOf: "oos1",
  },
  {
    key: "oos1pq",
    Component: lazy(() =>
      import("./variant-oos1/products/oos1pq/index").then((m) => ({
        default: m.VariantOOS1PQ,
      })),
    ),
    name: "O campus products · Table of tables / sheet carousel",
    twinOf: "oos1",
  },
  {
    key: "oos1pr",
    Component: lazy(() =>
      import("./variant-oos1/products/oos1pr/index").then((m) => ({
        default: m.VariantOOS1PR,
      })),
    ),
    name: "O campus products · Column toggles / split sheet",
    twinOf: "oos1",
  },
  {
    key: "oos1ps",
    Component: lazy(() =>
      import("./variant-oos1/products/oos1ps/index").then((m) => ({
        default: m.VariantOOS1PS,
      })),
    ),
    name: "O campus products · Compare-pin table / strip sheets",
    twinOf: "oos1",
  },
  {
    key: "oos1pt",
    Component: lazy(() =>
      import("./variant-oos1/products/oos1pt/index").then((m) => ({
        default: m.VariantOOS1PT,
      })),
    ),
    name: "O campus products · Rowspan catalogue / key-facts sheet",
    twinOf: "oos1",
  },
  {
    key: "oos2",
    Component: lazy(() => import("./variant-oos2/index").then((m) => ({ default: m.VariantOOS2 }))),
    name: "Official site · O campus keep-open",
    twinOf: "oos",
  },
  {
    key: "oos3",
    Component: lazy(() => import("./variant-oos3/index").then((m) => ({ default: m.VariantOOS3 }))),
    name: "Official site · O campus quadrants keep-open",
    twinOf: "oos1",
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
