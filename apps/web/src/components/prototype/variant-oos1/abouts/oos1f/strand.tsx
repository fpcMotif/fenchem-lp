import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import {
  type MotionValue,
  m,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import { type RefObject, useCallback, useEffect, useId, useRef, useState } from "react";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { color, media, space } from "./palette.stylex";
import { type StrandShape, buildStrand, fractionAt, strandSignature } from "./strand-geometry";

const TIP_VIEWPORT = 0.62;

const styles = stylex.create({
  zone: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: `calc((100% - min(100%, ${space.shellMax})) / 2)`,
    zIndex: 0,
    width: {
      default: 28,
      [media.mdOnly]: 56,
      [media.lgOnly]: 96,
      [breakpoints.xl]: 112,
    },
    pointerEvents: "none",
  },
  svg: {
    position: "absolute",
    top: 0,
    left: 0,
    display: "block",
    overflow: "visible",
  },
  track: {
    fill: "none",
    strokeWidth: 1,
  },
  trackBlue: {
    stroke: color.blueTrack,
  },
  trackMint: {
    stroke: color.greenTrack,
  },
  trackDark: {
    stroke: color.onNavyTrack,
  },
  line: {
    fill: "none",
    strokeWidth: 1.25,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  },
  blue: {
    stroke: colors.brandBlue700,
  },
  mint: {
    stroke: colors.brandGreen500,
  },
  blueDark: {
    stroke: colors.brandBlue300,
  },
  mintDark: {
    stroke: color.mint,
  },
  nodeRing: {
    fill: color.page,
    stroke: colors.brandBlue700,
    strokeWidth: 1,
  },
  nodeRingDark: {
    fill: color.navy,
    stroke: colors.brandBlue300,
    strokeWidth: 1,
  },
  nodeCore: {
    fill: colors.brandBlue700,
  },
  nodeCoreDark: {
    fill: color.mint,
  },
});

type Tone = "light" | "dark";

function NodeDot({
  cx,
  y,
  fraction,
  radius,
  draw,
  tone,
}: {
  cx: number;
  y: number;
  fraction: number;
  radius: number;
  draw: MotionValue<number>;
  tone: Tone;
}) {
  const lit = useTransform(draw, [Math.max(0, fraction - 0.0015), fraction + 0.0001], [0, 1]);
  const dark = tone === "dark";
  return (
    <>
      <circle
        cx={cx}
        cy={y}
        r={radius}
        {...stylex.props(dark ? styles.nodeRingDark : styles.nodeRing)}
      />
      <m.circle
        cx={cx}
        cy={y}
        r={radius - 1.6}
        {...stylex.props(dark ? styles.nodeCoreDark : styles.nodeCore)}
        style={{ opacity: lit }}
      />
    </>
  );
}

function StrandLayer({
  shape,
  draw,
  tone,
}: {
  shape: StrandShape;
  draw: MotionValue<number>;
  tone: Tone;
}) {
  const dark = tone === "dark";
  return (
    <>
      <path
        d={shape.strandB}
        {...stylex.props(styles.track, dark ? styles.trackDark : styles.trackMint)}
      />
      <path
        d={shape.strandA}
        {...stylex.props(styles.track, dark ? styles.trackDark : styles.trackBlue)}
      />
      <m.path
        d={shape.strandB}
        {...stylex.props(styles.line, dark ? styles.mintDark : styles.mint)}
        style={{ pathLength: draw }}
      />
      <m.path
        d={shape.strandA}
        {...stylex.props(styles.line, dark ? styles.blueDark : styles.blue)}
        style={{ pathLength: draw }}
      />
      {shape.nodes.map((node) => (
        <NodeDot
          key={node.y}
          cx={shape.width / 2}
          y={node.y}
          fraction={node.fraction}
          radius={shape.radius}
          draw={draw}
          tone={tone}
        />
      ))}
    </>
  );
}

export function Strand({ rootRef }: { rootRef: RefObject<HTMLDivElement | null> }) {
  const zoneRef = useRef<HTMLDivElement>(null);
  const signatureRef = useRef("");
  const shapeRef = useRef<StrandShape | null>(null);
  const [shape, setShape] = useState<StrandShape | null>(null);
  const reduce = useReducedMotion();
  const clipId = useId().replaceAll(":", "");
  const draw = useMotionValue(0);
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: [`start ${TIP_VIEWPORT}`, `end ${TIP_VIEWPORT}`],
  });

  const syncDraw = useCallback(() => {
    const current = shapeRef.current;
    if (!current) return;
    if (reduce) {
      draw.set(1);
      return;
    }
    draw.set(fractionAt(current, scrollYProgress.get() * current.height));
  }, [draw, reduce, scrollYProgress]);

  useMotionValueEvent(scrollYProgress, "change", syncDraw);

  useEffect(() => {
    shapeRef.current = shape;
    syncDraw();
  }, [shape, syncDraw]);

  useEffect(() => {
    const root = rootRef.current;
    const zone = zoneRef.current;
    if (!root || !zone) return;
    let frame = 0;

    const measure = () => {
      frame = 0;
      const rootBox = root.getBoundingClientRect();
      const relative = (el: HTMLElement) => {
        const box = el.getBoundingClientRect();
        return { top: box.top - rootBox.top, bottom: box.bottom - rootBox.top };
      };
      const nodeYs = Array.from(
        root.querySelectorAll<HTMLElement>("[data-strand-node]"),
        (el) => relative(el).top,
      ).sort((a, b) => a - b);
      const bands = Array.from(root.querySelectorAll<HTMLElement>("[data-strand-band]"), relative);
      const input = { width: zone.offsetWidth, height: rootBox.height, nodeYs, bands };
      const signature = strandSignature(input);
      if (signature === signatureRef.current) return;
      signatureRef.current = signature;
      setShape(buildStrand(input));
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    schedule();
    const observer = new ResizeObserver(schedule);
    observer.observe(root);
    void document.fonts?.ready.then(schedule);
    window.addEventListener("load", schedule);
    return () => {
      observer.disconnect();
      window.removeEventListener("load", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [rootRef]);

  const bandRects = shape
    ? shape.bands.map((band) => `M0 ${band.top}H${shape.width}V${band.bottom}H0Z`).join("")
    : "";
  const lightClip = shape ? `M0 0H${shape.width}V${shape.height}H0Z${bandRects}` : "";

  return (
    <div ref={zoneRef} aria-hidden="true" {...stylex.props(styles.zone)}>
      {shape ? (
        <svg
          width={shape.width}
          height={shape.height}
          viewBox={`0 0 ${shape.width} ${shape.height}`}
          focusable="false"
          {...stylex.props(styles.svg)}
        >
          <defs>
            <clipPath id={`${clipId}-light`}>
              <path d={lightClip} clipRule="evenodd" />
            </clipPath>
            <clipPath id={`${clipId}-dark`}>
              <path d={bandRects} />
            </clipPath>
          </defs>
          <g clipPath={`url(#${clipId}-light)`}>
            <StrandLayer shape={shape} draw={draw} tone="light" />
          </g>
          <g clipPath={`url(#${clipId}-dark)`}>
            <StrandLayer shape={shape} draw={draw} tone="dark" />
          </g>
        </svg>
      ) : null}
    </div>
  );
}
