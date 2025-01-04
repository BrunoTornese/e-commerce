import prisma from "@/lib/prisma";

export const getGenders = async () => {
  try {
    const genders = await prisma.product.findMany({
      select: {
        gender: true,
      },
      distinct: ["gender"],
    });
    return { ok: true, genders: genders.map((g) => g.gender) };
  } catch (error) {
    console.error("Error fetching genders from DB:", error);
    return { ok: false, genders: [] };
  }
};
