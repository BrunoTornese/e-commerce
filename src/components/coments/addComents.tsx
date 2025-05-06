"use client";

import { CreateComment } from "@/app/actions";
import { useState } from "react";
import { Comment } from "@/interfaces";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const AddComment = ({ productId }: { productId: string }) => {
  const { data: session } = useSession();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      setError("Comment content cannot be empty");
      return;
    }

    setError("");
    setLoading(true);

    try {
      if (!session?.user) {
        throw new Error("User is not authenticated");
      }

      const userId = session.user.id;
      const userName = session.user.name;

      const comment: Comment = {
        id: "",
        content,
        productId,
        userId,
        userName,
      };

      await CreateComment(comment);
      setContent("");
      router.refresh();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to add comment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 max-w-4xl mx-auto bg-gradient-to-br from-gray-100 to-gray-300 rounded-2xl shadow-2xl space-y-8 overflow-x-hidden">
      <h4 className="text-4xl font-bold text-gray-900 mb-6 tracking-tight text-center">
        Give your opinion on the product
      </h4>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your thoughts here..."
            className="w-full p-4 pl-6 border-2 border-gray-400 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 text-gray-800 shadow-md placeholder-gray-600 transition-all duration-300 ease-in-out transform hover:scale-105"
            rows={4}
          />
        </div>

        {error && (
          <p
            className="text-red-400 text-sm font-semibold"
            aria-live="assertive"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          className={`w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:from-teal-700 hover:to-teal-600 focus:ring-4 focus:ring-blue-500 ${
            loading ? "opacity-50 cursor-not-allowed" : "active:scale-95"
          }`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Comment"}
        </button>
      </form>
    </div>
  );
};
