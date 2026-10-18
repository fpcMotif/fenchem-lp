import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import {
  createEffect,
  createMemo,
  createSignal,
  For,
  onCleanup,
  onSettled,
  Show,
  type Accessor,
} from "solid-js";
import type { JSX } from "@solidjs/web";

import { m, useMotionValue } from "@/compat/motion";

import { color } from "../../variant-oos1/tokens.stylex";
import { lab } from "../tokens.stylex";
import {
  ArticleFlow,
  READING_GAP,
  STICKY_OFFSET,
  TocPage,
  articleAnchor,
  labStyles,
  padIndex,
  sectionAnchor,
  shortTitle,
  splitNumeral,
  useLabArticles,
  useReadingPosition,
  type LabArticle,
  type SubPageProps,
} from "./kit";

const READING_LINE = STICKY_OFFSET + READING_GAP;
const STRIP_BOTTOM = 32;
const LABEL_HEIGHT = 20;
const LABEL_GAP = 21;
const LINGER_MS = 700;

type Mark = {
  id: string;
  article: number;
  chapter: number;
  numeral: string;
  label: string;
  at: number;
};

type FlowBox = { top: number; height: number };

const sxProps = (...args: ReadonlyArray<StyleXStyles | false | null | undefined>) =>
  stylex.attrs(...args);

const styles = stylex.create({
  flow: {
    paddingInlineEnd: { default: 20, [breakpoints.md]: 28, [breakpoints.xl]: 0 },
  },
  spine: {
    position: "fixed",
    top: `calc(${lab.stickyTop} + 24px)`,
    right: 0,
    bottom: STRIP_BOTTOM,
    zIndex: 25,
    width: { default: 32, [breakpoints.md]: 56 },
    opacity: 0,
    visibility: "hidden",
    transitionProperty: "opacity, visibility",
    transitionDuration: { default: "0s", [breakpoints.motionOk]: "200ms, 0s" },
    transitionDelay: { default: "0s", [breakpoints.motionOk]: "0s, 200ms" },
    transitionTimingFunction: lab.easeOut,
  },
  spineShown: {
    opacity: 1,
    visibility: "visible",
    transitionDelay: "0s",
  },
  sheet: {
    position: "absolute",
    top: -14,
    bottom: -14,
    right: 0,
    width: { default: "min(300px, 86vw)", [breakpoints.md]: 340 },
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.96)",
    backdropFilter: "blur(14px)",
    boxShadow: "0 0 0 1px rgba(7, 26, 74, 0.06), -24px 0 48px -24px rgba(7, 26, 74, 0.28)",
    pointerEvents: "none",
    opacity: 0,
    transform: { default: null, [breakpoints.motionOk]: "translateX(12px)" },
    transitionProperty: "opacity, transform",
    transitionDuration: { default: "0ms", [breakpoints.motionOk]: "140ms" },
    transitionTimingFunction: lab.easeOut,
  },
  labels: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: { default: 32, [breakpoints.md]: 56 },
    width: { default: "min(252px, calc(86vw - 48px))", [breakpoints.md]: 268 },
    margin: 0,
    padding: 0,
    listStyle: "none",
    pointerEvents: "none",
    opacity: 0,
    transform: { default: null, [breakpoints.motionOk]: "translateX(8px)" },
    transitionProperty: "opacity, transform",
    transitionDuration: { default: "0ms", [breakpoints.motionOk]: "140ms" },
    transitionTimingFunction: lab.easeOut,
  },
  expanded: {
    pointerEvents: "auto",
    opacity: 1,
    transform: "none",
    transitionDuration: { default: "0ms", [breakpoints.motionOk]: "200ms" },
  },
  labelItem: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: LABEL_HEIGHT,
  },
  label: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    height: "100%",
    paddingInline: 10,
    borderRadius: 6,
    fontSize: 12.5,
    lineHeight: 1,
    whiteSpace: "nowrap",
    textDecoration: "none",
    color: {
      default: color.muted,
      ":hover": { default: null, [lab.hover]: color.ink },
    },
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineOffset: 0,
    outlineColor: colors.brandBlue700,
    transitionProperty: "color",
    transitionDuration: "120ms",
    WebkitTapHighlightColor: "transparent",
  },
  labelArticle: {
    fontSize: 13,
    fontWeight: 700,
    color: color.ink,
  },
  labelChapter: {
    paddingInlineStart: 40,
  },
  labelPassed: {
    color: color.bodyText,
  },
  labelHere: {
    fontWeight: 600,
    color: colors.brandBlue700,
  },
  labelText: {
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  labelNumeral: {
    flexShrink: 0,
    minWidth: "1.4em",
  },
  labelArticleNumeral: {
    minWidth: 22,
    color: colors.brandBlue700,
  },
  strip: {
    position: "absolute",
    inset: 0,
    cursor: "ns-resize",
    touchAction: "none",
    userSelect: "none",
    WebkitTapHighlightColor: "transparent",
  },
  rail: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 15,
    width: 1,
    backgroundColor: lab.hairline,
  },
  tick: {
    position: "absolute",
    top: -1,
    right: 12,
    width: 8,
    height: 2,
    borderRadius: 1,
    backgroundColor: "rgba(26, 26, 26, 0.24)",
  },
  tickArticle: {
    right: 8,
    width: { default: 16, [breakpoints.md]: 20 },
    backgroundColor: "rgba(26, 26, 26, 0.6)",
  },
  tickPassed: {
    backgroundColor: "rgba(7, 67, 174, 0.45)",
  },
  tickArticlePassed: {
    backgroundColor: colors.brandBlue700,
  },
  tickNumber: {
    display: { default: "none", [breakpoints.md]: "block" },
    position: "absolute",
    top: -6,
    right: 32,
    fontSize: 10,
    fontWeight: 600,
    lineHeight: 1,
    color: color.muted,
    transitionProperty: "opacity",
    transitionDuration: { default: "0ms", [breakpoints.motionOk]: "140ms" },
  },
  tickNumberHidden: {
    opacity: 0,
  },
  marker: {
    position: "absolute",
    top: -1,
    right: 4,
    display: "flex",
    alignItems: "center",
    width: { default: 24, [breakpoints.md]: 30 },
    height: 2,
    pointerEvents: "none",
  },
  markerDot: {
    flexShrink: 0,
    width: 6,
    height: 6,
    marginInlineEnd: -1,
    borderRadius: 999,
    backgroundColor: colors.brandBlue700,
    boxShadow: "0 0 0 3px rgba(255, 255, 255, 0.9)",
  },
  markerLine: {
    flexGrow: 1,
    height: 2,
    borderRadius: 1,
    backgroundColor: colors.brandBlue700,
  },
});

const placeLabels = (marks: readonly Mark[], height: number) => {
  const placed = marks.map((mark) => mark.at * height - LABEL_HEIGHT / 2);
  for (let index = 0; index < placed.length; index++) {
    const floor = index === 0 ? 0 : (placed[index - 1] ?? 0) + LABEL_GAP;
    placed[index] = Math.max(placed[index] ?? 0, floor);
  }
  for (let index = placed.length - 1; index >= 0; index--) {
    const ceiling =
      index === placed.length - 1 ? height - LABEL_HEIGHT : (placed[index + 1] ?? 0) - LABEL_GAP;
    placed[index] = Math.min(placed[index] ?? 0, ceiling);
  }
  return placed;
};

function useFlowMarks(
  flowRef: Accessor<HTMLDivElement | undefined>,
  articleList: Accessor<readonly LabArticle[]>,
) {
  const [marks, setMarks] = createSignal<Mark[]>([]);
  const box: { current: FlowBox } = { current: { top: 0, height: 1 } };

  createEffect(
    () => [flowRef(), articleList()] as const,
    ([flow, articles]) => {
      if (!flow) return;
      const measure = () => {
        const flowBox = flow.getBoundingClientRect();
        const top = flowBox.top + window.scrollY;
        const height = Math.max(1, flowBox.height);
        box.current = { top, height };
        const at = (id: string) => {
          const element = document.getElementById(id);
          return element
            ? (element.getBoundingClientRect().top + window.scrollY - top) / height
            : 0;
        };
        setMarks(
          articles.flatMap((article, articleIndex) => [
            {
              id: articleAnchor(article),
              article: articleIndex,
              chapter: -1,
              numeral: padIndex(articleIndex),
              label: shortTitle(article),
              at: at(articleAnchor(article)),
            },
            ...article.sections.map((section, chapter) => {
              const { numeral, text } = splitNumeral(section.navLabel);
              return {
                id: sectionAnchor(article, section),
                article: articleIndex,
                chapter,
                numeral,
                label: text,
                at: at(sectionAnchor(article, section)),
              };
            }),
          ]),
        );
      };
      measure();
      const observer = new ResizeObserver(measure);
      observer.observe(flow);
      window.addEventListener("resize", measure);
      return () => {
        observer.disconnect();
        window.removeEventListener("resize", measure);
      };
    },
  );

  return { marks, box };
}

export function SpineVariant(props: SubPageProps) {
  const articles = useLabArticles();
  const { position } = useReadingPosition(articles, READING_LINE);
  const [flowRef, setFlowRef] = createSignal<HTMLDivElement>();
  let strip: HTMLDivElement | undefined;
  const { marks, box } = useFlowMarks(flowRef, articles);
  const [stripHeight, setStripHeight] = createSignal(0);
  const [shown, setShown] = createSignal(false);
  const [hovered, setHovered] = createSignal(false);
  const [focused, setFocused] = createSignal(false);
  const [scrubbing, setScrubbing] = createSignal(false);
  const [lingering, setLingering] = createSignal(false);
  const markerY = useMotionValue(0);
  let lastScrub = -1;
  let linger = 0;
  const expanded = createMemo(() => hovered() || focused() || scrubbing() || lingering());

  onSettled(() => {
    const element = strip;
    if (!element) return;
    const observer = new ResizeObserver(() => setStripHeight(element.clientHeight));
    observer.observe(element);
    return () => observer.disconnect();
  });

  createEffect(
    () => [stripHeight(), marks()] as const,
    ([currentStripHeight]) => {
      let frame = 0;
      const update = () => {
        frame = 0;
        const { top, height } = box.current;
        const reading = window.scrollY + READING_LINE - top;
        markerY.set(Math.min(1, Math.max(0, reading / height)) * currentStripHeight);
        setShown(
          window.scrollY + window.innerHeight > top + 160 &&
            window.scrollY + READING_LINE < top + height,
        );
      };
      const schedule = () => {
        if (!frame) frame = requestAnimationFrame(update);
      };
      update();
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule);
      return () => {
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
        if (frame) cancelAnimationFrame(frame);
      };
    },
  );

  onCleanup(() => window.clearTimeout(linger));

  const hereIndex = createMemo(() =>
    marks().findIndex(
      (mark) => mark.article === position().article && mark.chapter === position().chapter,
    ),
  );
  const placed = createMemo(() => placeLabels(marks(), stripHeight()));

  const scrubTo = (clientY: number) => {
    const list = marks();
    const height = stripHeight();
    if (!strip || list.length === 0) return;
    const y = clientY - strip.getBoundingClientRect().top;
    let nearest = 0;
    list.forEach((mark, index) => {
      const best = list[nearest];
      if (best && Math.abs(mark.at * height - y) < Math.abs(best.at * height - y)) nearest = index;
    });
    if (nearest === lastScrub) return;
    lastScrub = nearest;
    const target = list[nearest];
    if (target)
      document.getElementById(target.id)?.scrollIntoView({ block: "start", behavior: "instant" });
  };

  const onPointerDown: JSX.EventHandler<HTMLDivElement, PointerEvent> = (event) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    window.clearTimeout(linger);
    setLingering(false);
    setScrubbing(true);
    lastScrub = -1;
    scrubTo(event.clientY);
  };

  const endScrub: JSX.EventHandler<HTMLDivElement, PointerEvent> = (event) => {
    if (!scrubbing()) return;
    event.currentTarget.releasePointerCapture(event.pointerId);
    setScrubbing(false);
    if (event.pointerType !== "mouse") {
      setLingering(true);
      linger = window.setTimeout(() => setLingering(false), LINGER_MS);
    }
  };

  return (
    <TocPage onNavigateHome={props.onNavigateHome}>
      <nav
        aria-label="本页目录"
        data-expanded={expanded() ? "" : undefined}
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") setHovered(true);
        }}
        onPointerLeave={(event) => {
          if (event.pointerType === "mouse") setHovered(false);
        }}
        onFocusIn={() => setFocused(true)}
        onFocusOut={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
        }}
        {...sxProps(styles.spine, (shown() || focused()) && styles.spineShown)}
      >
        <div aria-hidden="true" {...sxProps(styles.sheet, expanded() && styles.expanded)} />
        <ol {...sxProps(styles.labels, expanded() && styles.expanded)}>
          <For each={marks()} keyed={false}>
            {(mark, index) => {
              const isArticle = () => mark().chapter < 0;
              return (
                <li
                  style={{ transform: `translateY(${placed()[index] ?? 0}px)` }}
                  {...stylex.attrs(styles.labelItem)}
                >
                  <a
                    href={`#${mark().id}`}
                    aria-current={index === hereIndex() ? "location" : undefined}
                    onClick={(event) => {
                      event.currentTarget.blur();
                      setHovered(false);
                      setLingering(false);
                    }}
                    {...sxProps(
                      styles.label,
                      isArticle() ? styles.labelArticle : styles.labelChapter,
                      index < hereIndex() && styles.labelPassed,
                      index === hereIndex() && styles.labelHere,
                    )}
                  >
                    <span
                      {...sxProps(
                        styles.labelNumeral,
                        isArticle() && labStyles.displayNumber,
                        isArticle() && styles.labelArticleNumeral,
                      )}
                    >
                      {mark().numeral}
                    </span>
                    <span {...stylex.attrs(styles.labelText)}>{mark().label}</span>
                  </a>
                </li>
              );
            }}
          </For>
        </ol>
        <div
          ref={strip}
          aria-hidden="true"
          onPointerDown={onPointerDown}
          onPointerMove={(event) => {
            if (scrubbing()) scrubTo(event.clientY);
          }}
          onPointerUp={endScrub}
          onPointerCancel={endScrub}
          {...stylex.attrs(styles.strip)}
        >
          <span {...stylex.attrs(styles.rail)} />
          <For each={marks()} keyed={false}>
            {(mark, index) => {
              const isArticle = () => mark().chapter < 0;
              const passed = () => hereIndex() >= 0 && index <= hereIndex();
              return (
                <span
                  style={{ transform: `translateY(${mark().at * stripHeight()}px)` }}
                  {...sxProps(
                    styles.tick,
                    isArticle() && styles.tickArticle,
                    passed() && (isArticle() ? styles.tickArticlePassed : styles.tickPassed),
                  )}
                >
                  <Show when={isArticle()}>
                    <span
                      {...sxProps(
                        styles.tickNumber,
                        labStyles.displayNumber,
                        expanded() && styles.tickNumberHidden,
                      )}
                    >
                      {mark().numeral}
                    </span>
                  </Show>
                </span>
              );
            }}
          </For>
          <m.span style={{ y: markerY }} {...stylex.attrs(styles.marker)}>
            <span {...stylex.attrs(styles.markerDot)} />
            <span {...stylex.attrs(styles.markerLine)} />
          </m.span>
        </div>
      </nav>
      <div ref={setFlowRef}>
        <ArticleFlow articles={articles()} sx={styles.flow} />
      </div>
    </TocPage>
  );
}
