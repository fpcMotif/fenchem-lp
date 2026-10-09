import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { CTA } from "../../content";
import { Reveal } from "./motion";
import { Button, Section } from "./primitives";
import { base } from "./primitives-values";
import { font, media, tone } from "./shear.stylex";

const S = stylex.create({
  inner: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: { default: 32, [media.desktop]: 48 },
  },
  title: {
    margin: 0,
    fontFamily: font.sans,
    fontSize: {
      default: "clamp(40px, 11vw, 56px)",
      [breakpoints.lg]: "clamp(56px, 6vw, 88px)",
    },
    fontWeight: 500,
    lineHeight: 1.2,
    letterSpacing: "0.02em",
    color: tone.ink,
  },
  buttons: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 16,
  },
});

export function Cta({ onNavigateHome }: { onNavigateHome: (hash?: string) => void }) {
  return (
    <Section labelledBy="about-cta-title" surface="page">
      <div {...stylex.props(base.shell, base.inset, S.inner)}>
        <Reveal>
          <h2 id="about-cta-title" {...stylex.props(S.title)}>
            {CTA.title}
          </h2>
        </Reveal>
        <Reveal delay={120} sx={S.buttons}>
          <Button variant="primary" onClick={() => onNavigateHome("contact")}>
            {CTA.action.label}
          </Button>
          <Button variant="secondary" onClick={() => onNavigateHome("products")}>
            产品与应用
          </Button>
        </Reveal>
      </div>
    </Section>
  );
}
