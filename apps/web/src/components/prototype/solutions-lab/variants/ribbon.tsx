import * as stylex from "@stylexjs/stylex";
import { m } from "motion/react";
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
import { bp, depth, face, motion, tone } from "../tokens.stylex";

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

const INDICATOR_TRANSITION = { type: "tween", duration: 0.24, ease: [0.23, 1, 0.32, 1] } as const;

const riseIn = stylex.keyframes({
  "0%": { opacity: 0, transform: "translateY(4px)" },
  "100%": { opacity: 1, transform: "none" },
});

const styles = stylex.create({
  toc: {
    marginTop: { default: 28, [bp.xl]: 40 },
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: tone.tintRuleSoft,
  },
  row: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [bp.lg]: "168px minmax(0, 1fr)" },
    columnGap: 24,
    rowGap: 2,
    paddingTop: { default: 14, [bp.lg]: 8 },
    paddingBottom: { default: 6, [bp.lg]: 8 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.tintRuleSoft,
  },
  rowLabel: {
    display: "flex",
    alignItems: "baseline",
    gap: 10,
    margin: 0,
    paddingTop: { default: 0, [bp.lg]: 10 },
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "22px",
    letterSpacing: "0.08em",
    whiteSpace: "nowrap",
    color: tone.tintMuted,
  },
  rowCount: {
    fontFamily: face.display,
    fontSize: 12,
    fontWeight: 400,
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
  },
  track: {
    display: "flex",
    flexWrap: { default: "nowrap", [bp.md]: "wrap" },
    columnGap: { default: 24, [bp.md]: 28 },
    minWidth: 0,
    marginInline: { default: -16, [bp.md]: 0 },
    paddingInline: { default: 16, [bp.md]: 0 },
    marginBlock: { default: -4, [bp.md]: 0 },
    paddingBlock: { default: 4, [bp.md]: 0 },
    scrollPaddingInline: 16,
    overflowX: { default: "auto", [bp.md]: "visible" },
    overflowY: { default: "hidden", [bp.md]: "visible" },
    overscrollBehaviorX: "contain",
    scrollbarWidth: "none",
  },
  tab: {
    position: "relative",
    display: "inline-flex",
    flexShrink: 0,
    paddingBlock: 10,
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
  nameStack: {
    display: "inline-grid",
    fontSize: 15,
    lineHeight: "22px",
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
  indicator: {
    position: "absolute",
    insetInline: 0,
    bottom: 4,
    height: 2,
    backgroundColor: tone.ink,
    pointerEvents: "none",
  },
  card: {
    marginTop: { default: 24, [bp.xl]: 32 },
    paddingInline: { default: 20, [bp.md]: 36, [bp.xl]: 48 },
    paddingTop: { default: 24, [bp.md]: 32, [bp.xl]: 40 },
    paddingBottom: { default: 8, [bp.md]: 16, [bp.xl]: 20 },
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
  panel: {
    minWidth: 0,
    animationName: { default: "none", [bp.motionOk]: riseIn },
    animationDuration: "200ms",
    animationTimingFunction: motion.easeOut,
  },
  head: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [bp.md]: "minmax(0, 1fr) auto" },
    alignItems: "start",
    columnGap: 32,
    paddingBottom: { default: 20, [bp.md]: 28 },
  },
  eyebrow: {
    margin: 0,
    marginBottom: 10,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.08em",
    color: tone.tintMuted,
  },
  title: {
    margin: 0,
    fontSize: { default: 22, [bp.md]: 26, [bp.xl]: 28 },
    fontWeight: 500,
    lineHeight: 1.3,
    letterSpacing: "0.02em",
    color: tone.ink,
    textWrap: "balance",
  },
  subtitle: {
    margin: 0,
    marginTop: 8,
    maxWidth: "44em",
    fontSize: 15,
    lineHeight: 1.6,
    color: tone.tintBody,
    textWrap: "pretty",
  },
  counter: {
    display: { default: "none", [bp.md]: "block" },
    margin: 0,
    fontFamily: face.display,
    fontSize: 13,
    lineHeight: "20px",
    letterSpacing: "0.06em",
    fontVariantNumeric: "tabular-nums",
    color: tone.tintMuted,
  },
  fields: {
    margin: 0,
    columnCount: { default: 1, [bp.lg]: 2, [bp.xl]: 3 },
    columnGap: { default: 0, [bp.lg]: 40, [bp.xl]: 48 },
  },
  field: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [bp.md]: "96px minmax(0, 1fr)",
      [bp.lg]: "minmax(0, 1fr)",
    },
    alignContent: "start",
    columnGap: 16,
    rowGap: 6,
    paddingBlock: { default: 16, [bp.lg]: 18 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.tintRuleSoft,
    breakInside: "avoid",
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
        <div>
          <p {...stylex.props(styles.eyebrow)}>{areaOf(item.area)?.label}</p>
          <h3 {...stylex.props(styles.title)}>{item.title}</h3>
          <p {...stylex.props(styles.subtitle)}>{item.subtitle}</p>
        </div>
        <p aria-hidden="true" {...stylex.props(styles.counter)}>
          {padIndex(position)} / {String(total).padStart(2, "0")}
        </p>
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

export function RibbonVariant() {
  const browser = useSolutionsBrowser();
  const { area, scope, groups, selected, position, select } = browser;
  const uid = useId();
  const reduce = useReducedMotion();
  const tocRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tab = tocRef.current?.querySelector<HTMLElement>('[aria-selected="true"]');
    const track = tab?.parentElement;
    if (!tab || !track || track.scrollWidth <= track.clientWidth) return;
    const left = tab.offsetLeft - (track.clientWidth - tab.offsetWidth) / 2;
    track.scrollTo({ left: Math.max(0, left), behavior: reduce ? "auto" : "smooth" });
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

  return (
    <LabSection>
      <AreaChips browser={browser} />
      <div
        ref={tocRef}
        role="tablist"
        aria-label="应用方案"
        aria-orientation="horizontal"
        onKeyDown={handleKeyDown}
        {...stylex.props(styles.toc)}
      >
        {groups.map((group) => (
          <div key={group.id} {...stylex.props(styles.row)}>
            <p aria-hidden="true" {...stylex.props(styles.rowLabel)}>
              {group.label}
              <span {...stylex.props(styles.rowCount)}>{group.items.length}</span>
            </p>
            <m.div layoutScroll {...stylex.props(styles.track)}>
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
                    {isSelected && (
                      <m.span
                        aria-hidden="true"
                        layoutId={`${uid}-ribbon-indicator`}
                        transition={reduce ? { duration: 0 } : INDICATOR_TRANSITION}
                        {...stylex.props(styles.indicator)}
                      />
                    )}
                  </button>
                );
              })}
            </m.div>
          </div>
        ))}
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
