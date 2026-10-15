import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { m } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";

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

export function ShelfVariant({ onNavigateHome }: SubPageProps) {
  const articles = useLabArticles();
  const [readingId, setReadingId] = useState<string | null>(null);
  const cameFrom = useRef<string | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardRefs = useRef(new Map<string, HTMLButtonElement>());
  const readingIndex = articles.findIndex((article) => article.id === readingId);
  const reading = readingIndex >= 0 ? articles[readingIndex] : undefined;

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    if (readingId) {
      if (isAboveReadingLine(stage)) jumpTo(stage);
      headingRef.current?.focus({ preventScroll: true });
      return;
    }
    const origin = cameFrom.current ? cardRefs.current.get(cameFrom.current) : undefined;
    if (!origin) return;
    const card = origin.closest("li") ?? origin;
    const box = card.getBoundingClientRect();
    if (box.top < 0 || box.bottom > window.innerHeight) jumpTo(card);
    origin.focus({ preventScroll: true });
  }, [readingId]);

  const read = (id: string) => {
    cameFrom.current = id;
    setReadingId(id);
  };

  return (
    <LabPage
      onNavigateHome={onNavigateHome}
      chips={reading ? sectionChips(reading) : articleIdChips(articles)}
      onSelectChip={reading ? undefined : read}
    >
      <div ref={stageRef} {...stylex.props(kitStyles.anchor)}>
        <m.div
          key={reading?.id ?? "shelf"}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24, ease: EASE }}
        >
          {reading ? (
            <Reader
              article={reading}
              index={readingIndex}
              total={articles.length}
              next={articles[readingIndex + 1]}
              headingRef={headingRef}
              onBack={() => setReadingId(null)}
              onGo={(offset) => {
                const target = articles[readingIndex + offset];
                if (target) read(target.id);
              }}
            />
          ) : (
            <div {...stylex.props(styles.shelf)}>
              <div {...stylex.props(labStyles.listHeader)}>
                <p {...stylex.props(labStyles.listLabel)}>全部洞察</p>
                <p {...stylex.props(labStyles.listCount)}>{`共 ${articles.length} 篇`}</p>
              </div>
              <ul {...stylex.props(styles.grid, articles.length === 3 && styles.gridThree)}>
                {articles.map((article, index) => (
                  <li key={article.id}>
                    <ShelfCard
                      article={article}
                      index={index}
                      buttonRef={(node) => {
                        if (node) cardRefs.current.set(article.id, node);
                        else cardRefs.current.delete(article.id);
                      }}
                      onRead={() => read(article.id)}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </m.div>
      </div>
    </LabPage>
  );
}

function ShelfCard({
  article,
  index,
  buttonRef,
  onRead,
}: {
  article: LabArticle;
  index: number;
  buttonRef: (node: HTMLButtonElement | null) => void;
  onRead: () => void;
}) {
  return (
    <article {...stylex.props(styles.card, stylex.defaultMarker())}>
      <div {...stylex.props(styles.media)}>
        <img
          src={article.image}
          alt=""
          loading="lazy"
          decoding="async"
          {...stylex.props(styles.image)}
        />
        <span {...stylex.props(styles.index, labStyles.displayNumber)}>{padIndex(index)}</span>
      </div>
      <div {...stylex.props(styles.cardBody)}>
        <ArticleMeta article={article} />
        <h2 {...stylex.props(styles.cardTitle)}>
          <button
            ref={buttonRef}
            type="button"
            onClick={onRead}
            {...stylex.props(styles.cardButton)}
          >
            {article.title}
          </button>
        </h2>
        {article.lead ? <p {...stylex.props(styles.cardLead)}>{article.lead}</p> : null}
        <span aria-hidden="true" {...stylex.props(styles.cardCta)}>
          阅读全文
          <ArrowRight size={16} strokeWidth={2} {...stylex.props(styles.cardArrow)} />
        </span>
      </div>
    </article>
  );
}

function Reader({
  article,
  index,
  total,
  next,
  headingRef,
  onBack,
  onGo,
}: {
  article: LabArticle;
  index: number;
  total: number;
  next: LabArticle | undefined;
  headingRef: { current: HTMLHeadingElement | null };
  onBack: () => void;
  onGo: (offset: number) => void;
}) {
  const titleId = `${article.id}-shelf-title`;
  return (
    <article aria-labelledby={titleId} {...stylex.props(styles.reader)}>
      <div {...stylex.props(styles.bar)}>
        <button
          type="button"
          onClick={onBack}
          {...stylex.props(labStyles.textButton, kitStyles.focusRing)}
        >
          <ArrowLeft size={18} strokeWidth={2} aria-hidden="true" />
          全部洞察
        </button>
        <div {...stylex.props(styles.barRight)}>
          <span {...stylex.props(styles.position, labStyles.displayNumber)}>
            {`${padIndex(index)} / ${padIndex(total - 1)}`}
          </span>
          <button
            type="button"
            aria-label="上一篇"
            disabled={index === 0}
            onClick={() => onGo(-1)}
            {...stylex.props(styles.iconButton, kitStyles.focusRing)}
          >
            <ChevronLeft size={18} strokeWidth={2} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="下一篇"
            disabled={index === total - 1}
            onClick={() => onGo(1)}
            {...stylex.props(styles.iconButton, kitStyles.focusRing)}
          >
            <ChevronRight size={18} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
      </div>

      <header {...stylex.props(styles.head)}>
        <ArticleMeta article={article} />
        <h2
          ref={headingRef}
          id={titleId}
          tabIndex={-1}
          {...stylex.props(labStyles.docTitle, styles.headTitle)}
        >
          {article.title}
        </h2>
        {article.lead ? <p {...stylex.props(labStyles.docLead)}>{article.lead}</p> : null}
      </header>

      <div {...stylex.props(labStyles.stack)}>
        <ArticlePreview article={article} />
        <div {...stylex.props(styles.sectionsGap)}>
          <ArticleSections article={article} />
        </div>
      </div>

      <footer {...stylex.props(styles.footer)}>
        {next ? (
          <button
            type="button"
            onClick={() => onGo(1)}
            {...stylex.props(styles.next, kitStyles.focusRing, stylex.defaultMarker())}
          >
            <span {...stylex.props(styles.nextMedia)}>
              <img
                src={next.image}
                alt=""
                loading="lazy"
                decoding="async"
                {...stylex.props(styles.image)}
              />
            </span>
            <span {...stylex.props(styles.nextText)}>
              <span
                {...stylex.props(styles.nextLabel)}
              >{`下一篇 · 约 ${readMinutes(next)} 分钟`}</span>
              <span {...stylex.props(styles.nextTitle)}>{next.title}</span>
            </span>
            <span aria-hidden="true" {...stylex.props(styles.nextArrow)}>
              <ArrowRight size={20} strokeWidth={2} />
            </span>
          </button>
        ) : null}
        <div {...stylex.props(styles.footerActions)}>
          <button
            type="button"
            onClick={onBack}
            {...stylex.props(labStyles.pillButton, kitStyles.focusRing)}
          >
            <ArrowLeft size={18} strokeWidth={2} aria-hidden="true" />
            返回全部洞察
          </button>
        </div>
      </footer>
    </article>
  );
}
