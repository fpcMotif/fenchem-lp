import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ArrowLeft, ArrowRight } from "@fenchem-lp/ui/components/lucide";
import { m } from "@/compat/motion";
import { createEffect, createSignal, createUniqueId, For } from "solid-js";

import { EASE } from "@/components/prototype/motion-constants";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { SOLUTION_ITEMS, type SolutionItem } from "../../products-data";
import { padIndex } from "../shared/derived";

const INK = "#1a1a1a";
const BODY_TEXT = "#4d4d4d";
const MUTED = "#6b6b70";
const DISABLED_TEXT = "#a59fa8";
const GROUND = "#fbf8fc";
const PAPER = "#ffffff";
const PAPER_EDGE = "#e5dce8";
const RULE = "#ece5ee";
const TICK = "#bdb3c1";
const ACCENT = colors.brandGreen700;
const EASE_OUT_CSS = "cubic-bezier(0.22, 1, 0.36, 1)";
const BODY_FONT =
  '"Source Han Sans SC", "Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif';
const NUMERAL_FONT =
  '"Inter Tight", "Source Han Sans SC", "Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif';

const TABLET = "@media (min-width: 768px) and (max-width: 1279.98px)";
const DESKTOP = "@media (min-width: 1280px)";
const MD = "@media (min-width: 768px)";
const INSET = "min(120px, 8.333vw)";
const HEADER_HEIGHT = 80;
const SHEET_PAD = { default: 20, [TABLET]: 28, [DESKTOP]: 32 } as const;
const FIELD_COLUMNS_DESKTOP = "minmax(0, 5fr) minmax(0, 3fr) minmax(0, 4fr)";

const TOTAL = SOLUTION_ITEMS.length;
const LAST = TOTAL - 1;

const FIELDS: { label: string; pick: (item: SolutionItem) => string[] }[] = [
  { label: "概述", pick: (item) => item.overview },
  { label: "功能", pick: (item) => item.functions },
  { label: "功能性成分", pick: (item) => item.keyIngredients },
  { label: "配方挑战", pick: (item) => item.challenges },
  { label: "质地", pick: (item) => item.texture },
  { label: "应用", pick: (item) => item.applications },
];

// stylex.attrs with reactive (accessor) arguments resolves at runtime here, because
// the StyleX compiler tries to evaluate them at build time and throws.
const sxProps: typeof stylex.attrs = (...args) => stylex.attrs(...args);

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
  title: {
    margin: 0,
    fontSize: { default: 26, [TABLET]: 28, [DESKTOP]: 32 },
    fontWeight: 400,
    lineHeight: { default: "34px", [TABLET]: "36px", [DESKTOP]: "40px" },
    letterSpacing: "0.04em",
    color: INK,
  },

  tablist: {
    position: "relative",
    display: { default: "flex", [MD]: "grid" },
    gridTemplateColumns: {
      default: null,
      [TABLET]: "repeat(auto-fill, minmax(176px, 1fr))",
      [DESKTOP]: "repeat(5, minmax(0, 1fr))",
    },
    columnGap: 24,
    marginTop: { default: 20, [DESKTOP]: 28 },
    marginInline: { default: -16, [MD]: 0 },
    paddingInline: { default: 16, [MD]: 0 },
    scrollPaddingInline: 16,
    overflowX: { default: "auto", [MD]: "visible" },
    scrollbarWidth: "none",
    boxShadow: { default: `inset 0 -1px 0 ${RULE}`, [MD]: "none" },
  },
  chip: {
    position: "relative",
    display: "flex",
    alignItems: "baseline",
    gap: 10,
    flexShrink: 0,
    minHeight: 48,
    paddingBlock: 14,
    paddingInline: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    boxShadow: `inset 0 -1px 0 ${RULE}`,
    fontFamily: "inherit",
    textAlign: "start",
    whiteSpace: "nowrap",
    color: { default: BODY_TEXT, ":hover": colors.brandBlue700 },
    cursor: "pointer",
    transitionProperty: "color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: -2,
    "::after": {
      content: '""',
      position: "absolute",
      insetInline: 0,
      bottom: 0,
      height: 2,
      backgroundColor: ACCENT,
      transform: "scaleX(0)",
      transformOrigin: "left center",
      transitionProperty: "transform",
      transitionDuration: "300ms",
      transitionTimingFunction: EASE_OUT_CSS,
    },
  },
  chipSelected: {
    color: { default: ACCENT, ":hover": ACCENT },
    "::after": {
      transform: "scaleX(1)",
    },
  },
  chipNumber: {
    fontFamily: NUMERAL_FONT,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: MUTED,
  },
  chipNumberSelected: {
    color: "inherit",
  },
  chipTitle: {
    fontSize: 15,
    fontWeight: 400,
    lineHeight: "20px",
    letterSpacing: "0.02em",
    color: "inherit",
  },

  paper: {
    marginTop: { default: 24, [DESKTOP]: 32 },
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: PAPER_EDGE,
    borderRadius: 2,
    backgroundColor: PAPER,
    boxShadow: "0 1px 2px rgba(56, 32, 64, 0.05)",
    scrollMarginTop: HEADER_HEIGHT + 16,
  },
  stack: {
    display: { default: "block", [MD]: "grid" },
    gridTemplateColumns: "minmax(0, 1fr)",
  },
  panel: {
    display: "flex",
    flexDirection: "column",
    gridArea: { default: null, [MD]: "1 / 1" },
    minWidth: 0,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: -2,
  },
  panelIdle: {
    display: { default: "none", [MD]: "flex" },
    visibility: "hidden",
    pointerEvents: "none",
  },
  sheetHead: {
    paddingInline: SHEET_PAD,
    paddingTop: { default: 24, [MD]: 32 },
    paddingBottom: { default: 20, [MD]: 28 },
  },
  sheetNumber: {
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
    marginTop: 8,
    fontSize: { default: 22, [MD]: 24 },
    fontWeight: 500,
    lineHeight: { default: "30px", [MD]: "32px" },
    letterSpacing: "0.04em",
    color: INK,
    textWrap: "balance",
  },
  sheetSubtitle: {
    margin: 0,
    marginTop: 6,
    maxWidth: 560,
    fontSize: 15,
    lineHeight: "24px",
    color: BODY_TEXT,
    textWrap: "pretty",
  },
  fields: {
    flexGrow: 1,
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [TABLET]: "repeat(2, minmax(0, 1fr))",
      [DESKTOP]: FIELD_COLUMNS_DESKTOP,
    },
    gap: 1,
    margin: 0,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: RULE,
    backgroundColor: RULE,
  },
  field: {
    minWidth: 0,
    paddingInline: SHEET_PAD,
    paddingTop: { default: 20, [MD]: 24 },
    paddingBottom: { default: 24, [MD]: 28 },
    backgroundColor: PAPER,
  },
  fieldLabel: {
    margin: 0,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "0.08em",
    color: MUTED,
  },
  fieldValue: {
    margin: 0,
    marginTop: 12,
  },
  lines: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  line: {
    position: "relative",
    paddingInlineStart: 14,
    fontSize: 14,
    lineHeight: "22px",
    color: BODY_TEXT,
    textWrap: "pretty",
    "::before": {
      content: '""',
      position: "absolute",
      insetInlineStart: 0,
      top: 11,
      width: 6,
      height: 1,
      backgroundColor: TICK,
    },
  },
  empty: {
    fontSize: 14,
    lineHeight: "22px",
    color: MUTED,
  },

  foot: {
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(2, minmax(0, 1fr))",
      [DESKTOP]: FIELD_COLUMNS_DESKTOP,
    },
    gap: 1,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: RULE,
    backgroundColor: RULE,
  },
  footButton: {
    display: "flex",
    alignItems: "center",
    gap: { default: 10, [MD]: 14 },
    minWidth: 0,
    minHeight: 68,
    paddingInline: SHEET_PAD,
    paddingBlock: 12,
    borderWidth: 0,
    backgroundColor: { default: PAPER, ":hover": GROUND },
    fontFamily: "inherit",
    textAlign: "start",
    color: { default: INK, ":hover": colors.brandBlue700 },
    cursor: "pointer",
    transitionProperty: "color, background-color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: -2,
  },
  footNext: {
    gridColumn: { default: null, [DESKTOP]: "2 / 4" },
    justifyContent: "flex-end",
    textAlign: "end",
  },
  footDisabled: {
    color: { default: DISABLED_TEXT, ":hover": DISABLED_TEXT },
    backgroundColor: { default: PAPER, ":hover": PAPER },
    cursor: "default",
  },
  footArrow: {
    flexShrink: 0,
  },
  footText: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    minWidth: 0,
  },
  footLabel: {
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "0.08em",
    color: MUTED,
  },
  footLabelDisabled: {
    color: DISABLED_TEXT,
  },
  footTitle: {
    fontSize: { default: 14, [MD]: 15 },
    lineHeight: "22px",
    letterSpacing: "0.02em",
    color: "inherit",
  },
  footIndex: {
    fontFamily: NUMERAL_FONT,
    fontSize: 12,
    fontWeight: 500,
    fontVariantNumeric: "tabular-nums",
    marginInlineEnd: 8,
  },
  srOnly: {
    position: "absolute",
    width: 1,
    height: 1,
    overflow: "hidden",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
  },
});

function Field(props: { label: string; lines: string[] }) {
  return (
    <div {...stylex.attrs(styles.field)}>
      <dt {...stylex.attrs(styles.fieldLabel)}>{props.label}</dt>
      <dd {...stylex.attrs(styles.fieldValue)}>
        {props.lines.length > 0 ? (
          <ul {...stylex.attrs(styles.lines)}>
            <For each={props.lines}>{(line) => <li {...stylex.attrs(styles.line)}>{line}</li>}</For>
          </ul>
        ) : (
          <>
            <span aria-hidden="true" {...stylex.attrs(styles.empty)}>
              —
            </span>
            <span {...stylex.attrs(styles.srOnly)}>None</span>
          </>
        )}
      </dd>
    </div>
  );
}

function SheetBody(props: { item: SolutionItem; index: number }) {
  return (
    <>
      <header {...stylex.attrs(styles.sheetHead)}>
        <p {...stylex.attrs(styles.sheetNumber)}>
          <span {...stylex.attrs(styles.sheetNumberCurrent)}>{padIndex(props.index)}</span> /{" "}
          {padIndex(LAST)}
        </p>
        <h3 {...stylex.attrs(styles.sheetTitle)}>{props.item.title}</h3>
        <p {...stylex.attrs(styles.sheetSubtitle)}>{props.item.subtitle}</p>
      </header>
      <dl {...stylex.attrs(styles.fields)}>
        {FIELDS.map((field) => (
          <Field label={field.label} lines={field.pick(props.item)} />
        ))}
      </dl>
    </>
  );
}

function FootButton(props: {
  direction: "prev" | "next";
  target: number | null;
  controls: string;
  onGo: (index: number) => void;
}) {
  const disabled = () => props.target === null;
  const neighbour = () => (props.target === null ? null : SOLUTION_ITEMS[props.target]);
  const Arrow = props.direction === "prev" ? ArrowLeft : ArrowRight;
  const arrow = () => (
    <Arrow
      size={16}
      strokeWidth={1.5}
      absoluteStrokeWidth
      aria-hidden="true"
      {...stylex.attrs(styles.footArrow)}
    />
  );
  return (
    <button
      type="button"
      aria-disabled={disabled() ? "true" : undefined}
      aria-controls={props.controls}
      onClick={() => {
        const target = props.target;
        if (target !== null) props.onGo(target);
      }}
      {...stylex.attrs(
        styles.footButton,
        props.direction === "next" && styles.footNext,
        disabled() && styles.footDisabled,
      )}
    >
      {props.direction === "prev" && arrow()}
      <span {...stylex.attrs(styles.footText)}>
        <span {...stylex.attrs(styles.footLabel, disabled() && styles.footLabelDisabled)}>
          {props.direction === "prev" ? "上一个" : "下一个"}
        </span>
        {neighbour() && props.target !== null && (
          <span {...stylex.attrs(styles.footTitle)}>
            <span {...stylex.attrs(styles.footIndex)}>{padIndex(props.target)}</span>
            {neighbour()?.title}
          </span>
        )}
      </span>
      {props.direction === "next" && arrow()}
    </button>
  );
}

export function Solutions() {
  const reduce = useReducedMotion();
  const baseId = createUniqueId();
  const titleId = `${baseId}-title`;
  const tabId = (index: number) => `${baseId}-tab-${index}`;
  const panelId = (index: number) => `${baseId}-panel-${index}`;
  const [active, setActive] = createSignal(0);
  const [announcement, setAnnouncement] = createSignal("");
  let list: HTMLDivElement | undefined;
  let paper: HTMLDivElement | undefined;
  const tabs: (HTMLButtonElement | undefined)[] = [];

  createEffect(
    () => [active(), reduce()] as const,
    ([index, reduced]) => {
      const tab = tabs[index];
      if (!list || !tab || list.scrollWidth <= list.clientWidth) return;
      const left = tab.offsetLeft - (list.clientWidth - tab.offsetWidth) / 2;
      list.scrollTo({ left, behavior: reduced ? "auto" : "smooth" });
    },
  );

  const selectFromTabs = (index: number) => {
    setActive(index);
    setAnnouncement("");
  };

  const selectFromFoot = (index: number) => {
    setActive(index);
    setAnnouncement(`${padIndex(index)} ${SOLUTION_ITEMS[index]?.englishName ?? ""}`);
    if (paper && paper.getBoundingClientRect().top < HEADER_HEIGHT) {
      paper.scrollIntoView({ behavior: reduce() ? "auto" : "smooth", block: "start" });
    }
  };

  const onTabKeyDown = (event: KeyboardEvent) => {
    const current = active();
    const next =
      event.key === "ArrowRight"
        ? current === LAST
          ? 0
          : current + 1
        : event.key === "ArrowLeft"
          ? current === 0
            ? LAST
            : current - 1
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? LAST
              : null;
    if (next === null) return;
    event.preventDefault();
    selectFromTabs(next);
    tabs[next]?.focus();
  };

  return (
    <section
      id="products-solutions"
      aria-labelledby={titleId}
      lang="zh-CN"
      {...stylex.attrs(styles.section)}
    >
      <div {...stylex.attrs(styles.shell)}>
        <h2 id={titleId} {...stylex.attrs(styles.title)}>
          应用方案
        </h2>
        <div
          ref={list}
          role="tablist"
          aria-labelledby={titleId}
          aria-orientation="horizontal"
          onKeyDown={onTabKeyDown}
          {...stylex.attrs(styles.tablist)}
        >
          {SOLUTION_ITEMS.map((item, index) => {
            const isActive = () => index === active();
            return (
              <button
                ref={(node) => {
                  tabs[index] = node;
                }}
                type="button"
                role="tab"
                id={tabId(index)}
                aria-selected={isActive() ? "true" : "false"}
                aria-controls={panelId(index)}
                tabindex={isActive() ? 0 : -1}
                onClick={() => selectFromTabs(index)}
                {...stylex.attrs(styles.chip, isActive() && styles.chipSelected)}
              >
                <span {...stylex.attrs(styles.chipNumber, isActive() && styles.chipNumberSelected)}>
                  {padIndex(index)}
                </span>
                <span {...stylex.attrs(styles.chipTitle)}>{item.title}</span>
              </button>
            );
          })}
        </div>
        <div ref={paper} {...stylex.attrs(styles.paper)}>
          <div {...stylex.attrs(styles.stack)}>
            {SOLUTION_ITEMS.map((item, index) => {
              const isActive = () => index === active();
              return (
                <m.div
                  role="tabpanel"
                  id={panelId(index)}
                  aria-labelledby={tabId(index)}
                  tabindex={isActive() ? 0 : -1}
                  inert={!isActive()}
                  initial={false}
                  animate={isActive() ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                  transition={
                    isActive() && !reduce() ? { duration: 0.24, ease: EASE } : { duration: 0 }
                  }
                  {...sxProps(styles.panel, !isActive() && styles.panelIdle)}
                >
                  <SheetBody item={item} index={index} />
                </m.div>
              );
            })}
          </div>
          <div {...stylex.attrs(styles.foot)}>
            <FootButton
              direction="prev"
              target={active() > 0 ? active() - 1 : null}
              controls={panelId(active())}
              onGo={selectFromFoot}
            />
            <FootButton
              direction="next"
              target={active() < LAST ? active() + 1 : null}
              controls={panelId(active())}
              onGo={selectFromFoot}
            />
          </div>
        </div>
        <p aria-live="polite" {...stylex.attrs(styles.srOnly)}>
          {announcement()}
        </p>
      </div>
    </section>
  );
}
