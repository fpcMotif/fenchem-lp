import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ChevronDown, Search, X } from "lucide-react";
import { useId, useMemo, useRef, useState, type KeyboardEvent } from "react";

import { CATALOG_GROUPS } from "../../products-data";
import {
  FLAT_ITEMS,
  FUNCTION_TAGS,
  REGION_META,
  padIndex,
  type FlatItem,
  type FunctionTag,
} from "../shared/derived";
import { Marked } from "./marked";
import { findRanges, toTerms, type Range } from "./marked-values";

const INK = "#1a1a1a";
const BODY_TEXT = "#4d4d4d";
const MUTED = "#6b6b70";
const SKY = "#e7f4ff";
const SKY_LIFT = "#f3f9ff";
const SKY_RULE = "#c6daee";
const FIELD_EDGE = "#7f9ab4";
const CHIP_EDGE = "#adc6de";
const PAPER = colors.paper;
const ACCENT_TEXT = colors.brandGreen800;
const FOCUS = colors.brandBlue700;
const DISABLED_TEXT = "#9a9ea6";
const DISABLED_EDGE = "#d2e2f1";
const BODY_FONT =
  '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif';
const SERIF_FONT = '"Instrument Serif", "Times New Roman", serif';
const NUMERAL_FONT = '"Inter Tight", "Noto Sans SC", sans-serif';

const TABLET = "@media (min-width: 768px) and (max-width: 1279.98px)";
const MID = "@media (min-width: 768px) and (max-width: 1023.98px)";
const HOVER_WIDE = "@media (hover: hover) and (min-width: 1024px)";
const DESKTOP = breakpoints.xl;
const MD = breakpoints.md;
const LG = breakpoints.lg;
const INSET = "min(120px, 8.333vw)";
const HEADER_HEIGHT = 80;
const GUTTER = 24;
const TWELVE = "repeat(12, minmax(0, 1fr))";

const ALL_REGIONS = "all";
const TOTAL = FLAT_ITEMS.length;
const LATIN_IN_INCI = /（([^）]+)）/g;

interface InciSegment {
  text: string;
  latin: boolean;
  start: number;
}

interface CatalogRow {
  item: FlatItem;
  number: string;
  region: string;
  inci: InciSegment[];
  inciText: string;
  fields: string[];
}

const genusCase = (upper: string) => {
  const lower = upper.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
};

const splitInci = (inci: string): InciSegment[] => {
  const pieces: Omit<InciSegment, "start">[] = [];
  let cursor = 0;
  for (const match of inci.matchAll(LATIN_IN_INCI)) {
    const latin = match[1] ?? "";
    const latinStart = match.index + 1;
    pieces.push({ text: inci.slice(cursor, latinStart), latin: false });
    pieces.push({ text: genusCase(latin), latin: true });
    cursor = latinStart + latin.length;
  }
  pieces.push({ text: inci.slice(cursor), latin: false });
  let start = 0;
  return pieces
    .filter((piece) => piece.text.length > 0)
    .map((piece) => {
      const segment = { ...piece, start };
      start += piece.text.length;
      return segment;
    });
};

const ROWS: CatalogRow[] = FLAT_ITEMS.map((item, index) => {
  const inci = splitInci(item.inci);
  const inciText = inci.map((segment) => segment.text).join("");
  return {
    item,
    number: padIndex(index),
    region: REGION_META[item.group.id]?.short ?? item.group.label,
    inci,
    inciText,
    fields: [item.primary, item.secondary ?? "", inciText, item.features].map((field) =>
      field.toLowerCase(),
    ),
  };
});

const REGION_OPTIONS = CATALOG_GROUPS.map((group) => ({
  id: group.id,
  label: REGION_META[group.id]?.short ?? group.label,
  intro: group.intro,
}));

const matchesTerms = (row: CatalogRow, terms: string[]) =>
  terms.every((term) => row.fields.some((field) => field.includes(term)));

const styles = stylex.create({
  section: {
    backgroundColor: SKY,
    color: INK,
    fontFamily: BODY_FONT,
    paddingTop: { default: 64, [DESKTOP]: 96 },
    paddingBottom: { default: 72, [DESKTOP]: 112 },
    scrollMarginTop: HEADER_HEIGHT,
  },
  shell: {
    width: "100%",
    maxWidth: 1440,
    marginInline: "auto",
    boxSizing: "border-box",
    paddingInline: { default: 16, [TABLET]: 40, [DESKTOP]: INSET },
  },
  head: {
    marginBottom: { default: 28, [DESKTOP]: 40 },
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
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
    borderWidth: 0,
  },

  toolbar: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [MD]: TWELVE },
    columnGap: GUTTER,
    rowGap: { default: 12, [LG]: 24 },
    alignItems: "center",
  },
  searchField: {
    position: "relative",
    gridColumn: { default: "1 / -1", [MID]: "1 / 9", [LG]: "1 / 5" },
    gridRow: { default: "auto", [LG]: "1" },
  },
  regionField: {
    position: "relative",
    gridColumn: { default: "1 / -1", [MID]: "9 / 13", [LG]: "5 / 7" },
    gridRow: { default: "auto", [LG]: "1" },
  },
  status: {
    gridColumn: { default: "1 / -1", [LG]: "7 / 13" },
    gridRow: { default: "auto", [LG]: "1" },
    display: "flex",
    flexDirection: { default: "row", [LG]: "row-reverse" },
    alignItems: "center",
    justifyContent: { default: "space-between", [LG]: "flex-start" },
    gap: 24,
    minHeight: 40,
  },
  tagsBlock: {
    gridColumn: "1 / -1",
    gridRow: { default: "auto", [LG]: "2" },
    minWidth: 0,
    marginTop: { default: 8, [LG]: 0 },
  },
  fieldIcon: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    color: MUTED,
    pointerEvents: "none",
  },
  searchIcon: {
    insetInlineStart: 14,
  },
  selectIcon: {
    insetInlineEnd: 14,
  },
  field: {
    boxSizing: "border-box",
    width: "100%",
    height: 44,
    margin: 0,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: { default: FIELD_EDGE, ":hover": FOCUS },
    borderRadius: 2,
    backgroundColor: PAPER,
    fontFamily: "inherit",
    fontSize: { default: 16, [MD]: 15 },
    lineHeight: "24px",
    letterSpacing: "0.02em",
    color: INK,
    appearance: "none",
    transitionProperty: "border-color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: FOCUS,
    outlineOffset: 0,
  },
  searchInput: {
    paddingInlineStart: 42,
    paddingInlineEnd: 44,
    "::placeholder": {
      color: MUTED,
      opacity: 1,
    },
    "::-webkit-search-cancel-button": {
      appearance: "none",
    },
  },
  select: {
    paddingInlineStart: 14,
    paddingInlineEnd: 40,
    cursor: "pointer",
  },
  selectActive: {
    borderColor: { default: INK, ":hover": FOCUS },
  },
  searchClear: {
    position: "absolute",
    top: 2,
    insetInlineEnd: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    padding: 0,
    borderWidth: 0,
    borderRadius: 2,
    backgroundColor: "transparent",
    color: { default: MUTED, ":hover": FOCUS },
    cursor: "pointer",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: FOCUS,
    outlineOffset: -4,
  },

  count: {
    margin: 0,
    fontSize: 13,
    lineHeight: "20px",
    letterSpacing: "0.04em",
    color: BODY_TEXT,
    whiteSpace: "nowrap",
  },
  countNumber: {
    fontFamily: NUMERAL_FONT,
    fontWeight: 500,
    fontVariantNumeric: "tabular-nums",
    letterSpacing: 0,
    color: INK,
  },
  textButton: {
    position: "relative",
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.04em",
    color: { default: INK, ":hover": FOCUS },
    textDecorationLine: "underline",
    textDecorationThickness: 1,
    textDecorationColor: { default: FIELD_EDGE, ":hover": FOCUS },
    textUnderlineOffset: 4,
    cursor: "pointer",
    whiteSpace: "nowrap",
    transitionProperty: "color, text-decoration-color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: FOCUS,
    outlineOffset: 4,
    "::before": {
      content: '""',
      position: "absolute",
      insetBlock: -10,
      insetInline: -8,
    },
  },
  invisible: {
    visibility: "hidden",
  },

  tagsHead: {
    display: "flex",
    alignItems: "baseline",
    flexWrap: "wrap",
    columnGap: 12,
    rowGap: 2,
    margin: 0,
    marginBottom: 8,
  },
  tagsLabel: {
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.04em",
    color: INK,
  },
  tagsNote: {
    fontSize: 12,
    lineHeight: "18px",
    letterSpacing: "0.02em",
    color: MUTED,
  },
  chips: {
    display: "flex",
    flexWrap: { default: "nowrap", [LG]: "wrap" },
    gap: 8,
    marginInline: { default: -16, [MID]: -40, [LG]: 0 },
    paddingInline: { default: 16, [MID]: 40, [LG]: 0 },
    paddingBlock: 4,
    overflowX: { default: "auto", [LG]: "visible" },
    scrollbarWidth: "none",
    scrollPaddingInline: { default: 16, [MID]: 40 },
  },
  chip: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    flexShrink: 0,
    boxSizing: "border-box",
    height: 36,
    margin: 0,
    paddingInline: 12,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: { default: CHIP_EDGE, ":hover": FOCUS },
    borderRadius: 2,
    backgroundColor: PAPER,
    fontFamily: "inherit",
    fontSize: 13,
    fontWeight: 400,
    lineHeight: "20px",
    letterSpacing: "0.04em",
    whiteSpace: "nowrap",
    color: { default: INK, ":hover": FOCUS },
    cursor: "pointer",
    transitionProperty: "color, background-color, border-color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: FOCUS,
    outlineOffset: 2,
    "::before": {
      content: '""',
      position: "absolute",
      insetBlock: -3,
      insetInline: -1,
    },
  },
  chipPressed: {
    borderColor: { default: ACCENT_TEXT, ":hover": FOCUS },
    backgroundColor: { default: ACCENT_TEXT, ":hover": FOCUS },
    color: "#ffffff",
  },
  chipDisabled: {
    borderColor: DISABLED_EDGE,
    backgroundColor: "transparent",
    color: DISABLED_TEXT,
    cursor: "not-allowed",
  },
  chipCount: {
    minWidth: 14,
    fontFamily: NUMERAL_FONT,
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: 0,
    fontVariantNumeric: "tabular-nums",
    color: MUTED,
  },
  chipCountPressed: {
    color: colors.brandGreen100,
  },
  chipCountDisabled: {
    color: "inherit",
  },

  intro: {
    margin: 0,
    marginTop: { default: 20, [LG]: 28 },
    maxWidth: "40em",
    fontSize: 14,
    lineHeight: "24px",
    color: BODY_TEXT,
    textWrap: "pretty",
  },

  table: {
    display: { default: "block", [LG]: "table" },
    width: "100%",
    marginTop: { default: 20, [LG]: 32 },
    borderCollapse: "separate",
    borderSpacing: 0,
    tableLayout: "fixed",
  },
  colName: { width: "25.5%" },
  colRegion: { width: "8.5%" },
  colInci: { width: "25.5%" },
  colFeatures: { width: "auto" },
  thead: {
    position: { default: "absolute", [LG]: "static" },
    display: { default: "block", [LG]: "table-header-group" },
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
    paddingBlock: 12,
    paddingInline: 0,
    paddingInlineEnd: GUTTER,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: INK,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: SKY_RULE,
    backgroundColor: SKY,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "0.08em",
    textAlign: "start",
    color: MUTED,
  },
  thName: {
    paddingInlineStart: 28,
  },
  lastCell: {
    paddingInlineEnd: 0,
  },
  tbody: {
    display: { default: "block", [LG]: "table-row-group" },
    borderTopWidth: { default: 1, [LG]: 0 },
    borderTopStyle: "solid",
    borderTopColor: INK,
  },
  row: {
    display: { default: "grid", [LG]: "table-row" },
    gridTemplateColumns: "minmax(0, 1fr) auto",
    columnGap: 16,
    rowGap: 6,
    paddingBlock: { default: 20, [LG]: 0 },
    borderBottomWidth: { default: 1, [LG]: 0 },
    borderBottomStyle: "solid",
    borderBottomColor: SKY_RULE,
    backgroundColor: {
      default: "transparent",
      [HOVER_WIDE]: { default: "transparent", ":hover": SKY_LIFT },
    },
    transitionProperty: "background-color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
  },
  cell: {
    display: { default: "block", [LG]: "table-cell" },
    minWidth: 0,
    paddingBlock: { default: 0, [LG]: 16 },
    paddingInline: 0,
    paddingInlineEnd: { default: 0, [LG]: GUTTER },
    borderBottomWidth: { default: 0, [LG]: 1 },
    borderBottomStyle: "solid",
    borderBottomColor: SKY_RULE,
    verticalAlign: "top",
    textAlign: "start",
    fontWeight: 400,
  },
  nameCell: {
    gridColumn: "1",
  },
  nameLine: {
    display: "flex",
    alignItems: "baseline",
    minWidth: 0,
  },
  number: {
    flexShrink: 0,
    width: 28,
    fontFamily: NUMERAL_FONT,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.02em",
    fontVariantNumeric: "tabular-nums",
    color: MUTED,
  },
  names: {
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
  },
  primary: {
    fontSize: 15,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.02em",
    color: INK,
  },
  secondary: {
    fontSize: 13,
    lineHeight: "20px",
    letterSpacing: "0.02em",
    color: MUTED,
  },
  regionCell: {
    gridColumn: "2",
    justifySelf: "end",
    paddingTop: { default: 0, [LG]: 17 },
    fontSize: { default: 12, [LG]: 13 },
    lineHeight: { default: "24px", [LG]: "24px" },
    letterSpacing: "0.04em",
    whiteSpace: "nowrap",
    color: { default: MUTED, [LG]: BODY_TEXT },
  },
  inciCell: {
    gridColumn: "1 / -1",
    paddingTop: { default: 0, [LG]: 18 },
    paddingInlineStart: { default: 28, [LG]: 0 },
    fontSize: 13,
    lineHeight: "22px",
    color: BODY_TEXT,
  },
  latin: {
    fontFamily: SERIF_FONT,
    fontStyle: "italic",
    fontSize: "1.16em",
    letterSpacing: "0.01em",
    whiteSpace: "nowrap",
    color: INK,
  },
  featuresCell: {
    gridColumn: "1 / -1",
    paddingInlineStart: { default: 28, [LG]: 0 },
  },
  features: {
    margin: 0,
    fontSize: 14,
    lineHeight: "24px",
    color: BODY_TEXT,
    textWrap: "pretty",
  },
  emptyCell: {
    paddingBlock: { default: 40, [LG]: 56 },
    paddingInlineStart: { default: 0, [LG]: 28 },
  },
  emptyText: {
    margin: 0,
    marginBottom: 12,
    fontSize: 15,
    lineHeight: "24px",
    color: BODY_TEXT,
  },
});

function TableRow({ row, terms }: { row: CatalogRow; terms: string[] }) {
  const { item } = row;
  const inciRanges: Range[] = findRanges(row.inciText, terms);

  return (
    <tr {...stylex.props(styles.row)}>
      <th scope="row" {...stylex.props(styles.cell, styles.nameCell)}>
        <span {...stylex.props(styles.nameLine)}>
          <span {...stylex.props(styles.number)}>{row.number}</span>
          <span {...stylex.props(styles.names)}>
            <span {...stylex.props(styles.primary)}>
              <Marked text={item.primary} ranges={findRanges(item.primary, terms)} />
            </span>
            {item.secondary && (
              <span {...stylex.props(styles.secondary)}>
                <Marked text={item.secondary} ranges={findRanges(item.secondary, terms)} />
              </span>
            )}
          </span>
        </span>
      </th>
      <td {...stylex.props(styles.cell, styles.regionCell)}>{row.region}</td>
      <td {...stylex.props(styles.cell, styles.inciCell)}>
        {row.inci.map((segment) => (
          <span key={segment.start} {...stylex.props(segment.latin && styles.latin)}>
            <Marked text={segment.text} ranges={inciRanges} offset={segment.start} />
          </span>
        ))}
      </td>
      <td {...stylex.props(styles.cell, styles.featuresCell, styles.lastCell)}>
        <p {...stylex.props(styles.features)}>
          <Marked text={item.features} ranges={findRanges(item.features, terms)} />
        </p>
      </td>
    </tr>
  );
}

export function Catalog() {
  const titleId = useId();
  const searchId = useId();
  const regionId = useId();
  const tagsLabelId = useId();
  const tagsNoteId = useId();
  const searchRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState(ALL_REGIONS);
  const [tags, setTags] = useState<FunctionTag[]>([]);

  const terms = useMemo(() => toTerms(query), [query]);
  const scoped = useMemo(
    () =>
      ROWS.filter(
        (row) =>
          (region === ALL_REGIONS || row.item.group.id === region) && matchesTerms(row, terms),
      ),
    [region, terms],
  );
  const visible = useMemo(
    () => scoped.filter((row) => tags.every((tag) => row.item.traits.tags.includes(tag))),
    [scoped, tags],
  );
  const filtering = terms.length > 0 || region !== ALL_REGIONS || tags.length > 0;
  const intro = REGION_OPTIONS.find((option) => option.id === region)?.intro;

  const toggleTag = (tag: FunctionTag) => {
    setTags((current) =>
      current.includes(tag)
        ? current.filter((selected) => selected !== tag)
        : FUNCTION_TAGS.filter((candidate) => candidate === tag || current.includes(candidate)),
    );
  };

  const clearQuery = () => {
    setQuery("");
    searchRef.current?.focus();
  };

  const clearAll = () => {
    setQuery("");
    setRegion(ALL_REGIONS);
    setTags([]);
    searchRef.current?.focus();
  };

  const onSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Escape" || query === "") return;
    event.preventDefault();
    setQuery("");
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
          <search {...stylex.props(styles.searchField)}>
            <label htmlFor={searchId} {...stylex.props(styles.srOnly)}>
              Search ingredients
            </label>
            <Search
              size={18}
              strokeWidth={1.5}
              absoluteStrokeWidth
              aria-hidden="true"
              {...stylex.props(styles.fieldIcon, styles.searchIcon)}
            />
            <input
              ref={searchRef}
              id={searchId}
              type="search"
              value={query}
              placeholder="搜索名称、INCI 或特性"
              autoComplete="off"
              spellCheck={false}
              enterKeyHint="search"
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={onSearchKeyDown}
              {...stylex.props(styles.field, styles.searchInput)}
            />
            {query !== "" && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={clearQuery}
                {...stylex.props(styles.searchClear)}
              >
                <X size={16} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />
              </button>
            )}
          </search>

          <div {...stylex.props(styles.regionField)}>
            <label htmlFor={regionId} {...stylex.props(styles.srOnly)}>
              Origin
            </label>
            <select
              id={regionId}
              value={region}
              onChange={(event) => setRegion(event.target.value)}
              {...stylex.props(
                styles.field,
                styles.select,
                region !== ALL_REGIONS && styles.selectActive,
              )}
            >
              <option value={ALL_REGIONS}>全部产地</option>
              {REGION_OPTIONS.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              strokeWidth={1.5}
              absoluteStrokeWidth
              aria-hidden="true"
              {...stylex.props(styles.fieldIcon, styles.selectIcon)}
            />
          </div>

          <div
            role="group"
            aria-labelledby={tagsLabelId}
            aria-describedby={tagsNoteId}
            {...stylex.props(styles.tagsBlock)}
          >
            <p {...stylex.props(styles.tagsHead)}>
              <span id={tagsLabelId} {...stylex.props(styles.tagsLabel)}>
                功效
              </span>
              <span id={tagsNoteId} {...stylex.props(styles.tagsNote)}>
                功效依据原料描述整理
              </span>
            </p>
            <div {...stylex.props(styles.chips)}>
              {FUNCTION_TAGS.map((tag) => {
                const pressed = tags.includes(tag);
                const count = visible.filter((row) => row.item.traits.tags.includes(tag)).length;
                const disabled = !pressed && count === 0;
                return (
                  <button
                    key={tag}
                    type="button"
                    aria-pressed={pressed}
                    disabled={disabled}
                    onClick={() => toggleTag(tag)}
                    {...stylex.props(
                      styles.chip,
                      pressed && styles.chipPressed,
                      disabled && styles.chipDisabled,
                    )}
                  >
                    <span>{tag}</span>
                    <span
                      {...stylex.props(
                        styles.chipCount,
                        pressed && styles.chipCountPressed,
                        disabled && styles.chipCountDisabled,
                      )}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div {...stylex.props(styles.status)}>
            <p aria-live="polite" {...stylex.props(styles.count)}>
              显示 <span {...stylex.props(styles.countNumber)}>{visible.length}</span> /{" "}
              <span {...stylex.props(styles.countNumber)}>{TOTAL}</span>
            </p>
            <button
              type="button"
              onClick={clearAll}
              {...stylex.props(styles.textButton, !filtering && styles.invisible)}
            >
              清除筛选
            </button>
          </div>
        </div>

        {intro && <p {...stylex.props(styles.intro)}>{intro}</p>}

        <table aria-labelledby={titleId} {...stylex.props(styles.table)}>
          <colgroup>
            <col {...stylex.props(styles.colName)} />
            <col {...stylex.props(styles.colRegion)} />
            <col {...stylex.props(styles.colInci)} />
            <col {...stylex.props(styles.colFeatures)} />
          </colgroup>
          <thead {...stylex.props(styles.thead)}>
            <tr>
              <th scope="col" {...stylex.props(styles.th, styles.thName)}>
                <span aria-hidden="true">名称</span>
                <span {...stylex.props(styles.srOnly)}>Name</span>
              </th>
              <th scope="col" {...stylex.props(styles.th)}>
                <span aria-hidden="true">产地</span>
                <span {...stylex.props(styles.srOnly)}>Origin</span>
              </th>
              <th scope="col" {...stylex.props(styles.th)}>
                <span aria-hidden="true">INCI 名称</span>
                <span {...stylex.props(styles.srOnly)}>INCI name</span>
              </th>
              <th scope="col" {...stylex.props(styles.th, styles.lastCell)}>
                <span aria-hidden="true">{"特性&应用"}</span>
                <span {...stylex.props(styles.srOnly)}>Features & applications</span>
              </th>
            </tr>
          </thead>
          <tbody {...stylex.props(styles.tbody)}>
            {visible.length === 0 ? (
              <tr {...stylex.props(styles.row)}>
                <td colSpan={4} {...stylex.props(styles.cell, styles.lastCell, styles.emptyCell)}>
                  <p {...stylex.props(styles.emptyText)}>没有符合条件的原料</p>
                  <button type="button" onClick={clearAll} {...stylex.props(styles.textButton)}>
                    清除筛选
                  </button>
                </td>
              </tr>
            ) : (
              visible.map((row) => <TableRow key={row.item.id} row={row} terms={terms} />)
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
