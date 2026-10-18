import * as stylex from "@stylexjs/stylex";
import { preinit } from "@/compat/react-dom";

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
import { createSignal } from "solid-js";

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

export function AboutOOS1L(props: AboutPageProps) {
  preinit(LIGHT_WEIGHT_FONT, { as: "style" });
  const [rootRef, setRootRef] = createSignal<HTMLDivElement>();
  const [barRef, setBarRef] = createSignal<HTMLElement>();
  const [trackRef, setTrackRef] = createSignal<HTMLOListElement>();
  const reduce = useReducedMotion();
  useSentence(rootRef, barRef, trackRef, reduce);

  return (
    <div id="about-top" ref={setRootRef} {...stylex.attrs(styles.root)}>
      <div>
        <RunningLine barRef={setBarRef} trackRef={setTrackRef} />
        <Hero />
        <Profile />
        <Campus />
        <Culture />
        <Csr />
        <Honors />
        <Structure />
      </div>
      <Closing onNavigateHome={props.onNavigateHome} />
    </div>
  );
}
