import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { Link } from "@tanstack/solid-router";

const styles = stylex.create({
  root: {
    width: "100%",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingInline: "0.5rem",
    paddingBlock: "0.25rem",
  },
  nav: {
    display: "flex",
    gap: "1rem",
    fontSize: "1.125rem",
    lineHeight: "1.75rem",
  },
  link: {
    color: "inherit",
    textDecoration: "none",
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  hr: {
    border: "none",
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.border,
    margin: 0,
  },
});

export default function Header() {
  return (
    <div {...stylex.attrs(styles.root)}>
      <div {...stylex.attrs(styles.header)}>
        <nav {...stylex.attrs(styles.nav)}>
          <Link to="/" search={{ variant: "a" }} {...stylex.attrs(styles.link)}>
            Home
          </Link>
        </nav>
        <div {...stylex.attrs(styles.right)}></div>
      </div>
      <hr {...stylex.attrs(styles.hr)} />
    </div>
  );
}
