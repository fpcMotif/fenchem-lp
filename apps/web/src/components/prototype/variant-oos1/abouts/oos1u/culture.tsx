import * as stylex from "@stylexjs/stylex";
import { m, useScroll, useTransform } from "motion/react";
import { useId, useRef } from "react";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { ABOUT_CAMPUS, ABOUT_CULTURE } from "../../about-data";
import { Reveal } from "./shared";
import { ui } from "./shared-values";
import { media, tone } from "./tokens.stylex";

const CANVAS_HEIGHT = 1760;
const VIEWBOX = `0 0 1000 ${CANVAS_HEIGHT}`;

const [, , , RECEPTION, LOUNGE, OFFICE] = ABOUT_CAMPUS.photos;
const [FOCUS, PERSISTENCE, PARTNERSHIP] = ABOUT_CULTURE.values;

type Rect = { x: number; y: number; w: number; h: number };
type Scene = {
  value: (typeof ABOUT_CULTURE.values)[number];
  photo: (typeof ABOUT_CAMPUS.photos)[number];
  photoSide: "start" | "end";
  rect: Rect;
  knot: { x: number; y: number };
};

const SCENES: readonly Scene[] = [
  {
    value: FOCUS,
    photo: OFFICE,
    photoSide: "start",
    rect: { x: 0, y: 150, w: 520, h: 300 },
    knot: { x: 575, y: 300 },
  },
  {
    value: PERSISTENCE,
    photo: RECEPTION,
    photoSide: "end",
    rect: { x: 480, y: 590, w: 520, h: 300 },
    knot: { x: 425, y: 740 },
  },
  {
    value: PARTNERSHIP,
    photo: LOUNGE,
    photoSide: "start",
    rect: { x: 0, y: 1030, w: 520, h: 300 },
    knot: { x: 575, y: 1180 },
  },
];

const TEXT_GAP = 47;
const TEXT_LIFT = 52;

const THREAD_A =
  "M200,0 C200,110 560,170 575,300C594,520 700,520 700,640 C700,880 590,1050 575,1180 C560,1290 440,1300 440,1520";
const THREAD_B =
  "M640,0 C640,150 590,230 575,300 C554,398 300,420 300,520C300,610 410,610 425,740 C440,870 470,940 470,1060 C470,1260 500,1380 500,1520";
const THREAD_C =
  "M940,0 C940,160 965,240 965,380 C965,560 445,600 425,740 C405,880 420,930 480,980 C552,1040 562,1080 575,1180 C588,1280 580,1400 580,1520";

const knotBox = (knot: { x: number; y: number }): Rect => ({
  x: knot.x - 14,
  y: knot.y - 28,
  w: 28,
  h: 56,
});

const [SCENE_FOCUS, SCENE_PERSISTENCE, SCENE_PARTNERSHIP] = SCENES;

const SWATCH_TOP = 1500;
const SWATCH_LEFT = 370;
const SWATCH_WIDTH = 260;
const SWATCH_HEIGHT = 184;
const WARP_COLUMNS = Array.from({ length: 13 }, (_, index) => index);
const WEFT_ROWS = Array.from({ length: 11 }, (_, index) => index);
const TIED_COLUMNS = new Set([3, 6, 10]);
const columnX = (index: number) => SWATCH_LEFT + 10 + index * 20;
const rowY = (index: number) => SWATCH_TOP + 12 + index * 16;

const narration = (place: string) => `在${place}`;

const styles = stylex.create({
  section: {
    backgroundColor: tone.paper,
    overflowX: "clip",
    paddingTop: { default: 84, [media.tablet]: 112, [media.wide]: 40 },
  },
  canvas: {
    position: "relative",
    isolation: "isolate",
    height: { default: "auto", [media.wide]: CANVAS_HEIGHT },
  },
  layer: {
    display: { default: "none", [media.wide]: "block" },
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
  },
  under: { zIndex: 0 },
  over: { zIndex: 2 },
  svg: {
    display: "block",
    width: "100%",
    height: "100%",
    overflow: "visible",
  },
  scenes: {
    position: { default: "relative", [media.wide]: "static" },
    display: "flex",
    flexDirection: "column",
    gap: { default: 72, [media.tablet]: 96, [media.wide]: 0 },
    margin: 0,
    paddingBlock: 0,
    paddingInlineStart: { default: 32, [media.wide]: 0 },
    paddingInlineEnd: 0,
    listStyleType: "none",
    backgroundImage: {
      default: `linear-gradient(to right, transparent 3px, ${tone.thread} 3px 4px, transparent 4px 10px, ${tone.thread} 10px 11px, transparent 11px 17px, ${tone.thread} 17px 18px, transparent 18px)`,
      [media.wide]: "none",
    },
    backgroundSize: "20px 100%",
    backgroundRepeat: "no-repeat",
  },
  scene: {
    position: { default: "relative", [media.wide]: "static" },
    display: "flex",
    flexDirection: "column",
    gap: { default: 24, [media.tablet]: 32 },
  },
  text: {
    position: { default: "static", [media.wide]: "absolute" },
    zIndex: 3,
    display: "flex",
    flexDirection: "column",
    width: { default: "auto", [media.wide]: 280 },
    maxWidth: "36em",
  },
  textEndAlign: {
    alignItems: { default: "stretch", [media.wide]: "flex-end" },
    textAlign: { default: "start", [media.wide]: "end" },
  },
  placeStart: (left: string, top: number) => ({ left, top }),
  placeEnd: (right: string, top: number) => ({ right, top }),
  narration: {
    margin: 0,
    marginBottom: 14,
    fontSize: 13,
    lineHeight: "20px",
    letterSpacing: "0.12em",
    color: tone.label,
  },
  title: {
    position: "relative",
    margin: 0,
    fontSize: { default: 24, [media.wide]: 28 },
    fontWeight: 700,
    lineHeight: 1.25,
    letterSpacing: "0.1em",
    color: tone.ink,
  },
  knotMark: {
    display: { default: "block", [media.wide]: "none" },
    position: "absolute",
    top: "50%",
    left: -32,
    width: 20,
    height: 36,
    marginTop: -18,
    backgroundImage: `linear-gradient(to bottom right, transparent calc(50% - 0.6px), ${tone.indigo} calc(50% - 0.6px) calc(50% + 0.6px), transparent calc(50% + 0.6px)), radial-gradient(circle at 50% 50%, ${tone.paper} 3px, transparent 3.5px), linear-gradient(to bottom left, transparent calc(50% - 0.6px), ${tone.indigo} calc(50% - 0.6px) calc(50% + 0.6px), transparent calc(50% + 0.6px))`,
  },
  desc: {
    margin: 0,
    marginTop: 18,
    fontSize: 16,
    lineHeight: 1.9,
    letterSpacing: "0.03em",
    color: tone.body,
    textWrap: "pretty",
  },
  photo: {
    position: { default: "static", [media.wide]: "absolute" },
    zIndex: 1,
    overflow: "hidden",
    width: { default: "100%", [media.wide]: "52%" },
    height: { default: "auto", [media.wide]: 300 },
    margin: 0,
    aspectRatio: { default: "16 / 10", [media.wide]: "auto" },
    backgroundColor: tone.page,
    outlineWidth: 1,
    outlineStyle: "solid",
    outlineColor: tone.photoEdge,
    outlineOffset: -1,
  },
  photoImage: {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  ending: {
    position: { default: "relative", [media.wide]: "absolute" },
    zIndex: 1,
    top: { default: null, [media.wide]: SWATCH_TOP },
    left: { default: null, [media.wide]: "30%" },
    width: { default: "auto", [media.wide]: "40%" },
    display: "flex",
    flexDirection: "column",
    alignItems: { default: "flex-start", [media.wide]: "center" },
    gap: 22,
    marginTop: { default: 72, [media.wide]: 0 },
    marginInlineStart: { default: 32, [media.wide]: 0 },
  },
  swatch: {
    display: "block",
    width: { default: "min(100%, 312px)", [media.wide]: "65%" },
    height: { default: 150, [media.wide]: SWATCH_HEIGHT },
    overflow: "visible",
    color: tone.indigo,
  },
  endingLine: {
    margin: 0,
    fontSize: 15,
    lineHeight: 1.6,
    letterSpacing: "0.12em",
    color: tone.body,
  },
});

function ThreadLayer({ clipId, over }: { clipId: string; over: boolean }) {
  const threadProps = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1,
    vectorEffect: "non-scaling-stroke",
  } as const;
  const haloProps = { ...threadProps, stroke: "#ffffff", strokeWidth: 7 } as const;

  if (!over) {
    return (
      <svg viewBox={VIEWBOX} preserveAspectRatio="none" {...stylex.props(styles.svg)}>
        <path d={THREAD_A} {...threadProps} />
        <path d={THREAD_B} {...threadProps} />
        <path d={THREAD_C} {...threadProps} />
      </svg>
    );
  }

  const rects = (key: string, boxes: readonly Rect[]) => (
    <clipPath id={`${clipId}-${key}`}>
      {boxes.map((box) => (
        <rect key={`${box.x}-${box.y}`} x={box.x} y={box.y} width={box.w} height={box.h} />
      ))}
    </clipPath>
  );
  const knotA = knotBox(SCENE_FOCUS.knot);
  const knotB = knotBox(SCENE_PERSISTENCE.knot);
  const knotC = knotBox(SCENE_PARTNERSHIP.knot);

  return (
    <svg viewBox={VIEWBOX} preserveAspectRatio="none" {...stylex.props(styles.svg)}>
      <defs>
        {rects("a", [SCENE_FOCUS.rect, SCENE_PARTNERSHIP.rect, knotA])}
        {rects("b", [knotB])}
        {rects("c", [SCENE_PERSISTENCE.rect, knotC])}
        {rects("ha", [knotA])}
        {rects("hc", [knotC])}
      </defs>
      <path d={THREAD_A} clipPath={`url(#${clipId}-ha)`} {...haloProps} />
      <path d={THREAD_B} clipPath={`url(#${clipId}-b)`} {...haloProps} />
      <path d={THREAD_C} clipPath={`url(#${clipId}-hc)`} {...haloProps} />
      <path d={THREAD_A} clipPath={`url(#${clipId}-a)`} {...threadProps} />
      <path d={THREAD_B} clipPath={`url(#${clipId}-b)`} {...threadProps} />
      <path d={THREAD_C} clipPath={`url(#${clipId}-c)`} {...threadProps} />
    </svg>
  );
}

const threadInk = stylex.create({
  ink: { color: tone.thread },
});

function Swatch() {
  const bottom = SWATCH_TOP + SWATCH_HEIGHT;
  return (
    <svg
      aria-hidden="true"
      viewBox={`${SWATCH_LEFT} ${SWATCH_TOP} ${SWATCH_WIDTH} ${SWATCH_HEIGHT}`}
      preserveAspectRatio="none"
      {...stylex.props(styles.swatch)}
    >
      {WARP_COLUMNS.map((column) => (
        <line
          key={`warp-${column}`}
          x1={columnX(column)}
          x2={columnX(column)}
          y1={SWATCH_TOP}
          y2={bottom}
          stroke="currentColor"
          strokeOpacity={TIED_COLUMNS.has(column) ? 0.9 : 0.38}
          strokeDasharray="26 6"
          strokeDashoffset={column % 2 === 0 ? 17 : 1}
        />
      ))}
      {WEFT_ROWS.map((row) => (
        <line
          key={`weft-${row}`}
          x1={SWATCH_LEFT}
          x2={SWATCH_LEFT + SWATCH_WIDTH}
          y1={rowY(row)}
          y2={rowY(row)}
          stroke="currentColor"
          strokeOpacity={0.62}
          strokeDasharray="34 6"
          strokeDashoffset={row % 2 === 0 ? 7 : 27}
        />
      ))}
    </svg>
  );
}

export function CultureStory() {
  const clipId = `weave${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const canvasRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: canvasRef,
    offset: ["start 70%", "end 70%"],
  });
  const drawn = useTransform(
    scrollYProgress,
    (progress) => `inset(0px 0px ${((1 - Math.min(1, progress * 1.08)) * 100).toFixed(2)}% 0px)`,
  );
  const layerStyle = { clipPath: reduce ? "none" : drawn };

  return (
    <section
      id="about-culture"
      aria-labelledby="about-culture-title"
      {...stylex.props(ui.section, ui.anchor, styles.section)}
    >
      <h2 id="about-culture-title" {...stylex.props(ui.srOnly)}>
        {ABOUT_CULTURE.eyebrow}
      </h2>
      <div {...stylex.props(ui.shell)}>
        <div ref={canvasRef} {...stylex.props(styles.canvas)}>
          <m.div
            aria-hidden="true"
            {...stylex.props(styles.layer, styles.under, threadInk.ink)}
            style={layerStyle}
          >
            <ThreadLayer clipId={clipId} over={false} />
          </m.div>
          <ol {...stylex.props(styles.scenes)}>
            {SCENES.map((scene) => {
              const textTop = scene.knot.y - TEXT_LIFT;
              return (
                <li key={scene.value.title} {...stylex.props(styles.scene)}>
                  <Reveal
                    sx={[
                      styles.text,
                      scene.photoSide === "start"
                        ? styles.placeStart(`${(scene.knot.x + TEXT_GAP) / 10}%`, textTop)
                        : [
                            styles.textEndAlign,
                            styles.placeEnd(`${100 - (scene.knot.x - TEXT_GAP) / 10}%`, textTop),
                          ],
                    ]}
                  >
                    <p {...stylex.props(styles.narration)}>{narration(scene.photo.caption)}</p>
                    <h3 {...stylex.props(styles.title)}>
                      <span aria-hidden="true" {...stylex.props(styles.knotMark)} />
                      {scene.value.title}
                    </h3>
                    <p {...stylex.props(styles.desc)}>{scene.value.desc}</p>
                  </Reveal>
                  <figure
                    {...stylex.props(
                      styles.photo,
                      styles.placeStart(`${scene.rect.x / 10}%`, scene.rect.y),
                    )}
                  >
                    <img
                      src={scene.photo.large}
                      alt={scene.photo.alt}
                      loading="lazy"
                      decoding="async"
                      {...stylex.props(styles.photoImage)}
                    />
                  </figure>
                </li>
              );
            })}
          </ol>
          <m.div
            aria-hidden="true"
            {...stylex.props(styles.layer, styles.over, threadInk.ink)}
            style={layerStyle}
          >
            <ThreadLayer clipId={clipId} over />
          </m.div>
          <div {...stylex.props(styles.ending)}>
            <Swatch />
            <p {...stylex.props(styles.endingLine)}>织成同一块布</p>
          </div>
        </div>
      </div>
    </section>
  );
}
