import * as stylex from "@stylexjs/stylex";
import { useScroll } from "@/compat/motion";
import { createSignal } from "solid-js";

import type { AboutPageProps } from "../../index";
import { Campus } from "./campus";
import { Closing } from "./closing";
import { Csr } from "./csr";
import { Culture } from "./culture";
import { Hero, Stats } from "./hero";
import { Honors } from "./honors";
import { palette } from "./palette.stylex";
import { Products } from "./products";
import { Profile } from "./profile";
import { BisectLine, SubNav } from "./rail";
import { Structure } from "./structure";

const styles = stylex.create({
  root: {
    position: "relative",
    backgroundColor: palette.page,
    color: palette.ink,
    fontFamily: palette.fontBody,
  },
});

export function AboutOOS1G(props: AboutPageProps) {
  const [root, setRoot] = createSignal<HTMLDivElement>();
  const { scrollYProgress } = useScroll({
    target: root,
    offset: ["start start", "end end"],
  });

  return (
    <div id="about-top" ref={setRoot} {...stylex.attrs(styles.root)}>
      <BisectLine progress={scrollYProgress} root={root} />
      <Hero />
      <SubNav onNavigateHome={props.onNavigateHome} />
      <Stats />
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
