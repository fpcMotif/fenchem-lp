import * as stylex from "@stylexjs/stylex";

import type { AboutPageProps } from "../../index";
import { Campus } from "./campus";
import { Csr } from "./csr";
import { Cta } from "./cta";
import { Culture } from "./culture";
import { Hero } from "./hero";
import { Honors } from "./honors";
import { Products } from "./products";
import { Profile } from "./profile";
import { Rail, TopBar } from "./rail";
import { StatsBand } from "./stats-band";
import { Structure } from "./structure";
import { font, layout, ui } from "./theme.stylex";
import { useRail } from "./use-rail";

const styles = stylex.create({
  root: {
    position: "relative",
    paddingTop: layout.header,
    backgroundColor: ui.page,
    color: ui.ink,
    fontFamily: font.cjk,
  },
});

export function AboutOOS1H(props: AboutPageProps) {
  const { progress, active } = useRail();

  return (
    <div id="about-top" {...stylex.attrs(styles.root)}>
      <TopBar progress={progress} active={active()} />
      <Rail progress={progress} active={active()} />
      <Hero onNavigateHome={props.onNavigateHome} />
      <Profile />
      <StatsBand />
      <Campus />
      <Culture />
      <Csr />
      <Honors />
      <Structure />
      <Products onNavigateHome={props.onNavigateHome} />
      <Cta onNavigateHome={props.onNavigateHome} />
    </div>
  );
}
