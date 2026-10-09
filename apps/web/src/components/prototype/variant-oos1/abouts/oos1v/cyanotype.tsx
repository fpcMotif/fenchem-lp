import * as stylex from "@stylexjs/stylex";
import { useInView } from "motion/react";
import type { RefObject } from "react";
import { shared, CYANOTYPE_ID } from "./cyanotype-values";

const TONE_STOPS: readonly (readonly [number, string])[] = [
  [0, "#06163a"],
  [0.14, "#0a2758"],
  [0.3, "#123f78"],
  [0.45, "#1b5689"],
  [0.58, "#206982"],
  [0.74, "#6fa6c0"],
  [0.87, "#c6dbe2"],
  [0.95, "#eef0ec"],
  [1, "#faf8f4"],
];
const TABLE_SIZE = 17;
const LUMINANCE_MATRIX =
  "0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0 0 0 1 0";

const channelOf = (hex: string, channel: number) =>
  Number.parseInt(hex.slice(1 + channel * 2, 3 + channel * 2), 16) / 255;

const toneTable = (channel: number) =>
  Array.from({ length: TABLE_SIZE }, (_, step) => {
    const x = step / (TABLE_SIZE - 1);
    const upper = Math.max(
      1,
      TONE_STOPS.findIndex(([at]) => at >= x),
    );
    const [x0, from] = TONE_STOPS[upper - 1];
    const [x1, to] = TONE_STOPS[upper];
    const t = (x - x0) / (x1 - x0);
    const start = channelOf(from, channel);
    return (start + (channelOf(to, channel) - start) * t).toFixed(3);
  }).join(" ");

const BRUSHES = [
  { id: "oos1v-brush", sweep: "0.004 0.012", bristles: "0.0008 0.22", reach: 70, wide: true },
  {
    id: "oos1v-brush-narrow",
    sweep: "0.006 0.018",
    bristles: "0.0012 0.3",
    reach: 34,
    wide: false,
  },
] as const;

export function CyanotypeDefs() {
  return (
    <svg aria-hidden="true" focusable="false" {...stylex.props(shared.defs)}>
      <filter
        id={CYANOTYPE_ID}
        colorInterpolationFilters="sRGB"
        x="0"
        y="0"
        width="100%"
        height="100%"
      >
        <feColorMatrix type="matrix" values={LUMINANCE_MATRIX} />
        <feComponentTransfer>
          <feFuncR type="table" tableValues={toneTable(0)} />
          <feFuncG type="table" tableValues={toneTable(1)} />
          <feFuncB type="table" tableValues={toneTable(2)} />
        </feComponentTransfer>
      </filter>
      {BRUSHES.map((brush) => (
        <filter key={brush.id} id={brush.id} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency={brush.sweep}
            numOctaves={2}
            seed={4}
            result="sweep"
          />
          <feTurbulence
            type="fractalNoise"
            baseFrequency={brush.bristles}
            numOctaves={3}
            seed={9}
            result="bristles"
          />
          <feComposite
            in="sweep"
            in2="bristles"
            operator="arithmetic"
            k2={0.5}
            k3={0.7}
            k4={-0.1}
            result="stroke"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="stroke"
            scale={brush.reach}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      ))}
    </svg>
  );
}

export function BrushCoat() {
  return (
    <svg aria-hidden="true" focusable="false" {...stylex.props(shared.coat)}>
      {BRUSHES.map((brush) => (
        <rect
          key={brush.id}
          width="100%"
          height="100%"
          filter={`url(#${brush.id})`}
          {...stylex.props(shared.coatFill, brush.wide ? shared.wideOnly : shared.narrowOnly)}
        />
      ))}
    </svg>
  );
}

export function useDeveloped(ref: RefObject<Element | null>, amount = 0.3) {
  return useInView(ref, { once: true, amount });
}
