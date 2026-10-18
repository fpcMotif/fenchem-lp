import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ChevronLeft, ChevronRight } from "@fenchem-lp/ui/components/lucide";
import { AnimatePresence, m } from "@/compat/motion";
import { createSignal, createUniqueId, For, Show } from "solid-js";
import type { JSX } from "@solidjs/web";

import { EASE } from "@/components/prototype/motion-constants";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { SOLUTION_ITEMS, type SolutionItem } from "../../products-data";
import { padIndex } from "../shared/derived";

const INK = "#1a1a1a";
const BODY_TEXT = "#4d4d4d";
const MUTED = "#6b6b70";
const OLIVE = "#1c2609";
const OLIVE_HOVER = "#253211";
const OLIVE_RULE = "#36421f";
const ON_DARK = "#eef0e4";
const ON_DARK_MUTED = "#b8bfa6";
const PAPER = "#f8f5ec";
const PAPER_RULE = "#e3ddcb";
const ACCENT_DARK = colors.brandGreen300;
const FOCUS_DARK = colors.brandBlue300;
const BODY_FONT =
  '"Source Han Sans SC", "Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif';
const NUMERAL_FONT = '"Inter Tight", "Source Han Sans SC", "Noto Sans SC", sans-serif';

const TABLET = "@media (min-width: 768px) and (max-width: 1279.98px)";
const DESKTOP = "@media (min-width: 1280px)";
const SM = "@media (min-width: 640px)";
const MD = "@media (min-width: 768px)";
const LG = "@media (min-width: 1024px)";
const INSET = "min(120px, 8.333vw)";
const HEADER_HEIGHT = 80;
const TWELVE = "repeat(12, minmax(0, 1fr))";
const FIELD_COLUMNS = { default: "minmax(0, 1fr)", [MD]: "120px minmax(0, 1fr)" } as const;

const TOTAL = SOLUTION_ITEMS.length;
const TOTAL_LABEL = String(TOTAL).padStart(2, "0");

const srOnly = {
  position: "absolute",
  width: 1,
  height: 1,
  overflow: "hidden",
  clipPath: "inset(50%)",
  whiteSpace: "nowrap",
} as const;

const styles = stylex.create({
  section: {
    backgroundColor: OLIVE,
    color: ON_DARK,
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
    display: "flex",
    flexWrap: "wrap",
    alignItems: "baseline",
    justifyContent: "space-between",
    columnGap: 24,
    rowGap: 8,
    marginBottom: { default: 32, [DESKTOP]: 48 },
  },
  title: {
    margin: 0,
    fontSize: { default: 26, [TABLET]: 28, [DESKTOP]: 32 },
    fontWeight: 400,
    lineHeight: { default: "34px", [TABLET]: "36px", [DESKTOP]: "40px" },
    letterSpacing: "0.04em",
    color: ON_DARK,
  },
  meta: {
    margin: 0,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.04em",
    color: ON_DARK_MUTED,
  },
  numeral: {
    fontFamily: NUMERAL_FONT,
    fontWeight: 500,
    fontVariantNumeric: "tabular-nums",
  },
  srOnly,

  layout: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [LG]: TWELVE },
    columnGap: 24,
    alignItems: "start",
  },
  nav: {
    display: { default: "none", [LG]: "block" },
    gridColumn: "1 / 4",
    position: "sticky",
    top: HEADER_HEIGHT + 24,
  },
  tablist: {
    display: "flex",
    flexDirection: "column",
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: ON_DARK_MUTED,
  },
  tab: {
    position: "relative",
    display: "flex",
    alignItems: "baseline",
    width: "100%",
    minHeight: 48,
    paddingBlock: 12,
    paddingInlineStart: 28,
    paddingInlineEnd: 12,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: OLIVE_RULE,
    backgroundColor: { default: "transparent", ":hover": OLIVE_HOVER },
    fontFamily: "inherit",
    textAlign: "start",
    color: { default: ON_DARK_MUTED, ":hover": ON_DARK },
    cursor: "pointer",
    transitionProperty: "color, background-color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: FOCUS_DARK,
    outlineOffset: -2,
    "::before": {
      content: '""',
      position: "absolute",
      insetInlineStart: 0,
      top: 23,
      width: 16,
      height: 2,
      backgroundColor: ACCENT_DARK,
      transform: "scaleX(0)",
      transformOrigin: "left center",
      transitionProperty: "transform",
      transitionDuration: "250ms",
      transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
    },
  },
  tabSelected: {
    color: { default: PAPER, ":hover": PAPER },
    "::before": {
      transform: "scaleX(1)",
    },
  },
  tabIndex: {
    flexShrink: 0,
    width: 32,
    fontSize: 12,
    lineHeight: "24px",
    letterSpacing: "0.04em",
    color: ON_DARK_MUTED,
  },
  tabIndexSelected: {
    color: ACCENT_DARK,
  },
  tabTitle: {
    minWidth: 0,
    fontSize: 15,
    fontWeight: 400,
    lineHeight: "24px",
    letterSpacing: "0.02em",
  },
  tabTitleSelected: {
    fontWeight: 500,
  },

  main: {
    gridColumn: { default: "1 / -1", [LG]: "5 / 13" },
    minWidth: 0,
  },
  sheet: {
    position: "relative",
    borderRadius: 2,
    backgroundColor: PAPER,
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
    color: INK,
    paddingBlock: { default: 24, [MD]: 40, [DESKTOP]: 48 },
    paddingInline: { default: 20, [MD]: 40, [DESKTOP]: 48 },
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: FOCUS_DARK,
    outlineOffset: 4,
  },
  stack: {
    display: "grid",
  },
  layer: {
    gridArea: "1 / 1",
    minWidth: 0,
  },
  sizer: {
    visibility: "hidden",
  },

  topline: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: PAPER_RULE,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "0.08em",
    color: MUTED,
  },
  sheetTitle: {
    margin: 0,
    marginTop: { default: 20, [MD]: 28 },
    fontSize: { default: 22, [MD]: 26 },
    fontWeight: 500,
    lineHeight: { default: "30px", [MD]: "36px" },
    letterSpacing: "0.04em",
    color: INK,
    textWrap: "balance",
  },
  subtitle: {
    margin: 0,
    marginTop: 8,
    maxWidth: "32em",
    fontSize: { default: 15, [MD]: 16 },
    lineHeight: "26px",
    color: BODY_TEXT,
    textWrap: "pretty",
  },
  facts: {
    margin: 0,
    marginTop: { default: 20, [MD]: 28 },
  },
  body: {
    margin: 0,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: INK,
  },
  field: {
    display: "grid",
    gridTemplateColumns: FIELD_COLUMNS,
    columnGap: 24,
    rowGap: 6,
    paddingBlock: 14,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: PAPER_RULE,
  },
  fieldLast: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  factsField: {
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: PAPER_RULE,
    borderBottomWidth: 0,
  },
  label: {
    margin: 0,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.04em",
    color: MUTED,
  },
  value: {
    margin: 0,
    minWidth: 0,
    fontSize: 15,
    lineHeight: "24px",
    color: INK,
  },
  factList: {
    display: { default: "flex", [MD]: "grid" },
    flexDirection: "column",
    gridAutoFlow: "column",
    gridAutoColumns: "minmax(0, 1fr)",
    rowGap: 4,
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  fact: {
    fontSize: 15,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.02em",
    color: INK,
    paddingInlineEnd: { default: 0, [MD]: 16 },
  },
  factSeparated: {
    paddingInlineStart: { default: 0, [MD]: 16 },
    borderInlineStartWidth: { default: 0, [MD]: 1 },
    borderInlineStartStyle: "solid",
    borderInlineStartColor: PAPER_RULE,
  },
  lines: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
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
      top: 12,
      width: 6,
      height: 1,
      backgroundColor: MUTED,
    },
  },
  none: {
    color: MUTED,
  },

  pager: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    columnGap: 8,
    marginTop: 24,
  },
  step: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    columnGap: 4,
    minWidth: 40,
    height: 40,
    paddingInline: { default: 0, [SM]: 12 },
    borderWidth: 0,
    borderRadius: 2,
    backgroundColor: { default: "transparent", ":hover": OLIVE_HOVER },
    fontFamily: "inherit",
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.04em",
    color: { default: ON_DARK, ":hover": PAPER },
    cursor: "pointer",
    transitionProperty: "color, background-color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: FOCUS_DARK,
    outlineOffset: 0,
  },
  stepPrev: {
    marginInlineStart: { default: 0, [SM]: -12 },
  },
  stepNext: {
    marginInlineEnd: { default: 0, [SM]: -12 },
  },
  stepDisabled: {
    opacity: 0.4,
    cursor: "default",
    backgroundColor: { default: "transparent", ":hover": "transparent" },
    color: { default: ON_DARK, ":hover": ON_DARK },
  },
  stepLabel: {
    position: { default: "absolute", [SM]: "static" },
    width: { default: 1, [SM]: "auto" },
    height: { default: 1, [SM]: "auto" },
    overflow: { default: "hidden", [SM]: "visible" },
    clipPath: { default: "inset(50%)", [SM]: "none" },
    whiteSpace: "nowrap",
  },
  dots: {
    display: "flex",
    alignItems: "center",
    columnGap: 16,
  },
  dot: {
    position: "relative",
    flexShrink: 0,
    width: 8,
    height: 8,
    padding: 0,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: { default: ON_DARK_MUTED, ":hover": PAPER },
    borderRadius: 999,
    backgroundColor: { default: "transparent", ":hover": OLIVE_RULE },
    cursor: "pointer",
    transitionProperty: "background-color, border-color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: FOCUS_DARK,
    outlineOffset: 4,
    "::after": {
      content: '""',
      position: "absolute",
      insetBlock: -16,
      insetInline: -9,
    },
  },
  dotSelected: {
    borderColor: { default: ACCENT_DARK, ":hover": ACCENT_DARK },
    backgroundColor: { default: ACCENT_DARK, ":hover": ACCENT_DARK },
  },
});

function Lines(props: { lines: string[] }) {
  return (
    <ul {...stylex.attrs(styles.lines)}>
      <For each={props.lines}>{(line) => <li {...stylex.attrs(styles.line)}>{line}</li>}</For>
    </ul>
  );
}

function Field(props: { label: string; last?: boolean; children: JSX.Element }) {
  return (
    <div {...stylex.attrs(styles.field, props.last && styles.fieldLast)}>
      <dt {...stylex.attrs(styles.label)}>{props.label}</dt>
      <dd {...stylex.attrs(styles.value)}>{props.children}</dd>
    </div>
  );
}

function SheetBody(props: { item: SolutionItem; index: number }) {
  const item = props.item;
  return (
    <>
      <div {...stylex.attrs(styles.topline)}>
        <span>
          方案{" "}
          <span {...stylex.attrs(styles.numeral)}>
            {padIndex(props.index)} / {TOTAL_LABEL}
          </span>
        </span>
      </div>
      <h3 {...stylex.attrs(styles.sheetTitle)}>{item.title}</h3>
      <p {...stylex.attrs(styles.subtitle)}>{item.subtitle}</p>
      <dl {...stylex.attrs(styles.facts)}>
        <div {...stylex.attrs(styles.field, styles.factsField)}>
          <dt {...stylex.attrs(styles.label)}>功能</dt>
          <dd {...stylex.attrs(styles.value)}>
            <ul {...stylex.attrs(styles.factList)}>
              {item.functions.map((fact, factIndex) => (
                <li {...stylex.attrs(styles.fact, factIndex > 0 && styles.factSeparated)}>
                  {fact}
                </li>
              ))}
            </ul>
          </dd>
        </div>
      </dl>
      <dl {...stylex.attrs(styles.body)}>
        <Field label="概述">
          <Lines lines={item.overview} />
        </Field>
        <Field label="功能性成分">
          <Lines lines={item.keyIngredients} />
        </Field>
        <Field label="配方挑战">
          {item.challenges.length > 0 ? (
            <Lines lines={item.challenges} />
          ) : (
            <span {...stylex.attrs(styles.none)}>
              <span aria-hidden="true">—</span>
              <span {...stylex.attrs(styles.srOnly)}>Not provided</span>
            </span>
          )}
        </Field>
        <Field label="质地">
          <Lines lines={item.texture} />
        </Field>
        <Field label="应用" last>
          <Lines lines={item.applications} />
        </Field>
      </dl>
    </>
  );
}

export function Solutions() {
  const reduce = useReducedMotion();
  const baseId = createUniqueId();
  const titleId = `${baseId}-title`;
  const panelId = `${baseId}-panel`;
  const tabId = (index: number) => `${baseId}-tab-${index}`;
  const [active, setActive] = createSignal(0);
  const tabs: (HTMLButtonElement | undefined)[] = [];
  const dots: (HTMLButtonElement | undefined)[] = [];
  const activeItem = () => SOLUTION_ITEMS[active()] ?? SOLUTION_ITEMS[0];
  const atStart = () => active() === 0;
  const atEnd = () => active() === TOTAL - 1;

  const select = (next: number, from?: EventTarget | null) => {
    const target = Math.min(TOTAL - 1, Math.max(0, next));
    setActive(target);
    if (!(from instanceof HTMLButtonElement)) return;
    if (tabs.includes(from)) tabs[target]?.focus();
    else if (dots.includes(from)) dots[target]?.focus();
  };

  const onSectionKeyDown = (event: KeyboardEvent) => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (step === 0) return;
    event.preventDefault();
    select(active() + step, event.target);
  };

  const onTablistKeyDown = (event: KeyboardEvent) => {
    const targets: Record<string, number> = {
      ArrowDown: active() + 1,
      ArrowUp: active() - 1,
      Home: 0,
      End: TOTAL - 1,
    };
    const next = targets[event.key];
    if (next === undefined) return;
    event.preventDefault();
    select(next, event.target);
  };

  return (
    <Show when={activeItem()}>
      <section
        id="products-solutions"
        aria-labelledby={titleId}
        onKeyDown={onSectionKeyDown}
        {...stylex.attrs(styles.section)}
      >
        <div {...stylex.attrs(styles.shell)}>
          <header {...stylex.attrs(styles.head)}>
            <h2 id={titleId} {...stylex.attrs(styles.title)}>
              应用方案
            </h2>
            <p {...stylex.attrs(styles.meta)}>
              <span {...stylex.attrs(styles.numeral)}>{TOTAL}</span> 款方案
            </p>
          </header>
          <div {...stylex.attrs(styles.layout)}>
            <nav aria-labelledby={titleId} {...stylex.attrs(styles.nav)}>
              <div
                role="tablist"
                aria-orientation="vertical"
                aria-labelledby={titleId}
                onKeyDown={onTablistKeyDown}
                {...stylex.attrs(styles.tablist)}
              >
                {SOLUTION_ITEMS.map((item, index) => {
                  const selected = () => index === active();
                  return (
                    <button
                      ref={(node) => {
                        tabs[index] = node;
                      }}
                      id={tabId(index)}
                      type="button"
                      role="tab"
                      aria-selected={selected() ? "true" : "false"}
                      aria-controls={panelId}
                      tabindex={selected() ? 0 : -1}
                      onClick={() => select(index)}
                      {...stylex.attrs(styles.tab, selected() && styles.tabSelected)}
                    >
                      <span
                        {...stylex.attrs(
                          styles.tabIndex,
                          styles.numeral,
                          selected() && styles.tabIndexSelected,
                        )}
                      >
                        {padIndex(index)}
                      </span>
                      <span
                        {...stylex.attrs(styles.tabTitle, selected() && styles.tabTitleSelected)}
                      >
                        {item.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </nav>
            <div {...stylex.attrs(styles.main)}>
              <div
                id={panelId}
                role="tabpanel"
                aria-labelledby={tabId(active())}
                tabindex={0}
                {...stylex.attrs(styles.sheet)}
              >
                <div {...stylex.attrs(styles.stack)}>
                  {SOLUTION_ITEMS.map((item, index) => (
                    <div aria-hidden="true" {...stylex.attrs(styles.layer, styles.sizer)}>
                      <SheetBody item={item} index={index} />
                    </div>
                  ))}
                  <AnimatePresence initial={false}>
                    <Show when={activeItem()} keyed>
                      {(item) => (
                        <m.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: reduce() ? 0 : 0.2, ease: EASE }}
                          {...stylex.attrs(styles.layer)}
                        >
                          <SheetBody item={item} index={SOLUTION_ITEMS.indexOf(item)} />
                        </m.div>
                      )}
                    </Show>
                  </AnimatePresence>
                </div>
              </div>
              <p aria-live="polite" {...stylex.attrs(styles.srOnly)}>
                Solution {active() + 1} of {TOTAL}: {activeItem()?.englishName}
              </p>
              <div {...stylex.attrs(styles.pager)}>
                <button
                  type="button"
                  aria-controls={panelId}
                  aria-disabled={atStart() ? "true" : "false"}
                  onClick={() => select(active() - 1)}
                  {...stylex.attrs(styles.step, styles.stepPrev, atStart() && styles.stepDisabled)}
                >
                  <ChevronLeft size={16} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />
                  <span aria-hidden="true" {...stylex.attrs(styles.stepLabel)}>
                    上一个
                  </span>
                  <span {...stylex.attrs(styles.srOnly)}>Previous</span>
                </button>
                <div role="group" aria-label="Choose a solution" {...stylex.attrs(styles.dots)}>
                  {SOLUTION_ITEMS.map((item, index) => {
                    const selected = () => index === active();
                    return (
                      <button
                        ref={(node) => {
                          dots[index] = node;
                        }}
                        type="button"
                        aria-label={item.englishName}
                        aria-current={selected() ? "true" : undefined}
                        aria-controls={panelId}
                        onClick={() => select(index)}
                        {...stylex.attrs(styles.dot, selected() && styles.dotSelected)}
                      />
                    );
                  })}
                </div>
                <button
                  type="button"
                  aria-controls={panelId}
                  aria-disabled={atEnd() ? "true" : "false"}
                  onClick={() => select(active() + 1)}
                  {...stylex.attrs(styles.step, styles.stepNext, atEnd() && styles.stepDisabled)}
                >
                  <span aria-hidden="true" {...stylex.attrs(styles.stepLabel)}>
                    下一个
                  </span>
                  <span {...stylex.attrs(styles.srOnly)}>Next</span>
                  <ChevronRight
                    size={16}
                    strokeWidth={1.5}
                    absoluteStrokeWidth
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Show>
  );
}
