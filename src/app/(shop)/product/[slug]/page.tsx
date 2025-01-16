export const revalidate = 604800; //7 días

import {
  Comments,
  ProductMobileSlideshow,
  ProductSlideshow,
} from "@/components";
import { titleFont } from "@/config/fonts";
import { notFound } from "next/navigation";
import { GetCommentsBySlug, getProductBySlug } from "@/app/actions";
import { Metadata, ResolvingMetadata } from "next";
import { AddToCart } from "./ui/addToCart";
import { auth } from "@/auth.config";
import { AddComment } from "@/components/coments/addComents";

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

  const comments = await GetCommentsBySlug(slug);

  const session = await auth();

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 gap-4">
      <div className="col-span-1 w-full">
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

      <div className="col-span-1 w-full px-5">
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>

        <AddToCart product={product} />

        <h3 className="font-bold text-sm">Description</h3>
        <p className="font-light">{product.description}</p>
      </div>

      <div className="w-full space-y-4">
        <AddComment productId={product.id} />
      </div>

      <div className="w-full space-y-4">
        <Comments comments={comments} currentUserId={session?.user?.id} />
      </div>
    </div>
  );
}
