import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { m } from "motion/react";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";

import { EASE } from "@/components/prototype/motion-constants";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { SOLUTION_ITEMS, type SolutionItem } from "../../products-data";
import { padIndex } from "../shared/derived";

const INK = "#1a1a1a";
const BODY_TEXT = "#4d4d4d";
const MUTED = "#6b6b70";
const FAINT = "#b3a6ab";
const SECTION_BG = "#fcf6f7";
const TAB_TINT = "#f8eef0";
const TAB_TINT_HOVER = "#fbf3f5";
const SHEET_EDGE = "#ead9de";
const SHEET_RULE = "#f1e5e8";
const ACCENT = colors.brandGreen700;
const EASE_OUT_CSS = "cubic-bezier(0.22, 1, 0.36, 1)";
const BODY_FONT =
  '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif';
const NUMERAL_FONT = '"Inter Tight", "Noto Sans SC", sans-serif';

const TABLET = "@media (min-width: 768px) and (max-width: 1279.98px)";
const DESKTOP = breakpoints.xl;
const MD = breakpoints.md;
const LG = breakpoints.lg;
const INSET = "min(120px, 8.333vw)";
const HEADER_HEIGHT = 80;
const TAB_DROP = 6;
const LAST_INDEX = SOLUTION_ITEMS.length - 1;

type FieldKey =
  | "overview"
  | "functions"
  | "keyIngredients"
  | "challenges"
  | "texture"
  | "applications";

const FIELDS: { key: FieldKey; label: string }[] = [
  { key: "overview", label: "概述" },
  { key: "functions", label: "功能" },
  { key: "keyIngredients", label: "功能性成分" },
  { key: "challenges", label: "配方挑战" },
  { key: "texture", label: "质地" },
  { key: "applications", label: "应用" },
];

const KEY_STEPS: Partial<Record<string, (index: number) => number>> = {
  ArrowRight: (index) => (index === LAST_INDEX ? 0 : index + 1),
  ArrowLeft: (index) => (index === 0 ? LAST_INDEX : index - 1),
  Home: () => 0,
  End: () => LAST_INDEX,
};

const styles = stylex.create({
  section: {
    paddingTop: { default: 64, [DESKTOP]: 96 },
    paddingBottom: { default: 72, [DESKTOP]: 112 },
    scrollMarginTop: HEADER_HEIGHT,
    backgroundColor: SECTION_BG,
    color: INK,
    fontFamily: BODY_FONT,
  },
  shell: {
    width: "100%",
    maxWidth: 1440,
    marginInline: "auto",
    boxSizing: "border-box",
    paddingInline: { default: 16, [TABLET]: 40, [DESKTOP]: INSET },
  },
  title: {
    margin: 0,
    marginBottom: { default: 32, [DESKTOP]: 48 },
    fontSize: { default: 26, [TABLET]: 28, [DESKTOP]: 32 },
    fontWeight: 400,
    lineHeight: { default: "34px", [TABLET]: "36px", [DESKTOP]: "40px" },
    letterSpacing: "0.04em",
    color: INK,
  },
  folder: {
    position: "relative",
    isolation: "isolate",
    scrollMarginTop: HEADER_HEIGHT + 16,
    "::after": {
      content: '""',
      position: "absolute",
      insetInline: 0,
      bottom: 0,
      zIndex: 1,
      height: 1,
      backgroundColor: SHEET_EDGE,
      pointerEvents: "none",
    },
  },
  tablist: {
    position: "relative",
    display: { default: "flex", [DESKTOP]: "grid" },
    gridTemplateColumns: { default: null, [DESKTOP]: "repeat(10, minmax(0, 1fr))" },
    gap: 4,
    overflowX: "auto",
    overflowY: "hidden",
    scrollbarWidth: "none",
    overscrollBehaviorX: "contain",
  },
  tab: {
    position: "relative",
    flexShrink: 0,
    display: "flex",
    flexDirection: { default: "row", [DESKTOP]: "column" },
    alignItems: { default: "center", [DESKTOP]: "flex-start" },
    gap: { default: 8, [DESKTOP]: 4 },
    minWidth: 0,
    height: { default: 48, [DESKTOP]: "auto" },
    paddingInline: { default: 14, [DESKTOP]: 12 },
    paddingTop: { default: 0, [DESKTOP]: 12 },
    paddingBottom: { default: TAB_DROP, [DESKTOP]: 14 + TAB_DROP },
    boxSizing: "border-box",
    borderWidth: 1,
    borderBottomWidth: 0,
    borderStyle: "solid",
    borderColor: SHEET_EDGE,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    backgroundColor: { default: TAB_TINT, ":hover": TAB_TINT_HOVER },
    fontFamily: "inherit",
    textAlign: "start",
    color: { default: BODY_TEXT, ":hover": colors.brandBlue700 },
    cursor: "pointer",
    transform: {
      default: `translateY(${TAB_DROP}px)`,
      ":hover": `translateY(${TAB_DROP / 2}px)`,
    },
    transitionProperty: "transform, background-color, color",
    transitionDuration: { default: "0ms", [breakpoints.motionOk]: "200ms" },
    transitionTimingFunction: EASE_OUT_CSS,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: -3,
  },
  tabActive: {
    zIndex: 2,
    backgroundColor: { default: colors.paper, ":hover": colors.paper },
    color: { default: INK, ":hover": INK },
    cursor: "default",
    transform: { default: "translateY(0)", ":hover": "translateY(0)" },
    "::before": {
      content: '""',
      position: "absolute",
      top: -1,
      insetInline: -1,
      height: 2,
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
      backgroundColor: ACCENT,
    },
  },
  tabNumber: {
    flexShrink: 0,
    fontFamily: NUMERAL_FONT,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: MUTED,
  },
  tabNumberActive: {
    color: ACCENT,
  },
  tabTitle: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "20px",
    letterSpacing: "0.02em",
    whiteSpace: { default: "nowrap", [DESKTOP]: "normal" },
    textWrap: "balance",
  },
  tabTitleActive: {
    fontWeight: 500,
  },
  titleWord: {
    whiteSpace: "nowrap",
  },
  sheet: {
    position: "relative",
    paddingInline: { default: 20, [MD]: 40, [DESKTOP]: 56 },
    paddingTop: { default: 28, [MD]: 40, [DESKTOP]: 48 },
    paddingBottom: { default: 12, [MD]: 20 },
    borderWidth: 1,
    borderTopWidth: 0,
    borderStyle: "solid",
    borderColor: SHEET_EDGE,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
    backgroundColor: colors.paper,
    boxShadow: "0 1px 2px rgba(92, 40, 56, 0.04)",
  },
  panels: {
    display: "grid",
  },
  panel: {
    gridArea: "1 / 1",
    minWidth: 0,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 8,
  },
  panelIdle: {
    display: { default: "none", [MD]: "block" },
    visibility: "hidden",
  },
  sheetHead: {
    paddingBottom: { default: 20, [MD]: 28 },
  },
  sheetTitle: {
    margin: 0,
    fontSize: { default: 20, [MD]: 24 },
    fontWeight: 500,
    lineHeight: { default: "28px", [MD]: "32px" },
    letterSpacing: "0.04em",
    color: INK,
    textWrap: "balance",
  },
  sheetSubtitle: {
    margin: 0,
    marginTop: 8,
    maxWidth: "40em",
    fontSize: 15,
    lineHeight: "24px",
    color: BODY_TEXT,
    textWrap: "pretty",
  },
  fields: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [LG]: "repeat(2, minmax(0, 1fr))" },
    gridTemplateRows: { default: "none", [LG]: "repeat(3, auto)" },
    gridAutoFlow: { default: "row", [LG]: "column" },
    columnGap: { default: 0, [LG]: 48 },
    margin: 0,
  },
  field: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [MD]: "88px minmax(0, 1fr)" },
    alignContent: "start",
    columnGap: 16,
    rowGap: 6,
    paddingBlock: { default: 16, [MD]: 18 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: SHEET_RULE,
  },
  fieldLabel: {
    margin: 0,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "26px",
    letterSpacing: "0.04em",
    color: MUTED,
  },
  fieldValue: {
    margin: 0,
    minWidth: 0,
    fontSize: 15,
    lineHeight: "26px",
    color: INK,
  },
  lines: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  line: {
    position: "relative",
    paddingInlineStart: 16,
    textWrap: "pretty",
    "::before": {
      content: '""',
      position: "absolute",
      insetInlineStart: 0,
      top: 13,
      width: 6,
      height: 1,
      backgroundColor: FAINT,
    },
  },
  absent: {
    color: MUTED,
  },
  srOnly: {
    position: "absolute",
    width: 1,
    height: 1,
    margin: -1,
    padding: 0,
    overflow: "hidden",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
    borderWidth: 0,
  },
  foot: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) auto minmax(0, 1fr)",
    alignItems: "center",
    columnGap: 16,
    marginTop: { default: 8, [MD]: 16 },
    paddingTop: { default: 4, [MD]: 8 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: SHEET_RULE,
  },
  step: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    minWidth: 0,
    minHeight: 48,
    paddingBlock: 0,
    paddingInline: 8,
    marginInline: -8,
    borderWidth: 0,
    borderRadius: 2,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.04em",
    color: { default: INK, ":hover": colors.brandBlue700 },
    cursor: "pointer",
    transitionProperty: "color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: -2,
  },
  stepPrev: {
    justifySelf: "start",
  },
  stepNext: {
    justifySelf: "end",
  },
  stepDisabled: {
    color: { default: FAINT, ":hover": FAINT },
    cursor: "default",
  },
  stepNeighbor: {
    display: { default: "none", [MD]: "inline" },
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    fontWeight: 400,
    color: MUTED,
  },
  counter: {
    fontFamily: NUMERAL_FONT,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: MUTED,
  },
});

function FieldRow({ label, lines }: { label: string; lines: string[] }) {
  return (
    <div {...stylex.props(styles.field)}>
      <dt {...stylex.props(styles.fieldLabel)}>{label}</dt>
      <dd {...stylex.props(styles.fieldValue)}>
        {lines.length > 0 ? (
          <ul {...stylex.props(styles.lines)}>
            {lines.map((line) => (
              <li key={line} {...stylex.props(styles.line)}>
                {line}
              </li>
            ))}
          </ul>
        ) : (
          <>
            <span aria-hidden="true" {...stylex.props(styles.absent)}>
              —
            </span>
            <span {...stylex.props(styles.srOnly)}>None</span>
          </>
        )}
      </dd>
    </div>
  );
}

function TabTitle({ title }: { title: string }) {
  const words = title.split(" ");
  if (words.length === 1) return <>{title}</>;
  return (
    <>
      {words.map((word, index) => (
        <span key={word}>
          {index > 0 && " "}
          <span {...stylex.props(styles.titleWord)}>{word}</span>
        </span>
      ))}
    </>
  );
}

function Sheet({ item }: { item: SolutionItem }) {
  return (
    <>
      <header {...stylex.props(styles.sheetHead)}>
        <h3 {...stylex.props(styles.sheetTitle)}>{item.title}</h3>
        <p {...stylex.props(styles.sheetSubtitle)}>{item.subtitle}</p>
      </header>
      <dl {...stylex.props(styles.fields)}>
        {FIELDS.map((field) => (
          <FieldRow key={field.key} label={field.label} lines={item[field.key]} />
        ))}
      </dl>
    </>
  );
}

export function Solutions() {
  const reduce = useReducedMotion();
  const baseId = useId();
  const titleId = `${baseId}-title`;
  const tabId = (index: number) => `${baseId}-tab-${index}`;
  const panelId = (index: number) => `${baseId}-panel-${index}`;
  const [activeIndex, setActiveIndex] = useState(0);
  const folderRef = useRef<HTMLDivElement>(null);
  const tablistRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const previous = activeIndex > 0 ? SOLUTION_ITEMS[activeIndex - 1] : null;
  const next = activeIndex < LAST_INDEX ? SOLUTION_ITEMS[activeIndex + 1] : null;

  useEffect(() => {
    const tablist = tablistRef.current;
    const tab = tabRefs.current[activeIndex];
    if (!tablist || !tab || tablist.scrollWidth <= tablist.clientWidth) return;
    const left = tab.offsetLeft - (tablist.clientWidth - tab.offsetWidth) / 2;
    tablist.scrollTo({ left: Math.max(0, left), behavior: reduce ? "auto" : "smooth" });
  }, [activeIndex, reduce]);

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const step = KEY_STEPS[event.key];
    if (!step) return;
    event.preventDefault();
    const target = step(activeIndex);
    setActiveIndex(target);
    tabRefs.current[target]?.focus({ preventScroll: true });
  };

  const stepTo = (index: number) => {
    if (index < 0 || index > LAST_INDEX) return;
    setActiveIndex(index);
    const folder = folderRef.current;
    if (folder && folder.getBoundingClientRect().top < HEADER_HEIGHT) {
      folder.scrollIntoView({ block: "start", behavior: reduce ? "auto" : "smooth" });
    }
  };

  return (
    <section id="products-solutions" aria-labelledby={titleId} {...stylex.props(styles.section)}>
      <div {...stylex.props(styles.shell)}>
        <h2 id={titleId} {...stylex.props(styles.title)}>
          应用方案
        </h2>
        <div ref={folderRef} {...stylex.props(styles.folder)}>
          <div
            ref={tablistRef}
            role="tablist"
            aria-labelledby={titleId}
            {...stylex.props(styles.tablist)}
          >
            {SOLUTION_ITEMS.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={item.id}
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  id={tabId(index)}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={panelId(index)}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveIndex(index)}
                  onKeyDown={onTabKeyDown}
                  {...stylex.props(styles.tab, isActive && styles.tabActive)}
                >
                  <span {...stylex.props(styles.tabNumber, isActive && styles.tabNumberActive)}>
                    {padIndex(index)}
                  </span>
                  <span {...stylex.props(styles.tabTitle, isActive && styles.tabTitleActive)}>
                    <TabTitle title={item.title} />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        <div {...stylex.props(styles.sheet)}>
          <div {...stylex.props(styles.panels)}>
            {SOLUTION_ITEMS.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <m.div
                  key={item.id}
                  id={panelId(index)}
                  role="tabpanel"
                  aria-labelledby={tabId(index)}
                  tabIndex={isActive ? 0 : -1}
                  inert={!isActive}
                  initial={false}
                  animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: reduce ? 0 : 6 }}
                  transition={
                    isActive && !reduce ? { duration: 0.24, ease: EASE } : { duration: 0 }
                  }
                  {...stylex.props(styles.panel, !isActive && styles.panelIdle)}
                >
                  <Sheet item={item} />
                </m.div>
              );
            })}
          </div>
          <nav aria-label="Solution pages" {...stylex.props(styles.foot)}>
            <button
              type="button"
              aria-disabled={previous === null}
              aria-controls={panelId(activeIndex)}
              onClick={() => stepTo(activeIndex - 1)}
              {...stylex.props(
                styles.step,
                styles.stepPrev,
                previous === null && styles.stepDisabled,
              )}
            >
              <ArrowLeft size={16} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />
              上一个
              {previous && <span {...stylex.props(styles.stepNeighbor)}>{previous.title}</span>}
            </button>
            <span aria-hidden="true" {...stylex.props(styles.counter)}>
              {padIndex(activeIndex)} / {padIndex(LAST_INDEX)}
            </span>
            <button
              type="button"
              aria-disabled={next === null}
              aria-controls={panelId(activeIndex)}
              onClick={() => stepTo(activeIndex + 1)}
              {...stylex.props(styles.step, styles.stepNext, next === null && styles.stepDisabled)}
            >
              {next && <span {...stylex.props(styles.stepNeighbor)}>{next.title}</span>}
              下一个
              <ArrowRight size={16} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </section>
  );
}
