import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { ArrowRight, ChevronLeft, ChevronRight, X } from "@fenchem-lp/ui/components/lucide";
import { createEffect, createMemo, createSignal, For, onCleanup, onSettled, Show } from "solid-js";

import { m } from "@/compat/motion";

import { EASE } from "../../motion-constants";
import { color, font } from "../../variant-oos1/tokens.stylex";
import {
  ArticleMeta,
  ArticlePreview,
  ArticleSections,
  LabPage,
  articleIdChips,
  kitStyles,
  labStyles,
  padIndex,
  readMinutes,
  useLabArticles,
  usePickerHost,
  type LabArticle,
  type SubPageProps,
} from "../kit";
import { lab } from "../tokens.stylex";

const DESKTOP = breakpoints.xl;
const BACKDROP = "rgba(6, 20, 44, 0.36)";
const EXIT_FALLBACK_MS = 320;

const sxProps = (...args: ReadonlyArray<StyleXStyles | false | null | undefined>) =>
  stylex.attrs(...args);

const fadeIn = stylex.keyframes({ "0%": { opacity: 0 }, "100%": { opacity: 1 } });
const fadeOut = stylex.keyframes({ "0%": { opacity: 1 }, "100%": { opacity: 0 } });
const slideIn = stylex.keyframes({
  "0%": { transform: "translateX(100%)" },
  "100%": { transform: "none" },
});
const slideOut = stylex.keyframes({
  "0%": { transform: "none" },
  "100%": { transform: "translateX(100%)" },
});
const riseIn = stylex.keyframes({
  "0%": { transform: "translateY(100%)" },
  "100%": { transform: "none" },
});
const sinkOut = stylex.keyframes({
  "0%": { transform: "none" },
  "100%": { transform: "translateY(100%)" },
});

const styles = stylex.create({
  list: {
    margin: 0,
    marginTop: 8,
    padding: 0,
    listStyle: "none",
  },
  row: {
    position: "relative",
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr) 88px",
      [breakpoints.md]: "200px minmax(0, 1fr) auto",
    },
    alignItems: "center",
    columnGap: { default: 16, [breakpoints.md]: 32 },
    paddingBlock: { default: 24, [DESKTOP]: 32 },
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: lab.hairline,
  },
  rowActive: {
    backgroundColor: lab.surfaceAlt,
  },
  thumb: {
    gridColumn: { default: 2, [breakpoints.md]: 1 },
    gridRow: 1,
    overflow: "hidden",
    aspectRatio: { default: "1 / 1", [breakpoints.md]: "16 / 10" },
    backgroundColor: lab.surfaceAlt,
  },
  thumbImage: {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  rowText: {
    gridColumn: { default: 1, [breakpoints.md]: 2 },
    gridRow: 1,
    display: "flex",
    flexDirection: "column",
    gap: 8,
    minWidth: 0,
  },
  rowTitle: {
    margin: 0,
    fontSize: { default: 20, [DESKTOP]: 24 },
    fontWeight: 700,
    lineHeight: 1.4,
    textWrap: "balance",
  },
  rowButton: {
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
  rowFocus: {
    outlineStyle: "solid",
    outlineWidth: 2,
    outlineOffset: -2,
    outlineColor: { default: "transparent", ":focus-within": colors.brandBlue700 },
  },
  rowLead: {
    margin: 0,
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
    overflow: "hidden",
    fontSize: 15,
    lineHeight: 1.75,
    color: color.bodyText,
  },
  rowArrow: {
    display: { default: "none", [breakpoints.md]: "grid" },
    gridColumn: 3,
    placeItems: "center",
    width: 44,
    height: 44,
    borderRadius: 999,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(7, 67, 174, 0.28)",
    color: colors.brandBlue700,
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

  dialog: {
    position: "fixed",
    inset: 0,
    width: "100vw",
    height: "100dvh",
    maxWidth: "none",
    maxHeight: "none",
    margin: 0,
    padding: 0,
    borderWidth: 0,
    overflow: "hidden",
    backgroundColor: "transparent",
    color: color.ink,
    fontFamily: font.body,
    outlineStyle: "none",
    "::backdrop": {
      backgroundColor: BACKDROP,
      animationName: fadeIn,
      animationDuration: "320ms",
      animationTimingFunction: lab.easeDrawer,
    },
  },
  dialogClosing: {
    "::backdrop": {
      animationName: fadeOut,
      animationDuration: "220ms",
      animationFillMode: "forwards",
    },
  },
  dismiss: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    cursor: "default",
  },
  panel: {
    position: "absolute",
    right: 0,
    bottom: 0,
    left: { default: 0, [breakpoints.md]: "auto" },
    top: { default: 24, [breakpoints.md]: 0 },
    display: "flex",
    flexDirection: "column",
    width: { default: "100%", [breakpoints.md]: "min(780px, 92vw)" },
    borderTopLeftRadius: { default: 16, [breakpoints.md]: 0 },
    borderTopRightRadius: { default: 16, [breakpoints.md]: 0 },
    overflow: "hidden",
    backgroundColor: colors.paper,
    boxShadow: "0 0 0 1px rgba(7, 26, 74, 0.04), -24px 0 64px -24px rgba(7, 26, 74, 0.32)",
    animationName: {
      default: fadeIn,
      [breakpoints.motionOk]: { default: riseIn, [breakpoints.md]: slideIn },
    },
    animationDuration: "360ms",
    animationTimingFunction: lab.easeDrawer,
  },
  panelClosing: {
    animationName: {
      default: fadeOut,
      [breakpoints.motionOk]: { default: sinkOut, [breakpoints.md]: slideOut },
    },
    animationDuration: "220ms",
    animationTimingFunction: lab.easeDrawer,
    animationFillMode: "forwards",
  },
  grabber: {
    display: { default: "block", [breakpoints.md]: "none" },
    alignSelf: "center",
    width: 40,
    height: 4,
    marginTop: 8,
    borderRadius: 999,
    backgroundColor: "rgba(26, 26, 26, 0.16)",
  },
  bar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    flexShrink: 0,
    height: 60,
    paddingInline: { default: 16, [breakpoints.md]: 28 },
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: lab.hairline,
  },
  barLeft: {
    display: "flex",
    alignItems: "baseline",
    gap: 10,
    minWidth: 0,
    fontSize: 14,
    whiteSpace: "nowrap",
  },
  barPosition: {
    fontWeight: 600,
    color: color.ink,
  },
  barCategory: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    color: color.muted,
  },
  barRight: {
    display: "flex",
    alignItems: "center",
    gap: 8,
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
  closeButton: {
    marginInlineStart: 8,
    borderColor: "transparent",
    backgroundColor: {
      default: lab.surfaceAlt,
      ":hover": { default: null, [lab.hover]: "#e6ebf5" },
    },
  },
  scroller: {
    flexGrow: 1,
    overflowY: "auto",
    overscrollBehavior: "contain",
    scrollBehavior: "auto",
  },
  scrollerInner: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 22, [DESKTOP]: 26 },
    paddingTop: { default: 28, [breakpoints.md]: 44 },
    paddingBottom: { default: 48, [breakpoints.md]: 64 },
    paddingInline: { default: 20, [breakpoints.md]: 56 },
  },
  head: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 14, [DESKTOP]: 18 },
  },
  title: {
    margin: 0,
    fontSize: { default: 26, [breakpoints.md]: 32 },
    fontWeight: 800,
    lineHeight: 1.3,
    letterSpacing: "-0.01em",
    color: color.ink,
    textWrap: "balance",
    outlineStyle: "none",
  },
  sectionsGap: {
    marginTop: { default: 20, [DESKTOP]: 28 },
  },
  next: {
    appearance: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    width: "100%",
    marginTop: { default: 28, [breakpoints.md]: 40 },
    paddingBlock: 20,
    paddingInline: 24,
    borderWidth: 0,
    backgroundColor: {
      default: lab.surfaceAlt,
      ":hover": { default: null, [lab.hover]: "#e9eef8" },
    },
    textAlign: "start",
    fontFamily: "inherit",
    fontSize: 16,
    color: color.ink,
    cursor: "pointer",
    transitionProperty: "background-color",
    transitionDuration: "160ms",
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
    fontSize: 17,
    fontWeight: 700,
    lineHeight: 1.45,
  },
  nextArrow: {
    flexShrink: 0,
    color: colors.brandBlue700,
  },
});

export function DrawerVariant(props: SubPageProps) {
  const articles = useLabArticles();
  const [openId, setOpenId] = createSignal<string | null>(null);
  const triggers = new Map<string, HTMLButtonElement>();
  let lastTrigger: string | null = null;
  const openIndex = createMemo(() => articles().findIndex((article) => article.id === openId()));
  const opened = createMemo(() => (openIndex() >= 0 ? articles()[openIndex()] : undefined));

  const open = (id: string) => {
    lastTrigger = id;
    setOpenId(id);
  };

  return (
    <LabPage
      onNavigateHome={props.onNavigateHome}
      chips={articleIdChips(articles())}
      activeChip={openId() ?? undefined}
      onSelectChip={open}
    >
      <div {...stylex.attrs(labStyles.column)}>
        <div {...stylex.attrs(labStyles.listHeader)}>
          <p {...stylex.attrs(labStyles.listLabel)}>全部洞察</p>
          <p {...stylex.attrs(labStyles.listCount)}>{`共 ${articles().length} 篇`}</p>
        </div>
        <ul {...stylex.attrs(styles.list)}>
          <For each={articles()}>
            {(article) => {
              onCleanup(() => triggers.delete(article.id));
              return (
                <li
                  {...sxProps(
                    styles.row,
                    styles.rowFocus,
                    article.id === openId() && styles.rowActive,
                    stylex.defaultMarker(),
                  )}
                >
                  <div {...stylex.attrs(styles.thumb)}>
                    <img
                      src={article.image}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      {...stylex.attrs(styles.thumbImage)}
                    />
                  </div>
                  <div {...stylex.attrs(styles.rowText)}>
                    <ArticleMeta article={article} />
                    <h2 {...stylex.attrs(styles.rowTitle)}>
                      <button
                        ref={(node) => {
                          triggers.set(article.id, node);
                        }}
                        type="button"
                        aria-haspopup="dialog"
                        onClick={() => open(article.id)}
                        {...stylex.attrs(styles.rowButton)}
                      >
                        {article.title}
                      </button>
                    </h2>
                    <Show when={article.lead}>
                      <p {...stylex.attrs(styles.rowLead)}>{article.lead}</p>
                    </Show>
                  </div>
                  <span aria-hidden="true" {...stylex.attrs(styles.rowArrow)}>
                    <ArrowRight size={18} strokeWidth={2} />
                  </span>
                </li>
              );
            }}
          </For>
        </ul>
      </div>

      <Show when={opened()}>
        {(article) => (
          <ReaderDrawer
            article={article()}
            index={openIndex()}
            total={articles().length}
            next={articles()[openIndex() + 1]}
            onGo={(offset) => {
              const target = articles()[openIndex() + offset];
              if (target) setOpenId(target.id);
            }}
            onClosed={() => {
              setOpenId(null);
              const trigger = lastTrigger ? triggers.get(lastTrigger) : null;
              trigger?.focus({ preventScroll: true });
            }}
          />
        )}
      </Show>
    </LabPage>
  );
}

function ReaderDrawer(props: {
  article: LabArticle;
  index: number;
  total: number;
  next: LabArticle | undefined;
  onGo: (offset: number) => void;
  onClosed: () => void;
}) {
  let dialog: HTMLDialogElement | undefined;
  let scroller: HTMLDivElement | undefined;
  let title: HTMLHeadingElement | undefined;
  const [closing, setClosing] = createSignal(false);
  const setPickerHost = usePickerHost();
  const titleId = () => `${props.article.id}-drawer-title`;

  onSettled(() => {
    if (!dialog) return;
    if (!dialog.open) dialog.showModal();
    setPickerHost(dialog);
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
      setPickerHost(null);
    };
  });

  createEffect(
    () => props.article.id,
    () => {
      scroller?.scrollTo({ top: 0, behavior: "instant" });
      title?.focus({ preventScroll: true });
    },
  );

  const finish = () => {
    if (dialog?.open) dialog.close();
  };

  const requestClose = () => {
    if (closing()) return;
    setClosing(true);
    window.setTimeout(finish, EXIT_FALLBACK_MS);
  };

  return (
    <dialog
      ref={dialog}
      lang="zh-CN"
      aria-labelledby={titleId()}
      onCancel={(event: Event) => {
        event.preventDefault();
        requestClose();
      }}
      onClose={() => props.onClosed()}
      onKeyDown={(event) => {
        if (event.key !== "Escape") return;
        event.preventDefault();
        requestClose();
      }}
      {...sxProps(styles.dialog, closing() && styles.dialogClosing)}
    >
      <button
        type="button"
        tabindex={-1}
        aria-hidden="true"
        onClick={requestClose}
        {...stylex.attrs(styles.dismiss)}
      />
      <section
        onAnimationEnd={(event: AnimationEvent & { currentTarget: HTMLElement }) => {
          if (closing() && event.target === event.currentTarget) finish();
        }}
        {...sxProps(styles.panel, closing() && styles.panelClosing)}
      >
        <span aria-hidden="true" {...stylex.attrs(styles.grabber)} />
        <div {...stylex.attrs(styles.bar)}>
          <p {...stylex.attrs(styles.barLeft)}>
            <span {...stylex.attrs(styles.barPosition, labStyles.displayNumber)}>
              {`${padIndex(props.index)} / ${padIndex(props.total - 1)}`}
            </span>
            <span {...stylex.attrs(styles.barCategory)}>
              {props.article.navLabel ?? props.article.category}
            </span>
          </p>
          <div {...stylex.attrs(styles.barRight)}>
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
            <button
              type="button"
              aria-label="关闭"
              onClick={requestClose}
              {...stylex.attrs(styles.iconButton, styles.closeButton, kitStyles.focusRing)}
            >
              <X size={18} strokeWidth={2} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div ref={scroller} {...stylex.attrs(styles.scroller)}>
          <Show when={props.article} keyed>
            {(article) => (
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.18, ease: EASE }}
                {...stylex.attrs(styles.scrollerInner)}
              >
                <header {...stylex.attrs(styles.head)}>
                  <ArticleMeta article={article} />
                  <h2
                    ref={title}
                    id={`${article.id}-drawer-title`}
                    tabindex={-1}
                    {...stylex.attrs(styles.title)}
                  >
                    {article.title}
                  </h2>
                  <Show when={article.lead}>
                    <p {...stylex.attrs(labStyles.docLead)}>{article.lead}</p>
                  </Show>
                </header>
                <ArticlePreview article={article} />
                <div {...stylex.attrs(styles.sectionsGap)}>
                  <ArticleSections article={article} />
                </div>
                <Show when={props.next}>
                  {(next) => (
                    <button
                      type="button"
                      onClick={() => props.onGo(1)}
                      {...stylex.attrs(styles.next, kitStyles.focusRing)}
                    >
                      <span {...stylex.attrs(styles.nextText)}>
                        <span {...stylex.attrs(styles.nextLabel)}>
                          {`下一篇 · 约 ${readMinutes(next())} 分钟`}
                        </span>
                        <span {...stylex.attrs(styles.nextTitle)}>{next().title}</span>
                      </span>
                      <ArrowRight
                        size={20}
                        strokeWidth={2}
                        aria-hidden="true"
                        {...stylex.attrs(styles.nextArrow)}
                      />
                    </button>
                  )}
                </Show>
              </m.div>
            )}
          </Show>
        </div>
      </section>
    </dialog>
  );
}
