import * as stylex from "@stylexjs/stylex";
import { LayoutGroup, m } from "motion/react";
import { useId, useRef, useState, type KeyboardEvent } from "react";

import { useReducedMotion } from "../../use-reduced-motion";
import {
  AreaChips,
  LAB_SOLUTIONS,
  LabSection,
  areaOf,
  padIndex,
  sheetRows,
  useSolutionsBrowser,
  type SheetRow,
  type SolutionItem,
} from "../kit";
import { bp, depth, face, motion, tone } from "../tokens.stylex";

const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];
const HEADER_OFFSET = 80;
const SHEET_GAP = 16;
const BOTTOM_CLEARANCE = 160;
const FLOW_COLUMNS = 3;
const TRAILING_NOTE = /^(.+?)\s*[（(]([^（）()]+)[）)]$/;
const NO_BREAK_SPACE = String.fromCharCode(0xa0);

const AREA_POSITION = new Map(
  LAB_SOLUTIONS.map((item) => [
    item.id,
    LAB_SOLUTIONS.filter((other) => other.area === item.area).indexOf(item),
  ]),
);

const areaSize = (item: SolutionItem) =>
  LAB_SOLUTIONS.filter((other) => other.area === item.area).length;

const flowColumns = (items: SolutionItem[]) => {
  const size = Math.ceil(items.length / FLOW_COLUMNS);
  return Array.from({ length: FLOW_COLUMNS }, (_, column) =>
    items.slice(column * size, (column + 1) * size),
  ).filter((column) => column.length > 0);
};

const splitNote = (text: string) => {
  const match = TRAILING_NOTE.exec(text);
  return match ? { primary: match[1], note: match[2] } : { primary: text, note: null };
};

const fade = stylex.keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const styles = stylex.create({
  matrix: {
    marginTop: { default: 16, [bp.xl]: 24 },
    paddingInline: { default: 12, [bp.md]: 24, [bp.xl]: 32 },
    paddingTop: { default: 12, [bp.md]: 24, [bp.xl]: 28 },
    paddingBottom: { default: 12, [bp.md]: 24, [bp.xl]: 28 },
    borderRadius: { default: 12, [bp.xl]: 16 },
    backgroundColor: tone.tintFill,
  },
  fadeIn: {
    animationName: { default: "none", [bp.motionOk]: fade },
    animationDuration: "180ms",
    animationTimingFunction: motion.easeOut,
  },
  areaGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [bp.md]: "repeat(2, minmax(0, 1fr))",
      [bp.lg]: "repeat(3, minmax(0, 1fr))",
      [bp.xl]: "repeat(5, minmax(0, 1fr))",
    },
    columnGap: { default: 0, [bp.md]: 28, [bp.xl]: 24 },
    rowGap: { default: 20, [bp.md]: 32 },
  },
  column: {
    minWidth: 0,
  },
  flowGrid: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [bp.md]: "repeat(3, minmax(0, 1fr))" },
    columnGap: { default: 0, [bp.md]: 28, [bp.xl]: 40 },
  },
  colHead: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) auto",
    alignItems: "baseline",
    columnGap: 12,
    rowGap: 2,
    paddingInline: { default: 4, [bp.md]: 0 },
    paddingBottom: 12,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: tone.tintRule,
  },
  colLabel: {
    margin: 0,
    fontSize: 15,
    fontWeight: 500,
    lineHeight: "22px",
    letterSpacing: "0.04em",
    color: tone.tintInk,
  },
  colCount: {
    fontSize: 12,
    lineHeight: "22px",
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: tone.tintMuted,
  },
  colEnglish: {
    gridColumn: "1 / -1",
    margin: 0,
    fontFamily: face.display,
    fontSize: 11,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: tone.tintMuted,
  },
  names: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    marginBlock: 0,
    marginInline: { default: -8, [bp.md]: -10 },
    padding: 0,
    listStyleType: "none",
  },
  name: {
    position: "relative",
    display: "grid",
    gridTemplateColumns: "20px minmax(0, 1fr)",
    alignItems: "baseline",
    columnGap: 8,
    width: "100%",
    minHeight: { default: 44, [bp.md]: 36 },
    paddingBlock: { default: 11, [bp.md]: 7 },
    paddingInline: { default: 12, [bp.md]: 10 },
    boxSizing: "border-box",
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    textAlign: "start",
    cursor: "pointer",
    WebkitTapHighlightColor: "transparent",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: tone.accent,
    outlineOffset: 0,
  },
  nameSelected: {
    cursor: "default",
  },
  pill: {
    position: "absolute",
    inset: 0,
    boxSizing: "border-box",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: tone.tintRule,
    borderRadius: 10,
    backgroundColor: tone.paper,
    boxShadow: "0 1px 2px rgba(7, 26, 74, 0.05)",
    pointerEvents: "none",
  },
  nameIndex: {
    position: "relative",
    fontSize: 11,
    lineHeight: "22px",
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: tone.tintMuted,
  },
  nameIndexSelected: {
    color: tone.ink,
  },
  nameText: {
    position: "relative",
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "22px",
    letterSpacing: "0.02em",
    color: {
      default: tone.tintBody,
      [stylex.when.ancestor(":hover")]: { default: tone.tintBody, [bp.hover]: tone.accent },
    },
    textWrap: "pretty",
    transitionProperty: "color",
    transitionDuration: { default: "0ms", [bp.motionOk]: "150ms" },
    transitionTimingFunction: motion.easeOut,
  },
  nameTextSelected: {
    fontWeight: 500,
    color: tone.ink,
  },
  sheet: {
    marginTop: { default: 16, [bp.md]: 24, [bp.xl]: 32 },
    paddingInline: { default: 20, [bp.md]: 40, [bp.xl]: 48 },
    paddingTop: { default: 24, [bp.md]: 36, [bp.xl]: 40 },
    paddingBottom: { default: 12, [bp.md]: 20 },
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: tone.tintRule,
    borderRadius: { default: 12, [bp.xl]: 16 },
    backgroundColor: tone.paper,
    boxShadow: depth.card,
  },
  sheetHead: {
    paddingBottom: { default: 20, [bp.md]: 28 },
  },
  sheetMeta: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 16,
    marginBottom: 12,
  },
  sheetArea: {
    display: "flex",
    alignItems: "baseline",
    gap: 8,
    margin: 0,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "18px",
    letterSpacing: "0.08em",
    color: tone.tintMuted,
  },
  english: {
    fontFamily: face.display,
    fontSize: 11,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
  },
  sheetCount: {
    margin: 0,
    fontFamily: face.display,
    fontSize: 12,
    lineHeight: "18px",
    letterSpacing: "0.08em",
    fontVariantNumeric: "tabular-nums",
    color: tone.tintMuted,
    whiteSpace: "nowrap",
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

function FieldValue({ row }: { row: SheetRow }) {
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

function Sheet({ item, titleId }: { item: SolutionItem; titleId: string }) {
  const area = areaOf(item.area);
  return (
    <>
      <header {...stylex.props(styles.sheetHead)}>
        <div {...stylex.props(styles.sheetMeta)}>
          <p {...stylex.props(styles.sheetArea)}>
            <span>{area?.label}</span>
            <span lang="en" {...stylex.props(styles.english)}>
              {area?.englishLabel}
            </span>
          </p>
          <p {...stylex.props(styles.sheetCount)}>
            {padIndex(AREA_POSITION.get(item.id) ?? 0)} / {padIndex(areaSize(item) - 1)}
          </p>
        </div>
        <h3 id={titleId} {...stylex.props(styles.sheetTitle)}>
          {item.title}
        </h3>
        <p {...stylex.props(styles.sheetSubtitle)}>{item.subtitle}</p>
      </header>
      <dl {...stylex.props(styles.fields)}>
        {sheetRows(item).map((row) => (
          <div key={row.label} {...stylex.props(styles.field)}>
            <dt {...stylex.props(styles.fieldLabel)}>{row.label}</dt>
            <dd {...stylex.props(styles.fieldValue)}>
              <FieldValue row={row} />
            </dd>
          </div>
        ))}
      </dl>
    </>
  );
}

function NameList({
  items,
  selectedId,
  rovingId,
  sheetId,
  onChoose,
  onFocusItem,
}: {
  items: SolutionItem[];
  selectedId: string | undefined;
  rovingId: string | undefined;
  sheetId: string;
  onChoose: (id: string) => void;
  onFocusItem: (id: string) => void;
}) {
  const reduce = useReducedMotion();
  return (
    <ul {...stylex.props(styles.names)}>
      {items.map((item) => {
        const isSelected = item.id === selectedId;
        return (
          <li key={item.id}>
            <button
              type="button"
              data-solution-id={item.id}
              tabIndex={item.id === rovingId ? 0 : -1}
              aria-current={isSelected ? "true" : undefined}
              aria-controls={sheetId}
              onClick={() => onChoose(item.id)}
              onFocus={() => onFocusItem(item.id)}
              {...stylex.props(styles.name, isSelected && styles.nameSelected, stylex.defaultMarker())}
            >
              {isSelected && (
                <m.span
                  layoutId="atlas-pill"
                  transition={reduce ? { duration: 0 } : { duration: 0.22, ease: EASE_OUT }}
                  {...stylex.props(styles.pill)}
                />
              )}
              <span {...stylex.props(styles.nameIndex, isSelected && styles.nameIndexSelected)}>
                {padIndex(AREA_POSITION.get(item.id) ?? 0)}
              </span>
              <span {...stylex.props(styles.nameText, isSelected && styles.nameTextSelected)}>
                {item.title}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export function AtlasVariant() {
  const browser = useSolutionsBrowser();
  const { area, groups, scope, selected, select } = browser;
  const reduce = useReducedMotion();
  const uid = useId();
  const sheetId = `${uid}-sheet`;
  const titleId = `${uid}-title`;
  const matrixRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLElement>(null);
  const [focusId, setFocusId] = useState(selected?.id);
  const grouped = area === "all";
  const columns = grouped ? groups.map((group) => group.items) : flowColumns(scope);
  const rovingId = scope.some((item) => item.id === focusId) ? focusId : selected?.id;
  const currentArea = grouped ? undefined : groups[0];

  const choose = (id: string) => {
    select(id);
    setFocusId(id);
    const sheet = sheetRef.current;
    if (!sheet) return;
    const top = sheet.getBoundingClientRect().top;
    if (top >= HEADER_OFFSET && top <= window.innerHeight - BOTTOM_CLEARANCE) return;
    window.scrollTo({
      top: window.scrollY + top - HEADER_OFFSET - SHEET_GAP,
      behavior: reduce ? "instant" : "smooth",
    });
  };

  const navigate = (event: KeyboardEvent<HTMLDivElement>) => {
    const id = (event.target as HTMLElement).dataset.solutionId;
    if (!id) return;
    const column = columns.findIndex((entries) => entries.some((item) => item.id === id));
    const entries = columns[column];
    if (!entries) return;
    const row = entries.findIndex((item) => item.id === id);
    const across = (offset: number) => {
      const target = columns[column + offset];
      return target?.[Math.min(row, target.length - 1)];
    };
    const moves: Partial<Record<string, () => SolutionItem | undefined>> = {
      ArrowDown: () => entries[row + 1] ?? columns[column + 1]?.[0],
      ArrowUp: () => entries[row - 1] ?? columns[column - 1]?.at(-1),
      ArrowRight: () => across(1),
      ArrowLeft: () => across(-1),
      Home: () => columns[0]?.[0],
      End: () => columns.at(-1)?.at(-1),
    };
    const move = moves[event.key];
    if (!move) return;
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    const next = move();
    if (!next) return;
    setFocusId(next.id);
    matrixRef.current?.querySelector<HTMLElement>(`[data-solution-id="${next.id}"]`)?.focus();
  };

  const listProps = {
    selectedId: selected?.id,
    rovingId,
    sheetId,
    onChoose: choose,
    onFocusItem: setFocusId,
  };

  return (
    <LabSection>
      <AreaChips browser={browser} />
      <LayoutGroup id={`atlas-${area}`}>
        <div
          key={area}
          ref={matrixRef}
          role="group"
          aria-label="应用方案索引"
          onKeyDown={navigate}
          {...stylex.props(styles.matrix, styles.fadeIn)}
        >
          {currentArea ? (
            <section aria-labelledby={`${uid}-${currentArea.id}`}>
              <header {...stylex.props(styles.colHead)}>
                <h3 id={`${uid}-${currentArea.id}`} {...stylex.props(styles.colLabel)}>
                  {currentArea.label}
                </h3>
                <span {...stylex.props(styles.colCount)}>{currentArea.items.length} 款</span>
                <p lang="en" {...stylex.props(styles.colEnglish)}>
                  {currentArea.englishLabel}
                </p>
              </header>
              <div {...stylex.props(styles.flowGrid)}>
                {columns.map((items) => (
                  <NameList key={items[0]?.id} items={items} {...listProps} />
                ))}
              </div>
            </section>
          ) : (
            <div {...stylex.props(styles.areaGrid)}>
              {groups.map((group) => (
                <section
                  key={group.id}
                  aria-labelledby={`${uid}-${group.id}`}
                  {...stylex.props(styles.column)}
                >
                  <header {...stylex.props(styles.colHead)}>
                    <h3 id={`${uid}-${group.id}`} {...stylex.props(styles.colLabel)}>
                      {group.label}
                    </h3>
                    <span {...stylex.props(styles.colCount)}>{group.items.length} 款</span>
                    <p lang="en" {...stylex.props(styles.colEnglish)}>
                      {group.englishLabel}
                    </p>
                  </header>
                  <NameList items={group.items} {...listProps} />
                </section>
              ))}
            </div>
          )}
        </div>
      </LayoutGroup>
      <article
        ref={sheetRef}
        id={sheetId}
        aria-labelledby={titleId}
        {...stylex.props(styles.sheet)}
      >
        {selected && (
          <div key={selected.id} {...stylex.props(styles.fadeIn)}>
            <Sheet item={selected} titleId={titleId} />
          </div>
        )}
      </article>
    </LabSection>
  );
}
