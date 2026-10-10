import * as stylex from "@stylexjs/stylex";
import { useReducedMotion } from "motion/react";
import { useEffect, useId, useRef, useSyncExternalStore, type KeyboardEvent } from "react";

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
    scrollPaddingTop: { default: null, [bp.lg]: 36 },
    borderRadius: { default: 12, [bp.lg]: 0 },
    backgroundColor: { default: tone.tintFill, [bp.lg]: "transparent" },
    maskImage: {
      default: "linear-gradient(to right, #000 calc(100% - 28px), transparent)",
      [bp.lg]: "none",
    },
  },
  listGrouped: {
    paddingTop: { default: 4, [bp.lg]: 0 },
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

function RowValue({ row }: { row: SheetRow }) {
  if (row.values.length === 0) return <span {...stylex.props(styles.absent)}>无</span>;
  if (row.kind === "lines") {
    return (
      <ul {...stylex.props(styles.lines, styles.body)}>
        {row.values.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    );
  }
  if (row.kind === "strong") {
    return <span {...stylex.props(styles.strong)}>{row.values.join(" · ")}</span>;
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

function PointValue({ row }: { row: SheetRow }) {
  if (row.values.length === 0) return <span {...stylex.props(styles.absent)}>无</span>;
  if (row.kind === "list") {
    return (
      <ol {...stylex.props(styles.ingredients)}>
        {row.values.map((entry, index) => {
          const { primary, note } = splitNote(entry);
          return (
            <li key={entry} {...stylex.props(styles.ingredient)}>
              <span aria-hidden="true" {...stylex.props(styles.ingredientIndex)}>
                {padIndex(index)}
              </span>
              <span {...stylex.props(styles.ingredientText)}>
                <span {...stylex.props(styles.strong)}>
                  {primary.replaceAll(" / ", `${NO_BREAK_SPACE}/ `)}
                </span>
                {note && <span {...stylex.props(styles.ingredientNote)}>{note}</span>}
              </span>
            </li>
          );
        })}
      </ol>
    );
  }
  return (
    <ul {...stylex.props(styles.lines)}>
      {row.values.map((value) => (
        <li key={value}>{value}</li>
      ))}
    </ul>
  );
}

export function StudioVariant() {
  const browser = useSolutionsBrowser();
  const { area, scope, groups, selected, position, select } = browser;
  const uid = useId();
  const reduce = useReducedMotion();
  const wide = useSyncExternalStore(subscribeWide, readWide, readWideOnServer);
  const listRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const pointsRef = useRef<HTMLDivElement>(null);
  const selectedId = selected?.id;

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
    const inset = Number.parseFloat(getComputedStyle(list).scrollPaddingTop) || 0;
    const top = tab.offsetTop - inset;
    const bottom = tab.offsetTop + tab.offsetHeight + 8 - list.clientHeight;
    if (list.scrollTop > top) list.scrollTo({ top: Math.max(0, top), behavior });
    else if (list.scrollTop < bottom) list.scrollTo({ top: bottom, behavior });
  }, [area, selectedId, wide, reduce]);

  useEffect(() => {
    sheetRef.current?.scrollTo({ top: 0 });
    pointsRef.current?.scrollTo({ top: 0 });
  }, [selectedId]);

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
        <AreaChips browser={browser} />
        <p {...stylex.props(styles.empty)}>该领域暂无应用方案</p>
      </LabSection>
    );
  }

  const rows = sheetRows(selected);
  const pointRows = rows.slice(3);
  const grouped = area === "all";

  return (
    <LabSection>
      <AreaChips browser={browser} />
      <div {...stylex.props(styles.workspace)}>
        <div {...stylex.props(styles.listPane)}>
          <div {...stylex.props(styles.listFrame)}>
            <div aria-hidden="true" {...stylex.props(styles.paneHead, styles.listHead)}>
              <span>方案</span>
              <span {...stylex.props(styles.headCount)}>{scope.length}</span>
            </div>
            <div
              ref={listRef}
              role="tablist"
              aria-label="应用方案"
              aria-orientation={wide ? "vertical" : "horizontal"}
              onKeyDown={handleListKeyDown}
              {...stylex.props(styles.list, grouped && styles.listGrouped)}
            >
              {groups.map((group) => (
                <div key={group.id} {...stylex.props(styles.group)}>
                  {grouped && (
                    <p aria-hidden="true" {...stylex.props(styles.groupHead)}>
                      <span>{group.label}</span>
                      <span {...stylex.props(styles.groupCount)}>{group.items.length}</span>
                    </p>
                  )}
                  {group.items.map((item) => {
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
                        <span
                          {...stylex.props(styles.tabIndex, isSelected && styles.tabIndexSelected)}
                        >
                          {padIndex(scope.indexOf(item))}
                        </span>
                        <span {...stylex.props(styles.tabName, isSelected && styles.tabNameSelected)}>
                          {item.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          role="tabpanel"
          id={`${uid}-panel`}
          aria-labelledby={`${uid}-tab-${selected.id}`}
          tabIndex={0}
          {...stylex.props(styles.panel)}
        >
          <div {...stylex.props(styles.sheetPane)}>
            <div {...stylex.props(styles.paneHead)}>
              <span {...stylex.props(styles.headArea)}>{areaOf(selected.area)?.label}</span>
              <span {...stylex.props(styles.headCount)}>
                {padIndex(position)} / {padIndex(scope.length - 1)}
              </span>
            </div>
            <div ref={sheetRef} {...stylex.props(styles.sheetScroll)}>
              <div key={selected.id} {...stylex.props(styles.fade)}>
                <header {...stylex.props(styles.sheetHead)}>
                  <h3 {...stylex.props(styles.title)}>{selected.title}</h3>
                  <p lang="en" {...stylex.props(styles.englishName)}>
                    {selected.englishName}
                  </p>
                  <p {...stylex.props(styles.subtitle)}>{selected.subtitle}</p>
                </header>
                <dl {...stylex.props(styles.fields)}>
                  {rows.map((row, index) => (
                    <div
                      key={row.label}
                      {...stylex.props(styles.field, index >= 3 && styles.fieldBelowXl)}
                    >
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
          <aside aria-labelledby={`${uid}-points`} {...stylex.props(styles.pointsPane)}>
            <div {...stylex.props(styles.paneHead, styles.pointsHead)}>
              <h4 id={`${uid}-points`} {...stylex.props(styles.pointsTitle)}>
                配方要点
              </h4>
            </div>
            <div ref={pointsRef} {...stylex.props(styles.pointsScroll)}>
              <dl key={selected.id} {...stylex.props(styles.points, styles.fade)}>
                {pointRows.map((row) => (
                  <div key={row.label} {...stylex.props(styles.point)}>
                    <dt {...stylex.props(styles.pointLabel)}>
                      {row.label}
                      {row.kind === "list" && row.values.length > 0 && (
                        <span {...stylex.props(styles.pointCount)}>{row.values.length}</span>
                      )}
                    </dt>
                    <dd {...stylex.props(styles.pointValue)}>
                      <PointValue row={row} />
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </LabSection>
  );
}
