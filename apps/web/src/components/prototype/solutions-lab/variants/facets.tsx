import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { createExternalStore } from "@/compat/external-store";
import { m, useReducedMotion } from "@/compat/motion";
import {
  createEffect,
  createMemo,
  createSignal,
  createUniqueId,
  For,
  Show,
  untrack,
} from "solid-js";
import type { JSX } from "@solidjs/web";

import {
  AreaChips,
  LabSection,
  areaOf,
  padIndex,
  sheetRows,
  useSolutionsBrowser,
  type AreaFilter,
  type SheetRow,
  type SolutionItem,
} from "../kit";
import { bp, depth, face, motion, tone } from "../tokens.stylex";

const WIDE_QUERY = "(min-width: 1024px)";
const FACET_LIMIT = 8;
const FALLBACK_LIMIT = 6;
const EASE_OUT = [0.23, 1, 0.32, 1] as const;
const NO_BREAK_SPACE = String.fromCharCode(0xa0);
const TRAILING_NOTE = /^(.+?)\s*[（(]([^（）()]+)[）)]$/;

const splitNote = (text: string) => {
  const match = TRAILING_NOTE.exec(text);
  return match ? { primary: match[1], note: match[2] } : { primary: text, note: null };
};

type Facet = { label: string; count: number };

type FacetState = { area: AreaFilter; active: string[]; fadeRows: boolean };

const sxProps = (...args: ReadonlyArray<StyleXStyles | false | null | undefined>) =>
  stylex.attrs(...args);

const isHit = (fn: string, active: string[]) => active.some((label) => fn.includes(label));

const matchesAny = (item: SolutionItem, active: string[]) =>
  active.length === 0 || item.functions.some((fn) => isHit(fn, active));

const deriveFacets = (items: SolutionItem[]): Facet[] => {
  const labels = [...new Set(items.flatMap((item) => item.functions))];
  const ranked = labels
    .map((label, order) => ({
      label,
      order,
      count: items.filter((item) => item.functions.some((fn) => fn.includes(label))).length,
    }))
    .sort((a, b) => b.count - a.count || a.label.length - b.label.length || a.order - b.order);
  const picked: Facet[] = [];
  for (const entry of ranked) {
    if (picked.length === FACET_LIMIT) break;
    if (picked.some((facet) => entry.label.includes(facet.label))) continue;
    picked.push({ label: entry.label, count: entry.count });
  }
  const shared = picked.filter((facet) => facet.count > 1);
  return shared.length >= 4 ? shared : picked.slice(0, FALLBACK_LIMIT);
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

const fadeIn = stylex.keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const SELECTED_RING = "0 0 0 1px oklch(0.424 0.18 261.5 / 0.12), 0 1px 3px rgba(7, 67, 174, 0.08)";

const styles = stylex.create({
  facetBar: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr) auto", [bp.xl]: "auto minmax(0, 1fr) auto" },
    alignItems: "center",
    columnGap: 16,
    rowGap: 10,
    marginTop: { default: 18, [bp.xl]: 22 },
    paddingTop: { default: 14, [bp.xl]: 18 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.tintRuleSoft,
  },
  facetLead: {
    gridColumn: "1",
    gridRow: "1",
    margin: 0,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "0.08em",
    color: tone.tintMuted,
    whiteSpace: "nowrap",
  },
  facetList: {
    gridColumn: { default: "1 / -1", [bp.xl]: "2" },
    gridRow: { default: "2", [bp.xl]: "1" },
    display: "flex",
    flexWrap: { default: "nowrap", [bp.xl]: "wrap" },
    gap: 6,
    minWidth: 0,
    marginInline: { default: -16, [bp.tablet]: -40, [bp.xl]: 0 },
    paddingInline: { default: 16, [bp.tablet]: 40, [bp.xl]: 0 },
    paddingBlock: 2,
    scrollPaddingInline: { default: 16, [bp.tablet]: 40, [bp.xl]: 0 },
    overflowX: { default: "auto", [bp.xl]: "visible" },
    scrollbarWidth: "none",
    overscrollBehaviorX: "contain",
  },
  facet: {
    flexShrink: 0,
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    height: 30,
    paddingInline: 12,
    boxSizing: "border-box",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: {
      default: tone.tintRule,
      ":hover": { default: tone.tintRule, [bp.hover]: tone.accentLine },
    },
    borderRadius: 999,
    backgroundColor: tone.paper,
    fontFamily: "inherit",
    fontSize: 13,
    lineHeight: "18px",
    letterSpacing: "0.02em",
    color: {
      default: tone.tintBody,
      ":hover": { default: tone.tintBody, [bp.hover]: tone.ink },
    },
    whiteSpace: "nowrap",
    cursor: "pointer",
    transform: { default: null, ":active": "scale(0.97)" },
    transitionProperty: "border-color, color, transform",
    transitionDuration: { default: "0ms", [bp.motionOk]: "160ms" },
    transitionTimingFunction: motion.easeOut,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: tone.accent,
    outlineOffset: 2,
  },
  facetOn: {
    borderColor: tone.ink,
    color: tone.ink,
  },
  facetCount: {
    fontFamily: face.display,
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: tone.tintMuted,
  },
  facetCountOn: {
    color: tone.ink,
  },
  facetMeta: {
    gridColumn: { default: "2", [bp.xl]: "3" },
    gridRow: "1",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 12,
  },
  matchCount: {
    margin: 0,
    fontSize: 13,
    lineHeight: "18px",
    color: tone.tintMuted,
    fontVariantNumeric: "tabular-nums",
    whiteSpace: "nowrap",
  },
  clear: {
    height: 30,
    paddingInline: 6,
    marginInlineEnd: -6,
    borderWidth: 0,
    borderRadius: 6,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    fontSize: 13,
    lineHeight: "18px",
    color: tone.tintInk,
    textDecorationLine: {
      default: "underline",
      ":hover": { default: "underline", [bp.hover]: "none" },
    },
    textDecorationColor: tone.tintRule,
    textDecorationThickness: 1,
    textUnderlineOffset: 4,
    cursor: "pointer",
    opacity: 1,
    visibility: "visible",
    transitionProperty: "opacity, visibility",
    transitionDuration: { default: "0ms", [bp.motionOk]: "150ms" },
    transitionTimingFunction: motion.easeOut,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: tone.accent,
    outlineOffset: 0,
  },
  clearHidden: {
    opacity: 0,
    visibility: "hidden",
  },
  browser: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [bp.lg]: "300px minmax(0, 1fr)",
      [bp.xl]: "340px minmax(0, 1fr)",
    },
    rowGap: 12,
    marginTop: { default: 14, [bp.xl]: 20 },
    minHeight: { default: null, [bp.lg]: 600 },
    overflow: { default: null, [bp.lg]: "hidden" },
    borderWidth: { default: 0, [bp.lg]: 1 },
    borderStyle: "solid",
    borderColor: tone.tintRule,
    borderRadius: { default: 0, [bp.lg]: 16 },
    backgroundColor: { default: null, [bp.lg]: tone.paper },
    boxShadow: { default: null, [bp.lg]: depth.card },
  },
  listPane: {
    position: { default: null, [bp.lg]: "relative" },
    minWidth: 0,
    backgroundColor: { default: null, [bp.lg]: tone.tintFill },
  },
  list: {
    position: { default: "relative", [bp.lg]: "absolute" },
    inset: { default: null, [bp.lg]: 0 },
    display: { default: "flex", [bp.lg]: "block" },
    alignItems: "center",
    gap: 2,
    paddingTop: { default: 4, [bp.lg]: 10 },
    paddingBottom: { default: 4, [bp.lg]: 16 },
    paddingInlineStart: { default: 4, [bp.lg]: 10 },
    paddingInlineEnd: { default: 32, [bp.lg]: 10 },
    overflowX: { default: "auto", [bp.lg]: "hidden" },
    overflowY: { default: "hidden", [bp.lg]: "auto" },
    overscrollBehavior: "contain",
    scrollbarWidth: { default: "none", [bp.lg]: "thin" },
    scrollPaddingInline: 4,
    scrollPaddingTop: { default: null, [bp.lg]: 10 },
    borderRadius: { default: 12, [bp.lg]: 0 },
    backgroundColor: { default: tone.tintFill, [bp.lg]: "transparent" },
    maskImage: {
      default: "linear-gradient(to right, #000 calc(100% - 28px), transparent)",
      [bp.lg]: "none",
    },
  },
  listGrouped: {
    paddingTop: { default: 4, [bp.lg]: 0 },
    scrollPaddingTop: { default: null, [bp.lg]: 44 },
  },
  group: {
    display: { default: "contents", [bp.lg]: "block" },
  },
  groupHead: {
    position: "sticky",
    top: 0,
    zIndex: 1,
    display: { default: "none", [bp.lg]: "flex" },
    justifyContent: "space-between",
    gap: 12,
    margin: 0,
    paddingTop: 14,
    paddingBottom: 8,
    paddingInline: 14,
    backgroundColor: tone.tintFill,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.08em",
    color: tone.tintMuted,
  },
  groupCount: {
    fontFamily: face.display,
    fontWeight: 400,
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
  },
  row: {
    position: "relative",
    display: "grid",
    gridTemplateColumns: { default: "auto auto", [bp.lg]: "22px minmax(0, 1fr)" },
    alignItems: "baseline",
    columnGap: { default: 6, [bp.lg]: 12 },
    flexShrink: 0,
    width: { default: null, [bp.lg]: "100%" },
    paddingBlock: { default: 8, [bp.lg]: 12 },
    paddingInline: { default: 12, [bp.lg]: 14 },
    boxSizing: "border-box",
    borderWidth: 0,
    borderRadius: { default: 9, [bp.lg]: 10 },
    backgroundColor: "transparent",
    boxShadow: "none",
    fontFamily: "inherit",
    textAlign: "start",
    cursor: "pointer",
    transitionProperty: "background-color, box-shadow",
    transitionDuration: { default: "0ms", [bp.motionOk]: "160ms" },
    transitionTimingFunction: motion.easeOut,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: tone.accent,
    outlineOffset: -2,
  },
  rowSelected: {
    backgroundColor: tone.paper,
    boxShadow: { default: depth.lift, [bp.lg]: SELECTED_RING },
    cursor: "default",
  },
  rowIndex: {
    fontFamily: face.display,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "22px",
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: tone.tintMuted,
  },
  rowIndexSelected: {
    color: tone.ink,
  },
  rowText: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    minWidth: 0,
  },
  rowTitle: {
    fontSize: { default: 14, [bp.lg]: 15 },
    fontWeight: 500,
    lineHeight: "22px",
    letterSpacing: "0.02em",
    whiteSpace: { default: "nowrap", [bp.lg]: "normal" },
    color: {
      default: tone.tintInk,
      [stylex.when.ancestor(":hover")]: { default: tone.tintInk, [bp.hover]: tone.accent },
    },
    transitionProperty: "color",
    transitionDuration: { default: "0ms", [bp.motionOk]: "150ms" },
    transitionTimingFunction: motion.easeOut,
  },
  rowTitleSelected: {
    color: tone.ink,
  },
  rowFunctions: {
    display: { default: "none", [bp.lg]: "block" },
    fontSize: 13,
    lineHeight: "20px",
    color: tone.tintMuted,
    textWrap: "pretty",
  },
  hit: {
    fontWeight: 500,
    color: tone.ink,
  },
  sheet: {
    minWidth: 0,
    paddingInline: { default: 20, [bp.md]: 40, [bp.xl]: 48 },
    paddingTop: { default: 28, [bp.md]: 40, [bp.xl]: 44 },
    paddingBottom: { default: 12, [bp.md]: 20 },
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
  fade: {
    minWidth: 0,
    animationName: { default: "none", [bp.motionOk]: fadeIn },
    animationDuration: "180ms",
    animationTimingFunction: motion.easeOut,
  },
  sheetHead: {
    paddingBottom: { default: 20, [bp.md]: 28 },
  },
  sheetArea: {
    margin: 0,
    marginBottom: 10,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.08em",
    color: tone.tintMuted,
  },
  sheetTitle: {
    margin: 0,
    fontSize: { default: 20, [bp.md]: 24 },
    fontWeight: 500,
    lineHeight: 1.35,
    letterSpacing: "0.04em",
    color: tone.ink,
    textWrap: "balance",
  },
  sheetSubtitle: {
    margin: 0,
    marginTop: 8,
    maxWidth: "40em",
    fontSize: 15,
    lineHeight: 1.6,
    color: tone.tintBody,
    textWrap: "pretty",
  },
  fields: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [bp.xl]: "repeat(2, minmax(0, 1fr))" },
    gridTemplateRows: { default: "none", [bp.xl]: "repeat(3, auto)" },
    gridAutoFlow: { default: "row", [bp.xl]: "column" },
    columnGap: { default: 0, [bp.xl]: 40 },
    margin: 0,
  },
  field: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [bp.md]: "88px minmax(0, 1fr)",
      [bp.xl]: "minmax(0, 1fr)",
    },
    alignContent: "start",
    columnGap: 16,
    rowGap: { default: 6, [bp.xl]: 4 },
    paddingBlock: { default: 16, [bp.md]: 20, [bp.xl]: 16 },
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
  body: {
    color: tone.tintBody,
  },
  strong: {
    fontWeight: 500,
  },
  miss: {
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
  empty: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 12,
    marginTop: { default: 14, [bp.xl]: 20 },
    paddingBlock: 48,
    paddingInline: { default: 20, [bp.md]: 40 },
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: tone.tintRule,
    borderRadius: 16,
    backgroundColor: tone.paper,
  },
  emptyText: {
    margin: 0,
    fontSize: 15,
    lineHeight: "24px",
    color: tone.tintBody,
  },
});

function Functions(props: { functions: string[]; active: string[] }) {
  return (
    <>
      {props.functions.map((fn, index) => (
        <>
          {index > 0 && " · "}
          <span {...stylex.attrs(props.active.length > 0 && isHit(fn, props.active) && styles.hit)}>
            {fn}
          </span>
        </>
      ))}
    </>
  );
}

function RowValue(props: { row: SheetRow; active: string[] }) {
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
    return (
      <span {...stylex.attrs(styles.strong)}>
        {props.row.values.map((fn, index) => (
          <>
            {index > 0 && " · "}
            <span
              {...stylex.attrs(props.active.length > 0 && !isHit(fn, props.active) && styles.miss)}
            >
              {fn}
            </span>
          </>
        ))}
      </span>
    );
  }
  if (props.row.kind === "list") {
    return (
      <ul {...stylex.attrs(styles.lines)}>
        {props.row.values.map((entry) => {
          const { primary, note } = splitNote(entry);
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

export function FacetsVariant() {
  const browser = useSolutionsBrowser();
  const uid = createUniqueId();
  const reduce = useReducedMotion();
  const wide = createExternalStore(subscribeWide, readWide, readWideOnServer);
  let list: HTMLDivElement | undefined;
  let facetList: HTMLDivElement | undefined;
  const [facetState, setFacetState] = createSignal<FacetState>(
    untrack(() => ({ area: browser.area, active: [], fadeRows: false })),
  );

  const facets = createMemo(() => deriveFacets(browser.scope));
  const active = () => (facetState().area === browser.area ? facetState().active : []);
  const fadeRows = () => (facetState().area === browser.area ? facetState().fadeRows : true);
  const visible = createMemo(() =>
    active().length === 0
      ? browser.scope
      : browser.scope.filter((item) => matchesAny(item, active())),
  );
  const current = createMemo(
    () => visible().find((item) => item.id === browser.selected?.id) ?? visible()[0],
  );
  const currentIndex = () => {
    const item = current();
    return item ? visible().indexOf(item) : -1;
  };
  const visibleSet = createMemo(() => new Set(visible()));
  const isOn = (label: string) => active().includes(label);
  const visibleGroups = createMemo(() =>
    browser.groups.filter((group) => group.items.some((item) => visibleSet().has(item))),
  );
  const grouped = () => browser.area === "all";
  const currentId = () => current()?.id;
  const activeKey = () => active().join("|");

  createEffect(
    () => [browser.area, currentId(), activeKey(), wide(), reduce()] as const,
    ([, , , isWide, reduced]) => {
      const tab = list?.querySelector<HTMLElement>('[aria-selected="true"]');
      if (!list || !tab) return;
      const behavior: ScrollBehavior = reduced ? "auto" : "smooth";
      if (!isWide) {
        if (list.scrollWidth <= list.clientWidth) return;
        const left = tab.offsetLeft - (list.clientWidth - tab.offsetWidth) / 2;
        list.scrollTo({ left: Math.max(0, left), behavior });
        return;
      }
      const inset = Number.parseFloat(getComputedStyle(list).scrollPaddingTop) || 0;
      const top = tab.offsetTop - inset;
      const bottom = tab.offsetTop + tab.offsetHeight + 12 - list.clientHeight;
      if (list.scrollTop > top) list.scrollTo({ top: Math.max(0, top), behavior });
      else if (list.scrollTop < bottom) list.scrollTo({ top: bottom, behavior });
    },
  );

  const toggleFacet = (label: string) => {
    const now = active();
    const next = now.includes(label) ? now.filter((entry) => entry !== label) : [...now, label];
    setFacetState({ area: browser.area, active: next, fadeRows: true });
    const nextVisible = browser.scope.filter((item) => matchesAny(item, next));
    const first = nextVisible[0];
    const id = currentId();
    if (first && !nextVisible.some((item) => item.id === id)) browser.select(first.id);
  };

  const clearFacets = () => {
    setFacetState({ area: browser.area, active: [], fadeRows: true });
    facetList?.querySelector<HTMLElement>("button")?.focus();
  };

  const handleListKeyDown: JSX.EventHandler<HTMLDivElement, KeyboardEvent> = (event) => {
    const step = (wide() ? VERTICAL_STEPS : HORIZONTAL_STEPS)[event.key];
    const shown = visible();
    if (!step || shown.length === 0) return;
    event.preventDefault();
    event.stopPropagation();
    const next = step(Math.max(0, currentIndex()), shown.length);
    const nextItem = shown[next];
    if (!nextItem) return;
    browser.select(nextItem.id);
    event.currentTarget
      .querySelectorAll<HTMLElement>('[role="tab"]')
      [next]?.focus({ preventScroll: true });
  };

  return (
    <LabSection>
      <AreaChips browser={browser} />
      <Show when={facets().length > 0}>
        <div {...stylex.attrs(styles.facetBar)}>
          <p id={`${uid}-facets`} {...stylex.attrs(styles.facetLead)}>
            按功能
          </p>
          <div
            ref={facetList}
            role="group"
            aria-labelledby={`${uid}-facets`}
            {...stylex.attrs(styles.facetList)}
          >
            <For each={facets()}>
              {(facet) => (
                <button
                  type="button"
                  aria-pressed={isOn(facet.label) ? "true" : "false"}
                  onClick={() => toggleFacet(facet.label)}
                  {...stylex.attrs(styles.facet, isOn(facet.label) && styles.facetOn)}
                >
                  <span>{facet.label}</span>
                  <span
                    {...stylex.attrs(styles.facetCount, isOn(facet.label) && styles.facetCountOn)}
                  >
                    {facet.count}
                  </span>
                </button>
              )}
            </For>
          </div>
          <div {...stylex.attrs(styles.facetMeta)}>
            <p aria-live="polite" {...stylex.attrs(styles.matchCount)}>
              {active().length > 0 ? `${visible().length} 款匹配` : `共 ${browser.scope.length} 款`}
            </p>
            <button
              type="button"
              onClick={clearFacets}
              {...sxProps(styles.clear, active().length === 0 && styles.clearHidden)}
            >
              清除
            </button>
          </div>
        </div>
      </Show>
      <Show
        when={current()}
        fallback={
          <div {...stylex.attrs(styles.empty)}>
            <p {...stylex.attrs(styles.emptyText)}>没有符合所选功能的方案</p>
            <Show when={active().length > 0}>
              <button type="button" onClick={clearFacets} {...stylex.attrs(styles.clear)}>
                清除筛选
              </button>
            </Show>
          </div>
        }
      >
        {(currentItem) => (
          <div {...stylex.attrs(styles.browser)}>
            <div {...stylex.attrs(styles.listPane)}>
              <div
                ref={list}
                role="tablist"
                aria-label="应用方案"
                aria-orientation={wide() ? "vertical" : "horizontal"}
                onKeyDown={handleListKeyDown}
                {...stylex.attrs(styles.list, grouped() && styles.listGrouped)}
              >
                <For each={visibleGroups()}>
                  {(group) => {
                    const items = createMemo(() =>
                      group.items.filter((item) => visibleSet().has(item)),
                    );
                    return (
                      <div {...stylex.attrs(styles.group)}>
                        <Show when={grouped()}>
                          <p aria-hidden="true" {...stylex.attrs(styles.groupHead)}>
                            {group.label}
                            <span {...stylex.attrs(styles.groupCount)}>{items().length} 款</span>
                          </p>
                        </Show>
                        <For each={items()}>
                          {(item) => {
                            const isSelected = () => item.id === currentItem().id;
                            return (
                              <m.button
                                type="button"
                                role="tab"
                                id={`${uid}-tab-${item.id}`}
                                aria-selected={isSelected() ? "true" : "false"}
                                aria-controls={`${uid}-panel`}
                                tabindex={isSelected() ? 0 : -1}
                                initial={untrack(fadeRows) ? { opacity: 0 } : false}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.18, ease: EASE_OUT }}
                                onClick={() => browser.select(item.id)}
                                {...stylex.attrs(
                                  styles.row,
                                  isSelected() && styles.rowSelected,
                                  stylex.defaultMarker(),
                                )}
                              >
                                <span
                                  {...stylex.attrs(
                                    styles.rowIndex,
                                    isSelected() && styles.rowIndexSelected,
                                  )}
                                >
                                  {padIndex(browser.scope.indexOf(item))}
                                </span>
                                <span {...stylex.attrs(styles.rowText)}>
                                  <span
                                    {...stylex.attrs(
                                      styles.rowTitle,
                                      isSelected() && styles.rowTitleSelected,
                                    )}
                                  >
                                    {item.title}
                                  </span>
                                  <span {...stylex.attrs(styles.rowFunctions)}>
                                    <Functions functions={item.functions} active={active()} />
                                  </span>
                                </span>
                              </m.button>
                            );
                          }}
                        </For>
                      </div>
                    );
                  }}
                </For>
              </div>
            </div>
            <div
              role="tabpanel"
              id={`${uid}-panel`}
              aria-labelledby={`${uid}-tab-${currentItem().id}`}
              tabindex={0}
              {...stylex.attrs(styles.sheet)}
            >
              <Show when={currentItem()} keyed>
                {(shown) => (
                  <div {...stylex.attrs(styles.fade)}>
                    <header {...stylex.attrs(styles.sheetHead)}>
                      <p {...stylex.attrs(styles.sheetArea)}>{areaOf(shown.area)?.label}</p>
                      <h3 {...stylex.attrs(styles.sheetTitle)}>{shown.title}</h3>
                      <p {...stylex.attrs(styles.sheetSubtitle)}>{shown.subtitle}</p>
                    </header>
                    <dl {...stylex.attrs(styles.fields)}>
                      {sheetRows(shown).map((row) => (
                        <div {...stylex.attrs(styles.field)}>
                          <dt {...stylex.attrs(styles.fieldLabel)}>{row.label}</dt>
                          <dd {...stylex.attrs(styles.fieldValue)}>
                            <RowValue row={row} active={active()} />
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}
              </Show>
            </div>
          </div>
        )}
      </Show>
    </LabSection>
  );
}
