import * as stylex from "@stylexjs/stylex";
import { preinit } from "react-dom";

import type { AboutPageProps } from "../../index";
import { CampusWall } from "./campus";
import { Closing } from "./closing";
import { CsrPane } from "./csr";
import { CultureStory } from "./culture";
import { IndexBar } from "./index-bar";
import { LIGHT_WEIGHT_FONT } from "./shared";
import { Stage } from "./stage";
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

export function AboutOOS1Y({ onNavigateHome }: AboutPageProps) {
  preinit(LIGHT_WEIGHT_FONT, { as: "style" });
  return (
    <div id="about-top" {...stylex.props(styles.root)}>
      <IndexBar />
      <Stage onNavigateHome={onNavigateHome} />
      <CampusWall />
      <CultureStory />
      <CsrPane />
      <Closing onNavigateHome={onNavigateHome} />
    </div>
  );
}
