import { useMotionValue, useMotionValueEvent, useScroll } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

import { ABOUT_HERO } from "../../about-data";

const STOP_AT = {
  "about-profile": 0.1,
  "about-campus": 0.32,
  "about-culture": 0.39,
  "about-csr": 0.56,
  "about-honor": 0.77,
  "about-structure": 0.89,
} as const;

const ENGLISH_LABEL = {
  "about-profile": "Profile",
  "about-campus": "Campus",
  "about-culture": "Culture",
  "about-csr": "Responsibility",
  "about-honor": "Honors",
  "about-structure": "Structure",
} as const;

export const RAIL_STOPS = ABOUT_HERO.navChips.map((chip) => ({
  id: chip.id,
  name: chip.label,
  label: ENGLISH_LABEL[chip.id],
  at: STOP_AT[chip.id],
}));

const ROOT_ID = "about-top";
const ACTIVE_LINE = 0.4;

type Knots = { ys: number[]; ps: number[]; navYs: number[] };

function interpolate(y: number, { ys, ps }: Knots) {
  if (y <= ys[0]) return ps[0];
  for (let k = 1; k < ys.length; k += 1) {
    if (y <= ys[k]) {
      const t = (y - ys[k - 1]) / (ys[k] - ys[k - 1]);
      return ps[k - 1] + t * (ps[k] - ps[k - 1]);
    }
  }
  return ps[ps.length - 1];
}

export function useRail() {
  const { scrollY } = useScroll();
  const progress = useMotionValue(0);
  const activeIndex = useMotionValue(-1);
  const knots = useRef<Knots>({ ys: [0, 1], ps: [0, 1], navYs: [] });
  const [active, setActive] = useState(-1);

  const sync = useCallback(() => {
    const y = scrollY.get();
    progress.set(interpolate(y, knots.current));
    let next = -1;
    knots.current.navYs.forEach((navY, position) => {
      if (y >= navY) next = position;
    });
    activeIndex.set(next);
  }, [activeIndex, progress, scrollY]);

  useMotionValueEvent(scrollY, "change", sync);
  useMotionValueEvent(activeIndex, "change", setActive);

  useEffect(() => {
    const measure = () => {
      const root = document.getElementById(ROOT_ID);
      if (!root) return;
      const viewport = window.innerHeight;
      const offset = window.scrollY;
      const ys = [0];
      const ps = [0];
      const navYs: number[] = [];
      for (const stop of RAIL_STOPS) {
        const element = document.getElementById(stop.id);
        if (!element) continue;
        const y = Math.max(
          ys[ys.length - 1] + 1,
          element.getBoundingClientRect().top + offset - viewport * ACTIVE_LINE,
        );
        ys.push(y);
        ps.push(stop.at);
        navYs.push(y);
      }
      const end = Math.max(
        ys[ys.length - 1] + 1,
        root.getBoundingClientRect().bottom + offset - viewport,
      );
      ys.push(end);
      ps.push(1);
      knots.current = { ys, ps, navYs };
      sync();
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(document.documentElement);
    return () => observer.disconnect();
  }, [sync]);

  return { progress, active };
}
