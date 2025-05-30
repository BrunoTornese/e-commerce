"use server";

import prisma from "@/lib/prisma";

export const getCounties = async () => {
  try {
    const countries = await prisma.country.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return countries;
  } catch (error) {
    console.error(error);
    return [];
  }
};
