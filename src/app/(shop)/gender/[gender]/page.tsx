export const revalidate = 60;

import { Pagination, ProductGrid, Title } from "@/components";
import { getPaginatedProductsWithImages } from "@/app/actions";
import { redirect } from "next/navigation";
import { Gender } from "@prisma/client";
import notFound from "../not-found";

interface Props {
  params: {
    gender: string;
  };
  searchParams: {
    page?: string;
  };
}
export default async function GenderPage({ params, searchParams }: Props) {
  const { gender } = params;

  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { products, currentPage, totalPages } =
    await getPaginatedProductsWithImages({
      page,
      gender: gender as Gender,
    });

  if (products.length === 0) {
    redirect(`/gender/${gender}`);
  }

  const labels: Record<string, string> = {
    men: "from mens",
    women: "from womens",
    kid: "from kids",
    unisex: "from all",
  };

  if (!labels[gender]) {
    return notFound();
  }

  return (
    <>
      <Title
        title={` ${gender} products`}
        subtitle="All Products in this gender"
        className="mb-2"
      />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
