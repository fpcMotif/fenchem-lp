import * as stylex from "@stylexjs/stylex";

import type { AboutPageProps } from "../../index";
import { Campus } from "./campus";
import { Closing } from "./closing";
import { Csr } from "./csr";
import { Culture } from "./culture";
import { Hero } from "./hero";
import { Honors } from "./honors";
import { Products } from "./products";
import { Profile } from "./profile";
import { ui } from "./shared-values";
import { Structure } from "./structure";
import { SubNav } from "./subnav";

export function AboutOOS1S({ onNavigateHome }: AboutPageProps) {
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
      <Closing onNavigateHome={onNavigateHome} />
    </div>
  );
}
