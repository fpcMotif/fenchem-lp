import * as stylex from "@stylexjs/stylex";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { m } from "motion/react";
import { useId, useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import {
  AreaChips,
  LabSection,
  areaOf,
  padIndex,
  sheetRows,
  useSolutionsBrowser,
  type SheetRow,
} from "../kit";
import { bp, depth, face, motion, tone } from "../tokens.stylex";

const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];
const TURN_OFFSET = 24;
const TICK = "oklch(0.52 0.02 261.5 / 0.42)";
const SOFT_SURFACE = "rgba(255, 255, 255, 0.7)";
const NO_BREAK_SPACE = String.fromCharCode(0xa0);
const TRAILING_NOTE = /^(.+?)\s*[（(]([^（）()]+)[）)]$/;

const splitNote = (text: string) => {
  const match = TRAILING_NOTE.exec(text);
  return match
    ? { primary: match[1] ?? text, note: match[2] ?? null }
    : { primary: text, note: null };
};

const styles = stylex.create({
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    marginTop: { default: 20, [bp.xl]: 28 },
  },
  hint: {
    display: { default: "none", [bp.lg]: "flex" },
    alignItems: "center",
    gap: 6,
    margin: 0,
    fontSize: 12,
    lineHeight: "22px",
    letterSpacing: "0.06em",
    color: tone.tintMuted,
  },
  kbd: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 22,
    height: 22,
    paddingInline: 4,
    boxSizing: "border-box",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: tone.tintRule,
    borderRadius: 5,
    backgroundColor: tone.paper,
    fontFamily: face.display,
    fontSize: 12,
    lineHeight: "20px",
    color: tone.tintBody,
  },
  tocButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    height: 36,
    marginInlineStart: "auto",
    paddingInlineStart: 14,
    paddingInlineEnd: 10,
    boxSizing: "border-box",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: tone.tintRule,
    borderRadius: 999,
    backgroundColor: {
      default: tone.paper,
      ":hover": { default: tone.paper, [bp.hover]: tone.tintFill },
    },
    fontFamily: "inherit",
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.04em",
    color: tone.tintInk,
    cursor: "pointer",
    transform: { default: "none", ":active": "scale(0.97)" },
    transitionProperty: "background-color, transform",
    transitionDuration: { default: "0ms", [bp.motionOk]: "160ms" },
    transitionTimingFunction: motion.easeOut,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: tone.accent,
    outlineOffset: 2,
  },
  tocButtonOpen: {
    backgroundColor: tone.tintFill,
  },
  tocChevron: {
    display: "flex",
    color: tone.tintMuted,
    transform: "none",
    transitionProperty: "transform",
    transitionDuration: { default: "0ms", [bp.motionOk]: "160ms" },
    transitionTimingFunction: motion.easeOut,
  },
  tocChevronOpen: {
    transform: "rotate(180deg)",
  },
  toc: {
    marginTop: 12,
    paddingBlock: { default: 14, [bp.md]: 20 },
    paddingInline: { default: 8, [bp.md]: 16 },
    borderRadius: 12,
    backgroundColor: tone.tintFill,
    columnCount: { default: 1, [bp.md]: 2, [bp.xl]: 3 },
    columnGap: 24,
  },
  tocGroup: {
    marginTop: { default: 12, ":first-child": 0 },
  },
  tocHeading: {
    display: "flex",
    alignItems: "baseline",
    gap: 8,
    marginTop: 0,
    marginBottom: 2,
    paddingInline: 8,
    paddingBlock: 6,
    fontSize: 12,
    fontWeight: 600,
    lineHeight: "20px",
    letterSpacing: "0.08em",
    color: tone.tintInk,
    breakAfter: "avoid",
  },
  tocCount: {
    fontWeight: 400,
    fontVariantNumeric: "tabular-nums",
    color: tone.tintMuted,
  },
  tocList: {
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  tocItem: {
    breakInside: "avoid",
  },
  tocEntry: {
    display: "grid",
    gridTemplateColumns: "28px minmax(0, 1fr)",
    alignItems: "baseline",
    columnGap: 8,
    width: "100%",
    paddingBlock: 6,
    paddingInline: 8,
    boxSizing: "border-box",
    borderWidth: 0,
    borderRadius: 8,
    backgroundColor: {
      default: "transparent",
      ":hover": { default: "transparent", [bp.hover]: SOFT_SURFACE },
    },
    fontFamily: "inherit",
    textAlign: "start",
    cursor: "pointer",
    transitionProperty: "background-color",
    transitionDuration: { default: "0ms", [bp.motionOk]: "140ms" },
    transitionTimingFunction: motion.easeOut,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: tone.accent,
    outlineOffset: -2,
  },
  tocNumber: {
    fontFamily: face.display,
    fontSize: 12,
    lineHeight: "22px",
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: tone.tintMuted,
  },
  tocNumberCurrent: {
    color: tone.ink,
  },
  tocName: {
    fontSize: 14,
    lineHeight: "22px",
    letterSpacing: "0.02em",
    color: {
      default: tone.tintBody,
      [stylex.when.ancestor(":hover")]: { default: tone.tintBody, [bp.hover]: tone.accent },
    },
    textWrap: "pretty",
    transitionProperty: "color",
    transitionDuration: { default: "0ms", [bp.motionOk]: "140ms" },
    transitionTimingFunction: motion.easeOut,
  },
  tocNameCurrent: {
    fontWeight: 500,
    color: tone.ink,
    textDecorationLine: "underline",
    textDecorationColor: tone.ink,
    textDecorationThickness: 1,
    textUnderlineOffset: 5,
  },

  reader: {
    marginTop: 16,
  },
  stack: {
    position: "relative",
  },
  underSheet: {
    position: "absolute",
    insetInline: { default: 10, [bp.md]: 16 },
    top: 12,
    bottom: -7,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: tone.tintRuleSoft,
    borderRadius: 8,
    backgroundColor: tone.paper,
    boxShadow: depth.lift,
  },
  page: {
    position: "relative",
    display: "block",
    minHeight: { default: 0, [bp.xl]: 720 },
    paddingInline: { default: 20, [bp.md]: 48, [bp.xl]: 80 },
    paddingTop: { default: 22, [bp.md]: 32, [bp.xl]: 40 },
    paddingBottom: { default: 32, [bp.md]: 48, [bp.xl]: 64 },
    boxSizing: "border-box",
    overflowX: "clip",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: tone.tintRule,
    borderRadius: 8,
    backgroundColor: tone.paper,
    boxShadow: depth.card,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: tone.accent,
    outlineOffset: 4,
  },
  runningHead: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 16,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: tone.tintRule,
  },
  runningArea: {
    display: "flex",
    alignItems: "baseline",
    gap: 12,
    minWidth: 0,
    margin: 0,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.12em",
    color: tone.tintBody,
  },
  runningEnglish: {
    display: { default: "none", [bp.md]: "inline" },
    overflow: "hidden",
    fontFamily: face.display,
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    color: tone.tintMuted,
  },
  folio: {
    flexShrink: 0,
    margin: 0,
    fontFamily: face.display,
    fontSize: 13,
    lineHeight: "20px",
    letterSpacing: "0.06em",
    fontVariantNumeric: "tabular-nums",
    color: tone.tintMuted,
  },
  folioCurrent: {
    color: tone.ink,
  },
  titleBlock: {
    marginTop: { default: 28, [bp.md]: 40, [bp.xl]: 56 },
  },
  title: {
    margin: 0,
    fontSize: { default: 22, [bp.md]: 28, [bp.xl]: 32 },
    fontWeight: 500,
    lineHeight: 1.3,
    letterSpacing: "0.04em",
    color: tone.tintInk,
    textWrap: "balance",
  },
  english: {
    margin: 0,
    marginTop: 8,
    fontFamily: face.display,
    fontSize: 14,
    lineHeight: "20px",
    letterSpacing: "0.02em",
    color: tone.tintMuted,
  },
  subtitle: {
    margin: 0,
    marginTop: 16,
    maxWidth: "40em",
    fontSize: { default: 15, [bp.md]: 16 },
    lineHeight: 1.7,
    color: tone.tintBody,
    textWrap: "pretty",
  },
  fields: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [bp.xl]: "repeat(2, minmax(0, 1fr))" },
    gridTemplateRows: { default: "none", [bp.xl]: "repeat(3, auto)" },
    gridAutoFlow: { default: "row", [bp.xl]: "column" },
    columnGap: { default: 0, [bp.xl]: 64 },
    margin: 0,
    marginTop: { default: 28, [bp.md]: 40, [bp.xl]: 48 },
  },
  field: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [bp.md]: "96px minmax(0, 1fr)",
      [bp.xl]: "minmax(0, 1fr)",
    },
    alignContent: "start",
    columnGap: 24,
    rowGap: 6,
    paddingBlock: { default: 16, [bp.md]: 20 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.tintRuleSoft,
  },
  fieldLabel: {
    margin: 0,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.12em",
    color: tone.tintMuted,
  },
  fieldValue: {
    margin: 0,
    minWidth: 0,
    fontSize: 15,
    lineHeight: "26px",
    color: tone.tintInk,
    textWrap: "pretty",
  },
  lines: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  muted: {
    color: tone.tintBody,
  },
  strong: {
    fontWeight: 500,
  },
  absent: {
    color: tone.tintMuted,
  },
  keepWords: {
    wordBreak: "keep-all",
    overflowWrap: "anywhere",
  },
  note: {
    marginInlineStart: 6,
    fontSize: 13,
    color: tone.tintMuted,
  },

  pager: {
    display: "grid",
    gridTemplateColumns: {
      default: "auto minmax(0, 1fr) auto",
      [bp.md]: "minmax(0, 1fr) auto minmax(0, 1fr)",
    },
    alignItems: "center",
    columnGap: { default: 12, [bp.md]: 24, [bp.lg]: 32 },
    marginTop: { default: 24, [bp.md]: 32 },
  },
  turn: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    minWidth: 0,
    maxWidth: "100%",
    marginInline: -10,
    paddingBlock: 8,
    paddingInline: 10,
    boxSizing: "border-box",
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    color: tone.tintInk,
    cursor: "pointer",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: tone.accent,
    outlineOffset: 0,
  },
  turnPrev: {
    justifySelf: "start",
    alignItems: "flex-start",
    textAlign: "start",
  },
  turnNext: {
    justifySelf: "end",
    alignItems: "flex-end",
    textAlign: "end",
  },
  turnOff: {
    opacity: 0.4,
    cursor: "default",
  },
  turnEyebrow: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    fontSize: 13,
    lineHeight: "20px",
    letterSpacing: "0.08em",
    whiteSpace: "nowrap",
    color: { default: tone.tintInk, [bp.md]: tone.tintMuted },
  },
  turnGlyph: {
    display: "flex",
    transform: "none",
    transitionProperty: "transform",
    transitionDuration: { default: "0ms", [bp.motionOk]: "160ms" },
    transitionTimingFunction: motion.easeOut,
  },
  turnGlyphBack: {
    transform: {
      default: "none",
      [stylex.when.ancestor(":hover")]: { default: "none", [bp.hover]: "translateX(-2px)" },
    },
  },
  turnGlyphForward: {
    transform: {
      default: "none",
      [stylex.when.ancestor(":hover")]: { default: "none", [bp.hover]: "translateX(2px)" },
    },
  },
  turnName: {
    display: { default: "none", [bp.md]: "block" },
    maxWidth: "100%",
    overflow: "hidden",
    fontSize: 15,
    fontWeight: 500,
    lineHeight: "22px",
    letterSpacing: "0.02em",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    color: {
      default: tone.tintInk,
      [stylex.when.ancestor(":hover")]: { default: tone.tintInk, [bp.hover]: tone.accent },
    },
    transitionProperty: "color",
    transitionDuration: { default: "0ms", [bp.motionOk]: "160ms" },
    transitionTimingFunction: motion.easeOut,
  },
  folioCompact: {
    display: { default: "block", [bp.lg]: "none" },
    margin: 0,
    fontFamily: face.display,
    fontSize: 14,
    lineHeight: "20px",
    letterSpacing: "0.06em",
    fontVariantNumeric: "tabular-nums",
    textAlign: "center",
    color: tone.tintMuted,
  },
  ticks: {
    display: { default: "none", [bp.lg]: "flex" },
    alignItems: "flex-start",
    gap: 12,
  },
  tickGroup: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
  },
  tickRow: {
    display: "flex",
    alignItems: "flex-end",
  },
  tick: {
    position: "relative",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    width: 12,
    height: 28,
    padding: 0,
    paddingBottom: 4,
    boxSizing: "border-box",
    borderWidth: 0,
    borderRadius: 3,
    backgroundColor: "transparent",
    cursor: "pointer",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: tone.accent,
    outlineOffset: 0,
  },
  tickCurrent: {
    cursor: "default",
  },
  tickLine: {
    display: "block",
    width: 2,
    height: 18,
    borderRadius: 1,
    backgroundColor: {
      default: TICK,
      [stylex.when.ancestor(":hover")]: { default: TICK, [bp.hover]: tone.tintInk },
      [stylex.when.ancestor(":focus-visible")]: tone.tintInk,
    },
    transform: {
      default: "scaleY(0.5)",
      [stylex.when.ancestor(":hover")]: { default: "scaleY(0.5)", [bp.hover]: "scaleY(0.72)" },
      [stylex.when.ancestor(":focus-visible")]: "scaleY(0.72)",
    },
    transformOrigin: "50% 100%",
    transitionProperty: "transform, background-color",
    transitionDuration: { default: "0ms", [bp.motionOk]: "180ms" },
    transitionTimingFunction: motion.easeOut,
  },
  tickLineCurrent: {
    backgroundColor: tone.ink,
    transform: "none",
  },
  tip: {
    position: "absolute",
    bottom: "calc(100% + 4px)",
    left: "50%",
    zIndex: 3,
    paddingBlock: 4,
    paddingInline: 8,
    borderRadius: 6,
    backgroundColor: tone.ink,
    fontSize: 12,
    lineHeight: "16px",
    letterSpacing: "0.02em",
    whiteSpace: "nowrap",
    color: tone.paper,
    pointerEvents: "none",
    opacity: {
      default: 0,
      [stylex.when.ancestor(":hover")]: { default: 0, [bp.hover]: 1 },
      [stylex.when.ancestor(":focus-visible")]: 1,
    },
    transform: {
      default: "translate(-50%, 4px)",
      [stylex.when.ancestor(":hover")]: {
        default: "translate(-50%, 4px)",
        [bp.hover]: "translate(-50%, 0)",
      },
      [stylex.when.ancestor(":focus-visible")]: "translate(-50%, 0)",
    },
    transformOrigin: "50% 100%",
    transitionProperty: "opacity, transform",
    transitionDuration: { default: "0ms", [bp.motionOk]: "120ms" },
    transitionTimingFunction: motion.easeOut,
  },
  tickInitial: {
    fontSize: 11,
    lineHeight: "14px",
    letterSpacing: "0.04em",
    color: tone.tintMuted,
  },
  tickInitialCurrent: {
    color: tone.ink,
  },
  srOnly: {
    position: "absolute",
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: "hidden",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
    borderWidth: 0,
  },
});

function RowValue({ row }: { row: SheetRow }) {
  if (row.values.length === 0) return <span {...stylex.props(styles.absent)}>无</span>;
  if (row.kind === "strong") {
    return <span {...stylex.props(styles.strong)}>{row.values.join(" · ")}</span>;
  }
  if (row.kind === "lines") {
    return (
      <ul {...stylex.props(styles.lines, styles.muted)}>
        {row.values.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    );
  }
  if (row.kind === "list") {
    return (
      <ul {...stylex.props(styles.lines)}>
        {row.values.map((value) => {
          const { primary, note } = splitNote(value);
          return (
            <li key={value} {...stylex.props(styles.keepWords)}>
              <span {...stylex.props(styles.strong)}>
                {primary.replaceAll(" / ", `${NO_BREAK_SPACE}/ `)}
              </span>
              {note && <span {...stylex.props(styles.note)}>{note}</span>}
            </li>
          );
        })}
      </ul>
    );
  }
  return <>{row.values.join("、")}</>;
}

type PendingTurn = { focusTick: boolean; reveal: boolean };

export function PagesVariant() {
  const browser = useSolutionsBrowser();
  const { area, scope, groups, selected, position, select } = browser;
  const reduce = useReducedMotion();
  const uid = useId();
  const pageRef = useRef<HTMLElement>(null);
  const pagerRef = useRef<HTMLElement>(null);
  const tocButtonRef = useRef<HTMLButtonElement>(null);
  const pending = useRef<PendingTurn | null>(null);
  const [turn, setTurn] = useState<{ id: string; direction: 1 | -1 } | null>(null);
  const [tocOpen, setTocOpen] = useState(false);

  useLayoutEffect(() => {
    const request = pending.current;
    if (!request) return;
    pending.current = null;
    if (request.focusTick) {
      pagerRef.current
        ?.querySelector<HTMLElement>('[data-tick][aria-current="page"]')
        ?.focus({ preventScroll: true });
    }
    const top = pageRef.current?.getBoundingClientRect().top ?? 0;
    if (request.reveal && top < 0) {
      window.scrollBy({ top: top - 24, behavior: reduce ? "auto" : "smooth" });
    }
  }, [selected?.id, reduce]);

  if (!selected) return null;

  const isAll = area === "all";
  const previous = scope[position - 1];
  const next = scope[position + 1];
  const pageArea = areaOf(selected.area);
  const slide = turn?.id === selected.id ? turn.direction * TURN_OFFSET : 0;

  const turnTo = (index: number, request: PendingTurn) => {
    const target = scope[index];
    if (!target || index === position) return;
    pending.current = request;
    setTurn({ id: target.id, direction: index > position ? 1 : -1 });
    select(target.id);
  };

  const handleReaderKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
    const onTick = (event.target as HTMLElement).hasAttribute("data-tick");
    const targets: Record<string, number> = {
      ArrowLeft: position - 1,
      ArrowRight: position + 1,
      ...(onTick ? { Home: 0, End: scope.length - 1 } : {}),
    };
    const index = targets[event.key];
    if (index === undefined) return;
    event.preventDefault();
    event.stopPropagation();
    turnTo(index, { focusTick: onTick, reveal: !onTick });
  };

  const jumpFromToc = (index: number) => {
    setTocOpen(false);
    turnTo(index, { focusTick: false, reveal: true });
    pageRef.current?.focus({ preventScroll: true });
  };

  return (
    <LabSection>
      <AreaChips browser={browser} />

      <div {...stylex.props(styles.toolbar)}>
        <p aria-hidden="true" {...stylex.props(styles.hint)}>
          <kbd {...stylex.props(styles.kbd)}>←</kbd>
          <kbd {...stylex.props(styles.kbd)}>→</kbd>
          翻页
        </p>
        <button
          ref={tocButtonRef}
          type="button"
          aria-expanded={tocOpen}
          aria-controls={`${uid}-toc`}
          onClick={() => setTocOpen((open) => !open)}
          {...stylex.props(styles.tocButton, tocOpen && styles.tocButtonOpen)}
        >
          目录
          <span
            aria-hidden="true"
            {...stylex.props(styles.tocChevron, tocOpen && styles.tocChevronOpen)}
          >
            <ChevronDown size={14} strokeWidth={1.5} absoluteStrokeWidth />
          </span>
        </button>
      </div>

      {tocOpen && (
        <m.div
          id={`${uid}-toc`}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduce ? { duration: 0 } : { duration: 0.18, ease: EASE_OUT }}
          onKeyDown={(event) => {
            if (event.key !== "Escape") return;
            setTocOpen(false);
            tocButtonRef.current?.focus();
          }}
          {...stylex.props(styles.toc)}
        >
          {groups.map((group) => (
            <section key={group.id} aria-label={group.label} {...stylex.props(styles.tocGroup)}>
              {isAll && (
                <h4 {...stylex.props(styles.tocHeading)}>
                  {group.label}
                  <span {...stylex.props(styles.tocCount)}>{group.items.length}</span>
                </h4>
              )}
              <ol {...stylex.props(styles.tocList)}>
                {group.items.map((item) => {
                  const index = scope.indexOf(item);
                  const isCurrent = index === position;
                  return (
                    <li key={item.id} {...stylex.props(styles.tocItem)}>
                      <button
                        type="button"
                        aria-current={isCurrent ? "page" : undefined}
                        onClick={() => jumpFromToc(index)}
                        {...stylex.props(styles.tocEntry, stylex.defaultMarker())}
                      >
                        <span
                          {...stylex.props(styles.tocNumber, isCurrent && styles.tocNumberCurrent)}
                        >
                          {padIndex(index)}
                        </span>
                        <span {...stylex.props(styles.tocName, isCurrent && styles.tocNameCurrent)}>
                          {item.title}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </section>
          ))}
        </m.div>
      )}

      <div onKeyDown={handleReaderKeyDown} {...stylex.props(styles.reader)}>
        <div {...stylex.props(styles.stack)}>
          <div aria-hidden="true" {...stylex.props(styles.underSheet)} />
          <article
            ref={pageRef}
            tabIndex={0}
            aria-labelledby={`${uid}-title`}
            {...stylex.props(styles.page)}
          >
            <m.div
              key={selected.id}
              initial={turn ? { opacity: 0, x: slide } : false}
              animate={{ opacity: 1, x: 0 }}
              transition={reduce ? { duration: 0 } : { duration: 0.22, ease: EASE_OUT }}
            >
              <header {...stylex.props(styles.runningHead)}>
                <p {...stylex.props(styles.runningArea)}>
                  {pageArea?.label}
                  <span lang="en" {...stylex.props(styles.runningEnglish)}>
                    {pageArea?.englishLabel}
                  </span>
                </p>
                <p {...stylex.props(styles.folio)}>
                  <span {...stylex.props(styles.folioCurrent)}>{padIndex(position)}</span>
                  {` / ${padIndex(scope.length - 1)}`}
                </p>
              </header>
              <div {...stylex.props(styles.titleBlock)}>
                <h3 id={`${uid}-title`} {...stylex.props(styles.title)}>
                  {selected.title}
                </h3>
                <p lang="en" {...stylex.props(styles.english)}>
                  {selected.englishName}
                </p>
                <p {...stylex.props(styles.subtitle)}>{selected.subtitle}</p>
              </div>
              <dl {...stylex.props(styles.fields)}>
                {sheetRows(selected).map((row) => (
                  <div key={row.label} {...stylex.props(styles.field)}>
                    <dt {...stylex.props(styles.fieldLabel)}>{row.label}</dt>
                    <dd {...stylex.props(styles.fieldValue)}>
                      <RowValue row={row} />
                    </dd>
                  </div>
                ))}
              </dl>
            </m.div>
          </article>
        </div>

        <nav ref={pagerRef} aria-label="翻页" {...stylex.props(styles.pager)}>
          <button
            type="button"
            aria-disabled={!previous}
            aria-label={previous ? `上一页：${previous.title}` : "上一页"}
            aria-keyshortcuts="ArrowLeft"
            onClick={() => previous && turnTo(position - 1, { focusTick: false, reveal: true })}
            {...stylex.props(
              styles.turn,
              styles.turnPrev,
              !previous && styles.turnOff,
              stylex.defaultMarker(),
            )}
          >
            <span {...stylex.props(styles.turnEyebrow)}>
              <span
                aria-hidden="true"
                {...stylex.props(styles.turnGlyph, previous && styles.turnGlyphBack)}
              >
                <ChevronLeft size={14} strokeWidth={1.5} absoluteStrokeWidth />
              </span>
              上一页
            </span>
            {previous && <span {...stylex.props(styles.turnName)}>{previous.title}</span>}
          </button>

          <div>
            <p {...stylex.props(styles.folioCompact)}>
              <span {...stylex.props(styles.folioCurrent)}>{padIndex(position)}</span>
              {` / ${padIndex(scope.length - 1)}`}
            </p>
            <div role="group" aria-label="页码" {...stylex.props(styles.ticks)}>
              {groups.map((group) => {
                const groupCurrent = group.id === selected.area;
                return (
                  <div key={group.id} {...stylex.props(styles.tickGroup)}>
                    <div {...stylex.props(styles.tickRow)}>
                      {group.items.map((item) => {
                        const index = scope.indexOf(item);
                        const isCurrent = index === position;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            data-tick=""
                            aria-label={`${padIndex(index)} ${item.title}`}
                            aria-current={isCurrent ? "page" : undefined}
                            tabIndex={isCurrent ? 0 : -1}
                            onClick={() => turnTo(index, { focusTick: false, reveal: false })}
                            {...stylex.props(
                              styles.tick,
                              isCurrent && styles.tickCurrent,
                              stylex.defaultMarker(),
                            )}
                          >
                            <span
                              aria-hidden="true"
                              {...stylex.props(
                                styles.tickLine,
                                isCurrent && styles.tickLineCurrent,
                              )}
                            />
                            <span aria-hidden="true" {...stylex.props(styles.tip)}>
                              {item.title}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                    {isAll && (
                      <span
                        title={group.label}
                        aria-hidden="true"
                        {...stylex.props(
                          styles.tickInitial,
                          groupCurrent && styles.tickInitialCurrent,
                        )}
                      >
                        {group.label.slice(0, 1)}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            aria-disabled={!next}
            aria-label={next ? `下一页：${next.title}` : "下一页"}
            aria-keyshortcuts="ArrowRight"
            onClick={() => next && turnTo(position + 1, { focusTick: false, reveal: true })}
            {...stylex.props(
              styles.turn,
              styles.turnNext,
              !next && styles.turnOff,
              stylex.defaultMarker(),
            )}
          >
            <span {...stylex.props(styles.turnEyebrow)}>
              下一页
              <span
                aria-hidden="true"
                {...stylex.props(styles.turnGlyph, next && styles.turnGlyphForward)}
              >
                <ChevronRight size={14} strokeWidth={1.5} absoluteStrokeWidth />
              </span>
            </span>
            {next && <span {...stylex.props(styles.turnName)}>{next.title}</span>}
          </button>
        </nav>

        <p aria-live="polite" {...stylex.props(styles.srOnly)}>
          {turn ? `第 ${position + 1} 页，共 ${scope.length} 页：${selected.title}` : ""}
        </p>
      </div>
    </LabSection>
  );
}
