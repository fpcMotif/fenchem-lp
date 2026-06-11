import { api } from "@fenchem-lp/backend/convex/_generated/api";
import { convexQuery } from "@convex-dev/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import UserMenu from "@/components/user-menu";

export const Route = createFileRoute("/_auth/dashboard")({
  component: DashboardContent,
});

function DashboardContent() {
  const { data: privateData } = useQuery(convexQuery(api.privateData.get, {}));

  return (
    <div>
      <h1>Dashboard</h1>
      <p>privateData: {privateData?.message}</p>
      <UserMenu />
    </div>
  );
}
