import { Collapse } from "../../../shared/collapse";
import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { Plus } from "lucide-react";
import { m } from "motion/react";
import {
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";

import { EASE } from "@/components/prototype/motion-constants";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { SOLUTION_ITEMS, type SolutionItem } from "../../products-data";
import { padIndex } from "../shared/derived";
import { font, ink, layout, mq, sheetTone } from "./theme.stylex";

const MD = breakpoints.md;
const LG = breakpoints.lg;
const DESKTOP = breakpoints.xl;
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

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div {...stylex.props(styles.field)}>
      <dt {...stylex.props(styles.fieldLabel)}>{label}</dt>
      <dd {...stylex.props(styles.fieldValue)}>{children}</dd>
    </div>
  );
}

function Lines({ lines }: { lines: string[] }) {
  return (
    <ul {...stylex.props(styles.lines)}>
      {lines.map((line) => (
        <m.li
          layout="position"
          transition={{ duration: 0.26, ease: EASE }}
          key={line}
          {...stylex.props(styles.line)}
        >
          {line}
        </m.li>
      ))}
    </ul>
  );
}

function Phrases({ phrases }: { phrases: string[] }) {
  return (
    <ul {...stylex.props(styles.phrases)}>
      {phrases.map((phrase, index) => (
        <m.li
          layout="position"
          transition={{ duration: 0.26, ease: EASE }}
          key={phrase}
          {...stylex.props(styles.phrase)}
        >
          {index > 0 && (
            <span aria-hidden="true" {...stylex.props(styles.phraseDot)}>
              ·
            </span>
          )}
          {phrase}
        </m.li>
      ))}
    </ul>
  );
}

function ToggleIcon({ open, reduce }: { open: boolean; reduce: boolean }) {
  return (
    <m.span
      aria-hidden="true"
      initial={false}
      animate={{ rotate: open ? 45 : 0 }}
      transition={reduce ? { duration: 0 } : { type: "spring", duration: 0.3, bounce: 0 }}
      {...stylex.props(styles.icon)}
    >
      <Plus size={20} strokeWidth={open ? 1.25 : 1.5} absoluteStrokeWidth />
    </m.span>
  );
}

function Spread({ item }: { item: SolutionItem }) {
  return (
    <div {...stylex.props(styles.spread)}>
      <div {...stylex.props(styles.sheet, styles.sheetLeft)}>
        <dl {...stylex.props(styles.fields)}>
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
      <div {...stylex.props(styles.sheet, styles.sheetRight)}>
        <dl {...stylex.props(styles.fields)}>
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

function SheetStrip({
  item,
  index,
  open,
  reduce,
  triggerRef,
  onToggle,
  onKeyDown,
}: {
  item: SolutionItem;
  index: number;
  open: boolean;
  reduce: boolean;
  triggerRef: (node: HTMLButtonElement | null) => void;
  onToggle: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
}) {
  const triggerId = useId();
  const panelId = useId();

  return (
    <m.li
      layout="position"
      transition={{ duration: 0.26, ease: EASE }}
      {...stylex.props(styles.strip, open && styles.stripOpen)}
    >
      <h3 {...stylex.props(styles.heading)}>
        <button
          ref={triggerRef}
          id={triggerId}
          type="button"
          aria-expanded={open}
          aria-controls={open ? panelId : undefined}
          onClick={onToggle}
          onKeyDown={onKeyDown}
          {...stylex.props(styles.trigger)}
        >
          <span aria-hidden="true" {...stylex.props(styles.number, open && styles.numberOpen)}>
            {padIndex(index)}
          </span>
          <span {...stylex.props(styles.name)}>{item.title}</span>
          <span {...stylex.props(styles.subtitle)}>{item.subtitle}</span>
          <span {...stylex.props(styles.texture)}>
            <span {...stylex.props(styles.textureLabel)}>质地</span>
            <span {...stylex.props(styles.textureValue)}>{item.texture.join(" · ")}</span>
          </span>
          <ToggleIcon open={open} reduce={reduce} />
        </button>
      </h3>
      <Collapse
        key="spread"
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        open={open}

        transition={{ duration: reduce ? 0 : OPEN_SECONDS, ease: EASE }}
        {...stylex.props(styles.clip)}
      >
        <Spread item={item} />
      </Collapse>
    </m.li>
  );
}

export function Solutions() {
  const titleId = useId();
  const reduce = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  const anchor = useRef<{ index: number; top: number } | null>(null);

  useLayoutEffect(() => {
    const pinned = anchor.current;
    anchor.current = null;
    const trigger = pinned ? triggers.current[pinned.index] : null;
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
    if (reduce) {
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
  }, [openIndex, reduce]);

  const toggle = (index: number) => {
    const trigger = triggers.current[index];
    anchor.current = trigger ? { index, top: trigger.getBoundingClientRect().top } : null;
    setOpenIndex((current) => (current === index ? null : index));
  };

  const moveFocus = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
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
    triggers.current[target]?.focus();
  };

  return (
    <section
      id="products-solutions"
      aria-labelledby={titleId}
      lang="zh-CN"
      {...stylex.props(styles.section)}
    >
      <div {...stylex.props(styles.shell)}>
        <header {...stylex.props(styles.head)}>
          <h2 id={titleId} {...stylex.props(styles.title)}>
            应用方案
          </h2>
          <p {...stylex.props(styles.meta)}>
            <span {...stylex.props(styles.metaCount)}>{SOLUTION_ITEMS.length}</span> 款配方
          </p>
        </header>
        <ol {...stylex.props(styles.stack)}>
          {SOLUTION_ITEMS.map((item, index) => (
            <SheetStrip
              key={item.id}
              item={item}
              index={index}
              open={openIndex === index}
              reduce={reduce}
              triggerRef={(node) => {
                triggers.current[index] = node;
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
