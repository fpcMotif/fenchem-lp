import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { useEffect, useId, useRef, useState } from "react";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { FLAT_ITEMS, REGION_META, type FlatItem } from "../shared/derived";

const INK = "#1a1a1a";
const BODY_TEXT = "#4d4d4d";
const MUTED = "#6b6b70";
const GROUND = "#fff2e4";
const RULE = "#ecd5bd";
const LETTER_OFF = "#c3ae98";
const ACCENT = colors.brandGreen700;
const FOCUS = colors.brandBlue700;
const EASE_OUT_CSS = "cubic-bezier(0.22, 1, 0.36, 1)";
const BODY_FONT =
  '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif';
const SERIF_FONT = '"Instrument Serif", "Times New Roman", serif';
const NUMERAL_FONT =
  '"Inter Tight", "Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif';

const TABLET = "@media (min-width: 768px) and (max-width: 1279.98px)";
const DESKTOP = breakpoints.xl;
const MD = breakpoints.md;
const LG = breakpoints.lg;
const INSET = "min(120px, 8.333vw)";
const HEADER_HEIGHT = 80;
const STRIP_HEIGHT = 48;

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const NO_LATIN = "#";
const NO_LATIN_LABEL = "无植物学名";
const PLACE_GROUPS = new Set(["brazil", "mediterranean", "south-africa", "north-america"]);

interface LetterGroup {
  key: string;
  slug: string;
  items: FlatItem[];
}

const byLatin = (a: FlatItem, b: FlatItem) =>
  (a.latin[0] ?? "").localeCompare(b.latin[0] ?? "", "en") ||
  a.primary.localeCompare(b.primary, "zh-Hans-CN");

const byChineseName = (a: FlatItem, b: FlatItem) =>
  a.primary.localeCompare(b.primary, "zh-Hans-CN");

const buildGroups = (): LetterGroup[] => {
  const named = FLAT_ITEMS.filter((item) => item.latin.length > 0).sort(byLatin);
  const unnamed = FLAT_ITEMS.filter((item) => item.latin.length === 0).sort(byChineseName);
  const groups: LetterGroup[] = [];
  for (const item of named) {
    const key = (item.latin[0] ?? "").charAt(0).toUpperCase();
    const current = groups.at(-1);
    if (current?.key === key) current.items.push(item);
    else groups.push({ key, slug: key.toLowerCase(), items: [item] });
  }
  if (unnamed.length > 0) groups.push({ key: NO_LATIN, slug: "none", items: unnamed });
  return groups;
};

const LETTER_GROUPS = buildGroups();
const FILLED_KEYS = new Set(LETTER_GROUPS.map((group) => group.key));
const STRIP_ENTRIES = [...ALPHABET, NO_LATIN].map((key) => ({
  key,
  filled: FILLED_KEYS.has(key),
}));

const originOf = (item: FlatItem) => REGION_META[item.group.id]?.short ?? item.group.label;

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
  head: {
    marginBottom: { default: 32, [DESKTOP]: 48 },
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
  lead: {
    margin: 0,
    marginTop: 12,
    maxWidth: 520,
    fontSize: 15,
    lineHeight: "24px",
    color: BODY_TEXT,
    textWrap: "pretty",
  },
  leadCount: {
    fontFamily: NUMERAL_FONT,
    fontWeight: 500,
    fontVariantNumeric: "tabular-nums",
    color: INK,
  },

  strip: {
    position: { default: "static", [MD]: "sticky" },
    top: HEADER_HEIGHT,
    zIndex: 2,
    backgroundColor: GROUND,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: INK,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: RULE,
  },
  stripList: {
    display: "grid",
    gridTemplateColumns: { default: "repeat(9, minmax(0, 1fr))", [MD]: "none" },
    gridAutoFlow: { default: "row", [MD]: "column" },
    gridAutoColumns: "minmax(0, 1fr)",
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  letter: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: { default: 40, [MD]: STRIP_HEIGHT - 1 },
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: NUMERAL_FONT,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1,
    letterSpacing: "0.02em",
    color: { default: INK, ":hover": FOCUS },
    cursor: "pointer",
    transitionProperty: "color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: FOCUS,
    outlineOffset: -2,
    "::after": {
      content: '""',
      position: "absolute",
      insetInline: "calc(50% - 8px)",
      bottom: { default: 4, [MD]: -1 },
      height: 2,
      backgroundColor: ACCENT,
      transform: "scaleX(0)",
      transitionProperty: "transform",
      transitionDuration: "240ms",
      transitionTimingFunction: EASE_OUT_CSS,
    },
  },
  letterCurrent: {
    color: { default: ACCENT, ":hover": ACCENT },
    "::after": {
      transform: "scaleX(1)",
    },
  },
  letterOff: {
    color: { default: LETTER_OFF, ":hover": LETTER_OFF },
    cursor: "default",
  },

  table: {
    display: { default: "block", [MD]: "table" },
    width: "100%",
    borderCollapse: "collapse",
    tableLayout: "fixed",
  },
  colLatin: { width: { default: "auto", [MD]: "24%", [DESKTOP]: "22%" } },
  colName: { width: { default: "auto", [MD]: "28%" } },
  colOrigin: { width: { default: "auto", [MD]: "12%", [DESKTOP]: "10%" } },
  colFeatures: { width: "auto" },
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
    display: { default: "block", [MD]: "table-header-group" },
    position: { default: "absolute", [MD]: "static" },
    width: { default: 1, [MD]: "auto" },
    height: { default: 1, [MD]: "auto" },
    overflow: { default: "hidden", [MD]: "visible" },
    clipPath: { default: "inset(50%)", [MD]: "none" },
    whiteSpace: { default: "nowrap", [MD]: "normal" },
  },
  colHead: {
    paddingTop: 24,
    paddingBottom: 12,
    paddingInlineStart: 0,
    paddingInlineEnd: { default: 0, [MD]: 16, [DESKTOP]: 24 },
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: RULE,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "0.08em",
    textAlign: "start",
    verticalAlign: "bottom",
    color: MUTED,
  },
  colHeadLast: {
    paddingInlineEnd: 0,
  },
  tbody: {
    display: { default: "block", [MD]: "table-row-group" },
  },
  groupRow: {
    display: { default: "block", [MD]: "table-row" },
    scrollMarginTop: {
      default: HEADER_HEIGHT + 8,
      [MD]: HEADER_HEIGHT + STRIP_HEIGHT + 8,
    },
  },
  groupCell: {
    display: { default: "block", [MD]: "table-cell" },
    paddingTop: { default: 32, [MD]: 40 },
    paddingBottom: 10,
    paddingInline: 0,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: RULE,
    textAlign: "start",
    fontWeight: 400,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: FOCUS,
    outlineOffset: -2,
  },
  groupCellFirst: {
    paddingTop: { default: 24, [MD]: 28 },
  },
  groupHeading: {
    display: "flex",
    alignItems: "baseline",
    gap: 12,
  },
  groupLetter: {
    minWidth: 20,
    fontFamily: SERIF_FONT,
    fontSize: 28,
    fontWeight: 400,
    lineHeight: "32px",
    color: ACCENT,
  },
  groupLabel: {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.04em",
    color: INK,
  },
  groupCount: {
    fontFamily: NUMERAL_FONT,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: MUTED,
  },

  row: {
    display: { default: "grid", [MD]: "table-row" },
    gridTemplateColumns: "minmax(0, 1fr) auto",
    columnGap: 16,
    paddingBlock: { default: 20, [MD]: 0 },
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: RULE,
  },
  cell: {
    display: { default: "block", [MD]: "table-cell" },
    minWidth: 0,
    paddingBlock: { default: 0, [MD]: 18 },
    paddingInlineStart: 0,
    paddingInlineEnd: { default: 0, [MD]: 16, [DESKTOP]: 24 },
    textAlign: "start",
    verticalAlign: "baseline",
    fontWeight: 400,
  },
  cellLast: {
    paddingInlineEnd: 0,
  },
  latinCell: {
    gridColumn: "1 / -1",
    marginBottom: { default: 6, [MD]: 0 },
  },
  latinCellEmpty: {
    display: { default: "none", [MD]: "table-cell" },
  },
  nameCell: {
    gridColumn: "1",
  },
  originCell: {
    gridColumn: "2",
    justifySelf: "end",
    textAlign: { default: "end", [MD]: "start" },
  },
  featuresCell: {
    gridColumn: "1 / -1",
    marginTop: { default: 10, [MD]: 0 },
  },
  latinHead: {
    display: "block",
    fontFamily: SERIF_FONT,
    fontSize: { default: 18, [LG]: 18 },
    fontStyle: "italic",
    fontWeight: 400,
    lineHeight: "24px",
    letterSpacing: "0.005em",
    color: INK,
  },
  latinMore: {
    display: "block",
    fontFamily: SERIF_FONT,
    fontSize: 15,
    fontStyle: "italic",
    fontWeight: 400,
    lineHeight: "20px",
    color: MUTED,
  },
  latinNone: {
    fontSize: 14,
    lineHeight: "24px",
    color: LETTER_OFF,
  },
  namePrimary: {
    fontSize: 15,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.02em",
    color: INK,
  },
  nameSecondary: {
    marginInlineStart: 8,
    fontSize: 13,
    fontWeight: 400,
    lineHeight: "24px",
    letterSpacing: 0,
    color: MUTED,
  },
  inci: {
    display: "block",
    marginTop: 2,
    fontSize: 13,
    fontWeight: 400,
    lineHeight: "20px",
    color: MUTED,
    overflowWrap: "anywhere",
  },
  origin: {
    fontSize: { default: 13, [MD]: 14 },
    lineHeight: "24px",
    letterSpacing: "0.02em",
    whiteSpace: "nowrap",
    color: BODY_TEXT,
  },
  originCategory: {
    color: MUTED,
  },
  features: {
    margin: 0,
    maxWidth: "34em",
    fontSize: 14,
    lineHeight: "24px",
    color: BODY_TEXT,
    textWrap: "pretty",
  },
});

function GroupHeading({ group }: { group: LetterGroup }) {
  const isUnnamed = group.key === NO_LATIN;
  return (
    <span {...stylex.props(styles.groupHeading)}>
      <span lang={isUnnamed ? undefined : "la"} {...stylex.props(styles.groupLetter)}>
        {group.key}
      </span>
      {isUnnamed && <span {...stylex.props(styles.groupLabel)}>{NO_LATIN_LABEL}</span>}
      <span {...stylex.props(styles.groupCount)}>{group.items.length} 款</span>
    </span>
  );
}

function ItemRow({ item, isPlace }: { item: FlatItem; isPlace: boolean }) {
  const [headword, ...otherLatin] = item.latin;
  return (
    <tr {...stylex.props(styles.row)}>
      <td {...stylex.props(styles.cell, styles.latinCell, !headword && styles.latinCellEmpty)}>
        {headword ? (
          <>
            <span lang="la" {...stylex.props(styles.latinHead)}>
              {headword}
            </span>
            {otherLatin.map((name) => (
              <span key={name} lang="la" {...stylex.props(styles.latinMore)}>
                {name}
              </span>
            ))}
          </>
        ) : (
          <span aria-hidden="true" {...stylex.props(styles.latinNone)}>
            —
          </span>
        )}
      </td>
      <th scope="row" {...stylex.props(styles.cell, styles.nameCell)}>
        <span {...stylex.props(styles.namePrimary)}>{item.primary}</span>
        {item.secondary && <span {...stylex.props(styles.nameSecondary)}>{item.secondary}</span>}
        <span {...stylex.props(styles.inci)}>{item.inci}</span>
      </th>
      <td {...stylex.props(styles.cell, styles.originCell)}>
        <span {...stylex.props(styles.origin, !isPlace && styles.originCategory)}>
          {originOf(item)}
        </span>
      </td>
      <td {...stylex.props(styles.cell, styles.cellLast, styles.featuresCell)}>
        <p {...stylex.props(styles.features)}>{item.features}</p>
      </td>
    </tr>
  );
}

export function Catalog() {
  const reduce = useReducedMotion();
  const titleId = useId();
  const baseId = useId();
  const [current, setCurrent] = useState<string | null>(null);
  const bodyRefs = useRef(new Map<string, HTMLTableSectionElement>());
  const headRefs = useRef(new Map<string, HTMLTableCellElement>());

  const groupRowId = (group: LetterGroup) => `${baseId}-letter-${group.slug}`;

  useEffect(() => {
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const key = entry.target.getAttribute("data-letter");
          if (!key) continue;
          if (entry.isIntersecting) visible.add(key);
          else visible.delete(key);
        }
        setCurrent(LETTER_GROUPS.find((group) => visible.has(group.key))?.key ?? null);
      },
      { rootMargin: `-${HEADER_HEIGHT + STRIP_HEIGHT + 24}px 0px -50% 0px` },
    );
    for (const node of bodyRefs.current.values()) observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const jumpTo = (key: string) => {
    const heading = headRefs.current.get(key);
    const row = heading?.parentElement;
    if (!heading || !row) return;
    heading.focus({ preventScroll: true });
    row.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    setCurrent(key);
  };

  return (
    <section id="products-catalog" aria-labelledby={titleId} {...stylex.props(styles.section)}>
      <div {...stylex.props(styles.shell)}>
        <header {...stylex.props(styles.head)}>
          <h2 id={titleId} {...stylex.props(styles.title)}>
            产品目录
          </h2>
          <p {...stylex.props(styles.lead)}>
            <span {...stylex.props(styles.leadCount)}>{FLAT_ITEMS.length}</span>
            {" 款原料，按植物学名首字母 A–Z 排列；无植物学名者列于末尾。"}
          </p>
        </header>

        <nav aria-label="Jump to botanical names by first letter" {...stylex.props(styles.strip)}>
          <ul {...stylex.props(styles.stripList)}>
            {STRIP_ENTRIES.map(({ key, filled }) => {
              const isCurrent = current === key;
              return (
                <li key={key}>
                  <button
                    type="button"
                    disabled={!filled}
                    aria-label={key === NO_LATIN ? "No botanical name" : undefined}
                    aria-current={isCurrent ? "true" : undefined}
                    onClick={() => jumpTo(key)}
                    {...stylex.props(
                      styles.letter,
                      isCurrent && styles.letterCurrent,
                      !filled && styles.letterOff,
                    )}
                  >
                    {key}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <table aria-labelledby={titleId} {...stylex.props(styles.table)}>
          <colgroup>
            <col {...stylex.props(styles.colLatin)} />
            <col {...stylex.props(styles.colName)} />
            <col {...stylex.props(styles.colOrigin)} />
            <col {...stylex.props(styles.colFeatures)} />
          </colgroup>
          <thead {...stylex.props(styles.thead)}>
            <tr>
              <th scope="col" {...stylex.props(styles.colHead)}>
                <span aria-hidden="true">学名</span>
                <span {...stylex.props(styles.srOnly)}>Botanical name</span>
              </th>
              <th scope="col" {...stylex.props(styles.colHead)}>
                <span aria-hidden="true">名称</span>
                <span {...stylex.props(styles.srOnly)}>Name</span>
              </th>
              <th scope="col" {...stylex.props(styles.colHead)}>
                <span aria-hidden="true">产地</span>
                <span {...stylex.props(styles.srOnly)}>Origin</span>
              </th>
              <th scope="col" {...stylex.props(styles.colHead, styles.colHeadLast)}>
                <span aria-hidden="true">特性&应用</span>
                <span {...stylex.props(styles.srOnly)}>Features & applications</span>
              </th>
            </tr>
          </thead>
          {LETTER_GROUPS.map((group, index) => (
            <tbody
              key={group.key}
              data-letter={group.key}
              ref={(node) => {
                if (node) bodyRefs.current.set(group.key, node);
                else bodyRefs.current.delete(group.key);
              }}
              {...stylex.props(styles.tbody)}
            >
              <tr id={groupRowId(group)} {...stylex.props(styles.groupRow)}>
                <th
                  scope="rowgroup"
                  colSpan={4}
                  tabIndex={-1}
                  ref={(node) => {
                    if (node) headRefs.current.set(group.key, node);
                    else headRefs.current.delete(group.key);
                  }}
                  {...stylex.props(styles.groupCell, index === 0 && styles.groupCellFirst)}
                >
                  <GroupHeading group={group} />
                </th>
              </tr>
              {group.items.map((item) => (
                <ItemRow key={item.id} item={item} isPlace={PLACE_GROUPS.has(item.group.id)} />
              ))}
            </tbody>
          ))}
        </table>
      </div>
    </section>
  );
}
