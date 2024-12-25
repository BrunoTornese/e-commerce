"use server";

import prisma from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";
cloudinary.config(process.env.CLOUDINARY_URL ?? "");

export const deteleteImage = async (imageId: string, imageUrl: string) => {
  if (!imageUrl.startsWith("http")) {
    return { ok: false, error: "Invalid image url" };
  }
  const imageName = imageUrl.split("/").pop()?.split(".")[0] ?? "";

  try {
    await cloudinary.uploader.destroy(imageName);
    const deletedImage = await prisma.productImage.delete({
      where: {
        id: imageId,
      },
      select: {
        product: {
          select: {
            slug: true,
          },
        },
      },
    });
    revalidatePath(`/admin/products`);
    revalidatePath(`/admin/products/${deletedImage.product.slug}`);
    revalidatePath(`/products/${deletedImage.product.slug}`);
  } catch (error) {
    console.log(error);
    return { ok: false, error: "Error at delete image" };
  }
};
