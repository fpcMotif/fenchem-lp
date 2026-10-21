import { Flow } from "../../../shared/flow";
import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import { useMemo, useState } from "react";

import { EASE } from "@/components/prototype/motion-constants";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import {
  CodexBookmarkRail,
  scrollToBookmark,
  useBookmarkActive,
  type CodexBookmarkItem,
} from "./codex-bookmark-rail";
import { ContactCta } from "../../contact-cta";
import {
  INSIGHTS_ARTICLES,
  INSIGHTS_PAGE,
  type InsightArticle,
  type InsightBlock,
  type InsightSection,
} from "../../insights-data";
import { SubPageBanner, SubPageNav, kitStyles } from "../../subpage-kit";
import { color, ease, layout, media } from "../../tokens.stylex";

const HAIRLINE = "rgba(26, 26, 26, 0.12)";
const SURFACE_ALT = "#f3f5fa";
const DESKTOP = breakpoints.xl;

const styles = stylex.create({
  pageSection: {
    paddingTop: { default: 48, [DESKTOP]: 80 },
    paddingBottom: { default: 64, [DESKTOP]: 104 },
    containerType: "inline-size",
  },
  articleWrapper: {
    position: "relative",
    maxWidth: 800,
    marginInline: "auto",
  },
  railAside: {
    display: { default: "none", [DESKTOP]: "block" },
    position: "absolute",
    right: "100%",
    top: 0,
    bottom: 0,
    width: `calc((min(100cqw, 1440px) - 2 * ${layout.inset120} - 800px) / 2)`,
    pointerEvents: "none",
  },
  railSticky: {
    position: "sticky",
    top: `calc(${layout.headerHeight} + ${layout.subBarHeight})`,
    height: `calc(100vh - ${layout.headerHeight} - ${layout.subBarHeight})`,
    boxSizing: "border-box",
    paddingBottom: "10vh",
    width: "fit-content",
    marginInline: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  articleMain: {
    width: "100%",
    minWidth: 0,
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
  expandRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    paddingTop: 10,
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

function extractSectionSummary(section: InsightSection): string {
  for (const block of section.blocks) {
    if (block.kind === "paragraphs" && block.items[0]) {
      return block.items[0];
    }
    if (block.kind === "terms" && block.items.length > 0) {
      return block.items.map((t) => t.term).join(" · ");
    }
    if (block.kind === "bullets" && block.items.length > 0) {
      return block.items.slice(0, 2).join("；");
    }
  }
  return "";
}

function buildBookmarkItems(
  articles: readonly InsightArticle[],
  openId: string | null,
): CodexBookmarkItem[] {
  if (articles.length === 1 && articles[0]) {
    const [article] = articles;
    const items: CodexBookmarkItem[] = [
      {
        id: articleAnchor(article),
        title: article.navLabel ?? article.title,
        summary: article.thesis?.statement ?? article.lead ?? article.intro[0] ?? "",
      },
    ];
    for (const section of article.sections) {
      items.push({
        id: sectionAnchor(article, section),
        title: section.navLabel || section.title,
        summary: extractSectionSummary(section),
      });
    }
    return items;
  }

  const items: CodexBookmarkItem[] = [];
  for (const article of articles) {
    items.push({
      id: articleAnchor(article),
      title: article.navLabel ?? article.title,
      summary: article.thesis?.statement ?? article.lead ?? article.intro[0] ?? "",
    });
    if (openId === article.id) {
      for (const section of article.sections) {
        items.push({
          id: sectionAnchor(article, section),
          title: section.navLabel || section.title,
          summary: extractSectionSummary(section),
        });
      }
    }
  }
  return items;
}

export function InsightsView({ onNavigateHome }: { onNavigateHome: (target?: string) => void }) {
  const articles = INSIGHTS_ARTICLES;
  const [featured, ...more] = articles;
  const [openId, setOpenId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();
  const railVisible = expandedId !== null && expandedId === openId;

  const toggleArticle = (id: string) => {
    setExpandedId(null);
    setOpenId((current) => (current === id ? null : id));
  };

  const bookmarkItems = useMemo(() => buildBookmarkItems(articles, openId), [articles, openId]);
  const bookmarkIds = useMemo(() => bookmarkItems.map((item) => item.id), [bookmarkItems]);
  const activeBookmarkId = useBookmarkActive(bookmarkIds);

  const handleSelectBookmark = (id: string) => {
    if (featured && openId !== featured.id) {
      setExpandedId(null);
      setOpenId(featured.id);
      requestAnimationFrame(() => {
        setTimeout(() => {
          scrollToBookmark(id);
        }, 60);
      });
    } else {
      scrollToBookmark(id);
    }
  };
  return (
    <div id="insights-top" lang="zh-CN" {...stylex.props(kitStyles.root)}>
      <SubPageBanner
        eyebrow={INSIGHTS_PAGE.eyebrow}
        title="行业洞察"
        tagline={INSIGHTS_PAGE.tagline}
        lead={INSIGHTS_PAGE.lead}
        meta={INSIGHTS_PAGE.meta}
        image="/prototype/official-site/product-human-nutrition.webp"
        imageAlt={INSIGHTS_PAGE.imageAlt}
        titleId="insights-banner-title"
      />

      <SubPageNav current="行业洞察" chips={[]} onNavigateHome={onNavigateHome} />

      <div {...stylex.props(styles.pageSection)}>
        <div {...stylex.props(kitStyles.shell, kitStyles.inset120)}>
          <div {...stylex.props(styles.articleWrapper)}>
            <AnimatePresence>
              {railVisible && bookmarkItems.length > 0 ? (
                <m.aside
                  key="bookmark-rail"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{
                    opacity: 0,
                    transition: { duration: reduceMotion ? 0 : 0.12, ease: EASE },
                  }}
                  transition={{ duration: reduceMotion ? 0 : 0.2, ease: EASE }}
                  {...stylex.props(styles.railAside)}
                  aria-label="文章书签"
                >
                  <div {...stylex.props(styles.railSticky)}>
                    <CodexBookmarkRail
                      items={bookmarkItems}
                      activeId={activeBookmarkId}
                      onSelect={handleSelectBookmark}
                    />
                  </div>
                </m.aside>
              ) : null}
            </AnimatePresence>

            <div {...stylex.props(styles.articleMain)}>
              {featured ? (
                <InsightArticleView
                  article={featured}
                  featured
                  open={openId === featured.id}
                  onToggle={() => toggleArticle(featured.id)}
                  onExpanded={() => setExpandedId(featured.id)}
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
                      onExpanded={() => setExpandedId(article.id)}
                    />
                  ))}
                </div>
              ) : null}
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

function isFullyOpen(definition: unknown) {
  return (
    typeof definition === "object" &&
    definition !== null &&
    "height" in definition &&
    definition.height === "auto"
  );
}

function InsightArticleView({
  article,
  featured,
  open,
  onToggle,
  onExpanded,
}: {
  article: InsightArticle;
  featured: boolean;
  open: boolean;
  onToggle: () => void;
  onExpanded: () => void;
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
      {...stylex.props(featured ? styles.article : styles.compactArticle, kitStyles.anchor)}
    >
      {featured ? (
        <>
          <h2 id={titleId} {...stylex.props(styles.docTitle)}>
            {article.title}
          </h2>

          {article.lead ? <p {...stylex.props(styles.docSubtitle)}>{article.lead}</p> : null}

          {preview}

          <div {...stylex.props(styles.expandRow)}>
            <p {...stylex.props(styles.expandMeta)}>
              {`全文 ${article.sections.length} 节 · 约 ${readMinutes(article)} 分钟`}
            </p>
            {toggleButton}
          </div>
        </>
      ) : (
        <div {...stylex.props(styles.compactHead)}>
          <div {...stylex.props(styles.compactText)}>
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
            onAnimationComplete={(definition) => {
              if (isFullyOpen(definition)) onExpanded();
            }}
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
