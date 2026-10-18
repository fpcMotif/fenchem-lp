import * as stylex from "@stylexjs/stylex";
import { createEffect, createUniqueId, For, Show } from "solid-js";
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
import { bp, face, motion, tone } from "../tokens.stylex";

const TAB_STEPS: Record<string, (index: number, count: number) => number> = {
  ArrowDown: (index, count) => (index + 1) % count,
  ArrowRight: (index, count) => (index + 1) % count,
  ArrowUp: (index, count) => (index - 1 + count) % count,
  ArrowLeft: (index, count) => (index - 1 + count) % count,
  Home: () => 0,
  End: (_, count) => count - 1,
};

const TRAILING_NOTE = /^(.+?)\s*[（(]([^（）()]+)[）)]$/;
const NO_BREAK_SPACE = String.fromCharCode(0xa0);

const splitNote = (text: string) => {
  const match = TRAILING_NOTE.exec(text);
  return match ? { primary: match[1], note: match[2] } : { primary: text, note: null };
};

const fadeIn = stylex.keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const styles = stylex.create({
  layout: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [bp.lg]: "repeat(12, minmax(0, 1fr))" },
    columnGap: 24,
    rowGap: 28,
    marginTop: { default: 24, [bp.xl]: 48 },
  },
  indexFrame: {
    position: { default: null, [bp.lg]: "relative" },
    gridColumn: { default: null, [bp.lg]: "1 / 5" },
    minWidth: 0,
    minHeight: { default: null, [bp.lg]: 560 },
  },
  index: {
    position: { default: "relative", [bp.lg]: "absolute" },
    inset: { default: null, [bp.lg]: 0 },
    display: { default: "flex", [bp.lg]: "block" },
    alignItems: "center",
    columnGap: 28,
    marginInlineStart: { default: -16, [bp.md]: -40 },
    marginInlineEnd: { default: -16, [bp.md]: -40, [bp.lg]: 0 },
    paddingInlineStart: { default: 16, [bp.md]: 40 },
    paddingInlineEnd: { default: 16, [bp.md]: 40, [bp.lg]: 8 },
    paddingTop: { default: 4, [bp.lg]: 2 },
    paddingBottom: { default: 4, [bp.lg]: 72 },
    scrollPaddingInline: { default: 16, [bp.md]: 40 },
    scrollPaddingTop: { default: null, [bp.lg]: 44 },
    overflowX: { default: "auto", [bp.lg]: "hidden" },
    overflowY: { default: "hidden", [bp.lg]: "auto" },
    overscrollBehaviorX: "contain",
    scrollbarWidth: "none",
    maskImage: {
      default: null,
      [bp.lg]: "linear-gradient(to bottom, #000 0, #000 calc(100% - 72px), transparent 100%)",
    },
  },
  group: {
    display: { default: "flex", [bp.lg]: "block" },
    alignItems: "center",
    columnGap: 28,
    flexShrink: 0,
  },
  groupFollow: {
    marginTop: { default: 0, [bp.lg]: 28 },
  },
  groupHeading: {
    position: { default: null, [bp.lg]: "sticky" },
    top: { default: null, [bp.lg]: 0 },
    zIndex: 1,
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 12,
    flexShrink: 0,
    margin: 0,
    marginInlineStart: { default: 0, [bp.lg]: -40 },
    paddingInlineStart: { default: 0, [bp.lg]: 40 },
    paddingTop: { default: 0, [bp.lg]: 4 },
    paddingBottom: { default: 0, [bp.lg]: 10 },
    marginBottom: { default: 0, [bp.lg]: 6 },
    borderBottomWidth: { default: 0, [bp.lg]: 1 },
    borderBottomStyle: "solid",
    borderBottomColor: tone.tintRuleSoft,
    backgroundColor: { default: null, [bp.lg]: tone.paper },
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.12em",
    whiteSpace: "nowrap",
    color: tone.tintMuted,
  },
  groupHeadingFollow: {
    paddingInlineStart: { default: 28, [bp.lg]: 40 },
    borderInlineStartWidth: { default: 1, [bp.lg]: 0 },
    borderInlineStartStyle: "solid",
    borderInlineStartColor: tone.tintRule,
  },
  groupCount: {
    fontFamily: face.display,
    fontWeight: 400,
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    display: { default: "none", [bp.lg]: "inline" },
  },
  tab: {
    position: "relative",
    display: "block",
    flexShrink: 0,
    width: { default: null, [bp.lg]: "100%" },
    paddingBlock: { default: 14, [bp.lg]: 10 },
    paddingInline: 0,
    borderWidth: 0,
    borderRadius: 2,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    textAlign: "start",
    cursor: "pointer",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: tone.accent,
    outlineOffset: 2,
  },
  tabSelected: {
    cursor: "default",
  },
  nameRow: {
    display: "flex",
    alignItems: "baseline",
  },
  number: {
    flexShrink: 0,
    boxSizing: "border-box",
    width: { default: null, [bp.lg]: 40 },
    marginInlineStart: { default: 0, [bp.lg]: -40 },
    paddingInlineEnd: { default: 8, [bp.lg]: 14 },
    textAlign: "end",
    fontFamily: face.display,
    fontSize: 12,
    lineHeight: "20px",
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: tone.tintMuted,
    transitionProperty: "color",
    transitionDuration: { default: "0ms", [bp.motionOk]: "160ms" },
    transitionTimingFunction: motion.easeOut,
  },
  numberSelected: {
    color: tone.ink,
  },
  nameBox: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    flexGrow: { default: 0, [bp.lg]: 1 },
    flexShrink: { default: 0, [bp.lg]: 1 },
    minWidth: 0,
  },
  nameStack: {
    display: "inline-grid",
    minWidth: 0,
    fontSize: { default: 15, [bp.lg]: 17 },
    lineHeight: { default: "22px", [bp.lg]: "26px" },
    letterSpacing: "0.02em",
    whiteSpace: { default: "nowrap", [bp.lg]: "normal" },
    textWrap: "pretty",
  },
  nameText: {
    gridArea: "1 / 1",
    fontWeight: 400,
    color: {
      default: tone.tintBody,
      [stylex.when.ancestor(":hover")]: { default: tone.tintBody, [bp.hover]: tone.accent },
    },
    transitionProperty: "color",
    transitionDuration: { default: "0ms", [bp.motionOk]: "160ms" },
    transitionTimingFunction: motion.easeOut,
  },
  nameTextSelected: {
    fontWeight: 500,
    color: tone.ink,
  },
  nameGhost: {
    gridArea: "1 / 1",
    fontWeight: 500,
    visibility: "hidden",
  },
  leader: {
    position: { default: "absolute", [bp.lg]: "static" },
    insetInline: { default: 0, [bp.lg]: null },
    bottom: { default: -8, [bp.lg]: null },
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 24,
    height: 1,
    marginInlineStart: { default: 0, [bp.lg]: 16 },
    backgroundColor: tone.ink,
    transform: "scaleX(0)",
    transformOrigin: "left center",
    transitionProperty: "transform",
    transitionDuration: { default: "0ms", [bp.motionOk]: "220ms" },
    transitionTimingFunction: motion.easeOut,
  },
  leaderSelected: {
    transform: "scaleX(1)",
  },
  functions: {
    display: { default: "none", [bp.lg]: "block" },
    marginTop: 2,
    overflow: "hidden",
    fontSize: 13,
    lineHeight: "20px",
    letterSpacing: "0.02em",
    color: tone.tintMuted,
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  sheet: {
    gridColumn: { default: null, [bp.lg]: "5 / 13" },
    minWidth: 0,
    paddingInlineStart: { default: 0, [bp.xl]: 24 },
    borderRadius: 2,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: tone.accent,
    outlineOffset: 8,
  },
  panel: {
    minWidth: 0,
    animationName: { default: "none", [bp.motionOk]: fadeIn },
    animationDuration: "180ms",
    animationTimingFunction: motion.easeOut,
  },
  eyebrow: {
    display: "flex",
    alignItems: "baseline",
    flexWrap: "wrap",
    columnGap: 12,
    rowGap: 4,
    margin: 0,
    marginBottom: { default: 14, [bp.lg]: 18 },
  },
  areaLabel: {
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.12em",
    color: tone.tintMuted,
  },
  areaEnglish: {
    fontFamily: face.display,
    fontSize: 11,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: tone.tintMuted,
  },
  counter: {
    marginInlineStart: "auto",
    fontFamily: face.display,
    fontSize: 12,
    lineHeight: "20px",
    letterSpacing: "0.06em",
    fontVariantNumeric: "tabular-nums",
    color: tone.tintMuted,
  },
  title: {
    margin: 0,
    fontSize: { default: 24, [bp.md]: 28, [bp.lg]: 32 },
    fontWeight: 500,
    lineHeight: 1.25,
    letterSpacing: "0.02em",
    color: tone.ink,
    textWrap: "balance",
  },
  subtitle: {
    margin: 0,
    marginTop: 12,
    maxWidth: "36em",
    fontSize: { default: 15, [bp.lg]: 16 },
    lineHeight: 1.7,
    color: tone.tintBody,
    textWrap: "pretty",
  },
  rows: {
    margin: 0,
    marginTop: { default: 28, [bp.lg]: 40 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.tintInk,
  },
  row: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [bp.md]: "120px minmax(0, 1fr)" },
    columnGap: 24,
    rowGap: 6,
    paddingBlock: { default: 16, [bp.lg]: 20 },
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: tone.tintRuleSoft,
  },
  label: {
    margin: 0,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: { default: "20px", [bp.md]: "26px" },
    letterSpacing: "0.16em",
    color: tone.tintMuted,
  },
  value: {
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
    gap: 4,
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  quiet: {
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
  if (props.row.kind === "strong") {
    return <span {...stylex.attrs(styles.strong)}>{props.row.values.join(" · ")}</span>;
  }
  if (props.row.kind === "plain") return <>{props.row.values.join("、")}</>;
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
  return (
    <ul {...stylex.attrs(styles.lines, styles.quiet)}>
      {props.row.values.map((value) => (
        <li>{value}</li>
      ))}
    </ul>
  );
}

function Sheet(props: { item: SolutionItem; position: number; total: number }) {
  const area = areaOf(props.item.area);
  return (
    <>
      <header>
        <p {...stylex.attrs(styles.eyebrow)}>
          <span {...stylex.attrs(styles.areaLabel)}>{area?.label}</span>
          {area && (
            <span lang="en" {...stylex.attrs(styles.areaEnglish)}>
              {area.englishLabel}
            </span>
          )}
          <span aria-hidden="true" {...stylex.attrs(styles.counter)}>
            {padIndex(props.position)} / {String(props.total).padStart(2, "0")}
          </span>
        </p>
        <h3 {...stylex.attrs(styles.title)}>{props.item.title}</h3>
        <p {...stylex.attrs(styles.subtitle)}>{props.item.subtitle}</p>
      </header>
      <dl {...stylex.attrs(styles.rows)}>
        {sheetRows(props.item).map((row) => (
          <div {...stylex.attrs(styles.row)}>
            <dt {...stylex.attrs(styles.label)}>{row.label}</dt>
            <dd {...stylex.attrs(styles.value)}>
              <RowValue row={row} />
            </dd>
          </div>
        ))}
      </dl>
    </>
  );
}

export function MarginVariant() {
  const browser = useSolutionsBrowser();
  const uid = createUniqueId();
  const reduce = useReducedMotion();
  let list!: HTMLDivElement;

  createEffect(
    () => [browser.area, browser.selected.id, reduce()] as const,
    ([, , reduced]) => {
      const tab = list.querySelector<HTMLElement>('[aria-selected="true"]');
      if (!tab) return;
      const behavior = reduced ? "auto" : "smooth";
      if (getComputedStyle(list).overflowX === "auto") {
        if (list.scrollWidth <= list.clientWidth) return;
        const left = tab.offsetLeft - (list.clientWidth - tab.offsetWidth) / 2;
        list.scrollTo({ left: Math.max(0, left), behavior });
        return;
      }
      if (list.scrollHeight <= list.clientHeight) return;
      const computed = getComputedStyle(list);
      const visibleTop = list.scrollTop + (Number.parseFloat(computed.scrollPaddingTop) || 0);
      const visibleBottom =
        list.scrollTop + list.clientHeight - (Number.parseFloat(computed.paddingBottom) || 0);
      if (tab.offsetTop >= visibleTop && tab.offsetTop + tab.offsetHeight <= visibleBottom) return;
      const top = tab.offsetTop - (list.clientHeight - tab.offsetHeight) / 2;
      list.scrollTo({ top: Math.max(0, top), behavior });
    },
  );

  const handleKeyDown: JSX.EventHandler<HTMLDivElement, KeyboardEvent> = (event) => {
    const step = TAB_STEPS[event.key];
    if (!step) return;
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

  const showHeadings = () => browser.groups.length > 1;

  return (
    <LabSection>
      <AreaChips browser={browser} />
      <div {...stylex.attrs(styles.layout)}>
        <div {...stylex.attrs(styles.indexFrame)}>
          <div
            ref={list}
            role="tablist"
            aria-label="应用方案"
            aria-orientation="vertical"
            onKeyDown={handleKeyDown}
            {...stylex.attrs(styles.index)}
          >
            <For each={browser.groups}>
              {(group, groupIndex) => (
                <div {...stylex.attrs(styles.group, groupIndex() > 0 && styles.groupFollow)}>
                  <Show when={showHeadings()}>
                    <p
                      aria-hidden="true"
                      {...stylex.attrs(
                        styles.groupHeading,
                        groupIndex() > 0 && styles.groupHeadingFollow,
                      )}
                    >
                      {group.label}
                      <span {...stylex.attrs(styles.groupCount)}>{group.items.length} 款</span>
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
                          <span {...stylex.attrs(styles.nameRow)}>
                            <span
                              aria-hidden="true"
                              {...stylex.attrs(
                                styles.number,
                                isSelected() && styles.numberSelected,
                              )}
                            >
                              {padIndex(browser.scope.indexOf(item))}
                            </span>
                            <span {...stylex.attrs(styles.nameBox)}>
                              <span {...stylex.attrs(styles.nameStack)}>
                                <span
                                  {...stylex.attrs(
                                    styles.nameText,
                                    isSelected() && styles.nameTextSelected,
                                  )}
                                >
                                  {item.title}
                                </span>
                                <span aria-hidden="true" {...stylex.attrs(styles.nameGhost)}>
                                  {item.title}
                                </span>
                              </span>
                              <span
                                aria-hidden="true"
                                {...stylex.attrs(
                                  styles.leader,
                                  isSelected() && styles.leaderSelected,
                                )}
                              />
                            </span>
                          </span>
                          <span {...stylex.attrs(styles.functions)}>
                            {item.functions.join(" · ")}
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
        <div
          role="tabpanel"
          id={`${uid}-panel`}
          aria-labelledby={`${uid}-tab-${browser.selected.id}`}
          tabindex={0}
          {...stylex.attrs(styles.sheet)}
        >
          <Show when={browser.selected} keyed>
            {(item) => (
              <div {...stylex.attrs(styles.panel)}>
                <Sheet item={item} position={browser.position} total={browser.scope.length} />
              </div>
            )}
          </Show>
        </div>
      </div>
    </LabSection>
  );
}
