import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ArrowLeft, ArrowRight, ChevronDown } from "@fenchem-lp/ui/components/lucide";
import { AnimatePresence, m } from "@/compat/motion";
import { createSignal, createUniqueId, flush, For, Show } from "solid-js";

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
  '"Source Han Sans SC", "Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif';
const NUMERAL_FONT = '"Inter Tight", "Source Han Sans SC", "Noto Sans SC", sans-serif';

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

// stylex.attrs with reactive (accessor) arguments resolves at runtime here, because
// the StyleX compiler tries to evaluate them at build time and throws.
const sxProps: typeof stylex.attrs = (...args) => stylex.attrs(...args);

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

function Field(props: { label: string; lines: string[]; last?: boolean }) {
  return (
    <div {...stylex.attrs(styles.field, props.last && styles.fieldLast)}>
      <dt {...stylex.attrs(styles.fieldLabel)}>{props.label}</dt>
      <dd {...stylex.attrs(styles.fieldValue)}>
        <Show
          when={props.lines.length > 0}
          fallback={
            <span {...stylex.attrs(styles.empty)}>
              <span aria-hidden="true">—</span>
              <span {...stylex.attrs(styles.visuallyHidden)}>None</span>
            </span>
          }
        >
          <ul {...stylex.attrs(styles.lines)}>
            <For each={props.lines}>{(line) => <li {...stylex.attrs(styles.line)}>{line}</li>}</For>
          </ul>
        </Show>
      </dd>
    </div>
  );
}

export function Solutions() {
  const titleId = createUniqueId();
  const baseId = createUniqueId();
  const reduce = useReducedMotion();
  const [active, setActive] = createSignal(0);
  const [indexOpen, setIndexOpen] = createSignal(false);
  const tabRefs: (HTMLButtonElement | undefined)[] = [];
  let toggleEl!: HTMLButtonElement;
  let sheetEl!: HTMLDivElement;

  if (TOTAL === 0) return null;
  const formula = () => FLAT_FORMULAS[active()] ?? FLAT_FORMULAS[0]!;
  const previous = () => FLAT_FORMULAS[active() - 1];
  const next = () => FLAT_FORMULAS[active() + 1];
  const tabId = (index: number) => `${baseId}-tab-${index}`;
  const panelId = `${baseId}-panel`;
  const listId = `${baseId}-list`;

  const revealSheet = () => {
    const sheet = sheetEl;
    if (!sheet) return;
    const top = sheet.getBoundingClientRect().top;
    if (top >= HEADER_HEIGHT) return;
    window.scrollTo({
      top: top + window.scrollY - SCROLL_OFFSET,
      behavior: reduce() ? "instant" : "smooth",
    });
  };

  const choose = (index: number) => {
    setActive(index);
    if (window.matchMedia(WIDE_QUERY).matches) return;
    setIndexOpen(false);
    flush();
    toggleEl.focus();
  };

  const step = (index: number) => {
    if (index < 0 || index >= TOTAL) return;
    setActive(index);
    revealSheet();
  };

  const onTabKeyDown = (event: KeyboardEvent, index: number) => {
    const last = TOTAL - 1;
    let target: number | null = null;
    if (event.key === "ArrowDown") target = index === last ? 0 : index + 1;
    if (event.key === "ArrowUp") target = index === 0 ? last : index - 1;
    if (event.key === "Home") target = 0;
    if (event.key === "End") target = last;
    if (target === null) return;
    event.preventDefault();
    setActive(target);
    flush();
    tabRefs[target]?.focus();
  };

  const position = () => (
    <>
      <span {...stylex.attrs(styles.indexCountCurrent)}>{padIndex(active())}</span> / {TOTAL_LABEL}
    </>
  );

  return (
    <section id="products-solutions" aria-labelledby={titleId} {...stylex.attrs(styles.section)}>
      <div {...stylex.attrs(styles.shell)}>
        <header {...stylex.attrs(styles.head)}>
          <h2 id={titleId} {...stylex.attrs(styles.title)}>
            应用方案
          </h2>
          <p {...stylex.attrs(styles.summary)}>{TOTAL} 个配方方案</p>
        </header>

        <div {...stylex.attrs(styles.layout)}>
          <div {...stylex.attrs(styles.sheet, styles.indexSheet)}>
            <div aria-hidden="true" {...stylex.attrs(styles.indexHead)}>
              <span {...stylex.attrs(styles.indexLabel)}>全部方案</span>
              <span {...stylex.attrs(styles.indexCount)}>{position()}</span>
            </div>
            <button
              ref={toggleEl}
              type="button"
              aria-expanded={indexOpen() ? "true" : "false"}
              aria-controls={listId}
              onClick={() => setIndexOpen((open) => !open)}
              {...stylex.attrs(styles.toggle, indexOpen() && styles.toggleOpen)}
            >
              <span {...stylex.attrs(styles.toggleText)}>
                全部方案
                <span aria-hidden="true">·</span>
                <span {...stylex.attrs(styles.indexCount)}>{position()}</span>
              </span>
              <ChevronDown
                size={18}
                strokeWidth={1.5}
                absoluteStrokeWidth
                aria-hidden="true"
                {...stylex.attrs(styles.toggleIcon, indexOpen() && styles.toggleIconOpen)}
              />
            </button>
            <div
              id={listId}
              {...stylex.attrs(styles.disclosure, indexOpen() && styles.disclosureOpen)}
            >
              <div {...stylex.attrs(styles.disclosureInner)}>
                <div
                  role="tablist"
                  aria-orientation="vertical"
                  aria-label="Application solution list"
                  {...stylex.attrs(styles.tablist)}
                >
                  {FLAT_FORMULAS.map((item, index) => {
                    const selected = () => index === active();
                    return (
                      <button
                        ref={(node) => {
                          tabRefs[index] = node;
                        }}
                        id={tabId(index)}
                        type="button"
                        role="tab"
                        aria-selected={selected() ? "true" : "false"}
                        aria-controls={panelId}
                        tabindex={selected() ? 0 : -1}
                        onClick={() => choose(index)}
                        onKeyDown={(event) => onTabKeyDown(event, index)}
                        {...stylex.attrs(
                          styles.tab,
                          index === TOTAL - 1 && styles.tabLast,
                          selected() && styles.tabSelected,
                        )}
                      >
                        <span
                          {...stylex.attrs(
                            styles.tabNumber,
                            selected() && styles.tabNumberSelected,
                          )}
                        >
                          {padIndex(index)}
                        </span>
                        <span
                          {...stylex.attrs(styles.tabTitle, selected() && styles.tabTitleSelected)}
                        >
                          {item.title}
                        </span>
                        <span {...stylex.attrs(styles.tabSubtitle)}>{item.subtitle}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div ref={sheetEl} {...stylex.attrs(styles.sheet, styles.contentSheet)}>
            <div
              id={panelId}
              role="tabpanel"
              aria-labelledby={tabId(active())}
              tabindex={0}
              {...stylex.attrs(styles.panel)}
            >
              <AnimatePresence mode="wait" initial={false}>
                <Show when={formula()} keyed>
                  {(current) => (
                    <m.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: reduce() ? 0 : 0.2, ease: EASE }}
                    >
                      <header {...stylex.attrs(styles.sheetHead)}>
                        <p {...stylex.attrs(styles.sheetNumber)}>
                          <span>No.</span>
                          <span {...stylex.attrs(styles.sheetNumberCurrent)}>
                            {padIndex(current.index)}
                          </span>
                        </p>
                        <h3 {...stylex.attrs(styles.sheetTitle)}>{current.title}</h3>
                        <p {...stylex.attrs(styles.sheetSubtitle)}>{current.subtitle}</p>
                      </header>
                      <dl {...stylex.attrs(styles.fields)}>
                        <Field label="概述" lines={current.overview} />
                        <Field label="功能" lines={current.functions} />
                        <Field label="功能性成分" lines={current.keyIngredients} />
                        <Field label="配方挑战" lines={current.challenges} />
                        <Field label="质地" lines={current.texture} />
                        <Field label="应用" lines={current.applications} last />
                      </dl>
                    </m.div>
                  )}
                </Show>
              </AnimatePresence>
            </div>
            <div {...stylex.attrs(styles.pager)}>
              <button
                type="button"
                aria-disabled={previous() ? "false" : "true"}
                onClick={() => step(active() - 1)}
                {...sxProps(styles.pagerButton, !previous() && styles.pagerDisabled)}
              >
                <span {...stylex.attrs(styles.pagerAction)}>
                  <ArrowLeft size={16} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />
                  上一个
                </span>
                <span {...sxProps(styles.pagerTitle, !previous() && styles.pagerTitleDisabled)}>
                  {previous() ? `${padIndex(active() - 1)} ${previous()!.title}` : " "}
                </span>
              </button>
              <button
                type="button"
                aria-disabled={next() ? "false" : "true"}
                onClick={() => step(active() + 1)}
                {...sxProps(styles.pagerButton, styles.pagerNext, !next() && styles.pagerDisabled)}
              >
                <span {...stylex.attrs(styles.pagerAction)}>
                  下一个
                  <ArrowRight size={16} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />
                </span>
                <span {...sxProps(styles.pagerTitle, !next() && styles.pagerTitleDisabled)}>
                  {next() ? `${padIndex(active() + 1)} ${next()!.title}` : " "}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
