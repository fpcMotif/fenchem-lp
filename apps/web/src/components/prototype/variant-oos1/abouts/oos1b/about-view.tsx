import * as stylex from "@stylexjs/stylex";

import type { AboutPageProps } from "../../index";
import { Campus } from "./campus";
import { Closing } from "./closing";
import { Csr } from "./csr";
import { Culture } from "./culture";
import { Hero } from "./hero";
import { Honors } from "./honors";
import { Profile } from "./profile";
import { Structure } from "./structure";
import { chrome, face, tone } from "./tokens.stylex";

const styles = stylex.create({
  root: {
    position: "relative",
    paddingTop: chrome.header,
    backgroundColor: tone.wall,
    color: tone.ink,
    fontFamily: face.sans,
  },
});

export function AboutOOS1B({ onNavigateHome }: AboutPageProps) {
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
