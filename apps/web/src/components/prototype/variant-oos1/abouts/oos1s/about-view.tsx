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

export function AboutOOS1S(props: AboutPageProps) {
  return (
    <div id="about-top" {...stylex.attrs(ui.root)}>
      <Hero />
      <SubNav onNavigateHome={props.onNavigateHome} />
      <Profile />
      <Campus />
      <Culture />
      <Csr />
      <Honors />
      <Structure />
      <Products onNavigateHome={props.onNavigateHome} />
      <Closing onNavigateHome={props.onNavigateHome} />
    </div>
  );
}
