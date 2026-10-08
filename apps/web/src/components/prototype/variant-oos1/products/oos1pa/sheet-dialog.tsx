import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, m, type Variants } from "motion/react";
import {
  useEffect,
  useId,
  useRef,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
} from "react";

import { EASE } from "@/components/prototype/motion-constants";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { FLAT_FORMULAS, padIndex } from "../shared/derived";
import { font, media, motionCss, tone } from "./tokens.stylex";

const COUNT = FLAT_FORMULAS.length;

const fadeIn = stylex.keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const riseIn = stylex.keyframes({
  "0%": { opacity: 0, transform: "translateY(12px)" },
  "100%": { opacity: 1, transform: "none" },
});

const swap: Variants = {
  enter: (direction: number) => ({ opacity: 0, x: 16 * direction }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({ opacity: 0, x: -10 * direction }),
};

const styles = stylex.create({
  dialog: {
    boxSizing: "border-box",
    width: { default: "100%", [media.md]: "min(1120px, calc(100vw - 64px))" },
    height: { default: "100dvh", [media.md]: "min(800px, calc(100dvh - 64px))" },
    maxWidth: "none",
    maxHeight: "none",
    margin: { default: 0, [media.md]: "auto" },
    padding: 0,
    overflow: "hidden",
    borderWidth: { default: 0, [media.md]: 1 },
    borderStyle: "solid",
    borderColor: tone.mintRule,
    borderRadius: { default: 0, [media.md]: 2 },
    backgroundColor: tone.mint,
    color: tone.ink,
    fontFamily: font.body,
    outlineStyle: "none",
    animationName: { default: fadeIn, [media.motionOk]: riseIn },
    animationDuration: "260ms",
    animationTimingFunction: motionCss.out,
    "::backdrop": {
      backgroundColor: tone.backdrop,
      animationName: fadeIn,
      animationDuration: "260ms",
      animationTimingFunction: motionCss.out,
    },
  },
  frame: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  head: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) auto",
    columnGap: 16,
    alignItems: "start",
    flexShrink: 0,
    paddingTop: { default: 16, [media.md]: 24 },
    paddingBottom: { default: 16, [media.md]: 20 },
    paddingInlineStart: { default: 16, [media.md]: 32 },
    paddingInlineEnd: { default: 8, [media.md]: 20 },
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: tone.mintRule,
  },
  headText: {
    minWidth: 0,
    minHeight: { default: 112, [media.md]: 0 },
  },
  index: {
    display: "block",
    marginBottom: 6,
    fontFamily: font.numeral,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: colors.brandGreen700,
  },
  title: {
    margin: 0,
    fontSize: { default: 20, [media.md]: 24 },
    fontWeight: 500,
    lineHeight: { default: "28px", [media.md]: "32px" },
    letterSpacing: "0.04em",
    color: tone.ink,
    textWrap: "balance",
  },
  subtitle: {
    margin: 0,
    marginTop: 4,
    maxWidth: "40em",
    fontSize: { default: 14, [media.md]: 15 },
    lineHeight: { default: "22px", [media.md]: "24px" },
    color: tone.body,
    textWrap: "pretty",
  },
  close: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    padding: 0,
    borderWidth: 0,
    borderRadius: 2,
    backgroundColor: { default: "transparent", ":hover": tone.mintHairline },
    color: { default: tone.ink, ":hover": colors.brandBlue700 },
    cursor: "pointer",
    transform: {
      default: null,
      ":active": { default: null, [media.motionOk]: "scale(0.96)" },
    },
    transitionProperty: "background-color, color, transform",
    transitionDuration: "150ms",
    transitionTimingFunction: motionCss.out,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: -2,
  },
  body: {
    flexGrow: 1,
    minHeight: 0,
    overflowY: "auto",
    overscrollBehavior: "contain",
    paddingBlock: { default: 16, [media.md]: 24 },
    paddingInline: { default: 16, [media.md]: 32 },
  },
  sheets: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [media.lg]: "repeat(2, minmax(0, 1fr))" },
    alignItems: "stretch",
    gap: { default: 16, [media.lg]: 24 },
  },
  sheet: {
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: tone.mintRule,
    borderRadius: 2,
    backgroundColor: tone.paper,
    boxShadow: "0 1px 2px rgba(20, 36, 43, 0.04)",
  },
  sheetHead: {
    display: "flex",
    alignItems: "baseline",
    gap: 12,
    marginInline: { default: 16, [media.md]: 24 },
    paddingBlock: 14,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: tone.ink,
  },
  sheetLetter: {
    fontFamily: font.numeral,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.04em",
    color: colors.brandGreen700,
  },
  sheetTitle: {
    margin: 0,
    fontSize: 15,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.04em",
    color: tone.ink,
  },
  rows: {
    margin: 0,
    paddingInline: { default: 16, [media.md]: 24 },
    paddingBottom: 4,
  },
  row: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [media.md]: "88px minmax(0, 1fr)" },
    alignItems: "baseline",
    columnGap: 16,
    rowGap: 4,
    paddingBlock: 14,
    borderBottomWidth: { default: 1, ":last-child": 0 },
    borderBottomStyle: "solid",
    borderBottomColor: tone.mintHairline,
  },
  label: {
    margin: 0,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.04em",
    whiteSpace: "nowrap",
    color: tone.muted,
  },
  value: {
    margin: 0,
    minWidth: 0,
    fontSize: 15,
    lineHeight: "24px",
    color: tone.ink,
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
  empty: {
    color: tone.muted,
  },
  foot: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) auto minmax(0, 1fr)",
    alignItems: "center",
    columnGap: 8,
    flexShrink: 0,
    paddingTop: 8,
    paddingBottom: { default: "max(8px, env(safe-area-inset-bottom))", [media.md]: 8 },
    paddingInline: { default: 4, [media.md]: 20 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.mintRule,
  },
  navButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    minWidth: 0,
    maxWidth: "100%",
    minHeight: 44,
    paddingInline: 12,
    borderWidth: 0,
    borderRadius: 2,
    backgroundColor: { default: "transparent", ":hover": tone.mintHairline },
    fontFamily: "inherit",
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.04em",
    whiteSpace: "nowrap",
    color: { default: tone.ink, ":hover": colors.brandBlue700 },
    cursor: "pointer",
    transform: {
      default: null,
      ":active": { default: null, [media.motionOk]: "scale(0.97)" },
    },
    transitionProperty: "background-color, color, transform",
    transitionDuration: "150ms",
    transitionTimingFunction: motionCss.out,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: -2,
  },
  navPrev: {
    justifySelf: "start",
  },
  navNext: {
    justifySelf: "end",
  },
  navIcon: {
    flexShrink: 0,
  },
  neighbor: {
    display: { default: "none", [media.md]: "block" },
    minWidth: 0,
    maxWidth: "14em",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontSize: 13,
    fontWeight: 400,
    color: {
      default: tone.muted,
      [stylex.when.ancestor(":hover")]: colors.brandBlue700,
    },
  },
  counter: {
    margin: 0,
    fontFamily: font.numeral,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    whiteSpace: "nowrap",
    color: tone.ink,
  },
  counterTotal: {
    color: tone.muted,
  },
  visuallyHidden: {
    position: "absolute",
    width: 1,
    height: 1,
    margin: -1,
    padding: 0,
    overflow: "hidden",
    clip: "rect(0 0 0 0)",
    whiteSpace: "nowrap",
    borderWidth: 0,
  },
});

function Lines({ lines }: { lines: string[] }) {
  return (
    <ul {...stylex.props(styles.lines)}>
      {lines.map((line) => (
        <li key={line}>{line}</li>
      ))}
    </ul>
  );
}

function Field({ label, lines }: { label: string; lines: string[] }) {
  return (
    <div {...stylex.props(styles.row)}>
      <dt {...stylex.props(styles.label)}>{label}</dt>
      <dd {...stylex.props(styles.value)}>
        {lines.length > 0 ? (
          <Lines lines={lines} />
        ) : (
          <>
            <span aria-hidden="true" {...stylex.props(styles.empty)}>
              —
            </span>
            <span {...stylex.props(styles.visuallyHidden)}>无</span>
          </>
        )}
      </dd>
    </div>
  );
}

function Sheet({
  letter,
  title,
  children,
}: {
  letter: string;
  title: string;
  children: ReactNode;
}) {
  const headingId = useId();
  return (
    <section aria-labelledby={headingId} {...stylex.props(styles.sheet)}>
      <header {...stylex.props(styles.sheetHead)}>
        <span aria-hidden="true" {...stylex.props(styles.sheetLetter)}>
          {letter}
        </span>
        <h4 id={headingId} {...stylex.props(styles.sheetTitle)}>
          {title}
        </h4>
      </header>
      <dl {...stylex.props(styles.rows)}>{children}</dl>
    </section>
  );
}

export function SheetDialog({
  id,
  index,
  direction,
  onRoute,
  onClose,
}: {
  id: string;
  index: number | null;
  direction: 1 | -1;
  onRoute: (delta: 1 | -1) => void;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();
  const titleId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const pressedBackdrop = useRef(false);
  const isOpen = index !== null;
  const item = index === null ? null : FLAT_FORMULAS[index];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) {
      dialog.showModal();
      dialog.focus();
    }
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [isOpen]);

  const requestClose = () => dialogRef.current?.close();

  const handleKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    event.stopPropagation();
    onRoute(event.key === "ArrowRight" ? 1 : -1);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDialogElement>) => {
    pressedBackdrop.current = event.target === event.currentTarget;
  };

  const handleClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (pressedBackdrop.current && event.target === event.currentTarget) requestClose();
    pressedBackdrop.current = false;
  };

  const transition = { duration: reduce ? 0 : 0.2, ease: EASE };
  const previous = item ? FLAT_FORMULAS[(item.index - 1 + COUNT) % COUNT] : null;
  const next = item ? FLAT_FORMULAS[(item.index + 1) % COUNT] : null;

  return (
    <dialog
      ref={dialogRef}
      id={id}
      aria-labelledby={titleId}
      tabIndex={-1}
      onClose={onClose}
      onKeyDown={handleKeyDown}
      onPointerDown={handlePointerDown}
      onClick={handleClick}
      {...stylex.props(styles.dialog)}
    >
      {item && previous && next && (
        <div {...stylex.props(styles.frame)}>
          <header {...stylex.props(styles.head)}>
            <div {...stylex.props(styles.headText)}>
              <AnimatePresence mode="wait" initial={false} custom={direction}>
                <m.div
                  key={item.id}
                  custom={direction}
                  variants={swap}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={transition}
                >
                  <span {...stylex.props(styles.index)}>{padIndex(item.index)}</span>
                  <h3 id={titleId} {...stylex.props(styles.title)}>
                    {item.title}
                  </h3>
                  <p {...stylex.props(styles.subtitle)}>{item.subtitle}</p>
                </m.div>
              </AnimatePresence>
            </div>
            <button
              type="button"
              aria-label="关闭"
              onClick={requestClose}
              {...stylex.props(styles.close)}
            >
              <X size={20} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />
            </button>
          </header>

          <div ref={bodyRef} {...stylex.props(styles.body)}>
            <AnimatePresence
              mode="wait"
              initial={false}
              custom={direction}
              onExitComplete={() => bodyRef.current?.scrollTo({ top: 0 })}
            >
              <m.div
                key={item.id}
                custom={direction}
                variants={swap}
                initial="enter"
                animate="center"
                exit="exit"
                transition={transition}
                {...stylex.props(styles.sheets)}
              >
                <Sheet letter="A" title="是什么">
                  <Field label="概述" lines={item.overview} />
                  <Field label="功能" lines={item.functions} />
                  <Field label="功能性成分" lines={item.keyIngredients} />
                </Sheet>
                <Sheet letter="B" title="怎么做">
                  <Field label="配方挑战" lines={item.challenges} />
                  <Field label="质地" lines={item.texture} />
                  <Field label="应用" lines={item.applications} />
                </Sheet>
              </m.div>
            </AnimatePresence>
          </div>

          <footer {...stylex.props(styles.foot)}>
            <button
              type="button"
              aria-label={`上一个：${previous.title}`}
              onClick={() => onRoute(-1)}
              {...stylex.props(styles.navButton, styles.navPrev, stylex.defaultMarker())}
            >
              <ChevronLeft
                size={18}
                strokeWidth={1.5}
                absoluteStrokeWidth
                aria-hidden="true"
                {...stylex.props(styles.navIcon)}
              />
              <span>上一个</span>
              <span {...stylex.props(styles.neighbor)}>{previous.title}</span>
            </button>
            <p aria-hidden="true" {...stylex.props(styles.counter)}>
              {padIndex(item.index)}
              <span {...stylex.props(styles.counterTotal)}> / {padIndex(COUNT - 1)}</span>
            </p>
            <button
              type="button"
              aria-label={`下一个：${next.title}`}
              onClick={() => onRoute(1)}
              {...stylex.props(styles.navButton, styles.navNext, stylex.defaultMarker())}
            >
              <span {...stylex.props(styles.neighbor)}>{next.title}</span>
              <span>下一个</span>
              <ChevronRight
                size={18}
                strokeWidth={1.5}
                absoluteStrokeWidth
                aria-hidden="true"
                {...stylex.props(styles.navIcon)}
              />
            </button>
          </footer>
          <p aria-live="polite" {...stylex.props(styles.visuallyHidden)}>
            {`${padIndex(item.index)} / ${padIndex(COUNT - 1)} ${item.title}`}
          </p>
        </div>
      )}
    </dialog>
  );
}
