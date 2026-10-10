import * as stylex from "@stylexjs/stylex";
import { useState, type CSSProperties } from "react";

import { ABOUT_CAMPUS } from "../../about-data";
import { seeded } from "./geometry";
import { Lightbox, type LightboxPhoto } from "./lightbox";
import { SectionHead } from "./section-head";
import { srOnly, ui } from "./shared";
import { bp, chrome, face, tone } from "./tokens.stylex";

type PhotoId = (typeof ABOUT_CAMPUS.photos)[number]["id"];

const ENGLISH: Record<PhotoId, string> = {
  lab: "Laboratory",
  showroom: "Showroom",
  reception: "Reception",
  office: "Open office",
  lounge: "Lounge",
  aerial: "Headquarters",
  grounds: "Grounds",
};

const CORE = 500;
const GAP = 22;
const ORIGIN = 2600;
const FIRST_RING = 72;

const CORE_SAMPLE: readonly { id: PhotoId; width: number; ratio: number }[] = [
  { id: "lab", width: 280, ratio: 2.4 },
  { id: "showroom", width: 310, ratio: 1.5 },
  { id: "reception", width: 340, ratio: 1.5 },
  { id: "office", width: 370, ratio: 1.5 },
  { id: "lounge", width: 400, ratio: 1.5 },
  { id: "aerial", width: 440, ratio: 4 / 3 },
  { id: "grounds", width: 300, ratio: 2 / 3 },
];

const ringY = (depth: number, x: number) => {
  const radius = ORIGIN + depth;
  return -ORIGIN + Math.sqrt(radius * radius - (x - CORE) ** 2);
};

const tangentDeg = (depth: number, x: number) => {
  const radius = ORIGIN + depth;
  const dx = x - CORE;
  return (Math.atan2(-dx, Math.sqrt(radius * radius - dx * dx)) * 180) / Math.PI;
};

let depth = FIRST_RING;
const SAMPLES = CORE_SAMPLE.map((sample, index) => {
  const photo = ABOUT_CAMPUS.photos.find((candidate) => candidate.id === sample.id);
  if (!photo) throw new Error(`Missing campus photo ${sample.id}`);
  const side = index % 2 === 0 ? 1 : -1;
  const height = sample.width / sample.ratio;
  const inner = CORE + side * GAP;
  const left = side > 0 ? inner : inner - sample.width;
  const top = ringY(depth, inner) + 8;
  const anchorX = inner + side * 4;
  const anchorY = ringY(depth, anchorX) - 12;
  const placed = {
    ...photo,
    english: ENGLISH[sample.id],
    side,
    depth,
    ratio: sample.ratio,
    left,
    top,
    width: sample.width,
    height,
    captionX: ((anchorX - left) / sample.width) * 100,
    captionY: ((anchorY - top) / height) * 100,
    angle: tangentDeg(depth, inner + side * 110),
  };
  depth += (height + 84) / 2 + 14;
  return placed;
});

const HEIGHT = Math.ceil(Math.max(...SAMPLES.map((sample) => sample.top + sample.height)) + 96);

const GALLERY_VARS = { "--oos1o-gallery-ratio": `1000 / ${HEIGHT}` } as CSSProperties;

const arc = (ringDepth: number) => {
  const radius = ORIGIN + ringDepth;
  const y = ringY(ringDepth, -500).toFixed(1);
  return `M-500 ${y}A${radius} ${radius} 0 0 0 1500 ${y}`;
};

const TEXTURE = (() => {
  const random = seeded(2015);
  let path = "";
  for (let ringDepth = 6; ringDepth < HEIGHT; ringDepth += 16 + random() * 16) {
    path += arc(ringDepth);
  }
  return path;
})();

const SAMPLE_RINGS = SAMPLES.map((sample) => arc(sample.depth)).join("");

const LIGHTBOX: readonly LightboxPhoto[] = SAMPLES.map(({ id, large, alt, caption, english }) => ({
  id,
  large,
  alt,
  caption,
  english,
}));

const styles = stylex.create({
  section: {
    position: "relative",
    overflow: "hidden",
    paddingTop: { default: 96, [bp.tablet]: 128, [bp.desktop]: 168 },
    paddingBottom: { default: 96, [bp.tablet]: 112, [bp.desktop]: 144 },
    scrollMarginTop: chrome.header,
  },
  head: {
    display: "flex",
    flexDirection: { default: "column", [bp.desktop]: "row" },
    alignItems: { default: "flex-start", [bp.desktop]: "flex-end" },
    justifyContent: "space-between",
    gap: 20,
    marginBottom: { default: 40, [bp.tablet]: 48, [bp.desktop]: 24 },
  },
  note: {
    margin: 0,
    maxWidth: "24em",
    fontSize: { default: 19, [bp.desktop]: 22 },
    lineHeight: 1.35,
    color: tone.body,
  },
  gallery: {
    position: "relative",
    aspectRatio: { default: "auto", [bp.tabletUp]: "var(--oos1o-gallery-ratio)" },
  },
  rings: {
    display: { default: "none", [bp.tabletUp]: "block" },
    position: "absolute",
    top: 0,
    left: "-50%",
    width: "200%",
    height: "100%",
    overflow: "hidden",
    pointerEvents: "none",
  },
  end: {
    display: { default: "none", [bp.tabletUp]: "block" },
    position: "absolute",
    left: "50%",
    margin: 0,
    transform: "translateX(-50%)",
    fontSize: 17,
    lineHeight: 1,
    color: tone.body,
    whiteSpace: "nowrap",
    backgroundColor: tone.paper,
    paddingInline: 10,
  },
  endTop: {
    top: -6,
  },
  endBottom: {
    bottom: 20,
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 40,
    margin: 0,
    padding: 0,
    paddingInlineStart: { default: 22, [bp.tabletUp]: 0 },
    borderInlineStartWidth: { default: 1, [bp.tabletUp]: 0 },
    borderInlineStartStyle: "solid",
    borderInlineStartColor: "rgba(11, 42, 92, 0.35)",
    listStyleType: "none",
  },
  item: {
    position: { default: "relative", [bp.tabletUp]: "absolute" },
    left: { default: "auto", [bp.tabletUp]: "var(--oos1o-left)" },
    top: { default: "auto", [bp.tabletUp]: "var(--oos1o-top)" },
    width: { default: "var(--oos1o-phone-width)", [bp.tabletUp]: "var(--oos1o-width)" },
    display: "flex",
    flexDirection: "column",
    gap: { default: 12, [bp.tabletUp]: 0 },
  },
  dot: {
    display: { default: "block", [bp.tabletUp]: "none" },
    position: "absolute",
    top: 6,
    left: -26,
    width: 7,
    height: 7,
    borderRadius: "50%",
    backgroundColor: tone.navy,
  },
  caption: {
    display: "flex",
    alignItems: "baseline",
    gap: 10,
    margin: 0,
    position: { default: "static", [bp.tabletUp]: "absolute" },
    left: "var(--oos1o-caption-x)",
    top: "var(--oos1o-caption-y)",
    width: "max-content",
    whiteSpace: "nowrap",
    fontFamily: face.sans,
    fontSize: 15,
    lineHeight: 1.2,
    letterSpacing: "0.04em",
    color: tone.ink,
  },
  captionOut: {
    transformOrigin: "0 100%",
    transform: { default: "none", [bp.tabletUp]: "translateY(-100%) rotate(var(--oos1o-angle))" },
  },
  captionIn: {
    transformOrigin: "100% 100%",
    transform: {
      default: "none",
      [bp.tabletUp]: "translate(-100%, -100%) rotate(var(--oos1o-angle))",
    },
  },
  index: {
    fontSize: 13,
    color: tone.blue,
  },
  english: {
    fontSize: 18,
    letterSpacing: 0,
    color: tone.body,
  },
  button: {
    position: "relative",
    display: "block",
    width: "100%",
    aspectRatio: "var(--oos1o-ratio)",
    padding: 0,
    borderWidth: 0,
    overflow: "hidden",
    backgroundColor: tone.tint,
    cursor: "zoom-in",
  },
  image: {
    transform: {
      default: "none",
      [stylex.when.ancestor(":hover")]: { default: "none", [bp.hoverMotion]: "scale(1.035)" },
    },
    transitionProperty: "transform",
    transitionDuration: "1100ms",
    transitionTimingFunction: chrome.ease,
  },
});

function sampleVars(sample: (typeof SAMPLES)[number], index: number) {
  return {
    "--oos1o-left": `${sample.left / 10}%`,
    "--oos1o-top": `${(sample.top / HEIGHT) * 100}%`,
    "--oos1o-width": `${sample.width / 10}%`,
    "--oos1o-phone-width": `${72 + index * 4.6}%`,
    "--oos1o-ratio": `${sample.ratio}`,
    "--oos1o-caption-x": `${sample.captionX}%`,
    "--oos1o-caption-y": `${sample.captionY}%`,
    "--oos1o-angle": `${sample.angle}deg`,
  } as CSSProperties;
}

export function Campus() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const count = LIGHTBOX.length;

  return (
    <section id="about-campus" aria-labelledby="oos1o-campus" {...stylex.props(styles.section)}>
      <div {...stylex.props(ui.shell)}>
        <div {...stylex.props(styles.head)}>
          <SectionHead id="oos1o-campus" label="Campus" title={ABOUT_CAMPUS.title} />
          <p lang="en" {...stylex.props(ui.serif, styles.note)}>
            Seven samples taken along one radius, from the heart of the building out to the grounds.
          </p>
        </div>

        <div {...stylex.props(styles.gallery)} style={GALLERY_VARS}>
          <svg viewBox={`-500 0 2000 ${HEIGHT}`} aria-hidden="true" {...stylex.props(styles.rings)}>
            <path
              d={TEXTURE}
              fill="none"
              stroke="#0b2a5c"
              strokeOpacity={0.07}
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
            <path
              d={SAMPLE_RINGS}
              fill="none"
              stroke="#0b2a5c"
              strokeOpacity={0.32}
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
            <line
              x1={CORE}
              x2={CORE}
              y1={0}
              y2={HEIGHT - 52}
              stroke="#0b2a5c"
              strokeOpacity={0.45}
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
            {SAMPLES.map((sample) => (
              <circle key={sample.id} cx={CORE} cy={sample.depth} r={3.4} fill="#0b2a5c" />
            ))}
          </svg>
          <p lang="en" aria-hidden="true" {...stylex.props(ui.serif, styles.end, styles.endTop)}>
            toward the pith
          </p>
          <p lang="en" aria-hidden="true" {...stylex.props(ui.serif, styles.end, styles.endBottom)}>
            toward the bark
          </p>

          <ol {...stylex.props(styles.list)}>
            {SAMPLES.map((sample, index) => (
              <li key={sample.id} {...stylex.props(styles.item)} style={sampleVars(sample, index)}>
                <span aria-hidden="true" {...stylex.props(styles.dot)} />
                <p
                  aria-hidden="true"
                  {...stylex.props(
                    styles.caption,
                    sample.side > 0 ? styles.captionOut : styles.captionIn,
                  )}
                >
                  <span {...stylex.props(ui.latin, styles.index)}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{sample.caption}</span>
                  <span lang="en" {...stylex.props(ui.serif, styles.english)}>
                    {sample.english}
                  </span>
                </p>
                <button
                  type="button"
                  onClick={() => setOpenIndex(index)}
                  {...stylex.props(styles.button, ui.focusRing, stylex.defaultMarker())}
                >
                  <img
                    src={sample.src}
                    alt={sample.alt}
                    loading="lazy"
                    decoding="async"
                    {...stylex.props(ui.fill, styles.image)}
                  />
                  <span {...srOnly}>View larger</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <Lightbox
        photos={LIGHTBOX}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onStep={(delta) =>
          setOpenIndex((current) => (current === null ? null : (current + delta + count) % count))
        }
      />
    </section>
  );
}
