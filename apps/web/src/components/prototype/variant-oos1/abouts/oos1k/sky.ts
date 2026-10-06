export type Magnitude = 1 | 2 | 3;

type Star = { x: number; y: number; mag: Magnitude };
export type MagnitudePaths = Record<Magnitude, string>;

export const FIELD_RADIUS = 1000;
export const RING_RADIUS = 780;

function seeded(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const round = (value: number) => Math.round(value * 10) / 10;

function magnitudeOf(roll: number, bright: number, middle: number): Magnitude {
  if (roll < bright) return 1;
  if (roll < bright + middle) return 2;
  return 3;
}

function disc(seed: number, count: number): Star[] {
  const random = seeded(seed);
  const stars: Star[] = [];
  while (stars.length < count) {
    const radius = FIELD_RADIUS * Math.sqrt(random());
    const angle = random() * Math.PI * 2;
    const mag = magnitudeOf(random(), 0.045, 0.2);
    if (radius < 64) continue;
    stars.push({ x: radius * Math.cos(angle), y: radius * Math.sin(angle), mag });
  }
  return stars;
}

function band(seed: number, count: number): Star[] {
  const random = seeded(seed);
  const tilt = (24 * Math.PI) / 180;
  const along = { x: Math.cos(tilt), y: Math.sin(tilt) };
  const across = { x: -along.y, y: along.x };
  const stars: Star[] = [];
  while (stars.length < count) {
    const t = (random() * 2 - 1) * FIELD_RADIUS;
    const spread = (random() + random() + random() - 1.5) * 120 + 280;
    const x = along.x * t + across.x * spread;
    const y = along.y * t + across.y * spread;
    if (Math.hypot(x, y) > FIELD_RADIUS || Math.hypot(x, y) < 64) continue;
    stars.push({ x, y, mag: magnitudeOf(random(), 0, 0.08) });
  }
  return stars;
}

function toPaths(stars: Star[]): MagnitudePaths {
  const paths: Record<Magnitude, string[]> = { 1: [], 2: [], 3: [] };
  for (const star of stars) paths[star.mag].push(`M${round(star.x)} ${round(star.y)}h0`);
  return { 1: paths[1].join(""), 2: paths[2].join(""), 3: paths[3].join("") };
}

export const FIELD = {
  sparse: toPaths(disc(1995, 118)),
  dense: toPaths([...disc(2016, 210), ...band(16, 190)]),
};

function polar(radius: number, degrees: number) {
  const angle = (degrees * Math.PI) / 180;
  return { x: round(radius * Math.cos(angle)), y: round(radius * Math.sin(angle)) };
}

export const DECLINATION_RADII = [160, 320, 480, 640, 940] as const;

export const HOUR_LINES = Array.from({ length: 12 }, (_, index) => {
  const from = polar(120, index * 30);
  const to = polar(FIELD_RADIUS, index * 30);
  return `M${from.x} ${from.y}L${to.x} ${to.y}`;
}).join("");

export const RING_TICKS = Array.from({ length: 360 }, (_, degree) => {
  const length = degree % 15 === 0 ? 20 : degree % 5 === 0 ? 11 : 5;
  const from = polar(RING_RADIUS, degree);
  const to = polar(RING_RADIUS + length, degree);
  return `M${from.x} ${from.y}L${to.x} ${to.y}`;
}).join("");

export const RING_HOURS = Array.from({ length: 12 }, (_, index) => {
  const degrees = index * 30 - 90;
  return { label: `${index * 2}h`, degrees, ...polar(RING_RADIUS + 44, degrees) };
});

export function chartStars(seed: number, count: number, width: number, height: number) {
  const random = seeded(seed);
  return Array.from({ length: count }, () => ({
    x: round(random() * width),
    y: round(random() * height),
    mag: magnitudeOf(random(), 0, 0.22),
  }));
}
