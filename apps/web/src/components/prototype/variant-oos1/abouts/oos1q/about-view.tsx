import * as stylex from "@stylexjs/stylex";

import type { AboutPageProps } from "../../index";
import { Campus } from "./campus";
import { Csr } from "./csr";
import { Cta } from "./cta";
import { Culture } from "./culture";
import { Hero } from "./hero";
import { Honors } from "./honors";
import { Nav } from "./nav";
import { Products } from "./products";
import { Profile } from "./profile";
import { ui } from "./shared-values";
import { Structure } from "./structure";

export function AboutOOS1Q({ onNavigateHome }: AboutPageProps) {
  return (
    <div id="about-top" {...stylex.props(ui.root)}>
      <Hero />
      <Nav onNavigateHome={onNavigateHome} />
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
