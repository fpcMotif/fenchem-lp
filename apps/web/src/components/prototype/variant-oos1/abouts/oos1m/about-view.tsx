import * as stylex from "@stylexjs/stylex";

import type { AboutPageProps } from "../../index";
import { Campus } from "./campus";
import { Closing } from "./closing";
import { Csr } from "./csr";
import { Culture } from "./culture";
import { HeroAssembly } from "./hero";
import { Honors } from "./honors";
import { Structure } from "./structure";
import { chrome, face, tone } from "./tokens.stylex";

const styles = stylex.create({
  root: {
    position: "relative",
    paddingTop: chrome.header,
    backgroundColor: tone.paper,
    color: tone.ink,
    fontFamily: face.sans,
  },
});

export function AboutOOS1M({ onNavigateHome }: AboutPageProps) {
  return (
    <div id="about-top" {...stylex.props(styles.root)}>
      <HeroAssembly />
      <Campus />
      <Culture />
      <Csr />
      <Honors />
      <Structure />
      <Closing onNavigateHome={onNavigateHome} />
    </div>
  );
}
