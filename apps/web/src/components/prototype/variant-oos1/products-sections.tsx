import { Collapse } from "../shared/collapse";
import { m } from "motion/react";
import { Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@fenchem-lp/ui/components/tabs";
import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { EASE } from "@/components/prototype/motion-constants";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";
import {
  CATALOG_GROUPS,
  CATEGORIES,
  SOLUTION_ITEMS,
  type CatalogGroup,
  type SolutionItem,
} from "./products-data";
import { layout } from "./products-sections-values";

const INK = "#1a1a1a";
const BODY_TEXT = "#4d4d4d";
const SURFACE = "#f3f5fa";
const TINT_INK = "oklch(0.26 0.035 261.5)";
const TINT_BODY = "oklch(0.44 0.025 261.5)";
const TINT_MUTED = "oklch(0.52 0.02 261.5)";
const TINT_RULE = "oklch(0.424 0.18 261.5 / 0.12)";
const TINT_RULE_SOFT = "oklch(0.424 0.18 261.5 / 0.08)";
const TINT_FILL = "oklch(0.965 0.009 261.5)";
const TINT_HEAD = "oklch(0.958 0.011 261.5)";
const DRAWER_FILL = "oklch(0.955 0.024 261.5)";
const CARD_SHADOW = "0 1px 2px rgba(7, 67, 174, 0.04), 0 16px 40px -24px rgba(7, 67, 174, 0.18)";
const ACCENT = colors.brandBlue700;
const DISPLAY_FONT = '"Inter Tight", "Helvetica Neue", Arial, sans-serif';
const EASE_OUT_CSS = "cubic-bezier(0.22, 1, 0.36, 1)";

const MD = breakpoints.md;
const LG = breakpoints.lg;
const TABLET = "@media (min-width: 768px) and (max-width: 1279.98px)";
const DESKTOP = breakpoints.xl;
const HOVER = "@media (hover: hover) and (pointer: fine)";

const HEADER_HEIGHT = 80;
const GUTTER = 24;
const TWELVE = "repeat(12, minmax(0, 1fr))";
const HEAD_SPACE = { default: 32, [DESKTOP]: 56 } as const;
const CARD_RADIUS = { default: 12, [DESKTOP]: 16 } as const;

const padIndex = (index: number) => String(index + 1).padStart(2, "0");

const splitParen = (text: string) => {
  const open = text.indexOf(" (");
  if (open === -1 || !text.endsWith(")")) return { primary: text, secondary: null };
  return { primary: text.slice(0, open), secondary: text.slice(open + 2, -1) };
};

const TRAILING_NOTE = /^(.+?)\s*[（(]([^（）()]+)[）)]$/;

const splitNote = (text: string) => {
  const match = TRAILING_NOTE.exec(text);
  return match ? { primary: match[1], note: match[2] } : { primary: text, note: null };
};

const INCI_LATIN = /（[^）]*）/g;
const NO_BREAK_SPACE = String.fromCharCode(0xa0);

const styles = stylex.create({
  section: {
    paddingBlock: { default: 72, [DESKTOP]: 128 },
    scrollMarginTop: HEADER_HEIGHT,
  },
  bandSurface: {
    backgroundColor: SURFACE,
  },
  sectionHead: {
    marginBottom: HEAD_SPACE,
  },
  sectionEyebrow: {
    margin: 0,
    marginBottom: 12,
    fontFamily: DISPLAY_FONT,
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: ACCENT,
  },
  sectionTitle: {
    margin: 0,
    fontSize: { default: 26, [TABLET]: 32, [DESKTOP]: 40 },
    fontWeight: 700,
    lineHeight: 1.2,
    textWrap: "balance",
    color: INK,
  },
  sectionLead: {
    margin: 0,
    marginTop: 12,
    maxWidth: 520,
    fontSize: 16,
    lineHeight: "26px",
    color: BODY_TEXT,
    textWrap: "pretty",
  },

  ledgerCard: {
    overflow: "hidden",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: TINT_RULE,
    borderRadius: CARD_RADIUS,
    backgroundColor: colors.paper,
    boxShadow: CARD_SHADOW,
  },
  ledgerGrid: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr) 32px", [LG]: TWELVE },
    columnGap: { default: 12, [LG]: GUTTER },
    paddingInline: { default: 20, [LG]: 32 },
  },
  ledgerHeader: {
    display: { default: "none", [LG]: "grid" },
    paddingBlock: 16,
    backgroundColor: TINT_HEAD,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "0.08em",
    color: TINT_MUTED,
  },
  colName: { gridColumn: { default: null, [LG]: "1 / 5" } },
  colPreview: { gridColumn: { default: null, [LG]: "5 / 12" } },
  colToggle: { gridColumn: { default: null, [LG]: "12 / 13" } },
  ledger: {
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  ledgerRow: {
    position: "relative",
    borderBottomWidth: { default: 1, ":last-child": 0 },
    borderBottomStyle: "solid",
    borderBottomColor: TINT_RULE_SOFT,
    transitionProperty: "background-color",
    transitionDuration: { default: "0ms", [breakpoints.motionOk]: "200ms" },
    transitionTimingFunction: EASE_OUT_CSS,
  },
  ledgerRowOpen: {
    backgroundColor: DRAWER_FILL,
  },
  ledgerHeading: {
    margin: 0,
  },
  ledgerTrigger: {
    alignItems: "start",
    width: "100%",
    paddingBlock: 18,
    borderWidth: 0,
    backgroundColor: {
      default: "transparent",
      ":hover": { default: null, [HOVER]: TINT_FILL },
    },
    fontFamily: "inherit",
    textAlign: "start",
    color: TINT_INK,
    cursor: "pointer",
    transitionProperty: "background-color",
    transitionDuration: { default: "0ms", [breakpoints.motionOk]: "200ms" },
    transitionTimingFunction: EASE_OUT_CSS,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: -2,
  },
  ledgerTriggerOpen: {
    backgroundColor: "transparent",
  },
  ledgerName: {
    display: "flex",
    alignItems: "baseline",
    gap: 14,
    minWidth: 0,
  },
  ledgerIndex: {
    flexShrink: 0,
    width: 24,
    fontSize: 12,
    fontWeight: 400,
    lineHeight: "24px",
    fontVariantNumeric: "tabular-nums",
    letterSpacing: "0.04em",
    color: TINT_MUTED,
  },
  ledgerIndexOpen: {
    color: ACCENT,
  },
  ledgerNames: {
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
  },
  ledgerPrimary: {
    fontSize: 16,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.02em",
    color: "inherit",
  },
  ledgerLatin: {
    fontSize: 13,
    lineHeight: "20px",
    color: TINT_MUTED,
  },
  ledgerPreview: {
    display: { default: "none", [LG]: "flex" },
    alignItems: "center",
    gap: 6,
    alignSelf: "center",
    overflow: "hidden",
    maskImage: "linear-gradient(to right, #000 calc(100% - 56px), transparent)",
    opacity: 1,
    transitionProperty: "opacity",
    transitionDuration: { default: "0ms", [breakpoints.motionOk]: "200ms" },
    transitionTimingFunction: EASE_OUT_CSS,
  },
  ledgerPreviewOpen: {
    opacity: 0,
  },
  chip: {
    display: "inline-flex",
    alignItems: "center",
    flexShrink: 0,
    height: 26,
    paddingInline: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: {
      default: TINT_RULE,
      [stylex.when.ancestor(":hover")]: { default: TINT_RULE, [HOVER]: colors.brandBlue300 },
    },
    backgroundColor: colors.paper,
    fontSize: 13,
    lineHeight: "24px",
    color: {
      default: TINT_BODY,
      [stylex.when.ancestor(":hover")]: { default: TINT_BODY, [HOVER]: ACCENT },
    },
    whiteSpace: "nowrap",
    transitionProperty: "border-color, color",
    transitionDuration: { default: "0ms", [breakpoints.motionOk]: "200ms" },
    transitionTimingFunction: EASE_OUT_CSS,
  },
  keepTogether: {
    whiteSpace: "nowrap",
  },
  toggle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    justifySelf: "end",
    width: 32,
    height: 32,
    marginBlock: -4,
    marginInlineEnd: -6,
    borderRadius: 999,
    backgroundColor: {
      default: TINT_FILL,
      [stylex.when.ancestor(":hover")]: { default: TINT_FILL, [HOVER]: colors.brandBlue100 },
    },
    color: {
      default: TINT_BODY,
      [stylex.when.ancestor(":hover")]: { default: TINT_BODY, [HOVER]: ACCENT },
    },
    transitionProperty: "background-color, color",
    transitionDuration: { default: "0ms", [breakpoints.motionOk]: "160ms" },
    transitionTimingFunction: EASE_OUT_CSS,
  },
  toggleOpen: {
    backgroundColor: ACCENT,
    color: colors.paper,
  },
  toggleGlyph: {
    display: "flex",
  },
  ledgerPanelClip: {
    overflow: "hidden",
  },
  ledgerPanel: {
    rowGap: 20,
    paddingTop: 4,
    paddingBottom: 28,
  },
  ledgerIntro: {
    gridColumn: { default: "1 / -1", [LG]: "1 / 9" },
    margin: 0,
    paddingInlineStart: { default: 0, [LG]: 38 },
    fontSize: 15,
    lineHeight: "26px",
    color: TINT_BODY,
    textWrap: "pretty",
  },
  materialTable: {
    gridColumn: "1 / -1",
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [LG]: "subgrid" },
    marginInlineStart: { default: 0, [LG]: 38 },
    overflow: "hidden",
    borderRadius: 10,
    backgroundColor: colors.paper,
    boxShadow: "0 1px 2px rgba(7, 67, 174, 0.06)",
  },
  materialHead: {
    display: { default: "none", [LG]: "grid" },
    gridColumn: "1 / -1",
    gridTemplateColumns: "subgrid",
    paddingBlock: 12,
    backgroundColor: TINT_HEAD,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "0.08em",
    color: TINT_MUTED,
  },
  materialList: {
    gridColumn: "1 / -1",
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [LG]: "subgrid" },
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  material: {
    gridColumn: "1 / -1",
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [LG]: "subgrid" },
    rowGap: 4,
    paddingBlock: 16,
    paddingInline: { default: 16, [LG]: 0 },
    borderTopWidth: { default: 1, ":first-child": 0 },
    borderTopStyle: "solid",
    borderTopColor: TINT_RULE_SOFT,
  },
  colMaterialName: {
    gridColumn: { default: null, [LG]: "1 / 5" },
    paddingInlineStart: { default: 0, [LG]: 20 },
  },
  colMaterialInci: { gridColumn: { default: null, [LG]: "5 / 8" } },
  colMaterialFeatures: {
    gridColumn: { default: null, [LG]: "8 / 13" },
    paddingInlineEnd: { default: 0, [LG]: 20 },
  },
  materialName: {
    display: "flex",
    flexDirection: "column",
    fontSize: 15,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.02em",
    color: TINT_INK,
  },
  materialInci: {
    margin: 0,
    fontSize: 13,
    lineHeight: "22px",
    color: TINT_MUTED,
  },
  materialFeatures: {
    margin: 0,
    marginTop: { default: 4, [LG]: 0 },
    fontSize: 14,
    lineHeight: "24px",
    color: TINT_BODY,
    textWrap: "pretty",
  },

  tabList: {
    position: "relative",
    display: "flex",
    flexWrap: { default: "nowrap", [DESKTOP]: "wrap" },
    gap: 8,
    marginInline: { default: -16, [TABLET]: -40, [DESKTOP]: 0 },
    paddingInline: { default: 16, [TABLET]: 40, [DESKTOP]: 0 },
    paddingBlock: 4,
    scrollPaddingInline: { default: 16, [TABLET]: 40, [DESKTOP]: 0 },
    overflowX: { default: "auto", [DESKTOP]: "visible" },
    scrollbarWidth: "none",
    overscrollBehaviorX: "contain",
  },
  tab: {
    flexShrink: 0,
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    height: 40,
    paddingInline: 16,
    boxSizing: "border-box",
    borderWidth: 0,
    borderRadius: 999,
    backgroundColor: {
      default: TINT_FILL,
      ":hover": { default: TINT_FILL, [HOVER]: colors.brandBlue100 },
    },
    fontFamily: "inherit",
    color: {
      default: TINT_BODY,
      ":hover": { default: TINT_BODY, [HOVER]: TINT_INK },
    },
    cursor: "pointer",
    transform: { default: null, ":active": "scale(0.96)" },
    transitionProperty: "background-color, color, transform",
    transitionDuration: { default: "0ms", [breakpoints.motionOk]: "160ms" },
    transitionTimingFunction: EASE_OUT_CSS,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: ACCENT,
    outlineOffset: 2,
  },
  tabActive: {
    backgroundColor: ACCENT,
    color: colors.paper,
    cursor: "default",
    transform: "none",
  },
  tabNumber: {
    flexShrink: 0,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: TINT_MUTED,
  },
  tabNumberActive: {
    color: "rgba(255, 255, 255, 0.72)",
  },
  tabTitle: {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.02em",
    whiteSpace: "nowrap",
  },

  sheet: {
    marginTop: { default: 16, [DESKTOP]: 24 },
    paddingInline: { default: 20, [MD]: 40, [DESKTOP]: 56 },
    paddingTop: { default: 28, [MD]: 40, [DESKTOP]: 48 },
    paddingBottom: { default: 12, [MD]: 20 },
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: TINT_RULE,
    borderRadius: CARD_RADIUS,
    backgroundColor: colors.paper,
    boxShadow: CARD_SHADOW,
  },
  panels: {
    display: "grid",
  },
  panel: {
    gridArea: "1 / 1",
    minWidth: 0,
    opacity: 1,
    transitionProperty: "opacity",
    transitionDuration: "150ms",
    transitionTimingFunction: EASE_OUT_CSS,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 8,
  },
  panelIdle: {
    display: { default: "none", [MD]: "block" },
    visibility: "hidden",
    opacity: 0,
  },
  sheetHead: {
    paddingBottom: { default: 20, [MD]: 28 },
  },
  sheetTitle: {
    margin: 0,
    fontSize: { default: 20, [MD]: 24 },
    fontWeight: 500,
    lineHeight: 1.35,
    letterSpacing: "0.04em",
    color: TINT_INK,
    textWrap: "balance",
  },
  sheetSubtitle: {
    margin: 0,
    marginTop: 8,
    maxWidth: "40em",
    fontSize: 15,
    lineHeight: 1.6,
    color: TINT_BODY,
    textWrap: "pretty",
  },
  fields: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [LG]: "repeat(2, minmax(0, 1fr))" },
    gridTemplateRows: { default: "none", [LG]: "repeat(3, auto)" },
    gridAutoFlow: { default: "row", [LG]: "column" },
    columnGap: { default: 0, [LG]: 48 },
    margin: 0,
  },
  field: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [MD]: "88px minmax(0, 1fr)" },
    alignContent: "start",
    columnGap: 16,
    rowGap: 6,
    paddingBlock: { default: 16, [MD]: 20 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: TINT_RULE_SOFT,
  },
  fieldLabel: {
    margin: 0,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.04em",
    color: TINT_MUTED,
  },
  fieldValue: {
    margin: 0,
    minWidth: 0,
    fontSize: 15,
    lineHeight: "24px",
    color: TINT_INK,
    textWrap: "pretty",
  },
  lines: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  description: {
    color: TINT_BODY,
  },
  strong: {
    fontWeight: 500,
  },
  absent: {
    color: TINT_MUTED,
  },
  keepWords: {
    wordBreak: "keep-all",
    overflowWrap: "anywhere",
  },
  note: {
    marginInlineStart: 6,
    fontSize: 13,
    color: TINT_MUTED,
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

function ToggleIcon({ open }: { open: boolean }) {
  const reduce = useReducedMotion();
  return (
    <span
      aria-hidden="true"
      {...stylex.props(styles.toggle, open && styles.toggleOpen, styles.colToggle)}
    >
      <m.span
        {...stylex.props(styles.toggleGlyph)}
        initial={false}
        animate={{ rotate: open ? 45 : 0 }}
        transition={reduce ? { duration: 0 } : { type: "spring", duration: 0.3, bounce: 0 }}
      >
        <Plus size={16} strokeWidth={1.5} absoluteStrokeWidth />
      </m.span>
    </span>
  );
}

function LedgerRow({
  group,
  index,
  open,
  onToggle,
}: {
  group: CatalogGroup;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const reduce = useReducedMotion();
  const panelId = useId();

  return (
    <m.li
      layout="position"
      transition={{ duration: 0.26, ease: EASE }}
      {...stylex.props(styles.ledgerRow, open && styles.ledgerRowOpen)}
    >
      <h3 {...stylex.props(styles.ledgerHeading, stylex.defaultMarker())}>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={open ? panelId : undefined}
          onClick={onToggle}
          {...stylex.props(
            styles.ledgerGrid,
            styles.ledgerTrigger,
            open && styles.ledgerTriggerOpen,
          )}
        >
          <span {...stylex.props(styles.ledgerName, styles.colName)}>
            <span {...stylex.props(styles.ledgerIndex, open && styles.ledgerIndexOpen)}>
              {padIndex(index)}
            </span>
            <span {...stylex.props(styles.ledgerNames)}>
              <span {...stylex.props(styles.ledgerPrimary)}>{group.label}</span>
              <span {...stylex.props(styles.ledgerLatin)}>{group.items.length} 款原料</span>
            </span>
          </span>
          <span
            aria-hidden="true"
            {...stylex.props(
              styles.ledgerPreview,
              open && styles.ledgerPreviewOpen,
              styles.colPreview,
            )}
          >
            {group.items.map((item) => (
              <span key={item.id} {...stylex.props(styles.chip)}>
                {splitParen(item.title).primary}
              </span>
            ))}
          </span>
          <ToggleIcon open={open} />
        </button>
      </h3>
      <Collapse
        key="panel"
        id={panelId}
        {...stylex.props(styles.ledgerPanelClip)}
        open={open}

        transition={{ duration: reduce ? 0 : 0.28, ease: EASE }}
      >
        <div {...stylex.props(styles.ledgerGrid, styles.ledgerPanel)}>
          {group.intro && <p {...stylex.props(styles.ledgerIntro)}>{group.intro}</p>}
          <div {...stylex.props(styles.materialTable)}>
            <div aria-hidden="true" {...stylex.props(styles.materialHead)}>
              <span {...stylex.props(styles.colMaterialName)}>产品名称</span>
              <span {...stylex.props(styles.colMaterialInci)}>INCI 名称</span>
              <span {...stylex.props(styles.colMaterialFeatures)}>特性&应用</span>
            </div>
            <ul {...stylex.props(styles.materialList)}>
              {group.items.map((item) => {
                const { primary, secondary } = splitParen(item.title);
                return (
                  <li key={item.id} {...stylex.props(styles.material)}>
                    <span {...stylex.props(styles.materialName, styles.colMaterialName)}>
                      {primary}
                      {secondary && <span {...stylex.props(styles.ledgerLatin)}>{secondary}</span>}
                    </span>
                    <p {...stylex.props(styles.materialInci, styles.colMaterialInci)}>
                      <Inci text={item.inci} />
                    </p>
                    <p {...stylex.props(styles.materialFeatures, styles.colMaterialFeatures)}>
                      {item.features}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Collapse>
    </m.li>
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

function Descriptions({ lines }: { lines: string[] }) {
  if (lines.length === 0) return <span {...stylex.props(styles.absent)}>无</span>;
  return (
    <ul {...stylex.props(styles.lines, styles.description)}>
      {lines.map((line) => (
        <li key={line}>{line}</li>
      ))}
    </ul>
  );
}

function FormulaSheet({ item }: { item: SolutionItem }) {
  return (
    <>
      <header {...stylex.props(styles.sheetHead)}>
        <h3 {...stylex.props(styles.sheetTitle)}>{item.title}</h3>
        <p {...stylex.props(styles.sheetSubtitle)}>{item.subtitle}</p>
      </header>
      <dl {...stylex.props(styles.fields)}>
        <Field label="概述">
          <Descriptions lines={item.overview} />
        </Field>
        <Field label="功能">
          <span {...stylex.props(styles.strong)}>{item.functions.join(" · ")}</span>
        </Field>
        <Field label="配方挑战">
          <Descriptions lines={item.challenges} />
        </Field>
        <Field label="功能性成分">
          <ul {...stylex.props(styles.lines)}>
            {item.keyIngredients.map((ingredient) => {
              const { primary, note } = splitNote(ingredient);
              return (
                <li key={ingredient} {...stylex.props(styles.keepWords)}>
                  <span {...stylex.props(styles.strong)}>
                    {primary.replaceAll(" / ", `${NO_BREAK_SPACE}/ `)}
                  </span>
                  {note && <span {...stylex.props(styles.note)}>{note}</span>}
                </li>
              );
            })}
          </ul>
        </Field>
        <Field label="质地">{item.texture.join("、")}</Field>
        <Field label="应用">{item.applications.join("、")}</Field>
      </dl>
    </>
  );
}

export function ProductCatalog({ categoryId }: { categoryId: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const categoryLabel = CATEGORIES.find((c) => c.id === categoryId)?.label;

  return (
    <section
      id="products-catalog"
      aria-labelledby="catalog-title"
      {...stylex.props(styles.section, styles.bandSurface)}
    >
      <div {...stylex.props(layout.shell, layout.inset)}>
        <header {...stylex.props(styles.sectionHead)}>
          <p lang="en" {...stylex.props(styles.sectionEyebrow)}>
            Catalog
          </p>
          <h2 id="catalog-title" {...stylex.props(styles.sectionTitle)}>
            产品目录
          </h2>
          <p {...stylex.props(styles.sectionLead)}>
            {categoryId === "personal-care"
              ? "精选个人护理全形态天然油脂与经典功效配方方案"
              : `${categoryLabel}核心原料与应用定制方案`}
          </p>
        </header>
        <div {...stylex.props(styles.ledgerCard)}>
          <div aria-hidden="true" {...stylex.props(styles.ledgerGrid, styles.ledgerHeader)}>
            <span {...stylex.props(styles.colName)}>原料分类</span>
          </div>
          <ul {...stylex.props(styles.ledger)}>
            {CATALOG_GROUPS.map((group, index) => (
              <LedgerRow
                key={group.id}
                group={group}
                index={index}
                open={openIndex === index}
                onToggle={() => setOpenIndex((prev) => (prev === index ? null : index))}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function ProductSolutions() {
  const reduce = useReducedMotion();
  const tablistRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const tablist = tablistRef.current;
    const tab = tablist?.querySelector<HTMLElement>('[aria-selected="true"]');
    if (!tablist || !tab || tablist.scrollWidth <= tablist.clientWidth) return;
    const left = tab.offsetLeft - (tablist.clientWidth - tab.offsetWidth) / 2;
    tablist.scrollTo({ left: Math.max(0, left), behavior: reduce ? "auto" : "smooth" });
  }, [activeIndex, reduce]);

  return (
    <section
      id="products-solutions"
      aria-labelledby="solutions-title"
      {...stylex.props(styles.section)}
    >
      <div {...stylex.props(layout.shell, layout.inset)}>
        <header {...stylex.props(styles.sectionHead)}>
          <p lang="en" {...stylex.props(styles.sectionEyebrow)}>
            Solutions
          </p>
          <h2 id="solutions-title" {...stylex.props(styles.sectionTitle)}>
            应用方案
          </h2>
        </header>
        <Tabs value={activeIndex} onValueChange={setActiveIndex}>
          <TabsList
            ref={tablistRef}
            activateOnFocus
            aria-labelledby="solutions-title"
            sx={styles.tabList}
          >
            {SOLUTION_ITEMS.map((item, index) => {
              const isActive = activeIndex === index;
              return (
                <TabsTrigger
                  key={item.id}
                  value={index}
                  sx={[styles.tab, isActive && styles.tabActive]}
                >
                  <span {...stylex.props(styles.tabNumber, isActive && styles.tabNumberActive)}>
                    {padIndex(index)}
                  </span>
                  <span {...stylex.props(styles.tabTitle)}>{item.title}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>
          <div {...stylex.props(styles.sheet)}>
            <div {...stylex.props(styles.panels)}>
              {SOLUTION_ITEMS.map((item, index) => (
                <TabsContent
                  key={item.id}
                  value={index}
                  keepMounted
                  sx={[styles.panel, activeIndex !== index && styles.panelIdle]}
                >
                  <FormulaSheet item={item} />
                </TabsContent>
              ))}
            </div>
          </div>
        </Tabs>
      </div>
    </section>
  );
}
