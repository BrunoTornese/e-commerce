"use client";

import { QuantitySelector, SizeSelector, StockLabel } from "@/components";
import { Product, Sizes } from "@/interfaces";
import { useState } from "react";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const [size, setSize] = useState<Sizes | undefined>();
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <>
      <StockLabel slug={product.slug} />

      <p className="text-lg mb-5">${product.price}</p>

      <SizeSelector
        selectedSize={size}
        availableSizes={product.size}
        onSizeChange={setSize}
      />

      <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />

      <button
        className={`btn-primary my-5 ${
          product.inStock
            ? ""
            : "!bg-gray-900 !text-gray-100 cursor-not-allowed"
        }`}
        disabled={!product.inStock}
      >
        {product.inStock ? "Add to cart" : "Out of Stock"}
      </button>
    </>
  );
};
