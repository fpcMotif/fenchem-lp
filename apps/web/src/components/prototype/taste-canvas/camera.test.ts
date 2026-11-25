import { describe, expect, it } from "vitest";

import {
  MAX_ZOOM,
  MIN_ZOOM,
  RESET_CAMERA,
  STORAGE_KEY,
  cameraRevealing,
  clampCamera,
  fitCamera,
  loadLayout,
  parseStoredLayout,
  saveLayout,
  unionRect,
  zoomAt,
} from "./camera";

const viewport = { width: 1000, height: 800 };
const world = { x: 0, y: 0, width: 3000, height: 2000 };
const ids = new Set(["a", "b"]);

describe("zoomAt", () => {
  it("keeps the world point under the cursor fixed", () => {
    const camera = { x: 100, y: 50, zoom: 1 };
    const point = { x: 400, y: 300 };
    const worldPoint = {
      x: (point.x - camera.x) / camera.zoom,
      y: (point.y - camera.y) / camera.zoom,
    };
    const next = zoomAt(camera, 2, point);
    expect(next.zoom).toBe(2);
    expect(next.x + worldPoint.x * next.zoom).toBeCloseTo(point.x);
    expect(next.y + worldPoint.y * next.zoom).toBeCloseTo(point.y);
  });

  it("clamps zoom to the allowed range", () => {
    expect(zoomAt(RESET_CAMERA, 100, { x: 0, y: 0 }).zoom).toBe(MAX_ZOOM);
    expect(zoomAt(RESET_CAMERA, 0.0001, { x: 0, y: 0 }).zoom).toBe(MIN_ZOOM);
  });
});

describe("unionRect", () => {
  it("covers every rect, including negative positions", () => {
    expect(
      unionRect([
        { x: -100, y: 20, width: 50, height: 50 },
        { x: 200, y: -40, width: 100, height: 30 },
      ]),
    ).toEqual({ x: -100, y: -40, width: 400, height: 110 });
  });

  it("returns null for no rects", () => {
    expect(unionRect([])).toBe(null);
  });
});

describe("fitCamera", () => {
  it("shows the whole world centred inside the viewport", () => {
    const camera = fitCamera(world, viewport);
    expect(camera.x).toBeGreaterThanOrEqual(0);
    expect(camera.y).toBeGreaterThanOrEqual(0);
    expect(camera.x * 2 + world.width * camera.zoom).toBeCloseTo(viewport.width);
    expect(camera.y + world.height * camera.zoom).toBeLessThanOrEqual(viewport.height);
  });

  it("centres bounds that start away from the origin", () => {
    const bounds = { x: 500, y: 300, width: 400, height: 200 };
    const camera = fitCamera(bounds, viewport);
    const centreX = camera.x + (bounds.x + bounds.width / 2) * camera.zoom;
    const centreY = camera.y + (bounds.y + bounds.height / 2) * camera.zoom;
    expect(centreX).toBeCloseTo(viewport.width / 2);
    expect(centreY).toBeCloseTo(viewport.height / 2);
  });

  it("falls back to the reset camera for an empty world", () => {
    expect(fitCamera({ x: 0, y: 0, width: 0, height: 0 }, viewport)).toEqual(RESET_CAMERA);
  });
});

describe("clampCamera", () => {
  it("keeps part of the world on screen after a runaway pan", () => {
    const lost = clampCamera({ x: -1e6, y: 1e6, zoom: 1 }, world, viewport);
    expect(lost.x + world.width).toBeGreaterThan(0);
    expect(lost.y).toBeLessThan(viewport.height);
  });

  it("respects bounds that start at negative coordinates", () => {
    const bounds = { x: -2000, y: 0, width: 500, height: 500 };
    const lost = clampCamera({ x: -1e6, y: 0, zoom: 1 }, bounds, viewport);
    expect(lost.x + (bounds.x + bounds.width)).toBeGreaterThan(0);
  });
});

describe("cameraRevealing", () => {
  it("returns null when the rect is already visible", () => {
    expect(cameraRevealing(RESET_CAMERA, { x: 0, y: 0, width: 50, height: 50 }, viewport)).toBe(
      null,
    );
  });

  it("centres an offscreen rect at the same zoom", () => {
    const rect = { x: 2000, y: 1500, width: 100, height: 40 };
    const next = cameraRevealing(RESET_CAMERA, rect, viewport);
    expect(next?.zoom).toBe(RESET_CAMERA.zoom);
    expect((next?.x ?? 0) + 2050).toBeCloseTo(viewport.width / 2);
    expect((next?.y ?? 0) + 1520).toBeCloseTo(viewport.height / 2);
  });
});

describe("stored layout", () => {
  const memory = () => {
    const entries = new Map<string, string>();
    return {
      getItem: (key: string) => entries.get(key) ?? null,
      setItem: (key: string, value: string) => void entries.set(key, value),
    };
  };
  const empty = { camera: null, positions: {} };

  it("round-trips the camera and positions through storage", () => {
    const storage = memory();
    const camera = { x: 10, y: -20, zoom: 0.5 };
    const positions = { a: { x: 1, y: 2 }, b: { x: -3, y: 4 } };
    expect(saveLayout(storage, camera, positions)).toBe(true);
    expect(loadLayout(storage, ids)).toEqual({ camera, positions });
  });

  it("drops positions for ids that left the registry", () => {
    const raw = JSON.stringify({
      v: 2,
      camera: { x: 0, y: 0, zoom: 1 },
      positions: { a: { x: 1, y: 2 }, gone: { x: 5, y: 5 } },
    });
    expect(parseStoredLayout(raw, ids).positions).toEqual({ a: { x: 1, y: 2 } });
  });

  it("drops invalid positions but keeps valid ones", () => {
    const raw = JSON.stringify({
      v: 2,
      camera: { x: 0, y: 0, zoom: 1 },
      positions: { a: { x: 1e9, y: 0 }, b: { x: "1", y: 0 } },
    });
    expect(parseStoredLayout(raw, ids)).toEqual({ camera: { x: 0, y: 0, zoom: 1 }, positions: {} });
  });

  it("migrates a version 1 camera and discards anything else", () => {
    const raw = JSON.stringify({ v: 1, camera: { x: 4, y: 5, zoom: 2 }, groups: { a: {} } });
    expect(parseStoredLayout(raw, ids)).toEqual({ camera: { x: 4, y: 5, zoom: 2 }, positions: {} });
  });

  it.each([
    ["missing", null],
    ["malformed JSON", "{"],
    ["unknown version", JSON.stringify({ v: 99, camera: { x: 0, y: 0, zoom: 1 } })],
    ["unversioned payload", JSON.stringify({ groups: { a: { x: 1, y: 2 } } })],
    ["oversized", JSON.stringify({ v: 2, camera: RESET_CAMERA, pad: "x".repeat(20_000) })],
  ])("falls back to an empty layout for %s data", (_name, raw) => {
    expect(parseStoredLayout(raw, ids)).toEqual(empty);
  });

  it.each([
    ["non-finite value", '{"v":2,"camera":{"x":1e999,"y":0,"zoom":1}}'],
    ["zero zoom", JSON.stringify({ v: 2, camera: { x: 0, y: 0, zoom: 0 } })],
  ])("rejects a camera with a %s", (_name, raw) => {
    expect(parseStoredLayout(raw, ids).camera).toBe(null);
  });

  it("survives storage that throws", () => {
    const broken = {
      getItem: () => {
        throw new Error("denied");
      },
      setItem: () => {
        throw new DOMException("full", "QuotaExceededError");
      },
    };
    expect(loadLayout(broken, ids)).toEqual(empty);
    expect(saveLayout(broken, RESET_CAMERA, {})).toBe(false);
    expect(saveLayout(undefined, RESET_CAMERA, {})).toBe(false);
  });

  it("uses a project-scoped key", () => {
    expect(STORAGE_KEY.startsWith("fenchem-lp:")).toBe(true);
  });
});
