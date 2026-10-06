import { LAKE, WORKS, type Wall } from "./shared";

export type FrameSpot = {
  wall: Wall;
  depth: number;
  length: number;
  height: number;
  mat: number;
  y: number;
};

export type CorridorGeometry = {
  perspective: number;
  halfWidth: number;
  halfHeight: number;
  unit: number;
  end: number;
  rail: number;
  base: number;
  frames: readonly FrameSpot[];
  lake: { width: number; height: number; mat: number };
  stops: readonly number[];
  fill: number;
};

export const STOP_PROGRESS = [0.05, 0.135, 0.22, 0.305, 0.39, 0.475, 0.56, 0.68] as const;

export function corridorGeometry(width: number, height: number): CorridorGeometry {
  const unit = height;
  const perspective = Math.round(width * 0.56);
  const spacing = unit * 1.02;
  const first = unit * 1.2;
  const mat = unit * 0.028;

  const frames = WORKS.map((work, index): FrameSpot => {
    const photoHeight = unit * (work.aspect > 2 ? 0.38 : work.aspect < 1 ? 0.6 : 0.55);
    return {
      wall: work.wall,
      depth: first + spacing * index,
      length: photoHeight * work.aspect + mat * 2,
      height: photoHeight + mat * 2,
      mat,
      y: -unit * 0.02,
    };
  });

  const end = first + spacing * (WORKS.length - 1) + unit * 1.5;
  const lakeWidth = width * 0.46;
  const lakeHeight = lakeWidth / LAKE.aspect;
  const view = perspective * 0.5;
  const stops = [...frames.map((frame) => frame.depth - view), end - perspective * 0.5];
  const cover = 1.015 * (width / height >= LAKE.aspect ? width / lakeWidth : height / lakeHeight);
  const fill = perspective + end - 1 - perspective / cover;

  return {
    perspective,
    halfWidth: width / 2,
    halfHeight: height / 2,
    unit,
    end,
    rail: -height / 2 + unit * 0.06,
    base: height / 2 - unit * 0.035,
    frames,
    lake: { width: lakeWidth, height: lakeHeight, mat: unit * 0.03 },
    stops,
    fill,
  };
}

export function activeStop(stops: readonly number[], camera: number): number {
  let index = 0;
  for (let next = 1; next < stops.length; next += 1) {
    if (camera > (stops[next - 1] + stops[next]) / 2) index = next;
  }
  return index;
}

export function linger(x: number): number {
  return 0.22 * x + 0.78 * (0.5 - Math.cos(Math.PI * x) / 2);
}
