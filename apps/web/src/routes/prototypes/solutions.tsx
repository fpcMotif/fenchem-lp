import { createFileRoute, notFound } from "@tanstack/react-router";

import { SolutionsLab } from "@/components/prototype/solutions-lab/harness";

export const Route = createFileRoute("/prototypes/solutions")({
  beforeLoad: () => {
    if (!import.meta.env.DEV) throw notFound();
  },
  validateSearch: (search: { v?: unknown }): { v?: number } => {
    const v = Number(search.v);
    return { v: Number.isInteger(v) && v > 0 ? v : undefined };
  },
  component: SolutionsLabRoute,
});

function SolutionsLabRoute() {
  const { v = 1 } = Route.useSearch();
  return <SolutionsLab initial={v - 1} />;
}
