"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Gender, Product, ShoeSize, Size } from "@prisma/client";
import { z } from "zod";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config(process.env.CLOUDINARY_URL ?? "");

const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(2))),
  inStock: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(0))),
  categoryId: z.string().uuid(),
  size: z.coerce.string().transform((val) => val.split(",")),
  shoeSize: z.coerce.string().transform((val) => val.split(",")),
  tags: z.string(),
  gender: z.nativeEnum(Gender),
});

export const createUpdateProduct = async (formData: FormData) => {
  const data = Object.fromEntries(formData);

  const productParsed = productSchema.safeParse(data);

  if (!productParsed.success) {
    console.error("Validation failed:", productParsed.error);
    return { ok: false };
  }

  const product = productParsed.data;
  product.slug = product.slug.toLowerCase().replace(/ /g, "-").trim();

  let sizes: Size[] = [];
  if (typeof data.sizes === "string") {
    sizes = data.sizes
      .split(",")
      .map((size: string) => size.trim())
      .filter((size: string) => Object.values(Size).includes(size as Size))
      .map((size: string) => size as Size);
  }

  let shoeSizes: ShoeSize[] = [];
  if (typeof data.shoeSizes === "string") {
    shoeSizes = data.shoeSizes
      .split(",")
      .map((size: string) => size.trim())
      .filter((size: string) =>
        Object.values(ShoeSize).includes(size as ShoeSize)
      )
      .map((size: string) => size as ShoeSize);
  }

  const { id, ...rest } = product;

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      let product: Product;
      const tagsArray = rest.tags
        .split(",")
        .map((tag) => tag.trim().toLowerCase());

      if (id) {
        product = await prisma.product.update({
          where: { id },
          data: {
            ...rest,
            size: {
              set: sizes,
            },
            shoeSize: {
              set: shoeSizes,
            },
            tags: {
              set: tagsArray,
            },
          },
        });
      } else {
        product = await prisma.product.create({
          data: {
            ...rest,
            size: {
              set: sizes,
            },
            shoeSize: {
              set: shoeSizes,
            },
            tags: {
              set: tagsArray,
            },
          },
        });
      }

      if (formData.getAll("images").length > 0) {
        const images = await uploadImages(formData.getAll("images") as File[]);
        if (images && images.length > 0) {
          await prisma.productImage.createMany({
            data: images.map((image) => ({
              url: image!,
              productId: product.id,
            })),
          });
        } else {
          throw new Error("Image upload failed, rolling back");
        }
      }

      return {
        product,
      };
    });

    revalidatePath("/admin/products");
    revalidatePath(`/admin/product/${product.slug}`);
    revalidatePath(`/products/${product.slug}`);

    return {
      ok: true,
      product: prismaTx.product,
    };
  } catch (error) {
    console.error("Error during product creation or update:", error);
    return {
      ok: false,
      message: "Check the code, update/create failed",
    };
  }
};
const uploadImages = async (images: File[]) => {
  try {
    const uploadPromises = images.map(async (image) => {
      try {
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString("base64");
        const uploadResponse = await cloudinary.uploader.upload(
          `data:image/png;base64,${base64Image}`
        );
        return uploadResponse.secure_url;
      } catch (error) {
        console.error(`Failed to upload image: ${image.name}`, error);
        return null;
      }
    });

    const uploadedImages = await Promise.all(uploadPromises);

    return uploadedImages.filter((url) => url !== null) as string[];
  } catch (error) {
    console.error("Error uploading images:", error);
    return [];
  }
};
