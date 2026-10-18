import { createFileRoute } from "@tanstack/solid-router";

import { VariantOOS1 } from "../app/components/prototype/variant-oos1/index";

type CompareMode = "baseline" | "catalog" | "solutions";
const COMPARE_MODES: readonly string[] = ["baseline", "catalog", "solutions"];

export const Route = createFileRoute("/")({
  validateSearch: (
    search: Record<string, string | undefined>,
  ): { variant?: string; page?: string; compare?: CompareMode } => ({
    variant: search.variant,
    page: search.page,
    compare: COMPARE_MODES.includes(search.compare ?? "")
      ? (search.compare as CompareMode)
      : undefined,
  }),
  component: () => <VariantOOS1 />,
});
