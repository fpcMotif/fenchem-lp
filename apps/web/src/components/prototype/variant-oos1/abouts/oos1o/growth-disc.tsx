import * as stylex from "@stylexjs/stylex";
import { m, useMotionValueEvent, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

import {
  CURRENT_YEAR,
  DISC_EXTENT,
  HEARTWOOD_COUNT,
  LAST_CLOSED,
  OPEN_GAP,
  OPEN_RING,
  ORIGIN_YEAR,
  RAY_PATH,
  RINGS,
  blendRadius,
  blendRing,
  radiusAt,
  toPercent,
} from "./geometry";
import { srOnly, ui, useSvgId } from "./shared";
import { face, tone } from "./tokens.stylex";

const NAVY = "#0b2a5c";
const BLUE = "#0743a9";
const MIST = "#f3f5fa";
const TAU = Math.PI * 2;
const START = -Math.PI / 2;
const SWEEP = TAU - OPEN_GAP;
const LAST = LAST_CLOSED + 1;
const ZOOM_FRAME = 230;
const ZOOM_MAX = 5;

const FRONT_DONE = 0.84;
const FRONT_SPAN = LAST_CLOSED + 0.6;
const HEART_LAG = LAST_CLOSED - (HEARTWOOD_COUNT - 1);

const styles = stylex.create({
  figure: {
    position: "relative",
    margin: 0,
    width: "100%",
    aspectRatio: "1",
  },
  svg: {
    overflow: "hidden",
  },
  dot: {
    position: "absolute",
    width: 7,
    height: 7,
    marginTop: -3.5,
    marginLeft: -3.5,
    borderRadius: "50%",
  },
  pith: {
    backgroundColor: tone.navy,
  },
  tip: {
    backgroundColor: tone.blue,
  },
  label: {
    position: "absolute",
    margin: 0,
    display: "flex",
    alignItems: "baseline",
    gap: 8,
    whiteSpace: "nowrap",
    pointerEvents: "none",
    textShadow: tone.halo,
  },
  pithLabel: {
    left: "50%",
    top: "50%",
    transform: "translate(22px, -50%)",
    fontFamily: face.sans,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1,
    letterSpacing: "0.04em",
    color: tone.navy,
  },
  openLabel: {
    transform: "translate(-50%, calc(-100% - 14px))",
  },
  year: {
    fontSize: 15,
    letterSpacing: "0.02em",
    color: tone.blue,
  },
  growing: {
    fontSize: 20,
    lineHeight: 1,
    color: tone.body,
  },
});

function GrowthRing({
  index,
  href,
  alpha,
  front,
}: {
  index: number;
  href: string;
  alpha: number;
  front: MotionValue<number>;
}) {
  const opacity = useTransform(front, [index, index + 0.6], [0, 1]);
  return (
    <m.g fill="none" stroke={NAVY} style={{ opacity }}>
      <use href={href} strokeOpacity={0.045} strokeWidth={4} />
      <use href={href} strokeOpacity={alpha} strokeWidth={1} />
    </m.g>
  );
}

function sweepWedge(sweep: number) {
  if (sweep <= 0) return "M0 0Z";
  const reach = DISC_EXTENT * 1.2;
  let path = "M0 0";
  const steps = Math.max(2, Math.ceil(sweep / 0.12));
  for (let step = 0; step <= steps; step++) {
    const angle = START + (sweep * step) / steps;
    path += `L${(reach * Math.cos(angle)).toFixed(1)} ${(reach * Math.sin(angle)).toFixed(1)}`;
  }
  return `${path}Z`;
}

function zoomBox(front: number) {
  const radius = blendRadius(Math.min(front, LAST_CLOSED));
  const zoom = Math.min(Math.max(ZOOM_FRAME / radius, 1), ZOOM_MAX);
  const extent = DISC_EXTENT / zoom;
  return `${-extent} ${-extent} ${extent * 2} ${extent * 2}`;
}

function tipAt(sweep: number) {
  const angle = START + sweep;
  const radius = radiusAt(LAST, angle);
  return { x: radius * Math.cos(angle), y: radius * Math.sin(angle) };
}

export function GrowthDisc({ growth }: { growth: MotionValue<number> }) {
  const baseId = useSvgId();
  const clipId = `${baseId}-front`;
  const sweepId = `${baseId}-sweep`;
  const ringId = `${baseId}-ring`;

  const front = useTransform(growth, [0, FRONT_DONE], [0, FRONT_SPAN]);
  const frontPath = useTransform(front, (value) => blendRing(Math.min(value, LAST_CLOSED)));
  const frontOpacity = useTransform(growth, [0.82, 0.9], [1, 0]);
  const heartPath = useTransform(front, (value) =>
    blendRing(Math.max(Math.min(value, LAST_CLOSED) - HEART_LAG, 0)),
  );
  const heartOpacity = useTransform(front, [HEART_LAG - 1, HEART_LAG], [0, 1]);

  const sweep = useTransform(growth, [0.86, 1], [0, SWEEP]);
  const sweepPath = useTransform(sweep, sweepWedge);
  const tipLeft = useTransform(sweep, (value) => `${toPercent(tipAt(value).x)}%`);
  const tipTop = useTransform(sweep, (value) => `${toPercent(tipAt(value).y)}%`);
  const tipOpacity = useTransform(growth, [0.86, 0.88], [0, 1]);
  const labelOpacity = useTransform(growth, [0.97, 1], [0, 1]);

  const svgRef = useRef<SVGSVGElement>(null);
  useMotionValueEvent(front, "change", (value) => {
    svgRef.current?.setAttribute("viewBox", zoomBox(value));
  });

  return (
    <figure {...stylex.props(styles.figure)}>
      <svg
        ref={svgRef}
        viewBox={zoomBox(front.get())}
        aria-hidden="true"
        {...stylex.props(ui.svg, styles.svg)}
      >
        <defs>
          {RINGS.map((ring) => (
            <path
              key={ring.year}
              id={`${ringId}-${ring.year}`}
              d={ring.path}
              vectorEffect="non-scaling-stroke"
            />
          ))}
          <clipPath id={clipId}>
            <m.path d={frontPath} />
          </clipPath>
          <clipPath id={sweepId}>
            <m.path d={sweepPath} />
          </clipPath>
        </defs>
        <m.path d={frontPath} fill={MIST} />
        <m.path d={heartPath} fill={NAVY} fillOpacity={0.05} style={{ opacity: heartOpacity }} />
        <path
          d={RAY_PATH}
          clipPath={`url(#${clipId})`}
          fill="none"
          stroke={NAVY}
          strokeOpacity={0.13}
          strokeWidth={0.75}
          vectorEffect="non-scaling-stroke"
        />
        {RINGS.map((ring, index) => (
          <GrowthRing
            key={ring.year}
            index={index}
            href={`#${ringId}-${ring.year}`}
            alpha={ring.alpha}
            front={front}
          />
        ))}
        <m.path
          d={frontPath}
          fill="none"
          stroke={BLUE}
          strokeWidth={1.75}
          vectorEffect="non-scaling-stroke"
          style={{ opacity: frontOpacity }}
        />
        <path
          d={OPEN_RING.path}
          clipPath={`url(#${sweepId})`}
          fill="none"
          stroke={BLUE}
          strokeWidth={1.75}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <span
        aria-hidden="true"
        {...stylex.props(styles.dot, styles.pith)}
        style={{ left: "50%", top: "50%" }}
      />
      <m.span
        aria-hidden="true"
        {...stylex.props(styles.dot, styles.tip)}
        style={{ left: tipLeft, top: tipTop, opacity: tipOpacity }}
      />

      <p {...stylex.props(styles.label, styles.pithLabel)}>
        <span {...stylex.props(ui.latin)}>{ORIGIN_YEAR}</span>
        <span aria-hidden="true">·</span>
        <span>南京</span>
      </p>
      <m.p
        {...stylex.props(styles.label, styles.openLabel)}
        style={{
          left: `${toPercent(OPEN_RING.gap.x)}%`,
          top: `${toPercent(OPEN_RING.gap.y)}%`,
          opacity: labelOpacity,
        }}
      >
        <span {...stylex.props(ui.latin, styles.year)}>{CURRENT_YEAR}</span>
        <span lang="en" {...stylex.props(ui.serif, styles.growing)}>
          still growing
        </span>
      </m.p>
      <figcaption {...srOnly}>
        年轮横截面：自 {ORIGIN_YEAR} 年南京起，每年一圈；{CURRENT_YEAR} 年这一圈尚未闭合，仍在生长。
      </figcaption>
    </figure>
  );
}
