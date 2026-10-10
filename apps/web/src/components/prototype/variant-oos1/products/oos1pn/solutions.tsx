import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, m, type Variants } from "motion/react";
import {
  useCallback,
  useLayoutEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
  type Ref,
} from "react";
import { flushSync } from "react-dom";

import { EASE } from "@/components/prototype/motion-constants";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { SOLUTION_ITEMS, type SolutionItem } from "../../products-data";
import { padIndex } from "../shared/derived";

const INK = "#1a1a1a";
const BODY_TEXT = "#4d4d4d";
const MUTED = "#6b6b70";
const MIST = "#f6f6fb";
const SHEET_BORDER = "#e1e1ea";
const SHEET_RULE = "#ebebf2";
const ROW_HOVER = "#f9f9fc";
const ROW_PRESSED = "#f1f1f7";
const SCRIM = "rgba(26, 26, 46, 0.06)";
const ACCENT = colors.brandGreen700;
const BODY_FONT =
  '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif';
const LATIN_FONT = '"Inter Tight", "Noto Sans SC", sans-serif';

const TABLET = "@media (min-width: 768px) and (max-width: 1279.98px)";
const DESKTOP = breakpoints.xl;
const MD = breakpoints.md;
const LG = breakpoints.lg;
const INSET = "min(120px, 8.333vw)";
const HEADER_HEIGHT = 80;
const GUTTER = 24;
const SHEET_PAD = { default: 20, [MD]: 32, [DESKTOP]: 40 } as const;

const LAST_INDEX = SOLUTION_ITEMS.length - 1;

const CONTENT_VARIANTS: Variants = {
  enter: (direction: number) => ({ opacity: 0, x: 16 * direction }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({ opacity: 0, x: -16 * direction }),
};

const styles = stylex.create({
  section: {
    paddingTop: { default: 64, [DESKTOP]: 96 },
    paddingBottom: { default: 72, [DESKTOP]: 112 },
    scrollMarginTop: HEADER_HEIGHT,
    backgroundColor: MIST,
    color: INK,
    fontFamily: BODY_FONT,
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
    textWrap: "balance",
    color: INK,
  },

  frame: {
    marginTop: { default: 32, [DESKTOP]: 56 },
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: SHEET_BORDER,
    borderRadius: 2,
    backgroundColor: colors.paper,
    boxShadow: "0 1px 2px rgba(26, 26, 46, 0.04)",
  },
  clip: {
    position: "relative",
    overflow: "clip",
  },

  summary: {
    position: "relative",
  },
  summaryGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "28px minmax(0, 1fr) 16px",
      [MD]: "48px minmax(0, 5fr) minmax(0, 3fr) minmax(0, 3fr) 16px",
    },
    columnGap: { default: 12, [MD]: GUTTER },
    alignItems: "start",
    paddingInline: SHEET_PAD,
  },
  summaryHead: {
    display: { default: "none", [MD]: "grid" },
    paddingBlock: 14,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: SHEET_BORDER,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "0.08em",
    color: MUTED,
  },
  rows: {
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  rowItem: {
    borderTopWidth: { default: 1, ":first-child": 0 },
    borderTopStyle: "solid",
    borderTopColor: SHEET_RULE,
  },
  row: {
    width: "100%",
    minHeight: 72,
    paddingBlock: { default: 16, [MD]: 20 },
    borderWidth: 0,
    backgroundColor: { default: "transparent", ":hover": ROW_HOVER, ":active": ROW_PRESSED },
    fontFamily: "inherit",
    textAlign: "start",
    color: INK,
    cursor: "pointer",
    transitionProperty: "background-color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: -2,
  },
  rowIndex: {
    fontFamily: LATIN_FONT,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: { default: MUTED, [stylex.when.ancestor(":hover")]: colors.brandBlue700 },
  },
  rowIndexLast: {
    color: { default: ACCENT, [stylex.when.ancestor(":hover")]: colors.brandBlue700 },
  },
  rowMain: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    minWidth: 0,
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.02em",
    color: { default: INK, [stylex.when.ancestor(":hover")]: colors.brandBlue700 },
    transitionProperty: "color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
  },
  rowSubtitle: {
    fontSize: 13,
    lineHeight: "20px",
    textWrap: "pretty",
    color: MUTED,
  },
  rowCell: {
    display: { default: "none", [MD]: "flex" },
    flexDirection: "column",
    minWidth: 0,
    fontSize: 14,
    lineHeight: "24px",
    color: BODY_TEXT,
  },
  rowArrow: {
    display: "flex",
    alignItems: "center",
    height: 24,
    color: { default: MUTED, [stylex.when.ancestor(":hover")]: colors.brandBlue700 },
    transform: {
      default: "none",
      [stylex.when.ancestor(":hover")]: "translateX(2px)",
    },
    transitionProperty: "transform, color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
  },
  srOnly: {
    position: "absolute",
    width: 1,
    height: 1,
    overflow: "hidden",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
  },
  scrim: {
    position: "absolute",
    inset: 0,
    backgroundColor: SCRIM,
    pointerEvents: "none",
  },

  detail: {
    position: "absolute",
    top: 0,
    insetInline: 0,
    backgroundColor: colors.paper,
    boxShadow: "-1px 0 0 0 #e1e1ea, -16px 0 24px -20px rgba(26, 26, 46, 0.24)",
  },
  toolbar: {
    position: "sticky",
    top: HEADER_HEIGHT,
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    minHeight: 56,
    paddingInline: SHEET_PAD,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: SHEET_RULE,
    backgroundColor: colors.paper,
  },
  toolButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    height: 40,
    paddingInline: 8,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.04em",
    whiteSpace: "nowrap",
    color: { default: INK, ":hover": colors.brandBlue700 },
    cursor: "pointer",
    transitionProperty: "color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 0,
  },
  backButton: {
    marginInlineStart: -8,
  },
  stepper: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    marginInlineEnd: -8,
  },
  toolDisabled: {
    color: { default: MUTED, ":hover": MUTED },
    opacity: 0.45,
    cursor: "default",
  },

  detailBody: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [LG]: "minmax(0, 4fr) minmax(0, 8fr)",
    },
    columnGap: GUTTER,
    rowGap: 24,
    paddingInline: SHEET_PAD,
    paddingTop: { default: 24, [MD]: 32, [DESKTOP]: 40 },
    paddingBottom: { default: 28, [MD]: 40, [DESKTOP]: 48 },
  },
  detailHead: {
    alignSelf: "start",
    paddingTop: { default: 0, [LG]: 14 },
    paddingInlineEnd: { default: 0, [LG]: GUTTER },
    borderTopWidth: { default: 0, [LG]: 1 },
    borderTopStyle: "solid",
    borderTopColor: INK,
  },
  detailIndex: {
    margin: 0,
    fontFamily: LATIN_FONT,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: MUTED,
  },
  detailIndexCurrent: {
    color: ACCENT,
  },
  detailTitle: {
    margin: 0,
    marginTop: 12,
    fontSize: { default: 22, [MD]: 24 },
    fontWeight: 500,
    lineHeight: "32px",
    letterSpacing: "0.04em",
    textWrap: "balance",
    color: INK,
    outlineStyle: "none",
  },
  detailSubtitle: {
    margin: 0,
    marginTop: 8,
    maxWidth: "24em",
    fontSize: 15,
    lineHeight: "26px",
    textWrap: "pretty",
    color: BODY_TEXT,
  },
  fields: {
    margin: 0,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: INK,
  },
  field: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [MD]: "112px minmax(0, 1fr)" },
    columnGap: GUTTER,
    rowGap: 4,
    paddingBlock: { default: 14, [MD]: 16 },
    borderBottomWidth: { default: 1, ":last-child": 0 },
    borderBottomStyle: "solid",
    borderBottomColor: SHEET_RULE,
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
    maxWidth: 640,
    fontSize: 15,
    lineHeight: "26px",
    textWrap: "pretty",
    color: INK,
  },
  lineList: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  inlineList: {
    display: "flex",
    flexWrap: "wrap",
    columnGap: 24,
    rowGap: 4,
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
});

function useElementHeight() {
  const [node, setNode] = useState<HTMLElement | null>(null);
  const [height, setHeight] = useState<number | null>(null);

  const measureRef = useCallback((node: HTMLElement | null) => {
    setNode(node);
    setHeight(node?.offsetHeight ?? null);
  }, []);

  useLayoutEffect(() => {
    if (!node) return;
    const observer = new ResizeObserver(() => setHeight(node.offsetHeight));
    observer.observe(node);
    return () => observer.disconnect();
  }, [node]);

  return [measureRef, height] as const;
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div {...stylex.props(styles.field)}>
      <dt {...stylex.props(styles.fieldLabel)}>{label}</dt>
      <dd {...stylex.props(styles.fieldValue)}>{children}</dd>
    </div>
  );
}

function Lines({ lines, inline = false }: { lines: string[]; inline?: boolean }) {
  return (
    <ul {...stylex.props(inline ? styles.inlineList : styles.lineList)}>
      {lines.map((line) => (
        <li key={line}>{line}</li>
      ))}
    </ul>
  );
}

function DetailBody({
  item,
  index,
  headingId,
  headingRef,
}: {
  item: SolutionItem;
  index: number;
  headingId: string;
  headingRef: Ref<HTMLHeadingElement>;
}) {
  return (
    <div {...stylex.props(styles.detailBody)}>
      <header {...stylex.props(styles.detailHead)}>
        <p {...stylex.props(styles.detailIndex)}>
          <span {...stylex.props(styles.detailIndexCurrent)}>{padIndex(index)}</span> /{" "}
          {padIndex(LAST_INDEX)}
        </p>
        <h3 id={headingId} ref={headingRef} tabIndex={-1} {...stylex.props(styles.detailTitle)}>
          {item.title}
        </h3>
        <p {...stylex.props(styles.detailSubtitle)}>{item.subtitle}</p>
      </header>
      <dl {...stylex.props(styles.fields)}>
        <Field label="概述">
          <Lines lines={item.overview} />
        </Field>
        <Field label="功能">
          <Lines lines={item.functions} inline />
        </Field>
        <Field label="功能性成分">
          <Lines lines={item.keyIngredients} />
        </Field>
        {item.challenges.length > 0 && (
          <Field label="配方挑战">
            <Lines lines={item.challenges} />
          </Field>
        )}
        <Field label="质地">
          <Lines lines={item.texture} inline />
        </Field>
        <Field label="应用">
          <Lines lines={item.applications} inline />
        </Field>
      </dl>
    </div>
  );
}

export function Solutions() {
  const reduce = useReducedMotion();
  const titleId = useId();
  const headingId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [lastIndex, setLastIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [setSummaryNode, summaryHeight] = useElementHeight();
  const [setDetailNode, detailHeight] = useElementHeight();
  const frameRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const focusedHeadingBeingReplaced = useRef<HTMLHeadingElement | null>(null);
  const rowRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const attachHeading = (node: HTMLHeadingElement | null) => {
    headingRef.current = node;
    const replaced = focusedHeadingBeingReplaced.current;
    if (node && replaced && node !== replaced) {
      focusedHeadingBeingReplaced.current = null;
      node.focus({ preventScroll: true });
    }
  };

  const active = openIndex === null ? null : SOLUTION_ITEMS[openIndex];
  const isOpen = active !== null && active !== undefined;
  const frameHeight = isOpen ? detailHeight : summaryHeight;
  const slide = { duration: reduce ? 0 : 0.32, ease: EASE };
  const behavior: ScrollBehavior = reduce ? "auto" : "smooth";

  const openAt = (index: number) => {
    flushSync(() => {
      setDirection(1);
      setOpenIndex(index);
    });
    headingRef.current?.focus({ preventScroll: true });
    const frame = frameRef.current;
    if (!frame) return;
    const top = frame.getBoundingClientRect().top;
    if (top < HEADER_HEIGHT + 8) {
      window.scrollTo({ top: window.scrollY + top - HEADER_HEIGHT - 24, behavior });
    }
  };

  const close = () => {
    if (openIndex === null) return;
    const index = openIndex;
    flushSync(() => {
      setOpenIndex(null);
      setLastIndex(index);
    });
    const row = rowRefs.current[index];
    if (!row) return;
    row.focus({ preventScroll: true });
    const rect = row.getBoundingClientRect();
    if (rect.top < HEADER_HEIGHT || rect.bottom > window.innerHeight) {
      row.scrollIntoView({ block: "center", behavior });
    }
  };

  const step = (delta: 1 | -1) => {
    if (openIndex === null) return;
    const next = openIndex + delta;
    if (next < 0 || next > LAST_INDEX) return;
    const heading = headingRef.current;
    focusedHeadingBeingReplaced.current =
      heading && document.activeElement === heading ? heading : null;
    setDirection(delta);
    setOpenIndex(next);
  };

  const onDetailKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== "Escape") return;
    event.preventDefault();
    close();
  };

  return (
    <section id="products-solutions" aria-labelledby={titleId} {...stylex.props(styles.section)}>
      <div {...stylex.props(styles.shell)}>
        <h2 id={titleId} {...stylex.props(styles.title)}>
          应用方案
        </h2>
        <div ref={frameRef} {...stylex.props(styles.frame)}>
          <m.div
            {...stylex.props(styles.clip)}
            initial={false}
            layout={!reduce}
            style={{ height: frameHeight ?? "auto" }}
            transition={slide}
          >
            <m.div
              ref={setSummaryNode}
              layout="position"
              inert={isOpen}
              {...stylex.props(styles.summary)}
              initial={false}
              animate={{ x: isOpen ? -48 : 0 }}
              transition={slide}
            >
              <div aria-hidden="true" {...stylex.props(styles.summaryGrid, styles.summaryHead)}>
                <span>编号</span>
                <span>方案</span>
                <span>质地</span>
                <span>应用</span>
              </div>
              <ol {...stylex.props(styles.rows)}>
                {SOLUTION_ITEMS.map((item, index) => (
                  <li key={item.id} {...stylex.props(styles.rowItem)}>
                    <button
                      type="button"
                      ref={(node) => {
                        rowRefs.current[index] = node;
                      }}
                      onClick={() => openAt(index)}
                      {...stylex.props(styles.summaryGrid, styles.row, stylex.defaultMarker())}
                    >
                      <span
                        {...stylex.props(
                          styles.rowIndex,
                          lastIndex === index && styles.rowIndexLast,
                        )}
                      >
                        {padIndex(index)}
                      </span>
                      <span {...stylex.props(styles.rowMain)}>
                        <span {...stylex.props(styles.rowTitle)}>{item.title}</span>
                        <span {...stylex.props(styles.rowSubtitle)}>{item.subtitle}</span>
                      </span>
                      <span {...stylex.props(styles.rowCell)}>
                        <span {...stylex.props(styles.srOnly)}>Texture</span>
                        {item.texture.map((line) => (
                          <span key={line}>{line}</span>
                        ))}
                      </span>
                      <span {...stylex.props(styles.rowCell)}>
                        <span {...stylex.props(styles.srOnly)}>Applications</span>
                        {item.applications.map((line) => (
                          <span key={line}>{line}</span>
                        ))}
                      </span>
                      <span aria-hidden="true" {...stylex.props(styles.rowArrow)}>
                        <ChevronRight size={16} strokeWidth={1.5} absoluteStrokeWidth />
                      </span>
                    </button>
                  </li>
                ))}
              </ol>
            </m.div>
            <m.div
              aria-hidden="true"
              {...stylex.props(styles.scrim)}
              initial={false}
              animate={{ opacity: isOpen ? 1 : 0 }}
              transition={slide}
            />
            <AnimatePresence initial={false}>
              {isOpen && openIndex !== null && (
                <m.section
                  key="detail"
                  layout="position"
                  ref={setDetailNode}
                  aria-labelledby={headingId}
                  onKeyDown={onDetailKeyDown}
                  {...stylex.props(styles.detail)}
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={slide}
                >
                  <div {...stylex.props(styles.toolbar)}>
                    <button
                      type="button"
                      onClick={close}
                      {...stylex.props(styles.toolButton, styles.backButton)}
                    >
                      <ArrowLeft
                        size={16}
                        strokeWidth={1.5}
                        absoluteStrokeWidth
                        aria-hidden="true"
                      />
                      返回总览
                    </button>
                    <div
                      role="group"
                      aria-label="Switch solution"
                      {...stylex.props(styles.stepper)}
                    >
                      <button
                        type="button"
                        aria-disabled={openIndex === 0}
                        onClick={() => step(-1)}
                        {...stylex.props(styles.toolButton, openIndex === 0 && styles.toolDisabled)}
                      >
                        <ChevronLeft
                          size={16}
                          strokeWidth={1.5}
                          absoluteStrokeWidth
                          aria-hidden="true"
                        />
                        上一个
                      </button>
                      <button
                        type="button"
                        aria-disabled={openIndex === LAST_INDEX}
                        onClick={() => step(1)}
                        {...stylex.props(
                          styles.toolButton,
                          openIndex === LAST_INDEX && styles.toolDisabled,
                        )}
                      >
                        下一个
                        <ChevronRight
                          size={16}
                          strokeWidth={1.5}
                          absoluteStrokeWidth
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </div>
                  <AnimatePresence mode="wait" initial={false} custom={direction}>
                    <m.div
                      key={active.id}
                      custom={direction}
                      variants={CONTENT_VARIANTS}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: reduce ? 0 : 0.2, ease: EASE }}
                    >
                      <DetailBody
                        item={active}
                        index={openIndex}
                        headingId={headingId}
                        headingRef={attachHeading}
                      />
                    </m.div>
                  </AnimatePresence>
                </m.section>
              )}
            </AnimatePresence>
          </m.div>
        </div>
      </div>
    </section>
  );
}
