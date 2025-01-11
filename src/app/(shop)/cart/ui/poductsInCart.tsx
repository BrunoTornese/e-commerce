"use client";

import { QuantitySelector } from "@/components";
import { useCartStore } from "@/store";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { useState } from "react";

export const ProductInCart = () => {
  const [loaded, setloaded] = useState(false);
  const productsInCart = useCartStore((state) => state.cart);
  const updateProductQuiantity = useCartStore(
    (state) => state.updateProductQuiantity
  );
  const removeProduct = useCartStore((state) => state.removeProduct);

  useEffect(() => {
    setloaded(true);
  }, []);

  const isCloudinaryImage = (imageUrl: string) => {
    return imageUrl.startsWith("https://res.cloudinary.com/");
  };

  const getImageSrc = (image: string) => {
    if (isCloudinaryImage(image)) {
      return image;
    } else {
      return `/products/${image}`;
    }
  };

  if (!loaded) {
    return (
      <div>
        {[...Array(3)].map((_, index) => (
          <div key={index} className="flex mb-5 animate-pulse">
            <div className="w-24 h-24 bg-gray-500 rounded mr-5"></div>
            <div className="flex-1">
              <div className="h-6 bg-gray-500 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-500 rounded w-1/4 mb-4"></div>
              <div className="h-10 bg-gray-500 rounded w-1/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      {productsInCart.map((product) => (
        <div key={`${product.slug}-${product.size}`} className="flex mb-5 ">
          <Image
            src={getImageSrc(product.image)}
            width={100}
            height={100}
            style={{
              width: "100px",
              height: "100px",
            }}
            alt={product.title}
            className="mr-5 rounded"
          />
          <div>
            <Link
              className="hover:underline cursor-pointer "
              href={`/product/${product.slug}`}
            >
              <p>{product.title}</p>
            </Link>
            Size: {product.size}
            <p>${product.price}</p>
            <QuantitySelector
              quantity={product.quantity}
              stock={product.stock}
              onQuantityChange={(quiantity) =>
                updateProductQuiantity(product, quiantity)
              }
            />
            <button
              className="underline mt-3"
              onClick={() => removeProduct(product)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
