"use client";

import { useState } from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";

interface FavoriteButtonProps {
  initialState?: boolean;
}

export const FavoriteButton = ({
  initialState = false,
}: FavoriteButtonProps) => {
  const [isFavorite, setIsFavorite] = useState(initialState);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <button
      onClick={handleFavoriteClick}
      className="flex items-center space-x-2"
    >
      {isFavorite ? (
        <>
          <IoHeart className="text-red-500" size={24} />
          <span className="text-lg font-semibold">In Favorites</span>
        </>
      ) : (
        <>
          <IoHeartOutline className="text-gray-500" size={24} />{" "}
          <span className="text-lg font-semibold">Add to Favorites</span>
        </>
      )}
    </button>
  );
};
