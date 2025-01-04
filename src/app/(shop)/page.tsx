export const revalidate = 60;

import { Pagination, Title } from "@/components";
import { redirect } from "next/navigation";
import {
  getPaginatedProductsWithImages,
  getTags,
  getGenders,
} from "../actions";
import { Gender } from "@prisma/client";
import { ProductFilter } from "@/components/filter/poductFilter";

interface Props {
  searchParams: {
    tags: any;
    page?: string;
    gender?: string;
  };
}

export default async function Home({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const selectedTags = searchParams.tags ? searchParams.tags.split(",") : [];
  const selectedGender = (searchParams.gender as Gender) || "";

  const { products, currentPage, totalPages } =
    await getPaginatedProductsWithImages({
      page,
      tags: selectedTags,
      gender: selectedGender,
    });

  if (products.length === 0) {
    redirect("/");
  }

  const { ok, tags = [] } = await getTags();
  const { ok: genderOk, genders = [] } = await getGenders();

  if (!ok || !genderOk) {
    console.error("Error fetching data");
    return <div>Error loading tags or genders</div>;
  }

  return (
    <>
      <Title title="Shop" subtitle="All Products" className="mb-2" />
      <ProductFilter
        products={products}
        tags={tags}
        selectedTags={selectedTags}
        genders={genders}
        selectedGender={selectedGender}
      />
      <Pagination totalPages={totalPages} />
    </>
  );
}
