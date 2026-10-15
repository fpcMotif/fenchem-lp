import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { m, useMotionValue } from "motion/react";
import { useEffect, useRef, useState, type PointerEvent, type RefObject } from "react";

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

function useFlowMarks(flowRef: RefObject<HTMLDivElement | null>, articles: readonly LabArticle[]) {
  const [marks, setMarks] = useState<Mark[]>([]);
  const box = useRef<FlowBox>({ top: 0, height: 1 });

  useEffect(() => {
    const flow = flowRef.current;
    if (!flow) return;
    const measure = () => {
      const flowBox = flow.getBoundingClientRect();
      const top = flowBox.top + window.scrollY;
      const height = Math.max(1, flowBox.height);
      box.current = { top, height };
      const at = (id: string) => {
        const element = document.getElementById(id);
        return element ? (element.getBoundingClientRect().top + window.scrollY - top) / height : 0;
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
  }, [flowRef, articles]);

  return { marks, box };
}

export function SpineVariant({ onNavigateHome }: SubPageProps) {
  const articles = useLabArticles();
  const { position } = useReadingPosition(articles, READING_LINE);
  const flowRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const { marks, box } = useFlowMarks(flowRef, articles);
  const [stripHeight, setStripHeight] = useState(0);
  const [shown, setShown] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [scrubbing, setScrubbing] = useState(false);
  const [lingering, setLingering] = useState(false);
  const markerY = useMotionValue(0);
  const lastScrub = useRef(-1);
  const linger = useRef(0);
  const expanded = hovered || focused || scrubbing || lingering;

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const observer = new ResizeObserver(() => setStripHeight(strip.clientHeight));
    observer.observe(strip);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const { top, height } = box.current;
      const reading = window.scrollY + READING_LINE - top;
      markerY.set(Math.min(1, Math.max(0, reading / height)) * stripHeight);
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
  }, [box, markerY, stripHeight, marks]);

  useEffect(() => () => window.clearTimeout(linger.current), []);

  const hereIndex = marks.findIndex(
    (mark) => mark.article === position.article && mark.chapter === position.chapter,
  );
  const placed = placeLabels(marks, stripHeight);

  const scrubTo = (clientY: number) => {
    const strip = stripRef.current;
    if (!strip || marks.length === 0) return;
    const y = clientY - strip.getBoundingClientRect().top;
    let nearest = 0;
    marks.forEach((mark, index) => {
      const best = marks[nearest];
      if (best && Math.abs(mark.at * stripHeight - y) < Math.abs(best.at * stripHeight - y))
        nearest = index;
    });
    if (nearest === lastScrub.current) return;
    lastScrub.current = nearest;
    const target = marks[nearest];
    if (target)
      document.getElementById(target.id)?.scrollIntoView({ block: "start", behavior: "instant" });
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    window.clearTimeout(linger.current);
    setLingering(false);
    setScrubbing(true);
    lastScrub.current = -1;
    scrubTo(event.clientY);
  };

  const endScrub = (event: PointerEvent<HTMLDivElement>) => {
    if (!scrubbing) return;
    event.currentTarget.releasePointerCapture(event.pointerId);
    setScrubbing(false);
    if (event.pointerType !== "mouse") {
      setLingering(true);
      linger.current = window.setTimeout(() => setLingering(false), LINGER_MS);
    }
  };

  return (
    <TocPage onNavigateHome={onNavigateHome}>
      <nav
        aria-label="本页目录"
        data-expanded={expanded ? "" : undefined}
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") setHovered(true);
        }}
        onPointerLeave={(event) => {
          if (event.pointerType === "mouse") setHovered(false);
        }}
        onFocus={() => setFocused(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
        }}
        {...stylex.props(styles.spine, (shown || focused) && styles.spineShown)}
      >
        <div aria-hidden="true" {...stylex.props(styles.sheet, expanded && styles.expanded)} />
        <ol {...stylex.props(styles.labels, expanded && styles.expanded)}>
          {marks.map((mark, index) => {
            const isArticle = mark.chapter < 0;
            return (
              <li
                key={mark.id}
                style={{ transform: `translateY(${placed[index] ?? 0}px)` }}
                {...stylex.props(styles.labelItem)}
              >
                <a
                  href={`#${mark.id}`}
                  aria-current={index === hereIndex ? "location" : undefined}
                  onClick={(event) => {
                    event.currentTarget.blur();
                    setHovered(false);
                    setLingering(false);
                  }}
                  {...stylex.props(
                    styles.label,
                    isArticle ? styles.labelArticle : styles.labelChapter,
                    index < hereIndex && styles.labelPassed,
                    index === hereIndex && styles.labelHere,
                  )}
                >
                  <span
                    {...stylex.props(
                      styles.labelNumeral,
                      isArticle && labStyles.displayNumber,
                      isArticle && styles.labelArticleNumeral,
                    )}
                  >
                    {mark.numeral}
                  </span>
                  <span {...stylex.props(styles.labelText)}>{mark.label}</span>
                </a>
              </li>
            );
          })}
        </ol>
        <div
          ref={stripRef}
          aria-hidden="true"
          onPointerDown={onPointerDown}
          onPointerMove={(event) => {
            if (scrubbing) scrubTo(event.clientY);
          }}
          onPointerUp={endScrub}
          onPointerCancel={endScrub}
          {...stylex.props(styles.strip)}
        >
          <span {...stylex.props(styles.rail)} />
          {marks.map((mark, index) => {
            const isArticle = mark.chapter < 0;
            const passed = hereIndex >= 0 && index <= hereIndex;
            return (
              <span
                key={mark.id}
                style={{ transform: `translateY(${mark.at * stripHeight}px)` }}
                {...stylex.props(
                  styles.tick,
                  isArticle && styles.tickArticle,
                  passed && (isArticle ? styles.tickArticlePassed : styles.tickPassed),
                )}
              >
                {isArticle ? (
                  <span
                    {...stylex.props(
                      styles.tickNumber,
                      labStyles.displayNumber,
                      expanded && styles.tickNumberHidden,
                    )}
                  >
                    {mark.numeral}
                  </span>
                ) : null}
              </span>
            );
          })}
          <m.span style={{ y: markerY }} {...stylex.props(styles.marker)}>
            <span {...stylex.props(styles.markerDot)} />
            <span {...stylex.props(styles.markerLine)} />
          </m.span>
        </div>
      </nav>
      <div ref={flowRef}>
        <ArticleFlow articles={articles} sx={styles.flow} />
      </div>
    </TocPage>
  );
}
