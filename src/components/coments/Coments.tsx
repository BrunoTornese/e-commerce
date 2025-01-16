"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { DeleteComment } from "@/app/actions";
import {
  showConfirmAlert,
  showErrorAlert,
  showSuccessAlert,
} from "../alerts/Alerts";

interface Comment {
  id: string;
  content: string;
  userName: string;
  userId: string;
}

interface CommentsProps {
  comments: Comment[] | null | undefined;
  currentUserId?: string | undefined | null;
}

export const Comments = ({ comments = [], currentUserId }: CommentsProps) => {
  const { data: session } = useSession();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (commentId: string) => {
    try {
      const result = showConfirmAlert(
        "Are you sure you want to delete this comment?"
      );
      if (!result) return;

      setIsDeleting(true);
      setError(null);

      await DeleteComment(commentId);

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
    <div className="p-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg shadow-lg space-y-6">
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
            className="p-4 bg-white rounded-lg border border-gray-300 shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex justify-between">
              <h3 className="font-semibold text-base text-gray-800">
                {comment.userName}
              </h3>

              {(currentUserId === comment.userId || isAdmin) && (
                <button
                  onClick={() => handleDelete(comment.id)}
                  disabled={isDeleting}
                  className="text-red-500 hover:text-red-600"
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              )}
            </div>

            <p className="mt-2 text-gray-600">{comment.content}</p>
          </div>
        ))
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};
