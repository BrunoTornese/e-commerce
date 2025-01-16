export const revalidate = 604800; //7 días

import {
  Comments,
  FavoriteButton,
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
  const formattedComments = comments?.map((comment) => ({
    ...comment,
    createdAt: comment.createdAt.toISOString(),
  }));

  const session = await auth();

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 gap-6 overflow-x-hidden px-5">
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

      <div className="flex items-center space-x-3 mt-4">
        {session?.user?.id ? (
          <FavoriteButton userId={session?.user?.id} productId={product.id} />
        ) : (
          <button className="text-gray-500 text-xl" disabled>
            <span>You need an account to add to favorites</span>
          </button>
        )}
      </div>

      <div className="col-span-1 w-full px-5 mt-6">
        <h1
          className={`${titleFont.className} text-2xl font-bold text-gray-800`}
        >
          {product.title}
        </h1>

        <AddToCart product={product} />

        <div className="mt-4">
          <h3 className="font-semibold text-sm text-gray-700">Description</h3>
          <p className="font-light text-gray-600">{product.description}</p>
        </div>
      </div>

      <div className="w-full space-y-4 mt-6">
        <AddComment productId={product.id} />
      </div>

      <div className="w-full space-y-4 mt-6">
        <Comments
          comments={formattedComments}
          currentUserId={session?.user?.id}
        />
      </div>
    </div>
  );
}
