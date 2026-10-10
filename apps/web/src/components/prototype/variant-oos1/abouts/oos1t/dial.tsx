import * as stylex from "@stylexjs/stylex";
import { m, useTransform } from "motion/react";
import { useId } from "react";

import { ABOUT_BANNER } from "../../about-data";
import { hourAngle, useSunHour } from "./sun";
import { face, tone } from "./tokens.stylex";

const RX = 170;
const RY = 60;
const NUMERALS = [
  { hour: 9, label: "IX" },
  { hour: 10, label: "X" },
  { hour: 11, label: "XI" },
  { hour: 12, label: "XII" },
  { hour: 13, label: "I" },
] as const;
const OUTER_HOURS = [8, 14, 15, 16] as const;
const TICKS = Array.from({ length: 97 }, (_, i) => 8 + i / 12);

function ringRadius(deg: number) {
  const rad = (deg * Math.PI) / 180;
  return 1 / Math.hypot(Math.sin(rad) / RX, Math.cos(rad) / RY);
}

function along(deg: number, radius: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: +(radius * Math.sin(rad)).toFixed(2), y: +(radius * Math.cos(rad)).toFixed(2) };
}

function spoke(hour: number, inner: (ring: number) => number, outer: (ring: number) => number) {
  const deg = hourAngle(hour);
  const ring = ringRadius(deg);
  const a = along(deg, inner(ring));
  const b = along(deg, outer(ring));
  return { x1: a.x, y1: a.y, x2: b.x, y2: b.y };
}

function minutesOf(hour: number) {
  return Math.round((hour % 1) * 60);
}

function tickLength(minutes: number) {
  if (minutes === 30) return 6;
  if (minutes % 15 === 0) return 3.6;
  return 1.8;
}

const styles = stylex.create({
  svg: {
    position: "absolute",
    top: "calc(var(--gh) * -0.32)",
    left: "calc(var(--gh) * -1.85)",
    width: "calc(var(--gh) * 3.7)",
    height: "calc(var(--gh) * 1.2)",
    overflow: "visible",
    pointerEvents: "none",
  },
  numeral: {
    fontFamily: face.serif,
    fontSize: 10,
    fill: tone.ink,
  },
  motto: {
    fontFamily: face.serif,
    fontStyle: "italic",
    fontSize: 5,
    letterSpacing: "0.02em",
    fill: tone.body,
  },
});

function Numeral({ hour, label }: { hour: number; label: string }) {
  const sunHour = useSunHour();
  const opacity = useTransform(
    sunHour,
    (now) => 0.32 + 0.68 * Math.max(0, 1 - Math.abs(now - hour) / 0.8),
  );
  const deg = hourAngle(hour);
  const at = along(deg, ringRadius(deg) + 15);
  return (
    <m.text
      x={at.x}
      y={at.y}
      textAnchor="middle"
      dominantBaseline="central"
      style={{ opacity }}
      {...stylex.props(styles.numeral)}
    >
      {label}
    </m.text>
  );
}

const FULL_RING = "M -152.08 -26.82 A 170 60 0 1 0 152.08 -26.82";
const DAY_RING = "M -42.2 58.1 A 170 60 0 0 0 155 24.6";

export function Dial({ dayOnly = false }: { dayOnly?: boolean }) {
  const arcId = useId();
  const ticks = dayOnly ? TICKS.filter((hour) => hour >= 8.6 && hour <= 13.5) : TICKS;
  return (
    <svg
      viewBox="-185 -32 370 120"
      role="img"
      aria-label={`Sundial with hour lines from 9 a.m. to 1 p.m. Inscription: ${ABOUT_BANNER.tagline}`}
      {...stylex.props(styles.svg)}
    >
      <defs>
        <path id={arcId} d="M -35.72 42.57 A 125.8 44.4 0 0 0 112.54 19.84" />
      </defs>
      <g fill="none" stroke={tone.navy}>
        <path
          d={dayOnly ? DAY_RING : FULL_RING}
          strokeOpacity={0.24}
          vectorEffect="non-scaling-stroke"
        />
        {ticks.map((hour) => {
          const minutes = minutesOf(hour);
          if (minutes === 0) return null;
          const inDay = hour > 9 && hour < 13;
          return (
            <line
              key={hour.toFixed(3)}
              {...spoke(
                hour,
                (ring) => ring,
                (ring) => ring + tickLength(minutes),
              )}
              strokeOpacity={inDay ? (minutes === 30 ? 0.34 : 0.2) : 0.1}
              vectorEffect="non-scaling-stroke"
            />
          );
        })}
        {NUMERALS.map(({ hour }) => (
          <line
            key={hour}
            {...spoke(
              hour,
              () => 10,
              (ring) => ring + (hour === 12 ? 9 : 5),
            )}
            strokeOpacity={hour === 12 ? 0.44 : 0.28}
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {(dayOnly ? [] : OUTER_HOURS).map((hour) => (
          <line
            key={hour}
            {...spoke(
              hour,
              (ring) => ring * 0.58,
              (ring) => ring + 4,
            )}
            strokeOpacity={0.1}
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {[9.5, 10.5, 11.5, 12.5].map((hour) => (
          <line
            key={hour}
            {...spoke(
              hour,
              (ring) => ring * 0.5,
              (ring) => ring,
            )}
            strokeOpacity={0.14}
            vectorEffect="non-scaling-stroke"
          />
        ))}
        <line
          x1={-11}
          y1={0}
          x2={11}
          y2={0}
          strokeOpacity={0.55}
          vectorEffect="non-scaling-stroke"
        />
      </g>
      <text {...stylex.props(styles.motto)}>
        <textPath href={`#${arcId}`} startOffset="50%" textAnchor="middle">
          {ABOUT_BANNER.tagline}
        </textPath>
      </text>
      {NUMERALS.map((numeral) => (
        <Numeral key={numeral.hour} {...numeral} />
      ))}
    </svg>
  );
}
