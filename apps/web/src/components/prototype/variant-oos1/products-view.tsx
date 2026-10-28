import { Flow } from "../shared/flow";
import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { useSearch } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { useState, type ComponentType, type ReactNode } from "react";

import { ContactCta } from "./contact-cta";
import { CTA, PRODUCTS_CTA_SUBTITLE } from "./content";
import {
  CATEGORIES,
  CATEGORY_HEROES,
  FEATURED_PRODUCT,
  FIBER_SPOTLIGHTS,
  HERO_FRAME,
  SPOTLIGHT_FRAME,
  SPOTLIGHT_HEADLINE,
  SPOTLIGHT_HIDDEN_CATEGORIES,
  type Category,
  type CategoryHero,
  type FiberSpotlight,
} from "./products-data";
import { ProductCatalog, ProductSolutions } from "./products-sections";
import { kitStyles } from "./subpage-kit";
import { color, ease, font, layout, media, zIndex } from "./tokens.stylex";

const MUTED_LABEL = "#52525b";
const PHOTO_OUTLINE = "rgba(0, 0, 0, 0.1)";
const ACCENT = "#78598d";
const SPOTLIGHT_FONT = `"Noto Sans SC", ${font.body}`;
const SUB_BAR_FONT = `Arial, ${font.body}`;

const DESKTOP = breakpoints.xl;
const LG = breakpoints.lg;
const MD = breakpoints.md;

const percentOf = (value: number, whole: number) => `${((value / whole) * 100).toFixed(3)}%`;

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
    alignItems: "center",
    boxSizing: "border-box",
    height: { default: 240, [breakpoints.md]: "clamp(280px, 31vw, 480px)" },
    paddingTop: { default: 36, [media.tablet]: 32, [DESKTOP]: 0 },
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
  heroLayer: (left: string, top: string, width: string, height: string) => ({
    position: "absolute",
    overflow: "hidden",
    left: { default: 0, [MD]: left },
    top: { default: 0, [MD]: top },
    width: { default: "100%", [MD]: width },
    height: { default: "100%", [MD]: height },
  }),
  heroLayerSecondary: {
    display: { default: "none", [MD]: "block" },
  },
  heroLayerImg: {
    display: "block",
    width: "100%",
    height: "100%",
  },
  heroLayerCover: {
    objectFit: "cover",
    objectPosition: { default: "right center", [MD]: "center" },
  },
  heroLayerFill: {
    objectFit: "fill",
  },
  heroLayerCrop: (left: string, width: string) => ({
    position: "absolute",
    top: 0,
    left,
    width,
    maxWidth: "none",
  }),
  bannerContent: {
    position: "relative",
  },
  bannerTitle: {
    margin: 0,
    fontSize: { default: 34, [breakpoints.md]: "clamp(38px, 4.167vw, 60px)" },
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: "0.072em",
    color: color.ink,
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
    alignItems: { default: "stretch", [breakpoints.md]: "center" },
    flexDirection: { default: "column", [breakpoints.md]: "row" },
    justifyContent: "space-between",
    gap: { default: 12, [breakpoints.md]: 24 },
    paddingBlock: { default: 12, [breakpoints.md]: 0 },
    height: { default: "auto", [breakpoints.md]: layout.subBarHeight },
  },
  breadcrumb: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexShrink: 0,
    fontFamily: SUB_BAR_FONT,
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
    fontWeight: 700,
  },
  chipList: {
    display: "flex",
    alignItems: "center",
    justifyContent: { default: "flex-start", [breakpoints.md]: "flex-end" },
    gap: { default: 10, [breakpoints.md]: 12 },
    flexGrow: 1,
    minWidth: 0,
    marginInline: { default: -16, [breakpoints.md]: 0 },
    paddingInlineStart: { default: 16, [breakpoints.md]: 0 },
    paddingInlineEnd: { default: 24, [breakpoints.md]: 0 },
    paddingBlock: 4,
    fontFamily: SUB_BAR_FONT,
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
    backgroundColor: { default: color.chip, ":hover": color.chipHover },
    fontSize: 13,
    fontWeight: 500,
    letterSpacing: "0.04em",
    color: { default: color.ink, ":hover": colors.brandBlue700 },
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
    transitionTimingFunction: ease.out,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 2,
  },
  chipActive: {
    backgroundColor: { default: colors.brandBlue700, ":hover": colors.brandBlue800 },
    color: { default: colors.paper, ":hover": colors.paper },
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
    fontFamily: SPOTLIGHT_FONT,
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
  cardImg: {
    display: "block",
    width: "100%",
    aspectRatio: "1266 / 952",
    borderRadius: 0,
    objectFit: "cover",
    outlineWidth: 1,
    outlineStyle: "solid",
    outlineColor: PHOTO_OUTLINE,
    outlineOffset: -1,
  },
  cardImgMissing: {
    backgroundColor: color.chip,
  },
  cardBody: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  cardName: {
    fontFamily: SPOTLIGHT_FONT,
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
  fiberStage: (backdrop: string) => ({
    position: "relative",
    overflow: "hidden",
    width: "100%",
    aspectRatio: `${SPOTLIGHT_FRAME.width} / ${SPOTLIGHT_FRAME.height}`,
    backgroundColor: backdrop,
    containerType: "inline-size",
  }),
  fiberHeadline: (left: string) => ({
    position: "absolute",
    zIndex: 1,
    left,
    top: `${((SPOTLIGHT_HEADLINE.top / SPOTLIGHT_FRAME.height) * 100).toFixed(3)}%`,
    margin: 0,
    fontFamily: SPOTLIGHT_FONT,
    fontSize: `${((SPOTLIGHT_HEADLINE.fontSize / SPOTLIGHT_FRAME.width) * 100).toFixed(3)}cqw`,
    fontWeight: 500,
    lineHeight: SPOTLIGHT_HEADLINE.lineHeight / SPOTLIGHT_HEADLINE.fontSize,
    letterSpacing: `${(SPOTLIGHT_HEADLINE.letterSpacing / SPOTLIGHT_HEADLINE.fontSize).toFixed(4)}em`,
    whiteSpace: "nowrap",
    color: color.ink,
  }),
  fiberPhotoBox: (left: string, top: string, width: string, height: string) => ({
    position: "absolute",
    overflow: "hidden",
    left,
    top,
    width,
    height,
  }),
  fiberPhoto: (left: string, top: string, width: string, height: string) => ({
    position: "absolute",
    left,
    top,
    width,
    height,
    maxWidth: "none",
  }),
});

function CategoryHeroArt({ hero }: { hero: CategoryHero }) {
  return hero.layers.map(({ src, box, fit, crop }, index) => {
    const primary = index === 0;
    return (
      <div
        key={`${src}-${box.x}`}
        {...stylex.props(
          styles.heroLayer(
            percentOf(box.x, HERO_FRAME.width),
            percentOf(box.y, HERO_FRAME.height),
            percentOf(box.width, HERO_FRAME.width),
            percentOf(box.height, HERO_FRAME.height),
          ),
          !primary && styles.heroLayerSecondary,
        )}
      >
        <img
          src={src}
          alt={primary ? hero.alt : ""}
          fetchPriority={primary ? "high" : "auto"}
          decoding="async"
          {...stylex.props(
            styles.heroLayerImg,
            fit === "cover" ? styles.heroLayerCover : styles.heroLayerFill,
            crop && styles.heroLayerCrop(`${crop.x}%`, `${crop.width}%`),
          )}
        />
      </div>
    );
  });
}

function FiberSpotlightPanel({ spotlight }: { spotlight: FiberSpotlight }) {
  const { photoBox, crop } = spotlight;
  return (
    <section
      aria-labelledby="fiber-spotlight-title"
      {...stylex.props(kitStyles.shell, kitStyles.inset120, styles.spotlightSection)}
    >
      <div {...stylex.props(styles.fiberStage(spotlight.backdrop))}>
        <h2
          id="fiber-spotlight-title"
          {...stylex.props(
            styles.fiberHeadline(percentOf(spotlight.headlineX, SPOTLIGHT_FRAME.width)),
          )}
        >
          {SPOTLIGHT_HEADLINE.text}
        </h2>
        <div
          {...stylex.props(
            styles.fiberPhotoBox(
              percentOf(photoBox.x, SPOTLIGHT_FRAME.width),
              percentOf(photoBox.y, SPOTLIGHT_FRAME.height),
              percentOf(photoBox.width, SPOTLIGHT_FRAME.width),
              percentOf(photoBox.height, SPOTLIGHT_FRAME.height),
            ),
          )}
        >
          <img
            src={spotlight.photo}
            alt={spotlight.photoAlt}
            loading="lazy"
            decoding="async"
            {...stylex.props(
              styles.fiberPhoto(`${crop.x}%`, `${crop.y}%`, `${crop.width}%`, `${crop.height}%`),
            )}
          />
        </div>
      </div>
    </section>
  );
}

function CardImage({ src, alt, eager }: { src: string; alt: string; eager: boolean }) {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <span aria-hidden="true" {...stylex.props(styles.cardImg, styles.cardImgMissing)} />
  ) : (
    <img
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
      {...stylex.props(styles.cardImg)}
    />
  );
}

export function ProductsBanner({
  title,
  label,
  children,
}: {
  title: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <section aria-label={label} {...stylex.props(styles.bannerWrap)}>
      <figure {...stylex.props(styles.bannerFigure)}>{children}</figure>
      <div {...stylex.props(kitStyles.shell, kitStyles.inset120, styles.bannerContent)}>
        <h1 {...stylex.props(styles.bannerTitle)}>{title}</h1>{" "}
      </div>
    </section>
  );
}

export function ProductsBannerImage({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      fetchPriority="high"
      decoding="async"
      {...stylex.props(styles.bannerImg)}
    />
  );
}

export function ProductsSubBar({
  activeId,
  onSelect,
  onNavigateHome,
  current = "产品与应用",
}: {
  activeId?: string;
  onSelect?: (id: string) => void;
  onNavigateHome: (hash?: string) => void;
  current?: string;
}) {
  return (
    <div {...stylex.props(styles.subBar)}>
      <div {...stylex.props(kitStyles.shell, kitStyles.inset120, styles.subBarInner)}>
        <nav aria-label="Breadcrumb" {...stylex.props(styles.breadcrumb)}>
          <button
            type="button"
            onClick={() => onNavigateHome("top")}
            {...stylex.props(styles.breadcrumbLink)}
          >
            首页
          </button>
          <ChevronRight size={13} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />
          <span aria-current="page" {...stylex.props(styles.breadcrumbCurrent)}>
            {current}
          </span>
        </nav>
        {onSelect && (
          <div role="group" aria-label="Categories" {...stylex.props(styles.chipList)}>
            {CATEGORIES.map((cat) => {
              const isActive = activeId === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => onSelect(cat.id)}
                  {...stylex.props(styles.chip, isActive && styles.chipActive)}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export function ProductsView({
  onNavigateHome,
  CatalogSection,
  SolutionsSection,
  renderHero,
  renderSpotlight,
  category,
}: {
  onNavigateHome: (hash?: string) => void;
  category?: { id: string };
  CatalogSection?: ComponentType;
  SolutionsSection?: ComponentType;
  renderHero?: (category: Category) => ReactNode;
  renderSpotlight?: (category: Category) => ReactNode;
}) {
  const [activeTab, setActiveTab] = useState<string>(category?.id ?? "personal-care");
  const [seenCategory, setSeenCategory] = useState(category);
  if (category !== seenCategory) {
    setSeenCategory(category);
    if (category) setActiveTab(category.id);
  }
  const [activeProductIndex, setActiveProductIndex] = useState<number | null>(null);
  const { compare } = useSearch({ strict: false });
  const activeCategory = CATEGORIES.find((cat) => cat.id === activeTab) ?? CATEGORIES[0];
  const categoryHero = CATEGORY_HEROES[activeCategory.id];
  const fiberSpotlight = FIBER_SPOTLIGHTS[activeCategory.id];
  const showSpotlight = !SPOTLIGHT_HIDDEN_CATEGORIES.has(activeCategory.id);

  return (
    <div id="products-top" lang="zh-CN" {...stylex.props(styles.root)}>
      {renderHero?.(activeCategory) ?? (
        <ProductsBanner
          title={activeCategory.label}
          label="Products and applications panorama banner"
        >
          {categoryHero ? (
            <CategoryHeroArt key={activeCategory.id} hero={categoryHero} />
          ) : (
            <img
              src={FEATURED_PRODUCT.bannerImage}
              srcSet={FEATURED_PRODUCT.bannerSrcSet}
              sizes="(min-width: 768px) clamp(1200px, 124vw, 1920px), 960px"
              alt="Panorama of Fenchem products and applications in their natural form"
              fetchPriority="high"
              decoding="async"
              {...stylex.props(styles.bannerImg)}
            />
          )}
        </ProductsBanner>
      )}

      <ProductsSubBar
        activeId={activeTab}
        onSelect={setActiveTab}
        onNavigateHome={onNavigateHome}
      />

      {renderSpotlight?.(activeCategory) ??
        (!showSpotlight ? null : fiberSpotlight ? (
          <FiberSpotlightPanel spotlight={fiberSpotlight} />
        ) : (
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
              <CardImage
                src={FEATURED_PRODUCT.mosaicImage}
                alt={FEATURED_PRODUCT.mosaicAlt}
                eager
              />
            </div>
          </section>
        ))}

      {CatalogSection && compare !== "baseline" && compare !== "solutions" ? (
        <CatalogSection />
      ) : (
        <ProductCatalog key={activeTab} categoryId={activeCategory.id} />
      )}
      {SolutionsSection && compare !== "baseline" && compare !== "catalog" ? (
        <Flow>
          <SolutionsSection />
        </Flow>
      ) : (
        <Flow>
          <ProductSolutions key={activeTab} categoryId={activeTab} />
        </Flow>
      )}

      <Flow>
        <ContactCta
          subtitle={PRODUCTS_CTA_SUBTITLE}
          actions={[{ label: CTA.action.label, onClick: () => onNavigateHome("contact") }]}
        />
      </Flow>
    </div>
  );
}
