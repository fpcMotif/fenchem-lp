import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ArrowUp } from "@fenchem-lp/ui/components/lucide";
import { createMemo, For, Show } from "solid-js";

import { ArticleMeta } from "../kit";
import { color, font } from "../../variant-oos1/tokens.stylex";
import { useReducedMotion } from "../../use-reduced-motion";
import { lab } from "../tokens.stylex";
import {
  ArticleFlow,
  READING_GAP,
  STICKY_OFFSET,
  TocPage,
  articleAnchor,
  formatChars,
  kitStyles,
  labStyles,
  locationLabel,
  padIndex,
  readMinutes,
  sectionAnchor,
  sectionChars,
  shortTitle,
  splitNumeral,
  useLabArticles,
  useReadingPosition,
  type LabArticle,
  type SubPageProps,
} from "./kit";

const DESKTOP = breakpoints.xl;
const READING_LINE = STICKY_OFFSET + READING_GAP;
const CONTENTS_ID = "insights-contents";
const SCROLL_FALLBACK_MS = 1400;

const entryId = (article: LabArticle) => `${article.id}-contents-entry`;

const styles = stylex.create({
  contents: {
    maxWidth: 1200,
    marginInline: "auto",
    marginBottom: { default: 72, [DESKTOP]: 136 },
  },
  head: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "baseline",
    justifyContent: "space-between",
    columnGap: 24,
    rowGap: 8,
    paddingBottom: 16,
    borderBottomWidth: 2,
    borderBottomStyle: "solid",
    borderBottomColor: color.ink,
  },
  title: {
    margin: 0,
    fontSize: { default: 28, [DESKTOP]: 36 },
    fontWeight: 800,
    lineHeight: 1.2,
    letterSpacing: "0.04em",
    color: color.ink,
  },
  titleLatin: {
    marginInlineStart: 14,
    fontFamily: font.serifAccent,
    fontSize: "0.8em",
    fontStyle: "italic",
    fontWeight: 400,
    letterSpacing: 0,
    color: color.muted,
  },
  meta: {
    margin: 0,
    fontSize: 14,
    color: color.muted,
  },
  entries: {
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  entry: {
    position: "relative",
    isolation: "isolate",
    display: "grid",
    gridTemplateColumns: {
      default: "40px minmax(0, 1fr)",
      [breakpoints.lg]: "88px minmax(0, 5fr) minmax(0, 6fr)",
    },
    columnGap: { default: 12, [breakpoints.lg]: 40 },
    rowGap: 20,
    marginInline: { default: -16, [breakpoints.md]: -20 },
    paddingInline: { default: 16, [breakpoints.md]: 20 },
    paddingBlock: { default: 28, [DESKTOP]: 40 },
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: lab.hairline,
  },
  flash: {
    position: "absolute",
    inset: 0,
    zIndex: -1,
    backgroundColor: colors.brandBlue50,
    opacity: 0,
    pointerEvents: "none",
  },
  number: {
    fontFamily: font.serifAccent,
    fontSize: { default: 30, [breakpoints.lg]: 56 },
    lineHeight: 1,
    fontVariantNumeric: "lining-nums tabular-nums",
    color: colors.brandBlue700,
  },
  main: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    minWidth: 0,
  },
  entryTitle: {
    margin: 0,
    fontSize: { default: 20, [DESKTOP]: 24 },
    fontWeight: 700,
    lineHeight: 1.4,
    textWrap: "balance",
  },
  entryLink: {
    textDecoration: "none",
    color: {
      default: color.ink,
      ":hover": { default: null, [lab.hover]: colors.brandBlue700 },
    },
    transitionProperty: "color",
    transitionDuration: "150ms",
    transitionTimingFunction: lab.easeOut,
  },
  lead: {
    margin: 0,
    fontSize: 15,
    lineHeight: 1.75,
    color: color.bodyText,
    textWrap: "pretty",
  },
  chapters: {
    gridColumn: { default: "2", [breakpoints.lg]: "3" },
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  chapter: {
    display: "flex",
    alignItems: "last baseline",
    gap: 10,
    paddingBlock: { default: 8, [DESKTOP]: 9 },
    fontSize: { default: 14, [breakpoints.md]: 15 },
    lineHeight: 1.6,
    textDecoration: "none",
    color: {
      default: color.ink,
      ":hover": { default: null, [lab.hover]: colors.brandBlue700 },
    },
    transitionProperty: "color",
    transitionDuration: "150ms",
    transitionTimingFunction: lab.easeOut,
    WebkitTapHighlightColor: "transparent",
  },
  numeral: {
    flexShrink: 0,
    width: "1.5em",
    fontWeight: 600,
    color: colors.brandBlue700,
  },
  chapterText: {
    flexShrink: 1,
    minWidth: 0,
  },
  leader: {
    position: "relative",
    top: "-0.32em",
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 24,
    minWidth: 24,
    borderBottomWidth: 1,
    borderBottomStyle: "dotted",
    borderBottomColor: {
      default: "rgba(26, 26, 26, 0.32)",
      [stylex.when.ancestor(":hover")]: {
        default: "rgba(26, 26, 26, 0.32)",
        [lab.hover]: colors.brandBlue700,
      },
    },
    transitionProperty: "border-color",
    transitionDuration: "150ms",
  },
  chars: {
    flexShrink: 0,
    fontSize: 13,
    color: color.muted,
  },
  running: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: { default: 10, [breakpoints.md]: 16 },
    minWidth: 0,
    opacity: 0,
    visibility: "hidden",
    transform: { default: null, [breakpoints.motionOk]: "translateY(4px)" },
    transitionProperty: "opacity, transform, visibility",
    transitionDuration: "180ms, 180ms, 0s",
    transitionDelay: "0s, 0s, 180ms",
    transitionTimingFunction: lab.easeOut,
  },
  runningShown: {
    opacity: 1,
    visibility: "visible",
    transform: "none",
    transitionDuration: "220ms, 220ms, 0s",
    transitionDelay: "0s",
  },
  runningText: {
    display: "flex",
    alignItems: "baseline",
    gap: 10,
    minWidth: 0,
    margin: 0,
    fontSize: 13,
    whiteSpace: "nowrap",
  },
  runningNumber: {
    flexShrink: 0,
    fontWeight: 600,
    color: colors.brandBlue700,
  },
  runningTitle: {
    display: { default: "none", [breakpoints.md]: "inline" },
    flexShrink: 0,
    fontWeight: 600,
    color: color.ink,
  },
  runningSlash: {
    display: { default: "none", [breakpoints.md]: "inline" },
    color: "rgba(26, 26, 26, 0.24)",
  },
  runningChapter: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    color: color.bodyText,
  },
  back: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    flexShrink: 0,
    height: 36,
    paddingInline: 14,
    borderRadius: 999,
    backgroundColor: {
      default: "#f3f4f6",
      ":hover": { default: null, [lab.hover]: "#e5e7eb" },
    },
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: "0.04em",
    textDecoration: "none",
    color: color.ink,
    transform: {
      default: null,
      ":active": { default: null, [breakpoints.motionOk]: "scale(0.97)" },
    },
    transitionProperty: "background-color, transform",
    transitionDuration: "160ms",
    transitionTimingFunction: lab.easeOut,
    WebkitTapHighlightColor: "transparent",
  },
});

export function ContentsVariant(props: SubPageProps) {
  const articles = useLabArticles();
  const { position } = useReadingPosition(articles, READING_LINE);
  const reduce = useReducedMotion();
  const where = createMemo(() => locationLabel(articles(), position()));
  const totalMinutes = () => articles().reduce((sum, article) => sum + readMinutes(article), 0);

  const flashAfterScroll = (article: LabArticle) => {
    const layer = document.getElementById(entryId(article))?.querySelector("[data-flash]");
    if (!layer) return;
    let fallback = 0;
    const play = () => {
      window.clearTimeout(fallback);
      window.removeEventListener("scrollend", play);
      layer.getAnimations().forEach((animation) => animation.cancel());
      layer.animate(
        reduce()
          ? [{ opacity: 1 }, { opacity: 1 }]
          : [{ opacity: 1 }, { opacity: 1, offset: 0.3 }, { opacity: 0 }],
        { duration: 1400, easing: "ease-in-out" },
      );
    };
    window.addEventListener("scrollend", play, { once: true });
    fallback = window.setTimeout(play, SCROLL_FALLBACK_MS);
  };

  return (
    <TocPage
      onNavigateHome={props.onNavigateHome}
      bar={
        <div {...stylex.attrs(styles.running, where() && styles.runningShown)}>
          <Show when={where()}>
            {(current) => (
              <>
                <p {...stylex.attrs(styles.runningText)}>
                  <span {...stylex.attrs(styles.runningNumber, labStyles.displayNumber)}>
                    {padIndex(position().article)}
                  </span>
                  <span {...stylex.attrs(styles.runningTitle)}>
                    {shortTitle(current().article)}
                  </span>
                  <Show when={current().section}>
                    {(section) => (
                      <>
                        <span aria-hidden="true" {...stylex.attrs(styles.runningSlash)}>
                          /
                        </span>
                        <span {...stylex.attrs(styles.runningChapter)}>
                          {`${section().numeral} ${section().text}`}
                        </span>
                      </>
                    )}
                  </Show>
                </p>
                <a
                  href={`#${entryId(current().article)}`}
                  onClick={() => flashAfterScroll(current().article)}
                  {...stylex.attrs(styles.back, kitStyles.focusRing)}
                >
                  目录
                  <ArrowUp size={14} strokeWidth={2} aria-hidden="true" />
                </a>
              </>
            )}
          </Show>
        </div>
      }
    >
      <section
        id={CONTENTS_ID}
        aria-labelledby="insights-contents-title"
        {...stylex.attrs(styles.contents, kitStyles.anchor)}
      >
        <header {...stylex.attrs(styles.head)}>
          <h2 id="insights-contents-title" {...stylex.attrs(styles.title)}>
            目录
            <span lang="en" {...stylex.attrs(styles.titleLatin)}>
              Contents
            </span>
          </h2>
          <p {...stylex.attrs(styles.meta, labStyles.displayNumber)}>
            {`共 ${articles().length} 篇 · 约 ${totalMinutes()} 分钟`}
          </p>
        </header>
        <ol {...stylex.attrs(styles.entries)}>
          <For each={articles()}>
            {(article, index) => (
              <li id={entryId(article)} {...stylex.attrs(styles.entry, kitStyles.anchor)}>
                <span data-flash="" aria-hidden="true" {...stylex.attrs(styles.flash)} />
                <span aria-hidden="true" {...stylex.attrs(styles.number)}>
                  {padIndex(index())}
                </span>
                <div {...stylex.attrs(styles.main)}>
                  <ArticleMeta article={article} />
                  <h3 {...stylex.attrs(styles.entryTitle)}>
                    <a
                      href={`#${articleAnchor(article)}`}
                      {...stylex.attrs(styles.entryLink, kitStyles.focusRing)}
                    >
                      {article.title}
                    </a>
                  </h3>
                  <Show when={article.lead}>
                    <p {...stylex.attrs(styles.lead)}>{article.lead}</p>
                  </Show>
                </div>
                <ol aria-label={`${shortTitle(article)} 章节`} {...stylex.attrs(styles.chapters)}>
                  {article.sections.map((section) => {
                    const { numeral, text } = splitNumeral(section.title);
                    return (
                      <li>
                        <a
                          href={`#${sectionAnchor(article, section)}`}
                          {...stylex.attrs(
                            styles.chapter,
                            kitStyles.focusRing,
                            stylex.defaultMarker(),
                          )}
                        >
                          <span {...stylex.attrs(styles.numeral)}>{numeral}</span>
                          <span {...stylex.attrs(styles.chapterText)}>{text}</span>
                          <span aria-hidden="true" {...stylex.attrs(styles.leader)} />
                          <span {...stylex.attrs(styles.chars, labStyles.displayNumber)}>
                            {formatChars(sectionChars(section))}
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ol>
              </li>
            )}
          </For>
        </ol>
      </section>
      <ArticleFlow articles={articles()} />
    </TocPage>
  );
}
