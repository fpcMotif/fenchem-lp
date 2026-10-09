import { m, type HTMLMotionProps, type Transition } from "motion/react";
import type { ReactNode } from "react";
import { useReducedMotion } from "../use-reduced-motion";

export function Collapse({
  open,
  children,
  transition,
  style,
  ...props
}: Omit<HTMLMotionProps<"div">, "children"> & {
  open: boolean;
  children: ReactNode;
  transition: Transition;
}) {
  const reduce = useReducedMotion();
  const timing = reduce ? { duration: 0 } : transition;

  return (
    <m.div
      {...props}
      layout={!reduce}
      inert={!open}
      aria-hidden={!open}
      style={{ ...style, height: open ? "auto" : 0, overflow: "hidden" }}
      transition={timing}
    >
      <m.div
        layout="position"
        initial={false}
        animate={{ opacity: open ? 1 : 0 }}
        transition={timing}
      >
        {children}
      </m.div>
    </m.div>
  );
}
