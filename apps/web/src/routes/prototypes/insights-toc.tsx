import { createFileRoute, notFound } from "@tanstack/solid-router";

import { InsightsLab, type LabVariant } from "@/components/prototype/insights-lab/harness";
import { ContentsVariant } from "@/components/prototype/insights-lab/toc/contents";
import { LocatorVariant } from "@/components/prototype/insights-lab/toc/locator";
import { MarginVariant } from "@/components/prototype/insights-lab/toc/margin";
import { SpineVariant } from "@/components/prototype/insights-lab/toc/spine";
import { StepperVariant } from "@/components/prototype/insights-lab/toc/stepper";

const VARIANTS: LabVariant[] = [
  { name: "Margin", Component: MarginVariant },
  { name: "Contents", Component: ContentsVariant },
  { name: "Locator", Component: LocatorVariant },
  { name: "Spine", Component: SpineVariant },
  { name: "Stepper", Component: StepperVariant },
];

const positiveInt = (value: unknown) => {
  const number = Number(value);
  return Number.isInteger(number) && number > 0 ? number : undefined;
};

export const Route = createFileRoute("/prototypes/insights-toc")({
  validateSearch: (search: { v?: unknown; n?: unknown }): { v?: number; n?: number } => ({
    v: positiveInt(search.v),
    n: positiveInt(search.n),
  }),
  beforeLoad: () => {
    if (!import.meta.env.DEV) throw notFound();
  },
  component: InsightsTocLabRoute,
});

function InsightsTocLabRoute() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  return (
    <InsightsLab
      variants={VARIANTS}
      initial={(search().v ?? 1) - 1}
      count={search().n ?? 3}
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
