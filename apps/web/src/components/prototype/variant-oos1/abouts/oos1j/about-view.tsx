import * as stylex from "@stylexjs/stylex";

import type { AboutPageProps } from "../../index";
import { Campus } from "./campus";
import { Csr } from "./csr";
import { Culture } from "./culture";
import { Finale } from "./finale";
import { Hero } from "./hero";
import { Honors } from "./honors";
import { IndexBar } from "./index-bar";
import { Moment } from "./moment";
import { Products } from "./products";
import { Profile } from "./profile";
import { base } from "./shared";
import { Structure } from "./structure";

export function AboutOOS1J({ onNavigateHome }: AboutPageProps) {
  return (
    <div id="about-top" {...stylex.props(base.root)}>
      <Hero />
      <IndexBar onNavigateHome={onNavigateHome} />
      <Profile />
      <Moment />
      <Campus />
      <Culture />
      <Csr />
      <Honors />
      <Structure />
      <Products onNavigateHome={onNavigateHome} />
      <Finale onNavigateHome={onNavigateHome} />
    </div>
  );
}
