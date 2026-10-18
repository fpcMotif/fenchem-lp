import * as stylex from "@stylexjs/stylex";
import { createExternalStore } from "@/compat/external-store";
import { useReducedMotion } from "@/compat/motion";
import { createEffect, createUniqueId, For, Show } from "solid-js";
import type { JSX } from "@solidjs/web";

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

const WIDE_QUERY = "(min-width: 1024px)";
const NO_BREAK_SPACE = String.fromCharCode(0xa0);
const TRAILING_NOTE = /^(.+?)\s*[（(]([^（）()]+)[）)]$/;

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

const fadeIn = stylex.keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const styles = stylex.create({
  workspace: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [bp.lg]: "220px minmax(0, 1fr)" },
    gridTemplateRows: { default: null, [bp.xl]: "minmax(0, 1fr)" },
    rowGap: 12,
    height: { default: null, [bp.xl]: 620 },
    minHeight: { default: null, [bp.lg]: 620 },
    marginTop: { default: 16, [bp.xl]: 24 },
    overflow: { default: null, [bp.lg]: "hidden" },
    borderWidth: { default: 0, [bp.lg]: 1 },
    borderStyle: "solid",
    borderColor: tone.tintRule,
    borderRadius: { default: 0, [bp.lg]: 14 },
    backgroundColor: { default: null, [bp.lg]: tone.paper },
    boxShadow: { default: null, [bp.lg]: depth.card },
  },
  listPane: {
    position: { default: null, [bp.lg]: "relative" },
    minWidth: 0,
    backgroundColor: { default: null, [bp.lg]: tone.tintFill },
    borderRightWidth: { default: 0, [bp.lg]: 1 },
    borderRightStyle: "solid",
    borderRightColor: tone.tintRuleSoft,
  },
  listFrame: {
    position: { default: "relative", [bp.lg]: "absolute" },
    inset: { default: null, [bp.lg]: 0 },
    display: "flex",
    flexDirection: "column",
  },
  paneHead: {
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    height: 44,
    boxSizing: "border-box",
    margin: 0,
    paddingInline: { default: 20, [bp.md]: 28 },
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: tone.tintRuleSoft,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "0.08em",
    color: tone.tintMuted,
    whiteSpace: "nowrap",
  },
  listHead: {
    display: { default: "none", [bp.lg]: "flex" },
    paddingInline: 18,
  },
  pointsHead: {
    paddingInline: 24,
  },
  headArea: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontSize: 13,
    letterSpacing: "0.06em",
    color: tone.tintInk,
  },
  headCount: {
    flexShrink: 0,
    fontFamily: face.display,
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: tone.tintMuted,
  },
  list: {
    position: "relative",
    display: { default: "flex", [bp.lg]: "block" },
    alignItems: "center",
    gap: 2,
    flexGrow: 1,
    minHeight: 0,
    paddingTop: { default: 4, [bp.lg]: 8 },
    paddingBottom: { default: 4, [bp.lg]: 12 },
    paddingInlineStart: { default: 4, [bp.lg]: 8 },
    paddingInlineEnd: { default: 32, [bp.lg]: 8 },
    overflowX: { default: "auto", [bp.lg]: "hidden" },
    overflowY: { default: "hidden", [bp.lg]: "auto" },
    overscrollBehavior: "contain",
    scrollbarWidth: { default: "none", [bp.lg]: "thin" },
    scrollPaddingInline: 4,
    scrollPaddingTop: { default: null, [bp.lg]: 8 },
    borderRadius: { default: 12, [bp.lg]: 0 },
    backgroundColor: { default: tone.tintFill, [bp.lg]: "transparent" },
    maskImage: {
      default: "linear-gradient(to right, #000 calc(100% - 28px), transparent)",
      [bp.lg]: "none",
    },
  },
  listGrouped: {
    paddingTop: { default: 4, [bp.lg]: 0 },
    scrollPaddingTop: { default: null, [bp.lg]: 36 },
  },
  group: {
    display: { default: "contents", [bp.lg]: "block" },
  },
  groupHead: {
    position: { default: "static", [bp.lg]: "sticky" },
    top: 0,
    zIndex: 1,
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    height: 32,
    margin: 0,
    marginInlineStart: { default: 6, [bp.lg]: 0 },
    paddingInline: { default: 4, [bp.lg]: 10 },
    backgroundColor: { default: "transparent", [bp.lg]: tone.tintFill },
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "0.08em",
    color: tone.tintMuted,
    whiteSpace: "nowrap",
  },
  groupCount: {
    display: { default: "none", [bp.lg]: "inline" },
    fontFamily: face.display,
    fontWeight: 400,
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
  },
  tab: {
    position: "relative",
    display: "grid",
    gridTemplateColumns: "20px minmax(0, 1fr)",
    alignItems: "center",
    columnGap: 8,
    flexShrink: 0,
    width: { default: null, [bp.lg]: "100%" },
    height: 36,
    boxSizing: "border-box",
    paddingInline: 10,
    borderWidth: 0,
    borderRadius: 8,
    backgroundColor: "transparent",
    boxShadow: "none",
    fontFamily: "inherit",
    textAlign: "start",
    cursor: "pointer",
    transitionProperty: "background-color, box-shadow",
    transitionDuration: { default: "0ms", [bp.motionOk]: "140ms" },
    transitionTimingFunction: motion.easeOut,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: tone.accent,
    outlineOffset: -2,
  },
  tabSelected: {
    backgroundColor: tone.paper,
    boxShadow: depth.lift,
    cursor: "default",
  },
  tabIndex: {
    fontFamily: face.display,
    fontSize: 11,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: tone.tintMuted,
  },
  tabIndexSelected: {
    color: tone.ink,
  },
  tabName: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    fontSize: 14,
    fontWeight: { default: 500, [bp.lg]: 400 },
    lineHeight: "20px",
    letterSpacing: "0.02em",
    color: {
      default: tone.tintBody,
      [stylex.when.ancestor(":hover")]: { default: tone.tintBody, [bp.hover]: tone.accent },
    },
    transitionProperty: "color",
    transitionDuration: { default: "0ms", [bp.motionOk]: "140ms" },
    transitionTimingFunction: motion.easeOut,
  },
  tabNameSelected: {
    fontWeight: 500,
    color: tone.ink,
  },
  panel: {
    minWidth: 0,
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [bp.xl]: "minmax(0, 1fr) 260px" },
    gridTemplateRows: { default: null, [bp.xl]: "minmax(0, 1fr)" },
    overflow: "hidden",
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
  sheetPane: {
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
    minHeight: 0,
  },
  sheetScroll: {
    flexGrow: 1,
    minHeight: 0,
    overflowY: { default: "visible", [bp.xl]: "auto" },
    overscrollBehavior: "contain",
    scrollbarWidth: "thin",
    paddingInline: { default: 20, [bp.md]: 28, [bp.xl]: 32 },
    paddingTop: { default: 22, [bp.md]: 26 },
    paddingBottom: { default: 8, [bp.md]: 20 },
  },
  fade: {
    animationName: { default: "none", [bp.motionOk]: fadeIn },
    animationDuration: "160ms",
    animationTimingFunction: motion.easeOut,
  },
  sheetHead: {
    paddingBottom: 18,
  },
  title: {
    margin: 0,
    fontSize: { default: 19, [bp.md]: 21 },
    fontWeight: 500,
    lineHeight: 1.4,
    letterSpacing: "0.03em",
    color: tone.ink,
    textWrap: "balance",
  },
  englishName: {
    margin: 0,
    marginTop: 2,
    fontFamily: face.display,
    fontSize: 13,
    lineHeight: "20px",
    letterSpacing: "0.01em",
    color: tone.tintMuted,
  },
  subtitle: {
    margin: 0,
    marginTop: 10,
    maxWidth: "38em",
    fontSize: 14,
    lineHeight: "22px",
    color: tone.tintBody,
    textWrap: "pretty",
  },
  fields: {
    margin: 0,
  },
  field: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [bp.md]: "80px minmax(0, 1fr)" },
    alignItems: "baseline",
    columnGap: 20,
    rowGap: 4,
    paddingBlock: 14,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.tintRuleSoft,
  },
  fieldBelowXl: {
    display: { default: "grid", [bp.xl]: "none" },
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
    fontSize: 14,
    lineHeight: "22px",
    color: tone.ink,
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
  body: {
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
    fontSize: 12,
    color: tone.tintMuted,
  },
  pointsPane: {
    display: { default: "none", [bp.xl]: "flex" },
    flexDirection: "column",
    minWidth: 0,
    minHeight: 0,
    borderLeftWidth: 1,
    borderLeftStyle: "solid",
    borderLeftColor: tone.tintRuleSoft,
  },
  pointsTitle: {
    margin: 0,
    fontSize: "inherit",
    fontWeight: "inherit",
    letterSpacing: "inherit",
    color: tone.tintInk,
  },
  pointsScroll: {
    flexGrow: 1,
    minHeight: 0,
    overflowY: "auto",
    overscrollBehavior: "contain",
    scrollbarWidth: "thin",
    paddingInline: 24,
    paddingTop: 20,
    paddingBottom: 24,
  },
  points: {
    display: "flex",
    flexDirection: "column",
    gap: 22,
    margin: 0,
  },
  point: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  pointLabel: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 8,
    margin: 0,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: tone.tintRuleSoft,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "0.08em",
    color: tone.tintMuted,
  },
  pointCount: {
    fontFamily: face.display,
    fontWeight: 400,
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
  },
  pointValue: {
    margin: 0,
    fontSize: 14,
    lineHeight: "22px",
    color: tone.ink,
  },
  ingredients: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  ingredient: {
    display: "grid",
    gridTemplateColumns: "22px minmax(0, 1fr)",
    columnGap: 6,
  },
  ingredientIndex: {
    fontFamily: face.display,
    fontSize: 11,
    fontWeight: 500,
    lineHeight: "22px",
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: tone.tintMuted,
  },
  ingredientText: {
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
    wordBreak: "keep-all",
    overflowWrap: "anywhere",
  },
  ingredientNote: {
    fontSize: 12,
    lineHeight: "18px",
    color: tone.tintMuted,
  },
  empty: {
    marginTop: 24,
    fontSize: 14,
    color: tone.tintMuted,
  },
});

function RowValue(props: { row: SheetRow }) {
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

function PointValue(props: { row: SheetRow }) {
  if (props.row.values.length === 0) return <span {...stylex.attrs(styles.absent)}>无</span>;
  if (props.row.kind === "list") {
    return (
      <ol {...stylex.attrs(styles.ingredients)}>
        {props.row.values.map((entry, index) => {
          const { primary, note } = splitNote(entry);
          return (
            <li {...stylex.attrs(styles.ingredient)}>
              <span aria-hidden="true" {...stylex.attrs(styles.ingredientIndex)}>
                {padIndex(index)}
              </span>
              <span {...stylex.attrs(styles.ingredientText)}>
                <span {...stylex.attrs(styles.strong)}>
                  {primary.replaceAll(" / ", `${NO_BREAK_SPACE}/ `)}
                </span>
                {note && <span {...stylex.attrs(styles.ingredientNote)}>{note}</span>}
              </span>
            </li>
          );
        })}
      </ol>
    );
  }
  return (
    <ul {...stylex.attrs(styles.lines)}>
      {props.row.values.map((value) => (
        <li>{value}</li>
      ))}
    </ul>
  );
}

export function StudioVariant() {
  const browser = useSolutionsBrowser();
  const uid = createUniqueId();
  const reduce = useReducedMotion();
  const wide = createExternalStore(subscribeWide, readWide, readWideOnServer);
  let list: HTMLDivElement | undefined;
  let sheet: HTMLDivElement | undefined;
  let points: HTMLDivElement | undefined;
  const selectedId = () => browser.selected?.id;

  createEffect(
    () => [browser.area, selectedId(), wide(), reduce()] as const,
    ([, , isWide, reduced]) => {
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
      const bottom = tab.offsetTop + tab.offsetHeight + 8 - list.clientHeight;
      if (list.scrollTop > top) list.scrollTo({ top: Math.max(0, top), behavior });
      else if (list.scrollTop < bottom) list.scrollTo({ top: bottom, behavior });
    },
  );

  createEffect(selectedId, () => {
    sheet?.scrollTo({ top: 0 });
    points?.scrollTo({ top: 0 });
  });

  const handleListKeyDown: JSX.EventHandler<HTMLDivElement, KeyboardEvent> = (event) => {
    const step = (wide() ? VERTICAL_STEPS : HORIZONTAL_STEPS)[event.key];
    if (!step || browser.scope.length === 0) return;
    event.preventDefault();
    event.stopPropagation();
    const next = step(browser.position, browser.scope.length);
    const nextItem = browser.scope[next];
    if (!nextItem) return;
    browser.select(nextItem.id);
    event.currentTarget
      .querySelectorAll<HTMLElement>('[role="tab"]')
      [next]?.focus({ preventScroll: true });
  };

  const grouped = () => browser.area === "all";

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
        <div {...stylex.attrs(styles.workspace)}>
          <div {...stylex.attrs(styles.listPane)}>
            <div {...stylex.attrs(styles.listFrame)}>
              <div aria-hidden="true" {...stylex.attrs(styles.paneHead, styles.listHead)}>
                <span>方案</span>
                <span {...stylex.attrs(styles.headCount)}>{browser.scope.length}</span>
              </div>
              <div
                ref={list}
                role="tablist"
                aria-label="应用方案"
                aria-orientation={wide() ? "vertical" : "horizontal"}
                onKeyDown={handleListKeyDown}
                {...stylex.attrs(styles.list, grouped() && styles.listGrouped)}
              >
                <For each={browser.groups}>
                  {(group) => (
                    <div {...stylex.attrs(styles.group)}>
                      <Show when={grouped()}>
                        <p aria-hidden="true" {...stylex.attrs(styles.groupHead)}>
                          <span>{group.label}</span>
                          <span {...stylex.attrs(styles.groupCount)}>{group.items.length}</span>
                        </p>
                      </Show>
                      <For each={group.items}>
                        {(item) => {
                          const isSelected = () => item.id === browser.selected.id;
                          return (
                            <button
                              type="button"
                              role="tab"
                              id={`${uid}-tab-${item.id}`}
                              aria-selected={isSelected() ? "true" : "false"}
                              aria-controls={`${uid}-panel`}
                              tabindex={isSelected() ? 0 : -1}
                              onClick={() => browser.select(item.id)}
                              {...stylex.attrs(
                                styles.tab,
                                isSelected() && styles.tabSelected,
                                stylex.defaultMarker(),
                              )}
                            >
                              <span
                                {...stylex.attrs(
                                  styles.tabIndex,
                                  isSelected() && styles.tabIndexSelected,
                                )}
                              >
                                {padIndex(browser.scope.indexOf(item))}
                              </span>
                              <span
                                {...stylex.attrs(
                                  styles.tabName,
                                  isSelected() && styles.tabNameSelected,
                                )}
                              >
                                {item.title}
                              </span>
                            </button>
                          );
                        }}
                      </For>
                    </div>
                  )}
                </For>
              </div>
            </div>
          </div>
          <div
            role="tabpanel"
            id={`${uid}-panel`}
            aria-labelledby={`${uid}-tab-${browser.selected.id}`}
            tabindex={0}
            {...stylex.attrs(styles.panel)}
          >
            <div {...stylex.attrs(styles.sheetPane)}>
              <div {...stylex.attrs(styles.paneHead)}>
                <span {...stylex.attrs(styles.headArea)}>
                  {areaOf(browser.selected.area)?.label}
                </span>
                <span {...stylex.attrs(styles.headCount)}>
                  {padIndex(browser.position)} / {padIndex(browser.scope.length - 1)}
                </span>
              </div>
              <div ref={sheet} {...stylex.attrs(styles.sheetScroll)}>
                <Show when={browser.selected} keyed>
                  {(selected) => (
                    <div {...stylex.attrs(styles.fade)}>
                      <header {...stylex.attrs(styles.sheetHead)}>
                        <h3 {...stylex.attrs(styles.title)}>{selected.title}</h3>
                        <p lang="en" {...stylex.attrs(styles.englishName)}>
                          {selected.englishName}
                        </p>
                        <p {...stylex.attrs(styles.subtitle)}>{selected.subtitle}</p>
                      </header>
                      <dl {...stylex.attrs(styles.fields)}>
                        {sheetRows(selected).map((row, index) => (
                          <div {...stylex.attrs(styles.field, index >= 3 && styles.fieldBelowXl)}>
                            <dt {...stylex.attrs(styles.fieldLabel)}>{row.label}</dt>
                            <dd {...stylex.attrs(styles.fieldValue)}>
                              <RowValue row={row} />
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  )}
                </Show>
              </div>
            </div>
            <aside aria-labelledby={`${uid}-points`} {...stylex.attrs(styles.pointsPane)}>
              <div {...stylex.attrs(styles.paneHead, styles.pointsHead)}>
                <h4 id={`${uid}-points`} {...stylex.attrs(styles.pointsTitle)}>
                  配方要点
                </h4>
              </div>
              <div ref={points} {...stylex.attrs(styles.pointsScroll)}>
                <Show when={browser.selected} keyed>
                  {(selected) => (
                    <dl {...stylex.attrs(styles.points, styles.fade)}>
                      {sheetRows(selected)
                        .slice(3)
                        .map((row) => (
                          <div {...stylex.attrs(styles.point)}>
                            <dt {...stylex.attrs(styles.pointLabel)}>
                              {row.label}
                              {row.kind === "list" && row.values.length > 0 && (
                                <span {...stylex.attrs(styles.pointCount)}>
                                  {row.values.length}
                                </span>
                              )}
                            </dt>
                            <dd {...stylex.attrs(styles.pointValue)}>
                              <PointValue row={row} />
                            </dd>
                          </div>
                        ))}
                    </dl>
                  )}
                </Show>
              </div>
            </aside>
          </div>
        </div>
      </LabSection>
    </Show>
  );
}
