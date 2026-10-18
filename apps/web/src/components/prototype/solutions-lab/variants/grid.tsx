import * as stylex from "@stylexjs/stylex";
import { m } from "@/compat/motion";
import { createSignal, createUniqueId, For, Show } from "solid-js";
import type { JSX } from "@solidjs/web";

import { useReducedMotion } from "../../use-reduced-motion";
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

const HEADER_OFFSET = 80;
const REVEAL_MARGIN = 24;
const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];
const NO_BREAK_SPACE = String.fromCharCode(0xa0);
const TRAILING_NOTE = /^(.+?)\s*[（(]([^（）()]+)[）)]$/;

const splitNote = (text: string) => {
  const match = TRAILING_NOTE.exec(text);
  return match
    ? { primary: match[1] ?? text, note: match[2] ?? null }
    : { primary: text, note: null };
};

const nearestInRow = (tabs: HTMLElement[], from: number, direction: 1 | -1) => {
  const origin = tabs[from]?.getBoundingClientRect();
  if (!origin) return from;
  const center = origin.left + origin.width / 2;
  let best = from;
  let bestRow = Number.POSITIVE_INFINITY;
  let bestOffset = Number.POSITIVE_INFINITY;
  tabs.forEach((tab, index) => {
    const rect = tab.getBoundingClientRect();
    const rowDistance = (rect.top - origin.top) * direction;
    if (rowDistance <= 1) return;
    const offset = Math.abs(rect.left + rect.width / 2 - center);
    const sameRow = Math.abs(rowDistance - bestRow) <= 1;
    if ((!sameRow && rowDistance < bestRow) || (sameRow && offset < bestOffset)) {
      best = index;
      bestRow = rowDistance;
      bestOffset = offset;
    }
  });
  return best;
};

const GRID_STEPS: Record<string, (tabs: HTMLElement[], index: number) => number> = {
  ArrowRight: (tabs, index) => (index + 1) % tabs.length,
  ArrowLeft: (tabs, index) => (index - 1 + tabs.length) % tabs.length,
  ArrowDown: (tabs, index) => nearestInRow(tabs, index, 1),
  ArrowUp: (tabs, index) => nearestInRow(tabs, index, -1),
  Home: () => 0,
  End: (tabs) => tabs.length - 1,
};

const styles = stylex.create({
  board: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 28, [bp.xl]: 40 },
    marginTop: { default: 20, [bp.xl]: 32 },
  },
  group: {
    minWidth: 0,
  },
  groupHead: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    margin: 0,
    marginBottom: { default: 10, [bp.md]: 14 },
  },
  groupLabel: {
    flexShrink: 0,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.08em",
    color: tone.tintInk,
  },
  groupEnglish: {
    display: { default: "none", [bp.md]: "inline" },
    flexShrink: 0,
    fontFamily: face.display,
    fontSize: 11,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: tone.tintMuted,
  },
  groupRule: {
    flexGrow: 1,
    height: 1,
    backgroundColor: tone.tintRule,
  },
  groupCount: {
    flexShrink: 0,
    fontFamily: face.display,
    fontSize: 12,
    lineHeight: "20px",
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: tone.tintMuted,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [bp.md]: "repeat(2, minmax(0, 1fr))",
      [bp.lg]: "repeat(3, minmax(0, 1fr))",
      [bp.xl]: "repeat(4, minmax(0, 1fr))",
    },
    gap: { default: 6, [bp.md]: 12, [bp.xl]: 16 },
  },
  card: {
    position: "relative",
    display: { default: "grid", [bp.md]: "flex" },
    flexDirection: "column",
    gridTemplateColumns: "28px minmax(0, 1fr)",
    alignItems: { default: "baseline", [bp.md]: "stretch" },
    columnGap: 8,
    minWidth: 0,
    minHeight: { default: null, [bp.md]: 184 },
    paddingBlock: { default: 14, [bp.md]: 20, [bp.xl]: 22 },
    paddingInline: { default: 16, [bp.md]: 20, [bp.xl]: 22 },
    boxSizing: "border-box",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: {
      default: "transparent",
      ":hover": { default: "transparent", [bp.hover]: tone.tintRule },
    },
    borderRadius: { default: 10, [bp.md]: 14 },
    backgroundColor: tone.tintFill,
    fontFamily: "inherit",
    textAlign: "start",
    color: tone.tintInk,
    cursor: "pointer",
    transform: { default: null, ":active": "scale(0.985)" },
    transitionProperty: "background-color, border-color, box-shadow, transform",
    transitionDuration: { default: "0ms", [bp.motionOk]: "160ms" },
    transitionTimingFunction: motion.easeOut,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: tone.accent,
    outlineOffset: 2,
  },
  cardSelected: {
    borderColor: tone.ink,
    backgroundColor: tone.paper,
    boxShadow: depth.lift,
    cursor: "default",
    transform: "none",
  },
  cardIndex: {
    fontFamily: face.display,
    fontSize: 12,
    lineHeight: "22px",
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: tone.tintMuted,
  },
  cardIndexSelected: {
    color: tone.ink,
  },
  cardText: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    gap: 4,
    minWidth: 0,
    marginTop: { default: 0, [bp.md]: 14 },
  },
  cardName: {
    fontSize: { default: 15, [bp.md]: 16 },
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.02em",
    textWrap: "pretty",
    color: {
      default: tone.tintInk,
      [stylex.when.ancestor(":hover")]: { default: tone.tintInk, [bp.hover]: tone.accent },
    },
    transitionProperty: "color",
    transitionDuration: { default: "0ms", [bp.motionOk]: "150ms" },
    transitionTimingFunction: motion.easeOut,
  },
  cardNameSelected: {
    color: tone.ink,
  },
  cardFunctions: {
    fontSize: 13,
    lineHeight: "20px",
    color: tone.tintBody,
  },
  cardIngredients: {
    display: { default: "none", [bp.md]: "flex" },
    flexDirection: "column",
    gap: 2,
    marginTop: "auto",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.tintRuleSoft,
    fontSize: 13,
    lineHeight: "20px",
    color: tone.tintMuted,
  },
  cardIngredient: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  sheet: {
    marginTop: { default: 24, [bp.xl]: 40 },
    paddingInline: { default: 20, [bp.md]: 40, [bp.xl]: 56 },
    paddingTop: { default: 28, [bp.md]: 40, [bp.xl]: 48 },
    paddingBottom: { default: 12, [bp.md]: 24, [bp.xl]: 32 },
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: tone.tintRule,
    borderRadius: { default: 12, [bp.xl]: 16 },
    backgroundColor: tone.paper,
    boxShadow: depth.card,
    scrollMarginTop: HEADER_OFFSET,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: tone.accent,
    outlineOffset: 2,
  },
  sheetHead: {
    paddingBottom: { default: 20, [bp.md]: 28 },
  },
  sheetMeta: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 16,
    margin: 0,
    marginBottom: 12,
  },
  sheetArea: {
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.08em",
    color: tone.tintMuted,
  },
  sheetPosition: {
    fontFamily: face.display,
    fontSize: 12,
    lineHeight: "20px",
    letterSpacing: "0.06em",
    fontVariantNumeric: "tabular-nums",
    color: tone.tintMuted,
  },
  sheetPositionCurrent: {
    color: tone.ink,
  },
  sheetTitle: {
    margin: 0,
    fontSize: { default: 22, [bp.md]: 28 },
    fontWeight: 500,
    lineHeight: 1.3,
    letterSpacing: "0.03em",
    textWrap: "balance",
    color: tone.ink,
  },
  sheetSubtitle: {
    margin: 0,
    marginTop: 10,
    maxWidth: "40em",
    fontSize: { default: 15, [bp.md]: 16 },
    lineHeight: 1.65,
    textWrap: "pretty",
    color: tone.tintBody,
  },
  fields: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [bp.xl]: "repeat(2, minmax(0, 1fr))" },
    gridTemplateRows: { default: "none", [bp.xl]: "repeat(3, auto)" },
    gridAutoFlow: { default: "row", [bp.xl]: "column" },
    columnGap: { default: 0, [bp.xl]: 56 },
    margin: 0,
  },
  field: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [bp.md]: "96px minmax(0, 1fr)" },
    alignContent: "start",
    columnGap: 16,
    rowGap: 6,
    paddingBlock: { default: 16, [bp.md]: 20 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.tintRuleSoft,
  },
  fieldLabel: {
    margin: 0,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.04em",
    color: tone.tintMuted,
  },
  fieldValue: {
    margin: 0,
    minWidth: 0,
    fontSize: 15,
    lineHeight: "24px",
    textWrap: "pretty",
    color: tone.tintInk,
  },
  lines: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  description: {
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
});

function RowValue(props: { row: SheetRow }) {
  if (props.row.values.length === 0) return <span {...stylex.attrs(styles.absent)}>无</span>;
  if (props.row.kind === "lines") {
    return (
      <ul {...stylex.attrs(styles.lines, styles.description)}>
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
        {props.row.values.map((value) => {
          const { primary, note } = splitNote(value);
          return (
            <li {...stylex.attrs(styles.keepWords)}>
              <span {...stylex.attrs(styles.strong)}>
                {primary.replaceAll(" / ", `${NO_BREAK_SPACE}/ `)}
              </span>
              {note && <span {...stylex.attrs(styles.note)}>{note}</span>}
            </li>
          );
        })}
      </ul>
    );
  }
  return <>{props.row.values.join("、")}</>;
}

function Sheet(props: { item: SolutionItem; position: number; total: number }) {
  return (
    <>
      <header {...stylex.attrs(styles.sheetHead)}>
        <p {...stylex.attrs(styles.sheetMeta)}>
          <span {...stylex.attrs(styles.sheetArea)}>{areaOf(props.item.area)?.label}</span>
          <span {...stylex.attrs(styles.sheetPosition)}>
            <span {...stylex.attrs(styles.sheetPositionCurrent)}>{padIndex(props.position)}</span>
            {` / ${padIndex(props.total - 1)}`}
          </span>
        </p>
        <h3 {...stylex.attrs(styles.sheetTitle)}>{props.item.title}</h3>
        <p {...stylex.attrs(styles.sheetSubtitle)}>{props.item.subtitle}</p>
      </header>
      <dl {...stylex.attrs(styles.fields)}>
        {sheetRows(props.item).map((row) => (
          <div {...stylex.attrs(styles.field)}>
            <dt {...stylex.attrs(styles.fieldLabel)}>{row.label}</dt>
            <dd {...stylex.attrs(styles.fieldValue)}>
              <RowValue row={row} />
            </dd>
          </div>
        ))}
      </dl>
    </>
  );
}

export function GridVariant() {
  const browser = useSolutionsBrowser();
  const reduce = useReducedMotion();
  const uid = createUniqueId();
  let sheet: HTMLDivElement | undefined;
  const [swapped, setSwapped] = createSignal(false);

  const choose = (id: string) => {
    if (id !== browser.selected?.id) setSwapped(true);
    browser.select(id);
  };

  const revealSheet = () => {
    if (!sheet) return;
    const top = sheet.getBoundingClientRect().top;
    if (top <= window.innerHeight - 160) return;
    window.scrollTo({
      top: window.scrollY + top - HEADER_OFFSET - REVEAL_MARGIN,
      behavior: reduce() ? "auto" : "smooth",
    });
  };

  const handleKeyDown: JSX.EventHandler<HTMLDivElement, KeyboardEvent> = (event) => {
    const step = GRID_STEPS[event.key];
    if (!step) return;
    const tabs = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('[role="tab"]'));
    const from = tabs.indexOf(event.target as HTMLElement);
    if (from === -1) return;
    event.preventDefault();
    const next = step(tabs, from);
    const item = browser.scope[next];
    if (!item || next === from) return;
    choose(item.id);
    tabs[next]?.focus();
  };

  const renderCard = (item: SolutionItem) => {
    const isSelected = () => item.id === browser.selected?.id;
    const ingredients = item.keyIngredients.slice(0, 2);
    return (
      <button
        type="button"
        role="tab"
        id={`${uid}-tab-${item.id}`}
        aria-selected={isSelected() ? "true" : "false"}
        aria-controls={`${uid}-panel`}
        tabindex={isSelected() ? 0 : -1}
        onClick={() => {
          choose(item.id);
          revealSheet();
        }}
        {...stylex.attrs(styles.card, isSelected() && styles.cardSelected, stylex.defaultMarker())}
      >
        <span {...stylex.attrs(styles.cardIndex, isSelected() && styles.cardIndexSelected)}>
          {padIndex(browser.scope.indexOf(item))}
        </span>
        <span {...stylex.attrs(styles.cardText)}>
          <span {...stylex.attrs(styles.cardName, isSelected() && styles.cardNameSelected)}>
            {item.title}
          </span>
          <span {...stylex.attrs(styles.cardFunctions)}>{item.functions.join(" · ")}</span>
          {ingredients.length > 0 && (
            <span {...stylex.attrs(styles.cardIngredients)}>
              {ingredients.map((ingredient) => (
                <span {...stylex.attrs(styles.cardIngredient)}>
                  {splitNote(ingredient).primary}
                </span>
              ))}
            </span>
          )}
        </span>
      </button>
    );
  };

  return (
    <LabSection>
      <AreaChips browser={browser} />
      <div
        role="tablist"
        aria-label="应用方案"
        onKeyDown={handleKeyDown}
        {...stylex.attrs(styles.board)}
      >
        <Show
          when={browser.area === "all"}
          fallback={
            <div {...stylex.attrs(styles.grid)}>
              <For each={browser.scope}>{renderCard}</For>
            </div>
          }
        >
          <For each={browser.groups}>
            {(group) => (
              <div {...stylex.attrs(styles.group)}>
                <p aria-hidden="true" {...stylex.attrs(styles.groupHead)}>
                  <span {...stylex.attrs(styles.groupLabel)}>{group.label}</span>
                  <span lang="en" {...stylex.attrs(styles.groupEnglish)}>
                    {group.englishLabel}
                  </span>
                  <span {...stylex.attrs(styles.groupRule)} />
                  <span {...stylex.attrs(styles.groupCount)}>{group.items.length}</span>
                </p>
                <div {...stylex.attrs(styles.grid)}>
                  <For each={group.items}>{renderCard}</For>
                </div>
              </div>
            )}
          </For>
        </Show>
      </div>
      <Show when={browser.selected}>
        <div
          ref={sheet}
          role="tabpanel"
          id={`${uid}-panel`}
          aria-labelledby={`${uid}-tab-${browser.selected.id}`}
          tabindex={0}
          {...stylex.attrs(styles.sheet)}
        >
          <Show when={browser.selected} keyed>
            {(item) => (
              <m.div
                initial={swapped() ? { opacity: 0, y: 6 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduce() ? 0 : 0.2, ease: EASE_OUT }}
              >
                <Sheet item={item} position={browser.position} total={browser.scope.length} />
              </m.div>
            )}
          </Show>
        </div>
      </Show>
    </LabSection>
  );
}
