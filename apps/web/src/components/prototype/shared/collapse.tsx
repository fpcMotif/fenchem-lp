import { m, type HTMLMotionProps, type Transition } from "@/compat/motion";
import { omit } from "solid-js";
import type { JSX } from "@solidjs/web";
import { useReducedMotion } from "../use-reduced-motion";

export function Collapse(
  props: Omit<HTMLMotionProps<"div">, "children"> & {
    open: boolean;
    children: JSX.Element;
    transition: Transition;
  },
) {
  const rest = omit(props, "open", "children", "transition", "style");
  const reduce = useReducedMotion();
  const timing = () => (reduce() ? { duration: 0 } : props.transition);

  return (
    <m.div
      {...rest}
      layout={!reduce()}
      inert={!props.open || undefined}
      aria-hidden={props.open ? "false" : "true"}
      style={{ ...props.style, height: props.open ? "auto" : 0, overflow: "hidden" }}
      transition={timing()}
    >
      <m.div
        layout="position"
        initial={false}
        animate={{ opacity: props.open ? 1 : 0 }}
        transition={timing()}
      >
        {props.children}
      </m.div>
    </m.div>
  );
}
