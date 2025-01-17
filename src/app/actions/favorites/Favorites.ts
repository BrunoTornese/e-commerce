"use server";

import prisma from "@/lib/prisma";

export async function getFavoriteStatus(userId: string, productId: string) {
  try {
    const favorite = await prisma.favorite.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });
    return favorite !== null;
  } catch (error) {
    console.error("Error fetching favorite status:", error);
    throw new Error("Failed to fetch favorite status");
  }
}

export async function toggleFavorite(userId: string, productId: string) {
  try {
    const existingFavorite = await prisma.favorite.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });

    if (existingFavorite) {
      await prisma.favorite.delete({
        where: {
          userId_productId: {
            userId,
            productId,
          },
        },
      });
      return { success: true, action: "removed" };
    } else {
      await prisma.favorite.create({
        data: {
          userId,
          productId,
        },
      });
      return { success: true, action: "added" };
    }
  } catch (error) {
    console.error("Error toggling favorite:", error);
    throw new Error("Failed to toggle favorite");
  }
}

export async function getFavorites(userId: string) {
  try {
    const favorites = await prisma.favorite.findMany({
      where: { userId },
      include: {
        product: {
          include: {
            ProductImage: true,
          },
        },
      },
    });

    return favorites.map((fav) => {
      const product = fav.product;

      return {
        ...product,
        images: product.ProductImage.map((image) => image.url),
      };
    });
  } catch (error) {
    console.error("Error fetching favorites:", error);
    throw new Error("Failed to fetch favorites");
  }
}
