export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const STAGGER_MS = 60;

const MAX_STAGGER_INDEX = 3;

export const staggerMs = (index: number) => Math.min(index, MAX_STAGGER_INDEX) * STAGGER_MS;
