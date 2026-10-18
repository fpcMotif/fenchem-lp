import { createFileRoute, notFound } from "@tanstack/solid-router";

import { SolutionsLab } from "@/components/prototype/solutions-lab/harness";

export const Route = createFileRoute("/prototypes/solutions")({
  validateSearch: (search: { v?: unknown }): { v?: number } => {
    const v = Number(search.v);
    return { v: Number.isInteger(v) && v > 0 ? v : undefined };
  },
  beforeLoad: () => {
    if (!import.meta.env.DEV) throw notFound();
  },
  component: SolutionsLabRoute,
});

function SolutionsLabRoute() {
  const search = Route.useSearch();
  return <SolutionsLab initial={(search().v ?? 1) - 1} />;
}
