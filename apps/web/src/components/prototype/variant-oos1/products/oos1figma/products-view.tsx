import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import type { SubPageProps } from "../../index";
import { PRODUCTS_HERO_LEAD, type Category } from "../../products-data";
import { ProductsView } from "../../products-view";
import { kitStyles } from "../../subpage-kit";
import { color } from "../../tokens.stylex";

const DESKTOP = breakpoints.xl;
const LG = breakpoints.lg;
const MD = breakpoints.md;

type HeroArt = {
  src: string;
  alt: string;
  title: string;
  lead: string;
  tone: "dark" | "light";
  layout: "nutrition" | "food";
};

const FIGMA_HERO_BY_CATEGORY: Partial<Record<string, HeroArt>> = {
  "human-nutrition": {
    src: "/products/figma/hero-nutrition.jpg",
    alt: "An athlete resting between sprints on a running track",
    title: "人类营养健康",
    lead: PRODUCTS_HERO_LEAD,
    tone: "dark",
    layout: "nutrition",
  },
  "functional-food": {
    src: "/products/figma/hero-functional-food.jpg",
    alt: "A woman enjoying a home-cooked meal at a wooden table",
    title: "源于自然，精于科学",
    lead: "1995 年创立于南京 · 三十年专注营养、宠物健康与个人护理原料",
    tone: "light",
    layout: "food",
  },
};

const FIBER_SPOTLIGHT_CATEGORIES = new Set(["human-nutrition", "functional-food"]);

const styles = stylex.create({
  hero: {
    position: "relative",
    display: "flex",
    alignItems: "flex-end",
    width: "100%",
    height: { default: 240, [MD]: "clamp(300px, 31vw, 480px)" },
    overflow: "hidden",
    backgroundColor: color.navyDeep,
  },
  photoRight: {
    position: "absolute",
    insetBlock: 0,
    insetInlineEnd: 0,
    width: { default: "100%", [MD]: "76.32%" },
    height: "100%",
    objectFit: "cover",
    objectPosition: "right center",
  },
  photoRightFood: {
    width: { default: "100%", [MD]: "75.76%" },
  },
  leftEdgeStretch: {
    display: { default: "none", [MD]: "block" },
    position: "absolute",
    insetBlock: 0,
    insetInlineStart: 0,
    width: "33.54%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "773.94% 100%",
    backgroundPosition: "0 0",
  },
  leftEdgeStretchFood: {
    insetInlineStart: "-13.06%",
    width: "57.01%",
    backgroundSize: "384.66% 100%",
    backgroundPosition: "-0.25% 0",
  },
  mobileTextScrim: {
    display: { default: "block", [MD]: "none" },
    position: "absolute",
    inset: 0,
    backgroundImage: "linear-gradient(to top, rgba(0, 0, 0, 0.62), rgba(0, 0, 0, 0) 75%)",
  },
  content: {
    position: "relative",
    paddingBottom: { default: 24, [MD]: 40 },
  },
  title: {
    margin: 0,
    fontSize: { default: 34, [MD]: 48, [DESKTOP]: 60 },
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: "0.072em",
    textWrap: "balance",
    color: color.ink,
  },
  titleLight: {
    color: colors.paper,
  },
  lead: {
    margin: 0,
    marginTop: { default: 8, [MD]: 20 },
    fontSize: { default: 15, [MD]: 20 },
    lineHeight: 1.53,
    color: "#595959",
  },
  leadLight: {
    fontSize: { default: 14, [MD]: 17 },
    letterSpacing: "0.08em",
    textWrap: "pretty",
    color: "rgba(255, 255, 255, 0.84)",
  },

  spotlight: {
    paddingBlock: { default: 48, [DESKTOP]: 128 },
  },
  spotlightGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [LG]: "minmax(0, 0.85fr) minmax(0, 1.15fr)",
    },
    gap: { default: 32, [DESKTOP]: 64 },
    alignItems: "center",
  },
  brand: {
    margin: 0,
    fontSize: { default: 36, [MD]: 44, [DESKTOP]: 52 },
    fontWeight: 900,
    lineHeight: 1.1,
    color: color.ink,
  },
  slogan: {
    margin: 0,
    marginTop: { default: 16, [DESKTOP]: 32 },
    fontSize: { default: 32, [MD]: 44, [DESKTOP]: 52 },
    fontWeight: 700,
    lineHeight: 1.52,
    textWrap: "balance",
    color: color.ink,
  },
  plate: {
    display: "block",
    width: "100%",
    aspectRatio: "3 / 2",
    objectFit: "cover",
    outlineWidth: 1,
    outlineStyle: "solid",
    outlineColor: "rgba(0, 0, 0, 0.1)",
    outlineOffset: -1,
  },
});

function CategoryHero(props: { art: HeroArt }) {
  const art = props.art;
  const light = art.tone === "light";
  const food = art.layout === "food";
  return (
    <section aria-label={`${art.title} banner`} {...stylex.attrs(styles.hero)}>
      <img
        src={art.src}
        alt={art.alt}
        fetchpriority="high"
        decoding="async"
        {...stylex.attrs(styles.photoRight, food && styles.photoRightFood)}
      />
      <div
        aria-hidden="true"
        {...stylex.attrs(styles.leftEdgeStretch, food && styles.leftEdgeStretchFood)}
        style={{ "background-image": `url(${art.src})` }}
      />
      {light && <div aria-hidden="true" {...stylex.attrs(styles.mobileTextScrim)} />}
      <div {...stylex.attrs(kitStyles.shell, kitStyles.inset120, styles.content)}>
        <h1 {...stylex.attrs(styles.title, light && styles.titleLight)}>{art.title}</h1>
        <p {...stylex.attrs(styles.lead, light && styles.leadLight)}>{art.lead}</p>
      </div>
    </section>
  );
}

function FiberSpotlight() {
  return (
    <section
      aria-labelledby="fiber-spotlight-title"
      {...stylex.attrs(kitStyles.shell, kitStyles.inset120, styles.spotlight)}
    >
      <div {...stylex.attrs(styles.spotlightGrid)}>
        <div>
          <h2 id="fiber-spotlight-title" lang="en" {...stylex.attrs(styles.brand)}>
            In fiber
          </h2>
          <p {...stylex.attrs(styles.slogan)}>源自纤维，不止纤维</p>
        </div>
        <img
          src="/products/figma/fiber-plate.jpg"
          alt="A plate of fibre-rich foods: greens, berries, legumes, grains and nuts"
          loading="lazy"
          decoding="async"
          {...stylex.attrs(styles.plate)}
        />
      </div>
    </section>
  );
}

function renderHero(category: Category) {
  const art = FIGMA_HERO_BY_CATEGORY[category.id];
  return art ? <CategoryHero art={art} /> : undefined;
}

function renderSpotlight(category: Category) {
  return FIBER_SPOTLIGHT_CATEGORIES.has(category.id) ? <FiberSpotlight /> : undefined;
}

export function ProductsOOS1Figma(props: SubPageProps) {
  return <ProductsView {...props} renderHero={renderHero} renderSpotlight={renderSpotlight} />;
}
