import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ChevronDown, ChevronLeft, ChevronRight } from "@fenchem-lp/ui/components/lucide";
import { createSignal, createUniqueId, flush, For } from "solid-js";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { SOLUTION_ITEMS, type SolutionItem } from "../../products-data";
import { padIndex } from "../shared/derived";
import { font, media, motionCss, tone } from "./tokens.stylex";
import { ui } from "./ui";

const MD = breakpoints.md;
const LG = breakpoints.lg;
const XL = breakpoints.xl;
const ACCENT = colors.brandGreen700;
const FOCUS = colors.brandBlue700;
const TOTAL = SOLUTION_ITEMS.length;
const HEADER_HEIGHT = 80;

const sheetIn = stylex.keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

// stylex.attrs with reactive (accessor) arguments resolves at runtime here, because
// the StyleX compiler tries to evaluate them at build time and throws.
const sxProps: typeof stylex.attrs = (...args) => stylex.attrs(...args);

const styles = stylex.create({
  ground: {
    isolation: "isolate",
    backgroundColor: tone.solutionsGround,
  },
  head: {
    marginBottom: { default: 24, [XL]: 40 },
  },
  layout: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [LG]: "repeat(12, minmax(0, 1fr))" },
    columnGap: 24,
    rowGap: { default: 16, [MD]: 24 },
    alignItems: "start",
  },
  list: {
    display: { default: "none", [LG]: "flex" },
    flexDirection: "column",
    gridColumn: "1 / 4",
    gridRow: "1",
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.ink,
  },
  tab: {
    position: "relative",
    display: "flex",
    alignItems: "baseline",
    gap: 12,
    width: "100%",
    minHeight: 56,
    paddingBlock: 16,
    paddingInline: 16,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: tone.solutionsRule,
    backgroundColor: { default: "transparent", ":hover": tone.solutionsHover },
    fontFamily: "inherit",
    textAlign: "start",
    color: { default: tone.body, ":hover": FOCUS, ":active": FOCUS },
    cursor: "pointer",
    transitionProperty: "color, background-color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: FOCUS,
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
      transitionDuration: "240ms",
      transitionTimingFunction: motionCss.out,
    },
  },
  tabSelected: {
    backgroundColor: { default: tone.solutionsTint, ":hover": tone.solutionsTint },
    color: { default: tone.ink, ":hover": tone.ink, ":active": tone.ink },
    "::before": {
      transform: "scaleY(1)",
    },
  },
  tabIndex: {
    flexShrink: 0,
    width: 22,
    fontFamily: font.numeral,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "24px",
    fontVariantNumeric: "tabular-nums",
    color: tone.muted,
  },
  tabIndexSelected: {
    color: ACCENT,
  },
  tabName: {
    fontSize: 15,
    fontWeight: 400,
    lineHeight: "24px",
    letterSpacing: "0.02em",
  },
  tabNameSelected: {
    fontWeight: 500,
  },
  picker: {
    display: { default: "block", [LG]: "none" },
    maxWidth: { default: "none", [MD]: 420 },
    scrollMarginTop: HEADER_HEIGHT + 16,
  },
  selectWrap: {
    position: "relative",
  },
  select: {
    appearance: "none",
    display: "block",
    width: "100%",
    height: 48,
    margin: 0,
    paddingBlock: 0,
    paddingInlineStart: 16,
    paddingInlineEnd: 48,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: { default: tone.paperEdge, ":hover": FOCUS },
    borderRadius: 2,
    backgroundColor: tone.paper,
    fontFamily: "inherit",
    fontSize: 16,
    lineHeight: "24px",
    letterSpacing: "0.02em",
    color: tone.ink,
    cursor: "pointer",
    transitionProperty: "border-color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: FOCUS,
    outlineOffset: 2,
  },
  selectIcon: {
    position: "absolute",
    insetInlineEnd: 16,
    top: "50%",
    marginTop: -9,
    color: tone.muted,
    pointerEvents: "none",
  },
  stack: {
    display: "grid",
    gridColumn: { default: "1 / -1", [LG]: "4 / 13" },
    gridRow: { default: "auto", [LG]: "1" },
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: FOCUS,
    outlineOffset: 6,
  },
  pair: {
    gridArea: "1 / 1",
    display: { default: "flex", [MD]: "grid" },
    flexDirection: "column",
    gap: { default: 12, [MD]: 0 },
    gridTemplateColumns: { default: "none", [MD]: "minmax(0, 1fr) minmax(0, 2fr)" },
    alignItems: { default: "stretch", [MD]: "start" },
  },
  pairShown: {
    visibility: "visible",
    opacity: 1,
    transitionProperty: "opacity, visibility",
    transitionDuration: "220ms, 0s",
    transitionDelay: "0s, 0s",
    transitionTimingFunction: motionCss.out,
    animationName: { default: "none", [media.phoneMotion]: sheetIn },
    animationDuration: "220ms",
    animationTimingFunction: motionCss.out,
  },
  pairHidden: {
    display: { default: "none", [MD]: "grid" },
    visibility: "hidden",
    opacity: 0,
    pointerEvents: "none",
    transitionProperty: "opacity, visibility",
    transitionDuration: "140ms, 0s",
    transitionDelay: "0s, 140ms",
    transitionTimingFunction: "ease",
  },
  paper: {
    boxSizing: "border-box",
    backgroundColor: tone.paper,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: tone.paperEdge,
  },
  card: {
    position: "relative",
    zIndex: 1,
    gridColumn: { default: "auto", [MD]: "1 / 2" },
    gridRow: { default: "auto", [MD]: "1" },
    paddingTop: { default: 20, [XL]: 28 },
    paddingBottom: { default: 20, [XL]: 24 },
    paddingInline: { default: 20, [XL]: 28 },
    boxShadow: "0 10px 24px -18px rgba(16, 52, 38, 0.32)",
  },
  cardHead: {
    display: "flex",
    alignItems: "baseline",
    gap: 6,
  },
  cardNumber: {
    fontFamily: font.numeral,
    fontSize: 28,
    fontWeight: 500,
    lineHeight: "32px",
    letterSpacing: "-0.01em",
    fontVariantNumeric: "tabular-nums",
    color: ACCENT,
  },
  cardTotal: {
    fontFamily: font.numeral,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "20px",
    fontVariantNumeric: "tabular-nums",
    color: tone.muted,
  },
  cardTitle: {
    margin: 0,
    marginTop: 12,
    fontSize: { default: 20, [XL]: 22 },
    fontWeight: 500,
    lineHeight: { default: "28px", [XL]: "30px" },
    letterSpacing: "0.04em",
    textWrap: "balance",
    color: tone.ink,
  },
  facts: {
    margin: 0,
    marginTop: 20,
  },
  fact: {
    paddingTop: 14,
    paddingBottom: { default: 14, ":last-child": 0 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.paperRule,
  },
  factLabel: {
    margin: 0,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.06em",
    color: tone.muted,
  },
  factValue: {
    margin: 0,
    marginTop: 4,
  },
  plainLines: {
    margin: 0,
    padding: 0,
    listStyleType: "none",
    fontSize: 15,
    lineHeight: "24px",
    letterSpacing: "0.02em",
    color: tone.ink,
  },
  notes: {
    gridColumn: { default: "auto", [MD]: "2 / 3" },
    gridRow: { default: "auto", [MD]: "1" },
    alignSelf: { default: "auto", [MD]: "stretch" },
    marginTop: { default: 0, [MD]: 40 },
    marginInlineStart: { default: 0, [MD]: -24 },
    paddingTop: { default: 24, [XL]: 36 },
    paddingBottom: { default: 24, [XL]: 36 },
    paddingInlineStart: { default: 20, [MD]: 52, [XL]: 64 },
    paddingInlineEnd: { default: 20, [MD]: 28, [XL]: 44 },
  },
  lead: {
    margin: 0,
    maxWidth: "24em",
    fontSize: { default: 18, [XL]: 20 },
    fontWeight: 500,
    lineHeight: { default: "28px", [XL]: "30px" },
    letterSpacing: "0.04em",
    textWrap: "balance",
    color: tone.ink,
  },
  fields: {
    margin: 0,
    marginTop: { default: 20, [XL]: 28 },
  },
  field: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [XL]: "88px minmax(0, 1fr)" },
    columnGap: 24,
    rowGap: 6,
    paddingTop: 18,
    paddingBottom: { default: 18, ":last-child": 0 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.paperRule,
  },
  fieldLabel: {
    margin: 0,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: { default: "20px", [XL]: "26px" },
    letterSpacing: "0.04em",
    color: tone.muted,
  },
  fieldValue: {
    margin: 0,
    minWidth: 0,
  },
  bullets: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  bullet: {
    position: "relative",
    maxWidth: "36em",
    paddingInlineStart: 18,
    fontSize: 15,
    lineHeight: "26px",
    color: tone.body,
    textWrap: "pretty",
    "::before": {
      content: '""',
      position: "absolute",
      insetInlineStart: 0,
      top: 13,
      width: 8,
      height: 1,
      backgroundColor: ACCENT,
    },
  },
  pager: {
    display: { default: "grid", [LG]: "none" },
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.solutionsRule,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: tone.solutionsRule,
  },
  pagerButton: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    minWidth: 0,
    minHeight: 64,
    paddingBlock: 12,
    paddingInline: 8,
    borderWidth: 0,
    backgroundColor: {
      default: "transparent",
      ":hover": tone.solutionsHover,
      ":active": tone.solutionsTint,
    },
    fontFamily: "inherit",
    textAlign: "start",
    color: { default: tone.ink, ":hover": FOCUS },
    cursor: "pointer",
    transitionProperty: "color, background-color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: FOCUS,
    outlineOffset: -2,
  },
  pagerNext: {
    justifyContent: "flex-end",
    textAlign: "end",
    borderInlineStartWidth: 1,
    borderInlineStartStyle: "solid",
    borderInlineStartColor: tone.solutionsRule,
  },
  pagerDisabled: {
    backgroundColor: { default: "transparent", ":hover": "transparent", ":active": "transparent" },
    color: { default: tone.muted, ":hover": tone.muted },
    cursor: "default",
    opacity: 0.5,
  },
  pagerText: {
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
  },
  pagerLabel: {
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.06em",
    color: tone.muted,
  },
  pagerTitle: {
    overflow: "hidden",
    fontSize: 15,
    lineHeight: "24px",
    letterSpacing: "0.02em",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  pagerIcon: {
    flexShrink: 0,
  },
});

function PlainLines(props: { lines: string[] }) {
  return (
    <ul {...stylex.attrs(styles.plainLines)}>
      <For each={props.lines}>{(line) => <li>{line}</li>}</For>
    </ul>
  );
}

function Fact(props: { label: string; lines: string[] }) {
  return (
    <div {...stylex.attrs(styles.fact)}>
      <dt {...stylex.attrs(styles.factLabel)}>{props.label}</dt>
      <dd {...stylex.attrs(styles.factValue)}>
        <PlainLines lines={props.lines} />
      </dd>
    </div>
  );
}

function Field(props: { label: string; lines: string[] }) {
  return (
    <div {...stylex.attrs(styles.field)}>
      <dt {...stylex.attrs(styles.fieldLabel)}>{props.label}</dt>
      <dd {...stylex.attrs(styles.fieldValue)}>
        <ul {...stylex.attrs(styles.bullets)}>
          <For each={props.lines}>{(line) => <li {...stylex.attrs(styles.bullet)}>{line}</li>}</For>
        </ul>
      </dd>
    </div>
  );
}

function SheetPair(props: { item: SolutionItem; index: number; shown: boolean }) {
  const item = props.item;
  return (
    <div
      inert={!props.shown}
      {...stylex.attrs(styles.pair, props.shown ? styles.pairShown : styles.pairHidden)}
    >
      <div {...stylex.attrs(styles.paper, styles.card)}>
        <div {...stylex.attrs(styles.cardHead)}>
          <span {...stylex.attrs(styles.cardNumber)}>{padIndex(props.index)}</span>
          <span {...stylex.attrs(styles.cardTotal)}>/ {TOTAL}</span>
        </div>
        <h3 {...stylex.attrs(styles.cardTitle)}>{item.title}</h3>
        <dl {...stylex.attrs(styles.facts)}>
          <Fact label="功能" lines={item.functions} />
          <Fact label="质地" lines={item.texture} />
          <Fact label="应用" lines={item.applications} />
        </dl>
      </div>
      <div {...stylex.attrs(styles.paper, styles.notes)}>
        <p {...stylex.attrs(styles.lead)}>{item.subtitle}</p>
        <dl {...stylex.attrs(styles.fields)}>
          <Field label="概述" lines={item.overview} />
          <Field label="功能性成分" lines={item.keyIngredients} />
          {item.challenges.length > 0 && <Field label="配方挑战" lines={item.challenges} />}
        </dl>
      </div>
    </div>
  );
}

export function Solutions() {
  const reduce = useReducedMotion();
  const baseId = createUniqueId();
  const titleId = `${baseId}-title`;
  const panelId = `${baseId}-panel`;
  const selectId = `${baseId}-select`;
  const tabDomId = (index: number) => `${baseId}-tab-${index}`;
  const [selected, setSelected] = createSignal(0);
  const tabRefs: (HTMLButtonElement | undefined)[] = [];
  let pickerEl!: HTMLDivElement;
  const previous = () => SOLUTION_ITEMS[selected() - 1];
  const next = () => SOLUTION_ITEMS[selected() + 1];

  const onTabKeyDown = (event: KeyboardEvent) => {
    const current = selected();
    const target =
      event.key === "ArrowDown"
        ? (current + 1) % TOTAL
        : event.key === "ArrowUp"
          ? (current - 1 + TOTAL) % TOTAL
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? TOTAL - 1
              : -1;
    if (target < 0) return;
    event.preventDefault();
    setSelected(target);
    flush();
    tabRefs[target]?.focus();
  };

  const step = (delta: number) => {
    const target = selected() + delta;
    if (target < 0 || target >= TOTAL) return;
    const picker = pickerEl;
    if (picker && picker.getBoundingClientRect().top < HEADER_HEIGHT) {
      picker.scrollIntoView({ block: "start", behavior: reduce() ? "instant" : "smooth" });
    }
    setSelected(target);
  };

  return (
    <section
      id="products-solutions"
      aria-labelledby={titleId}
      {...stylex.attrs(ui.section, styles.ground)}
    >
      <div {...stylex.attrs(ui.shell)}>
        <header {...stylex.attrs(styles.head)}>
          <h2 id={titleId} {...stylex.attrs(ui.title)}>
            应用方案
          </h2>
        </header>
        <div {...stylex.attrs(styles.layout)}>
          <div
            role="tablist"
            aria-orientation="vertical"
            aria-labelledby={titleId}
            onKeyDown={onTabKeyDown}
            {...stylex.attrs(styles.list)}
          >
            {SOLUTION_ITEMS.map((item, index) => {
              const isSelected = () => index === selected();
              return (
                <button
                  ref={(node) => {
                    tabRefs[index] = node;
                  }}
                  type="button"
                  role="tab"
                  id={tabDomId(index)}
                  aria-selected={isSelected() ? "true" : "false"}
                  aria-controls={panelId}
                  tabindex={isSelected() ? 0 : -1}
                  onClick={() => setSelected(index)}
                  {...stylex.attrs(styles.tab, isSelected() && styles.tabSelected)}
                >
                  <span {...stylex.attrs(styles.tabIndex, isSelected() && styles.tabIndexSelected)}>
                    {padIndex(index)}
                  </span>
                  <span {...stylex.attrs(styles.tabName, isSelected() && styles.tabNameSelected)}>
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>
          <div ref={pickerEl} {...stylex.attrs(styles.picker)}>
            <label for={selectId} {...stylex.attrs(ui.srOnly)}>
              Choose an application solution
            </label>
            <div {...stylex.attrs(styles.selectWrap)}>
              <select
                id={selectId}
                value={selected()}
                aria-controls={panelId}
                onChange={(event) => setSelected(Number(event.currentTarget.value))}
                {...stylex.attrs(styles.select)}
              >
                {SOLUTION_ITEMS.map((item, index) => (
                  <option value={index}>{`${padIndex(index)}　${item.title}`}</option>
                ))}
              </select>
              <ChevronDown
                aria-hidden="true"
                size={18}
                strokeWidth={1.5}
                absoluteStrokeWidth
                {...stylex.attrs(styles.selectIcon)}
              />
            </div>
          </div>
          <div
            role="tabpanel"
            id={panelId}
            aria-labelledby={tabDomId(selected())}
            tabindex={0}
            {...stylex.attrs(styles.stack)}
          >
            {SOLUTION_ITEMS.map((item, index) => (
              <SheetPair item={item} index={index} shown={index === selected()} />
            ))}
          </div>
          <div {...stylex.attrs(styles.pager)}>
            <button
              type="button"
              disabled={!previous()}
              aria-controls={panelId}
              onClick={() => step(-1)}
              {...sxProps(styles.pagerButton, !previous() && styles.pagerDisabled)}
            >
              <ChevronLeft
                aria-hidden="true"
                size={18}
                strokeWidth={1.5}
                absoluteStrokeWidth
                {...stylex.attrs(styles.pagerIcon)}
              />
              <span {...stylex.attrs(styles.pagerText)}>
                <span {...stylex.attrs(styles.pagerLabel)}>上一个</span>
                {previous() && (
                  <span {...stylex.attrs(styles.pagerTitle)}>{previous()!.title}</span>
                )}
              </span>
            </button>
            <button
              type="button"
              disabled={!next()}
              aria-controls={panelId}
              onClick={() => step(1)}
              {...sxProps(styles.pagerButton, styles.pagerNext, !next() && styles.pagerDisabled)}
            >
              <span {...stylex.attrs(styles.pagerText)}>
                <span {...stylex.attrs(styles.pagerLabel)}>下一个</span>
                {next() && <span {...stylex.attrs(styles.pagerTitle)}>{next()!.title}</span>}
              </span>
              <ChevronRight
                aria-hidden="true"
                size={18}
                strokeWidth={1.5}
                absoluteStrokeWidth
                {...stylex.attrs(styles.pagerIcon)}
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
