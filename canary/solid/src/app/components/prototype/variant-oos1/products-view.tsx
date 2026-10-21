import { Flow } from "../shared/flow";
import { breakpoints, colors } from "../../../ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ChevronRight } from "lucide-solid";
import { createMemo, createSignal, For, Show, type Component, type JSX } from "solid-js";
import { Dynamic } from "solid-js/web";

import { useSearch } from "../../../../compat/router";

import { ContactCta } from "./contact-cta";
import { CTA, PRODUCTS_CTA_SUBTITLE } from "./content";
import { CATEGORIES, FEATURED_PRODUCT, PRODUCTS_HERO_LEAD, type Category } from "./products-data";
import { ProductCatalog, ProductSolutions } from "./products-sections";
import { kitStyles } from "./subpage-kit";
import { color, ease, font, layout, media, zIndex } from "./tokens.stylex";

const MUTED_LABEL = "#52525b";
const PHOTO_OUTLINE = "rgba(0, 0, 0, 0.1)";
const ACCENT = "#78598d";
const HERO_LEAD = "#595959";

const DESKTOP = "@media (min-width: 1280px)";
const LG = "@media (min-width: 1024px)";

const styles = stylex.create({
  root: {
    backgroundColor: "#ffffff",
    color: color.ink,
    fontFamily: font.body,
    minHeight: "100vh",
  },

  bannerWrap: {
    position: "relative",
    width: "100%",
    display: "flex",
    alignItems: "flex-end",
    height: { default: 240, ["@media (min-width: 768px)"]: "clamp(300px, 31vw, 480px)" },
    overflow: "hidden",
    backgroundColor: color.navyDeep,
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
  bannerContent: {
    position: "relative",
    paddingBottom: { default: 24, ["@media (min-width: 768px)"]: 40 },
  },
  bannerTitle: {
    margin: 0,
    fontSize: { default: 34, ["@media (min-width: 768px)"]: 48, [DESKTOP]: 60 },
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: "0.072em",
    color: color.ink,
  },
  bannerLead: {
    margin: 0,
    marginTop: { default: 8, ["@media (min-width: 768px)"]: 20 },
    fontSize: { default: 15, ["@media (min-width: 768px)"]: 20 },
    lineHeight: 1.53,
    color: HERO_LEAD,
  },

  subBar: {
    position: "sticky",
    top: layout.headerHeight,
    zIndex: zIndex.subBar,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(16px)",
    boxShadow: "0 1px 0 0 rgba(26, 26, 26, 0.08)",
  },
  subBarInner: {
    display: "flex",
    alignItems: { default: "stretch", ["@media (min-width: 768px)"]: "center" },
    flexDirection: { default: "column", ["@media (min-width: 768px)"]: "row" },
    justifyContent: "space-between",
    gap: { default: 12, ["@media (min-width: 768px)"]: 24 },
    paddingBlock: { default: 12, ["@media (min-width: 768px)"]: 0 },
    height: { default: "auto", ["@media (min-width: 768px)"]: layout.subBarHeight },
  },
  breadcrumb: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexShrink: 0,
    fontSize: 13,
    letterSpacing: "0.04em",
    color: color.bodyText,
  },
  breadcrumbLink: {
    position: "relative",
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontSize: "inherit",
    letterSpacing: "inherit",
    color: { default: color.bodyText, ":hover": colors.brandBlue700 },
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
    color: color.ink,
    fontWeight: 600,
  },
  chipList: {
    display: "flex",
    alignItems: "center",
    justifyContent: { default: "flex-start", ["@media (min-width: 1024px)"]: "flex-end" },
    gap: { default: 10, ["@media (min-width: 768px)"]: 12 },
    flexGrow: 1,
    minWidth: 0,
    marginInline: { default: -16, ["@media (min-width: 768px)"]: 0 },
    paddingInlineStart: { default: 16, ["@media (min-width: 768px)"]: 0 },
    paddingInlineEnd: { default: 24, ["@media (min-width: 768px)"]: 0 },
    paddingBlock: 4,
    overflowX: "auto",
    scrollbarWidth: "none",
    maskImage: {
      default: "linear-gradient(to right, #000 calc(100% - 24px), transparent)",
      ["@media (min-width: 768px)"]: "none",
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
    color: { default: color.ink, ":hover": colors.brandBlue700 },
    position: "relative",
    cursor: "pointer",
    whiteSpace: "nowrap",
    transform: {
      default: null,
      ":active": { default: null, ["@media (prefers-reduced-motion: no-preference)"]: "scale(0.96)" },
    },
    "::before": {
      content: '""',
      position: "absolute",
      insetBlock: -4,
      insetInline: 0,
    },
    transitionProperty: "background-color, color, transform, box-shadow",
    transitionDuration: "160ms",
    transitionTimingFunction: ease.out,
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
    paddingTop: { default: 48, [DESKTOP]: 128 },
    paddingBottom: { default: 72, [DESKTOP]: 128 },
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
    fontSize: { default: 36, [media.tablet]: 44, [DESKTOP]: 52 },
    fontWeight: 700,
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
      ["@media (min-width: 640px)"]: "repeat(3, minmax(0, 1fr))",
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
      ":active": { default: null, ["@media (prefers-reduced-motion: no-preference)"]: "scale(0.98)" },
    },
    outlineStyle: "solid",
    outlineWidth: { default: 1, ":focus-visible": 3 },
    outlineColor: { default: "transparent", ":focus-visible": colors.brandBlue700 },
    outlineOffset: { default: 2, ":focus-visible": 4 },
    transitionProperty: "outline-color, transform",
    transitionDuration: "160ms",
    transitionTimingFunction: ease.out,
  },
  productCardActive: {
    outlineWidth: { default: 2, ":focus-visible": 3 },
    outlineColor: { default: ACCENT, ":focus-visible": colors.brandBlue700 },
    outlineOffset: 4,
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
  cardImgMissing: {
    backgroundColor: "#f3f4f6",
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
    color: color.bodyText,
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
    color: color.ink,
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

function CardImage(props: { src: string; alt: string; eager: boolean }) {
  const [failed, setFailed] = createSignal(false);
  return (
    <>
      {failed() ? (
        <span aria-hidden="true" {...stylex.props(styles.cardImg, styles.cardImgMissing)} />
      ) : (
        <img
          src={props.src}
          alt={props.alt}
          loading={props.eager ? "eager" : "lazy"}
          decoding="async"
          onError={() => setFailed(true)}
          {...stylex.props(styles.cardImg)}
        />
      )}
    </>
  );
}

export function ProductsView(props: {
  onNavigateHome: (hash?: string) => void;
  CatalogSection?: Component;
  SolutionsSection?: Component;
  renderHero?: (category: Category) => JSX.Element;
  renderSpotlight?: (category: Category) => JSX.Element;
}) {
  const [activeTab, setActiveTab] = createSignal<string>("personal-care");
  const [activeProductIndex, setActiveProductIndex] = createSignal<number>(0);
  const search = useSearch();
  const compare = () => search().compare;
  const activeCategory = createMemo(
    () => CATEGORIES.find((cat) => cat.id === activeTab()) ?? CATEGORIES[0],
  );
  const hero = createMemo(() => props.renderHero?.(activeCategory()));
  const spotlight = createMemo(() => props.renderSpotlight?.(activeCategory()));

  return (
    <div id="products-top" lang="zh-CN" {...stylex.props(styles.root)}>
      <Show
        when={hero() != null}
        fallback={
          <section
            aria-label="Products and applications panorama banner"
            {...stylex.props(styles.bannerWrap)}
          >
            <figure {...stylex.props(styles.bannerFigure)}>
              <img
                src={FEATURED_PRODUCT.bannerImage}
                alt="Panorama of Fenchem products and applications in their natural form"
                fetchpriority="high"
                decoding="async"
                {...stylex.props(styles.bannerImg)}
              />
            </figure>
            <div {...stylex.props(kitStyles.shell, kitStyles.inset120, styles.bannerContent)}>
              <h1 {...stylex.props(styles.bannerTitle)}>{activeCategory().label}</h1>
              <p {...stylex.props(styles.bannerLead)}>{PRODUCTS_HERO_LEAD}</p>
            </div>
          </section>
        }
      >
        {hero()}
      </Show>

      <div {...stylex.props(styles.subBar)}>
        <div {...stylex.props(kitStyles.shell, kitStyles.inset120, styles.subBarInner)}>
          <nav aria-label="Breadcrumb" {...stylex.props(styles.breadcrumb)}>
            <button
              type="button"
              onClick={() => props.onNavigateHome("top")}
              {...stylex.props(styles.breadcrumbLink)}
            >
              首页
            </button>
            <ChevronRight size={13} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />
            <span aria-current="page" {...stylex.props(styles.breadcrumbCurrent)}>
              产品与应用
            </span>
          </nav>
          <div role="group" aria-label="Categories" {...stylex.props(styles.chipList)}>
            <For each={CATEGORIES}>
              {(cat) => {
                const isActive = () => activeTab() === cat.id;
                return (
                  <button
                    type="button"
                    aria-pressed={isActive()}
                    onClick={() => setActiveTab(cat.id)}
                    {...stylex.props(styles.chip, isActive() && styles.chipActive)}
                  >
                    {cat.label}
                  </button>
                );
              }}
            </For>
          </div>
        </div>
      </div>

      <Show
        when={spotlight() != null}
        fallback={
          <section
            aria-labelledby="spotlight-title"
            {...stylex.props(kitStyles.shell, kitStyles.inset120, styles.spotlightSection)}
          >
            <div {...stylex.props(styles.spotlightGrid)}>
              <div {...stylex.props(styles.spotlightText)}>
                <h2 id="spotlight-title" {...stylex.props(styles.spotlightBrand)}>
                  {FEATURED_PRODUCT.brand}
                </h2>
                <p {...stylex.props(styles.spotlightTagline)}>{FEATURED_PRODUCT.tagline}</p>
                <div {...stylex.props(styles.productList)}>
                  <For each={FEATURED_PRODUCT.items.slice(0, 2)}>
                    {(item, idx) => (
                      <button
                        type="button"
                        aria-pressed={activeProductIndex() === idx()}
                        onClick={() => setActiveProductIndex(idx())}
                        onMouseEnter={() => setActiveProductIndex(idx())}
                        {...stylex.props(
                          styles.productText,
                          activeProductIndex() === idx() && styles.productTextActive,
                        )}
                      >
                        <span {...stylex.props(styles.cardBody)}>
                          <span {...stylex.props(styles.cardName)}>{item.englishName}</span>
                          <span {...stylex.props(styles.cardDesc)}>{item.desc}</span>
                        </span>
                      </button>
                    )}
                  </For>
                </div>
              </div>
              <div
                role="group"
                aria-label={`${FEATURED_PRODUCT.items.length} core oil ingredient cards`}
                {...stylex.props(styles.spotlightCardsWrap)}
              >
                <For each={FEATURED_PRODUCT.items}>
                  {(item, idx) => (
                    <button
                      type="button"
                      aria-pressed={activeProductIndex() === idx()}
                      aria-label={item.englishName}
                      onClick={() => setActiveProductIndex(idx())}
                      onMouseEnter={() => setActiveProductIndex(idx())}
                      {...stylex.props(
                        styles.productCard,
                        activeProductIndex() === idx() && styles.productCardActive,
                      )}
                    >
                      <CardImage src={item.cardImage} alt={item.cardAlt} eager={idx() < 3} />
                    </button>
                  )}
                </For>
              </div>
            </div>
          </section>
        }
      >
        {spotlight()}
      </Show>

      {props.CatalogSection && compare() !== "baseline" && compare() !== "solutions" ? (
        <Dynamic component={props.CatalogSection} />
      ) : (
        <ProductCatalog categoryId={activeTab()} />
      )}
      {props.SolutionsSection && compare() !== "baseline" && compare() !== "catalog" ? (
        <Flow>
          <Dynamic component={props.SolutionsSection} />
        </Flow>
      ) : (
        <Flow>
          <ProductSolutions />
        </Flow>
      )}

      <Flow>
        <ContactCta
          subtitle={PRODUCTS_CTA_SUBTITLE}
          actions={[{ label: CTA.action.label, onClick: () => props.onNavigateHome("contact") }]}
        />
      </Flow>
    </div>
  );
}
