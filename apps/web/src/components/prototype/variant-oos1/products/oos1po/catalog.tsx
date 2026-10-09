import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { useId } from "react";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { CATALOG_GROUPS } from "../../products-data";
import { FLAT_ITEMS, REGION_META, type FlatItem, type ItemTraits } from "../shared/derived";

const INK = "#1a1a1a";
const BODY_TEXT = "#4d4d4d";
const MUTED = "#6b6b70";
const GROUND = "#eff8f5";
const RULE = "#d3e3dc";
const SWATCH_RING = "rgba(26, 26, 26, 0.34)";
const EMPTY_RING = "#9fb3ab";
const BODY_FONT =
  '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif';
const NUMERAL_FONT =
  '"Inter Tight", "Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif';

const TABLET = "@media (min-width: 768px) and (max-width: 1279.98px)";
const DESKTOP = breakpoints.xl;
const MD = breakpoints.md;
const MID = "@media (min-width: 768px) and (max-width: 1023.98px)";
const WIDE = breakpoints.lg;
const INSET = "min(120px, 8.333vw)";
const HEADER_HEIGHT = 80;
const TABLE_HEAD_HEIGHT = 42;

const REFERENCE_NOTE = "色泽为参考";
const TOTAL_ITEMS = FLAT_ITEMS.length;

const GROUP_ROWS = CATALOG_GROUPS.map((group) => ({
  group,
  short: REGION_META[group.id]?.short ?? group.label,
  items: FLAT_ITEMS.filter((item) => item.group.id === group.id),
}));

const GLUED_CLOSE_PAREN = "）⁠";

const desaturate = (hex: string, keep: number) => {
  const value = Number.parseInt(hex.slice(1), 16);
  const red = (value >> 16) & 255;
  const green = (value >> 8) & 255;
  const blue = value & 255;
  const gray = 0.299 * red + 0.587 * green + 0.114 * blue;
  const mix = (channel: number) => Math.round(gray + (channel - gray) * keep);
  return `rgb(${mix(red)} ${mix(green)} ${mix(blue)})`;
};

const dashPattern = (radius: number) => {
  const segment = (2 * Math.PI * radius) / 12;
  return `${(segment * 0.6).toFixed(2)} ${(segment * 0.4).toFixed(2)}`;
};

const styles = stylex.create({
  section: {
    backgroundColor: GROUND,
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
  title: {
    margin: 0,
    fontSize: { default: 26, [TABLET]: 28, [DESKTOP]: 32 },
    fontWeight: 400,
    lineHeight: { default: "34px", [TABLET]: "36px", [DESKTOP]: "40px" },
    letterSpacing: "0.04em",
    color: INK,
  },

  jumpNav: {
    marginTop: { default: 20, [DESKTOP]: 28 },
  },
  jumpList: {
    position: "relative",
    display: "flex",
    flexWrap: { default: "nowrap", [MD]: "wrap" },
    columnGap: { default: 24, [MD]: 32 },
    margin: 0,
    marginInline: { default: -16, [MD]: 0 },
    paddingBlock: 0,
    paddingInline: { default: 16, [MD]: 0 },
    listStyleType: "none",
    overflowX: { default: "auto", [MD]: "visible" },
    scrollbarWidth: "none",
  },
  jumpItem: {
    flexShrink: 0,
  },
  jumpButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    height: 40,
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "20px",
    letterSpacing: "0.04em",
    whiteSpace: "nowrap",
    color: { default: INK, ":hover": colors.brandBlue700 },
    cursor: "pointer",
    textDecorationLine: { default: "none", ":hover": "underline" },
    textDecorationThickness: 1,
    textUnderlineOffset: 6,
    transitionProperty: "color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 2,
  },
  jumpCount: {
    fontFamily: NUMERAL_FONT,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "16px",
    fontVariantNumeric: "tabular-nums",
    color: MUTED,
  },

  table: {
    display: { default: "block", [WIDE]: "table" },
    width: "100%",
    marginTop: { default: 28, [DESKTOP]: 36 },
    borderCollapse: "separate",
    borderSpacing: 0,
    tableLayout: { default: null, [WIDE]: "fixed" },
  },
  caption: {
    display: { default: "block", [WIDE]: "table-caption" },
    captionSide: "top",
    paddingBottom: { default: 4, [WIDE]: 16 },
    textAlign: "start",
  },
  captionLine: {
    display: "block",
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.04em",
    color: INK,
  },
  captionCount: {
    fontFamily: NUMERAL_FONT,
    fontVariantNumeric: "tabular-nums",
    marginInline: 4,
  },
  legend: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    columnGap: 8,
    rowGap: 2,
    marginTop: 4,
    fontSize: 12,
    fontWeight: 400,
    lineHeight: "20px",
    letterSpacing: "0.02em",
    color: MUTED,
  },
  legendKey: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
  },
  legendDot: {
    display: "block",
    flexShrink: 0,
  },
  colTone: { width: 136 },
  colName: { width: "22%" },
  colInci: { width: "27%" },

  head: {
    position: { default: "absolute", [WIDE]: "static" },
    width: { default: 1, [WIDE]: "auto" },
    height: { default: 1, [WIDE]: "auto" },
    overflow: { default: "hidden", [WIDE]: "visible" },
    clipPath: { default: "inset(50%)", [WIDE]: "none" },
    whiteSpace: { default: "nowrap", [WIDE]: "normal" },
  },
  headCell: {
    position: { default: null, [WIDE]: "sticky" },
    top: HEADER_HEIGHT,
    zIndex: 1,
    paddingBlock: 12,
    paddingInlineStart: 0,
    paddingInlineEnd: 24,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: INK,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: RULE,
    backgroundColor: GROUND,
    textAlign: "start",
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "0.08em",
    color: MUTED,
  },
  lastCell: {
    paddingInlineEnd: 0,
  },

  group: {
    display: { default: "block", [WIDE]: "table-row-group" },
  },
  groupRow: {
    display: { default: "block", [WIDE]: "table-row" },
  },
  groupCell: {
    display: { default: "block", [WIDE]: "table-cell" },
    paddingTop: { default: 40, [WIDE]: 48 },
    paddingBottom: 12,
    paddingInline: 0,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: INK,
    textAlign: "start",
    fontWeight: 400,
    scrollMarginTop: {
      default: HEADER_HEIGHT - 16,
      [WIDE]: HEADER_HEIGHT + TABLE_HEAD_HEIGHT - 16,
    },
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 2,
  },
  groupCellFirst: {
    paddingTop: { default: 24, [WIDE]: 32 },
  },
  groupLine: {
    display: "flex",
    alignItems: "baseline",
    gap: 12,
  },
  groupLabel: {
    fontSize: { default: 17, [WIDE]: 18 },
    fontWeight: 500,
    lineHeight: "28px",
    letterSpacing: "0.04em",
    color: INK,
  },
  groupCount: {
    fontFamily: NUMERAL_FONT,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "20px",
    fontVariantNumeric: "tabular-nums",
    letterSpacing: "0.02em",
    color: MUTED,
  },
  groupIntro: {
    margin: 0,
    marginTop: 8,
    marginBottom: 4,
    maxWidth: 560,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "24px",
    color: BODY_TEXT,
    textWrap: "pretty",
  },

  row: {
    display: { default: "grid", [WIDE]: "table-row" },
    gridTemplateColumns: {
      default: "16px minmax(0, 1fr) auto",
      [MID]: "16px minmax(0, 4fr) auto minmax(0, 5fr)",
      [WIDE]: null,
    },
    gridTemplateRows: { default: null, [MID]: "auto 1fr", [WIDE]: null },
    gridTemplateAreas: {
      default: '"swatch name tone" ". inci inci" ". feat feat"',
      [MID]: '"swatch name tone feat" ". inci inci feat"',
      [WIDE]: null,
    },
    columnGap: 12,
    rowGap: 4,
    paddingBlock: { default: 16, [WIDE]: 0 },
    borderBottomWidth: { default: 1, [WIDE]: 0 },
    borderBottomStyle: "solid",
    borderBottomColor: RULE,
  },
  cell: {
    display: { default: "block", [WIDE]: "table-cell" },
    minWidth: 0,
    verticalAlign: "top",
    paddingBlock: { default: 0, [WIDE]: 16 },
    paddingInlineStart: 0,
    paddingInlineEnd: { default: 0, [WIDE]: 24 },
    borderBottomWidth: { default: 0, [WIDE]: 1 },
    borderBottomStyle: "solid",
    borderBottomColor: RULE,
    textAlign: "start",
  },
  toneCell: {
    display: { default: "contents", [WIDE]: "table-cell" },
    whiteSpace: "nowrap",
  },
  swatchSlot: {
    gridArea: "swatch",
    display: "inline-flex",
    alignItems: "center",
    height: 24,
    verticalAlign: "top",
    marginInlineEnd: { default: 0, [WIDE]: 8 },
  },
  toneWord: {
    gridArea: "tone",
    display: "inline-block",
    verticalAlign: "top",
    fontSize: 12,
    fontWeight: 400,
    lineHeight: "24px",
    letterSpacing: "0.02em",
    textAlign: { default: "end", [WIDE]: "start" },
    color: MUTED,
  },
  nameCell: {
    gridArea: "name",
    fontWeight: 400,
  },
  primary: {
    display: "block",
    fontSize: { default: 16, [WIDE]: 15 },
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.02em",
    color: INK,
  },
  secondary: {
    display: "block",
    fontSize: 13,
    fontWeight: 400,
    lineHeight: "20px",
    color: MUTED,
  },
  inciCell: {
    gridArea: "inci",
    paddingTop: { default: 0, [WIDE]: 18 },
    fontSize: 13,
    lineHeight: "22px",
    color: MUTED,
    wordBreak: "keep-all",
    overflowWrap: "anywhere",
    textWrap: "pretty",
  },
  featCell: {
    gridArea: "feat",
    marginTop: { default: 4, [MID]: 0, [WIDE]: 0 },
    paddingInlineStart: { default: 0, [MID]: 12, [WIDE]: 0 },
    fontSize: 14,
    lineHeight: "24px",
    color: BODY_TEXT,
    textWrap: "pretty",
  },
  srOnly: {
    position: "absolute",
    width: 1,
    height: 1,
    overflow: "hidden",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
  },
});

function SwatchGlyph({
  color,
  stated,
  size,
}: {
  color: string | null;
  stated: boolean;
  size: number;
}) {
  const center = size / 2;
  const radius = center - 0.5;
  const fill = color === null ? "none" : stated ? color : desaturate(color, 0.4);
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden="true"
      focusable="false"
      {...stylex.props(styles.legendDot)}
    >
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill={fill}
        stroke={color === null ? EMPTY_RING : SWATCH_RING}
        strokeWidth={1}
        strokeDasharray={color !== null && !stated ? dashPattern(radius) : undefined}
      />
    </svg>
  );
}

function ToneCell({ traits }: { traits: ItemTraits }) {
  const reference = traits.color !== null && !traits.colorStated;
  return (
    <td
      title={reference ? REFERENCE_NOTE : undefined}
      {...stylex.props(styles.cell, styles.toneCell)}
    >
      <span {...stylex.props(styles.swatchSlot)}>
        <SwatchGlyph color={traits.color} stated={traits.colorStated} size={16} />
      </span>
      <span {...stylex.props(styles.toneWord)}>
        {traits.colorWord ?? <span aria-hidden="true">—</span>}
        {traits.colorWord === null && <span {...stylex.props(styles.srOnly)}>未注明</span>}
        {reference && <span {...stylex.props(styles.srOnly)}>，{REFERENCE_NOTE}</span>}
      </span>
    </td>
  );
}

function ItemRow({ item }: { item: FlatItem }) {
  return (
    <tr {...stylex.props(styles.row)}>
      <ToneCell traits={item.traits} />
      <th scope="row" {...stylex.props(styles.cell, styles.nameCell)}>
        <span {...stylex.props(styles.primary)}>{item.primary}</span>
        {item.secondary && <span {...stylex.props(styles.secondary)}>{item.secondary}</span>}
      </th>
      <td {...stylex.props(styles.cell, styles.inciCell)}>
        {item.inci.replaceAll("）", GLUED_CLOSE_PAREN)}
      </td>
      <td {...stylex.props(styles.cell, styles.featCell, styles.lastCell)}>{item.features}</td>
    </tr>
  );
}

export function Catalog() {
  const reduce = useReducedMotion();
  const baseId = useId();
  const titleId = `${baseId}-title`;
  const captionId = `${baseId}-caption`;
  const legendId = `${baseId}-legend`;
  const groupHeadId = (groupId: string) => `${baseId}-group-${groupId}`;

  const jumpTo = (groupId: string) => {
    const target = document.getElementById(groupHeadId(groupId));
    if (!target) return;
    target.focus({ preventScroll: true });
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <section
      id="products-catalog"
      aria-labelledby={titleId}
      lang="zh-CN"
      {...stylex.props(styles.section)}
    >
      <div {...stylex.props(styles.shell)}>
        <h2 id={titleId} {...stylex.props(styles.title)}>
          产品目录
        </h2>
        <nav aria-label="按分组跳转" {...stylex.props(styles.jumpNav)}>
          <ul {...stylex.props(styles.jumpList)}>
            {GROUP_ROWS.map(({ group, short, items }) => (
              <li key={group.id} {...stylex.props(styles.jumpItem)}>
                <button
                  type="button"
                  aria-controls={groupHeadId(group.id)}
                  onClick={() => jumpTo(group.id)}
                  {...stylex.props(styles.jumpButton)}
                >
                  {short}
                  <span {...stylex.props(styles.jumpCount)}>{items.length}</span>
                  <span {...stylex.props(styles.srOnly)}>款</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <table
          aria-labelledby={`${titleId} ${captionId}`}
          aria-describedby={legendId}
          {...stylex.props(styles.table)}
        >
          <caption {...stylex.props(styles.caption)}>
            <span id={captionId} {...stylex.props(styles.captionLine)}>
              全部原料
              <span {...stylex.props(styles.captionCount)}>{TOTAL_ITEMS}</span>款
            </span>
            <span id={legendId} {...stylex.props(styles.legend)}>
              <span {...stylex.props(styles.legendKey)}>
                <SwatchGlyph color="#d9c690" stated size={12} />
                实线：描述中注明的色泽
              </span>
              <span aria-hidden="true">·</span>
              <span {...stylex.props(styles.legendKey)}>
                <SwatchGlyph color="#d9c690" stated={false} size={12} />
                虚线：参考色泽
              </span>
            </span>
          </caption>
          <colgroup>
            <col {...stylex.props(styles.colTone)} />
            <col {...stylex.props(styles.colName)} />
            <col {...stylex.props(styles.colInci)} />
            <col />
          </colgroup>
          <thead {...stylex.props(styles.head)}>
            <tr>
              <th scope="col" {...stylex.props(styles.headCell)}>
                色泽
              </th>
              <th scope="col" {...stylex.props(styles.headCell)}>
                名称
              </th>
              <th scope="col" {...stylex.props(styles.headCell)}>
                INCI 名称
              </th>
              <th scope="col" {...stylex.props(styles.headCell, styles.lastCell)}>
                特性&应用
              </th>
            </tr>
          </thead>
          {GROUP_ROWS.map(({ group, items }, index) => (
            <tbody key={group.id} {...stylex.props(styles.group)}>
              <tr {...stylex.props(styles.groupRow)}>
                <th
                  id={groupHeadId(group.id)}

                  scope="rowgroup"
                  colSpan={4}
                  tabIndex={-1}
                  {...stylex.props(styles.groupCell, index === 0 && styles.groupCellFirst)}
                >
                  <span {...stylex.props(styles.groupLine)}>
                    <span {...stylex.props(styles.groupLabel)}>{group.label}</span>
                    <span {...stylex.props(styles.groupCount)}>{items.length} 款</span>
                  </span>
                  {group.intro && <p {...stylex.props(styles.groupIntro)}>{group.intro}</p>}
                </th>
              </tr>
              {items.map((item) => (
                <ItemRow key={item.id} item={item} />
              ))}
            </tbody>
          ))}
        </table>
      </div>
    </section>
  );
}
