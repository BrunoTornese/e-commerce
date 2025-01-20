"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";

export const updateUserProfile = async (userData: {
  name: string;
  email: string;
  currentPassword: string;
  newPassword?: string;
}) => {
  try {
    const { name, email, currentPassword, newPassword } = userData;
    const session = await auth();

    if (!session || !session.user?.id) {
      return { ok: false, message: "User not authenticated" };
    }

    const userId = session.user.id;

    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return { ok: false, message: "User not found" };
    }

    const isCurrentPasswordCorrect = bcryptjs.compareSync(
      currentPassword,
      existingUser.password
    );

    if (!isCurrentPasswordCorrect) {
      return { ok: false, message: "Current password is incorrect" };
    }

    const updateData: { name: string; email: string; password?: string } = {
      name,
      email: email.toLowerCase(),
    };

    if (newPassword) {
      updateData.password = bcryptjs.hashSync(newPassword, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return {
      ok: true,
      message: "Profile updated successfully",
      user: updatedUser,
    };
  } catch (error) {
    console.error("Error updating profile:", error);
    return { ok: false, message: "Error updating profile" };
  }
};
