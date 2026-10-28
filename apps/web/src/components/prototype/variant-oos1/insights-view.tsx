import { Flow } from "../shared/flow";
import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import { useState } from "react";

import { EASE } from "@/components/prototype/motion-constants";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { ContactCta } from "./contact-cta";
import {
  INSIGHTS_ARTICLES,
  INSIGHTS_PAGE,
  type InsightArticle,
  type InsightBlock,
  type InsightSection,
} from "./insights-data";
import { ProductsBanner, ProductsBannerImage, ProductsSubBar } from "./products-view";
import { kitStyles } from "./subpage-kit";
import { color, ease, media } from "./tokens.stylex";

const HAIRLINE = "rgba(26, 26, 26, 0.12)";
const DESKTOP = breakpoints.xl;

const styles = stylex.create({
  pageSection: {
    paddingTop: { default: 32, [DESKTOP]: 48 },
    paddingBottom: { default: 48, [DESKTOP]: 72 },
    containerType: "inline-size",
  },
  articleWrapper: {
    position: "relative",
  },
  articleMain: {
    width: "100%",
    minWidth: 0,
  },
  compactArticle: {
    paddingBlock: { default: 28, [DESKTOP]: 40 },
    borderBottomWidth: { default: 1, ":last-child": 0 },
    borderBottomStyle: "solid",
    borderBottomColor: HAIRLINE,
  },
  articleHead: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.md]: "minmax(0, 5fr) minmax(0, 7fr)",
    },
    alignItems: "center",
    columnGap: { default: 0, [breakpoints.md]: 40, [DESKTOP]: 72 },
    rowGap: 20,
  },
  articleHeadReverse: {
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.md]: "minmax(0, 7fr) minmax(0, 5fr)",
    },
  },
  articleFigure: {
    margin: 0,
    aspectRatio: "16 / 10",
    overflow: "hidden",
    backgroundColor: color.pageTint,
  },
  articleFigureEnd: {
    order: { default: 0, [breakpoints.md]: 2 },
  },
  articleImage: {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  compactText: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    minWidth: 0,
    maxWidth: 640,
  },
  readingColumn: {
    maxWidth: 860,
  },
  compactTitle: {
    margin: 0,
    fontSize: { default: 24, [media.tablet]: 26, [DESKTOP]: 32 },
    fontWeight: 700,
    lineHeight: 1.3,
    letterSpacing: "-0.01em",
    color: color.ink,
  },
  compactLead: {
    margin: 0,
    fontSize: { default: 15, [DESKTOP]: 16 },
    lineHeight: 1.75,
    color: color.bodyText,
  },
  compactExcerpt: {
    margin: 0,
    fontSize: { default: 14, [DESKTOP]: 15 },
    lineHeight: 1.8,
    color: color.muted,
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
    overflow: "hidden",
    textWrap: "pretty",
  },
  expandRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    paddingTop: 6,
  },
  compactButton: {
    whiteSpace: "nowrap",
  },
  compactPreview: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 22, [DESKTOP]: 26 },
    paddingTop: { default: 28, [DESKTOP]: 36 },
    paddingBottom: { default: 24, [DESKTOP]: 32 },
  },
  coreViewBox: {
    marginBlock: 6,
    paddingBlock: { default: 18, [DESKTOP]: 22 },
    paddingInline: { default: 20, [DESKTOP]: 26 },
    backgroundColor: color.pageTint,
  },
  coreViewParagraph: {
    margin: 0,
    fontSize: { default: 15, [DESKTOP]: 16 },
    lineHeight: 1.85,
    color: color.ink,
  },
  coreViewLabel: {
    fontWeight: 700,
    color: colors.brandBlue700,
    marginInlineEnd: 10,
  },
  paragraphStack: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  bodyParagraph: {
    margin: 0,
    fontSize: { default: 15, [DESKTOP]: 16 },
    lineHeight: 1.9,
    color: color.bodyText,
    textWrap: "pretty",
  },
  expandMeta: {
    margin: 0,
    fontSize: 14,
    lineHeight: 1.5,
    color: color.muted,
    fontVariantNumeric: "tabular-nums",
  },
  expandButton: {
    appearance: "none",
    display: "inline-flex",
    alignItems: "center",
    flexShrink: 0,
    gap: 6,
    height: 40,
    paddingInlineStart: 20,
    paddingInlineEnd: 16,
    borderRadius: 999,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.brandBlue700,
    backgroundColor: { default: colors.brandBlue700, ":hover": colors.brandBlue800 },
    color: colors.paper,
    fontFamily: "inherit",
    fontSize: 15,
    fontWeight: 600,
    letterSpacing: "0.02em",
    cursor: "pointer",
    transform: {
      default: null,
      ":active": { default: "scale(0.97)", "@media (prefers-reduced-motion: reduce)": null },
    },
    transitionProperty: "background-color, color, transform",
    transitionDuration: "160ms",
    transitionTimingFunction: ease.out,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 2,
  },
  expandButtonOutline: {
    backgroundColor: { default: "transparent", ":hover": color.pageTint },
    color: colors.brandBlue700,
  },
  expandIcon: {
    transitionProperty: "transform",
    transitionDuration: "220ms",
    transitionTimingFunction: ease.out,
  },
  expandIconRotated: {
    transform: "rotate(180deg)",
  },

  expandedWrap: {
    overflow: "hidden",
  },
  expandedInner: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 44, [DESKTOP]: 56 },
    paddingTop: { default: 32, [DESKTOP]: 44 },
    marginTop: 8,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: HAIRLINE,
  },
  chapterSection: {
    display: "flex",
    flexDirection: "column",
    gap: 18,
  },
  chapterHeading: {
    margin: 0,
    fontSize: { default: 21, [media.tablet]: 24, [DESKTOP]: 26 },
    fontWeight: 700,
    lineHeight: 1.35,
    letterSpacing: "-0.01em",
    color: color.ink,
  },
  bulletList: {
    margin: 0,
    paddingInlineStart: 20,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  bulletItem: {
    fontSize: { default: 15, [DESKTOP]: 16 },
    lineHeight: 1.85,
    color: color.bodyText,
  },

  // Clean horizontal-ruled editorial rows (No gray boxes, no card clutter)
  editorialList: {
    margin: 0,
    padding: 0,
    listStyle: "none",
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: HAIRLINE,
  },
  editorialRow: {
    display: "grid",
    gridTemplateColumns: {
      default: "1fr",
      [breakpoints.md]: "220px minmax(0, 1fr)",
    },
    columnGap: 32,
    rowGap: 6,
    alignItems: "baseline",
    paddingBlock: { default: 18, [DESKTOP]: 22 },
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: HAIRLINE,
  },
  editorialTerm: {
    margin: 0,
    fontSize: { default: 16, [DESKTOP]: 17 },
    fontWeight: 700,
    lineHeight: 1.5,
    color: color.ink,
  },

  // Section 六: 开发提示 box + 说明
  devPromptBox: {
    marginTop: 6,
    paddingBlock: { default: 16, [DESKTOP]: 20 },
    paddingInline: { default: 20, [DESKTOP]: 24 },
    backgroundColor: color.pageTint,
  },
  devPromptParagraph: {
    margin: 0,
    fontSize: { default: 14, [DESKTOP]: 15 },
    lineHeight: 1.8,
    color: color.ink,
  },
  devPromptLabel: {
    fontWeight: 700,
    color: colors.brandBlue700,
    marginInlineEnd: 10,
  },
  disclaimer: {
    margin: 0,
    fontSize: 13,
    lineHeight: 1.75,
    color: color.muted,
  },
});

const articleAnchor = (article: InsightArticle) => `${article.id}-article`;
const sectionAnchor = (article: InsightArticle, section: InsightSection) =>
  `${article.id}-${section.slug}`;

export function InsightsView({ onNavigateHome }: { onNavigateHome: (target?: string) => void }) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleArticle = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <div id="insights-top" lang="zh-CN" {...stylex.props(kitStyles.root)}>
      <ProductsBanner title="行业洞察" label="Industry insights banner">
        <ProductsBannerImage
          src="/products/figma/oos1-insights-banner.jpg"
          alt={INSIGHTS_PAGE.imageAlt}
        />
      </ProductsBanner>

      <ProductsSubBar current="行业洞察" onNavigateHome={onNavigateHome} />

      <div {...stylex.props(styles.pageSection)}>
        <div {...stylex.props(kitStyles.shell, kitStyles.inset120)}>
          <div {...stylex.props(styles.articleWrapper)}>
            <div {...stylex.props(styles.articleMain)}>
              {INSIGHTS_ARTICLES.map((article, index) => (
                <InsightArticleView
                  key={article.id}
                  article={article}
                  coverEnd={index % 2 === 1}
                  open={openId === article.id}
                  onToggle={() => toggleArticle(article.id)}
                />
              ))}
            </div>
          </div>
        </div>
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

const CHARS_PER_MINUTE = 400;

function blockText(block: InsightBlock): string[] {
  switch (block.kind) {
    case "paragraphs":
    case "bullets":
      return [...block.items];
    case "terms":
      return block.items.flatMap((item) => [item.term, item.desc]);
    case "note":
    case "disclaimer":
      return [block.text];
  }
}

function readMinutes(article: InsightArticle) {
  const text = [
    ...article.intro,
    ...article.sections.flatMap((section) => [section.title, ...section.blocks.flatMap(blockText)]),
  ].join("");
  return Math.max(1, Math.round(text.length / CHARS_PER_MINUTE));
}

export function InsightArticleView({
  article,
  coverEnd,
  open,
  onToggle,
}: {
  article: InsightArticle;
  coverEnd: boolean;
  open: boolean;
  onToggle: () => void;
}) {
  const reduce = useReducedMotion();
  const titleId = `${article.id}-article-title`;
  const bodyId = `${article.id}-full-article`;
  const readMeta = `全文 ${article.sections.length} 节 · 约 ${readMinutes(article)} 分钟`;
  const excerpt = article.thesis?.statement ?? article.intro[0];
  const figure = article.cover ? (
    <figure {...stylex.props(styles.articleFigure, coverEnd && styles.articleFigureEnd)}>
      <img
        src={article.cover.src}
        alt={article.cover.alt}
        loading="lazy"
        {...stylex.props(styles.articleImage)}
        style={{ objectPosition: article.cover.position }}
      />
    </figure>
  ) : null;

  const toggleButton = (
    <button
      type="button"
      aria-expanded={open}
      aria-controls={bodyId}
      onClick={onToggle}
      {...stylex.props(
        styles.expandButton,
        open && styles.expandButtonOutline,
        styles.compactButton,
      )}
    >
      <span>{open ? "收起阅读" : "展开阅读"}</span>
      <ChevronDown
        size={16}
        strokeWidth={2}
        aria-hidden="true"
        {...stylex.props(styles.expandIcon, open && styles.expandIconRotated)}
      />
    </button>
  );

  const preview = (
    <>
      {article.thesis ? (
        <div {...stylex.props(styles.coreViewBox)}>
          <p {...stylex.props(styles.coreViewParagraph)}>
            <strong {...stylex.props(styles.coreViewLabel)}>{article.thesis.label}</strong>
            {article.thesis.statement}
          </p>
        </div>
      ) : null}

      <div {...stylex.props(styles.paragraphStack)}>
        {article.intro.map((paragraph) => (
          <p key={paragraph} {...stylex.props(styles.bodyParagraph)}>
            {paragraph}
          </p>
        ))}
      </div>
    </>
  );

  return (
    <article
      id={articleAnchor(article)}
      aria-labelledby={titleId}
      {...stylex.props(styles.compactArticle, kitStyles.anchor)}
    >
      <div
        {...stylex.props(
          article.cover && styles.articleHead,
          article.cover && coverEnd && styles.articleHeadReverse,
        )}
      >
        {figure}
        <div {...stylex.props(styles.compactText)}>
          <h2 id={titleId} {...stylex.props(styles.compactTitle)}>
            {article.title}
          </h2>
          {article.lead ? <p {...stylex.props(styles.compactLead)}>{article.lead}</p> : null}
          {!open && excerpt ? <p {...stylex.props(styles.compactExcerpt)}>{excerpt}</p> : null}
          <div {...stylex.props(styles.expandRow)}>
            <p {...stylex.props(styles.expandMeta)}>{readMeta}</p>
            {toggleButton}
          </div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open ? (
          <m.div
            id={bodyId}
            key={bodyId}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: reduce ? 0.15 : 0.4, ease: EASE }}
            {...stylex.props(styles.expandedWrap)}
          >
            <div {...stylex.props(styles.compactPreview, styles.readingColumn)}>{preview}</div>
            <div {...stylex.props(styles.expandedInner, styles.readingColumn)}>
              {article.sections.map((section) => (
                <InsightSectionView
                  key={section.slug}
                  id={sectionAnchor(article, section)}
                  section={section}
                />
              ))}
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </article>
  );
}

function InsightSectionView({ id, section }: { id: string; section: InsightSection }) {
  const titleId = `${id}-title`;
  return (
    <section
      id={id}
      aria-labelledby={titleId}
      {...stylex.props(styles.chapterSection, kitStyles.anchor)}
    >
      <h3 id={titleId} {...stylex.props(styles.chapterHeading)}>
        {section.title}
      </h3>
      {section.blocks.map((block, index) => (
        <InsightBlockView key={`${block.kind}-${index}`} block={block} />
      ))}
    </section>
  );
}

function InsightBlockView({ block }: { block: InsightBlock }) {
  switch (block.kind) {
    case "paragraphs":
      return (
        <div {...stylex.props(styles.paragraphStack)}>
          {block.items.map((paragraph) => (
            <p key={paragraph} {...stylex.props(styles.bodyParagraph)}>
              {paragraph}
            </p>
          ))}
        </div>
      );
    case "bullets":
      return (
        <ul {...stylex.props(styles.bulletList)}>
          {block.items.map((item) => (
            <li key={item} {...stylex.props(styles.bulletItem)}>
              {item}
            </li>
          ))}
        </ul>
      );
    case "terms":
      return (
        <ul {...stylex.props(styles.editorialList)}>
          {block.items.map((item) => (
            <li key={item.term} {...stylex.props(styles.editorialRow)}>
              <h4 {...stylex.props(styles.editorialTerm)}>{item.term}</h4>
              <p {...stylex.props(styles.bodyParagraph)}>{item.desc}</p>
            </li>
          ))}
        </ul>
      );
    case "note":
      return (
        <div {...stylex.props(styles.devPromptBox)}>
          <p {...stylex.props(styles.devPromptParagraph)}>
            <strong {...stylex.props(styles.devPromptLabel)}>{block.label}</strong>
            {block.text}
          </p>
        </div>
      );
    case "disclaimer":
      return <p {...stylex.props(styles.disclaimer)}>{block.text}</p>;
  }
}
