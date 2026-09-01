import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { Link } from "@tanstack/react-router";

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

const links = [
  { to: "/", label: "Home" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/todos", label: "Todos" },
] as const;

export default function Header() {
  return (
    <div {...stylex.props(styles.root)}>
      <div {...stylex.props(styles.header)}>
        <nav {...stylex.props(styles.nav)}>
          {links.map(({ to, label }) => {
            return (
              <Link key={to} to={to} {...stylex.props(styles.link)}>
                {label}
              </Link>
            );
          })}
        </nav>
        <div {...stylex.props(styles.right)}></div>
      </div>
      <hr {...stylex.props(styles.hr)} />
    </div>
  );
}
