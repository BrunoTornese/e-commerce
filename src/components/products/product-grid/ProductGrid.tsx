import { Product } from "@/interfaces";
import { ProductGridItem } from "./ProductGridItem";

interface Props {
  products: Product[];
}

export const ProductGrid = ({ products }: Props) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductGridItem key={product.slug} product={product} />
      ))}
    </div>
  );
};
