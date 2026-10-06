import * as stylex from "@stylexjs/stylex";

import type { AboutPageProps } from "../../index";
import { Campus } from "./campus";
import { Csr } from "./csr";
import { Cta } from "./cta";
import { Culture } from "./culture";
import { Hero } from "./hero";
import { Honors } from "./honors";
import { SubNav } from "./nav";
import { Products } from "./products";
import { Profile } from "./profile";
import { ui } from "./shared";
import { Structure } from "./structure";

export function AboutOOS1N({ onNavigateHome }: AboutPageProps) {
  return (
    <div id="about-top" {...stylex.props(ui.root)}>
      <Hero />
      <SubNav onNavigateHome={onNavigateHome} />
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
