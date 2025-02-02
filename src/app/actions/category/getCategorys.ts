"use server";

import prisma from "@/lib/prisma";

export const getCategorys = async () => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return categories;
  } catch (error) {
    console.error(error);
    return [];
  }
};
