import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { ListTree, X } from "@fenchem-lp/ui/components/lucide";
import { createMemo, createSignal, For, onSettled, Show, untrack } from "solid-js";

import { m, type MotionValue } from "@/compat/motion";

import { color, font } from "../../variant-oos1/tokens.stylex";
import { lab } from "../tokens.stylex";
import {
  ArticleFlow,
  READING_GAP,
  STICKY_OFFSET,
  TocPage,
  articleAnchor,
  kitStyles,
  labStyles,
  locationLabel,
  padIndex,
  sectionAnchor,
  shortTitle,
  splitNumeral,
  useLabArticles,
  usePickerHost,
  useReadingPosition,
  type LabArticle,
  type ReadingPosition,
  type SubPageProps,
} from "./kit";

const DESKTOP = breakpoints.xl;
const RAIL_TOP = STICKY_OFFSET + READING_GAP;
const BACKDROP = "rgba(6, 20, 44, 0.36)";
const EXIT_FALLBACK_MS = 260;

const sxProps = (...args: ReadonlyArray<StyleXStyles | false | null | undefined>) =>
  stylex.attrs(...args);

const fadeIn = stylex.keyframes({ "0%": { opacity: 0 }, "100%": { opacity: 1 } });
const fadeOut = stylex.keyframes({ "0%": { opacity: 1 }, "100%": { opacity: 0 } });
const riseIn = stylex.keyframes({
  "0%": { transform: "translateY(100%)" },
  "100%": { transform: "none" },
});
const sinkOut = stylex.keyframes({
  "0%": { transform: "none" },
  "100%": { transform: "translateY(100%)" },
});

const styles = stylex.create({
  layout: {
    display: { default: "block", [DESKTOP]: "grid" },
    gridTemplateColumns: "208px minmax(0, 1fr)",
    columnGap: { default: 0, [DESKTOP]: 64, [breakpoints["2xl"]]: 96 },
    alignItems: "start",
    maxWidth: 1200,
    marginInline: "auto",
  },
  rail: {
    display: { default: "none", [DESKTOP]: "block" },
    position: "sticky",
    top: `calc(${lab.stickyTop} + 32px)`,
    maxHeight: `calc(100dvh - ${lab.stickyTop} - 64px)`,
    overflowY: "auto",
    overscrollBehavior: "contain",
    scrollbarWidth: "none",
  },
  flow: {
    maxWidth: 760,
    marginInline: { default: "auto", [DESKTOP]: 0 },
  },
  head: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    paddingBottom: 12,
    borderBottomWidth: 2,
    borderBottomStyle: "solid",
    borderBottomColor: color.ink,
  },
  headLabel: {
    margin: 0,
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: "0.12em",
    color: color.ink,
  },
  headCount: {
    fontSize: 12,
    color: color.muted,
  },
  list: {
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  item: {
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: lab.hairline,
  },
  articleLink: {
    display: "grid",
    gridTemplateColumns: "28px minmax(0, 1fr)",
    alignItems: "baseline",
    paddingBlock: 12,
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 1.45,
    textDecoration: "none",
    color: {
      default: color.bodyText,
      ":hover": { default: null, [lab.hover]: color.ink },
    },
    transitionProperty: "color",
    transitionDuration: "150ms",
    transitionTimingFunction: lab.easeOut,
    WebkitTapHighlightColor: "transparent",
  },
  articleLinkSheet: {
    minHeight: 48,
    alignContent: "center",
    fontSize: 16,
  },
  articleLinkOpen: {
    color: color.ink,
  },
  number: {
    fontSize: 12,
    fontWeight: 600,
    color: color.muted,
    transitionProperty: "color",
    transitionDuration: "150ms",
  },
  numberOpen: {
    color: colors.brandBlue700,
  },
  collapse: {
    display: "grid",
    gridTemplateRows: "0fr",
    visibility: "hidden",
    transitionProperty: "grid-template-rows, visibility",
    transitionDuration: { default: "0ms", [breakpoints.motionOk]: "220ms, 0ms" },
    transitionDelay: { default: "0ms", [breakpoints.motionOk]: "0ms, 220ms" },
    transitionTimingFunction: lab.easeOut,
  },
  collapseOpen: {
    gridTemplateRows: "1fr",
    visibility: "visible",
    transitionDuration: { default: "0ms", [breakpoints.motionOk]: "280ms, 0ms" },
    transitionDelay: "0ms",
  },
  clip: {
    minHeight: 0,
    overflow: "clip",
  },
  chapters: {
    position: "relative",
    margin: 0,
    marginInlineStart: 28,
    paddingBottom: 14,
    paddingInlineStart: 14,
    listStyle: "none",
  },
  track: {
    position: "absolute",
    top: 2,
    bottom: 16,
    left: 0,
    width: 1,
    backgroundColor: lab.hairline,
  },
  fill: {
    position: "absolute",
    top: 2,
    bottom: 16,
    left: -0.5,
    width: 2,
    backgroundColor: colors.brandBlue700,
    transformOrigin: "top center",
  },
  chapterLink: {
    display: "grid",
    gridTemplateColumns: "1.4em minmax(0, 1fr)",
    alignItems: "baseline",
    paddingBlock: 5,
    fontSize: 13,
    lineHeight: 1.5,
    textDecoration: "none",
    color: {
      default: color.muted,
      ":hover": { default: null, [lab.hover]: color.ink },
    },
    transitionProperty: "color",
    transitionDuration: "150ms",
    transitionTimingFunction: lab.easeOut,
    WebkitTapHighlightColor: "transparent",
  },
  chapterLinkSheet: {
    minHeight: 44,
    alignContent: "center",
    fontSize: 15,
  },
  chapterActive: {
    color: color.ink,
    fontWeight: 600,
  },
  trigger: {
    appearance: "none",
    display: { default: "inline-flex", [DESKTOP]: "none" },
    alignItems: "center",
    gap: 8,
    minWidth: 0,
    maxWidth: "100%",
    height: 36,
    paddingInline: 14,
    borderWidth: 0,
    borderRadius: 999,
    backgroundColor: {
      default: "#f3f4f6",
      ":hover": { default: null, [lab.hover]: "#e5e7eb" },
    },
    fontFamily: "inherit",
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: "0.04em",
    color: color.ink,
    cursor: "pointer",
    transform: {
      default: null,
      ":active": { default: null, [breakpoints.motionOk]: "scale(0.97)" },
    },
    transitionProperty: "background-color, transform",
    transitionDuration: "160ms",
    transitionTimingFunction: lab.easeOut,
    WebkitTapHighlightColor: "transparent",
  },
  triggerIcon: {
    flexShrink: 0,
    color: colors.brandBlue700,
  },
  triggerWhere: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontWeight: 400,
    color: color.bodyText,
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
      animationDuration: "300ms",
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
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    flexDirection: "column",
    maxWidth: 560,
    maxHeight: "82dvh",
    marginInline: "auto",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: "hidden",
    backgroundColor: colors.paper,
    boxShadow: "0 -24px 64px -24px rgba(7, 26, 74, 0.32)",
    animationName: { default: fadeIn, [breakpoints.motionOk]: riseIn },
    animationDuration: "340ms",
    animationTimingFunction: lab.easeDrawer,
  },
  sheetClosing: {
    animationName: { default: fadeOut, [breakpoints.motionOk]: sinkOut },
    animationDuration: "220ms",
    animationTimingFunction: lab.easeDrawer,
    animationFillMode: "forwards",
  },
  grabber: {
    alignSelf: "center",
    flexShrink: 0,
    width: 40,
    height: 4,
    marginTop: 8,
    borderRadius: 999,
    backgroundColor: "rgba(26, 26, 26, 0.16)",
  },
  sheetBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexShrink: 0,
    height: 56,
    paddingInline: 20,
  },
  sheetTitle: {
    margin: 0,
    fontSize: 16,
    fontWeight: 700,
    letterSpacing: "0.08em",
  },
  close: {
    appearance: "none",
    display: "grid",
    placeItems: "center",
    width: 40,
    height: 40,
    padding: 0,
    borderWidth: 0,
    borderRadius: 999,
    backgroundColor: {
      default: lab.surfaceAlt,
      ":hover": { default: null, [lab.hover]: "#e6ebf5" },
    },
    color: color.ink,
    cursor: "pointer",
    transform: {
      default: null,
      ":active": { default: null, [breakpoints.motionOk]: "scale(0.96)" },
    },
    transitionProperty: "background-color, transform",
    transitionDuration: "160ms",
    transitionTimingFunction: lab.easeOut,
  },
  sheetBody: {
    flexGrow: 1,
    overflowY: "auto",
    overscrollBehavior: "contain",
    paddingInline: 20,
    paddingBottom: "calc(24px + env(safe-area-inset-bottom))",
  },
});

export function MarginVariant(props: SubPageProps) {
  const articles = useLabArticles();
  const { position, articleProgress } = useReadingPosition(articles, RAIL_TOP);
  const [sheetOpen, setSheetOpen] = createSignal(false);
  const where = createMemo(() => locationLabel(articles(), position()));

  return (
    <TocPage
      onNavigateHome={props.onNavigateHome}
      bar={
        <button
          type="button"
          aria-haspopup="dialog"
          aria-expanded={sheetOpen() ? "true" : "false"}
          onClick={() => setSheetOpen(true)}
          {...stylex.attrs(styles.trigger, kitStyles.focusRing)}
        >
          <ListTree
            size={16}
            strokeWidth={2}
            aria-hidden="true"
            {...stylex.attrs(styles.triggerIcon)}
          />
          目录
          <Show when={where()}>
            {(current) => (
              <span {...stylex.attrs(styles.triggerWhere)}>
                {current().section
                  ? `${current().section!.numeral} ${current().section!.text}`
                  : shortTitle(current().article)}
              </span>
            )}
          </Show>
        </button>
      }
    >
      <div {...stylex.attrs(styles.layout)}>
        <nav aria-label="本页目录" {...stylex.attrs(styles.rail)}>
          <ContentsTree
            articles={articles()}
            position={position()}
            progress={articleProgress}
            mode="rail"
          />
        </nav>
        <ArticleFlow articles={articles()} sx={styles.flow} />
      </div>
      <Show when={sheetOpen()}>
        <TreeSheet
          articles={articles()}
          position={position()}
          progress={articleProgress}
          onClosed={() => setSheetOpen(false)}
        />
      </Show>
    </TocPage>
  );
}

function ContentsTree(props: {
  articles: readonly LabArticle[];
  position: ReadingPosition;
  progress: MotionValue<number>;
  mode: "rail" | "sheet";
  onNavigate?: () => void;
}) {
  const sheet = untrack(() => props.mode === "sheet");
  const focusIndex = () => Math.max(props.position.article, 0);
  const navigate = () => props.onNavigate?.();
  return (
    <>
      <Show when={!sheet}>
        <div {...stylex.attrs(styles.head)}>
          <p {...stylex.attrs(styles.headLabel)}>目录</p>
          <span {...stylex.attrs(styles.headCount, labStyles.displayNumber)}>
            {`${props.articles.length} 篇`}
          </span>
        </div>
      </Show>
      <ol {...stylex.attrs(styles.list)}>
        <For each={props.articles}>
          {(article, index) => {
            const open = () => sheet || index() === focusIndex();
            const here = () => index() === props.position.article;
            return (
              <li {...stylex.attrs(styles.item)}>
                <a
                  href={`#${articleAnchor(article)}`}
                  aria-current={here() && props.position.chapter < 0 ? "location" : undefined}
                  onClick={navigate}
                  {...sxProps(
                    styles.articleLink,
                    sheet && styles.articleLinkSheet,
                    open() && styles.articleLinkOpen,
                    kitStyles.focusRing,
                  )}
                >
                  <span
                    {...sxProps(
                      styles.number,
                      labStyles.displayNumber,
                      here() && styles.numberOpen,
                    )}
                  >
                    {padIndex(index())}
                  </span>
                  <span>{shortTitle(article)}</span>
                </a>
                <div {...sxProps(styles.collapse, open() && styles.collapseOpen)}>
                  <div {...stylex.attrs(styles.clip)}>
                    <div {...stylex.attrs(styles.chapters)}>
                      <span aria-hidden="true" {...stylex.attrs(styles.track)} />
                      <Show when={here()}>
                        <m.span
                          aria-hidden="true"
                          style={{ scaleY: props.progress }}
                          {...stylex.attrs(styles.fill)}
                        />
                      </Show>
                      <ol {...stylex.attrs(styles.list)}>
                        {article.sections.map((section, chapter) => {
                          const { numeral, text } = splitNumeral(section.navLabel);
                          const active = () => here() && chapter === props.position.chapter;
                          return (
                            <li>
                              <a
                                href={`#${sectionAnchor(article, section)}`}
                                aria-current={active() ? "location" : undefined}
                                onClick={navigate}
                                {...sxProps(
                                  styles.chapterLink,
                                  sheet && styles.chapterLinkSheet,
                                  active() && styles.chapterActive,
                                  kitStyles.focusRing,
                                )}
                              >
                                <span>{numeral}</span>
                                <span>{text}</span>
                              </a>
                            </li>
                          );
                        })}
                      </ol>
                    </div>
                  </div>
                </div>
              </li>
            );
          }}
        </For>
      </ol>
    </>
  );
}

function TreeSheet(props: {
  articles: readonly LabArticle[];
  position: ReadingPosition;
  progress: MotionValue<number>;
  onClosed: () => void;
}) {
  let dialog: HTMLDialogElement | undefined;
  const [closing, setClosing] = createSignal(false);
  const setPickerHost = usePickerHost();

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
      aria-labelledby="margin-sheet-title"
      onCancel={(event: Event) => {
        event.preventDefault();
        requestClose();
      }}
      onClose={() => props.onClosed()}
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
        {...sxProps(styles.sheet, closing() && styles.sheetClosing)}
      >
        <span aria-hidden="true" {...stylex.attrs(styles.grabber)} />
        <div {...stylex.attrs(styles.sheetBar)}>
          <h2 id="margin-sheet-title" {...stylex.attrs(styles.sheetTitle)}>
            本页目录
          </h2>
          <button
            type="button"
            aria-label="关闭"
            onClick={requestClose}
            {...stylex.attrs(styles.close, kitStyles.focusRing)}
          >
            <X size={18} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
        <nav aria-label="本页目录" {...stylex.attrs(styles.sheetBody)}>
          <ContentsTree
            articles={props.articles}
            position={props.position}
            progress={props.progress}
            mode="sheet"
            onNavigate={finish}
          />
        </nav>
      </section>
    </dialog>
  );
}
