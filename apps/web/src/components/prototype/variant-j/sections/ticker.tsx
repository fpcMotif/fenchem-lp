import { colors, radii, typography } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import gsap from "gsap";
import { Pause, Play } from "@fenchem-lp/ui/components/lucide";
import { createSignal } from "solid-js";
import { ingredients } from "@/components/landing/landing-content";
import { useReducedMotionFlag, useSectionAnimation } from "../motion";
import { marquee } from "../motion-values";

/*
 * Variant J — ingredient index ticker. A thin dark band that carries the
 * cinematic hero into the white ledger: the eight portfolio entries scroll
 * past as ledger rows, mono index + name, diamond-separated.
 *
 * Contrast on bark: cream/60 ≈ 7.1:1, green-400 ≈ 7.4:1 — both clear of the
 * 4.5:1 floor at the 11px mono size. The diamonds are decoration only.
 *
 * WCAG 2.2.2 (Pause, Stop, Hide): the motion starts on its own and never
 * ends, so it needs a real control — the button pauses the GSAP tween and
 * is keyboard reachable. Under reduced motion nothing moves and no control
 * is offered; the row simply sits there as a static index.
 */

const styles = stylex.create({
  section: {
    position: "relative",
    overflow: "hidden",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopStyle: "solid",
    borderBottomStyle: "solid",
    borderColor: "color-mix(in oklch, var(--color-cream) 10%, transparent)",
    backgroundColor: colors.bark,
    paddingBlock: "1rem",
  },
  leftFade: {
    pointerEvents: "none",
    position: "absolute",
    insetBlock: 0,
    left: 0,
    zIndex: 10,
    width: "3.5rem",
    backgroundImage: "linear-gradient(to right, var(--color-bark), transparent)",
  },
  rightFade: {
    pointerEvents: "none",
    position: "absolute",
    insetBlock: 0,
    right: 0,
    zIndex: 10,
    width: "5rem",
    backgroundImage: "linear-gradient(to left, var(--color-bark), transparent)",
  },
  trackWrap: {
    overflow: "hidden",
  },
  track: {
    display: "flex",
    width: "max-content",
    willChange: "transform",
  },
  list: {
    display: "flex",
    flexShrink: 0,
    alignItems: "center",
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  item: {
    display: "flex",
    alignItems: "center",
  },
  text: {
    whiteSpace: "nowrap",
    fontFamily: typography.tech,
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.26em",
  },
  index: {
    color: colors.brandGreen400,
  },
  name: {
    paddingLeft: "0.75rem",
    color: "color-mix(in oklch, var(--color-cream) 60%, transparent)",
  },
  diamond: {
    marginInline: "1.75rem",
    width: 5,
    height: 5,
    transform: "rotate(45deg)",
    backgroundColor: "color-mix(in oklch, var(--color-cream) 25%, transparent)",
  },
  toggleButton: {
    position: "absolute",
    top: "50%",
    right: "0.75rem",
    zIndex: 20,
    display: "inline-flex",
    width: "1.75rem",
    height: "1.75rem",
    transform: "translateY(-50%)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.full,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: {
      default: "color-mix(in oklch, var(--color-cream) 20%, transparent)",
      ":hover": "color-mix(in oklch, var(--color-cream) 40%, transparent)",
    },
    backgroundColor: colors.bark,
    color: {
      default: "color-mix(in oklch, var(--color-cream) 70%, transparent)",
      ":hover": colors.cream,
    },
    transition: "border-color 200ms ease, color 200ms ease",
    cursor: "pointer",
    outline: {
      ":focus-visible": `2px solid ${colors.brandGreen300}`,
    },
    outlineOffset: {
      ":focus-visible": 2,
    },
  },
  playIcon: {
    marginLeft: 1,
    width: "0.75rem",
    height: "0.75rem",
  },
  pauseIcon: {
    width: "0.75rem",
    height: "0.75rem",
  },
});

/** Track content is rendered twice; marquee() loops the first copy out. */
const TRACK_COPIES = [0, 1] as const;

export function TickerSection() {
  const reduced = useReducedMotionFlag();
  let loop: gsap.core.Tween | null = null;
  const [paused, setPaused] = createSignal(false);

  const ref = useSectionAnimation<HTMLElement>((root) => {
    marquee(root, "[data-ticker-track]", 36);
    const track = root.querySelector<HTMLElement>("[data-ticker-track]");
    loop = track ? (gsap.getTweensOf(track)[0] ?? null) : null;
  });

  const togglePaused = () => {
    const next = !paused();
    setPaused(next);
    loop?.paused(next);
  };

  return (
    <section ref={ref} id="ticker" aria-label="Ingredient index" {...stylex.attrs(styles.section)}>
      <span aria-hidden="true" {...stylex.attrs(styles.leftFade)} />
      <span aria-hidden="true" {...stylex.attrs(styles.rightFade)} />

      <div {...stylex.attrs(styles.trackWrap)}>
        <div data-ticker-track="" {...stylex.attrs(styles.track)}>
          {TRACK_COPIES.map((copy) => (
            <ul aria-hidden={copy === 1 ? "true" : undefined} {...stylex.attrs(styles.list)}>
              {ingredients.map((ingredient, index) => (
                <li {...stylex.attrs(styles.item)}>
                  <span {...stylex.attrs(styles.text)}>
                    <span {...stylex.attrs(styles.index)}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span {...stylex.attrs(styles.name)}>{ingredient.name}</span>
                  </span>
                  <span aria-hidden="true" {...stylex.attrs(styles.diamond)} />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      {reduced() ? null : (
        <button
          type="button"
          onClick={togglePaused}
          aria-pressed={paused() ? "true" : "false"}
          aria-label={paused() ? "Resume the ingredient ticker" : "Pause the ingredient ticker"}
          {...stylex.attrs(styles.toggleButton)}
        >
          {paused() ? (
            <Play aria-hidden="true" {...stylex.attrs(styles.playIcon)} />
          ) : (
            <Pause aria-hidden="true" {...stylex.attrs(styles.pauseIcon)} />
          )}
        </button>
      )}
    </section>
  );
}
