import * as stylex from "@stylexjs/stylex";
import { useCallback, useRef, useState } from "react";

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

export function AboutOOS1K({ onNavigateHome }: AboutPageProps) {
  const nightRef = useRef<HTMLDivElement>(null);
  const [nova, setNova] = useState(false);
  const ignite = useCallback(() => setNova(true), []);

  return (
    <div id="about-top" {...stylex.props(styles.root)}>
      <div ref={nightRef} {...stylex.props(styles.night)}>
        <StarField trackRef={nightRef} flare={nova} />
        <div {...stylex.props(styles.content)}>
          <Hero />
          <Profile />
          <Campus />
          <Culture lit={nova} onIgnite={ignite} />
          <Csr />
          <Honors />
          <Structure />
          <Closing onNavigateHome={onNavigateHome} />
        </div>
      </div>
    </div>
  );
}
