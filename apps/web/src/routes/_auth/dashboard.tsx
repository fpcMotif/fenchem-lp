import { api } from "@fenchem-lp/backend/convex/_generated/api";
import { colors } from "@fenchem-lp/ui/tokens.stylex";
import { convexQuery } from "@convex-dev/react-query";
import * as stylex from "@stylexjs/stylex";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import UserMenu from "@/components/user-menu";

const styles = stylex.create({
  container: {
    padding: "1.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  title: {
    fontSize: "1.5rem",
    lineHeight: "2rem",
    fontWeight: 700,
    color: colors.foreground,
  },
  message: {
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    color: colors.mutedForeground,
  },
});

export const Route = createFileRoute("/_auth/dashboard")({
  component: DashboardContent,
});

function DashboardContent() {
  const { data: privateData } = useQuery(convexQuery(api.privateData.get, {}));

  return (
    <div {...stylex.props(styles.container)}>
      <h1 {...stylex.props(styles.title)}>Dashboard</h1>
      <p {...stylex.props(styles.message)}>privateData: {privateData?.message}</p>
      <UserMenu />
    </div>
  );
}
