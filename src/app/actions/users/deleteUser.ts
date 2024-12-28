"use server";

import prisma from "@/lib/prisma";

export const deleteUser = async (userId: string) => {
  try {
    await prisma.$transaction(async (prisma) => {
      const orders = await prisma.order.findMany({
        where: { userId: userId },
        select: { id: true },
      });

      const orderIds = orders.map((order) => order.id);

      await prisma.orderAddress.deleteMany({
        where: {
          orderId: { in: orderIds },
        },
      });

      await prisma.orderItem.deleteMany({
        where: {
          orderId: { in: orderIds },
        },
      });

      await prisma.order.deleteMany({
        where: {
          userId: userId,
        },
      });

      await prisma.userAddress.deleteMany({
        where: {
          userId: userId,
        },
      });

      await prisma.user.delete({
        where: {
          id: userId,
        },
      });
    });
  } catch (error) {
    console.error("Error deleting user and related data:", error);
  }
};
