import prisma from "../lib/prisma";
import { initialData } from "./seed";

async function main() {
  // Delete all data
  await prisma.productImage.deleteMany(),
    await prisma.product.deleteMany(),
    await prisma.category.deleteMany();

  const { categories, products } = initialData;

  // Insert categories
  const categoriesData = categories.map((category) => ({ name: category }));

  await prisma.category.createMany({
    data: categoriesData,
  });

  const categoriesDB = await prisma.category.findMany();
  const categoriesMap: Record<string, string> = {};

  categoriesDB.forEach((category) => {
    categoriesMap[category.name.toLowerCase()] = category.id;
  });

  // Insert products
  products.forEach(async (product) => {
    const { type, images, ...rest } = product;
    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type],
      },
    });

    //Insert images
    const imagesData = images.map((image) => ({
      url: image,
      productId: dbProduct.id,
    }));

    await prisma.productImage.createMany({
      data: imagesData,
    });
  });

  console.log("🚀 Seed executed");
}

(async () => {
  if (process.env.NODE_ENV === "production") return;
  await main();
})();
