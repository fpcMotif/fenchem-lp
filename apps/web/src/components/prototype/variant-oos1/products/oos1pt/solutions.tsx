import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ArrowLeft, ArrowRight } from "@fenchem-lp/ui/components/lucide";
import { AnimatePresence, m } from "@/compat/motion";
import { createEffect, createSignal, createUniqueId, For, Show } from "solid-js";

import { createExternalStore } from "@/compat/external-store";
import { EASE } from "@/components/prototype/motion-constants";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { SOLUTION_ITEMS, type SolutionItem } from "../../products-data";
import { padIndex } from "../shared/derived";

const INK = "#1a1a1a";
const BODY_TEXT = "#4d4d4d";
const MUTED_LABEL = "#6b6b70";
const DISABLED_TEXT = "#a6a8a3";
const GROUND = "#f6f8f5";
const SHEET = "#ffffff";
const SHEET_BORDER = "#d9e0d5";
const SHEET_RULE = "#e3e9e0";
const FACTS_TINT = "#f3f6f1";
const NAV_RULE = "#dfe5dc";
const NAV_HOVER = "#eef2eb";
const NAV_SELECTED = "#e7ede4";
const ACCENT = colors.brandGreen700;
const BODY_FONT =
  '"Source Han Sans SC", "Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif';
const NUMERAL_FONT = '"Inter Tight", "Source Han Sans SC", "Noto Sans SC", sans-serif';

const TABLET = "@media (min-width: 768px) and (max-width: 1279.98px)";
const DESKTOP = "@media (min-width: 1280px)";
const MD = "@media (min-width: 768px)";
const LG = "@media (min-width: 1024px)";
const MD_ONLY = "@media (min-width: 768px) and (max-width: 1023.98px)";
const LG_ONLY = "@media (min-width: 1024px) and (max-width: 1279.98px)";
const INSET = "min(120px, 8.333vw)";
const HEADER_HEIGHT = 80;
const STICKY_TOP = HEADER_HEIGHT + 16;
const GUTTER = 24;
const TWELVE = "repeat(12, minmax(0, 1fr))";
const WIDE_QUERY = "(min-width: 1024px)";
const LAST_INDEX = SOLUTION_ITEMS.length - 1;

const KEY_STEPS: Record<string, (index: number) => number> = {
  ArrowDown: (index) => index + 1,
  ArrowRight: (index) => index + 1,
  ArrowUp: (index) => index - 1,
  ArrowLeft: (index) => index - 1,
  Home: () => 0,
  End: () => LAST_INDEX,
};

function subscribeWide(onChange: () => void) {
  const query = window.matchMedia(WIDE_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function useWideLayout() {
  return createExternalStore(
    subscribeWide,
    () => window.matchMedia(WIDE_QUERY).matches,
    () => false,
  );
}

const focusRing = {
  outlineStyle: { default: "none", ":focus-visible": "solid" },
  outlineWidth: 2,
  outlineColor: colors.brandBlue700,
  outlineOffset: -2,
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
    marginBottom: { default: 24, [LG_ONLY]: 32, [DESKTOP]: 48 },
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
    rowGap: { default: 16, [MD]: 24 },
    alignItems: "start",
    scrollMarginTop: STICKY_TOP,
  },
  strip: {
    gridColumn: { default: "1 / -1", [LG]: "1 / 4" },
    position: { default: "relative", [LG]: "sticky" },
    top: { default: "auto", [LG]: STICKY_TOP },
    display: "flex",
    flexDirection: { default: "row", [LG]: "column" },
    overflowX: { default: "auto", [LG]: "visible" },
    scrollbarWidth: "none",
    marginInline: { default: -16, [MD_ONLY]: -40, [LG]: 0 },
    paddingInline: { default: 16, [MD_ONLY]: 40, [LG]: 0 },
    borderTopWidth: { default: 0, [LG]: 1 },
    borderTopStyle: "solid",
    borderTopColor: INK,
    borderBottomWidth: { default: 1, [LG]: 0 },
    borderBottomStyle: "solid",
    borderBottomColor: NAV_RULE,
  },
  tab: {
    position: "relative",
    display: "flex",
    alignItems: "baseline",
    gap: 12,
    flexShrink: 0,
    minHeight: { default: 48, [LG]: 56 },
    paddingBlock: { default: 12, [LG]: 16 },
    paddingInline: { default: 12, [LG]: 16 },
    borderWidth: 0,
    borderBottomWidth: { default: 0, [LG]: 1 },
    borderBottomStyle: "solid",
    borderBottomColor: NAV_RULE,
    backgroundColor: { default: "transparent", ":hover": NAV_HOVER },
    fontFamily: "inherit",
    textAlign: "start",
    whiteSpace: "nowrap",
    color: { default: BODY_TEXT, ":hover": colors.brandBlue700 },
    cursor: "pointer",
    transitionProperty: "color, background-color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    ...focusRing,
    "::after": {
      content: '""',
      position: "absolute",
      top: { default: "auto", [LG]: 0 },
      bottom: 0,
      left: 0,
      right: { default: 0, [LG]: "auto" },
      width: { default: "auto", [LG]: 2 },
      height: { default: 2, [LG]: "auto" },
      backgroundColor: ACCENT,
      opacity: 0,
      transitionProperty: "opacity",
      transitionDuration: "200ms",
      transitionTimingFunction: "ease",
    },
  },
  tabSelected: {
    backgroundColor: { default: NAV_SELECTED, ":hover": NAV_SELECTED },
    color: { default: INK, ":hover": INK },
    "::after": {
      opacity: 1,
    },
  },
  tabIndex: {
    flexShrink: 0,
    fontFamily: NUMERAL_FONT,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: MUTED_LABEL,
  },
  tabIndexSelected: {
    color: ACCENT,
  },
  tabTitle: {
    fontSize: 15,
    fontWeight: 400,
    lineHeight: "24px",
    letterSpacing: "0.02em",
  },
  tabTitleSelected: {
    fontWeight: 500,
  },

  sheet: {
    gridColumn: { default: "1 / -1", [LG]: "4 / 13" },
    minWidth: 0,
    backgroundColor: SHEET,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: SHEET_BORDER,
    borderRadius: 2,
    boxShadow: "0 1px 2px rgba(31, 45, 31, 0.04)",
    ...focusRing,
  },
  sheetContent: {
    minHeight: { default: 0, [LG]: 600 },
  },
  sheetHead: {
    paddingTop: { default: 24, [TABLET]: 32, [DESKTOP]: 40 },
    paddingBottom: { default: 20, [MD]: 28 },
    paddingInline: { default: 20, [TABLET]: 32, [DESKTOP]: 40 },
  },
  sheetIndex: {
    margin: 0,
    fontFamily: NUMERAL_FONT,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: ACCENT,
  },
  sheetTotal: {
    color: MUTED_LABEL,
  },
  sheetTitle: {
    margin: 0,
    marginTop: 12,
    fontSize: { default: 22, [DESKTOP]: 26 },
    fontWeight: 500,
    lineHeight: { default: "30px", [DESKTOP]: "34px" },
    letterSpacing: "0.04em",
    color: INK,
    textWrap: "balance",
  },
  sheetSubtitle: {
    margin: 0,
    marginTop: 8,
    maxWidth: "36em",
    fontSize: 15,
    lineHeight: "24px",
    color: BODY_TEXT,
    textWrap: "pretty",
  },

  grid: {
    margin: 0,
    display: "grid",
    paddingInline: { default: 20, [TABLET]: 8, [DESKTOP]: 16 },
  },
  columnsEven: {
    gridTemplateColumns: { default: "minmax(0, 1fr)", [MD]: "repeat(3, minmax(0, 1fr))" },
  },
  columnsNarrowLast: {
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [MD]: "minmax(0, 5fr) minmax(0, 5fr) minmax(0, 3fr)",
    },
  },
  facts: {
    backgroundColor: FACTS_TINT,
    borderBlockWidth: 1,
    borderBlockStyle: "solid",
    borderBlockColor: SHEET_RULE,
  },
  fact: {
    display: { default: "grid", [MD]: "block" },
    gridTemplateColumns: "72px minmax(0, 1fr)",
    columnGap: 16,
    paddingBlock: { default: 12, [MD]: 16 },
    paddingInline: { default: 0, [MD]: 24 },
  },
  divided: {
    borderTopWidth: { default: 1, [MD]: 0 },
    borderTopStyle: "solid",
    borderTopColor: SHEET_RULE,
    borderInlineStartWidth: { default: 0, [MD]: 1 },
    borderInlineStartStyle: "solid",
    borderInlineStartColor: SHEET_RULE,
  },
  factLabel: {
    margin: 0,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "22px",
    letterSpacing: "0.08em",
    color: MUTED_LABEL,
  },
  factValue: {
    margin: 0,
    marginTop: { default: 0, [MD]: 4 },
  },
  factList: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    margin: 0,
    padding: 0,
    listStyleType: "none",
    fontSize: 14,
    lineHeight: "22px",
    color: INK,
  },
  column: {
    paddingTop: { default: 20, [MD]: 24 },
    paddingBottom: { default: 20, [MD]: 32 },
    paddingInline: { default: 0, [MD]: 24 },
  },
  columnLabel: {
    margin: 0,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.06em",
    color: MUTED_LABEL,
  },
  columnValue: {
    margin: 0,
    marginTop: 12,
  },
  lines: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    margin: 0,
    padding: 0,
    listStyleType: "none",
    fontSize: 14,
    lineHeight: "22px",
    color: BODY_TEXT,
    textWrap: "pretty",
  },
  linesInk: {
    color: INK,
  },
  dash: {
    fontSize: 14,
    lineHeight: "22px",
    color: MUTED_LABEL,
  },
  visuallyHidden: {
    position: "absolute",
    width: 1,
    height: 1,
    overflow: "hidden",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
  },

  foot: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: SHEET_RULE,
  },
  footButton: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: 2,
    minWidth: 0,
    minHeight: 72,
    paddingBlock: 14,
    paddingInline: { default: 20, [TABLET]: 32, [DESKTOP]: 40 },
    borderWidth: 0,
    backgroundColor: { default: "transparent", ":hover": FACTS_TINT },
    fontFamily: "inherit",
    textAlign: "start",
    color: { default: INK, ":hover": colors.brandBlue700 },
    cursor: "pointer",
    transitionProperty: "color, background-color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    ...focusRing,
  },
  footNext: {
    alignItems: "flex-end",
    textAlign: "end",
    borderInlineStartWidth: 1,
    borderInlineStartStyle: "solid",
    borderInlineStartColor: SHEET_RULE,
  },
  footDisabled: {
    backgroundColor: { default: "transparent", ":hover": "transparent" },
    color: { default: DISABLED_TEXT, ":hover": DISABLED_TEXT },
    cursor: "default",
  },
  footLabel: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.04em",
  },
  footTitle: {
    maxWidth: "100%",
    overflow: "hidden",
    fontSize: 14,
    lineHeight: "22px",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    color: BODY_TEXT,
  },
});

function Fact(props: { label: string; values: string[]; divided: boolean }) {
  return (
    <div {...stylex.attrs(styles.fact, props.divided && styles.divided)}>
      <dt {...stylex.attrs(styles.factLabel)}>{props.label}</dt>
      <dd {...stylex.attrs(styles.factValue)}>
        <ul {...stylex.attrs(styles.factList)}>
          <For each={props.values}>{(value) => <li>{value}</li>}</For>
        </ul>
      </dd>
    </div>
  );
}

function Column(props: { label: string; lines: string[]; divided: boolean; ink?: boolean }) {
  return (
    <div {...stylex.attrs(styles.column, props.divided && styles.divided)}>
      <dt {...stylex.attrs(styles.columnLabel)}>{props.label}</dt>
      <dd {...stylex.attrs(styles.columnValue)}>
        {props.lines.length > 0 ? (
          <ul {...stylex.attrs(styles.lines, props.ink && styles.linesInk)}>
            <For each={props.lines}>{(line) => <li>{line}</li>}</For>
          </ul>
        ) : (
          <>
            <span aria-hidden="true" {...stylex.attrs(styles.dash)}>
              —
            </span>
            <span {...stylex.attrs(styles.visuallyHidden)}>Not provided</span>
          </>
        )}
      </dd>
    </div>
  );
}

function SheetBody(props: { item: SolutionItem; index: number }) {
  const item = props.item;
  const columns = item.challenges.length > 0 ? styles.columnsEven : styles.columnsNarrowLast;
  return (
    <>
      <header {...stylex.attrs(styles.sheetHead)}>
        <p {...stylex.attrs(styles.sheetIndex)}>
          {padIndex(props.index)}
          <span {...stylex.attrs(styles.sheetTotal)}> / {padIndex(LAST_INDEX)}</span>
        </p>
        <h3 {...stylex.attrs(styles.sheetTitle)}>{item.title}</h3>
        <p {...stylex.attrs(styles.sheetSubtitle)}>{item.subtitle}</p>
      </header>
      <dl {...stylex.attrs(styles.grid, styles.facts, columns)}>
        <Fact label="功能" values={item.functions} divided={false} />
        <Fact label="质地" values={item.texture} divided />
        <Fact label="应用" values={item.applications} divided />
      </dl>
      <dl {...stylex.attrs(styles.grid, columns)}>
        <Column label="概述" lines={item.overview} divided={false} />
        <Column label="功能性成分" lines={item.keyIngredients} divided ink />
        <Column label="配方挑战" lines={item.challenges} divided />
      </dl>
    </>
  );
}

function FootButton(props: {
  direction: "prev" | "next";
  target: SolutionItem | undefined;
  onStep: () => void;
}) {
  const isNext = props.direction === "next";
  const label = isNext ? "下一个" : "上一个";
  return (
    <button
      type="button"
      aria-disabled={props.target ? undefined : "true"}
      onClick={() => {
        if (props.target) props.onStep();
      }}
      {...stylex.attrs(
        styles.footButton,
        isNext && styles.footNext,
        !props.target && styles.footDisabled,
      )}
    >
      <span {...stylex.attrs(styles.footLabel)}>
        {!isNext && (
          <ArrowLeft size={16} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />
        )}
        {label}
        {isNext && (
          <ArrowRight size={16} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />
        )}
      </span>
      {props.target && <span {...stylex.attrs(styles.footTitle)}>{props.target.title}</span>}
    </button>
  );
}

export function Solutions() {
  const reduce = useReducedMotion();
  const wide = useWideLayout();
  const baseId = createUniqueId();
  const titleId = `${baseId}-title`;
  const panelId = `${baseId}-panel`;
  const tabId = (index: number) => `${baseId}-tab-${index}`;
  const [activeIndex, setActiveIndex] = createSignal(0);
  const tabs: Array<HTMLButtonElement | undefined> = [];
  let strip: HTMLDivElement | undefined;
  let layout: HTMLDivElement | undefined;
  let sheet: HTMLDivElement | undefined;
  const active = () => SOLUTION_ITEMS[activeIndex()];

  createEffect(
    () => [activeIndex(), reduce()] as const,
    ([index, reduced]) => {
      const tab = tabs[index];
      if (!strip || !tab || strip.scrollWidth <= strip.clientWidth) return;
      strip.scrollTo({
        left: tab.offsetLeft - (strip.clientWidth - tab.offsetWidth) / 2,
        behavior: reduced ? "auto" : "smooth",
      });
    },
  );

  const onTabKeyDown = (event: KeyboardEvent, index: number) => {
    const step = KEY_STEPS[event.key];
    if (!step) return;
    event.preventDefault();
    const target = (step(index) + SOLUTION_ITEMS.length) % SOLUTION_ITEMS.length;
    setActiveIndex(target);
    tabs[target]?.focus();
  };

  const stepBy = (delta: number) => {
    setActiveIndex(activeIndex() + delta);
    const sheetTop = sheet?.getBoundingClientRect().top ?? HEADER_HEIGHT;
    if (sheetTop < HEADER_HEIGHT) {
      layout?.scrollIntoView({ behavior: reduce() ? "auto" : "smooth", block: "start" });
    }
  };

  return (
    <section id="products-solutions" aria-labelledby={titleId} {...stylex.attrs(styles.section)}>
      <div {...stylex.attrs(styles.shell)}>
        <header {...stylex.attrs(styles.head)}>
          <h2 id={titleId} {...stylex.attrs(styles.title)}>
            应用方案
          </h2>
        </header>
        <div ref={layout} {...stylex.attrs(styles.layout)}>
          <div
            ref={strip}
            role="tablist"
            aria-labelledby={titleId}
            aria-orientation={wide() ? "vertical" : "horizontal"}
            {...stylex.attrs(styles.strip)}
          >
            {SOLUTION_ITEMS.map((item, index) => {
              const selected = () => index === activeIndex();
              return (
                <button
                  ref={(node) => {
                    tabs[index] = node;
                  }}
                  type="button"
                  role="tab"
                  id={tabId(index)}
                  aria-selected={selected() ? "true" : "false"}
                  aria-controls={panelId}
                  tabindex={selected() ? 0 : -1}
                  onClick={() => setActiveIndex(index)}
                  onKeyDown={(event) => onTabKeyDown(event, index)}
                  {...stylex.attrs(styles.tab, selected() && styles.tabSelected)}
                >
                  <span {...stylex.attrs(styles.tabIndex, selected() && styles.tabIndexSelected)}>
                    {padIndex(index)}
                  </span>
                  <span {...stylex.attrs(styles.tabTitle, selected() && styles.tabTitleSelected)}>
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>
          <div
            ref={sheet}
            role="tabpanel"
            id={panelId}
            aria-labelledby={tabId(activeIndex())}
            tabindex={0}
            {...stylex.attrs(styles.sheet)}
          >
            <div {...stylex.attrs(styles.sheetContent)}>
              <AnimatePresence mode="wait" initial={false}>
                <Show when={active()} keyed>
                  {(item) => (
                    <m.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 0 }}
                      transition={{ duration: reduce() ? 0 : 0.18, ease: EASE }}
                    >
                      <SheetBody item={item} index={SOLUTION_ITEMS.indexOf(item)} />
                    </m.div>
                  )}
                </Show>
              </AnimatePresence>
            </div>
            <div {...stylex.attrs(styles.foot)}>
              <FootButton
                direction="prev"
                target={SOLUTION_ITEMS[activeIndex() - 1]}
                onStep={() => stepBy(-1)}
              />
              <FootButton
                direction="next"
                target={SOLUTION_ITEMS[activeIndex() + 1]}
                onStep={() => stepBy(1)}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
