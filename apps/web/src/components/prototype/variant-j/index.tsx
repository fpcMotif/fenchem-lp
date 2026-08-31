import { colors, typography } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { MotionRoot } from "./motion";
import { DossierSection } from "./sections/dossier";
import { FinaleSection } from "./sections/finale";
import { FooterSection } from "./sections/footer";
import { HeroSection } from "./sections/hero";
import { IndustriesSection } from "./sections/industries";
import { MatrixSection } from "./sections/matrix";
import { NavBar } from "./sections/nav";
import { OriginStandardsSection } from "./sections/origin-standards";
import { PresenterSection } from "./sections/presenter";
import { TickerSection } from "./sections/ticker";

/*
 * PROTOTYPE — Variant J: "The Greenhouse Ledger" — the motion-led production
 * build. Art direction: docs/brand/variant-j-direction.md. VariantH's
 * structure and measured color decisions, re-choreographed with GSAP +
 * Lenis (sole smooth-scroll engine, killed under reduced motion) and a
 * dark → light → dark page arc: C/F's cinematic hero opens, H's white spec
 * ledger carries the middle, the deep-green finale closes.
 */

const styles = stylex.create({
  root: {
    position: "relative",
    backgroundColor: colors.paper,
    fontFamily: typography.body,
    color: colors.ink,
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    "::selection": {
      backgroundColor: colors.brandGreen200,
      color: colors.brandGreen900,
    },
  },
});

export function VariantJ() {
  return (
    <MotionRoot>
      <div {...stylex.props(styles.root)}>
        <NavBar />
        <main>
          <HeroSection />
          <TickerSection />
          <IndustriesSection />
          <MatrixSection />
          <DossierSection />
          <PresenterSection />
          <OriginStandardsSection />
          <FinaleSection />
        </main>
        <FooterSection />
      </div>
    </MotionRoot>
  );
}
