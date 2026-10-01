import * as stylex from "@stylexjs/stylex";

import type { AboutPageProps } from "../../index";
import { Band } from "./band";
import { Campus } from "./campus";
import { Csr } from "./csr";
import { Cta } from "./cta";
import { Culture } from "./culture";
import { Hero } from "./hero";
import { Honors } from "./honors";
import { Products } from "./products";
import { Profile } from "./profile";
import { font, tone } from "./shear.stylex";
import { Structure } from "./structure";
import { SubNav } from "./sub-nav";

const S = stylex.create({
  root: {
    position: "relative",
    containerType: "inline-size",
    overflowX: "clip",
    backgroundColor: tone.page,
    color: tone.ink,
    fontFamily: font.sans,
  },
});

export function AboutOOS1I({ onNavigateHome }: AboutPageProps) {
  return (
    <div id="about-top" {...stylex.props(S.root)}>
      <Hero />
      <SubNav onNavigateHome={onNavigateHome} />
      <Profile />
      <Band />
      <Campus />
      <Culture />
      <Csr />
      <Honors />
      <Structure />
      <Products onNavigateHome={onNavigateHome} />
      <Cta onNavigateHome={onNavigateHome} />
    </div>
  );
}
