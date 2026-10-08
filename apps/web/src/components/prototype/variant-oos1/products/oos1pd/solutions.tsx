import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

import { EASE } from "@/components/prototype/motion-constants";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { FLAT_FORMULAS, padIndex } from "../shared/derived";

const GROUND = "#f7f3ee";
const SHEET = "#ffffff";
const SHEET_EDGE = "#e5ddd2";
const SHEET_SHADOW = "0 1px 1px rgba(72, 48, 24, 0.04), 0 2px 8px -4px rgba(72, 48, 24, 0.1)";
const HAIRLINE = "#ece6de";
const SELECTED_FILL = "#f7f3ee";
const HOVER_FILL = "#fbf9f6";
const INK = "#1a1a1a";
const BODY_TEXT = "#4d4d4d";
const MUTED = "#6b6b70";
const DISABLED = "#a8a8ad";
const ACCENT = colors.brandGreen700;
const HOVER = colors.brandBlue700;
const EASE_OUT_CSS = "cubic-bezier(0.22, 1, 0.36, 1)";
const BODY_FONT =
  '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif';
const NUMERAL_FONT = '"Inter Tight", "Noto Sans SC", sans-serif';

const TABLET = "@media (min-width: 768px) and (max-width: 1279.98px)";
const DESKTOP = breakpoints.xl;
const MD = breakpoints.md;
const WIDE = breakpoints.lg;
const WIDE_QUERY = "(min-width: 1024px)";
const INSET = "min(120px, 8.333vw)";
const HEADER_HEIGHT = 80;
const SCROLL_OFFSET = HEADER_HEIGHT + 24;
const TOTAL = FLAT_FORMULAS.length;
const TOTAL_LABEL = String(TOTAL).padStart(2, "0");

const focusRing = {
  outlineStyle: { default: "none", ":focus-visible": "solid" },
  outlineWidth: 2,
  outlineColor: HOVER,
} as const;

const styles = stylex.create({
  section: {
    paddingTop: { default: 64, [DESKTOP]: 96 },
    paddingBottom: { default: 72, [DESKTOP]: 112 },
    scrollMarginTop: HEADER_HEIGHT,
    backgroundColor: GROUND,
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
  head: {
    marginBottom: { default: 32, [DESKTOP]: 48 },
  },
  title: {
    margin: 0,
    fontSize: { default: 26, [TABLET]: 28, [DESKTOP]: 32 },
    fontWeight: 400,
    lineHeight: { default: "34px", [TABLET]: "36px", [DESKTOP]: "40px" },
    letterSpacing: "0.04em",
    color: INK,
  },
  summary: {
    margin: 0,
    marginTop: 8,
    fontSize: 13,
    lineHeight: "20px",
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: MUTED,
  },
  layout: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [WIDE]: "repeat(12, minmax(0, 1fr))" },
    columnGap: 24,
    rowGap: 12,
    alignItems: "stretch",
  },
  sheet: {
    minWidth: 0,
    backgroundColor: SHEET,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: SHEET_EDGE,
    borderRadius: 2,
    boxShadow: SHEET_SHADOW,
  },
  indexSheet: {
    gridColumn: { default: "1 / -1", [WIDE]: "1 / 6" },
    alignSelf: { default: "start", [WIDE]: "stretch" },
  },
  indexHead: {
    display: { default: "none", [WIDE]: "flex" },
    alignItems: "center",
    justifyContent: "space-between",
    height: 56,
    paddingInline: 24,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: HAIRLINE,
  },
  indexLabel: {
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.08em",
    color: MUTED,
  },
  indexCount: {
    fontFamily: NUMERAL_FONT,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: MUTED,
  },
  indexCountCurrent: {
    color: ACCENT,
  },
  toggle: {
    display: { default: "flex", [WIDE]: "none" },
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    width: "100%",
    minHeight: 56,
    paddingBlock: 0,
    paddingInline: 20,
    borderWidth: 0,
    backgroundColor: { default: "transparent", ":hover": HOVER_FILL },
    fontFamily: "inherit",
    textAlign: "start",
    color: { default: INK, ":hover": HOVER },
    cursor: "pointer",
    transitionProperty: "color, background-color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    ...focusRing,
    outlineOffset: -2,
  },
  toggleOpen: {
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: HAIRLINE,
  },
  toggleText: {
    display: "flex",
    alignItems: "baseline",
    gap: 8,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.04em",
  },
  toggleIcon: {
    flexShrink: 0,
    color: MUTED,
    transitionProperty: "transform",
    transitionDuration: { default: "0ms", [breakpoints.motionOk]: "240ms" },
    transitionTimingFunction: EASE_OUT_CSS,
  },
  toggleIconOpen: {
    transform: "rotate(180deg)",
  },
  disclosure: {
    display: "grid",
    gridTemplateRows: { default: "0fr", [WIDE]: "1fr" },
    visibility: { default: "hidden", [WIDE]: "visible" },
    transitionProperty: "grid-template-rows, visibility",
    transitionDuration: { default: "0ms", [breakpoints.motionOk]: "260ms" },
    transitionTimingFunction: EASE_OUT_CSS,
  },
  disclosureOpen: {
    gridTemplateRows: "1fr",
    visibility: "visible",
  },
  disclosureInner: {
    minHeight: 0,
    overflow: "hidden",
  },
  tablist: {
    display: "flex",
    flexDirection: "column",
  },
  tab: {
    position: "relative",
    display: "grid",
    gridTemplateColumns: "36px minmax(0, 1fr)",
    alignItems: "baseline",
    width: "100%",
    minHeight: 64,
    paddingBlock: 14,
    paddingInline: { default: 20, [WIDE]: 24 },
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: HAIRLINE,
    backgroundColor: { default: "transparent", ":hover": HOVER_FILL },
    fontFamily: "inherit",
    textAlign: "start",
    color: { default: INK, ":hover": HOVER },
    cursor: "pointer",
    transitionProperty: "color, background-color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    ...focusRing,
    outlineOffset: -2,
    "::before": {
      content: '""',
      position: "absolute",
      insetBlock: 0,
      insetInlineStart: 0,
      width: 2,
      backgroundColor: ACCENT,
      transform: "scaleY(0)",
      transformOrigin: "center top",
      transitionProperty: "transform",
      transitionDuration: { default: "0ms", [breakpoints.motionOk]: "240ms" },
      transitionTimingFunction: EASE_OUT_CSS,
    },
  },
  tabLast: {
    borderBottomWidth: 0,
  },
  tabSelected: {
    backgroundColor: { default: SELECTED_FILL, ":hover": SELECTED_FILL },
    color: { default: INK, ":hover": INK },
    "::before": {
      transform: "scaleY(1)",
    },
  },
  tabNumber: {
    fontFamily: NUMERAL_FONT,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.02em",
    fontVariantNumeric: "tabular-nums",
    color: MUTED,
  },
  tabNumberSelected: {
    color: ACCENT,
  },
  tabTitle: {
    fontSize: 15,
    fontWeight: 400,
    lineHeight: "24px",
    letterSpacing: "0.02em",
    color: "inherit",
  },
  tabTitleSelected: {
    fontWeight: 500,
  },
  tabSubtitle: {
    gridColumn: "2",
    marginTop: 2,
    fontSize: 13,
    lineHeight: "20px",
    color: MUTED,
    textWrap: "pretty",
  },

  contentSheet: {
    gridColumn: { default: "1 / -1", [WIDE]: "6 / 13" },
    display: "flex",
    flexDirection: "column",
    scrollMarginTop: SCROLL_OFFSET,
  },
  panel: {
    flexGrow: 1,
    paddingTop: { default: 24, [MD]: 36, [DESKTOP]: 40 },
    paddingInline: { default: 20, [MD]: 36, [DESKTOP]: 40 },
    paddingBottom: { default: 8, [MD]: 12 },
    ...focusRing,
    outlineOffset: -4,
  },
  sheetHead: {
    paddingBottom: { default: 24, [MD]: 28 },
  },
  sheetNumber: {
    display: "flex",
    alignItems: "baseline",
    gap: 6,
    margin: 0,
    fontFamily: NUMERAL_FONT,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: MUTED,
  },
  sheetNumberCurrent: {
    color: ACCENT,
  },
  sheetTitle: {
    margin: 0,
    marginTop: 12,
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
    maxWidth: "32em",
    fontSize: 15,
    lineHeight: "24px",
    color: BODY_TEXT,
    textWrap: "pretty",
  },
  fields: {
    margin: 0,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: INK,
  },
  field: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [MD]: "120px minmax(0, 1fr)" },
    columnGap: 24,
    rowGap: 4,
    paddingBlock: 16,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: HAIRLINE,
  },
  fieldLast: {
    borderBottomWidth: 0,
  },
  fieldLabel: {
    margin: 0,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: { default: "20px", [MD]: "26px" },
    letterSpacing: "0.08em",
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
    maxWidth: "36em",
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  line: {
    textWrap: "pretty",
  },
  empty: {
    color: MUTED,
  },
  visuallyHidden: {
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

  pager: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
    columnGap: 16,
    marginInline: { default: 20, [MD]: 36, [DESKTOP]: 40 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: HAIRLINE,
  },
  pagerButton: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    minWidth: 0,
    minHeight: 72,
    justifyContent: "center",
    paddingBlock: 14,
    paddingInline: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    textAlign: "start",
    color: { default: INK, ":hover": HOVER },
    cursor: "pointer",
    transitionProperty: "color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    ...focusRing,
    outlineOffset: 2,
  },
  pagerNext: {
    alignItems: "flex-end",
    textAlign: "end",
  },
  pagerDisabled: {
    color: { default: DISABLED, ":hover": DISABLED },
    cursor: "default",
  },
  pagerAction: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.04em",
  },
  pagerTitle: {
    display: "block",
    maxWidth: "100%",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    fontSize: 13,
    lineHeight: "20px",
    color: MUTED,
  },
  pagerTitleDisabled: {
    color: DISABLED,
  },
});

function Field({ label, lines, last = false }: { label: string; lines: string[]; last?: boolean }) {
  let value: ReactNode;
  if (lines.length === 0) {
    value = (
      <span {...stylex.props(styles.empty)}>
        <span aria-hidden="true">—</span>
        <span {...stylex.props(styles.visuallyHidden)}>无</span>
      </span>
    );
  } else {
    value = (
      <ul {...stylex.props(styles.lines)}>
        {lines.map((line) => (
          <li key={line} {...stylex.props(styles.line)}>
            {line}
          </li>
        ))}
      </ul>
    );
  }
  return (
    <div {...stylex.props(styles.field, last && styles.fieldLast)}>
      <dt {...stylex.props(styles.fieldLabel)}>{label}</dt>
      <dd {...stylex.props(styles.fieldValue)}>{value}</dd>
    </div>
  );
}

export function Solutions() {
  const titleId = useId();
  const baseId = useId();
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [indexOpen, setIndexOpen] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  const formula = FLAT_FORMULAS[active] ?? FLAT_FORMULAS[0];
  if (!formula) return null;
  const previous = FLAT_FORMULAS[active - 1];
  const next = FLAT_FORMULAS[active + 1];
  const tabId = (index: number) => `${baseId}-tab-${index}`;
  const panelId = `${baseId}-panel`;
  const listId = `${baseId}-list`;

  const revealSheet = () => {
    const sheet = sheetRef.current;
    if (!sheet) return;
    const top = sheet.getBoundingClientRect().top;
    if (top >= HEADER_HEIGHT) return;
    window.scrollTo({
      top: top + window.scrollY - SCROLL_OFFSET,
      behavior: reduce ? "instant" : "smooth",
    });
  };

  const choose = (index: number) => {
    setActive(index);
    if (window.matchMedia(WIDE_QUERY).matches) return;
    setIndexOpen(false);
    toggleRef.current?.focus();
  };

  const step = (index: number) => {
    if (index < 0 || index >= TOTAL) return;
    setActive(index);
    revealSheet();
  };

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = TOTAL - 1;
    let target: number | null = null;
    if (event.key === "ArrowDown") target = index === last ? 0 : index + 1;
    if (event.key === "ArrowUp") target = index === 0 ? last : index - 1;
    if (event.key === "Home") target = 0;
    if (event.key === "End") target = last;
    if (target === null) return;
    event.preventDefault();
    setActive(target);
    tabRefs.current[target]?.focus();
  };

  const position = (
    <>
      <span {...stylex.props(styles.indexCountCurrent)}>{padIndex(active)}</span> / {TOTAL_LABEL}
    </>
  );

  return (
    <section id="products-solutions" aria-labelledby={titleId} {...stylex.props(styles.section)}>
      <div {...stylex.props(styles.shell)}>
        <header {...stylex.props(styles.head)}>
          <h2 id={titleId} {...stylex.props(styles.title)}>
            应用方案
          </h2>
          <p {...stylex.props(styles.summary)}>{TOTAL} 个配方方案</p>
        </header>

        <div {...stylex.props(styles.layout)}>
          <div {...stylex.props(styles.sheet, styles.indexSheet)}>
            <div aria-hidden="true" {...stylex.props(styles.indexHead)}>
              <span {...stylex.props(styles.indexLabel)}>全部方案</span>
              <span {...stylex.props(styles.indexCount)}>{position}</span>
            </div>
            <button
              ref={toggleRef}
              type="button"
              aria-expanded={indexOpen}
              aria-controls={listId}
              onClick={() => setIndexOpen((open) => !open)}
              {...stylex.props(styles.toggle, indexOpen && styles.toggleOpen)}
            >
              <span {...stylex.props(styles.toggleText)}>
                全部方案
                <span aria-hidden="true">·</span>
                <span {...stylex.props(styles.indexCount)}>{position}</span>
              </span>
              <ChevronDown
                size={18}
                strokeWidth={1.5}
                absoluteStrokeWidth
                aria-hidden="true"
                {...stylex.props(styles.toggleIcon, indexOpen && styles.toggleIconOpen)}
              />
            </button>
            <div
              id={listId}
              {...stylex.props(styles.disclosure, indexOpen && styles.disclosureOpen)}
            >
              <div {...stylex.props(styles.disclosureInner)}>
                <div
                  role="tablist"
                  aria-orientation="vertical"
                  aria-label="应用方案列表"
                  {...stylex.props(styles.tablist)}
                >
                  {FLAT_FORMULAS.map((item, index) => {
                    const selected = index === active;
                    return (
                      <button
                        key={item.id}
                        ref={(node) => {
                          tabRefs.current[index] = node;
                        }}
                        id={tabId(index)}
                        type="button"
                        role="tab"
                        aria-selected={selected}
                        aria-controls={panelId}
                        tabIndex={selected ? 0 : -1}
                        onClick={() => choose(index)}
                        onKeyDown={(event) => onTabKeyDown(event, index)}
                        {...stylex.props(
                          styles.tab,
                          index === TOTAL - 1 && styles.tabLast,
                          selected && styles.tabSelected,
                        )}
                      >
                        <span
                          {...stylex.props(styles.tabNumber, selected && styles.tabNumberSelected)}
                        >
                          {padIndex(index)}
                        </span>
                        <span
                          {...stylex.props(styles.tabTitle, selected && styles.tabTitleSelected)}
                        >
                          {item.title}
                        </span>
                        <span {...stylex.props(styles.tabSubtitle)}>{item.subtitle}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div ref={sheetRef} {...stylex.props(styles.sheet, styles.contentSheet)}>
            <div
              id={panelId}
              role="tabpanel"
              aria-labelledby={tabId(active)}
              tabIndex={0}
              {...stylex.props(styles.panel)}
            >
              <AnimatePresence mode="wait" initial={false}>
                <m.div
                  key={formula.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: reduce ? 0 : 0.2, ease: EASE }}
                >
                  <header {...stylex.props(styles.sheetHead)}>
                    <p {...stylex.props(styles.sheetNumber)}>
                      <span>No.</span>
                      <span {...stylex.props(styles.sheetNumberCurrent)}>{padIndex(active)}</span>
                    </p>
                    <h3 {...stylex.props(styles.sheetTitle)}>{formula.title}</h3>
                    <p {...stylex.props(styles.sheetSubtitle)}>{formula.subtitle}</p>
                  </header>
                  <dl {...stylex.props(styles.fields)}>
                    <Field label="概述" lines={formula.overview} />
                    <Field label="功能" lines={formula.functions} />
                    <Field label="功能性成分" lines={formula.keyIngredients} />
                    <Field label="配方挑战" lines={formula.challenges} />
                    <Field label="质地" lines={formula.texture} />
                    <Field label="应用" lines={formula.applications} last />
                  </dl>
                </m.div>
              </AnimatePresence>
            </div>
            <div {...stylex.props(styles.pager)}>
              <button
                type="button"
                aria-disabled={!previous}
                onClick={() => step(active - 1)}
                {...stylex.props(styles.pagerButton, !previous && styles.pagerDisabled)}
              >
                <span {...stylex.props(styles.pagerAction)}>
                  <ArrowLeft size={16} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />
                  上一个
                </span>
                <span {...stylex.props(styles.pagerTitle, !previous && styles.pagerTitleDisabled)}>
                  {previous ? `${padIndex(active - 1)} ${previous.title}` : " "}
                </span>
              </button>
              <button
                type="button"
                aria-disabled={!next}
                onClick={() => step(active + 1)}
                {...stylex.props(
                  styles.pagerButton,
                  styles.pagerNext,
                  !next && styles.pagerDisabled,
                )}
              >
                <span {...stylex.props(styles.pagerAction)}>
                  下一个
                  <ArrowRight size={16} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />
                </span>
                <span {...stylex.props(styles.pagerTitle, !next && styles.pagerTitleDisabled)}>
                  {next ? `${padIndex(active + 1)} ${next.title}` : " "}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
