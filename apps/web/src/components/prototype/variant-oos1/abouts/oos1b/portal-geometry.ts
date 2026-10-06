import { OFFICE_ON_AERIAL, ROOMS_IN_WALKING_ORDER } from "./journey";

export type Size = { width: number; height: number };
export type Box = { x: number; y: number; w: number; h: number };
export type Placement = { left: number; top: number; scale: number };
export type Pose = { s: number; x: number; y: number };

export type StageLayout = {
  size: Size;
  matX: number;
  matTop: number;
  band: number;
  gap: number;
  box: Box;
  doorways: readonly Placement[];
  aerial: Box;
  aerialFrameStep: number;
  officeOnAerial: Placement;
};

export const AERIAL_INDEX = ROOMS_IN_WALKING_ORDER.length;
export const OFFICE_INDEX = AERIAL_INDEX - 1;
export const AERIAL_FRAME_COUNT = 4;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), Math.max(min, max));

function coverPoint(box: Box, aspect: number, fx: number, fy: number) {
  const scale = Math.max(box.w / aspect, box.h);
  const shownW = aspect * scale;
  const shownH = scale;
  return {
    x: box.x + (box.w - shownW) / 2 + fx * shownW,
    y: box.y + (box.h - shownH) / 2 + fy * shownH,
  };
}

function placeMiniature(
  size: Size,
  box: Box,
  center: { x: number; y: number },
  scale: number,
  bounds: Box,
  margin: number,
): Placement {
  const w = scale * size.width;
  const h = scale * size.height;
  const left = center.x - w / 2;
  const top = center.y - scale * (box.y + box.h / 2);
  return {
    left: clamp(left, bounds.x + margin, bounds.x + bounds.w - w - margin),
    top: clamp(top, bounds.y + margin, bounds.y + bounds.h - h - margin),
    scale,
  };
}

export function layoutStage(size: Size, aerialAspect: number): StageLayout {
  const gutter = size.width >= 1280 ? 64 : 48;
  const matX = Math.round(Math.max(gutter, (size.width - 1312) / 2));
  const matTop = Math.round(clamp(size.width * 0.024, 24, 36));
  const band = Math.round(clamp(size.height * 0.1, 68, 88));
  const gap = Math.round(matTop / 2);
  const box = { x: matX, y: matTop, w: size.width - matX * 2, h: size.height - matTop - band };

  const doorways: Placement[] = [];
  for (const room of ROOMS_IN_WALKING_ORDER) {
    if (!room.doorwayToNext) continue;
    const { x, y, scale } = room.doorwayToNext;
    const center = coverPoint(box, room.plate.aspect, x, y);
    doorways.push(placeMiniature(size, box, center, scale, box, matTop));
  }

  const aerialH = Math.round(box.h * 0.5);
  const aerialW = Math.round(aerialH * aerialAspect);
  const aerial = {
    x: Math.round(box.x + (box.w - aerialW) / 2),
    y: Math.round(box.y + (box.h - aerialH) / 2),
    w: aerialW,
    h: aerialH,
  };
  const officeScale = (OFFICE_ON_AERIAL.shareOfAerialWidth * aerial.w) / size.width;
  const officeCenter = {
    x: aerial.x + OFFICE_ON_AERIAL.x * aerial.w,
    y: aerial.y + OFFICE_ON_AERIAL.y * aerial.h,
  };
  const officeOnAerial = placeMiniature(size, box, officeCenter, officeScale, aerial, 4);
  const aerialFrameStep = Math.round(
    Math.min(matX * 0.6, (box.h - aerial.h) / 2 / AERIAL_FRAME_COUNT),
  );

  return {
    size,
    matX,
    matTop,
    band,
    gap,
    box,
    doorways,
    aerial,
    aerialFrameStep,
    officeOnAerial,
  };
}

type Phase =
  | { kind: "hold"; room: number; units: number }
  | { kind: "zoom"; room: number; units: number }
  | { kind: "pull"; units: number }
  | { kind: "rest"; units: number };

const PHASES: readonly Phase[] = [
  { kind: "hold", room: 0, units: 0.35 },
  { kind: "zoom", room: 0, units: 1 },
  { kind: "hold", room: 1, units: 0.6 },
  { kind: "zoom", room: 1, units: 1 },
  { kind: "hold", room: 2, units: 0.6 },
  { kind: "zoom", room: 2, units: 1 },
  { kind: "hold", room: 3, units: 0.6 },
  { kind: "zoom", room: 3, units: 1 },
  { kind: "hold", room: 4, units: 0.7 },
  { kind: "pull", units: 1.8 },
  { kind: "rest", units: 0.7 },
];

export const TIMELINE_UNITS = PHASES.reduce((sum, phase) => sum + phase.units, 0);

export type Frame = {
  base: { plate: number; pose: Pose };
  window: { plate: number; pose: Pose; opacity: number } | null;
  caption: number;
  settled: number;
};

const IDENTITY: Pose = { s: 1, x: 0, y: 0 };

const smooth = (t: number) => t * t * (3 - 2 * t);
const easeOut = (t: number) => 1 - (1 - t) ** 3;
const easeInOut = (t: number) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2);

function zoomAbout(doorway: Placement, k: number): { base: Pose; inner: Pose } {
  const ox = doorway.left / (1 - doorway.scale);
  const oy = doorway.top / (1 - doorway.scale);
  return {
    base: { s: k, x: ox * (1 - k), y: oy * (1 - k) },
    inner: {
      s: k * doorway.scale,
      x: ox * (1 - k) + k * doorway.left,
      y: oy * (1 - k) + k * doorway.top,
    },
  };
}

function arriving(doorway: Placement, size: Size, t: number): Pose {
  const m = 0.88 + 0.12 * t;
  const s = doorway.scale * m;
  return {
    s,
    x: doorway.left + ((doorway.scale - s) * size.width) / 2,
    y: doorway.top + ((doorway.scale - s) * size.height) / 2,
  };
}

function locate(progress: number) {
  let cursor = Math.min(Math.max(progress, 0), 1) * TIMELINE_UNITS;
  for (const phase of PHASES) {
    if (cursor <= phase.units) return { phase, t: cursor / phase.units };
    cursor -= phase.units;
  }
  return { phase: PHASES[PHASES.length - 1], t: 1 };
}

export function frameAt(progress: number, layout: StageLayout): Frame {
  const { phase, t } = locate(progress);

  if (phase.kind === "hold") {
    const doorway = layout.doorways[phase.room];
    const appear = phase.room === 0 ? 1 : easeOut(Math.min(1, t / 0.7));
    return {
      base: { plate: phase.room, pose: IDENTITY },
      window: doorway
        ? {
            plate: phase.room + 1,
            pose: arriving(doorway, layout.size, appear),
            opacity: appear,
          }
        : null,
      caption: phase.room,
      settled: 0,
    };
  }

  if (phase.kind === "zoom") {
    const doorway = layout.doorways[phase.room];
    const k = (1 / doorway.scale) ** smooth(t);
    const poses = zoomAbout(doorway, k);
    return {
      base: { plate: phase.room, pose: poses.base },
      window: { plate: phase.room + 1, pose: poses.inner, opacity: 1 },
      caption: t < 0.55 ? phase.room : phase.room + 1,
      settled: 0,
    };
  }

  const office = layout.officeOnAerial;
  if (phase.kind === "pull") {
    const eased = easeInOut(t);
    const k = (1 / office.scale) ** (1 - eased);
    const poses = zoomAbout(office, k);
    return {
      base: { plate: AERIAL_INDEX, pose: poses.base },
      window: { plate: OFFICE_INDEX, pose: poses.inner, opacity: 1 },
      caption: eased < 0.5 ? OFFICE_INDEX : AERIAL_INDEX,
      settled: 0,
    };
  }

  const poses = zoomAbout(office, 1);
  return {
    base: { plate: AERIAL_INDEX, pose: poses.base },
    window: { plate: OFFICE_INDEX, pose: poses.inner, opacity: 1 },
    caption: AERIAL_INDEX,
    settled: easeOut(Math.min(1, t / 0.6)),
  };
}
