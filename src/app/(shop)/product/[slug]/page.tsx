export const revalidate = 604800; // 7 días

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
  params: { slug: string };
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
  if (!product) notFound();

  const comments = await GetCommentsBySlug(slug);
  const formattedComments = comments?.map((comment) => ({
    ...comment,
    createdAt: comment.createdAt.toISOString(),
  }));

  const session = await auth();

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gradient-to-b from-white to-gray-50 py-8 px-0 sm:px-6 overflow-x-hidden">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-10 bg-white rounded-3xl shadow-lg p-0 sm:p-6 border border-gray-100 overflow-hidden">
        {/* Slideshow */}
        <div className="w-full md:w-1/2 flex justify-center items-start">
          {/* Mobile */}
          <ProductMobileSlideshow
            title={product.title}
            images={product.images}
            classname="block md:hidden w-full"
          />
          {/* Desktop */}
          <ProductSlideshow
            title={product.title}
            images={product.images}
            classname="hidden md:block w-full"
          />
        </div>
        {/* Info */}
        <div className="w-full md:w-1/2 flex flex-col justify-between gap-6 p-4 sm:p-8">
          <div className="flex items-center space-x-3 mt-1 mb-3">
            {session?.user?.id ? (
              <FavoriteButton userId={session.user.id} productId={product.id} />
            ) : (
              <span className="text-gray-500 text-sm italic">
                You need an account to add to favorites
              </span>
            )}
          </div>

          <h1
            className={`${titleFont.className} text-3xl sm:text-4xl font-extrabold text-blue-900`}
          >
            {product.title}
          </h1>

          <AddToCart product={product} />

          <div>
            <h3 className="font-semibold text-base text-gray-800 mb-2">
              Description
            </h3>
            <p className="font-light text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-3xl flex flex-col gap-6 mt-12 px-0 sm:px-2">
        <AddComment productId={product.id} />
        <Comments
          comments={formattedComments}
          currentUserId={session?.user?.id}
        />
      </div>
    </div>
  );
}
