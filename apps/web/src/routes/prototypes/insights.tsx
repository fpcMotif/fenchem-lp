import { createFileRoute, notFound } from "@tanstack/react-router";

import { InsightsLab, type LabVariant } from "@/components/prototype/insights-lab/harness";
import { DrawerVariant } from "@/components/prototype/insights-lab/variants/drawer";
import { ExcerptVariant } from "@/components/prototype/insights-lab/variants/excerpt";
import { LedgerVariant } from "@/components/prototype/insights-lab/variants/ledger";
import { ShelfVariant } from "@/components/prototype/insights-lab/variants/shelf";
import { TabsVariant } from "@/components/prototype/insights-lab/variants/tabs";

const VARIANTS: LabVariant[] = [
  { name: "Ledger", Component: LedgerVariant },
  { name: "Excerpt", Component: ExcerptVariant },
  { name: "Shelf", Component: ShelfVariant },
  { name: "Tabs", Component: TabsVariant },
  { name: "Drawer", Component: DrawerVariant },
];

const positiveInt = (value: unknown) => {
  const number = Number(value);
  return Number.isInteger(number) && number > 0 ? number : undefined;
};

export const Route = createFileRoute("/prototypes/insights")({
  validateSearch: (search: { v?: unknown; n?: unknown }): { v?: number; n?: number } => ({
    v: positiveInt(search.v),
    n: positiveInt(search.n),
  }),
  beforeLoad: () => {
    if (!import.meta.env.DEV) throw notFound();
  },
  component: InsightsLabRoute,
});

function InsightsLabRoute() {
  const { v = 1, n = 3 } = Route.useSearch();
  const navigate = Route.useNavigate();
  return (
    <InsightsLab
      variants={VARIANTS}
      initial={v - 1}
      count={n}
      onParamsChange={(params) =>
        navigate({
          search: (previous) => ({ ...previous, ...params }),
          replace: true,
          resetScroll: false,
        })
      }
    />
  );
}
