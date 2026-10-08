import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { AnimatePresence, m } from "motion/react";
import {
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
  type ReactNode,
} from "react";

import { EASE } from "@/components/prototype/motion-constants";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { FLAT_FORMULAS, padIndex, type FlatFormula } from "../shared/derived";

const INK = "#1a1a1a";
const BODY_TEXT = "#4d4d4d";
const MUTED = "#6b6b70";
const PARCHMENT = "#f8f6ea";
const PARCHMENT_RULE = "#e2dcc4";
const PARCHMENT_HOVER = "#fcfbf4";
const SHEET = "#fffefb";
const SHEET_BACK = "#fbf9f1";
const SHEET_EDGE = "#dad3b8";
const SHEET_RULE = "#ece7d5";
const BAND_HOVER = "rgba(7, 67, 174, 0.04)";
const SHEET_SHADOW = "0 1px 2px rgba(64, 52, 16, 0.06), 0 6px 16px -12px rgba(64, 52, 16, 0.22)";
const ACCENT = colors.brandGreen700;
const ACCENT_TEXT = colors.brandGreen800;
const FOCUS = colors.brandBlue700;
const EASE_OUT_CSS = "cubic-bezier(0.22, 1, 0.36, 1)";
const BODY_FONT =
  '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif';
const NUMERAL_FONT = '"Inter Tight", "Noto Sans SC", sans-serif';

const TABLET = "@media (min-width: 768px) and (max-width: 1279.98px)";
const MID = "@media (min-width: 768px) and (max-width: 1023.98px)";
const HOVER_WIDE = "@media (hover: hover) and (min-width: 1024px)";
const DESKTOP = breakpoints.xl;
const MD = breakpoints.md;
const LG = breakpoints.lg;
const MOTION_OK = breakpoints.motionOk;
const INSET = "min(120px, 8.333vw)";
const HEADER_HEIGHT = 80;
const GUTTER = 24;
const TWELVE = "repeat(12, minmax(0, 1fr))";
const OFFSET = 24;

type Face = "summary" | "process";

const SUMMARY_LABEL = "概述 · 功能 · 成分";
const processLabel = (formula: FlatFormula) =>
  formula.challenges.length > 0 ? "配方挑战 · 质地 · 应用" : "质地 · 应用";

const WIDE_QUERY = "(min-width: 1024px)";
const subscribeWide = (onChange: () => void) => {
  const query = window.matchMedia(WIDE_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};
const useWideLayout = () =>
  useSyncExternalStore(
    subscribeWide,
    () => window.matchMedia(WIDE_QUERY).matches,
    () => false,
  );

const keyTarget = (key: string, index: number, last: number) => {
  switch (key) {
    case "ArrowDown":
    case "ArrowRight":
      return index === last ? 0 : index + 1;
    case "ArrowUp":
    case "ArrowLeft":
      return index === 0 ? last : index - 1;
    case "Home":
      return 0;
    case "End":
      return last;
    default:
      return null;
  }
};

const styles = stylex.create({
  section: {
    backgroundColor: PARCHMENT,
    color: INK,
    fontFamily: BODY_FONT,
    paddingTop: { default: 64, [DESKTOP]: 96 },
    paddingBottom: { default: 72, [DESKTOP]: 112 },
    scrollMarginTop: HEADER_HEIGHT,
  },
  shell: {
    width: "100%",
    maxWidth: 1440,
    marginInline: "auto",
    boxSizing: "border-box",
    paddingInline: { default: 16, [TABLET]: 40, [DESKTOP]: INSET },
  },
  head: {
    marginBottom: { default: 24, [LG]: 32, [DESKTOP]: 40 },
  },
  title: {
    margin: 0,
    fontSize: { default: 26, [TABLET]: 28, [DESKTOP]: 32 },
    fontWeight: 400,
    lineHeight: { default: "34px", [TABLET]: "36px", [DESKTOP]: "40px" },
    letterSpacing: "0.04em",
    color: INK,
  },
  layout: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [LG]: TWELVE },
    columnGap: GUTTER,
    alignItems: "start",
  },

  tablist: {
    position: { default: "relative", [LG]: "sticky" },
    top: { default: 0, [LG]: HEADER_HEIGHT + 32 },
    gridColumn: { default: "1 / -1", [LG]: "1 / 5" },
    alignSelf: "start",
    display: "flex",
    flexDirection: { default: "row", [LG]: "column" },
    marginInline: { default: -16, [MID]: -40, [LG]: 0 },
    marginBottom: { default: 24, [LG]: 0 },
    paddingInline: { default: 4, [MID]: 28, [LG]: 0 },
    overflowX: { default: "auto", [LG]: "visible" },
    scrollbarWidth: "none",
    borderTopWidth: { default: 0, [LG]: 1 },
    borderTopStyle: "solid",
    borderTopColor: INK,
    borderBottomWidth: { default: 1, [LG]: 0 },
    borderBottomStyle: "solid",
    borderBottomColor: PARCHMENT_RULE,
  },
  tab: {
    position: "relative",
    display: "flex",
    alignItems: "baseline",
    gap: { default: 8, [LG]: 14 },
    flexShrink: 0,
    boxSizing: "border-box",
    minHeight: { default: 48, [LG]: 56 },
    margin: 0,
    paddingBlock: { default: 12, [LG]: 16 },
    paddingInline: { default: 12, [LG]: 16 },
    borderWidth: 0,
    borderBottomWidth: { default: 0, [LG]: 1 },
    borderBottomStyle: "solid",
    borderBottomColor: PARCHMENT_RULE,
    backgroundColor: {
      default: "transparent",
      [HOVER_WIDE]: { default: "transparent", ":hover": PARCHMENT_HOVER },
    },
    fontFamily: "inherit",
    textAlign: "start",
    whiteSpace: "nowrap",
    color: { default: BODY_TEXT, ":hover": FOCUS },
    cursor: "pointer",
    transitionProperty: "color, background-color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: FOCUS,
    outlineOffset: -2,
    "::after": {
      content: '""',
      position: "absolute",
      backgroundColor: ACCENT,
      insetInlineStart: { default: 12, [LG]: 0 },
      insetInlineEnd: { default: 12, [LG]: "auto" },
      top: { default: "auto", [LG]: 0 },
      bottom: 0,
      width: { default: "auto", [LG]: 2 },
      height: { default: 2, [LG]: "auto" },
      transform: { default: "scaleX(0)", [LG]: "scaleY(0)" },
      transformOrigin: { default: "center", [LG]: "center top" },
      transitionProperty: "transform",
      transitionDuration: { default: "0ms", [MOTION_OK]: "300ms" },
      transitionTimingFunction: EASE_OUT_CSS,
    },
  },
  tabSelected: {
    color: { default: INK, ":hover": INK },
    backgroundColor: { default: "transparent", [LG]: SHEET },
    "::after": {
      transform: "none",
    },
  },
  tabNumber: {
    flexShrink: 0,
    width: { default: "auto", [LG]: 24 },
    fontFamily: NUMERAL_FONT,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.02em",
    fontVariantNumeric: "tabular-nums",
    color: MUTED,
  },
  tabNumberSelected: {
    color: ACCENT_TEXT,
  },
  tabTitle: {
    fontSize: { default: 15, [LG]: 16 },
    fontWeight: 400,
    lineHeight: "24px",
    letterSpacing: "0.02em",
  },
  tabTitleSelected: {
    fontWeight: { default: 400, [LG]: 500 },
  },

  panels: {
    gridColumn: { default: "1 / -1", [LG]: "5 / 13" },
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr)",
    minWidth: 0,
  },
  panel: {
    gridArea: "1 / 1",
    minWidth: 0,
    transitionProperty: "opacity, transform",
    transitionTimingFunction: EASE_OUT_CSS,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: FOCUS,
    outlineOffset: 4,
  },
  panelShown: {
    opacity: 1,
    transform: "none",
    transitionDuration: { default: "0ms", [MOTION_OK]: "240ms" },
  },
  panelHidden: {
    visibility: "hidden",
    opacity: 0,
    transform: "translateY(6px)",
    transitionDuration: "0ms",
  },

  stack: {
    position: "relative",
    display: { default: "flex", [LG]: "grid" },
    flexDirection: "column",
    gap: 16,
    gridTemplateColumns: "minmax(0, 1fr)",
    paddingTop: { default: 0, [LG]: OFFSET },
    paddingInlineEnd: { default: 0, [LG]: OFFSET },
  },
  sheet: {
    position: "relative",
    boxSizing: "border-box",
    minWidth: 0,
    gridArea: { default: "auto", [LG]: "1 / 1" },
    paddingTop: { default: 24, [MD]: 32, [LG]: 40 },
    paddingBottom: { default: 24, [MD]: 32, [LG]: 40 },
    paddingInline: { default: 20, [MD]: 32, [LG]: 48 },
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: SHEET_EDGE,
    borderRadius: 2,
    backgroundColor: SHEET,
    boxShadow: SHEET_SHADOW,
    transitionProperty: "transform, background-color, box-shadow",
    transitionDuration: { default: "0ms", [MOTION_OK]: "260ms" },
    transitionTimingFunction: EASE_OUT_CSS,
  },
  sheetFront: {
    zIndex: { default: "auto", [LG]: 2 },
    transform: "none",
  },
  sheetBack: {
    zIndex: { default: "auto", [LG]: 1 },
    transform: { default: "none", [LG]: "translate(24px, -24px)" },
    backgroundColor: { default: SHEET, [LG]: SHEET_BACK },
    boxShadow: { default: SHEET_SHADOW, [LG]: "none" },
  },
  band: {
    display: { default: "none", [LG]: "flex" },
    position: "absolute",
    top: 0,
    insetInlineStart: OFFSET,
    insetInlineEnd: 0,
    zIndex: 3,
    boxSizing: "border-box",
    height: OFFSET,
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    margin: 0,
    paddingBlock: 0,
    paddingInline: 48,
    borderWidth: 0,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    backgroundColor: { default: "transparent", ":hover": BAND_HOVER },
    fontFamily: "inherit",
    color: { default: MUTED, ":hover": FOCUS },
    cursor: "pointer",
    transitionProperty: "color, background-color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: FOCUS,
    outlineOffset: 0,
    "::before": {
      content: '""',
      position: "absolute",
      insetInline: 0,
      bottom: "100%",
      height: 16,
    },
  },
  bandLabel: {
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "0.08em",
    whiteSpace: "nowrap",
  },
  bandPage: {
    fontFamily: NUMERAL_FONT,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "0.08em",
    fontVariantNumeric: "tabular-nums",
  },

  headMeta: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 16,
    margin: 0,
  },
  number: {
    fontFamily: NUMERAL_FONT,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: ACCENT_TEXT,
  },
  page: {
    display: { default: "none", [LG]: "inline" },
    fontFamily: NUMERAL_FONT,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.08em",
    fontVariantNumeric: "tabular-nums",
    color: MUTED,
  },
  sheetTitle: {
    margin: 0,
    marginTop: 8,
    fontSize: { default: 20, [LG]: 24 },
    fontWeight: 500,
    lineHeight: { default: "28px", [LG]: "32px" },
    letterSpacing: "0.04em",
    color: INK,
    textWrap: "balance",
  },
  subtitle: {
    margin: 0,
    marginTop: 6,
    maxWidth: "32em",
    fontSize: 15,
    lineHeight: "24px",
    color: BODY_TEXT,
    textWrap: "pretty",
  },
  wideOnly: {
    display: { default: "none", [LG]: "block" },
  },
  processHeading: {
    position: { default: "static", [LG]: "absolute" },
    width: { default: "auto", [LG]: 1 },
    height: { default: "auto", [LG]: 1 },
    margin: 0,
    overflow: { default: "visible", [LG]: "hidden" },
    clipPath: { default: "none", [LG]: "inset(50%)" },
    whiteSpace: { default: "normal", [LG]: "nowrap" },
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.08em",
    color: INK,
  },

  specs: {
    margin: 0,
    marginTop: { default: 20, [LG]: 28 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: SHEET_RULE,
  },
  processSpecs: {
    marginTop: { default: 12, [LG]: 28 },
  },
  specRow: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [MD]: "104px minmax(0, 1fr)" },
    columnGap: GUTTER,
    rowGap: 4,
    paddingBlock: 14,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: SHEET_RULE,
  },
  fieldLabel: {
    margin: 0,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.04em",
    color: MUTED,
  },
  specValue: {
    minWidth: 0,
    margin: 0,
    fontSize: 15,
    lineHeight: "24px",
    color: INK,
  },
  lineList: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  line: {
    textWrap: "pretty",
  },
  inlineList: {
    display: "flex",
    flexWrap: "wrap",
    rowGap: 4,
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  separator: {
    paddingInline: 10,
    color: SHEET_EDGE,
  },
});

function Spec({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div {...stylex.props(styles.specRow)}>
      <dt {...stylex.props(styles.fieldLabel)}>{label}</dt>
      <dd {...stylex.props(styles.specValue)}>{children}</dd>
    </div>
  );
}

function Lines({ lines }: { lines: string[] }) {
  return (
    <ul {...stylex.props(styles.lineList)}>
      {lines.map((line) => (
        <li key={line} {...stylex.props(styles.line)}>
          {line}
        </li>
      ))}
    </ul>
  );
}

function Inline({ items }: { items: string[] }) {
  return (
    <ul {...stylex.props(styles.inlineList)}>
      {items.map((item, index) => (
        <li key={item}>
          {index > 0 && (
            <span aria-hidden="true" {...stylex.props(styles.separator)}>
              ·
            </span>
          )}
          {item}
        </li>
      ))}
    </ul>
  );
}

function SheetHead({
  formula,
  page,
  decorative = false,
}: {
  formula: FlatFormula;
  page: string;
  decorative?: boolean;
}) {
  const Title = decorative ? "p" : "h3";
  return (
    <header>
      <p {...stylex.props(styles.headMeta)}>
        <span {...stylex.props(styles.number)}>{padIndex(formula.index)}</span>
        <span aria-hidden="true" {...stylex.props(styles.page)}>
          {page}
        </span>
      </p>
      <Title {...stylex.props(styles.sheetTitle)}>{formula.title}</Title>
      <p {...stylex.props(styles.subtitle)}>{formula.subtitle}</p>
    </header>
  );
}

function SheetStack({
  formula,
  face,
  onSwap,
}: {
  formula: FlatFormula;
  face: Face;
  onSwap: () => void;
}) {
  const reduce = useReducedMotion();
  const summaryFront = face === "summary";
  const processName = processLabel(formula);
  const backLabel = summaryFront ? processName : SUMMARY_LABEL;
  const backPage = summaryFront ? "2 / 2" : "1 / 2";

  return (
    <div {...stylex.props(styles.stack)}>
      <div {...stylex.props(styles.sheet, summaryFront ? styles.sheetFront : styles.sheetBack)}>
        <SheetHead formula={formula} page="1 / 2" />
        <dl {...stylex.props(styles.specs)}>
          <Spec label="概述">
            <Lines lines={formula.overview} />
          </Spec>
          <Spec label="功能">
            <Inline items={formula.functions} />
          </Spec>
          <Spec label="功能性成分">
            <Lines lines={formula.keyIngredients} />
          </Spec>
        </dl>
      </div>
      <div {...stylex.props(styles.sheet, summaryFront ? styles.sheetBack : styles.sheetFront)}>
        <div aria-hidden="true" {...stylex.props(styles.wideOnly)}>
          <SheetHead formula={formula} page="2 / 2" decorative />
        </div>
        <h4 {...stylex.props(styles.processHeading)}>{processName}</h4>
        <dl {...stylex.props(styles.specs, styles.processSpecs)}>
          {formula.challenges.length > 0 && (
            <Spec label="配方挑战">
              <Lines lines={formula.challenges} />
            </Spec>
          )}
          <Spec label="质地">
            <Inline items={formula.texture} />
          </Spec>
          <Spec label="应用">
            <Inline items={formula.applications} />
          </Spec>
        </dl>
      </div>
      <button type="button" onClick={onSwap} {...stylex.props(styles.band)}>
        <AnimatePresence mode="wait" initial={false}>
          <m.span
            key={backLabel}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.12, ease: EASE }}
            {...stylex.props(styles.bandLabel)}
          >
            {backLabel}
          </m.span>
        </AnimatePresence>
        <span aria-hidden="true" {...stylex.props(styles.bandPage)}>
          {backPage}
        </span>
      </button>
    </div>
  );
}

export function Solutions() {
  const titleId = useId();
  const baseId = useId();
  const reduce = useReducedMotion();
  const wide = useWideLayout();
  const listRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [selected, setSelected] = useState(0);
  const [face, setFace] = useState<Face>("summary");

  const tabId = (index: number) => `${baseId}-tab-${index}`;
  const panelId = (index: number) => `${baseId}-panel-${index}`;

  const reveal = (index: number) => {
    const list = listRef.current;
    const tab = tabRefs.current[index];
    if (!list || !tab || list.scrollWidth <= list.clientWidth) return;
    list.scrollTo({
      left: tab.offsetLeft - (list.clientWidth - tab.offsetWidth) / 2,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  const select = (index: number) => {
    setSelected(index);
    reveal(index);
  };

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const target = keyTarget(event.key, index, FLAT_FORMULAS.length - 1);
    if (target === null) return;
    event.preventDefault();
    select(target);
    tabRefs.current[target]?.focus();
  };

  const swap = () => setFace((current) => (current === "summary" ? "process" : "summary"));

  return (
    <section id="products-solutions" aria-labelledby={titleId} {...stylex.props(styles.section)}>
      <div {...stylex.props(styles.shell)}>
        <header {...stylex.props(styles.head)}>
          <h2 id={titleId} {...stylex.props(styles.title)}>
            应用方案
          </h2>
        </header>
        <div {...stylex.props(styles.layout)}>
          <div
            ref={listRef}
            role="tablist"
            aria-label="应用方案"
            aria-orientation={wide ? "vertical" : "horizontal"}
            {...stylex.props(styles.tablist)}
          >
            {FLAT_FORMULAS.map((formula) => {
              const active = formula.index === selected;
              return (
                <button
                  key={formula.id}
                  ref={(node) => {
                    tabRefs.current[formula.index] = node;
                  }}
                  type="button"
                  role="tab"
                  id={tabId(formula.index)}
                  aria-selected={active}
                  aria-controls={panelId(formula.index)}
                  tabIndex={active ? 0 : -1}
                  onClick={() => select(formula.index)}
                  onKeyDown={(event) => onTabKeyDown(event, formula.index)}
                  {...stylex.props(styles.tab, active && styles.tabSelected)}
                >
                  <span {...stylex.props(styles.tabNumber, active && styles.tabNumberSelected)}>
                    {padIndex(formula.index)}
                  </span>
                  <span {...stylex.props(styles.tabTitle, active && styles.tabTitleSelected)}>
                    {formula.title}
                  </span>
                </button>
              );
            })}
          </div>
          <div {...stylex.props(styles.panels)}>
            {FLAT_FORMULAS.map((formula) => {
              const active = formula.index === selected;
              return (
                <div
                  key={formula.id}
                  role="tabpanel"
                  id={panelId(formula.index)}
                  aria-labelledby={tabId(formula.index)}
                  tabIndex={active ? 0 : -1}
                  inert={!active}
                  {...stylex.props(styles.panel, active ? styles.panelShown : styles.panelHidden)}
                >
                  <SheetStack formula={formula} face={face} onSwap={swap} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
