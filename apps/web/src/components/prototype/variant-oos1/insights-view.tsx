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
import { SubPageBanner, SubPageNav, kitStyles } from "./subpage-kit";
import { color, ease, media } from "./tokens.stylex";

const HAIRLINE = "rgba(26, 26, 26, 0.12)";
const SURFACE_ALT = "#f3f5fa";
const DESKTOP = breakpoints.xl;

const styles = stylex.create({
  pageSection: {
    paddingTop: { default: 48, [DESKTOP]: 80 },
    paddingBottom: { default: 64, [DESKTOP]: 104 },
  },
  article: {
    maxWidth: 800,
    marginInline: "auto",
    display: "flex",
    flexDirection: "column",
    gap: { default: 22, [DESKTOP]: 26 },
  },
  moreList: {
    maxWidth: 800,
    marginInline: "auto",
    marginTop: { default: 64, [DESKTOP]: 96 },
  },
  moreListSingle: {
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: HAIRLINE,
  },
  moreHeader: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 16,
    paddingBottom: 14,
    borderBottomWidth: 2,
    borderBottomStyle: "solid",
    borderBottomColor: color.ink,
  },
  moreLabel: {
    margin: 0,
    fontSize: 17,
    fontWeight: 700,
    letterSpacing: "0.04em",
    color: color.ink,
  },
  moreCount: {
    margin: 0,
    fontSize: 14,
    color: color.muted,
  },
  compactArticle: {
    paddingBlock: { default: 28, [DESKTOP]: 36 },
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: HAIRLINE,
  },
  compactHead: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.md]: "minmax(0, 1fr) auto",
    },
    alignItems: { default: "start", [breakpoints.md]: "center" },
    columnGap: 48,
    rowGap: 20,
  },
  compactText: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    minWidth: 0,
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
  compactButton: {
    justifySelf: "start",
    whiteSpace: "nowrap",
  },
  compactPreview: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 22, [DESKTOP]: 26 },
    paddingTop: { default: 28, [DESKTOP]: 36 },
    paddingBottom: { default: 24, [DESKTOP]: 32 },
  },
  docCategory: {
    margin: 0,
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: "0.1em",
    color: colors.brandBlue700,
  },
  docTitle: {
    margin: 0,
    fontSize: { default: 30, [media.tablet]: 38, [DESKTOP]: 44 },
    fontWeight: 800,
    lineHeight: 1.2,
    letterSpacing: "-0.01em",
    color: color.ink,
  },
  docSubtitle: {
    margin: 0,
    fontSize: { default: 16, [media.tablet]: 18, [DESKTOP]: 19 },
    fontWeight: 400,
    lineHeight: 1.65,
    color: color.bodyText,
  },
  coreViewBox: {
    marginBlock: 6,
    paddingBlock: { default: 18, [DESKTOP]: 22 },
    paddingInline: { default: 20, [DESKTOP]: 26 },
    backgroundColor: SURFACE_ALT,
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
  dropCap: {
    float: "inline-start",
    fontSize: { default: 38, [DESKTOP]: 42 },
    fontWeight: 800,
    lineHeight: 1.05,
    color: colors.brandBlue700,
    marginInlineEnd: 10,
    marginTop: 4,
  },
  expandRow: {
    display: "flex",
    alignItems: "center",
    paddingTop: 10,
  },
  expandButton: {
    appearance: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    height: 44,
    paddingInline: 24,
    borderRadius: 999,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.brandBlue700,
    backgroundColor: { default: colors.brandBlue700, ":hover": colors.brandBlue800 },
    color: colors.paper,
    fontFamily: "inherit",
    fontSize: 15,
    fontWeight: 600,
    letterSpacing: "0.04em",
    cursor: "pointer",
    transitionProperty: "background-color, color",
    transitionDuration: "160ms",
    transitionTimingFunction: ease.out,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 2,
  },
  expandButtonOutline: {
    backgroundColor: { default: "transparent", ":hover": SURFACE_ALT },
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
    backgroundColor: SURFACE_ALT,
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

function navChips(articles: readonly InsightArticle[], openId: string | null) {
  if (articles.length !== 1) {
    return articles.map((article) => ({
      id: articleAnchor(article),
      label: article.navLabel ?? article.title,
    }));
  }
  const [article] = articles;
  if (openId !== article.id) return [];
  return article.sections.map((section) => ({
    id: sectionAnchor(article, section),
    label: section.navLabel,
  }));
}

export function InsightsView({ onNavigateHome }: { onNavigateHome: (target?: string) => void }) {
  const articles = INSIGHTS_ARTICLES;
  const [featured, ...more] = articles;
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleArticle = (id: string) => setOpenId((current) => (current === id ? null : id));

  return (
    <div id="insights-top" lang="zh-CN" {...stylex.props(kitStyles.root)}>
      <SubPageBanner
        eyebrow={INSIGHTS_PAGE.eyebrow}
        title="行业洞察"
        tagline={INSIGHTS_PAGE.tagline}
        lead={INSIGHTS_PAGE.lead}
        meta={INSIGHTS_PAGE.meta}
        image="/prototype/official-site/product-human-nutrition.webp"
        imageAlt={INSIGHTS_PAGE.tagline}
        titleId="insights-banner-title"
      />

      <SubPageNav
        current="行业洞察"
        chips={navChips(articles, openId)}
        onNavigateHome={onNavigateHome}
      />

      <div {...stylex.props(styles.pageSection)}>
        <div {...stylex.props(kitStyles.shell, kitStyles.inset120)}>
          {featured ? (
            <InsightArticleView
              article={featured}
              featured
              open={openId === featured.id}
              onToggle={() => toggleArticle(featured.id)}
            />
          ) : null}
          {more.length > 0 ? (
            <div {...stylex.props(styles.moreList, more.length === 1 && styles.moreListSingle)}>
              {more.length > 1 ? (
                <div {...stylex.props(styles.moreHeader)}>
                  <p {...stylex.props(styles.moreLabel)}>更多洞察</p>
                  <p {...stylex.props(styles.moreCount)}>{`共 ${more.length} 篇`}</p>
                </div>
              ) : null}
              {more.map((article) => (
                <InsightArticleView
                  key={article.id}
                  article={article}
                  featured={false}
                  open={openId === article.id}
                  onToggle={() => toggleArticle(article.id)}
                />
              ))}
            </div>
          ) : null}
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

function InsightArticleView({
  article,
  featured,
  open,
  onToggle,
}: {
  article: InsightArticle;
  featured: boolean;
  open: boolean;
  onToggle: () => void;
}) {
  const reduce = useReducedMotion();
  const titleId = `${article.id}-article-title`;
  const bodyId = `${article.id}-full-article`;

  const toggleButton = (
    <button
      type="button"
      aria-expanded={open}
      aria-controls={bodyId}
      onClick={onToggle}
      {...stylex.props(
        styles.expandButton,
        (open || !featured) && styles.expandButtonOutline,
        !featured && styles.compactButton,
      )}
    >
      <span>{open ? "收起阅读" : "展开阅读"}</span>
      <ChevronDown
        size={18}
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
        {article.intro.map((paragraph, index) => (
          <p key={paragraph} {...stylex.props(styles.bodyParagraph)}>
            {index === 0 ? (
              <>
                <span {...stylex.props(styles.dropCap)}>{paragraph.slice(0, 1)}</span>
                {paragraph.slice(1)}
              </>
            ) : (
              paragraph
            )}
          </p>
        ))}
      </div>
    </>
  );

  return (
    <article
      id={articleAnchor(article)}
      aria-labelledby={titleId}
      {...stylex.props(featured ? styles.article : styles.compactArticle, kitStyles.anchor)}
    >
      {featured ? (
        <>
          <p {...stylex.props(styles.docCategory)}>{article.category}</p>

          <h2 id={titleId} {...stylex.props(styles.docTitle)}>
            {article.title}
          </h2>

          {article.lead ? <p {...stylex.props(styles.docSubtitle)}>{article.lead}</p> : null}

          {preview}

          <div {...stylex.props(styles.expandRow)}>{toggleButton}</div>
        </>
      ) : (
        <div {...stylex.props(styles.compactHead)}>
          <div {...stylex.props(styles.compactText)}>
            <p {...stylex.props(styles.docCategory)}>{article.category}</p>
            <h2 id={titleId} {...stylex.props(styles.compactTitle)}>
              {article.title}
            </h2>
            {article.lead ? <p {...stylex.props(styles.compactLead)}>{article.lead}</p> : null}
          </div>
          {toggleButton}
        </div>
      )}

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
            {featured ? null : <div {...stylex.props(styles.compactPreview)}>{preview}</div>}
            <div {...stylex.props(styles.expandedInner)}>
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
