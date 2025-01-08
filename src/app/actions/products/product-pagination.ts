"use server";

import prisma from "@/lib/prisma";
import { Gender } from "@prisma/client";

interface PaginationOptions {
  page?: number;
  take?: number;
  gender?: Gender;
  tags: string[];
}

export const getPaginatedProductsWithImages = async ({
  page = 1,
  take = 12,
  gender,
  tags = [],
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;
  if (isNaN(Number(take))) take = 12;
  if (take < 1) take = 12;

  try {
    const whereConditions: any = {};

    if (gender) {
      whereConditions.gender = gender;
    }

    if (tags.length > 0) {
      whereConditions.tags = {
        hasSome: tags,
      };
    }

    const products = await prisma.product.findMany({
      take: take,
      skip: (page - 1) * take,
      include: {
        ProductImage: {
          take: 2,
          select: {
            url: true,
          },
        },
      },
      where: whereConditions,
    });

    const totalCount = await prisma.product.count({
      where: whereConditions,
    });
    const totalPages = Math.ceil(totalCount / take);

    return {
      currentPage: page,
      totalPages: totalPages,
      products: products.map((product) => ({
        ...product,
        images: product.ProductImage.map((image) => image.url),
      })),
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Error at get Products");
  }
};
