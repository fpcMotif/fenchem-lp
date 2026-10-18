import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ChevronDown } from "@fenchem-lp/ui/components/lucide";
import { AnimatePresence, m } from "@/compat/motion";
import { createEffect, createSignal, createUniqueId, For, onSettled, Show } from "solid-js";
import type { JSX } from "@solidjs/web";

import { EASE } from "@/components/prototype/motion-constants";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { SOLUTION_ITEMS, type SolutionItem } from "../../products-data";
import { padIndex, splitTitle } from "../shared/derived";

const GROUND = "#262118";
const GROUND_RAISED = "#2f291f";
const LIGHT = "#efe8da";
const LIGHT_SOFT = "#d3c9b6";
const LIGHT_MUTED = "#b9ad98";
const LIGHT_RULE = "rgba(239, 232, 218, 0.14)";
const LIGHT_RULE_STRONG = "rgba(239, 232, 218, 0.4)";
const LIGHT_WASH = "rgba(239, 232, 218, 0.06)";
const LIGHT_HOVER = "rgba(239, 232, 218, 0.04)";
const PAPER = "#f7f2e8";
const PAPER_RULE = "#e4dbca";
const INK = "#1a1a1a";
const BODY_TEXT = "#4d4d4d";
const MUTED = "#6b6b70";
const ACCENT = colors.brandGreen700;
const ACCENT_ON_DARK = colors.brandGreen300;
const FOCUS_ON_DARK = colors.brandBlue300;
const EASE_OUT_CSS = "cubic-bezier(0.22, 1, 0.36, 1)";
const BODY_FONT =
  '"Source Han Sans SC", "Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif';
const NUMERAL_FONT = '"Inter Tight", "Source Han Sans SC", "Noto Sans SC", sans-serif';

const TABLET = "@media (min-width: 768px) and (max-width: 1279.98px)";
const DESKTOP = "@media (min-width: 1280px)";
const SM = "@media (min-width: 640px) and (max-width: 1023.98px)";
const LG = "@media (min-width: 1024px)";
const MOTION_OK = "@media (prefers-reduced-motion: no-preference)";
const INSET = "min(120px, 8.333vw)";
const HEADER_HEIGHT = 80;
const JUMP_BAR_HEIGHT = 52;
const LABEL_COLUMNS = "120px minmax(0, 1fr)";
const SPY_BAND = "-30% 0px -60% 0px";

const TOTAL_LABEL = String(SOLUTION_ITEMS.length).padStart(2, "0");

const styles = stylex.create({
  section: {
    paddingTop: { default: 64, [DESKTOP]: 96 },
    paddingBottom: { default: 72, [DESKTOP]: 112 },
    scrollMarginTop: HEADER_HEIGHT,
    backgroundColor: GROUND,
    color: LIGHT,
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
    marginBottom: { default: 32, [DESKTOP]: 56 },
  },
  title: {
    margin: 0,
    fontSize: { default: 26, [TABLET]: 28, [DESKTOP]: 32 },
    fontWeight: 400,
    lineHeight: { default: "34px", [TABLET]: "36px", [DESKTOP]: "40px" },
    letterSpacing: "0.04em",
    textWrap: "balance",
    color: LIGHT,
  },

  layout: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [LG]: "repeat(12, minmax(0, 1fr))" },
    columnGap: 24,
    alignItems: "start",
  },
  nav: {
    display: { default: "none", [LG]: "block" },
    gridColumn: { default: null, [LG]: "1 / 4" },
    position: "sticky",
    top: HEADER_HEIGHT + 32,
  },
  navList: {
    margin: 0,
    padding: 0,
    listStyleType: "none",
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: LIGHT_RULE_STRONG,
  },
  navButton: {
    position: "relative",
    display: "flex",
    alignItems: "baseline",
    gap: 12,
    width: "100%",
    minHeight: 48,
    paddingBlock: 12,
    paddingInlineStart: 16,
    paddingInlineEnd: 12,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: LIGHT_RULE,
    backgroundColor: { default: "transparent", ":hover": LIGHT_HOVER },
    fontFamily: "inherit",
    textAlign: "start",
    color: { default: LIGHT_SOFT, ":hover": LIGHT },
    cursor: "pointer",
    transitionProperty: "color, background-color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: FOCUS_ON_DARK,
    outlineOffset: -2,
    "::before": {
      content: '""',
      position: "absolute",
      insetBlock: 0,
      insetInlineStart: 0,
      width: 2,
      backgroundColor: ACCENT_ON_DARK,
      transform: "scaleY(0)",
      transformOrigin: "center top",
      transitionProperty: "transform",
      transitionDuration: { default: "0s", [MOTION_OK]: "240ms" },
      transitionTimingFunction: EASE_OUT_CSS,
    },
  },
  navButtonActive: {
    backgroundColor: { default: LIGHT_WASH, ":hover": LIGHT_WASH },
    color: { default: LIGHT, ":hover": LIGHT },
    "::before": {
      transform: "scaleY(1)",
    },
  },
  navNumber: {
    flexShrink: 0,
    width: 20,
    fontFamily: NUMERAL_FONT,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: LIGHT_MUTED,
    transitionProperty: "color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
  },
  numberActive: {
    color: ACCENT_ON_DARK,
  },
  navTitle: {
    minWidth: 0,
    fontSize: 15,
    fontWeight: 400,
    lineHeight: "24px",
    letterSpacing: "0.02em",
  },
  titleActive: {
    fontWeight: 500,
  },

  jump: {
    display: { default: "block", [LG]: "none" },
    position: "sticky",
    top: HEADER_HEIGHT,
    zIndex: 1,
    marginInline: { default: -16, [TABLET]: -40 },
    marginBottom: 16,
  },
  jumpButton: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    width: "100%",
    height: JUMP_BAR_HEIGHT,
    paddingInline: { default: 16, [TABLET]: 40 },
    borderWidth: 0,
    borderBlockWidth: 1,
    borderBlockStyle: "solid",
    borderBlockColor: LIGHT_RULE,
    backgroundColor: GROUND,
    fontFamily: "inherit",
    textAlign: "start",
    color: LIGHT,
    cursor: "pointer",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: FOCUS_ON_DARK,
    outlineOffset: -2,
  },
  jumpCount: {
    flexShrink: 0,
    fontFamily: NUMERAL_FONT,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: LIGHT_MUTED,
  },
  jumpCurrent: {
    color: ACCENT_ON_DARK,
  },
  jumpDivider: {
    flexShrink: 0,
    color: LIGHT_MUTED,
  },
  jumpTitle: {
    flexGrow: 1,
    minWidth: 0,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    fontSize: 15,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.02em",
  },
  jumpIcon: {
    display: "flex",
    flexShrink: 0,
    color: LIGHT_SOFT,
    transform: "rotate(0deg)",
    transitionProperty: "transform",
    transitionDuration: { default: "0s", [MOTION_OK]: "240ms" },
    transitionTimingFunction: EASE_OUT_CSS,
  },
  jumpIconOpen: {
    transform: "rotate(180deg)",
  },
  jumpPanel: {
    position: "absolute",
    top: "100%",
    insetInline: 0,
    maxHeight: `calc(100dvh - ${HEADER_HEIGHT + JUMP_BAR_HEIGHT + 24}px)`,
    overflowY: "auto",
    overscrollBehavior: "contain",
    backgroundColor: GROUND_RAISED,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: LIGHT_RULE,
    boxShadow: "0 6px 16px rgba(0, 0, 0, 0.28)",
  },
  jumpList: {
    margin: 0,
    paddingBlock: 4,
    paddingInline: 0,
    listStyleType: "none",
  },
  jumpOption: {
    display: "flex",
    alignItems: "baseline",
    gap: 12,
    width: "100%",
    minHeight: 48,
    paddingBlock: 12,
    paddingInline: { default: 16, [TABLET]: 40 },
    borderWidth: 0,
    backgroundColor: { default: "transparent", ":hover": LIGHT_HOVER },
    fontFamily: "inherit",
    textAlign: "start",
    color: { default: LIGHT_SOFT, ":hover": LIGHT },
    cursor: "pointer",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: FOCUS_ON_DARK,
    outlineOffset: -2,
  },
  jumpOptionActive: {
    backgroundColor: { default: LIGHT_WASH, ":hover": LIGHT_WASH },
    color: { default: LIGHT, ":hover": LIGHT },
  },

  sheets: {
    gridColumn: { default: "1 / -1", [LG]: "4 / 13" },
    display: "flex",
    flexDirection: "column",
    gap: { default: 20, [LG]: 40 },
  },
  sheet: {
    position: "relative",
    paddingInline: { default: 20, [SM]: 32, [LG]: 48 },
    paddingBottom: { default: 4, [LG]: 12 },
    borderRadius: 2,
    backgroundColor: PAPER,
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.32)",
    color: INK,
    scrollMarginTop: { default: HEADER_HEIGHT + JUMP_BAR_HEIGHT + 16, [LG]: HEADER_HEIGHT + 32 },
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: FOCUS_ON_DARK,
    outlineOffset: 4,
  },
  sheetHead: {
    position: { default: "static", [LG]: "sticky" },
    top: { default: "auto", [LG]: HEADER_HEIGHT },
    zIndex: 1,
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [SM]: LABEL_COLUMNS, [LG]: LABEL_COLUMNS },
    columnGap: 32,
    rowGap: 4,
    alignItems: "baseline",
    paddingTop: { default: 20, [LG]: 28 },
    paddingBottom: { default: 16, [LG]: 20 },
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: INK,
    backgroundColor: PAPER,
  },
  sheetNumber: {
    fontFamily: NUMERAL_FONT,
    fontSize: 14,
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
    fontSize: { default: 20, [LG]: 22 },
    fontWeight: 500,
    lineHeight: "30px",
    letterSpacing: "0.04em",
    textWrap: "balance",
    color: INK,
  },
  sheetSubtitle: {
    margin: 0,
    marginTop: 4,
    maxWidth: "40em",
    fontSize: 15,
    lineHeight: "24px",
    color: BODY_TEXT,
    textWrap: "pretty",
  },
  fields: {
    margin: 0,
  },
  field: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [SM]: LABEL_COLUMNS, [LG]: LABEL_COLUMNS },
    columnGap: 32,
    rowGap: 4,
    paddingBlock: { default: 16, [LG]: 18 },
    borderBottomWidth: { default: 1, ":last-child": 0 },
    borderBottomStyle: "solid",
    borderBottomColor: PAPER_RULE,
  },
  fieldLabel: {
    margin: 0,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: { default: "20px", [SM]: "26px", [LG]: "26px" },
    letterSpacing: "0.04em",
    color: MUTED,
  },
  fieldValue: {
    margin: 0,
    maxWidth: "40em",
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
  inline: {
    display: "flex",
    flexWrap: "wrap",
    columnGap: 28,
    rowGap: 4,
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  ingredient: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 16,
  },
  ingredientNote: {
    flexShrink: 0,
    fontSize: 13,
    fontVariantNumeric: "tabular-nums",
    color: MUTED,
  },
});

function Field(props: { label: string; children: JSX.Element }) {
  return (
    <div {...stylex.attrs(styles.field)}>
      <dt {...stylex.attrs(styles.fieldLabel)}>{props.label}</dt>
      <dd {...stylex.attrs(styles.fieldValue)}>{props.children}</dd>
    </div>
  );
}

function Lines(props: { lines: string[] }) {
  return (
    <ul {...stylex.attrs(styles.lines)}>
      <For each={props.lines}>{(line) => <li {...stylex.attrs(styles.line)}>{line}</li>}</For>
    </ul>
  );
}

function Inline(props: { items: string[] }) {
  return (
    <ul {...stylex.attrs(styles.inline)}>
      <For each={props.items}>{(entry) => <li>{entry}</li>}</For>
    </ul>
  );
}

function Sheet(props: {
  item: SolutionItem;
  index: number;
  current: boolean;
  sheetRef: (node: HTMLElement) => void;
}) {
  const titleId = createUniqueId();
  const item = props.item;
  return (
    <article
      ref={props.sheetRef}
      tabindex={-1}
      aria-labelledby={titleId}
      data-sheet-index={props.index}
      {...stylex.attrs(styles.sheet)}
    >
      <header {...stylex.attrs(styles.sheetHead)}>
        <span {...stylex.attrs(styles.sheetNumber)}>
          <span {...stylex.attrs(props.current && styles.sheetNumberCurrent)}>
            {padIndex(props.index)}
          </span>
          {` / ${TOTAL_LABEL}`}
        </span>
        <div>
          <h3 id={titleId} {...stylex.attrs(styles.sheetTitle)}>
            {item.title}
          </h3>
          <p {...stylex.attrs(styles.sheetSubtitle)}>{item.subtitle}</p>
        </div>
      </header>
      <dl {...stylex.attrs(styles.fields)}>
        <Field label="概述">
          <Lines lines={item.overview} />
        </Field>
        <Field label="功能">
          <Inline items={item.functions} />
        </Field>
        <Field label="功能性成分">
          <ul {...stylex.attrs(styles.lines)}>
            {item.keyIngredients.map((ingredient) => {
              const part = splitTitle(ingredient);
              return (
                <li {...stylex.attrs(styles.ingredient)}>
                  <span>{part.primary}</span>
                  {part.secondary && (
                    <span {...stylex.attrs(styles.ingredientNote)}>{part.secondary}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </Field>
        {item.challenges.length > 0 && (
          <Field label="配方挑战">
            <Lines lines={item.challenges} />
          </Field>
        )}
        <Field label="质地">
          <Inline items={item.texture} />
        </Field>
        <Field label="应用">
          <Inline items={item.applications} />
        </Field>
      </dl>
    </article>
  );
}

const optionTarget = (key: string, focused: number, last: number): number | null => {
  if (key === "ArrowDown") return Math.min(focused + 1, last);
  if (key === "ArrowUp") return Math.max(focused - 1, 0);
  if (key === "Home") return 0;
  if (key === "End") return last;
  return null;
};

function JumpBar(props: { active: number; onJump: (index: number) => void }) {
  const reduce = useReducedMotion();
  const panelId = createUniqueId();
  const [openedAt, setOpenedAt] = createSignal<number | null>(null);
  const open = () => openedAt() !== null;
  let wrap: HTMLDivElement | undefined;
  let trigger: HTMLButtonElement | undefined;
  const options: (HTMLButtonElement | undefined)[] = [];
  const current = () => SOLUTION_ITEMS[props.active];

  const close = (returnFocus: boolean) => {
    setOpenedAt(null);
    if (returnFocus) trigger?.focus();
  };

  createEffect(openedAt, (at) => {
    if (at === null) return;
    options[at]?.focus({ preventScroll: true });
    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && wrap?.contains(event.target)) return;
      close(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  });

  const onKeyDown = (event: KeyboardEvent) => {
    if (!open()) return;
    if (event.key === "Escape") {
      event.preventDefault();
      close(true);
      return;
    }
    const mounted = options.filter((node): node is HTMLButtonElement => node?.isConnected === true);
    const focused = mounted.findIndex((node) => node === document.activeElement);
    const target = optionTarget(event.key, focused, mounted.length - 1);
    if (target === null) return;
    event.preventDefault();
    mounted[target]?.focus();
  };

  const onBlur = (event: FocusEvent) => {
    if (!open()) return;
    const next = event.relatedTarget;
    if (next instanceof Node && wrap?.contains(next)) return;
    if (next === null) return;
    close(false);
  };

  return (
    <div ref={wrap} onKeyDown={onKeyDown} onFocusOut={onBlur} {...stylex.attrs(styles.jump)}>
      <button
        ref={trigger}
        type="button"
        aria-expanded={open() ? "true" : "false"}
        aria-controls={panelId}
        onClick={() => setOpenedAt(open() ? null : props.active)}
        {...stylex.attrs(styles.jumpButton)}
      >
        <span {...stylex.attrs(styles.jumpCount)}>
          <span {...stylex.attrs(styles.jumpCurrent)}>{padIndex(props.active)}</span>
          {` / ${TOTAL_LABEL}`}
        </span>
        <span aria-hidden="true" {...stylex.attrs(styles.jumpDivider)}>
          ·
        </span>
        <span {...stylex.attrs(styles.jumpTitle)}>{current()?.title}</span>
        <span aria-hidden="true" {...stylex.attrs(styles.jumpIcon, open() && styles.jumpIconOpen)}>
          <ChevronDown size={18} strokeWidth={1.5} absoluteStrokeWidth />
        </span>
      </button>
      <AnimatePresence initial={false}>
        <Show when={open()}>
          <m.div
            id={panelId}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: reduce() ? 0 : 0.18, ease: EASE }}
            {...stylex.attrs(styles.jumpPanel)}
          >
            <ol aria-label="Application solution list" {...stylex.attrs(styles.jumpList)}>
              {SOLUTION_ITEMS.map((item, index) => {
                const isActive = () => index === props.active;
                return (
                  <li>
                    <button
                      ref={(node) => {
                        options[index] = node;
                      }}
                      type="button"
                      aria-current={isActive() ? "true" : undefined}
                      onClick={() => {
                        setOpenedAt(null);
                        props.onJump(index);
                      }}
                      {...stylex.attrs(styles.jumpOption, isActive() && styles.jumpOptionActive)}
                    >
                      <span {...stylex.attrs(styles.navNumber, isActive() && styles.numberActive)}>
                        {padIndex(index)}
                      </span>
                      <span {...stylex.attrs(styles.navTitle, isActive() && styles.titleActive)}>
                        {item.title}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </m.div>
        </Show>
      </AnimatePresence>
    </div>
  );
}

export function Solutions() {
  const headingId = createUniqueId();
  const reduce = useReducedMotion();
  const [active, setActive] = createSignal(0);
  const sheets: (HTMLElement | undefined)[] = [];
  const visible = new Set<number>();
  let locked = false;
  let releaseScroll: (() => void) | null = null;

  onSettled(() => {
    const sheetIndexes = new Map<Element, number>();
    sheets.forEach((sheet, index) => {
      if (sheet && !sheetIndexes.has(sheet)) sheetIndexes.set(sheet, index);
    });
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const index = sheetIndexes.get(entry.target);
          if (index === undefined) continue;
          if (entry.isIntersecting) visible.add(index);
          else visible.delete(index);
        }
        if (locked || visible.size === 0) return;
        setActive(Math.min(...visible));
      },
      { rootMargin: SPY_BAND },
    );
    for (const sheet of sheets) if (sheet) observer.observe(sheet);
    return () => {
      observer.disconnect();
      releaseScroll?.();
    };
  });

  const jumpTo = (index: number) => {
    const sheet = sheets[index];
    if (!sheet) return;
    releaseScroll?.();
    locked = true;
    setActive(index);
    const release = () => {
      locked = false;
      window.clearTimeout(timer);
      window.removeEventListener("scrollend", release);
      releaseScroll = null;
    };
    const timer = window.setTimeout(release, 1200);
    window.addEventListener("scrollend", release, { once: true });
    releaseScroll = release;
    sheet.focus({ preventScroll: true });
    sheet.scrollIntoView({ behavior: reduce() ? "auto" : "smooth", block: "start" });
  };

  return (
    <section id="products-solutions" aria-labelledby={headingId} {...stylex.attrs(styles.section)}>
      <div {...stylex.attrs(styles.shell)}>
        <header {...stylex.attrs(styles.head)}>
          <h2 id={headingId} {...stylex.attrs(styles.title)}>
            应用方案
          </h2>
        </header>
        <JumpBar active={active()} onJump={jumpTo} />
        <div {...stylex.attrs(styles.layout)}>
          <nav aria-label="Application solution index" {...stylex.attrs(styles.nav)}>
            <ol {...stylex.attrs(styles.navList)}>
              {SOLUTION_ITEMS.map((item, index) => {
                const isActive = () => index === active();
                return (
                  <li>
                    <button
                      type="button"
                      aria-current={isActive() ? "true" : undefined}
                      onClick={() => jumpTo(index)}
                      {...stylex.attrs(styles.navButton, isActive() && styles.navButtonActive)}
                    >
                      <span {...stylex.attrs(styles.navNumber, isActive() && styles.numberActive)}>
                        {padIndex(index)}
                      </span>
                      <span {...stylex.attrs(styles.navTitle, isActive() && styles.titleActive)}>
                        {item.title}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </nav>
          <div {...stylex.attrs(styles.sheets)}>
            {SOLUTION_ITEMS.map((item, index) => (
              <Sheet
                item={item}
                index={index}
                current={index === active()}
                sheetRef={(node) => {
                  sheets[index] = node;
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
