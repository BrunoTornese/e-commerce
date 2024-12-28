"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/interfaces";
import { ProductGrid } from "../products/product-grid/ProductGrid";

interface Props {
  products: Product[];
  tags: string[];
  selectedTags: string[];
}

export const ProductFilter = ({ products, tags, selectedTags }: Props) => {
  const [currentSelectedTags, setCurrentSelectedTags] =
    useState<string[]>(selectedTags);
  const router = useRouter();

  useEffect(() => {
    setCurrentSelectedTags(selectedTags);
  }, [selectedTags]);

  const handleTagClick = (tag: string) => {
    const updatedTags = currentSelectedTags.includes(tag)
      ? currentSelectedTags.filter((t) => t !== tag)
      : [...currentSelectedTags, tag];
    setCurrentSelectedTags(updatedTags);

    const queryParams = new URLSearchParams(window.location.search);
    if (updatedTags.length > 0) {
      queryParams.set("tags", updatedTags.join(","));
    } else {
      queryParams.delete("tags");
    }
    router.push(`${window.location.pathname}?${queryParams.toString()}`);
  };

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-6">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={`${
              currentSelectedTags.includes(tag)
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            } py-2 px-4 rounded-full text-sm font-medium hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200`}
          >
            {tag}
          </button>
        ))}
      </div>
      <ProductGrid products={products} />
    </div>
  );
};
