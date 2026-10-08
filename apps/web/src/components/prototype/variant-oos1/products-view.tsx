import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { useSearch } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { useState, type ComponentType } from "react";

import { ContactCta } from "./contact-cta";
import { CTA, PRODUCTS_CTA_SUBTITLE } from "./content";
import { CATEGORIES, FEATURED_PRODUCT } from "./products-data";
import { layout, ProductCatalog, ProductSolutions } from "./products-sections";

const INK = "#1a1a1a";
const BODY_TEXT = "#4d4d4d";
const MUTED_LABEL = "#52525b";
const PHOTO_OUTLINE = "rgba(0, 0, 0, 0.1)";
const ACCENT = "#78598d";
const EASE_OUT_CSS = "cubic-bezier(0.22, 1, 0.36, 1)";
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

  bannerWrap: {
    position: "relative",
    width: "100%",
    display: "flex",
    alignItems: "flex-end",
    height: { default: 240, [breakpoints.md]: "clamp(300px, 31vw, 480px)" },
    overflow: "hidden",
    backgroundColor: "#0b2a5c",
    color: colors.paper,
  },
  bannerFigure: {
    position: "absolute",
    inset: 0,
    width: "100%",
    margin: 0,
    overflow: "hidden",
  },
  bannerImg: {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center 48%",
  },
  srOnly: {
    position: "absolute",
    width: 1,
    height: 1,
    overflow: "hidden",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
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
    alignItems: { default: "stretch", [breakpoints.md]: "center" },
    flexDirection: { default: "column", [breakpoints.md]: "row" },
    justifyContent: "space-between",
    gap: { default: 12, [breakpoints.md]: 24 },
    paddingBlock: { default: 12, [breakpoints.md]: 0 },
    height: { default: "auto", [breakpoints.md]: 64 },
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
    position: "relative",
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
    "::before": {
      content: '""',
      position: "absolute",
      insetBlock: -12,
      insetInline: -8,
    },
  },
  breadcrumbCurrent: {
    color: INK,
    fontWeight: 600,
  },
  chipList: {
    display: "flex",
    alignItems: "center",
    justifyContent: { default: "flex-start", [breakpoints.lg]: "flex-end" },
    gap: { default: 10, [breakpoints.md]: 12 },
    flexGrow: 1,
    minWidth: 0,
    marginInline: { default: -16, [breakpoints.md]: 0 },
    paddingInlineStart: { default: 16, [breakpoints.md]: 0 },
    paddingInlineEnd: { default: 24, [breakpoints.md]: 0 },
    paddingBlock: 4,
    overflowX: "auto",
    scrollbarWidth: "none",
    maskImage: {
      default: "linear-gradient(to right, #000 calc(100% - 24px), transparent)",
      [breakpoints.md]: "none",
    },
  },
  chip: {
    appearance: "none",
    border: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    height: 36,
    paddingInline: 18,
    borderRadius: 999,
    backgroundColor: { default: "#f3f4f6", ":hover": "#e5e7eb" },
    fontSize: 13,
    fontWeight: 500,
    letterSpacing: "0.04em",
    color: { default: INK, ":hover": colors.brandBlue700 },
    position: "relative",
    cursor: "pointer",
    whiteSpace: "nowrap",
    transform: {
      default: null,
      ":active": { default: null, [breakpoints.motionOk]: "scale(0.96)" },
    },
    "::before": {
      content: '""',
      position: "absolute",
      insetBlock: -4,
      insetInline: 0,
    },
    transitionProperty: "background-color, color, transform, box-shadow",
    transitionDuration: "160ms",
    transitionTimingFunction: EASE_OUT_CSS,
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
    paddingTop: { default: 24, [LG]: 16 },
    paddingBottom: { default: 56, [DESKTOP]: 80 },
  },
  spotlightGrid: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [LG]: "minmax(0, 0.85fr) minmax(0, 1.15fr)" },
    gap: { default: 32, [DESKTOP]: 64 },
    alignItems: "center",
  },
  spotlightText: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    minWidth: 0,
    textAlign: "start",
  },
  spotlightBrand: {
    margin: 0,
    fontSize: { default: 36, [TABLET]: 44, [DESKTOP]: 52 },
    fontWeight: 400,
    lineHeight: 1.1,
    textWrap: "balance",
    color: ACCENT,
  },
  spotlightTagline: {
    margin: 0,
    marginTop: 6,
    lineHeight: 1.6,
    fontSize: { default: 15, [DESKTOP]: 17 },
    fontWeight: 700,
    color: MUTED_LABEL,
    letterSpacing: "0.03em",
  },
  spotlightCardsWrap: {
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(2, minmax(0, 1fr))",
      [breakpoints.sm]: "repeat(3, minmax(0, 1fr))",
    },
    gap: { default: 8, [LG]: 10 },
  },
  productCard: {
    appearance: "none",
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
    padding: 0,
    overflow: "hidden",
    borderWidth: 0,
    borderRadius: 0,
    backgroundColor: "transparent",
    textAlign: "start",
    fontFamily: "inherit",
    cursor: "pointer",
    transform: {
      default: null,
      ":active": { default: null, [breakpoints.motionOk]: "scale(0.98)" },
    },
    outlineStyle: "solid",
    outlineWidth: { default: 1, ":focus-visible": 3 },
    outlineColor: { default: "transparent", ":focus-visible": colors.brandBlue700 },
    outlineOffset: { default: 2, ":focus-visible": 4 },
    transitionProperty: "outline-color, transform",
    transitionDuration: "160ms",
    transitionTimingFunction: EASE_OUT_CSS,
  },
  productCardActive: {
    outlineColor: { default: ACCENT, ":focus-visible": colors.brandBlue700 },
  },
  cardImg: {
    display: "block",
    width: "100%",
    aspectRatio: "8 / 9",
    borderRadius: 0,
    objectFit: "cover",
    outlineWidth: 1,
    outlineStyle: "solid",
    outlineColor: PHOTO_OUTLINE,
    outlineOffset: -1,
  },
  cardBody: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  cardName: {
    fontSize: { default: 15, [DESKTOP]: 16 },
    fontWeight: 700,
    lineHeight: 1.5,
    color: "inherit",
  },
  cardDesc: {
    margin: 0,
    maxWidth: "18em",
    fontSize: { default: 14, [DESKTOP]: 15 },
    lineHeight: 1.7,
    color: BODY_TEXT,
  },
  productList: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    marginTop: { default: 24, [DESKTOP]: 32 },
  },
  productText: {
    appearance: "none",
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    textAlign: "start",
    cursor: "pointer",
    color: INK,
    transitionProperty: "color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineColor: colors.brandBlue700,
    outlineWidth: 2,
    outlineOffset: 3,
  },
  productTextActive: {
    color: ACCENT,
  },
});

export function ProductsView({
  onNavigateHome,
  CatalogSection,
  SolutionsSection,
}: {
  onNavigateHome: (hash?: string) => void;
  CatalogSection?: ComponentType;
  SolutionsSection?: ComponentType;
}) {
  const [activeTab, setActiveTab] = useState<string>("personal-care");
  const [activeProductIndex, setActiveProductIndex] = useState<number>(0);
  const { compare } = useSearch({ strict: false });

  return (
    <div id="products-top" lang="zh-CN" {...stylex.props(styles.root)}>
      <section aria-label="产品与应用全景横幅" {...stylex.props(styles.bannerWrap)}>
        <h1 {...stylex.props(styles.srOnly)}>产品与应用</h1>
        <figure {...stylex.props(styles.bannerFigure)}>
          <img
            src={FEATURED_PRODUCT.bannerImage}
            alt="泛成生物产品与应用自然原貌全景"
            fetchPriority="high"
            decoding="async"
            {...stylex.props(styles.bannerImg)}
          />
        </figure>
      </section>

      <div {...stylex.props(styles.subBar)}>
        <div {...stylex.props(layout.shell, layout.inset, styles.subBarInner)}>
          <nav aria-label="面包屑导航" {...stylex.props(styles.breadcrumb)}>
            <button
              type="button"
              onClick={() => onNavigateHome("top")}
              {...stylex.props(styles.breadcrumbLink)}
            >
              首页
            </button>
            <ChevronRight size={13} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />
            <span aria-current="page" {...stylex.props(styles.breadcrumbCurrent)}>
              产品与应用
            </span>
          </nav>
          <div role="group" aria-label="品类切换" {...stylex.props(styles.chipList)}>
            {CATEGORIES.map((cat) => {
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  aria-pressed={isActive}
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

      <section
        aria-labelledby="spotlight-title"
        {...stylex.props(layout.shell, layout.inset, styles.spotlightSection)}
      >
        <div {...stylex.props(styles.spotlightGrid)}>
          <div {...stylex.props(styles.spotlightText)}>
            <h2 id="spotlight-title" {...stylex.props(styles.spotlightBrand)}>
              {FEATURED_PRODUCT.brand}
            </h2>
            <p {...stylex.props(styles.spotlightTagline)}>{FEATURED_PRODUCT.tagline}</p>
            <div {...stylex.props(styles.productList)}>
              {FEATURED_PRODUCT.items.slice(0, 2).map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={activeProductIndex === idx}
                  onClick={() => setActiveProductIndex(idx)}
                  onMouseEnter={() => setActiveProductIndex(idx)}
                  {...stylex.props(
                    styles.productText,
                    activeProductIndex === idx && styles.productTextActive,
                  )}
                >
                  <span {...stylex.props(styles.cardBody)}>
                    <span {...stylex.props(styles.cardName)}>{item.englishName}</span>
                    <span {...stylex.props(styles.cardDesc)}>{item.desc}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div
            role="group"
            aria-label="6款核心油脂原料图卡"
            {...stylex.props(styles.spotlightCardsWrap)}
          >
            {FEATURED_PRODUCT.items.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={activeProductIndex === idx}
                aria-label={item.name}
                onClick={() => setActiveProductIndex(idx)}
                onMouseEnter={() => setActiveProductIndex(idx)}
                {...stylex.props(
                  styles.productCard,
                  activeProductIndex === idx && styles.productCardActive,
                )}
              >
                <img
                  src={item.cardImage}
                  alt={item.cardAlt}
                  loading={idx < 3 ? "eager" : "lazy"}
                  decoding="async"
                  {...stylex.props(styles.cardImg)}
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {CatalogSection && compare !== "baseline" && compare !== "solutions" ? (
        <CatalogSection />
      ) : (
        <ProductCatalog categoryId={activeTab} />
      )}
      {SolutionsSection && compare !== "baseline" && compare !== "catalog" ? (
        <SolutionsSection />
      ) : (
        <ProductSolutions />
      )}

      <ContactCta
        subtitle={PRODUCTS_CTA_SUBTITLE}
        actions={[{ label: CTA.action.label, onClick: () => onNavigateHome("contact") }]}
      />
    </div>
  );
}
