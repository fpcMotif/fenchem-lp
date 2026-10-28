import * as z from "zod/mini";

import catalogCategoryRows from "./data/catalog-categories.json";
import catalogGroupRows from "./data/catalog-groups.json";
import {
  catalogCategoryRowSchema,
  catalogGroupRowSchema,
  solutionAreaRowSchema,
  solutionRowSchema,
  type CatalogItem,
  type SolutionAreaId,
} from "./data/schemas";
import solutionAreaRows from "./data/solution-areas.json";
import solutionRows from "./data/solutions.json";

export type { CatalogItem, SolutionAreaId };

export interface Category {
  id: string;
  label: string;
  englishLabel: string;
}

export interface FeaturedItem {
  id: string;
  name: string;
  englishName: string;
  desc: string;
  cardImage: string;
  cardAlt: string;
}

export interface FeaturedProduct {
  brand: string;
  tagline: string;
  items: FeaturedItem[];
  mosaicImage: string;
  mosaicAlt: string;
  bannerImage: string;
  bannerSrcSet: string;
}

export interface FrameBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface HeroLayer {
  src: string;
  box: FrameBox;
  fit: "cover" | "fill";
  crop?: { x: number; width: number };
}

export interface CategoryHero {
  alt: string;
  layers: HeroLayer[];
}

export interface FiberSpotlight {
  photo: string;
  photoAlt: string;
  backdrop: string;
  headlineX: number;
  photoBox: FrameBox;
  crop: FrameBox;
}

export interface CatalogGroup {
  id: string;
  label: string;
  englishLabel: string;
  intro?: string;
  items: CatalogItem[];
}

export interface CategoryCatalog {
  lead?: string;
  specLabel: string;
  featuresLabel: string;
  groups: CatalogGroup[];
}

export interface SolutionArea {
  id: SolutionAreaId;
  label: string;
  englishLabel: string;
}

export interface SolutionItem {
  id: string;
  area: SolutionAreaId;
  title: string;
  englishName: string;
  subtitle: string;
  overview: string[];
  functions: string[];
  keyIngredients: string[];
  challenges: string[];
  texture: string[];
  applications: string[];
}

export interface SolutionSet {
  areas: SolutionArea[];
  items: SolutionItem[];
}

export const DEFAULT_SOLUTIONS_CATEGORY_ID = "personal-care";

export const CATEGORIES: Category[] = [
  { id: "personal-care", label: "个人护理", englishLabel: "Personal care" },
  { id: "functional-food", label: "功能性食品", englishLabel: "Functional food" },
  { id: "human-nutrition", label: "人类营养健康", englishLabel: "Human nutrition and health" },
  { id: "pet-health", label: "宠物健康", englishLabel: "Pet health" },
];

export const PRODUCTS_HERO_LEAD = "基于科学证据的健康营养方案";

export const FEATURED_ITEMS: FeaturedItem[] = [
  {
    id: "shea-oil",
    name: "液态乳木果油",
    englishName: "OLVE'Care™ Shea Oil",
    desc: "更加全能，突破形态界限。高流动性和铺展性，无需担心高添加量下的结晶问题。",
    cardImage: "/products/figma/oos1-shea-tile-1.jpg",
    cardAlt: "OLVE'Care™ Shea Oil, soft pastel brushstrokes of a fluid texture",
  },
  {
    id: "shea-butter",
    name: "精制乳木果油",
    englishName: "OLVE'Care™ Shea butter",
    desc: "经典固态版，肤感丝滑丰厚",
    cardImage: "/products/figma/oos1-shea-tile-2.jpg",
    cardAlt: "OLVE'Care™ Shea Butter, a white shea blossom on pale blue",
  },
  {
    id: "acai-oil",
    name: "巴西莓油",
    englishName: "Amazon Açai Berry Oil",
    desc: "冷榨深绿色纯净油体，花青素与多酚含量极高，抗氧化抗糖化，弹润活肤。",
    cardImage: "/products/figma/oos1-shea-tile-3.jpg",
    cardAlt: "Deep purple Amazonian açaí superfruit oil rich in polyphenols",
  },
  {
    id: "avocado-oil",
    name: "优质鳄梨油",
    englishName: "Virgin Avocado Oil",
    desc: "鲜切牛油果冷榨，富含 ω-9 与高含量不皂化物，抗炎修护，强韧屏障。",
    cardImage: "/products/figma/oos1-shea-tile-4.jpg",
    cardAlt: "Freshly cut green avocado, rich in natural monounsaturated fatty acids",
  },
  {
    id: "brazil-nut-oil",
    name: "巴西坚果油",
    englishName: "Wild Brazil Nut Oil",
    desc: "富含天然微量元素硒、维生素 E 与不饱和脂肪酸，赋予毛鳞片镜面光泽。",
    cardImage: "/products/figma/oos1-shea-tile-5.jpg",
    cardAlt: "A split green nut with its pale kernel among leaves",
  },
  {
    id: "plant-squalane",
    name: "高纯植物角鲨烷",
    englishName: "Pure Plant Squalane",
    desc: "100% 植物橄榄来源，极致亲肤丝滑透气无黏腻，与皮肤脂质膜完美相融。",
    cardImage: "/products/figma/oos1-shea-tile-6.jpg",
    cardAlt: "Soft peach brushstrokes of a silky plant squalane texture",
  },
];

export const FEATURED_PRODUCT: FeaturedProduct = {
  brand: "OLVE'Care™ Shea",
  tagline: "天然全形态乳木果油脂，适配任何配方剂型",
  items: FEATURED_ITEMS,
  mosaicImage: "/products/figma/oos1-shea-mosaic.jpg",
  mosaicAlt:
    "Six painted oil ingredients: shea textures, shea blossom, açaí, avocado and Brazil nut",
  bannerImage: "/products/banner-1920.webp",
  bannerSrcSet: [1280, 1920, 2880, 4096]
    .map((width) => `/products/banner-${width}.webp ${width}w`)
    .join(", "),
};

export const HERO_FRAME = { width: 1440, height: 446 };

export const CATEGORY_HEROES: Partial<Record<string, CategoryHero>> = {
  "human-nutrition": {
    alt: "A young athlete stretching forward on a track, wearing earbuds",
    layers: [
      {
        src: "/products/figma/oos1-hero-nutrition.jpg",
        box: { x: 0, y: 0, width: 1440, height: 446 },
        fit: "cover",
      },
    ],
  },
  "functional-food": {
    alt: "A woman smiling as she eats a home-cooked meal at a wooden table",
    layers: [
      {
        src: "/products/figma/oos1-hero-functional-food.jpg",
        box: { x: 0, y: -1, width: 1440, height: 447 },
        fit: "cover",
      },
    ],
  },
  "pet-health": {
    alt: "A woman on an orange sofa smiling down at a corgi lying on the carpet",
    layers: [
      {
        src: "/products/figma/oos1-hero-pet.jpg",
        box: { x: -46, y: -129, width: 1531, height: 656 },
        fit: "cover",
      },
    ],
  },
};

export const SPOTLIGHT_FRAME = { width: 1200, height: 485 };

export const SPOTLIGHT_HEADLINE = {
  text: "源自纤维，不止纤维。",
  top: 203,
  fontSize: 52,
  lineHeight: 79.2,
  letterSpacing: 4.32,
};

export const FIBER_SPOTLIGHTS: Partial<Record<string, FiberSpotlight>> = {
  "human-nutrition": {
    photo: "/products/figma/oos1-spotlight-nutrition.png",
    photoAlt: "A young woman in sportswear drinking from a supplement bottle",
    backdrop: "#c3e0ff",
    headlineX: 91,
    photoBox: { x: 729, y: 0, width: 401, height: 485 },
    crop: { x: 0, y: 0, width: 100, height: 100 },
  },
  "functional-food": {
    photo: "/products/figma/oos1-spotlight-food.png",
    photoAlt: "A smiling young man drinking from a fibre drink bottle",
    backdrop: "#ffa362",
    headlineX: 67,
    photoBox: { x: 626, y: 0, width: 574, height: 485 },
    crop: { x: 0, y: 0, width: 100, height: 100 },
  },
};

export const SPOTLIGHT_HIDDEN_CATEGORIES = new Set(["pet-health"]);

const parseRows = <T extends z.ZodMiniType>(name: string, schema: T, rows: unknown): z.infer<T>[] =>
  z.array(schema).parse(rows, { error: () => `Invalid ${name}` });

const SOLUTION_AREA_ROWS = parseRows(
  "solution-areas.json",
  solutionAreaRowSchema,
  solutionAreaRows,
);
const SOLUTION_ROWS = parseRows("solutions.json", solutionRowSchema, solutionRows);
const CATALOG_CATEGORY_ROWS = parseRows(
  "catalog-categories.json",
  catalogCategoryRowSchema,
  catalogCategoryRows,
);
const CATALOG_GROUP_ROWS = parseRows(
  "catalog-groups.json",
  catalogGroupRowSchema,
  catalogGroupRows,
);

const withoutCategory = <T extends { categoryId: string }>({
  categoryId: _categoryId,
  ...rest
}: T) => rest;

const solutionSetFor = (categoryId: string): SolutionSet => ({
  areas: SOLUTION_AREA_ROWS.filter((row) => row.categoryId === categoryId).map(withoutCategory),
  items: SOLUTION_ROWS.filter((row) => row.categoryId === categoryId).map(withoutCategory),
});

export const SOLUTIONS_BY_CATEGORY: Partial<Record<string, SolutionSet>> = Object.fromEntries(
  [...new Set(SOLUTION_ROWS.map((row) => row.categoryId))].map((id) => [id, solutionSetFor(id)]),
);

export const SOLUTION_AREAS: SolutionArea[] = SOLUTIONS_BY_CATEGORY["personal-care"]?.areas ?? [];
export const SOLUTION_ITEMS: SolutionItem[] = SOLUTIONS_BY_CATEGORY["personal-care"]?.items ?? [];

export const CATALOG_BY_CATEGORY: Partial<Record<string, CategoryCatalog>> = Object.fromEntries(
  CATALOG_CATEGORY_ROWS.map(({ categoryId, ...catalog }) => [
    categoryId,
    {
      ...catalog,
      groups: CATALOG_GROUP_ROWS.filter((row) => row.categoryId === categoryId).map(
        withoutCategory,
      ),
    },
  ]),
);

export const CATALOG_GROUPS: CatalogGroup[] = CATALOG_BY_CATEGORY["personal-care"]?.groups ?? [];
