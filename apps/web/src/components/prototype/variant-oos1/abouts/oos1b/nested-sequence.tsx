import * as stylex from "@stylexjs/stylex";
import { m, useScroll, useTransform } from "@/compat/motion";
import { children } from "solid-js";
import type { JSX } from "@solidjs/web";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { AERIAL_PLATE, OFFICE_ON_AERIAL, ROOMS_IN_WALKING_ORDER, type Plate } from "./journey";
import { Tag } from "./shared";
import { ui } from "./shared-values";
import { bp, face, space, tone } from "./tokens.stylex";

const OFFICE = ROOMS_IN_WALKING_ORDER[ROOMS_IN_WALKING_ORDER.length - 1].plate;
const AERIAL_RINGS = 4;

const styles = stylex.create({
  funnel: {
    marginInline: "auto",
    maxWidth: { default: "none", [bp.desktop]: 1080 },
  },
  level: {
    paddingTop: space.step,
    paddingInline: space.step,
    paddingBottom: space.step,
    backgroundColor: tone.page,
  },
  child: {
    marginTop: space.step,
  },
  figure: {
    margin: 0,
  },
  photoBox: {
    position: "relative",
    overflow: "hidden",
    aspectRatio: { default: "3 / 2", [bp.tablet]: "16 / 9", [bp.desktop]: "2 / 1" },
    backgroundColor: tone.depth2,
  },
  caption: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "baseline",
    columnGap: 12,
    rowGap: 2,
    marginTop: { default: 10, [bp.upTablet]: 14 },
  },
  chinese: {
    fontFamily: face.sans,
    fontSize: { default: 14, [bp.upTablet]: 15 },
    fontWeight: 500,
    letterSpacing: "0.06em",
    color: tone.ink,
  },
  english: {
    fontSize: { default: 16, [bp.upTablet]: 18 },
  },
  break: {
    position: "relative",
    marginTop: { default: 56, [bp.tablet]: 80, [bp.desktop]: 104 },
    marginInline: `calc(-1 * ${space.gutter})`,
    backgroundColor: tone.page,
  },
  ringOuter: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopStyle: "solid",
    borderBottomStyle: "solid",
    borderColor: tone.rule,
  },
  ring: {
    padding: `calc(${space.step} * 2)`,
  },
  ringInner: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: tone.rule,
  },
  aerialBox: {
    position: "relative",
    aspectRatio: "2000 / 1498",
    marginInline: "auto",
    maxWidth: 760,
    backgroundColor: tone.depth2,
  },
  officeMark: {
    position: "absolute",
    aspectRatio: "16 / 10",
    transform: "translateY(-50%)",
    boxSizing: "border-box",
    padding: 2,
    backgroundColor: tone.page,
    boxShadow: "0 0 0 1px rgba(11, 42, 92, 0.62)",
  },
  officeAt: (left: string, top: string, width: string) => ({ left, top, width }),
  officePhoto: {
    position: "relative",
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  officeTag: {
    position: "absolute",
    top: -9,
    left: -1,
  },
  breakCaption: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "baseline",
    justifyContent: "center",
    columnGap: 12,
    rowGap: 2,
    marginTop: { default: 12, [bp.upTablet]: 16 },
  },
});

function PushedPhoto(props: { plate: Plate }) {
  let ref: HTMLDivElement | undefined;
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: () => ref, offset: ["start end", "end start"] });
  const scale = useTransform(() =>
    reduce() ? 1 : 1 + 0.08 * Math.min(1, Math.max(0, scrollYProgress())),
  );
  return (
    <div ref={ref} {...stylex.attrs(styles.photoBox)}>
      <m.img
        src={props.plate.large}
        alt={props.plate.alt}
        loading="lazy"
        decoding="async"
        {...stylex.attrs(ui.fill)}
        style={{ scale }}
      />
    </div>
  );
}

function Level(props: { plate: Plate; children: JSX.Element }) {
  const child = children(() => props.children);
  return (
    <div {...stylex.attrs(ui.frame, styles.level)}>
      <Tag numeral={props.plate.numeral} />
      <figure {...stylex.attrs(styles.figure)}>
        <PushedPhoto plate={props.plate} />
        <figcaption {...stylex.attrs(styles.caption)}>
          <span {...stylex.attrs(styles.chinese)}>{props.plate.caption}</span>
          <span lang="en" {...stylex.attrs(ui.serif, styles.english)}>
            {props.plate.english}
          </span>
        </figcaption>
      </figure>
      {child() ? <div {...stylex.attrs(styles.child)}>{child()}</div> : null}
    </div>
  );
}

function AerialRings() {
  let node: JSX.Element = (
    <figure {...stylex.attrs(styles.figure)}>
      <div {...stylex.attrs(styles.aerialBox)}>
        <img
          src={AERIAL_PLATE.large}
          alt={AERIAL_PLATE.alt}
          loading="lazy"
          decoding="async"
          {...stylex.attrs(ui.fill)}
        />
        <div
          {...stylex.attrs(
            styles.officeMark,
            styles.officeAt(
              `${(OFFICE_ON_AERIAL.x - OFFICE_ON_AERIAL.shareOfAerialWidth / 2) * 100}%`,
              `${OFFICE_ON_AERIAL.y * 100}%`,
              `${OFFICE_ON_AERIAL.shareOfAerialWidth * 100}%`,
            ),
          )}
        >
          <span {...stylex.attrs(styles.officeTag)}>
            <Tag numeral={OFFICE.numeral} pinned={false} />
          </span>
          <div {...stylex.attrs(styles.officePhoto)}>
            <img
              src={OFFICE.src}
              alt=""
              loading="lazy"
              decoding="async"
              {...stylex.attrs(ui.fill)}
            />
          </div>
        </div>
      </div>
    </figure>
  );
  for (let ring = 0; ring < AERIAL_RINGS; ring++) {
    node = (
      <div
        {...stylex.attrs(
          styles.ring,
          ring === AERIAL_RINGS - 1 ? styles.ringOuter : styles.ringInner,
        )}
      >
        {node}
      </div>
    );
  }
  return node;
}

export function NestedSequence() {
  let nested: JSX.Element = null;
  for (let index = ROOMS_IN_WALKING_ORDER.length - 1; index >= 0; index--) {
    nested = <Level plate={ROOMS_IN_WALKING_ORDER[index].plate}>{nested}</Level>;
  }
  return (
    <div>
      <div {...stylex.attrs(styles.funnel)}>{nested}</div>
      <div {...stylex.attrs(styles.break)}>
        <AerialRings />
      </div>
      <p {...stylex.attrs(ui.reset, styles.breakCaption)}>
        <Tag numeral={AERIAL_PLATE.numeral} pinned={false} />
        <span {...stylex.attrs(styles.chinese)}>{AERIAL_PLATE.caption}</span>
        <span lang="en" {...stylex.attrs(ui.serif, styles.english)}>
          {AERIAL_PLATE.english}
        </span>
      </p>
    </div>
  );
}
