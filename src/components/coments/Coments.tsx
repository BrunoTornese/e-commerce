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
    <div className="space-y-8">
      {(comments ?? []).length === 0 ? (
        <div className="text-center text-gray-500">
          <p>No comments available yet.</p>
        </div>
      ) : (
        (comments ?? []).map((comment) => (
          <div
            key={comment.id}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-gray-300"></div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {comment.userName}
                </h3>
                <span className="text-sm text-gray-500">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            <p className="mt-4 text-gray-700">{comment.content}</p>
            {session?.user && (currentUserId === comment.userId || isAdmin) && (
              <button
                onClick={() => handleDelete(comment.id)}
                disabled={isDeleting}
                className="mt-3 text-red-500 hover:text-red-600 transition-all duration-200 ease-in-out"
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
