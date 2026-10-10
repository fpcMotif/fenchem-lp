import * as stylex from "@stylexjs/stylex";
import { AnimatePresence, m } from "motion/react";
import {
  Fragment,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";

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
  type SolutionsBrowser,
} from "../kit";
import { bp, depth, face, motion, tone } from "../tokens.stylex";

const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];
const NO_BREAK_SPACE = String.fromCharCode(0xa0);
const TRAILING_NOTE = /^(.+?)\s*[（(]([^（）()]+)[）)]$/;

const FALLBACK_WIDTH = 1200;
const SLIVER = 4;
const EXPOSE = 30;
const TAB_HEIGHT = 40;
const HEADROOM = 8;
const FRONT_GAP = 8;
const GROUP_GAP = 10;
const UNDERLAP = 16;
const SLOT_MIN = 150;
const TAB_MAX = 240;
const MAX_CUT = 7;
const DIVIDER_WIDTH = 112;
const GUTTER = 6;

const splitNote = (text: string) => {
  const match = TRAILING_NOTE.exec(text);
  return match ? { primary: match[1] ?? text, note: match[2] ?? null } : { primary: text, note: null };
};

const TAB_STEPS: Record<string, (index: number, count: number) => number> = {
  ArrowDown: (index, count) => (index + 1) % count,
  ArrowRight: (index, count) => (index + 1) % count,
  ArrowUp: (index, count) => (index - 1 + count) % count,
  ArrowLeft: (index, count) => (index - 1 + count) % count,
  Home: () => 0,
  End: (_, count) => count - 1,
};

type AreaGroup = SolutionsBrowser["groups"][number];

type FilePiece =
  | { kind: "divider"; group: AreaGroup; left: number; width: number; edge: number }
  | { kind: "card"; item: SolutionItem; left: number; width: number; edge: number };

function layoutFile(groups: AreaGroup[], withDividers: boolean, width: number) {
  const offset = withDividers ? DIVIDER_WIDTH + GUTTER : 0;
  const available = Math.max(width - offset, SLOT_MIN);
  const capacity = Math.min(MAX_CUT, Math.max(2, Math.floor(available / SLOT_MIN)));
  const cuts = groups.map((group) => {
    const cycles = Math.max(1, Math.ceil(group.items.length / capacity));
    return Math.ceil(group.items.length / cycles);
  });
  const pitch = Math.min(available / Math.max(1, ...cuts), TAB_MAX);
  const pieces: FilePiece[] = [];
  let cursor = -SLIVER;

  const settle = (left: number, span: number, gap: number) => {
    let edge = cursor + SLIVER + gap;
    for (const piece of pieces) {
      if (piece.left < left + span && left < piece.left + piece.width) {
        edge = Math.max(edge, piece.edge + EXPOSE);
      }
    }
    cursor = edge;
    return edge;
  };

  groups.forEach((group, groupIndex) => {
    if (withDividers) {
      const edge = settle(0, DIVIDER_WIDTH, groupIndex === 0 ? 0 : GROUP_GAP);
      pieces.push({ kind: "divider", group, left: 0, width: DIVIDER_WIDTH, edge });
    }
    const cut = cuts[groupIndex] ?? 1;
    group.items.forEach((item, index) => {
      const left = offset + (index % cut) * pitch;
      const span = pitch - GUTTER;
      const edge = settle(left, span, 0);
      pieces.push({ kind: "card", item, left, width: span, edge });
    });
  });

  return { pieces, front: HEADROOM + TAB_HEIGHT + cursor + FRONT_GAP };
}

function useElementWidth(ref: { current: HTMLElement | null }) {
  const [width, setWidth] = useState(FALLBACK_WIDTH);
  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;
    setWidth(node.clientWidth);
    const observer = new ResizeObserver(([entry]) => {
      if (entry) setWidth(entry.contentRect.width);
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref]);
  return width;
}

const styles = stylex.create({
  file: {
    position: "relative",
    zIndex: { default: 1, [bp.md]: "auto" },
    display: { default: "flex", [bp.md]: "block" },
    alignItems: "flex-end",
    gap: 4,
    height: { default: "auto", [bp.md]: "var(--file-height)" },
    marginTop: { default: 20, [bp.xl]: 32 },
    marginInline: { default: -16, [bp.md]: 0 },
    paddingTop: { default: 8, [bp.md]: 0 },
    paddingInline: { default: 16, [bp.md]: 0 },
    scrollPaddingInline: 16,
    overflowX: { default: "auto", [bp.md]: "visible" },
    overflowY: { default: "hidden", [bp.md]: "visible" },
    scrollbarWidth: "none",
    overscrollBehaviorX: "contain",
    maskImage: {
      default: "linear-gradient(to right, transparent, #000 16px, #000 calc(100% - 16px), transparent)",
      [bp.md]: "none",
    },
  },
  sliver: {
    display: { default: "none", [bp.md]: "block" },
    position: "absolute",
    left: 0,
    right: 0,
    top: "var(--top)",
    height: "var(--height)",
    zIndex: "var(--layer)",
    boxSizing: "border-box",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: tone.tintRule,
    borderBottomWidth: 0,
    borderStartStartRadius: 10,
    borderStartEndRadius: 10,
    backgroundColor: tone.tintFill,
    pointerEvents: "none",
  },
  sliverDivider: {
    backgroundColor: tone.paper,
  },
  divider: {
    position: { default: "relative", [bp.md]: "absolute" },
    left: { default: null, [bp.md]: "var(--left)" },
    top: { default: null, [bp.md]: "var(--top)" },
    zIndex: { default: null, [bp.md]: "var(--layer)" },
    display: "flex",
    alignItems: { default: "center", [bp.md]: "flex-start" },
    gap: 8,
    flexShrink: 0,
    width: { default: null, [bp.md]: "var(--width)" },
    height: { default: 40, [bp.md]: 44 },
    marginInlineStart: { default: 12, ":first-child": 0, [bp.md]: 0 },
    paddingTop: { default: 0, [bp.md]: 8 },
    paddingInline: { default: 4, [bp.md]: 12 },
    boxSizing: "border-box",
    borderWidth: { default: 0, [bp.md]: 1 },
    borderStyle: "solid",
    borderColor: tone.tintRule,
    borderBottomWidth: 0,
    borderStartStartRadius: 8,
    borderStartEndRadius: 8,
    backgroundColor: { default: "transparent", [bp.md]: tone.paper },
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "18px",
    letterSpacing: "0.08em",
    whiteSpace: "nowrap",
    color: tone.tintInk,
  },
  dividerCount: {
    fontFamily: face.display,
    fontWeight: 400,
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: tone.tintMuted,
  },
  tab: {
    position: { default: "relative", [bp.md]: "absolute" },
    left: { default: null, [bp.md]: "var(--left)" },
    top: { default: null, [bp.md]: "var(--top)" },
    zIndex: { default: null, [bp.md]: "var(--layer)" },
    display: "flex",
    alignItems: { default: "center", [bp.md]: "flex-start" },
    flexShrink: 0,
    width: { default: null, [bp.md]: "var(--width)" },
    maxWidth: { default: 220, [bp.md]: "none" },
    height: { default: 40, [bp.md]: 44 },
    paddingTop: { default: 0, [bp.md]: 8 },
    paddingBottom: 0,
    paddingInline: { default: 14, [bp.md]: 12 },
    boxSizing: "border-box",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: tone.tintRule,
    borderBottomWidth: { default: 1, [bp.md]: 0 },
    borderStartStartRadius: 8,
    borderStartEndRadius: 8,
    borderEndStartRadius: 0,
    borderEndEndRadius: 0,
    backgroundColor: tone.tintFill,
    fontFamily: "inherit",
    textAlign: "start",
    cursor: "pointer",
    transform: {
      default: "none",
      ":hover": { default: "none", [bp.hover]: "translateY(-3px)" },
    },
    transitionProperty: "transform, background-color, border-color",
    transitionDuration: { default: "0ms", [bp.motionOk]: "160ms" },
    transitionTimingFunction: motion.easeOut,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: tone.accent,
    outlineOffset: 2,
  },
  tabSelected: {
    borderColor: tone.ink,
    borderBottomColor: tone.paper,
    backgroundColor: tone.paper,
    transform: { default: "none", [bp.md]: "translateY(-3px)" },
    cursor: "default",
  },
  tabLabel: {
    minWidth: 0,
    overflow: "hidden",
    fontSize: 13,
    fontWeight: 400,
    lineHeight: "18px",
    letterSpacing: "0.02em",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    color: {
      default: tone.tintBody,
      [stylex.when.ancestor(":hover")]: { default: tone.tintBody, [bp.hover]: tone.accent },
    },
    transitionProperty: "color",
    transitionDuration: { default: "0ms", [bp.motionOk]: "150ms" },
    transitionTimingFunction: motion.easeOut,
  },
  tabLabelSelected: {
    fontWeight: 500,
    color: tone.ink,
  },
  front: {
    position: "relative",
    zIndex: { default: 0, [bp.md]: 200 },
    marginTop: { default: -1, [bp.md]: 0 },
    borderRadius: { default: 12, [bp.md]: 14 },
    scrollMarginTop: 80,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: tone.accent,
    outlineOffset: 2,
  },
  card: {
    position: "relative",
    zIndex: 1,
    paddingInline: { default: 20, [bp.md]: 40, [bp.xl]: 56 },
    paddingTop: { default: 24, [bp.md]: 36, [bp.xl]: 44 },
    paddingBottom: { default: 12, [bp.md]: 20, [bp.xl]: 28 },
    boxSizing: "border-box",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: tone.tintRule,
    borderStartStartRadius: { default: 0, [bp.md]: 14 },
    borderStartEndRadius: { default: 12, [bp.md]: 14 },
    borderEndStartRadius: { default: 12, [bp.md]: 14 },
    borderEndEndRadius: { default: 12, [bp.md]: 14 },
    backgroundColor: tone.paper,
    boxShadow: depth.card,
  },
  cardHead: {
    paddingBottom: { default: 20, [bp.md]: 28 },
    borderBottomWidth: 3,
    borderBottomStyle: "double",
    borderBottomColor: tone.tintRule,
  },
  cardMeta: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 16,
    margin: 0,
    marginBottom: 14,
  },
  cardArea: {
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.08em",
    color: tone.tintMuted,
  },
  cardNumber: {
    flexShrink: 0,
    fontFamily: face.display,
    fontSize: 12,
    lineHeight: "20px",
    letterSpacing: "0.08em",
    fontVariantNumeric: "tabular-nums",
    color: tone.tintMuted,
  },
  cardNumberCurrent: {
    color: tone.ink,
  },
  cardTitle: {
    margin: 0,
    fontSize: { default: 22, [bp.md]: 28 },
    fontWeight: 500,
    lineHeight: 1.3,
    letterSpacing: "0.03em",
    textWrap: "balance",
    color: tone.ink,
  },
  cardSubtitle: {
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
    paddingBlock: { default: 16, [bp.md]: 18 },
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: tone.tintRuleSoft,
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

function RowValue({ row }: { row: SheetRow }) {
  if (row.values.length === 0) return <span {...stylex.props(styles.absent)}>无</span>;
  if (row.kind === "lines") {
    return (
      <ul {...stylex.props(styles.lines, styles.description)}>
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
  return <>{row.values.join("、")}</>;
}

function IndexCard({ item, position, total }: { item: SolutionItem; position: number; total: number }) {
  return (
    <>
      <header {...stylex.props(styles.cardHead)}>
        <p {...stylex.props(styles.cardMeta)}>
          <span {...stylex.props(styles.cardArea)}>{areaOf(item.area)?.label}</span>
          <span {...stylex.props(styles.cardNumber)}>
            <span lang="en">No. </span>
            <span {...stylex.props(styles.cardNumberCurrent)}>{padIndex(position)}</span>
            {` / ${padIndex(total - 1)}`}
          </span>
        </p>
        <h3 {...stylex.props(styles.cardTitle)}>{item.title}</h3>
        <p {...stylex.props(styles.cardSubtitle)}>{item.subtitle}</p>
      </header>
      <dl {...stylex.props(styles.fields)}>
        {sheetRows(item).map((row) => (
          <div key={row.label} {...stylex.props(styles.field)}>
            <dt {...stylex.props(styles.fieldLabel)}>{row.label}</dt>
            <dd {...stylex.props(styles.fieldValue)}>
              <RowValue row={row} />
            </dd>
          </div>
        ))}
      </dl>
    </>
  );
}

const percent = (value: number, total: number) => `${(value / total) * 100}%`;

export function CardsVariant() {
  const browser = useSolutionsBrowser();
  const reduce = useReducedMotion();
  const uid = useId();
  const fileRef = useRef<HTMLDivElement>(null);
  const width = useElementWidth(fileRef);
  const { area, scope, groups, selected, position, select } = browser;
  const { pieces, front } = layoutFile(groups, area === "all", width);

  useEffect(() => {
    const file = fileRef.current;
    const tab = file?.querySelector<HTMLElement>('[aria-selected="true"]');
    if (!file || !tab || file.scrollWidth <= file.clientWidth) return;
    const left = tab.offsetLeft - (file.clientWidth - tab.offsetWidth) / 2;
    file.scrollTo({ left: Math.max(0, left), behavior: reduce ? "auto" : "smooth" });
  }, [area, selected?.id, reduce]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = TAB_STEPS[event.key];
    if (!step) return;
    event.preventDefault();
    const next = step(position, scope.length);
    const item = scope[next];
    if (!item) return;
    select(item.id);
    event.currentTarget.querySelectorAll<HTMLElement>('[role="tab"]')[next]?.focus();
  };

  const timing = { duration: reduce ? 0 : 0.24, ease: EASE_OUT };

  return (
    <LabSection>
      <AreaChips browser={browser} />
      <div
        ref={fileRef}
        role="tablist"
        aria-label="应用方案"
        onKeyDown={handleKeyDown}
        {...stylex.props(styles.file)}
        style={{ "--file-height": `${front}px` } as CSSProperties}
      >
        {pieces.map((piece, index) => {
          const edge = HEADROOM + TAB_HEIGHT + piece.edge;
          const sliverStyle = {
            "--top": `${edge}px`,
            "--height": `${front - edge + UNDERLAP}px`,
            "--layer": index * 2,
          } as CSSProperties;
          const tabStyle = {
            "--left": percent(piece.left, width),
            "--width": percent(piece.width, width),
            "--top": `${edge - TAB_HEIGHT}px`,
            "--layer": index * 2 + 1,
          } as CSSProperties;

          if (piece.kind === "divider") {
            return (
              <Fragment key={`divider-${piece.group.id}`}>
                <span aria-hidden="true" {...stylex.props(styles.divider)} style={tabStyle}>
                  {piece.group.label}
                  <span {...stylex.props(styles.dividerCount)}>{piece.group.items.length}</span>
                </span>
                <span
                  aria-hidden="true"
                  {...stylex.props(styles.sliver, styles.sliverDivider)}
                  style={sliverStyle}
                />
              </Fragment>
            );
          }

          const { item } = piece;
          const isSelected = item.id === selected?.id;
          return (
            <Fragment key={item.id}>
              <button
                type="button"
                role="tab"
                id={`${uid}-tab-${item.id}`}
                aria-selected={isSelected}
                aria-controls={`${uid}-panel`}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => select(item.id)}
                {...stylex.props(styles.tab, isSelected && styles.tabSelected, stylex.defaultMarker())}
                style={tabStyle}
              >
                <span {...stylex.props(styles.tabLabel, isSelected && styles.tabLabelSelected)}>
                  {item.title}
                </span>
              </button>
              <span aria-hidden="true" {...stylex.props(styles.sliver)} style={sliverStyle} />
            </Fragment>
          );
        })}
      </div>
      {selected && (
        <div
          role="tabpanel"
          id={`${uid}-panel`}
          aria-labelledby={`${uid}-tab-${selected.id}`}
          tabIndex={0}
          {...stylex.props(styles.front)}
        >
          <AnimatePresence initial={false} mode="popLayout">
            <m.div
              key={selected.id}
              initial={{ opacity: 0, y: 8, scale: 1 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{
                opacity: 0,
                y: -6,
                scale: 0.985,
                zIndex: 0,
                transition: {
                  duration: reduce ? 0 : 0.2,
                  ease: EASE_OUT,
                  zIndex: { duration: 0 },
                },
              }}
              transition={timing}
              {...stylex.props(styles.card)}
              style={{ originY: 0 }}
            >
              <IndexCard item={selected} position={position} total={scope.length} />
            </m.div>
          </AnimatePresence>
        </div>
      )}
    </LabSection>
  );
}
