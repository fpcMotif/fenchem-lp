import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { ArrowRight, ChevronDown, ChevronUp } from "@fenchem-lp/ui/components/lucide";
import { createEffect, createSignal, For, onCleanup, Show, untrack, type Accessor } from "solid-js";

import { m, useScroll } from "@/compat/motion";

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

const sxProps = (...args: ReadonlyArray<StyleXStyles | false | null | undefined>) =>
  stylex.attrs(...args);

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

export function LedgerVariant(props: SubPageProps) {
  const articles = useLabArticles();
  const [openId, setOpenId] = createSignal<string | null>(null);
  let anchor: Anchor | null = null;
  let closingInstantly: HTMLElement | null = null;
  const rows = new Map<string, HTMLLIElement>();

  createEffect(openId, () => {
    const pending = anchor;
    anchor = null;
    if (pending) {
      const row = rows.get(pending.id);
      if (row) {
        const delta = row.getBoundingClientRect().top - pending.top;
        if (Math.abs(delta) > 0.5) window.scrollBy({ top: delta, behavior: "instant" });
      }
    }
    if (closingInstantly) {
      closingInstantly.style.transitionDuration = "";
      closingInstantly = null;
    }
  });

  const openAt = (id: string, top: number) => {
    anchor = { id, top };
    const current = openId();
    const region = current ? rows.get(current)?.querySelector<HTMLElement>("[role=region]") : null;
    if (region) {
      region.style.transitionDuration = "0ms";
      closingInstantly = region;
    }
    setOpenId(id);
  };

  const collapse = (id: string) => {
    const row = rows.get(id);
    if (row && isAboveReadingLine(row)) jumpTo(row, 0);
    row?.querySelector<HTMLButtonElement>("h2 button")?.focus({ preventScroll: true });
    setOpenId(null);
  };

  const toggle = (id: string) => {
    if (openId() === id) {
      collapse(id);
      return;
    }
    const row = rows.get(id);
    openAt(id, row ? row.getBoundingClientRect().top : STICKY_OFFSET);
  };

  return (
    <LabPage onNavigateHome={props.onNavigateHome} chips={articleChips(articles())}>
      <div {...stylex.attrs(labStyles.column)}>
        <div {...stylex.attrs(labStyles.listHeader)}>
          <p {...stylex.attrs(labStyles.listLabel)}>洞察目录</p>
          <p {...stylex.attrs(labStyles.listCount)}>{`共 ${articles().length} 篇`}</p>
        </div>
        <ul {...stylex.attrs(styles.list)}>
          <For each={articles()}>
            {(article, index) => {
              const next = () => articles()[index() + 1];
              onCleanup(() => rows.delete(article.id));
              return (
                <LedgerRow
                  article={article}
                  index={index()}
                  open={openId() === article.id}
                  next={next()}
                  rowRef={(node) => {
                    rows.set(article.id, node);
                  }}
                  onToggle={() => toggle(article.id)}
                  onCollapse={() => collapse(article.id)}
                  onNext={() => {
                    const target = next();
                    if (target) openAt(target.id, STICKY_OFFSET);
                  }}
                />
              );
            }}
          </For>
        </ul>
      </div>
    </LabPage>
  );
}

function LedgerRow(props: {
  article: LabArticle;
  index: number;
  open: boolean;
  next: LabArticle | undefined;
  rowRef: (node: HTMLLIElement) => void;
  onToggle: () => void;
  onCollapse: () => void;
  onNext: () => void;
}) {
  const article = untrack(() => props.article);
  const bodyId = `${article.id}-ledger-body`;
  const titleId = `${article.id}-ledger-title`;
  const [content, setContent] = createSignal<HTMLDivElement>();
  const { scrollYProgress } = useScroll({
    target: content,
    offset: [`start ${STICKY_OFFSET + TOOLBAR_HEIGHT}px`, "end end"],
  });
  const currentSection = useCurrentSection(article, () => props.open);

  return (
    <li
      ref={(node) => props.rowRef(node)}
      id={articleAnchor(article)}
      {...stylex.attrs(styles.row, kitStyles.anchor)}
    >
      <h2 {...stylex.attrs(styles.heading)}>
        <button
          type="button"
          aria-expanded={props.open ? "true" : "false"}
          aria-controls={bodyId}
          onClick={() => props.onToggle()}
          {...stylex.attrs(styles.trigger, kitStyles.focusRing, stylex.defaultMarker())}
        >
          <span
            {...sxProps(styles.number, labStyles.displayNumber, props.open && styles.numberOpen)}
          >
            {padIndex(props.index)}
          </span>
          <span {...stylex.attrs(styles.text)}>
            <ArticleMetaSpan article={article} />
            <span id={titleId} {...stylex.attrs(styles.title)}>
              {article.title}
            </span>
          </span>
          <span {...stylex.attrs(styles.toggle)}>
            <span {...stylex.attrs(styles.toggleLabel)}>{props.open ? "收起" : "阅读"}</span>
            <span {...sxProps(styles.circle, props.open && styles.circleOpen)}>
              <ChevronDown
                size={18}
                strokeWidth={2}
                aria-hidden="true"
                {...sxProps(labStyles.chevron, props.open && labStyles.chevronUp)}
              />
            </span>
          </span>
        </button>
      </h2>
      <Show when={article.lead}>
        <p {...stylex.attrs(styles.lead)}>{article.lead}</p>
      </Show>

      <div
        id={bodyId}
        role="region"
        aria-labelledby={titleId}
        inert={!props.open}
        {...sxProps(styles.collapse, props.open && styles.collapseOpen)}
      >
        <div {...stylex.attrs(styles.clip)}>
          <div {...sxProps(styles.body, props.open && styles.bodyOpen)}>
            <div {...stylex.attrs(styles.toolbar)}>
              <p {...stylex.attrs(styles.toolbarText)}>
                <span {...stylex.attrs(styles.toolbarTitle)}>
                  {article.navLabel ?? article.title}
                </span>
                <span {...stylex.attrs(styles.toolbarSection)}>{currentSection()}</span>
              </p>
              <button
                type="button"
                onClick={() => props.onCollapse()}
                {...stylex.attrs(labStyles.textButton, styles.toolbarButton, kitStyles.focusRing)}
              >
                收起
                <ChevronUp size={16} strokeWidth={2} aria-hidden="true" />
              </button>
              <span aria-hidden="true" {...stylex.attrs(styles.progressTrack)}>
                <m.span style={{ scaleX: scrollYProgress }} {...stylex.attrs(styles.progressBar)} />
              </span>
            </div>
            <div ref={setContent} {...stylex.attrs(styles.content)}>
              <ArticlePreview article={article} />
              <div {...stylex.attrs(styles.sectionsGap)}>
                <ArticleSections article={article} />
              </div>
              <div {...stylex.attrs(styles.endRow)}>
                <button
                  type="button"
                  onClick={() => props.onCollapse()}
                  {...stylex.attrs(labStyles.pillButton, kitStyles.focusRing)}
                >
                  收起本文
                  <ChevronUp size={18} strokeWidth={2} aria-hidden="true" />
                </button>
                <Show when={props.next}>
                  {(next) => (
                    <button
                      type="button"
                      onClick={() => props.onNext()}
                      {...stylex.attrs(labStyles.textButton, kitStyles.focusRing)}
                    >
                      <span {...stylex.attrs(styles.nextLabel)}>下一篇</span>
                      <span {...stylex.attrs(styles.nextTitle)}>
                        {next().navLabel ?? next().title}
                      </span>
                      <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
                    </button>
                  )}
                </Show>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

function ArticleMetaSpan(props: { article: LabArticle }) {
  return (
    <span {...stylex.attrs(labStyles.meta)}>
      <span {...stylex.attrs(labStyles.metaCategory)}>{props.article.category}</span>
      <span aria-hidden="true" {...stylex.attrs(labStyles.metaDot)} />
      <span>{`约 ${readMinutes(props.article)} 分钟`}</span>
    </span>
  );
}

function useCurrentSection(article: LabArticle, isActive: Accessor<boolean>) {
  const [label, setLabel] = createSignal("导读");

  createEffect(isActive, (active) => {
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
  });

  return label;
}
