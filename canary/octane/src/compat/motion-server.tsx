// Server stand-in for @octanejs/motion, which has no SSR surface (its status.json:
// "No SSR-specific surface"). vite.config.ts swaps it in for the ssr environment.
// Like framer-motion's own SSR, a motion host renders a plain element whose
// inline style is the `initial` target, so the first client paint matches.
import { motionValue, type MotionValue } from "motion";

export * from "motion";

const MOTION_PROPS = new Set([
  "initial", "animate", "exit", "transition", "variants", "custom", "inherit",
  "whileHover", "whileTap", "whileFocus", "whileDrag", "whileInView", "viewport",
  "layout", "layoutId", "layoutDependency", "layoutScroll", "layoutRoot",
  "drag", "dragConstraints", "dragElastic", "dragMomentum", "dragListener",
  "dragControls", "dragSnapToOrigin", "dragTransition", "dragPropagation", "dragDirectionLock",
  "onAnimationStart", "onAnimationComplete", "onUpdate", "onViewportEnter", "onViewportLeave",
  "onHoverStart", "onHoverEnd", "onTap", "onTapStart", "onTapCancel",
  "onDrag", "onDragStart", "onDragEnd", "onLayoutAnimationStart", "onLayoutAnimationComplete",
  "transformTemplate",
]);

const TRANSFORM_KEYS: Record<string, (v: unknown) => string> = {
  x: (v) => `translateX(${px(v)})`,
  y: (v) => `translateY(${px(v)})`,
  z: (v) => `translateZ(${px(v)})`,
  scale: (v) => `scale(${v})`,
  scaleX: (v) => `scaleX(${v})`,
  scaleY: (v) => `scaleY(${v})`,
  rotate: (v) => `rotate(${typeof v === "number" ? `${v}deg` : v})`,
  rotateX: (v) => `rotateX(${typeof v === "number" ? `${v}deg` : v})`,
  rotateY: (v) => `rotateY(${typeof v === "number" ? `${v}deg` : v})`,
  skewX: (v) => `skewX(${typeof v === "number" ? `${v}deg` : v})`,
  skewY: (v) => `skewY(${typeof v === "number" ? `${v}deg` : v})`,
};

function px(v: unknown) {
  return typeof v === "number" ? `${v}px` : String(v);
}

function read(v: unknown) {
  return v && typeof v === "object" && "get" in (v as object) ? (v as MotionValue).get() : v;
}

function resolveTarget(target: unknown, variants: Record<string, unknown> | undefined) {
  if (typeof target === "string") return variants?.[target];
  if (Array.isArray(target)) return Object.assign({}, ...target.map((t) => resolveTarget(t, variants)));
  return target;
}

function toStyle(values: Record<string, unknown>) {
  const style: Record<string, unknown> = {};
  const transforms: string[] = [];
  for (const [key, raw] of Object.entries(values)) {
    if (key === "transition" || key === "transitionEnd") continue;
    let v = read(raw);
    if (Array.isArray(v)) v = v[0];
    if (v == null) continue;
    if (key in TRANSFORM_KEYS) transforms.push(TRANSFORM_KEYS[key](v));
    else style[key] = v;
  }
  if (transforms.length) style.transform = transforms.join(" ");
  return style;
}

function host(tag: string) {
  return function MotionHost(props: Record<string, any>) {
    const { children, style, ...rest } = props;
    const variants = props.variants;
    const first = props.initial === false ? props.animate : props.initial;
    const target = resolveTarget(first, variants);
    const dom: Record<string, any> = {};
    for (const [key, value] of Object.entries(rest)) if (!MOTION_PROPS.has(key)) dom[key] = value;
    const merged = {
      ...(style ? toStyle(style) : null),
      ...(target && typeof target === "object" ? toStyle(target as Record<string, unknown>) : null),
    };
    const Tag = tag as any;
    return (
      <Tag {...dom} style={Object.keys(merged).length ? merged : undefined}>
        {children}
      </Tag>
    );
  };
}

const hosts = new Map<string, ReturnType<typeof host>>();
const proxy = new Proxy({} as Record<string, ReturnType<typeof host>>, {
  get(_target, tag: string) {
    let h = hosts.get(tag);
    if (!h) hosts.set(tag, (h = host(tag)));
    return h;
  },
});
export const m = proxy;
export const motion = proxy;

function Passthrough(props: { children?: any }) {
  return <>{props.children}</>;
}
export const AnimatePresence = Passthrough;
export const LayoutGroup = Passthrough;
export const MotionConfig = Passthrough;
export const LazyMotion = Passthrough;
export const domAnimation = {};
export const domMax = {};

export function useMotionValue<T>(initial: T) {
  return motionValue(initial);
}
export function useScroll() {
  return {
    scrollX: motionValue(0),
    scrollY: motionValue(0),
    scrollXProgress: motionValue(0),
    scrollYProgress: motionValue(0),
  };
}
export function useTransform(input: any, inputRange?: any, outputRange?: any) {
  if (typeof input === "function") return motionValue(input());
  if (typeof inputRange === "function") {
    const values = Array.isArray(input) ? input.map(read) : read(input);
    return motionValue(inputRange(values));
  }
  return motionValue(Array.isArray(outputRange) ? outputRange[0] : undefined);
}
export function useSpring(source: any) {
  return motionValue(read(source));
}
export function useMotionValueEvent() {}
export function useReducedMotion() {
  return false;
}
export function useAnimate() {
  return [{ current: null }, () => undefined];
}
export function useInView() {
  return false;
}
export function useInstantLayoutTransition() {
  return (callback?: () => void) => callback?.();
}
