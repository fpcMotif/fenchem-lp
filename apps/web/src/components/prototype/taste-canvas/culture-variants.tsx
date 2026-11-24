import * as stylex from "@stylexjs/stylex";
import {
  m,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionProps,
  type MotionValue,
  type Variants,
} from "@/compat/motion";
import type { JSX } from "@solidjs/web";
import { createSignal, createUniqueId, omit, type Accessor } from "solid-js";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

const VIEW = 384;
const TILE = 320;
const GAP = 24;
export const EMBLEM_ROW_WIDTH = TILE * 3 + GAP * 2;
const STROKE = 5;
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const DEPTH_RANGE = 22;

const CAIRN = { fill: "#6a8ece", ink: "#2f4670", tint: "#9bb6e6" };
const RINGS_CARD = { fill: "#e3e3e3", ink: "#7c7c82", tint: "#f7f7f8" };
const BOLT_CARD = { fill: "#93c170", ink: "#4a7d24", tint: "#dcefc8" };

const GROUND = "M44 332H340";
const STONES = [
  "M64 300C64 266 120 248 190 248C262 248 318 266 318 296C318 322 268 332 190 332C110 332 64 324 64 300Z",
  "M102 222C100 198 140 186 186 186C236 186 268 200 268 220C268 240 232 248 184 248C136 248 104 242 102 222Z",
  "M146 166C146 148 172 138 202 138C232 138 254 150 252 166C250 180 228 186 200 186C170 186 146 180 146 166Z",
  "M170 126C170 116 182 110 196 110C212 110 222 117 222 126C222 134 210 138 196 138C182 138 170 134 170 126Z",
] as const;
const RINGS = [
  { r: 150, width: 3 },
  { r: 102, width: 5 },
  { r: 62, width: 7 },
] as const;
const BOLT = [
  "M309.7 40.6H159.6L61 246.1H167.2L208.1 200.4Z",
  "M167.2 246.1L83.8 349.6L337 200.4H208.1Z",
] as const;

const styles = stylex.create({
  row: {
    display: "flex",
    gap: GAP,
    width: EMBLEM_ROW_WIDTH,
  },
  tile: {
    display: "block",
    width: TILE,
    height: TILE,
    flexShrink: 0,
  },
  pivotBase: {
    transformBox: "fill-box",
    transformOrigin: "50% 100%",
  },
  pivotCenter: {
    transformBox: "fill-box",
    transformOrigin: "50% 50%",
  },
});

function Tile(
  props: {
    fill: string;
    children: JSX.Element;
  } & Omit<MotionProps, "children" | "fill">,
) {
  const motion = omit(props, "fill", "children");
  return (
    <m.svg
      viewBox={`0 0 ${VIEW} ${VIEW}`}
      fill="none"
      stroke-width={STROKE}
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
      {...motion}
      {...stylex.attrs(styles.tile)}
    >
      <rect width={VIEW} height={VIEW} fill={props.fill} />
      {props.children}
    </m.svg>
  );
}

function usePointerDepth(reduce: Accessor<boolean>) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 140, damping: 18, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 140, damping: 18, mass: 0.6 });
  const onPointerMove: JSX.EventHandler<SVGSVGElement, PointerEvent> = (event) => {
    if (reduce()) return;
    const box = event.currentTarget.getBoundingClientRect();
    rawX.set(((event.clientX - box.left) / box.width - 0.5) * 2);
    rawY.set(((event.clientY - box.top) / box.height - 0.5) * 2);
  };
  const onPointerLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };
  return { x, y, handlers: { onPointerMove, onPointerLeave } };
}

function DepthLayer(props: {
  x: MotionValue<number>;
  y: MotionValue<number>;
  depth: number;
  children: JSX.Element;
}) {
  const shiftX = useTransform(props.x, (value) => value * props.depth * DEPTH_RANGE);
  const shiftY = useTransform(props.y, (value) => value * props.depth * DEPTH_RANGE);
  return <m.g style={{ x: shiftX, y: shiftY }}>{props.children}</m.g>;
}

const STONE_DEPTHS = [0.25, 0.45, 0.7, 1] as const;
const RING_DEPTHS = [0.2, 0.45, 0.75] as const;

export function CultureDepth() {
  const reduce = useReducedMotion();
  const cairn = usePointerDepth(reduce);
  const rings = usePointerDepth(reduce);
  const bolt = usePointerDepth(reduce);
  return (
    <div {...stylex.attrs(styles.row)}>
      <Tile fill={CAIRN.fill} {...cairn.handlers}>
        <g stroke={CAIRN.ink}>
          <path d={GROUND} />
          {STONES.map((d, index) => (
            <DepthLayer x={cairn.x} y={cairn.y} depth={STONE_DEPTHS[index]}>
              <path d={d} />
            </DepthLayer>
          ))}
        </g>
      </Tile>
      <Tile fill={RINGS_CARD.fill} {...rings.handlers}>
        <g stroke={RINGS_CARD.ink}>
          {RINGS.map(({ r, width }, index) => (
            <DepthLayer x={rings.x} y={rings.y} depth={RING_DEPTHS[index]}>
              <circle cx={192} cy={192} r={r} stroke-width={width} />
            </DepthLayer>
          ))}
          <DepthLayer x={rings.x} y={rings.y} depth={1.1}>
            <circle cx={192} cy={192} r={14} fill={RINGS_CARD.ink} stroke="none" />
          </DepthLayer>
        </g>
      </Tile>
      <Tile fill={BOLT_CARD.fill} {...bolt.handlers}>
        <g stroke={BOLT_CARD.ink}>
          <DepthLayer x={bolt.x} y={bolt.y} depth={0.8}>
            <path d={BOLT[0]} />
          </DepthLayer>
          <DepthLayer x={bolt.x} y={bolt.y} depth={-0.8}>
            <path d={BOLT[1]} />
          </DepthLayer>
        </g>
      </Tile>
    </div>
  );
}

const LOOP = { repeat: Infinity, repeatType: "mirror", ease: "easeInOut" } as const;

export function CultureBreath() {
  const reduce = useReducedMotion();
  const [row, setRow] = createSignal<HTMLDivElement>();
  const inView = useInView(row);
  const live = () => inView() && !reduce();
  return (
    <div ref={setRow} {...stylex.attrs(styles.row)}>
      <Tile fill={CAIRN.fill}>
        <g stroke={CAIRN.ink}>
          <path d={GROUND} />
          <m.g
            {...stylex.attrs(styles.pivotBase)}
            animate={live() ? { rotate: [-1.4, 1.4] } : { rotate: 0 }}
            transition={live() ? { ...LOOP, duration: 5.2 } : { duration: 0.6 }}
          >
            {STONES.map((d, index) => (
              <m.path
                d={d}
                animate={live() ? { y: [0, -1.5 * index] } : { y: 0 }}
                transition={
                  live() ? { ...LOOP, duration: 2.6, delay: index * 0.18 } : { duration: 0.6 }
                }
              />
            ))}
          </m.g>
        </g>
      </Tile>
      <Tile fill={RINGS_CARD.fill}>
        <g stroke={RINGS_CARD.ink}>
          {RINGS.map(({ r, width }) => (
            <circle cx={192} cy={192} r={r} stroke-width={width} />
          ))}
          {[0, 1.6].map((delay) => (
            <m.circle
              cx={192}
              cy={192}
              r={170}
              stroke-width={2}
              {...stylex.attrs(styles.pivotCenter)}
              initial={{ scale: 1, opacity: 0 }}
              animate={live() ? { scale: [1, 0.12], opacity: [0, 0.8, 0] } : { opacity: 0 }}
              transition={
                live()
                  ? { duration: 3.2, delay, repeat: Infinity, ease: "easeIn", times: [0, 0.35, 1] }
                  : { duration: 0.3 }
              }
            />
          ))}
          <m.circle
            cx={192}
            cy={192}
            r={14}
            fill={RINGS_CARD.ink}
            stroke="none"
            {...stylex.attrs(styles.pivotCenter)}
            animate={live() ? { scale: [1, 1.18] } : { scale: 1 }}
            transition={live() ? { ...LOOP, duration: 1.6 } : { duration: 0.4 }}
          />
        </g>
      </Tile>
      <Tile fill={BOLT_CARD.fill}>
        <m.g
          stroke={BOLT_CARD.tint}
          stroke-width={16}
          initial={{ opacity: 0 }}
          animate={live() ? { opacity: [0, 0, 0.9, 0.25, 0.75, 0] } : { opacity: 0 }}
          transition={
            live()
              ? { duration: 4, repeat: Infinity, times: [0, 0.7, 0.75, 0.8, 0.86, 1] }
              : { duration: 0.3 }
          }
        >
          {BOLT.map((d) => (
            <path d={d} />
          ))}
        </m.g>
        <g stroke={BOLT_CARD.ink}>
          {BOLT.map((d) => (
            <path d={d} />
          ))}
        </g>
      </Tile>
    </div>
  );
}

const fillIn = (delay: number, color: string): Variants => ({
  rest: { fill: color, fillOpacity: 0, transition: { duration: 0.35, ease: EASE } },
  hover: { fill: color, fillOpacity: 1, transition: { duration: 0.5, delay, ease: EASE } },
});

function Sheen(props: { id: string }) {
  return (
    <>
      <defs>
        <linearGradient id={props.id} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stop-color="#ffffff" stop-opacity={0} />
          <stop offset="0.5" stop-color="#ffffff" stop-opacity={0.38} />
          <stop offset="1" stop-color="#ffffff" stop-opacity={0} />
        </linearGradient>
      </defs>
      <g transform={`rotate(20 ${VIEW / 2} ${VIEW / 2})`}>
        <m.rect
          y={-VIEW / 2}
          width={VIEW * 0.5}
          height={VIEW * 2}
          fill={`url(#${props.id})`}
          stroke="none"
          variants={{
            rest: { x: -VIEW, transition: { duration: 0 } },
            hover: { x: VIEW * 1.4, transition: { duration: 1.1, ease: EASE } },
          }}
        />
      </g>
    </>
  );
}

const HOVER_PARENT: Variants = {};

function HoverTile(props: { fill: string; reduce: Accessor<boolean>; children: JSX.Element }) {
  const [hovered, setHovered] = createSignal(false);
  return (
    <Tile
      fill={props.fill}
      variants={HOVER_PARENT}
      initial="rest"
      animate={props.reduce() ? undefined : hovered() ? "hover" : "rest"}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {props.children}
    </Tile>
  );
}

export function CultureTint() {
  const reduce = useReducedMotion();
  const sheenId = createUniqueId().replaceAll(":", "");
  return (
    <div {...stylex.attrs(styles.row)}>
      <HoverTile fill={CAIRN.fill} reduce={reduce}>
        <g stroke={CAIRN.ink}>
          <path d={GROUND} />
          {STONES.map((d, index) => (
            <m.path d={d} variants={fillIn(index * 0.08, CAIRN.tint)} />
          ))}
        </g>
        <Sheen id={`${sheenId}-cairn`} />
      </HoverTile>
      <HoverTile fill={RINGS_CARD.fill} reduce={reduce}>
        <g stroke={RINGS_CARD.ink}>
          {RINGS.map(({ r, width }, index) => (
            <m.circle
              cx={192}
              cy={192}
              r={r}
              stroke-width={width}
              variants={fillIn(index * 0.1, index === 2 ? "#ffffff" : RINGS_CARD.tint)}
            />
          ))}
          <m.circle
            cx={192}
            cy={192}
            r={14}
            fill={RINGS_CARD.ink}
            stroke="none"
            {...stylex.attrs(styles.pivotCenter)}
            variants={{
              rest: { scale: 1, transition: { duration: 0.35, ease: EASE } },
              hover: { scale: 1.3, transition: { duration: 0.5, delay: 0.3, ease: EASE } },
            }}
          />
        </g>
        <Sheen id={`${sheenId}-rings`} />
      </HoverTile>
      <HoverTile fill={BOLT_CARD.fill} reduce={reduce}>
        <g stroke={BOLT_CARD.ink}>
          {BOLT.map((d, index) => (
            <m.path d={d} variants={fillIn(index * 0.12, BOLT_CARD.tint)} />
          ))}
        </g>
        <Sheen id={`${sheenId}-bolt`} />
      </HoverTile>
    </div>
  );
}
