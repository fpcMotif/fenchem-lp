import * as stylex from "@stylexjs/stylex";
import { Check, ChevronDown, ChevronLeft, ChevronRight, ListFilter } from "lucide-react";
import { m, useReducedMotion } from "motion/react";
import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
} from "react";

import { LabSection, useSolutionsBrowser, type SolutionsBrowser } from "../kit";
import { areaOf, padIndex, sheetRows, type SheetRow } from "../kit-values";
import { bp, depth, face, motion, tone } from "../tokens.stylex";

const WIDE_QUERY = "(min-width: 1024px)";
const NO_BREAK_SPACE = String.fromCharCode(0xa0);
const DOT_SEPARATOR = `${NO_BREAK_SPACE}· `;
const HOVER_WASH = "oklch(0.26 0.035 261.5 / 0.05)";
const FOCUS_HALO = "0 0 0 4px rgba(7, 67, 174, 0.16)";
const TRAILING_NOTE = /^(.+?)\s*[（(]([^（）()]+)[）)]$/;
const SCROLL_INSET = 12;
const FADE_EDGE = 40;
const STRIP_FADE = "linear-gradient(to right, #000 calc(100% - 28px), transparent)";
const BOTTOM_FADE = `linear-gradient(to bottom, #000 calc(100% - ${FADE_EDGE}px), transparent)`;
const FILTER_LABEL = "应用领域";

const areaName = (chip: SolutionsBrowser["chips"][number]) =>
  chip.id === "all" ? "全部领域" : chip.label;

const splitNote = (text: string) => {
  const match = TRAILING_NOTE.exec(text);
  return match ? { primary: match[1], note: match[2] } : { primary: text, note: null };
};

type Step = (index: number, count: number) => number;

const FIRST: Step = () => 0;
const LAST: Step = (_, count) => count - 1;
const NEXT: Step = (index, count) => (index + 1) % count;
const PREVIOUS: Step = (index, count) => (index - 1 + count) % count;

const VERTICAL_STEPS: Record<string, Step> = {
  ArrowDown: NEXT,
  ArrowUp: PREVIOUS,
  Home: FIRST,
  End: LAST,
};

const HORIZONTAL_STEPS: Record<string, Step> = {
  ArrowRight: NEXT,
  ArrowLeft: PREVIOUS,
  Home: FIRST,
  End: LAST,
};

const subscribeWide = (onChange: () => void) => {
  const query = window.matchMedia(WIDE_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

const readWide = () => window.matchMedia(WIDE_QUERY).matches;

const readWideOnServer = () => true;

const hasMoreBelow = (element: HTMLElement) =>
  element.scrollTop + element.clientHeight < element.scrollHeight - 1;

const fadeIn = stylex.keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const popIn = stylex.keyframes({
  "0%": { opacity: 0, transform: "translateY(-4px) scale(0.98)" },
  "100%": { opacity: 1, transform: "none" },
});

const styles = stylex.create({
  select: {
    position: "relative",
  },
  trigger: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    height: 40,
    boxSizing: "border-box",
    paddingInline: 12,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: {
      default: tone.tintRule,
      ":hover": { default: tone.tintRule, [bp.hover]: tone.accentLine },
    },
    borderRadius: 10,
    backgroundColor: tone.paper,
    color: tone.ink,
    cursor: "pointer",
    userSelect: "none",
    WebkitTapHighlightColor: "transparent",
    transitionProperty: "border-color",
    transitionDuration: { default: "0ms", [bp.motionOk]: "140ms" },
    transitionTimingFunction: motion.easeOut,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: tone.accent,
    outlineOffset: 2,
  },
  triggerOpen: {
    borderColor: tone.accent,
  },
  triggerValue: {
    flexGrow: 1,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.02em",
    whiteSpace: "nowrap",
  },
  filterIcon: {
    flexShrink: 0,
    color: tone.tintMuted,
  },
  count: {
    flexShrink: 0,
    fontSize: 12,
    fontWeight: 400,
    lineHeight: "16px",
    letterSpacing: "0.04em",
    color: tone.tintMuted,
    whiteSpace: "nowrap",
  },
  countNumber: {
    fontFamily: face.display,
    fontVariantNumeric: "tabular-nums",
  },
  chevron: {
    flexShrink: 0,
    color: tone.tintMuted,
    transitionProperty: "transform",
    transitionDuration: { default: "0ms", [bp.motionOk]: "200ms" },
    transitionTimingFunction: motion.easeOut,
  },
  chevronOpen: {
    transform: "rotate(180deg)",
  },
  listbox: {
    position: "absolute",
    top: "calc(100% + 6px)",
    left: 0,
    right: 0,
    zIndex: 3,
    boxSizing: "border-box",
    margin: 0,
    padding: 4,
    listStyleType: "none",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: tone.tintRule,
    borderRadius: 12,
    backgroundColor: tone.paper,
    boxShadow: depth.float,
    transformOrigin: "top center",
    animationName: { default: fadeIn, [bp.motionOk]: popIn },
    animationDuration: "150ms",
    animationTimingFunction: motion.easeOut,
  },
  option: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) auto 16px",
    alignItems: "center",
    columnGap: 12,
    height: 36,
    boxSizing: "border-box",
    paddingInline: 12,
    borderRadius: 8,
    fontSize: 14,
    lineHeight: "20px",
    color: tone.tintInk,
    whiteSpace: "nowrap",
    cursor: "pointer",
  },
  optionActive: {
    backgroundColor: tone.tintFill,
  },
  optionSelected: {
    fontWeight: 500,
    color: tone.accent,
  },
  optionCheck: {
    color: tone.accent,
  },
  workspace: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [bp.lg]: "300px minmax(0, 1fr)",
      [bp.xl]: "320px minmax(0, 1fr)",
    },
    gridTemplateRows: { default: null, [bp.lg]: "minmax(0, 1fr)" },
    rowGap: 12,
    height: { default: null, [bp.lg]: 600, [bp.xl]: 640 },
    marginTop: { default: 16, [bp.xl]: 24 },
    overflow: { default: null, [bp.lg]: "hidden" },
    borderWidth: { default: 0, [bp.lg]: 1 },
    borderStyle: "solid",
    borderColor: tone.tintRule,
    borderRadius: { default: 0, [bp.lg]: 16 },
    backgroundColor: { default: null, [bp.lg]: tone.paper },
    boxShadow: { default: null, [bp.lg]: depth.card },
  },
  listPane: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 12, [bp.lg]: 0 },
    minWidth: 0,
    minHeight: 0,
    backgroundColor: { default: null, [bp.lg]: tone.tintFill },
  },
  paneHead: {
    flexShrink: 0,
    paddingTop: { default: 0, [bp.lg]: 12 },
    paddingInline: { default: 0, [bp.lg]: 12 },
    paddingBottom: { default: 0, [bp.lg]: 4 },
  },
  list: {
    position: "relative",
    display: { default: "flex", [bp.lg]: "block" },
    alignItems: "center",
    gap: 2,
    flexGrow: 1,
    minHeight: 0,
    paddingTop: { default: 4, [bp.lg]: SCROLL_INSET },
    paddingBottom: { default: 4, [bp.lg]: 16 },
    paddingInlineStart: { default: 4, [bp.lg]: 12 },
    paddingInlineEnd: { default: 32, [bp.lg]: 0 },
    overflowX: { default: "auto", [bp.lg]: "hidden" },
    overflowY: { default: "hidden", [bp.lg]: "auto" },
    overscrollBehavior: "contain",
    scrollbarWidth: "none",
    scrollPaddingInline: 4,
    scrollPaddingTop: { default: null, [bp.lg]: SCROLL_INSET },
    borderRadius: { default: 12, [bp.lg]: 0 },
    backgroundColor: { default: tone.tintFill, [bp.lg]: "transparent" },
    maskImage: { default: STRIP_FADE, [bp.lg]: "none" },
  },
  listMore: {
    maskImage: { default: STRIP_FADE, [bp.lg]: BOTTOM_FADE },
  },
  listGrouped: {
    paddingTop: { default: 4, [bp.lg]: 0 },
  },
  group: {
    display: { default: "contents", [bp.lg]: "block" },
  },
  groupHead: {
    display: { default: "none", [bp.lg]: "flex" },
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    height: 44,
    boxSizing: "border-box",
    margin: 0,
    paddingTop: 8,
    paddingInlineStart: 16,
    paddingInlineEnd: 24,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "0.08em",
    color: tone.tintMuted,
    whiteSpace: "nowrap",
  },
  tab: {
    position: "relative",
    display: "grid",
    gridTemplateColumns: { default: "20px minmax(0, 1fr)", [bp.lg]: "24px minmax(0, 1fr)" },
    alignItems: { default: "center", [bp.lg]: "start" },
    columnGap: { default: 8, [bp.lg]: 12 },
    flexShrink: 0,
    width: { default: null, [bp.lg]: "100%" },
    height: { default: 36, [bp.lg]: "auto" },
    minHeight: { default: null, [bp.lg]: 68 },
    boxSizing: "border-box",
    paddingInline: { default: 10, [bp.lg]: 16 },
    paddingBlock: { default: 0, [bp.lg]: 12 },
    borderWidth: 0,
    borderRadius: { default: 8, [bp.lg]: "12px 0 0 12px" },
    backgroundColor: {
      default: "transparent",
      ":hover": { default: "transparent", [bp.hover]: HOVER_WASH },
    },
    boxShadow: "none",
    fontFamily: "inherit",
    textAlign: "start",
    cursor: "pointer",
    transitionProperty: "background-color, box-shadow",
    transitionDuration: { default: "0ms", [bp.motionOk]: "140ms" },
    transitionTimingFunction: motion.easeOut,
    outlineStyle: {
      default: "none",
      ":focus-visible": { default: "solid", [bp.lg]: "none" },
    },
    outlineWidth: 2,
    outlineColor: tone.accent,
    outlineOffset: -2,
  },
  tabSelected: {
    cursor: "default",
  },
  selection: {
    position: "absolute",
    inset: 0,
    borderRadius: { default: 8, [bp.lg]: "12px 0 0 12px" },
    backgroundColor: tone.paper,
    boxShadow: { default: depth.lift, [bp.lg]: "none" },
    pointerEvents: "none",
    "::before": {
      content: '""',
      display: { default: "none", [bp.lg]: "block" },
      position: "absolute",
      right: 0,
      bottom: "100%",
      width: 12,
      height: 12,
      backgroundColor: tone.paper,
      maskImage: "radial-gradient(circle at 0 0, transparent 11.5px, #000 12px)",
      pointerEvents: "none",
    },
    "::after": {
      content: '""',
      display: { default: "none", [bp.lg]: "block" },
      position: "absolute",
      right: 0,
      top: "100%",
      width: 12,
      height: 12,
      backgroundColor: tone.paper,
      maskImage: "radial-gradient(circle at 0 100%, transparent 11.5px, #000 12px)",
      pointerEvents: "none",
    },
  },
  selectionFrame: {
    display: { default: "none", [bp.lg]: "block" },
    position: "absolute",
    inset: 4,
    boxSizing: "border-box",
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: tone.accent,
    borderRadius: 9,
    boxShadow: { default: "none", [stylex.when.ancestor(":focus-visible")]: FOCUS_HALO },
    transitionProperty: "box-shadow",
    transitionDuration: { default: "0ms", [bp.motionOk]: "140ms" },
    transitionTimingFunction: motion.easeOut,
  },
  tabIndex: {
    position: "relative",
    fontFamily: face.display,
    fontSize: { default: 12, [bp.lg]: 13 },
    fontWeight: 500,
    lineHeight: { default: "16px", [bp.lg]: "22px" },
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: {
      default: tone.tintMuted,
      [stylex.when.ancestor(":hover")]: { default: tone.tintMuted, [bp.hover]: tone.tintBody },
    },
  },
  tabIndexSelected: {
    color: tone.accent,
  },
  tabText: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: 2,
    minWidth: 0,
  },
  tabName: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    fontSize: { default: 14, [bp.lg]: 15 },
    fontWeight: 500,
    lineHeight: { default: "20px", [bp.lg]: "22px" },
    letterSpacing: "0.02em",
    color: tone.tintInk,
  },
  tabNameSelected: {
    fontWeight: 600,
    color: tone.ink,
  },
  tabMeta: {
    display: { default: "none", [bp.lg]: "block" },
    wordBreak: "keep-all",
    overflowWrap: "anywhere",
    fontSize: 13,
    lineHeight: "20px",
    letterSpacing: "0.02em",
    color: {
      default: tone.tintMuted,
      [stylex.when.ancestor(":hover")]: { default: tone.tintMuted, [bp.hover]: tone.tintBody },
    },
  },
  panel: {
    minWidth: 0,
    minHeight: 0,
    overflowY: { default: "visible", [bp.lg]: "auto" },
    overscrollBehavior: "contain",
    scrollbarWidth: "thin",
    paddingInline: { default: 20, [bp.md]: 28, [bp.lg]: 36, [bp.xl]: 48 },
    paddingTop: { default: 18, [bp.md]: 22, [bp.lg]: 34, [bp.xl]: 38 },
    paddingBottom: { default: 12, [bp.lg]: 32 },
    borderWidth: { default: 1, [bp.lg]: 0 },
    borderStyle: "solid",
    borderColor: tone.tintRule,
    borderRadius: { default: 12, [bp.lg]: 0 },
    backgroundColor: tone.paper,
    boxShadow: { default: depth.card, [bp.lg]: "none" },
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: tone.accent,
    outlineOffset: -2,
  },
  panelMore: {
    maskImage: { default: null, [bp.lg]: BOTTOM_FADE },
  },
  fade: {
    animationName: { default: "none", [bp.motionOk]: fadeIn },
    animationDuration: "160ms",
    animationTimingFunction: motion.easeOut,
  },
  sheetMeta: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  eyebrow: {
    display: "flex",
    alignItems: "baseline",
    gap: 8,
    minWidth: 0,
    margin: 0,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.06em",
    color: tone.accent,
    whiteSpace: "nowrap",
  },
  english: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontFamily: face.display,
    fontSize: 11,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: tone.tintMuted,
  },
  stepper: {
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  counter: {
    marginInlineEnd: 4,
    fontFamily: face.display,
    fontSize: 12,
    lineHeight: "16px",
    letterSpacing: "0.08em",
    fontVariantNumeric: "tabular-nums",
    color: tone.tintMuted,
    whiteSpace: "nowrap",
  },
  counterCurrent: {
    fontWeight: 600,
    color: tone.tintInk,
  },
  stepButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 32,
    height: 32,
    boxSizing: "border-box",
    padding: 0,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: {
      default: tone.tintRule,
      ":hover": { default: tone.tintRule, [bp.hover]: tone.accentLine },
    },
    borderRadius: 8,
    backgroundColor: tone.paper,
    color: {
      default: tone.tintInk,
      ":hover": { default: tone.tintInk, [bp.hover]: tone.accent },
    },
    cursor: "pointer",
    transform: { default: null, ":active": "scale(0.94)" },
    transitionProperty: "border-color, color, transform",
    transitionDuration: { default: "0ms", [bp.motionOk]: "140ms" },
    transitionTimingFunction: motion.easeOut,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: tone.accent,
    outlineOffset: 2,
  },
  stepButtonDisabled: {
    borderColor: tone.tintRuleSoft,
    color: tone.tintMuted,
    opacity: 0.5,
    cursor: "default",
    transform: "none",
  },
  title: {
    margin: 0,
    marginTop: 6,
    fontSize: { default: 22, [bp.md]: 24, [bp.xl]: 28 },
    fontWeight: 600,
    lineHeight: 1.35,
    letterSpacing: "0.02em",
    color: tone.ink,
    textWrap: "balance",
  },
  subtitle: {
    margin: 0,
    marginTop: 8,
    maxWidth: "40em",
    fontSize: { default: 14, [bp.xl]: 15 },
    lineHeight: { default: "22px", [bp.xl]: "24px" },
    color: tone.tintBody,
    textWrap: "pretty",
  },
  fields: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [bp.xl]: "repeat(2, minmax(0, 1fr))" },
    gridTemplateRows: { default: null, [bp.xl]: "repeat(3, auto)" },
    gridAutoFlow: { default: null, [bp.xl]: "column" },
    columnGap: 40,
    margin: 0,
    marginTop: { default: 20, [bp.xl]: 28 },
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    minWidth: 0,
    paddingTop: 18,
    paddingBottom: 14,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.tintRule,
  },
  fieldLabel: {
    margin: 0,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "22px",
    letterSpacing: "0.04em",
    color: tone.tintMuted,
  },
  fieldValue: {
    margin: 0,
    minWidth: 0,
    fontSize: { default: 14, [bp.xl]: 15 },
    lineHeight: { default: "24px", [bp.xl]: "26px" },
    color: tone.tintBody,
    textWrap: "pretty",
  },
  lines: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  strong: {
    fontWeight: 500,
    color: tone.ink,
  },
  keepWords: {
    wordBreak: "keep-all",
    overflowWrap: "anywhere",
  },
  note: {
    marginInlineStart: 6,
    fontSize: 13,
    fontWeight: 400,
    color: tone.tintMuted,
  },
  empty: {
    marginTop: 24,
    fontSize: 14,
    color: tone.tintMuted,
  },
});

function AreaSelect({ browser }: { browser: SolutionsBrowser }) {
  const { area, chips, chooseArea } = browser;
  const baseId = useId();
  const listId = `${baseId}-list`;
  const optionId = (index: number) => `${baseId}-option-${index}`;
  const rootRef = useRef<HTMLDivElement>(null);
  const selectedIndex = Math.max(
    0,
    chips.findIndex((chip) => chip.id === area),
  );
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(selectedIndex);
  const selected = chips[selectedIndex];
  const last = chips.length - 1;

  useEffect(() => {
    if (!open) return;
    const closeOnOutside = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutside);
    return () => document.removeEventListener("pointerdown", closeOnOutside);
  }, [open]);

  const openAt = (index: number) => {
    setActiveIndex(index);
    setOpen(true);
  };

  const choose = (index: number) => {
    const chip = chips[index];
    if (chip) chooseArea(chip.id);
    setOpen(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
        event.preventDefault();
        openAt(selectedIndex);
      } else if (event.key === "Home" || event.key === "End") {
        event.preventDefault();
        openAt(event.key === "Home" ? 0 : last);
      }
      return;
    }
    event.stopPropagation();
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActiveIndex((index) => Math.min(index + 1, last));
        break;
      case "ArrowUp":
        event.preventDefault();
        setActiveIndex((index) => Math.max(index - 1, 0));
        break;
      case "Home":
        event.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        event.preventDefault();
        setActiveIndex(last);
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        choose(activeIndex);
        break;
      case "Escape":
        event.preventDefault();
        setOpen(false);
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  };

  if (!selected) return null;

  return (
    <div ref={rootRef} {...stylex.props(styles.select)}>
      <div
        role="combobox"
        tabIndex={0}
        aria-label={FILTER_LABEL}
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open ? optionId(activeIndex) : undefined}
        onClick={() => (open ? setOpen(false) : openAt(selectedIndex))}
        onKeyDown={handleKeyDown}
        {...stylex.props(styles.trigger, open && styles.triggerOpen)}
      >
        <ListFilter
          size={16}
          strokeWidth={1.75}
          aria-hidden="true"
          {...stylex.props(styles.filterIcon)}
        />
        <span {...stylex.props(styles.triggerValue)}>{areaName(selected)}</span>
        <Count value={selected.count} />
        <ChevronDown
          size={16}
          strokeWidth={1.75}
          aria-hidden="true"
          {...stylex.props(styles.chevron, open && styles.chevronOpen)}
        />
      </div>
      <ul
        id={listId}
        role="listbox"
        aria-label={FILTER_LABEL}
        hidden={!open}
        {...stylex.props(styles.listbox)}
      >
        {chips.map((chip, index) => {
          const isSelected = index === selectedIndex;
          return (
            <li
              key={chip.id}
              id={optionId(index)}
              role="option"
              aria-selected={isSelected}
              onPointerDown={(event) => event.preventDefault()}
              onPointerMove={() => setActiveIndex(index)}
              onClick={() => choose(index)}
              {...stylex.props(
                styles.option,
                index === activeIndex && styles.optionActive,
                isSelected && styles.optionSelected,
              )}
            >
              <span>{areaName(chip)}</span>
              <Count value={chip.count} />
              {isSelected ? (
                <Check
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                  {...stylex.props(styles.optionCheck)}
                />
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Count({ value }: { value: number }) {
  return (
    <span {...stylex.props(styles.count)}>
      <span {...stylex.props(styles.countNumber)}>{value}</span> 款
    </span>
  );
}

function RowValue({ row }: { row: SheetRow }) {
  if (row.values.length === 0) return <>无</>;
  if (row.kind === "lines") {
    return (
      <ul {...stylex.props(styles.lines)}>
        {row.values.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    );
  }
  if (row.kind === "strong") {
    return (
      <span {...stylex.props(styles.strong, styles.keepWords)}>
        {row.values.join(DOT_SEPARATOR)}
      </span>
    );
  }
  if (row.kind === "list") {
    return (
      <ul {...stylex.props(styles.lines)}>
        {row.values.map((entry) => {
          const { primary, note } = splitNote(entry);
          return (
            <li key={entry} {...stylex.props(styles.keepWords)}>
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

export function DropdownVariant() {
  const browser = useSolutionsBrowser();
  const { area, scope, groups, selected, position, select } = browser;
  const uid = useId();
  const reduce = useReducedMotion();
  const wide = useSyncExternalStore(subscribeWide, readWide, readWideOnServer);
  const listRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [listHasMore, setListHasMore] = useState(false);
  const [panelHasMore, setPanelHasMore] = useState(false);
  const selectedId = selected?.id;
  const selectionTransition = reduce
    ? { duration: 0 }
    : { type: "spring" as const, duration: 0.35, bounce: 0.15 };

  const syncListMore = () => {
    const list = listRef.current;
    if (list) setListHasMore(hasMoreBelow(list));
  };

  const syncPanelMore = () => {
    const panel = panelRef.current;
    if (panel) setPanelHasMore(hasMoreBelow(panel));
  };

  useEffect(syncListMore, [area, wide]);

  useEffect(() => {
    const list = listRef.current;
    const tab = list?.querySelector<HTMLElement>('[aria-selected="true"]');
    if (!list || !tab) return;
    const behavior: ScrollBehavior = reduce ? "auto" : "smooth";
    if (!wide) {
      if (list.scrollWidth <= list.clientWidth) return;
      const left = tab.offsetLeft - (list.clientWidth - tab.offsetWidth) / 2;
      list.scrollTo({ left: Math.max(0, left), behavior });
      return;
    }
    const top = tab.offsetTop - SCROLL_INSET;
    const bottom = tab.offsetTop + tab.offsetHeight + FADE_EDGE - list.clientHeight;
    if (list.scrollTop > top) list.scrollTo({ top: Math.max(0, top), behavior });
    else if (list.scrollTop < bottom) list.scrollTo({ top: bottom, behavior });
  }, [area, selectedId, wide, reduce]);

  useEffect(() => {
    panelRef.current?.scrollTo({ top: 0 });
    syncPanelMore();
  }, [selectedId, wide]);

  const handleListKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = (wide ? VERTICAL_STEPS : HORIZONTAL_STEPS)[event.key];
    if (!step || scope.length === 0) return;
    event.preventDefault();
    event.stopPropagation();
    const next = step(position, scope.length);
    const nextItem = scope[next];
    if (!nextItem) return;
    select(nextItem.id);
    event.currentTarget
      .querySelectorAll<HTMLElement>('[role="tab"]')
      [next]?.focus({ preventScroll: true });
  };

  if (!selected) {
    return (
      <LabSection>
        <AreaSelect browser={browser} />
        <p {...stylex.props(styles.empty)}>该领域暂无应用方案</p>
      </LabSection>
    );
  }

  const grouped = area === "all";
  const selectedArea = areaOf(selected.area);
  const areaItems = groups.find((group) => group.id === selected.area)?.items ?? [];
  const previous = scope[position - 1];
  const next = scope[position + 1];

  return (
    <LabSection>
      <div {...stylex.props(styles.workspace)}>
        <div {...stylex.props(styles.listPane)}>
          <div {...stylex.props(styles.paneHead)}>
            <AreaSelect browser={browser} />
          </div>
          <m.div
            ref={listRef}
            layoutScroll
            role="tablist"
            aria-label="应用方案"
            aria-orientation={wide ? "vertical" : "horizontal"}
            onKeyDown={handleListKeyDown}
            onScroll={wide ? syncListMore : undefined}
            {...stylex.props(
              styles.list,
              grouped && styles.listGrouped,
              wide && listHasMore && styles.listMore,
            )}
          >
            {groups.map((group) => (
              <div key={group.id} {...stylex.props(styles.group)}>
                {grouped && (
                  <p aria-hidden="true" {...stylex.props(styles.groupHead)}>
                    <span>{group.label}</span>
                    <Count value={group.items.length} />
                  </p>
                )}
                {group.items.map((item, index) => {
                  const isSelected = item.id === selected.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      id={`${uid}-tab-${item.id}`}
                      aria-selected={isSelected}
                      aria-controls={`${uid}-panel`}
                      tabIndex={isSelected ? 0 : -1}
                      onClick={() => select(item.id)}
                      {...stylex.props(
                        styles.tab,
                        isSelected && styles.tabSelected,
                        stylex.defaultMarker(),
                      )}
                    >
                      {isSelected && (
                        <m.span
                          layoutId={`${uid}-selection`}
                          aria-hidden="true"
                          transition={selectionTransition}
                          {...stylex.props(styles.selection)}
                        >
                          <m.span
                            layout
                            transition={selectionTransition}
                            {...stylex.props(styles.selectionFrame)}
                          />
                        </m.span>
                      )}
                      <span
                        {...stylex.props(styles.tabIndex, isSelected && styles.tabIndexSelected)}
                      >
                        {padIndex(index)}
                      </span>
                      <span {...stylex.props(styles.tabText)}>
                        <span
                          {...stylex.props(styles.tabName, isSelected && styles.tabNameSelected)}
                        >
                          {item.title}
                        </span>
                        <span {...stylex.props(styles.tabMeta)}>
                          {item.functions.join(DOT_SEPARATOR)}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            ))}
          </m.div>
        </div>
        <div
          ref={panelRef}
          role="tabpanel"
          id={`${uid}-panel`}
          aria-labelledby={`${uid}-tab-${selected.id}`}
          tabIndex={0}
          onScroll={wide ? syncPanelMore : undefined}
          {...stylex.props(styles.panel, wide && panelHasMore && styles.panelMore)}
        >
          <div {...stylex.props(styles.sheetMeta)}>
            <p {...stylex.props(styles.eyebrow)}>
              <span>{selectedArea?.label}</span>
              <span lang="en" {...stylex.props(styles.english)}>
                {selectedArea?.englishLabel}
              </span>
            </p>
            <div {...stylex.props(styles.stepper)}>
              <span {...stylex.props(styles.counter)}>
                <span {...stylex.props(styles.counterCurrent)}>
                  {padIndex(areaItems.indexOf(selected))}
                </span>{" "}
                / {padIndex(areaItems.length - 1)}
              </span>
              <button
                type="button"
                aria-label="上一个方案"
                disabled={!previous}
                onClick={() => previous && select(previous.id)}
                {...stylex.props(styles.stepButton, !previous && styles.stepButtonDisabled)}
              >
                <ChevronLeft size={16} strokeWidth={1.75} aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="下一个方案"
                disabled={!next}
                onClick={() => next && select(next.id)}
                {...stylex.props(styles.stepButton, !next && styles.stepButtonDisabled)}
              >
                <ChevronRight size={16} strokeWidth={1.75} aria-hidden="true" />
              </button>
            </div>
          </div>
          <div key={selected.id} {...stylex.props(styles.fade)}>
            <header>
              <h3 {...stylex.props(styles.title)}>{selected.title}</h3>
              <p {...stylex.props(styles.subtitle)}>{selected.subtitle}</p>
            </header>
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
          </div>
        </div>
      </div>
    </LabSection>
  );
}
