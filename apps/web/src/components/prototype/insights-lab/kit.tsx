import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { createContext, createMemo, For, Show, untrack, useContext, type Accessor } from "solid-js";
import type { JSX } from "@solidjs/web";

import { createExternalStore } from "@/compat/external-store";

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

type LabState = { count: Accessor<number>; setPickerHost: (host: HTMLElement | null) => void };

export const InsightsLabContext = createContext<LabState>({
  count: () => LAB_ARTICLES.length,
  setPickerHost: () => {},
});

export function useLabArticles() {
  const { count } = useContext(InsightsLabContext);
  return createMemo(() => LAB_ARTICLES.slice(0, count()));
}

export function usePickerHost() {
  return useContext(InsightsLabContext).setPickerHost;
}

const subscribeNever = () => () => {};

export function useIsClient() {
  return createExternalStore(
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

export function LabPage(
  props: SubPageProps & {
    chips: readonly { id: string; label: string }[];
    activeChip?: string;
    onSelectChip?: (id: string) => void;
    children: JSX.Element;
  },
) {
  const articles = useLabArticles();
  return (
    <div id="insights-top" lang="zh-CN" {...stylex.attrs(kitStyles.root)}>
      <SubPageBanner
        eyebrow="Insights"
        title="行业洞察"
        tagline="Notes from the formulation bench"
        lead="来自泛成应用研发团队的原料趋势、配方方法与法规观察"
        meta={[`${articles().length} 篇洞察 · 持续更新`]}
        image="/prototype/official-site/product-human-nutrition.webp"
        imageAlt="行业洞察"
        titleId="insights-banner-title"
      />
      <SubPageNav
        current="行业洞察"
        chips={props.chips}
        activeChip={props.activeChip}
        onSelectChip={props.onSelectChip}
        onNavigateHome={props.onNavigateHome}
        chipsLabel="本页文章"
      />
      <div {...stylex.attrs(labStyles.pageSection)}>
        <div {...stylex.attrs(kitStyles.shell, kitStyles.inset120)}>{props.children}</div>
      </div>
      <Flow>
        <ContactCta
          id="insights-bottom-cta"
          title="需要索取样品或技术资料？"
          subtitle="我们的应用团队随时为您提供添加量指导与配方参考。"
          actions={[{ label: "联系我们", onClick: () => props.onNavigateHome("contact") }]}
        />
      </Flow>
    </div>
  );
}

export function ArticleMeta(props: { article: LabArticle; extra?: JSX.Element }) {
  return (
    <p {...stylex.attrs(labStyles.meta)}>
      <span {...stylex.attrs(labStyles.metaCategory)}>{props.article.category}</span>
      <span aria-hidden="true" {...stylex.attrs(labStyles.metaDot)} />
      <span>{`约 ${readMinutes(props.article)} 分钟阅读`}</span>
      <span aria-hidden="true" {...stylex.attrs(labStyles.metaDot)} />
      <time datetime={props.article.date} {...stylex.attrs(labStyles.displayNumber)}>
        {props.article.date.replace("-", ".")}
      </time>
      {props.extra}
    </p>
  );
}

export function ArticlePreview(props: { article: LabArticle }) {
  return (
    <>
      <Show when={props.article.thesis}>
        {(thesis) => (
          <div {...stylex.attrs(labStyles.thesis)}>
            <p {...stylex.attrs(labStyles.thesisText)}>
              <strong {...stylex.attrs(labStyles.thesisLabel)}>{thesis().label}</strong>
              {thesis().statement}
            </p>
          </div>
        )}
      </Show>
      <div {...stylex.attrs(labStyles.paragraphs)}>
        <For each={props.article.intro}>
          {(paragraph, index) => (
            <p {...stylex.attrs(labStyles.paragraph)}>
              {index() === 0 ? (
                <>
                  <span {...stylex.attrs(labStyles.dropCap)}>{paragraph.slice(0, 1)}</span>
                  {paragraph.slice(1)}
                </>
              ) : (
                paragraph
              )}
            </p>
          )}
        </For>
      </div>
    </>
  );
}

export function ArticleSections(props: { article: LabArticle }) {
  return (
    <div {...stylex.attrs(labStyles.sections)}>
      <For each={props.article.sections}>
        {(section) => {
          const id = () => sectionAnchor(props.article, section);
          return (
            <section
              id={id()}
              aria-labelledby={`${id()}-title`}
              {...stylex.attrs(labStyles.section, kitStyles.anchor)}
            >
              <h3 id={`${id()}-title`} {...stylex.attrs(labStyles.sectionTitle)}>
                {section.title}
              </h3>
              <For each={section.blocks}>{(block) => <Block block={block} />}</For>
            </section>
          );
        }}
      </For>
    </div>
  );
}

function Block(props: { block: InsightBlock }) {
  const block = untrack(() => props.block);
  switch (block.kind) {
    case "paragraphs":
      return (
        <div {...stylex.attrs(labStyles.paragraphs)}>
          {block.items.map((paragraph) => (
            <p {...stylex.attrs(labStyles.paragraph)}>{paragraph}</p>
          ))}
        </div>
      );
    case "bullets":
      return (
        <ul {...stylex.attrs(labStyles.bullets)}>
          {block.items.map((item) => (
            <li {...stylex.attrs(labStyles.bullet)}>{item}</li>
          ))}
        </ul>
      );
    case "terms":
      return (
        <ul {...stylex.attrs(labStyles.terms)}>
          {block.items.map((item) => (
            <li {...stylex.attrs(labStyles.termRow)}>
              <h4 {...stylex.attrs(labStyles.term)}>{item.term}</h4>
              <p {...stylex.attrs(labStyles.paragraph)}>{item.desc}</p>
            </li>
          ))}
        </ul>
      );
    case "note":
      return (
        <div {...stylex.attrs(labStyles.note)}>
          <p {...stylex.attrs(labStyles.noteText)}>
            <strong {...stylex.attrs(labStyles.thesisLabel)}>{block.label}</strong>
            {block.text}
          </p>
        </div>
      );
    case "disclaimer":
      return <p {...stylex.attrs(labStyles.disclaimer)}>{block.text}</p>;
  }
}
