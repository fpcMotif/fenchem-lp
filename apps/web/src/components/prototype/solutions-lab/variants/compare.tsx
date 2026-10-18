import * as stylex from "@stylexjs/stylex";
import { AnimatePresence, m } from "@/compat/motion";
import { createEffect, createMemo, createSignal, createUniqueId, For, Show } from "solid-js";
import type { JSX } from "@solidjs/web";

import {
  AreaChips,
  LabSection,
  areaOf,
  padIndex,
  sheetRows,
  useSolutionsBrowser,
  type SheetRow,
  type SolutionItem,
} from "../kit";
import { bp, depth, face, motion, tone } from "../tokens.stylex";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;
const LETTERS = ["A", "B"] as const;
const NOTICE_MS = 2400;
const NO_BREAK_SPACE = String.fromCharCode(0xa0);
const TRAILING_NOTE = /^(.+?)\s*[（(]([^（）()]+)[）)]$/;

const splitNote = (text: string) => {
  const match = TRAILING_NOTE.exec(text);
  return match ? { primary: match[1], note: match[2] } : { primary: text, note: null };
};

const ingredientParts = (entry: string) => {
  const { primary, note } = splitNote(entry);
  return { parts: primary.split(" / ").map((part) => part.trim()), note };
};

const ingredientNames = (item: SolutionItem) =>
  item.keyIngredients.flatMap((entry) => ingredientParts(entry).parts);

const centreOf = (rect: DOMRect) => rect.left + rect.width / 2;

const findTileVertically = (tiles: HTMLElement[], origin: HTMLElement, down: boolean) => {
  const from = origin.getBoundingClientRect();
  const candidates = tiles
    .map((tile) => ({ tile, rect: tile.getBoundingClientRect() }))
    .filter(({ rect }) => (down ? rect.top >= from.bottom - 1 : rect.bottom <= from.top + 1));
  if (candidates.length === 0) return undefined;
  const edge = down
    ? Math.min(...candidates.map(({ rect }) => rect.top))
    : Math.max(...candidates.map(({ rect }) => rect.bottom));
  const row = candidates.filter(({ rect }) => Math.abs((down ? rect.top : rect.bottom) - edge) < 2);
  const centre = centreOf(from);
  return row.reduce((best, entry) =>
    Math.abs(centreOf(entry.rect) - centre) < Math.abs(centreOf(best.rect) - centre) ? entry : best,
  ).tile;
};

type Mode = "single" | "compare";
type Notice = { key: number; text: string };

const MOBILE_EDGES =
  "linear-gradient(to right, transparent, #000 12px, #000 calc(100% - 28px), transparent)";

const fadeIn = stylex.keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const styles = stylex.create({
  tray: {
    marginTop: { default: 16, [bp.xl]: 24 },
    overflow: "hidden",
    borderRadius: { default: 12, [bp.md]: 16 },
    backgroundColor: tone.tintFill,
  },
  well: {
    position: "relative",
    display: { default: "flex", [bp.md]: "block" },
    gap: 6,
    maxHeight: { default: null, [bp.md]: 380 },
    paddingBlock: { default: 6, [bp.md]: 12 },
    paddingInline: { default: 6, [bp.md]: 12 },
    overflowX: { default: "auto", [bp.md]: "hidden" },
    overflowY: { default: "hidden", [bp.md]: "auto" },
    overscrollBehavior: "contain",
    scrollbarWidth: { default: "none", [bp.md]: "thin" },
    scrollPaddingInline: 12,
    scrollPaddingTop: { default: null, [bp.md]: 48 },
    maskImage: { default: MOBILE_EDGES, [bp.md]: "none" },
  },
  wellGrouped: {
    paddingTop: { default: 6, [bp.md]: 0 },
  },
  wellFade: {
    maskImage: {
      default: MOBILE_EDGES,
      [bp.md]: "linear-gradient(to bottom, #000 calc(100% - 56px), transparent)",
    },
  },
  group: {
    display: { default: "contents", [bp.md]: "block" },
  },
  groupHead: {
    position: { default: "static", [bp.md]: "sticky" },
    top: 0,
    zIndex: 2,
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: { default: "center", [bp.md]: "space-between" },
    gap: 12,
    margin: 0,
    paddingTop: { default: 0, [bp.md]: 14 },
    paddingBottom: { default: 0, [bp.md]: 10 },
    paddingLeft: { default: 6, [bp.md]: 4 },
    paddingRight: { default: 6, [bp.md]: 4 },
    backgroundColor: tone.tintFill,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.08em",
    color: tone.tintMuted,
    whiteSpace: "nowrap",
    writingMode: { default: "vertical-rl", [bp.md]: "horizontal-tb" },
  },
  groupCount: {
    display: { default: "none", [bp.md]: "inline" },
    fontFamily: face.display,
    fontWeight: 400,
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
  },
  grid: {
    display: { default: "contents", [bp.md]: "grid" },
    gridTemplateColumns: {
      default: null,
      [bp.md]: "repeat(3, minmax(0, 1fr))",
      [bp.lg]: "repeat(4, minmax(0, 1fr))",
    },
    gap: 10,
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  tile: {
    position: "relative",
    flexShrink: 0,
    width: { default: 212, [bp.md]: "auto" },
    minWidth: 0,
    listStyleType: "none",
  },
  tileButton: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    paddingTop: 14,
    paddingBottom: 14,
    paddingInline: 16,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: {
      default: tone.tintRule,
      ":hover": { default: tone.tintRule, [bp.hover]: tone.accentLine },
    },
    borderRadius: 12,
    backgroundColor: tone.paper,
    boxShadow: "none",
    fontFamily: "inherit",
    textAlign: "start",
    color: tone.tintInk,
    cursor: "pointer",
    transitionProperty: "border-color, box-shadow",
    transitionDuration: { default: "0ms", [bp.motionOk]: "160ms" },
    transitionTimingFunction: motion.easeOut,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: tone.accent,
    outlineOffset: 2,
  },
  tileButtonSelected: {
    borderColor: tone.ink,
    boxShadow: depth.card,
    cursor: "default",
  },
  tileTop: {
    display: "flex",
    alignItems: "center",
    height: 26,
  },
  tileIndex: {
    fontFamily: face.display,
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: tone.tintMuted,
  },
  tileIndexSelected: {
    color: tone.ink,
  },
  tileName: {
    marginTop: 8,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    fontSize: 15,
    fontWeight: 500,
    lineHeight: "22px",
    letterSpacing: "0.02em",
    color: {
      default: tone.tintInk,
      [stylex.when.ancestor(":hover")]: { default: tone.tintInk, [bp.hover]: tone.accent },
    },
    transitionProperty: "color",
    transitionDuration: { default: "0ms", [bp.motionOk]: "150ms" },
    transitionTimingFunction: motion.easeOut,
  },
  tileNameSelected: {
    color: tone.ink,
  },
  tileFunctions: {
    marginTop: 2,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    fontSize: 13,
    lineHeight: "18px",
    color: tone.tintMuted,
  },
  toggle: {
    flexShrink: 0,
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    height: 26,
    paddingInline: 8,
    boxSizing: "border-box",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "transparent",
    borderRadius: 6,
    backgroundColor: {
      default: "transparent",
      ":hover": { default: "transparent", [bp.hover]: tone.tintFill },
    },
    fontFamily: "inherit",
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "0.04em",
    color: {
      default: tone.tintBody,
      ":hover": { default: tone.tintBody, [bp.hover]: tone.ink },
    },
    whiteSpace: "nowrap",
    cursor: "pointer",
    transform: { default: null, ":active": "scale(0.96)" },
    transitionProperty: "background-color, color, border-color, transform",
    transitionDuration: { default: "0ms", [bp.motionOk]: "150ms" },
    transitionTimingFunction: motion.easeOut,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: tone.accent,
    outlineOffset: 1,
  },
  toggleCorner: {
    position: "absolute",
    top: 14,
    right: 10,
    zIndex: 1,
  },
  toggleOutlined: {
    borderColor: tone.tintRule,
  },
  toggleOn: {
    color: tone.ink,
  },
  box: {
    position: "relative",
    flexShrink: 0,
    width: 12,
    height: 12,
    boxSizing: "border-box",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: tone.tintMuted,
    borderRadius: 3,
    backgroundColor: tone.paper,
    transitionProperty: "background-color, border-color",
    transitionDuration: { default: "0ms", [bp.motionOk]: "120ms" },
    transitionTimingFunction: motion.easeOut,
    "::after": {
      content: '""',
      position: "absolute",
      left: 3,
      top: 0,
      width: 3,
      height: 6,
      borderRightWidth: 1.5,
      borderBottomWidth: 1.5,
      borderRightStyle: "solid",
      borderBottomStyle: "solid",
      borderRightColor: tone.paper,
      borderBottomColor: tone.paper,
      transform: "rotate(45deg)",
      opacity: 0,
    },
  },
  boxOn: {
    borderColor: tone.ink,
    backgroundColor: tone.ink,
    "::after": {
      opacity: 1,
    },
  },
  toggleLetter: {
    fontFamily: face.display,
    fontWeight: 600,
    color: tone.ink,
  },
  sheet: {
    marginTop: { default: 16, [bp.xl]: 20 },
    overflow: "hidden",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: tone.tintRule,
    borderRadius: { default: 12, [bp.xl]: 16 },
    backgroundColor: tone.paper,
    boxShadow: depth.card,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: tone.accent,
    outlineOffset: 2,
  },
  toolbar: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    columnGap: 16,
    rowGap: 4,
    minHeight: 48,
    boxSizing: "border-box",
    paddingBlock: 8,
    paddingInline: { default: 20, [bp.md]: 32, [bp.xl]: 40 },
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: tone.tintRuleSoft,
    backgroundColor: tone.tintHead,
  },
  toolbarTitle: {
    margin: 0,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.08em",
    color: tone.tintMuted,
    whiteSpace: "nowrap",
  },
  toolbarSide: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    minWidth: 0,
    marginInlineStart: "auto",
  },
  status: {
    margin: 0,
    minWidth: 0,
    overflow: "hidden",
    fontSize: 13,
    lineHeight: "20px",
    color: tone.tintBody,
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  textButton: {
    flexShrink: 0,
    height: 30,
    paddingInline: 12,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: {
      default: tone.tintRule,
      ":hover": { default: tone.tintRule, [bp.hover]: tone.ink },
    },
    borderRadius: 999,
    backgroundColor: tone.paper,
    fontFamily: "inherit",
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "18px",
    color: tone.ink,
    whiteSpace: "nowrap",
    cursor: "pointer",
    transform: { default: null, ":active": "scale(0.97)" },
    transitionProperty: "border-color, transform",
    transitionDuration: { default: "0ms", [bp.motionOk]: "150ms" },
    transitionTimingFunction: motion.easeOut,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: tone.accent,
    outlineOffset: 2,
  },
  stage: {
    position: "relative",
  },
  view: {
    minWidth: 0,
    paddingInline: { default: 20, [bp.md]: 32, [bp.xl]: 40 },
    paddingTop: { default: 24, [bp.md]: 32 },
    paddingBottom: { default: 12, [bp.md]: 20 },
  },
  fade: {
    animationName: { default: "none", [bp.motionOk]: fadeIn },
    animationDuration: "160ms",
    animationTimingFunction: motion.easeOut,
  },
  singleHead: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 16,
    paddingBottom: { default: 20, [bp.md]: 24 },
  },
  headText: {
    minWidth: 0,
  },
  area: {
    margin: 0,
    marginBottom: 8,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.08em",
    color: tone.tintMuted,
  },
  title: {
    margin: 0,
    fontSize: { default: 20, [bp.md]: 24 },
    fontWeight: 500,
    lineHeight: 1.35,
    letterSpacing: "0.04em",
    color: tone.ink,
    textWrap: "balance",
  },
  subtitle: {
    margin: 0,
    marginTop: 8,
    maxWidth: "40em",
    fontSize: 15,
    lineHeight: 1.6,
    color: tone.tintBody,
    textWrap: "pretty",
  },
  rows: {
    margin: 0,
  },
  row: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [bp.md]: "112px minmax(0, 1fr)" },
    alignItems: "start",
    columnGap: { default: 0, [bp.md]: 24, [bp.xl]: 32 },
    rowGap: 6,
    paddingBlock: { default: 14, [bp.md]: 16 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.tintRuleSoft,
  },
  compareRow: {
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [bp.md]: "112px minmax(0, 1fr) minmax(0, 1fr)",
    },
    rowGap: { default: 12, [bp.md]: 6 },
  },
  headRow: {
    paddingTop: 0,
    paddingBottom: { default: 16, [bp.md]: 20 },
    borderTopWidth: 0,
  },
  label: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    margin: 0,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.04em",
    color: tone.tintMuted,
  },
  legend: {
    fontSize: 12,
    fontWeight: 400,
    lineHeight: "18px",
    letterSpacing: "0.02em",
  },
  value: {
    margin: 0,
    minWidth: 0,
    fontSize: { default: 14, [bp.xl]: 15 },
    lineHeight: "24px",
    color: tone.ink,
    textWrap: "pretty",
  },
  cell: {
    minWidth: 0,
    paddingInlineStart: { default: 14, [bp.md]: 20 },
    borderInlineStartWidth: 1,
    borderInlineStartStyle: "solid",
    borderInlineStartColor: tone.tintRuleSoft,
  },
  corner: {
    display: { default: "none", [bp.md]: "block" },
  },
  srOnly: {
    position: "absolute",
    width: 1,
    height: 1,
    overflow: "hidden",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
  },
  cellTag: {
    display: { default: "flex", [bp.md]: "none" },
    alignItems: "baseline",
    gap: 8,
    marginBottom: 4,
    fontSize: 12,
    lineHeight: "18px",
    color: tone.tintMuted,
  },
  letter: {
    fontFamily: face.display,
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.04em",
    color: tone.ink,
  },
  columnTop: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    minHeight: 28,
  },
  columnArea: {
    minWidth: 0,
    overflow: "hidden",
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "18px",
    letterSpacing: "0.08em",
    color: tone.tintMuted,
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  remove: {
    flexShrink: 0,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 28,
    height: 28,
    marginInlineStart: "auto",
    marginInlineEnd: -6,
    padding: 0,
    borderWidth: 0,
    borderRadius: 6,
    backgroundColor: {
      default: "transparent",
      ":hover": { default: "transparent", [bp.hover]: tone.tintFill },
    },
    fontFamily: face.display,
    fontSize: 18,
    lineHeight: 1,
    color: {
      default: tone.tintMuted,
      ":hover": { default: tone.tintMuted, [bp.hover]: tone.ink },
    },
    cursor: "pointer",
    transitionProperty: "background-color, color",
    transitionDuration: { default: "0ms", [bp.motionOk]: "150ms" },
    transitionTimingFunction: motion.easeOut,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: tone.accent,
    outlineOffset: 0,
  },
  columnTitle: {
    margin: 0,
    marginTop: 4,
    fontSize: { default: 17, [bp.xl]: 18 },
    fontWeight: 500,
    lineHeight: 1.4,
    letterSpacing: "0.03em",
    color: tone.ink,
    textWrap: "balance",
  },
  columnSubtitle: {
    margin: 0,
    marginTop: 4,
    fontSize: 13,
    lineHeight: "20px",
    color: tone.tintBody,
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
  body: {
    color: tone.tintBody,
  },
  strong: {
    fontWeight: 500,
  },
  shared: {
    fontWeight: 500,
    color: tone.ink,
  },
  unshared: {
    fontWeight: 400,
    color: tone.tintBody,
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
  separator: {
    color: tone.tintMuted,
  },
  empty: {
    marginTop: 24,
    fontSize: 14,
    color: tone.tintMuted,
  },
});

function RowValue(props: { row: SheetRow; shared?: Set<string> }) {
  if (props.row.values.length === 0) return <span {...stylex.attrs(styles.absent)}>无</span>;
  if (props.row.kind === "lines") {
    return (
      <ul {...stylex.attrs(styles.lines, styles.body)}>
        {props.row.values.map((line) => (
          <li>{line}</li>
        ))}
      </ul>
    );
  }
  if (props.row.kind === "strong") {
    return <span {...stylex.attrs(styles.strong)}>{props.row.values.join(" · ")}</span>;
  }
  if (props.row.kind === "list") {
    return (
      <ul {...stylex.attrs(styles.lines)}>
        {props.row.values.map((entry) => {
          const { parts, note } = ingredientParts(entry);
          return (
            <li {...stylex.attrs(styles.keepWords)}>
              {parts.map((part, index) => (
                <span>
                  {index > 0 && (
                    <span {...stylex.attrs(styles.separator)}>{`${NO_BREAK_SPACE}/ `}</span>
                  )}
                  <span
                    {...stylex.attrs(
                      props.shared
                        ? props.shared.has(part)
                          ? styles.shared
                          : styles.unshared
                        : styles.strong,
                    )}
                  >
                    {part}
                  </span>
                </span>
              ))}
              {note && <span {...stylex.attrs(styles.note)}>{note}</span>}
            </li>
          );
        })}
      </ul>
    );
  }
  return <>{props.row.values.join("、")}</>;
}

function CompareToggle(props: {
  item: SolutionItem;
  pressed: boolean;
  letter?: string;
  onToggle: () => void;
  tabIndex?: number;
  inTile?: boolean;
}) {
  return (
    <button
      type="button"
      aria-pressed={props.pressed ? "true" : "false"}
      aria-label={`对比：${props.item.title}`}
      data-tile-id={props.inTile ? props.item.id : undefined}
      data-part={props.inTile ? "toggle" : undefined}
      tabindex={props.tabIndex}
      onClick={() => props.onToggle()}
      {...stylex.attrs(
        styles.toggle,
        props.inTile ? styles.toggleCorner : styles.toggleOutlined,
        props.pressed && styles.toggleOn,
      )}
    >
      <span aria-hidden="true" {...stylex.attrs(styles.box, props.pressed && styles.boxOn)} />
      <span aria-hidden="true">对比</span>
      <Show when={props.letter}>
        <span aria-hidden="true" {...stylex.attrs(styles.toggleLetter)}>
          {props.letter}
        </span>
      </Show>
    </button>
  );
}

export function CompareVariant() {
  const browser = useSolutionsBrowser();
  const solutions = browser.solutions;
  const uid = createUniqueId();
  let well: HTMLDivElement | undefined;
  let sheet: HTMLDivElement | undefined;
  const [compareIds, setCompareIds] = createSignal<string[]>([]);
  const [mode, setMode] = createSignal<Mode>("single");
  const [notice, setNotice] = createSignal<Notice | null>(null);
  const [focusId, setFocusId] = createSignal<string>();
  const [fadeBottom, setFadeBottom] = createSignal(false);

  const pair = createMemo(() =>
    compareIds()
      .map((id) => solutions.find((item) => item.id === id))
      .filter((item): item is SolutionItem => item !== undefined),
  );
  const first = () => pair()[0];
  const second = () => pair()[1];
  const comparing = () => mode() === "compare" && first() !== undefined && second() !== undefined;
  const rovingId = () =>
    browser.scope.some((item) => item.id === focusId()) ? focusId() : browser.selected?.id;
  const grouped = () => browser.area === "all";
  const sheetId = `${uid}-sheet`;

  createEffect(
    () => browser.area,
    () => {
      if (!well) return;
      const target = well;
      target.scrollTo({ top: 0, left: 0 });
      const update = () => {
        const overflow = target.scrollHeight - target.clientHeight;
        setFadeBottom(overflow > 1 && target.scrollTop < overflow - 1);
      };
      update();
      target.addEventListener("scroll", update, { passive: true });
      const observer = new ResizeObserver(update);
      observer.observe(target);
      return () => {
        target.removeEventListener("scroll", update);
        observer.disconnect();
      };
    },
  );

  createEffect(notice, (current) => {
    if (!current) return;
    const timer = window.setTimeout(() => setNotice(null), NOTICE_MS);
    return () => window.clearTimeout(timer);
  });

  const focusSheet = () => sheet?.focus({ preventScroll: true });

  const openTile = (id: string) => {
    browser.select(id);
    setFocusId(id);
    setMode("single");
  };

  const toggleCompare = (id: string) => {
    const ids = compareIds();
    if (ids.includes(id)) {
      setCompareIds(ids.filter((entry) => entry !== id));
      setMode("single");
      return;
    }
    if (ids.length < 2) {
      const next = [...ids, id];
      setCompareIds(next);
      setMode(next.length === 2 ? "compare" : "single");
      return;
    }
    const [dropped, kept] = ids;
    setCompareIds([kept!, id]);
    setMode("compare");
    const droppedTitle = solutions.find((item) => item.id === dropped)?.title;
    if (droppedTitle) setNotice({ key: Date.now(), text: `已替换「${droppedTitle}」` });
  };

  const removeFromCompare = (id: string) => {
    const remaining = compareIds().filter((entry) => entry !== id);
    setCompareIds(remaining);
    setMode("single");
    const survivor = remaining[0];
    if (survivor && browser.scope.some((item) => item.id === survivor)) browser.select(survivor);
    focusSheet();
  };

  const exitCompare = () => {
    setCompareIds([]);
    setMode("single");
    focusSheet();
  };

  const showCompare = () => {
    setMode("compare");
    focusSheet();
  };

  const handleTilesKeyDown: JSX.EventHandler<HTMLDivElement, KeyboardEvent> = (event) => {
    const target = event.target as HTMLElement;
    const { tileId, part } = target.dataset;
    if (!tileId || !part) return;
    const well = event.currentTarget;
    const tiles = [...well.querySelectorAll<HTMLElement>('[data-part="select"]')];
    const index = tiles.findIndex((tile) => tile.dataset.tileId === tileId);
    const origin = tiles[index];
    if (!origin) return;
    let next: HTMLElement | undefined;
    if (event.key === "ArrowRight") next = tiles[index + 1] ?? origin;
    else if (event.key === "ArrowLeft") next = tiles[index - 1] ?? origin;
    else if (event.key === "Home") next = tiles[0];
    else if (event.key === "End") next = tiles.at(-1);
    else if (event.key === "ArrowDown") next = findTileVertically(tiles, origin, true);
    else if (event.key === "ArrowUp") next = findTileVertically(tiles, origin, false);
    else return;
    if (!next) return;
    event.preventDefault();
    event.stopPropagation();
    const nextId = next.dataset.tileId;
    if (!nextId) return;
    setFocusId(nextId);
    const focusTarget =
      part === "toggle"
        ? well.querySelector<HTMLElement>(`[data-part="toggle"][data-tile-id="${nextId}"]`)
        : next;
    focusTarget?.focus();
  };

  const statusText = () => {
    const current = notice();
    if (current) return current.text;
    if (comparing()) return "共有成分以深色标示";
    const a = first();
    if (a && second()) return "已选 2 款";
    if (a) return `已选「${a.title}」，再选一款`;
    return "勾选两款「对比」，并排查看配方";
  };

  const renderTile = (item: SolutionItem) => {
    const isSelected = () => !comparing() && item.id === browser.selected?.id;
    const slot = () => compareIds().indexOf(item.id);
    const tabIndex = () => (item.id === rovingId() ? 0 : -1);
    return (
      <li {...stylex.attrs(styles.tile)}>
        <button
          type="button"
          data-tile-id={item.id}
          data-part="select"
          aria-current={isSelected() ? "true" : undefined}
          aria-controls={sheetId}
          tabindex={tabIndex()}
          onClick={() => openTile(item.id)}
          {...stylex.attrs(
            styles.tileButton,
            isSelected() && styles.tileButtonSelected,
            stylex.defaultMarker(),
          )}
        >
          <span {...stylex.attrs(styles.tileTop)}>
            <span {...stylex.attrs(styles.tileIndex, isSelected() && styles.tileIndexSelected)}>
              {padIndex(browser.scope.indexOf(item))}
            </span>
          </span>
          <span {...stylex.attrs(styles.tileName, isSelected() && styles.tileNameSelected)}>
            {item.title}
          </span>
          <span {...stylex.attrs(styles.tileFunctions)}>{item.functions.join(" · ")}</span>
        </button>
        <CompareToggle
          item={item}
          pressed={slot() !== -1}
          letter={slot() === -1 ? undefined : LETTERS[slot()]}
          onToggle={() => toggleCompare(item.id)}
          tabIndex={tabIndex()}
          inTile
        />
      </li>
    );
  };

  const selectedSlot = () => (browser.selected ? compareIds().indexOf(browser.selected.id) : -1);
  const pairRows = createMemo(() =>
    comparing() ? [sheetRows(first()!), sheetRows(second()!)] : [],
  );
  const sharedNames = createMemo(() => {
    if (!comparing()) return new Set<string>();
    const secondNames = new Set(ingredientNames(second()!));
    return new Set(ingredientNames(first()!).filter((name) => secondNames.has(name)));
  });

  return (
    <Show
      when={browser.selected}
      fallback={
        <LabSection>
          <AreaChips browser={browser} />
          <p {...stylex.attrs(styles.empty)}>该领域暂无应用方案</p>
        </LabSection>
      }
    >
      <LabSection>
        <AreaChips browser={browser} />
        <div {...stylex.attrs(styles.tray)}>
          <div
            ref={well}
            role="group"
            aria-label="应用方案"
            onKeyDown={handleTilesKeyDown}
            {...stylex.attrs(
              styles.well,
              grouped() && styles.wellGrouped,
              fadeBottom() && styles.wellFade,
            )}
          >
            <Show
              when={grouped()}
              fallback={
                <ul {...stylex.attrs(styles.grid)}>
                  <For each={browser.scope}>{renderTile}</For>
                </ul>
              }
            >
              <For each={browser.groups}>
                {(group) => (
                  <div
                    role="group"
                    aria-labelledby={`${uid}-group-${group.id}`}
                    {...stylex.attrs(styles.group)}
                  >
                    <p id={`${uid}-group-${group.id}`} {...stylex.attrs(styles.groupHead)}>
                      {group.label}
                      <span {...stylex.attrs(styles.groupCount)}>{group.items.length} 款</span>
                    </p>
                    <ul {...stylex.attrs(styles.grid)}>
                      <For each={group.items}>{renderTile}</For>
                    </ul>
                  </div>
                )}
              </For>
            </Show>
          </div>
        </div>
        <div
          ref={sheet}
          id={sheetId}
          role="region"
          aria-labelledby={`${uid}-sheet-title`}
          tabindex={-1}
          {...stylex.attrs(styles.sheet)}
        >
          <div {...stylex.attrs(styles.toolbar)}>
            <p id={`${uid}-sheet-title`} {...stylex.attrs(styles.toolbarTitle)}>
              {comparing() ? "方案对比" : "方案详情"}
            </p>
            <div {...stylex.attrs(styles.toolbarSide)}>
              <p aria-live="polite" {...stylex.attrs(styles.status)}>
                {statusText()}
              </p>
              <Show
                when={comparing()}
                fallback={
                  <Show when={first() && second()}>
                    <button
                      type="button"
                      onClick={showCompare}
                      {...stylex.attrs(styles.textButton)}
                    >
                      查看对比
                    </button>
                  </Show>
                }
              >
                <button type="button" onClick={exitCompare} {...stylex.attrs(styles.textButton)}>
                  退出对比
                </button>
              </Show>
            </div>
          </div>
          <div {...stylex.attrs(styles.stage)}>
            <AnimatePresence mode="popLayout" initial={false}>
              <Show
                when={comparing()}
                fallback={
                  <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.12, ease: EASE_OUT } }}
                    transition={{ duration: 0.18, ease: EASE_OUT }}
                    {...stylex.attrs(styles.view)}
                  >
                    <Show when={browser.selected} keyed>
                      {(selected) => (
                        <div {...stylex.attrs(styles.fade)}>
                          <header {...stylex.attrs(styles.singleHead)}>
                            <div {...stylex.attrs(styles.headText)}>
                              <p {...stylex.attrs(styles.area)}>{areaOf(selected.area)?.label}</p>
                              <h3 {...stylex.attrs(styles.title)}>{selected.title}</h3>
                              <p {...stylex.attrs(styles.subtitle)}>{selected.subtitle}</p>
                            </div>
                            <CompareToggle
                              item={selected}
                              pressed={selectedSlot() !== -1}
                              letter={selectedSlot() === -1 ? undefined : LETTERS[selectedSlot()]}
                              onToggle={() => toggleCompare(selected.id)}
                            />
                          </header>
                          <dl {...stylex.attrs(styles.rows)}>
                            {sheetRows(selected).map((row) => (
                              <div {...stylex.attrs(styles.row)}>
                                <dt {...stylex.attrs(styles.label)}>{row.label}</dt>
                                <dd {...stylex.attrs(styles.value)}>
                                  <RowValue row={row} />
                                </dd>
                              </div>
                            ))}
                          </dl>
                        </div>
                      )}
                    </Show>
                  </m.div>
                }
              >
                <m.div
                  role="table"
                  aria-label="两款方案对比"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.12, ease: EASE_OUT } }}
                  transition={{ duration: 0.18, ease: EASE_OUT }}
                  {...stylex.attrs(styles.view)}
                >
                  <div role="row" {...stylex.attrs(styles.row, styles.compareRow, styles.headRow)}>
                    <div role="columnheader" {...stylex.attrs(styles.corner)}>
                      <span {...stylex.attrs(styles.srOnly)}>项目</span>
                    </div>
                    <For each={pair()}>
                      {(item, index) => (
                        <div role="columnheader" {...stylex.attrs(styles.cell)}>
                          <div {...stylex.attrs(styles.fade)}>
                            <div {...stylex.attrs(styles.columnTop)}>
                              <span {...stylex.attrs(styles.letter)}>{LETTERS[index()]}</span>
                              <span {...stylex.attrs(styles.columnArea)}>
                                {areaOf(item.area)?.label}
                              </span>
                              <button
                                type="button"
                                aria-label={`移出对比：${item.title}`}
                                onClick={() => removeFromCompare(item.id)}
                                {...stylex.attrs(styles.remove)}
                              >
                                ×
                              </button>
                            </div>
                            <p {...stylex.attrs(styles.columnTitle)}>{item.title}</p>
                            <p {...stylex.attrs(styles.columnSubtitle)}>{item.subtitle}</p>
                          </div>
                        </div>
                      )}
                    </For>
                  </div>
                  <For each={pairRows()[0] ?? []} keyed={false}>
                    {(row, rowIndex) => (
                      <div role="row" {...stylex.attrs(styles.row, styles.compareRow)}>
                        <div role="rowheader" {...stylex.attrs(styles.label)}>
                          {row().label}
                          <Show when={row().kind === "list"}>
                            <span {...stylex.attrs(styles.legend)}>
                              {sharedNames().size > 0
                                ? `共有 ${sharedNames().size} 项`
                                : "无共有成分"}
                            </span>
                          </Show>
                        </div>
                        <For each={pair()}>
                          {(item, index) => {
                            const cellRow = () => pairRows()[index()]?.[rowIndex];
                            return (
                              <div role="cell" {...stylex.attrs(styles.value, styles.cell)}>
                                <span aria-hidden="true" {...stylex.attrs(styles.cellTag)}>
                                  <span {...stylex.attrs(styles.letter)}>{LETTERS[index()]}</span>
                                  {item.title}
                                </span>
                                <Show when={cellRow()} keyed>
                                  {(shownRow) => (
                                    <div {...stylex.attrs(styles.fade)}>
                                      <RowValue
                                        row={shownRow}
                                        shared={row().kind === "list" ? sharedNames() : undefined}
                                      />
                                    </div>
                                  )}
                                </Show>
                              </div>
                            );
                          }}
                        </For>
                      </div>
                    )}
                  </For>
                </m.div>
              </Show>
            </AnimatePresence>
          </div>
        </div>
      </LabSection>
    </Show>
  );
}
