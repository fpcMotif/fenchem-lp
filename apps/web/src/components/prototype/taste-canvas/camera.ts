export type Camera = { x: number; y: number; zoom: number };
export type Point = { x: number; y: number };
export type Size = { width: number; height: number };
export type Rect = { x: number; y: number; width: number; height: number };
export type Layout = { camera: Camera | null; positions: Record<string, Point> };

export const MIN_ZOOM = 0.1;
export const MAX_ZOOM = 4;
export const RESET_CAMERA: Camera = { x: 64, y: 64, zoom: 1 };
export const STORAGE_KEY = "fenchem-lp:taste-canvas:camera";
export const MAX_COORDINATE = 100_000;
const STORAGE_VERSION = 2;
const MAX_STORED_LENGTH = 16_384;
const MAX_POSITIONS = 200;
const FIT_PADDING = 64;
const VISIBLE_MARGIN = 96;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export const clampZoom = (zoom: number) => clamp(zoom, MIN_ZOOM, MAX_ZOOM);

export const clampCoordinate = (value: number) => clamp(value, -MAX_COORDINATE, MAX_COORDINATE);

export function unionRect(rects: readonly Rect[]): Rect | null {
  if (rects.length === 0) return null;
  const left = Math.min(...rects.map((rect) => rect.x));
  const top = Math.min(...rects.map((rect) => rect.y));
  const right = Math.max(...rects.map((rect) => rect.x + rect.width));
  const bottom = Math.max(...rects.map((rect) => rect.y + rect.height));
  return { x: left, y: top, width: right - left, height: bottom - top };
}

export function clampCamera(camera: Camera, bounds: Rect, viewport: Size): Camera {
  const zoom = clampZoom(camera.zoom);
  const margin = Math.min(VISIBLE_MARGIN, viewport.width / 2, viewport.height / 2);
  return {
    zoom,
    x: clamp(
      camera.x,
      margin - (bounds.x + bounds.width) * zoom,
      viewport.width - margin - bounds.x * zoom,
    ),
    y: clamp(
      camera.y,
      margin - (bounds.y + bounds.height) * zoom,
      viewport.height - margin - bounds.y * zoom,
    ),
  };
}

export function zoomAt(camera: Camera, nextZoom: number, point: Point): Camera {
  const zoom = clampZoom(nextZoom);
  const ratio = zoom / camera.zoom;
  return {
    zoom,
    x: point.x - (point.x - camera.x) * ratio,
    y: point.y - (point.y - camera.y) * ratio,
  };
}

export function fitCamera(bounds: Rect, viewport: Size): Camera {
  if (bounds.width <= 0 || bounds.height <= 0) return RESET_CAMERA;
  const zoom = clampZoom(
    Math.min(
      (viewport.width - FIT_PADDING * 2) / bounds.width,
      (viewport.height - FIT_PADDING * 2) / bounds.height,
    ),
  );
  return {
    zoom,
    x: (viewport.width - bounds.width * zoom) / 2 - bounds.x * zoom,
    y: (viewport.height - bounds.height * zoom) / 2 - bounds.y * zoom,
  };
}

export function cameraRevealing(camera: Camera, rect: Rect, viewport: Size): Camera | null {
  const left = camera.x + rect.x * camera.zoom;
  const top = camera.y + rect.y * camera.zoom;
  const right = left + rect.width * camera.zoom;
  const bottom = top + rect.height * camera.zoom;
  if (left >= 0 && top >= 0 && right <= viewport.width && bottom <= viewport.height) return null;
  return {
    zoom: camera.zoom,
    x: viewport.width / 2 - (rect.x + rect.width / 2) * camera.zoom,
    y: viewport.height / 2 - (rect.y + rect.height / 2) * camera.zoom,
  };
}

const isFiniteNumber = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value);

type StoredObject = { readonly [key: string]: unknown };

const isRecord = (value: unknown): value is StoredObject =>
  typeof value === "object" && value !== null && !Array.isArray(value);

function parseCamera(value: unknown): Camera | null {
  if (!isRecord(value)) return null;
  const { x, y, zoom } = value;
  if (!isFiniteNumber(x) || !isFiniteNumber(y) || !isFiniteNumber(zoom) || zoom <= 0) return null;
  if (Math.abs(x) > MAX_COORDINATE * MAX_ZOOM || Math.abs(y) > MAX_COORDINATE * MAX_ZOOM) {
    return null;
  }
  return { x, y, zoom: clampZoom(zoom) };
}

function parsePositions(value: unknown, knownIds: ReadonlySet<string>): Record<string, Point> {
  if (!isRecord(value)) return {};
  const positions: Record<string, Point> = {};
  for (const [id, point] of Object.entries(value).slice(0, MAX_POSITIONS)) {
    if (!knownIds.has(id) || !isRecord(point)) continue;
    const { x, y } = point;
    if (!isFiniteNumber(x) || !isFiniteNumber(y)) continue;
    if (Math.abs(x) > MAX_COORDINATE || Math.abs(y) > MAX_COORDINATE) continue;
    positions[id] = { x, y };
  }
  return positions;
}

const EMPTY_LAYOUT: Layout = { camera: null, positions: {} };

export function parseStoredLayout(raw: string | null, knownIds: ReadonlySet<string>): Layout {
  if (raw === null || raw.length > MAX_STORED_LENGTH) return EMPTY_LAYOUT;
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return EMPTY_LAYOUT;
  }
  if (!isRecord(data)) return EMPTY_LAYOUT;
  if (data.v === 1) return { camera: parseCamera(data.camera), positions: {} };
  if (data.v !== STORAGE_VERSION) return EMPTY_LAYOUT;
  return { camera: parseCamera(data.camera), positions: parsePositions(data.positions, knownIds) };
}

export const serializeLayout = (camera: Camera, positions: Record<string, Point>) =>
  JSON.stringify({ v: STORAGE_VERSION, camera, positions });

export function loadLayout(
  storage: Pick<Storage, "getItem"> | undefined,
  knownIds: ReadonlySet<string>,
): Layout {
  try {
    return parseStoredLayout(storage?.getItem(STORAGE_KEY) ?? null, knownIds);
  } catch {
    return EMPTY_LAYOUT;
  }
}

export function saveLayout(
  storage: Pick<Storage, "setItem"> | undefined,
  camera: Camera,
  positions: Record<string, Point>,
): boolean {
  if (!storage) return false;
  try {
    storage.setItem(STORAGE_KEY, serializeLayout(camera, positions));
    return true;
  } catch {
    return false;
  }
}
