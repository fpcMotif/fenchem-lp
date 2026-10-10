import * as stylex from "@stylexjs/stylex";
import { useEffect, useId, useRef, type KeyboardEvent } from "react";

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

const EDGE = "#dde4f0";
const FLARE = 10;
const FLARE_START =
  "radial-gradient(circle at 0 0, transparent 8.5px, #dde4f0 9px, #dde4f0 10px, #fff 10.5px)";
const FLARE_END =
  "radial-gradient(circle at 100% 0, transparent 8.5px, #dde4f0 9px, #dde4f0 10px, #fff 10.5px)";
const FOLDER_SHADOW = "0 28px 48px -32px rgba(7, 67, 174, 0.22)";

const fadeIn = stylex.keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const styles = stylex.create({
  strip: {
    position: "relative",
    marginTop: { default: 28, [bp.xl]: 40 },
    paddingInline: { default: 0, [bp.md]: 20 },
    scrollPaddingInline: 12,
    overflowX: { default: "auto", [bp.md]: "clip" },
    overflowY: { default: "hidden", [bp.md]: "visible" },
    overscrollBehaviorX: "contain",
    scrollbarWidth: "none",
  },
  track: {
    position: "relative",
    display: "flex",
    flexDirection: { default: "row", [bp.md]: "column" },
    alignItems: { default: "flex-end", [bp.md]: "stretch" },
    columnGap: 4,
    rowGap: 10,
    boxSizing: "border-box",
    width: { default: "max-content", [bp.md]: "auto" },
    minWidth: "100%",
    paddingInline: { default: 12, [bp.md]: 0 },
    "::after": {
      content: '""',
      position: "absolute",
      insetInline: 0,
      bottom: 0,
      display: { default: "block", [bp.md]: "none" },
      height: 1,
      backgroundColor: EDGE,
      pointerEvents: "none",
    },
  },
  group: {
    display: { default: "contents", [bp.md]: "flex" },
    flexWrap: "wrap",
    alignItems: "flex-end",
    columnGap: 12,
    rowGap: 10,
  },
  groupLabel: {
    position: "relative",
    zIndex: 0,
    display: "inline-flex",
    alignItems: "center",
    flexShrink: 0,
    boxSizing: "border-box",
    height: 40,
    paddingTop: 4,
    paddingInlineEnd: { default: 4, [bp.md]: 6 },
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.1em",
    whiteSpace: "nowrap",
    color: tone.tintMuted,
    "::after": {
      content: '""',
      position: "absolute",
      left: "-100vw",
      right: "-100vw",
      bottom: 0,
      display: { default: "none", [bp.md]: "block" },
      height: 1,
      backgroundColor: EDGE,
      pointerEvents: "none",
    },
  },
  groupLabelFollow: {
    paddingInlineStart: { default: 14, [bp.md]: 0 },
  },
  tab: {
    position: "relative",
    zIndex: 0,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    boxSizing: "border-box",
    height: 40,
    paddingTop: 4,
    paddingBottom: 0,
    paddingInline: { default: 14, [bp.md]: 16 },
    borderWidth: 0,
    borderStartStartRadius: 10,
    borderStartEndRadius: 10,
    borderEndStartRadius: 0,
    borderEndEndRadius: 0,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    cursor: "pointer",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: tone.accent,
    outlineOffset: { default: -2, [bp.md]: 2 },
    "::after": {
      content: '""',
      position: "absolute",
      left: "-100vw",
      right: "-100vw",
      bottom: 0,
      zIndex: 1,
      display: { default: "none", [bp.md]: "block" },
      height: 1,
      backgroundColor: EDGE,
      pointerEvents: "none",
    },
  },
  tabSelected: {
    zIndex: 1,
    cursor: "default",
    "::after": {
      zIndex: -1,
    },
  },
  shape: {
    position: "absolute",
    inset: 0,
    boxSizing: "border-box",
    borderStyle: "solid",
    borderColor: "transparent",
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 0,
    borderStartStartRadius: 10,
    borderStartEndRadius: 10,
    backgroundColor: tone.tintFill,
    transformOrigin: "center bottom",
    transform: {
      default: "scaleY(0.9)",
      [stylex.when.ancestor(":hover")]: { default: "scaleY(0.9)", [bp.hover]: "scaleY(0.95)" },
    },
    transitionProperty: "transform",
    transitionDuration: { default: "0ms", [bp.motionOk]: "180ms" },
    transitionTimingFunction: motion.easeOut,
    pointerEvents: "none",
  },
  shapeSelected: {
    transform: "scaleY(1)",
    borderColor: EDGE,
    backgroundColor: tone.paper,
  },
  flare: {
    position: "absolute",
    bottom: 0,
    display: { default: "none", [bp.md]: "block" },
    width: FLARE,
    height: FLARE,
    pointerEvents: "none",
  },
  flareStart: {
    right: "calc(100% - 1px)",
    backgroundImage: FLARE_START,
  },
  flareEnd: {
    left: "calc(100% - 1px)",
    backgroundImage: FLARE_END,
  },
  nameStack: {
    position: "relative",
    display: "inline-grid",
    fontSize: 14,
    lineHeight: "20px",
    letterSpacing: "0.02em",
    whiteSpace: "nowrap",
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
  card: {
    minWidth: 0,
    paddingInline: { default: 20, [bp.md]: 40, [bp.xl]: 48 },
    paddingTop: { default: 28, [bp.md]: 36, [bp.xl]: 44 },
    paddingBottom: { default: 12, [bp.md]: 20 },
    borderStyle: "solid",
    borderColor: EDGE,
    borderTopWidth: 0,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderStartStartRadius: 0,
    borderStartEndRadius: 0,
    borderEndStartRadius: { default: 12, [bp.xl]: 16 },
    borderEndEndRadius: { default: 12, [bp.xl]: 16 },
    backgroundColor: tone.paper,
    boxShadow: FOLDER_SHADOW,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: tone.accent,
    outlineOffset: -2,
  },
  panel: {
    minWidth: 0,
    animationName: { default: "none", [bp.motionOk]: fadeIn },
    animationDuration: "180ms",
    animationTimingFunction: motion.easeOut,
  },
  head: {
    paddingBottom: { default: 20, [bp.md]: 28 },
  },
  eyebrow: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 16,
    margin: 0,
    marginBottom: 10,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.08em",
    color: tone.tintMuted,
  },
  counter: {
    fontFamily: face.display,
    fontSize: 12,
    fontWeight: 400,
    letterSpacing: "0.06em",
    fontVariantNumeric: "tabular-nums",
  },
  title: {
    margin: 0,
    fontSize: { default: 20, [bp.md]: 24, [bp.xl]: 26 },
    fontWeight: 500,
    lineHeight: 1.35,
    letterSpacing: "0.03em",
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
  fields: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [bp.xl]: "repeat(2, minmax(0, 1fr))" },
    gridTemplateRows: { default: "none", [bp.xl]: "repeat(3, auto)" },
    gridAutoFlow: { default: "row", [bp.xl]: "column" },
    columnGap: { default: 0, [bp.xl]: 48 },
    margin: 0,
  },
  field: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [bp.md]: "96px minmax(0, 1fr)",
      [bp.xl]: "88px minmax(0, 1fr)",
    },
    alignContent: "start",
    columnGap: 16,
    rowGap: 6,
    paddingBlock: { default: 16, [bp.md]: 18 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.tintRuleSoft,
  },
  label: {
    margin: 0,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.06em",
    color: tone.tintMuted,
  },
  value: {
    margin: 0,
    minWidth: 0,
    fontSize: 15,
    lineHeight: "24px",
    color: tone.tintInk,
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

function RowValue({ row }: { row: SheetRow }) {
  if (row.values.length === 0) return <span {...stylex.props(styles.absent)}>无</span>;
  if (row.kind === "strong") {
    return <span {...stylex.props(styles.strong)}>{row.values.join(" · ")}</span>;
  }
  if (row.kind === "plain") return <>{row.values.join("、")}</>;
  if (row.kind === "list") {
    return (
      <ul {...stylex.props(styles.lines)}>
        {row.values.map((value) => {
          const { primary, note } = splitNote(value);
          return (
            <li key={value} {...stylex.props(styles.keepWords)}>
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
  return (
    <ul {...stylex.props(styles.lines, styles.quiet)}>
      {row.values.map((value) => (
        <li key={value}>{value}</li>
      ))}
    </ul>
  );
}

function Sheet({ item, position, total }: { item: SolutionItem; position: number; total: number }) {
  return (
    <>
      <header {...stylex.props(styles.head)}>
        <p {...stylex.props(styles.eyebrow)}>
          <span>{areaOf(item.area)?.label}</span>
          <span aria-hidden="true" {...stylex.props(styles.counter)}>
            {padIndex(position)} / {String(total).padStart(2, "0")}
          </span>
        </p>
        <h3 {...stylex.props(styles.title)}>{item.title}</h3>
        <p {...stylex.props(styles.subtitle)}>{item.subtitle}</p>
      </header>
      <dl {...stylex.props(styles.fields)}>
        {sheetRows(item).map((row) => (
          <div key={row.label} {...stylex.props(styles.field)}>
            <dt {...stylex.props(styles.label)}>{row.label}</dt>
            <dd {...stylex.props(styles.value)}>
              <RowValue row={row} />
            </dd>
          </div>
        ))}
      </dl>
    </>
  );
}

export function FolderVariant() {
  const browser = useSolutionsBrowser();
  const { area, scope, groups, selected, position, select } = browser;
  const uid = useId();
  const reduce = useReducedMotion();
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const strip = stripRef.current;
    const tab = strip?.querySelector<HTMLElement>('[aria-selected="true"]');
    if (!strip || !tab || getComputedStyle(strip).overflowX !== "auto") return;
    if (strip.scrollWidth <= strip.clientWidth) return;
    const left = tab.offsetLeft - (strip.clientWidth - tab.offsetWidth) / 2;
    strip.scrollTo({ left: Math.max(0, left), behavior: reduce ? "auto" : "smooth" });
  }, [area, selected.id, reduce]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = TAB_STEPS[event.key];
    if (!step) return;
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

  const showLabels = groups.length > 1;

  return (
    <LabSection>
      <AreaChips browser={browser} />
      <div
        ref={stripRef}
        role="tablist"
        aria-label="应用方案"
        aria-orientation="horizontal"
        onKeyDown={handleKeyDown}
        {...stylex.props(styles.strip)}
      >
        <div {...stylex.props(styles.track)}>
          {groups.map((group, groupIndex) => (
            <div key={group.id} {...stylex.props(styles.group)}>
              {showLabels && (
                <span
                  aria-hidden="true"
                  {...stylex.props(styles.groupLabel, groupIndex > 0 && styles.groupLabelFollow)}
                >
                  {group.label}
                </span>
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
                      aria-hidden="true"
                      {...stylex.props(styles.shape, isSelected && styles.shapeSelected)}
                    />
                    {isSelected && (
                      <>
                        <span
                          aria-hidden="true"
                          {...stylex.props(styles.flare, styles.flareStart)}
                        />
                        <span aria-hidden="true" {...stylex.props(styles.flare, styles.flareEnd)} />
                      </>
                    )}
                    <span {...stylex.props(styles.nameStack)}>
                      <span
                        {...stylex.props(styles.nameText, isSelected && styles.nameTextSelected)}
                      >
                        {item.title}
                      </span>
                      <span aria-hidden="true" {...stylex.props(styles.nameGhost)}>
                        {item.title}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <div
        role="tabpanel"
        id={`${uid}-panel`}
        aria-labelledby={`${uid}-tab-${selected.id}`}
        tabIndex={0}
        {...stylex.props(styles.card)}
      >
        <div key={selected.id} {...stylex.props(styles.panel)}>
          <Sheet item={selected} position={position} total={scope.length} />
        </div>
      </div>
    </LabSection>
  );
}
