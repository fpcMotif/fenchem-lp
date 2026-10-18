import { Collapse } from "../../../shared/collapse";
import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { Plus } from "@fenchem-lp/ui/components/lucide";
import { m } from "@/compat/motion";
import { createEffect, createSignal, createUniqueId, For } from "solid-js";
import type { JSX } from "@solidjs/web";

import { EASE } from "@/components/prototype/motion-constants";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { SOLUTION_ITEMS, type SolutionItem } from "../../products-data";
import { padIndex } from "../shared/derived";
import { font, ink, layout, mq, sheetTone } from "./theme.stylex";

const MD = "@media (min-width: 768px)";
const LG = "@media (min-width: 1024px)";
const DESKTOP = "@media (min-width: 1280px)";
const HEADER_HEIGHT = 80;
const OPEN_SECONDS = 0.28;
const HOLD_MS = 380;
const VIEW_MARGIN = 16;

const styles = stylex.create({
  section: {
    paddingTop: { default: 64, [DESKTOP]: 96 },
    paddingBottom: { default: 72, [DESKTOP]: 112 },
    scrollMarginTop: HEADER_HEIGHT,
    backgroundColor: sheetTone.ground,
    color: ink.primary,
    fontFamily: font.body,
  },
  shell: {
    width: "100%",
    maxWidth: 1440,
    marginInline: "auto",
    boxSizing: "border-box",
    paddingInline: { default: 16, [mq.tablet]: 40, [DESKTOP]: layout.inset },
  },
  head: {
    display: "flex",
    flexDirection: { default: "column", [MD]: "row" },
    alignItems: { default: "flex-start", [MD]: "baseline" },
    justifyContent: "space-between",
    gap: { default: 8, [MD]: 24 },
    marginBottom: { default: 32, [DESKTOP]: 48 },
  },
  title: {
    margin: 0,
    fontSize: { default: 26, [mq.tablet]: 28, [DESKTOP]: 32 },
    fontWeight: 400,
    lineHeight: { default: "34px", [mq.tablet]: "36px", [DESKTOP]: "40px" },
    letterSpacing: "0.04em",
    color: ink.primary,
  },
  meta: {
    margin: 0,
    fontSize: 13,
    lineHeight: "20px",
    letterSpacing: "0.04em",
    color: ink.muted,
  },
  metaCount: {
    fontFamily: font.numeral,
    fontWeight: 500,
    fontVariantNumeric: "tabular-nums",
    color: ink.primary,
  },
  stack: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    margin: 0,
    padding: 0,
    listStyleType: "none",
    overflowAnchor: "none",
  },
  strip: {
    position: "relative",
    backgroundColor: sheetTone.paper,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: { default: sheetTone.edge, ":hover": sheetTone.edgeStrong },
    boxShadow: "0 3px 0 -1px #ffffff, 0 3px 0 0 #e9dcd6",
    transitionProperty: "border-color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
  },
  stripOpen: {
    borderColor: { default: sheetTone.edgeStrong, ":hover": sheetTone.edgeStrong },
  },
  heading: {
    margin: 0,
  },
  trigger: {
    display: "grid",
    gridTemplateColumns: {
      default: "28px minmax(0, 1fr) 40px",
      [MD]: "40px minmax(0, 1fr) minmax(0, 220px) 40px",
      [LG]: "40px minmax(0, 3fr) minmax(0, 5fr) minmax(0, 3fr) 40px",
    },
    gridTemplateAreas: {
      default: '"num title icon" "num sub icon" "num tex icon"',
      [MD]: '"num title tex icon" "num sub tex icon"',
      [LG]: '"num title sub tex icon"',
    },
    columnGap: { default: 12, [MD]: 24 },
    alignItems: "start",
    width: "100%",
    paddingBlock: { default: 16, [LG]: 20 },
    paddingInline: { default: 16, [MD]: 24, [DESKTOP]: 32 },
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    textAlign: "start",
    color: { default: ink.primary, ":hover": colors.brandBlue700 },
    cursor: "pointer",
    transitionProperty: "color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: -2,
  },
  number: {
    gridArea: "num",
    fontFamily: font.numeral,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: ink.muted,
    transitionProperty: "color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
  },
  numberOpen: {
    color: colors.brandGreen700,
  },
  name: {
    gridArea: "title",
    fontSize: 16,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.02em",
    color: "inherit",
  },
  subtitle: {
    gridArea: "sub",
    marginTop: { default: 2, [LG]: 0 },
    fontSize: 14,
    lineHeight: "24px",
    color: ink.body,
    textWrap: "pretty",
  },
  texture: {
    gridArea: "tex",
    display: "flex",
    alignItems: "baseline",
    gap: 8,
    marginTop: { default: 6, [MD]: 0 },
    minWidth: 0,
  },
  textureLabel: {
    flexShrink: 0,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.08em",
    color: ink.muted,
  },
  textureValue: {
    fontSize: 14,
    lineHeight: "24px",
    color: ink.body,
  },
  icon: {
    gridArea: "icon",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    justifySelf: "end",
    width: 40,
    height: 40,
    marginBlock: -8,
    marginInlineEnd: -10,
  },
  clip: {
    overflow: "hidden",
  },
  spread: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [MD]: "repeat(2, minmax(0, 1fr))" },
    gap: 8,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: sheetTone.edge,
    backgroundColor: sheetTone.gutter,
  },
  sheet: {
    minWidth: 0,
    paddingTop: { default: 20, [MD]: 24, [DESKTOP]: 32 },
    paddingBottom: { default: 20, [MD]: 24, [DESKTOP]: 32 },
    paddingInline: { default: 16, [MD]: 24, [DESKTOP]: 32 },
    backgroundColor: sheetTone.paper,
  },
  sheetLeft: {
    borderBottomWidth: { default: 1, [MD]: 0 },
    borderBottomStyle: "solid",
    borderBottomColor: sheetTone.edge,
    borderInlineEndWidth: { default: 0, [MD]: 1 },
    borderInlineEndStyle: "solid",
    borderInlineEndColor: sheetTone.edge,
  },
  sheetRight: {
    borderTopWidth: { default: 1, [MD]: 0 },
    borderTopStyle: "solid",
    borderTopColor: sheetTone.edge,
    borderInlineStartWidth: { default: 0, [MD]: 1 },
    borderInlineStartStyle: "solid",
    borderInlineStartColor: sheetTone.edge,
  },
  fields: {
    margin: 0,
  },
  field: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [LG]: "88px minmax(0, 1fr)" },
    columnGap: 24,
    rowGap: 4,
    paddingTop: { default: 16, ":first-child": 0 },
    paddingBottom: { default: 16, ":last-child": 0 },
    borderTopWidth: { default: 1, ":first-child": 0 },
    borderTopStyle: "solid",
    borderTopColor: sheetTone.rule,
  },
  fieldLabel: {
    margin: 0,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "26px",
    letterSpacing: "0.04em",
    color: ink.muted,
  },
  fieldValue: {
    margin: 0,
    minWidth: 0,
    fontSize: 15,
    lineHeight: "26px",
    color: ink.primary,
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
  phrases: {
    display: "flex",
    flexWrap: "wrap",
    columnGap: 0,
    rowGap: 2,
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  phrase: {
    display: "inline-flex",
    alignItems: "baseline",
    whiteSpace: "nowrap",
  },
  phraseDot: {
    paddingInline: 10,
    color: ink.faint,
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
      <For each={props.lines}>
        {(line) => (
          <m.li
            layout="position"
            transition={{ duration: 0.26, ease: EASE }}
            {...stylex.attrs(styles.line)}
          >
            {line}
          </m.li>
        )}
      </For>
    </ul>
  );
}

function Phrases(props: { phrases: string[] }) {
  return (
    <ul {...stylex.attrs(styles.phrases)}>
      <For each={props.phrases}>
        {(phrase, index) => (
          <m.li
            layout="position"
            transition={{ duration: 0.26, ease: EASE }}
            {...stylex.attrs(styles.phrase)}
          >
            {index() > 0 && (
              <span aria-hidden="true" {...stylex.attrs(styles.phraseDot)}>
                ·
              </span>
            )}
            {phrase}
          </m.li>
        )}
      </For>
    </ul>
  );
}

function ToggleIcon(props: { open: boolean; reduce: boolean }) {
  return (
    <m.span
      aria-hidden="true"
      initial={false}
      animate={{ rotate: props.open ? 45 : 0 }}
      transition={props.reduce ? { duration: 0 } : { type: "spring", duration: 0.3, bounce: 0 }}
      {...stylex.attrs(styles.icon)}
    >
      <Plus size={20} strokeWidth={props.open ? 1.25 : 1.5} absoluteStrokeWidth />
    </m.span>
  );
}

function Spread(props: { item: SolutionItem }) {
  const item = props.item;
  return (
    <div {...stylex.attrs(styles.spread)}>
      <div {...stylex.attrs(styles.sheet, styles.sheetLeft)}>
        <dl {...stylex.attrs(styles.fields)}>
          <Field label="概述">
            <Lines lines={item.overview} />
          </Field>
          <Field label="功能">
            <Phrases phrases={item.functions} />
          </Field>
          <Field label="功能性成分">
            <Lines lines={item.keyIngredients} />
          </Field>
        </dl>
      </div>
      <div {...stylex.attrs(styles.sheet, styles.sheetRight)}>
        <dl {...stylex.attrs(styles.fields)}>
          {item.challenges.length > 0 && (
            <Field label="配方挑战">
              <Lines lines={item.challenges} />
            </Field>
          )}
          <Field label="质地">
            <Phrases phrases={item.texture} />
          </Field>
          <Field label="应用">
            <Phrases phrases={item.applications} />
          </Field>
        </dl>
      </div>
    </div>
  );
}

function SheetStrip(props: {
  item: SolutionItem;
  index: number;
  open: boolean;
  reduce: boolean;
  triggerRef: (node: HTMLButtonElement) => void;
  onToggle: () => void;
  onKeyDown: (event: KeyboardEvent) => void;
}) {
  const item = props.item;
  const triggerId = createUniqueId();
  const panelId = createUniqueId();

  return (
    <m.li
      layout="position"
      transition={{ duration: 0.26, ease: EASE }}
      {...stylex.attrs(styles.strip, props.open && styles.stripOpen)}
    >
      <h3 {...stylex.attrs(styles.heading)}>
        <button
          ref={props.triggerRef}
          id={triggerId}
          type="button"
          aria-expanded={props.open ? "true" : "false"}
          aria-controls={props.open ? panelId : undefined}
          onClick={() => props.onToggle()}
          onKeyDown={(event) => props.onKeyDown(event)}
          {...stylex.attrs(styles.trigger)}
        >
          <span
            aria-hidden="true"
            {...stylex.attrs(styles.number, props.open && styles.numberOpen)}
          >
            {padIndex(props.index)}
          </span>
          <span {...stylex.attrs(styles.name)}>{item.title}</span>
          <span {...stylex.attrs(styles.subtitle)}>{item.subtitle}</span>
          <span {...stylex.attrs(styles.texture)}>
            <span {...stylex.attrs(styles.textureLabel)}>质地</span>
            <span {...stylex.attrs(styles.textureValue)}>{item.texture.join(" · ")}</span>
          </span>
          <ToggleIcon open={props.open} reduce={props.reduce} />
        </button>
      </h3>
      <Collapse
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        open={props.open}
        transition={{ duration: props.reduce ? 0 : OPEN_SECONDS, ease: EASE }}
        {...stylex.attrs(styles.clip)}
      >
        <Spread item={item} />
      </Collapse>
    </m.li>
  );
}

export function Solutions() {
  const titleId = createUniqueId();
  const reduce = useReducedMotion();
  const [openIndex, setOpenIndex] = createSignal<number | null>(0);
  const triggers: (HTMLButtonElement | undefined)[] = [];
  let anchor: { index: number; top: number } | null = null;

  createEffect(
    () => [openIndex(), reduce()] as const,
    ([, reduced]) => {
      const pinned = anchor;
      anchor = null;
      const trigger = pinned ? triggers[pinned.index] : undefined;
      if (!pinned || !trigger) return;

      const hold = () => {
        const drift = trigger.getBoundingClientRect().top - pinned.top;
        if (Math.abs(drift) >= 1) window.scrollBy({ top: drift, behavior: "instant" });
      };
      const reveal = () => {
        const top = trigger.getBoundingClientRect().top;
        const floor = HEADER_HEIGHT + VIEW_MARGIN;
        if (top < floor) window.scrollBy({ top: top - floor, behavior: "instant" });
      };

      hold();
      if (reduced) {
        reveal();
        return;
      }
      const until = performance.now() + HOLD_MS;
      let frame = 0;
      const tick = () => {
        hold();
        if (performance.now() < until) {
          frame = requestAnimationFrame(tick);
        } else {
          reveal();
        }
      };
      frame = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(frame);
    },
  );

  const toggle = (index: number) => {
    const trigger = triggers[index];
    anchor = trigger ? { index, top: trigger.getBoundingClientRect().top } : null;
    setOpenIndex((current) => (current === index ? null : index));
  };

  const moveFocus = (event: KeyboardEvent, index: number) => {
    const last = SOLUTION_ITEMS.length - 1;
    const target =
      event.key === "ArrowDown"
        ? Math.min(index + 1, last)
        : event.key === "ArrowUp"
          ? Math.max(index - 1, 0)
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : null;
    if (target === null) return;
    event.preventDefault();
    triggers[target]?.focus();
  };

  return (
    <section
      id="products-solutions"
      aria-labelledby={titleId}
      lang="zh-CN"
      {...stylex.attrs(styles.section)}
    >
      <div {...stylex.attrs(styles.shell)}>
        <header {...stylex.attrs(styles.head)}>
          <h2 id={titleId} {...stylex.attrs(styles.title)}>
            应用方案
          </h2>
          <p {...stylex.attrs(styles.meta)}>
            <span {...stylex.attrs(styles.metaCount)}>{SOLUTION_ITEMS.length}</span> 款配方
          </p>
        </header>
        <ol {...stylex.attrs(styles.stack)}>
          {SOLUTION_ITEMS.map((item, index) => (
            <SheetStrip
              item={item}
              index={index}
              open={openIndex() === index}
              reduce={reduce()}
              triggerRef={(node) => {
                triggers[index] = node;
              }}
              onToggle={() => toggle(index)}
              onKeyDown={(event) => moveFocus(event, index)}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
