"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getPaginetedOrders = async () => {
  const session = await auth();
  console.log("User session:", session);

  if (session?.user.role !== "admin") {
    console.error("User is not admin");
    return {
      ok: false,
      message: "You must be an admin to view this page",
    };
  }

  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      OrderAddress: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });

  return {
    ok: true,
    orders: orders,
  };
};
