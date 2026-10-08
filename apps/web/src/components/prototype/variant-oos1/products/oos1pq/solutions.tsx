import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { m } from "motion/react";
import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

import { EASE } from "@/components/prototype/motion-constants";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { SOLUTION_ITEMS, type SolutionItem } from "../../products-data";
import { padIndex } from "../shared/derived";

const INK = "#1a1a1a";
const BODY_TEXT = "#4d4d4d";
const MUTED = "#6b6b70";
const WARM = "#f8f8f2";
const PAPER = "#ffffff";
const SHEET_EDGE = "#e2e2d5";
const SHEET_RULE = "#ecece2";
const MARKER = "#b4b4aa";
const ACCENT = colors.brandGreen700;
const FOCUS = colors.brandBlue700;
const EASE_OUT_CSS = "cubic-bezier(0.22, 1, 0.36, 1)";
const BODY_FONT =
  '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif';
const NUMERAL_FONT =
  '"Inter Tight", "Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif';

const SM = breakpoints.sm;
const LG = breakpoints.lg;
const TABLET = "@media (min-width: 768px) and (max-width: 1279.98px)";
const DESKTOP = breakpoints.xl;
const INSET = "min(120px, 8.333vw)";
const HEADER_HEIGHT = 80;
const SETTLE_MS = 140;

const COUNT = SOLUTION_ITEMS.length;
const TOTAL_LABEL = String(COUNT).padStart(2, "0");

const clampIndex = (index: number) => Math.min(COUNT - 1, Math.max(0, index));

const sheetsOf = (track: HTMLElement) =>
  Array.from(track.children).filter((child) => child instanceof HTMLElement);

const nearestIndex = (track: HTMLElement) => {
  const maxScroll = track.scrollWidth - track.clientWidth;
  if (track.scrollLeft >= maxScroll - 2) return COUNT - 1;
  let best = 0;
  let bestDistance = Number.POSITIVE_INFINITY;
  sheetsOf(track).forEach((sheet, index) => {
    const distance = Math.abs(sheet.offsetLeft - track.scrollLeft);
    if (distance < bestDistance) {
      best = index;
      bestDistance = distance;
    }
  });
  return best;
};

const focusRing = {
  outlineStyle: { default: "none", ":focus-visible": "solid" },
  outlineWidth: 2,
  outlineColor: FOCUS,
} as const;

const styles = stylex.create({
  section: {
    backgroundColor: WARM,
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
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 16,
    marginBottom: { default: 24, [DESKTOP]: 40 },
  },
  title: {
    margin: 0,
    fontSize: { default: 26, [TABLET]: 28, [DESKTOP]: 32 },
    fontWeight: 400,
    lineHeight: { default: "34px", [TABLET]: "36px", [DESKTOP]: "40px" },
    letterSpacing: "0.04em",
    color: INK,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexShrink: 0,
  },
  counter: {
    margin: 0,
    marginInlineEnd: { default: 4, [SM]: 12 },
    fontFamily: NUMERAL_FONT,
    fontSize: 15,
    fontWeight: 500,
    lineHeight: "40px",
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    whiteSpace: "nowrap",
  },
  counterCurrent: {
    display: "inline-block",
    color: INK,
  },
  counterTotal: {
    color: MUTED,
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
  navButton: {
    ...focusRing,
    outlineOffset: 2,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    boxSizing: "border-box",
    height: 40,
    minWidth: 40,
    paddingBlock: 0,
    paddingInline: { default: 0, [SM]: 14 },
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: { default: SHEET_EDGE, ":hover": FOCUS },
    backgroundColor: PAPER,
    fontFamily: "inherit",
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "20px",
    letterSpacing: "0.04em",
    color: { default: INK, ":hover": FOCUS },
    cursor: "pointer",
    transform: {
      default: null,
      ":active": { default: null, [breakpoints.motionOk]: "scale(0.97)" },
    },
    transitionProperty: "color, border-color, transform",
    transitionDuration: "150ms",
    transitionTimingFunction: EASE_OUT_CSS,
  },
  navButtonDisabled: {
    borderColor: { default: SHEET_EDGE, ":hover": SHEET_EDGE },
    color: { default: "#a9a9a4", ":hover": "#a9a9a4" },
    cursor: "default",
    transform: { default: null, ":active": null },
  },
  navLabel: {
    position: { default: "absolute", [SM]: "static" },
    width: { default: 1, [SM]: "auto" },
    height: { default: 1, [SM]: "auto" },
    overflow: { default: "hidden", [SM]: "visible" },
    clipPath: { default: "inset(50%)", [SM]: "none" },
    whiteSpace: "nowrap",
  },
  track: {
    ...focusRing,
    outlineOffset: 4,
    position: "relative",
    display: "flex",
    alignItems: "stretch",
    gap: { default: 12, [SM]: 16, [LG]: 24 },
    overflowX: "auto",
    overflowY: "hidden",
    overscrollBehaviorX: "contain",
    scrollSnapType: "x mandatory",
    scrollbarWidth: "none",
    "::-webkit-scrollbar": {
      display: "none",
    },
  },
  sheet: {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: { default: "88%", [SM]: "80%", [LG]: "76%" },
    minWidth: 0,
    paddingTop: { default: 20, [SM]: 28, [DESKTOP]: 36 },
    paddingBottom: { default: 12, [SM]: 16, [DESKTOP]: 20 },
    paddingInline: { default: 20, [SM]: 32, [DESKTOP]: 40 },
    scrollSnapAlign: "start",
    backgroundColor: PAPER,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: SHEET_EDGE,
  },
  sheetHead: {
    paddingBottom: { default: 20, [DESKTOP]: 24 },
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: INK,
  },
  sheetNumber: {
    display: "block",
    fontFamily: NUMERAL_FONT,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: ACCENT,
  },
  sheetTitle: {
    margin: 0,
    marginTop: 8,
    fontSize: { default: 20, [DESKTOP]: 24 },
    fontWeight: 500,
    lineHeight: { default: "28px", [DESKTOP]: "32px" },
    letterSpacing: "0.04em",
    color: INK,
    textWrap: "balance",
  },
  sheetSubtitle: {
    margin: 0,
    marginTop: 6,
    maxWidth: "34em",
    fontSize: 15,
    lineHeight: "24px",
    color: BODY_TEXT,
    textWrap: "pretty",
  },
  fields: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [LG]: "repeat(2, minmax(0, 1fr))" },
    columnGap: 40,
  },
  fieldList: {
    margin: 0,
  },
  fieldListFollow: {
    borderTopWidth: { default: 1, [LG]: 0 },
    borderTopStyle: "solid",
    borderTopColor: SHEET_RULE,
  },
  fieldRow: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [SM]: "80px minmax(0, 1fr)" },
    columnGap: 16,
    rowGap: 2,
    paddingBlock: 14,
    borderTopWidth: { default: 1, ":first-child": 0 },
    borderTopStyle: "solid",
    borderTopColor: SHEET_RULE,
  },
  fieldLabel: {
    margin: 0,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.04em",
    color: MUTED,
  },
  fieldValue: {
    margin: 0,
    minWidth: 0,
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
    position: "relative",
    paddingInlineStart: 14,
    fontSize: 15,
    lineHeight: "24px",
    color: INK,
    textWrap: "pretty",
    "::before": {
      content: '""',
      position: "absolute",
      insetInlineStart: 0,
      top: 11,
      width: 6,
      height: 1,
      backgroundColor: MARKER,
    },
  },
  dots: {
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(10, minmax(0, 1fr))",
      [SM]: "repeat(10, 40px)",
    },
    columnGap: { default: 0, [SM]: 4 },
    marginTop: { default: 16, [DESKTOP]: 24 },
    marginInlineStart: { default: 0, [SM]: -12 },
  },
  dot: {
    ...focusRing,
    outlineOffset: -2,
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    minWidth: 0,
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: NUMERAL_FONT,
    fontSize: 13,
    fontWeight: 500,
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: { default: MUTED, ":hover": FOCUS },
    cursor: "pointer",
    transitionProperty: "color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    "::after": {
      content: '""',
      position: "absolute",
      insetInline: { default: 6, [SM]: 10 },
      bottom: 4,
      height: 2,
      backgroundColor: ACCENT,
      transform: "scaleX(0)",
      transformOrigin: "left center",
      transitionProperty: "transform",
      transitionDuration: "240ms",
      transitionTimingFunction: EASE_OUT_CSS,
    },
  },
  dotCurrent: {
    color: { default: INK, ":hover": INK },
    "::after": {
      transform: "scaleX(1)",
    },
  },
});

function Lines({ lines }: { lines: string[] }) {
  return (
    <ul {...stylex.props(styles.lines)}>
      {lines.map((line) => (
        <li key={line} {...stylex.props(styles.line)}>
          {line}
        </li>
      ))}
    </ul>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div {...stylex.props(styles.fieldRow)}>
      <dt {...stylex.props(styles.fieldLabel)}>{label}</dt>
      <dd {...stylex.props(styles.fieldValue)}>{children}</dd>
    </div>
  );
}

function Sheet({ item, index }: { item: SolutionItem; index: number }) {
  const titleId = useId();
  return (
    <article aria-labelledby={titleId} aria-roledescription="方案" {...stylex.props(styles.sheet)}>
      <header {...stylex.props(styles.sheetHead)}>
        <span {...stylex.props(styles.sheetNumber)}>{padIndex(index)}</span>
        <h3 id={titleId} {...stylex.props(styles.sheetTitle)}>
          {item.title}
        </h3>
        <p {...stylex.props(styles.sheetSubtitle)}>{item.subtitle}</p>
      </header>
      <div {...stylex.props(styles.fields)}>
        <dl {...stylex.props(styles.fieldList)}>
          <Field label="概述">
            <Lines lines={item.overview} />
          </Field>
          <Field label="功能">
            <Lines lines={item.functions} />
          </Field>
          <Field label="功能性成分">
            <Lines lines={item.keyIngredients} />
          </Field>
        </dl>
        <dl {...stylex.props(styles.fieldList, styles.fieldListFollow)}>
          {item.challenges.length > 0 && (
            <Field label="配方挑战">
              <Lines lines={item.challenges} />
            </Field>
          )}
          <Field label="质地">
            <Lines lines={item.texture} />
          </Field>
          <Field label="应用">
            <Lines lines={item.applications} />
          </Field>
        </dl>
      </div>
    </article>
  );
}

export function Solutions() {
  const reduce = useReducedMotion();
  const titleId = useId();
  const trackId = useId();
  const trackRef = useRef<HTMLDivElement>(null);
  const pendingRef = useRef<number | null>(null);
  const settleTimer = useRef(0);
  const frame = useRef(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (track) setActive(nearestIndex(track));
    return () => {
      window.clearTimeout(settleTimer.current);
      window.cancelAnimationFrame(frame.current);
    };
  }, []);

  const scheduleSettle = () => {
    window.clearTimeout(settleTimer.current);
    settleTimer.current = window.setTimeout(() => {
      pendingRef.current = null;
      const track = trackRef.current;
      if (track) setActive(nearestIndex(track));
    }, SETTLE_MS);
  };

  const goTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const target = clampIndex(index);
    const sheet = sheetsOf(track)[target];
    if (!sheet) return;
    pendingRef.current = target;
    setActive(target);
    track.scrollTo({ left: sheet.offsetLeft, behavior: reduce ? "auto" : "smooth" });
    scheduleSettle();
  };

  const step = (delta: number) => goTo((pendingRef.current ?? active) + delta);

  const handleScroll = () => {
    scheduleSettle();
    if (pendingRef.current !== null) return;
    window.cancelAnimationFrame(frame.current);
    frame.current = window.requestAnimationFrame(() => {
      const track = trackRef.current;
      if (track) setActive(nearestIndex(track));
    });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    const moves: Record<string, () => void> = {
      ArrowRight: () => step(1),
      ArrowLeft: () => step(-1),
      Home: () => goTo(0),
      End: () => goTo(COUNT - 1),
    };
    const move = moves[event.key];
    if (!move) return;
    event.preventDefault();
    event.stopPropagation();
    move();
  };

  const atStart = active === 0;
  const atEnd = active === COUNT - 1;
  const current = SOLUTION_ITEMS[active];

  return (
    <section id="products-solutions" aria-labelledby={titleId} {...stylex.props(styles.section)}>
      <div {...stylex.props(styles.shell)}>
        <header {...stylex.props(styles.head)}>
          <h2 id={titleId} {...stylex.props(styles.title)}>
            应用方案
          </h2>
          <div {...stylex.props(styles.controls)}>
            <p aria-live="polite" aria-atomic="true" {...stylex.props(styles.counter)}>
              <span aria-hidden="true">
                <m.span
                  key={active}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduce ? 0 : 0.18, ease: EASE }}
                  {...stylex.props(styles.counterCurrent)}
                >
                  {padIndex(active)}
                </m.span>
                <span {...stylex.props(styles.counterTotal)}> / {TOTAL_LABEL}</span>
              </span>
              <span {...stylex.props(styles.srOnly)}>
                第 {active + 1} 个，共 {COUNT} 个：{current?.title}
              </span>
            </p>
            <button
              type="button"
              aria-controls={trackId}
              aria-disabled={atStart}
              onClick={() => {
                if (!atStart) step(-1);
              }}
              {...stylex.props(styles.navButton, atStart && styles.navButtonDisabled)}
            >
              <ChevronLeft size={16} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />
              <span {...stylex.props(styles.navLabel)}>上一个</span>
            </button>
            <button
              type="button"
              aria-controls={trackId}
              aria-disabled={atEnd}
              onClick={() => {
                if (!atEnd) step(1);
              }}
              {...stylex.props(styles.navButton, atEnd && styles.navButtonDisabled)}
            >
              <span {...stylex.props(styles.navLabel)}>下一个</span>
              <ChevronRight size={16} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />
            </button>
          </div>
        </header>
        <div
          ref={trackRef}
          id={trackId}
          role="region"
          aria-roledescription="轮播"
          aria-label="应用方案列表，左右方向键切换"
          tabIndex={0}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          {...stylex.props(styles.track)}
        >
          {SOLUTION_ITEMS.map((item, index) => (
            <Sheet key={item.id} item={item} index={index} />
          ))}
        </div>
        <div role="group" aria-label="跳转到方案" {...stylex.props(styles.dots)}>
          {SOLUTION_ITEMS.map((item, index) => {
            const isCurrent = index === active;
            return (
              <button
                key={item.id}
                type="button"
                aria-label={`${padIndex(index)} ${item.title}`}
                aria-current={isCurrent ? "true" : undefined}
                aria-controls={trackId}
                onClick={() => goTo(index)}
                {...stylex.props(styles.dot, isCurrent && styles.dotCurrent)}
              >
                {padIndex(index)}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
