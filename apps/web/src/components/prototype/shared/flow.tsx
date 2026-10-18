import { m } from "@/compat/motion";
import type { JSX } from "@solidjs/web";
import { EASE } from "../motion-constants";
import { useReducedMotion } from "../use-reduced-motion";

export function Flow(props: { children: JSX.Element }) {
  const reduce = useReducedMotion();
  return (
    <m.div layout={reduce() ? false : "position"} transition={{ duration: 0.26, ease: EASE }}>
      {props.children}
    </m.div>
  );
}
