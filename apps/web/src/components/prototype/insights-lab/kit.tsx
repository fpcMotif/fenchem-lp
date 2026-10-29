import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { createContext, use, useMemo, useSyncExternalStore, type ReactNode } from "react";

import { Flow } from "../shared/flow";
import { ContactCta } from "../variant-oos1/contact-cta";
import type { SubPageProps } from "../variant-oos1/index";
import type { InsightBlock, InsightSection } from "../variant-oos1/insights-data";
import { SubPageBanner, SubPageNav, kitStyles } from "../variant-oos1/subpage-kit";
import { color, font, media } from "../variant-oos1/tokens.stylex";
import { LAB_ARTICLES, type LabArticle } from "./articles";
import { lab } from "./tokens.stylex";

export type { LabArticle, SubPageProps };
export { kitStyles };

export const STICKY_OFFSET = 144;
const DESKTOP = breakpoints.xl;

type LabState = { count: number; setPickerHost: (host: HTMLElement | null) => void };

export const InsightsLabContext = createContext<LabState>({
  count: LAB_ARTICLES.length,
  setPickerHost: () => {},
});

export function useLabArticles() {
  const { count } = use(InsightsLabContext);
  return useMemo(() => LAB_ARTICLES.slice(0, count), [count]);
}

export function usePickerHost() {
  return use(InsightsLabContext).setPickerHost;
}

const subscribeNever = () => () => {};

export function useIsClient() {
  return useSyncExternalStore(
    subscribeNever,
    () => true,
    () => false,
  );
}

export const blockText = (block: InsightBlock): string[] => {
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
};

const CHARS_PER_MINUTE = 400;

export const readMinutes = (article: LabArticle) => {
  const text = [
    article.lead ?? "",
    article.thesis?.statement ?? "",
    ...article.intro,
    ...article.sections.flatMap((section) => [section.title, ...section.blocks.flatMap(blockText)]),
  ].join("");
  return Math.max(1, Math.round(text.length / CHARS_PER_MINUTE));
};

export const padIndex = (index: number) => String(index + 1).padStart(2, "0");

export const articleAnchor = (article: LabArticle) => `${article.id}-article`;
export const sectionAnchor = (article: LabArticle, section: InsightSection) =>
  `${article.id}-${section.slug}`;

export const articleChips = (articles: readonly LabArticle[]) =>
  articles.map((article) => ({
    id: articleAnchor(article),
    label: article.navLabel ?? article.title,
  }));

export const articleIdChips = (articles: readonly LabArticle[]) =>
  articles.map((article) => ({ id: article.id, label: article.navLabel ?? article.title }));

export const sectionChips = (article: LabArticle) =>
  article.sections.map((section) => ({
    id: sectionAnchor(article, section),
    label: section.navLabel,
  }));

export function jumpTo(element: Element, gap = 24) {
  const top = element.getBoundingClientRect().top + window.scrollY - STICKY_OFFSET - gap;
  window.scrollTo({ top: Math.max(0, top), behavior: "instant" });
}

export const isAboveReadingLine = (element: Element) =>
  element.getBoundingClientRect().top < STICKY_OFFSET;

export const labStyles = stylex.create({
  pageSection: {
    paddingTop: { default: 48, [DESKTOP]: 80 },
    paddingBottom: { default: 64, [DESKTOP]: 104 },
  },
  column: {
    maxWidth: 800,
    marginInline: "auto",
  },
  listHeader: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 16,
    paddingBottom: 14,
    borderBottomWidth: 2,
    borderBottomStyle: "solid",
    borderBottomColor: color.ink,
  },
  listLabel: {
    margin: 0,
    fontSize: 17,
    fontWeight: 700,
    letterSpacing: "0.04em",
    color: color.ink,
  },
  listCount: {
    margin: 0,
    fontSize: 14,
    color: color.muted,
  },
  meta: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    columnGap: 10,
    rowGap: 4,
    margin: 0,
    fontSize: 13,
    lineHeight: 1.5,
    color: color.muted,
  },
  metaCategory: {
    fontWeight: 700,
    letterSpacing: "0.1em",
    color: colors.brandBlue700,
  },
  metaDot: {
    width: 3,
    height: 3,
    borderRadius: 999,
    backgroundColor: "currentColor",
    opacity: 0.6,
  },
  docTitle: {
    margin: 0,
    fontSize: { default: 26, [media.tablet]: 32, [DESKTOP]: 40 },
    fontWeight: 800,
    lineHeight: 1.25,
    letterSpacing: "-0.01em",
    color: color.ink,
    textWrap: "balance",
  },
  docLead: {
    margin: 0,
    fontSize: { default: 16, [media.tablet]: 17, [DESKTOP]: 18 },
    lineHeight: 1.7,
    color: color.bodyText,
    textWrap: "pretty",
  },
  stack: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 22, [DESKTOP]: 26 },
  },
  thesis: {
    marginBlock: 6,
    paddingBlock: { default: 18, [DESKTOP]: 22 },
    paddingInline: { default: 20, [DESKTOP]: 26 },
    backgroundColor: lab.surfaceAlt,
  },
  thesisText: {
    margin: 0,
    fontSize: { default: 15, [DESKTOP]: 16 },
    lineHeight: 1.85,
    color: color.ink,
  },
  thesisLabel: {
    fontWeight: 700,
    color: colors.brandBlue700,
    marginInlineEnd: 10,
  },
  paragraphs: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  paragraph: {
    margin: 0,
    fontSize: { default: 15, [DESKTOP]: 16 },
    lineHeight: 1.9,
    color: color.bodyText,
    textWrap: "pretty",
  },
  dropCap: {
    float: "inline-start",
    fontSize: { default: 36, [DESKTOP]: 40 },
    fontWeight: 800,
    lineHeight: 1.05,
    color: colors.brandBlue700,
    marginInlineEnd: 10,
    marginTop: 4,
  },
  sections: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 44, [DESKTOP]: 56 },
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: 18,
  },
  sectionTitle: {
    margin: 0,
    fontSize: { default: 20, [media.tablet]: 22, [DESKTOP]: 24 },
    fontWeight: 700,
    lineHeight: 1.4,
    letterSpacing: "-0.01em",
    color: color.ink,
  },
  bullets: {
    margin: 0,
    paddingInlineStart: 20,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  bullet: {
    fontSize: { default: 15, [DESKTOP]: 16 },
    lineHeight: 1.85,
    color: color.bodyText,
  },
  terms: {
    margin: 0,
    padding: 0,
    listStyle: "none",
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: lab.hairline,
  },
  termRow: {
    display: "grid",
    gridTemplateColumns: { default: "1fr", [breakpoints.md]: "200px minmax(0, 1fr)" },
    columnGap: 32,
    rowGap: 6,
    alignItems: "baseline",
    paddingBlock: { default: 18, [DESKTOP]: 22 },
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: lab.hairline,
  },
  term: {
    margin: 0,
    fontSize: { default: 16, [DESKTOP]: 17 },
    fontWeight: 700,
    lineHeight: 1.5,
    color: color.ink,
  },
  note: {
    marginTop: 6,
    paddingBlock: { default: 16, [DESKTOP]: 20 },
    paddingInline: { default: 20, [DESKTOP]: 24 },
    backgroundColor: lab.surfaceAlt,
  },
  noteText: {
    margin: 0,
    fontSize: { default: 14, [DESKTOP]: 15 },
    lineHeight: 1.8,
    color: color.ink,
  },
  disclaimer: {
    margin: 0,
    fontSize: 13,
    lineHeight: 1.75,
    color: color.muted,
  },
  pillButton: {
    appearance: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    minHeight: 44,
    paddingInline: 22,
    borderRadius: 999,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.brandBlue700,
    backgroundColor: {
      default: "transparent",
      ":hover": { default: null, [lab.hover]: lab.surfaceAlt },
    },
    color: colors.brandBlue700,
    fontFamily: "inherit",
    fontSize: 15,
    fontWeight: 600,
    letterSpacing: "0.04em",
    whiteSpace: "nowrap",
    cursor: "pointer",
    transform: { default: null, ":active": "scale(0.97)" },
    transitionProperty: "background-color, color, transform",
    transitionDuration: "160ms",
    transitionTimingFunction: lab.easeOut,
    WebkitTapHighlightColor: "transparent",
  },
  pillSolid: {
    backgroundColor: {
      default: colors.brandBlue700,
      ":hover": { default: null, [lab.hover]: colors.brandBlue800 },
    },
    color: colors.paper,
  },
  textButton: {
    appearance: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    minHeight: 44,
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    fontSize: 15,
    fontWeight: 600,
    letterSpacing: "0.02em",
    color: {
      default: colors.brandBlue700,
      ":hover": { default: null, [lab.hover]: colors.brandBlue800 },
    },
    cursor: "pointer",
    WebkitTapHighlightColor: "transparent",
  },
  chevron: {
    flexShrink: 0,
    transitionProperty: "transform",
    transitionDuration: "220ms",
    transitionTimingFunction: lab.easeOut,
  },
  chevronUp: {
    transform: "rotate(180deg)",
  },
  srOnly: {
    position: "absolute",
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: "hidden",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
    borderWidth: 0,
  },
  displayNumber: {
    fontFamily: font.display,
    fontVariantNumeric: "tabular-nums",
  },
});

export function LabPage({
  onNavigateHome,
  chips,
  activeChip,
  onSelectChip,
  children,
}: SubPageProps & {
  chips: readonly { id: string; label: string }[];
  activeChip?: string;
  onSelectChip?: (id: string) => void;
  children: ReactNode;
}) {
  return (
    <div id="insights-top" lang="zh-CN" {...stylex.props(kitStyles.root)}>
      <SubPageBanner
        title="行业洞察"
        lead="来自泛成应用研发团队的原料趋势、配方方法与法规观察"
        image="/prototype/official-site/product-human-nutrition.webp"
        imageAlt="行业洞察"
        titleId="insights-banner-title"
      />
      <SubPageNav
        current="行业洞察"
        chips={chips}
        activeChip={activeChip}
        onSelectChip={onSelectChip}
        onNavigateHome={onNavigateHome}
        chipsLabel="本页文章"
      />
      <div {...stylex.props(labStyles.pageSection)}>
        <div {...stylex.props(kitStyles.shell, kitStyles.inset120)}>{children}</div>
      </div>
      <Flow>
        <ContactCta
          id="insights-bottom-cta"
          actions={[{ label: "联系我们", onClick: () => onNavigateHome("contact") }]}
        />
      </Flow>
    </div>
  );
}

export function ArticleMeta({ article, extra }: { article: LabArticle; extra?: ReactNode }) {
  return (
    <p {...stylex.props(labStyles.meta)}>
      <span {...stylex.props(labStyles.metaCategory)}>{article.category}</span>
      <span aria-hidden="true" {...stylex.props(labStyles.metaDot)} />
      <span>{`约 ${readMinutes(article)} 分钟阅读`}</span>
      <span aria-hidden="true" {...stylex.props(labStyles.metaDot)} />
      <time dateTime={article.date} {...stylex.props(labStyles.displayNumber)}>
        {article.date.replace("-", ".")}
      </time>
      {extra}
    </p>
  );
}

export function ArticlePreview({ article }: { article: LabArticle }) {
  return (
    <>
      {article.thesis ? (
        <div {...stylex.props(labStyles.thesis)}>
          <p {...stylex.props(labStyles.thesisText)}>
            <strong {...stylex.props(labStyles.thesisLabel)}>{article.thesis.label}</strong>
            {article.thesis.statement}
          </p>
        </div>
      ) : null}
      <div {...stylex.props(labStyles.paragraphs)}>
        {article.intro.map((paragraph, index) => (
          <p key={paragraph} {...stylex.props(labStyles.paragraph)}>
            {index === 0 ? (
              <>
                <span {...stylex.props(labStyles.dropCap)}>{paragraph.slice(0, 1)}</span>
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
}

export function ArticleSections({ article }: { article: LabArticle }) {
  return (
    <div {...stylex.props(labStyles.sections)}>
      {article.sections.map((section) => {
        const id = sectionAnchor(article, section);
        return (
          <section
            key={section.slug}
            id={id}
            aria-labelledby={`${id}-title`}
            {...stylex.props(labStyles.section, kitStyles.anchor)}
          >
            <h3 id={`${id}-title`} {...stylex.props(labStyles.sectionTitle)}>
              {section.title}
            </h3>
            {section.blocks.map((block, index) => (
              <Block key={`${block.kind}-${index}`} block={block} />
            ))}
          </section>
        );
      })}
    </div>
  );
}

function Block({ block }: { block: InsightBlock }) {
  switch (block.kind) {
    case "paragraphs":
      return (
        <div {...stylex.props(labStyles.paragraphs)}>
          {block.items.map((paragraph) => (
            <p key={paragraph} {...stylex.props(labStyles.paragraph)}>
              {paragraph}
            </p>
          ))}
        </div>
      );
    case "bullets":
      return (
        <ul {...stylex.props(labStyles.bullets)}>
          {block.items.map((item) => (
            <li key={item} {...stylex.props(labStyles.bullet)}>
              {item}
            </li>
          ))}
        </ul>
      );
    case "terms":
      return (
        <ul {...stylex.props(labStyles.terms)}>
          {block.items.map((item) => (
            <li key={item.term} {...stylex.props(labStyles.termRow)}>
              <h4 {...stylex.props(labStyles.term)}>{item.term}</h4>
              <p {...stylex.props(labStyles.paragraph)}>{item.desc}</p>
            </li>
          ))}
        </ul>
      );
    case "note":
      return (
        <div {...stylex.props(labStyles.note)}>
          <p {...stylex.props(labStyles.noteText)}>
            <strong {...stylex.props(labStyles.thesisLabel)}>{block.label}</strong>
            {block.text}
          </p>
        </div>
      );
    case "disclaimer":
      return <p {...stylex.props(labStyles.disclaimer)}>{block.text}</p>;
  }
}
