import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { useId, type MouseEvent, type ReactNode } from "react";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { CATALOG_GROUPS, type CatalogGroup } from "../../products-data";
import { REGION_META, splitTitle } from "../shared/derived";

const INK = "#1a1a1a";
const BODY_TEXT = "#4d4d4d";
const MUTED = "#6b6b70";
const STONE = "#f3f3eb";
const STONE_RULE = "#dcdccf";
const BODY_FONT =
  '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif';
const LATIN_FONT = '"Inter Tight", "Noto Sans SC", sans-serif';

const TABLET = "@media (min-width: 768px) and (max-width: 1279.98px)";
const DESKTOP = breakpoints.xl;
const MD = breakpoints.md;
const LG = breakpoints.lg;
const INSET = "min(120px, 8.333vw)";
const HEADER_HEIGHT = 80;
const STICKY_TOP = 112;
const GUTTER = 24;

const INCI_LATIN = /（[^）]*）/g;

const blockId = (groupId: string) => `catalog-${groupId}`;

const styles = stylex.create({
  section: {
    paddingTop: { default: 64, [DESKTOP]: 96 },
    paddingBottom: { default: 72, [DESKTOP]: 112 },
    scrollMarginTop: HEADER_HEIGHT,
    backgroundColor: STONE,
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
  title: {
    margin: 0,
    fontSize: { default: 26, [TABLET]: 28, [DESKTOP]: 32 },
    fontWeight: 400,
    lineHeight: { default: "34px", [TABLET]: "36px", [DESKTOP]: "40px" },
    letterSpacing: "0.04em",
    textWrap: "balance",
    color: INK,
  },

  indexNav: {
    marginTop: { default: 24, [DESKTOP]: 32 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: STONE_RULE,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: STONE_RULE,
  },
  indexList: {
    display: "flex",
    flexWrap: "wrap",
    columnGap: { default: 24, [MD]: 40 },
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  indexLink: {
    display: "inline-flex",
    alignItems: "baseline",
    gap: 6,
    paddingBlock: 10,
    fontSize: 14,
    lineHeight: "20px",
    letterSpacing: "0.04em",
    textDecoration: "none",
    color: { default: BODY_TEXT, ":hover": colors.brandBlue700 },
    transitionProperty: "color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 2,
  },
  indexCount: {
    fontFamily: LATIN_FONT,
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: 0,
    fontVariantNumeric: "tabular-nums",
    color: MUTED,
  },

  blocks: {
    display: "flex",
    flexDirection: "column",
    rowGap: { default: 56, [LG]: 80 },
    marginTop: { default: 40, [DESKTOP]: 56 },
  },
  block: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [LG]: "repeat(12, minmax(0, 1fr))" },
    columnGap: GUTTER,
    rowGap: 20,
    scrollMarginTop: STICKY_TOP,
  },
  head: {
    gridColumn: { default: "1 / -1", [LG]: "1 / 5" },
    alignSelf: "start",
    position: { default: "static", [LG]: "sticky" },
    top: { default: null, [LG]: STICKY_TOP },
    paddingTop: { default: 0, [LG]: 14 },
    paddingInlineEnd: { default: 0, [LG]: GUTTER },
    borderTopWidth: { default: 0, [LG]: 1 },
    borderTopStyle: "solid",
    borderTopColor: INK,
  },
  english: {
    margin: 0,
    fontFamily: LATIN_FONT,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: MUTED,
  },
  heading: {
    margin: 0,
    marginTop: 8,
    fontSize: 20,
    fontWeight: 500,
    lineHeight: "28px",
    letterSpacing: "0.04em",
    textWrap: "balance",
    color: INK,
    outlineStyle: "none",
  },
  count: {
    margin: 0,
    marginTop: 4,
    fontSize: 13,
    lineHeight: "20px",
    color: MUTED,
  },
  countNumber: {
    marginInlineEnd: 4,
    fontFamily: LATIN_FONT,
    fontWeight: 500,
    fontVariantNumeric: "tabular-nums",
  },
  intro: {
    margin: 0,
    marginTop: 16,
    maxWidth: { default: 560, [LG]: "none" },
    fontSize: 14,
    lineHeight: "24px",
    color: BODY_TEXT,
    textWrap: "pretty",
  },

  tableWrap: {
    position: "relative",
    gridColumn: { default: "1 / -1", [LG]: "5 / 13" },
    minWidth: 0,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: INK,
  },
  table: {
    display: { default: "block", [MD]: "table" },
    width: "100%",
    borderCollapse: "collapse",
    tableLayout: "fixed",
  },
  nameColumn: {
    width: "37.5%",
  },
  thead: {
    position: { default: "absolute", [MD]: "static" },
    width: { default: 1, [MD]: "auto" },
    height: { default: 1, [MD]: "auto" },
    overflow: { default: "hidden", [MD]: "visible" },
    clipPath: { default: "inset(50%)", [MD]: "none" },
    whiteSpace: { default: "nowrap", [MD]: "normal" },
  },
  colHead: {
    paddingBlock: 14,
    paddingInline: 0,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: STONE_RULE,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "0.08em",
    textAlign: "start",
    verticalAlign: "bottom",
    color: MUTED,
  },
  colHeadName: {
    paddingInlineEnd: GUTTER,
  },
  colHeadSlash: {
    marginInline: 6,
    color: STONE_RULE,
  },
  tbody: {
    display: { default: "block", [MD]: "table-row-group" },
  },
  row: {
    display: { default: "block", [MD]: "table-row" },
  },
  nameCell: {
    display: { default: "block", [MD]: "table-cell" },
    paddingTop: { default: 16, [MD]: 20 },
    paddingBottom: { default: 0, [MD]: 20 },
    paddingInlineStart: 0,
    paddingInlineEnd: { default: 0, [MD]: GUTTER },
    borderBottomWidth: { default: 0, [MD]: 1 },
    borderBottomStyle: "solid",
    borderBottomColor: STONE_RULE,
    fontWeight: 400,
    textAlign: "start",
    verticalAlign: "top",
  },
  featureCell: {
    display: { default: "block", [MD]: "table-cell" },
    paddingTop: { default: 8, [MD]: 20 },
    paddingBottom: { default: 16, [MD]: 20 },
    paddingInline: 0,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: STONE_RULE,
    fontSize: 14,
    lineHeight: "24px",
    verticalAlign: "top",
    textWrap: "pretty",
    color: BODY_TEXT,
  },
  primary: {
    display: "block",
    fontSize: 16,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.02em",
    color: INK,
  },
  secondary: {
    marginInlineStart: 8,
    fontSize: 13,
    fontWeight: 400,
    letterSpacing: 0,
    color: MUTED,
  },
  inci: {
    display: "block",
    marginTop: 4,
    fontSize: 13,
    lineHeight: "20px",
    color: MUTED,
  },
  keepTogether: {
    whiteSpace: "nowrap",
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

function RegionBlock({ group }: { group: CatalogGroup }) {
  const headingId = useId();
  const meta = REGION_META[group.id];

  return (
    <div id={blockId(group.id)} {...stylex.props(styles.block)}>
      <div {...stylex.props(styles.head)}>
        {meta && (
          <p lang="en" {...stylex.props(styles.english)}>
            {meta.english}
          </p>
        )}
        <h3 id={headingId} tabIndex={-1} {...stylex.props(styles.heading)}>
          {group.label}
        </h3>
        <p {...stylex.props(styles.count)}>
          <span {...stylex.props(styles.countNumber)}>{group.items.length}</span>款原料
        </p>
        {group.intro && <p {...stylex.props(styles.intro)}>{group.intro}</p>}
      </div>
      <div {...stylex.props(styles.tableWrap)}>
        <table aria-labelledby={headingId} {...stylex.props(styles.table)}>
          <colgroup>
            <col {...stylex.props(styles.nameColumn)} />
            <col />
          </colgroup>
          <thead {...stylex.props(styles.thead)}>
            <tr>
              <th scope="col" {...stylex.props(styles.colHead, styles.colHeadName)}>
                <span aria-hidden="true">
                  名称
                  <span aria-hidden="true" {...stylex.props(styles.colHeadSlash)}>
                    /
                  </span>
                  INCI 名称
                </span>
                <span {...stylex.props(styles.srOnly)}>Name / INCI name</span>
              </th>
              <th scope="col" {...stylex.props(styles.colHead)}>
                <span aria-hidden="true">特性&应用</span>
                <span {...stylex.props(styles.srOnly)}>Features & applications</span>
              </th>
            </tr>
          </thead>
          <tbody {...stylex.props(styles.tbody)}>
            {group.items.map((item) => {
              const { primary, secondary } = splitTitle(item.title);
              return (
                <tr key={item.id} {...stylex.props(styles.row)}>
                  <th scope="row" {...stylex.props(styles.nameCell)}>
                    <span {...stylex.props(styles.primary)}>
                      {primary}
                      {secondary && <span {...stylex.props(styles.secondary)}>{secondary}</span>}
                    </span>
                    <span {...stylex.props(styles.inci)}>
                      <Inci text={item.inci} />
                    </span>
                  </th>
                  <td {...stylex.props(styles.featureCell)}>{item.features}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Catalog() {
  const reduce = useReducedMotion();
  const titleId = useId();

  const jumpTo = (event: MouseEvent<HTMLAnchorElement>, groupId: string) => {
    const block = document.getElementById(blockId(groupId));
    if (!block) return;
    event.preventDefault();
    block.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    block.querySelector<HTMLElement>("h3")?.focus({ preventScroll: true });
  };

  return (
    <section id="products-catalog" aria-labelledby={titleId} {...stylex.props(styles.section)}>
      <div {...stylex.props(styles.shell)}>
        <h2 id={titleId} {...stylex.props(styles.title)}>
          产品目录
        </h2>
        <nav aria-label="Catalog sections" {...stylex.props(styles.indexNav)}>
          <ol {...stylex.props(styles.indexList)}>
            {CATALOG_GROUPS.map((group) => (
              <li key={group.id}>
                <a
                  href={`#${blockId(group.id)}`}
                  onClick={(event) => jumpTo(event, group.id)}
                  {...stylex.props(styles.indexLink)}
                >
                  {REGION_META[group.id]?.short ?? group.label}
                  <span {...stylex.props(styles.indexCount)}>
                    {group.items.length}
                    <span {...stylex.props(styles.srOnly)}> ingredients</span>
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div {...stylex.props(styles.blocks)}>
          {CATALOG_GROUPS.map((group) => (
            <RegionBlock key={group.id} group={group} />
          ))}
        </div>
      </div>
    </section>
  );
}
