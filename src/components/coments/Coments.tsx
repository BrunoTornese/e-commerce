"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { DeleteComment } from "@/app/actions";
import { showErrorAlert, showSuccessAlert } from "../alerts/Alerts";
import { useRouter } from "next/navigation";

interface Comment {
  id: string;
  content: string;
  userName: string;
  userId: string;
  createdAt: string;
}

interface CommentsProps {
  comments: Comment[] | null | undefined;
  currentUserId?: string | undefined | null;
}

export const Comments = ({ comments = [], currentUserId }: CommentsProps) => {
  const { data: session } = useSession();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async (commentId: string) => {
    try {
      setIsDeleting(true);
      setError(null);

      await DeleteComment(commentId);
      router.refresh();
      showSuccessAlert("Comment deleted successfully.");
    } catch (error) {
      console.error("Error deleting the comment:", error);
      showErrorAlert("There was an issue deleting the comment.");
    } finally {
      setIsDeleting(false);
    }
  };

  const isAdmin = session?.user?.role === "admin";

  return (
    <div className="p-8 bg-gradient-to-br from-indigo-200 to-indigo-300 rounded-2xl shadow-2xl space-y-8 overflow-x-hidden">
      {comments === null || comments === undefined ? (
        <div className="text-center text-gray-500">
          <p>No comments available yet.</p>
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center text-gray-500">
          <p>No comments available yet.</p>
        </div>
      ) : (
        comments.map((comment) => (
          <div
            key={comment.id}
            className="p-6 bg-white rounded-xl border-2 border-gray-400 shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-xl text-gray-800 tracking-tight">
                {comment.userName}
              </h3>

              <span className="text-sm text-gray-500">
                {comment.createdAt
                  ? new Date(comment.createdAt).toLocaleDateString()
                  : "No date available"}
              </span>
            </div>

            <p className="mt-3 text-gray-700">{comment.content}</p>

            {(currentUserId === comment.userId || isAdmin) && (
              <button
                onClick={() => handleDelete(comment.id)}
                disabled={isDeleting}
                className="mt-3 text-red-500 hover:text-red-600 transition-all duration-200 ease-in-out transform hover:scale-105"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            )}
          </div>
        ))
      )}

      {error && <p className="text-red-400 text-sm mt-4">{error}</p>}
    </div>
  );
};
