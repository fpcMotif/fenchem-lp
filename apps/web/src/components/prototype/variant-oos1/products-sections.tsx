import { Collapse } from "../shared/collapse";
import { m } from "motion/react";
import { Plus } from "lucide-react";
import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
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
const MUTED_LABEL = "#66666c";
const SURFACE = "#f3f5fa";
const HAIRLINE = "rgba(26, 26, 26, 0.1)";
const SOFT_RULE = "rgba(26, 26, 26, 0.06)";
const TAB_HOVER = "#f8f9fc";
const ACCENT = colors.brandBlue700;
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
const TAB_DROP = 6;
const LAST_SOLUTION = SOLUTION_ITEMS.length - 1;

const SOLUTION_KEY_STEPS: Partial<Record<string, (index: number) => number>> = {
  ArrowRight: (index) => (index === LAST_SOLUTION ? 0 : index + 1),
  ArrowLeft: (index) => (index === 0 ? LAST_SOLUTION : index - 1),
  Home: () => 0,
  End: () => LAST_SOLUTION,
};

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
    paddingTop: { default: 64, [DESKTOP]: 96 },
    paddingBottom: { default: 72, [DESKTOP]: 112 },
    scrollMarginTop: HEADER_HEIGHT,
  },
  bandSurface: {
    backgroundColor: SURFACE,
  },
  sectionHead: {
    marginBottom: HEAD_SPACE,
  },
  sectionTitle: {
    margin: 0,
    fontSize: { default: 26, [TABLET]: 28, [DESKTOP]: 32 },
    fontWeight: 400,
    lineHeight: { default: "34px", [TABLET]: "36px", [DESKTOP]: "40px" },
    letterSpacing: "0.04em",
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

  ledgerGrid: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr) 32px", [LG]: TWELVE },
    columnGap: { default: 12, [LG]: GUTTER },
    paddingInline: { default: 16, [LG]: 20 },
  },
  ledgerHeader: {
    display: { default: "none", [LG]: "grid" },
    paddingBlock: 14,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: INK,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: HAIRLINE,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "0.08em",
    color: MUTED_LABEL,
  },
  colName: { gridColumn: { default: null, [LG]: "1 / 5" } },
  colPreview: { gridColumn: { default: null, [LG]: "5 / 12" } },
  colToggle: { gridColumn: { default: null, [LG]: "12 / 13" } },
  ledger: {
    margin: 0,
    padding: 0,
    listStyleType: "none",
    borderTopWidth: { default: 1, [LG]: 0 },
    borderTopStyle: "solid",
    borderTopColor: INK,
  },
  ledgerRow: {
    position: "relative",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: HAIRLINE,
  },
  ledgerRowOpen: {
    backgroundColor: colors.paper,
    "::before": {
      content: '""',
      position: "absolute",
      insetBlock: 0,
      insetInlineStart: 0,
      width: 2,
      backgroundColor: ACCENT,
    },
  },
  ledgerHeading: {
    margin: 0,
  },
  ledgerTrigger: {
    alignItems: "start",
    width: "100%",
    paddingBlock: 14,
    borderWidth: 0,
    backgroundColor: {
      default: "transparent",
      ":hover": { default: null, [HOVER]: colors.paper },
    },
    fontFamily: "inherit",
    textAlign: "start",
    color: { default: INK, ":hover": colors.brandBlue700 },
    cursor: "pointer",
    transitionProperty: "color, background-color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: -2,
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
    color: MUTED_LABEL,
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
    color: MUTED_LABEL,
  },
  ledgerCell: {
    display: { default: "none", [LG]: "block" },
    minWidth: 0,
    fontSize: 14,
    lineHeight: "24px",
    color: BODY_TEXT,
    wordBreak: "keep-all",
  },
  ledgerPreview: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    color: MUTED_LABEL,
  },
  keepTogether: {
    whiteSpace: "nowrap",
  },
  toggle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    justifySelf: "end",
    width: 40,
    height: 40,
    marginBlock: -8,
    marginInlineEnd: -10,
  },
  toggleGlyph: {
    display: "flex",
  },
  ledgerPanelClip: {
    overflow: "hidden",
  },
  ledgerPanel: {
    rowGap: 20,
    paddingTop: 8,
    paddingBottom: 24,
  },
  ledgerIntro: {
    gridColumn: { default: "1 / -1", [LG]: "1 / 9" },
    margin: 0,
    paddingInlineStart: { default: 0, [LG]: 38 },
    fontSize: 15,
    lineHeight: "26px",
    color: BODY_TEXT,
    textWrap: "pretty",
  },
  materialTable: {
    gridColumn: "1 / -1",
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [LG]: "subgrid" },
  },
  materialHead: {
    display: { default: "none", [LG]: "grid" },
    gridColumn: "1 / -1",
    gridTemplateColumns: "subgrid",
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: HAIRLINE,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "0.08em",
    color: MUTED_LABEL,
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
    paddingBlock: 14,
    borderTopWidth: { default: 1, ":first-child": 0 },
    borderTopStyle: "solid",
    borderTopColor: HAIRLINE,
  },
  colMaterialName: {
    gridColumn: { default: null, [LG]: "1 / 4" },
    paddingInlineStart: { default: 0, [LG]: 38 },
  },
  colMaterialInci: { gridColumn: { default: null, [LG]: "4 / 7" } },
  colMaterialFeatures: { gridColumn: { default: null, [LG]: "7 / 12" } },
  materialName: {
    display: "flex",
    flexDirection: "column",
    fontSize: 15,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.02em",
    color: INK,
  },
  materialInci: {
    margin: 0,
    fontSize: 13,
    lineHeight: "22px",
    color: MUTED_LABEL,
  },
  materialFeatures: {
    margin: 0,
    marginTop: { default: 4, [LG]: 0 },
    fontSize: 14,
    lineHeight: "24px",
    color: BODY_TEXT,
    textWrap: "pretty",
  },

  folder: {
    position: "relative",
    isolation: "isolate",
    "::after": {
      content: '""',
      position: "absolute",
      insetInline: 0,
      bottom: 0,
      zIndex: 1,
      height: 1,
      backgroundColor: HAIRLINE,
      pointerEvents: "none",
    },
  },
  tabList: {
    position: "relative",
    display: { default: "flex", [DESKTOP]: "grid" },
    gridTemplateColumns: { default: null, [DESKTOP]: "repeat(10, minmax(0, 1fr))" },
    gap: 4,
    overflowX: "auto",
    overflowY: "hidden",
    scrollbarWidth: "none",
    overscrollBehaviorX: "contain",
  },
  tab: {
    position: "relative",
    flexShrink: 0,
    display: "flex",
    flexDirection: { default: "row", [DESKTOP]: "column" },
    alignItems: { default: "center", [DESKTOP]: "flex-start" },
    gap: { default: 8, [DESKTOP]: 4 },
    minWidth: 0,
    height: { default: 48, [DESKTOP]: "auto" },
    paddingInline: { default: 14, [DESKTOP]: 12 },
    paddingTop: { default: 0, [DESKTOP]: 12 },
    paddingBottom: { default: TAB_DROP, [DESKTOP]: 14 + TAB_DROP },
    boxSizing: "border-box",
    borderWidth: 1,
    borderBottomWidth: 0,
    borderStyle: "solid",
    borderColor: HAIRLINE,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    backgroundColor: {
      default: SURFACE,
      ":hover": { default: SURFACE, [HOVER]: TAB_HOVER },
    },
    fontFamily: "inherit",
    textAlign: "start",
    color: { default: BODY_TEXT, ":hover": colors.brandBlue700 },
    cursor: "pointer",
    transform: {
      default: `translateY(${TAB_DROP}px)`,
      ":hover": {
        default: `translateY(${TAB_DROP}px)`,
        [HOVER]: `translateY(${TAB_DROP / 2}px)`,
      },
    },
    transitionProperty: "transform, background-color, color",
    transitionDuration: { default: "0ms", [breakpoints.motionOk]: "200ms" },
    transitionTimingFunction: EASE_OUT_CSS,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: -3,
  },
  tabActive: {
    zIndex: 2,
    backgroundColor: { default: colors.paper, ":hover": colors.paper },
    color: { default: INK, ":hover": INK },
    cursor: "default",
    transform: { default: "translateY(0)", ":hover": "translateY(0)" },
    "::before": {
      content: '""',
      position: "absolute",
      top: -1,
      insetInline: -1,
      height: 2,
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
      backgroundColor: ACCENT,
    },
  },
  tabNumber: {
    flexShrink: 0,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: MUTED_LABEL,
  },
  tabNumberActive: {
    color: ACCENT,
  },
  tabTitle: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "20px",
    letterSpacing: "0.02em",
    whiteSpace: { default: "nowrap", [DESKTOP]: "normal" },
    textWrap: "balance",
  },
  tabTitleActive: {
    fontWeight: 500,
  },
  titleWord: {
    whiteSpace: "nowrap",
  },

  sheet: {
    paddingInline: { default: 20, [MD]: 40, [DESKTOP]: 56 },
    paddingTop: { default: 28, [MD]: 40, [DESKTOP]: 48 },
    paddingBottom: { default: 12, [MD]: 20 },
    borderWidth: 1,
    borderTopWidth: 0,
    borderStyle: "solid",
    borderColor: HAIRLINE,
    backgroundColor: colors.paper,
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
    color: INK,
    textWrap: "balance",
  },
  sheetSubtitle: {
    margin: 0,
    marginTop: 8,
    maxWidth: "40em",
    fontSize: 15,
    lineHeight: 1.6,
    color: BODY_TEXT,
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
    borderTopColor: SOFT_RULE,
  },
  fieldLabel: {
    margin: 0,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.04em",
    color: MUTED_LABEL,
  },
  fieldValue: {
    margin: 0,
    minWidth: 0,
    fontSize: 15,
    lineHeight: "24px",
    color: INK,
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
    color: BODY_TEXT,
  },
  strong: {
    fontWeight: 500,
  },
  absent: {
    color: MUTED_LABEL,
  },
  keepWords: {
    wordBreak: "keep-all",
    overflowWrap: "anywhere",
  },
  note: {
    marginInlineStart: 6,
    fontSize: 13,
    color: MUTED_LABEL,
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
    <span aria-hidden="true" {...stylex.props(styles.toggle, styles.colToggle)}>
      <m.span
        {...stylex.props(styles.toggleGlyph)}
        initial={false}
        animate={{ rotate: open ? 45 : 0 }}
        transition={reduce ? { duration: 0 } : { type: "spring", duration: 0.3, bounce: 0 }}
      >
        <Plus size={20} strokeWidth={open ? 1.25 : 1.5} absoluteStrokeWidth />
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
  const preview = group.items.map((item) => splitParen(item.title).primary).join("、");

  return (
    <m.li
      layout="position"
      transition={{ duration: 0.26, ease: EASE }}
      {...stylex.props(styles.ledgerRow, open && styles.ledgerRowOpen)}
    >
      <h3 {...stylex.props(styles.ledgerHeading)}>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={open ? panelId : undefined}
          onClick={onToggle}
          {...stylex.props(styles.ledgerGrid, styles.ledgerTrigger)}
        >
          <span {...stylex.props(styles.ledgerName, styles.colName)}>
            <span {...stylex.props(styles.ledgerIndex)}>{padIndex(index)}</span>
            <span {...stylex.props(styles.ledgerNames)}>
              <span {...stylex.props(styles.ledgerPrimary)}>{group.label}</span>
              <span {...stylex.props(styles.ledgerLatin)}>{group.items.length} 款原料</span>
            </span>
          </span>
          <span
            aria-hidden="true"
            {...stylex.props(styles.ledgerCell, styles.ledgerPreview, styles.colPreview)}
          >
            {preview}
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

function TabTitle({ title }: { title: string }) {
  const words = title.split(" ");
  if (words.length === 1) return <>{title}</>;
  return (
    <>
      {words.map((word, index) => (
        <span key={word}>
          {index > 0 && " "}
          <span {...stylex.props(styles.titleWord)}>{word}</span>
        </span>
      ))}
    </>
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
        <Field label="配方挑战">
          <Descriptions lines={item.challenges} />
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
          <h2 id="catalog-title" {...stylex.props(styles.sectionTitle)}>
            产品目录
          </h2>
          <p {...stylex.props(styles.sectionLead)}>
            {categoryId === "personal-care"
              ? "精选个人护理全形态天然油脂与经典功效配方方案"
              : `${categoryLabel}核心原料与应用定制方案`}
          </p>
        </header>
        <div aria-hidden="true" {...stylex.props(styles.ledgerGrid, styles.ledgerHeader)}>
          <span {...stylex.props(styles.colName)}>原料分类</span>
          <span {...stylex.props(styles.colPreview)}>收录原料</span>
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
    </section>
  );
}

export function ProductSolutions() {
  const reduce = useReducedMotion();
  const baseId = useId();
  const tablistRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const panelId = (index: number) => `${baseId}-panel-${index}`;
  const tabId = (index: number) => `${baseId}-tab-${index}`;

  useEffect(() => {
    const tablist = tablistRef.current;
    const tab = tabRefs.current[activeIndex];
    if (!tablist || !tab || tablist.scrollWidth <= tablist.clientWidth) return;
    const left = tab.offsetLeft - (tablist.clientWidth - tab.offsetWidth) / 2;
    tablist.scrollTo({ left: Math.max(0, left), behavior: reduce ? "auto" : "smooth" });
  }, [activeIndex, reduce]);

  const selectFromKey = (event: KeyboardEvent<HTMLButtonElement>) => {
    const step = SOLUTION_KEY_STEPS[event.key];
    if (!step) return;
    event.preventDefault();
    const target = step(activeIndex);
    setActiveIndex(target);
    tabRefs.current[target]?.focus({ preventScroll: true });
  };

  return (
    <section
      id="products-solutions"
      aria-labelledby="solutions-title"
      {...stylex.props(styles.section)}
    >
      <div {...stylex.props(layout.shell, layout.inset)}>
        <header {...stylex.props(styles.sectionHead)}>
          <h2 id="solutions-title" {...stylex.props(styles.sectionTitle)}>
            应用方案
          </h2>
        </header>
        <div {...stylex.props(styles.folder)}>
          <div
            ref={tablistRef}
            role="tablist"
            aria-labelledby="solutions-title"
            {...stylex.props(styles.tabList)}
          >
            {SOLUTION_ITEMS.map((item, index) => {
              const isActive = activeIndex === index;
              return (
                <button
                  key={item.id}
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  id={tabId(index)}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={panelId(index)}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveIndex(index)}
                  onKeyDown={selectFromKey}
                  {...stylex.props(styles.tab, isActive && styles.tabActive)}
                >
                  <span {...stylex.props(styles.tabNumber, isActive && styles.tabNumberActive)}>
                    {padIndex(index)}
                  </span>
                  <span {...stylex.props(styles.tabTitle, isActive && styles.tabTitleActive)}>
                    <TabTitle title={item.title} />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        <div {...stylex.props(styles.sheet)}>
          <div {...stylex.props(styles.panels)}>
            {SOLUTION_ITEMS.map((item, index) => {
              const isActive = activeIndex === index;
              return (
                <div
                  key={item.id}
                  id={panelId(index)}
                  role="tabpanel"
                  aria-labelledby={tabId(index)}
                  tabIndex={isActive ? 0 : -1}
                  inert={!isActive}
                  {...stylex.props(styles.panel, !isActive && styles.panelIdle)}
                >
                  <FormulaSheet item={item} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
