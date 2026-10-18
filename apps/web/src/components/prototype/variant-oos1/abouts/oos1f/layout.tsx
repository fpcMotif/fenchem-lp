import * as stylex from "@stylexjs/stylex";
import { useInView } from "@/compat/motion";
import { dynamic as dynamicTag, type JSX } from "@solidjs/web";
import { styles } from "./layout-values";

export function Section(props: {
  id: string;
  name: string;
  children: JSX.Element;
  sx?: stylex.StyleXStyles;
  band?: boolean;
}) {
  const titleId = () => `${props.id}-title`;
  return (
    <section
      id={props.id}
      aria-labelledby={titleId()}
      data-strand-band={props.band ? "" : undefined}
      {...stylex.attrs(styles.section, props.sx)}
    >
      <h2 id={titleId()} {...stylex.attrs(styles.srOnly)}>
        {props.name}
      </h2>
      {props.children}
    </section>
  );
}

export function Shell(props: { children: JSX.Element; sx?: stylex.StyleXStyles }) {
  return <div {...stylex.attrs(styles.shell, props.sx)}>{props.children}</div>;
}

export function NodeMarker() {
  return <span aria-hidden="true" data-strand-node="" {...stylex.attrs(styles.anchor)} />;
}

export function Reveal(props: {
  children: JSX.Element;
  sx?: stylex.StyleXStyles;
  as?: "div" | "li" | "figure" | "article";
}) {
  const Tag = dynamicTag(() => props.as ?? "div");
  let ref: HTMLElement | undefined;
  const shown = useInView(() => ref, { once: true, margin: "0px 0px -8% 0px" });
  return (
    <Tag
      ref={(el: HTMLElement) => (ref = el)}
      {...stylex.attrs(styles.reveal, shown() && styles.revealShown, props.sx)}
    >
      {props.children}
    </Tag>
  );
}
