import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { AnimatePresence, m } from "motion/react";
import { useId, useRef, useState, type KeyboardEvent } from "react";

import { EASE } from "@/components/prototype/motion-constants";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { CATALOG_GROUPS, type CatalogGroup, type CatalogItem } from "../../products-data";
import { REGION_META, inciWithoutLatin, latinNames, padIndex, splitTitle } from "../shared/derived";
import { font, motionCss, tone } from "./tokens.stylex";
import { ui } from "./ui";

const MD = breakpoints.md;
const XL = breakpoints.xl;
const ACCENT = colors.brandGreen700;
const FOCUS = colors.brandBlue700;

const ALL_ID = "all";
const ALL_COLUMNS = 4;
const ORIGIN_REGIONS = new Set(["brazil", "mediterranean", "south-africa", "north-america"]);
const TOTAL_ITEMS = CATALOG_GROUPS.reduce((sum, group) => sum + group.items.length, 0);

interface RegionTab {
  id: string;
  label: string;
  count: number;
}

const TABS: RegionTab[] = [
  { id: ALL_ID, label: "全部", count: TOTAL_ITEMS },
  ...CATALOG_GROUPS.map((group) => ({
    id: group.id,
    label: REGION_META[group.id]?.short ?? group.label,
    count: group.items.length,
  })),
];

const originOf = (group: CatalogGroup) =>
  ORIGIN_REGIONS.has(group.id) ? (REGION_META[group.id]?.short ?? null) : null;

const styles = stylex.create({
  ground: {
    isolation: "isolate",
    backgroundColor: tone.catalogGround,
  },
  head: {
    marginBottom: { default: 24, [XL]: 32 },
  },
  tabBar: {
    position: "sticky",
    top: 80,
    zIndex: 3,
    marginInline: { default: -16, [MD]: 0 },
    backgroundColor: tone.catalogGround,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: tone.catalogRule,
  },
  tabList: {
    display: "flex",
    gap: { default: 24, [MD]: 32, [XL]: 40 },
    paddingInline: { default: 16, [MD]: 0 },
    overflowX: "auto",
    overscrollBehaviorX: "contain",
    scrollbarWidth: "none",
  },
  tab: {
    position: "relative",
    display: "inline-flex",
    alignItems: "baseline",
    gap: 6,
    flexShrink: 0,
    height: 56,
    paddingTop: 19,
    paddingBottom: 0,
    paddingInline: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    fontSize: 15,
    fontWeight: 400,
    lineHeight: "20px",
    letterSpacing: "0.04em",
    whiteSpace: "nowrap",
    color: { default: tone.muted, ":hover": FOCUS, ":active": FOCUS },
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
      insetInline: 0,
      bottom: -1,
      height: 2,
      backgroundColor: ACCENT,
      transform: "scaleX(0)",
      transformOrigin: "left center",
      transitionProperty: "transform",
      transitionDuration: "240ms",
      transitionTimingFunction: motionCss.out,
    },
  },
  tabSelected: {
    color: { default: tone.ink, ":hover": tone.ink, ":active": tone.ink },
    "::after": {
      transform: "scaleX(1)",
    },
  },
  tabCount: {
    fontFamily: font.numeral,
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: "0.02em",
    fontVariantNumeric: "tabular-nums",
    color: tone.muted,
  },
  tabCountSelected: {
    color: ACCENT,
  },
  panel: {
    minHeight: { default: 560, [MD]: 640 },
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: FOCUS,
    outlineOffset: 6,
  },
  table: {
    display: { default: "block", [MD]: "table" },
    width: "100%",
    tableLayout: "fixed",
    borderCollapse: "separate",
    borderSpacing: 0,
  },
  caption: {
    display: { default: "block", [MD]: "table-caption" },
    captionSide: "top",
    paddingTop: { default: 24, [MD]: 32 },
    paddingBottom: { default: 8, [MD]: 24 },
    textAlign: "start",
  },
  captionLine: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "baseline",
    columnGap: 12,
    rowGap: 2,
  },
  captionTitle: {
    fontSize: 18,
    fontWeight: 500,
    lineHeight: "28px",
    letterSpacing: "0.04em",
    color: tone.ink,
  },
  captionCount: {
    fontSize: 13,
    lineHeight: "20px",
    fontVariantNumeric: "tabular-nums",
    color: tone.muted,
  },
  captionIntro: {
    margin: 0,
    marginTop: 12,
    maxWidth: "40em",
    fontSize: 15,
    lineHeight: "28px",
    color: tone.body,
    textWrap: "pretty",
  },
  colName: {
    width: "24%",
  },
  colInci: {
    width: "28%",
  },
  colOrigin: {
    width: "10%",
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
  headCell: {
    position: { default: "static", [MD]: "sticky" },
    top: 136,
    zIndex: 2,
    paddingBlock: 12,
    paddingInlineStart: 0,
    paddingInlineEnd: 32,
    textAlign: "start",
    verticalAlign: "bottom",
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "0.08em",
    color: tone.muted,
    backgroundColor: tone.catalogGround,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.ink,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: tone.catalogRuleStrong,
  },
  headCellName: {
    paddingInlineStart: 36,
  },
  lastCell: {
    paddingInlineEnd: 0,
  },
  body: {
    display: { default: "block", [MD]: "table-row-group" },
  },
  groupRow: {
    display: { default: "block", [MD]: "table-row" },
  },
  groupCell: {
    display: { default: "block", [MD]: "table-cell" },
    paddingTop: { default: 40, [MD]: 48 },
    paddingBottom: 12,
    paddingInline: 0,
    textAlign: "start",
    fontWeight: 400,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: tone.ink,
  },
  groupCellFirst: {
    paddingTop: { default: 16, [MD]: 28 },
  },
  groupLine: {
    display: "flex",
    alignItems: "baseline",
    gap: 12,
  },
  groupIndex: {
    flexShrink: 0,
    width: 24,
    fontFamily: font.numeral,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "24px",
    fontVariantNumeric: "tabular-nums",
    color: ACCENT,
  },
  groupLabel: {
    fontSize: 15,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.04em",
    color: tone.ink,
  },
  groupCount: {
    fontSize: 13,
    lineHeight: "20px",
    fontVariantNumeric: "tabular-nums",
    color: tone.muted,
  },
  row: {
    display: { default: "block", [MD]: "table-row" },
    paddingBlock: { default: 16, [MD]: 0 },
    borderBottomWidth: { default: 1, [MD]: 0 },
    borderBottomStyle: "solid",
    borderBottomColor: tone.catalogRule,
  },
  cell: {
    display: { default: "block", [MD]: "table-cell" },
    paddingTop: { default: 0, [MD]: 18 },
    paddingBottom: { default: 0, [MD]: 18 },
    paddingInlineStart: 0,
    paddingInlineEnd: { default: 0, [MD]: 32 },
    textAlign: "start",
    verticalAlign: "baseline",
    fontWeight: 400,
    borderBottomWidth: { default: 0, [MD]: 1 },
    borderBottomStyle: "solid",
    borderBottomColor: tone.catalogRule,
  },
  dataCell: {
    marginTop: { default: 12, [MD]: 0 },
    paddingInlineStart: { default: 36, [MD]: 0 },
  },
  nameLine: {
    display: "flex",
    alignItems: "baseline",
    gap: 12,
  },
  rowIndex: {
    flexShrink: 0,
    width: 24,
    fontFamily: font.numeral,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "24px",
    fontVariantNumeric: "tabular-nums",
    color: tone.muted,
  },
  names: {
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
  },
  primary: {
    fontSize: 16,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.02em",
    color: tone.ink,
  },
  secondary: {
    fontSize: 13,
    lineHeight: "20px",
    color: tone.muted,
  },
  stackLabel: {
    display: { default: "block", [MD]: "none" },
    marginBottom: 2,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.06em",
    color: tone.muted,
  },
  inci: {
    display: "block",
    fontSize: 14,
    lineHeight: "24px",
    color: tone.body,
    textWrap: "pretty",
  },
  latin: {
    display: "block",
    marginTop: 2,
    fontFamily: font.serif,
    fontStyle: "italic",
    fontSize: 15,
    lineHeight: "22px",
    color: tone.muted,
    textWrap: "pretty",
  },
  features: {
    display: "block",
    fontSize: 14,
    lineHeight: "24px",
    color: tone.body,
    textWrap: "pretty",
  },
  origin: {
    fontSize: 14,
    lineHeight: "24px",
    color: tone.body,
  },
  originMissing: {
    color: tone.muted,
  },
});

function ItemRow({
  item,
  index,
  origin,
  showOrigin,
}: {
  item: CatalogItem;
  index: number;
  origin: string | null;
  showOrigin: boolean;
}) {
  const { primary, secondary } = splitTitle(item.title);
  const latin = latinNames(item.inci);
  return (
    <tr {...stylex.props(styles.row)}>
      <th scope="row" {...stylex.props(styles.cell)}>
        <span {...stylex.props(styles.nameLine)}>
          <span {...stylex.props(styles.rowIndex)}>{padIndex(index)}</span>
          <span {...stylex.props(styles.names)}>
            <span {...stylex.props(styles.primary)}>{primary}</span>
            {secondary && <span {...stylex.props(styles.secondary)}>{secondary}</span>}
          </span>
        </span>
      </th>
      <td {...stylex.props(styles.cell, styles.dataCell)}>
        <span aria-hidden="true" {...stylex.props(styles.stackLabel)}>
          INCI 名称
        </span>
        <span {...stylex.props(styles.inci)}>{inciWithoutLatin(item.inci)}</span>
        {latin.length > 0 && (
          <span lang="la" {...stylex.props(styles.latin)}>
            {latin.join(", ")}
          </span>
        )}
      </td>
      <td {...stylex.props(styles.cell, styles.dataCell, !showOrigin && styles.lastCell)}>
        <span aria-hidden="true" {...stylex.props(styles.stackLabel)}>
          特性&应用
        </span>
        <span {...stylex.props(styles.features)}>{item.features}</span>
      </td>
      {showOrigin && (
        <td {...stylex.props(styles.cell, styles.dataCell, styles.lastCell)}>
          <span aria-hidden="true" {...stylex.props(styles.stackLabel)}>
            产地
          </span>
          <span {...stylex.props(styles.origin, origin === null && styles.originMissing)}>
            {origin ?? "—"}
          </span>
        </td>
      )}
    </tr>
  );
}

function TableContent({ tabId, reduce }: { tabId: string; reduce: boolean }) {
  const showAll = tabId === ALL_ID;
  const groups = showAll ? CATALOG_GROUPS : CATALOG_GROUPS.filter((group) => group.id === tabId);
  const single = showAll ? null : (groups[0] ?? null);
  const fade = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: reduce ? 0 : 0.2, ease: EASE } },
    exit: { opacity: 0, transition: { duration: reduce ? 0 : 0.1, ease: EASE } },
  };

  return (
    <>
      <caption {...stylex.props(styles.caption)}>
        <m.div {...fade}>
          <div {...stylex.props(styles.captionLine)}>
            <span {...stylex.props(styles.captionTitle)}>{single ? single.label : "全部原料"}</span>
            <span {...stylex.props(styles.captionCount)}>
              {single ? single.items.length : TOTAL_ITEMS} 款
            </span>
          </div>
          {single?.intro && <p {...stylex.props(styles.captionIntro)}>{single.intro}</p>}
        </m.div>
      </caption>
      <colgroup>
        <col {...stylex.props(styles.colName)} />
        <col {...stylex.props(styles.colInci)} />
        <col />
        {showAll && <col {...stylex.props(styles.colOrigin)} />}
      </colgroup>
      <thead {...stylex.props(styles.thead)}>
        <tr>
          <th scope="col" {...stylex.props(styles.headCell, styles.headCellName)}>
            名称
          </th>
          <th scope="col" {...stylex.props(styles.headCell)}>
            INCI 名称
          </th>
          <th scope="col" {...stylex.props(styles.headCell, !showAll && styles.lastCell)}>
            特性&应用
          </th>
          {showAll && (
            <th scope="col" {...stylex.props(styles.headCell, styles.lastCell)}>
              产地
            </th>
          )}
        </tr>
      </thead>
      {groups.map((group, groupIndex) => (
        <m.tbody key={group.id} {...fade} {...stylex.props(styles.body)}>
          {showAll && (
            <tr {...stylex.props(styles.groupRow)}>
              <th
                scope="rowgroup"
                colSpan={ALL_COLUMNS}
                {...stylex.props(styles.groupCell, groupIndex === 0 && styles.groupCellFirst)}
              >
                <span {...stylex.props(styles.groupLine)}>
                  <span {...stylex.props(styles.groupIndex)}>{padIndex(groupIndex)}</span>
                  <span {...stylex.props(styles.groupLabel)}>{group.label}</span>
                  <span {...stylex.props(styles.groupCount)}>{group.items.length} 款</span>
                </span>
              </th>
            </tr>
          )}
          {group.items.map((item, index) => (
            <ItemRow
              key={item.id}
              item={item}
              index={index}
              origin={originOf(group)}
              showOrigin={showAll}
            />
          ))}
        </m.tbody>
      ))}
    </>
  );
}

export function Catalog() {
  const reduce = useReducedMotion();
  const baseId = useId();
  const titleId = `${baseId}-title`;
  const panelId = `${baseId}-panel`;
  const tabDomId = (id: string) => `${baseId}-tab-${id}`;
  const [selected, setSelected] = useState<string>(ALL_ID);
  const barRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (id: string) => {
    if (id === selected) return;
    const bar = barRef.current;
    const panel = panelRef.current;
    if (bar && panel) {
      const overlap = bar.getBoundingClientRect().bottom - panel.getBoundingClientRect().top;
      if (overlap > 0) window.scrollBy({ top: -overlap, behavior: "instant" });
    }
    setSelected(id);
  };

  const onTabKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const current = TABS.findIndex((tab) => tab.id === selected);
    const last = TABS.length - 1;
    const next =
      event.key === "ArrowRight"
        ? (current + 1) % TABS.length
        : event.key === "ArrowLeft"
          ? (current - 1 + TABS.length) % TABS.length
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : -1;
    const target = TABS[next];
    if (!target) return;
    event.preventDefault();
    select(target.id);
    tabRefs.current[next]?.focus();
  };

  return (
    <section
      id="products-catalog"
      aria-labelledby={titleId}
      {...stylex.props(ui.section, styles.ground)}
    >
      <div {...stylex.props(ui.shell)}>
        <header {...stylex.props(styles.head)}>
          <h2 id={titleId} {...stylex.props(ui.title)}>
            产品目录
          </h2>
        </header>
        <div ref={barRef} {...stylex.props(styles.tabBar)}>
          <div
            role="tablist"
            aria-label="按产区筛选"
            onKeyDown={onTabKeyDown}
            {...stylex.props(styles.tabList)}
          >
            {TABS.map((tab, index) => {
              const isSelected = tab.id === selected;
              return (
                <button
                  key={tab.id}
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  type="button"
                  role="tab"
                  id={tabDomId(tab.id)}
                  aria-selected={isSelected}
                  aria-controls={panelId}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => select(tab.id)}
                  {...stylex.props(styles.tab, isSelected && styles.tabSelected)}
                >
                  {tab.label}
                  <span {...stylex.props(styles.tabCount, isSelected && styles.tabCountSelected)}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        <div
          ref={panelRef}
          role="tabpanel"
          id={panelId}
          aria-labelledby={tabDomId(selected)}
          tabIndex={0}
          {...stylex.props(styles.panel)}
        >
          <table {...stylex.props(styles.table)}>
            <AnimatePresence mode="wait" initial={false}>
              <TableContent key={selected} tabId={selected} reduce={reduce} />
            </AnimatePresence>
          </table>
        </div>
      </div>
    </section>
  );
}
