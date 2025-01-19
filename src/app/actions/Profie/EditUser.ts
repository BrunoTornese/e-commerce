"use server";

import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";

export const updateUserProfile = async (
  id: string,
  name: string,
  email: string,
  currentPassword: string,
  newPassword: string,
  repeatNewPassword: string
) => {
  try {
    if (
      !name ||
      !email ||
      !currentPassword ||
      !newPassword ||
      !repeatNewPassword
    ) {
      return {
        ok: false,
        message: "Invalid Credentials",
      };
    }

    if (newPassword !== repeatNewPassword) {
      return {
        ok: false,
        message: "New passwords do not match",
      };
    }

    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return {
        ok: false,
        message: "User not found",
      };
    }

    const passwordMatch = await bcryptjs.compare(
      currentPassword,
      existingUser.password
    );
    if (!passwordMatch) {
      return {
        ok: false,
        message: "Current password is incorrect",
      };
    }

    const updateData: { name: string; email: string; password?: string } = {
      name,
      email: email.toLowerCase(),
    };

    if (newPassword) {
      updateData.password = bcryptjs.hashSync(newPassword, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
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
    console.error(error);
    return {
      ok: false,
      message: "Error updating profile",
    };
  }
};
