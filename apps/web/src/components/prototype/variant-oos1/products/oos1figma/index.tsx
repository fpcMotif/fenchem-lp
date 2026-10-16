import { VariantOOS1 } from "../../index";
import { AboutOOS1Figma } from "./about-view";
import { ProductsOOS1Figma } from "./products-view";

export function VariantOOS1Figma() {
  return (
    <VariantOOS1 AboutPage={AboutOOS1Figma} ProductsPage={ProductsOOS1Figma} startView="products" />
  );
}
