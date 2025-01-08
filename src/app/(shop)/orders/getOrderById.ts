"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getOrderById = async (id: string) => {
  const session = await auth();

  if (!session?.user) {
    return {
      ok: false,
      message: "You must be logged in to view this page",
    };
  }

  try {
    const order = await prisma.order.findUnique({
      where: {
        id: id,
      },
      include: {
        OrderAddress: true,
        OrderItem: {
          select: {
            price: true,
            quantity: true,
            size: true,

            product: {
              select: {
                title: true,
                slug: true,

                ProductImage: {
                  select: {
                    url: true,
                  },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });

    if (!order) throw new Error("Order not found");
    if (session.user.role === "user") {
      if (session.user.id !== order.userId) {
        throw `${id} is't of that user`;
      }
    }

    return {
      ok: true,
      order: order,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: `Order not found`,
    };
  }
};
