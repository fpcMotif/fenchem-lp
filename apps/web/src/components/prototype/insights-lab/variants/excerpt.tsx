import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { ChevronDown, ChevronUp } from "@fenchem-lp/ui/components/lucide";
import {
  createEffect,
  createMemo,
  createSignal,
  For,
  onCleanup,
  Show,
  untrack,
  type Accessor,
} from "solid-js";
import { Portal } from "@solidjs/web";

import { AnimatePresence, m } from "@/compat/motion";

import { EASE } from "../../motion-constants";
import { useReducedMotion } from "../../use-reduced-motion";
import { color, font } from "../../variant-oos1/tokens.stylex";
import {
  ArticleMeta,
  ArticlePreview,
  ArticleSections,
  LabPage,
  articleAnchor,
  articleChips,
  isAboveReadingLine,
  jumpTo,
  kitStyles,
  labStyles,
  readMinutes,
  useIsClient,
  useLabArticles,
  type LabArticle,
  type SubPageProps,
} from "../kit";
import { lab } from "../tokens.stylex";

const DESKTOP = breakpoints.xl;
const CLIP_HEIGHT = 340;
const PREVIEW_MINUTES = 1;

const sxProps = (...args: ReadonlyArray<StyleXStyles | false | null | undefined>) =>
  stylex.attrs(...args);

const styles = stylex.create({
  stack: {
    display: "flex",
    flexDirection: "column",
  },
  article: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 16, [DESKTOP]: 20 },
    paddingBlock: { default: 48, [DESKTOP]: 72 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: lab.hairline,
  },
  articleFirst: {
    paddingTop: 0,
    borderTopWidth: 0,
  },
  title: {
    margin: 0,
    fontSize: { default: 26, [DESKTOP]: 32 },
    fontWeight: 800,
    lineHeight: 1.3,
    letterSpacing: "-0.01em",
    color: color.ink,
    textWrap: "balance",
  },
  clipWrap: {
    position: "relative",
    marginTop: { default: 8, [DESKTOP]: 12 },
  },
  clip: {
    overflow: "hidden",
  },
  fade: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 160,
    backgroundImage: "linear-gradient(to bottom, rgba(255, 255, 255, 0), #ffffff 88%)",
    pointerEvents: "none",
  },
  sectionsGap: {
    marginTop: { default: 20, [DESKTOP]: 28 },
  },
  actionRow: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 16,
  },
  remaining: {
    fontSize: 14,
    color: color.muted,
  },
  pillDock: {
    position: "fixed",
    left: 0,
    right: 0,
    bottom: "max(24px, env(safe-area-inset-bottom))",
    zIndex: 25,
    display: "flex",
    justifyContent: "center",
    paddingInline: 16,
    pointerEvents: "none",
  },
  pill: {
    appearance: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    maxWidth: "100%",
    height: 48,
    paddingInline: 20,
    borderRadius: 999,
    borderWidth: 0,
    backgroundColor: {
      default: colors.brandBlue700,
      ":hover": { default: null, [lab.hover]: colors.brandBlue800 },
    },
    color: colors.paper,
    boxShadow: "0 1px 2px rgba(7, 26, 74, 0.12), 0 12px 32px -8px rgba(7, 26, 74, 0.4)",
    fontFamily: font.body,
    fontSize: 15,
    fontWeight: 600,
    letterSpacing: "0.04em",
    cursor: "pointer",
    pointerEvents: "auto",
    transform: { default: null, ":active": "scale(0.97)" },
    transitionProperty: "background-color, transform",
    transitionDuration: "160ms",
    transitionTimingFunction: lab.easeOut,
    WebkitTapHighlightColor: "transparent",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 3,
  },
  pillTitle: {
    minWidth: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontWeight: 500,
    color: "rgba(255, 255, 255, 0.78)",
  },
});

export function ExcerptVariant(props: SubPageProps) {
  const articles = useLabArticles();
  const [openIds, setOpenIds] = createSignal<ReadonlySet<string>>(new Set());
  const articleRefs = { current: new Map<string, HTMLElement>() };
  const actionRefs = { current: new Map<string, HTMLElement>() };
  const readingId = useReadingArticle(openIds, articleRefs, actionRefs);
  const reading = createMemo(() => articles().find((article) => article.id === readingId()));
  const shownReading = createMemo((previous?: LabArticle) => reading() ?? previous);
  const isClient = useIsClient();

  const expand = (id: string) => setOpenIds((ids) => new Set(ids).add(id));

  const collapse = (id: string) => {
    const element = articleRefs.current.get(id);
    if (element && isAboveReadingLine(element)) jumpTo(element);
    actionRefs.current.get(id)?.querySelector("button")?.focus({ preventScroll: true });
    setOpenIds((ids) => {
      const next = new Set(ids);
      next.delete(id);
      return next;
    });
  };

  return (
    <LabPage onNavigateHome={props.onNavigateHome} chips={articleChips(articles())}>
      <div {...stylex.attrs(labStyles.column, styles.stack)}>
        <For each={articles()}>
          {(article, index) => {
            onCleanup(() => {
              articleRefs.current.delete(article.id);
              actionRefs.current.delete(article.id);
            });
            return (
              <ExcerptArticle
                article={article}
                first={index() === 0}
                open={openIds().has(article.id)}
                articleRef={(node) => {
                  articleRefs.current.set(article.id, node);
                }}
                actionRef={(node) => {
                  actionRefs.current.set(article.id, node);
                }}
                onExpand={() => expand(article.id)}
                onCollapse={() => collapse(article.id)}
              />
            );
          }}
        </For>
      </div>
      <Show when={isClient()}>
        <Portal mount={document.body}>
          <div {...stylex.attrs(styles.pillDock)}>
            <AnimatePresence>
              <Show when={reading() !== undefined}>
                <m.button
                  type="button"
                  lang="zh-CN"
                  initial={{ opacity: 0, y: 12, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98, transition: { duration: 0.15 } }}
                  transition={{ duration: 0.22, ease: EASE }}
                  onClick={() => {
                    const current = reading();
                    if (current) collapse(current.id);
                  }}
                  {...stylex.attrs(styles.pill)}
                >
                  <ChevronUp size={18} strokeWidth={2} aria-hidden="true" />
                  收起
                  <span {...stylex.attrs(styles.pillTitle)}>
                    {shownReading()?.navLabel ?? shownReading()?.title}
                  </span>
                </m.button>
              </Show>
            </AnimatePresence>
          </div>
        </Portal>
      </Show>
    </LabPage>
  );
}

function ExcerptArticle(props: {
  article: LabArticle;
  first: boolean;
  open: boolean;
  articleRef: (node: HTMLElement) => void;
  actionRef: (node: HTMLElement) => void;
  onExpand: () => void;
  onCollapse: () => void;
}) {
  const reduce = useReducedMotion();
  const article = untrack(() => props.article);
  const titleId = `${article.id}-excerpt-title`;
  const bodyId = `${article.id}-excerpt-body`;
  const remaining = Math.max(1, readMinutes(article) - PREVIEW_MINUTES);

  return (
    <article
      ref={(node) => props.articleRef(node)}
      id={articleAnchor(article)}
      aria-labelledby={titleId}
      {...sxProps(styles.article, props.first && styles.articleFirst, kitStyles.anchor)}
    >
      <ArticleMeta article={article} />
      <h2 id={titleId} {...stylex.attrs(styles.title)}>
        {article.title}
      </h2>
      <Show when={article.lead}>
        <p {...stylex.attrs(labStyles.docLead)}>{article.lead}</p>
      </Show>

      <div {...stylex.attrs(styles.clipWrap)}>
        <m.div
          id={bodyId}
          initial={false}
          animate={{ height: props.open ? "auto" : CLIP_HEIGHT }}
          transition={{ duration: reduce() ? 0 : props.open ? 0.34 : 0.24, ease: EASE }}
          {...stylex.attrs(styles.clip)}
        >
          <div {...stylex.attrs(labStyles.stack)}>
            <ArticlePreview article={article} />
            <div {...stylex.attrs(styles.sectionsGap)}>
              <ArticleSections article={article} />
            </div>
          </div>
        </m.div>
        <m.div
          aria-hidden="true"
          initial={false}
          animate={{ opacity: props.open ? 0 : 1 }}
          transition={{ duration: props.open ? 0.16 : 0.24, ease: EASE }}
          {...stylex.attrs(styles.fade)}
        />
      </div>

      <div ref={(node) => props.actionRef(node)} {...stylex.attrs(styles.actionRow)}>
        <button
          type="button"
          aria-expanded={props.open ? "true" : "false"}
          aria-controls={bodyId}
          onClick={() => (props.open ? props.onCollapse() : props.onExpand())}
          {...sxProps(
            labStyles.pillButton,
            !props.open && labStyles.pillSolid,
            kitStyles.focusRing,
          )}
        >
          {props.open ? "收起全文" : "继续阅读"}
          <ChevronDown
            size={18}
            strokeWidth={2}
            aria-hidden="true"
            {...sxProps(labStyles.chevron, props.open && labStyles.chevronUp)}
          />
        </button>
        <Show when={!props.open}>
          <span {...stylex.attrs(styles.remaining)}>{`还有约 ${remaining} 分钟`}</span>
        </Show>
      </div>
    </article>
  );
}

function useReadingArticle(
  openIdList: Accessor<ReadonlySet<string>>,
  articleRefs: { current: Map<string, HTMLElement> },
  actionRefs: { current: Map<string, HTMLElement> },
) {
  const [readingId, setReadingId] = createSignal<string | null>(null);

  createEffect(openIdList, (openIds) => {
    if (openIds.size === 0) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const viewport = window.innerHeight;
      let found: string | null = null;
      for (const id of openIds) {
        const article = articleRefs.current.get(id);
        const action = actionRefs.current.get(id);
        if (!article || !action) continue;
        const startedReading = article.getBoundingClientRect().top < viewport * 0.25;
        const actionHidden = action.getBoundingClientRect().top > viewport - 24;
        if (startedReading && actionHidden) {
          found = id;
          break;
        }
      }
      setReadingId(found);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  });

  return () => {
    const id = readingId();
    return id !== null && openIdList().has(id) ? id : null;
  };
}
