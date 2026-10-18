import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { ChevronDown, ChevronRight } from "@fenchem-lp/ui/components/lucide";
import { createEffect, createMemo, createSignal, For, onSettled, Show, untrack } from "solid-js";

import { AnimatePresence, m, type MotionValue } from "@/compat/motion";

import { ArticleMeta } from "../kit";
import { useReducedMotion } from "../../use-reduced-motion";
import { color } from "../../variant-oos1/tokens.stylex";
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
  useMediaQuery,
  useReadingPosition,
  type LabArticle,
  type ReadingPosition,
  type SubPageProps,
} from "./kit";

const READING_LINE = STICKY_OFFSET + READING_GAP;
const PANEL_ID = "insights-locator-panel";
const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const sxProps = (...args: ReadonlyArray<StyleXStyles | false | null | undefined>) =>
  stylex.attrs(...args);

const styles = stylex.create({
  trigger: {
    appearance: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    minWidth: 0,
    maxWidth: "100%",
    height: 40,
    paddingInlineStart: 12,
    paddingInlineEnd: 12,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: lab.hairline,
    borderRadius: 999,
    backgroundColor: {
      default: colors.paper,
      ":hover": { default: null, [lab.hover]: lab.surfaceAlt },
    },
    fontFamily: "inherit",
    fontSize: 13,
    color: color.ink,
    whiteSpace: "nowrap",
    cursor: "pointer",
    transform: {
      default: null,
      ":active": { default: null, [breakpoints.motionOk]: "scale(0.97)" },
    },
    transitionProperty: "background-color, border-color, transform",
    transitionDuration: "160ms",
    transitionTimingFunction: lab.easeOut,
    WebkitTapHighlightColor: "transparent",
  },
  triggerOpen: {
    borderColor: "rgba(7, 67, 174, 0.32)",
    backgroundColor: lab.surfaceAlt,
  },
  ring: {
    flexShrink: 0,
    color: colors.brandBlue700,
  },
  ringTrack: {
    stroke: lab.hairline,
  },
  count: {
    flexShrink: 0,
    fontWeight: 600,
    color: colors.brandBlue700,
  },
  title: {
    display: { default: "none", [breakpoints.lg]: "inline" },
    flexShrink: 0,
    fontWeight: 600,
  },
  separator: {
    display: { default: "none", [breakpoints.lg]: "block" },
    flexShrink: 0,
    color: color.muted,
  },
  chapter: {
    minWidth: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    color: color.bodyText,
  },
  chevron: {
    flexShrink: 0,
    color: color.muted,
    transitionProperty: "transform",
    transitionDuration: { default: "0ms", [breakpoints.motionOk]: "200ms" },
    transitionTimingFunction: lab.easeOut,
  },
  chevronOpen: {
    transform: "rotate(180deg)",
  },
  anchorBox: {
    position: "relative",
    height: 0,
  },
  panel: {
    position: "absolute",
    top: 8,
    right: 0,
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [breakpoints.md]: "264px minmax(0, 1fr)" },
    gridTemplateRows: { default: "minmax(0, 1fr)", [breakpoints.md]: "minmax(0, 1fr) auto" },
    width: { default: "100%", [breakpoints.md]: "min(760px, 100%)" },
    maxHeight: `calc(100dvh - ${lab.stickyTop} - 32px)`,
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: colors.paper,
    boxShadow: "0 0 0 1px rgba(7, 26, 74, 0.08), 0 24px 56px -20px rgba(7, 26, 74, 0.32)",
    transformOrigin: "top right",
  },
  articles: {
    margin: 0,
    padding: 8,
    listStyle: "none",
    overflowY: "auto",
    overscrollBehavior: "contain",
    backgroundColor: lab.surfaceAlt,
  },
  articleRow: {
    display: "grid",
    gridTemplateColumns: "28px minmax(0, 1fr) auto",
    alignItems: "baseline",
    rowGap: 10,
    paddingBlock: 12,
    paddingInline: 12,
    borderRadius: 10,
    textDecoration: "none",
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 1.45,
    color: color.ink,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineOffset: -2,
    outlineColor: colors.brandBlue700,
    WebkitTapHighlightColor: "transparent",
  },
  articleRowPreview: {
    backgroundColor: colors.paper,
    boxShadow: "0 1px 2px rgba(7, 26, 74, 0.08), 0 0 0 1px rgba(7, 26, 74, 0.04)",
  },
  articleNumber: {
    fontSize: 12,
    color: color.muted,
  },
  articleNumberHere: {
    color: colors.brandBlue700,
  },
  articleMinutes: {
    fontSize: 12,
    fontWeight: 400,
    color: color.muted,
  },
  bar: {
    gridColumn: "2 / 4",
    position: "relative",
    height: 2,
    overflow: "hidden",
    borderRadius: 999,
    backgroundColor: "rgba(26, 26, 26, 0.08)",
  },
  barFill: {
    position: "absolute",
    inset: 0,
    backgroundColor: colors.brandBlue700,
    transformOrigin: "left center",
  },
  barFillDone: {
    transform: "none",
  },
  barFillAhead: {
    transform: "scaleX(0)",
  },
  detail: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    minWidth: 0,
    paddingBlock: { default: 18, [breakpoints.md]: 24 },
    paddingInline: { default: 16, [breakpoints.md]: 28 },
    overflowY: "auto",
    overscrollBehavior: "contain",
  },
  detailTitle: {
    margin: 0,
    fontSize: 18,
    fontWeight: 700,
    lineHeight: 1.45,
    textWrap: "balance",
  },
  detailTitleLink: {
    textDecoration: "none",
    color: {
      default: color.ink,
      ":hover": { default: null, [lab.hover]: colors.brandBlue700 },
    },
    transitionProperty: "color",
    transitionDuration: "150ms",
  },
  detailLead: {
    margin: 0,
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
    overflow: "hidden",
    fontSize: 14,
    lineHeight: 1.7,
    color: color.bodyText,
  },
  chapters: {
    margin: 0,
    marginTop: 6,
    padding: 0,
    paddingTop: 8,
    listStyle: "none",
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: lab.hairline,
  },
  chapterLink: {
    display: "grid",
    gridTemplateColumns: "1.6em minmax(0, 1fr) auto",
    alignItems: "baseline",
    columnGap: 8,
    marginInline: -10,
    paddingBlock: 10,
    paddingInline: 10,
    borderRadius: 8,
    fontSize: 14,
    lineHeight: 1.55,
    textDecoration: "none",
    color: color.ink,
    backgroundColor: {
      default: "transparent",
      ":hover": { default: null, [lab.hover]: lab.surfaceAlt },
      ":focus-visible": lab.surfaceAlt,
    },
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineOffset: -2,
    outlineColor: colors.brandBlue700,
    transitionProperty: "background-color",
    transitionDuration: "120ms",
    WebkitTapHighlightColor: "transparent",
  },
  chapterHere: {
    fontWeight: 600,
  },
  numeral: {
    fontWeight: 600,
    color: colors.brandBlue700,
  },
  chars: {
    fontSize: 12,
    color: color.muted,
  },
  here: {
    paddingBlock: 2,
    paddingInline: 8,
    borderRadius: 999,
    backgroundColor: colors.brandBlue50,
    fontSize: 12,
    fontWeight: 600,
    color: colors.brandBlue700,
  },
  hint: {
    gridColumn: "1 / -1",
    display: { default: "none", [lab.hover]: { default: "none", [breakpoints.md]: "flex" } },
    alignItems: "center",
    gap: 16,
    paddingBlock: 10,
    paddingInline: 16,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: lab.hairline,
    fontSize: 12,
    color: color.muted,
  },
  key: {
    display: "inline-grid",
    placeItems: "center",
    minWidth: 20,
    height: 20,
    marginInlineEnd: 6,
    paddingInline: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: lab.hairline,
    backgroundColor: lab.surfaceAlt,
    fontSize: 11,
    fontWeight: 600,
    color: color.bodyText,
  },
  stack: {
    margin: 0,
    paddingBlock: 8,
    paddingInline: 16,
    listStyle: "none",
    overflowY: "auto",
    overscrollBehavior: "contain",
  },
  stackItem: {
    paddingBlock: 6,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: lab.hairline,
  },
  stackArticle: {
    display: "grid",
    gridTemplateColumns: "28px minmax(0, 1fr)",
    alignItems: "baseline",
    minHeight: 44,
    alignContent: "center",
    fontSize: 15,
    fontWeight: 700,
    textDecoration: "none",
    color: color.ink,
    WebkitTapHighlightColor: "transparent",
  },
  stackChapters: {
    margin: 0,
    paddingInlineStart: 28,
    listStyle: "none",
  },
  stackChapter: {
    display: "grid",
    gridTemplateColumns: "1.6em minmax(0, 1fr) auto",
    alignItems: "baseline",
    columnGap: 6,
    minHeight: 40,
    alignContent: "center",
    fontSize: 14,
    textDecoration: "none",
    color: color.bodyText,
    WebkitTapHighlightColor: "transparent",
  },
});

export function LocatorVariant(props: SubPageProps) {
  const articles = useLabArticles();
  const { position, articleProgress } = useReadingPosition(articles, READING_LINE);
  const [open, setOpen] = createSignal(false);
  let trigger: HTMLButtonElement | undefined;
  let panel: HTMLElement | undefined;
  const where = createMemo(() => locationLabel(articles(), position()));

  createEffect(open, (isOpen) => {
    if (!isOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (panel?.contains(target) || trigger?.contains(target)) return;
      setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      setOpen(false);
      trigger?.focus();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  });

  return (
    <TocPage
      onNavigateHome={props.onNavigateHome}
      bar={
        <button
          ref={trigger}
          type="button"
          aria-expanded={open() ? "true" : "false"}
          aria-controls={PANEL_ID}
          onClick={() => setOpen((value) => !value)}
          {...sxProps(styles.trigger, open() && styles.triggerOpen, kitStyles.focusRing)}
        >
          <ProgressRing progress={articleProgress} />
          <Show
            when={where()}
            fallback={
              <span {...stylex.attrs(styles.chapter)}>{`本页目录 · ${articles().length} 篇`}</span>
            }
          >
            {(current) => (
              <>
                <span {...stylex.attrs(styles.count, labStyles.displayNumber)}>
                  {`${padIndex(position().article)}/${padIndex(articles().length - 1)}`}
                </span>
                <span {...stylex.attrs(styles.title)}>{shortTitle(current().article)}</span>
                <ChevronRight
                  size={14}
                  strokeWidth={2}
                  aria-hidden="true"
                  {...stylex.attrs(styles.separator)}
                />
                <span {...stylex.attrs(styles.chapter)}>
                  {current().section
                    ? `${current().section!.numeral} ${current().section!.text}`
                    : "导读"}
                </span>
              </>
            )}
          </Show>
          <ChevronDown
            size={16}
            strokeWidth={2}
            aria-hidden="true"
            {...sxProps(styles.chevron, open() && styles.chevronOpen)}
          />
        </button>
      }
      under={
        <div {...stylex.attrs(kitStyles.shell, kitStyles.inset120)}>
          <div {...stylex.attrs(styles.anchorBox)}>
            <AnimatePresence>
              <Show when={open()}>
                <LocatorPanel
                  panelRef={(el) => {
                    panel = el;
                  }}
                  articles={articles()}
                  position={position()}
                  progress={articleProgress}
                  onNavigate={() => setOpen(false)}
                />
              </Show>
            </AnimatePresence>
          </div>
        </div>
      }
    >
      <ArticleFlow articles={articles()} />
    </TocPage>
  );
}

function ProgressRing(props: { progress: MotionValue<number> }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      aria-hidden="true"
      {...stylex.attrs(styles.ring)}
    >
      <circle
        cx="9"
        cy="9"
        r="7"
        fill="none"
        stroke-width="2"
        {...stylex.attrs(styles.ringTrack)}
      />
      <m.circle
        cx="9"
        cy="9"
        r="7"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        transform="rotate(-90 9 9)"
        style={{ pathLength: props.progress }}
      />
    </svg>
  );
}

function LocatorPanel(props: {
  panelRef: (element: HTMLElement) => void;
  articles: readonly LabArticle[];
  position: ReadingPosition;
  progress: MotionValue<number>;
  onNavigate: () => void;
}) {
  const reduce = useReducedMotion();
  const wide = useMediaQuery("(min-width: 768px)");
  const [preview, setPreview] = createSignal(untrack(() => Math.max(props.position.article, 0)));
  const articleLinks: (HTMLAnchorElement | undefined)[] = [];
  let panel: HTMLElement | undefined;
  let detail: HTMLDivElement | undefined;
  const previewed = () => props.articles[preview()] ?? props.articles[0];
  const navigate = () => props.onNavigate();

  onSettled(() => {
    const frame = requestAnimationFrame(() => {
      const first = panel?.querySelector<HTMLElement>("[data-initial]");
      first?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  });

  const chapterLinks = () => [
    ...(detail?.querySelectorAll<HTMLAnchorElement>("a[data-chapter]") ?? []),
  ];

  const onKeyDown = (event: KeyboardEvent) => {
    const active = document.activeElement;
    const inArticles = articleLinks.some((link) => link === active);
    const chapters = chapterLinks();
    const chapterIndex = chapters.findIndex((link) => link === active);
    const move = (offset: number) => {
      event.preventDefault();
      if (inArticles) {
        const count = props.articles.length;
        const next = (preview() + offset + count) % count;
        articleLinks[next]?.focus();
      } else if (chapterIndex >= 0) {
        chapters[(chapterIndex + offset + chapters.length) % chapters.length]?.focus();
      }
    };
    if (event.key === "ArrowDown") move(1);
    else if (event.key === "ArrowUp") move(-1);
    else if (event.key === "ArrowRight" && inArticles) {
      event.preventDefault();
      chapters[0]?.focus();
    } else if (event.key === "ArrowLeft" && chapterIndex >= 0) {
      event.preventDefault();
      articleLinks[preview()]?.focus();
    }
  };

  return (
    <m.nav
      ref={(element: HTMLElement) => {
        panel = element;
        props.panelRef(element);
      }}
      id={PANEL_ID}
      aria-label="本页目录"
      onKeyDown={(event: KeyboardEvent) => {
        if (wide()) onKeyDown(event);
      }}
      initial={untrack(reduce) ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: -6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{
        opacity: 0,
        ...(reduce() ? {} : { scale: 0.98, y: -4 }),
        transition: { duration: 0.12, ease: EASE_OUT },
      }}
      transition={{ duration: 0.2, ease: EASE_OUT }}
      {...stylex.attrs(styles.panel)}
    >
      <Show
        when={wide()}
        fallback={
          <ol {...stylex.attrs(styles.stack)}>
            <For each={props.articles}>
              {(article, index) => {
                const isHere = () => index() === props.position.article;
                return (
                  <li {...stylex.attrs(styles.stackItem)}>
                    <a
                      href={`#${articleAnchor(article)}`}
                      data-initial={index() === preview() ? "" : undefined}
                      aria-current={isHere() ? "location" : undefined}
                      onClick={navigate}
                      {...stylex.attrs(styles.stackArticle, kitStyles.focusRing)}
                    >
                      <span
                        {...sxProps(
                          styles.articleNumber,
                          labStyles.displayNumber,
                          isHere() && styles.articleNumberHere,
                        )}
                      >
                        {padIndex(index())}
                      </span>
                      <span>{shortTitle(article)}</span>
                    </a>
                    <ol {...stylex.attrs(styles.stackChapters)}>
                      {article.sections.map((section, chapter) => {
                        const { numeral, text } = splitNumeral(section.navLabel);
                        const here = () => isHere() && chapter === props.position.chapter;
                        return (
                          <li>
                            <a
                              href={`#${sectionAnchor(article, section)}`}
                              aria-current={here() ? "location" : undefined}
                              onClick={navigate}
                              {...sxProps(
                                styles.stackChapter,
                                here() && styles.chapterHere,
                                kitStyles.focusRing,
                              )}
                            >
                              <span {...stylex.attrs(styles.numeral)}>{numeral}</span>
                              <span>{text}</span>
                              <Show when={here()}>
                                <span {...stylex.attrs(styles.here)}>当前</span>
                              </Show>
                            </a>
                          </li>
                        );
                      })}
                    </ol>
                  </li>
                );
              }}
            </For>
          </ol>
        }
      >
        <ol {...stylex.attrs(styles.articles)}>
          <For each={props.articles}>
            {(article, index) => {
              const isHere = () => index() === props.position.article;
              return (
                <li>
                  <a
                    ref={(node) => {
                      articleLinks[index()] = node;
                    }}
                    href={`#${articleAnchor(article)}`}
                    data-initial={index() === preview() ? "" : undefined}
                    aria-current={isHere() ? "location" : undefined}
                    onPointerEnter={() => setPreview(index())}
                    onFocusIn={() => setPreview(index())}
                    onClick={navigate}
                    {...sxProps(
                      styles.articleRow,
                      index() === preview() && styles.articleRowPreview,
                    )}
                  >
                    <span
                      {...sxProps(
                        styles.articleNumber,
                        labStyles.displayNumber,
                        isHere() && styles.articleNumberHere,
                      )}
                    >
                      {padIndex(index())}
                    </span>
                    <span>{shortTitle(article)}</span>
                    <span {...stylex.attrs(styles.articleMinutes, labStyles.displayNumber)}>
                      {`${readMinutes(article)} 分钟`}
                    </span>
                    <span aria-hidden="true" {...stylex.attrs(styles.bar)}>
                      <Show
                        when={isHere()}
                        fallback={
                          <span
                            {...sxProps(
                              styles.barFill,
                              index() < props.position.article
                                ? styles.barFillDone
                                : styles.barFillAhead,
                            )}
                          />
                        }
                      >
                        <m.span
                          style={{ scaleX: props.progress }}
                          {...stylex.attrs(styles.barFill)}
                        />
                      </Show>
                    </span>
                  </a>
                </li>
              );
            }}
          </For>
        </ol>
        <Show when={previewed()} keyed>
          {(current) => (
            <div ref={detail} {...stylex.attrs(styles.detail)}>
              <ArticleMeta article={current} />
              <p {...stylex.attrs(styles.detailTitle)}>
                <a
                  href={`#${articleAnchor(current)}`}
                  tabindex={-1}
                  onClick={navigate}
                  {...stylex.attrs(styles.detailTitleLink)}
                >
                  {current.title}
                </a>
              </p>
              <Show when={current.lead}>
                <p {...stylex.attrs(styles.detailLead)}>{current.lead}</p>
              </Show>
              <ol {...stylex.attrs(styles.chapters)}>
                {current.sections.map((section, chapter) => {
                  const { numeral, text } = splitNumeral(section.title);
                  const here = () =>
                    preview() === props.position.article && chapter === props.position.chapter;
                  return (
                    <li>
                      <a
                        href={`#${sectionAnchor(current, section)}`}
                        data-chapter=""
                        aria-current={here() ? "location" : undefined}
                        onClick={navigate}
                        {...sxProps(styles.chapterLink, here() && styles.chapterHere)}
                      >
                        <span {...stylex.attrs(styles.numeral)}>{numeral}</span>
                        <span>{text}</span>
                        <Show
                          when={here()}
                          fallback={
                            <span {...stylex.attrs(styles.chars, labStyles.displayNumber)}>
                              {formatChars(sectionChars(section))}
                            </span>
                          }
                        >
                          <span {...stylex.attrs(styles.here)}>当前</span>
                        </Show>
                      </a>
                    </li>
                  );
                })}
              </ol>
            </div>
          )}
        </Show>
        <p {...stylex.attrs(styles.hint)}>
          <span>
            <kbd {...stylex.attrs(styles.key)}>↑↓</kbd>
            切换文章
          </span>
          <span>
            <kbd {...stylex.attrs(styles.key)}>→</kbd>
            进入章节
          </span>
          <span>
            <kbd {...stylex.attrs(styles.key)}>Esc</kbd>
            关闭
          </span>
        </p>
      </Show>
    </m.nav>
  );
}
