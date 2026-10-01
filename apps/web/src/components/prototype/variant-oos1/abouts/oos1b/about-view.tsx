import * as stylex from "@stylexjs/stylex";

import type { AboutPageProps } from "../../index";
import { Campus } from "./campus";
import { Closing } from "./closing";
import { Csr } from "./csr";
import { Culture } from "./culture";
import { Hero } from "./hero";
import { Honors } from "./honors";
import { SubNav } from "./nav";
import { Products } from "./products";
import { Profile } from "./profile";
import { Stats } from "./stats";
import { Structure } from "./structure";
import { fonts, palette } from "./tokens.stylex";

const styles = stylex.create({
  root: {
    backgroundColor: palette.page,
    color: palette.ink,
    fontFamily: fonts.cjk,
  },
});

export function AboutOOS1B({ onNavigateHome }: AboutPageProps) {
  return (
    <div id="about-top" {...stylex.props(styles.root)}>
      <Hero onNavigateHome={onNavigateHome} />
      <SubNav />
      <Profile />
      <Stats />
      <Campus />
      <Culture />
      <Csr />
      <Honors />
      <Structure />
      <Products onNavigateHome={onNavigateHome} />
      <Closing onNavigateHome={onNavigateHome} />
    </div>
  );
}
