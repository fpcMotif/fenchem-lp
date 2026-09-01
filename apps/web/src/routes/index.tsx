import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/components/landing/landing-page";
import { parseVariantSearch, type VariantSearchParams } from "@/lib/variant-search";

export const Route = createFileRoute("/")({
  validateSearch: (search: VariantSearchParams) => ({
    variant: parseVariantSearch(search),
  }),
  component: LandingPage,
});
