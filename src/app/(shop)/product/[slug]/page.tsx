export const revalidate = 604800; //7 días

import {
  ProductMobileSlideshow,
  ProductSlideshow,
  QuantitySelector,
  SizeSelector,
  StockLabel,
} from "@/components";
import { titleFont } from "@/config/fonts";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/app/actions";
import { Metadata, ResolvingMetadata } from "next";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;
  const product = await getProductBySlug(slug);

  return {
    title: product?.title ?? "Title not found",
    description: product?.description ?? "Description not found",
    openGraph: {
      title: product?.title ?? "Title not found",
      description: product?.description ?? "Description not found",
      images: [`/products/${product?.images[1]}`],
    },
  };
}

export default async function ProductBySlugPage({ params }: Props) {
  const { slug } = params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3 ">
      <div className="col-span-1 md:col-span-2 ">
        <ProductMobileSlideshow
          title={product.title}
          images={product.images}
          classname="block md:hidden"
        />

        <ProductSlideshow
          title={product.title}
          images={product.images}
          classname="hidden md:block"
        />
      </div>

      <div className="col-span-1 px-5">
        <h1 className={` ${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <StockLabel slug={product.slug} />

        <p className="text-lg mb-5">${product.price}</p>

        <SizeSelector
          selectedSize={product.size[1]}
          availableSizes={product.size}
        />

        <QuantitySelector quantity={2} />

        <button
          className={`btn-primary my-5 ${
            product.inStock
              ? ""
              : "!bg-gray-900 !text-gray-100 cursor-not-allowed"
          }`}
          disabled={!product.inStock}
        >
          {product.inStock ? "Add to cart" : "Out of Stock"}
        </button>

        <h3 className="font-bold text-sm">Description</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
