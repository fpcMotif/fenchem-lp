import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ArrowLeft, ChevronLeft, ChevronRight } from "@fenchem-lp/ui/components/lucide";
import { AnimatePresence, m, type Variants } from "@/compat/motion";
import { createEffect, createSignal, createUniqueId, For, Show } from "solid-js";
import type { JSX } from "@solidjs/web";

import { flushSync } from "@/compat/react-dom";

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
  '"Source Han Sans SC", "Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif';
const LATIN_FONT = '"Inter Tight", "Source Han Sans SC", "Noto Sans SC", sans-serif';

const TABLET = "@media (min-width: 768px) and (max-width: 1279.98px)";
const DESKTOP = "@media (min-width: 1280px)";
const MD = "@media (min-width: 768px)";
const LG = "@media (min-width: 1024px)";
const INSET = "min(120px, 8.333vw)";
const HEADER_HEIGHT = 80;
const GUTTER = 24;
const SHEET_PAD = { default: 20, [MD]: 32, [DESKTOP]: 40 } as const;

const LAST_INDEX = SOLUTION_ITEMS.length - 1;

const CONTENT_VARIANTS: Variants = {
  enter: (direction) => ({ opacity: 0, x: 16 * (direction as number) }),
  center: { opacity: 1, x: 0 },
  exit: (direction) => ({ opacity: 0, x: -16 * (direction as number) }),
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
  const [node, setNode] = createSignal<HTMLElement>();
  const [height, setHeight] = createSignal<number | null>(null);

  createEffect(node, (current) => {
    if (!current) return;
    setHeight(current.offsetHeight);
    const observer = new ResizeObserver(() => setHeight(current.offsetHeight));
    observer.observe(current);
    return () => observer.disconnect();
  });

  return [setNode, height] as const;
}

// A replacement heading mounts before AnimatePresence inserts it, so focus waits for insertion.
const focusWhenConnected = (node: HTMLElement, frames = 60) => {
  if (node.isConnected) node.focus({ preventScroll: true });
  else if (frames > 0) requestAnimationFrame(() => focusWhenConnected(node, frames - 1));
};

function Field(props: { label: string; children: JSX.Element }) {
  return (
    <div {...stylex.attrs(styles.field)}>
      <dt {...stylex.attrs(styles.fieldLabel)}>{props.label}</dt>
      <dd {...stylex.attrs(styles.fieldValue)}>{props.children}</dd>
    </div>
  );
}

function Lines(props: { lines: string[]; inline?: boolean }) {
  return (
    <ul {...stylex.attrs(props.inline ? styles.inlineList : styles.lineList)}>
      <For each={props.lines}>{(line) => <li>{line}</li>}</For>
    </ul>
  );
}

function DetailBody(props: {
  item: SolutionItem;
  index: number;
  headingId: string;
  headingRef: (node: HTMLHeadingElement) => void;
}) {
  const item = props.item;
  return (
    <div {...stylex.attrs(styles.detailBody)}>
      <header {...stylex.attrs(styles.detailHead)}>
        <p {...stylex.attrs(styles.detailIndex)}>
          <span {...stylex.attrs(styles.detailIndexCurrent)}>{padIndex(props.index)}</span> /{" "}
          {padIndex(LAST_INDEX)}
        </p>
        <h3
          id={props.headingId}
          ref={props.headingRef}
          tabindex={-1}
          {...stylex.attrs(styles.detailTitle)}
        >
          {item.title}
        </h3>
        <p {...stylex.attrs(styles.detailSubtitle)}>{item.subtitle}</p>
      </header>
      <dl {...stylex.attrs(styles.fields)}>
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
  const titleId = createUniqueId();
  const headingId = createUniqueId();
  const [openIndex, setOpenIndex] = createSignal<number | null>(null);
  const [lastIndex, setLastIndex] = createSignal<number | null>(null);
  const [direction, setDirection] = createSignal<1 | -1>(1);
  const [setSummaryNode, summaryHeight] = useElementHeight();
  const [setDetailNode, detailHeight] = useElementHeight();
  let frame: HTMLDivElement | undefined;
  let heading: HTMLHeadingElement | undefined;
  let focusedHeadingBeingReplaced: HTMLHeadingElement | null = null;
  const rows: (HTMLButtonElement | undefined)[] = [];

  const attachHeading = (node: HTMLHeadingElement) => {
    heading = node;
    const replaced = focusedHeadingBeingReplaced;
    if (replaced && node !== replaced) {
      focusedHeadingBeingReplaced = null;
      focusWhenConnected(node);
    }
  };

  const active = () => {
    const index = openIndex();
    return index === null ? null : SOLUTION_ITEMS[index];
  };
  const isOpen = () => active() !== null && active() !== undefined;
  const frameHeight = () => (isOpen() ? detailHeight() : summaryHeight());
  const slide = () => ({ duration: reduce() ? 0 : 0.32, ease: EASE });
  const behavior = (): ScrollBehavior => (reduce() ? "auto" : "smooth");

  const openAt = (index: number) => {
    flushSync(() => {
      setDirection(1);
      setOpenIndex(index);
    });
    heading?.focus({ preventScroll: true });
    if (!frame) return;
    const top = frame.getBoundingClientRect().top;
    if (top < HEADER_HEIGHT + 8) {
      window.scrollTo({ top: window.scrollY + top - HEADER_HEIGHT - 24, behavior: behavior() });
    }
  };

  const close = () => {
    const index = openIndex();
    if (index === null) return;
    flushSync(() => {
      setOpenIndex(null);
      setLastIndex(index);
    });
    const row = rows[index];
    if (!row) return;
    row.focus({ preventScroll: true });
    const rect = row.getBoundingClientRect();
    if (rect.top < HEADER_HEIGHT || rect.bottom > window.innerHeight) {
      row.scrollIntoView({ block: "center", behavior: behavior() });
    }
  };

  const step = (delta: 1 | -1) => {
    const index = openIndex();
    if (index === null) return;
    const next = index + delta;
    if (next < 0 || next > LAST_INDEX) return;
    focusedHeadingBeingReplaced = heading && document.activeElement === heading ? heading : null;
    setDirection(delta);
    setOpenIndex(next);
  };

  const onDetailKeyDown = (event: KeyboardEvent) => {
    if (event.key !== "Escape") return;
    event.preventDefault();
    close();
  };

  return (
    <section id="products-solutions" aria-labelledby={titleId} {...stylex.attrs(styles.section)}>
      <div {...stylex.attrs(styles.shell)}>
        <h2 id={titleId} {...stylex.attrs(styles.title)}>
          应用方案
        </h2>
        <div ref={frame} {...stylex.attrs(styles.frame)}>
          <m.div
            {...stylex.attrs(styles.clip)}
            initial={false}
            layout={!reduce()}
            style={{ height: frameHeight() ?? "auto" }}
            transition={slide()}
          >
            <m.div
              ref={setSummaryNode}
              layout="position"
              inert={isOpen()}
              {...stylex.attrs(styles.summary)}
              initial={false}
              animate={{ x: isOpen() ? -48 : 0 }}
              transition={slide()}
            >
              <div aria-hidden="true" {...stylex.attrs(styles.summaryGrid, styles.summaryHead)}>
                <span>编号</span>
                <span>方案</span>
                <span>质地</span>
                <span>应用</span>
              </div>
              <ol {...stylex.attrs(styles.rows)}>
                {SOLUTION_ITEMS.map((item, index) => (
                  <li {...stylex.attrs(styles.rowItem)}>
                    <button
                      type="button"
                      ref={(node) => {
                        rows[index] = node;
                      }}
                      onClick={() => openAt(index)}
                      {...stylex.attrs(styles.summaryGrid, styles.row, stylex.defaultMarker())}
                    >
                      <span
                        {...stylex.attrs(
                          styles.rowIndex,
                          lastIndex() === index && styles.rowIndexLast,
                        )}
                      >
                        {padIndex(index)}
                      </span>
                      <span {...stylex.attrs(styles.rowMain)}>
                        <span {...stylex.attrs(styles.rowTitle)}>{item.title}</span>
                        <span {...stylex.attrs(styles.rowSubtitle)}>{item.subtitle}</span>
                      </span>
                      <span {...stylex.attrs(styles.rowCell)}>
                        <span {...stylex.attrs(styles.srOnly)}>Texture</span>
                        {item.texture.map((line) => (
                          <span>{line}</span>
                        ))}
                      </span>
                      <span {...stylex.attrs(styles.rowCell)}>
                        <span {...stylex.attrs(styles.srOnly)}>Applications</span>
                        {item.applications.map((line) => (
                          <span>{line}</span>
                        ))}
                      </span>
                      <span aria-hidden="true" {...stylex.attrs(styles.rowArrow)}>
                        <ChevronRight size={16} strokeWidth={1.5} absoluteStrokeWidth />
                      </span>
                    </button>
                  </li>
                ))}
              </ol>
            </m.div>
            <m.div
              aria-hidden="true"
              {...stylex.attrs(styles.scrim)}
              initial={false}
              animate={{ opacity: isOpen() ? 1 : 0 }}
              transition={slide()}
            />
            <AnimatePresence initial={false}>
              <Show when={isOpen() && openIndex() !== null}>
                <m.section
                  layout="position"
                  ref={setDetailNode}
                  aria-labelledby={headingId}
                  onKeyDown={onDetailKeyDown}
                  {...stylex.attrs(styles.detail)}
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={slide()}
                >
                  <div {...stylex.attrs(styles.toolbar)}>
                    <button
                      type="button"
                      onClick={close}
                      {...stylex.attrs(styles.toolButton, styles.backButton)}
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
                      {...stylex.attrs(styles.stepper)}
                    >
                      <button
                        type="button"
                        aria-disabled={openIndex() === 0 ? "true" : "false"}
                        onClick={() => step(-1)}
                        {...stylex.attrs(
                          styles.toolButton,
                          openIndex() === 0 && styles.toolDisabled,
                        )}
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
                        aria-disabled={openIndex() === LAST_INDEX ? "true" : "false"}
                        onClick={() => step(1)}
                        {...stylex.attrs(
                          styles.toolButton,
                          openIndex() === LAST_INDEX && styles.toolDisabled,
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
                  <AnimatePresence mode="wait" initial={false} custom={direction()}>
                    <Show when={active()} keyed>
                      {(item) => (
                        <m.div
                          custom={direction()}
                          variants={CONTENT_VARIANTS}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{ duration: reduce() ? 0 : 0.2, ease: EASE }}
                        >
                          <DetailBody
                            item={item}
                            index={SOLUTION_ITEMS.indexOf(item)}
                            headingId={headingId}
                            headingRef={attachHeading}
                          />
                        </m.div>
                      )}
                    </Show>
                  </AnimatePresence>
                </m.section>
              </Show>
            </AnimatePresence>
          </m.div>
        </div>
      </div>
    </section>
  );
}
