import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ArrowDown, ArrowUp, ChevronDown, ChevronsUpDown } from "lucide-react";
import { m } from "motion/react";
import { useId, useMemo, useState, type ReactNode } from "react";

import { EASE } from "@/components/prototype/motion-constants";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { FLAT_ITEMS, FORM_LABEL, REGION_META, type FlatItem, type Form } from "../shared/derived";

const GROUND = "#132621";
const ZEBRA = "#182e28";
const ROW_HOVER = "#1f3831";
const TEXT = "#e8f0ec";
const BODY = "#d1ddd6";
const MUTED = "#a7bab1";
const HAIRLINE = "rgba(255, 255, 255, 0.12)";
const STRONG_RULE = "rgba(255, 255, 255, 0.32)";
const CONTROL_BORDER = "rgba(255, 255, 255, 0.24)";
const ACCENT = colors.brandGreen300;
const HOVER = colors.brandBlue300;
const BODY_FONT =
  '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif';
const NUMERAL_FONT = '"Inter Tight", "Noto Sans SC", sans-serif';

const TABLET = "@media (min-width: 768px) and (max-width: 1279.98px)";
const DESKTOP = breakpoints.xl;
const LG = breakpoints.lg;
const INSET = "min(120px, 8.333vw)";
const HEADER_HEIGHT = 80;
const HEAD_ROW = 48;
const ROW_BLEED = 16;

type SortKey = "region" | "name" | "form";
type Direction = "asc" | "desc";

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "region", label: "产地" },
  { key: "name", label: "名称" },
  { key: "form", label: "形态" },
];

const SORT_LABEL: Record<SortKey, string> = { region: "产地", name: "名称", form: "形态" };

const FORM_ORDER = Object.keys(FORM_LABEL) as Form[];
const NAME_COLLATOR = new Intl.Collator("zh-Hans-CN");
const BASE_ORDER = new Map(FLAT_ITEMS.map((item, index) => [item.id, index]));

const baseOrder = (item: FlatItem) => BASE_ORDER.get(item.id) ?? 0;

const primaryCompare: Record<SortKey, (a: FlatItem, b: FlatItem) => number> = {
  region: (a, b) => a.groupIndex - b.groupIndex,
  name: (a, b) => NAME_COLLATOR.compare(a.primary, b.primary),
  form: (a, b) => FORM_ORDER.indexOf(a.traits.form) - FORM_ORDER.indexOf(b.traits.form),
};

const sortItems = (key: SortKey, direction: Direction) => {
  const sign = direction === "asc" ? 1 : -1;
  return [...FLAT_ITEMS].sort(
    (a, b) => sign * primaryCompare[key](a, b) || baseOrder(a) - baseOrder(b),
  );
};

const regionLabel = (item: FlatItem) => REGION_META[item.group.id]?.short ?? item.group.label;

const INCI_LATIN = /（[^）]*）/g;

const styles = stylex.create({
  section: {
    paddingTop: { default: 64, [DESKTOP]: 96 },
    paddingBottom: { default: 72, [DESKTOP]: 112 },
    scrollMarginTop: HEADER_HEIGHT,
    backgroundColor: GROUND,
    color: TEXT,
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
    marginBottom: { default: 32, [DESKTOP]: 48 },
  },
  title: {
    margin: 0,
    fontSize: { default: 26, [TABLET]: 28, [DESKTOP]: 32 },
    fontWeight: 400,
    lineHeight: { default: "34px", [TABLET]: "36px", [DESKTOP]: "40px" },
    letterSpacing: "0.04em",
    color: TEXT,
  },

  toolbar: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    columnGap: 16,
    rowGap: 8,
    minHeight: 40,
    marginBottom: { default: 16, [LG]: 12 },
  },
  count: {
    margin: 0,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.04em",
    color: TEXT,
  },
  countNumber: {
    fontFamily: NUMERAL_FONT,
    fontVariantNumeric: "tabular-nums",
    color: ACCENT,
    marginInline: 2,
  },
  note: {
    order: { default: 2, [LG]: 1 },
    flexBasis: { default: "100%", [LG]: "auto" },
    marginBlock: 0,
    marginInlineStart: { default: 0, [LG]: "auto" },
    fontSize: 12,
    lineHeight: "18px",
    letterSpacing: "0.04em",
    color: MUTED,
  },
  noteMark: {
    marginInlineEnd: 4,
    fontFamily: NUMERAL_FONT,
    color: ACCENT,
  },
  phoneSort: {
    order: 1,
    display: { default: "flex", [LG]: "none" },
    alignItems: "center",
    gap: 8,
    marginInlineStart: "auto",
  },
  sortLabel: {
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.04em",
    color: MUTED,
  },
  selectWrap: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
  },
  select: {
    appearance: "none",
    height: 40,
    margin: 0,
    paddingBlock: 0,
    paddingInlineStart: 12,
    paddingInlineEnd: 32,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: { default: CONTROL_BORDER, ":hover": HOVER },
    borderRadius: 2,
    backgroundColor: "transparent",
    colorScheme: "dark",
    fontFamily: "inherit",
    fontSize: 16,
    lineHeight: "20px",
    color: TEXT,
    cursor: "pointer",
    transitionProperty: "border-color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: HOVER,
    outlineOffset: 2,
  },
  selectIcon: {
    position: "absolute",
    insetInlineEnd: 10,
    pointerEvents: "none",
    color: MUTED,
  },
  directionButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    height: 40,
    paddingBlock: 0,
    paddingInline: 12,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: { default: CONTROL_BORDER, ":hover": HOVER },
    borderRadius: 2,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    fontSize: 14,
    lineHeight: "20px",
    color: TEXT,
    cursor: "pointer",
    transitionProperty: "border-color, background-color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: HOVER,
    outlineOffset: 2,
  },
  directionButtonOn: {
    borderColor: { default: ACCENT, ":hover": HOVER },
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },

  frame: {
    marginInline: -ROW_BLEED,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: HAIRLINE,
  },
  table: {
    display: { default: "block", [LG]: "table" },
    width: "100%",
    borderCollapse: "collapse",
    tableLayout: "fixed",
    fontSize: 14,
    lineHeight: "22px",
  },
  colName: { width: "17%" },
  colRegion: { width: "8%" },
  colForm: { width: "10%" },
  colInci: { width: "28%" },
  colFeatures: { width: "37%" },
  thead: {
    display: { default: "block", [LG]: "table-header-group" },
    position: { default: "absolute", [LG]: "static" },
    width: { default: 1, [LG]: "auto" },
    height: { default: 1, [LG]: "auto" },
    overflow: { default: "hidden", [LG]: "visible" },
    clipPath: { default: "inset(50%)", [LG]: "none" },
    whiteSpace: { default: "nowrap", [LG]: "normal" },
  },
  th: {
    position: { default: "static", [LG]: "sticky" },
    top: HEADER_HEIGHT,
    zIndex: 1,
    height: HEAD_ROW,
    paddingBlock: 0,
    backgroundColor: GROUND,
    boxShadow: `inset 0 1px 0 ${STRONG_RULE}, inset 0 -1px 0 ${HAIRLINE}`,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "0.08em",
    textAlign: "start",
    verticalAlign: "middle",
    color: MUTED,
    paddingInlineStart: { default: 12, ":first-child": ROW_BLEED },
    paddingInlineEnd: { default: 12, ":last-child": ROW_BLEED },
  },
  sortButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    height: HEAD_ROW,
    marginInline: -4,
    paddingBlock: 0,
    paddingInline: 4,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    fontSize: "inherit",
    fontWeight: "inherit",
    lineHeight: "inherit",
    letterSpacing: "inherit",
    color: { default: MUTED, ":hover": HOVER },
    cursor: "pointer",
    transitionProperty: "color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: HOVER,
    outlineOffset: -6,
  },
  sortButtonActive: {
    color: { default: TEXT, ":hover": HOVER },
  },
  glyph: {
    flexShrink: 0,
    opacity: 0.6,
  },
  glyphActive: {
    opacity: 1,
    color: ACCENT,
  },
  headerMark: {
    marginInlineStart: 2,
    fontFamily: NUMERAL_FONT,
    color: ACCENT,
  },

  tbody: {
    display: { default: "block", [LG]: "table-row-group" },
  },
  row: {
    display: { default: "grid", [LG]: "table-row" },
    gridTemplateColumns: "minmax(0, 1fr) auto auto",
    alignItems: "baseline",
    paddingBlock: { default: 16, [LG]: 0 },
    paddingInline: { default: ROW_BLEED, [LG]: 0 },
    backgroundColor: { default: "transparent", ":hover": ROW_HOVER },
    transitionProperty: "background-color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
  },
  rowZebra: {
    backgroundColor: { default: ZEBRA, ":hover": ROW_HOVER },
  },
  cell: {
    display: { default: "block", [LG]: "table-cell" },
    paddingBlock: { default: 0, [LG]: 16 },
    paddingInlineStart: { default: 0, [LG]: 12 },
    paddingInlineEnd: { default: 0, [LG]: 12 },
    verticalAlign: "top",
    textAlign: "start",
    minWidth: 0,
  },
  cellFirst: {
    paddingInlineStart: { default: 0, [LG]: ROW_BLEED },
  },
  cellLast: {
    paddingInlineEnd: { default: 0, [LG]: ROW_BLEED },
  },
  nameCell: {
    gridColumn: 1,
    gridRow: 1,
    paddingInlineEnd: 12,
    fontWeight: 400,
  },
  primary: {
    display: "block",
    fontSize: 15,
    fontWeight: 500,
    lineHeight: "22px",
    letterSpacing: "0.02em",
    color: TEXT,
  },
  secondary: {
    display: "block",
    marginTop: 2,
    fontSize: 13,
    lineHeight: "20px",
    color: MUTED,
  },
  metaCell: {
    gridRow: 1,
    fontSize: { default: 13, [LG]: 14 },
    lineHeight: "22px",
    whiteSpace: { default: "nowrap", [LG]: "normal" },
    color: { default: MUTED, [LG]: BODY },
  },
  regionCell: {
    gridColumn: 2,
  },
  formCell: {
    gridColumn: 3,
  },
  metaDot: {
    display: { default: "inline", [LG]: "none" },
    paddingInline: 6,
    color: MUTED,
  },
  inciCell: {
    gridColumn: "1 / -1",
    order: { default: 1, [LG]: 0 },
    marginTop: { default: 6, [LG]: 0 },
    fontSize: 13,
    lineHeight: "20px",
    color: MUTED,
    overflowWrap: "anywhere",
  },
  inciLabel: {
    display: { default: "inline", [LG]: "none" },
    marginInlineEnd: 8,
    fontFamily: NUMERAL_FONT,
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: "0.08em",
    color: MUTED,
  },
  keepTogether: {
    whiteSpace: { default: "normal", [LG]: "nowrap" },
  },
  featuresCell: {
    gridColumn: "1 / -1",
    marginTop: { default: 8, [LG]: 0 },
    fontSize: 14,
    lineHeight: "22px",
    color: BODY,
    textWrap: "pretty",
  },
  srOnly: {
    position: "absolute",
    width: 1,
    height: 1,
    margin: -1,
    padding: 0,
    overflow: "hidden",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
    borderWidth: 0,
  },
});

function Inci({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(INCI_LATIN)) {
    parts.push(text.slice(last, match.index));
    parts.push(
      <span key={match.index} {...stylex.props(styles.keepTogether)}>
        {match[0]}
      </span>,
    );
    last = match.index + match[0].length;
  }
  parts.push(text.slice(last));
  return <>{parts}</>;
}

function SortHeader({
  sortKey,
  activeKey,
  direction,
  onSort,
  note,
}: {
  sortKey: SortKey;
  activeKey: SortKey;
  direction: Direction;
  onSort: (key: SortKey) => void;
  note?: { id: string };
}) {
  const isActive = sortKey === activeKey;
  const Glyph = !isActive ? ChevronsUpDown : direction === "asc" ? ArrowUp : ArrowDown;
  const ariaSort = !isActive ? undefined : direction === "asc" ? "ascending" : "descending";
  return (
    <th scope="col" aria-sort={ariaSort} {...stylex.props(styles.th)}>
      <button
        type="button"
        onClick={() => onSort(sortKey)}
        aria-describedby={note?.id}
        {...stylex.props(styles.sortButton, isActive && styles.sortButtonActive)}
      >
        <span>
          {SORT_LABEL[sortKey]}
          {note && (
            <span aria-hidden="true" {...stylex.props(styles.headerMark)}>
              *
            </span>
          )}
        </span>
        <Glyph
          size={12}
          strokeWidth={1.5}
          absoluteStrokeWidth
          aria-hidden="true"
          {...stylex.props(styles.glyph, isActive && styles.glyphActive)}
        />
      </button>
    </th>
  );
}

export function Catalog() {
  const reduce = useReducedMotion();
  const titleId = useId();
  const countId = useId();
  const noteId = useId();
  const selectId = useId();
  const [sortKey, setSortKey] = useState<SortKey>("region");
  const [direction, setDirection] = useState<Direction>("asc");
  const [announcement, setAnnouncement] = useState("");
  const [sortVersion, setSortVersion] = useState(0);
  const rows = useMemo(() => sortItems(sortKey, direction), [sortKey, direction]);

  const applySort = (key: SortKey, nextDirection: Direction) => {
    setSortKey(key);
    setDirection(nextDirection);
    setSortVersion((version) => version + 1);
    setAnnouncement(`已按${SORT_LABEL[key]}${nextDirection === "asc" ? "升序" : "降序"}排列`);
  };

  const sortByHeader = (key: SortKey) => {
    const nextDirection = key === sortKey && direction === "asc" ? "desc" : "asc";
    applySort(key, nextDirection);
  };

  return (
    <section id="products-catalog" aria-labelledby={titleId} {...stylex.props(styles.section)}>
      <div {...stylex.props(styles.shell)}>
        <header {...stylex.props(styles.head)}>
          <h2 id={titleId} {...stylex.props(styles.title)}>
            产品目录
          </h2>
        </header>

        <div {...stylex.props(styles.toolbar)}>
          <p id={countId} {...stylex.props(styles.count)}>
            共<span {...stylex.props(styles.countNumber)}>{FLAT_ITEMS.length}</span>款原料
          </p>
          <p id={noteId} {...stylex.props(styles.note)}>
            <span aria-hidden="true" {...stylex.props(styles.noteMark)}>
              *
            </span>
            形态依据原料描述整理
          </p>
          <div {...stylex.props(styles.phoneSort)}>
            <label htmlFor={selectId} {...stylex.props(styles.sortLabel)}>
              排序
            </label>
            <span {...stylex.props(styles.selectWrap)}>
              <select
                id={selectId}
                value={sortKey}
                onChange={(event) => applySort(event.target.value as SortKey, direction)}
                {...stylex.props(styles.select)}
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.key} value={option.key}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                strokeWidth={1.5}
                absoluteStrokeWidth
                aria-hidden="true"
                {...stylex.props(styles.selectIcon)}
              />
            </span>
            <button
              type="button"
              aria-pressed={direction === "desc"}
              onClick={() => applySort(sortKey, direction === "asc" ? "desc" : "asc")}
              {...stylex.props(
                styles.directionButton,
                direction === "desc" && styles.directionButtonOn,
              )}
            >
              {direction === "asc" ? (
                <ArrowUp size={14} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />
              ) : (
                <ArrowDown size={14} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />
              )}
              降序
            </button>
          </div>
        </div>

        <p aria-live="polite" {...stylex.props(styles.srOnly)}>
          {announcement}
        </p>

        <div {...stylex.props(styles.frame)}>
          <table
            aria-labelledby={titleId}
            aria-describedby={countId}
            {...stylex.props(styles.table)}
          >
            <colgroup>
              <col {...stylex.props(styles.colName)} />
              <col {...stylex.props(styles.colRegion)} />
              <col {...stylex.props(styles.colForm)} />
              <col {...stylex.props(styles.colInci)} />
              <col {...stylex.props(styles.colFeatures)} />
            </colgroup>
            <thead {...stylex.props(styles.thead)}>
              <tr>
                <SortHeader
                  sortKey="name"
                  activeKey={sortKey}
                  direction={direction}
                  onSort={sortByHeader}
                />
                <SortHeader
                  sortKey="region"
                  activeKey={sortKey}
                  direction={direction}
                  onSort={sortByHeader}
                />
                <SortHeader
                  sortKey="form"
                  activeKey={sortKey}
                  direction={direction}
                  onSort={sortByHeader}
                  note={{ id: noteId }}
                />
                <th scope="col" {...stylex.props(styles.th)}>
                  INCI 名称
                </th>
                <th scope="col" {...stylex.props(styles.th)}>
                  特性&应用
                </th>
              </tr>
            </thead>
            <m.tbody
              key={`${sortKey}-${direction}`}
              initial={sortVersion === 0 ? false : { opacity: 0.4 }}
              animate={{ opacity: 1 }}
              transition={{ duration: reduce ? 0 : 0.22, ease: EASE }}
              {...stylex.props(styles.tbody)}
            >
              {rows.map((item, index) => (
                <tr key={item.id} {...stylex.props(styles.row, index % 2 === 1 && styles.rowZebra)}>
                  <th scope="row" {...stylex.props(styles.cell, styles.cellFirst, styles.nameCell)}>
                    <span {...stylex.props(styles.primary)}>{item.primary}</span>
                    {item.secondary && (
                      <span {...stylex.props(styles.secondary)}>{item.secondary}</span>
                    )}
                  </th>
                  <td {...stylex.props(styles.cell, styles.metaCell, styles.regionCell)}>
                    {regionLabel(item)}
                  </td>
                  <td {...stylex.props(styles.cell, styles.metaCell, styles.formCell)}>
                    <span aria-hidden="true" {...stylex.props(styles.metaDot)}>
                      ·
                    </span>
                    {FORM_LABEL[item.traits.form]}
                  </td>
                  <td {...stylex.props(styles.cell, styles.inciCell)}>
                    <span aria-hidden="true" {...stylex.props(styles.inciLabel)}>
                      INCI
                    </span>
                    <Inci text={item.inci} />
                  </td>
                  <td {...stylex.props(styles.cell, styles.cellLast, styles.featuresCell)}>
                    {item.features}
                  </td>
                </tr>
              ))}
            </m.tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
