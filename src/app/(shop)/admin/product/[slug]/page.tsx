import { getCategorys, getProductBySlug } from "@/app/actions";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import { ProductForm } from "./ui/ProductForm";

interface Props {
  params: {
    slug: string;
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = params;

  const [categories, product] = await Promise.all([
    getCategorys(),
    getProductBySlug(slug),
  ]);

  if (!product) {
    redirect("/admin/products");
  }

  const title = slug === "new" ? "New Product" : "Edit Product";

  return (
    <>
      <Title title={title} />
      <ProductForm product={product} categories={categories} />
    </>
  );
}
