"use server";

import prisma from "@/lib/prisma";
import { deteleteImage } from "./DeleteImageProducs";

export const deleteProduct = async (id: string) => {
  try {
    await prisma.favorite.deleteMany({
      where: {
        productId: id,
      },
    });

    const productImages = await prisma.productImage.findMany({
      where: {
        productId: id,
      },
    });

    for (const image of productImages) {
      await deteleteImage(image.id, image.url);
    }

    await prisma.product.delete({
      where: {
        id: id,
      },
    });

    return { ok: true };
  } catch (error) {
    console.error(error);
    return { ok: false, error: "Error at delete product" };
  }
};
