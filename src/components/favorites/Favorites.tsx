"use client";

import {
  toggleFavorite,
  getFavoriteStatus,
} from "@/app/actions/favorites/Favorites";
import { useState, useEffect } from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

interface FavoriteButtonProps {
  userId: string;
  productId: string;
}

export function FavoriteButton({ userId, productId }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      try {
        const status = await getFavoriteStatus(userId, productId);
        setIsFavorite(status);
      } catch (error) {
        console.error("Error fetching favorite status:", error);
      }
    };

    if (userId) {
      fetchFavoriteStatus();
    }
  }, [userId, productId]);

  if (isFavorite === null) {
    return (
      <div className="w-32 h-8 bg-gray-300 animate-pulse rounded-md flex items-center justify-center">
        <span className="text-gray-500">Loading favorites...</span>
      </div>
    );
  }

  const handleFavoriteClick = async () => {
    if (isFavorite === null) return;

    try {
      const result = await toggleFavorite(userId, productId);
      if (result.success) {
        setIsFavorite(result.action === "added");
      }
      router.refresh();
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <div
      onClick={handleFavoriteClick}
      className="cursor-pointer hover:text-red-600 transition-colors"
    >
      {isFavorite ? (
        <IoHeart size={30} color="red" />
      ) : (
        <IoHeartOutline size={30} />
      )}
      <span className="ml-2 text-lg font-semibold">
        {isFavorite ? "In Favorites" : "Add to Favorites"}
      </span>
    </div>
  );
}
