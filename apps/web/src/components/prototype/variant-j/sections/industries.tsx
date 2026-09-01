import { breakpoints, colors, typography } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ArrowUpRight } from "lucide-react";
import { industries } from "@/components/landing/landing-content";
import { imgForIndustry, INDUSTRY_COPY } from "../content";
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
 * Variant J — Industries: the ledger opens. White spec ground, one italic
 * green phrase in the display heading, then the three application domains as
 * full-width numbered rows. Hairlines draw themselves in above each row;
 * hover state (row wash + arrow travel) belongs entirely to CSS, so GSAP
 * never touches a property the transition owns. SSR markup is the final
 * state — under reduced motion nothing is hidden, it simply renders.
 */

const styles = stylex.create({
  section: {
    scrollMarginTop: "7rem",
    backgroundColor: colors.paper,
    paddingBlock: "7rem",
  },
  container: {
    marginInline: "auto",
    maxWidth: "1480px",
    paddingInline: {
      default: "1.25rem",
      [breakpoints.md]: "2.5rem",
    },
  },
  headerGrid: {
    display: "grid",
    gap: {
      default: "2rem",
      [breakpoints.md]: "1.5rem",
    },
    gridTemplateColumns: {
      default: "1fr",
      [breakpoints.md]: "repeat(12, 1fr)",
    },
    alignItems: {
      [breakpoints.md]: "end",
    },
  },
  headerCol: {
    gridColumn: {
      [breakpoints.md]: "span 7",
    },
  },
  heading: {
    marginTop: "1.5rem",
    fontFamily: typography.display,
    fontSize: {
      default: "3rem",
      [breakpoints.md]: "3.75rem",
    },
    fontWeight: 300,
    lineHeight: 1.05,
    letterSpacing: "-0.025em",
    color: colors.ink,
  },
  headingItalic: {
    fontStyle: "italic",
    color: colors.brandGreen700,
  },
  intro: {
    gridColumn: {
      [breakpoints.md]: "span 5",
    },
    maxWidth: "24rem",
    lineHeight: 1.625,
    color: colors.mute600,
    justifySelf: {
      [breakpoints.md]: "end",
    },
    textAlign: {
      [breakpoints.md]: "right",
    },
  },
  list: {
    marginTop: "5rem",
    listStyle: "none",
    marginInline: 0,
    padding: 0,
  },
  link: {
    display: "block",
    textDecoration: "none",
    outline: {
      ":focus-visible": `2px solid ${colors.brandGreen700}`,
    },
    outlineOffset: {
      ":focus-visible": -2,
    },
  },
  row: {
    display: "grid",
    gap: {
      default: "1.25rem",
      [breakpoints.md]: "1.5rem",
    },
    paddingInline: {
      default: "1rem",
      [breakpoints.md]: "1.5rem",
    },
    paddingBlock: {
      default: "2.25rem",
      [breakpoints.md]: "3rem",
    },
    gridTemplateColumns: {
      default: "1fr",
      [breakpoints.md]: "repeat(12, 1fr)",
    },
    alignItems: {
      [breakpoints.md]: "center",
    },
    backgroundColor: {
      default: "transparent",
      ":hover": colors.mute50,
    },
    transition: "background-color 300ms ease",
  },
  index: {
    gridColumn: {
      [breakpoints.md]: "span 1",
    },
    fontFamily: typography.tech,
    fontSize: "0.875rem",
    letterSpacing: "0.22em",
    color: colors.brandGreen700,
  },
  title: {
    gridColumn: {
      [breakpoints.md]: "span 4",
    },
    fontFamily: typography.display,
    fontSize: "1.5rem",
    fontWeight: 300,
    letterSpacing: "-0.025em",
    color: {
      default: colors.ink,
      ":hover": colors.brandGreen700,
    },
    transition: "color 300ms ease",
  },
  copy: {
    gridColumn: {
      [breakpoints.md]: "span 4",
    },
    maxWidth: "28rem",
    fontSize: "0.875rem",
    lineHeight: 1.625,
    color: colors.mute600,
  },
  mediaWrap: {
    gridColumn: {
      [breakpoints.md]: "span 3",
    },
    display: "flex",
    alignItems: "center",
    justifyContent: {
      default: "space-between",
      [breakpoints.md]: "flex-end",
    },
    gap: "1.25rem",
  },
  thumbWrap: {
    display: "block",
    width: {
      default: "4rem",
      [breakpoints.md]: "5rem",
    },
    height: {
      default: "4rem",
      [breakpoints.md]: "5rem",
    },
    flexShrink: 0,
    overflow: "hidden",
    borderRadius: "0.75rem",
  },
  thumbImg: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
    outline: "1px solid rgba(0, 0, 0, 0.1)",
    outlineOffset: -1,
  },
  arrowIcon: {
    width: "1.25rem",
    height: "1.25rem",
    flexShrink: 0,
    color: colors.mute600,
    transition: "transform 300ms ease, color 300ms ease",
  },
});

export function IndustriesSection() {
  const ref = useSectionAnimation<HTMLElement>((root) => {
    riseIn(root, "[data-ind-eyebrow], [data-ind-intro]", { stagger: 0.12 });
    revealWords(root, "[data-ind-heading]", { delay: 0.08 });
    drawRule(root, "[data-ind-rule]", { stagger: 0.12 });
    riseIn(root, "[data-ind-row]", { stagger: 0.12, delay: 0.14 });
    settleImage(root, "[data-ind-thumb]");
  });

  return (
    <section
      ref={ref}
      id="industries"
      aria-labelledby="industries-heading"
      {...stylex.props(styles.section)}
    >
      <div {...stylex.props(styles.container)}>
        <div {...stylex.props(styles.headerGrid)}>
          <div {...stylex.props(styles.headerCol)}>
            <p data-ind-eyebrow {...stylex.props(sharedStyles.techLabel)}>
              01 — Application Domains
            </p>
            <h2 id="industries-heading" data-ind-heading {...stylex.props(styles.heading)}>
              <SplitWords
                segments={[
                  { text: "Built for three" },
                  {
                    text: "industries.",
                    sx: styles.headingItalic,
                  },
                ]}
              />
            </h2>
          </div>
          <p data-ind-intro {...stylex.props(styles.intro)}>
            Clinically supported actives engineered for the precise demands of each formulation
            discipline.
          </p>
        </div>

        <ul {...stylex.props(styles.list)}>
          {industries.map((industry, index) => (
            <li key={industry.title}>
              <a
                href="#ingredients"
                aria-label={`${industry.title} — explore the matching ingredients`}
                {...stylex.props(styles.link)}
              >
                <span data-ind-rule aria-hidden="true" {...stylex.props(sharedStyles.ruleLine)} />
                <div data-ind-row {...stylex.props(styles.row)}>
                  <span {...stylex.props(styles.index)}>{String(index + 1).padStart(2, "0")}</span>
                  <h3 {...stylex.props(styles.title)}>{industry.title}</h3>
                  <p {...stylex.props(styles.copy)}>
                    {INDUSTRY_COPY[industry.title] ?? industry.copy}
                  </p>
                  <div {...stylex.props(styles.mediaWrap)}>
                    <span {...stylex.props(styles.thumbWrap)}>
                      <img
                        data-ind-thumb
                        src={imgForIndustry(industry).src}
                        alt={imgForIndustry(industry).alt}
                        loading="lazy"
                        {...stylex.props(styles.thumbImg)}
                      />
                    </span>
                    <ArrowUpRight aria-hidden="true" {...stylex.props(styles.arrowIcon)} />
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
        <span data-ind-rule aria-hidden="true" {...stylex.props(sharedStyles.ruleLine)} />
      </div>
    </section>
  );
}
