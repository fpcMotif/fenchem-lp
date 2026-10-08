import type { SubPageProps } from "../../index";
import { ProductsView } from "../../products-view";
import { Catalog } from "./catalog";
import { Solutions } from "./solutions";

export function ProductsOOS1PM({ onNavigateHome }: SubPageProps) {
  return (
    <ProductsView
      onNavigateHome={onNavigateHome}
      CatalogSection={Catalog}
      SolutionsSection={Solutions}
    />
  );
}
