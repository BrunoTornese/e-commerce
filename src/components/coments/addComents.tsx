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
      setError("Comment cannot be empty");
      return;
    }

    setError("");
    setLoading(true);

    try {
      if (!session?.user) {
        throw new Error("You must be logged in to comment");
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
      setError(err.message || "Could not add the comment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mt-10 max-w-2xl mx-auto bg-gradient-to-br from-white via-blue-50 to-blue-100 rounded-3xl shadow-2xl p-8 space-y-8 border border-blue-200">
      <div className="flex flex-col items-center gap-2">
        {session?.user?.image ? (
          <img
            src={session.user.image}
            alt="User avatar"
            className="w-14 h-14 rounded-full border-2 border-blue-400 shadow-md mb-2"
          />
        ) : (
          <div className="w-14 h-14 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 text-2xl font-bold mb-2">
            <span>{session?.user?.name?.[0] ?? "?"}</span>
          </div>
        )}
        <h4 className="text-3xl font-extrabold text-blue-800 text-center tracking-tight drop-shadow">
          Share your opinion!
        </h4>
        <span className="text-gray-500 text-sm">
          {session?.user?.name
            ? `Comment as ${session.user.name}`
            : "Sign in to comment"}
        </span>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="relative">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your review here..."
            className="w-full p-4 border border-blue-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 text-gray-700 shadow placeholder-gray-400 resize-none transition-all duration-200"
            rows={4}
            maxLength={500}
            disabled={loading}
          />
          <span className="absolute bottom-2 right-4 text-xs text-gray-400 select-none">
            {content.length}/500
          </span>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-500 text-sm font-medium px-2 py-1 bg-red-50 rounded animate-pulse">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0z"
              />
            </svg>
            {error}
          </div>
        )}

        <button
          type="submit"
          className={`w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold rounded-xl shadow-lg transition-all duration-200 hover:from-teal-500 hover:to-teal-700 focus:ring-2 focus:ring-blue-400 ${
            loading
              ? "opacity-60 cursor-not-allowed"
              : "hover:scale-105 active:scale-95"
          }`}
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              Sending...
            </span>
          ) : (
            "Submit review"
          )}
        </button>
      </form>
    </section>
  );
};
