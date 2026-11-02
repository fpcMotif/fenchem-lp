import { m } from "@/compat/motion";
import type { ReactNode } from "@/compat/react-types";
import { EASE } from "../motion-constants";
import { useReducedMotion } from "../use-reduced-motion";

export function Flow({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <m.div layout={reduce ? false : "position"} transition={{ duration: 0.26, ease: EASE }}>
      {children}
    </m.div>
  );
}
