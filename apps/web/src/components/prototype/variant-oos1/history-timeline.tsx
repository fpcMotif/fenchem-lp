import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ChevronLeft, ChevronRight } from "@fenchem-lp/ui/components/lucide";
import {
  type MotionValue,
  m,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "@/compat/motion";
import {
  createEffect,
  createSignal,
  createUniqueId,
  For,
  onSettled,
  Show,
  untrack,
} from "solid-js";

import { createExternalStore } from "@/compat/external-store";
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
import { color, ease, font, layout, media } from "./tokens.stylex";

const PAGE = "#f3f5fa";
const MUTED_INK = "rgba(26, 26, 26, 0.22)";
const HAIRLINE = "rgba(26, 26, 26, 0.12)";
const CONTROL_EDGE = "rgba(26, 26, 26, 0.28)";
const BLUE_TRACK = "rgba(7, 67, 174, 0.16)";
const GREEN_TRACK = "rgba(100, 167, 51, 0.3)";
const BLUE_RING = "rgba(7, 67, 174, 0.38)";
const DESKTOP = "@media (min-width: 1280px)";
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

// stylex.attrs with reactive (accessor) arguments resolves at runtime here, because
// the StyleX compiler tries to evaluate them at build time and throws.
const sxProps: typeof stylex.attrs = (...args) => stylex.attrs(...args);

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
    paddingInline: { default: 16, [media.tablet]: 40, [DESKTOP]: layout.inset120 },
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
    fontFamily: font.display,
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: colors.brandBlue700,
  },
  title: {
    margin: 0,
    fontSize: { default: 26, [media.tablet]: 32, [DESKTOP]: 40 },
    fontWeight: 700,
    lineHeight: 1.2,
    color: color.ink,
  },
  caption: {
    margin: 0,
    marginTop: 12,
    fontSize: { default: 13, ["@media (min-width: 768px)"]: 14 },
    letterSpacing: "0.06em",
    color: color.bodyText,
  },

  odometer: {
    display: "flex",
    flexShrink: 0,
    fontFamily: font.display,
    fontSize: {
      default: 52,
      ["@media (min-width: 768px)"]: 72,
      ["@media (min-width: 1024px)"]: 88,
      [DESKTOP]: 112,
    },
    fontWeight: 300,
    lineHeight: 1,
    letterSpacing: "-0.04em",
    fontVariantNumeric: "tabular-nums",
    color: color.ink,
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
    transitionDuration: {
      default: "0ms",
      ["@media (prefers-reduced-motion: no-preference)"]: "650ms",
    },
    transitionTimingFunction: ease.out,
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
    maskImage:
      "linear-gradient(to right, transparent 0, #000 32px, #000 calc(100% - 96px), transparent 100%)",
    overflowX: "auto",
    overflowY: "hidden",
    overscrollBehaviorX: "contain",
    scrollSnapType: "x proximity",
    scrollPaddingInline: { default: 16, [media.tablet]: 40, [DESKTOP]: layout.inset120 },
    scrollbarWidth: "none",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: -2,
  },
  track: {
    position: "relative",
    display: "grid",
    gridAutoColumns: {
      default: 200,
      ["@media (min-width: 768px)"]: 232,
      ["@media (min-width: 1024px)"]: 248,
      [DESKTOP]: 280,
    },
    gridTemplateRows: {
      default: "auto 48px auto",
      ["@media (min-width: 1024px)"]: "auto 56px auto",
    },
    width: "max-content",
    paddingInline: {
      default: `calc(${SHELL_EDGE} + 16px)`,
      [media.tablet]: `calc(${SHELL_EDGE} + 40px)`,
      [DESKTOP]: `calc(${SHELL_EDGE} + ${layout.inset120})`,
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
    paddingInlineStart: { default: 16, ["@media (min-width: 768px)"]: 20 },
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
    paddingBottom: { default: 14, ["@media (min-width: 1024px)"]: 18 },
  },
  itemBelow: {
    gridRow: 3,
    alignSelf: "start",
    flexDirection: "column",
    paddingTop: { default: 14, ["@media (min-width: 1024px)"]: 18 },
  },
  pole: {
    position: "absolute",
    insetInlineStart: 0,
    width: 1,
  },
  poleAbove: {
    top: 0,
    bottom: { default: -24, ["@media (min-width: 1024px)"]: -28 },
  },
  poleBelow: {
    top: { default: -24, ["@media (min-width: 1024px)"]: -28 },
    bottom: 0,
  },
  poleBase: {
    backgroundColor: HAIRLINE,
  },
  poleFill: {
    opacity: 0,
    transform: { default: null, ["@media (prefers-reduced-motion: no-preference)"]: "scaleY(0)" },
    transitionProperty: "opacity, transform",
    transitionDuration: "700ms",
    transitionTimingFunction: ease.out,
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
    fontFamily: font.display,
    fontSize: { default: 30, ["@media (min-width: 768px)"]: 34, [DESKTOP]: 40 },
    fontWeight: 500,
    lineHeight: 1,
    letterSpacing: "-0.02em",
    fontVariantNumeric: "tabular-nums",
    color: MUTED_INK,
    transitionProperty: "color",
    transitionDuration: "500ms",
    transitionTimingFunction: ease.out,
  },
  yearLit: {
    color: color.ink,
  },
  yearActive: {
    color: colors.brandBlue700,
  },
  kicker: {
    fontFamily: font.serifAccent,
    fontSize: { default: 18, [DESKTOP]: 22 },
    fontStyle: "italic",
    fontWeight: 400,
    letterSpacing: 0,
    color: color.bodyText,
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
    color: color.bodyText,
    textWrap: "pretty",
  },
  event: {
    opacity: 0.3,
    transitionProperty: "opacity, transform",
    transitionDuration: "700ms",
    transitionTimingFunction: ease.out,
  },
  eventAbove: {
    transform: {
      default: null,
      ["@media (prefers-reduced-motion: no-preference)"]: "translateY(10px)",
    },
  },
  eventBelow: {
    transform: {
      default: null,
      ["@media (prefers-reduced-motion: no-preference)"]: "translateY(-10px)",
    },
  },
  eventLit: {
    opacity: 1,
    transform: "none",
  },
  entity: {
    fontFamily: font.display,
    fontWeight: 600,
    letterSpacing: "0.01em",
    color: color.ink,
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
    transform: { default: null, ["@media (prefers-reduced-motion: no-preference)"]: "scale(0.6)" },
    transitionProperty: "opacity, transform",
    transitionDuration: "500ms",
    transitionTimingFunction: ease.out,
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
    animationName: { default: null, ["@media (prefers-reduced-motion: no-preference)"]: ripple },
    animationDuration: "1100ms",
    animationTimingFunction: ease.out,
  },

  controls: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 8,
    marginTop: { default: 16, [DESKTOP]: 20 },
  },
  controlButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 44,
    height: 44,
    padding: 0,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: CONTROL_EDGE,
    borderRadius: "50%",
    backgroundColor: { default: "transparent", ":hover": colors.paper },
    color: color.ink,
    cursor: { default: "pointer", ":disabled": "default" },
    opacity: { default: 1, ":disabled": 0.35 },
    transform: {
      default: null,
      ":active": {
        default: null,
        ["@media (prefers-reduced-motion: no-preference)"]: "scale(0.96)",
      },
    },
    transitionProperty: "background-color, opacity, transform",
    transitionDuration: "160ms",
    transitionTimingFunction: ease.out,
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
  return createExternalStore(
    subscribePin,
    () => window.matchMedia(PIN_QUERY).matches,
    () => false,
  );
}

const PINNED_MIN_PADDING = 20;

function useFitsPinned(
  header: () => HTMLDivElement | undefined,
  viewport: () => HTMLDivElement | undefined,
  stickyTop: () => number,
) {
  const [fits, setFits] = createSignal(true);
  createEffect(stickyTop, (top) => {
    const headerEl = header();
    const viewportEl = viewport();
    if (!headerEl || !viewportEl) return;
    const measure = () => {
      const span = viewportEl.getBoundingClientRect().bottom - headerEl.getBoundingClientRect().top;
      const room = window.innerHeight - top - 2 * PINNED_MIN_PADDING;
      setFits(span <= room);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(headerEl);
    observer.observe(viewportEl);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  });
  return fits;
}

function Odometer(props: { year: MotionValue<number> }) {
  const [value, setValue] = createSignal(untrack(() => props.year.get()));
  useMotionValueEvent(props.year, "change", (next) => setValue(next));
  const digits = () => String(value()).split("").map(Number);

  return (
    <span aria-hidden="true" {...stylex.attrs(styles.odometer)}>
      <For each={digits()} keyed={false}>
        {(digit, place) => (
          <span {...stylex.attrs(styles.digitWindow, place < 2 && styles.digitFaint)}>
            <span {...stylex.attrs(styles.digitStrip, dynamic.digit(digit()))}>
              {DIGITS.map((glyph) => (
                <span>{glyph}</span>
              ))}
            </span>
          </span>
        )}
      </For>
    </span>
  );
}

function HelixGraphic(props: { helix: Helix; draw: MotionValue<number>; lit: number }) {
  const fadeId = `${createUniqueId().replaceAll(":", "")}-fade`;
  const lastX = () => props.helix.nodes[props.helix.nodes.length - 1].x;
  const cy = () => props.helix.height / 2;

  return (
    <svg
      width={props.helix.width}
      height={props.helix.height}
      viewBox={`0 0 ${props.helix.width} ${props.helix.height}`}
      {...{ focusable: "false" }}
      {...stylex.attrs(styles.svg)}
    >
      <defs>
        <linearGradient
          id={`${fadeId}-ramp`}
          gradientUnits="userSpaceOnUse"
          x1={lastX()}
          x2={props.helix.width}
        >
          <stop offset="0" stop-color="#fff" />
          <stop offset="1" stop-color="#fff" stop-opacity="0" />
        </linearGradient>
        <mask id={fadeId} maskUnits="userSpaceOnUse">
          <rect
            x={0}
            y={-8}
            width={props.helix.width}
            height={props.helix.height + 16}
            fill={`url(#${fadeId}-ramp)`}
          />
        </mask>
      </defs>
      <g mask={`url(#${fadeId})`}>
        <path d={props.helix.strandB} {...stylex.attrs(styles.strandTrack, styles.trackMint)} />
        <path d={props.helix.strandA} {...stylex.attrs(styles.strandTrack, styles.trackBlue)} />
      </g>
      <m.path
        d={props.helix.strandB}
        {...stylex.attrs(styles.strand, styles.strandMint)}
        style={{ pathLength: props.draw }}
      />
      <m.path
        d={props.helix.strandA}
        {...stylex.attrs(styles.strand, styles.strandBlue)}
        style={{ pathLength: props.draw }}
      />
      <For each={props.helix.nodes}>
        {(node, index) => {
          const isLit = () => index() < props.lit;
          const isActive = () => index() === props.lit - 1;
          return (
            <g>
              <circle
                cx={node.x}
                cy={cy()}
                r={props.helix.radius + 4.5}
                {...stylex.attrs(styles.nodeHalo, isActive() && styles.nodeHaloActive)}
              />
              <circle
                cx={node.x}
                cy={cy()}
                r={props.helix.radius}
                {...stylex.attrs(styles.ripple, isLit() && styles.rippleLit)}
              />
              <circle
                cx={node.x}
                cy={cy()}
                r={props.helix.radius}
                {...stylex.attrs(styles.nodeRing, isLit() && styles.nodeRingLit)}
              />
              <circle
                cx={node.x}
                cy={cy()}
                r={props.helix.radius - 2.25}
                {...stylex.attrs(styles.nodeCore, isLit() && styles.nodeCoreLit)}
              />
            </g>
          );
        }}
      </For>
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
  trackEl: () => HTMLElement | undefined,
  helixRowEl: () => HTMLDivElement | undefined,
  viewportEl: () => HTMLDivElement | undefined,
) {
  const [geometry, setGeometry] = createSignal<Geometry | null>(null);
  let signature = "";

  onSettled(() => {
    const track = trackEl();
    const helixRow = helixRowEl();
    const viewport = viewportEl();
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
      const next = `${helixSignature(input)}|${distance}`;
      if (next === signature) return;
      signature = next;
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
  });

  return geometry;
}

export function HistoryTimeline(props: {
  stickyTop: number;
  sx?: stylex.StyleXStyles;
  plain?: boolean;
}) {
  let section: HTMLElement | undefined;
  let viewport: HTMLDivElement | undefined;
  let track: HTMLElement | undefined;
  let helixRow: HTMLDivElement | undefined;
  let header: HTMLDivElement | undefined;
  const reduce = useReducedMotion();
  const fitsPinned = useFitsPinned(
    () => header,
    () => viewport,
    () => props.stickyTop,
  );
  const pinnable = usePinnable();
  const pinned = () => pinnable() && !reduce() && fitsPinned();
  const geometry = useGeometry(
    () => track,
    () => helixRow,
    () => viewport,
  );
  const plain = () => props.plain ?? false;

  const x = useMotionValue(0);
  const draw = useMotionValue(0);
  const year = useMotionValue<number>(FIRST_YEAR);
  const [lit, setLit] = createSignal(1);
  const [edges, setEdges] = createSignal({ start: true, end: false });

  const { scrollYProgress } = useScroll({
    target: () => section,
    offset: [`start ${untrack(() => props.stickyTop)}px`, "end end"],
  });
  const pinnedProgress = useSpring(scrollYProgress, PIN_SPRING);
  const { scrollXProgress } = useScroll({ container: () => viewport });

  const sync = () => {
    const current = geometry();
    if (!current) return;
    const isPinned = pinned();
    const reduced = reduce();
    const raw = isPinned ? pinnedProgress.get() : scrollXProgress.get();
    const p = raw >= END_SNAP ? 1 : Math.max(0, raw);
    const { helix, nodeXs, distance } = current;
    const first = nodeXs[0];
    const tip = first + p * (nodeXs[nodeXs.length - 1] - first);

    x.set(isPinned ? -p * distance : 0);
    draw.set(reduced ? 1 : fractionAt(helix, tip));
    year.set(yearAt(nodeXs, YEARS, tip));
    setLit(reduced ? MILESTONES.length : litCountAt(nodeXs, tip));
    setEdges((previous) => {
      const next = { start: p <= 0.001, end: p >= 1 };
      return previous.start === next.start && previous.end === next.end ? previous : next;
    });
  };

  useMotionValueEvent(pinnedProgress, "change", () => {
    if (untrack(pinned)) untrack(sync);
  });
  useMotionValueEvent(scrollXProgress, "change", () => {
    if (!untrack(pinned)) untrack(sync);
  });
  createEffect(
    () => [geometry(), pinned(), reduce()] as const,
    () => {
      const frame = requestAnimationFrame(() => untrack(sync));
      return () => cancelAnimationFrame(frame);
    },
  );

  const stepBy = (direction: number) => {
    const current = geometry();
    if (!viewport || !current) return;
    viewport.scrollBy({
      left: direction * current.step * 2,
      behavior: reduce() ? "auto" : "smooth",
    });
  };

  return (
    <section
      ref={section}
      id={ABOUT_HISTORY.navChip.id}
      aria-labelledby="about-history-title"
      {...sxProps(
        styles.section,
        pinned() &&
          geometry() !== null &&
          dynamic.pinnedHeight(props.stickyTop, geometry()?.distance ?? 0),
        props.sx,
      )}
    >
      <div
        {...stylex.attrs(
          styles.panel,
          pinned() && styles.panelPinned,
          pinned() && dynamic.stickyPanel(props.stickyTop),
        )}
      >
        <div ref={header} {...stylex.attrs(styles.shell, styles.header)}>
          <RiseReveal>
            {plain() ? null : (
              <p lang="en" {...stylex.attrs(styles.eyebrow)}>
                {ABOUT_HISTORY.eyebrow}
              </p>
            )}
            <h2 id="about-history-title" {...stylex.attrs(styles.title)}>
              {ABOUT_HISTORY.title}
            </h2>
            <p {...stylex.attrs(styles.caption)}>{ABOUT_HISTORY.caption}</p>
          </RiseReveal>
          {plain() ? null : <Odometer year={year} />}
        </div>

        <div
          ref={viewport}
          role={pinned() ? undefined : "region"}
          aria-label={pinned() ? undefined : `${ABOUT_HISTORY.eyebrow}, scrolls horizontally`}
          tabindex={pinned() ? undefined : 0}
          {...stylex.attrs(styles.viewport, pinned() ? styles.viewportPinned : styles.viewportFree)}
        >
          <m.div
            ref={(node: HTMLElement) => {
              track = node;
            }}
            {...stylex.attrs(styles.track)}
            style={{ x }}
          >
            <div
              ref={helixRow}
              aria-hidden="true"
              {...stylex.attrs(styles.helixRow, dynamic.span(MILESTONES.length))}
            >
              <Show when={geometry()}>
                {(current) => <HelixGraphic helix={current().helix} draw={draw} lit={lit()} />}
              </Show>
            </div>
            <ol {...stylex.attrs(styles.list)}>
              {MILESTONES.map((milestone, index) => {
                const above = index % 2 === 0;
                const isLast = index === MILESTONES.length - 1;
                const isLit = () => index < lit();
                return (
                  <li
                    data-history-node=""
                    {...stylex.attrs(
                      styles.item,
                      above ? styles.itemAbove : styles.itemBelow,
                      isLast && styles.itemLast,
                      dynamic.column(index + 1, isLast ? 1 : 2),
                    )}
                  >
                    <span
                      aria-hidden="true"
                      {...stylex.attrs(
                        styles.pole,
                        above ? styles.poleAbove : styles.poleBelow,
                        styles.poleBase,
                      )}
                    />
                    <span
                      aria-hidden="true"
                      {...stylex.attrs(
                        styles.pole,
                        above ? styles.poleAbove : styles.poleBelow,
                        styles.poleFill,
                        above ? styles.poleFillAbove : styles.poleFillBelow,
                        isLit() && styles.poleFillLit,
                      )}
                    />
                    <h3
                      {...stylex.attrs(
                        styles.year,
                        isLit() && styles.yearLit,
                        index === lit() - 1 && styles.yearActive,
                      )}
                    >
                      {milestone.year}
                      {"kicker" in milestone && !plain() ? (
                        <span lang="en" {...stylex.attrs(styles.kicker)}>
                          {milestone.kicker}
                        </span>
                      ) : null}
                    </h3>
                    <ul {...stylex.attrs(styles.events)}>
                      {milestone.events.map((event, eventIndex) => (
                        <li
                          {...stylex.attrs(
                            styles.event,
                            above ? styles.eventAbove : styles.eventBelow,
                            isLit() && styles.eventLit,
                            dynamic.delay(isLit() ? 120 + eventIndex * 70 : 0),
                          )}
                        >
                          {"entity" in event ? (
                            <>
                              <span lang="en" {...stylex.attrs(styles.entity)}>
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

        {pinned() ? null : (
          <div {...stylex.attrs(styles.shell, styles.controls)}>
            <button
              type="button"
              aria-label="Previous milestone"
              disabled={edges().start}
              onClick={() => stepBy(-1)}
              {...stylex.attrs(styles.controlButton)}
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Next milestone"
              disabled={edges().end}
              onClick={() => stepBy(1)}
              {...stylex.attrs(styles.controlButton)}
            >
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
