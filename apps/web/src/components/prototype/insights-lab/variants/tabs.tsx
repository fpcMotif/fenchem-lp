import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import { useRef, useState, type KeyboardEvent } from "react";

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

export function TabsVariant({ onNavigateHome }: SubPageProps) {
  const articles = useLabArticles();
  const [activeId, setActiveId] = useState(articles[0]?.id ?? "");
  const [expanded, setExpanded] = useState<ReadonlySet<string>>(() => new Set());
  const tablistRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef(new Map<string, HTMLButtonElement>());
  const activeIndex = Math.max(
    0,
    articles.findIndex((article) => article.id === activeId),
  );
  const active = articles[activeIndex];

  const select = (id: string, { focus = false } = {}) => {
    const tablist = tablistRef.current;
    if (tablist && isAboveReadingLine(tablist)) jumpTo(tablist);
    setActiveId(id);
    if (focus) tabRefs.current.get(id)?.focus();
  };

  const setOpen = (id: string, open: boolean) => {
    if (!open) {
      const tablist = tablistRef.current;
      if (tablist && isAboveReadingLine(tablist)) jumpTo(tablist);
    }
    setExpanded((ids) => {
      const next = new Set(ids);
      if (open) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const last = articles.length - 1;
    const target =
      event.key === "ArrowRight"
        ? activeIndex === last
          ? 0
          : activeIndex + 1
        : event.key === "ArrowLeft"
          ? activeIndex === 0
            ? last
            : activeIndex - 1
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : null;
    if (target === null) return;
    event.preventDefault();
    const article = articles[target];
    if (article) select(article.id, { focus: true });
  };

  if (!active) return null;

  return (
    <LabPage
      onNavigateHome={onNavigateHome}
      chips={articleIdChips(articles)}
      activeChip={active.id}
      onSelectChip={(id) => select(id)}
    >
      <div {...stylex.props(labStyles.column)}>
        <div
          ref={tablistRef}
          role="tablist"
          aria-label="行业洞察文章"
          onKeyDown={onKeyDown}
          {...stylex.props(styles.tablist, kitStyles.anchor)}
        >
          {articles.map((article, index) => {
            const selected = article.id === active.id;
            return (
              <button
                key={article.id}
                ref={(node) => {
                  if (node) tabRefs.current.set(article.id, node);
                  else tabRefs.current.delete(article.id);
                }}
                type="button"
                role="tab"
                id={`${article.id}-tab`}
                aria-selected={selected}
                aria-controls={`${article.id}-tabpanel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => select(article.id)}
                {...stylex.props(styles.tab, selected && styles.tabActive, kitStyles.focusRing)}
              >
                <span
                  {...stylex.props(
                    styles.tabIndex,
                    labStyles.displayNumber,
                    selected && styles.tabIndexActive,
                  )}
                >
                  {padIndex(index)}
                </span>
                <span {...stylex.props(styles.tabLabel)}>{article.navLabel ?? article.title}</span>
                <span {...stylex.props(styles.tabMeta)}>
                  {`${article.category} · ${readMinutes(article)} 分钟`}
                </span>
                {selected ? (
                  <m.span
                    layoutId="insights-tabs-indicator"
                    transition={{ duration: 0.25, ease: EASE }}
                    {...stylex.props(styles.indicator)}
                  />
                ) : null}
              </button>
            );
          })}
        </div>

        <TabPanel
          key={active.id}
          article={active}
          open={expanded.has(active.id)}
          next={articles[activeIndex + 1]}
          onToggle={(open) => setOpen(active.id, open)}
          onNext={(id) => select(id, { focus: true })}
        />
      </div>
    </LabPage>
  );
}

function TabPanel({
  article,
  open,
  next,
  onToggle,
  onNext,
}: {
  article: LabArticle;
  open: boolean;
  next: LabArticle | undefined;
  onToggle: (open: boolean) => void;
  onNext: (id: string) => void;
}) {
  const reduce = useReducedMotion();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const titleId = `${article.id}-tabs-title`;
  const bodyId = `${article.id}-tabs-body`;

  return (
    <m.div
      role="tabpanel"
      id={`${article.id}-tabpanel`}
      aria-labelledby={`${article.id}-tab`}
      tabIndex={0}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.18, ease: EASE }}
      {...stylex.props(styles.panel)}
    >
      <article aria-labelledby={titleId} {...stylex.props(labStyles.stack)}>
        <header {...stylex.props(styles.head)}>
          <ArticleMeta article={article} />
          <h2 id={titleId} {...stylex.props(labStyles.docTitle)}>
            {article.title}
          </h2>
          {article.lead ? <p {...stylex.props(labStyles.docLead)}>{article.lead}</p> : null}
        </header>

        <ArticlePreview article={article} />

        <div {...stylex.props(styles.toggleRow)}>
          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls={bodyId}
            onClick={() => onToggle(!open)}
            {...stylex.props(
              labStyles.pillButton,
              !open && labStyles.pillSolid,
              kitStyles.focusRing,
            )}
          >
            {open ? "收起全文" : "展开全文"}
            <ChevronDown
              size={18}
              strokeWidth={2}
              aria-hidden="true"
              {...stylex.props(labStyles.chevron, open && labStyles.chevronUp)}
            />
          </button>
          {open ? null : (
            <span {...stylex.props(styles.toggleHint)}>
              {`${article.sections.length} 个章节 · 约 ${readMinutes(article)} 分钟`}
            </span>
          )}
        </div>

        <AnimatePresence initial={false}>
          {open ? (
            <m.div
              key={bodyId}
              id={bodyId}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{
                opacity: 0,
                height: 0,
                transition: { duration: reduce ? 0 : 0.22, ease: EASE },
              }}
              transition={{ duration: reduce ? 0 : 0.32, ease: EASE }}
              {...stylex.props(styles.expanded)}
            >
              <div {...stylex.props(styles.expandedInner)}>
                <ArticleSections article={article} />
                <div {...stylex.props(styles.endRow)}>
                  <button
                    type="button"
                    onClick={() => {
                      onToggle(false);
                      toggleRef.current?.focus({ preventScroll: true });
                    }}
                    {...stylex.props(labStyles.pillButton, kitStyles.focusRing)}
                  >
                    收起全文
                    <ChevronUp size={18} strokeWidth={2} aria-hidden="true" />
                  </button>
                  {next ? (
                    <button
                      type="button"
                      onClick={() => onNext(next.id)}
                      {...stylex.props(labStyles.textButton, kitStyles.focusRing)}
                    >
                      <span {...stylex.props(styles.nextLabel)}>下一篇</span>
                      {next.navLabel ?? next.title}
                      <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
                    </button>
                  ) : null}
                </div>
              </div>
            </m.div>
          ) : null}
        </AnimatePresence>
      </article>
    </m.div>
  );
}
