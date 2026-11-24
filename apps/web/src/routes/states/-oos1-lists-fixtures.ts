import * as insights from "@/components/prototype/variant-oos1/insights-data";
import * as news from "@/components/prototype/variant-oos1/news-data";
import * as products from "@/components/prototype/variant-oos1/products-data";

export type ListPage = "products" | "news" | "insights";

export type ListState = {
  id: string;
  label: string;
  page: ListPage;
  apply: () => void;
};

function replace<T>(target: readonly T[], next: readonly T[]) {
  (target as T[]).splice(0, target.length, ...next);
}

const personalCare = () => {
  const set = products.SOLUTIONS_BY_CATEGORY["personal-care"];
  if (!set) throw new Error("personal-care solutions missing");
  return set;
};

const keepSolutions = (keep: (item: products.SolutionItem) => boolean) => () => {
  const set = personalCare();
  replace(set.items, set.items.filter(keep));
};

function pick<T>(source: readonly T[], indexes: readonly number[]) {
  return indexes.map((index) => source[index % source.length]);
}

const realNews = news.COMPANY_NEWS.filter((item) => !item.id.startsWith("mock-"));
const realShows = news.DOMESTIC_SHOWS.filter((show) => !show.id.startsWith("mock-"));

export const LIST_STATES: readonly ListState[] = [
  { id: "solutions-current", label: "方案 · 当前数据", page: "products", apply: () => {} },
  {
    id: "solutions-area-empty",
    label: "方案 · 特殊护理无数据",
    page: "products",
    apply: keepSolutions((item) => item.area !== "special"),
  },
  {
    id: "solutions-one-area",
    label: "方案 · 仅面部护理",
    page: "products",
    apply: keepSolutions((item) => item.area === "face"),
  },
  {
    id: "solutions-no-areas",
    label: "方案 · 无领域分类",
    page: "products",
    apply: () => replace(personalCare().areas, []),
  },
  {
    id: "solutions-one",
    label: "方案 · 仅 1 个",
    page: "products",
    apply: keepSolutions((item) => item.id === "clay-mask"),
  },
  {
    id: "solutions-none",
    label: "方案 · 0 个",
    page: "products",
    apply: keepSolutions(() => false),
  },
  { id: "news-current", label: "新闻 · 当前数据", page: "news", apply: () => {} },
  {
    id: "news-five",
    label: "新闻 · 各 5 条",
    page: "news",
    apply: () => {
      replace(news.COMPANY_NEWS, news.COMPANY_NEWS.slice(0, 5));
      replace(news.DOMESTIC_SHOWS, news.DOMESTIC_SHOWS.slice(0, 5));
    },
  },
  {
    id: "news-six-unsorted",
    label: "新闻 · 6 条乱序",
    page: "news",
    apply: () => {
      replace(news.COMPANY_NEWS, pick(news.COMPANY_NEWS, [5, 1, 20, 0, 12, 2]));
      replace(news.DOMESTIC_SHOWS, news.DOMESTIC_SHOWS.slice(0, 6));
    },
  },
  {
    id: "news-real-only",
    label: "新闻 · 仅真实",
    page: "news",
    apply: () => {
      replace(news.COMPANY_NEWS, realNews);
      replace(news.DOMESTIC_SHOWS, realShows);
    },
  },
  {
    id: "news-empty",
    label: "新闻 · 0 条",
    page: "news",
    apply: () => {
      replace(news.COMPANY_NEWS, []);
      replace(news.DOMESTIC_SHOWS, []);
    },
  },
  { id: "insights-current", label: "洞察 · 当前数据", page: "insights", apply: () => {} },
  {
    id: "insights-five",
    label: "洞察 · 5 篇",
    page: "insights",
    apply: () => replace(insights.INSIGHTS_ARTICLES, insights.INSIGHTS_ARTICLES.slice(0, 5)),
  },
  {
    id: "insights-six-unsorted",
    label: "洞察 · 6 篇乱序",
    page: "insights",
    apply: () =>
      replace(insights.INSIGHTS_ARTICLES, pick(insights.INSIGHTS_ARTICLES, [9, 2, 0, 15, 1, 6])),
  },
  {
    id: "insights-real-only",
    label: "洞察 · 仅真实",
    page: "insights",
    apply: () =>
      replace(
        insights.INSIGHTS_ARTICLES,
        insights.INSIGHTS_ARTICLES.filter((article) => !article.id.startsWith("mock-")),
      ),
  },
];
