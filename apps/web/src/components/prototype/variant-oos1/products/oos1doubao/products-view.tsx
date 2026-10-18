import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ChevronRight } from "@fenchem-lp/ui/components/lucide";
import { AnimatePresence, m } from "@/compat/motion";
import { createSignal, createUniqueId, Show, untrack } from "solid-js";

import { EASE } from "@/components/prototype/motion-constants";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { ContactCta } from "../../contact-cta";
import { CTA, PRODUCTS_CTA_SUBTITLE } from "../../content";
import { CATEGORIES, FEATURED_PRODUCT } from "../../products-data";
import { ProductCatalog, ProductSolutions } from "../../products-sections";
import { kitStyles } from "../../subpage-kit";

const INK = "#1a1a1a";
const BODY_TEXT = "#4d4d4d";
const MUTED_LABEL = "#6b6b70";
const SURFACE = "#f6f5f2";
const HAIRLINE = "#e4e2de";
const ACCENT = colors.brandGreen700;
const SOFT_RULE = HAIRLINE;
const EASE_OUT_CSS = "cubic-bezier(0.22, 1, 0.36, 1)";
const BODY_FONT =
  '"Source Han Sans SC", "Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif';
const SERIF_FONT =
  '"Instrument Serif", "Times New Roman", "Source Han Sans SC", "Noto Sans SC", serif';

const TABLET = "@media (min-width: 768px) and (max-width: 1279.98px)";
const DESKTOP = breakpoints.xl;
const MD = breakpoints.md;
const LG = breakpoints.lg;
const HEADER_HEIGHT = 80;
const GUTTER = 24;
const TWELVE = "repeat(12, minmax(0, 1fr))";

const underBar = {
  content: '""',
  position: "absolute",
  backgroundColor: ACCENT,
  transitionProperty: "transform",
  transitionDuration: "400ms",
  transitionTimingFunction: EASE_OUT_CSS,
  insetInline: 0,
  bottom: -1,
  height: 2,
  transform: "scaleX(0)",
  transformOrigin: "left center",
} as const;

const styles = stylex.create({
  root: {
    backgroundColor: colors.paper,
    color: INK,
    fontFamily: BODY_FONT,
    minHeight: "100vh",
  },
  barOn: {
    "::after": {
      transform: "scale(1)",
    },
  },
  selectedText: {
    color: { default: INK, ":hover": INK },
  },

  hero: {
    position: "relative",
    height: { default: 300, [MD]: "max(360px, 30vw)" },
    overflow: "hidden",
    backgroundColor: "#f3eee6",
  },
  heroImg: {
    position: "absolute",
    inset: 0,
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center top",
  },
  heroContent: {
    position: "relative",
    paddingTop: { default: 100, [MD]: 120, [DESKTOP]: 128 },
  },
  breadcrumb: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 13,
    lineHeight: "20px",
    letterSpacing: "0.04em",
    color: "#333333",
  },
  breadcrumbLink: {
    position: "relative",
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    fontSize: "inherit",
    lineHeight: "inherit",
    letterSpacing: "inherit",
    color: { default: "#333333", ":hover": colors.brandBlue700 },
    cursor: "pointer",
    transitionProperty: "color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 2,
    "::before": {
      content: '""',
      position: "absolute",
      insetBlock: -12,
      insetInline: -8,
    },
  },
  breadcrumbCurrent: {
    color: INK,
  },
  pageTitle: {
    margin: 0,
    marginTop: { default: 12, [DESKTOP]: 16 },
    fontSize: { default: 34, [TABLET]: 44, [DESKTOP]: 56 },
    fontWeight: 500,
    lineHeight: { default: "42px", [TABLET]: "52px", [DESKTOP]: "64px" },
    letterSpacing: "0.03em",
    color: INK,
  },

  tabBar: {
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: HAIRLINE,
  },
  tabRow: {
    display: "flex",
    gap: { default: 32, [MD]: 40 },
    overflowX: "auto",
    scrollbarWidth: "none",
  },
  textTab: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    flexShrink: 0,
    height: 56,
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    fontSize: 15,
    fontWeight: 400,
    lineHeight: 1.2,
    letterSpacing: "0.04em",
    whiteSpace: "nowrap",
    color: { default: MUTED_LABEL, ":hover": colors.brandBlue700 },
    cursor: "pointer",
    transitionProperty: "color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: -2,
    "::after": underBar,
  },

  section: {
    paddingTop: { default: 64, [DESKTOP]: 96 },
    paddingBottom: { default: 72, [DESKTOP]: 112 },
    scrollMarginTop: HEADER_HEIGHT,
  },

  feature: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [LG]: TWELVE },
    gridTemplateRows: { default: "auto", [LG]: "1fr auto auto auto 1fr" },
    columnGap: GUTTER,
  },
  featureHead: {
    gridColumn: { default: "1 / -1", [LG]: "7 / 13" },
    gridRow: { default: "auto", [LG]: "2" },
  },
  featureMedia: {
    gridColumn: { default: "1 / -1", [LG]: "1 / 6" },
    gridRow: { default: "auto", [LG]: "1 / 6" },
    position: "relative",
    marginTop: { default: 28, [LG]: 0 },
    aspectRatio: "4 / 5",
    overflow: "hidden",
    backgroundColor: SURFACE,
    outlineWidth: 1,
    outlineStyle: "solid",
    outlineColor: "rgba(0, 0, 0, 0.06)",
    outlineOffset: -1,
  },
  featureImg: {
    position: "absolute",
    inset: 0,
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "35% 30%",
    opacity: 0,
    transform: "scale(1.3)",
    transformOrigin: "35% 30%",
    transitionProperty: "opacity",
    transitionDuration: "450ms",
    transitionTimingFunction: "ease",
  },
  featureImgShown: {
    opacity: 1,
  },
  brandTitle: {
    margin: 0,
    fontSize: { default: 30, [TABLET]: 34, [DESKTOP]: 36 },
    fontWeight: 500,
    lineHeight: 1,
    letterSpacing: "-0.02em",
    color: INK,
  },
  trademark: {
    marginInlineStart: "0.04em",
    fontSize: "0.3em",
    fontWeight: 500,
    letterSpacing: 0,
    verticalAlign: "1.6em",
  },
  trademarkInline: {
    marginInlineStart: "0.04em",
    fontSize: "0.6em",
    lineHeight: 0,
    verticalAlign: "0.6em",
  },
  serifAccent: {
    fontFamily: SERIF_FONT,
    fontStyle: "italic",
    fontWeight: 400,
    fontSize: "1.2em",
    letterSpacing: "-0.01em",
    color: ACCENT,
  },
  tagline: {
    margin: 0,
    marginTop: 16,
    fontSize: 16,
    lineHeight: "26px",
    color: BODY_TEXT,
    textWrap: "pretty",
  },
  featureDetail: {
    gridColumn: { default: "1 / -1", [LG]: "7 / 13" },
    gridRow: { default: "auto", [LG]: "3" },
    marginTop: 32,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: SOFT_RULE,
  },
  pair: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    margin: 0,
  },
  detailPrimary: {
    fontSize: 24,
    fontWeight: 500,
    lineHeight: "32px",
    letterSpacing: "0.04em",
    color: INK,
  },
  detailDesc: {
    margin: 0,
    marginTop: 16,
    maxWidth: 600,
    minHeight: 56,
    fontSize: 16,
    lineHeight: "28px",
    color: BODY_TEXT,
    textWrap: "pretty",
  },
  thumbs: {
    gridColumn: { default: "1 / -1", [LG]: "7 / 13" },
    gridRow: { default: "auto", [LG]: "4" },
    alignSelf: "start",
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(3, minmax(0, 1fr))",
      [breakpoints.sm]: "repeat(6, minmax(0, 1fr))",
    },
    columnGap: 8,
    rowGap: 20,
    marginTop: 48,
  },
  thumb: {
    appearance: "none",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minWidth: 0,
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    textAlign: "start",
    color: { default: MUTED_LABEL, ":hover": colors.brandBlue700 },
    cursor: "pointer",
    transform: {
      default: null,
      ":active": { default: null, [breakpoints.motionOk]: "scale(0.97)" },
    },
    transitionProperty: "transform, color",
    transitionDuration: "160ms",
    transitionTimingFunction: EASE_OUT_CSS,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 4,
  },
  thumbFrame: {
    position: "relative",
    display: "block",
    aspectRatio: "4 / 5",
    minHeight: 0,
    backgroundColor: SURFACE,
    "::after": { ...underBar, bottom: -6 },
  },
  thumbFrameSelected: {
    "::after": {
      transform: "scaleX(1)",
    },
  },
  thumbClip: {
    display: "block",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    outlineWidth: 1,
    outlineStyle: "solid",
    outlineColor: "rgba(0, 0, 0, 0.08)",
    outlineOffset: -1,
    opacity: { default: 0.65, ":hover": 1 },
    transitionProperty: "opacity",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
  },
  thumbClipSelected: {
    opacity: 1,
  },
  thumbImg: {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transform: {
      default: "scale(1.04)",
      ":hover": { default: "scale(1.04)", [breakpoints.motionOk]: "scale(1.1)" },
    },
    transitionProperty: "transform",
    transitionDuration: "600ms",
    transitionTimingFunction: EASE_OUT_CSS,
  },
  thumbName: {
    display: "block",
    paddingTop: 16,
    fontSize: 13,
    fontWeight: 400,
    lineHeight: "20px",
    whiteSpace: "nowrap",
    color: "inherit",
  },
  thumbNameSelected: {
    fontWeight: 500,
  },
  latin: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "20px",
    color: MUTED_LABEL,
  },
});

function BrandTitle(props: { text: string }) {
  const [mark, family] = untrack(() => props.text).split("™");
  return (
    <>
      {mark}
      {family !== undefined && <sup {...stylex.attrs(styles.trademark)}>™</sup>}
      {family && <span {...stylex.attrs(styles.serifAccent)}>{family}</span>}
    </>
  );
}

function Trademarked(props: { text: string }) {
  const [mark, rest] = untrack(() => props.text).split("™");
  if (rest === undefined) return <>{props.text}</>;
  return (
    <>
      {mark}
      <sup {...stylex.attrs(styles.trademarkInline)}>™</sup>
      {rest}
    </>
  );
}

export function ProductsOOS1Doubao(props: { onNavigateHome: (hash?: string) => void }) {
  const reduce = useReducedMotion();
  const detailId = createUniqueId();
  const [activeTab, setActiveTab] = createSignal<string>("personal-care");
  const [activeProductIndex, setActiveProductIndex] = createSignal<number>(0);
  const activeProduct = () => FEATURED_PRODUCT.items[activeProductIndex()];

  return (
    <div id="products-top" lang="zh-CN" {...stylex.attrs(styles.root)}>
      <section aria-labelledby="products-title">
        <div {...stylex.attrs(styles.hero)}>
          <img
            src={FEATURED_PRODUCT.bannerImage}
            alt="Panorama of Fenchem products and applications in their natural form"
            fetchpriority="high"
            decoding="async"
            {...stylex.attrs(styles.heroImg)}
          />
          <div {...stylex.attrs(kitStyles.shell, kitStyles.inset120, styles.heroContent)}>
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
                产品与应用
              </span>
            </nav>
            <h1 id="products-title" {...stylex.attrs(styles.pageTitle)}>
              产品与应用
            </h1>
          </div>
        </div>
        <div {...stylex.attrs(styles.tabBar)}>
          <div
            role="group"
            aria-label="Categories"
            {...stylex.attrs(kitStyles.shell, kitStyles.inset120, styles.tabRow)}
          >
            {CATEGORIES.map((cat) => {
              const isActive = () => activeTab() === cat.id;
              return (
                <button
                  type="button"
                  aria-pressed={isActive() ? "true" : "false"}
                  onClick={() => setActiveTab(cat.id)}
                  {...stylex.attrs(
                    styles.textTab,
                    isActive() && styles.barOn,
                    isActive() && styles.selectedText,
                  )}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="spotlight-title"
        {...stylex.attrs(kitStyles.shell, kitStyles.inset120, styles.section)}
      >
        <div {...stylex.attrs(styles.feature)}>
          <div {...stylex.attrs(styles.featureHead)}>
            <h2 id="spotlight-title" {...stylex.attrs(styles.brandTitle)}>
              <BrandTitle text={FEATURED_PRODUCT.brand} />
            </h2>
            <p {...stylex.attrs(styles.tagline)}>{FEATURED_PRODUCT.tagline}</p>
          </div>
          <div {...stylex.attrs(styles.featureMedia)}>
            {FEATURED_PRODUCT.items.map((item, idx) => (
              <img
                src={item.cardImage}
                alt={idx === activeProductIndex() ? item.cardAlt : ""}
                aria-hidden={idx !== activeProductIndex() ? "true" : "false"}
                decoding="async"
                {...stylex.attrs(
                  styles.featureImg,
                  idx === activeProductIndex() && styles.featureImgShown,
                )}
              />
            ))}
          </div>
          <div id={detailId} aria-live="polite" {...stylex.attrs(styles.featureDetail)}>
            <AnimatePresence mode="wait" initial={false}>
              <Show when={activeProduct()} keyed>
                {(product) => (
                  <m.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -3 }}
                    transition={{ duration: reduce() ? 0 : 0.22, ease: EASE }}
                  >
                    <p {...stylex.attrs(styles.pair)}>
                      <span {...stylex.attrs(styles.detailPrimary)}>{product.name}</span>
                      <span {...stylex.attrs(styles.latin)}>
                        <Trademarked text={product.englishName} />
                      </span>
                    </p>
                    <p {...stylex.attrs(styles.detailDesc)}>{product.desc}</p>
                  </m.div>
                )}
              </Show>
            </AnimatePresence>
          </div>
          <div
            role="group"
            aria-label="6 core oil ingredient cards"
            {...stylex.attrs(styles.thumbs)}
          >
            {FEATURED_PRODUCT.items.map((item, idx) => {
              const isActive = () => activeProductIndex() === idx;
              return (
                <button
                  type="button"
                  aria-pressed={isActive() ? "true" : "false"}
                  aria-controls={detailId}
                  onClick={() => setActiveProductIndex(idx)}
                  onMouseEnter={() => setActiveProductIndex(idx)}
                  {...stylex.attrs(styles.thumb, isActive() && styles.selectedText)}
                >
                  <span
                    {...stylex.attrs(styles.thumbFrame, isActive() && styles.thumbFrameSelected)}
                  >
                    <span
                      {...stylex.attrs(styles.thumbClip, isActive() && styles.thumbClipSelected)}
                    >
                      <img
                        src={item.cardImage}
                        alt=""
                        decoding="async"
                        {...stylex.attrs(styles.thumbImg)}
                      />
                    </span>
                  </span>
                  <span {...stylex.attrs(styles.thumbName, isActive() && styles.thumbNameSelected)}>
                    {item.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <ProductCatalog categoryId={activeTab()} />
      <ProductSolutions />

      <ContactCta
        subtitle={PRODUCTS_CTA_SUBTITLE}
        actions={[{ label: CTA.action.label, onClick: () => props.onNavigateHome("contact") }]}
      />
    </div>
  );
}
