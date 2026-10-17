// Type-only stand-ins for motion/react types the slice names in annotations.
export type MotionValue<T = any> = import("motion").MotionValue<T>;
export type MotionStyle = Record<string, any>;
export type HTMLMotionProps<_Tag extends string = "div"> = Record<string, any>;
export type Transition = import("motion").Transition;
