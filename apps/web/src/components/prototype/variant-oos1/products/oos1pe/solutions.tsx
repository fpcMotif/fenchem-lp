import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { m } from "motion/react";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
} from "react";

import { EASE } from "@/components/prototype/motion-constants";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { SOLUTION_ITEMS, type SolutionItem } from "../../products-data";
import { padIndex } from "../shared/derived";

const BLUSH = "#f8f2f3";
const BLUSH_RULE = "#e8d9dc";
const PAPER = "#ffffff";
const PAPER_RULE = "#efe7e8";
const INK = "#1a1a1a";
const BODY_TEXT = "#4d4d4d";
const MUTED = "#6b6b70";
const ACCENT = colors.brandGreen700;
const FOCUS = colors.brandBlue700;
const EASE_OUT_CSS = "cubic-bezier(0.22, 1, 0.36, 1)";
const BODY_FONT =
  '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif';
const NUMERAL_FONT = '"Inter Tight", "Noto Sans SC", sans-serif';

const TABLET = "@media (min-width: 768px) and (max-width: 1279.98px)";
const DESKTOP = breakpoints.xl;
const MD = breakpoints.md;
const LG = breakpoints.lg;
const WIDE_QUERY = "(min-width: 1024px)";
const INSET = "min(120px, 8.333vw)";
const HEADER_HEIGHT = 80;
const STICKY_TOP = HEADER_HEIGHT + 24;
const SPY_LINE = STICKY_TOP + 48;
const GUTTER = 24;
const TWELVE = "repeat(12, minmax(0, 1fr))";
const LABEL_COLUMNS = { default: "minmax(0, 1fr)", [MD]: "112px minmax(0, 1fr)" } as const;

type FieldKey =
  | "overview"
  | "functions"
  | "keyIngredients"
  | "challenges"
  | "texture"
  | "applications";

const FIELDS: { key: FieldKey; label: string; inline: boolean }[] = [
  { key: "overview", label: "概述", inline: false },
  { key: "functions", label: "功能", inline: true },
  { key: "keyIngredients", label: "功能性成分", inline: false },
  { key: "challenges", label: "配方挑战", inline: false },
  { key: "texture", label: "质地", inline: true },
  { key: "applications", label: "应用", inline: true },
];

const subscribeWide = (notify: () => void) => {
  const query = window.matchMedia(WIDE_QUERY);
  query.addEventListener("change", notify);
  return () => query.removeEventListener("change", notify);
};

const useWide = () =>
  useSyncExternalStore(
    subscribeWide,
    () => window.matchMedia(WIDE_QUERY).matches,
    () => false,
  );

const focusRing = {
  outlineStyle: { default: "none", ":focus-visible": "solid" },
  outlineWidth: 2,
  outlineColor: FOCUS,
} as const;

const styles = stylex.create({
  section: {
    paddingTop: { default: 64, [DESKTOP]: 96 },
    paddingBottom: { default: 72, [DESKTOP]: 112 },
    scrollMarginTop: HEADER_HEIGHT,
    backgroundColor: BLUSH,
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
    marginBottom: { default: 24, [DESKTOP]: 48 },
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
    rowGap: 16,
    alignItems: "start",
    scrollMarginTop: STICKY_TOP,
  },

  tablist: {
    position: { default: "relative", [LG]: "sticky" },
    top: { default: 0, [LG]: STICKY_TOP },
    gridColumn: { default: "1 / -1", [LG]: "1 / 4" },
    display: "flex",
    flexDirection: { default: "row", [LG]: "column" },
    overflowX: { default: "auto", [LG]: "visible" },
    marginInline: { default: -16, [TABLET]: -40, [LG]: 0 },
    paddingInline: { default: 16, [TABLET]: 40, [LG]: 0 },
    scrollbarWidth: "none",
    scrollPaddingInline: { default: 16, [TABLET]: 40 },
    borderBottomWidth: { default: 1, [LG]: 0 },
    borderBottomStyle: "solid",
    borderBottomColor: BLUSH_RULE,
    borderTopWidth: { default: 0, [LG]: 1 },
    borderTopStyle: "solid",
    borderTopColor: INK,
  },
  tab: {
    position: "relative",
    display: "flex",
    alignItems: "baseline",
    gap: { default: 8, [LG]: 14 },
    flexShrink: 0,
    minHeight: { default: 48, [LG]: 52 },
    paddingBlock: { default: 13, [LG]: 14 },
    paddingInline: { default: 12, [LG]: 16 },
    borderWidth: 0,
    borderBottomWidth: { default: 0, [LG]: 1 },
    borderBottomStyle: "solid",
    borderBottomColor: BLUSH_RULE,
    backgroundColor: {
      default: "transparent",
      ":hover": { default: "transparent", [LG]: "rgba(255, 255, 255, 0.6)" },
    },
    fontFamily: "inherit",
    textAlign: "start",
    whiteSpace: { default: "nowrap", [LG]: "normal" },
    color: { default: BODY_TEXT, ":hover": FOCUS },
    cursor: "pointer",
    transitionProperty: "color, background-color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    ...focusRing,
    outlineOffset: -2,
    "::after": {
      content: '""',
      position: "absolute",
      backgroundColor: ACCENT,
      insetInlineStart: { default: 12, [LG]: 0 },
      insetInlineEnd: { default: 12, [LG]: "auto" },
      bottom: 0,
      top: { default: "auto", [LG]: 0 },
      width: { default: "auto", [LG]: 2 },
      height: { default: 2, [LG]: "auto" },
      transform: { default: "scaleX(0)", [LG]: "scaleY(0)" },
      transformOrigin: { default: "left center", [LG]: "center top" },
      transitionProperty: "transform",
      transitionDuration: "300ms",
      transitionTimingFunction: EASE_OUT_CSS,
    },
  },
  tabSelected: {
    backgroundColor: { default: "transparent", [LG]: PAPER },
    color: { default: INK, ":hover": INK },
    "::after": {
      transform: "scale(1)",
    },
  },
  tabIndex: {
    flexShrink: 0,
    width: { default: "auto", [LG]: 20 },
    fontFamily: NUMERAL_FONT,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "22px",
    letterSpacing: "0.02em",
    fontVariantNumeric: "tabular-nums",
    color: MUTED,
  },
  tabIndexSelected: {
    color: ACCENT,
  },
  tabTitle: {
    fontSize: 15,
    fontWeight: 400,
    lineHeight: "22px",
    letterSpacing: "0.02em",
    color: "inherit",
  },
  tabTitleSelected: {
    fontWeight: 500,
  },

  paperColumn: {
    gridColumn: { default: "1 / -1", [LG]: "4 / 11" },
    minWidth: 0,
  },
  paper: {
    minHeight: { default: 0, [LG]: 760 },
    display: "flex",
    flexDirection: "column",
    backgroundColor: PAPER,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: BLUSH_RULE,
    boxShadow: "0 1px 2px rgba(80, 40, 50, 0.04)",
  },
  sheet: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    paddingTop: { default: 24, [MD]: 36, [DESKTOP]: 40 },
    paddingInline: { default: 20, [MD]: 32, [DESKTOP]: 40 },
  },
  sheetHead: {
    display: "grid",
    gridTemplateColumns: LABEL_COLUMNS,
    columnGap: GUTTER,
    rowGap: 8,
    paddingBottom: { default: 24, [MD]: 28 },
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: INK,
  },
  sheetNumber: {
    margin: 0,
    fontFamily: NUMERAL_FONT,
    fontSize: { default: 20, [MD]: 24 },
    fontWeight: 500,
    lineHeight: { default: "28px", [MD]: "32px" },
    letterSpacing: "0.01em",
    fontVariantNumeric: "tabular-nums",
    color: ACCENT,
  },
  sheetTotal: {
    marginInlineStart: 4,
    fontSize: 13,
    color: MUTED,
  },
  sheetTitle: {
    margin: 0,
    fontSize: { default: 22, [MD]: 24 },
    fontWeight: 500,
    lineHeight: { default: "30px", [MD]: "32px" },
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
    flexGrow: 1,
  },
  field: {
    display: "grid",
    gridTemplateColumns: LABEL_COLUMNS,
    columnGap: GUTTER,
    rowGap: 6,
    paddingBlock: { default: 16, [MD]: 18 },
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: PAPER_RULE,
    scrollMarginTop: STICKY_TOP,
    outlineStyle: "none",
  },
  fieldLast: {
    borderBottomWidth: 0,
  },
  fieldLabel: {
    margin: 0,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "26px",
    letterSpacing: "0.04em",
    color: MUTED,
  },
  stack: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  stackLine: {
    position: "relative",
    paddingInlineStart: 16,
    maxWidth: "36em",
    fontSize: 15,
    lineHeight: "26px",
    color: INK,
    textWrap: "pretty",
    "::before": {
      content: '"–"',
      position: "absolute",
      insetInlineStart: 0,
      color: MUTED,
    },
  },
  inline: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "baseline",
    columnGap: 0,
    rowGap: 2,
    margin: 0,
    padding: 0,
    listStyleType: "none",
    fontSize: 15,
    lineHeight: "26px",
    color: INK,
  },
  inlineDot: {
    paddingInline: 10,
    color: MUTED,
  },

  foot: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
    columnGap: GUTTER,
    marginTop: { default: 8, [MD]: 16 },
    marginInline: { default: -20, [MD]: -32, [DESKTOP]: -40 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: BLUSH_RULE,
  },
  footButton: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    minWidth: 0,
    minHeight: 72,
    paddingBlock: 16,
    paddingInline: { default: 20, [MD]: 32, [DESKTOP]: 40 },
    borderWidth: 0,
    backgroundColor: { default: "transparent", ":hover": BLUSH },
    fontFamily: "inherit",
    textAlign: "start",
    color: { default: INK, ":hover": FOCUS },
    cursor: "pointer",
    transitionProperty: "color, background-color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    ...focusRing,
    outlineOffset: -2,
  },
  footNext: {
    gridColumn: 2,
    alignItems: "end",
    textAlign: "end",
  },
  footLabel: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "0.08em",
    color: MUTED,
  },
  footTitle: {
    maxWidth: "100%",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    fontSize: 15,
    fontWeight: 500,
    lineHeight: "22px",
    letterSpacing: "0.02em",
    color: "inherit",
  },

  toc: {
    display: { default: "none", [LG]: "block" },
    position: "sticky",
    top: STICKY_TOP,
    gridColumn: "11 / 13",
  },
  tocTitle: {
    margin: 0,
    paddingBottom: 12,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "0.08em",
    color: MUTED,
  },
  tocList: {
    margin: 0,
    padding: 0,
    listStyleType: "none",
    borderInlineStartWidth: 1,
    borderInlineStartStyle: "solid",
    borderInlineStartColor: BLUSH_RULE,
  },
  tocItem: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    width: "100%",
    minHeight: 40,
    paddingBlock: 0,
    paddingInlineStart: 16,
    paddingInlineEnd: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    fontSize: 14,
    lineHeight: "20px",
    letterSpacing: "0.02em",
    textAlign: "start",
    color: { default: BODY_TEXT, ":hover": FOCUS },
    cursor: "pointer",
    transitionProperty: "color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    ...focusRing,
    outlineOffset: -2,
    "::before": {
      content: '""',
      position: "absolute",
      insetBlock: 8,
      insetInlineStart: -1,
      width: 2,
      backgroundColor: ACCENT,
      transform: "scaleY(0)",
      transitionProperty: "transform",
      transitionDuration: "200ms",
      transitionTimingFunction: EASE_OUT_CSS,
    },
  },
  tocItemCurrent: {
    fontWeight: 500,
    color: { default: INK, ":hover": INK },
    "::before": {
      transform: "scaleY(1)",
    },
  },
  tocItemDisabled: {
    color: { default: "#a9a3a5", ":hover": "#a9a3a5" },
    cursor: "not-allowed",
  },
});

function FieldValue({ lines, inline }: { lines: string[]; inline: boolean }) {
  if (inline) {
    return (
      <ul {...stylex.props(styles.inline)}>
        {lines.map((line, index) => (
          <li key={line}>
            {index > 0 && (
              <span aria-hidden="true" {...stylex.props(styles.inlineDot)}>
                ·
              </span>
            )}
            {line}
          </li>
        ))}
      </ul>
    );
  }
  return (
    <ul {...stylex.props(styles.stack)}>
      {lines.map((line) => (
        <li key={line} {...stylex.props(styles.stackLine)}>
          {line}
        </li>
      ))}
    </ul>
  );
}

function FootButton({
  direction,
  item,
  onSelect,
}: {
  direction: "prev" | "next";
  item: SolutionItem;
  onSelect: () => void;
}) {
  const isNext = direction === "next";
  return (
    <button
      type="button"
      onClick={onSelect}
      {...stylex.props(styles.footButton, isNext && styles.footNext)}
    >
      <span {...stylex.props(styles.footLabel)}>
        {!isNext && (
          <ArrowLeft size={14} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />
        )}
        {isNext ? "下一个" : "上一个"}
        {isNext && (
          <ArrowRight size={14} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />
        )}
      </span>
      <span {...stylex.props(styles.footTitle)}>{item.title}</span>
    </button>
  );
}

export function Solutions() {
  const reduce = useReducedMotion();
  const wide = useWide();
  const baseId = useId();
  const titleId = `${baseId}-title`;
  const panelId = `${baseId}-panel`;
  const tocTitleId = `${baseId}-toc`;
  const tabId = (index: number) => `${baseId}-tab-${index}`;
  const fieldId = (key: FieldKey) => `${baseId}-field-${key}`;

  const [activeIndex, setActiveIndex] = useState(0);
  const [activeField, setActiveField] = useState<FieldKey>("overview");
  const [hasSwitched, setHasSwitched] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tabRowRef = useRef<HTMLDivElement>(null);
  const layoutRef = useRef<HTMLDivElement>(null);
  const spyRef = useRef({ lockUntil: 0, pinned: false });

  const item = SOLUTION_ITEMS[activeIndex] ?? SOLUTION_ITEMS[0];
  const total = SOLUTION_ITEMS.length;
  const prevItem = SOLUTION_ITEMS[activeIndex - 1];
  const nextItem = SOLUTION_ITEMS[activeIndex + 1];
  const visibleFields = FIELDS.filter((field) => item[field.key].length > 0);
  const lastVisibleKey = visibleFields[visibleFields.length - 1]?.key;

  const measure = useCallback(() => {
    const viewport = window.innerHeight;
    const remaining = document.documentElement.scrollHeight - viewport - window.scrollY;
    const reach = viewport * 0.5;
    const nearBottom = remaining < reach ? 1 - remaining / reach : 0;
    const line = SPY_LINE + (viewport - SPY_LINE - HEADER_HEIGHT) * nearBottom;
    let current: FieldKey = "overview";
    for (const field of FIELDS) {
      const node = document.getElementById(`${baseId}-field-${field.key}`);
      if (node && node.getBoundingClientRect().top <= line) current = field.key;
    }
    setActiveField(current);
  }, [baseId]);

  const holdSpy = () => {
    spyRef.current.lockUntil = performance.now() + 1000;
    spyRef.current.pinned = true;
  };

  useEffect(() => {
    if (!wide) return;
    const spy = spyRef.current;
    let frame = 0;
    const onScroll = () => {
      if (performance.now() < spy.lockUntil) return;
      spy.pinned = false;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        measure();
      });
    };
    const onScrollEnd = () => {
      spy.lockUntil = 0;
    };
    const onResize = () => {
      if (!spy.pinned) measure();
    };
    if (!spy.pinned) measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scrollend", onScrollEnd);
    window.addEventListener("resize", onResize);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scrollend", onScrollEnd);
      window.removeEventListener("resize", onResize);
    };
  }, [wide, measure, activeIndex]);

  useEffect(() => {
    const row = tabRowRef.current;
    const tab = tabRefs.current[activeIndex];
    if (wide || !row || !tab) return;
    const left = tab.offsetLeft - (row.clientWidth - tab.offsetWidth) / 2;
    row.scrollTo({ left: Math.max(0, left), behavior: reduce ? "auto" : "smooth" });
  }, [activeIndex, wide, reduce]);

  const select = (index: number, options: { focusTab?: boolean; reveal?: boolean } = {}) => {
    const next = (index + total) % total;
    setActiveIndex(next);
    setActiveField("overview");
    setHasSwitched(true);
    spyRef.current.pinned = false;
    if (options.focusTab) tabRefs.current[next]?.focus();
    const layout = layoutRef.current;
    if (options.reveal && layout && layout.getBoundingClientRect().top < HEADER_HEIGHT) {
      holdSpy();
      layout.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }
  };

  const onTabKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const moves: Record<string, number> = {
      ArrowDown: activeIndex + 1,
      ArrowRight: activeIndex + 1,
      ArrowUp: activeIndex - 1,
      ArrowLeft: activeIndex - 1,
      Home: 0,
      End: total - 1,
    };
    const target = moves[event.key];
    if (target === undefined) return;
    event.preventDefault();
    select(target, { focusTab: true });
  };

  const jumpTo = (key: FieldKey) => {
    const node = document.getElementById(fieldId(key));
    if (!node) return;
    setActiveField(key);
    holdSpy();
    node.focus({ preventScroll: true });
    node.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <section id="products-solutions" aria-labelledby={titleId} {...stylex.props(styles.section)}>
      <div {...stylex.props(styles.shell)}>
        <header {...stylex.props(styles.head)}>
          <h2 id={titleId} {...stylex.props(styles.title)}>
            应用方案
          </h2>
        </header>

        <div ref={layoutRef} {...stylex.props(styles.layout)}>
          <div
            ref={tabRowRef}
            role="tablist"
            aria-labelledby={titleId}
            aria-orientation={wide ? "vertical" : "horizontal"}
            onKeyDown={onTabKeyDown}
            {...stylex.props(styles.tablist)}
          >
            {SOLUTION_ITEMS.map((solution, index) => {
              const isSelected = index === activeIndex;
              return (
                <button
                  key={solution.id}
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  id={tabId(index)}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={panelId}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => select(index, { reveal: true })}
                  {...stylex.props(styles.tab, isSelected && styles.tabSelected)}
                >
                  <span {...stylex.props(styles.tabIndex, isSelected && styles.tabIndexSelected)}>
                    {padIndex(index)}
                  </span>
                  <span {...stylex.props(styles.tabTitle, isSelected && styles.tabTitleSelected)}>
                    {solution.title}
                  </span>
                </button>
              );
            })}
          </div>

          <div {...stylex.props(styles.paperColumn)}>
            <div
              id={panelId}
              role="tabpanel"
              aria-labelledby={tabId(activeIndex)}
              {...stylex.props(styles.paper)}
            >
              <m.article
                key={item.id}
                initial={hasSwitched ? { opacity: 0, y: 6 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduce ? 0 : 0.24, ease: EASE }}
                {...stylex.props(styles.sheet)}
              >
                <header {...stylex.props(styles.sheetHead)}>
                  <p {...stylex.props(styles.sheetNumber)}>
                    {padIndex(activeIndex)}
                    <span {...stylex.props(styles.sheetTotal)}>/ {padIndex(total - 1)}</span>
                  </p>
                  <div>
                    <h3 {...stylex.props(styles.sheetTitle)}>{item.title}</h3>
                    <p {...stylex.props(styles.sheetSubtitle)}>{item.subtitle}</p>
                  </div>
                </header>

                <div {...stylex.props(styles.fields)}>
                  {visibleFields.map((field) => (
                    <section
                      key={field.key}
                      id={fieldId(field.key)}
                      aria-labelledby={`${fieldId(field.key)}-label`}
                      tabIndex={-1}
                      {...stylex.props(
                        styles.field,
                        field.key === lastVisibleKey && styles.fieldLast,
                      )}
                    >
                      <h4 id={`${fieldId(field.key)}-label`} {...stylex.props(styles.fieldLabel)}>
                        {field.label}
                      </h4>
                      <FieldValue lines={item[field.key]} inline={field.inline} />
                    </section>
                  ))}
                </div>

                <nav aria-label="上一个与下一个方案" {...stylex.props(styles.foot)}>
                  {prevItem && (
                    <FootButton
                      direction="prev"
                      item={prevItem}
                      onSelect={() => select(activeIndex - 1, { reveal: true })}
                    />
                  )}
                  {nextItem && (
                    <FootButton
                      direction="next"
                      item={nextItem}
                      onSelect={() => select(activeIndex + 1, { reveal: true })}
                    />
                  )}
                </nav>
              </m.article>
            </div>
          </div>

          <nav aria-labelledby={tocTitleId} {...stylex.props(styles.toc)}>
            <p id={tocTitleId} {...stylex.props(styles.tocTitle)}>
              本页
            </p>
            <ul {...stylex.props(styles.tocList)}>
              {FIELDS.map((field) => {
                const isEmpty = item[field.key].length === 0;
                const isCurrent = !isEmpty && activeField === field.key;
                return (
                  <li key={field.key}>
                    <button
                      type="button"
                      disabled={isEmpty}
                      aria-current={isCurrent ? "location" : undefined}
                      aria-controls={isEmpty ? undefined : fieldId(field.key)}
                      onClick={() => jumpTo(field.key)}
                      {...stylex.props(
                        styles.tocItem,
                        isCurrent && styles.tocItemCurrent,
                        isEmpty && styles.tocItemDisabled,
                      )}
                    >
                      {field.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}
