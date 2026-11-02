import { m, type HTMLMotionProps, type Transition } from "../../../../compat/motion";
import { splitProps, type JSX } from "solid-js";
import { useReducedMotion } from "../use-reduced-motion";

export function Collapse(
  props: Omit<HTMLMotionProps<"div">, "children"> & {
    open: boolean;
    children: JSX.Element;
    transition: Transition;
  },
) {
  const [local, rest] = splitProps(props, ["open", "children", "transition", "style"]);
  const reduce = useReducedMotion();
  const timing = () => (reduce() ? { duration: 0 } : local.transition);

  return (
    <m.div
      {...rest}
      layout={!reduce()}
      inert={!local.open || undefined}
      aria-hidden={!local.open}
      style={{ ...local.style, height: local.open ? "auto" : 0, overflow: "hidden" }}
      transition={timing()}
    >
      <m.div
        layout="position"
        initial={false}
        animate={{ opacity: local.open ? 1 : 0 }}
        transition={timing()}
      >
        {local.children}
      </m.div>
    </m.div>
  );
}
