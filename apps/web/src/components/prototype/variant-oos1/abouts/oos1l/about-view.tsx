import * as stylex from "@stylexjs/stylex";
import { useRef } from "react";
import { preinit } from "react-dom";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import type { AboutPageProps } from "../../index";
import { Campus } from "./campus";
import { Closing } from "./closing";
import { Csr } from "./csr";
import { Culture } from "./culture";
import { Hero } from "./hero";
import { Honors } from "./honors";
import { Profile } from "./profile";
import { RunningLine } from "./running-line";
import { LIGHT_WEIGHT_FONT } from "./shared";
import { Structure } from "./structure";
import { chrome, face, tone } from "./tokens.stylex";
import { useSentence } from "./use-sentence";

const styles = stylex.create({
  root: {
    position: "relative",
    zIndex: 1,
    paddingTop: chrome.header,
    overflowX: "clip",
    backgroundColor: tone.page,
    color: tone.ink,
    fontFamily: face.sans,
  },
});

export function AboutOOS1L({ onNavigateHome }: AboutPageProps) {
  preinit(LIGHT_WEIGHT_FONT, { as: "style" });
  const rootRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  useSentence(rootRef, barRef, trackRef, reduce);

  return (
    <div id="about-top" ref={rootRef} {...stylex.props(styles.root)}>
      <div>
        <RunningLine barRef={barRef} trackRef={trackRef} />
        <Hero />
        <Profile />
        <Campus />
        <Culture />
        <Csr />
        <Honors />
        <Structure />
      </div>
      <Closing onNavigateHome={onNavigateHome} />
    </div>
  );
}
