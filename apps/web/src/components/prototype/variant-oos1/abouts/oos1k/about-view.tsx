import * as stylex from "@stylexjs/stylex";

import type { AboutPageProps } from "../../index";
import { Campus } from "./campus";
import { Closing } from "./closing";
import { Csr } from "./csr";
import { Culture } from "./culture";
import { Hero } from "./hero";
import { Honors } from "./honors";
import { Profile } from "./profile";
import { StarField } from "./star-field";
import { Structure } from "./structure";
import { chrome, face, sky } from "./tokens.stylex";
import { createSignal } from "solid-js";

const styles = stylex.create({
  root: {
    position: "relative",
    paddingTop: chrome.header,
    backgroundColor: "#ffffff",
    fontFamily: face.sans,
  },
  night: {
    position: "relative",
    isolation: "isolate",
    overflow: "clip",
    backgroundColor: sky.night,
    color: sky.text,
    "::selection": {
      backgroundColor: sky.tint,
      color: sky.navy,
    },
  },
  content: {
    position: "relative",
    zIndex: 1,
  },
});

export function AboutOOS1K(props: AboutPageProps) {
  const [nightRef, setNightRef] = createSignal<HTMLDivElement>();
  const [nova, setNova] = createSignal(false);
  const ignite = () => setNova(true);

  return (
    <div id="about-top" {...stylex.attrs(styles.root)}>
      <div ref={setNightRef} {...stylex.attrs(styles.night)}>
        <StarField trackRef={nightRef} flare={nova()} />
        <div {...stylex.attrs(styles.content)}>
          <Hero />
          <Profile />
          <Campus />
          <Culture lit={nova()} onIgnite={ignite} />
          <Csr />
          <Honors />
          <Structure />
          <Closing onNavigateHome={props.onNavigateHome} />
        </div>
      </div>
    </div>
  );
}
