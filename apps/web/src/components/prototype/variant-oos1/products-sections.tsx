import { m, useInstantLayoutTransition } from "@/compat/motion";
import { ChevronDown, Plus } from "@fenchem-lp/ui/components/lucide";
import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "@ui-sdk/solid/collapsible";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@ui-sdk/solid/tabs";
import { Toggle, ToggleGroup } from "@ui-sdk/solid/toggle";
import {
  createEffect,
  createMemo,
  createSignal,
  createUniqueId,
  flush,
  For,
  Show,
  untrack,
} from "solid-js";
import type { JSX } from "@solidjs/web";
import { EASE } from "../motion-constants";
import { useReducedMotion } from "../use-reduced-motion";
import {
  CATALOG_BY_CATEGORY,
  SOLUTIONS_BY_CATEGORY,
  type CatalogGroup,
  type SolutionArea,
  type SolutionAreaId,
  type SolutionItem,
} from "./products-data";
import { kitStyles } from "./subpage-kit";
import { color, ease, layout, media } from "./tokens.stylex";

type AreaFilter = SolutionAreaId | "all";

const TINT_INK = "oklch(0.26 0.035 261.5)";
const TINT_BODY = "oklch(0.44 0.025 261.5)";
const TINT_MUTED = "oklch(0.52 0.02 261.5)";
const TINT_RULE = "oklch(0.424 0.18 261.5 / 0.12)";
const TINT_RULE_SOFT = "oklch(0.424 0.18 261.5 / 0.08)";
const TINT_FILL = "oklch(0.965 0.009 261.5)";
const TINT_HEAD = "oklch(0.958 0.011 261.5)";
const DRAWER_FILL = "oklch(0.955 0.024 261.5)";
const CARD_SHADOW = "0 1px 2px rgba(7, 67, 174, 0.04), 0 16px 40px -24px rgba(7, 67, 174, 0.18)";
const ACCENT = colors.brandBlue700;
const TAB_FLARE = 12;
const FLARE_TOP = "radial-gradient(circle at 0 0, transparent 11.5px, #fff 12px)";
const FLARE_BOTTOM = "radial-gradient(circle at 0 100%, transparent 11.5px, #fff 12px)";

const MD = "@media (min-width: 768px)";
const LG = "@media (min-width: 1024px)";
const DESKTOP = "@media (min-width: 1280px)";
const HOVER = "@media (hover: hover) and (pointer: fine)";

const GUTTER = 24;
const TWELVE = "repeat(12, minmax(0, 1fr))";
const HEAD_SPACE = { default: 32, [DESKTOP]: 56 } as const;
const CARD_RADIUS = { default: 12, [DESKTOP]: 16 } as const;

const NO_AREAS: SolutionArea[] = [];
const NO_GROUPS: CatalogGroup[] = [];

const orderByArea = (areas: SolutionArea[], items: SolutionItem[]) =>
  areas.length === 0
    ? items
    : areas.flatMap((area) => items.filter((item) => item.area === area.id));

const EDGE_PX = 52;
const EDGE_SPEED = 5.5;

const bindEdgeScroll = (node: HTMLElement, reduce: boolean) => {
  if (reduce) return () => {};
  let speedX = 0;
  let speedY = 0;
  let frame = 0;

  const stop = () => {
    speedX = 0;
    speedY = 0;
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
  };

  const tick = () => {
    if (speedX) node.scrollLeft += speedX;
    if (speedY) node.scrollTop += speedY;
    const canX =
      speedX < 0 ? node.scrollLeft > 0 : node.scrollLeft + node.clientWidth < node.scrollWidth - 1;
    const canY =
      speedY < 0 ? node.scrollTop > 0 : node.scrollTop + node.clientHeight < node.scrollHeight - 1;
    if ((speedX !== 0 && canX) || (speedY !== 0 && canY)) frame = requestAnimationFrame(tick);
    else frame = 0;
  };

  const onMove = (event: PointerEvent) => {
    const box = node.getBoundingClientRect();
    const x = event.clientX - box.left;
    const y = event.clientY - box.top;
    const flow = getComputedStyle(node);
    const overflowY =
      node.scrollHeight > node.clientHeight + 1 &&
      flow.overflowY !== "hidden" &&
      flow.overflowY !== "visible";
    const overflowX =
      node.scrollWidth > node.clientWidth + 1 &&
      flow.overflowX !== "hidden" &&
      flow.overflowX !== "visible";
    speedX = 0;
    speedY = 0;
    if (overflowY) {
      if (y < EDGE_PX) speedY = -EDGE_SPEED * (1 - Math.max(0, y) / EDGE_PX);
      else if (box.height - y < EDGE_PX) {
        speedY = EDGE_SPEED * (1 - Math.max(0, box.height - y) / EDGE_PX);
      }
    }
    if (overflowX) {
      if (x < EDGE_PX) speedX = -EDGE_SPEED * (1 - Math.max(0, x) / EDGE_PX);
      else if (box.width - x < EDGE_PX) {
        speedX = EDGE_SPEED * (1 - Math.max(0, box.width - x) / EDGE_PX);
      }
    }
    if ((speedX !== 0 || speedY !== 0) && frame === 0) frame = requestAnimationFrame(tick);
  };

  node.addEventListener("pointermove", onMove);
  node.addEventListener("pointerleave", stop);
  return () => {
    node.removeEventListener("pointermove", onMove);
    node.removeEventListener("pointerleave", stop);
    stop();
  };
};

type BrowseState =
  | { status: "showing"; area: AreaFilter; selectedId: string }
  | { status: "empty"; area: AreaFilter };

type BrowseEvent = { type: "pickArea"; area: AreaFilter } | { type: "pickSolution"; id: string };

const initialBrowse = (solutions: SolutionItem[]): BrowseState => {
  const first = solutions[0];
  return first
    ? { status: "showing", area: "all", selectedId: first.id }
    : { status: "empty", area: "all" };
};

const transition = (
  solutions: SolutionItem[],
  state: BrowseState,
  event: BrowseEvent,
): BrowseState => {
  if (event.type === "pickSolution") {
    return state.status === "showing" ? { ...state, selectedId: event.id } : state;
  }
  const inArea = (item: SolutionItem) => event.area === "all" || item.area === event.area;
  const current =
    state.status === "showing" ? solutions.find((item) => item.id === state.selectedId) : undefined;
  const next = current && inArea(current) ? current : solutions.find(inArea);
  return next
    ? { status: "showing", area: event.area, selectedId: next.id }
    : { status: "empty", area: event.area };
};

const splitParen = (text: string) => {
  const open = text.indexOf(" (");
  if (open === -1 || !text.endsWith(")")) return { primary: text, secondary: null };
  return { primary: text.slice(0, open), secondary: text.slice(open + 2, -1) };
};

const TRAILING_NOTE = /^(.+?)\s*[（(]([^（）()]+)[）)]$/;

const splitNote = (text: string) => {
  const match = TRAILING_NOTE.exec(text);
  return match ? { primary: match[1], note: match[2] } : { primary: text, note: null };
};

const sxProps = (...args: ReadonlyArray<StyleXStyles | false | null | undefined>) =>
  stylex.attrs(...args);

const INCI_LATIN = /（[^）]*）/g;
const NO_BREAK_SPACE = String.fromCharCode(0xa0);

const panelIn = stylex.keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const styles = stylex.create({
  section: {
    paddingBlock: { default: 72, [DESKTOP]: 128 },
    scrollMarginTop: layout.headerHeight,
  },
  bandSurface: {
    backgroundColor: color.pageTint,
  },
  sectionHead: {
    marginBottom: HEAD_SPACE,
  },
  sectionTitle: {
    margin: 0,
    fontSize: { default: 26, [media.tablet]: 32, [DESKTOP]: 40 },
    fontWeight: 700,
    lineHeight: 1.2,
    textWrap: "balance",
    color: color.ink,
  },
  sectionLead: {
    margin: 0,
    marginTop: 12,
    maxWidth: 520,
    fontSize: 16,
    lineHeight: "26px",
    color: color.bodyText,
    textWrap: "pretty",
  },

  ledgerCard: {
    overflow: "hidden",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: TINT_RULE,
    borderRadius: CARD_RADIUS,
    backgroundColor: colors.paper,
    boxShadow: CARD_SHADOW,
  },
  ledgerGrid: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr) 32px", [LG]: TWELVE },
    columnGap: { default: 12, [LG]: GUTTER },
    paddingInline: { default: 20, [LG]: 32 },
  },
  colName: { gridColumn: { default: null, [LG]: "1 / 5" } },
  colPreview: { gridColumn: { default: null, [LG]: "5 / 12" } },
  colToggle: { gridColumn: { default: null, [LG]: "12 / 13" } },
  ledger: {
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  ledgerRow: {
    position: "relative",
    borderBottomWidth: { default: 1, ":last-child": 0 },
    borderBottomStyle: "solid",
    borderBottomColor: TINT_RULE_SOFT,
    transitionProperty: "background-color",
    transitionDuration: {
      default: "0ms",
      ["@media (prefers-reduced-motion: no-preference)"]: "200ms",
    },
    transitionTimingFunction: ease.out,
  },
  ledgerRowOpen: {
    backgroundColor: DRAWER_FILL,
  },
  ledgerHeading: {
    margin: 0,
  },
  ledgerTrigger: {
    alignItems: "start",
    width: "100%",
    paddingBlock: 18,
    borderWidth: 0,
    backgroundColor: {
      default: "transparent",
      ":hover": { default: null, [HOVER]: TINT_FILL },
    },
    fontFamily: "inherit",
    textAlign: "start",
    color: TINT_INK,
    cursor: "pointer",
    transitionProperty: "background-color",
    transitionDuration: {
      default: "0ms",
      ["@media (prefers-reduced-motion: no-preference)"]: "200ms",
    },
    transitionTimingFunction: ease.out,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: -2,
  },
  ledgerTriggerOpen: {
    backgroundColor: "transparent",
  },
  ledgerHead: {
    margin: 0,
    paddingBlock: 16,
    backgroundColor: TINT_HEAD,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "0.08em",
    color: TINT_MUTED,
  },
  ledgerName: {
    display: "flex",
    alignItems: "flex-start",
    minWidth: 0,
  },
  ledgerNames: {
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
  },
  ledgerPrimary: {
    fontSize: 16,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.02em",
    color: "inherit",
  },
  ledgerLatin: {
    fontSize: 13,
    lineHeight: "20px",
    color: TINT_MUTED,
  },
  ledgerPreview: {
    display: { default: "none", [LG]: "flex" },
    alignItems: "center",
    gap: 6,
    alignSelf: "center",
    overflow: "hidden",
    maskImage: "linear-gradient(to right, #000 calc(100% - 56px), transparent)",
    opacity: 1,
    transitionProperty: "opacity",
    transitionDuration: {
      default: "0ms",
      ["@media (prefers-reduced-motion: no-preference)"]: "200ms",
    },
    transitionTimingFunction: ease.out,
  },
  ledgerPreviewOpen: {
    opacity: 0,
  },
  chip: {
    display: "inline-flex",
    alignItems: "center",
    flexShrink: 0,
    height: 26,
    paddingInline: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: {
      default: TINT_RULE,
      [stylex.when.ancestor(":hover")]: { default: TINT_RULE, [HOVER]: colors.brandBlue300 },
    },
    backgroundColor: colors.paper,
    fontSize: 13,
    lineHeight: "24px",
    color: {
      default: TINT_BODY,
      [stylex.when.ancestor(":hover")]: { default: TINT_BODY, [HOVER]: ACCENT },
    },
    whiteSpace: "nowrap",
    transitionProperty: "border-color, color",
    transitionDuration: {
      default: "0ms",
      ["@media (prefers-reduced-motion: no-preference)"]: "200ms",
    },
    transitionTimingFunction: ease.out,
  },
  keepTogether: {
    display: "inline-block",
    maxWidth: "100%",
  },
  toggle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    justifySelf: "end",
    width: 32,
    height: 32,
    marginBlock: -4,
    marginInlineEnd: -6,
    borderRadius: 999,
    backgroundColor: {
      default: TINT_FILL,
      [stylex.when.ancestor(":hover")]: { default: TINT_FILL, [HOVER]: colors.brandBlue100 },
    },
    color: {
      default: TINT_BODY,
      [stylex.when.ancestor(":hover")]: { default: TINT_BODY, [HOVER]: ACCENT },
    },
    transitionProperty: "background-color, color",
    transitionDuration: {
      default: "0ms",
      ["@media (prefers-reduced-motion: no-preference)"]: "160ms",
    },
    transitionTimingFunction: ease.out,
  },
  toggleOpen: {
    backgroundColor: ACCENT,
    color: colors.paper,
  },
  toggleGlyph: {
    display: "flex",
  },
  ledgerPanelClip: {
    overflow: "hidden",
  },
  ledgerPanel: {
    rowGap: 20,
    paddingTop: 4,
    paddingBottom: 28,
  },
  solutionsEmpty: {
    margin: 0,
    paddingBlock: 64,
    paddingInline: 24,
    borderRadius: CARD_RADIUS,
    backgroundColor: color.pageTint,
    fontSize: 15,
    lineHeight: "26px",
    textAlign: "center",
    color: TINT_MUTED,
  },
  ledgerIntro: {
    gridColumn: { default: "1 / -1", [LG]: "1 / 9" },
    margin: 0,
    fontSize: 15,
    lineHeight: "26px",
    color: TINT_BODY,
    textWrap: "pretty",
  },
  materialTable: {
    gridColumn: "1 / -1",
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [LG]: "subgrid" },
    overflow: "hidden",
    borderRadius: 10,
    backgroundColor: colors.paper,
    boxShadow: "0 1px 2px rgba(7, 67, 174, 0.06)",
  },
  materialHead: {
    display: { default: "none", [LG]: "grid" },
    gridColumn: "1 / -1",
    gridTemplateColumns: "subgrid",
    paddingBlock: 12,
    backgroundColor: TINT_HEAD,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "0.08em",
    color: TINT_MUTED,
  },
  materialList: {
    gridColumn: "1 / -1",
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [LG]: "subgrid" },
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  material: {
    gridColumn: "1 / -1",
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [LG]: "subgrid" },
    rowGap: 4,
    paddingBlock: 16,
    paddingInline: { default: 16, [LG]: 0 },
    borderTopWidth: { default: 1, ":first-child": 0 },
    borderTopStyle: "solid",
    borderTopColor: TINT_RULE_SOFT,
  },
  colMaterialName: {
    gridColumn: { default: null, [LG]: "1 / 5" },
    paddingInlineStart: { default: 0, [LG]: 20 },
  },
  colMaterialInci: { gridColumn: { default: null, [LG]: "5 / 8" } },
  colMaterialFeatures: {
    gridColumn: { default: null, [LG]: "8 / 13" },
    paddingInlineEnd: { default: 0, [LG]: 20 },
  },
  materialName: {
    display: "flex",
    flexDirection: "column",
    fontSize: 15,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.02em",
    color: TINT_INK,
  },
  materialPrimaryRow: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 8,
  },
  materialTag: {
    display: "inline-flex",
    alignItems: "center",
    height: 20,
    paddingInline: 8,
    borderRadius: 999,
    backgroundColor: colors.brandBlue100,
    fontSize: 11,
    fontWeight: 500,
    lineHeight: "20px",
    color: ACCENT,
  },
  materialInci: {
    margin: 0,
    fontSize: 13,
    lineHeight: "22px",
    color: TINT_MUTED,
    whiteSpace: "pre-line",
  },
  materialFeatures: {
    margin: 0,
    marginTop: { default: 4, [LG]: 0 },
    fontSize: 14,
    lineHeight: "24px",
    color: TINT_BODY,
    textWrap: "pretty",
  },

  areaList: {
    position: "relative",
    display: "flex",
    flexWrap: { default: "nowrap", [DESKTOP]: "wrap" },
    gap: 8,
    minWidth: 0,
    marginInline: { default: -16, [media.tablet]: -40, [DESKTOP]: 0 },
    paddingInline: { default: 16, [media.tablet]: 40, [DESKTOP]: 0 },
    paddingBlock: 4,
    scrollPaddingInline: { default: 16, [media.tablet]: 40, [DESKTOP]: 0 },
    overflowX: { default: "auto", [DESKTOP]: "visible" },
    scrollbarWidth: "none",
    overscrollBehaviorX: "contain",
  },
  area: {
    flexShrink: 0,
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    height: 40,
    paddingInline: 16,
    boxSizing: "border-box",
    borderWidth: 0,
    borderRadius: 999,
    backgroundColor: {
      default: TINT_FILL,
      ":hover": { default: TINT_FILL, [HOVER]: colors.brandBlue100 },
    },
    fontFamily: "inherit",
    color: {
      default: TINT_BODY,
      ":hover": { default: TINT_BODY, [HOVER]: TINT_INK },
    },
    cursor: "pointer",
    transform: { default: null, ":active": "scale(0.96)" },
    transitionProperty: "background-color, color, transform",
    transitionDuration: {
      default: "0ms",
      ["@media (prefers-reduced-motion: no-preference)"]: "160ms",
    },
    transitionTimingFunction: ease.out,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: ACCENT,
    outlineOffset: 2,
  },
  areaActive: {
    backgroundColor: ACCENT,
    color: colors.paper,
    cursor: "default",
    transform: "none",
  },
  areaLabel: {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.02em",
    whiteSpace: "nowrap",
  },

  solutionFilter: {
    position: "relative",
    display: { default: "block", [DESKTOP]: "none" },
    marginTop: 16,
    zIndex: 2,
  },
  solutionFilterButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    width: "100%",
    minHeight: 48,
    paddingInline: 16,
    boxSizing: "border-box",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: TINT_RULE,
    borderRadius: 12,
    backgroundColor: colors.paper,
    fontFamily: "inherit",
    fontSize: 15,
    fontWeight: 500,
    lineHeight: "22px",
    letterSpacing: "0.02em",
    color: TINT_INK,
    textAlign: "start",
    cursor: "pointer",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: ACCENT,
    outlineOffset: 2,
  },
  solutionFilterLabel: {
    minWidth: 0,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  solutionFilterIcon: {
    flexShrink: 0,
    color: TINT_MUTED,
    transitionProperty: "transform",
    transitionDuration: {
      default: "0ms",
      ["@media (prefers-reduced-motion: no-preference)"]: "160ms",
    },
    transitionTimingFunction: ease.out,
  },
  solutionFilterIconOpen: {
    transform: "rotate(180deg)",
  },
  solutionFilterMenu: {
    position: "absolute",
    top: "calc(100% + 6px)",
    insetInline: 0,
    zIndex: 3,
    margin: 0,
    padding: 6,
    listStyleType: "none",
    maxHeight: 320,
    overflowY: "auto",
    boxSizing: "border-box",
    backgroundColor: colors.paper,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: TINT_RULE,
    borderRadius: 12,
    boxShadow: CARD_SHADOW,
  },
  solutionFilterOption: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 2,
    width: "100%",
    paddingBlock: 10,
    paddingInline: 12,
    borderWidth: 0,
    borderRadius: 8,
    backgroundColor: { default: "transparent", ":hover": TINT_FILL },
    fontFamily: "inherit",
    textAlign: "start",
    cursor: "pointer",
    color: TINT_INK,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: ACCENT,
    outlineOffset: -2,
  },
  solutionFilterOptionSelected: {
    backgroundColor: TINT_FILL,
    color: ACCENT,
  },
  solutionFilterOptionTitle: {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "22px",
  },
  solutionFilterOptionMeta: {
    fontSize: 12,
    lineHeight: "18px",
    color: TINT_MUTED,
  },

  browser: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [DESKTOP]: "320px minmax(0, 1fr)",
    },
    rowGap: 12,
    marginTop: { default: 16, [DESKTOP]: 24 },
    minHeight: { default: null, [DESKTOP]: 600 },
    overflow: { default: null, [DESKTOP]: "hidden" },
    borderWidth: { default: 0, [DESKTOP]: 1 },
    borderStyle: "solid",
    borderColor: TINT_RULE,
    borderRadius: { default: 0, [DESKTOP]: 16 },
    backgroundColor: { default: null, [DESKTOP]: colors.paper },
    boxShadow: { default: null, [DESKTOP]: CARD_SHADOW },
  },
  railFrame: {
    display: { default: "none", [DESKTOP]: "block" },
    position: { default: null, [DESKTOP]: "relative" },
    minWidth: 0,
    backgroundColor: { default: null, [DESKTOP]: TINT_FILL },
  },
  rail: {
    position: { default: "relative", [LG]: "absolute" },
    inset: { default: null, [LG]: 0 },
    display: { default: "flex", [LG]: "block" },
    gap: 2,
    paddingTop: { default: 4, [LG]: 8 },
    paddingBottom: { default: 4, [LG]: 12 },
    paddingInlineStart: { default: 4, [LG]: 18 },
    paddingInlineEnd: { default: 4, [LG]: 0 },
    scrollPaddingInline: 4,
    scrollPaddingTop: { default: null, [LG]: 8 },
    overflowX: { default: "auto", [LG]: "hidden" },
    overflowY: { default: "hidden", [LG]: "auto" },
    scrollbarWidth: "none",
    overscrollBehaviorX: "contain",
    borderRadius: { default: 12, [LG]: 0 },
    backgroundColor: { default: TINT_FILL, [LG]: "transparent" },
  },
  railBar: {
    position: "absolute",
    top: 18,
    bottom: 18,
    left: 11,
    zIndex: 3,
    display: { default: "none", [LG]: "block" },
    width: 1,
    backgroundImage:
      "linear-gradient(to bottom, transparent, oklch(0.55 0.1 255 / 0.18) 18%, oklch(0.55 0.1 255 / 0.18) 82%, transparent)",
    pointerEvents: "none",
  },
  railThumb: {
    position: "absolute",
    top: 0,
    left: -8,
    width: 17,
    height: 22,
    pointerEvents: "auto",
    cursor: "grab",
    touchAction: "none",
    "::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 5.5,
      width: 6,
      height: 22,
      borderRadius: 999,
      backgroundColor: "oklch(0.5 0.05 255 / 0.85)",
    },
  },
  solutionTab: {
    position: "relative",
    display: "grid",
    gridTemplateColumns: { default: "auto", [LG]: "minmax(0, 1fr)" },
    alignItems: "baseline",
    flexShrink: 0,
    width: { default: null, [LG]: "100%" },
    paddingBlock: { default: 8, [LG]: 12 },
    paddingInlineStart: { default: 14, [LG]: 16 },
    paddingInlineEnd: { default: 16, [LG]: 24 },
    borderWidth: 0,
    borderRadius: { default: 9, [LG]: 12 },
    backgroundColor: "transparent",
    fontFamily: "inherit",
    textAlign: "start",
    cursor: "pointer",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: ACCENT,
    outlineOffset: -2,
  },
  solutionTabSelected: {
    cursor: "default",
  },
  tabIndicator: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    borderStartStartRadius: { default: 9, [LG]: 12 },
    borderEndStartRadius: { default: 9, [LG]: 12 },
    borderStartEndRadius: { default: 9, [LG]: 0 },
    borderEndEndRadius: { default: 9, [LG]: 0 },
    backgroundColor: colors.paper,
    boxShadow: { default: "0 1px 3px rgba(7, 67, 174, 0.1)", [LG]: "none" },
    "::before": {
      content: '""',
      position: "absolute",
      right: 0,
      bottom: "100%",
      display: { default: "none", [LG]: "block" },
      width: TAB_FLARE,
      height: TAB_FLARE,
      backgroundImage: FLARE_TOP,
    },
    "::after": {
      content: '""',
      position: "absolute",
      right: 0,
      top: "100%",
      display: { default: "none", [LG]: "block" },
      width: TAB_FLARE,
      height: TAB_FLARE,
      backgroundImage: FLARE_BOTTOM,
    },
  },
  tabText: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: 2,
    minWidth: 0,
  },
  tabTitle: {
    maxWidth: { default: "16em", [LG]: "none" },
    overflow: { default: "hidden", [LG]: "visible" },
    fontSize: { default: 14, [LG]: 15 },
    fontWeight: 500,
    lineHeight: "22px",
    letterSpacing: "0.02em",
    color: {
      default: TINT_INK,
      [stylex.when.ancestor(":hover")]: { default: TINT_INK, [HOVER]: ACCENT },
    },
    whiteSpace: { default: "nowrap", [LG]: "normal" },
    textOverflow: "ellipsis",
    textWrap: "pretty",
    transitionProperty: "color",
    transitionDuration: {
      default: "0ms",
      ["@media (prefers-reduced-motion: no-preference)"]: "150ms",
    },
    transitionTimingFunction: ease.out,
  },
  tabTitleSelected: {
    color: TINT_INK,
  },
  tabMeta: {
    display: { default: "none", [LG]: "block" },
    fontSize: 13,
    lineHeight: "20px",
    color: TINT_MUTED,
    textWrap: "pretty",
  },
  sheet: {
    minWidth: 0,
    paddingInline: { default: 20, [MD]: 40, [DESKTOP]: 48 },
    paddingTop: { default: 28, [MD]: 40, [DESKTOP]: 44 },
    paddingBottom: { default: 12, [MD]: 20 },
    borderWidth: { default: 1, [DESKTOP]: 0 },
    borderStyle: "solid",
    borderColor: TINT_RULE,
    borderRadius: { default: 12, [DESKTOP]: 0 },
    backgroundColor: colors.paper,
    boxShadow: { default: CARD_SHADOW, [DESKTOP]: "none" },
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: ACCENT,
    outlineOffset: -2,
  },
  panel: {
    minWidth: 0,
    animationName: { default: "none", ["@media (prefers-reduced-motion: no-preference)"]: panelIn },
    animationDuration: "180ms",
    animationTimingFunction: ease.out,
  },
  sheetHead: {
    paddingBottom: { default: 20, [MD]: 28 },
  },
  sheetTitle: {
    margin: 0,
    fontSize: { default: 20, [MD]: 24 },
    fontWeight: 500,
    lineHeight: 1.35,
    letterSpacing: "0.04em",
    color: TINT_INK,
    textWrap: "balance",
  },
  sheetSubtitle: {
    margin: 0,
    marginTop: 8,
    maxWidth: "40em",
    fontSize: 15,
    lineHeight: 1.6,
    color: TINT_BODY,
    textWrap: "pretty",
  },
  fields: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [DESKTOP]: "repeat(2, minmax(0, 1fr))" },
    gridTemplateRows: { default: "none", [DESKTOP]: "repeat(3, auto)" },
    gridAutoFlow: { default: "row", [DESKTOP]: "column" },
    columnGap: { default: 0, [DESKTOP]: 48 },
    margin: 0,
  },
  field: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [MD]: "88px minmax(0, 1fr)" },
    alignContent: "start",
    columnGap: 16,
    rowGap: 6,
    paddingBlock: { default: 16, [MD]: 20 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: TINT_RULE_SOFT,
  },
  fieldLabel: {
    margin: 0,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.04em",
    whiteSpace: "nowrap",
    color: TINT_MUTED,
  },
  fieldValue: {
    margin: 0,
    minWidth: 0,
    fontSize: 15,
    lineHeight: "24px",
    color: TINT_INK,
    textWrap: "pretty",
  },
  lines: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  description: {
    color: TINT_BODY,
  },
  strong: {
    fontWeight: 500,
  },
  absent: {
    color: TINT_MUTED,
  },
  keepWords: {
    wordBreak: "keep-all",
    overflowWrap: "anywhere",
  },
  note: {
    marginInlineStart: 6,
    fontSize: 13,
    color: TINT_MUTED,
  },
});

function Inci(props: { text: string }) {
  const text = untrack(() => props.text);
  const parts: JSX.Element[] = [];
  let last = 0;
  for (const match of text.matchAll(INCI_LATIN)) {
    parts.push(text.slice(last, match.index));
    parts.push(<span {...stylex.attrs(styles.keepTogether)}>{match[0]}</span>);
    last = match.index + match[0].length;
  }
  parts.push(text.slice(last));
  return <>{parts}</>;
}

function ToggleIcon(props: { open: boolean }) {
  const reduce = useReducedMotion();
  return (
    <span
      aria-hidden="true"
      {...stylex.attrs(styles.toggle, props.open && styles.toggleOpen, styles.colToggle)}
    >
      <m.span
        {...stylex.attrs(styles.toggleGlyph)}
        initial={false}
        animate={{ rotate: props.open ? 45 : 0 }}
        transition={reduce() ? { duration: 0 } : { type: "spring", duration: 0.3, bounce: 0 }}
      >
        <Plus size={16} strokeWidth={1.5} absoluteStrokeWidth />
      </m.span>
    </span>
  );
}

function MaterialTable(props: {
  items: CatalogGroup["items"];
  specLabel: string;
  featuresLabel: string;
}) {
  return (
    <div {...stylex.attrs(styles.materialTable)}>
      <div aria-hidden="true" {...stylex.attrs(styles.materialHead)}>
        <span {...stylex.attrs(styles.colMaterialName)}>产品名称</span>
        <span {...stylex.attrs(styles.colMaterialInci)}>{props.specLabel}</span>
        <span {...stylex.attrs(styles.colMaterialFeatures)}>{props.featuresLabel}</span>
      </div>
      <ul {...stylex.attrs(styles.materialList)}>
        <For each={props.items}>
          {(item) => {
            const { primary, secondary } = splitParen(item.title);
            return (
              <li {...stylex.attrs(styles.material)}>
                <span {...stylex.attrs(styles.materialName, styles.colMaterialName)}>
                  <span {...stylex.attrs(styles.materialPrimaryRow)}>
                    <span>{primary}</span>
                    {item.tag && <span {...stylex.attrs(styles.materialTag)}>{item.tag}</span>}
                  </span>
                  {secondary && <span {...stylex.attrs(styles.ledgerLatin)}>{secondary}</span>}
                </span>
                <p {...stylex.attrs(styles.materialInci, styles.colMaterialInci)}>
                  <Inci text={item.inci.trimEnd()} />
                </p>
                <p {...stylex.attrs(styles.materialFeatures, styles.colMaterialFeatures)}>
                  {item.features}
                </p>
              </li>
            );
          }}
        </For>
      </ul>
    </div>
  );
}

function LedgerRow(props: {
  group: CatalogGroup;
  specLabel: string;
  featuresLabel: string;
  open: boolean;
  instantClose: boolean;
  onToggle: (trigger: HTMLElement) => void;
}) {
  let triggerRef: HTMLButtonElement | undefined;

  return (
    <m.li
      layout="position"
      transition={{ duration: 0.26, ease: EASE }}
      {...stylex.attrs(styles.ledgerRow, props.open && styles.ledgerRowOpen)}
    >
      <Collapsible
        open={props.open}
        onOpenChange={() => {
          if (triggerRef) props.onToggle(triggerRef);
        }}
      >
        <h3 {...stylex.attrs(styles.ledgerHeading, stylex.defaultMarker())}>
          <CollapsibleTrigger
            ref={(el: HTMLButtonElement) => (triggerRef = el)}
            {...stylex.attrs(
              styles.ledgerGrid,
              styles.ledgerTrigger,
              props.open && styles.ledgerTriggerOpen,
            )}
          >
            <span {...stylex.attrs(styles.ledgerName, styles.colName)}>
              <span {...stylex.attrs(styles.ledgerNames)}>
                <span {...stylex.attrs(styles.ledgerPrimary)}>{props.group.label}</span>
                <span {...stylex.attrs(styles.ledgerLatin)}>{props.group.items.length} 款原料</span>
              </span>
            </span>
            <span
              aria-hidden="true"
              {...stylex.attrs(
                styles.ledgerPreview,
                props.open && styles.ledgerPreviewOpen,
                styles.colPreview,
              )}
            >
              <For each={props.group.items}>
                {(item) => (
                  <span {...stylex.attrs(styles.chip)}>{splitParen(item.title).primary}</span>
                )}
              </For>
            </span>
            <ToggleIcon open={props.open} />
          </CollapsibleTrigger>
        </h3>
        <CollapsiblePanel
          data-collapsible-animated=""
          data-instant={props.instantClose ? "" : undefined}
          {...stylex.attrs(styles.ledgerPanelClip)}
        >
          <div {...stylex.attrs(styles.ledgerGrid, styles.ledgerPanel)}>
            {props.group.intro && <p {...stylex.attrs(styles.ledgerIntro)}>{props.group.intro}</p>}
            <MaterialTable
              items={props.group.items}
              specLabel={props.specLabel}
              featuresLabel={props.featuresLabel}
            />
          </div>
        </CollapsiblePanel>
      </Collapsible>
    </m.li>
  );
}

function Field(props: { label: string; children: JSX.Element }) {
  return (
    <div {...stylex.attrs(styles.field)}>
      <dt {...stylex.attrs(styles.fieldLabel)}>{props.label}</dt>
      <dd {...stylex.attrs(styles.fieldValue)}>{props.children}</dd>
    </div>
  );
}

function Descriptions(props: { lines: string[] }) {
  return (
    <Show when={props.lines.length > 0} fallback={<span {...stylex.attrs(styles.absent)}>无</span>}>
      <ul {...stylex.attrs(styles.lines, styles.description)}>
        <For each={props.lines}>{(line) => <li>{line}</li>}</For>
      </ul>
    </Show>
  );
}

function FormulaSheet(props: { item: SolutionItem }) {
  return (
    <>
      <header {...stylex.attrs(styles.sheetHead)}>
        <h3 {...stylex.attrs(styles.sheetTitle)}>{props.item.title}</h3>
        <p {...stylex.attrs(styles.sheetSubtitle)}>{props.item.subtitle}</p>
      </header>
      <dl {...stylex.attrs(styles.fields)}>
        <Field label="概述">
          <Descriptions lines={props.item.overview} />
        </Field>
        <Field label="功能">
          <span {...stylex.attrs(styles.strong)}>{props.item.functions.join(" · ")}</span>
        </Field>
        <Field label="配方挑战">
          <Descriptions lines={props.item.challenges} />
        </Field>
        <Field label="功能性成分">
          <ul {...stylex.attrs(styles.lines)}>
            <For each={props.item.keyIngredients}>
              {(ingredient) => {
                const { primary, note } = splitNote(ingredient);
                return (
                  <li {...stylex.attrs(styles.keepWords)}>
                    <span {...stylex.attrs(styles.strong)}>
                      {primary.replaceAll(" / ", `${NO_BREAK_SPACE}/ `)}
                    </span>
                    {note && <span {...stylex.attrs(styles.note)}>{note}</span>}
                  </li>
                );
              }}
            </For>
          </ul>
        </Field>
        <Field label="质地">{props.item.texture.join("、")}</Field>
        <Field label="应用">{props.item.applications.join("、")}</Field>
      </dl>
    </>
  );
}

export function ProductCatalog(props: { categoryId: string }) {
  const catalog = () => CATALOG_BY_CATEGORY[props.categoryId];
  const groups = () => catalog()?.groups ?? NO_GROUPS;
  const specLabel = () => catalog()?.specLabel ?? "核心规格/成分";
  const featuresLabel = () => catalog()?.featuresLabel ?? "产品介绍";
  const [openIndex, setOpenIndex] = createSignal<number | null>(() =>
    groups().length === 1 ? 0 : null,
  );
  const [instantIndex, setInstantIndex] = createSignal<number | null>(null);
  const startInstantLayout = useInstantLayoutTransition();

  const toggle = (index: number, trigger: HTMLElement) => {
    const current = openIndex();
    if (current !== null && current < index) {
      const triggerTop = trigger.getBoundingClientRect().top;
      setInstantIndex(current);
      startInstantLayout(() => {
        setOpenIndex(null);
        flush();
      });
      window.scrollBy({
        top: trigger.getBoundingClientRect().top - triggerTop,
        behavior: "instant",
      });
    } else {
      setInstantIndex(null);
    }
    setOpenIndex(current === index ? null : index);
    flush();
  };

  return (
    <section
      id="products-catalog"
      aria-labelledby="catalog-title"
      {...stylex.attrs(styles.section, styles.bandSurface)}
    >
      <div {...stylex.attrs(kitStyles.shell, kitStyles.inset120)}>
        <header {...stylex.attrs(styles.sectionHead)}>
          <h2 id="catalog-title" {...stylex.attrs(styles.sectionTitle)}>
            产品目录
          </h2>
          <Show when={catalog()?.lead}>
            {(lead) => <p {...stylex.attrs(styles.sectionLead)}>{lead()}</p>}
          </Show>
        </header>
        <div {...stylex.attrs(styles.ledgerCard)}>
          <p {...stylex.attrs(styles.ledgerGrid, styles.ledgerHead)}>
            <span {...stylex.attrs(styles.colName)}>原料分类</span>
          </p>
          <ul {...stylex.attrs(styles.ledger)}>
            <For each={groups()}>
              {(group, index) => (
                <LedgerRow
                  group={group}
                  specLabel={specLabel()}
                  featuresLabel={featuresLabel()}
                  open={openIndex() === index()}
                  instantClose={instantIndex() === index()}
                  onToggle={(trigger) => toggle(index(), trigger)}
                />
              )}
            </For>
          </ul>
        </div>
      </div>
    </section>
  );
}

export function ProductSolutions(props: { categoryId: string }) {
  const reduce = useReducedMotion();
  const uid = createUniqueId();
  let areaListRef: HTMLDivElement | undefined;
  let railRef: HTMLDivElement | undefined;
  let railBarRef: HTMLDivElement | undefined;
  let railThumbRef: HTMLDivElement | undefined;
  let filterRef: HTMLDivElement | undefined;
  const solutionSet = () => SOLUTIONS_BY_CATEGORY[props.categoryId];
  const areas = createMemo(() => {
    const set = solutionSet();
    return (
      set?.areas.filter((entry) => set.items.some((item) => item.area === entry.id)) ?? NO_AREAS
    );
  });
  const solutions = createMemo(() => {
    const set = solutionSet();
    return set ? orderByArea(areas(), set.items) : [];
  });
  const [browse, setBrowse] = createSignal<BrowseState>(() => initialBrowse(solutions()));
  const send = (event: BrowseEvent) => {
    const list = solutions();
    setBrowse((state) => transition(list, state, event));
    flush();
  };
  const area = () => browse().area;
  const selectedId = () => {
    const state = browse();
    return state.status === "showing" ? state.selectedId : undefined;
  };
  const filterScope = () => `${props.categoryId}:${area()}`;
  const [filterOpenScope, setFilterOpenScope] = createSignal<string | null>(null);
  const filterOpen = () => filterOpenScope() === filterScope();
  const setFilterOpen = (open: boolean) => setFilterOpenScope(open ? filterScope() : null);

  createEffect(filterOpen, (open) => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (target instanceof Node && filterRef?.contains(target)) return;
      setFilterOpenScope(null);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFilterOpenScope(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  });

  createEffect(
    () => [area(), reduce(), solutions()] as const,
    ([, reduceNow]) => {
      const list = areaListRef;
      if (!list) return;
      const release = bindEdgeScroll(list, reduceNow);
      const chip = list.querySelector<HTMLElement>('[aria-pressed="true"]');
      if (chip && list.scrollWidth > list.clientWidth) {
        const left = chip.offsetLeft - (list.clientWidth - chip.offsetWidth) / 2;
        list.scrollTo({ left: Math.max(0, left), behavior: reduceNow ? "auto" : "smooth" });
      }
      return release;
    },
  );

  createEffect(
    () => [area(), selectedId(), reduce()] as const,
    ([, , reduceNow]) => {
      const rail = railRef;
      const tab = rail?.querySelector<HTMLElement>('[aria-selected="true"]');
      if (!rail || !tab) return;
      const behavior = reduceNow ? "auto" : "smooth";
      if (rail.scrollWidth > rail.clientWidth) {
        const left = tab.offsetLeft - (rail.clientWidth - tab.offsetWidth) / 2;
        rail.scrollTo({ left: Math.max(0, left), behavior });
        return;
      }
      const visibleTop =
        rail.scrollTop + (Number.parseFloat(getComputedStyle(rail).scrollPaddingTop) || 0);
      const visibleBottom = rail.scrollTop + rail.clientHeight;
      if (tab.offsetTop >= visibleTop && tab.offsetTop + tab.offsetHeight <= visibleBottom) return;
      const top = tab.offsetTop - (rail.clientHeight - tab.offsetHeight) / 2;
      rail.scrollTo({ top: Math.max(0, top), behavior });
    },
  );

  createEffect(
    () => [area(), reduce(), selectedId(), solutions()] as const,
    ([, reduceNow]) => {
      const rail = railRef;
      const bar = railBarRef;
      const thumb = railThumbRef;
      if (!rail || !bar || !thumb) return;

      let drag: { pointer: number; startY: number; startScroll: number } | null = null;

      const paint = () => {
        const overflow = rail.scrollHeight - rail.clientHeight;
        const vertical = overflow > 1;
        bar.hidden = !vertical;
        if (!vertical) return;
        const track = bar.clientHeight;
        const thumbHeight = thumb.offsetHeight || 30;
        const travel = Math.max(0, track - thumbHeight);
        const y = (rail.scrollTop / overflow) * travel;
        thumb.style.transform = `translate3d(0, ${y}px, 0)`;
      };

      const onThumbDown = (event: PointerEvent) => {
        event.preventDefault();
        event.stopPropagation();
        thumb.setPointerCapture(event.pointerId);
        drag = { pointer: event.pointerId, startY: event.clientY, startScroll: rail.scrollTop };
      };
      const onThumbMove = (event: PointerEvent) => {
        if (!drag || drag.pointer !== event.pointerId) return;
        const overflow = rail.scrollHeight - rail.clientHeight;
        const travel = Math.max(1, bar.clientHeight - thumb.offsetHeight);
        rail.scrollTop = drag.startScroll + ((event.clientY - drag.startY) / travel) * overflow;
      };
      const onThumbUp = (event: PointerEvent) => {
        if (drag?.pointer === event.pointerId) drag = null;
      };

      paint();
      const releaseEdge = bindEdgeScroll(rail, reduceNow);
      const observer = new ResizeObserver(paint);
      observer.observe(rail);
      rail.addEventListener("scroll", paint, { passive: true });
      thumb.addEventListener("pointerdown", onThumbDown);
      thumb.addEventListener("pointermove", onThumbMove);
      thumb.addEventListener("pointerup", onThumbUp);
      thumb.addEventListener("pointercancel", onThumbUp);
      return () => {
        releaseEdge();
        observer.disconnect();
        rail.removeEventListener("scroll", paint);
        thumb.removeEventListener("pointerdown", onThumbDown);
        thumb.removeEventListener("pointermove", onThumbMove);
        thumb.removeEventListener("pointerup", onThumbUp);
        thumb.removeEventListener("pointercancel", onThumbUp);
      };
    },
  );

  const scope = createMemo(() => {
    const current = area();
    const list = solutions();
    return current === "all" ? list : list.filter((item) => item.area === current);
  });
  const position = createMemo(() =>
    Math.max(
      0,
      scope().findIndex((item) => item.id === selectedId()),
    ),
  );
  const selected = createMemo(() =>
    browse().status === "showing" ? scope()[position()] : undefined,
  );

  const areaChips = createMemo(() => [{ id: "all" as const, label: "全部" }, ...areas()]);

  return (
    <Show when={solutions().length > 0}>
      <section
        id="products-solutions"
        aria-labelledby="solutions-title"
        {...stylex.attrs(styles.section)}
      >
        <div {...stylex.attrs(kitStyles.shell, kitStyles.inset120)}>
          <header {...stylex.attrs(styles.sectionHead)}>
            <h2 id="solutions-title" {...stylex.attrs(styles.sectionTitle)}>
              应用方案
            </h2>
          </header>
          <Show when={areas().length > 0 && solutions().length > 1}>
            <ToggleGroup
              ref={(el: HTMLDivElement) => (areaListRef = el)}
              value={[area()]}
              deselectable={false}
              onValueChange={(vals) => {
                if (vals[0]) send({ type: "pickArea", area: vals[0] as AreaFilter });
              }}
              aria-label="按应用领域筛选"
              {...stylex.attrs(styles.areaList)}
            >
              <For each={areaChips()}>
                {(entry) => (
                  <Toggle
                    value={entry.id}
                    class={(state) =>
                      sxProps(styles.area, state.pressed && styles.areaActive).class
                    }
                  >
                    <span {...stylex.attrs(styles.areaLabel)}>{entry.label}</span>
                  </Toggle>
                )}
              </For>
            </ToggleGroup>
          </Show>
          <Show when={scope().length > 1 ? selected() : undefined}>
            {(current) => (
              <div ref={filterRef} {...stylex.attrs(styles.solutionFilter)}>
                <button
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded={filterOpen() ? "true" : "false"}
                  aria-controls={`${uid}-solutions`}
                  onClick={() => setFilterOpen(!filterOpen())}
                  {...stylex.attrs(styles.solutionFilterButton)}
                >
                  <span {...stylex.attrs(styles.solutionFilterLabel)}>{current().title}</span>
                  <ChevronDown
                    size={18}
                    strokeWidth={2}
                    absoluteStrokeWidth
                    aria-hidden="true"
                    {...sxProps(
                      styles.solutionFilterIcon,
                      filterOpen() && styles.solutionFilterIconOpen,
                    )}
                  />
                </button>
                <ul
                  id={`${uid}-solutions`}
                  role="listbox"
                  aria-label="应用方案"
                  hidden={!filterOpen()}
                  {...stylex.attrs(styles.solutionFilterMenu)}
                >
                  <For each={scope()}>
                    {(item) => {
                      const isSelected = () => item.id === current().id;
                      return (
                        <li>
                          <button
                            type="button"
                            role="option"
                            aria-selected={isSelected() ? "true" : "false"}
                            onClick={() => {
                              send({ type: "pickSolution", id: item.id });
                              setFilterOpen(false);
                            }}
                            {...sxProps(
                              styles.solutionFilterOption,
                              isSelected() && styles.solutionFilterOptionSelected,
                            )}
                          >
                            <span {...stylex.attrs(styles.solutionFilterOptionTitle)}>
                              {item.title}
                            </span>
                            <span {...stylex.attrs(styles.solutionFilterOptionMeta)}>
                              {item.functions.join(" · ")}
                            </span>
                          </button>
                        </li>
                      );
                    }}
                  </For>
                </ul>
              </div>
            )}
          </Show>
          <Show
            when={selected()}
            fallback={<p {...stylex.attrs(styles.solutionsEmpty)}>暂无方案</p>}
          >
            <Tabs
              value={selected()?.id ?? null}
              onValueChange={(next) => {
                if (next) send({ type: "pickSolution", id: next });
              }}
              orientation="vertical"
              {...stylex.attrs(styles.browser)}
            >
              <div {...stylex.attrs(styles.railFrame)}>
                <TabsList
                  ref={(el: HTMLDivElement) => (railRef = el)}
                  aria-label="应用方案"
                  {...stylex.attrs(styles.rail)}
                >
                  <For each={scope()}>
                    {(item) => (
                      <TabsTab
                        value={item.id}
                        class={(state) =>
                          sxProps(
                            styles.solutionTab,
                            state.selected && styles.solutionTabSelected,
                            stylex.defaultMarker(),
                          ).class
                        }
                      >
                        {(state) => (
                          <>
                            <Show when={state.selected}>
                              <m.span
                                layoutId={`${uid}-solution-tab`}
                                transition={
                                  reduce()
                                    ? { duration: 0 }
                                    : { type: "spring", duration: 0.32, bounce: 0 }
                                }
                                {...stylex.attrs(styles.tabIndicator)}
                              />
                            </Show>
                            <span {...stylex.attrs(styles.tabText)}>
                              <span
                                {...sxProps(
                                  styles.tabTitle,
                                  state.selected && styles.tabTitleSelected,
                                )}
                              >
                                {item.title}
                              </span>
                              <span {...stylex.attrs(styles.tabMeta)}>
                                {item.functions.join(" · ")}
                              </span>
                            </span>
                          </>
                        )}
                      </TabsTab>
                    )}
                  </For>
                </TabsList>
                <div ref={railBarRef} aria-hidden="true" {...stylex.attrs(styles.railBar)}>
                  <div ref={railThumbRef} {...stylex.attrs(styles.railThumb)} />
                </div>
              </div>
              <Show when={selected()} keyed>
                {(item) => (
                  <TabsPanel value={item.id} {...stylex.attrs(styles.sheet)}>
                    <div {...stylex.attrs(styles.panel)}>
                      <FormulaSheet item={item} />
                    </div>
                  </TabsPanel>
                )}
              </Show>
            </Tabs>
          </Show>
        </div>
      </section>
    </Show>
  );
}
