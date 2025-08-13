"use client";

import { useState, useEffect } from "react";
import { Product } from "@/interfaces";
import { TagFilter } from "./TagFilter";
import { ProductGrid } from "../products/product-grid/ProductGrid";
import { GenderFilter } from "./GenderFilterr";

interface Props {
  products: Product[];
  tags: string[];
  selectedTags: string[];
  genders: string[];
  selectedGender: string;
}

export const ProductFilter = ({
  products,
  tags,
  selectedTags,
  genders,
  selectedGender,
}: Props) => {
  const [currentSelectedTags, setCurrentSelectedTags] =
    useState<string[]>(selectedTags);
  const [selectedGenderState, setSelectedGenderState] =
    useState<string>(selectedGender);

  useEffect(() => {
    setCurrentSelectedTags(selectedTags);
  }, [selectedTags]);

  const handleTagChange = (updatedTags: string[]) => {
    setCurrentSelectedTags(updatedTags);
  };

  const handleGenderChange = (gender: string) => {
    setSelectedGenderState(gender);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg shadow-sm space-y-4 md:space-y-0 md:flex md:items-center md:gap-6">
        <GenderFilter
          genders={genders}
          selectedGender={selectedGenderState}
          onGenderChange={handleGenderChange}
        />

        <div className="flex-1 justify-end md:flex md:justify-end">
          <TagFilter
            tags={tags}
            selectedTags={currentSelectedTags}
            onTagChange={handleTagChange}
          />
        </div>
      </div>

      <ProductGrid products={products} />
    </div>
  );
};
