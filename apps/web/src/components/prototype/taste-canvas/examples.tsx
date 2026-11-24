import type { JSX } from "@solidjs/web";

import { CultureScenes } from "../variant-oos1/culture-scenes";
import { CultureBreath, CultureDepth, CultureTint, EMBLEM_ROW_WIDTH } from "./culture-variants";

export type CanvasItem = {
  id: string;
  name: string;
  width: number;
  x: number;
  y: number;
  replayable?: boolean;
  render: () => JSX.Element;
};

const VARIANT_X = 1640;
const VARIANT_STEP = 520;

export const ITEMS: readonly CanvasItem[] = [
  {
    id: "culture-shipped",
    name: "CultureScenes · shipped (draw-on + hover lift)",
    width: 1440,
    x: 0,
    y: 0,
    replayable: true,
    render: () => <CultureScenes />,
  },
  {
    id: "culture-depth",
    name: "Culture emblems · depth parallax",
    width: EMBLEM_ROW_WIDTH,
    x: VARIANT_X,
    y: 0,
    render: () => <CultureDepth />,
  },
  {
    id: "culture-breath",
    name: "Culture emblems · ambient breath",
    width: EMBLEM_ROW_WIDTH,
    x: VARIANT_X,
    y: VARIANT_STEP,
    render: () => <CultureBreath />,
  },
  {
    id: "culture-tint",
    name: "Culture emblems · tint fill + sheen",
    width: EMBLEM_ROW_WIDTH,
    x: VARIANT_X,
    y: VARIANT_STEP * 2,
    render: () => <CultureTint />,
  },
];
