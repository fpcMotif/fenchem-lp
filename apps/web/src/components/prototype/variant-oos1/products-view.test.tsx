import { fireEvent, render, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ProductCatalog as ActualProductCatalog } from "./products-sections";
import { ProductsView } from "./products-view";

const search = vi.hoisted(() => ({ compare: undefined as string | undefined }));
let useRealCatalog = false;

vi.mock("@tanstack/react-router", () => ({ useSearch: () => search }));
vi.mock("./products-sections", async (importOriginal) => {
  const actual = await importOriginal<typeof import("./products-sections")>();
  return {
    ...actual,
    ProductCatalog: (props: { categoryId: string }) =>
      useRealCatalog ? <actual.ProductCatalog {...props} /> : <div>Baseline catalog</div>,
    ProductSolutions: () => <div>Baseline solutions</div>,
  };
});

describe("single-section product comparisons", () => {
  it.each([
    [undefined, "Variant catalog", "Variant solutions"],
    ["baseline", "Baseline catalog", "Baseline solutions"],
    ["catalog", "Variant catalog", "Baseline solutions"],
    ["solutions", "Baseline catalog", "Variant solutions"],
  ])("renders the selected sections for %s", (compare, catalog, solutions) => {
    useRealCatalog = false;
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

describe("ProductCatalog Excel sheet 1:1 mapping by category", () => {
  it.each([
    [
      "human-nutrition",
      ["膳食纤维", "情绪健康", "女性健康", "心脑健康", "体重管理"],
      ["增稠稳定剂", "肠道健康", "关节护理", "口腔健康", "抗炎抗氧", "巴西拉美天然植物油脂"],
      "核心规格/成分",
      "产品介绍",
    ],
    [
      "pet-health",
      ["肠道健康", "关节护理", "口腔健康", "抗炎抗氧"],
      ["膳食纤维", "增稠稳定剂", "巴西拉美天然植物油脂"],
      "核心规格/成分",
      "产品介绍",
    ],
    [
      "personal-care",
      [
        "巴西拉美天然植物油脂",
        "地中海天然植物油脂",
        "南非天然植物油脂",
        "北美天然植物油脂",
        "活性物",
        "其他",
      ],
      ["膳食纤维", "增稠稳定剂", "肠道健康"],
      "INCI 名称",
      "特性&应用",
    ],
  ])(
    "renders only the matching sheet groups and headers for %s",
    (categoryId, expectedGroups, excludedGroups, specHeader, featuresHeader) => {
      useRealCatalog = true;
      const { container } = render(<ActualProductCatalog categoryId={categoryId} />);
      const scope = within(container);
      for (const label of expectedGroups) {
        expect(scope.getByRole("button", { name: new RegExp(label) })).toBeTruthy();
      }
      for (const label of excludedGroups) {
        expect(scope.queryByRole("button", { name: new RegExp(label) })).toBeNull();
      }
      fireEvent.click(scope.getByRole("button", { name: new RegExp(expectedGroups[0]) }));
      expect(container.textContent).toContain("产品名称");
      expect(container.textContent).toContain(specHeader);
      expect(container.textContent).toContain(featuresHeader);
    },
  );

  it("renders the star product tag from the nutrition sheet under human-nutrition", () => {
    useRealCatalog = true;
    const { container } = render(<ActualProductCatalog categoryId="human-nutrition" />);
    const scope = within(container);
    fireEvent.click(scope.getByRole("button", { name: /膳食纤维/ }));
    expect(container.textContent).toContain("明星产品");
  });

  it("auto-expands the 增稠稳定剂 category under functional-food so its items are open by default", () => {
    useRealCatalog = true;
    const { container } = render(<ActualProductCatalog categoryId="functional-food" />);
    const scope = within(container);
    const button = scope.getByRole("button", { name: /增稠稳定剂/ });
    expect(button.getAttribute("aria-expanded")).toBe("true");
    expect(container.textContent).toContain("产品名称");
    expect(container.textContent).toContain("产品规格");
    expect(container.textContent).toContain("产品介绍");
    expect(container.textContent).toContain("刺槐豆胶");
    expect(container.textContent).toContain("瓜儿豆胶");
    expect(container.textContent).toContain("阿拉伯胶");
  });
});
