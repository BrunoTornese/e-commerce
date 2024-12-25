"use client";

import { QuantitySelector, SizeSelector, StockLabel } from "@/components";
import { CartProduct, Product, Sizes } from "@/interfaces";
import { useCartStore } from "@/store";
import { useState } from "react";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const addProductToCart = useCartStore((state) => state.addProductToCart);
  const [size, setSize] = useState<Sizes | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState<boolean>(false);

  const addToCart = () => {
    setPosted(true);
    if (!size) return;
    const cartProduct: CartProduct = {
      id: product.id,
      price: product.price,
      slug: product.slug,
      size: size,
      quantity: quantity,
      title: product.title,
      image: product.images ? product.images[0] : '',
    };
    addProductToCart(cartProduct);
    setPosted(false);
    setSize(undefined);
    setQuantity(1);
  };

  return (
    <>
      <StockLabel slug={product.slug} />

      <p className="text-lg mb-5">${product.price}</p>

      {posted && !size && (
        <span className="mt-2 text-red-500 fade-in">
          You must select a size!
        </span>
      )}

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
        onClick={addToCart}
      >
        {product.inStock ? "Add to cart" : "Out of Stock"}
      </button>
    </>
  );
};
