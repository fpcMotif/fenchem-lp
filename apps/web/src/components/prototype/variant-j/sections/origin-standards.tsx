import { breakpoints, colors, radii, typography } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import gsap from "gsap";
import { FlaskConical, Globe, Sprout } from "lucide-react";
import { certifications, pillars } from "@/components/landing/landing-content";
import { IMAGES, ORIGIN_QUOTE } from "../content";
import { drawRule, riseIn, settleImage, useSectionAnimation } from "../motion";
import { sharedStyles } from "../styles";

/*
 * Variant I — the editorial dark beat: origin pull-quote, then the quality
 * standards it commits to. This is the page's second and last scrubbed
 * moment — the four quote lines ink in line by line as you scroll, which is
 * why they stay plain text (the line, not the word, is the unit here).
 * Everything below the quote is the shared germination voice: the canopy
 * band settles, the pillars rise, the certification rule draws itself in.
 */

const styles = stylex.create({
  section: {
    scrollMarginTop: "7rem",
    backgroundColor: colors.bark,
    paddingBlock: "8rem",
    color: colors.cream,
  },
  container: {
    marginInline: "auto",
    maxWidth: "72rem",
    paddingInline: "1.5rem",
  },
  quoteWrap: {
    marginInline: "auto",
    maxWidth: "56rem",
    textAlign: "center",
  },
  blockquote: {
    marginTop: "2.5rem",
    marginInline: 0,
  },
  quoteText: {
    fontFamily: typography.display,
    fontWeight: 300,
    fontSize: {
      default: "2.25rem",
      [breakpoints.md]: "3.75rem",
    },
    lineHeight: 1.15,
    letterSpacing: "-0.02em",
  },
  quoteLine: {
    display: "block",
    willChange: "transform",
  },
  quoteLineLast: {
    display: "block",
    fontStyle: "italic",
    color: colors.mist,
    willChange: "transform",
  },
  quoteAttribution: {
    marginTop: "2.5rem",
    fontFamily: typography.tech,
    fontSize: "11px",
    color: "color-mix(in oklch, var(--color-cream) 50%, transparent)",
    textTransform: "uppercase",
    letterSpacing: "0.26em",
  },
  canopyFrame: {
    marginTop: "6rem",
    aspectRatio: "21/9",
    overflow: "hidden",
    borderRadius: "24px",
  },
  canopyImg: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
  },
  standardsHead: {
    marginTop: "5rem",
    display: "grid",
    gap: {
      default: "1.5rem",
      [breakpoints.md]: "3rem",
    },
    gridTemplateColumns: {
      default: "1fr",
      [breakpoints.md]: "repeat(2, 1fr)",
    },
    alignItems: {
      [breakpoints.md]: "end",
    },
  },
  standardsTitle: {
    fontFamily: typography.display,
    fontWeight: 300,
    fontSize: {
      default: "1.875rem",
      [breakpoints.md]: "2.25rem",
    },
    lineHeight: 1.15,
    letterSpacing: "-0.02em",
  },
  standardsTitleAccent: {
    color: colors.brandGreen400,
  },
  standardsIntro: {
    maxWidth: "28rem",
    color: "color-mix(in oklch, var(--color-cream) 60%, transparent)",
    fontSize: "0.875rem",
    lineHeight: 1.625,
  },
  pillarsGrid: {
    marginTop: "3.5rem",
    display: "grid",
    gap: {
      default: "3rem",
      [breakpoints.md]: "2.5rem",
    },
    gridTemplateColumns: {
      default: "1fr",
      [breakpoints.md]: "repeat(3, 1fr)",
    },
  },
  iconWrap: {
    display: "flex",
    width: "2.5rem",
    height: "2.5rem",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.lg,
    backgroundColor: colors.brandGreen900,
  },
  icon: {
    width: "1rem",
    height: "1rem",
    color: colors.brandGreen300,
  },
  pillarTitle: {
    marginTop: "1.25rem",
    fontFamily: typography.display,
    fontSize: "1.25rem",
    letterSpacing: "-0.025em",
  },
  pillarCopy: {
    marginTop: "0.75rem",
    color: "color-mix(in oklch, var(--color-cream) 60%, transparent)",
    fontSize: "0.875rem",
    lineHeight: 1.625,
  },
  certStrip: {
    marginTop: "5rem",
  },
  certRow: {
    marginTop: "1.5rem",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "baseline",
    justifyContent: "space-between",
    columnGap: "2rem",
    rowGap: "0.75rem",
  },
  certTitle: {
    fontFamily: typography.tech,
    fontSize: "11px",
    color: "color-mix(in oklch, var(--color-cream) 50%, transparent)",
    textTransform: "uppercase",
    letterSpacing: "0.26em",
  },
  certList: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "baseline",
    columnGap: "1.5rem",
    rowGap: "0.5rem",
    fontFamily: typography.tech,
    fontSize: "11px",
    color: "color-mix(in oklch, var(--color-cream) 50%, transparent)",
    textTransform: "uppercase",
    letterSpacing: "0.26em",
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
});

const PILLAR_ICONS = [Sprout, FlaskConical, Globe] as const;

export function OriginStandardsSection() {
  const ref = useSectionAnimation<HTMLElement>((root) => {
    const lines = root.querySelectorAll("[data-quote-line]");
    const quote = root.querySelector("[data-quote]");
    if (lines.length && quote) {
      gsap.from(lines, {
        opacity: 0.18,
        y: 12,
        stagger: 0.25,
        ease: "none",
        scrollTrigger: { trigger: quote, start: "top 75%", end: "top 30%", scrub: true },
      });
    }

    riseIn(root, "[data-quote-eyebrow]");
    riseIn(root, "[data-quote-attribution]", { start: "top 88%" });
    settleImage(root, "[data-standards-img]");
    riseIn(root, "[data-standards-head] > *", { stagger: 0.1 });
    riseIn(root, "[data-pillar]", { stagger: 0.12 });
    drawRule(root, "[data-cert-rule]");
    riseIn(root, "[data-cert-line]", { stagger: 0.08 });
  });

  return (
    <section
      ref={ref}
      id="quality"
      aria-labelledby="quality-heading"
      {...stylex.props(styles.section)}
    >
      <div {...stylex.props(styles.container)}>
        {/* Origin — the pull-quote, inked in line by line on scroll */}
        <div {...stylex.props(styles.quoteWrap)}>
          <p data-quote-eyebrow {...stylex.props(sharedStyles.techLabelDark)}>
            {ORIGIN_QUOTE.eyebrow}
          </p>
          <blockquote data-quote {...stylex.props(styles.blockquote)}>
            <p {...stylex.props(styles.quoteText)}>
              {ORIGIN_QUOTE.lines.map((line, index) => (
                <span
                  key={line}
                  data-quote-line
                  {...stylex.props(
                    index === ORIGIN_QUOTE.lines.length - 1
                      ? styles.quoteLineLast
                      : styles.quoteLine,
                  )}
                >
                  {line}
                </span>
              ))}
            </p>
            <footer data-quote-attribution {...stylex.props(styles.quoteAttribution)}>
              {ORIGIN_QUOTE.attribution}
            </footer>
          </blockquote>
        </div>

        {/* The canopy the record starts under */}
        <div {...stylex.props(styles.canopyFrame)}>
          <img
            data-standards-img
            src={IMAGES.standards.src}
            alt={IMAGES.standards.alt}
            {...stylex.props(styles.canopyImg)}
            loading="lazy"
          />
        </div>

        {/* Standards — the three pillars of the quality program */}
        <div data-standards-head {...stylex.props(styles.standardsHead)}>
          <h2 id="quality-heading" {...stylex.props(styles.standardsTitle)}>
            Science-backed <span {...stylex.props(styles.standardsTitleAccent)}>standards.</span>
          </h2>
          <p {...stylex.props(styles.standardsIntro)}>
            Every lot. Every market. Every release — documented to your regulatory map before you
            ask for it.
          </p>
        </div>

        <div {...stylex.props(styles.pillarsGrid)}>
          {pillars.map((pillar, index) => {
            const Icon = PILLAR_ICONS[index];
            return (
              <div key={pillar.title} data-pillar>
                <span {...stylex.props(styles.iconWrap)}>
                  <Icon aria-hidden="true" {...stylex.props(styles.icon)} strokeWidth={1.5} />
                </span>
                <h3 {...stylex.props(styles.pillarTitle)}>{pillar.title}</h3>
                <p {...stylex.props(styles.pillarCopy)}>{pillar.copy}</p>
              </div>
            );
          })}
        </div>

        {/* Certification ledger strip */}
        <div {...stylex.props(styles.certStrip)}>
          <div data-cert-rule {...stylex.props(sharedStyles.ruleLineDark)} />
          <div {...stylex.props(styles.certRow)}>
            <p data-cert-line {...stylex.props(styles.certTitle)}>
              Certified quality systems
            </p>
            <ul data-cert-line {...stylex.props(styles.certList)}>
              {certifications.map((certification) => (
                <li key={certification}>{certification}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
