import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { ArrowRight, ChevronDown, ChevronUp } from "@fenchem-lp/ui/components/lucide";
import { createMemo, createSignal, flush, For, onCleanup, Show, untrack } from "solid-js";
import type { JSX } from "@solidjs/web";

import { AnimatePresence, m } from "@/compat/motion";

import { EASE } from "../../motion-constants";
import { useReducedMotion } from "../../use-reduced-motion";
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
  useLabArticles,
  type LabArticle,
  type SubPageProps,
} from "../kit";
import { lab } from "../tokens.stylex";

const DESKTOP = breakpoints.xl;

const sxProps = (...args: ReadonlyArray<StyleXStyles | false | null | undefined>) =>
  stylex.attrs(...args);

const styles = stylex.create({
  tablist: {
    display: "grid",
    gridAutoFlow: "column",
    gridAutoColumns: { default: "minmax(168px, 1fr)", [breakpoints.md]: "minmax(0, 1fr)" },
    overflowX: "auto",
    scrollbarWidth: "none",
    scrollSnapType: "x mandatory",
    marginInline: { default: -16, [breakpoints.md]: 0 },
    paddingInline: { default: 16, [breakpoints.md]: 0 },
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: lab.hairline,
  },
  tab: {
    appearance: "none",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 6,
    minWidth: 0,
    paddingTop: 16,
    paddingBottom: 18,
    paddingInline: { default: 0, [breakpoints.md]: 4 },
    paddingInlineEnd: 20,
    borderWidth: 0,
    backgroundColor: "transparent",
    textAlign: "start",
    fontFamily: "inherit",
    fontSize: 16,
    color: {
      default: color.muted,
      ":hover": { default: null, [lab.hover]: color.ink },
    },
    cursor: "pointer",
    scrollSnapAlign: "start",
    transitionProperty: "color",
    transitionDuration: "160ms",
    transitionTimingFunction: lab.easeOut,
    WebkitTapHighlightColor: "transparent",
  },
  tabActive: {
    color: { default: color.ink, ":hover": color.ink },
  },
  tabIndex: {
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: "0.08em",
  },
  tabIndexActive: {
    color: colors.brandBlue700,
  },
  tabLabel: {
    maxWidth: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontSize: { default: 16, [DESKTOP]: 17 },
    fontWeight: 700,
  },
  tabMeta: {
    fontSize: 13,
  },
  indicator: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: -1,
    height: 2,
    backgroundColor: colors.brandBlue700,
  },
  panel: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 22, [DESKTOP]: 26 },
    paddingTop: { default: 36, [DESKTOP]: 52 },
    outlineStyle: "none",
  },
  head: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 14, [DESKTOP]: 18 },
  },
  toggleRow: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 16,
    paddingTop: 10,
  },
  toggleHint: {
    fontSize: 14,
    color: color.muted,
  },
  expanded: {
    overflow: "hidden",
  },
  expandedInner: {
    paddingTop: { default: 32, [DESKTOP]: 44 },
    marginTop: 8,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: lab.hairline,
  },
  endRow: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    marginTop: { default: 40, [DESKTOP]: 56 },
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: lab.hairline,
  },
  nextLabel: {
    color: color.muted,
    fontWeight: 500,
  },
});

export function TabsVariant(props: SubPageProps) {
  const articles = useLabArticles();
  const [activeId, setActiveId] = createSignal(untrack(() => articles()[0]?.id ?? ""));
  const [expanded, setExpanded] = createSignal<ReadonlySet<string>>(new Set());
  let tablist: HTMLDivElement | undefined;
  const tabs = new Map<string, HTMLButtonElement>();
  const activeIndex = createMemo(() =>
    Math.max(
      0,
      articles().findIndex((article) => article.id === activeId()),
    ),
  );
  const active = () => articles()[activeIndex()];

  const select = (id: string, { focus = false } = {}) => {
    if (tablist && isAboveReadingLine(tablist)) jumpTo(tablist);
    setActiveId(id);
    if (focus) {
      flush();
      tabs.get(id)?.focus();
    }
  };

  const setOpen = (id: string, open: boolean) => {
    if (!open) {
      if (tablist && isAboveReadingLine(tablist)) jumpTo(tablist);
    }
    setExpanded((ids) => {
      const next = new Set(ids);
      if (open) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  const onKeyDown: JSX.EventHandler<HTMLDivElement, KeyboardEvent> = (event) => {
    const last = articles().length - 1;
    const activeIndexNow = activeIndex();
    const target =
      event.key === "ArrowRight"
        ? activeIndexNow === last
          ? 0
          : activeIndexNow + 1
        : event.key === "ArrowLeft"
          ? activeIndexNow === 0
            ? last
            : activeIndexNow - 1
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : null;
    if (target === null) return;
    event.preventDefault();
    const article = articles()[target];
    if (article) select(article.id, { focus: true });
  };

  return (
    <Show when={active()}>
      {(current) => (
        <LabPage
          onNavigateHome={props.onNavigateHome}
          chips={articleIdChips(articles())}
          activeChip={current().id}
          onSelectChip={(id) => select(id)}
        >
          <div {...stylex.attrs(labStyles.column)}>
            <div
              ref={tablist}
              role="tablist"
              aria-label="行业洞察文章"
              onKeyDown={onKeyDown}
              {...stylex.attrs(styles.tablist, kitStyles.anchor)}
            >
              <For each={articles()}>
                {(article, index) => {
                  const selected = () => article.id === current().id;
                  onCleanup(() => tabs.delete(article.id));
                  return (
                    <button
                      ref={(node) => {
                        tabs.set(article.id, node);
                      }}
                      type="button"
                      role="tab"
                      id={`${article.id}-tab`}
                      aria-selected={selected() ? "true" : "false"}
                      aria-controls={`${article.id}-tabpanel`}
                      tabindex={selected() ? 0 : -1}
                      onClick={() => select(article.id)}
                      {...sxProps(styles.tab, selected() && styles.tabActive, kitStyles.focusRing)}
                    >
                      <span
                        {...sxProps(
                          styles.tabIndex,
                          labStyles.displayNumber,
                          selected() && styles.tabIndexActive,
                        )}
                      >
                        {padIndex(index())}
                      </span>
                      <span {...stylex.attrs(styles.tabLabel)}>
                        {article.navLabel ?? article.title}
                      </span>
                      <span {...stylex.attrs(styles.tabMeta)}>
                        {`${article.category} · ${readMinutes(article)} 分钟`}
                      </span>
                      <Show when={selected()}>
                        <m.span
                          layoutId="insights-tabs-indicator"
                          transition={{ duration: 0.25, ease: EASE }}
                          {...stylex.attrs(styles.indicator)}
                        />
                      </Show>
                    </button>
                  );
                }}
              </For>
            </div>

            <Show when={current()} keyed>
              {(article) => (
                <TabPanel
                  article={article}
                  open={expanded().has(article.id)}
                  next={articles()[activeIndex() + 1]}
                  onToggle={(open) => setOpen(article.id, open)}
                  onNext={(id) => select(id, { focus: true })}
                />
              )}
            </Show>
          </div>
        </LabPage>
      )}
    </Show>
  );
}

function TabPanel(props: {
  article: LabArticle;
  open: boolean;
  next: LabArticle | undefined;
  onToggle: (open: boolean) => void;
  onNext: (id: string) => void;
}) {
  const reduce = useReducedMotion();
  let toggle: HTMLButtonElement | undefined;
  const article = untrack(() => props.article);
  const titleId = `${article.id}-tabs-title`;
  const bodyId = `${article.id}-tabs-body`;

  return (
    <m.div
      role="tabpanel"
      id={`${article.id}-tabpanel`}
      aria-labelledby={`${article.id}-tab`}
      tabindex={0}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.18, ease: EASE }}
      {...stylex.attrs(styles.panel)}
    >
      <article aria-labelledby={titleId} {...stylex.attrs(labStyles.stack)}>
        <header {...stylex.attrs(styles.head)}>
          <ArticleMeta article={article} />
          <h2 id={titleId} {...stylex.attrs(labStyles.docTitle)}>
            {article.title}
          </h2>
          <Show when={article.lead}>
            <p {...stylex.attrs(labStyles.docLead)}>{article.lead}</p>
          </Show>
        </header>

        <ArticlePreview article={article} />

        <div {...stylex.attrs(styles.toggleRow)}>
          <button
            ref={toggle}
            type="button"
            aria-expanded={props.open ? "true" : "false"}
            aria-controls={bodyId}
            onClick={() => props.onToggle(!props.open)}
            {...sxProps(
              labStyles.pillButton,
              !props.open && labStyles.pillSolid,
              kitStyles.focusRing,
            )}
          >
            {props.open ? "收起全文" : "展开全文"}
            <ChevronDown
              size={18}
              strokeWidth={2}
              aria-hidden="true"
              {...sxProps(labStyles.chevron, props.open && labStyles.chevronUp)}
            />
          </button>
          <Show when={!props.open}>
            <span {...stylex.attrs(styles.toggleHint)}>
              {`${article.sections.length} 个章节 · 约 ${readMinutes(article)} 分钟`}
            </span>
          </Show>
        </div>

        <AnimatePresence initial={false}>
          <Show when={props.open}>
            <m.div
              id={bodyId}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{
                opacity: 0,
                height: 0,
                transition: { duration: reduce() ? 0 : 0.22, ease: EASE },
              }}
              transition={{ duration: reduce() ? 0 : 0.32, ease: EASE }}
              {...stylex.attrs(styles.expanded)}
            >
              <div {...stylex.attrs(styles.expandedInner)}>
                <ArticleSections article={article} />
                <div {...stylex.attrs(styles.endRow)}>
                  <button
                    type="button"
                    onClick={() => {
                      props.onToggle(false);
                      toggle?.focus({ preventScroll: true });
                    }}
                    {...stylex.attrs(labStyles.pillButton, kitStyles.focusRing)}
                  >
                    收起全文
                    <ChevronUp size={18} strokeWidth={2} aria-hidden="true" />
                  </button>
                  <Show when={props.next}>
                    {(next) => (
                      <button
                        type="button"
                        onClick={() => props.onNext(next().id)}
                        {...stylex.attrs(labStyles.textButton, kitStyles.focusRing)}
                      >
                        <span {...stylex.attrs(styles.nextLabel)}>下一篇</span>
                        {next().navLabel ?? next().title}
                        <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
                      </button>
                    )}
                  </Show>
                </div>
              </div>
            </m.div>
          </Show>
        </AnimatePresence>
      </article>
    </m.div>
  );
}
