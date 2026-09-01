import { breakpoints, colors, radii, typography } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ArrowRight } from "lucide-react";
import { createInquiryHref, regions } from "@/components/landing/landing-content";
import { drawRule, revealWords, riseIn, SplitWords, useSectionAnimation } from "../motion";
import { sharedStyles } from "../styles";

/*
 * Variant J — deep-green finale. The page arc closes where the hero opened:
 * dark ground, one green emphasis phrase, a single primary CTA. A soft CSS
 * radial glow sits behind the type (no motion — it is ambience, not an
 * event), and the six global bases land underneath as a ledger of office
 * nodes ruled off by a hairline that draws itself in.
 */

const styles = stylex.create({
  section: {
    position: "relative",
    scrollMarginTop: "6rem",
    overflow: "hidden",
    backgroundColor: colors.brandGreen950,
    paddingBlock: "8rem",
    color: colors.paper,
  },
  glow: {
    pointerEvents: "none",
    position: "absolute",
    top: "33.333%",
    left: "50%",
    width: "720px",
    height: "720px",
    maxWidth: "100%",
    transform: "translate(-50%, -50%)",
    backgroundImage:
      "radial-gradient(closest-side, color-mix(in oklch, var(--color-brand-green-500) 25%, transparent), transparent)",
    filter: "blur(40px)",
  },
  content: {
    position: "relative",
    marginInline: "auto",
    maxWidth: "64rem",
    paddingInline: "1.5rem",
    textAlign: "center",
  },
  heading: {
    marginInline: "auto",
    marginTop: "2rem",
    maxWidth: "48rem",
    fontFamily: typography.display,
    fontWeight: 300,
    fontSize: {
      default: "3rem",
      [breakpoints.md]: "4.5rem",
    },
    lineHeight: 1.05,
    letterSpacing: "-0.02em",
    color: colors.paper,
  },
  headingItalic: {
    fontStyle: "italic",
    color: colors.brandGreen300,
  },
  lede: {
    marginInline: "auto",
    marginTop: "2rem",
    maxWidth: "36rem",
    fontSize: "1.125rem",
    color: "color-mix(in oklch, var(--color-paper) 70%, transparent)",
    lineHeight: 1.625,
  },
  ctas: {
    marginTop: "2.5rem",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",
  },
  primaryCta: {
    display: "inline-flex",
    minHeight: "2.75rem",
    alignItems: "center",
    gap: "0.625rem",
    borderRadius: radii.full,
    backgroundColor: {
      default: colors.brandGreen500,
      ":hover": colors.brandGreen400,
    },
    paddingInline: "2rem",
    paddingBlock: "0.875rem",
    fontWeight: 600,
    color: colors.brandGreen950,
    fontSize: "0.875rem",
    textDecoration: "none",
    transition: "background-color 200ms ease",
    outline: {
      ":focus-visible": `2px solid ${colors.paper}`,
    },
    outlineOffset: {
      ":focus-visible": 2,
    },
  },
  secondaryCta: {
    display: "inline-flex",
    minHeight: "2.75rem",
    alignItems: "center",
    borderRadius: radii.full,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "color-mix(in oklch, var(--color-paper) 30%, transparent)",
    paddingInline: "2rem",
    paddingBlock: "0.875rem",
    fontWeight: 600,
    color: colors.paper,
    fontSize: "0.875rem",
    textDecoration: "none",
    backgroundColor: {
      default: "transparent",
      ":hover": "color-mix(in oklch, var(--color-paper) 10%, transparent)",
    },
    transition: "background-color 200ms ease",
    outline: {
      ":focus-visible": `2px solid ${colors.brandGreen300}`,
    },
    outlineOffset: {
      ":focus-visible": 2,
    },
  },
  ctaIcon: {
    width: "1rem",
    height: "1rem",
    transition: "transform 300ms ease",
  },
  responseTime: {
    marginTop: "2.5rem",
  },
  basesWrap: {
    position: "relative",
    marginInline: "auto",
    marginTop: "6rem",
    maxWidth: "64rem",
    paddingInline: "1.5rem",
  },
  basesRule: {
    display: "block",
    height: 1,
    width: "100%",
    transformOrigin: "left",
    backgroundColor: colors.brandGreen800,
  },
  basesTitle: {
    marginTop: "2.5rem",
    textAlign: "center",
  },
  basesGrid: {
    marginTop: "2.5rem",
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(2, 1fr)",
      [breakpoints.sm]: "repeat(3, 1fr)",
      [breakpoints.lg]: "repeat(6, 1fr)",
    },
    columnGap: "1.5rem",
    rowGap: "2.5rem",
    listStyle: "none",
    marginInline: 0,
    padding: 0,
  },
  baseItem: {
    textAlign: "center",
  },
  city: {
    fontFamily: typography.display,
    fontSize: "1.125rem",
    color: colors.paper,
    lineHeight: 1.25,
  },
  country: {
    marginTop: "0.5rem",
  },
});

export function FinaleSection() {
  const ref = useSectionAnimation<HTMLElement>((root) => {
    revealWords(root, "[data-finale-heading]");
    riseIn(root, "[data-finale-rise]", { stagger: 0.1, delay: 0.2 });
    drawRule(root, "[data-finale-rule]");
    riseIn(root, "[data-finale-node]", { stagger: 0.07 });
  });

  return (
    <section
      ref={ref}
      id="global-supply"
      aria-labelledby="finale-heading"
      {...stylex.props(styles.section)}
    >
      <div aria-hidden="true" {...stylex.props(styles.glow)} />

      <div {...stylex.props(styles.content)}>
        <p data-finale-rise {...stylex.props(sharedStyles.techLabelDark)}>
          Partner with Fenchem
        </p>

        <h2 id="finale-heading" data-finale-heading {...stylex.props(styles.heading)}>
          <SplitWords
            segments={[
              { text: "Your next formulation," },
              { text: "engineered to specification.", sx: styles.headingItalic },
            ]}
          />
        </h2>

        <p data-finale-rise {...stylex.props(styles.lede)}>
          Submit a target spec — purity, form, matrix, regulatory map — and our laboratory returns a
          validated proposal with full documentation within one business day.
        </p>

        <div data-finale-rise {...stylex.props(styles.ctas)}>
          <a href={createInquiryHref("contact")} {...stylex.props(styles.primaryCta)}>
            Request a Specification
            <ArrowRight aria-hidden="true" {...stylex.props(styles.ctaIcon)} />
          </a>
          <a href="#ingredients" {...stylex.props(styles.secondaryCta)}>
            Explore the Portfolio
          </a>
        </div>

        <p data-finale-rise {...stylex.props(sharedStyles.techLabelDark, styles.responseTime)}>
          Response time under 24h — technical dossiers on request
        </p>
      </div>

      <div {...stylex.props(styles.basesWrap)}>
        <div aria-hidden="true" data-finale-rule {...stylex.props(styles.basesRule)} />
        <h3 id="finale-bases" {...stylex.props(sharedStyles.techLabelDark, styles.basesTitle)}>
          6 Global Bases — 40+ Countries Served
        </h3>
        <ul aria-labelledby="finale-bases" {...stylex.props(styles.basesGrid)}>
          {regions.map((region) => (
            <li key={region.city} data-finale-node {...stylex.props(styles.baseItem)}>
              <p {...stylex.props(styles.city)}>{region.city}</p>
              <p {...stylex.props(sharedStyles.techLabelDark, styles.country)}>{region.country}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
