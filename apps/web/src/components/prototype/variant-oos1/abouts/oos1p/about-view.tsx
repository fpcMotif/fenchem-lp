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
import { TimeLines } from "./time-grid";
import { chrome, face, tone } from "./tokens.stylex";

const styles = stylex.create({
  root: {
    position: "relative",
    isolation: "isolate",
    paddingTop: chrome.header,
    backgroundColor: tone.page,
    color: tone.ink,
    fontFamily: face.sans,
  },
});

export function AboutOOS1P({ onNavigateHome }: AboutPageProps) {
  return (
    <div id="about-top" {...stylex.props(styles.root)}>
      <TimeLines />
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
