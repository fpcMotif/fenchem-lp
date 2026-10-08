import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { Check, ChevronDown } from "lucide-react";
import { useId, useState } from "react";

import { CATALOG_GROUPS } from "../../products-data";
import { FLAT_ITEMS, FORM_LABEL, REGION_META, padIndex, type FlatItem } from "../shared/derived";

const INK = "#1a1a1a";
const BODY_TEXT = "#4d4d4d";
const MUTED = "#6b6b70";
const GROUND = "#f3f0ee";
const RULE = "#dcd6d1";
const CONTROL_EDGE = "#8c857f";
const LOCKED_FILL = "#a7a19b";
const ACCENT = colors.brandGreen700;
const FOCUS = colors.brandBlue700;
const EASE_OUT_CSS = "cubic-bezier(0.22, 1, 0.36, 1)";
const BODY_FONT =
  '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif';
const SERIF_FONT = '"Instrument Serif", "Times New Roman", serif';
const NUMERAL_FONT = '"Inter Tight", "Noto Sans SC", sans-serif';

const TABLET = "@media (min-width: 768px) and (max-width: 1279.98px)";
const DESKTOP = breakpoints.xl;
const MD = breakpoints.md;
const INSET = "min(120px, 8.333vw)";
const HEADER_HEIGHT = 80;
const NAME_INDENT = 36;
const REFERENCE_WIDTH = 1200;

type ColumnId = "name" | "latin" | "inci" | "features" | "origin" | "form" | "tags";

interface Column {
  id: ColumnId;
  label: string;
  fixedWidth: number | null;
  weight: number;
  minWidth: number;
}

const COLUMNS: Column[] = [
  { id: "name", label: "名称", fixedWidth: null, weight: 0.7, minWidth: 140 },
  { id: "latin", label: "学名", fixedWidth: null, weight: 0.6, minWidth: 132 },
  { id: "inci", label: "INCI 名称", fixedWidth: null, weight: 1, minWidth: 168 },
  { id: "features", label: "特性&应用", fixedWidth: null, weight: 1.8, minWidth: 240 },
  { id: "origin", label: "产地", fixedWidth: 96, weight: 0, minWidth: 80 },
  { id: "form", label: "形态", fixedWidth: 112, weight: 0, minWidth: 96 },
  { id: "tags", label: "功效", fixedWidth: 112, weight: 0, minWidth: 96 },
];

const LOCKED_COLUMN: ColumnId = "name";
const INFERRED_COLUMNS: ColumnId[] = ["form", "tags"];
const DEFAULT_COLUMNS: ReadonlySet<ColumnId> = new Set<ColumnId>([
  "name",
  "inci",
  "features",
  "origin",
]);

const GROUPS = CATALOG_GROUPS.map((group, index) => ({
  group,
  index,
  items: FLAT_ITEMS.filter((item) => item.groupIndex === index),
}));

const columnWidths = (columns: Column[]) => {
  const fixedTotal = columns.reduce((sum, column) => sum + (column.fixedWidth ?? 0), 0);
  const weightTotal = columns.reduce((sum, column) => sum + column.weight, 0);
  const flexibleWidth = REFERENCE_WIDTH - fixedTotal;
  return columns.map((column) => {
    const width = column.fixedWidth ?? (flexibleWidth * column.weight) / weightTotal;
    return `${((width / REFERENCE_WIDTH) * 100).toFixed(3)}%`;
  });
};

const originOf = (item: FlatItem) => {
  const meta = REGION_META[item.group.id];
  return meta && meta.latitude !== null ? meta.short : null;
};

const fadeIn = stylex.keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const styles = stylex.create({
  section: {
    paddingTop: { default: 64, [DESKTOP]: 96 },
    paddingBottom: { default: 72, [DESKTOP]: 112 },
    scrollMarginTop: HEADER_HEIGHT,
    backgroundColor: GROUND,
    color: INK,
    fontFamily: BODY_FONT,
  },
  shell: {
    width: "100%",
    maxWidth: 1440,
    marginInline: "auto",
    boxSizing: "border-box",
    paddingInline: { default: 16, [TABLET]: 40, [DESKTOP]: INSET },
  },
  head: {
    marginBottom: { default: 32, [DESKTOP]: 56 },
  },
  title: {
    margin: 0,
    fontSize: { default: 26, [TABLET]: 28, [DESKTOP]: 32 },
    fontWeight: 400,
    lineHeight: { default: "34px", [TABLET]: "36px", [DESKTOP]: "40px" },
    letterSpacing: "0.04em",
    color: INK,
  },
  srOnly: {
    position: "absolute",
    width: 1,
    height: 1,
    margin: -1,
    padding: 0,
    overflow: "hidden",
    clip: "rect(0 0 0 0)",
    whiteSpace: "nowrap",
    borderWidth: 0,
  },

  controls: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    columnGap: 24,
    rowGap: 4,
    marginBottom: { default: 12, [MD]: 8 },
  },
  disclosure: {
    display: { default: "inline-flex", [MD]: "none" },
    alignItems: "center",
    gap: 8,
    height: 40,
    paddingInline: 14,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: { default: CONTROL_EDGE, ":hover": FOCUS },
    borderRadius: 2,
    backgroundColor: "#ffffff",
    fontFamily: "inherit",
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.04em",
    color: { default: INK, ":hover": FOCUS },
    cursor: "pointer",
    transitionProperty: "color, border-color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: FOCUS,
    outlineOffset: 2,
  },
  disclosureCount: {
    fontFamily: NUMERAL_FONT,
    fontVariantNumeric: "tabular-nums",
  },
  disclosureIcon: {
    display: "block",
    transitionProperty: "transform",
    transitionDuration: { default: "200ms", [breakpoints.motionReduce]: "0ms" },
    transitionTimingFunction: EASE_OUT_CSS,
  },
  disclosureIconOpen: {
    transform: "rotate(180deg)",
  },
  options: {
    display: { default: "none", [MD]: "flex" },
    flexWrap: "wrap",
    alignItems: "center",
    columnGap: 24,
    rowGap: 0,
  },
  optionsOpen: {
    display: { default: "grid", [MD]: "flex" },
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    flexBasis: { default: "100%", [MD]: "auto" },
    paddingBlock: { default: 8, [MD]: 0 },
    animationName: { default: fadeIn, [MD]: "none" },
    animationDuration: { default: "180ms", [breakpoints.motionReduce]: "0ms" },
    animationTimingFunction: "ease-out",
  },
  optionsLegend: {
    display: { default: "none", [MD]: "inline" },
    marginInlineEnd: 4,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.04em",
    color: MUTED,
  },
  option: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    minHeight: 40,
    fontSize: 14,
    lineHeight: "20px",
    letterSpacing: "0.02em",
    color: { default: BODY_TEXT, ":hover": FOCUS },
    cursor: "pointer",
    userSelect: "none",
    transitionProperty: "color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
  },
  optionOn: {
    color: { default: INK, ":hover": FOCUS },
  },
  optionLocked: {
    color: MUTED,
    cursor: "default",
  },
  box: {
    position: "relative",
    display: "grid",
    placeItems: "center",
    flexShrink: 0,
    width: 16,
    height: 16,
  },
  checkbox: {
    appearance: "none",
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    margin: 0,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: {
      default: CONTROL_EDGE,
      [stylex.when.ancestor(":hover")]: FOCUS,
    },
    borderRadius: 3,
    backgroundColor: "#ffffff",
    cursor: "inherit",
    transitionProperty: "background-color, border-color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: FOCUS,
    outlineOffset: 2,
  },
  checkboxOn: {
    borderColor: {
      default: ACCENT,
      [stylex.when.ancestor(":hover")]: FOCUS,
    },
    backgroundColor: {
      default: ACCENT,
      [stylex.when.ancestor(":hover")]: FOCUS,
    },
  },
  checkboxLocked: {
    borderColor: LOCKED_FILL,
    backgroundColor: LOCKED_FILL,
  },
  checkMark: {
    position: "relative",
    display: "block",
    color: "#ffffff",
    pointerEvents: "none",
  },
  note: {
    margin: 0,
    fontSize: 12,
    lineHeight: "20px",
    letterSpacing: "0.02em",
    color: MUTED,
  },

  scroller: {
    overflowX: { default: "visible", [TABLET]: "auto" },
  },
  table: {
    display: { default: "block", [MD]: "table" },
    width: "100%",
    tableLayout: { default: "auto", [MD]: "fixed" },
    borderCollapse: "separate",
    borderSpacing: 0,
    borderTopWidth: { default: 1, [MD]: 0 },
    borderTopStyle: "solid",
    borderTopColor: INK,
  },
  tableMinWidth: (minWidth: number) => ({
    minWidth: { default: 0, [MD]: minWidth },
  }),
  colgroup: {
    display: { default: "none", [MD]: "table-column-group" },
  },
  columnWidth: (width: string) => ({
    width,
  }),
  thead: {
    display: { default: "none", [MD]: "table-header-group" },
  },
  headCell: {
    position: { default: "static", [DESKTOP]: "sticky" },
    top: HEADER_HEIGHT,
    zIndex: 1,
    paddingBlock: 14,
    paddingInlineStart: 0,
    paddingInlineEnd: 20,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: INK,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: RULE,
    backgroundColor: GROUND,
    textAlign: "start",
    verticalAlign: "bottom",
    whiteSpace: "nowrap",
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "0.08em",
    color: MUTED,
    animationName: fadeIn,
    animationDuration: { default: "200ms", [breakpoints.motionReduce]: "0ms" },
    animationTimingFunction: "ease-out",
  },
  headCellName: {
    paddingInlineStart: NAME_INDENT,
  },
  tbody: {
    display: { default: "block", [MD]: "table-row-group" },
  },
  groupCell: {
    display: { default: "block", [MD]: "table-cell" },
    paddingTop: { default: 36, [MD]: 48 },
    paddingBottom: 14,
    paddingInline: 0,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: RULE,
    textAlign: "start",
    verticalAlign: "bottom",
    fontWeight: 400,
  },
  groupCellFirst: {
    paddingTop: { default: 24, [MD]: 32 },
  },
  groupHead: {
    display: "flex",
    alignItems: "baseline",
    gap: 12,
  },
  groupIndex: {
    flexShrink: 0,
    width: 24,
    fontFamily: NUMERAL_FONT,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: ACCENT,
  },
  groupLabel: {
    fontSize: 16,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.04em",
    color: INK,
  },
  groupCount: {
    fontSize: 13,
    lineHeight: "20px",
    fontVariantNumeric: "tabular-nums",
    color: MUTED,
  },
  groupIntro: {
    margin: 0,
    marginTop: 8,
    maxWidth: 600,
    paddingInlineStart: NAME_INDENT,
    fontSize: 14,
    lineHeight: "24px",
    color: BODY_TEXT,
    textWrap: "pretty",
  },
  groupRow: {
    display: { default: "block", [MD]: "table-row" },
  },
  row: {
    display: { default: "block", [MD]: "table-row" },
    paddingBlock: { default: 16, [MD]: 0 },
    borderBottomWidth: { default: 1, [MD]: 0 },
    borderBottomStyle: "solid",
    borderBottomColor: RULE,
  },
  cell: {
    display: { default: "grid", [MD]: "table-cell" },
    gridTemplateColumns: "72px minmax(0, 1fr)",
    columnGap: 12,
    paddingBlock: { default: 4, [MD]: 18 },
    paddingInlineStart: 0,
    paddingInlineEnd: { default: 0, [MD]: 20 },
    borderBottomWidth: { default: 0, [MD]: 1 },
    borderBottomStyle: "solid",
    borderBottomColor: RULE,
    textAlign: "start",
    verticalAlign: "top",
    fontWeight: 400,
    overflowWrap: "anywhere",
    animationName: fadeIn,
    animationDuration: { default: "200ms", [breakpoints.motionReduce]: "0ms" },
    animationTimingFunction: "ease-out",
  },
  nameCell: {
    display: { default: "block", [MD]: "table-cell" },
    paddingBottom: { default: 8, [MD]: 18 },
    paddingInlineStart: { default: 0, [MD]: NAME_INDENT },
  },
  cellLabel: {
    display: { default: "block", [MD]: "none" },
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.04em",
    color: MUTED,
  },
  namePrimary: {
    display: "block",
    fontSize: 15,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.02em",
    color: INK,
  },
  nameSecondary: {
    display: "block",
    fontSize: 13,
    lineHeight: "20px",
    color: MUTED,
  },
  latinList: {
    display: "flex",
    flexDirection: "column",
  },
  latin: {
    fontFamily: SERIF_FONT,
    fontStyle: "italic",
    fontSize: 16,
    lineHeight: "24px",
    color: BODY_TEXT,
  },
  inci: {
    fontSize: 13,
    lineHeight: "24px",
    color: MUTED,
  },
  features: {
    fontSize: 14,
    lineHeight: "24px",
    color: BODY_TEXT,
    textWrap: "pretty",
  },
  plain: {
    fontSize: 14,
    lineHeight: "24px",
    color: BODY_TEXT,
  },
  tagList: {
    display: "flex",
    flexDirection: { default: "row", [MD]: "column" },
    flexWrap: "wrap",
    columnGap: 12,
  },
  dash: {
    fontSize: 14,
    lineHeight: "24px",
    color: MUTED,
  },
});

function Dash() {
  return (
    <span {...stylex.props(styles.dash)}>
      <span aria-hidden="true">—</span>
      <span {...stylex.props(styles.srOnly)}>无</span>
    </span>
  );
}

function CellValue({ column, item }: { column: ColumnId; item: FlatItem }) {
  switch (column) {
    case "name":
      return (
        <>
          <span {...stylex.props(styles.namePrimary)}>{item.primary}</span>
          {item.secondary && <span {...stylex.props(styles.nameSecondary)}>{item.secondary}</span>}
        </>
      );
    case "latin":
      if (item.latin.length === 0) return <Dash />;
      return (
        <span lang="la" {...stylex.props(styles.latinList)}>
          {item.latin.map((name) => (
            <span key={name} {...stylex.props(styles.latin)}>
              {name}
            </span>
          ))}
        </span>
      );
    case "inci":
      return <span {...stylex.props(styles.inci)}>{item.inci}</span>;
    case "features":
      return <span {...stylex.props(styles.features)}>{item.features}</span>;
    case "origin": {
      const origin = originOf(item);
      return origin ? <span {...stylex.props(styles.plain)}>{origin}</span> : <Dash />;
    }
    case "form":
      return <span {...stylex.props(styles.plain)}>{FORM_LABEL[item.traits.form]}</span>;
    case "tags":
      if (item.traits.tags.length === 0) return <Dash />;
      return (
        <span {...stylex.props(styles.plain, styles.tagList)}>
          {item.traits.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </span>
      );
  }
}

function ColumnOption({
  column,
  checked,
  onToggle,
}: {
  column: Column;
  checked: boolean;
  onToggle: () => void;
}) {
  const locked = column.id === LOCKED_COLUMN;
  return (
    <label
      {...stylex.props(
        styles.option,
        checked && styles.optionOn,
        locked && styles.optionLocked,
        stylex.defaultMarker(),
      )}
    >
      <span {...stylex.props(styles.box)}>
        <input
          type="checkbox"
          checked={checked}
          disabled={locked}
          onChange={onToggle}
          {...stylex.props(
            styles.checkbox,
            checked && styles.checkboxOn,
            locked && styles.checkboxLocked,
          )}
        />
        {checked && (
          <Check
            size={12}
            strokeWidth={2.5}
            absoluteStrokeWidth
            aria-hidden="true"
            {...stylex.props(styles.checkMark)}
          />
        )}
      </span>
      {column.label}
    </label>
  );
}

export function Catalog() {
  const titleId = useId();
  const optionsId = useId();
  const legendId = useId();
  const [shownIds, setShownIds] = useState<ReadonlySet<ColumnId>>(DEFAULT_COLUMNS);
  const [optionsOpen, setOptionsOpen] = useState(false);

  const shown = COLUMNS.filter((column) => shownIds.has(column.id));
  const widths = columnWidths(shown);
  const minWidth = shown.reduce((sum, column) => sum + column.minWidth, 0);
  const showsInferred = INFERRED_COLUMNS.some((id) => shownIds.has(id));

  const toggleColumn = (id: ColumnId) => {
    if (id === LOCKED_COLUMN) return;
    setShownIds((previous) => {
      const next = new Set(previous);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section id="products-catalog" aria-labelledby={titleId} {...stylex.props(styles.section)}>
      <div {...stylex.props(styles.shell)}>
        <header {...stylex.props(styles.head)}>
          <h2 id={titleId} {...stylex.props(styles.title)}>
            产品目录
          </h2>
        </header>

        <div {...stylex.props(styles.controls)}>
          <button
            type="button"
            aria-expanded={optionsOpen}
            aria-controls={optionsId}
            onClick={() => setOptionsOpen((open) => !open)}
            {...stylex.props(styles.disclosure)}
          >
            <span>
              显示列 <span {...stylex.props(styles.disclosureCount)}>({shown.length})</span>
            </span>
            <ChevronDown
              size={16}
              strokeWidth={1.5}
              absoluteStrokeWidth
              aria-hidden="true"
              {...stylex.props(styles.disclosureIcon, optionsOpen && styles.disclosureIconOpen)}
            />
          </button>
          <div
            id={optionsId}
            role="group"
            aria-labelledby={legendId}
            {...stylex.props(styles.options, optionsOpen && styles.optionsOpen)}
          >
            <span id={legendId} {...stylex.props(styles.optionsLegend)}>
              显示列
            </span>
            {COLUMNS.map((column) => (
              <ColumnOption
                key={column.id}
                column={column}
                checked={shownIds.has(column.id)}
                onToggle={() => toggleColumn(column.id)}
              />
            ))}
          </div>
          {showsInferred && <p {...stylex.props(styles.note)}>形态、功效依据原料描述整理</p>}
        </div>

        <div {...stylex.props(styles.scroller)}>
          <table
            aria-labelledby={titleId}
            {...stylex.props(styles.table, styles.tableMinWidth(minWidth))}
          >
            <colgroup {...stylex.props(styles.colgroup)}>
              {shown.map((column, index) => (
                <col
                  key={column.id}
                  {...stylex.props(styles.columnWidth(widths[index] ?? "auto"))}
                />
              ))}
            </colgroup>
            <thead {...stylex.props(styles.thead)}>
              <tr>
                {shown.map((column) => (
                  <th
                    key={column.id}
                    scope="col"
                    {...stylex.props(
                      styles.headCell,
                      column.id === LOCKED_COLUMN && styles.headCellName,
                    )}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            {GROUPS.map(({ group, index, items }) => (
              <tbody key={group.id} {...stylex.props(styles.tbody)}>
                <tr {...stylex.props(styles.groupRow)}>
                  <th
                    scope="rowgroup"
                    colSpan={shown.length}
                    {...stylex.props(styles.groupCell, index === 0 && styles.groupCellFirst)}
                  >
                    <span {...stylex.props(styles.groupHead)}>
                      <span aria-hidden="true" {...stylex.props(styles.groupIndex)}>
                        {padIndex(index)}
                      </span>
                      <span {...stylex.props(styles.groupLabel)}>{group.label}</span>
                      <span {...stylex.props(styles.groupCount)}>{items.length} 款原料</span>
                    </span>
                    {group.intro && <p {...stylex.props(styles.groupIntro)}>{group.intro}</p>}
                  </th>
                </tr>
                {items.map((item) => (
                  <tr key={item.id} {...stylex.props(styles.row)}>
                    {shown.map((column) =>
                      column.id === LOCKED_COLUMN ? (
                        <th
                          key={column.id}
                          scope="row"
                          {...stylex.props(styles.cell, styles.nameCell)}
                        >
                          <CellValue column={column.id} item={item} />
                        </th>
                      ) : (
                        <td key={column.id} {...stylex.props(styles.cell)}>
                          <span {...stylex.props(styles.cellLabel)}>{column.label}</span>
                          <span>
                            <CellValue column={column.id} item={item} />
                          </span>
                        </td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </section>
  );
}
