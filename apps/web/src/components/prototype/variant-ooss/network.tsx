import * as stylex from "@stylexjs/stylex";

import { GLOBAL_INTRO, IMAGES, OFFICE_COLUMNS, OFFICE_MAP_PINS } from "./content";
import { Reveal } from "./motion";
import { media } from "./tokens.stylex";
import { layout } from "./ui";

const HEADER_HEIGHT = 80;

const INK = "#1a1a1a";
const BODY_TEXT = "#4d4d4d";
const TINT = "#e6ecf7";
const SURFACE = "#f6f6f6";
const EASE_OUT_CSS = "cubic-bezier(0.22, 1, 0.36, 1)";
const INSET_120 = "min(120px, 8.333vw)";

const pinPulse = stylex.keyframes({
  "0%": { scale: "0.2", opacity: 0.85 },
  "100%": { scale: "2.4", opacity: 0 },
});

const styles = stylex.create({
  anchor: {
    scrollMarginTop: HEADER_HEIGHT,
  },
  sectionTitle: {
    margin: 0,
    fontSize: { default: 26, [media.tablet]: 32, [media.desktop]: 40 },
    fontWeight: 700,
    lineHeight: 1.2,
    color: INK,
    textWrap: "balance",
  },
  sectionLead: {
    margin: 0,
    fontSize: { default: 16, [media.desktop]: 18 },
    lineHeight: 1.6,
    color: BODY_TEXT,
    textAlign: "center",
    textWrap: "pretty",
  },
  mutedText: {
    margin: 0,
    fontSize: 16,
    lineHeight: 1.2,
    color: BODY_TEXT,
    textWrap: "pretty",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  globalBand: {
    paddingTop: { default: 64, [media.desktop]: 109 },
    paddingBottom: { default: 64, [media.desktop]: 101 },
    backgroundColor: "#ffffff",
  },
  globalRow: {
    display: "flex",
    flexDirection: { default: "column", [media.desktop]: "row" },
    alignItems: "center",
    gap: 25,
    maxWidth: 1090,
    marginInlineStart: {
      default: 16,
      [media.tablet]: 40,
      [media.desktop]: `max(${INSET_120}, calc(50% - 522px))`,
    },
    marginInlineEnd: { default: 16, [media.tablet]: 40, [media.desktop]: INSET_120 },
  },
  mapWrap: {
    position: "relative",
    width: "100%",
    maxWidth: 611,
    flexBasis: { default: "auto", [media.desktop]: 611 },
    flexShrink: 1,
    minWidth: 0,
  },
  mapRing: {
    position: "absolute",
    width: 26,
    height: 10,
    marginLeft: -13,
    marginTop: -5,
    borderRadius: "50%",
    borderWidth: 1.5,
    borderStyle: "solid",
    borderColor: "#0743ae",
    opacity: 0,
    pointerEvents: "none",
    animationName: { default: pinPulse, [media.motionReduce]: "none" },
    animationDuration: "2800ms",
    animationTimingFunction: EASE_OUT_CSS,
    animationIterationCount: "infinite",
  },
  mapRingAt: (left: string, top: string, delay: string) => ({
    left,
    top,
    animationDelay: delay,
  }),
  mapImage: {
    display: "block",
    width: "100%",
    height: "auto",
  },
  globalCopy: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
    width: "100%",
    maxWidth: { default: "none", [media.desktop]: 454 },
    flexBasis: { default: "auto", [media.desktop]: 454 },
    flexShrink: 1,
    minWidth: 0,
  },
  officesBand: {
    paddingTop: 48,
    paddingBottom: { default: 72, [media.desktop]: 96 },
    backgroundColor: SURFACE,
  },
  regions: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [media.tablet]: "repeat(2, minmax(0, 1fr))",
      [media.desktop]: "repeat(4, minmax(0, 1fr))",
    },
    gap: 32,
  },
  officeColumn: {
    display: "flex",
    flexDirection: "column",
  },
  officeGroup: {
    display: "flex",
    flexDirection: "column",
    flexGrow: { default: 0, ":last-child": 1 },
  },
  regionHeader: {
    display: "flex",
    alignItems: "center",
    height: 40,
    margin: 0,
    paddingInline: 16,
    backgroundColor: TINT,
    fontSize: 16,
    fontWeight: 700,
    lineHeight: 1.2,
    color: INK,
  },
  regionBody: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#ffffff",
  },
});

export function Network() {
  return (
    <section id="offices" aria-labelledby="oo-offices-title" {...stylex.props(styles.anchor)}>
      <div {...stylex.props(styles.globalBand)}>
        <Reveal sx={styles.globalRow}>
          <div {...stylex.props(styles.mapWrap)}>
            <img
              src={IMAGES.officeMap.src}
              alt={IMAGES.officeMap.alt}
              width={611}
              height={321}
              loading="lazy"
              decoding="async"
              {...stylex.props(styles.mapImage)}
            />
            {OFFICE_MAP_PINS.map((pin, index) => (
              <span
                key={`${pin.left}-${pin.top}`}
                aria-hidden="true"
                {...stylex.props(
                  styles.mapRing,
                  styles.mapRingAt(`${pin.left}%`, `${pin.top}%`, `${(index * 370) % 2800}ms`),
                )}
              />
            ))}
          </div>
          <div {...stylex.props(styles.globalCopy)}>
            <h2 id="oo-offices-title" {...stylex.props(styles.sectionTitle)}>
              {GLOBAL_INTRO.title}
            </h2>
            <p {...stylex.props(styles.sectionLead)}>{GLOBAL_INTRO.lead}</p>
          </div>
        </Reveal>
      </div>
      <div {...stylex.props(styles.officesBand)}>
        <div {...stylex.props(layout.shell, layout.inset, styles.regions)}>
          {OFFICE_COLUMNS.map((column, index) => (
            <Reveal key={column[0].region} index={index} sx={styles.officeColumn}>
              {column.map((group) => (
                <div key={group.region} {...stylex.props(styles.officeGroup)}>
                  <h3 {...stylex.props(styles.regionHeader)}>{group.region}</h3>
                  <ul {...stylex.props(styles.list, styles.regionBody)}>
                    {group.offices.map((office) => (
                      <li key={office} {...stylex.props(styles.mutedText)}>
                        {office}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
