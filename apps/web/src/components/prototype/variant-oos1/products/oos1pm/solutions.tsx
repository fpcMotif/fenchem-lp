import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ChevronLeft, ChevronRight } from "@fenchem-lp/ui/components/lucide";
import { m } from "@/compat/motion";
import { createEffect, createSignal, createUniqueId, For, Show } from "solid-js";
import type { JSX } from "@solidjs/web";

import { EASE } from "@/components/prototype/motion-constants";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { FLAT_FORMULAS, padIndex, type FlatFormula } from "../shared/derived";

const INK = "#1a1a1a";
const BODY_TEXT = "#4d4d4d";
const MUTED = "#6b6b70";
const GROUND = "#f9f7ff";
const TAB_RULE = "#e0dbef";
const SHEET_EDGE = "#e3dff0";
const PAPER_RULE = "#eceaf3";
const NOTHING = "#a9a5b8";
const ACCENT = colors.brandGreen700;
const FOCUS = colors.brandBlue700;
const EASE_OUT_CSS = "cubic-bezier(0.22, 1, 0.36, 1)";
const BODY_FONT =
  '"Source Han Sans SC", "Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif';
const NUMERAL_FONT =
  '"Inter Tight", "Source Han Sans SC", "Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif';
const FOLD_SHADE = "rgba(52, 40, 110, 0.055)";
const FOLD_CLEAR = "rgba(52, 40, 110, 0)";

const TABLET = "@media (min-width: 768px) and (max-width: 1279.98px)";
const MD_ONLY = "@media (min-width: 768px) and (max-width: 1023.98px)";
const DESKTOP = "@media (min-width: 1280px)";
const MD = "@media (min-width: 768px)";
const LG = "@media (min-width: 1024px)";
const NO_HOVER = "@media (hover: none)";
const INSET = "min(120px, 8.333vw)";
const HEADER_HEIGHT = 80;
const LABEL_COLUMNS = "72px minmax(0, 1fr)";

const LAST_INDEX = FLAT_FORMULAS.length - 1;

const styles = stylex.create({
  section: {
    backgroundColor: GROUND,
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
    marginBottom: { default: 24, [DESKTOP]: 40 },
  },
  title: {
    margin: 0,
    fontSize: { default: 26, [TABLET]: 28, [DESKTOP]: 32 },
    fontWeight: 400,
    lineHeight: { default: "34px", [TABLET]: "36px", [DESKTOP]: "40px" },
    letterSpacing: "0.04em",
    textWrap: "balance",
    color: INK,
  },

  tabRow: {
    position: "relative",
    display: "grid",
    gridAutoFlow: "column",
    gridAutoColumns: { default: 112, [LG]: "minmax(0, 1fr)" },
    marginInline: { default: -16, [MD_ONLY]: -40, [LG]: 0 },
    paddingInline: { default: 16, [MD_ONLY]: 40, [LG]: 0 },
    scrollPaddingInline: { default: 16, [MD_ONLY]: 40, [LG]: 0 },
    overflowX: { default: "auto", [LG]: "visible" },
    scrollbarWidth: "none",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: TAB_RULE,
  },
  tab: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 6,
    minWidth: 0,
    paddingTop: 14,
    paddingBottom: 16,
    paddingInlineStart: 0,
    paddingInlineEnd: 12,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    textAlign: "start",
    color: { default: MUTED, ":hover": FOCUS },
    cursor: "pointer",
    transitionProperty: "color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: FOCUS,
    outlineOffset: -2,
    "::after": {
      content: '""',
      position: "absolute",
      insetInlineStart: 0,
      insetInlineEnd: 12,
      bottom: -1,
      height: 2,
      backgroundColor: ACCENT,
      transform: "scaleX(0)",
      transformOrigin: "left center",
      transitionProperty: "transform",
      transitionDuration: "280ms",
      transitionTimingFunction: EASE_OUT_CSS,
    },
  },
  tabSelected: {
    color: { default: INK, ":hover": INK },
    cursor: "default",
    "::after": {
      transform: "scaleX(1)",
    },
  },
  tabNumber: {
    fontFamily: NUMERAL_FONT,
    fontSize: 16,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: "inherit",
  },
  tabNumberSelected: {
    color: ACCENT,
  },
  tabTitle: {
    display: "block",
    minHeight: 36,
    fontSize: 13,
    fontWeight: 400,
    lineHeight: "18px",
    letterSpacing: "0.02em",
    textWrap: "balance",
    color: "inherit",
    opacity: {
      default: 0,
      [stylex.when.ancestor(":hover")]: 1,
      [stylex.when.ancestor(":focus-visible")]: 1,
      [NO_HOVER]: 1,
    },
    transitionProperty: "opacity",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
  },
  tabTitleSelected: {
    fontWeight: 500,
    opacity: 1,
  },

  panel: {
    marginTop: { default: 28, [DESKTOP]: 40 },
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: FOCUS,
    outlineOffset: 8,
    scrollMarginTop: HEADER_HEIGHT + 24,
  },
  stack: {
    display: "grid",
  },
  layer: {
    gridArea: "1 / 1",
    minWidth: 0,
  },
  spreadHead: {
    marginBottom: { default: 20, [DESKTOP]: 24 },
  },
  spreadTitle: {
    margin: 0,
    fontSize: { default: 20, [MD]: 22, [DESKTOP]: 24 },
    fontWeight: 500,
    lineHeight: { default: "28px", [MD]: "30px", [DESKTOP]: "32px" },
    letterSpacing: "0.04em",
    textWrap: "balance",
    color: INK,
  },
  spreadSubtitle: {
    margin: 0,
    marginTop: 6,
    maxWidth: "36em",
    fontSize: 15,
    lineHeight: "24px",
    color: BODY_TEXT,
    textWrap: "pretty",
  },

  spread: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [LG]: "repeat(2, minmax(0, 1fr))" },
    rowGap: { default: 12, [LG]: 0 },
  },
  sheet: {
    position: "relative",
    minWidth: 0,
    paddingTop: { default: 28, [MD]: 40 },
    paddingInline: { default: 20, [MD]: 40, [DESKTOP]: 48 },
    paddingBottom: { default: 60, [MD]: 72 },
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: SHEET_EDGE,
    boxShadow: "0 1px 2px rgba(38, 30, 84, 0.05)",
  },
  sheetLeft: {
    backgroundImage: {
      default: "none",
      [LG]: `linear-gradient(to left, ${FOLD_SHADE}, ${FOLD_CLEAR} 56px)`,
    },
  },
  sheetRight: {
    borderInlineStartWidth: { default: 1, [LG]: 0 },
    backgroundImage: {
      default: "none",
      [LG]: `linear-gradient(to right, ${FOLD_SHADE}, ${FOLD_CLEAR} 56px)`,
    },
  },
  fields: {
    margin: 0,
  },
  field: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [MD_ONLY]: LABEL_COLUMNS,
      [DESKTOP]: LABEL_COLUMNS,
    },
    columnGap: 24,
    rowGap: 6,
    paddingTop: { default: 18, ":first-child": 0 },
    paddingBottom: 18,
    borderTopWidth: { default: 1, ":first-child": 0 },
    borderTopStyle: "solid",
    borderTopColor: PAPER_RULE,
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
    textWrap: "pretty",
  },
  nothing: {
    color: NOTHING,
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
  folio: {
    position: "absolute",
    bottom: { default: 20, [MD]: 24 },
    fontFamily: NUMERAL_FONT,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "0.08em",
    fontVariantNumeric: "tabular-nums",
    color: MUTED,
  },
  folioLeft: {
    insetInlineStart: { default: 20, [MD]: 40, [DESKTOP]: 48 },
  },
  folioRight: {
    insetInlineEnd: { default: 20, [MD]: 40, [DESKTOP]: 48 },
  },

  pager: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    columnGap: 24,
    marginTop: { default: 16, [MD]: 24 },
  },
  pageButton: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: 2,
    minWidth: 0,
    minHeight: 56,
    paddingBlock: 8,
    paddingInline: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    textAlign: "start",
    color: { default: INK, ":hover": FOCUS },
    cursor: "pointer",
    transitionProperty: "color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: FOCUS,
    outlineOffset: 2,
  },
  pageButtonNext: {
    alignItems: "flex-end",
    justifySelf: "end",
    textAlign: "end",
  },
  pageButtonOff: {
    color: { default: NOTHING, ":hover": NOTHING },
    cursor: "default",
  },
  pageLabel: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.04em",
  },
  pageTitle: {
    display: "flex",
    alignItems: "baseline",
    gap: 8,
    maxWidth: "100%",
    fontSize: 15,
    lineHeight: "24px",
    color: "inherit",
  },
  pageTitleText: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  pageIndex: {
    flexShrink: 0,
    fontFamily: NUMERAL_FONT,
    fontSize: 13,
    fontWeight: 500,
    fontVariantNumeric: "tabular-nums",
    color: MUTED,
  },
});

function Lines(props: { lines: string[] }) {
  return (
    <ul {...stylex.attrs(styles.lines)}>
      <For each={props.lines}>{(line) => <li {...stylex.attrs(styles.line)}>{line}</li>}</For>
    </ul>
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

function LeftPage(props: { formula: FlatFormula }) {
  return (
    <dl {...stylex.attrs(styles.fields)}>
      <Field label="概述">
        <Lines lines={props.formula.overview} />
      </Field>
      <Field label="功能">
        <Lines lines={props.formula.functions} />
      </Field>
      <Field label="功能性成分">
        <Lines lines={props.formula.keyIngredients} />
      </Field>
    </dl>
  );
}

function RightPage(props: { formula: FlatFormula }) {
  return (
    <dl {...stylex.attrs(styles.fields)}>
      <Field label="配方挑战">
        {props.formula.challenges.length > 0 ? (
          <Lines lines={props.formula.challenges} />
        ) : (
          <>
            <span aria-hidden="true" {...stylex.attrs(styles.nothing)}>
              —
            </span>
            <span {...stylex.attrs(styles.srOnly)}>Not provided</span>
          </>
        )}
      </Field>
      <Field label="质地">
        <Lines lines={props.formula.texture} />
      </Field>
      <Field label="应用">
        <Lines lines={props.formula.applications} />
      </Field>
    </dl>
  );
}

function Layers(props: { active: number; render: (formula: FlatFormula) => JSX.Element }) {
  const reduce = useReducedMotion();
  return (
    <div {...stylex.attrs(styles.stack)}>
      {FLAT_FORMULAS.map((formula) => {
        const on = () => formula.index === props.active;
        return (
          <m.div
            aria-hidden={on() ? undefined : "true"}
            initial={false}
            animate={on() ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
            transition={{ duration: on() && !reduce() ? 0.24 : 0, ease: EASE }}
            style={{ visibility: on() ? "visible" : "hidden" }}
            {...stylex.attrs(styles.layer)}
          >
            {props.render(formula)}
          </m.div>
        );
      })}
    </div>
  );
}

function PageButton(props: {
  direction: "prev" | "next";
  target: FlatFormula | undefined;
  controls: string;
  onGo: (index: number) => void;
}) {
  const isNext = props.direction === "next";
  const label = isNext ? "下一个" : "上一个";
  return (
    <button
      type="button"
      disabled={!props.target}
      aria-controls={props.controls}
      onClick={() => {
        const target = props.target;
        if (target) props.onGo(target.index);
      }}
      {...stylex.attrs(
        styles.pageButton,
        isNext && styles.pageButtonNext,
        !props.target && styles.pageButtonOff,
      )}
    >
      <span {...stylex.attrs(styles.pageLabel)}>
        {!isNext && <ChevronLeft size={16} strokeWidth={1.5} aria-hidden="true" />}
        {label}
        {isNext && <ChevronRight size={16} strokeWidth={1.5} aria-hidden="true" />}
      </span>
      <Show when={props.target}>
        {(target) => (
          <span {...stylex.attrs(styles.pageTitle)}>
            <span {...stylex.attrs(styles.pageIndex)}>{padIndex(target().index)}</span>
            <span {...stylex.attrs(styles.pageTitleText)}>{target().title}</span>
          </span>
        )}
      </Show>
    </button>
  );
}

export function Solutions() {
  const reduce = useReducedMotion();
  const titleId = createUniqueId();
  const baseId = createUniqueId();
  const panelId = `${baseId}-panel`;
  const tabId = (index: number) => `${baseId}-tab-${index}`;
  const [active, setActive] = createSignal(0);
  let row: HTMLDivElement | undefined;
  let panel: HTMLDivElement | undefined;
  const tabs: (HTMLButtonElement | undefined)[] = [];

  createEffect(
    () => [active(), reduce()] as const,
    ([index, reduced]) => {
      const tab = tabs[index];
      if (!row || !tab || row.scrollWidth <= row.clientWidth) return;
      const pad = Number.parseFloat(getComputedStyle(row).paddingInlineStart) || 0;
      const start = tab.offsetLeft - pad;
      const end = tab.offsetLeft + tab.offsetWidth + pad;
      const behavior = reduced ? "auto" : "smooth";
      if (start < row.scrollLeft) row.scrollTo({ left: start, behavior });
      else if (end > row.scrollLeft + row.clientWidth) {
        row.scrollTo({ left: end - row.clientWidth, behavior });
      }
    },
  );

  const goTo = (index: number) => {
    setActive(index);
    if (panel && panel.getBoundingClientRect().top < HEADER_HEIGHT) {
      panel.scrollIntoView({ behavior: reduce() ? "auto" : "smooth", block: "start" });
    }
  };

  const onTabKeyDown = (event: KeyboardEvent) => {
    const current = active();
    const keyTargets: Record<string, number> = {
      ArrowRight: current === LAST_INDEX ? 0 : current + 1,
      ArrowLeft: current === 0 ? LAST_INDEX : current - 1,
      Home: 0,
      End: LAST_INDEX,
    };
    const next = keyTargets[event.key];
    if (next === undefined) return;
    event.preventDefault();
    setActive(next);
    tabs[next]?.focus();
  };

  const folio = () => padIndex(active());

  return (
    <section id="products-solutions" aria-labelledby={titleId} {...stylex.attrs(styles.section)}>
      <div {...stylex.attrs(styles.shell)}>
        <header {...stylex.attrs(styles.head)}>
          <h2 id={titleId} {...stylex.attrs(styles.title)}>
            应用方案
          </h2>
        </header>

        <div
          ref={row}
          role="tablist"
          aria-label="Application solutions"
          onKeyDown={onTabKeyDown}
          {...stylex.attrs(styles.tabRow)}
        >
          {FLAT_FORMULAS.map((formula) => {
            const selected = () => formula.index === active();
            return (
              <button
                ref={(node) => {
                  tabs[formula.index] = node;
                }}
                id={tabId(formula.index)}
                type="button"
                role="tab"
                aria-selected={selected() ? "true" : "false"}
                aria-controls={panelId}
                tabindex={selected() ? 0 : -1}
                onClick={() => setActive(formula.index)}
                {...stylex.attrs(
                  styles.tab,
                  stylex.defaultMarker(),
                  selected() && styles.tabSelected,
                )}
              >
                <span {...stylex.attrs(styles.tabNumber, selected() && styles.tabNumberSelected)}>
                  {padIndex(formula.index)}
                </span>
                <span {...stylex.attrs(styles.tabTitle, selected() && styles.tabTitleSelected)}>
                  {formula.title}
                </span>
              </button>
            );
          })}
        </div>

        <div
          ref={panel}
          id={panelId}
          role="tabpanel"
          aria-labelledby={tabId(active())}
          tabindex={0}
          {...stylex.attrs(styles.panel)}
        >
          <div {...stylex.attrs(styles.spreadHead)}>
            <Layers
              active={active()}
              render={(formula) => (
                <>
                  <h3 {...stylex.attrs(styles.spreadTitle)}>{formula.title}</h3>
                  <p {...stylex.attrs(styles.spreadSubtitle)}>{formula.subtitle}</p>
                </>
              )}
            />
          </div>
          <div {...stylex.attrs(styles.spread)}>
            <div {...stylex.attrs(styles.sheet, styles.sheetLeft)}>
              <Layers active={active()} render={(formula) => <LeftPage formula={formula} />} />
              <span aria-hidden="true" {...stylex.attrs(styles.folio, styles.folioLeft)}>
                {folio()} · 左
              </span>
            </div>
            <div {...stylex.attrs(styles.sheet, styles.sheetRight)}>
              <Layers active={active()} render={(formula) => <RightPage formula={formula} />} />
              <span aria-hidden="true" {...stylex.attrs(styles.folio, styles.folioRight)}>
                {folio()} · 右
              </span>
            </div>
          </div>
        </div>

        <nav aria-label="Solution pages" {...stylex.attrs(styles.pager)}>
          <PageButton
            direction="prev"
            target={FLAT_FORMULAS[active() - 1]}
            controls={panelId}
            onGo={goTo}
          />
          <PageButton
            direction="next"
            target={FLAT_FORMULAS[active() + 1]}
            controls={panelId}
            onGo={goTo}
          />
        </nav>
      </div>
    </section>
  );
}
