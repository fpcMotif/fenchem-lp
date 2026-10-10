import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { useId, type ReactNode } from "react";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { CATALOG_GROUPS, type CatalogGroup, type CatalogItem } from "../../products-data";
import { REGION_META, padIndex, splitTitle } from "../shared/derived";

const INK = "#1a1a1a";
const BODY_TEXT = "#4d4d4d";
const MUTED_LABEL = "#6b6b70";
const GROUND = "#eef6f3";
const HAIRLINE = "#d2e3dc";
const REGION_RULE = "#86a99c";
const ACCENT = colors.brandGreen700;
const BODY_FONT =
  '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif';
const NUMERAL_FONT = '"Inter Tight", "Noto Sans SC", sans-serif';

const TABLET = "@media (min-width: 768px) and (max-width: 1279.98px)";
const DESKTOP = breakpoints.xl;
const LG = breakpoints.lg;
const MD_ONLY = "@media (min-width: 768px) and (max-width: 1023.98px)";
const LG_ONLY = "@media (min-width: 1024px) and (max-width: 1279.98px)";
const INSET = "min(120px, 8.333vw)";
const HEADER_HEIGHT = 80;
const STICKY_TOP = HEADER_HEIGHT + 16;
const INCI_LATIN = /（[^）]*）/g;

const regionLabel = (group: CatalogGroup) => {
  const short = REGION_META[group.id]?.short ?? group.label;
  if (!group.label.startsWith(short)) return { lead: group.label, rest: "" };
  return { lead: short, rest: group.label.slice(short.length) };
};

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
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [LG]: "minmax(0, 1fr) auto" },
    alignItems: "last baseline",
    columnGap: 48,
    rowGap: 20,
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
  lead: {
    margin: 0,
    marginTop: 12,
    maxWidth: 520,
    fontSize: 16,
    lineHeight: "26px",
    color: BODY_TEXT,
    textWrap: "pretty",
  },
  index: {
    display: "flex",
    flexWrap: "wrap",
    columnGap: { default: 20, [LG]: 28 },
    margin: 0,
    marginInline: { default: -4, [LG]: 0 },
    padding: 0,
    listStyleType: "none",
  },
  indexButton: {
    display: "inline-flex",
    alignItems: "baseline",
    gap: 6,
    height: 40,
    paddingBlock: 0,
    paddingInline: { default: 4, [LG]: 0 },
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    fontSize: 14,
    lineHeight: "40px",
    letterSpacing: "0.04em",
    color: { default: INK, ":hover": colors.brandBlue700 },
    cursor: "pointer",
    transitionProperty: "color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 0,
  },
  indexCount: {
    fontFamily: NUMERAL_FONT,
    fontSize: 12,
    fontWeight: 500,
    fontVariantNumeric: "tabular-nums",
    color: MUTED_LABEL,
  },

  table: {
    display: { default: "block", [LG]: "table" },
    width: "100%",
    tableLayout: { default: "auto", [LG]: "fixed" },
    borderCollapse: "separate",
    borderSpacing: 0,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: REGION_RULE,
    borderTopWidth: { default: 2, [LG]: 0 },
    borderTopStyle: "solid",
    borderTopColor: INK,
  },
  col: {
    display: { default: "none", [LG]: "table-column" },
  },
  colRegion: {
    width: { default: "auto", [LG_ONLY]: 104, [DESKTOP]: 128 },
  },
  colName: {
    width: { default: "auto", [LG]: "22%" },
  },
  colInci: {
    width: { default: "auto", [LG]: "27%" },
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
  thead: {
    display: { default: "block", [LG]: "table-header-group" },
    position: { default: "absolute", [LG]: "static" },
    width: { default: 1, [LG]: "auto" },
    height: { default: 1, [LG]: "auto" },
    overflow: { default: "hidden", [LG]: "visible" },
    clipPath: { default: "inset(50%)", [LG]: "none" },
    whiteSpace: { default: "nowrap", [LG]: "normal" },
  },
  headCell: {
    paddingBlock: 12,
    paddingInlineStart: 0,
    paddingInlineEnd: 24,
    borderTopWidth: 2,
    borderTopStyle: "solid",
    borderTopColor: INK,
    textAlign: "start",
    verticalAlign: "bottom",
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "0.08em",
    color: MUTED_LABEL,
  },
  headCellLast: {
    paddingInlineEnd: 0,
  },
  region: {
    display: { default: "block", [LG]: "table-row-group" },
  },

  regionCell: {
    gridArea: "region",
    display: { default: "block", [LG]: "table-cell" },
    padding: 0,
    paddingInlineEnd: { default: 0, [LG]: 16 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: REGION_RULE,
    verticalAlign: "top",
    textAlign: "start",
    fontWeight: "inherit",
    scrollMarginTop: STICKY_TOP,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: -2,
  },
  regionCellFirst: {
    borderTopWidth: { default: 0, [LG]: 1 },
  },
  regionSticky: {
    position: { default: "static", [LG]: "sticky" },
    top: STICKY_TOP,
    display: "flex",
    flexDirection: { default: "row", [LG]: "column" },
    alignItems: { default: "baseline", [LG]: "flex-start" },
    gap: { default: 12, [LG]: 16 },
    paddingTop: { default: 28, [LG]: 20 },
    paddingBottom: { default: 4, [LG]: 24 },
  },
  regionIndex: {
    fontFamily: NUMERAL_FONT,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: ACCENT,
  },
  regionLabel: {
    display: "block",
    minWidth: 0,
    writingMode: { default: "horizontal-tb", [LG]: "vertical-rl" },
    fontSize: { default: 18, [LG]: 20 },
    fontWeight: 500,
    lineHeight: { default: "28px", [LG]: "28px" },
    letterSpacing: { default: "0.04em", [LG]: "0.16em" },
    color: INK,
  },
  regionRest: {
    display: { default: "inline", [LG]: "block" },
    marginBlockStart: { default: 0, [LG]: 2 },
    fontSize: { default: "inherit", [LG]: 13 },
    fontWeight: { default: "inherit", [LG]: 400 },
    lineHeight: { default: "inherit", [LG]: "20px" },
    letterSpacing: { default: "inherit", [LG]: "0.14em" },
    color: { default: "inherit", [LG]: BODY_TEXT },
  },
  regionCount: {
    marginInlineStart: { default: "auto", [LG]: 0 },
    flexShrink: 0,
    fontSize: 13,
    lineHeight: "20px",
    whiteSpace: "nowrap",
    color: MUTED_LABEL,
  },
  numeral: {
    fontFamily: NUMERAL_FONT,
    fontWeight: 500,
    fontVariantNumeric: "tabular-nums",
  },

  introRow: {
    display: { default: "block", [LG]: "table-row" },
  },
  introCell: {
    display: { default: "block", [LG]: "table-cell" },
    paddingTop: { default: 8, [LG]: 20 },
    paddingBottom: { default: 20, [LG]: 22 },
    paddingInline: 0,
    borderTopWidth: { default: 0, [LG]: 1 },
    borderTopStyle: "solid",
    borderTopColor: REGION_RULE,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: HAIRLINE,
    verticalAlign: "top",
  },
  introText: {
    margin: 0,
    maxWidth: "40em",
    fontSize: 15,
    lineHeight: "26px",
    color: BODY_TEXT,
    textWrap: "pretty",
  },

  itemRow: {
    display: { default: "grid", [LG]: "table-row" },
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [MD_ONLY]: "minmax(0, 5fr) minmax(0, 7fr)",
    },
    gridTemplateAreas: {
      default: '"region" "name" "inci" "features"',
      [MD_ONLY]: '"region region" "name features" "inci features"',
    },
    alignContent: "start",
    columnGap: 32,
    paddingBottom: { default: 16, [LG]: 0 },
    borderBottomWidth: { default: 1, [LG]: 0 },
    borderBottomStyle: "solid",
    borderBottomColor: HAIRLINE,
  },
  itemRowLast: {
    borderBottomWidth: 0,
  },
  cell: {
    display: { default: "block", [LG]: "table-cell" },
    paddingInlineStart: 0,
    paddingInlineEnd: { default: 0, [LG]: 24 },
    paddingBottom: { default: 0, [LG]: 18 },
    borderTopWidth: 0,
    borderTopStyle: "solid",
    borderTopColor: REGION_RULE,
    borderBottomWidth: { default: 0, [LG]: 1 },
    borderBottomStyle: "solid",
    borderBottomColor: HAIRLINE,
    verticalAlign: "baseline",
    textAlign: "start",
    fontWeight: "inherit",
  },
  cellFirstRow: {
    borderTopWidth: { default: 0, [LG]: 1 },
  },
  cellLastRow: {
    borderBottomWidth: 0,
  },
  nameCell: {
    gridArea: "name",
    paddingTop: { default: 16, [LG]: 18 },
  },
  inciCell: {
    gridArea: "inci",
    paddingTop: { default: 4, [LG]: 18 },
  },
  featuresCell: {
    gridArea: "features",
    paddingTop: { default: 8, [MD_ONLY]: 16, [LG]: 18 },
    paddingInlineEnd: 0,
  },
  name: {
    display: "block",
    fontSize: { default: 16, [LG]: 15 },
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.02em",
    color: INK,
  },
  nameSecondary: {
    display: "block",
    fontSize: 13,
    fontWeight: 400,
    lineHeight: "20px",
    letterSpacing: "0.02em",
    color: MUTED_LABEL,
  },
  inci: {
    margin: 0,
    fontSize: 13,
    lineHeight: "22px",
    letterSpacing: "0.01em",
    color: MUTED_LABEL,
  },
  keepTogether: {
    whiteSpace: "nowrap",
  },
  features: {
    margin: 0,
    maxWidth: "40em",
    fontSize: 14,
    lineHeight: "24px",
    color: BODY_TEXT,
    textWrap: "pretty",
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

function ItemCells({ item, first, last }: { item: CatalogItem; first: boolean; last: boolean }) {
  const { primary, secondary } = splitTitle(item.title);
  const edges = [first && styles.cellFirstRow, last && styles.cellLastRow];
  return (
    <>
      <th scope="row" {...stylex.props(styles.cell, styles.nameCell, ...edges)}>
        <span {...stylex.props(styles.name)}>{primary}</span>
        {secondary && <span {...stylex.props(styles.nameSecondary)}>{secondary}</span>}
      </th>
      <td {...stylex.props(styles.cell, styles.inciCell, ...edges)}>
        <p {...stylex.props(styles.inci)}>
          <Inci text={item.inci} />
        </p>
      </td>
      <td {...stylex.props(styles.cell, styles.featuresCell, ...edges)}>
        <p {...stylex.props(styles.features)}>{item.features}</p>
      </td>
    </>
  );
}

function RegionHeader({
  group,
  index,
  id,
  rowSpan,
}: {
  group: CatalogGroup;
  index: number;
  id: string;
  rowSpan: number;
}) {
  const { lead, rest } = regionLabel(group);
  return (
    <th
      scope="rowgroup"
      rowSpan={rowSpan}
      id={id}
      tabIndex={-1}
      {...stylex.props(styles.regionCell, index === 0 && styles.regionCellFirst)}
    >
      <span {...stylex.props(styles.regionSticky)}>
        <span aria-hidden="true" {...stylex.props(styles.regionIndex)}>
          {padIndex(index)}
        </span>
        <span {...stylex.props(styles.regionLabel)}>
          {lead}
          {rest && <span {...stylex.props(styles.regionRest)}>{rest}</span>}
        </span>
        <span {...stylex.props(styles.regionCount)}>
          <span {...stylex.props(styles.numeral)}>{group.items.length}</span> 款
        </span>
      </span>
    </th>
  );
}

function RegionRows({ group, index, id }: { group: CatalogGroup; index: number; id: string }) {
  const rowSpan = group.items.length + (group.intro ? 1 : 0);
  const header = <RegionHeader group={group} index={index} id={id} rowSpan={rowSpan} />;
  const lastIndex = group.items.length - 1;

  return (
    <tbody {...stylex.props(styles.region)}>
      {group.intro && (
        <tr {...stylex.props(styles.introRow)}>
          {header}
          <td colSpan={3} {...stylex.props(styles.introCell)}>
            <p {...stylex.props(styles.introText)}>{group.intro}</p>
          </td>
        </tr>
      )}
      {group.items.map((item, itemIndex) => {
        const first = !group.intro && itemIndex === 0;
        const last = itemIndex === lastIndex;
        return (
          <tr key={item.id} {...stylex.props(styles.itemRow, last && styles.itemRowLast)}>
            {first && header}
            <ItemCells item={item} first={first} last={last} />
          </tr>
        );
      })}
    </tbody>
  );
}

export function Catalog() {
  const reduce = useReducedMotion();
  const baseId = useId();
  const titleId = `${baseId}-title`;
  const regionId = (groupId: string) => `${baseId}-${groupId}`;

  const jumpTo = (groupId: string) => {
    const target = document.getElementById(regionId(groupId));
    if (!target) return;
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    target.focus({ preventScroll: true });
  };

  return (
    <section id="products-catalog" aria-labelledby={titleId} {...stylex.props(styles.section)}>
      <div {...stylex.props(styles.shell)}>
        <header {...stylex.props(styles.head)}>
          <div>
            <h2 id={titleId} {...stylex.props(styles.title)}>
              产品目录
            </h2>
            <p {...stylex.props(styles.lead)}>精选个人护理全形态天然油脂与经典功效配方方案</p>
          </div>
          <nav aria-label="Origin index">
            <ul {...stylex.props(styles.index)}>
              {CATALOG_GROUPS.map((group) => (
                <li key={group.id}>
                  <button
                    type="button"
                    onClick={() => jumpTo(group.id)}
                    {...stylex.props(styles.indexButton)}
                  >
                    {REGION_META[group.id]?.short ?? group.label}
                    <span {...stylex.props(styles.indexCount)}>{group.items.length}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        <table aria-labelledby={titleId} {...stylex.props(styles.table)}>
          <colgroup>
            <col {...stylex.props(styles.col, styles.colRegion)} />
            <col {...stylex.props(styles.col, styles.colName)} />
            <col {...stylex.props(styles.col, styles.colInci)} />
            <col {...stylex.props(styles.col)} />
          </colgroup>
          <thead {...stylex.props(styles.thead)}>
            <tr>
              <th scope="col" {...stylex.props(styles.headCell)}>
                <span aria-hidden="true">产地</span>
                <span {...stylex.props(styles.srOnly)}>Origin</span>
              </th>
              <th scope="col" {...stylex.props(styles.headCell)}>
                <span aria-hidden="true">名称</span>
                <span {...stylex.props(styles.srOnly)}>Name</span>
              </th>
              <th scope="col" {...stylex.props(styles.headCell)}>
                <span aria-hidden="true">INCI 名称</span>
                <span {...stylex.props(styles.srOnly)}>INCI name</span>
              </th>
              <th scope="col" {...stylex.props(styles.headCell, styles.headCellLast)}>
                <span aria-hidden="true">特性&应用</span>
                <span {...stylex.props(styles.srOnly)}>Features & applications</span>
              </th>
            </tr>
          </thead>
          {CATALOG_GROUPS.map((group, index) => (
            <RegionRows key={group.id} group={group} index={index} id={regionId(group.id)} />
          ))}
        </table>
      </div>
    </section>
  );
}
