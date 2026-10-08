import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  type MotionValue,
  m,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "motion/react";
import {
  type RefObject,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { ABOUT_HISTORY } from "./about-data";
import {
  type Helix,
  buildHelix,
  fractionAt,
  helixSignature,
  litCountAt,
  yearAt,
} from "./history-helix";
import { RiseReveal } from "./rise-reveal";

const INK = "#1a1a1a";
const BODY_TEXT = "#4d4d4d";
const PAGE = "#f3f5fa";
const MUTED_INK = "rgba(26, 26, 26, 0.22)";
const HAIRLINE = "rgba(26, 26, 26, 0.12)";
const BLUE_TRACK = "rgba(7, 67, 174, 0.16)";
const GREEN_TRACK = "rgba(100, 167, 51, 0.3)";
const BLUE_RING = "rgba(7, 67, 174, 0.38)";
const DISPLAY_FONT = '"Inter Tight", "Helvetica Neue", Arial, sans-serif';
const SERIF_ACCENT = '"Instrument Serif", Georgia, serif';
const EASE_OUT_CSS = "cubic-bezier(0.22, 1, 0.36, 1)";
const TABLET = "@media (min-width: 768px) and (max-width: 1279.98px)";
const DESKTOP = breakpoints.xl;
const INSET_124 = "min(124px, 8.611vw)";
const SHELL_EDGE = "max(0px, (100% - 1440px) / 2)";
const PIN_QUERY = "(min-width: 1024px) and (min-height: 760px)";
const PIN_SPRING = { stiffness: 260, damping: 40, restDelta: 0.0005 };
const END_SNAP = 0.995;

const MILESTONES = ABOUT_HISTORY.milestones;
const YEARS = MILESTONES.map((milestone) => milestone.year);
const FIRST_YEAR = YEARS[0];
const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"] as const;

const ripple = stylex.keyframes({
  "0%": { opacity: 0.8, transform: "scale(1)" },
  "100%": { opacity: 0, transform: "scale(3.2)" },
});

const dynamic = stylex.create({
  pinnedHeight: (top: number, distance: number) => ({
    height: `calc(100svh - ${top}px + ${distance}px)`,
  }),
  stickyPanel: (top: number) => ({
    top: `${top}px`,
    height: `calc(100svh - ${top}px)`,
  }),
  column: (start: number, span: number) => ({
    gridColumn: `${start} / span ${span}`,
  }),
  span: (count: number) => ({
    gridColumn: `1 / span ${count}`,
  }),
  delay: (ms: number) => ({
    transitionDelay: `${ms}ms`,
  }),
  digit: (value: number) => ({
    transform: `translateY(${value * -10}%)`,
  }),
});

const styles = stylex.create({
  section: {
    position: "relative",
  },
  panel: {
    boxSizing: "border-box",
    paddingBlock: { default: 72, [DESKTOP]: 128 },
  },
  panelPinned: {
    position: "sticky",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingBlock: "clamp(20px, 4svh, 48px)",
  },
  shell: {
    width: "100%",
    maxWidth: 1440,
    marginInline: "auto",
    boxSizing: "border-box",
    paddingInline: { default: 16, [TABLET]: 40, [DESKTOP]: INSET_124 },
  },

  header: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 24,
    marginBottom: { default: 28, [DESKTOP]: 40 },
  },
  eyebrow: {
    margin: 0,
    marginBottom: 12,
    fontFamily: DISPLAY_FONT,
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: colors.brandBlue700,
  },
  title: {
    margin: 0,
    fontSize: { default: 26, [TABLET]: 32, [DESKTOP]: 40 },
    fontWeight: 700,
    lineHeight: 1.2,
    color: INK,
  },
  caption: {
    margin: 0,
    marginTop: 12,
    fontSize: { default: 13, [breakpoints.md]: 14 },
    letterSpacing: "0.06em",
    color: BODY_TEXT,
  },

  odometer: {
    display: "flex",
    flexShrink: 0,
    fontFamily: DISPLAY_FONT,
    fontSize: { default: 52, [breakpoints.md]: 72, [breakpoints.lg]: 88, [DESKTOP]: 112 },
    fontWeight: 300,
    lineHeight: 1,
    letterSpacing: "-0.04em",
    fontVariantNumeric: "tabular-nums",
    color: INK,
  },
  digitWindow: {
    display: "block",
    height: "1em",
    overflow: "hidden",
  },
  digitFaint: {
    color: MUTED_INK,
  },
  digitStrip: {
    display: "flex",
    flexDirection: "column",
    transitionProperty: "transform",
    transitionDuration: { default: "0ms", [breakpoints.motionOk]: "650ms" },
    transitionTimingFunction: EASE_OUT_CSS,
  },

  viewport: {
    position: "relative",
  },
  viewportPinned: {
    overflowX: "clip",
    maskImage:
      "linear-gradient(to right, transparent 0, #000 32px, #000 calc(100% - 32px), transparent 100%)",
  },
  viewportFree: {
    overflowX: "auto",
    overflowY: "hidden",
    overscrollBehaviorX: "contain",
    scrollSnapType: "x proximity",
    scrollPaddingInline: { default: 16, [TABLET]: 40, [DESKTOP]: INSET_124 },
    scrollbarWidth: "none",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: -2,
  },
  track: {
    position: "relative",
    display: "grid",
    gridAutoColumns: { default: 200, [breakpoints.md]: 232, [breakpoints.lg]: 248, [DESKTOP]: 280 },
    gridTemplateRows: { default: "auto 48px auto", [breakpoints.lg]: "auto 56px auto" },
    width: "max-content",
    paddingInline: {
      default: `calc(${SHELL_EDGE} + 16px)`,
      [TABLET]: `calc(${SHELL_EDGE} + 40px)`,
      [DESKTOP]: `calc(${SHELL_EDGE} + ${INSET_124})`,
    },
    willChange: "transform",
  },
  list: {
    display: "contents",
  },
  helixRow: {
    position: "relative",
    zIndex: 1,
    gridRow: 2,
    pointerEvents: "none",
  },
  svg: {
    position: "absolute",
    top: 0,
    left: 0,
    display: "block",
    overflow: "visible",
  },

  item: {
    position: "relative",
    display: "flex",
    gap: 14,
    boxSizing: "border-box",
    paddingInlineStart: { default: 16, [breakpoints.md]: 20 },
    paddingInlineEnd: 24,
    scrollSnapAlign: "start",
  },
  itemLast: {
    justifySelf: "start",
    width: "max-content",
  },
  itemAbove: {
    gridRow: 1,
    alignSelf: "end",
    flexDirection: "column-reverse",
    paddingBottom: { default: 14, [breakpoints.lg]: 18 },
  },
  itemBelow: {
    gridRow: 3,
    alignSelf: "start",
    flexDirection: "column",
    paddingTop: { default: 14, [breakpoints.lg]: 18 },
  },
  pole: {
    position: "absolute",
    insetInlineStart: 0,
    width: 1,
  },
  poleAbove: {
    top: 0,
    bottom: { default: -24, [breakpoints.lg]: -28 },
  },
  poleBelow: {
    top: { default: -24, [breakpoints.lg]: -28 },
    bottom: 0,
  },
  poleBase: {
    backgroundColor: HAIRLINE,
  },
  poleFill: {
    opacity: 0,
    transform: { default: null, [breakpoints.motionOk]: "scaleY(0)" },
    transitionProperty: "opacity, transform",
    transitionDuration: "700ms",
    transitionTimingFunction: EASE_OUT_CSS,
  },
  poleFillAbove: {
    transformOrigin: "bottom",
    backgroundImage: `linear-gradient(to top, ${colors.brandBlue700}, rgba(7, 67, 174, 0))`,
  },
  poleFillBelow: {
    transformOrigin: "top",
    backgroundImage: `linear-gradient(to bottom, ${colors.brandBlue700}, rgba(7, 67, 174, 0))`,
  },
  poleFillLit: {
    opacity: 1,
    transform: "none",
  },

  year: {
    display: "flex",
    alignItems: "baseline",
    gap: 10,
    margin: 0,
    fontFamily: DISPLAY_FONT,
    fontSize: { default: 30, [breakpoints.md]: 34, [DESKTOP]: 40 },
    fontWeight: 500,
    lineHeight: 1,
    letterSpacing: "-0.02em",
    fontVariantNumeric: "tabular-nums",
    color: MUTED_INK,
    transitionProperty: "color",
    transitionDuration: "500ms",
    transitionTimingFunction: EASE_OUT_CSS,
  },
  yearLit: {
    color: INK,
  },
  yearActive: {
    color: colors.brandBlue700,
  },
  kicker: {
    fontFamily: SERIF_ACCENT,
    fontSize: { default: 18, [DESKTOP]: 22 },
    fontStyle: "italic",
    fontWeight: 400,
    letterSpacing: 0,
    color: BODY_TEXT,
  },
  events: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    maxWidth: "23em",
    margin: 0,
    padding: 0,
    listStyle: "none",
    fontSize: { default: 14, [DESKTOP]: 15 },
    lineHeight: 1.65,
    letterSpacing: "0.04em",
    color: BODY_TEXT,
    textWrap: "pretty",
  },
  event: {
    opacity: 0.3,
    transitionProperty: "opacity, transform",
    transitionDuration: "700ms",
    transitionTimingFunction: EASE_OUT_CSS,
  },
  eventAbove: {
    transform: { default: null, [breakpoints.motionOk]: "translateY(10px)" },
  },
  eventBelow: {
    transform: { default: null, [breakpoints.motionOk]: "translateY(-10px)" },
  },
  eventLit: {
    opacity: 1,
    transform: "none",
  },
  entity: {
    fontFamily: DISPLAY_FONT,
    fontWeight: 600,
    letterSpacing: "0.01em",
    color: INK,
  },

  strandTrack: {
    fill: "none",
    strokeWidth: 1,
  },
  trackBlue: {
    stroke: BLUE_TRACK,
  },
  trackMint: {
    stroke: GREEN_TRACK,
  },
  strand: {
    fill: "none",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  },
  strandBlue: {
    stroke: colors.brandBlue700,
  },
  strandMint: {
    stroke: colors.brandGreen500,
  },
  nodeRing: {
    fill: PAGE,
    stroke: BLUE_RING,
    strokeWidth: 1.25,
    transitionProperty: "stroke",
    transitionDuration: "300ms",
  },
  nodeRingLit: {
    stroke: colors.brandBlue700,
  },
  nodeCore: {
    fill: colors.brandBlue700,
    opacity: 0,
    transitionProperty: "opacity",
    transitionDuration: "300ms",
  },
  nodeCoreLit: {
    opacity: 1,
  },
  nodeHalo: {
    fill: "none",
    stroke: colors.brandGreen500,
    strokeWidth: 1,
    opacity: 0,
    transformBox: "fill-box",
    transformOrigin: "center",
    transform: { default: null, [breakpoints.motionOk]: "scale(0.6)" },
    transitionProperty: "opacity, transform",
    transitionDuration: "500ms",
    transitionTimingFunction: EASE_OUT_CSS,
  },
  nodeHaloActive: {
    opacity: 0.7,
    transform: "none",
  },
  ripple: {
    fill: "none",
    stroke: colors.brandBlue700,
    strokeWidth: 1,
    opacity: 0,
    transformBox: "fill-box",
    transformOrigin: "center",
  },
  rippleLit: {
    animationName: { default: null, [breakpoints.motionOk]: ripple },
    animationDuration: "1100ms",
    animationTimingFunction: EASE_OUT_CSS,
  },

  controls: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 8,
    marginTop: { default: 24, [DESKTOP]: 36 },
  },
  controlButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: { default: 44, [breakpoints.lg]: 40 },
    height: { default: 44, [breakpoints.lg]: 40 },
    padding: 0,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: HAIRLINE,
    borderRadius: "50%",
    backgroundColor: { default: "transparent", ":hover": colors.paper },
    color: INK,
    cursor: { default: "pointer", ":disabled": "default" },
    opacity: { default: 1, ":disabled": 0.35 },
    transform: {
      default: null,
      ":active": { default: null, [breakpoints.motionOk]: "scale(0.96)" },
    },
    transitionProperty: "background-color, opacity, transform",
    transitionDuration: "160ms",
    transitionTimingFunction: EASE_OUT_CSS,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 2,
  },
});

function subscribePin(onChange: () => void) {
  const query = window.matchMedia(PIN_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function usePinnable() {
  return useSyncExternalStore(
    subscribePin,
    () => window.matchMedia(PIN_QUERY).matches,
    () => false,
  );
}

function Odometer({ year }: { year: MotionValue<number> }) {
  const [value, setValue] = useState(() => year.get());
  useMotionValueEvent(year, "change", setValue);
  const digits = String(value).split("").map(Number);

  return (
    <span aria-hidden="true" {...stylex.props(styles.odometer)}>
      {digits.map((digit, place) => (
        <span key={place} {...stylex.props(styles.digitWindow, place < 2 && styles.digitFaint)}>
          <span {...stylex.props(styles.digitStrip, dynamic.digit(digit))}>
            {DIGITS.map((glyph) => (
              <span key={glyph}>{glyph}</span>
            ))}
          </span>
        </span>
      ))}
    </span>
  );
}

function HelixGraphic({
  helix,
  draw,
  lit,
}: {
  helix: Helix;
  draw: MotionValue<number>;
  lit: number;
}) {
  const fadeId = `${useId().replaceAll(":", "")}-fade`;
  const lastX = helix.nodes[helix.nodes.length - 1].x;
  const cy = helix.height / 2;

  return (
    <svg
      width={helix.width}
      height={helix.height}
      viewBox={`0 0 ${helix.width} ${helix.height}`}
      focusable="false"
      {...stylex.props(styles.svg)}
    >
      <defs>
        <linearGradient
          id={`${fadeId}-ramp`}
          gradientUnits="userSpaceOnUse"
          x1={lastX}
          x2={helix.width}
        >
          <stop offset="0" stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id={fadeId} maskUnits="userSpaceOnUse">
          <rect
            x={0}
            y={-8}
            width={helix.width}
            height={helix.height + 16}
            fill={`url(#${fadeId}-ramp)`}
          />
        </mask>
      </defs>
      <g mask={`url(#${fadeId})`}>
        <path d={helix.strandB} {...stylex.props(styles.strandTrack, styles.trackMint)} />
        <path d={helix.strandA} {...stylex.props(styles.strandTrack, styles.trackBlue)} />
      </g>
      <m.path
        d={helix.strandB}
        {...stylex.props(styles.strand, styles.strandMint)}
        style={{ pathLength: draw }}
      />
      <m.path
        d={helix.strandA}
        {...stylex.props(styles.strand, styles.strandBlue)}
        style={{ pathLength: draw }}
      />
      {helix.nodes.map((node, index) => {
        const isLit = index < lit;
        const isActive = index === lit - 1;
        return (
          <g key={YEARS[index]}>
            <circle
              cx={node.x}
              cy={cy}
              r={helix.radius + 4.5}
              {...stylex.props(styles.nodeHalo, isActive && styles.nodeHaloActive)}
            />
            <circle
              cx={node.x}
              cy={cy}
              r={helix.radius}
              {...stylex.props(styles.ripple, isLit && styles.rippleLit)}
            />
            <circle
              cx={node.x}
              cy={cy}
              r={helix.radius}
              {...stylex.props(styles.nodeRing, isLit && styles.nodeRingLit)}
            />
            <circle
              cx={node.x}
              cy={cy}
              r={helix.radius - 2.25}
              {...stylex.props(styles.nodeCore, isLit && styles.nodeCoreLit)}
            />
          </g>
        );
      })}
    </svg>
  );
}

type Geometry = {
  helix: Helix;
  nodeXs: readonly number[];
  distance: number;
  step: number;
};

function useGeometry(
  trackRef: RefObject<HTMLDivElement | null>,
  helixRowRef: RefObject<HTMLDivElement | null>,
  viewportRef: RefObject<HTMLDivElement | null>,
) {
  const [geometry, setGeometry] = useState<Geometry | null>(null);
  const signatureRef = useRef("");

  useEffect(() => {
    const track = trackRef.current;
    const helixRow = helixRowRef.current;
    const viewport = viewportRef.current;
    if (!track || !helixRow || !viewport) return;
    let frame = 0;

    const measure = () => {
      frame = 0;
      const origin = helixRow.offsetLeft;
      const nodeXs = Array.from(
        track.querySelectorAll<HTMLElement>("[data-history-node]"),
        (node) => node.offsetLeft - origin,
      );
      const input = {
        nodeXs,
        years: YEARS,
        tailX: helixRow.offsetWidth,
        height: helixRow.offsetHeight,
      };
      const width = Math.max(track.offsetWidth, track.scrollWidth);
      const distance = Math.max(0, Math.round(width - viewport.clientWidth));
      const signature = `${helixSignature(input)}|${distance}`;
      if (signature === signatureRef.current) return;
      signatureRef.current = signature;
      const helix = buildHelix(input);
      setGeometry(helix ? { helix, nodeXs, distance, step: nodeXs[1] - nodeXs[0] } : null);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    schedule();
    const observer = new ResizeObserver(schedule);
    observer.observe(track);
    observer.observe(viewport);
    void document.fonts?.ready.then(schedule);
    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [trackRef, helixRowRef, viewportRef]);

  return geometry;
}

export function HistoryTimeline({
  stickyTop,
  sx,
}: {
  stickyTop: number;
  sx?: stylex.StyleXStyles;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const helixRowRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const pinned = usePinnable() && !reduce;
  const geometry = useGeometry(trackRef, helixRowRef, viewportRef);

  const x = useMotionValue(0);
  const draw = useMotionValue(0);
  const year = useMotionValue<number>(FIRST_YEAR);
  const [lit, setLit] = useState(1);
  const [edges, setEdges] = useState({ start: true, end: false });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: [`start ${stickyTop}px`, "end end"],
  });
  const pinnedProgress = useSpring(scrollYProgress, PIN_SPRING);
  const { scrollXProgress } = useScroll({ container: viewportRef });

  const sync = useCallback(() => {
    if (!geometry) return;
    const raw = pinned ? pinnedProgress.get() : scrollXProgress.get();
    const p = raw >= END_SNAP ? 1 : Math.max(0, raw);
    const { helix, nodeXs, distance } = geometry;
    const first = nodeXs[0];
    const tip = first + p * (nodeXs[nodeXs.length - 1] - first);

    x.set(pinned ? -p * distance : 0);
    draw.set(reduce ? 1 : fractionAt(helix, tip));
    year.set(yearAt(nodeXs, YEARS, tip));
    setLit(reduce ? MILESTONES.length : litCountAt(nodeXs, tip));
    setEdges((current) => {
      const next = { start: p <= 0.001, end: p >= 1 };
      return current.start === next.start && current.end === next.end ? current : next;
    });
  }, [draw, geometry, pinned, pinnedProgress, reduce, scrollXProgress, x, year]);

  useMotionValueEvent(pinnedProgress, "change", () => {
    if (pinned) sync();
  });
  useMotionValueEvent(scrollXProgress, "change", () => {
    if (!pinned) sync();
  });
  useEffect(sync, [sync]);

  const stepBy = (direction: number) => {
    const viewport = viewportRef.current;
    if (!viewport || !geometry) return;
    viewport.scrollBy({
      left: direction * geometry.step * 2,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      id={ABOUT_HISTORY.navChip.id}
      aria-labelledby="about-history-title"
      {...stylex.props(
        styles.section,
        pinned && geometry && dynamic.pinnedHeight(stickyTop, geometry.distance),
        sx,
      )}
    >
      <div
        {...stylex.props(
          styles.panel,
          pinned && styles.panelPinned,
          pinned && dynamic.stickyPanel(stickyTop),
        )}
      >
        <div {...stylex.props(styles.shell, styles.header)}>
          <RiseReveal>
            <p lang="en" {...stylex.props(styles.eyebrow)}>
              {ABOUT_HISTORY.eyebrow}
            </p>
            <h2 id="about-history-title" {...stylex.props(styles.title)}>
              {ABOUT_HISTORY.title}
            </h2>
            <p {...stylex.props(styles.caption)}>{ABOUT_HISTORY.caption}</p>
          </RiseReveal>
          <Odometer year={year} />
        </div>

        <div
          ref={viewportRef}
          role={pinned ? undefined : "region"}
          aria-label={pinned ? undefined : `${ABOUT_HISTORY.title}，可左右滚动`}
          tabIndex={pinned ? undefined : 0}
          {...stylex.props(styles.viewport, pinned ? styles.viewportPinned : styles.viewportFree)}
        >
          <m.div ref={trackRef} {...stylex.props(styles.track)} style={{ x }}>
            <div
              ref={helixRowRef}
              aria-hidden="true"
              {...stylex.props(styles.helixRow, dynamic.span(MILESTONES.length))}
            >
              {geometry ? <HelixGraphic helix={geometry.helix} draw={draw} lit={lit} /> : null}
            </div>
            <ol {...stylex.props(styles.list)}>
              {MILESTONES.map((milestone, index) => {
                const above = index % 2 === 0;
                const isLast = index === MILESTONES.length - 1;
                const isLit = index < lit;
                return (
                  <li
                    key={milestone.year}
                    data-history-node=""
                    {...stylex.props(
                      styles.item,
                      above ? styles.itemAbove : styles.itemBelow,
                      isLast && styles.itemLast,
                      dynamic.column(index + 1, isLast ? 1 : 2),
                    )}
                  >
                    <span
                      aria-hidden="true"
                      {...stylex.props(
                        styles.pole,
                        above ? styles.poleAbove : styles.poleBelow,
                        styles.poleBase,
                      )}
                    />
                    <span
                      aria-hidden="true"
                      {...stylex.props(
                        styles.pole,
                        above ? styles.poleAbove : styles.poleBelow,
                        styles.poleFill,
                        above ? styles.poleFillAbove : styles.poleFillBelow,
                        isLit && styles.poleFillLit,
                      )}
                    />
                    <h3
                      {...stylex.props(
                        styles.year,
                        isLit && styles.yearLit,
                        index === lit - 1 && styles.yearActive,
                      )}
                    >
                      {milestone.year}
                      {"kicker" in milestone ? (
                        <span lang="en" {...stylex.props(styles.kicker)}>
                          {milestone.kicker}
                        </span>
                      ) : null}
                    </h3>
                    <ul {...stylex.props(styles.events)}>
                      {milestone.events.map((event, eventIndex) => (
                        <li
                          key={event.text}
                          {...stylex.props(
                            styles.event,
                            above ? styles.eventAbove : styles.eventBelow,
                            isLit && styles.eventLit,
                            dynamic.delay(isLit ? 120 + eventIndex * 70 : 0),
                          )}
                        >
                          {"entity" in event ? (
                            <>
                              <span lang="en" {...stylex.props(styles.entity)}>
                                {event.entity}
                              </span>{" "}
                            </>
                          ) : null}
                          {event.text}
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ol>
          </m.div>
        </div>

        {pinned ? null : (
          <div {...stylex.props(styles.shell, styles.controls)}>
            <button
              type="button"
              aria-label="上一段历程"
              disabled={edges.start}
              onClick={() => stepBy(-1)}
              {...stylex.props(styles.controlButton)}
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="下一段历程"
              disabled={edges.end}
              onClick={() => stepBy(1)}
              {...stylex.props(styles.controlButton)}
            >
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
