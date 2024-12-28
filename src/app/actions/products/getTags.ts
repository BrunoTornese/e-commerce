import prisma from "@/lib/prisma";

export const getTags = async () => {
  try {
    const tags = await prisma.product.findMany({
      select: {
        tags: true,
      },
    });

    const uniqueTags = Array.from(
      new Set(tags.flatMap((product) => product.tags))
    );

    return {
      ok: true,
      tags: uniqueTags,
    };
  } catch (error) {
    console.error("Error at get tags:", error);
    return {
      ok: false,
      message: "Error fetching tags",
    };
  }
};
