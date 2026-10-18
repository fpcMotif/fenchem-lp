import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "@fenchem-lp/ui/components/lucide";
import { createEffect, createMemo, createSignal, For, onCleanup, Show, untrack } from "solid-js";

import { m } from "@/compat/motion";

import { EASE } from "../../motion-constants";
import { color } from "../../variant-oos1/tokens.stylex";
import {
  ArticleMeta,
  ArticlePreview,
  ArticleSections,
  LabPage,
  articleIdChips,
  isAboveReadingLine,
  jumpTo,
  kitStyles,
  labStyles,
  padIndex,
  readMinutes,
  sectionChips,
  useLabArticles,
  type LabArticle,
  type SubPageProps,
} from "../kit";
import { lab } from "../tokens.stylex";

const DESKTOP = breakpoints.xl;

const sxProps = (...args: ReadonlyArray<StyleXStyles | false | null | undefined>) =>
  stylex.attrs(...args);

const styles = stylex.create({
  shelf: {
    maxWidth: 1200,
    marginInline: "auto",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.md]: "repeat(2, minmax(0, 1fr))",
    },
    columnGap: { default: 24, [DESKTOP]: 40 },
    rowGap: { default: 40, [DESKTOP]: 56 },
    margin: 0,
    marginTop: { default: 28, [DESKTOP]: 40 },
    padding: 0,
    listStyle: "none",
  },
  gridThree: {
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.md]: "repeat(2, minmax(0, 1fr))",
      [DESKTOP]: "repeat(3, minmax(0, 1fr))",
    },
  },
  card: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: 16,
    outlineStyle: "solid",
    outlineWidth: 2,
    outlineOffset: 8,
    outlineColor: { default: "transparent", ":focus-within": colors.brandBlue700 },
  },
  media: {
    position: "relative",
    overflow: "hidden",
    aspectRatio: "16 / 10",
    backgroundColor: lab.surfaceAlt,
  },
  image: {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transform: {
      default: null,
      [stylex.when.ancestor(":hover")]: {
        default: null,
        [lab.hover]: { default: null, [breakpoints.motionOk]: "scale(1.03)" },
      },
    },
    transitionProperty: "transform",
    transitionDuration: "320ms",
    transitionTimingFunction: lab.easeOut,
  },
  index: {
    position: "absolute",
    top: 12,
    left: 12,
    paddingBlock: 4,
    paddingInline: 8,
    backgroundColor: "rgba(255, 255, 255, 0.92)",
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.08em",
    color: color.ink,
  },
  cardBody: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  cardTitle: {
    margin: 0,
    fontSize: { default: 20, [DESKTOP]: 22 },
    fontWeight: 700,
    lineHeight: 1.4,
    textWrap: "balance",
  },
  cardButton: {
    appearance: "none",
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    textAlign: "start",
    fontFamily: "inherit",
    fontSize: "inherit",
    fontWeight: "inherit",
    lineHeight: "inherit",
    color: {
      default: color.ink,
      [stylex.when.ancestor(":hover")]: { default: color.ink, [lab.hover]: colors.brandBlue700 },
    },
    cursor: "pointer",
    transitionProperty: "color",
    transitionDuration: "160ms",
    transitionTimingFunction: lab.easeOut,
    outlineStyle: "none",
    "::after": {
      content: '""',
      position: "absolute",
      inset: 0,
    },
  },
  cardLead: {
    margin: 0,
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 3,
    overflow: "hidden",
    fontSize: 15,
    lineHeight: 1.75,
    color: color.bodyText,
  },
  cardCta: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: "0.04em",
    color: colors.brandBlue700,
  },
  cardArrow: {
    transform: {
      default: null,
      [stylex.when.ancestor(":hover")]: {
        default: null,
        [lab.hover]: { default: null, [breakpoints.motionOk]: "translateX(3px)" },
      },
    },
    transitionProperty: "transform",
    transitionDuration: "200ms",
    transitionTimingFunction: lab.easeOut,
  },
  reader: {
    maxWidth: 800,
    marginInline: "auto",
  },
  bar: {
    position: "sticky",
    top: lab.stickyTop,
    zIndex: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    height: 56,
    marginBottom: { default: 28, [DESKTOP]: 40 },
    backgroundColor: "rgba(255, 255, 255, 0.96)",
    backdropFilter: "blur(12px)",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: lab.hairline,
  },
  barRight: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  position: {
    marginInlineEnd: 4,
    fontSize: 14,
    color: color.muted,
  },
  iconButton: {
    appearance: "none",
    display: "grid",
    placeItems: "center",
    width: 40,
    height: 40,
    padding: 0,
    borderRadius: 999,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: lab.hairline,
    backgroundColor: {
      default: "transparent",
      ":hover": { default: null, [lab.hover]: lab.surfaceAlt },
    },
    color: color.ink,
    cursor: { default: "pointer", ":disabled": "default" },
    opacity: { default: 1, ":disabled": 0.35 },
    transform: { default: null, ":active:not(:disabled)": "scale(0.96)" },
    transitionProperty: "background-color, transform",
    transitionDuration: "160ms",
    transitionTimingFunction: lab.easeOut,
  },
  head: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 14, [DESKTOP]: 18 },
    marginBottom: { default: 22, [DESKTOP]: 26 },
  },
  headTitle: {
    outlineStyle: "none",
  },
  sectionsGap: {
    marginTop: { default: 20, [DESKTOP]: 28 },
  },
  footer: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
    marginTop: { default: 48, [DESKTOP]: 64 },
    paddingTop: 28,
    borderTopWidth: 2,
    borderTopStyle: "solid",
    borderTopColor: color.ink,
  },
  next: {
    appearance: "none",
    display: "grid",
    gridTemplateColumns: {
      default: "96px minmax(0, 1fr)",
      [breakpoints.md]: "180px minmax(0, 1fr) auto",
    },
    alignItems: "center",
    columnGap: { default: 16, [breakpoints.md]: 24 },
    width: "100%",
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    textAlign: "start",
    fontFamily: "inherit",
    fontSize: 16,
    color: color.ink,
    cursor: "pointer",
  },
  nextMedia: {
    overflow: "hidden",
    aspectRatio: "16 / 10",
  },
  nextText: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    minWidth: 0,
  },
  nextLabel: {
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: "0.1em",
    color: colors.brandBlue700,
  },
  nextTitle: {
    fontSize: { default: 17, [DESKTOP]: 20 },
    fontWeight: 700,
    lineHeight: 1.45,
    color: {
      default: color.ink,
      [stylex.when.ancestor(":hover")]: { default: color.ink, [lab.hover]: colors.brandBlue700 },
    },
    transitionProperty: "color",
    transitionDuration: "160ms",
  },
  nextArrow: {
    display: { default: "none", [breakpoints.md]: "grid" },
    placeItems: "center",
    width: 48,
    height: 48,
    borderRadius: 999,
    backgroundColor: colors.brandBlue700,
    color: colors.paper,
  },
  footerActions: {
    display: "flex",
    justifyContent: "center",
  },
});

export function ShelfVariant(props: SubPageProps) {
  const articles = useLabArticles();
  const [readingId, setReadingId] = createSignal<string | null>(null);
  let cameFrom: string | null = null;
  let stage: HTMLDivElement | undefined;
  let heading: HTMLHeadingElement | undefined;
  const cards = new Map<string, HTMLButtonElement>();
  const readingIndex = createMemo(() =>
    articles().findIndex((article) => article.id === readingId()),
  );
  const reading = createMemo(() => (readingIndex() >= 0 ? articles()[readingIndex()] : undefined));

  createEffect(readingId, (id) => {
    if (!stage) return;
    if (id) {
      if (isAboveReadingLine(stage)) jumpTo(stage);
      heading?.focus({ preventScroll: true });
      return;
    }
    const origin = cameFrom ? cards.get(cameFrom) : undefined;
    if (!origin) return;
    const card = origin.closest("li") ?? origin;
    const box = card.getBoundingClientRect();
    if (box.top < 0 || box.bottom > window.innerHeight) jumpTo(card);
    origin.focus({ preventScroll: true });
  });

  const read = (id: string) => {
    cameFrom = id;
    setReadingId(id);
  };

  return (
    <LabPage
      onNavigateHome={props.onNavigateHome}
      chips={reading() ? sectionChips(reading()!) : articleIdChips(articles())}
      onSelectChip={reading() ? undefined : read}
    >
      <div ref={stage} {...stylex.attrs(kitStyles.anchor)}>
        <Show when={reading()?.id ?? "shelf"} keyed>
          {(_key) => {
            const current = untrack(reading);
            return (
              <m.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.24, ease: EASE }}
              >
                {current ? (
                  <Reader
                    article={current}
                    index={readingIndex()}
                    total={articles().length}
                    next={articles()[readingIndex() + 1]}
                    headingRef={(node) => {
                      heading = node;
                    }}
                    onBack={() => setReadingId(null)}
                    onGo={(offset) => {
                      const target = articles()[readingIndex() + offset];
                      if (target) read(target.id);
                    }}
                  />
                ) : (
                  <div {...stylex.attrs(styles.shelf)}>
                    <div {...stylex.attrs(labStyles.listHeader)}>
                      <p {...stylex.attrs(labStyles.listLabel)}>全部洞察</p>
                      <p {...stylex.attrs(labStyles.listCount)}>{`共 ${articles().length} 篇`}</p>
                    </div>
                    <ul {...sxProps(styles.grid, articles().length === 3 && styles.gridThree)}>
                      <For each={articles()}>
                        {(article, index) => {
                          onCleanup(() => cards.delete(article.id));
                          return (
                            <li>
                              <ShelfCard
                                article={article}
                                index={index()}
                                buttonRef={(node) => {
                                  cards.set(article.id, node);
                                }}
                                onRead={() => read(article.id)}
                              />
                            </li>
                          );
                        }}
                      </For>
                    </ul>
                  </div>
                )}
              </m.div>
            );
          }}
        </Show>
      </div>
    </LabPage>
  );
}

function ShelfCard(props: {
  article: LabArticle;
  index: number;
  buttonRef: (node: HTMLButtonElement) => void;
  onRead: () => void;
}) {
  return (
    <article {...stylex.attrs(styles.card, stylex.defaultMarker())}>
      <div {...stylex.attrs(styles.media)}>
        <img
          src={props.article.image}
          alt=""
          loading="lazy"
          decoding="async"
          {...stylex.attrs(styles.image)}
        />
        <span {...stylex.attrs(styles.index, labStyles.displayNumber)}>
          {padIndex(props.index)}
        </span>
      </div>
      <div {...stylex.attrs(styles.cardBody)}>
        <ArticleMeta article={props.article} />
        <h2 {...stylex.attrs(styles.cardTitle)}>
          <button
            ref={(node) => props.buttonRef(node)}
            type="button"
            onClick={() => props.onRead()}
            {...stylex.attrs(styles.cardButton)}
          >
            {props.article.title}
          </button>
        </h2>
        <Show when={props.article.lead}>
          <p {...stylex.attrs(styles.cardLead)}>{props.article.lead}</p>
        </Show>
        <span aria-hidden="true" {...stylex.attrs(styles.cardCta)}>
          阅读全文
          <ArrowRight size={16} strokeWidth={2} {...stylex.attrs(styles.cardArrow)} />
        </span>
      </div>
    </article>
  );
}

function Reader(props: {
  article: LabArticle;
  index: number;
  total: number;
  next: LabArticle | undefined;
  headingRef: (node: HTMLHeadingElement) => void;
  onBack: () => void;
  onGo: (offset: number) => void;
}) {
  const article = untrack(() => props.article);
  const titleId = `${article.id}-shelf-title`;
  return (
    <article aria-labelledby={titleId} {...stylex.attrs(styles.reader)}>
      <div {...stylex.attrs(styles.bar)}>
        <button
          type="button"
          onClick={() => props.onBack()}
          {...stylex.attrs(labStyles.textButton, kitStyles.focusRing)}
        >
          <ArrowLeft size={18} strokeWidth={2} aria-hidden="true" />
          全部洞察
        </button>
        <div {...stylex.attrs(styles.barRight)}>
          <span {...stylex.attrs(styles.position, labStyles.displayNumber)}>
            {`${padIndex(props.index)} / ${padIndex(props.total - 1)}`}
          </span>
          <button
            type="button"
            aria-label="上一篇"
            disabled={props.index === 0}
            onClick={() => props.onGo(-1)}
            {...stylex.attrs(styles.iconButton, kitStyles.focusRing)}
          >
            <ChevronLeft size={18} strokeWidth={2} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="下一篇"
            disabled={props.index === props.total - 1}
            onClick={() => props.onGo(1)}
            {...stylex.attrs(styles.iconButton, kitStyles.focusRing)}
          >
            <ChevronRight size={18} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
      </div>

      <header {...stylex.attrs(styles.head)}>
        <ArticleMeta article={article} />
        <h2
          ref={(node) => props.headingRef(node)}
          id={titleId}
          tabindex={-1}
          {...stylex.attrs(labStyles.docTitle, styles.headTitle)}
        >
          {article.title}
        </h2>
        <Show when={article.lead}>
          <p {...stylex.attrs(labStyles.docLead)}>{article.lead}</p>
        </Show>
      </header>

      <div {...stylex.attrs(labStyles.stack)}>
        <ArticlePreview article={article} />
        <div {...stylex.attrs(styles.sectionsGap)}>
          <ArticleSections article={article} />
        </div>
      </div>

      <footer {...stylex.attrs(styles.footer)}>
        <Show when={props.next}>
          {(next) => (
            <button
              type="button"
              onClick={() => props.onGo(1)}
              {...stylex.attrs(styles.next, kitStyles.focusRing, stylex.defaultMarker())}
            >
              <span {...stylex.attrs(styles.nextMedia)}>
                <img
                  src={next().image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  {...stylex.attrs(styles.image)}
                />
              </span>
              <span {...stylex.attrs(styles.nextText)}>
                <span
                  {...stylex.attrs(styles.nextLabel)}
                >{`下一篇 · 约 ${readMinutes(next())} 分钟`}</span>
                <span {...stylex.attrs(styles.nextTitle)}>{next().title}</span>
              </span>
              <span aria-hidden="true" {...stylex.attrs(styles.nextArrow)}>
                <ArrowRight size={20} strokeWidth={2} />
              </span>
            </button>
          )}
        </Show>
        <div {...stylex.attrs(styles.footerActions)}>
          <button
            type="button"
            onClick={() => props.onBack()}
            {...stylex.attrs(labStyles.pillButton, kitStyles.focusRing)}
          >
            <ArrowLeft size={18} strokeWidth={2} aria-hidden="true" />
            返回全部洞察
          </button>
        </div>
      </footer>
    </article>
  );
}
