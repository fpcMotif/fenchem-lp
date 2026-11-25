import { Flow } from "../shared/flow";
import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ChevronDown } from "@fenchem-lp/ui/components/lucide";
import { AnimatePresence, m } from "@/compat/motion";
import { createSignal, For, Show } from "solid-js";

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
const DESKTOP = "@media (min-width: 1280px)";

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
      ["@media (min-width: 768px)"]: "minmax(0, 5fr) minmax(0, 7fr)",
    },
    alignItems: "center",
    columnGap: { default: 0, ["@media (min-width: 768px)"]: 40, [DESKTOP]: 72 },
    rowGap: 20,
  },
  articleHeadReverse: {
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      ["@media (min-width: 768px)"]: "minmax(0, 7fr) minmax(0, 5fr)",
    },
  },
  articleFigure: {
    margin: 0,
    aspectRatio: "16 / 10",
    overflow: "hidden",
    backgroundColor: color.pageTint,
  },
  articleFigureEnd: {
    order: { default: 0, ["@media (min-width: 768px)"]: 2 },
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
  moreRow: {
    display: "flex",
    justifyContent: "center",
    marginTop: { default: 32, [DESKTOP]: 48 },
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
      ["@media (min-width: 768px)"]: "220px minmax(0, 1fr)",
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

const PREVIEW_COUNT = 5;

const NEWEST_FIRST = [...INSIGHTS_ARTICLES].sort((a, b) =>
  (b.updated ?? "").localeCompare(a.updated ?? ""),
);

const formatUpdated = (iso: string) => {
  const [year, month, day] = iso.split("-").map(Number);
  return `${year}年${month}月${day}日`;
};

const articleAnchor = (article: InsightArticle) => `${article.id}-article`;
const sectionAnchor = (article: InsightArticle, section: InsightSection) =>
  `${article.id}-${section.slug}`;

export function InsightsView(props: { onNavigateHome: (target?: string) => void }) {
  const [openId, setOpenId] = createSignal<string | null>(null);
  const [showAll, setShowAll] = createSignal(false);
  const hiddenCount = NEWEST_FIRST.length - PREVIEW_COUNT;
  const articles = () => (showAll() ? NEWEST_FIRST : NEWEST_FIRST.slice(0, PREVIEW_COUNT));

  const toggleArticle = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <div id="insights-top" lang="zh-CN" {...stylex.attrs(kitStyles.root)}>
      <ProductsBanner title="行业洞察" label="Industry insights banner">
        <ProductsBannerImage
          src="/products/figma/oos1-insights-banner.jpg"
          alt={INSIGHTS_PAGE.imageAlt}
        />
      </ProductsBanner>

      <ProductsSubBar current="行业洞察" onNavigateHome={props.onNavigateHome} />

      <div {...stylex.attrs(styles.pageSection)}>
        <div {...stylex.attrs(kitStyles.shell, kitStyles.inset120)}>
          <div {...stylex.attrs(styles.articleWrapper)}>
            <div {...stylex.attrs(styles.articleMain)}>
              <For each={articles()}>
                {(article, index) => (
                  <InsightArticleView
                    article={article}
                    coverEnd={index() % 2 === 1}
                    open={openId() === article.id}
                    onToggle={() => toggleArticle(article.id)}
                  />
                )}
              </For>
              <Show when={hiddenCount > 0}>
                <div {...stylex.attrs(styles.moreRow)}>
                  <button
                    type="button"
                    aria-expanded={showAll() ? "true" : "false"}
                    onClick={() => setShowAll((current) => !current)}
                    {...stylex.attrs(styles.expandButton, styles.expandButtonOutline)}
                  >
                    <span>{showAll() ? "收起" : "查看更多"}</span>
                    <ChevronDown
                      size={16}
                      strokeWidth={2}
                      aria-hidden="true"
                      {...stylex.attrs(styles.expandIcon, showAll() && styles.expandIconRotated)}
                    />
                  </button>
                </div>
              </Show>
            </div>
          </div>
        </div>
      </div>
      <Flow>
        <ContactCta
          id="insights-bottom-cta"
          actions={[{ label: "联系我们", onClick: () => props.onNavigateHome("contact") }]}
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

export function InsightArticleView(props: {
  article: InsightArticle;
  coverEnd: boolean;
  open: boolean;
  onToggle: () => void;
}) {
  const article = props.article;
  const reduce = useReducedMotion();
  const titleId = `${article.id}-article-title`;
  const bodyId = `${article.id}-full-article`;
  const readMeta = [
    article.updated && `更新于 ${formatUpdated(article.updated)}`,
    `全文 ${article.sections.length} 节 · 约 ${readMinutes(article)} 分钟`,
  ]
    .filter(Boolean)
    .join(" · ");
  const excerpt = article.thesis?.statement ?? article.intro[0];

  // Functions, not nodes: the compact preview remounts with each expansion.
  const toggleButton = () => (
    <button
      type="button"
      aria-expanded={props.open ? "true" : "false"}
      aria-controls={bodyId}
      onClick={() => props.onToggle()}
      {...stylex.attrs(
        styles.expandButton,
        props.open && styles.expandButtonOutline,
        styles.compactButton,
      )}
    >
      <span>{props.open ? "收起阅读" : "展开阅读"}</span>
      <ChevronDown
        size={16}
        strokeWidth={2}
        aria-hidden="true"
        {...stylex.attrs(styles.expandIcon, props.open && styles.expandIconRotated)}
      />
    </button>
  );

  const preview = () => (
    <>
      {article.thesis ? (
        <div {...stylex.attrs(styles.coreViewBox)}>
          <p {...stylex.attrs(styles.coreViewParagraph)}>
            <strong {...stylex.attrs(styles.coreViewLabel)}>{article.thesis.label}</strong>
            {article.thesis.statement}
          </p>
        </div>
      ) : null}

      <div {...stylex.attrs(styles.paragraphStack)}>
        {article.intro.map((paragraph) => (
          <p {...stylex.attrs(styles.bodyParagraph)}>{paragraph}</p>
        ))}
      </div>
    </>
  );

  return (
    <article
      id={articleAnchor(article)}
      aria-labelledby={titleId}
      {...stylex.attrs(styles.compactArticle, kitStyles.anchor)}
    >
      <div
        {...stylex.attrs(
          article.cover && styles.articleHead,
          article.cover && props.coverEnd && styles.articleHeadReverse,
        )}
      >
        <Show when={article.cover}>
          {(cover) => (
            <figure
              {...stylex.attrs(styles.articleFigure, props.coverEnd && styles.articleFigureEnd)}
            >
              <img
                src={cover().src}
                alt={cover().alt}
                loading="lazy"
                {...stylex.attrs(styles.articleImage)}
                style={{ "object-position": cover().position }}
              />
            </figure>
          )}
        </Show>
        <div {...stylex.attrs(styles.compactText)}>
          <h2 id={titleId} {...stylex.attrs(styles.compactTitle)}>
            {article.title}
          </h2>
          {article.lead ? <p {...stylex.attrs(styles.compactLead)}>{article.lead}</p> : null}
          <Show when={!props.open && excerpt}>
            <p {...stylex.attrs(styles.compactExcerpt)}>{excerpt}</p>
          </Show>
          <div {...stylex.attrs(styles.expandRow)}>
            <p {...stylex.attrs(styles.expandMeta)}>{readMeta}</p>
            {toggleButton()}
          </div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        <Show when={props.open}>
          <m.div
            id={bodyId}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: reduce() ? 0.15 : 0.4, ease: EASE }}
            {...stylex.attrs(styles.expandedWrap)}
          >
            <div {...stylex.attrs(styles.compactPreview, styles.readingColumn)}>{preview()}</div>
            <div {...stylex.attrs(styles.expandedInner, styles.readingColumn)}>
              {article.sections.map((section) => (
                <InsightSectionView id={sectionAnchor(article, section)} section={section} />
              ))}
            </div>
          </m.div>
        </Show>
      </AnimatePresence>
    </article>
  );
}

function InsightSectionView(props: { id: string; section: InsightSection }) {
  const titleId = `${props.id}-title`;
  return (
    <section
      id={props.id}
      aria-labelledby={titleId}
      {...stylex.attrs(styles.chapterSection, kitStyles.anchor)}
    >
      <h3 id={titleId} {...stylex.attrs(styles.chapterHeading)}>
        {props.section.title}
      </h3>
      {props.section.blocks.map((block) => (
        <InsightBlockView block={block} />
      ))}
    </section>
  );
}

function InsightBlockView(props: { block: InsightBlock }) {
  const block = props.block;
  switch (block.kind) {
    case "paragraphs":
      return (
        <div {...stylex.attrs(styles.paragraphStack)}>
          {block.items.map((paragraph) => (
            <p {...stylex.attrs(styles.bodyParagraph)}>{paragraph}</p>
          ))}
        </div>
      );
    case "bullets":
      return (
        <ul {...stylex.attrs(styles.bulletList)}>
          {block.items.map((item) => (
            <li {...stylex.attrs(styles.bulletItem)}>{item}</li>
          ))}
        </ul>
      );
    case "terms":
      return (
        <ul {...stylex.attrs(styles.editorialList)}>
          {block.items.map((item) => (
            <li {...stylex.attrs(styles.editorialRow)}>
              <h4 {...stylex.attrs(styles.editorialTerm)}>{item.term}</h4>
              <p {...stylex.attrs(styles.bodyParagraph)}>{item.desc}</p>
            </li>
          ))}
        </ul>
      );
    case "note":
      return (
        <div {...stylex.attrs(styles.devPromptBox)}>
          <p {...stylex.attrs(styles.devPromptParagraph)}>
            <strong {...stylex.attrs(styles.devPromptLabel)}>{block.label}</strong>
            {block.text}
          </p>
        </div>
      );
    case "disclaimer":
      return <p {...stylex.attrs(styles.disclaimer)}>{block.text}</p>;
  }
}
