import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ArrowUp, ChevronLeft, ChevronRight } from "lucide-react";
import { m } from "motion/react";
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from "react";

import { EASE } from "@/components/prototype/motion-constants";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { SOLUTION_ITEMS, type SolutionItem } from "../../products-data";
import { padIndex } from "../shared/derived";
import { catalogRowId, flashCatalogItem } from "./catalog-flash";
import { FORMULA_INGREDIENTS, type IngredientPart } from "./ingredient-links";
import { bp, face, tone } from "./tokens.stylex";

const HEADER_HEIGHT = 80;
const INSET = "min(120px, 8.333vw)";
const EASE_CSS = "cubic-bezier(0.22, 1, 0.36, 1)";
const TOTAL = SOLUTION_ITEMS.length;

const tabId = (formulaId: string) => `oos1pc-tab-${formulaId}`;
const panelId = (formulaId: string) => `oos1pc-panel-${formulaId}`;

const styles = stylex.create({
  section: {
    backgroundColor: tone.mint,
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
    marginBottom: { default: 24, [bp.wide]: 40 },
  },
  title: {
    margin: 0,
    fontSize: { default: 26, [bp.tablet]: 28, [bp.wide]: 32 },
    fontWeight: 400,
    lineHeight: { default: "34px", [bp.tablet]: "36px", [bp.wide]: "40px" },
    letterSpacing: "0.04em",
    color: tone.ink,
  },

  tablist: {
    position: "relative",
    display: { default: "flex", [bp.desktop]: "grid" },
    gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
    columnGap: 24,
    rowGap: 0,
    marginInline: { default: -16, [bp.tabletNarrow]: -40, [bp.desktop]: 0 },
    paddingInline: { default: 16, [bp.tabletNarrow]: 40, [bp.desktop]: 0 },
    overflowX: { default: "auto", [bp.desktop]: "visible" },
    scrollbarWidth: "none",
    borderTopWidth: { default: 0, [bp.desktop]: 1 },
    borderTopStyle: "solid",
    borderTopColor: tone.ink,
    borderBottomWidth: { default: 1, [bp.desktop]: 0 },
    borderBottomStyle: "solid",
    borderBottomColor: tone.mintRule,
  },
  tab: {
    position: "relative",
    display: "flex",
    alignItems: "baseline",
    flexShrink: 0,
    gap: 8,
    minHeight: { default: 48, [bp.desktop]: 56 },
    paddingBlock: { default: 12, [bp.desktop]: 16 },
    paddingInline: 0,
    borderWidth: 0,
    borderBottomWidth: { default: 0, [bp.desktop]: 1 },
    borderBottomStyle: "solid",
    borderBottomColor: tone.mintRule,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    textAlign: "start",
    whiteSpace: "nowrap",
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
      insetInline: 0,
      bottom: { default: 0, [bp.desktop]: -1 },
      height: 2,
      backgroundColor: colors.brandGreen700,
      transform: "scaleX(0)",
      transformOrigin: "left center",
      transitionProperty: "transform",
      transitionDuration: { default: "0ms", [bp.motionOk]: "260ms" },
      transitionTimingFunction: EASE_CSS,
    },
  },
  tabSelected: {
    color: { default: tone.ink, ":hover": tone.ink },
    "::after": {
      transform: "scaleX(1)",
    },
  },
  tabIndex: {
    flexShrink: 0,
    fontFamily: face.numeral,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: tone.muted,
  },
  tabIndexSelected: {
    color: colors.brandGreen700,
  },
  tabTitle: {
    minWidth: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontSize: 15,
    fontWeight: 400,
    lineHeight: "24px",
    letterSpacing: "0.02em",
  },
  tabTitleSelected: {
    fontWeight: 500,
  },

  paper: {
    marginTop: { default: 24, [bp.desktop]: 32 },
    backgroundColor: tone.paper,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: tone.mintRule,
    boxShadow: "0 1px 2px rgba(18, 64, 52, 0.05)",
  },
  stack: {
    display: { default: "block", [bp.desktop]: "grid" },
  },
  panel: {
    display: "flex",
    flexDirection: "column",
    gridArea: "1 / 1",
    minWidth: 0,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: -2,
  },
  panelHidden: {
    display: { default: "none", [bp.desktop]: "flex" },
    visibility: "hidden",
  },
  sheetHead: {
    paddingTop: { default: 24, [bp.desktop]: 32 },
    paddingBottom: { default: 20, [bp.desktop]: 28 },
    paddingInline: { default: 20, [bp.upTablet]: 32, [bp.desktop]: 40 },
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: tone.mintRule,
  },
  sheetIndex: {
    margin: 0,
    fontFamily: face.numeral,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: colors.brandGreen700,
  },
  sheetTotal: {
    color: tone.muted,
  },
  sheetTitle: {
    margin: 0,
    marginTop: 8,
    fontSize: { default: 22, [bp.desktop]: 24 },
    fontWeight: 500,
    lineHeight: { default: "30px", [bp.desktop]: "32px" },
    letterSpacing: "0.04em",
    color: tone.ink,
    textWrap: "balance",
  },
  sheetSubtitle: {
    margin: 0,
    marginTop: 6,
    maxWidth: "40em",
    fontSize: 15,
    lineHeight: "24px",
    color: tone.body,
    textWrap: "pretty",
  },
  body: {
    flexGrow: 1,
    display: { default: "flex", [bp.desktop]: "grid" },
    flexDirection: "column",
    gridTemplateColumns: "minmax(0, 3fr) minmax(0, 4fr) minmax(0, 3fr)",
  },
  column: {
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: { default: 24, [bp.desktop]: 28 },
    paddingBlock: { default: 24, [bp.desktop]: 32 },
    paddingInline: { default: 20, [bp.upTablet]: 32, [bp.desktop]: 40 },
    borderTopWidth: { default: 1, [bp.desktop]: 0 },
    borderTopStyle: "solid",
    borderTopColor: tone.mintRule,
  },
  columnLeft: {
    gridColumn: 1,
    gridRow: 1,
  },
  columnCentre: {
    gridColumn: 2,
    gridRow: 1,
    paddingInline: { default: 20, [bp.upTablet]: 32, [bp.desktop]: 32 },
    backgroundColor: tone.mintWell,
    borderTopWidth: 0,
    borderInlineWidth: { default: 0, [bp.desktop]: 1 },
    borderInlineStyle: "solid",
    borderInlineColor: tone.mintRule,
  },
  columnRight: {
    gridColumn: 3,
    gridRow: 1,
  },
  field: {
    margin: 0,
  },
  fieldLabel: {
    margin: 0,
    marginBottom: 8,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.04em",
    color: tone.muted,
  },
  fieldLabelCentre: {
    marginBottom: 12,
    color: colors.brandGreen700,
  },
  fieldValue: {
    margin: 0,
  },
  lines: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    maxWidth: "36em",
    margin: 0,
    padding: 0,
    listStyleType: "none",
    fontSize: 14,
    lineHeight: "24px",
    color: tone.body,
    textWrap: "pretty",
  },
  ingredients: {
    margin: 0,
    padding: 0,
    listStyleType: "none",
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.mintRule,
  },
  ingredient: {
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: tone.mintRule,
  },
  ingredientRow: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 16,
    minHeight: 48,
    boxSizing: "border-box",
    paddingBlock: 12,
    fontSize: 16,
    lineHeight: "24px",
    color: tone.ink,
  },
  ingredientLink: {
    textDecorationLine: "none",
    color: { default: tone.ink, ":hover": colors.brandBlue700 },
    cursor: "pointer",
    transitionProperty: "color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 2,
  },
  ingredientName: {
    minWidth: 0,
    textWrap: "pretty",
  },
  ingredientNote: {
    marginInlineStart: 8,
    fontSize: 13,
    color: tone.muted,
    fontVariantNumeric: "tabular-nums",
  },
  affordance: {
    display: "inline-flex",
    alignItems: "center",
    flexShrink: 0,
    gap: 2,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.04em",
    color: {
      default: colors.brandGreen700,
      [stylex.when.ancestor(":hover")]: colors.brandBlue700,
    },
    transitionProperty: "color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
  },
  affordanceIcon: {
    transform: {
      default: "none",
      [stylex.when.ancestor(":hover")]: "translateY(-2px)",
    },
    transitionProperty: "transform",
    transitionDuration: { default: "0ms", [bp.motionOk]: "200ms" },
    transitionTimingFunction: EASE_CSS,
  },
  catalogNote: {
    margin: 0,
    marginTop: 12,
    fontSize: 13,
    lineHeight: "20px",
    color: tone.muted,
    fontVariantNumeric: "tabular-nums",
  },
  trademark: {
    marginInlineStart: "0.04em",
    fontSize: "0.6em",
    lineHeight: 0,
    verticalAlign: "0.6em",
  },

  foot: {
    display: "flex",
    alignItems: "stretch",
    justifyContent: "space-between",
    gap: 16,
    paddingInline: { default: 8, [bp.upTablet]: 20, [bp.desktop]: 28 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.mintRule,
  },
  step: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    minWidth: 0,
    minHeight: 56,
    paddingInline: 12,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.04em",
    color: { default: tone.ink, ":hover": colors.brandBlue700 },
    cursor: "pointer",
    transitionProperty: "color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: -2,
  },
  stepNext: {
    textAlign: "end",
  },
  stepDisabled: {
    color: { default: tone.disabled, ":hover": tone.disabled },
    cursor: "default",
  },
  stepNeighbour: {
    display: { default: "none", [bp.upTablet]: "inline" },
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontWeight: 400,
    letterSpacing: "0.02em",
    color: tone.muted,
  },
  stepNeighbourIndex: {
    marginInlineEnd: 6,
    fontFamily: face.numeral,
    fontVariantNumeric: "tabular-nums",
  },
});

function Trademarked({ text }: { text: string }) {
  const [mark, rest] = text.split("™");
  if (rest === undefined) return <>{text}</>;
  return (
    <>
      {mark}
      <sup {...stylex.props(styles.trademark)}>™</sup>
      {rest}
    </>
  );
}

function Lines({ lines }: { lines: string[] }) {
  return (
    <ul {...stylex.props(styles.lines)}>
      {lines.map((line) => (
        <li key={line}>{line}</li>
      ))}
    </ul>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div {...stylex.props(styles.field)}>
      <dt {...stylex.props(styles.fieldLabel)}>{label}</dt>
      <dd {...stylex.props(styles.fieldValue)}>{children}</dd>
    </div>
  );
}

function IngredientName({ part }: { part: IngredientPart }) {
  return (
    <span {...stylex.props(styles.ingredientName)}>
      <Trademarked text={part.name} />
      {part.note && <span {...stylex.props(styles.ingredientNote)}>{part.note}</span>}
    </span>
  );
}

function IngredientList({ formulaId }: { formulaId: string }) {
  const reduce = useReducedMotion();
  const { parts, catalogCount } = FORMULA_INGREDIENTS[formulaId] ?? {
    parts: [],
    catalogCount: 0,
  };

  const goToCatalogItem = (event: MouseEvent<HTMLAnchorElement>, catalogId: string) => {
    const row = document.getElementById(catalogRowId(catalogId));
    if (!row) return;
    event.preventDefault();
    row.focus({ preventScroll: true });
    row.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
    flashCatalogItem(catalogId);
  };

  return (
    <>
      <ul {...stylex.props(styles.ingredients)}>
        {parts.map((part) => {
          const { catalogId } = part;
          return (
            <li key={part.key} {...stylex.props(styles.ingredient)}>
              {catalogId ? (
                <a
                  href={`#${catalogRowId(catalogId)}`}
                  onClick={(event) => goToCatalogItem(event, catalogId)}
                  {...stylex.props(
                    styles.ingredientRow,
                    styles.ingredientLink,
                    stylex.defaultMarker(),
                  )}
                >
                  <IngredientName part={part} />
                  <span {...stylex.props(styles.affordance)}>
                    目录
                    <ArrowUp
                      size={12}
                      strokeWidth={1.75}
                      absoluteStrokeWidth
                      aria-hidden="true"
                      {...stylex.props(styles.affordanceIcon)}
                    />
                  </span>
                </a>
              ) : (
                <span {...stylex.props(styles.ingredientRow)}>
                  <IngredientName part={part} />
                </span>
              )}
            </li>
          );
        })}
      </ul>
      {catalogCount > 0 && (
        <p {...stylex.props(styles.catalogNote)}>其中 {catalogCount} 种可在产品目录中找到</p>
      )}
    </>
  );
}

function FormulaPanel({
  item,
  index,
  isActive,
}: {
  item: SolutionItem;
  index: number;
  isActive: boolean;
}) {
  const reduce = useReducedMotion();
  const hasCatalogLinks = (FORMULA_INGREDIENTS[item.id]?.catalogCount ?? 0) > 0;
  return (
    <m.div
      role="tabpanel"
      id={panelId(item.id)}
      aria-labelledby={tabId(item.id)}
      tabIndex={hasCatalogLinks ? undefined : 0}
      inert={!isActive}
      initial={false}
      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
      transition={isActive ? { duration: reduce ? 0 : 0.24, ease: EASE } : { duration: 0 }}
      {...stylex.props(styles.panel, !isActive && styles.panelHidden)}
    >
      <header {...stylex.props(styles.sheetHead)}>
        <p {...stylex.props(styles.sheetIndex)}>
          {padIndex(index)}
          <span {...stylex.props(styles.sheetTotal)}> / {padIndex(TOTAL - 1)}</span>
        </p>
        <h3 {...stylex.props(styles.sheetTitle)}>{item.title}</h3>
        <p {...stylex.props(styles.sheetSubtitle)}>{item.subtitle}</p>
      </header>
      <div {...stylex.props(styles.body)}>
        <dl {...stylex.props(styles.column, styles.columnCentre)}>
          <div {...stylex.props(styles.field)}>
            <dt {...stylex.props(styles.fieldLabel, styles.fieldLabelCentre)}>功能性成分</dt>
            <dd {...stylex.props(styles.fieldValue)}>
              <IngredientList formulaId={item.id} />
            </dd>
          </div>
        </dl>
        <dl {...stylex.props(styles.column, styles.columnLeft)}>
          <Field label="概述">
            <Lines lines={item.overview} />
          </Field>
          <Field label="功能">
            <Lines lines={item.functions} />
          </Field>
        </dl>
        <dl {...stylex.props(styles.column, styles.columnRight)}>
          {item.challenges.length > 0 && (
            <Field label="配方挑战">
              <Lines lines={item.challenges} />
            </Field>
          )}
          <Field label="质地">
            <Lines lines={item.texture} />
          </Field>
          <Field label="应用">
            <Lines lines={item.applications} />
          </Field>
        </dl>
      </div>
    </m.div>
  );
}

function StepButton({
  direction,
  target,
  onStep,
}: {
  direction: "previous" | "next";
  target: number | null;
  onStep: (index: number) => void;
}) {
  const neighbour = target === null ? null : SOLUTION_ITEMS[target];
  const isNext = direction === "next";
  const Icon = isNext ? ChevronRight : ChevronLeft;
  return (
    <button
      type="button"
      aria-disabled={neighbour === null}
      onClick={() => {
        if (target !== null) onStep(target);
      }}
      {...stylex.props(
        styles.step,
        isNext && styles.stepNext,
        neighbour === null && styles.stepDisabled,
      )}
    >
      {!isNext && <Icon size={16} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />}
      {isNext && neighbour && target !== null && (
        <span {...stylex.props(styles.stepNeighbour)}>
          <span {...stylex.props(styles.stepNeighbourIndex)}>{padIndex(target)}</span>
          {neighbour.title}
        </span>
      )}
      <span>{isNext ? "下一个" : "上一个"}</span>
      {!isNext && neighbour && target !== null && (
        <span {...stylex.props(styles.stepNeighbour)}>
          <span {...stylex.props(styles.stepNeighbourIndex)}>{padIndex(target)}</span>
          {neighbour.title}
        </span>
      )}
      {isNext && <Icon size={16} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />}
    </button>
  );
}

export function Solutions() {
  const reduce = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const tablistRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const list = tablistRef.current;
    const tab = tabRefs.current[activeIndex];
    if (!list || !tab || list.scrollWidth <= list.clientWidth) return;
    list.scrollTo({
      left: tab.offsetLeft - (list.clientWidth - tab.offsetWidth) / 2,
      behavior: reduce ? "auto" : "smooth",
    });
  }, [activeIndex, reduce]);

  const focusTab = (index: number) => {
    setActiveIndex(index);
    tabRefs.current[index]?.focus();
  };

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = TOTAL - 1;
    const target =
      event.key === "ArrowRight"
        ? index === last
          ? 0
          : index + 1
        : event.key === "ArrowLeft"
          ? index === 0
            ? last
            : index - 1
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : null;
    if (target === null) return;
    event.preventDefault();
    focusTab(target);
  };

  return (
    <section
      id="products-solutions"
      aria-labelledby="oos1pc-solutions-title"
      {...stylex.props(styles.section)}
    >
      <div {...stylex.props(styles.shell)}>
        <header {...stylex.props(styles.head)}>
          <h2 id="oos1pc-solutions-title" {...stylex.props(styles.title)}>
            应用方案
          </h2>
        </header>
        <div
          ref={tablistRef}
          role="tablist"
          aria-labelledby="oos1pc-solutions-title"
          {...stylex.props(styles.tablist)}
        >
          {SOLUTION_ITEMS.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={item.id}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                type="button"
                role="tab"
                id={tabId(item.id)}
                aria-selected={isActive}
                aria-controls={panelId(item.id)}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveIndex(index)}
                onKeyDown={(event) => onTabKeyDown(event, index)}
                {...stylex.props(styles.tab, isActive && styles.tabSelected)}
              >
                <span {...stylex.props(styles.tabIndex, isActive && styles.tabIndexSelected)}>
                  {padIndex(index)}
                </span>
                <span {...stylex.props(styles.tabTitle, isActive && styles.tabTitleSelected)}>
                  {item.title}
                </span>
              </button>
            );
          })}
        </div>
        <div {...stylex.props(styles.paper)}>
          <div {...stylex.props(styles.stack)}>
            {SOLUTION_ITEMS.map((item, index) => (
              <FormulaPanel
                key={item.id}
                item={item}
                index={index}
                isActive={index === activeIndex}
              />
            ))}
          </div>
          <nav aria-label="Switch application solution" {...stylex.props(styles.foot)}>
            <StepButton
              direction="previous"
              target={activeIndex > 0 ? activeIndex - 1 : null}
              onStep={setActiveIndex}
            />
            <StepButton
              direction="next"
              target={activeIndex < TOTAL - 1 ? activeIndex + 1 : null}
              onStep={setActiveIndex}
            />
          </nav>
        </div>
      </div>
    </section>
  );
}
