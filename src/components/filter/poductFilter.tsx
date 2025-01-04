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
    <div>
      <GenderFilter
        genders={genders}
        selectedGender={selectedGenderState}
        onGenderChange={handleGenderChange}
      />

      <TagFilter
        tags={tags}
        selectedTags={currentSelectedTags}
        onTagChange={handleTagChange}
      />

      <ProductGrid products={products} />
    </div>
  );
};
