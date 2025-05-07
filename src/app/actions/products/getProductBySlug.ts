"use server";

import prisma from "@/lib/prisma";

export const getProductBySlug = async (slug: string) => {
  try {
    const product = await prisma.product.findFirst({
      include: {
        ProductImage: true,
      },
      where: {
        slug: slug,
      },
    });

    if (!product) return null;

    const discountedPrice =
      product.price - (product.price * product.discount) / 100;

    return {
      ...product,
      discountedPrice,
      images: product.ProductImage.map((image) => image.url),
      ProductImage: product.ProductImage.map((image) => ({
        ...image,
        id: String(image.id),
      })),
    };
  } catch (error) {
    throw new Error("Error at get product by slug");
  }
};
