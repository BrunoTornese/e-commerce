"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getPaginatedUsers = async (page: number = 1) => {
  const session = await auth();
  const usersPerPage = 10;

  if (session?.user.role !== "admin") {
    return {
      ok: false,
      message: "You must be an admin to view this page",
    };
  }

  const users = await prisma.user.findMany({
    where: {
      email: {
        not: "Teslo@gmail.com",
      },
    },
    orderBy: {
      name: "desc",
    },
    skip: (page - 1) * usersPerPage,
    take: usersPerPage,
  });

  const totalUsers = await prisma.user.count({
    where: {
      email: {
        not: "Teslo@gmail.com",
      },
    },
  });

  return {
    ok: true,
    users: users,
    totalUsers: totalUsers,
  };
};
