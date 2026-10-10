import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { CATALOG_GROUPS, type CatalogGroup, type CatalogItem } from "../../products-data";
import { REGION_META, padIndex, splitTitle } from "../shared/derived";
import { catalogRowId, useFlashedCatalogItem } from "./catalog-flash";
import { bp, face, tone } from "./tokens.stylex";

const HEADER_HEIGHT = 80;
const RAIL_TOP = HEADER_HEIGHT + 32;
const BAR_HEIGHT = 48;
const SPY_MARGIN = "-160px 0px -50% 0px";
const HOLD_RELEASE_MS = 1200;
const INSET = "min(120px, 8.333vw)";
const TWELVE = "repeat(12, minmax(0, 1fr))";
const EASE_CSS = "cubic-bezier(0.22, 1, 0.36, 1)";
const INCI_LATIN = /（[^）]*）/g;

const regionId = (groupId: string) => `oos1pc-region-${groupId}`;
const regionTitleId = (groupId: string) => `oos1pc-region-${groupId}-title`;
const regionIntroId = (groupId: string) => `oos1pc-region-${groupId}-intro`;

const REGION_IDS = CATALOG_GROUPS.map((group) => regionId(group.id));

const styles = stylex.create({
  section: {
    backgroundColor: tone.cream,
    color: tone.ink,
    fontFamily: face.sans,
    paddingTop: { default: 64, [bp.wide]: 96 },
    paddingBottom: { default: 72, [bp.wide]: 112 },
    scrollMarginTop: HEADER_HEIGHT,
  },
  shell: {
    width: "100%",
    maxWidth: 1440,
    marginInline: "auto",
    boxSizing: "border-box",
    paddingInline: { default: 16, [bp.tablet]: 40, [bp.wide]: INSET },
  },
  head: {
    marginBottom: { default: 32, [bp.wide]: 56 },
  },
  title: {
    margin: 0,
    fontSize: { default: 26, [bp.tablet]: 28, [bp.wide]: 32 },
    fontWeight: 400,
    lineHeight: { default: "34px", [bp.tablet]: "36px", [bp.wide]: "40px" },
    letterSpacing: "0.04em",
    color: tone.ink,
  },
  layout: {
    display: { default: "block", [bp.desktop]: "grid" },
    gridTemplateColumns: TWELVE,
    columnGap: 24,
    alignItems: "start",
  },

  rail: {
    position: "sticky",
    top: { default: HEADER_HEIGHT, [bp.desktop]: RAIL_TOP },
    zIndex: 1,
    gridColumn: "1 / 4",
    marginInline: { default: -16, [bp.tabletNarrow]: -40, [bp.desktop]: 0 },
    marginBottom: { default: 32, [bp.desktop]: 0 },
    backgroundColor: { default: tone.cream, [bp.desktop]: "transparent" },
    borderBottomWidth: { default: 1, [bp.desktop]: 0 },
    borderBottomStyle: "solid",
    borderBottomColor: tone.creamRule,
  },
  railList: {
    position: "relative",
    display: "flex",
    flexDirection: { default: "row", [bp.desktop]: "column" },
    gap: { default: 24, [bp.desktop]: 0 },
    margin: 0,
    paddingBlock: 0,
    paddingInline: { default: 16, [bp.tabletNarrow]: 40, [bp.desktop]: 0 },
    listStyleType: "none",
    overflowX: { default: "auto", [bp.desktop]: "visible" },
    scrollbarWidth: "none",
    borderTopWidth: { default: 0, [bp.desktop]: 1 },
    borderTopStyle: "solid",
    borderTopColor: tone.ink,
  },
  railItem: {
    flexShrink: 0,
    borderBottomWidth: { default: 0, [bp.desktop]: 1 },
    borderBottomStyle: "solid",
    borderBottomColor: tone.creamRule,
  },
  railButton: {
    position: "relative",
    display: { default: "inline-flex", [bp.desktop]: "grid" },
    gridTemplateColumns: "24px minmax(0, 1fr) auto",
    alignItems: { default: "center", [bp.desktop]: "baseline" },
    columnGap: { default: 6, [bp.desktop]: 12 },
    width: { default: "auto", [bp.desktop]: "100%" },
    height: { default: BAR_HEIGHT, [bp.desktop]: "auto" },
    minHeight: 48,
    paddingBlock: { default: 0, [bp.desktop]: 12 },
    paddingInline: { default: 0, [bp.desktop]: 12 },
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    textAlign: "start",
    whiteSpace: { default: "nowrap", [bp.desktop]: "normal" },
    color: { default: tone.body, ":hover": colors.brandBlue700 },
    cursor: "pointer",
    transitionProperty: "color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: -2,
    "::after": {
      content: '""',
      position: "absolute",
      insetInlineStart: 0,
      insetInlineEnd: { default: 0, [bp.desktop]: "auto" },
      top: { default: "auto", [bp.desktop]: 0 },
      bottom: 0,
      width: { default: "auto", [bp.desktop]: 2 },
      height: { default: 2, [bp.desktop]: "auto" },
      backgroundColor: colors.brandGreen700,
      transform: { default: "scaleX(0)", [bp.desktop]: "scaleY(0)" },
      transformOrigin: { default: "left center", [bp.desktop]: "center top" },
      transitionProperty: "transform",
      transitionDuration: { default: "0ms", [bp.motionOk]: "240ms" },
      transitionTimingFunction: EASE_CSS,
    },
  },
  railButtonActive: {
    color: { default: tone.ink, ":hover": tone.ink },
    "::after": {
      transform: "none",
    },
  },
  railIndex: {
    display: { default: "none", [bp.desktop]: "inline" },
    fontFamily: face.numeral,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: tone.muted,
  },
  railIndexActive: {
    color: colors.brandGreen700,
  },
  railLabelFull: {
    display: { default: "none", [bp.desktop]: "inline" },
    fontSize: 15,
    lineHeight: "24px",
    letterSpacing: "0.02em",
  },
  railLabelShort: {
    display: { default: "inline", [bp.desktop]: "none" },
    fontSize: 15,
    lineHeight: "24px",
    letterSpacing: "0.02em",
  },
  railLabelActive: {
    fontWeight: 500,
  },
  railCount: {
    fontFamily: face.numeral,
    fontSize: { default: 12, [bp.desktop]: 13 },
    fontWeight: 500,
    lineHeight: "24px",
    fontVariantNumeric: "tabular-nums",
    color: tone.muted,
  },

  tables: {
    gridColumn: "4 / 13",
    minWidth: 0,
  },
  region: {
    position: "relative",
    marginBottom: { default: 56, [bp.desktop]: 80 },
    scrollMarginTop: { default: HEADER_HEIGHT + BAR_HEIGHT + 16, [bp.desktop]: RAIL_TOP },
  },
  regionLast: {
    marginBottom: 0,
  },
  table: {
    display: { default: "block", [bp.desktop]: "table" },
    width: "100%",
    borderCollapse: "collapse",
    tableLayout: "fixed",
  },
  caption: {
    display: { default: "block", [bp.desktop]: "table-caption" },
    captionSide: "top",
    textAlign: "start",
    paddingTop: 16,
    paddingBottom: { default: 4, [bp.desktop]: 24 },
    paddingInline: { default: 0, [bp.desktop]: 12 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.ink,
  },
  captionRow: {
    display: "flex",
    alignItems: "baseline",
    gap: 12,
  },
  captionIndex: {
    flexShrink: 0,
    fontFamily: face.numeral,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "28px",
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: colors.brandGreen700,
  },
  captionTitle: {
    margin: 0,
    fontSize: { default: 18, [bp.desktop]: 20 },
    fontWeight: 500,
    lineHeight: "28px",
    letterSpacing: "0.04em",
    color: tone.ink,
    textWrap: "balance",
    scrollMarginTop: { default: HEADER_HEIGHT + BAR_HEIGHT + 16, [bp.desktop]: RAIL_TOP },
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 4,
  },
  captionCount: {
    flexShrink: 0,
    marginInlineStart: "auto",
    fontSize: 13,
    lineHeight: "28px",
    whiteSpace: "nowrap",
    fontVariantNumeric: "tabular-nums",
    color: tone.muted,
  },
  intro: {
    margin: 0,
    marginTop: 12,
    maxWidth: "40em",
    fontSize: 15,
    fontWeight: 400,
    lineHeight: "26px",
    color: tone.body,
    textWrap: "pretty",
  },
  colgroup: {
    display: { default: "none", [bp.desktop]: "table-column-group" },
  },
  colName: { width: "24%" },
  colInci: { width: "32%" },
  colFeatures: { width: "44%" },
  thead: {
    display: { default: "block", [bp.desktop]: "table-header-group" },
    position: { default: "absolute", [bp.desktop]: "static" },
    width: { default: 1, [bp.desktop]: "auto" },
    height: { default: 1, [bp.desktop]: "auto" },
    overflow: { default: "hidden", [bp.desktop]: "visible" },
    clipPath: { default: "inset(50%)", [bp.desktop]: "none" },
    whiteSpace: { default: "nowrap", [bp.desktop]: "normal" },
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
  headCell: {
    paddingBlock: 10,
    paddingInline: 12,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: tone.creamRule,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "0.08em",
    textAlign: "start",
    color: tone.muted,
  },
  tbody: {
    display: { default: "block", [bp.desktop]: "table-row-group" },
  },
  row: {
    display: { default: "block", [bp.desktop]: "table-row" },
    marginInline: { default: -16, [bp.tabletNarrow]: -40, [bp.desktop]: 0 },
    paddingInline: { default: 16, [bp.tabletNarrow]: 40, [bp.desktop]: 0 },
    paddingBlock: { default: 20, [bp.desktop]: 0 },
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: tone.creamRule,
    backgroundColor: "transparent",
    boxShadow: "none",
    transitionProperty: "background-color, box-shadow",
    transitionDuration: { default: "0ms", [bp.motionOk]: "300ms" },
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: -2,
  },
  rowFlashed: {
    backgroundColor: colors.brandGreen50,
    boxShadow: {
      default: `inset 2px 0 0 0 ${colors.brandGreen700}`,
      [bp.desktop]: "none",
    },
  },
  cell: {
    display: { default: "block", [bp.desktop]: "table-cell" },
    paddingBlock: { default: 0, [bp.desktop]: 16 },
    paddingInline: { default: 0, [bp.desktop]: 12 },
    verticalAlign: "baseline",
    textAlign: "start",
    fontWeight: 400,
  },
  nameCell: {
    color: tone.ink,
    boxShadow: "none",
    transitionProperty: "box-shadow",
    transitionDuration: { default: "0ms", [bp.motionOk]: "300ms" },
    transitionTimingFunction: "ease",
  },
  nameCellFlashed: {
    boxShadow: {
      default: "none",
      [bp.desktop]: `inset 2px 0 0 0 ${colors.brandGreen700}`,
    },
  },
  namePrimary: {
    display: "block",
    fontSize: { default: 16, [bp.desktop]: 15 },
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.02em",
  },
  nameSecondary: {
    display: "block",
    fontSize: 13,
    fontWeight: 400,
    lineHeight: "20px",
    color: tone.muted,
  },
  inciCell: {
    marginTop: { default: 12, [bp.desktop]: 0 },
    fontSize: 13,
    lineHeight: "22px",
    color: { default: tone.body, [bp.desktop]: tone.muted },
  },
  featureCell: {
    marginTop: { default: 12, [bp.desktop]: 0 },
    fontSize: 14,
    lineHeight: "24px",
    color: tone.body,
    textWrap: "pretty",
  },
  stackLabel: {
    display: { default: "block", [bp.desktop]: "none" },
    marginBottom: 2,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "18px",
    letterSpacing: "0.06em",
    color: tone.muted,
  },
  keepTogether: {
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

function useRegionSpy(ids: readonly string[]) {
  const [activeId, setActiveId] = useState(ids[0] ?? "");
  const crossing = useRef(new Set<string>());
  const holding = useRef(false);
  const cancelHold = useRef<() => void>(() => {});

  useEffect(() => {
    const visible = crossing.current;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        if (holding.current) return;
        const first = ids.find((id) => visible.has(id));
        if (first) setActiveId(first);
      },
      { rootMargin: SPY_MARGIN },
    );
    for (const id of ids) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }
    return () => {
      observer.disconnect();
      cancelHold.current();
    };
  }, [ids]);

  const holdOn = (id: string) => {
    cancelHold.current();
    setActiveId(id);
    holding.current = true;
    const release = () => {
      stopListening();
      holding.current = false;
      const first = ids.find((candidate) => crossing.current.has(candidate));
      if (first) setActiveId(first);
    };
    const timer = setTimeout(release, HOLD_RELEASE_MS);
    function stopListening() {
      clearTimeout(timer);
      document.removeEventListener("scrollend", release);
    }
    document.addEventListener("scrollend", release);
    cancelHold.current = stopListening;
  };

  return { activeId, holdOn };
}

function RegionRail({
  activeId,
  onJump,
}: {
  activeId: string;
  onJump: (group: CatalogGroup) => void;
}) {
  const reduce = useReducedMotion();
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list || list.scrollWidth <= list.clientWidth) return;
    const button = list.querySelector<HTMLElement>(`[data-region="${activeId}"]`);
    if (!button) return;
    list.scrollTo({
      left: button.offsetLeft - (list.clientWidth - button.offsetWidth) / 2,
      behavior: reduce ? "auto" : "smooth",
    });
  }, [activeId, reduce]);

  return (
    <nav aria-label="Catalog categories" {...stylex.props(styles.rail)}>
      <ul ref={listRef} {...stylex.props(styles.railList)}>
        {CATALOG_GROUPS.map((group, index) => {
          const id = regionId(group.id);
          const isActive = activeId === id;
          return (
            <li key={group.id} {...stylex.props(styles.railItem)}>
              <button
                type="button"
                data-region={id}
                aria-current={isActive ? "location" : undefined}
                onClick={() => onJump(group)}
                {...stylex.props(styles.railButton, isActive && styles.railButtonActive)}
              >
                <span
                  aria-hidden="true"
                  {...stylex.props(styles.railIndex, isActive && styles.railIndexActive)}
                >
                  {padIndex(index)}
                </span>
                <span {...stylex.props(styles.railLabelFull, isActive && styles.railLabelActive)}>
                  {group.label}
                </span>
                <span {...stylex.props(styles.railLabelShort, isActive && styles.railLabelActive)}>
                  {REGION_META[group.id]?.short ?? group.label}
                </span>
                <span {...stylex.props(styles.railCount)}>{group.items.length}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function ItemRow({ item, flashed }: { item: CatalogItem; flashed: boolean }) {
  const { primary, secondary } = splitTitle(item.title);
  return (
    <tr
      id={catalogRowId(item.id)}
      tabIndex={-1}
      {...stylex.props(styles.row, flashed && styles.rowFlashed)}
    >
      <th
        scope="row"
        {...stylex.props(styles.cell, styles.nameCell, flashed && styles.nameCellFlashed)}
      >
        <span {...stylex.props(styles.namePrimary)}>{primary}</span>
        {secondary && <span {...stylex.props(styles.nameSecondary)}>{secondary}</span>}
      </th>
      <td {...stylex.props(styles.cell, styles.inciCell)}>
        <span aria-hidden="true" {...stylex.props(styles.stackLabel)}>
          INCI 名称
        </span>
        <Inci text={item.inci} />
      </td>
      <td {...stylex.props(styles.cell, styles.featureCell)}>
        <span aria-hidden="true" {...stylex.props(styles.stackLabel)}>
          特性&应用
        </span>
        {item.features}
      </td>
    </tr>
  );
}

function RegionTable({
  group,
  index,
  isLast,
  flashedId,
}: {
  group: CatalogGroup;
  index: number;
  isLast: boolean;
  flashedId: string | null;
}) {
  return (
    <div id={regionId(group.id)} {...stylex.props(styles.region, isLast && styles.regionLast)}>
      <table
        aria-labelledby={regionTitleId(group.id)}
        aria-describedby={group.intro ? regionIntroId(group.id) : undefined}
        {...stylex.props(styles.table)}
      >
        <caption {...stylex.props(styles.caption)}>
          <div {...stylex.props(styles.captionRow)}>
            <span aria-hidden="true" {...stylex.props(styles.captionIndex)}>
              {padIndex(index)}
            </span>
            <h3 id={regionTitleId(group.id)} tabIndex={-1} {...stylex.props(styles.captionTitle)}>
              {group.label}
            </h3>
            <span {...stylex.props(styles.captionCount)}>{group.items.length} 款原料</span>
          </div>
          {group.intro && (
            <p id={regionIntroId(group.id)} {...stylex.props(styles.intro)}>
              {group.intro}
            </p>
          )}
        </caption>
        <colgroup {...stylex.props(styles.colgroup)}>
          <col {...stylex.props(styles.colName)} />
          <col {...stylex.props(styles.colInci)} />
          <col {...stylex.props(styles.colFeatures)} />
        </colgroup>
        <thead {...stylex.props(styles.thead)}>
          <tr>
            <th scope="col" {...stylex.props(styles.headCell)}>
              <span aria-hidden="true">名称</span>
              <span {...stylex.props(styles.srOnly)}>Name</span>
            </th>
            <th scope="col" {...stylex.props(styles.headCell)}>
              <span aria-hidden="true">INCI 名称</span>
              <span {...stylex.props(styles.srOnly)}>INCI name</span>
            </th>
            <th scope="col" {...stylex.props(styles.headCell)}>
              <span aria-hidden="true">特性&应用</span>
              <span {...stylex.props(styles.srOnly)}>Features & applications</span>
            </th>
          </tr>
        </thead>
        <tbody {...stylex.props(styles.tbody)}>
          {group.items.map((item) => (
            <ItemRow key={item.id} item={item} flashed={flashedId === item.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Catalog() {
  const reduce = useReducedMotion();
  const flashedId = useFlashedCatalogItem();
  const { activeId, holdOn } = useRegionSpy(REGION_IDS);

  const jumpTo = (group: CatalogGroup) => {
    const target = document.getElementById(regionId(group.id));
    if (!target) return;
    holdOn(regionId(group.id));
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    document.getElementById(regionTitleId(group.id))?.focus({ preventScroll: true });
  };

  return (
    <section
      id="products-catalog"
      aria-labelledby="oos1pc-catalog-title"
      {...stylex.props(styles.section)}
    >
      <div {...stylex.props(styles.shell)}>
        <header {...stylex.props(styles.head)}>
          <h2 id="oos1pc-catalog-title" {...stylex.props(styles.title)}>
            产品目录
          </h2>
        </header>
        <div {...stylex.props(styles.layout)}>
          <RegionRail activeId={activeId} onJump={jumpTo} />
          <div {...stylex.props(styles.tables)}>
            {CATALOG_GROUPS.map((group, index) => (
              <RegionTable
                key={group.id}
                group={group}
                index={index}
                isLast={index === CATALOG_GROUPS.length - 1}
                flashedId={flashedId}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
