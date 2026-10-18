import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import {
  type MotionValue,
  m,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "@/compat/motion";
import {
  createEffect,
  createSignal,
  createUniqueId,
  onSettled,
  Show,
  untrack,
  type Accessor,
} from "solid-js";

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
      ["@media (min-width: 1280px)"]: 112,
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

function NodeDot(props: {
  cx: number;
  y: number;
  fraction: number;
  radius: number;
  draw: MotionValue<number>;
  tone: Tone;
}) {
  const lit = useTransform(
    props.draw,
    [Math.max(0, props.fraction - 0.0015), props.fraction + 0.0001],
    [0, 1],
  );
  const dark = () => props.tone === "dark";
  return (
    <>
      <circle
        cx={props.cx}
        cy={props.y}
        r={props.radius}
        {...stylex.attrs(dark() ? styles.nodeRingDark : styles.nodeRing)}
      />
      <m.circle
        cx={props.cx}
        cy={props.y}
        r={props.radius - 1.6}
        {...stylex.attrs(dark() ? styles.nodeCoreDark : styles.nodeCore)}
        style={{ opacity: lit }}
      />
    </>
  );
}

function StrandLayer(props: { shape: StrandShape; draw: MotionValue<number>; tone: Tone }) {
  const dark = () => props.tone === "dark";
  return (
    <>
      <path
        d={props.shape.strandB}
        {...stylex.attrs(styles.track, dark() ? styles.trackDark : styles.trackMint)}
      />
      <path
        d={props.shape.strandA}
        {...stylex.attrs(styles.track, dark() ? styles.trackDark : styles.trackBlue)}
      />
      <m.path
        d={props.shape.strandB}
        {...stylex.attrs(styles.line, dark() ? styles.mintDark : styles.mint)}
        style={{ pathLength: props.draw }}
      />
      <m.path
        d={props.shape.strandA}
        {...stylex.attrs(styles.line, dark() ? styles.blueDark : styles.blue)}
        style={{ pathLength: props.draw }}
      />
      {props.shape.nodes.map((node) => (
        <NodeDot
          cx={props.shape.width / 2}
          y={node.y}
          fraction={node.fraction}
          radius={props.shape.radius}
          draw={props.draw}
          tone={props.tone}
        />
      ))}
    </>
  );
}

export function Strand(props: { root: Accessor<HTMLDivElement | undefined> }) {
  let zoneRef: HTMLDivElement | undefined;
  let signatureRef = "";
  let shapeRef: StrandShape | null = null;
  const [shape, setShape] = createSignal<StrandShape | null>(null);
  const reduce = useReducedMotion();
  const clipId = createUniqueId().replaceAll(":", "");
  const draw = useMotionValue(0);
  const { scrollYProgress } = useScroll({
    target: props.root,
    offset: [`start ${TIP_VIEWPORT}`, `end ${TIP_VIEWPORT}`],
  });

  const syncDraw = () => {
    const current = shapeRef;
    if (!current) return;
    if (untrack(reduce)) {
      draw.set(1);
      return;
    }
    draw.set(fractionAt(current, scrollYProgress.get() * current.height));
  };

  useMotionValueEvent(scrollYProgress, "change", syncDraw);

  createEffect(
    () => [shape(), reduce()] as const,
    ([current]) => {
      shapeRef = current;
      syncDraw();
    },
  );

  onSettled(() => {
    const root = props.root();
    const zone = zoneRef;
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
      if (signature === signatureRef) return;
      signatureRef = signature;
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
  });

  const bandRects = () => {
    const current = shape();
    return current
      ? current.bands.map((band) => `M0 ${band.top}H${current.width}V${band.bottom}H0Z`).join("")
      : "";
  };
  const lightClip = () => {
    const current = shape();
    return current ? `M0 0H${current.width}V${current.height}H0Z${bandRects()}` : "";
  };

  return (
    <div ref={zoneRef} aria-hidden="true" {...stylex.attrs(styles.zone)}>
      <Show when={shape()}>
        {(current) => (
          <svg
            width={current().width}
            height={current().height}
            viewBox={`0 0 ${current().width} ${current().height}`}
            {...{ focusable: "false" }}
            {...stylex.attrs(styles.svg)}
          >
            <defs>
              <clipPath id={`${clipId}-light`}>
                <path d={lightClip()} clip-rule="evenodd" />
              </clipPath>
              <clipPath id={`${clipId}-dark`}>
                <path d={bandRects()} />
              </clipPath>
            </defs>
            <g clip-path={`url(#${clipId}-light)`}>
              <StrandLayer shape={current()} draw={draw} tone="light" />
            </g>
            <g clip-path={`url(#${clipId}-dark)`}>
              <StrandLayer shape={current()} draw={draw} tone="dark" />
            </g>
          </svg>
        )}
      </Show>
    </div>
  );
}
