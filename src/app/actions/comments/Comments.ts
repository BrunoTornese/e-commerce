"use server";

import prisma from "@/lib/prisma";
import { Comment } from "@/interfaces";

export async function CreateComment(comment: Comment) {
  try {
    const newComment = await prisma.comment.create({
      data: {
        content: comment.content,
        productId: comment.productId,
        userId: comment.userId,
      },
    });

    return newComment;
  } catch (error) {
    console.error("Error at create comment ", error);
    return {
      ok: false,
    };
  }
}

export async function DeleteComment(commentId: string) {
  try {
    const existingComment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!existingComment) {
      throw new Error("Comment not found");
    }

    await prisma.comment.delete({
      where: { id: commentId },
    });
    return {
      ok: true,
    };
  } catch (error) {
    console.error("Error at delete comment ", error);
    return {
      ok: false,
    };
  }
}

export async function GetCommentsBySlug(slug: string) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        slug: slug,
      },
      include: {
        comments: {
          include: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (!product) {
      console.error("Product not found");
      return null;
    }

    return product.comments;
  } catch (error) {
    console.error("Error at get comments by slug ", error);
    return null;
  }
}
