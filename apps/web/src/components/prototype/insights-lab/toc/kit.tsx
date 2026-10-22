import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ChevronRight } from "lucide-react";
import { useMotionValue } from "motion/react";
import { useEffect, useState, useSyncExternalStore, type ReactNode } from "react";

import { Flow } from "../../shared/flow";
import { ContactCta } from "../../variant-oos1/contact-cta";
import type { InsightSection } from "../../variant-oos1/insights-data";
import { SubPageBanner } from "../../variant-oos1/subpage-kit";
import { color, layout, zIndex } from "../../variant-oos1/tokens.stylex";
import {
  ArticleMeta,
  ArticlePreview,
  ArticleSections,
  STICKY_OFFSET,
  articleAnchor,
  blockText,
  kitStyles,
  labStyles,
  padIndex,
  sectionAnchor,
  useLabArticles,
  type LabArticle,
  type SubPageProps,
} from "../kit";
import { lab } from "../tokens.stylex";

export {
  STICKY_OFFSET,
  articleAnchor,
  kitStyles,
  labStyles,
  padIndex,
  sectionAnchor,
  useLabArticles,
  type LabArticle,
  type SubPageProps,
};
export { readMinutes, usePickerHost } from "../kit";

const DESKTOP = breakpoints.xl;

export const READING_GAP = 32;

export type ReadingPosition = { article: number; chapter: number };

const BEFORE_FLOW: ReadingPosition = { article: -1, chapter: -1 };

export const splitNumeral = (label: string) => {
  const at = label.indexOf("　");
  return at < 0
    ? { numeral: "", text: label }
    : { numeral: label.slice(0, at), text: label.slice(at + 1) };
};

export const sectionChars = (section: InsightSection) =>
  [section.title, ...section.blocks.flatMap(blockText)].join("").length;

export const introChars = (article: LabArticle) =>
  [article.lead ?? "", article.thesis?.statement ?? "", ...article.intro].join("").length;

export const formatChars = (chars: number) => `${Math.max(10, Math.round(chars / 10) * 10)} 字`;

export const shortTitle = (article: LabArticle) => article.navLabel ?? article.title;

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

export function useReadingPosition(articles: readonly LabArticle[], line: number) {
  const [position, setPosition] = useState<ReadingPosition>(BEFORE_FLOW);
  const articleProgress = useMotionValue(0);
  const chapterProgress = useMotionValue(0);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      let article = -1;
      let chapter = -1;
      let articleBox: DOMRect | undefined;
      articles.forEach((entry, index) => {
        const box = document.getElementById(articleAnchor(entry))?.getBoundingClientRect();
        if (box && box.top <= line) {
          article = index;
          articleBox = box;
        }
      });
      const current = articles[article];
      if (current && articleBox) {
        const boxes = current.sections.map((section) =>
          document.getElementById(sectionAnchor(current, section))?.getBoundingClientRect(),
        );
        boxes.forEach((box, index) => {
          if (box && box.top <= line) chapter = index;
        });
        const start = boxes[chapter]?.top ?? articleBox.top;
        const end = boxes[chapter + 1]?.top ?? articleBox.bottom;
        articleProgress.set(clamp01((line - articleBox.top) / articleBox.height));
        chapterProgress.set(clamp01((line - start) / Math.max(1, end - start)));
      } else {
        articleProgress.set(0);
        chapterProgress.set(0);
      }
      setPosition((previous) =>
        previous.article === article && previous.chapter === chapter
          ? previous
          : { article, chapter },
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [articles, line, articleProgress, chapterProgress]);

  return { position, articleProgress, chapterProgress };
}

export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export const locationLabel = (articles: readonly LabArticle[], position: ReadingPosition) => {
  const article = articles[position.article];
  if (!article) return null;
  const section = article.sections[position.chapter];
  return { article, section: section ? splitNumeral(section.navLabel) : null };
};

const styles = stylex.create({
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
    alignItems: "center",
    justifyContent: "space-between",
    gap: { default: 16, [breakpoints.md]: 24 },
    height: layout.subBarHeight,
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
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontSize: "inherit",
    letterSpacing: "inherit",
    fontFamily: "inherit",
    color: {
      default: color.bodyText,
      ":hover": { default: null, [lab.hover]: colors.brandBlue700 },
    },
    cursor: "pointer",
  },
  breadcrumbCurrent: {
    color: color.ink,
    fontWeight: 600,
  },
  barSlot: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    flexGrow: 1,
    minWidth: 0,
    height: "100%",
  },
  flow: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 72, [DESKTOP]: 120 },
    maxWidth: 800,
    marginInline: "auto",
  },
  article: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 22, [DESKTOP]: 26 },
    paddingTop: { default: 24, [DESKTOP]: 32 },
    borderTopWidth: 2,
    borderTopStyle: "solid",
    borderTopColor: color.ink,
  },
  head: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 14, [DESKTOP]: 18 },
  },
  sections: {
    marginTop: { default: 20, [DESKTOP]: 28 },
  },
});

export function TocPage({
  onNavigateHome,
  bar,
  under,
  children,
}: SubPageProps & { bar?: ReactNode; under?: ReactNode; children: ReactNode }) {
  return (
    <div id="insights-top" lang="zh-CN" {...stylex.props(kitStyles.root)}>
      <SubPageBanner
        title="行业洞察"
        lead="来自泛成应用研发团队的原料趋势、配方方法与法规观察"
        image="/prototype/official-site/product-human-nutrition.webp"
        imageAlt="行业洞察"
        titleId="insights-banner-title"
      />
      <div {...stylex.props(styles.subBar)}>
        <div {...stylex.props(kitStyles.shell, kitStyles.inset120, styles.subBarInner)}>
          <nav aria-label="Breadcrumb" {...stylex.props(styles.breadcrumb)}>
            <button
              type="button"
              onClick={() => onNavigateHome("top")}
              {...stylex.props(styles.breadcrumbLink, kitStyles.focusRing)}
            >
              首页
            </button>
            <ChevronRight size={14} aria-hidden="true" />
            <span aria-current="page" {...stylex.props(styles.breadcrumbCurrent)}>
              行业洞察
            </span>
          </nav>
          <div {...stylex.props(styles.barSlot)}>{bar}</div>
        </div>
        {under}
      </div>
      <div {...stylex.props(labStyles.pageSection)}>
        <div {...stylex.props(kitStyles.shell, kitStyles.inset120)}>{children}</div>
      </div>
      <Flow>
        <ContactCta
          id="insights-bottom-cta"
          title="需要索取样品或技术资料？"
          subtitle="我们的应用团队随时为您提供添加量指导与配方参考。"
          actions={[{ label: "联系我们", onClick: () => onNavigateHome("contact") }]}
        />
      </Flow>
    </div>
  );
}

export function ArticleFlow({
  articles,
  sx,
}: {
  articles: readonly LabArticle[];
  sx?: stylex.StyleXStyles;
}) {
  return (
    <div {...stylex.props(styles.flow, sx)}>
      {articles.map((article) => {
        const titleId = `${article.id}-flow-title`;
        return (
          <article
            key={article.id}
            id={articleAnchor(article)}
            aria-labelledby={titleId}
            {...stylex.props(styles.article, kitStyles.anchor)}
          >
            <header {...stylex.props(styles.head)}>
              <ArticleMeta article={article} />
              <h2 id={titleId} {...stylex.props(labStyles.docTitle)}>
                {article.title}
              </h2>
              {article.lead ? <p {...stylex.props(labStyles.docLead)}>{article.lead}</p> : null}
            </header>
            <ArticlePreview article={article} />
            <div {...stylex.props(styles.sections)}>
              <ArticleSections article={article} />
            </div>
          </article>
        );
      })}
    </div>
  );
}
