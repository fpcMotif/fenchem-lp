import * as stylex from "@stylexjs/stylex";
import { useInView } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

import { GLOBAL_INTRO, IMAGES, OFFICE_COLUMNS } from "./content";
import { Reveal } from "./motion";
import { color, font, layout as layoutTokens, media } from "./tokens.stylex";
import { SectionTitle } from "./ui";
import { layout } from "./ui-values";

const MAP_WIDTH = 1222;
const MAP_HEIGHT = 641;
const DOT_PITCH = 5;
const DOT_FILL = 0.62;
const DOT_COVERAGE_MIN = 0.5;
const DOT_COLOR = "rgba(126, 168, 236, 0.34)";

const BAKED_PIN_MAX_RED = 150;
const BAKED_PIN_MIN_ALPHA = 24;
const BAKED_PIN_HOLE_REACH = 16;
const BAKED_PIN_HALO = 2;
const CELL_KNOWN_MIN = 0.35;

const LON_PX = 3.3717;
const LON_ORIGIN_PX = 571.9;
const LAT_PX = 3.616;
const LAT_ORIGIN_PX = 414;

const ARC_MS = 1200;
const ARC_STAGGER_MS = 40;
const DOT_POP_AFTER_MS = 1100;
const ARC_BOW = 0.2;
const ARC_TOP_MARGIN_PX = 12;
const LEADER_MIN_PX = 14;
const HOVER_MS = "200ms";
const DIMMED_OPACITY = 0.3;

const CITY_INK = "#c7d2e8";
const META = "全球资源整合 · 本地化服务";
const HQ_OFFICE = "南京，中国";
const HQ_TAG = "总部";

type OfficeName = (typeof OFFICE_COLUMNS)[number][number]["offices"][number];
type Side = "e" | "w" | "n" | "s";
type Place = {
  lat: number;
  lon: number;
  side: Side;
  dx?: number;
  dy?: number;
};

const PLACES: Record<OfficeName, Place> = {
  "南京，中国": { lat: 32.06, lon: 118.8, side: "e", dx: 13, dy: 9 },
  "东京，日本": { lat: 35.68, lon: 139.69, side: "e" },
  "曼谷，泰国": { lat: 13.76, lon: 100.5, side: "e" },
  "吉隆坡，马来西亚": { lat: 3.14, lon: 101.69, side: "e" },
  "孟买，印度": { lat: 19.08, lon: 72.88, side: "w" },
  "雅加达，印度尼西亚": { lat: -6.21, lon: 106.85, side: "e" },
  "科隆，德国": { lat: 50.94, lon: 6.96, side: "w", dx: -16, dy: 14 },
  "曼彻斯特，英国": { lat: 53.48, lon: -2.24, side: "w" },
  "克拉科夫，波兰": { lat: 50.06, lon: 19.94, side: "e", dx: 16, dy: 13 },
  "斯特拉瓦，捷克": { lat: 49.82, lon: 18.26, side: "s", dx: -16, dy: 28 },
  "奇诺，加利福尼亚州": { lat: 34.01, lon: -117.69, side: "w" },
  "格莱姆斯，爱荷华州": { lat: 41.69, lon: -93.79, side: "w" },
  "劳雷尔山，新泽西州": { lat: 39.93, lon: -74.89, side: "e" },
  "圣保罗，巴西": { lat: -23.55, lon: -46.63, side: "e", dx: 9, dy: -4 },
  "库里蒂巴，巴西": { lat: -25.43, lon: -49.27, side: "w", dx: -9, dy: 4 },
  "约翰内斯堡，南非": { lat: -26.2, lon: 28.05, side: "e" },
};

const DEFAULT_OFFSET: Record<Side, { dx: number; dy: number }> = {
  e: { dx: 9, dy: 0 },
  w: { dx: -9, dy: 0 },
  n: { dx: 0, dy: -9 },
  s: { dx: 0, dy: 9 },
};

const radians = (degrees: number) => (degrees * Math.PI) / 180;
const millerDegrees = (lat: number) =>
  (180 / Math.PI) * 1.25 * Math.log(Math.tan(Math.PI / 4 + 0.4 * radians(lat)));

const projectLatLon = (lat: number, lon: number) => ({
  x: LON_PX * lon + LON_ORIGIN_PX,
  y: LAT_ORIGIN_PX - LAT_PX * millerDegrees(lat),
});

const REGIONS: readonly { name: string; offices: readonly OfficeName[] }[] =
  OFFICE_COLUMNS.flat().map(({ region, offices }) => ({ name: region, offices }));

type City = {
  office: OfficeName;
  name: string;
  region: number;
  x: number;
  y: number;
  side: Side;
  dx: number;
  dy: number;
  hq: boolean;
};

const CITIES: readonly City[] = REGIONS.flatMap((region, regionIndex) =>
  region.offices.map((office) => {
    const place = PLACES[office];
    const fallback = DEFAULT_OFFSET[place.side];
    return {
      office,
      name: office.split("，")[0] ?? office,
      region: regionIndex,
      ...projectLatLon(place.lat, place.lon),
      side: place.side,
      dx: place.dx ?? fallback.dx,
      dy: place.dy ?? fallback.dy,
      hq: office === HQ_OFFICE,
    };
  }),
);

function findHeadquarters(cities: readonly City[]): City {
  const found = cities.find(({ hq }) => hq);
  if (!found) throw new Error("headquarters office missing from OFFICE_COLUMNS");
  return found;
}

const HQ = findHeadquarters(CITIES);

const ARCS = CITIES.filter(({ hq }) => !hq)
  .sort((a, b) => Math.hypot(a.x - HQ.x, a.y - HQ.y) - Math.hypot(b.x - HQ.x, b.y - HQ.y))
  .map((city, order) => ({ city, delayMs: order * ARC_STAGGER_MS }));

const ARC_DELAY = new Map(ARCS.map(({ city, delayMs }) => [city.office, delayMs]));

function arcPath(origin: City, city: City, scale: number) {
  const x0 = origin.x * scale;
  const y0 = origin.y * scale;
  const x1 = city.x * scale;
  const y1 = city.y * scale;
  const length = Math.hypot(x1 - x0, y1 - y0);
  const nx = (y1 - y0) / length;
  const ny = -(x1 - x0) / length;
  const up = ny <= 0 ? 1 : -1;
  const midX = (x0 + x1) / 2;
  const midY = (y0 + y1) / 2;
  const sagitta = Math.min(ARC_BOW * length, midY - ARC_TOP_MARGIN_PX * scale);
  const cx = midX + up * nx * sagitta * 2;
  const cy = midY + up * ny * sagitta * 2;
  return `M${x0.toFixed(2)} ${y0.toFixed(2)}Q${cx.toFixed(2)} ${cy.toFixed(2)} ${x1.toFixed(2)} ${y1.toFixed(2)}`;
}

type LandMask = { alpha: Uint8Array; pin: Uint8Array };

const LEFT = 1;
const RIGHT = 2;
const UP = 4;
const DOWN = 8;

function markReach(
  ink: Uint8Array,
  reach: Uint8Array,
  start: number,
  step: number,
  count: number,
  bit: number,
) {
  let gap = Infinity;
  let index = start;
  for (let n = 0; n < count; n++, index += step) {
    gap = ink[index] ? 0 : gap + 1;
    if (gap <= BAKED_PIN_HOLE_REACH) reach[index] = (reach[index] ?? 0) | bit;
  }
}

function dilate(mask: Uint8Array, radius: number) {
  const wide = new Uint8Array(mask.length);
  const out = new Uint8Array(mask.length);
  for (let y = 0; y < MAP_HEIGHT; y++) {
    for (let x = 0; x < MAP_WIDTH; x++) {
      for (let d = -radius; d <= radius; d++) {
        const nx = x + d;
        if (nx >= 0 && nx < MAP_WIDTH && mask[y * MAP_WIDTH + nx]) {
          wide[y * MAP_WIDTH + x] = 1;
          break;
        }
      }
    }
  }
  for (let y = 0; y < MAP_HEIGHT; y++) {
    for (let x = 0; x < MAP_WIDTH; x++) {
      for (let d = -radius; d <= radius; d++) {
        const ny = y + d;
        if (ny >= 0 && ny < MAP_HEIGHT && wide[ny * MAP_WIDTH + x]) {
          out[y * MAP_WIDTH + x] = 1;
          break;
        }
      }
    }
  }
  return out;
}

function buildLandMask(image: HTMLImageElement): LandMask {
  const canvas = document.createElement("canvas");
  canvas.width = MAP_WIDTH;
  canvas.height = MAP_HEIGHT;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) throw new Error("2d canvas context unavailable");
  context.drawImage(image, 0, 0, MAP_WIDTH, MAP_HEIGHT);
  const { data } = context.getImageData(0, 0, MAP_WIDTH, MAP_HEIGHT);
  const total = MAP_WIDTH * MAP_HEIGHT;
  const alpha = new Uint8Array(total);
  const ink = new Uint8Array(total);
  for (let i = 0; i < total; i++) {
    const a = data[i * 4 + 3] ?? 0;
    alpha[i] = a;
    ink[i] = a >= BAKED_PIN_MIN_ALPHA && (data[i * 4] ?? 255) < BAKED_PIN_MAX_RED ? 1 : 0;
  }
  const reach = new Uint8Array(total);
  for (let y = 0; y < MAP_HEIGHT; y++) {
    markReach(ink, reach, y * MAP_WIDTH, 1, MAP_WIDTH, LEFT);
    markReach(ink, reach, y * MAP_WIDTH + MAP_WIDTH - 1, -1, MAP_WIDTH, RIGHT);
  }
  for (let x = 0; x < MAP_WIDTH; x++) {
    markReach(ink, reach, x, MAP_WIDTH, MAP_HEIGHT, UP);
    markReach(ink, reach, x + (MAP_HEIGHT - 1) * MAP_WIDTH, -MAP_WIDTH, MAP_HEIGHT, DOWN);
  }
  for (let i = 0; i < total; i++) {
    if (reach[i] === (LEFT | RIGHT | UP | DOWN)) ink[i] = 1;
  }
  return { alpha, pin: dilate(ink, BAKED_PIN_HALO) };
}

async function readLandMask() {
  const image = new Image();
  image.src = IMAGES.officeMap.src;
  await image.decode();
  return buildLandMask(image);
}

let landMask: Promise<LandMask> | undefined;
const loadLandMask = () => (landMask ??= readLandMask());

function landCoverage({ alpha, pin }: LandMask, cols: number, rows: number, cell: number) {
  const sum = new Float32Array(cols * rows);
  const seen = new Uint16Array(cols * rows);
  for (let y = 0; y < MAP_HEIGHT; y++) {
    const row = Math.floor(y / cell);
    if (row >= rows) break;
    for (let x = 0; x < MAP_WIDTH; x++) {
      const col = Math.floor(x / cell);
      const source = y * MAP_WIDTH + x;
      if (col >= cols || pin[source]) continue;
      sum[row * cols + col] = (sum[row * cols + col] ?? 0) + (alpha[source] ?? 0);
      seen[row * cols + col] = (seen[row * cols + col] ?? 0) + 1;
    }
  }
  let cover = new Float32Array(cols * rows);
  let missing = 0;
  for (let i = 0; i < cover.length; i++) {
    const count = seen[i] ?? 0;
    if (count >= cell * cell * CELL_KNOWN_MIN) {
      cover[i] = (sum[i] ?? 0) / (count * 255);
    } else {
      cover[i] = -1;
      missing++;
    }
  }
  while (missing > 0) {
    const next = cover.slice();
    let filled = 0;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if ((cover[row * cols + col] ?? 0) >= 0) continue;
        let total = 0;
        let known = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const nr = row + dy;
            const nc = col + dx;
            if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
            const value = cover[nr * cols + nc] ?? -1;
            if (value < 0) continue;
            total += value;
            known++;
          }
        }
        if (known === 0) continue;
        next[row * cols + col] = total / known;
        filled++;
      }
    }
    if (filled === 0) {
      for (let i = 0; i < next.length; i++) if ((next[i] ?? 0) < 0) next[i] = 0;
      cover = next;
      break;
    }
    cover = next;
    missing -= filled;
  }
  return cover;
}

function paintLand(canvas: HTMLCanvasElement, mask: LandMask) {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const context = canvas.getContext("2d");
  if (!context || width === 0 || height === 0) return;
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(width * ratio);
  canvas.height = Math.round(height * ratio);
  const cols = Math.max(60, Math.round(width / DOT_PITCH));
  const cell = MAP_WIDTH / cols;
  const rows = Math.floor(MAP_HEIGHT / cell);
  const pitch = width / cols;
  const radius = (pitch * DOT_FILL) / 2;
  const cover = landCoverage(mask, cols, rows, cell);
  context.scale(ratio, ratio);
  context.fillStyle = DOT_COLOR;
  context.beginPath();
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if ((cover[row * cols + col] ?? 0) < DOT_COVERAGE_MIN) continue;
      const x = (col + 0.5) * pitch;
      const y = (row + 0.5) * pitch;
      context.moveTo(x + radius, y);
      context.arc(x, y, radius, 0, Math.PI * 2);
    }
  }
  context.fill();
}

const styles = stylex.create({
  section: {
    position: "relative",
    backgroundColor: color.deep,
    color: color.paper,
  },
  grid: {
    display: { default: "flex", [media.desktop]: "grid" },
    flexDirection: "column",
    gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
    columnGap: layoutTokens.gutter,
    rowGap: { default: 40, [media.tablet]: 48, [media.desktop]: 56 },
  },
  header: {
    display: "flex",
    flexDirection: "column",
    rowGap: 20,
    gridColumn: { default: "auto", [media.desktop]: "1 / 9" },
    gridRow: { default: "auto", [media.desktop]: "1" },
  },
  lead: {
    margin: 0,
    maxWidth: "34em",
    fontSize: 17,
    lineHeight: 1.7,
    color: color.white80,
  },
  meta: {
    margin: 0,
    fontSize: 14,
    lineHeight: 1.5,
    color: color.white60,
  },
  mapBox: {
    position: "relative",
    width: "100%",
    maxWidth: { default: "none", [media.tablet]: 900 },
    aspectRatio: "1222 / 641",
    gridColumn: { default: "auto", [media.desktop]: "1 / 9" },
    gridRow: { default: "auto", [media.desktop]: "2" },
  },
  landMap: {
    position: "absolute",
    inset: 0,
    display: "block",
    width: "100%",
    height: "100%",
  },
  arcs: {
    position: "absolute",
    inset: 0,
    display: "block",
    overflow: "visible",
    pointerEvents: "none",
  },
  arc: {
    fill: "none",
    stroke: color.white35,
    strokeWidth: 1,
    strokeDasharray: "1",
    strokeDashoffset: { default: "1", [media.motionReduce]: "0" },
    transitionProperty: "stroke-dashoffset, opacity, stroke",
    transitionDuration: {
      default: `${ARC_MS}ms, ${HOVER_MS}, ${HOVER_MS}`,
      [media.motionReduce]: `0ms, ${HOVER_MS}, ${HOVER_MS}`,
    },
    transitionTimingFunction: "cubic-bezier(0.45, 0, 0.2, 1), linear, linear",
  },
  arcDrawn: { strokeDashoffset: "0" },
  arcOn: { stroke: color.white80 },
  arcOff: { opacity: DIMMED_OPACITY },
  arcAt: (delayMs: number) => ({ transitionDelay: `${delayMs}ms, 0ms, 0ms` }),
  markers: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
  },
  marker: {
    position: "absolute",
    width: 0,
    height: 0,
    opacity: 1,
    transitionProperty: "opacity",
    transitionDuration: HOVER_MS,
    transitionTimingFunction: "linear",
  },
  markerHq: { zIndex: 1 },
  markerOff: { opacity: DIMMED_OPACITY },
  markerAt: (left: string, top: string) => ({ left, top }),
  dot: {
    position: "absolute",
    top: -3,
    left: -3,
    width: 6,
    height: 6,
    borderRadius: "50%",
    backgroundColor: color.paper,
    transform: { default: "scale(0)", [media.motionReduce]: "none" },
    transitionProperty: "transform, box-shadow",
    transitionDuration: {
      default: "360ms, 200ms",
      [media.motionReduce]: "0ms, 200ms",
    },
    transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1), linear",
  },
  dotHq: {
    top: -5,
    left: -5,
    width: 10,
    height: 10,
    backgroundColor: color.royalBright,
    boxShadow: "0 0 0 3px rgba(77, 141, 255, 0.28)",
  },
  dotIn: { transform: "scale(1)" },
  dotOn: { boxShadow: "0 0 0 4px rgba(255, 255, 255, 0.22)" },
  dotAt: (delayMs: number) => ({ transitionDelay: `${delayMs}ms, 0ms` }),
  reveal: {
    opacity: { default: 0, [media.motionReduce]: 1 },
    transitionProperty: "opacity, color",
    transitionDuration: {
      default: "320ms, 200ms",
      [media.motionReduce]: "0ms, 200ms",
    },
    transitionTimingFunction: "linear",
  },
  revealIn: { opacity: 1 },
  revealAt: (delayMs: number) => ({ transitionDelay: `${delayMs}ms, 0ms` }),
  leader: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 1,
    height: 1,
    overflow: "visible",
    display: { default: "none", [media.tabletUp]: "block" },
  },
  leaderLine: {
    stroke: color.white35,
    strokeWidth: 1,
  },
  label: {
    position: "absolute",
    display: { default: "none", [media.tabletUp]: "block" },
    fontFamily: font.cjk,
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 1,
    whiteSpace: "nowrap",
    color: color.white70,
    textShadow: `0 0 3px ${color.deep}, 0 0 6px ${color.deep}, 0 0 10px ${color.deep}`,
  },
  labelHq: {
    fontWeight: 700,
    color: color.paper,
  },
  labelOn: { color: color.paper },
  labelE: { transform: "translate(0, -50%)" },
  labelW: { transform: "translate(-100%, -50%)" },
  labelN: { transform: "translate(-50%, -100%)" },
  labelS: { transform: "translate(-50%, 0)" },
  labelAt: (dx: number, dy: number) => ({ left: dx, top: dy }),
  panel: {
    gridColumn: { default: "auto", [media.desktop]: "9 / -1" },
    gridRow: { default: "auto", [media.desktop]: "1 / span 2" },
    alignSelf: { default: "stretch", [media.desktop]: "start" },
  },
  regions: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [media.tablet]: "repeat(3, minmax(0, 1fr))",
      [media.desktop]: "minmax(0, 1fr)",
    },
    columnGap: layoutTokens.gutter,
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  region: {
    minWidth: 0,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: color.white15,
    transitionProperty: "border-top-color",
    transitionDuration: HOVER_MS,
    transitionTimingFunction: "linear",
  },
  regionOn: { borderTopColor: color.royalBright },
  regionButton: {
    display: "block",
    boxSizing: "border-box",
    width: "100%",
    margin: 0,
    paddingBlock: 20,
    paddingInline: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    color: "inherit",
    fontFamily: font.cjk,
    textAlign: "start",
    cursor: "pointer",
  },
  regionName: {
    display: "block",
    fontSize: 20,
    fontWeight: 700,
    lineHeight: 1.3,
    color: color.paper,
  },
  offices: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
    columnGap: 16,
    marginTop: 8,
  },
  office: {
    display: "block",
    fontSize: 14,
    lineHeight: 1.7,
    color: CITY_INK,
    transitionProperty: "color",
    transitionDuration: HOVER_MS,
    transitionTimingFunction: "linear",
  },
  officeOn: { color: color.paper },
  officeTag: {
    color: color.royalBright,
  },
});

type MarkerState = "idle" | "on" | "off";

const SIDE_STYLE = {
  e: styles.labelE,
  w: styles.labelW,
  n: styles.labelN,
  s: styles.labelS,
} as const;

function MarkerLabel({
  city,
  drawn,
  state,
  delay,
}: {
  city: City;
  drawn: boolean;
  state: MarkerState;
  delay: number;
}) {
  return (
    <span
      {...stylex.props(
        styles.label,
        SIDE_STYLE[city.side],
        styles.labelAt(city.dx, city.dy),
        city.hq && styles.labelHq,
        state === "on" && styles.labelOn,
        styles.reveal,
        drawn && styles.revealIn,
        styles.revealAt(delay),
      )}
    >
      {city.hq ? `${city.name} · ${HQ_TAG}` : city.name}
    </span>
  );
}

function Marker({ city, drawn, state }: { city: City; drawn: boolean; state: MarkerState }) {
  const arcDelay = ARC_DELAY.get(city.office) ?? 0;
  const dotDelay = city.hq ? 0 : arcDelay + DOT_POP_AFTER_MS;
  const labelDelay = city.hq ? 120 : dotDelay + 60;
  const leader = Math.hypot(city.dx, city.dy) > LEADER_MIN_PX;
  return (
    <span
      {...stylex.props(
        styles.marker,
        styles.markerAt(`${(city.x / MAP_WIDTH) * 100}%`, `${(city.y / MAP_HEIGHT) * 100}%`),
        city.hq && styles.markerHq,
        state === "off" && !city.hq && styles.markerOff,
      )}
    >
      {leader ? (
        <svg
          aria-hidden="true"
          {...stylex.props(
            styles.leader,
            styles.reveal,
            drawn && styles.revealIn,
            styles.revealAt(labelDelay),
          )}
        >
          <line x1={0} y1={0} x2={city.dx} y2={city.dy} {...stylex.props(styles.leaderLine)} />
        </svg>
      ) : null}
      <span
        {...stylex.props(
          styles.dot,
          city.hq && styles.dotHq,
          drawn && styles.dotIn,
          state === "on" && styles.dotOn,
          styles.dotAt(dotDelay),
        )}
      />
      <MarkerLabel city={city} drawn={drawn} state={state} delay={labelDelay} />
    </span>
  );
}

function stateOf(region: number, active: number | null): MarkerState {
  if (active === null) return "idle";
  return region === active ? "on" : "off";
}

function WorldMap({ active }: { active: number | null }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [width, setWidth] = useState(0);
  const drawn = useInView(boxRef, { once: true, amount: 0.4 });

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const observer = new ResizeObserver(() => setWidth(box.clientWidth));
    observer.observe(box);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || width === 0) return;
    let cancelled = false;
    void loadLandMask().then((mask) => {
      if (!cancelled) paintLand(canvas, mask);
    });
    return () => {
      cancelled = true;
    };
  }, [width]);

  const scale = width / MAP_WIDTH;
  const paths = useMemo(
    () => (width === 0 ? [] : ARCS.map(({ city }) => arcPath(HQ, city, scale))),
    [scale, width],
  );

  return (
    <div ref={boxRef} role="img" aria-label={IMAGES.officeMap.alt} {...stylex.props(styles.mapBox)}>
      <canvas ref={canvasRef} aria-hidden="true" {...stylex.props(styles.landMap)} />
      {width > 0 ? (
        <svg
          aria-hidden="true"
          width={width}
          height={width * (MAP_HEIGHT / MAP_WIDTH)}
          viewBox={`0 0 ${width} ${width * (MAP_HEIGHT / MAP_WIDTH)}`}
          {...stylex.props(styles.arcs)}
        >
          {ARCS.map(({ city, delayMs }, index) => (
            <path
              key={city.office}
              d={paths[index]}
              pathLength={1}
              {...stylex.props(
                styles.arc,
                drawn && styles.arcDrawn,
                active !== null && city.region === active && styles.arcOn,
                active !== null && city.region !== active && styles.arcOff,
                styles.arcAt(delayMs),
              )}
            />
          ))}
        </svg>
      ) : null}
      <div aria-hidden="true" {...stylex.props(styles.markers)}>
        {CITIES.map((city) => (
          <Marker
            key={city.office}
            city={city}
            drawn={drawn}
            state={stateOf(city.region, active)}
          />
        ))}
      </div>
    </div>
  );
}

export function Network() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [pinned, setPinned] = useState<number | null>(null);
  const active = hovered ?? pinned;

  return (
    <section
      id="offices"
      aria-labelledby="oo-offices-title"
      {...stylex.props(styles.section, layout.section)}
    >
      <div {...stylex.props(layout.shell, layout.inset, styles.grid)}>
        <div {...stylex.props(styles.header)}>
          <SectionTitle id="oo-offices-title" tone="dark">
            {GLOBAL_INTRO.title}
          </SectionTitle>
          <Reveal as="p" index={1} sx={styles.lead}>
            {GLOBAL_INTRO.lead}
          </Reveal>
          <Reveal as="p" index={2} sx={styles.meta}>
            {META}
          </Reveal>
        </div>
        <WorldMap active={active} />
        <div {...stylex.props(styles.panel)}>
          <ul aria-label="Global office regions" {...stylex.props(styles.regions)}>
            {REGIONS.map((region, index) => (
              <Reveal
                as="li"
                key={region.name}
                index={index}
                sx={[styles.region, active === index && styles.regionOn]}
              >
                <button
                  type="button"
                  aria-pressed={pinned === index}
                  onMouseEnter={() => setHovered(index)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={(event) => {
                    if (event.currentTarget.matches(":focus-visible")) setHovered(index);
                  }}
                  onBlur={() => setHovered(null)}
                  onClick={() => setPinned(pinned === index ? null : index)}
                  {...stylex.props(styles.regionButton)}
                >
                  <span {...stylex.props(styles.regionName)}>{region.name}</span>
                  <span {...stylex.props(styles.offices)}>
                    {region.offices.map((office) => (
                      <span
                        key={office}
                        {...stylex.props(styles.office, active === index && styles.officeOn)}
                      >
                        {office}
                        {office === HQ_OFFICE ? (
                          <span {...stylex.props(styles.officeTag)}>{` · ${HQ_TAG}`}</span>
                        ) : null}
                      </span>
                    ))}
                  </span>
                </button>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
