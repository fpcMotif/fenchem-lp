import {
  CTA as OOX_CTA,
  HERO,
  PRODUCTS_INTRO as OOX_PRODUCTS_INTRO,
  STATS,
} from "../variant-oox/content";

export {
  ABOUT,
  CAMPUS,
  COPYRIGHT,
  ECHO,
  FOOTER_COLUMNS,
  GLOBAL_INTRO,
  HERO,
  IMAGES,
  MARKET_CTA,
  MARKETS,
  NAV_ITEMS,
  NEWS,
  NEWS_TITLE,
  OFFICE_COLUMNS,
  OFFICE_MAP_PINS,
  STATS,
  STRENGTHS,
  STRENGTHS_INTRO,
  type Market,
  type StrengthIcon,
  type StrengthTone,
} from "../variant-oox/content";

export const HERO_DECK = {
  label: "四大应用领域",
  aria: "查看四大应用领域",
} as const;

export const DECK_OPEN = {
  title: OOX_PRODUCTS_INTRO.title,
  echo: OOX_PRODUCTS_INTRO.echo,
  lead: OOX_PRODUCTS_INTRO.lead,
} as const;

export const DECK_CLOSE = {
  line: HERO.title,
  echo: "one source",
  cta: { label: "咨询方案", href: "#contact" },
} as const;

export const CONTACT = {
  ...OOX_CTA,
  echo: "let's talk",
} as const;

export const MARQUEE = [
  ...STATS.map((stat) => ({ figure: `${stat.value}${stat.unit ?? ""}`, label: stat.label })),
  { figure: "04", label: "应用领域" },
];
