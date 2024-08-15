import { ProductGrid, Title } from "@/components";
import { initialData } from "@/seed/seed";

const seedProducts = initialData.products;

interface Props {
  params: {
    id: string;
  };
}

export default function ({ params }: Props) {
  const { id } = params;
  const products = seedProducts.filter((product) => product.gender === id);

  //if (id === "kids") {
  //   notFound();
  //}

  return (
    <>
      <Title
        title={` ${id} products`}
        subtitle="All Products in this category"
        className="mb-2"
      />
      <ProductGrid products={products} />
    </>
  );
}
