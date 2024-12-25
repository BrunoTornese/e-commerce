"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Gender, Product, Size } from "@prisma/client";
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
  tags: z.string(),
  gender: z.nativeEnum(Gender),
});

export const createUpdateProduct = async (formData: FormData) => {
  const data = Object.fromEntries(formData);

  const productParsed = productSchema.safeParse(data);

  if (!productParsed.success) {
    return { ok: false };
  }

  const product = productParsed.data;

  // Processing the slug
  product.slug = product.slug.toLowerCase().replace(/ /g, "-").trim();

  // Processing the 'size' field and ensuring it's a valid array
  let sizes: string[] = [];
  if (product.size) {
    sizes = product.size.map((size: string) => size.trim());
  }

  // Validating the sizes
  const validSizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
  sizes = sizes.filter((size: string) => validSizes.includes(size));

  // Destructuring the data, excluding 'id'
  const { id, ...rest } = product;

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      let product: Product;
      const tagsArray = rest.tags
        .split(",")
        .map((tag) => tag.trim().toLowerCase());

      if (id) {
        // Updating existing product
        product = await prisma.product.update({
          where: { id },
          data: {
            ...rest,
            size: {
              set: sizes as Size[], // Using processed sizes
            },
            tags: {
              set: tagsArray,
            },
          },
        });
      } else {
        // Creating a new product
        product = await prisma.product.create({
          data: {
            ...rest,
            size: {
              set: sizes as Size[], // Using processed sizes
            },
            tags: {
              set: tagsArray,
            },
          },
        });
      }

      if (formData.getAll("images")) {
        // Handling image upload
        const images = await uploadImages(formData.getAll("images") as File[]);
        if (!images) {
          throw new Error("Image upload failed, rolling back");
        }

        // Creating image records in Prisma
        await prisma.productImage.createMany({
          data: images.map((image) => ({
            url: image!,
            productId: product.id,
          })),
        });
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
        // Converting the image to base64
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString("base64");
        // Uploading the image to Cloudinary
        return cloudinary.uploader
          .upload(`data:image/png;base64,${base64Image}`)
          .then((r) => r.secure_url);
      } catch (error) {
        return null;
      }
    });

    const uploadedImages = await Promise.all(uploadPromises);
    return uploadedImages;
  } catch (error) {
    return null;
  }
};
