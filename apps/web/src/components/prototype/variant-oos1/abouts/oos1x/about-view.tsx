import * as stylex from "@stylexjs/stylex";
import { preinit } from "react-dom";

import type { AboutPageProps } from "../../index";
import { BalanceBeam } from "./beam";
import { Campus } from "./campus";
import { Closing } from "./closing";
import { Csr } from "./csr";
import { Culture } from "./culture";
import { Honors } from "./honors";
import { Opening } from "./opening";
import { Profile } from "./profile";
import { LIGHT_WEIGHT_FONT, ui } from "./shared";
import { Structure } from "./structure";
import { bp, face, tone } from "./tokens.stylex";

const styles = stylex.create({
  root: {
    position: "relative",
    paddingTop: 80,
    backgroundColor: tone.page,
    color: tone.ink,
    fontFamily: face.sans,
  },
  sequence: {
    position: "relative",
    paddingBottom: { default: 24, [bp.wide]: 120 },
  },
});

export function AboutOOS1X({ onNavigateHome }: AboutPageProps) {
  preinit(LIGHT_WEIGHT_FONT, { as: "style" });
  return (
    <div id="about-top" {...stylex.props(styles.root)}>
      <div {...stylex.props(styles.sequence)}>
        <BalanceBeam />
        <div {...stylex.props(ui.shell)}>
          <Opening />
          <Profile />
          <Campus />
          <Culture />
        </div>
      </div>
      <Csr />
      <div {...stylex.props(ui.shell)}>
        <Honors />
        <Structure />
        <Closing onNavigateHome={onNavigateHome} />
      </div>
    </div>
  );
}
