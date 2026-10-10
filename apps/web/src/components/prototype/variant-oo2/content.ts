import {
  ABOUT as FIGMA_ABOUT,
  HERO as FIGMA_HERO,
  PRODUCTS_INTRO as FIGMA_PRODUCTS_INTRO,
  STRENGTHS as FIGMA_STRENGTHS,
} from "../variant-o/content";

export {
  COPYRIGHT,
  CTA,
  GLOBAL_INTRO,
  IMAGES,
  NAV_ITEMS,
  NEWS_TITLE,
  OFFICE_COLUMNS,
  PRODUCTS,
  STATS,
  STRENGTHS_INTRO,
  type StrengthIcon,
  type StrengthTone,
} from "../variant-o/content";

export const HERO = {
  headline: ["Global ingredients.", "Your next breakthrough."],
  accent: "ingredients",
  title: "创新，从源头开始",
  primary: FIGMA_HERO.primary,
  secondary: FIGMA_HERO.secondary,
} as const;

export const ABOUT = { ...FIGMA_ABOUT, cta: { label: "了解泛成", href: "#campus" } } as const;

export const PRODUCTS_INTRO = {
  ...FIGMA_PRODUCTS_INTRO,
  cta: { label: "查看全部产品", href: "#product-list" },
} as const;

export const STRENGTHS = FIGMA_STRENGTHS.map((strength) =>
  strength.link ? { ...strength, link: `了解${strength.title}` } : strength,
);

const PENDING_DETAILS = ["[日期 · 地点待补充]", "[活动介绍待补充]"] as const;

export const NEWS: readonly { title: string; details: readonly string[] }[] = [
  {
    title: "1. In-cosmetics® 拉丁美洲展",
    details: [
      "2026 年 9 月 23 – 24 日 · 巴西 圣保罗",
      "欢迎参加 2026 年 In-cosmetics® 拉丁美洲展！",
    ],
  },
  { title: "2. IFSCC 大会 2026", details: PENDING_DETAILS },
  { title: "3. Naturally Kiawah 研讨会 2026", details: PENDING_DETAILS },
  { title: "4. In-cosmetics® Global 2026", details: PENDING_DETAILS },
  { title: "5. PCHi 2026 个人护理品行业峰会", details: PENDING_DETAILS },
];

export const FOOTER_COLUMNS = [
  { heading: "公司", links: ["关于我们", "产品与应用", "研发与生产", "职业发展"] },
  { heading: "资源", links: ["技术资讯", "资源下载", "常见问题"] },
  { heading: "法律", links: ["隐私声明"] },
] as const;

export const CAMPUS_LAKE = {
  src: "/prototype/official-site/campus-lake.webp",
  depth: "/prototype/official-site/campus-lake-depth.png",
  waterline: 0.662,
  aspect: 2400 / 1712,
  alt: "Fenchem campus buildings by the lake",
} as const;

export const OFFICE_MAP_PINS: readonly { left: number; top: number }[] = [
  { left: 14.74, top: 45.09 },
  { left: 20.46, top: 39.47 },
  { left: 27.14, top: 37.75 },
  { left: 32.02, top: 81.12 },
  { left: 34.86, top: 77.07 },
  { left: 46.28, top: 30.73 },
  { left: 48.84, top: 33.23 },
  { left: 51.25, top: 36.66 },
  { left: 53.17, top: 31.67 },
  { left: 54.67, top: 81.12 },
  { left: 67.97, top: 51.79 },
  { left: 74.06, top: 55.07 },
  { left: 74.81, top: 63.03 },
  { left: 76.64, top: 68.49 },
  { left: 79.54, top: 46.49 },
  { left: 81.04, top: 58.35 },
  { left: 84.52, top: 43.84 },
];
