import * as stylex from "@stylexjs/stylex";
import { preinit } from "react-dom";

import type { AboutPageProps } from "../../index";
import { Campus } from "./campus";
import { Closing } from "./closing";
import { Csr } from "./csr";
import { Culture } from "./culture";
import { Hero } from "./hero";
import { Honors } from "./honors";
import { Profile } from "./profile";
import { LIGHT_WEIGHT_FONT } from "./shared";
import { Structure } from "./structure";
import { chrome, face, tone } from "./tokens.stylex";

const styles = stylex.create({
  root: {
    position: "relative",
    paddingTop: chrome.header,
    backgroundColor: tone.page,
    color: tone.ink,
    fontFamily: face.sans,
  },
});

export function AboutOOS1W({ onNavigateHome }: AboutPageProps) {
  preinit(LIGHT_WEIGHT_FONT, { as: "style" });
  return (
    <div id="about-top" {...stylex.props(styles.root)}>
      <Hero />
      <Profile />
      <Campus />
      <Culture />
      <Csr />
      <Honors />
      <Structure />
      <Closing onNavigateHome={onNavigateHome} />
    </div>
  );
}
