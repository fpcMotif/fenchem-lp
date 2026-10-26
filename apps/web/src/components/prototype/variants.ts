import { createElement, lazy, type ComponentType } from "react";

import type { SubPageProps } from "./variant-oos1/index";

/*
 * PROTOTYPE — single source of truth for the Fenchem landing variants.
 * Code-split with React.lazy so heavy prototype dependencies (Three.js for
 * Waterfall, GSAP for Variant J, and individual prototype stylesheets)
 * are loaded strictly on-demand per active variant, minimizing initial JS bundle.
 *
 * The oos1 about and products families are read from their folders, so a new
 * one is just a new folder: `variant-oos1/abouts/<key>/about-view.tsx`
 * exporting `About<KEY>`, or `variant-oos1/products/<key>/` with `catalog.tsx`
 * (`Catalog`) and `solutions.tsx` (`Solutions`). The registry wraps each in
 * the oos1 page shell. Add a display name below; the key is used until then.
 */

type VariantEntry = {
  key: string;
  name: string;
  /** "page" renders on its own; "about" and "products" render inside the oos1 shell. */
  family: "page" | "about" | "products";
  Component: ComponentType;
  /** Brand variant → the original editorial prototype it reinterprets. */
  twinOf?: string;
};

const ABOUT_NAMES: Record<string, string> = {
  oos1a: "Lattice / misregistered",
  oos1abandon: "Early about / before the figma pass",
  oos1b: "Portal / pull back",
  oos1c: "Panorama / seam",
  oos1cover: "Coverflow campus / side peeks",
  oos1d: "Phi / off-by-one",
  oos1e: "Dossier / overprint",
  oos1f: "Strand / twist",
  oos1g: "Bisect / crosshair",
  oos1h: "Odometer / ticks",
  oos1i: "Shear / diagonal wipe",
  oos1j: "Monument / crop",
  oos1k: "Constellation / nova",
  oos1l: "Sentence / full stop",
  oos1m: "Axonometric / lifted plate",
  oos1n: "Vessel / spill",
  oos1o: "Growth rings / open ring",
  oos1p: "Chronophotograph / reverse trail",
  oos1q: "Haiku / kigo",
  oos1r: "Scale / miniature",
  oos1s: "Letterbox / closing shot",
  oos1t: "Sundial / against the light",
  oos1u: "Weave / indigo thread",
  oos1v: "Cyanotype / sun print",
  oos1w: "Elution / past the front",
  oos1x: "Counterpoise / still point",
  oos1y: "Glass / etched",
  oos1z: "Corridor / facing frame",
};

const PRODUCT_NAMES: Record<string, string> = {
  oos1pa: "Frozen-column table / mini-sheet dialog",
  oos1pb: "Function matrix / tabbed sheet",
  oos1pc: "Region rail tables / ingredient-centre sheet",
  oos1pd: "Numbered catalogue / index + content sheets",
  oos1pe: "Sortable table / sheet contents",
  oos1pf: "Form-grouped table / folder tabs",
  oos1pg: "Table + detail card / two-page sheet",
  oos1ph: "Pivot table / front-back sheet",
  oos1pi: "Region tabs table / card + notes sheets",
  oos1pj: "Expandable rows / compare sheets",
  oos1pk: "Filter table / stacked sheets",
  oos1pl: "Collapsible groups / scroll-spy sheets",
  oos1pm: "Latin A–Z table / facing sheets",
  oos1pn: "Two-line table / slide-over sheet",
  oos1po: "Swatch table / field-grid sheet",
  oos1pp: "Sticky-group ledger / printed datasheet",
  oos1pq: "Table of tables / sheet carousel",
  oos1pr: "Column toggles / split sheet",
  oos1ps: "Compare-pin table / strip sheets",
  oos1pt: "Rowspan catalogue / key-facts sheet",
};

type Loader<T> = () => Promise<T>;

const aboutViews = import.meta.glob<Record<string, ComponentType<SubPageProps>>>(
  "./variant-oos1/abouts/*/about-view.tsx",
);
const catalogs = import.meta.glob<{ Catalog: ComponentType }>(
  "./variant-oos1/products/*/catalog.tsx",
);
const solutions = import.meta.glob<{ Solutions: ComponentType }>(
  "./variant-oos1/products/*/solutions.tsx",
);

const loadShell = () => import("./variant-oos1/index").then((m) => m.VariantOOS1);

function byFolder<T>(modules: Record<string, Loader<T>>): [key: string, load: Loader<T>][] {
  return Object.entries(modules)
    .map(([path, load]): [string, Loader<T>] => [path.split("/").at(-2) ?? path, load])
    .sort(([a], [b]) => a.localeCompare(b));
}

function page(
  key: string,
  name: string,
  load: Loader<ComponentType>,
  twinOf?: string,
): VariantEntry {
  return {
    key,
    name,
    family: "page",
    twinOf,
    Component: lazy(() => load().then((Page) => ({ default: Page }))),
  };
}

const ABOUT_VARIANTS = byFolder(aboutViews).map(([key, loadView]): VariantEntry => ({
  key,
  name: `O campus about · ${ABOUT_NAMES[key] ?? key}`,
  family: "about",
  twinOf: "oos1",
  Component: lazy(async () => {
    const [VariantOOS1, view] = await Promise.all([loadShell(), loadView()]);
    const exportName = `About${key.toUpperCase()}`;
    const AboutPage = view[exportName];
    if (!AboutPage) throw new Error(`abouts/${key}/about-view.tsx must export ${exportName}`);
    return { default: () => createElement(VariantOOS1, { AboutPage, startView: "about" }) };
  }),
}));

const PRODUCT_VARIANTS = byFolder(catalogs).map(([key, loadCatalog]): VariantEntry => ({
  key,
  name: `O campus products · ${PRODUCT_NAMES[key] ?? key}`,
  family: "products",
  twinOf: "oos1",
  Component: lazy(async () => {
    const [VariantOOS1, { ProductsView }, { Catalog }, solutionsModule] = await Promise.all([
      loadShell(),
      import("./variant-oos1/products-view"),
      loadCatalog(),
      solutions[`./variant-oos1/products/${key}/solutions.tsx`]?.(),
    ]);
    const ProductsPage = (props: SubPageProps) =>
      createElement(ProductsView, {
        ...props,
        CatalogSection: Catalog,
        SolutionsSection: solutionsModule?.Solutions,
      });
    return { default: () => createElement(VariantOOS1, { ProductsPage, startView: "products" }) };
  }),
}));

export const VARIANTS: readonly VariantEntry[] = [
  page("a", "Botanical Editorial · original", () => import("./variant-a").then((m) => m.VariantA)),
  page(
    "d",
    "Botanical Editorial · brand",
    () => import("./variant-d").then((m) => m.VariantD),
    "a",
  ),
  page("b", "Innovation Lab · original", () => import("./variant-b").then((m) => m.VariantB)),
  page("e", "Innovation Lab · brand", () => import("./variant-e").then((m) => m.VariantE), "b"),
  page("c", "Deep Forest · original", () => import("./variant-c").then((m) => m.VariantC)),
  page("f", "Deep Green · brand", () => import("./variant-f").then((m) => m.VariantF), "c"),
  page("g", "Hybrid · brand", () => import("./variant-g").then((m) => m.VariantG)),
  page("h", "Production · recommended", () => import("./variant-h").then((m) => m.VariantH)),
  page("i", "Market Portal · Seppic-style", () => import("./variant-i").then((m) => m.VariantI)),
  page("j", "Greenhouse Ledger · motion", () =>
    import("./variant-j/index").then((m) => m.VariantJ),
  ),
  page("k", "Color Block · campaign", () => import("./variant-k").then((m) => m.VariantK)),
  page("v", "Production · vivid", () => import("./variant-v").then((m) => m.VariantV), "h"),
  page("s", "Strontium · periodic index", () => import("./variant-s").then((m) => m.VariantS), "v"),
  page("t", "Chevron · kinetic poster", () => import("./variant-t").then((m) => m.VariantT)),
  page("u", "Ledger · Stitch corporate", () => import("./variant-u").then((m) => m.VariantU)),
  page("x", "Folio · magazine spread", () => import("./variant-x").then((m) => m.VariantX)),
  page("y", "Atlas · dark globe hero", () => import("./variant-y").then((m) => m.VariantY)),
  page("o", "Official site · Figma 官网设计", () =>
    import("./variant-o/index").then((m) => m.VariantO),
  ),
  page(
    "oo",
    "Official site · refined",
    () => import("./variant-oo/index").then((m) => m.VariantOO),
    "o",
  ),
  page(
    "oo1",
    "Official site · candidate 1",
    () => import("./variant-oo1/index").then((m) => m.VariantOO1),
    "o",
  ),
  page(
    "oo2",
    "Official site · candidate 2",
    () => import("./variant-oo2/index").then((m) => m.VariantOO2),
    "o",
  ),
  page(
    "oos",
    "Official site · O campus",
    () => import("./variant-oos/index").then((m) => m.VariantOOS),
    "o",
  ),
  page(
    "oos1",
    "Official site · O campus quadrants",
    () => import("./variant-oos1/index").then((m) => m.VariantOOS1),
    "oos",
  ),
  page(
    "oos1taste",
    "O campus home · taste pass",
    () => import("./variant-oos1/home/oos1taste/index").then((m) => m.VariantOOS1Taste),
    "oos1",
  ),
  ...ABOUT_VARIANTS,
  page(
    "oos1doubao",
    "O campus products · Doubao / title banner + underline tabs",
    () => import("./variant-oos1/products/oos1doubao/index").then((m) => m.VariantOOS1Doubao),
    "oos1",
  ),
  page(
    "oos1figma",
    "O campus products · Figma per-tab hero + In fiber spotlight",
    () => import("./variant-oos1/products/oos1figma/index").then((m) => m.VariantOOS1Figma),
    "oos1",
  ),
  ...PRODUCT_VARIANTS,
  page(
    "oos1insightsabandon",
    "O campus insights · Bookmark rail sidebar / before the sidebar redo",
    () =>
      import("./variant-oos1/insights/oos1insightsabandon/index").then(
        (m) => m.VariantOOS1InsightsAbandon,
      ),
    "oos1",
  ),
  page(
    "oos2",
    "Official site · O campus keep-open",
    () => import("./variant-oos/index").then((m) => m.VariantOOS),
    "oos",
  ),
  page(
    "oos3",
    "Official site · O campus quadrants keep-open",
    () => import("./variant-oos3/index").then((m) => m.VariantOOS3),
    "oos1",
  ),
  page(
    "ooss",
    "Official site · O campus polish",
    () => import("./variant-ooss/index").then((m) => m.VariantOOSS),
    "o",
  ),
  page(
    "oox",
    "Official site · Crosscut markets",
    () => import("./variant-oox/index").then((m) => m.VariantOOX),
    "oos",
  ),
  page(
    "oox1",
    "Official site · Deck markets",
    () => import("./variant-oox1/index").then((m) => m.VariantOOX1),
    "oos",
  ),
  page(
    "oox2",
    "Official site · Fork markets",
    () => import("./variant-oox2/index").then((m) => m.VariantOOX2),
    "oos",
  ),
  page(
    "oox3",
    "Official site · Aperture markets",
    () => import("./variant-oox3/index").then((m) => m.VariantOOX3),
    "oos",
  ),
  page("w", "Three.js Waterfall Fountain", () =>
    import("./variant-waterfall").then((m) => m.VariantWaterfall),
  ),
];

export type VariantKey = VariantEntry["key"];

export const VARIANT_KEYS: readonly VariantKey[] = VARIANTS.map((v) => v.key);

export const DEFAULT_VARIANT: VariantKey = "s";
