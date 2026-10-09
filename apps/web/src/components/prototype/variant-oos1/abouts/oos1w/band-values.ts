import * as stylex from "@stylexjs/stylex";

export const look = stylex.create({
  base: {
    position: "absolute",
    top: 0,
    display: "block",
    borderRadius: "50%",
    willChange: "transform",
  },
  glyphSlot: {
    position: "absolute",
    top: 0,
    display: "block",
    transform: "translate(-50%, -50%)",
  },
  navyBody: {
    backgroundImage:
      "radial-gradient(closest-side, rgba(11, 42, 92, 0) 56%, rgba(11, 42, 92, 0.1) 76%, rgba(11, 42, 92, 0) 94%), radial-gradient(closest-side, rgba(11, 42, 92, 0.92) 0%, rgba(11, 42, 92, 0.84) 22%, rgba(11, 42, 92, 0.6) 46%, rgba(11, 42, 92, 0.3) 68%, rgba(11, 42, 92, 0.1) 86%, rgba(11, 42, 92, 0) 100%)",
  },
  midBody: {
    backgroundImage:
      "radial-gradient(closest-side, rgba(41, 79, 146, 0) 56%, rgba(41, 79, 146, 0.1) 76%, rgba(41, 79, 146, 0) 94%), radial-gradient(closest-side, rgba(41, 79, 146, 0.9) 0%, rgba(41, 79, 146, 0.8) 22%, rgba(41, 79, 146, 0.56) 46%, rgba(41, 79, 146, 0.28) 68%, rgba(41, 79, 146, 0.09) 86%, rgba(41, 79, 146, 0) 100%)",
  },
  blueBody: {
    backgroundImage:
      "radial-gradient(closest-side, rgba(7, 67, 169, 0) 56%, rgba(7, 67, 169, 0.1) 76%, rgba(7, 67, 169, 0) 94%), radial-gradient(closest-side, rgba(7, 67, 169, 0.9) 0%, rgba(7, 67, 169, 0.8) 22%, rgba(7, 67, 169, 0.56) 46%, rgba(7, 67, 169, 0.28) 68%, rgba(7, 67, 169, 0.09) 86%, rgba(7, 67, 169, 0) 100%)",
  },
  aheadBody: {
    backgroundImage:
      "radial-gradient(closest-side, rgba(7, 67, 169, 0.97) 0%, rgba(7, 67, 169, 0.94) 36%, rgba(7, 67, 169, 0.74) 58%, rgba(7, 67, 169, 0.34) 78%, rgba(7, 67, 169, 0.08) 92%, rgba(7, 67, 169, 0) 100%)",
  },
  tail: {
    maskImage: "linear-gradient(90deg, transparent 0%, #000 32%, #000 68%, transparent 100%)",
  },
  navyTail: {
    backgroundImage:
      "linear-gradient(180deg, rgba(11, 42, 92, 0.07) 0%, rgba(11, 42, 92, 0.03) 45%, rgba(11, 42, 92, 0) 100%)",
  },
  midTail: {
    backgroundImage:
      "linear-gradient(180deg, rgba(41, 79, 146, 0.07) 0%, rgba(41, 79, 146, 0.03) 45%, rgba(41, 79, 146, 0) 100%)",
  },
  blueTail: {
    backgroundImage:
      "linear-gradient(180deg, rgba(7, 67, 169, 0.07) 0%, rgba(7, 67, 169, 0.03) 45%, rgba(7, 67, 169, 0) 100%)",
  },
  ring: {
    position: "absolute",
    top: "-24%",
    left: "-7%",
    display: "block",
    width: "114%",
    height: "148%",
    overflow: "visible",
    transform: "rotate(-3deg)",
  },
});

export const BAND_LOOK = {
  base: look.base,
  glyphSlot: look.glyphSlot,
  navy: { body: look.navyBody, tail: [look.tail, look.navyTail] },
  mid: { body: look.midBody, tail: [look.tail, look.midTail] },
  blue: { body: look.blueBody, tail: [look.tail, look.blueTail] },
  ahead: { body: look.aheadBody, tail: [look.tail, look.blueTail] },
} as const;
