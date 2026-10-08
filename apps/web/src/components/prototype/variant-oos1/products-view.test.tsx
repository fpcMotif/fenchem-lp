import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ProductsView } from "./products-view";

const search = vi.hoisted(() => ({ compare: undefined as string | undefined }));

vi.mock("@tanstack/react-router", () => ({ useSearch: () => search }));
vi.mock("./products-sections", async (importOriginal) => ({
  ...(await importOriginal<typeof import("./products-sections")>()),
  ProductCatalog: () => <div>Baseline catalog</div>,
  ProductSolutions: () => <div>Baseline solutions</div>,
}));

describe("single-section product comparisons", () => {
  it.each([
    [undefined, "Variant catalog", "Variant solutions"],
    ["baseline", "Baseline catalog", "Baseline solutions"],
    ["catalog", "Variant catalog", "Baseline solutions"],
    ["solutions", "Baseline catalog", "Variant solutions"],
  ])("renders the selected sections for %s", (compare, catalog, solutions) => {
    search.compare = compare;
    const { queryByText } = render(
      <ProductsView
        onNavigateHome={vi.fn()}
        CatalogSection={() => <div>Variant catalog</div>}
        SolutionsSection={() => <div>Variant solutions</div>}
      />,
    );
    for (const label of [
      "Baseline catalog",
      "Baseline solutions",
      "Variant catalog",
      "Variant solutions",
    ]) {
      expect(queryByText(label) !== null).toBe(label === catalog || label === solutions);
    }
  });
});
