import * as stylex from "@stylexjs/stylex";
import { useInView } from "motion/react";
import { useRef } from "react";

import { ABOUT_HONORS } from "../../about-data";
import { polyline } from "./geometry";
import { SectionHead } from "./section-head";
import { srOnly, ui, useSvgId } from "./shared";
import { bp, chrome, face, tone } from "./tokens.stylex";

type Level = (typeof ABOUT_HONORS.items)[number]["level"];

const LEVELS: readonly { level: Level; zh: string; en: string }[] = [
  { level: "national", zh: "国家级", en: "National" },
  { level: "provincial", zh: "省级", en: "Provincial" },
  { level: "municipal", zh: "市级", en: "Municipal" },
];

const NAVY = "#0b2a5c";
const INK = "#1a1a1a";
const BODY = "#4d4d4d";
const WIDTH = 1000;
const CENTER = WIDTH / 2;
const CORE = 204;
const STEP = 33;
const OUTER = CORE + STEP * ABOUT_HONORS.items.length;
const HORIZON = OUTER + 16;
const VIEW_BOX = `0 0 ${WIDTH} ${HORIZON}`;

function halfRing(radius: number, seed: number) {
  const points: number[] = [];
  for (let step = 0; step <= 140; step++) {
    const angle = Math.PI + (Math.PI * step) / 140;
    const wobble = 1 + 0.004 * Math.sin(3 * angle + seed) + 0.0025 * Math.sin(7 * angle + seed * 2);
    const r = radius * wobble;
    points.push(CENTER + r * Math.cos(angle), HORIZON + r * Math.sin(angle));
  }
  return polyline(points, false);
}

const BOUNDARY_LEVEL_CHANGE = new Set(
  ABOUT_HONORS.items
    .map((item, index) =>
      index > 0 && ABOUT_HONORS.items[index - 1].level !== item.level ? index : -1,
    )
    .filter((index) => index > 0),
);

const BANDS = ABOUT_HONORS.items.map((item, index) => {
  const national = item.level === "national";
  const size = national ? 21 : 18.5;
  const baseline = CORE + STEP * (index + 0.5) - size * 0.36;
  return {
    ...item,
    size,
    national,
    color: item.level === "municipal" ? BODY : INK,
    arc: `M${CENTER - baseline} ${HORIZON}A${baseline} ${baseline} 0 0 1 ${CENTER + baseline} ${HORIZON}`,
    ring: halfRing(CORE + STEP * (index + 1), index + 1),
    strong: BOUNDARY_LEVEL_CHANGE.has(index + 1) || index === ABOUT_HONORS.items.length - 1,
  };
});

const CORE_RING = halfRing(CORE, 0);

const LEVEL_SPANS = LEVELS.map(({ level, zh, en }) => {
  const indexes = ABOUT_HONORS.items.flatMap((item, index) =>
    item.level === level ? [index] : [],
  );
  const middle = CORE + STEP * ((indexes[0] + indexes[indexes.length - 1]) / 2 + 0.5);
  return { level, zh, en, offset: (middle / WIDTH) * 100 };
});

const styles = stylex.create({
  section: {
    position: "relative",
    paddingTop: { default: 96, [bp.tablet]: 128, [bp.desktop]: 152 },
    paddingBottom: { default: 72, [bp.tablet]: 96, [bp.desktop]: 0 },
    scrollMarginTop: chrome.header,
  },
  figure: {
    position: "relative",
    margin: 0,
  },
  disc: {
    display: { default: "none", [bp.desktop]: "block" },
  },
  head: {
    position: { default: "static", [bp.desktop]: "absolute" },
    left: "50%",
    bottom: "9%",
    transform: { default: "none", [bp.desktop]: "translateX(-50%)" },
    alignItems: { default: "flex-start", [bp.desktop]: "center" },
    textAlign: { default: "start", [bp.desktop]: "center" },
  },
  band: {
    transitionProperty: "opacity",
    transitionDuration: "700ms",
    transitionTimingFunction: chrome.ease,
  },
  bandHidden: {
    opacity: { default: 0, [bp.motionReduce]: 1 },
  },
  bandDelay: (ms: number) => ({ transitionDelay: `${ms}ms` }),
  feet: {
    display: { default: "none", [bp.desktop]: "block" },
    position: "relative",
    height: 64,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: "rgba(11, 42, 92, 0.5)",
  },
  foot: {
    position: "absolute",
    top: 14,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    margin: 0,
    transform: "translateX(-50%)",
    fontFamily: face.sans,
    fontSize: 14,
    lineHeight: 1.1,
    letterSpacing: "0.06em",
    color: tone.navy,
    whiteSpace: "nowrap",
  },
  footSerif: {
    fontSize: 16,
    letterSpacing: 0,
    color: tone.body,
  },
  pith: {
    position: "absolute",
    top: -4,
    left: "50%",
    width: 7,
    height: 7,
    marginLeft: -3.5,
    borderRadius: "50%",
    backgroundColor: tone.navy,
  },
  groups: {
    display: "grid",
    gap: 28,
    marginTop: 40,
    position: { default: "static", [bp.desktop]: "absolute" },
    width: { default: "auto", [bp.desktop]: 1 },
    height: { default: "auto", [bp.desktop]: 1 },
    overflow: { default: "visible", [bp.desktop]: "hidden" },
    clip: { default: "auto", [bp.desktop]: "rect(0, 0, 0, 0)" },
  },
  group: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.hairline,
  },
  groupLabel: {
    margin: 0,
    display: "flex",
    gap: 10,
    alignItems: "baseline",
    fontFamily: face.sans,
    fontSize: 15,
    letterSpacing: "0.06em",
    color: tone.blue,
  },
  items: {
    margin: 0,
    marginTop: 10,
    padding: 0,
    listStyleType: "none",
    fontFamily: face.sans,
    fontSize: 17,
    lineHeight: 2,
    color: tone.ink,
  },
});

export function Honors() {
  const figureRef = useRef<HTMLDivElement>(null);
  const shown = useInView(figureRef, { once: true, amount: 0.35 });
  const baseId = useSvgId();

  return (
    <section id="about-honor" aria-labelledby="oos1o-honor" {...stylex.props(styles.section)}>
      <div {...stylex.props(ui.shell)}>
        <div ref={figureRef} {...stylex.props(styles.figure)}>
          <svg viewBox={VIEW_BOX} aria-hidden="true" {...stylex.props(ui.svg, styles.disc)}>
            <defs>
              {BANDS.map((band) => (
                <path key={band.id} id={`${baseId}-${band.id}`} d={band.arc} />
              ))}
            </defs>
            <path
              d={`${CORE_RING}L${CENTER + CORE} ${HORIZON}L${CENTER - CORE} ${HORIZON}Z`}
              fill={NAVY}
              fillOpacity={0.035}
            />
            <path
              d={CORE_RING}
              fill="none"
              stroke={NAVY}
              strokeOpacity={0.5}
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
            {BANDS.map((band, index) => (
              <g
                key={band.id}
                {...stylex.props(
                  styles.band,
                  !shown && styles.bandHidden,
                  styles.bandDelay(200 + index * 110),
                )}
              >
                <path
                  d={band.ring}
                  fill="none"
                  stroke={NAVY}
                  strokeOpacity={band.strong ? 0.5 : 0.2}
                  strokeWidth={1}
                  vectorEffect="non-scaling-stroke"
                />
                <text
                  fill={band.color}
                  fontFamily='"Noto Sans SC", "PingFang SC", sans-serif'
                  fontSize={band.size}
                  fontWeight={band.national ? 500 : 400}
                  letterSpacing={band.national ? 1.6 : 1}
                  textAnchor="middle"
                >
                  <textPath href={`#${baseId}-${band.id}`} startOffset="50%">
                    {band.title}
                  </textPath>
                </text>
              </g>
            ))}
          </svg>

          <SectionHead
            id="oos1o-honor"
            label="Honours"
            title={ABOUT_HONORS.title}
            sx={styles.head}
          />
        </div>

        <div aria-hidden="true" {...stylex.props(styles.feet)}>
          <span {...stylex.props(styles.pith)} />
          {LEVEL_SPANS.map((span) => (
            <span
              key={span.level}
              {...stylex.props(styles.foot)}
              style={{ left: `${50 + span.offset}%` }}
            >
              {span.zh}
              <span lang="en" {...stylex.props(ui.serif, styles.footSerif)}>
                {span.en}
              </span>
            </span>
          ))}
        </div>

        <div {...stylex.props(styles.groups)}>
          {LEVELS.map(({ level, zh, en }) => (
            <div key={level} {...stylex.props(styles.group)}>
              <p {...stylex.props(styles.groupLabel)}>
                <span aria-hidden="true">{zh}</span>
                <span lang="en" {...stylex.props(ui.serif)}>
                  {en}
                </span>
              </p>
              <ul {...stylex.props(styles.items)}>
                {ABOUT_HONORS.items
                  .filter((item) => item.level === level)
                  .map((item) => (
                    <li key={item.id}>
                      <span aria-hidden="true">{item.title}</span>
                      <span lang="en" {...srOnly}>
                        {item.english}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
