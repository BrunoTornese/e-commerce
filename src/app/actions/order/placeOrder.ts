"use server";

import { auth } from "@/auth.config";
import type { Address, Sizes } from "@/interfaces";
import prisma from "@/lib/prisma";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Sizes;
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
      const productQuiantity = item.quantity;
      const product = products.find((poduct) => poduct.id === item.productId);
      if (!product) {
        throw new Error(`${item.productId} not found -500`);
      }

      const subTotal = product.price * productQuiantity;
      totals.subTotal += subTotal * 0.15;
      totals.tax += subTotal * 1.15;
      return totals;
    },
    { subTotal: 0, tax: 0, total: 0 }
  );

  const prismaTx = await prisma.$transaction(async (tx) => {
    const order = await tx.order.create({
      data: {
        userId: userId,
        itemsInCart: itemsInOrder,
        subTotal: subTotal,
        tax: tax,
        total: total,

        OrderItem: {
          createMany: {
            data: productId.map((p) => ({
              quantity: p.quantity,
              size: p.size,
              productId: p.productId,
              price:
                products.find((product) => product.id === p.productId)?.price ??
                0,
            })),
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
      },
    });

    return {
      order: order,
      orderAddress: orderAddress,
    };
  });
};
