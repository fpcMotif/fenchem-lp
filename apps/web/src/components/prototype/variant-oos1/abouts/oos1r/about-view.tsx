import * as stylex from "@stylexjs/stylex";

import type { AboutPageProps } from "../../index";
import { Banner } from "./banner";
import { Campus } from "./campus";
import { Csr } from "./csr";
import { Cta } from "./cta";
import { Culture } from "./culture";
import { Honors } from "./honors";
import { Products } from "./products";
import { Profile } from "./profile";
import { ui } from "./shared-values";
import { Structure } from "./structure";
import { SubNav } from "./subnav";

export function AboutOOS1R({ onNavigateHome }: AboutPageProps) {
  return (
    <div id="about-top" {...stylex.props(ui.root)}>
      <SubNav onNavigateHome={onNavigateHome} />
      <Banner />
      <Profile />
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
