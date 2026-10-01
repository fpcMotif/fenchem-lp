import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { useInView } from "motion/react";
import { type ReactNode, useRef } from "react";

import { ease, media, space } from "./palette.stylex";

const styles = stylex.create({
  section: {
    position: "relative",
    paddingBlock: {
      default: space.sectionSm,
      [media.mdOnly]: space.sectionMd,
      [media.lgOnly]: space.sectionLg,
      [breakpoints.xl]: space.sectionXl,
    },
    scrollMarginTop: space.anchor,
  },
  shell: {
    width: "100%",
    maxWidth: space.shellMax,
    marginInline: "auto",
    boxSizing: "border-box",
    paddingInlineStart: {
      default: space.startSm,
      [media.mdOnly]: space.startMd,
      [media.lgOnly]: space.startLg,
      [breakpoints.xl]: space.startXl,
    },
    paddingInlineEnd: {
      default: space.endSm,
      [media.mdOnly]: space.endMd,
      [media.lgOnly]: space.endLg,
      [breakpoints.xl]: space.endXl,
    },
  },
  reveal: {
    opacity: { default: 1, [breakpoints.motionOk]: 0 },
    transform: { default: null, [breakpoints.motionOk]: "translateY(24px)" },
    transitionProperty: "opacity, transform",
    transitionDuration: "800ms",
    transitionTimingFunction: ease.out,
  },
  revealShown: {
    opacity: 1,
    transform: "none",
  },
  srOnly: {
    position: "absolute",
    width: 1,
    height: 1,
    margin: -1,
    padding: 0,
    overflow: "hidden",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
    borderWidth: 0,
  },
  anchor: {
    display: "block",
    height: 0,
  },
});

export function Section({
  id,
  name,
  children,
  sx,
  band = false,
}: {
  id: string;
  name: string;
  children: ReactNode;
  sx?: stylex.StyleXStyles;
  band?: boolean;
}) {
  const titleId = `${id}-title`;
  return (
    <section
      id={id}
      aria-labelledby={titleId}
      data-strand-band={band ? "" : undefined}
      {...stylex.props(styles.section, sx)}
    >
      <h2 id={titleId} {...stylex.props(styles.srOnly)}>
        {name}
      </h2>
      {children}
    </section>
  );
}

export function Shell({ children, sx }: { children: ReactNode; sx?: stylex.StyleXStyles }) {
  return <div {...stylex.props(styles.shell, sx)}>{children}</div>;
}

export function NodeMarker() {
  return <span aria-hidden="true" data-strand-node="" {...stylex.props(styles.anchor)} />;
}

export function Reveal({
  children,
  sx,
  as: Tag = "div",
}: {
  children: ReactNode;
  sx?: stylex.StyleXStyles;
  as?: "div" | "li" | "figure" | "article";
}) {
  const ref = useRef<HTMLDivElement & HTMLLIElement>(null);
  const shown = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  return (
    <Tag ref={ref} {...stylex.props(styles.reveal, shown && styles.revealShown, sx)}>
      {children}
    </Tag>
  );
}
