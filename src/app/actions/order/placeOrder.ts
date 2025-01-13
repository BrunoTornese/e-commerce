"use server";

import { auth } from "@/auth.config";
import type { Address, Sizes } from "@/interfaces";
import prisma from "@/lib/prisma";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Sizes | "N/A";
}

export const placeOrder = async (
  productId: ProductToOrder[],
  address: Address
) => {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) {
    return {
      ok: false,
      message: "No user session",
    };
  }

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productId.map((item) => item.productId),
      },
    },
  });

  const itemsInOrder = productId.reduce(
    (count, product) => count + product.quantity,
    0
  );
  const { subTotal, tax, total } = productId.reduce(
    (totals, item) => {
      const productQuantity = item.quantity;
      const product = products.find((product) => product.id === item.productId);
      if (!product) {
        throw new Error(`${item.productId} not found -500`);
      }

      const productSubTotal = product.price * productQuantity;
      totals.subTotal += productSubTotal;
      totals.tax += productSubTotal * 0.15;
      totals.total = totals.subTotal + totals.tax;
      return totals;
    },
    { subTotal: 0, tax: 0, total: 0 }
  );

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      const updatedProductsPromises = products.map(async (product) => {
        const productQuantity = productId
          .filter((p) => p.productId === product.id)
          .reduce((acc, item) => item.quantity + acc, 0);

        if (productQuantity === 0) {
          throw new Error(`${product.id} product out of stock`);
        }

        return tx.product.update({
          where: { id: product.id },
          data: {
            inStock: {
              decrement: productQuantity,
            },
          },
        });
      });

      const updatedProducts = await Promise.all(updatedProductsPromises);
      updatedProducts.forEach((product) => {
        if (product.inStock < 0) {
          throw new Error(`${product.title} product out of stock, sorry 😢`);
        }
      });
      const order = await tx.order.create({
        data: {
          userId: userId,
          itemsInCart: itemsInOrder,
          subTotal: subTotal,
          tax: tax,
          total: total,

          OrderItem: {
            createMany: {
              data: productId.map((p) => {
                const validSize = p.size === "N/A" ? "N_A" : p.size;
                return {
                  quantity: p.quantity,
                  size: validSize,
                  productId: p.productId,
                  price:
                    products.find((product) => product.id === p.productId)
                      ?.price ?? 0,
                };
              }),
            },
          },
        },
      });

      const { country, ...restAddress } = address;
      const orderAddress = await tx.orderAddress.create({
        data: {
          ...restAddress,
          countryId: country,
          orderId: order.id,
          rememberAddress: false,
        },
      });

      return {
        updatedProducts: updatedProducts,
        order: order,
        orderAddress: orderAddress,
      };
    });

    return {
      ok: true,
      message: "Order placed successfully",
      result: prismaTx,
    };
  } catch (error: any) {
    return {
      ok: false,
      message: error.message,
    };
  }
};
