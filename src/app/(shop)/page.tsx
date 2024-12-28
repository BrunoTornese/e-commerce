export const revalidate = 60;

import { Pagination, Title } from "@/components";
import { redirect } from "next/navigation";
import { getPaginatedProductsWithImages, getTags } from "../actions";
import { ProductFilter } from "@/components/filter/poductFilter";

interface Props {
  searchParams: {
    tags: any;
    page?: string;
  };
}

export default async function Home({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const selectedTags = searchParams.tags ? searchParams.tags.split(",") : [];
  const { products, currentPage, totalPages } =
    await getPaginatedProductsWithImages({ page, tags: selectedTags });

  if (products.length === 0) {
    redirect("/");
  }

  const { ok, tags = [] } = await getTags();

  if (!ok) {
    console.error("Error al obtener las etiquetas");
    return <div>Error al cargar las etiquetas</div>;
  }

  return (
    <>
      <Title title="Shop" subtitle="All Products" className="mb-2" />
      <ProductFilter
        products={products}
        tags={tags}
        selectedTags={selectedTags}
      />
      <Pagination totalPages={totalPages} />
    </>
  );
}
