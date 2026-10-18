import * as stylex from "@stylexjs/stylex";
import { createSignal } from "solid-js";

import type { AboutPageProps } from "../../index";
import { Banner } from "./banner";
import { Campus } from "./campus";
import { Csr } from "./csr";
import { Cta } from "./cta";
import { Culture } from "./culture";
import { Honors } from "./honors";
import { color, font } from "./palette.stylex";
import { Products } from "./products";
import { Profile } from "./profile";
import { Stats } from "./stats";
import { Strand } from "./strand";
import { Structure } from "./structure";
import { SubNav } from "./sub-nav";

const styles = stylex.create({
  root: {
    position: "relative",
    overflowX: "clip",
    backgroundColor: color.page,
    color: color.ink,
    fontFamily: font.cjk,
  },
});

export function AboutOOS1F(props: AboutPageProps) {
  const [root, setRoot] = createSignal<HTMLDivElement>();
  return (
    <div id="about-top" ref={setRoot} {...stylex.attrs(styles.root)}>
      <Banner />
      <SubNav onNavigateHome={props.onNavigateHome} />
      <Profile />
      <Campus />
      <Stats />
      <Culture />
      <Csr />
      <Honors />
      <Structure />
      <Products onNavigateHome={props.onNavigateHome} />
      <Cta onNavigateHome={props.onNavigateHome} />
      <Strand root={root} />
    </div>
  );
}
