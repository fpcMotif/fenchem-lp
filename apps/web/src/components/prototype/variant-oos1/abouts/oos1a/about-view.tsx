import * as stylex from "@stylexjs/stylex";

import type { AboutPageProps } from "../../index";
import { Banner } from "./banner";
import { Campus } from "./campus";
import { Closing } from "./closing";
import { Csr } from "./csr";
import { Culture } from "./culture";
import { Honors } from "./honors";
import { fonts, palette } from "./lattice.stylex";
import { Products } from "./products";
import { Profile } from "./profile";
import { SectionNav } from "./section-nav";
import { StatsBand } from "./stats-band";
import { Structure } from "./structure";

const styles = stylex.create({
  root: {
    overflowX: "clip",
    backgroundColor: palette.page,
    color: palette.ink,
    fontFamily: fonts.cjk,
  },
});

export function AboutOOS1A({ onNavigateHome }: AboutPageProps) {
  return (
    <div id="about-top" {...stylex.props(styles.root)}>
      <Banner />
      <SectionNav onNavigateHome={onNavigateHome} />
      <Profile />
      <Campus />
      <StatsBand />
      <Culture />
      <Csr />
      <Honors />
      <Structure />
      <Products onNavigateHome={onNavigateHome} />
      <Closing onNavigateHome={onNavigateHome} />
    </div>
  );
}
