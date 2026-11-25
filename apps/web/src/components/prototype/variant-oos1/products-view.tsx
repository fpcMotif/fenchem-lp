import { Flow } from "../shared/flow";
import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { ChevronRight } from "@fenchem-lp/ui/components/lucide";
import { Toggle, ToggleGroup } from "@ui-sdk/solid/toggle";
import { createMemo, createSignal, For, Show, type Component } from "solid-js";
import { dynamic, type JSX } from "@solidjs/web";
import { useSearch } from "@tanstack/solid-router";

import { ContactCta } from "./contact-cta";
import { CTA } from "./content";
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

const DESKTOP = "@media (min-width: 1280px)";
const LG = "@media (min-width: 1024px)";
const MD = "@media (min-width: 768px)";

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
    height: { default: 240, ["@media (min-width: 768px)"]: "clamp(280px, 31vw, 480px)" },
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
    fontSize: { default: 34, ["@media (min-width: 768px)"]: "clamp(38px, 4.167vw, 60px)" },
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
    justifyContent: { default: "flex-start", ["@media (min-width: 768px)"]: "flex-end" },
    gap: { default: 10, ["@media (min-width: 768px)"]: 12 },
    flexGrow: 1,
    minWidth: 0,
    marginInline: { default: -16, ["@media (min-width: 768px)"]: 0 },
    paddingInlineStart: { default: 16, ["@media (min-width: 768px)"]: 0 },
    paddingInlineEnd: { default: 24, ["@media (min-width: 768px)"]: 0 },
    paddingBlock: 4,
    fontFamily: SUB_BAR_FONT,
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
      ":active": {
        default: null,
        ["@media (prefers-reduced-motion: no-preference)"]: "scale(0.96)",
      },
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

const sxProps = (...args: ReadonlyArray<StyleXStyles | false | null | undefined>) =>
  stylex.attrs(...args);

function CategoryHeroArt(props: { hero: CategoryHero }) {
  return (
    <For each={props.hero.layers}>
      {(layer, index) => {
        const primary = () => index() === 0;
        return (
          <div
            {...sxProps(
              styles.heroLayer(
                percentOf(layer.box.x, HERO_FRAME.width),
                percentOf(layer.box.y, HERO_FRAME.height),
                percentOf(layer.box.width, HERO_FRAME.width),
                percentOf(layer.box.height, HERO_FRAME.height),
              ),
              !primary() && styles.heroLayerSecondary,
            )}
          >
            <img
              src={layer.src}
              alt={primary() ? props.hero.alt : ""}
              fetchpriority={primary() ? "high" : "auto"}
              decoding="async"
              {...sxProps(
                styles.heroLayerImg,
                layer.fit === "cover" ? styles.heroLayerCover : styles.heroLayerFill,
                layer.crop && styles.heroLayerCrop(`${layer.crop.x}%`, `${layer.crop.width}%`),
              )}
            />
          </div>
        );
      }}
    </For>
  );
}

function FiberSpotlightPanel(props: { spotlight: FiberSpotlight }) {
  return (
    <section
      aria-labelledby="fiber-spotlight-title"
      {...stylex.attrs(kitStyles.shell, kitStyles.inset120, styles.spotlightSection)}
    >
      <div {...stylex.attrs(styles.fiberStage(props.spotlight.backdrop))}>
        <h2
          id="fiber-spotlight-title"
          {...stylex.attrs(
            styles.fiberHeadline(percentOf(props.spotlight.headlineX, SPOTLIGHT_FRAME.width)),
          )}
        >
          {SPOTLIGHT_HEADLINE.text}
        </h2>
        <div
          {...stylex.attrs(
            styles.fiberPhotoBox(
              percentOf(props.spotlight.photoBox.x, SPOTLIGHT_FRAME.width),
              percentOf(props.spotlight.photoBox.y, SPOTLIGHT_FRAME.height),
              percentOf(props.spotlight.photoBox.width, SPOTLIGHT_FRAME.width),
              percentOf(props.spotlight.photoBox.height, SPOTLIGHT_FRAME.height),
            ),
          )}
        >
          <img
            src={props.spotlight.photo}
            alt={props.spotlight.photoAlt}
            loading="lazy"
            decoding="async"
            {...stylex.attrs(
              styles.fiberPhoto(
                `${props.spotlight.crop.x}%`,
                `${props.spotlight.crop.y}%`,
                `${props.spotlight.crop.width}%`,
                `${props.spotlight.crop.height}%`,
              ),
            )}
          />
        </div>
      </div>
    </section>
  );
}

function CardImage(props: { src: string; alt: string; eager: boolean }) {
  const [failed, setFailed] = createSignal(false);
  return (
    <>
      {failed() ? (
        <span aria-hidden="true" {...stylex.attrs(styles.cardImg, styles.cardImgMissing)} />
      ) : (
        <img
          src={props.src}
          alt={props.alt}
          loading={props.eager ? "eager" : "lazy"}
          decoding="async"
          onError={() => setFailed(true)}
          {...stylex.attrs(styles.cardImg)}
        />
      )}
    </>
  );
}

export function ProductsBanner(props: { title: string; label: string; children: JSX.Element }) {
  return (
    <section aria-label={props.label} {...stylex.attrs(styles.bannerWrap)}>
      <figure {...stylex.attrs(styles.bannerFigure)}>{props.children}</figure>
      <div {...stylex.attrs(kitStyles.shell, kitStyles.inset120, styles.bannerContent)}>
        <h1 {...stylex.attrs(styles.bannerTitle)}>{props.title}</h1>{" "}
      </div>
    </section>
  );
}

export function ProductsBannerImage(props: { src: string; alt: string }) {
  return (
    <img
      src={props.src}
      alt={props.alt}
      fetchpriority="high"
      decoding="async"
      {...stylex.attrs(styles.bannerImg)}
    />
  );
}

export function ProductsSubBar(props: {
  activeId?: string;
  onSelect?: (id: string) => void;
  onNavigateHome: (hash?: string) => void;
  current?: string;
}) {
  return (
    <div {...stylex.attrs(styles.subBar)}>
      <div {...stylex.attrs(kitStyles.shell, kitStyles.inset120, styles.subBarInner)}>
        <nav aria-label="Breadcrumb" {...stylex.attrs(styles.breadcrumb)}>
          <button
            type="button"
            onClick={() => props.onNavigateHome("top")}
            {...stylex.attrs(styles.breadcrumbLink)}
          >
            首页
          </button>
          <ChevronRight size={13} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />
          <span aria-current="page" {...stylex.attrs(styles.breadcrumbCurrent)}>
            {props.current ?? "产品与应用"}
          </span>
        </nav>
        <Show when={props.onSelect}>
          {(onSelect) => (
            <ToggleGroup
              value={props.activeId ? [props.activeId] : []}
              deselectable={false}
              onValueChange={(vals) => {
                if (vals[0]) onSelect()(vals[0]);
              }}
              aria-label="Categories"
              {...stylex.attrs(styles.chipList)}
            >
              <For each={CATEGORIES}>
                {(cat) => (
                  <Toggle
                    value={cat.id}
                    class={(state) =>
                      sxProps(styles.chip, state.pressed && styles.chipActive).class
                    }
                  >
                    {cat.label}
                  </Toggle>
                )}
              </For>
            </ToggleGroup>
          )}
        </Show>
      </div>
    </div>
  );
}

export function ProductsView(props: {
  onNavigateHome: (hash?: string) => void;
  category?: { id: string };
  CatalogSection?: Component;
  SolutionsSection?: Component;
  renderHero?: (category: Category) => JSX.Element;
  renderSpotlight?: (category: Category) => JSX.Element;
}) {
  const [activeTab, setActiveTab] = createSignal<string>(
    (prev) => props.category?.id ?? prev ?? "personal-care",
  );
  const [activeProductIndex, setActiveProductIndex] = createSignal<number | null>(null);
  const search = useSearch({ strict: false });
  const compare = () => search().compare;
  const CatalogSection = dynamic(() => props.CatalogSection);
  const SolutionsSection = dynamic(() => props.SolutionsSection);
  const activeCategory = createMemo<Category | undefined>(
    () => CATEGORIES.find((cat) => cat.id === activeTab()) ?? CATEGORIES[0],
  );
  const categoryId = () => activeCategory()?.id ?? "";
  const categoryLabel = () => activeCategory()?.label ?? "产品与应用";
  const categoryHero = () => (categoryId() ? CATEGORY_HEROES[categoryId()] : undefined);
  const fiberSpotlight = () => (categoryId() ? FIBER_SPOTLIGHTS[categoryId()] : undefined);
  const showSpotlight = () =>
    categoryId() ? !SPOTLIGHT_HIDDEN_CATEGORIES.has(categoryId()) : true;
  const hero = createMemo(() => {
    const category = activeCategory();
    return category ? props.renderHero?.(category) : undefined;
  });
  const spotlight = createMemo(() => {
    const category = activeCategory();
    return category ? props.renderSpotlight?.(category) : undefined;
  });

  return (
    <div id="products-top" lang="zh-CN" {...stylex.attrs(styles.root)}>
      <Show
        when={hero() != null}
        fallback={
          <ProductsBanner title={categoryLabel()} label="Products and applications panorama banner">
            <Show
              when={categoryHero()}
              keyed
              fallback={
                <img
                  src={FEATURED_PRODUCT.bannerImage}
                  srcset={FEATURED_PRODUCT.bannerSrcSet}
                  sizes="(min-width: 768px) clamp(1200px, 124vw, 1920px), 960px"
                  alt="Panorama of Fenchem products and applications in their natural form"
                  fetchpriority="high"
                  decoding="async"
                  {...stylex.attrs(styles.bannerImg)}
                />
              }
            >
              {(heroArt) => <CategoryHeroArt hero={heroArt} />}
            </Show>
          </ProductsBanner>
        }
      >
        {hero()}
      </Show>

      <ProductsSubBar
        activeId={activeTab()}
        onSelect={setActiveTab}
        onNavigateHome={props.onNavigateHome}
      />

      <Show
        when={spotlight() != null}
        fallback={
          <Show when={showSpotlight()}>
            <Show
              when={fiberSpotlight()}
              fallback={
                <section
                  aria-labelledby="spotlight-title"
                  {...stylex.attrs(kitStyles.shell, kitStyles.inset120, styles.spotlightSection)}
                >
                  <div {...stylex.attrs(styles.spotlightGrid)}>
                    <div {...stylex.attrs(styles.spotlightText)}>
                      <h2 id="spotlight-title" {...stylex.attrs(styles.spotlightBrand)}>
                        {FEATURED_PRODUCT.brand}
                      </h2>
                      <p {...stylex.attrs(styles.spotlightTagline)}>{FEATURED_PRODUCT.tagline}</p>
                      <div {...stylex.attrs(styles.productList)}>
                        <For each={FEATURED_PRODUCT.items.slice(0, 2)}>
                          {(item, idx) => (
                            <button
                              type="button"
                              aria-pressed={activeProductIndex() === idx() ? "true" : "false"}
                              onClick={() => setActiveProductIndex(idx())}
                              onMouseEnter={() => setActiveProductIndex(idx())}
                              {...stylex.attrs(
                                styles.productText,
                                activeProductIndex() === idx() && styles.productTextActive,
                              )}
                            >
                              <span {...stylex.attrs(styles.cardBody)}>
                                <span {...stylex.attrs(styles.cardName)}>{item.englishName}</span>
                                <span {...stylex.attrs(styles.cardDesc)}>{item.desc}</span>
                              </span>
                            </button>
                          )}
                        </For>
                      </div>
                    </div>
                    <CardImage
                      src={FEATURED_PRODUCT.mosaicImage}
                      alt={FEATURED_PRODUCT.mosaicAlt}
                      eager
                    />
                  </div>
                </section>
              }
            >
              {(fiber) => <FiberSpotlightPanel spotlight={fiber()} />}
            </Show>
          </Show>
        }
      >
        {spotlight()}
      </Show>

      {props.CatalogSection && compare() !== "baseline" && compare() !== "solutions" ? (
        <CatalogSection />
      ) : (
        <Show when={activeTab()} keyed>
          {(_tab) => <ProductCatalog categoryId={categoryId()} />}
        </Show>
      )}
      {props.SolutionsSection && compare() !== "baseline" && compare() !== "catalog" ? (
        <Flow>
          <SolutionsSection />
        </Flow>
      ) : (
        <Flow>
          <Show when={activeTab()} keyed>
            {(tab) => <ProductSolutions categoryId={tab} />}
          </Show>
        </Flow>
      )}

      <Flow>
        <ContactCta
          actions={[{ label: CTA.action.label, onClick: () => props.onNavigateHome("contact") }]}
        />
      </Flow>
    </div>
  );
}
