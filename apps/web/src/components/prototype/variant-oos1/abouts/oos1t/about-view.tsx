import * as stylex from "@stylexjs/stylex";
import { useRef } from "react";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import type { AboutPageProps } from "../../index";
import { Campus } from "./campus";
import { Closing } from "./closing";
import { Csr } from "./csr";
import { Culture } from "./culture";
import { Hero } from "./hero";
import { Honors } from "./honors";
import { Profile } from "./profile";
import { Structure } from "./structure";
import { SunContext, useSunClock } from "./sun";
import { chrome, face, sun, tone } from "./tokens.stylex";

const styles = stylex.create({
  root: {
    position: "relative",
    isolation: "isolate",
    overflowX: "clip",
    paddingTop: chrome.header,
    backgroundColor: tone.ground,
    color: tone.ink,
    fontFamily: face.sans,
    "--sun-deg": sun.deg,
    "--sun-ux": sun.ux,
    "--sun-uy": sun.uy,
    "--sun-len": sun.len,
    "--sun-day": sun.day,
    "--sun-still-ux": "1.172",
    "--sun-still-uy": "1.0552",
    "--sun-scale": sun.scale,
    "--sun-live": sun.live,
  },
  daylight: {
    position: "absolute",
    inset: 0,
    zIndex: -1,
    backgroundColor: "#ffffff",
    opacity: "calc(var(--sun-day) * 0.78)",
    willChange: "opacity",
    pointerEvents: "none",
  },
});

export function AboutOOS1T({ onNavigateHome }: AboutPageProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const hour = useSunClock(rootRef, reduce);

  return (
    <SunContext value={hour}>
      <div id="about-top" ref={rootRef} {...stylex.props(styles.root)}>
        <span aria-hidden="true" {...stylex.props(styles.daylight)} />
        <Hero />
        <Profile />
        <Campus />
        <Culture />
        <Csr />
        <Honors />
        <Structure />
        <Closing onNavigateHome={onNavigateHome} />
      </div>
    </SunContext>
  );
}
