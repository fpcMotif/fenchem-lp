import { breakpoints, colors, radii, typography } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ArrowRight, FileDown } from "lucide-react";
import { createInquiryHref, ingredients } from "@/components/landing/landing-content";
import { IMAGES } from "../content";
import {
  drawRule,
  revealWords,
  riseIn,
  settleImage,
  SplitWords,
  useSectionAnimation,
} from "../motion";
import { sharedStyles } from "../styles";

/*
 * Variant J — Product Dossier: the flagship deep-dive on the page's white
 * ground. Left, a single botanical plate with a ledger caption; right, the
 * spec sheet itself. The signature moment is the ledger — five rows rise in
 * sequence while their hairlines draw left to right, so the section reads as
 * a record being filled in rather than a card fading up. Every value comes
 * from the ingredient registry; nothing here is asserted beyond the entry.
 */

const styles = stylex.create({
  section: {
    scrollMarginTop: "7rem",
    backgroundColor: colors.paper,
    paddingBlock: "7rem",
  },
  grid: {
    marginInline: "auto",
    maxWidth: "1240px",
    display: "grid",
    gap: {
      default: "3.5rem",
      [breakpoints.lg]: "4rem",
    },
    paddingInline: "1.5rem",
    gridTemplateColumns: {
      default: "1fr",
      [breakpoints.lg]: "repeat(12, 1fr)",
    },
  },
  leftCol: {
    gridColumn: {
      [breakpoints.lg]: "span 5",
    },
  },
  plateFrame: {
    aspectRatio: "4/5",
    overflow: "hidden",
    borderRadius: "24px",
    backgroundColor: "color-mix(in oklch, var(--color-mist) 40%, transparent)",
  },
  plateImg: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
  },
  captionBox: {
    marginTop: "1rem",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "baseline",
    justifyContent: "space-between",
    columnGap: "1.5rem",
    rowGap: "0.5rem",
    borderRadius: "14px",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.line,
    paddingInline: "1rem",
    paddingBlock: "0.75rem",
  },
  captionCategory: {
    fontFamily: typography.tech,
    fontSize: "11px",
    color: colors.ink,
    textTransform: "uppercase",
    letterSpacing: "0.26em",
  },
  rightCol: {
    gridColumn: {
      [breakpoints.lg]: "span 7",
    },
  },
  heading: {
    marginTop: "1.5rem",
    fontFamily: typography.display,
    fontWeight: 300,
    fontSize: "clamp(2.25rem, 4.6vw, 3.75rem)",
    color: colors.ink,
    lineHeight: 1.06,
    letterSpacing: "-0.02em",
  },
  headingItalic: {
    fontStyle: "italic",
    color: colors.brandGreen700,
  },
  intro: {
    marginTop: "1.75rem",
    maxWidth: "36rem",
    fontSize: "1.125rem",
    color: colors.mute600,
    lineHeight: 1.625,
  },
  topRule: {
    marginTop: "2.5rem",
    display: "block",
    height: 1,
    maxWidth: "36rem",
    transformOrigin: "left",
    backgroundColor: colors.line,
  },
  dl: {
    maxWidth: "36rem",
    margin: 0,
  },
  specRow: {
    position: "relative",
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: "1.5rem",
    paddingBlock: "0.875rem",
  },
  specValue: {
    textAlign: "right",
    fontFamily: typography.tech,
    color: colors.ink,
    fontSize: "0.875rem",
    margin: 0,
  },
  specRowRule: {
    position: "absolute",
    insetInline: 0,
    bottom: 0,
    height: 1,
    transformOrigin: "left",
    backgroundColor: colors.line,
  },
  formatsTitle: {
    marginTop: "2rem",
  },
  formatsList: {
    marginTop: "0.75rem",
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    listStyle: "none",
    marginInline: 0,
    padding: 0,
  },
  chip: {
    borderRadius: radii.full,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.brandGreen200,
    backgroundColor: colors.brandGreen50,
    paddingInline: "0.875rem",
    paddingBlock: "0.375rem",
    fontWeight: 500,
    color: colors.brandGreen800,
    fontSize: "0.75rem",
  },
  ctas: {
    marginTop: "2.5rem",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "1rem",
  },
  primaryCta: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.625rem",
    borderRadius: radii.full,
    backgroundColor: {
      default: colors.brandGreen500,
      ":hover": colors.brandGreen400,
    },
    paddingInline: "1.75rem",
    paddingBlock: "0.875rem",
    fontWeight: 600,
    color: colors.brandGreen950,
    fontSize: "0.875rem",
    textDecoration: "none",
    transition: "background-color 200ms ease",
    outline: {
      ":focus-visible": `2px solid ${colors.brandGreen700}`,
    },
    outlineOffset: {
      ":focus-visible": 2,
    },
  },
  secondaryCta: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.625rem",
    borderRadius: radii.full,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.brandBlue700,
    paddingInline: "1.75rem",
    paddingBlock: "0.875rem",
    fontWeight: 600,
    color: colors.brandBlue700,
    backgroundColor: {
      default: "transparent",
      ":hover": colors.brandBlue50,
    },
    fontSize: "0.875rem",
    textDecoration: "none",
    transition: "background-color 200ms ease",
    outline: {
      ":focus-visible": `2px solid ${colors.brandBlue700}`,
    },
    outlineOffset: {
      ":focus-visible": 2,
    },
  },
  ctaIcon: {
    width: "1rem",
    height: "1rem",
  },
});

/** Ashwagandha KSM-66 — the flagship trade-name active, as in variant H. */
const DOSSIER = ingredients[0];

const SPEC_ROWS = [
  { label: "Botanical source", value: DOSSIER.latin },
  { label: "Assay", value: DOSSIER.purity },
  { label: "Form", value: DOSSIER.form },
  { label: "Application", value: DOSSIER.useCase },
  { label: "Spec ref", value: DOSSIER.code },
];

/** Finished formats the extract ships into (variant H's documented list). */
const FORMATS = ["Capsule", "Tablet", "Softgel", "Powder blend"];

export function DossierSection() {
  const ref = useSectionAnimation<HTMLElement>((root) => {
    settleImage(root, "[data-dossier-img]");
    riseIn(root, "[data-dossier-caption]", { delay: 0.15 });
    riseIn(root, "[data-dossier-eyebrow]");
    revealWords(root, "[data-dossier-heading]", { delay: 0.1 });
    riseIn(root, "[data-dossier-intro]", { delay: 0.35 });
    drawRule(root, "[data-dossier-rule]", { stagger: 0.06 });
    riseIn(root, "[data-dossier-row]", { stagger: 0.06 });
    riseIn(root, "[data-dossier-chip]", { stagger: 0.05 });
    riseIn(root, "[data-dossier-ctas]");
  });

  return (
    <section
      ref={ref}
      id="dossier"
      aria-labelledby="dossier-heading"
      {...stylex.props(styles.section)}
    >
      <div {...stylex.props(styles.grid)}>
        <div {...stylex.props(styles.leftCol)}>
          <div {...stylex.props(styles.plateFrame)}>
            <img
              data-dossier-img
              src={IMAGES.dossier.src}
              alt={IMAGES.dossier.alt}
              loading="lazy"
              {...stylex.props(styles.plateImg)}
            />
          </div>
          <div data-dossier-caption {...stylex.props(styles.captionBox)}>
            <span {...stylex.props(sharedStyles.techLabel)}>
              {DOSSIER.code} — dossier reference
            </span>
            <span {...stylex.props(styles.captionCategory)}>{DOSSIER.category}</span>
          </div>
        </div>

        <div {...stylex.props(styles.rightCol)}>
          <p data-dossier-eyebrow {...stylex.props(sharedStyles.techLabel)}>
            03 — Product Dossier
          </p>

          <h2 id="dossier-heading" data-dossier-heading {...stylex.props(styles.heading)}>
            <SplitWords
              segments={[
                { text: "One active," },
                { text: "documented to the lot.", sx: styles.headingItalic },
              ]}
            />
          </h2>

          <p data-dossier-intro {...stylex.props(styles.intro)}>
            {DOSSIER.name} — {DOSSIER.latin}, supplied as a {DOSSIER.specification.toLowerCase()}{" "}
            standardised to {DOSSIER.purity}. Every compound in the matrix carries this depth of
            documentation; the {DOSSIER.category.toLowerCase()} is shown here as the working
            example.
          </p>

          <div aria-hidden="true" data-dossier-rule {...stylex.props(styles.topRule)} />
          <dl {...stylex.props(styles.dl)}>
            {SPEC_ROWS.map((row) => (
              <div key={row.label} data-dossier-row {...stylex.props(styles.specRow)}>
                <dt {...stylex.props(sharedStyles.techLabel)}>{row.label}</dt>
                <dd {...stylex.props(styles.specValue)}>
                  {row.value}
                  <span
                    aria-hidden="true"
                    data-dossier-rule
                    {...stylex.props(styles.specRowRule)}
                  />
                </dd>
              </div>
            ))}
          </dl>

          <p {...stylex.props(sharedStyles.techLabel, styles.formatsTitle)}>Finished formats</p>
          <ul {...stylex.props(styles.formatsList)}>
            {FORMATS.map((format) => (
              <li key={format} data-dossier-chip {...stylex.props(styles.chip)}>
                {format}
              </li>
            ))}
          </ul>

          <div data-dossier-ctas {...stylex.props(styles.ctas)}>
            <a href={createInquiryHref("quality")} {...stylex.props(styles.primaryCta)}>
              Request this specification
              <ArrowRight aria-hidden="true" {...stylex.props(styles.ctaIcon)} />
            </a>
            <a href={createInquiryHref("contact")} {...stylex.props(styles.secondaryCta)}>
              <FileDown aria-hidden="true" {...stylex.props(styles.ctaIcon)} />
              Technical data sheet
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
