import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import type { JSX } from "@solidjs/web";
import { createSignal, createUniqueId, onSettled, untrack } from "solid-js";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { CATALOG_GROUPS } from "../../products-data";
import { FLAT_ITEMS, REGION_META, padIndex, type FlatItem } from "../shared/derived";
import { font, media, motionCss, tone } from "./tokens.stylex";

const HEADER_HEIGHT = 80;
const LATIN_PART = /（[^）]*）/g;

const REGIONS = CATALOG_GROUPS.map((group, index) => ({
  group,
  index,
  short: REGION_META[group.id]?.short ?? group.label,
  anchor: `oos1pa-region-${group.id}`,
  items: FLAT_ITEMS.filter((item) => item.groupIndex === index),
}));

const styles = stylex.create({
  section: {
    paddingTop: { default: 64, [media.desktop]: 96 },
    paddingBottom: { default: 72, [media.desktop]: 112 },
    scrollMarginTop: HEADER_HEIGHT,
    backgroundColor: tone.slate,
    color: tone.slateText,
    fontFamily: font.body,
  },
  shell: {
    width: "100%",
    maxWidth: 1440,
    marginInline: "auto",
    boxSizing: "border-box",
    paddingInline: { default: 16, [media.tablet]: 40, [media.desktop]: "min(120px, 8.333vw)" },
  },
  head: {
    marginBottom: { default: 32, [media.desktop]: 48 },
  },
  title: {
    margin: 0,
    fontSize: { default: 26, [media.tablet]: 28, [media.desktop]: 32 },
    fontWeight: 400,
    lineHeight: { default: "34px", [media.tablet]: "36px", [media.desktop]: "40px" },
    letterSpacing: "0.04em",
    color: tone.slateText,
  },
  meta: {
    margin: 0,
    marginTop: 12,
    fontSize: 14,
    lineHeight: "22px",
    letterSpacing: "0.04em",
    color: tone.slateMuted,
  },
  metaCount: {
    fontFamily: font.numeral,
    fontWeight: 500,
    fontVariantNumeric: "tabular-nums",
    color: tone.slateText,
  },

  jumpList: {
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(3, minmax(0, 1fr))",
      [media.lg]: "repeat(6, minmax(0, 1fr))",
    },
    columnGap: { default: 16, [media.lg]: 24 },
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  jumpLink: {
    position: "relative",
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 8,
    minHeight: 48,
    paddingBlock: 12,
    boxSizing: "border-box",
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.slateRuleStrong,
    fontSize: 14,
    lineHeight: "24px",
    letterSpacing: "0.04em",
    textDecoration: "none",
    color: { default: tone.slateText, ":hover": colors.brandBlue200 },
    transitionProperty: "color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue300,
    outlineOffset: 2,
  },
  jumpBar: {
    position: "absolute",
    insetInline: 0,
    top: -1,
    height: 2,
    backgroundColor: colors.brandGreen300,
    transformOrigin: "left center",
    transform: {
      default: "scaleX(0)",
      [stylex.when.ancestor(":hover")]: "scaleX(1)",
      [stylex.when.ancestor(":focus-visible")]: "scaleX(1)",
    },
    transitionProperty: "transform",
    transitionDuration: "300ms",
    transitionTimingFunction: motionCss.out,
  },
  jumpCount: {
    fontFamily: font.numeral,
    fontSize: 13,
    fontWeight: 500,
    letterSpacing: 0,
    fontVariantNumeric: "tabular-nums",
    color: tone.slateMuted,
  },

  scroller: {
    position: "relative",
    isolation: "isolate",
    marginTop: { default: 32, [media.desktop]: 48 },
    marginInline: { default: -16, [media.mdOnly]: -40, [media.lg]: 0 },
    overflowX: { default: "auto", [media.lg]: "visible" },
    containerType: { default: "inline-size", [media.lg]: "normal" },
    overscrollBehaviorX: "contain",
    scrollbarWidth: "thin",
    scrollbarColor: "rgba(255, 255, 255, 0.28) transparent",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue300,
    outlineOffset: -2,
  },
  table: {
    width: { default: "max(100%, 800px)", [media.mdOnly]: "max(100%, 940px)", [media.lg]: "100%" },
    tableLayout: "fixed",
    borderCollapse: "separate",
    borderSpacing: 0,
  },
  colName: { width: { default: 164, [media.mdOnly]: 248, [media.lg]: "20%" } },
  colRegion: { width: { default: 88, [media.mdOnly]: 96, [media.lg]: "10%" } },
  colInci: { width: { default: 232, [media.mdOnly]: 252, [media.lg]: "28%" } },
  colFeatures: { width: { default: 316, [media.mdOnly]: 344, [media.lg]: "42%" } },

  headCell: {
    position: { default: "static", [media.lg]: "sticky" },
    top: { default: null, [media.lg]: HEADER_HEIGHT },
    zIndex: 1,
    paddingBlock: 14,
    paddingInlineStart: 0,
    paddingInlineEnd: { default: 16, [media.lg]: 24 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.slateRuleTop,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: tone.slateRule,
    backgroundColor: tone.slate,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "0.08em",
    textAlign: "start",
    verticalAlign: "bottom",
    whiteSpace: "nowrap",
    color: tone.slateMuted,
  },
  bodyCell: {
    paddingBlock: { default: 14, [media.lg]: 16 },
    paddingInlineStart: 0,
    paddingInlineEnd: { default: 16, [media.lg]: 24 },
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: tone.slateRule,
    textAlign: "start",
    verticalAlign: "baseline",
  },
  firstCell: {
    paddingInlineStart: { default: 16, [media.mdOnly]: 40, [media.lg]: 0 },
  },
  lastCell: {
    paddingInlineEnd: { default: 16, [media.mdOnly]: 40, [media.lg]: 0 },
  },
  frozen: {
    position: { default: "sticky", [media.lg]: "static" },
    left: 0,
    zIndex: { default: 2, [media.lg]: 1 },
    backgroundColor: tone.slate,
    "::after": {
      content: '""',
      position: "absolute",
      top: 0,
      bottom: -1,
      right: 0,
      width: 1,
      backgroundColor: tone.slateEdge,
      opacity: 0,
      pointerEvents: "none",
      transitionProperty: "opacity",
      transitionDuration: "150ms",
      transitionTimingFunction: "ease",
      display: { default: "block", [media.lg]: "none" },
    },
  },
  frozenHead: {
    position: "sticky",
    left: { default: 0, [media.lg]: null },
    zIndex: { default: 3, [media.lg]: 1 },
  },
  frozenBody: {
    zIndex: 1,
  },
  edgeOn: {
    "::after": {
      opacity: 1,
    },
  },

  groupCell: {
    paddingTop: { default: 40, [media.desktop]: 56 },
    paddingBottom: 16,
    paddingInline: 0,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: tone.slateRuleStrong,
    fontWeight: 400,
    textAlign: "start",
    verticalAlign: "bottom",
    scrollMarginTop: { default: HEADER_HEIGHT - 16, [media.lg]: HEADER_HEIGHT + 46 - 24 },
    outlineStyle: "none",
  },
  groupCellFirst: {
    paddingTop: { default: 28, [media.desktop]: 40 },
  },
  groupInner: {
    position: { default: "sticky", [media.lg]: "static" },
    left: 0,
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [media.lg]: "30fr 70fr" },
    alignItems: "end",
    rowGap: 12,
    boxSizing: "border-box",
    width: { default: "100cqw", [media.lg]: "auto" },
    paddingInline: { default: 16, [media.mdOnly]: 40, [media.lg]: 0 },
  },
  groupName: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    paddingInlineEnd: { default: 0, [media.lg]: 24 },
  },
  groupIndex: {
    fontFamily: font.numeral,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: colors.brandGreen300,
  },
  groupLabelRow: {
    display: "flex",
    alignItems: "baseline",
    flexWrap: "wrap",
    columnGap: 12,
  },
  groupLabel: {
    fontSize: { default: 17, [media.desktop]: 18 },
    fontWeight: 500,
    lineHeight: "28px",
    letterSpacing: "0.04em",
    color: tone.slateText,
  },
  groupCount: {
    fontSize: 13,
    lineHeight: "20px",
    letterSpacing: "0.04em",
    color: tone.slateMuted,
  },
  groupCountNumber: {
    fontFamily: font.numeral,
    fontWeight: 500,
    fontVariantNumeric: "tabular-nums",
  },
  groupIntro: {
    margin: 0,
    maxWidth: "38em",
    fontSize: 14,
    lineHeight: "24px",
    color: tone.slateBody,
    textWrap: "pretty",
  },

  name: {
    display: "block",
    fontSize: 15,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.02em",
    color: tone.slateText,
  },
  nameSecondary: {
    display: "block",
    marginTop: 2,
    fontSize: 13,
    fontWeight: 400,
    lineHeight: "20px",
    letterSpacing: "0.02em",
    color: tone.slateMuted,
  },
  region: {
    fontSize: 13,
    lineHeight: "22px",
    letterSpacing: "0.04em",
    whiteSpace: "nowrap",
    color: tone.slateMuted,
  },
  inci: {
    fontSize: 13,
    lineHeight: "22px",
    color: tone.slateMuted,
    overflowWrap: "anywhere",
  },
  latin: {
    whiteSpace: "nowrap",
  },
  features: {
    fontSize: 14,
    lineHeight: "24px",
    color: tone.slateBody,
    textWrap: "pretty",
  },
});

function Inci(props: { text: string }) {
  const text = untrack(() => props.text);
  const parts: JSX.Element[] = [];
  let last = 0;
  for (const match of text.matchAll(LATIN_PART)) {
    parts.push(text.slice(last, match.index));
    parts.push(<span {...stylex.attrs(styles.latin)}>{match[0]}</span>);
    last = match.index + match[0].length;
  }
  parts.push(text.slice(last));
  return <>{parts}</>;
}

function ItemRow(props: { item: FlatItem; short: string; edge: boolean }) {
  const item = props.item;
  return (
    <tr>
      <th
        scope="row"
        {...stylex.attrs(
          styles.bodyCell,
          styles.firstCell,
          styles.frozen,
          styles.frozenBody,
          props.edge && styles.edgeOn,
        )}
      >
        <span {...stylex.attrs(styles.name)}>{item.primary}</span>
        {item.secondary && <span {...stylex.attrs(styles.nameSecondary)}>{item.secondary}</span>}
      </th>
      <td {...stylex.attrs(styles.bodyCell, styles.region)}>{props.short}</td>
      <td {...stylex.attrs(styles.bodyCell, styles.inci)}>
        <Inci text={item.inci} />
      </td>
      <td {...stylex.attrs(styles.bodyCell, styles.lastCell, styles.features)}>{item.features}</td>
    </tr>
  );
}

export function Catalog() {
  const titleId = createUniqueId();
  const reduce = useReducedMotion();
  let scroller!: HTMLDivElement;
  const [overflowing, setOverflowing] = createSignal(false);
  const [scrolled, setScrolled] = createSignal(false);

  onSettled(() => {
    const measure = () => {
      setOverflowing(scroller.scrollWidth > scroller.clientWidth + 1);
      setScrolled(scroller.scrollLeft > 0);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(scroller);
    if (scroller.firstElementChild) observer.observe(scroller.firstElementChild);
    return () => observer.disconnect();
  });

  const jumpTo = (event: MouseEvent, anchor: string) => {
    const target = document.getElementById(anchor);
    if (!target) return;
    event.preventDefault();
    const margin = Number.parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - margin,
      behavior: reduce() ? "auto" : "smooth",
    });
    target.focus({ preventScroll: true });
  };

  return (
    <section id="products-catalog" aria-labelledby={titleId} {...stylex.attrs(styles.section)}>
      <div {...stylex.attrs(styles.shell)}>
        <header {...stylex.attrs(styles.head)}>
          <h2 id={titleId} {...stylex.attrs(styles.title)}>
            产品目录
          </h2>
          <p {...stylex.attrs(styles.meta)}>
            共 <span {...stylex.attrs(styles.metaCount)}>{FLAT_ITEMS.length}</span> 款原料
          </p>
        </header>

        <nav aria-label="Jump by origin">
          <ul {...stylex.attrs(styles.jumpList)}>
            {REGIONS.map((region) => (
              <li>
                <a
                  href={`#${region.anchor}`}
                  onClick={(event) => jumpTo(event, region.anchor)}
                  {...stylex.attrs(styles.jumpLink, stylex.defaultMarker())}
                >
                  <span aria-hidden="true" {...stylex.attrs(styles.jumpBar)} />
                  <span>{region.short}</span>
                  <span {...stylex.attrs(styles.jumpCount)}>{region.items.length}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div
          ref={scroller}
          role={overflowing() ? "region" : undefined}
          aria-labelledby={overflowing() ? titleId : undefined}
          tabindex={overflowing() ? 0 : undefined}
          onScroll={(event) => setScrolled(event.currentTarget.scrollLeft > 0)}
          {...stylex.attrs(styles.scroller)}
        >
          <table aria-labelledby={titleId} {...stylex.attrs(styles.table)}>
            <colgroup>
              <col {...stylex.attrs(styles.colName)} />
              <col {...stylex.attrs(styles.colRegion)} />
              <col {...stylex.attrs(styles.colInci)} />
              <col {...stylex.attrs(styles.colFeatures)} />
            </colgroup>
            <thead>
              <tr>
                <th
                  scope="col"
                  {...stylex.attrs(
                    styles.headCell,
                    styles.firstCell,
                    styles.frozen,
                    styles.frozenHead,
                    scrolled() && styles.edgeOn,
                  )}
                >
                  名称
                </th>
                <th scope="col" {...stylex.attrs(styles.headCell)}>
                  产地
                </th>
                <th scope="col" {...stylex.attrs(styles.headCell)}>
                  INCI 名称
                </th>
                <th scope="col" {...stylex.attrs(styles.headCell, styles.lastCell)}>
                  特性&应用
                </th>
              </tr>
            </thead>
            {REGIONS.map((region) => (
              <tbody>
                <tr>
                  <th
                    id={region.anchor}
                    scope="rowgroup"
                    colspan={4}
                    tabindex={-1}
                    {...stylex.attrs(styles.groupCell, region.index === 0 && styles.groupCellFirst)}
                  >
                    <div {...stylex.attrs(styles.groupInner)}>
                      <span {...stylex.attrs(styles.groupName)}>
                        <span {...stylex.attrs(styles.groupIndex)}>{padIndex(region.index)}</span>
                        <span {...stylex.attrs(styles.groupLabelRow)}>
                          <span {...stylex.attrs(styles.groupLabel)}>{region.group.label}</span>
                          <span {...stylex.attrs(styles.groupCount)}>
                            <span {...stylex.attrs(styles.groupCountNumber)}>
                              {region.items.length}
                            </span>{" "}
                            款
                          </span>
                        </span>
                      </span>
                      {region.group.intro && (
                        <p {...stylex.attrs(styles.groupIntro)}>{region.group.intro}</p>
                      )}
                    </div>
                  </th>
                </tr>
                {region.items.map((item) => (
                  <ItemRow item={item} short={region.short} edge={scrolled()} />
                ))}
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </section>
  );
}
