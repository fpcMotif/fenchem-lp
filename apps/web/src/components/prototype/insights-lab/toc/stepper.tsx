import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { createEffect, For, onSettled, Show } from "solid-js";

import { m, type MotionValue } from "@/compat/motion";

import { color } from "../../variant-oos1/tokens.stylex";
import { lab } from "../tokens.stylex";
import {
  ArticleFlow,
  READING_GAP,
  STICKY_OFFSET,
  TocPage,
  articleAnchor,
  introChars,
  kitStyles,
  labStyles,
  padIndex,
  sectionAnchor,
  sectionChars,
  shortTitle,
  splitNumeral,
  useLabArticles,
  useReadingPosition,
  type LabArticle,
  type ReadingPosition,
  type SubPageProps,
} from "./kit";

const STRIP_HEIGHT = 48;
const READING_LINE = STICKY_OFFSET + STRIP_HEIGHT + READING_GAP;

const sxProps = (...args: ReadonlyArray<StyleXStyles | false | null | undefined>) =>
  stylex.attrs(...args);

const styles = stylex.create({
  tabsNav: {
    position: "relative",
    minWidth: 0,
    height: "100%",
    overflowX: "auto",
    scrollbarWidth: "none",
  },
  tabs: {
    display: "flex",
    alignItems: "stretch",
    gap: { default: 2, [breakpoints.md]: 6 },
    height: "100%",
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  tab: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    height: "100%",
    paddingInline: { default: 8, [breakpoints.md]: 12 },
    fontSize: 13,
    fontWeight: 500,
    letterSpacing: "0.03em",
    whiteSpace: "nowrap",
    textDecoration: "none",
    color: {
      default: color.bodyText,
      ":hover": { default: null, [lab.hover]: color.ink },
    },
    transitionProperty: "color",
    transitionDuration: "150ms",
    transitionTimingFunction: lab.easeOut,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineOffset: -6,
    outlineColor: colors.brandBlue700,
    WebkitTapHighlightColor: "transparent",
  },
  tabCurrent: {
    fontWeight: 700,
    color: color.ink,
  },
  tabNumber: {
    fontSize: 12,
    fontWeight: 600,
    color: color.muted,
  },
  tabNumberCurrent: {
    color: colors.brandBlue700,
  },
  tabLabel: {
    display: { default: "none", [breakpoints.lg]: "inline" },
  },
  tabLabelCurrent: {
    display: "inline",
  },
  indicator: {
    position: "absolute",
    left: 0,
    bottom: 0,
    width: 0,
    height: 2,
    backgroundColor: colors.brandBlue700,
    opacity: 0,
    pointerEvents: "none",
  },
  strip: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    height: STRIP_HEIGHT,
    backgroundColor: colors.paper,
    boxShadow: "0 1px 0 0 rgba(26, 26, 26, 0.08)",
    opacity: 0,
    visibility: "hidden",
    transform: { default: null, [breakpoints.motionOk]: "translateY(-6px)" },
    transitionProperty: "opacity, transform, visibility",
    transitionDuration: { default: "0s", [breakpoints.motionOk]: "160ms, 160ms, 0s" },
    transitionDelay: { default: "0s", [breakpoints.motionOk]: "0s, 0s, 160ms" },
    transitionTimingFunction: lab.easeOut,
  },
  stripShown: {
    opacity: 1,
    visibility: "visible",
    transform: "none",
    transitionDuration: { default: "0s", [breakpoints.motionOk]: "220ms, 220ms, 0s" },
    transitionDelay: "0s",
  },
  stripInner: {
    display: "flex",
    alignItems: "stretch",
    gap: 14,
    height: "100%",
  },
  now: {
    display: { default: "flex", [breakpoints.md]: "none" },
    alignItems: "center",
    gap: 6,
    flexShrink: 0,
    maxWidth: "46%",
    margin: 0,
    fontSize: 12,
    fontWeight: 600,
    whiteSpace: "nowrap",
    color: color.ink,
  },
  nowNumeral: {
    flexShrink: 0,
    color: colors.brandBlue700,
  },
  nowText: {
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  segments: {
    display: "flex",
    flexGrow: 1,
    gap: { default: 3, [breakpoints.md]: 6 },
    minWidth: 0,
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  segmentItem: {
    flexBasis: 0,
    minWidth: { default: 10, [breakpoints.md]: 52 },
  },
  segment: {
    display: "flex",
    flexDirection: "column",
    justifyContent: { default: "center", [breakpoints.md]: "flex-start" },
    gap: 8,
    height: "100%",
    paddingTop: { default: 0, [breakpoints.md]: 13 },
    textDecoration: "none",
    color: {
      default: color.muted,
      ":hover": { default: null, [lab.hover]: color.ink },
    },
    transitionProperty: "color",
    transitionDuration: "150ms",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineOffset: 2,
    outlineColor: colors.brandBlue700,
    WebkitTapHighlightColor: "transparent",
  },
  segmentCurrent: {
    color: color.ink,
  },
  track: {
    position: "relative",
    display: "block",
    height: 3,
    overflow: "hidden",
    borderRadius: 2,
    backgroundColor: "rgba(26, 26, 26, 0.1)",
  },
  fill: {
    position: "absolute",
    inset: 0,
    backgroundColor: colors.brandBlue700,
    transformOrigin: "left center",
  },
  fillDone: {
    transform: "none",
  },
  fillAhead: {
    transform: "scaleX(0)",
  },
  segmentLabel: {
    display: { default: "none", [breakpoints.md]: "flex" },
    gap: 4,
    minWidth: 0,
    fontSize: 12,
    lineHeight: 1.2,
    whiteSpace: "nowrap",
  },
  segmentLabelCurrent: {
    fontWeight: 600,
  },
  segmentNumeral: {
    flexShrink: 0,
  },
  segmentText: {
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
});

export function StepperVariant(props: SubPageProps) {
  const articles = useLabArticles();
  const { position, chapterProgress } = useReadingPosition(articles, READING_LINE);

  onSettled(() => {
    const root = document.documentElement;
    const previous = root.style.scrollPaddingTop;
    root.style.scrollPaddingTop = `${STRIP_HEIGHT}px`;
    return () => {
      root.style.scrollPaddingTop = previous;
    };
  });

  return (
    <TocPage
      onNavigateHome={props.onNavigateHome}
      bar={<ArticleTabs articles={articles()} position={position()} />}
      under={
        <ChapterStrip articles={articles()} position={position()} progress={chapterProgress} />
      }
    >
      <ArticleFlow articles={articles()} />
    </TocPage>
  );
}

function ArticleTabs(props: { articles: readonly LabArticle[]; position: ReadingPosition }) {
  let nav: HTMLElement | undefined;
  let list: HTMLOListElement | undefined;
  let indicator: HTMLSpanElement | undefined;

  createEffect(
    () => [props.position.article, props.articles] as const,
    ([article]) => {
      if (!nav || !indicator) return;
      const navElement = nav;
      const indicatorElement = indicator;
      const place = () => {
        const tab = list?.querySelector<HTMLElement>(`[data-tab="${article}"]`);
        indicatorElement.style.opacity = tab ? "1" : "0";
        if (!tab) return;
        indicatorElement.style.width = `${tab.offsetWidth}px`;
        indicatorElement.style.transform = `translateX(${tab.offsetLeft}px)`;
        const hidden =
          tab.offsetLeft < navElement.scrollLeft ||
          tab.offsetLeft + tab.offsetWidth > navElement.scrollLeft + navElement.clientWidth;
        if (hidden) navElement.scrollTo({ left: tab.offsetLeft - 16, behavior: "instant" });
      };
      place();
      window.addEventListener("resize", place);
      return () => window.removeEventListener("resize", place);
    },
  );

  onSettled(() => {
    const element = indicator;
    if (!element || !window.matchMedia("(prefers-reduced-motion: no-preference)").matches) return;
    const frame = requestAnimationFrame(() => {
      element.style.transition =
        "transform 260ms cubic-bezier(0.23, 1, 0.32, 1), width 260ms cubic-bezier(0.23, 1, 0.32, 1), opacity 160ms ease-out";
    });
    return () => cancelAnimationFrame(frame);
  });

  return (
    <nav ref={nav} aria-label="本页文章" {...stylex.attrs(styles.tabsNav)}>
      <ol ref={list} {...stylex.attrs(styles.tabs)}>
        <For each={props.articles}>
          {(article, index) => {
            const current = () => index() === props.position.article;
            return (
              <li>
                <a
                  href={`#${articleAnchor(article)}`}
                  data-tab={index()}
                  aria-current={current() ? "location" : undefined}
                  {...sxProps(styles.tab, current() && styles.tabCurrent)}
                >
                  <span
                    {...sxProps(
                      styles.tabNumber,
                      labStyles.displayNumber,
                      current() && styles.tabNumberCurrent,
                    )}
                  >
                    {padIndex(index())}
                  </span>
                  <span {...sxProps(styles.tabLabel, current() && styles.tabLabelCurrent)}>
                    {shortTitle(article)}
                  </span>
                </a>
              </li>
            );
          }}
        </For>
      </ol>
      <span ref={indicator} aria-hidden="true" {...stylex.attrs(styles.indicator)} />
    </nav>
  );
}

function ChapterStrip(props: {
  articles: readonly LabArticle[];
  position: ReadingPosition;
  progress: MotionValue<number>;
}) {
  const shown = () => props.position.article >= 0;
  const article = () => props.articles[Math.max(props.position.article, 0)];
  const active = () => (shown() ? props.position.chapter + 1 : -1);

  return (
    <Show when={article()} keyed>
      {(article) => {
        const steps = [
          { id: articleAnchor(article), numeral: "", text: "导读", weight: introChars(article) },
          ...article.sections.map((section) => ({
            id: sectionAnchor(article, section),
            ...splitNumeral(section.navLabel),
            weight: sectionChars(section),
          })),
        ];
        const now = () => steps[Math.max(active(), 0)];

        return (
          <div inert={!shown()} {...sxProps(styles.strip, shown() && styles.stripShown)}>
            <div {...stylex.attrs(kitStyles.shell, kitStyles.inset120, styles.stripInner)}>
              <Show when={now()}>
                {(step) => (
                  <p {...stylex.attrs(styles.now)}>
                    <Show when={step().numeral}>
                      <span {...stylex.attrs(styles.nowNumeral)}>{step().numeral}</span>
                    </Show>
                    <span {...stylex.attrs(styles.nowText)}>{step().text}</span>
                  </p>
                )}
              </Show>
              <ol aria-label={`${shortTitle(article)} 章节`} {...stylex.attrs(styles.segments)}>
                {steps.map((step, index) => {
                  const current = () => index === active();
                  return (
                    <li style={{ "flex-grow": step.weight }} {...stylex.attrs(styles.segmentItem)}>
                      <a
                        href={`#${step.id}`}
                        aria-current={current() ? "location" : undefined}
                        aria-label={step.numeral ? `${step.numeral} ${step.text}` : step.text}
                        {...sxProps(styles.segment, current() && styles.segmentCurrent)}
                      >
                        <span {...stylex.attrs(styles.track)}>
                          <Show
                            when={current()}
                            fallback={
                              <span
                                {...sxProps(
                                  styles.fill,
                                  index < active() ? styles.fillDone : styles.fillAhead,
                                )}
                              />
                            }
                          >
                            <m.span
                              style={{ scaleX: props.progress }}
                              {...stylex.attrs(styles.fill)}
                            />
                          </Show>
                        </span>
                        <span
                          {...sxProps(styles.segmentLabel, current() && styles.segmentLabelCurrent)}
                        >
                          <Show when={step.numeral}>
                            <span {...stylex.attrs(styles.segmentNumeral)}>{step.numeral}</span>
                          </Show>
                          <span {...stylex.attrs(styles.segmentText)}>{step.text}</span>
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        );
      }}
    </Show>
  );
}
