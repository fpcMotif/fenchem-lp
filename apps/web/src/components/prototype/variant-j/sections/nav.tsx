import { breakpoints, colors, radii, typography } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import gsap from "gsap";
import { Leaf } from "lucide-react";
import { navLinks, toAnchor } from "@/components/landing/landing-content";
import { useSectionAnimation } from "../motion";

/*
 * Variant I — floating pill navigation, absolute over the dark hero.
 * Cream-on-dark; anchors glide via Lenis (native smooth under reduced
 * motion). Fully usable before the intro animation completes.
 */

const styles = stylex.create({
  header: {
    position: "absolute",
    insetInline: 0,
    top: 0,
    zIndex: 30,
    paddingInline: {
      default: "1rem",
      [breakpoints.sm]: "2rem",
    },
    paddingTop: "1.25rem",
  },
  pill: {
    marginInline: "auto",
    display: "flex",
    maxWidth: "64rem",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: radii.full,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "color-mix(in oklch, var(--color-cream) 15%, transparent)",
    backgroundColor: "color-mix(in oklch, var(--color-bark) 40%, transparent)",
    paddingBlock: "0.5rem",
    paddingRight: "0.5rem",
    paddingLeft: "1.5rem",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontFamily: typography.display,
    color: colors.cream,
    fontSize: "1.125rem",
    letterSpacing: "-0.025em",
    textDecoration: "none",
    outline: {
      ":focus-visible": `2px solid ${colors.brandGreen300}`,
    },
    outlineOffset: {
      ":focus-visible": 2,
    },
  },
  logoIcon: {
    width: "1rem",
    height: "1rem",
    color: colors.brandGreen300,
  },
  navLinks: {
    display: {
      default: "none",
      [breakpoints.md]: "flex",
    },
    alignItems: "center",
    gap: "1.5rem",
  },
  link: {
    color: {
      default: "color-mix(in oklch, var(--color-cream) 70%, transparent)",
      ":hover": colors.cream,
      ":focus-visible": colors.cream,
    },
    fontSize: "0.875rem",
    textDecoration: "none",
    transition: "color 200ms ease",
    outline: {
      ":focus-visible": `2px solid ${colors.brandGreen300}`,
    },
    outlineOffset: {
      ":focus-visible": 2,
    },
  },
  cta: {
    borderRadius: radii.full,
    backgroundColor: {
      default: colors.brandGreen500,
      ":hover": colors.brandGreen400,
    },
    paddingInline: "1.25rem",
    paddingBlock: "0.625rem",
    fontWeight: 600,
    color: colors.brandGreen950,
    fontSize: "0.875rem",
    textDecoration: "none",
    transition: "background-color 200ms ease",
    outline: {
      ":focus-visible": `2px solid ${colors.cream}`,
    },
    outlineOffset: {
      ":focus-visible": 2,
    },
  },
});

export function NavBar() {
  const ref = useSectionAnimation<HTMLElement>((root) => {
    gsap.from(root.querySelector("[data-nav-pill]"), {
      y: -18,
      autoAlpha: 0,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.1,
    });
  });

  return (
    <header ref={ref} {...stylex.props(styles.header)}>
      <nav data-nav-pill aria-label="Primary" {...stylex.props(styles.pill)}>
        <a href="#top" {...stylex.props(styles.logo)}>
          <Leaf aria-hidden="true" {...stylex.props(styles.logoIcon)} />
          Fenchem
        </a>
        <div {...stylex.props(styles.navLinks)}>
          {navLinks.map((link) => (
            <a key={link.section} href={toAnchor(link.section)} {...stylex.props(styles.link)}>
              {link.label}
            </a>
          ))}
        </div>
        <a href="#global-supply" {...stylex.props(styles.cta)}>
          Partner with Us
        </a>
      </nav>
    </header>
  );
}
