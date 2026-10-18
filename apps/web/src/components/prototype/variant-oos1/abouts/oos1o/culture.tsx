import * as stylex from "@stylexjs/stylex";
import { useInView } from "@/compat/motion";
import type { JSX } from "@solidjs/web";

import { ABOUT_CULTURE } from "../../about-data";
import { ORIGIN_YEAR } from "./geometry";
import { SectionHead } from "./section-head";
import { ui } from "./shared";
import { bp, chrome, face, tone } from "./tokens.stylex";
import {
  ANCHORS,
  CAMBIUM,
  HEARTWOOD,
  LATEWOOD,
  OUTLINE,
  RING_ARCS,
  SAPWOOD,
  TEXTURE,
  VIEW,
  toX,
  toY,
} from "./wedge";
import { createEffect, createSignal, type Accessor } from "solid-js";

const NAVY = "#0b2a5c";
const BLUE = "#0743a9";
const PLATE_SHARE = 0.72;
const VIEW_BOX = `${VIEW.x} ${VIEW.y} ${VIEW.width} ${VIEW.height}`;
const APEX_VARS = { "--oos1o-apex": `${toX(0)}% ${toY(0)}%` } as JSX.CSSProperties;
const APEX_POSITION = { left: `${toX(0)}%`, top: `${toY(0)}%` };

const ANATOMY = [
  { en: "Heartwood", zh: "心材" },
  { en: "Sapwood", zh: "边材" },
  { en: "Cambium", zh: "形成层" },
] as const;

const ZONES = ABOUT_CULTURE.values.map((value, index) => ({
  ...value,
  ...ANATOMY[index],
  anchor: ANCHORS[index],
}));

const styles = stylex.create({
  section: {
    position: "relative",
    backgroundColor: tone.mist,
    paddingBlock: { default: 88, [bp.tablet]: 120, [bp.desktop]: 152 },
    scrollMarginTop: chrome.header,
  },
  intro: {
    display: "flex",
    flexDirection: { default: "column", [bp.desktop]: "row" },
    alignItems: { default: "flex-start", [bp.desktop]: "flex-end" },
    justifyContent: "space-between",
    gap: 20,
    marginBottom: { default: 40, [bp.tablet]: 56, [bp.desktop]: 64 },
  },
  caption: {
    margin: 0,
    maxWidth: "26em",
    fontSize: { default: 17, [bp.desktop]: 19 },
    lineHeight: 1.35,
    color: tone.body,
  },
  plate: {
    position: "relative",
  },
  wedge: {
    position: "relative",
    width: { default: "100%", [bp.plateSide]: `${PLATE_SHARE * 100}%` },
    clipPath: {
      default: "circle(160% at var(--oos1o-apex))",
      [bp.motionReduce]: "none",
    },
    transitionProperty: "clip-path",
    transitionDuration: "2400ms",
    transitionTimingFunction: "cubic-bezier(0.33, 0, 0.2, 1)",
  },
  wedgeHidden: {
    clipPath: { default: "circle(0% at var(--oos1o-apex))", [bp.motionReduce]: "none" },
  },
  zoneFill: {
    transitionProperty: "fill-opacity",
    transitionDuration: "400ms",
  },
  pith: {
    position: "absolute",
    width: 7,
    height: 7,
    marginTop: -3.5,
    marginLeft: -3.5,
    borderRadius: "50%",
    backgroundColor: tone.navy,
  },
  pithLabel: {
    position: "absolute",
    margin: 0,
    display: "flex",
    gap: 6,
    transform: "translate(-2px, calc(-100% - 14px))",
    fontFamily: face.sans,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1,
    letterSpacing: "0.04em",
    color: tone.navy,
    whiteSpace: "nowrap",
  },
  leaders: {
    display: { default: "none", [bp.plateSide]: "block" },
    position: "absolute",
    top: 0,
    left: 0,
    overflow: "visible",
    pointerEvents: "none",
  },
  annotations: {
    transitionProperty: "opacity",
    transitionDuration: "900ms",
    transitionDelay: "1600ms",
  },
  annotationsHidden: {
    opacity: { default: 0, [bp.motionReduce]: 1 },
  },
  marker: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: { default: 26, [bp.plateSide]: 7 },
    height: { default: 26, [bp.plateSide]: 7 },
    marginTop: { default: -13, [bp.plateSide]: -3.5 },
    marginLeft: { default: -13, [bp.plateSide]: -3.5 },
    borderRadius: "50%",
    backgroundColor: tone.navy,
    color: tone.paper,
    fontFamily: face.sans,
    fontSize: { default: 14, [bp.plateSide]: 0 },
    lineHeight: 1,
    pointerEvents: "none",
  },
  markerCambium: {
    backgroundColor: tone.blue,
  },
  zones: {
    display: { default: "grid", [bp.plateSide]: "flex" },
    flexDirection: "column",
    justifyContent: "space-between",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [bp.plateStack]: "repeat(3, minmax(0, 1fr))",
    },
    gap: { default: 36, [bp.plateStack]: 32, [bp.plateSide]: 0 },
    position: { default: "static", [bp.plateSide]: "absolute" },
    top: 0,
    bottom: 0,
    left: `calc(${PLATE_SHARE * 100}% + 64px)`,
    right: 0,
    margin: 0,
    marginTop: { default: 40, [bp.plateStack]: 56, [bp.plateSide]: 0 },
    padding: 0,
    listStyleType: "none",
  },
  zone: {
    paddingTop: { default: 20, [bp.plateSide]: 0 },
    borderTopWidth: { default: 1, [bp.plateSide]: 0 },
    borderTopStyle: "solid",
    borderTopColor: tone.hairline,
  },
  zoneHead: {
    display: "flex",
    alignItems: "baseline",
    gap: 12,
    margin: 0,
  },
  glyph: {
    fontFamily: face.sans,
    fontWeight: 500,
    fontSize: { default: 32, [bp.desktop]: 36 },
    lineHeight: 1,
    color: tone.navy,
  },
  glyphCambium: {
    color: tone.blue,
  },
  anatomy: {
    fontSize: 21,
    lineHeight: 1,
    color: tone.body,
  },
  anatomyZh: {
    fontFamily: face.sans,
    fontStyle: "normal",
    fontSize: 14,
    letterSpacing: "0.06em",
    marginInlineStart: 8,
  },
  title: {
    margin: 0,
    marginTop: 14,
    fontFamily: face.sans,
    fontWeight: 500,
    fontSize: { default: 20, [bp.desktop]: 22 },
    lineHeight: 1.4,
    letterSpacing: "0.04em",
    color: tone.ink,
  },
  desc: {
    marginTop: 8,
    fontSize: 16,
    lineHeight: 1.8,
  },
});

type Leader = { path: string; cambium: boolean };

function useLeaders(
  plateRef: Accessor<HTMLDivElement | undefined>,
  glyphRefs: (HTMLSpanElement | null)[],
) {
  const [frame, setFrame] = createSignal({ width: 0, height: 0, leaders: [] as Leader[] });

  createEffect(plateRef, (plate) => {
    if (!plate) return;
    const measure = () => {
      const box = plate.getBoundingClientRect();
      const wedgeWidth = box.width * PLATE_SHARE;
      const knee = wedgeWidth + 18;
      const leaders = ZONES.map((zone, index) => {
        const glyph = glyphRefs[index]?.getBoundingClientRect();
        if (!glyph) return { path: "", cambium: index === 2 };
        const x = (toX(zone.anchor.x) / 100) * wedgeWidth;
        const y = (toY(zone.anchor.y) / 100) * box.height;
        const targetY = glyph.top + glyph.height / 2 - box.top;
        const targetX = glyph.left - box.left - 14;
        return {
          path: `M${x} ${y}H${knee}L${knee + 26} ${targetY}H${targetX}`,
          cambium: index === 2,
        };
      });
      setFrame({ width: box.width, height: box.height, leaders });
    };
    measure();
    void document.fonts.ready.then(measure);
    const observer = new ResizeObserver(measure);
    observer.observe(plate);
    for (const glyph of glyphRefs) {
      if (glyph?.parentElement?.parentElement) observer.observe(glyph.parentElement.parentElement);
    }
    return () => observer.disconnect();
  });

  return frame;
}

export function Culture() {
  const [plateRef, setPlateRef] = createSignal<HTMLDivElement>();
  const glyphRefs: (HTMLSpanElement | null)[] = [];
  const shown = useInView(plateRef, { once: true, amount: 0.3 });
  const leaders = useLeaders(plateRef, glyphRefs);
  const [active, setActive] = createSignal<number | null>(null);
  const emphasis = (index: number, rest: number, lit: number) => (active() === index ? lit : rest);

  return (
    <section id="about-culture" aria-labelledby="oos1o-culture" {...stylex.attrs(styles.section)}>
      <div {...stylex.attrs(ui.shell)}>
        <div {...stylex.attrs(styles.intro)}>
          <SectionHead id="oos1o-culture" label="Culture" title={ABOUT_CULTURE.title} />
          <p lang="en" {...stylex.attrs(ui.serif, styles.caption)}>
            Fig. 2 — The same section, magnified: from the pith, through the wood, to the living
            edge.
          </p>
        </div>

        <div ref={setPlateRef} {...stylex.attrs(styles.plate)}>
          <div {...stylex.attrs(styles.wedge, !shown() && styles.wedgeHidden)} style={APEX_VARS}>
            <svg viewBox={VIEW_BOX} aria-hidden="true" {...stylex.attrs(ui.svg)}>
              <path d={OUTLINE} fill="#ffffff" />
              <path
                d={HEARTWOOD}
                fill={NAVY}
                fill-opacity={emphasis(0, 0.07, 0.15)}
                {...stylex.attrs(styles.zoneFill)}
              />
              <path
                d={SAPWOOD}
                fill={NAVY}
                fill-opacity={emphasis(1, 0, 0.06)}
                {...stylex.attrs(styles.zoneFill)}
              />
              <path d={LATEWOOD} fill={NAVY} fill-opacity={0.05} />
              <path d={TEXTURE.pores} fill={NAVY} fill-opacity={0.24} />
              <path
                d={TEXTURE.rays}
                fill="none"
                stroke={NAVY}
                stroke-opacity={0.14}
                stroke-width={0.75}
                vector-effect="non-scaling-stroke"
              />
              {RING_ARCS.map((ring) => (
                <path
                  d={ring.path}
                  fill="none"
                  stroke={NAVY}
                  stroke-opacity={ring.alpha}
                  stroke-width={1}
                  vector-effect="non-scaling-stroke"
                />
              ))}
              <path
                d={CAMBIUM}
                fill={BLUE}
                fill-opacity={emphasis(2, 0.85, 1)}
                {...stylex.attrs(styles.zoneFill)}
              />
              <path
                d={OUTLINE}
                fill="none"
                stroke={NAVY}
                stroke-opacity={0.55}
                stroke-width={1}
                stroke-linejoin="round"
                vector-effect="non-scaling-stroke"
              />
            </svg>
            <span aria-hidden="true" {...stylex.attrs(styles.pith)} style={APEX_POSITION} />
            <p aria-hidden="true" {...stylex.attrs(styles.pithLabel)} style={APEX_POSITION}>
              <span {...stylex.attrs(ui.latin)}>{ORIGIN_YEAR}</span>
              <span>·</span>
              <span>南京</span>
            </p>
            {ZONES.map((zone, index) => (
              <span
                aria-hidden="true"
                {...stylex.attrs(styles.marker, index === 2 && styles.markerCambium)}
                style={{ left: `${toX(zone.anchor.x)}%`, top: `${toY(zone.anchor.y)}%` }}
              >
                {zone.glyph}
              </span>
            ))}
          </div>

          <div {...stylex.attrs(styles.annotations, !shown() && styles.annotationsHidden)}>
            <svg
              width={leaders().width}
              height={leaders().height}
              viewBox={`0 0 ${leaders().width} ${leaders().height}`}
              aria-hidden="true"
              {...stylex.attrs(styles.leaders)}
            >
              {leaders().leaders.map((leader, index) => (
                <path
                  d={leader.path}
                  fill="none"
                  stroke={leader.cambium ? BLUE : NAVY}
                  stroke-opacity={active() === index ? 0.9 : 0.42}
                  stroke-width={1}
                  stroke-linejoin="round"
                />
              ))}
            </svg>
          </div>

          <ol {...stylex.attrs(styles.zones)}>
            {ZONES.map((zone, index) => (
              <li
                onMouseEnter={() => setActive(index)}
                onMouseLeave={() => setActive(null)}
                {...stylex.attrs(styles.zone)}
              >
                <p {...stylex.attrs(styles.zoneHead)}>
                  <span
                    ref={(element) => {
                      glyphRefs[index] = element;
                    }}
                    aria-hidden="true"
                    {...stylex.attrs(styles.glyph, index === 2 && styles.glyphCambium)}
                  >
                    {zone.glyph}
                  </span>
                  <span lang="en" {...stylex.attrs(ui.serif, styles.anatomy)}>
                    {zone.en}
                    <span lang="zh-CN" {...stylex.attrs(styles.anatomyZh)}>
                      {zone.zh}
                    </span>
                  </span>
                </p>
                <h3 {...stylex.attrs(styles.title)}>{zone.title}</h3>
                <p {...stylex.attrs(ui.body, styles.desc)}>{zone.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
