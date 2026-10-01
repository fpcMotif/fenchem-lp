import * as stylex from "@stylexjs/stylex";
import { useScroll } from "motion/react";
import { useRef } from "react";

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

export function AboutOOS1G({ onNavigateHome }: AboutPageProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start start", "end end"],
  });

  return (
    <div id="about-top" ref={rootRef} {...stylex.props(styles.root)}>
      <BisectLine progress={scrollYProgress} rootRef={rootRef} />
      <Hero />
      <SubNav onNavigateHome={onNavigateHome} />
      <Stats />
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
