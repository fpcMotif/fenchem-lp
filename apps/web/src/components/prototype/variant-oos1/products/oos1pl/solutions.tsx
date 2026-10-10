import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent,
  type ReactNode,
} from "react";

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
  '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif';
const NUMERAL_FONT = '"Inter Tight", "Noto Sans SC", sans-serif';

const TABLET = "@media (min-width: 768px) and (max-width: 1279.98px)";
const DESKTOP = breakpoints.xl;
const SM = "@media (min-width: 640px) and (max-width: 1023.98px)";
const LG = breakpoints.lg;
const MOTION_OK = breakpoints.motionOk;
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
        <li key={line} {...stylex.props(styles.line)}>
          {line}
        </li>
      ))}
    </ul>
  );
}

function Inline({ items }: { items: string[] }) {
  return (
    <ul {...stylex.props(styles.inline)}>
      {items.map((entry) => (
        <li key={entry}>{entry}</li>
      ))}
    </ul>
  );
}

function Sheet({
  item,
  index,
  current,
  sheetRef,
}: {
  item: SolutionItem;
  index: number;
  current: boolean;
  sheetRef: (node: HTMLElement | null) => void;
}) {
  const titleId = useId();
  return (
    <article
      ref={sheetRef}
      tabIndex={-1}
      aria-labelledby={titleId}
      data-sheet-index={index}
      {...stylex.props(styles.sheet)}
    >
      <header {...stylex.props(styles.sheetHead)}>
        <span {...stylex.props(styles.sheetNumber)}>
          <span {...stylex.props(current && styles.sheetNumberCurrent)}>{padIndex(index)}</span>
          {` / ${TOTAL_LABEL}`}
        </span>
        <div>
          <h3 id={titleId} {...stylex.props(styles.sheetTitle)}>
            {item.title}
          </h3>
          <p {...stylex.props(styles.sheetSubtitle)}>{item.subtitle}</p>
        </div>
      </header>
      <dl {...stylex.props(styles.fields)}>
        <Field label="概述">
          <Lines lines={item.overview} />
        </Field>
        <Field label="功能">
          <Inline items={item.functions} />
        </Field>
        <Field label="功能性成分">
          <ul {...stylex.props(styles.lines)}>
            {item.keyIngredients.map((ingredient) => {
              const part = splitTitle(ingredient);
              return (
                <li key={ingredient} {...stylex.props(styles.ingredient)}>
                  <span>{part.primary}</span>
                  {part.secondary && (
                    <span {...stylex.props(styles.ingredientNote)}>{part.secondary}</span>
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

function JumpBar({ active, onJump }: { active: number; onJump: (index: number) => void }) {
  const reduce = useReducedMotion();
  const panelId = useId();
  const [openedAt, setOpenedAt] = useState<number | null>(null);
  const open = openedAt !== null;
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = SOLUTION_ITEMS[active];

  const close = useCallback((returnFocus: boolean) => {
    setOpenedAt(null);
    if (returnFocus) triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (openedAt === null) return;
    optionRefs.current[openedAt]?.focus({ preventScroll: true });
    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && wrapRef.current?.contains(event.target)) return;
      close(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [openedAt, close]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!open) return;
    if (event.key === "Escape") {
      event.preventDefault();
      close(true);
      return;
    }
    const options = optionRefs.current.filter((node): node is HTMLButtonElement => node !== null);
    const focused = options.findIndex((node) => node === document.activeElement);
    const target = optionTarget(event.key, focused, options.length - 1);
    if (target === null) return;
    event.preventDefault();
    options[target]?.focus();
  };

  const onBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!open) return;
    const next = event.relatedTarget;
    if (next instanceof Node && wrapRef.current?.contains(next)) return;
    if (next === null) return;
    close(false);
  };

  return (
    <div ref={wrapRef} onKeyDown={onKeyDown} onBlur={onBlur} {...stylex.props(styles.jump)}>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpenedAt(open ? null : active)}
        {...stylex.props(styles.jumpButton)}
      >
        <span {...stylex.props(styles.jumpCount)}>
          <span {...stylex.props(styles.jumpCurrent)}>{padIndex(active)}</span>
          {` / ${TOTAL_LABEL}`}
        </span>
        <span aria-hidden="true" {...stylex.props(styles.jumpDivider)}>
          ·
        </span>
        <span {...stylex.props(styles.jumpTitle)}>{current?.title}</span>
        <span aria-hidden="true" {...stylex.props(styles.jumpIcon, open && styles.jumpIconOpen)}>
          <ChevronDown size={18} strokeWidth={1.5} absoluteStrokeWidth />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <m.div
            key="panel"
            id={panelId}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: reduce ? 0 : 0.18, ease: EASE }}
            {...stylex.props(styles.jumpPanel)}
          >
            <ol aria-label="Application solution list" {...stylex.props(styles.jumpList)}>
              {SOLUTION_ITEMS.map((item, index) => {
                const isActive = index === active;
                return (
                  <li key={item.id}>
                    <button
                      ref={(node) => {
                        optionRefs.current[index] = node;
                      }}
                      type="button"
                      aria-current={isActive ? "true" : undefined}
                      onClick={() => {
                        setOpenedAt(null);
                        onJump(index);
                      }}
                      {...stylex.props(styles.jumpOption, isActive && styles.jumpOptionActive)}
                    >
                      <span {...stylex.props(styles.navNumber, isActive && styles.numberActive)}>
                        {padIndex(index)}
                      </span>
                      <span {...stylex.props(styles.navTitle, isActive && styles.titleActive)}>
                        {item.title}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Solutions() {
  const headingId = useId();
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const sheetRefs = useRef<(HTMLElement | null)[]>([]);
  const visibleRef = useRef(new Set<number>());
  const lockedRef = useRef(false);
  const releaseRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const visible = visibleRef.current;
    const sheetIndexes = new Map<Element, number>();
    sheetRefs.current.forEach((sheet, index) => {
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
        if (lockedRef.current || visible.size === 0) return;
        setActive(Math.min(...visible));
      },
      { rootMargin: SPY_BAND },
    );
    for (const sheet of sheetRefs.current) if (sheet) observer.observe(sheet);
    return () => {
      observer.disconnect();
      releaseRef.current?.();
    };
  }, []);

  const jumpTo = (index: number) => {
    const sheet = sheetRefs.current[index];
    if (!sheet) return;
    releaseRef.current?.();
    lockedRef.current = true;
    setActive(index);
    const release = () => {
      lockedRef.current = false;
      window.clearTimeout(timer);
      window.removeEventListener("scrollend", release);
      releaseRef.current = null;
    };
    const timer = window.setTimeout(release, 1200);
    window.addEventListener("scrollend", release, { once: true });
    releaseRef.current = release;
    sheet.focus({ preventScroll: true });
    sheet.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <section id="products-solutions" aria-labelledby={headingId} {...stylex.props(styles.section)}>
      <div {...stylex.props(styles.shell)}>
        <header {...stylex.props(styles.head)}>
          <h2 id={headingId} {...stylex.props(styles.title)}>
            应用方案
          </h2>
        </header>
        <JumpBar active={active} onJump={jumpTo} />
        <div {...stylex.props(styles.layout)}>
          <nav aria-label="Application solution index" {...stylex.props(styles.nav)}>
            <ol {...stylex.props(styles.navList)}>
              {SOLUTION_ITEMS.map((item, index) => {
                const isActive = index === active;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      aria-current={isActive ? "true" : undefined}
                      onClick={() => jumpTo(index)}
                      {...stylex.props(styles.navButton, isActive && styles.navButtonActive)}
                    >
                      <span {...stylex.props(styles.navNumber, isActive && styles.numberActive)}>
                        {padIndex(index)}
                      </span>
                      <span {...stylex.props(styles.navTitle, isActive && styles.titleActive)}>
                        {item.title}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </nav>
          <div {...stylex.props(styles.sheets)}>
            {SOLUTION_ITEMS.map((item, index) => (
              <Sheet
                key={item.id}
                item={item}
                index={index}
                current={index === active}
                sheetRef={(node) => {
                  sheetRefs.current[index] = node;
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
