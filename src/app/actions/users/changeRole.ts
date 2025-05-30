"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const changeRole = async (userId: string, role: string) => {
  const session = await auth();

  if (session?.user.role !== "admin") {
    return {
      ok: false,
      message: "You must be an admin to change role",
    };
  }

  try {
    const newRole = role === "admin" ? "admin" : "user";

    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        role: newRole,
      },
    });

    revalidatePath("/admin/users");

    return {
      ok: true,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: "Error changing role",
    };
  }
};
