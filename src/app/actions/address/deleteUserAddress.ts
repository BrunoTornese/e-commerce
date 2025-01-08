"use server";

import prisma from "@/lib/prisma";

export const deleteUserAddress = async (userId: string) => {
  try {
    const deletedAddress = await prisma.userAddress.deleteMany({
      where: { userId },
    });
    return {
      ok: true,
      message: "The address was deleted",
      deletedAddress,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: "Error at delete the user address",
    };
  }
};
