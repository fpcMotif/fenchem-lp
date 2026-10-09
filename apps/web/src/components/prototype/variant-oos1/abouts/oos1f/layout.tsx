import * as stylex from "@stylexjs/stylex";
import { useInView } from "motion/react";
import { type ReactNode, useRef } from "react";
import { styles } from "./layout-values";

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
