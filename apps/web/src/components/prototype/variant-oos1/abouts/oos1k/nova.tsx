import * as stylex from "@stylexjs/stylex";
import { m } from "motion/react";
import { useId } from "react";

import { EASE } from "@/components/prototype/motion-constants";

import { sky } from "./tokens.stylex";

const SIZES = {
  chart: { core: 5.6, glow: 13, halo: 40, spike: 132, spikeWidth: 1.7, reach: 220 },
  inline: { core: 4.6, glow: 10, halo: 30, spike: 58, spikeWidth: 1.3, reach: 96 },
} as const;

const styles = stylex.create({
  light: {
    fill: sky.star,
  },
});

function diamond(length: number, width: number) {
  return `0,${-length} ${width},0 0,${length} ${-width},0`;
}

export function Nova({
  x,
  y,
  lit,
  instant,
  size,
}: {
  x: number;
  y: number;
  lit: boolean;
  instant: boolean;
  size: keyof typeof SIZES;
}) {
  const shape = SIZES[size];
  const hold = instant ? { duration: 0 } : null;
  const bloom = `nova${useId().replace(/[^a-zA-Z0-9]/g, "")}`;

  return (
    <g transform={`translate(${x} ${y})`}>
      <defs>
        <radialGradient id={bloom}>
          <stop offset="0" stopColor="#ffffff" stopOpacity={1} />
          <stop offset="0.28" stopColor="#ffffff" stopOpacity={0.42} />
          <stop offset="1" stopColor="#ffffff" stopOpacity={0} />
        </radialGradient>
      </defs>
      <m.circle
        r={shape.halo}
        fill={`url(#${bloom})`}
        initial={{ opacity: 0, scale: 0.2 }}
        animate={lit ? { opacity: [0, 1, 0.34], scale: [0.2, 2.1, 0.9] } : undefined}
        transition={hold ?? { duration: 2.8, times: [0, 0.12, 1], ease: "easeOut" }}
      />
      <m.circle
        r={shape.glow}
        fill={`url(#${bloom})`}
        initial={{ opacity: 0, scale: 0 }}
        animate={lit ? { opacity: [0, 1, 0.8], scale: [0, 1.8, 1] } : undefined}
        transition={hold ?? { duration: 1.9, times: [0, 0.14, 1], ease: "easeOut" }}
      />
      <m.g
        initial={{ opacity: 0, scale: 0 }}
        animate={lit ? { opacity: 1, scale: 1 } : undefined}
        transition={hold ?? { delay: 0.22, duration: 1.8, ease: EASE }}
      >
        <polygon
          points={diamond(shape.reach, shape.spikeWidth * 0.55)}
          opacity={0.32}
          {...stylex.props(styles.light)}
        />
        <polygon
          points={diamond(shape.reach, shape.spikeWidth * 0.55)}
          opacity={0.32}
          transform="rotate(90)"
          {...stylex.props(styles.light)}
        />
        <polygon
          points={diamond(shape.spike, shape.spikeWidth)}
          opacity={0.92}
          {...stylex.props(styles.light)}
        />
        <polygon
          points={diamond(shape.spike, shape.spikeWidth)}
          opacity={0.92}
          transform="rotate(90)"
          {...stylex.props(styles.light)}
        />
      </m.g>
      <m.circle
        r={shape.core}
        initial={{ scale: 0 }}
        animate={lit ? { scale: [0, 2.3, 1] } : undefined}
        transition={hold ?? { duration: 1.3, times: [0, 0.2, 1], ease: "easeOut" }}
        {...stylex.props(styles.light)}
      />
    </g>
  );
}
