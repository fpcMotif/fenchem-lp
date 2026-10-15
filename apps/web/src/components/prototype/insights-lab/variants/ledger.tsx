import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { m, useScroll } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { color } from "../../variant-oos1/tokens.stylex";
import {
  ArticlePreview,
  ArticleSections,
  LabPage,
  STICKY_OFFSET,
  articleAnchor,
  articleChips,
  isAboveReadingLine,
  jumpTo,
  kitStyles,
  labStyles,
  padIndex,
  readMinutes,
  sectionAnchor,
  useLabArticles,
  type LabArticle,
  type SubPageProps,
} from "../kit";
import { lab } from "../tokens.stylex";

const DESKTOP = breakpoints.xl;
const TOOLBAR_HEIGHT = 52;

const styles = stylex.create({
  list: {
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  row: {
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: lab.hairline,
  },
  heading: {
    margin: 0,
    fontSize: { default: 24, [DESKTOP]: 26 },
  },
  trigger: {
    appearance: "none",
    display: "grid",
    gridTemplateColumns: {
      default: "32px minmax(0, 1fr) auto",
      [breakpoints.md]: "56px minmax(0, 1fr) auto",
    },
    alignItems: "center",
    columnGap: { default: 12, [breakpoints.md]: 20 },
    width: "100%",
    paddingTop: { default: 24, [DESKTOP]: 32 },
    paddingBottom: 12,
    paddingInline: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    textAlign: "start",
    fontFamily: "inherit",
    fontSize: 16,
    color: color.ink,
    cursor: "pointer",
    WebkitTapHighlightColor: "transparent",
  },
  number: {
    alignSelf: "start",
    paddingTop: 3,
    fontSize: { default: 14, [breakpoints.md]: 16 },
    fontWeight: 600,
    color: color.muted,
    transitionProperty: "color",
    transitionDuration: "160ms",
  },
  numberOpen: {
    color: colors.brandBlue700,
  },
  text: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    minWidth: 0,
  },
  title: {
    display: "block",
    fontSize: { default: 24, [DESKTOP]: 26 },
    fontWeight: 700,
    lineHeight: 1.35,
    letterSpacing: "-0.01em",
    textWrap: "balance",
    color: {
      default: color.ink,
      [stylex.when.ancestor(":hover")]: { default: color.ink, [lab.hover]: colors.brandBlue700 },
    },
    transitionProperty: "color",
    transitionDuration: "160ms",
    transitionTimingFunction: lab.easeOut,
  },
  toggle: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: "0.04em",
    color: colors.brandBlue700,
  },
  toggleLabel: {
    display: { default: "none", [breakpoints.md]: "inline" },
  },
  circle: {
    display: "grid",
    placeItems: "center",
    width: 40,
    height: 40,
    borderRadius: 999,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(7, 67, 174, 0.28)",
    backgroundColor: "transparent",
    color: colors.brandBlue700,
    transitionProperty: "background-color, color",
    transitionDuration: "200ms",
    transitionTimingFunction: lab.easeOut,
  },
  circleOpen: {
    backgroundColor: colors.brandBlue700,
    color: colors.paper,
  },
  lead: {
    margin: 0,
    paddingBottom: { default: 24, [DESKTOP]: 32 },
    paddingInlineStart: { default: 44, [breakpoints.md]: 76 },
    fontSize: { default: 15, [DESKTOP]: 16 },
    lineHeight: 1.75,
    color: color.bodyText,
    textWrap: "pretty",
  },
  collapse: {
    display: "grid",
    gridTemplateRows: "0fr",
    transitionProperty: "grid-template-rows",
    transitionDuration: { default: "0ms", [breakpoints.motionOk]: "220ms" },
    transitionTimingFunction: lab.easeOut,
  },
  collapseOpen: {
    gridTemplateRows: "1fr",
    transitionDuration: { default: "0ms", [breakpoints.motionOk]: "320ms" },
  },
  clip: {
    minHeight: 0,
    overflow: "clip",
  },
  body: {
    opacity: 0,
    transitionProperty: "opacity",
    transitionDuration: "160ms",
    transitionTimingFunction: lab.easeOut,
  },
  bodyOpen: {
    opacity: 1,
    transitionDuration: "260ms",
    transitionDelay: "60ms",
  },
  toolbar: {
    position: "sticky",
    top: lab.stickyTop,
    zIndex: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    height: TOOLBAR_HEIGHT,
    paddingInlineStart: { default: 0, [breakpoints.md]: 76 },
    backgroundColor: "rgba(255, 255, 255, 0.96)",
    backdropFilter: "blur(12px)",
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: lab.hairline,
  },
  toolbarText: {
    display: "flex",
    alignItems: "baseline",
    gap: 10,
    minWidth: 0,
    fontSize: 14,
    whiteSpace: "nowrap",
  },
  toolbarTitle: {
    flexShrink: 0,
    fontWeight: 700,
    color: color.ink,
  },
  toolbarSection: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    color: color.muted,
  },
  toolbarButton: {
    flexShrink: 0,
    fontSize: 14,
  },
  progressTrack: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: -1,
    height: 2,
    overflow: "hidden",
  },
  progressBar: {
    display: "block",
    width: "100%",
    height: "100%",
    backgroundColor: colors.brandBlue700,
    transformOrigin: "left center",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 22, [DESKTOP]: 26 },
    paddingTop: { default: 24, [DESKTOP]: 32 },
    paddingBottom: { default: 32, [DESKTOP]: 44 },
    paddingInlineStart: { default: 0, [breakpoints.md]: 76 },
  },
  sectionsGap: {
    marginTop: { default: 20, [DESKTOP]: 28 },
  },
  endRow: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    marginTop: { default: 12, [DESKTOP]: 20 },
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: lab.hairline,
  },
  nextLabel: {
    color: color.muted,
    fontWeight: 500,
  },
  nextTitle: {
    maxWidth: { default: 220, [breakpoints.md]: 320 },
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
});

type Anchor = { id: string; top: number };

export function LedgerVariant({ onNavigateHome }: SubPageProps) {
  const articles = useLabArticles();
  const [openId, setOpenId] = useState<string | null>(null);
  const anchor = useRef<Anchor | null>(null);
  const closingInstantly = useRef<HTMLElement | null>(null);
  const rows = useRef(new Map<string, HTMLLIElement>());

  useLayoutEffect(() => {
    const pending = anchor.current;
    anchor.current = null;
    if (pending) {
      const row = rows.current.get(pending.id);
      if (row) {
        const delta = row.getBoundingClientRect().top - pending.top;
        if (Math.abs(delta) > 0.5) window.scrollBy({ top: delta, behavior: "instant" });
      }
    }
    if (closingInstantly.current) {
      closingInstantly.current.style.transitionDuration = "";
      closingInstantly.current = null;
    }
  }, [openId]);

  const openAt = (id: string, top: number) => {
    anchor.current = { id, top };
    const region = openId
      ? rows.current.get(openId)?.querySelector<HTMLElement>("[role=region]")
      : null;
    if (region) {
      region.style.transitionDuration = "0ms";
      closingInstantly.current = region;
    }
    setOpenId(id);
  };

  const collapse = (id: string) => {
    const row = rows.current.get(id);
    if (row && isAboveReadingLine(row)) jumpTo(row, 0);
    row?.querySelector<HTMLButtonElement>("h2 button")?.focus({ preventScroll: true });
    setOpenId(null);
  };

  const toggle = (id: string) => {
    if (openId === id) {
      collapse(id);
      return;
    }
    const row = rows.current.get(id);
    openAt(id, row ? row.getBoundingClientRect().top : STICKY_OFFSET);
  };

  return (
    <LabPage onNavigateHome={onNavigateHome} chips={articleChips(articles)}>
      <div {...stylex.props(labStyles.column)}>
        <div {...stylex.props(labStyles.listHeader)}>
          <p {...stylex.props(labStyles.listLabel)}>洞察目录</p>
          <p {...stylex.props(labStyles.listCount)}>{`共 ${articles.length} 篇`}</p>
        </div>
        <ul {...stylex.props(styles.list)}>
          {articles.map((article, index) => {
            const next = articles[index + 1];
            return (
              <LedgerRow
                key={article.id}
                article={article}
                index={index}
                open={openId === article.id}
                next={next}
                rowRef={(node) => {
                  if (node) rows.current.set(article.id, node);
                  else rows.current.delete(article.id);
                }}
                onToggle={() => toggle(article.id)}
                onCollapse={() => collapse(article.id)}
                onNext={next ? () => openAt(next.id, STICKY_OFFSET) : undefined}
              />
            );
          })}
        </ul>
      </div>
    </LabPage>
  );
}

function LedgerRow({
  article,
  index,
  open,
  next,
  rowRef,
  onToggle,
  onCollapse,
  onNext,
}: {
  article: LabArticle;
  index: number;
  open: boolean;
  next: LabArticle | undefined;
  rowRef: (node: HTMLLIElement | null) => void;
  onToggle: () => void;
  onCollapse: () => void;
  onNext: (() => void) | undefined;
}) {
  const bodyId = `${article.id}-ledger-body`;
  const titleId = `${article.id}-ledger-title`;
  const contentRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: [`start ${STICKY_OFFSET + TOOLBAR_HEIGHT}px`, "end end"],
  });
  const currentSection = useCurrentSection(article, open);

  return (
    <li ref={rowRef} id={articleAnchor(article)} {...stylex.props(styles.row, kitStyles.anchor)}>
      <h2 {...stylex.props(styles.heading)}>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={bodyId}
          onClick={onToggle}
          {...stylex.props(styles.trigger, kitStyles.focusRing, stylex.defaultMarker())}
        >
          <span
            {...stylex.props(styles.number, labStyles.displayNumber, open && styles.numberOpen)}
          >
            {padIndex(index)}
          </span>
          <span {...stylex.props(styles.text)}>
            <ArticleMetaSpan article={article} />
            <span id={titleId} {...stylex.props(styles.title)}>
              {article.title}
            </span>
          </span>
          <span {...stylex.props(styles.toggle)}>
            <span {...stylex.props(styles.toggleLabel)}>{open ? "收起" : "阅读"}</span>
            <span {...stylex.props(styles.circle, open && styles.circleOpen)}>
              <ChevronDown
                size={18}
                strokeWidth={2}
                aria-hidden="true"
                {...stylex.props(labStyles.chevron, open && labStyles.chevronUp)}
              />
            </span>
          </span>
        </button>
      </h2>
      {article.lead ? <p {...stylex.props(styles.lead)}>{article.lead}</p> : null}

      <div
        id={bodyId}
        role="region"
        aria-labelledby={titleId}
        inert={!open}
        {...stylex.props(styles.collapse, open && styles.collapseOpen)}
      >
        <div {...stylex.props(styles.clip)}>
          <div {...stylex.props(styles.body, open && styles.bodyOpen)}>
            <div {...stylex.props(styles.toolbar)}>
              <p {...stylex.props(styles.toolbarText)}>
                <span {...stylex.props(styles.toolbarTitle)}>
                  {article.navLabel ?? article.title}
                </span>
                <span {...stylex.props(styles.toolbarSection)}>{currentSection}</span>
              </p>
              <button
                type="button"
                onClick={onCollapse}
                {...stylex.props(labStyles.textButton, styles.toolbarButton, kitStyles.focusRing)}
              >
                收起
                <ChevronUp size={16} strokeWidth={2} aria-hidden="true" />
              </button>
              <span aria-hidden="true" {...stylex.props(styles.progressTrack)}>
                <m.span style={{ scaleX: scrollYProgress }} {...stylex.props(styles.progressBar)} />
              </span>
            </div>
            <div ref={contentRef} {...stylex.props(styles.content)}>
              <ArticlePreview article={article} />
              <div {...stylex.props(styles.sectionsGap)}>
                <ArticleSections article={article} />
              </div>
              <div {...stylex.props(styles.endRow)}>
                <button
                  type="button"
                  onClick={onCollapse}
                  {...stylex.props(labStyles.pillButton, kitStyles.focusRing)}
                >
                  收起本文
                  <ChevronUp size={18} strokeWidth={2} aria-hidden="true" />
                </button>
                {next && onNext ? (
                  <button
                    type="button"
                    onClick={onNext}
                    {...stylex.props(labStyles.textButton, kitStyles.focusRing)}
                  >
                    <span {...stylex.props(styles.nextLabel)}>下一篇</span>
                    <span {...stylex.props(styles.nextTitle)}>{next.navLabel ?? next.title}</span>
                    <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

function ArticleMetaSpan({ article }: { article: LabArticle }) {
  return (
    <span {...stylex.props(labStyles.meta)}>
      <span {...stylex.props(labStyles.metaCategory)}>{article.category}</span>
      <span aria-hidden="true" {...stylex.props(labStyles.metaDot)} />
      <span>{`约 ${readMinutes(article)} 分钟`}</span>
    </span>
  );
}

function useCurrentSection(article: LabArticle, active: boolean) {
  const [label, setLabel] = useState("导读");

  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = STICKY_OFFSET + TOOLBAR_HEIGHT + 32;
      let current = "导读";
      for (const section of article.sections) {
        const element = document.getElementById(sectionAnchor(article, section));
        if (element && element.getBoundingClientRect().top <= line) current = section.navLabel;
      }
      setLabel(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [active, article]);

  return label;
}
