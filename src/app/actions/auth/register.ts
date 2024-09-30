"use server";

import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  repeatPassword: string
) => {
  try {
    if (!name || !email || !password || !repeatPassword) {
      return {
        ok: false,
        message: "Invalid Credentials",
      };
    }

    if (password !== repeatPassword) {
      return {
        ok: false,
        message: "Passwords do not match",
      };
    }

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email.toLowerCase(),
        password: bcryptjs.hashSync(password, 10),
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    return {
      ok: true,
      message: "User created successfully",
      user: user,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Error creating user",
    };
  }
};
