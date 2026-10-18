import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ChevronLeft, ChevronRight } from "@fenchem-lp/ui/components/lucide";
import { AnimatePresence, m } from "@/compat/motion";
import { createEffect, createSignal, createUniqueId, flush, For, Show, untrack } from "solid-js";

import { EASE } from "@/components/prototype/motion-constants";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { SOLUTION_ITEMS, type SolutionItem } from "../../products-data";
import { padIndex } from "../shared/derived";
import { font, mq, ui } from "./theme.stylex";

const TABLET = mq.tablet;
const MD_ONLY = mq.mdOnly;
const DESKTOP = breakpoints.xl;
const LG = breakpoints.lg;
const MD = breakpoints.md;
const ACCENT = colors.brandGreen700;
const FOCUS = colors.brandBlue700;
const HEADER_HEIGHT = 80;
const SHEET_RULE = "#ebe8f5";
const LABEL_COLUMN = "136px minmax(0, 1fr)";
const SLIDE = 28;

const FIELD_LABEL = {
  overview: "概述",
  functions: "功能",
  keyIngredients: "功能性成分",
  challenges: "配方挑战",
  texture: "质地",
  applications: "应用",
} as const;

type FieldKey = keyof typeof FIELD_LABEL;

const PAGE_FIELDS: FieldKey[][] = [
  ["overview", "functions", "keyIngredients"],
  ["challenges", "texture", "applications"],
];

const PAGE_COUNT = PAGE_FIELDS.length;
const LAST_PAGE = PAGE_COUNT - 1;
const LAST_SOLUTION = SOLUTION_ITEMS.length - 1;

const fieldsOn = (item: SolutionItem, page: number) =>
  PAGE_FIELDS[page].filter((key) => item[key].length > 0);

// stylex.attrs with reactive (accessor) arguments resolves at runtime here, because
// the StyleX compiler tries to evaluate them at build time and throws.
const sxProps: typeof stylex.attrs = (...args) => stylex.attrs(...args);

const styles = stylex.create({
  section: {
    backgroundColor: ui.solutionsBand,
    color: ui.ink,
    fontFamily: font.body,
    paddingTop: { default: 64, [DESKTOP]: 96 },
    paddingBottom: { default: 72, [DESKTOP]: 112 },
    scrollMarginTop: HEADER_HEIGHT,
  },
  shell: {
    width: "100%",
    maxWidth: 1440,
    marginInline: "auto",
    boxSizing: "border-box",
    paddingInline: { default: 16, [TABLET]: 40, [DESKTOP]: "min(120px, 8.333vw)" },
  },
  title: {
    margin: 0,
    fontSize: { default: 26, [TABLET]: 28, [DESKTOP]: 32 },
    fontWeight: 400,
    lineHeight: { default: "34px", [TABLET]: "36px", [DESKTOP]: "40px" },
    letterSpacing: "0.04em",
    color: ui.ink,
  },

  tabScroller: {
    position: "relative",
    marginTop: { default: 24, [DESKTOP]: 32 },
    marginInline: { default: -16, [TABLET]: -40, [DESKTOP]: 0 },
    paddingInline: { default: 16, [TABLET]: 40, [DESKTOP]: 0 },
    overflowX: { default: "auto", [DESKTOP]: "visible" },
    scrollbarWidth: "none",
  },
  tablist: {
    display: { default: "flex", [DESKTOP]: "grid" },
    gridTemplateColumns: { default: null, [DESKTOP]: "repeat(10, auto)" },
    width: { default: "max-content", [DESKTOP]: "auto" },
    minWidth: "100%",
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: ui.solutionsRule,
  },
  tab: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 4,
    flexShrink: 0,
    minWidth: 0,
    minHeight: 64,
    paddingTop: 14,
    paddingBottom: 12,
    paddingInlineStart: { default: 12, [DESKTOP]: 0 },
    paddingInlineEnd: { default: 20, [DESKTOP]: 12 },
    boxSizing: "border-box",
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    textAlign: "start",
    color: { default: ui.body, ":hover": FOCUS },
    cursor: "pointer",
    transitionProperty: "color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: FOCUS,
    outlineOffset: { default: -2, [DESKTOP]: 2 },
    "::before": {
      content: '""',
      position: "absolute",
      insetInline: 0,
      top: -1,
      height: 2,
      backgroundColor: ACCENT,
      transform: "scaleX(0)",
      transformOrigin: "left center",
      transitionProperty: "transform",
      transitionDuration: "240ms",
      transitionTimingFunction: ui.ease,
    },
  },
  tabOn: {
    color: { default: ui.ink, ":hover": ui.ink },
    "::before": {
      transform: "scaleX(1)",
    },
  },
  tabNumber: {
    fontFamily: font.numeral,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: ui.muted,
    transitionProperty: "color",
    transitionDuration: "150ms",
  },
  tabNumberOn: {
    color: ACCENT,
  },
  tabTitle: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "20px",
    letterSpacing: "0.02em",
    whiteSpace: { default: "nowrap", [DESKTOP]: "normal" },
    textWrap: "balance",
    color: "inherit",
  },
  tabTitleOn: {
    fontWeight: 500,
  },

  sheet: {
    marginTop: { default: 16, [DESKTOP]: 24 },
    backgroundColor: ui.paper,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: ui.solutionsRule,
    borderRadius: 2,
    boxShadow: ui.sheetShadow,
    paddingInline: { default: 20, [TABLET]: 40, [DESKTOP]: 56 },
    paddingTop: { default: 24, [TABLET]: 36, [DESKTOP]: 44 },
    paddingBottom: { default: 12, [TABLET]: 20, [DESKTOP]: 24 },
    scrollMarginTop: HEADER_HEIGHT + 16,
  },
  sheetStack: {
    display: "grid",
    minHeight: { default: null, [DESKTOP]: 640 },
  },
  sheetLayer: {
    gridArea: "1 / 1",
    minWidth: 0,
  },
  sheetHead: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [MD_ONLY]: LABEL_COLUMN,
      [LG]: "136px minmax(0, 1fr) auto",
    },
    columnGap: 24,
    rowGap: 8,
    alignItems: "start",
    paddingBottom: { default: 20, [MD]: 28 },
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: ui.ink,
  },
  number: {
    fontFamily: font.numeral,
    fontSize: { default: 24, [MD]: 32 },
    fontWeight: 500,
    lineHeight: { default: "28px", [MD]: "34px" },
    letterSpacing: "-0.01em",
    fontVariantNumeric: "tabular-nums",
    color: ACCENT,
  },
  headTitle: {
    margin: 0,
    fontSize: { default: 22, [MD]: 24 },
    fontWeight: 500,
    lineHeight: { default: "30px", [MD]: "34px" },
    letterSpacing: "0.04em",
    color: ui.ink,
    textWrap: "balance",
  },
  headSubtitle: {
    margin: 0,
    marginTop: 8,
    maxWidth: "32em",
    fontSize: 15,
    lineHeight: "24px",
    color: ui.body,
    textWrap: "pretty",
  },
  pageIndex: {
    display: { default: "none", [LG]: "flex" },
    flexDirection: "column",
    gap: 2,
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  pageIndexButton: {
    display: "flex",
    alignItems: "baseline",
    gap: 12,
    width: "100%",
    minHeight: 36,
    paddingBlock: 8,
    paddingInline: 12,
    boxSizing: "border-box",
    borderWidth: 0,
    borderInlineStartWidth: 2,
    borderInlineStartStyle: "solid",
    borderInlineStartColor: SHEET_RULE,
    backgroundColor: { default: "transparent", ":hover": ui.solutionsTint },
    fontFamily: "inherit",
    textAlign: "start",
    color: { default: ui.body, ":hover": FOCUS },
    cursor: "pointer",
    transitionProperty: "color, background-color, border-color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: FOCUS,
    outlineOffset: -2,
  },
  pageIndexButtonOn: {
    borderInlineStartColor: ACCENT,
    color: { default: ui.ink, ":hover": ui.ink },
  },
  pageIndexLabel: {
    flexShrink: 0,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: ui.muted,
  },
  pageIndexLabelOn: {
    color: ACCENT,
  },
  pageIndexFields: {
    fontSize: 13,
    lineHeight: "20px",
    whiteSpace: "nowrap",
    color: "inherit",
  },

  pagesStack: {
    display: "grid",
  },
  pageLayer: {
    gridArea: "1 / 1",
    minWidth: 0,
  },
  fields: {
    margin: 0,
  },
  fieldRow: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [MD]: LABEL_COLUMN },
    columnGap: 24,
    rowGap: 4,
    paddingBlock: { default: 16, [MD]: 20 },
    borderTopWidth: { default: 1, ":first-child": 0 },
    borderTopStyle: "solid",
    borderTopColor: SHEET_RULE,
  },
  fieldLabel: {
    margin: 0,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "26px",
    letterSpacing: "0.04em",
    color: ui.muted,
  },
  fieldValue: {
    margin: 0,
    maxWidth: "40em",
    fontSize: { default: 15, [MD]: 16 },
    lineHeight: "26px",
    color: ui.ink,
    textWrap: "pretty",
  },
  lineList: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },

  footer: {
    display: "grid",
    gridTemplateColumns: {
      default: "auto minmax(0, 1fr)",
      [MD]: "minmax(0, 1fr) auto minmax(0, 1fr)",
    },
    gridTemplateAreas: {
      default: '"indicator indicator" "back forward"',
      [MD]: '"back indicator forward"',
    },
    alignItems: "center",
    columnGap: 16,
    rowGap: 4,
    paddingTop: { default: 12, [MD]: 16 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: SHEET_RULE,
  },
  indicator: {
    gridArea: "indicator",
    display: "flex",
    alignItems: "center",
    justifyContent: { default: "flex-start", [MD]: "center" },
    gap: 12,
    margin: 0,
    paddingBlock: { default: 4, [MD]: 0 },
    fontSize: 13,
    lineHeight: "20px",
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: ui.muted,
    whiteSpace: "nowrap",
  },
  pips: {
    display: "flex",
    gap: 4,
  },
  pip: {
    width: 16,
    height: 2,
    backgroundColor: SHEET_RULE,
    transitionProperty: "background-color",
    transitionDuration: "200ms",
  },
  pipOn: {
    backgroundColor: ACCENT,
  },
  navButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    minHeight: 44,
    paddingInline: 12,
    paddingBlock: 8,
    boxSizing: "border-box",
    borderWidth: 0,
    backgroundColor: { default: "transparent", ":hover": ui.solutionsTint },
    fontFamily: "inherit",
    fontSize: 14,
    lineHeight: "20px",
    letterSpacing: "0.02em",
    color: { default: ui.ink, ":hover": FOCUS },
    cursor: "pointer",
    transitionProperty: "color, background-color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: FOCUS,
    outlineOffset: -2,
  },
  navBack: {
    gridArea: "back",
    justifySelf: "start",
    marginInlineStart: -12,
  },
  navForward: {
    gridArea: "forward",
    justifySelf: "end",
    marginInlineEnd: -12,
    fontWeight: 500,
    textAlign: "end",
  },
  navDisabled: {
    backgroundColor: { default: "transparent", ":hover": "transparent" },
    color: { default: ui.disabled, ":hover": ui.disabled },
    cursor: "default",
  },
  navIcon: {
    flexShrink: 0,
  },
});

function Field(props: { label: string; lines: string[] }) {
  return (
    <div {...stylex.attrs(styles.fieldRow)}>
      <dt {...stylex.attrs(styles.fieldLabel)}>{props.label}</dt>
      <dd {...stylex.attrs(styles.fieldValue)}>
        <ul {...stylex.attrs(styles.lineList)}>
          <For each={props.lines}>{(line) => <li>{line}</li>}</For>
        </ul>
      </dd>
    </div>
  );
}

function SheetPage(props: { item: SolutionItem; page: number; current: number; reduce: boolean }) {
  const active = () => props.page === props.current;
  return (
    <m.div
      inert={!active()}
      aria-hidden={active() ? "false" : "true"}
      initial={false}
      animate={
        active()
          ? { opacity: 1, x: 0, visibility: "visible" }
          : {
              opacity: 0,
              x: props.page < props.current ? -SLIDE : SLIDE,
              transitionEnd: { visibility: "hidden" },
            }
      }
      transition={{ duration: props.reduce ? 0 : 0.26, ease: EASE }}
      {...stylex.attrs(styles.pageLayer)}
    >
      <dl {...stylex.attrs(styles.fields)}>
        {fieldsOn(props.item, props.page).map((key) => (
          <Field label={FIELD_LABEL[key]} lines={props.item[key]} />
        ))}
      </dl>
    </m.div>
  );
}

export function Solutions() {
  const reduce = useReducedMotion();
  const titleId = createUniqueId();
  const tabBaseId = createUniqueId();
  const panelId = createUniqueId();
  const [position, setPosition] = createSignal({ index: 0, page: 0 });
  let scrollerEl!: HTMLDivElement;
  let sheetEl!: HTMLDivElement;
  const tabRefs: (HTMLButtonElement | undefined)[] = [];
  let hasMounted = false;

  const index = () => position().index;
  const page = () => position().page;
  const item = () => SOLUTION_ITEMS[index()];
  const previous = () => (index() > 0 ? SOLUTION_ITEMS[index() - 1] : null);
  const next = () => (index() < LAST_SOLUTION ? SOLUTION_ITEMS[index() + 1] : null);
  const canGoBack = () => page() > 0 || previous() !== null;
  const canGoForward = () => page() < LAST_PAGE || next() !== null;

  createEffect(
    () => [index(), reduce()] as const,
    ([current, reduceNow]) => {
      if (!hasMounted) {
        hasMounted = true;
        return;
      }
      const scroller = scrollerEl;
      const tab = tabRefs[current];
      if (!scroller || !tab || scroller.scrollWidth <= scroller.clientWidth) return;
      const inset = Number.parseFloat(getComputedStyle(scroller).paddingInlineStart) || 0;
      const start = tab.offsetLeft - inset;
      const end = tab.offsetLeft + tab.offsetWidth + inset - scroller.clientWidth;
      if (scroller.scrollLeft > start)
        scroller.scrollTo({ left: start, behavior: reduceNow ? "auto" : "smooth" });
      else if (scroller.scrollLeft < end)
        scroller.scrollTo({ left: end, behavior: reduceNow ? "auto" : "smooth" });
    },
  );

  const revealSheet = () => {
    requestAnimationFrame(() => {
      const sheet = sheetEl;
      if (!sheet) return;
      const top = sheet.getBoundingClientRect().top;
      if (top >= HEADER_HEIGHT) return;
      window.scrollTo({
        top: window.scrollY + top - HEADER_HEIGHT - 16,
        behavior: reduce() ? "auto" : "smooth",
      });
    });
  };

  const selectSolution = (to: number) => {
    setPosition((current) => (current.index === to ? current : { index: to, page: 0 }));
  };

  const goToPage = (to: number) => {
    setPosition((current) => ({ ...current, page: to }));
  };

  const goBack = () => {
    if (page() > 0) goToPage(page() - 1);
    else if (previous()) selectSolution(index() - 1);
    revealSheet();
  };

  const goForward = () => {
    if (page() < LAST_PAGE) goToPage(page() + 1);
    else if (next()) selectSolution(index() + 1);
    revealSheet();
  };

  const moveTabs = (event: KeyboardEvent) => {
    const count = SOLUTION_ITEMS.length;
    const current = index();
    let to: number;
    if (event.key === "ArrowRight") to = (current + 1) % count;
    else if (event.key === "ArrowLeft") to = (current - 1 + count) % count;
    else if (event.key === "Home") to = 0;
    else if (event.key === "End") to = count - 1;
    else return;
    event.preventDefault();
    selectSolution(to);
    flush();
    tabRefs[to]?.focus();
  };

  const backLabel = () => (page() > 0 ? "上一页" : "上一个方案");

  return (
    <section id="products-solutions" aria-labelledby={titleId} {...stylex.attrs(styles.section)}>
      <div {...stylex.attrs(styles.shell)}>
        <h2 id={titleId} {...stylex.attrs(styles.title)}>
          应用方案
        </h2>

        <div ref={scrollerEl} {...stylex.attrs(styles.tabScroller)}>
          <div
            role="tablist"
            aria-label="Application solutions"
            onKeyDown={moveTabs}
            {...stylex.attrs(styles.tablist)}
          >
            {SOLUTION_ITEMS.map((solution, solutionIndex) => {
              const on = () => solutionIndex === index();
              return (
                <button
                  ref={(node) => {
                    tabRefs[solutionIndex] = node;
                  }}
                  type="button"
                  role="tab"
                  id={`${tabBaseId}-${solutionIndex}`}
                  aria-selected={on() ? "true" : "false"}
                  aria-controls={panelId}
                  tabindex={on() ? 0 : -1}
                  onClick={() => selectSolution(solutionIndex)}
                  {...stylex.attrs(styles.tab, on() && styles.tabOn)}
                >
                  <span {...stylex.attrs(styles.tabNumber, on() && styles.tabNumberOn)}>
                    {padIndex(solutionIndex)}
                  </span>
                  <span {...stylex.attrs(styles.tabTitle, on() && styles.tabTitleOn)}>
                    {solution.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div
          ref={sheetEl}
          id={panelId}
          role="tabpanel"
          aria-labelledby={`${tabBaseId}-${index()}`}
          {...stylex.attrs(styles.sheet)}
        >
          <div {...stylex.attrs(styles.sheetStack)}>
            <AnimatePresence initial={false}>
              <Show when={item()} keyed>
                {(current) => {
                  const currentIndex = untrack(index);
                  return (
                    <m.div
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1,
                        transition: { duration: reduce() ? 0 : 0.24, ease: EASE },
                      }}
                      exit={{
                        opacity: 0,
                        transition: { duration: reduce() ? 0 : 0.12, ease: EASE },
                      }}
                      {...stylex.attrs(styles.sheetLayer)}
                    >
                      <header {...stylex.attrs(styles.sheetHead)}>
                        <span aria-hidden="true" {...stylex.attrs(styles.number)}>
                          {padIndex(currentIndex)}
                        </span>
                        <div>
                          <h3 {...stylex.attrs(styles.headTitle)}>{current.title}</h3>
                          <p {...stylex.attrs(styles.headSubtitle)}>{current.subtitle}</p>
                        </div>
                        <ol aria-label="Solution pages" {...stylex.attrs(styles.pageIndex)}>
                          {PAGE_FIELDS.map((_, pageIndex) => {
                            const on = () => pageIndex === page();
                            return (
                              <li>
                                <button
                                  type="button"
                                  aria-current={on() ? "true" : undefined}
                                  onClick={() => goToPage(pageIndex)}
                                  {...stylex.attrs(
                                    styles.pageIndexButton,
                                    on() && styles.pageIndexButtonOn,
                                  )}
                                >
                                  <span
                                    {...stylex.attrs(
                                      styles.pageIndexLabel,
                                      on() && styles.pageIndexLabelOn,
                                    )}
                                  >
                                    第 {pageIndex + 1} 页
                                  </span>
                                  <span {...stylex.attrs(styles.pageIndexFields)}>
                                    {fieldsOn(current, pageIndex)
                                      .map((key) => FIELD_LABEL[key])
                                      .join(" · ")}
                                  </span>
                                </button>
                              </li>
                            );
                          })}
                        </ol>
                      </header>
                      <div {...stylex.attrs(styles.pagesStack)}>
                        {PAGE_FIELDS.map((_, pageIndex) => (
                          <SheetPage
                            item={current}
                            page={pageIndex}
                            current={page()}
                            reduce={reduce()}
                          />
                        ))}
                      </div>
                    </m.div>
                  );
                }}
              </Show>
            </AnimatePresence>
          </div>

          <div {...stylex.attrs(styles.footer)}>
            <button
              type="button"
              onClick={goBack}
              disabled={!canGoBack()}
              aria-label={
                page() === 0 && previous()
                  ? `Previous solution: ${previous()!.englishName}`
                  : undefined
              }
              {...sxProps(styles.navButton, styles.navBack, !canGoBack() && styles.navDisabled)}
            >
              <ChevronLeft
                size={16}
                strokeWidth={1.5}
                absoluteStrokeWidth
                aria-hidden="true"
                {...stylex.attrs(styles.navIcon)}
              />
              {backLabel()}
            </button>
            <p aria-live="polite" {...stylex.attrs(styles.indicator)}>
              <span>
                第 {page() + 1} 页 / 共 {PAGE_COUNT} 页
              </span>
              <span aria-hidden="true" {...stylex.attrs(styles.pips)}>
                {PAGE_FIELDS.map((_, pageIndex) => (
                  <span {...stylex.attrs(styles.pip, pageIndex === page() && styles.pipOn)} />
                ))}
              </span>
            </p>
            <button
              type="button"
              onClick={goForward}
              disabled={!canGoForward()}
              {...sxProps(
                styles.navButton,
                styles.navForward,
                !canGoForward() && styles.navDisabled,
              )}
            >
              {page() < LAST_PAGE ? (
                "下一页"
              ) : (
                <span>{next() ? `下一个方案：${next()!.title}` : "下一个方案"}</span>
              )}
              <ChevronRight
                size={16}
                strokeWidth={1.5}
                absoluteStrokeWidth
                aria-hidden="true"
                {...stylex.attrs(styles.navIcon)}
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
