import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { ChevronRight, Plus } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import { useId, useState } from "react";

import { EASE } from "@/components/prototype/motion-constants";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import {
  CATALOG_ITEMS,
  CATEGORIES,
  FEATURED_PRODUCT,
  SOLUTION_ITEMS,
  type CatalogItem,
  type SolutionItem,
} from "./products-data";

const INK = "#1a1a1a";
const BODY_TEXT = "#4d4d4d";
const MUTED_LABEL = "#52525b";
const SURFACE = "#f6f6f6";
const TINT = "#e6ecf7";
const DISPLAY_FONT = '"Inter Tight", "Helvetica Neue", Arial, sans-serif';
const BODY_FONT =
  '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif';

const TABLET = "@media (min-width: 768px) and (max-width: 1279.98px)";
const DESKTOP = breakpoints.xl;
const LG = breakpoints.lg;

const styles = stylex.create({
  root: {
    backgroundColor: "#ffffff",
    color: INK,
    fontFamily: BODY_FONT,
    minHeight: "100vh",
  },
  shell: {
    width: "100%",
    maxWidth: 1440,
    marginInline: "auto",
    boxSizing: "border-box",
  },
  inset: {
    paddingInlineStart: {
      default: 20,
      [breakpoints.sm]: 32,
      [TABLET]: 48,
      [DESKTOP]: "min(120px, 8.33vw)",
    },
    paddingInlineEnd: {
      default: 20,
      [breakpoints.sm]: 32,
      [TABLET]: 48,
      [DESKTOP]: "min(120px, 8.33vw)",
    },
  },

  bannerWrap: {
    position: "relative",
    width: "100%",
    paddingTop: { default: 80, [TABLET]: 80, [DESKTOP]: 80 },
    overflow: "hidden",
    backgroundColor: "#e8eff4",
  },
  bannerFigure: {
    position: "relative",
    width: "100%",
    margin: 0,
    aspectRatio: { default: "21 / 9", [TABLET]: "21 / 7", [DESKTOP]: "24 / 7" },
    maxHeight: 460,
    overflow: "hidden",
  },
  bannerImg: {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center 48%",
  },
  bannerScrim: {
    position: "absolute",
    insetInline: 0,
    insetBlockEnd: 0,
    height: "28%",
    backgroundImage:
      "linear-gradient(to top, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0) 100%)",
    pointerEvents: "none",
  },

  subBar: {
    position: "sticky",
    top: 80,
    zIndex: 30,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(16px)",
    boxShadow: "0 1px 0 0 rgba(26, 26, 26, 0.08)",
  },
  subBarInner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 24,
    height: 64,
  },
  breadcrumb: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexShrink: 0,
    fontSize: 13,
    letterSpacing: "0.04em",
    color: BODY_TEXT,
  },
  breadcrumbLink: {
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontSize: "inherit",
    letterSpacing: "inherit",
    color: { default: BODY_TEXT, ":hover": colors.brandBlue700 },
    cursor: "pointer",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 2,
    borderRadius: 4,
  },
  breadcrumbCurrent: {
    color: INK,
    fontWeight: 500,
  },
  chipList: {
    display: "flex",
    alignItems: "center",
    justifyContent: { default: "flex-start", [breakpoints.lg]: "flex-end" },
    gap: 12,
    flexGrow: 1,
    minWidth: 0,
    paddingBlock: 4,
    overflowX: "auto",
    scrollbarWidth: "none",
  },
  chip: {
    appearance: "none",
    border: "none",
    display: "inline-flex",
    alignItems: "center",
    flexShrink: 0,
    height: 36,
    paddingInline: 18,
    borderRadius: 999,
    backgroundColor: { default: "#f3f4f6", ":hover": "#e5e7eb" },
    fontSize: 13,
    fontWeight: 500,
    letterSpacing: "0.04em",
    color: { default: INK, ":hover": colors.brandBlue700 },
    cursor: "pointer",
    whiteSpace: "nowrap",
    transitionProperty: "background-color, color, transform, box-shadow",
    transitionDuration: "160ms",
    transitionTimingFunction: "ease-out",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 2,
  },
  chipActive: {
    backgroundColor: { default: colors.brandBlue700, ":hover": colors.brandBlue800 },
    color: { default: colors.paper, ":hover": colors.paper },
    boxShadow: "0 4px 12px -2px rgba(29, 78, 216, 0.32)",
  },
  spotlightSection: {
    paddingTop: { default: 32, [DESKTOP]: 48 },
    paddingBottom: { default: 64, [DESKTOP]: 96 },
  },
  spotlightGrid: {
    display: "grid",
    gridTemplateColumns: { default: "1fr", [LG]: "minmax(0, 0.85fr) minmax(0, 1.15fr)" },
    gap: { default: 40, [TABLET]: 56, [DESKTOP]: 80 },
    alignItems: "center",
  },
  spotlightText: {
    display: "flex",
    flexDirection: "column",
  },
  spotlightBrand: {
    margin: 0,
    fontSize: { default: 32, [TABLET]: 40, [DESKTOP]: 48 },
    fontWeight: 700,
    lineHeight: 1.15,
    letterSpacing: "-0.01em",
    color: INK,
    fontFamily: DISPLAY_FONT,
  },
  spotlightTagline: {
    margin: 0,
    marginTop: 10,
    fontSize: { default: 14, [DESKTOP]: 15 },
    color: MUTED_LABEL,
    letterSpacing: "0.03em",
  },
  spotlightItem: {
    marginTop: 24,
  },
  spotlightItemName: {
    margin: 0,
    fontSize: { default: 15, [DESKTOP]: 16 },
    fontWeight: 700,
    color: INK,
    letterSpacing: "0.01em",
    fontFamily: DISPLAY_FONT,
  },
  spotlightItemDesc: {
    margin: 0,
    marginTop: 6,
    fontSize: { default: 13, [DESKTOP]: 14 },
    lineHeight: 1.7,
    color: BODY_TEXT,
    maxWidth: 440,
  },
  spotlightCardsWrap: {
    borderRadius: 16,
    overflow: "hidden",
    boxShadow: "0 12px 36px -12px rgba(42, 38, 56, 0.12)",
    backgroundColor: "#fafafc",
  },
  spotlightCardsImg: {
    display: "block",
    width: "100%",
    height: "auto",
    objectFit: "cover",
  },

  section: {
    paddingTop: { default: 56, [TABLET]: 72, [DESKTOP]: 88 },
    paddingBottom: { default: 56, [TABLET]: 72, [DESKTOP]: 88 },
    scrollMarginTop: 96,
  },
  sectionDivider: {
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: "rgba(0, 0, 0, 0.05)",
  },
  sectionTitle: {
    margin: 0,
    marginBottom: { default: 28, [DESKTOP]: 36 },
    fontSize: { default: 26, [TABLET]: 30, [DESKTOP]: 34 },
    fontWeight: 700,
    letterSpacing: "0.02em",
    color: INK,
  },
  categoryBanner: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 24,
    paddingBlock: 10,
    paddingInline: 16,
    borderRadius: 10,
    backgroundColor: TINT,
  },
  categoryPill: {
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.04em",
    color: colors.brandBlue700,
    backgroundColor: colors.paper,
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.06)",
    paddingBlock: 3,
    paddingInline: 10,
    borderRadius: 999,
  },
  categoryDesc: {
    fontSize: 13,
    color: BODY_TEXT,
  },
  accordionList: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },
  accordionItem: {
    borderRadius: 12,
    backgroundColor: SURFACE,
    overflow: "hidden",
    transitionProperty: "background-color, box-shadow",
    transitionDuration: "200ms",
  },
  accordionItemOpen: {
    backgroundColor: "#f4f5f8",
    boxShadow: "0 4px 18px -4px rgba(0, 0, 0, 0.05)",
  },
  trigger: {
    appearance: "none",
    width: "100%",
    border: "none",
    background: "transparent",
    paddingBlock: { default: 20, [DESKTOP]: 24 },
    paddingInline: { default: 22, [DESKTOP]: 32 },
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    cursor: "pointer",
    textAlign: "start",
    fontFamily: "inherit",
    color: INK,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: -2,
  },
  triggerTitle: {
    margin: 0,
    fontSize: { default: 15, [TABLET]: 16, [DESKTOP]: 17 },
    fontWeight: 600,
    lineHeight: 1.45,
    letterSpacing: "0.01em",
    color: INK,
  },
  triggerNumber: {
    marginInlineEnd: 8,
    fontWeight: 600,
    color: INK,
  },
  iconSlot: {
    flexShrink: 0,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 28,
    height: 28,
    borderRadius: "50%",
    backgroundColor: "rgba(0, 0, 0, 0.04)",
    color: colors.brandBlue700,
  },
  iconLayer: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  },

  panel: {
    overflow: "hidden",
  },
  panelInner: {
    paddingInline: { default: 22, [DESKTOP]: 32 },
    paddingBottom: { default: 24, [DESKTOP]: 28 },
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: "rgba(0, 0, 0, 0.05)",
  },
  panelLead: {
    margin: 0,
    fontSize: 14,
    lineHeight: 1.75,
    color: BODY_TEXT,
  },
  metaGrid: {
    display: "grid",
    gridTemplateColumns: { default: "1fr", [TABLET]: "repeat(2, minmax(0, 1fr))" },
    gap: 16,
    marginTop: 16,
  },
  metaField: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  metaLabel: {
    fontSize: 12,
    fontWeight: 600,
    color: MUTED_LABEL,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
  },
  metaValue: {
    margin: 0,
    fontSize: 13,
    lineHeight: 1.6,
    color: INK,
  },
  tagList: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 6,
  },
  tag: {
    fontSize: 12,
    paddingBlock: 4,
    paddingInline: 10,
    borderRadius: 6,
    backgroundColor: TINT,
    color: colors.brandBlue700,
    fontWeight: 500,
  },
});

function AccordionIcon({ open }: { open: boolean }) {
  const reduce = useReducedMotion();
  return (
    <span aria-hidden="true" {...stylex.props(styles.iconSlot)}>
      <m.span
        {...stylex.props(styles.iconLayer)}
        animate={{ rotate: open ? 45 : 0 }}
        transition={reduce ? { duration: 0 } : { type: "spring", duration: 0.3, bounce: 0 }}
      >
        <Plus size={16} strokeWidth={2} absoluteStrokeWidth />
      </m.span>
    </span>
  );
}

function CatalogAccordionItem({
  item,
  index,
  open,
  onToggle,
}: {
  item: CatalogItem;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const reduce = useReducedMotion();
  const panelId = useId();

  return (
    <div {...stylex.props(styles.accordionItem, open && styles.accordionItemOpen)}>
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          {...stylex.props(styles.trigger)}
        >
          <span {...stylex.props(styles.triggerTitle)}>
            <span {...stylex.props(styles.triggerNumber)}>{index + 1}.</span>
            {item.title}
          </span>
          <AccordionIcon open={open} />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <m.div
            key="panel"
            id={panelId}
            {...stylex.props(styles.panel)}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.25, ease: EASE }}
          >
            <div {...stylex.props(styles.panelInner)}>
              <p {...stylex.props(styles.panelLead)}>{item.features}</p>
              <div {...stylex.props(styles.metaGrid)}>
                <div {...stylex.props(styles.metaField)}>
                  <span {...stylex.props(styles.metaLabel)}>INCI 名称</span>
                  <p {...stylex.props(styles.metaValue)}>{item.inci}</p>
                </div>
                <div {...stylex.props(styles.metaField)}>
                  <span {...stylex.props(styles.metaLabel)}>原料分类</span>
                  <p {...stylex.props(styles.metaValue)}>{item.category}</p>
                </div>
                <div {...stylex.props(styles.metaField)}>
                  <span {...stylex.props(styles.metaLabel)}>原产地与工艺</span>
                  <p {...stylex.props(styles.metaValue)}>{item.origin}</p>
                </div>
                <div {...stylex.props(styles.metaField)}>
                  <span {...stylex.props(styles.metaLabel)}>推荐适用剂型</span>
                  <p {...stylex.props(styles.metaValue)}>{item.applications}</p>
                </div>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SolutionAccordionItem({
  item,
  index,
  open,
  onToggle,
}: {
  item: SolutionItem;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const reduce = useReducedMotion();
  const panelId = useId();

  return (
    <div {...stylex.props(styles.accordionItem, open && styles.accordionItemOpen)}>
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          {...stylex.props(styles.trigger)}
        >
          <span {...stylex.props(styles.triggerTitle)}>
            <span {...stylex.props(styles.triggerNumber)}>{index + 1}.</span>
            {item.title}
          </span>
          <AccordionIcon open={open} />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <m.div
            key="panel"
            id={panelId}
            {...stylex.props(styles.panel)}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.25, ease: EASE }}
          >
            <div {...stylex.props(styles.panelInner)}>
              <p {...stylex.props(styles.panelLead)}>{item.overview}</p>
              <div {...stylex.props(styles.metaGrid)}>
                <div {...stylex.props(styles.metaField)}>
                  <span {...stylex.props(styles.metaLabel)}>核心功能</span>
                  <div {...stylex.props(styles.tagList)}>
                    {item.functions.map((fn) => (
                      <span key={fn} {...stylex.props(styles.tag)}>
                        {fn}
                      </span>
                    ))}
                  </div>
                </div>
                <div {...stylex.props(styles.metaField)}>
                  <span {...stylex.props(styles.metaLabel)}>质地表现</span>
                  <p {...stylex.props(styles.metaValue)}>{item.texture}</p>
                </div>
                <div {...stylex.props(styles.metaField)}>
                  <span {...stylex.props(styles.metaLabel)}>主要功能性成分</span>
                  <p {...stylex.props(styles.metaValue)}>{item.keyIngredients.join("、")}</p>
                </div>
                <div {...stylex.props(styles.metaField)}>
                  <span {...stylex.props(styles.metaLabel)}>终端应用方向</span>
                  <p {...stylex.props(styles.metaValue)}>{item.applications}</p>
                </div>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ProductsView({
  onNavigateHome,
  sx,
}: {
  onNavigateHome: (hash?: string) => void;
  sx?: StyleXStyles;
}) {
  const [activeTab, setActiveTab] = useState<string>("personal-care");
  const [openCatalogIndex, setOpenCatalogIndex] = useState<number | null>(0);
  const [openSolutionIndex, setOpenSolutionIndex] = useState<number | null>(0);

  const toggleCatalog = (index: number) => {
    setOpenCatalogIndex((prev) => (prev === index ? null : index));
  };

  const toggleSolution = (index: number) => {
    setOpenSolutionIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div id="products-top" {...stylex.props(styles.root, sx)}>
      {}
      <section aria-label="产品与应用全景横幅" {...stylex.props(styles.bannerWrap)}>
        <figure {...stylex.props(styles.bannerFigure)}>
          <img
            src={FEATURED_PRODUCT.bannerImage}
            alt="泛成生物产品与应用自然原貌全景"
            fetchPriority="high"
            decoding="async"
            {...stylex.props(styles.bannerImg)}
          />
          <div aria-hidden="true" {...stylex.props(styles.bannerScrim)} />
        </figure>
      </section>

      <div {...stylex.props(styles.subBar)}>
        <div {...stylex.props(styles.shell, styles.inset, styles.subBarInner)}>
          <nav aria-label="面包屑导航" {...stylex.props(styles.breadcrumb)}>
            <button
              type="button"
              onClick={() => onNavigateHome("top")}
              {...stylex.props(styles.breadcrumbLink)}
            >
              首页
            </button>
            <ChevronRight size={13} aria-hidden="true" />
            <span aria-current="page" {...stylex.props(styles.breadcrumbCurrent)}>
              产品与应用
            </span>
          </nav>
          <div role="tablist" aria-label="品类切换" {...stylex.props(styles.chipList)}>
            {CATEGORIES.map((cat) => {
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(cat.id)}
                  {...stylex.props(styles.chip, isActive && styles.chipActive)}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      {}
      <section
        aria-labelledby="spotlight-title"
        {...stylex.props(styles.shell, styles.inset, styles.spotlightSection)}
      >
        <div {...stylex.props(styles.spotlightGrid)}>
          <div {...stylex.props(styles.spotlightText)}>
            <h2 id="spotlight-title" {...stylex.props(styles.spotlightBrand)}>
              {FEATURED_PRODUCT.brand}
            </h2>
            <p {...stylex.props(styles.spotlightTagline)}>{FEATURED_PRODUCT.tagline}</p>
            {FEATURED_PRODUCT.products.map((prod) => (
              <div key={prod.name} {...stylex.props(styles.spotlightItem)}>
                <h3 {...stylex.props(styles.spotlightItemName)}>{prod.name}</h3>
                <p {...stylex.props(styles.spotlightItemDesc)}>{prod.desc}</p>
              </div>
            ))}
          </div>

          <div {...stylex.props(styles.spotlightCardsWrap)}>
            <img
              src={FEATURED_PRODUCT.artworkImage}
              alt="OLVE'Care Shea 纯天然植物原料与质地艺术卡片"
              loading="lazy"
              decoding="async"
              {...stylex.props(styles.spotlightCardsImg)}
            />
          </div>
        </div>
      </section>

      <section
        id="products-catalog"
        aria-labelledby="catalog-title"
        {...stylex.props(styles.shell, styles.inset, styles.section, styles.sectionDivider)}
      >
        <div {...stylex.props(styles.categoryBanner)}>
          <span {...stylex.props(styles.categoryPill)}>
            {CATEGORIES.find((c) => c.id === activeTab)?.label}
          </span>
          <span {...stylex.props(styles.categoryDesc)}>
            {activeTab === "personal-care"
              ? "精选个人护理全形态天然油脂与经典功效配方方案"
              : `${CATEGORIES.find((c) => c.id === activeTab)?.label}核心原料与应用定制方案`}
          </span>
        </div>
        <h2 id="catalog-title" {...stylex.props(styles.sectionTitle)}>
          产品目录
        </h2>
        <div role="region" aria-label="原料产品目录列表" {...stylex.props(styles.accordionList)}>
          {CATALOG_ITEMS.slice(0, 5).map((item, index) => (
            <CatalogAccordionItem
              key={item.id}
              item={item}
              index={index}
              open={openCatalogIndex === index}
              onToggle={() => toggleCatalog(index)}
            />
          ))}
        </div>
      </section>

      {}
      <section
        id="products-solutions"
        aria-labelledby="solutions-title"
        {...stylex.props(styles.shell, styles.inset, styles.section, styles.sectionDivider)}
      >
        <h2 id="solutions-title" {...stylex.props(styles.sectionTitle)}>
          应用方案
        </h2>
        <div role="region" aria-label="配方应用方案列表" {...stylex.props(styles.accordionList)}>
          {SOLUTION_ITEMS.slice(0, 5).map((item, index) => (
            <SolutionAccordionItem
              key={item.id}
              item={item}
              index={index}
              open={openSolutionIndex === index}
              onToggle={() => toggleSolution(index)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
