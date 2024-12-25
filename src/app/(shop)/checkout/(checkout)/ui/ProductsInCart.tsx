"use client";

import { ProductImage } from "@/components";
import { useCartStore } from "@/store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useState } from "react";

export const ProductInCart = () => {
  const [loaded, setloaded] = useState(false);
  const productsInCart = useCartStore((state) => state.cart);
  const router = useRouter();

  useEffect(() => {
    if (productsInCart.length === 0) {
      router.replace("/");
    }
    setloaded(true);
  }, []);

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
          <ProductImage
            src={product.image}
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
            <span>
              {product.size} - {product.title} ({product.quantity})
            </span>

            <p className="font-bold">${product.price * product.quantity}</p>
          </div>
        </div>
      ))}
    </>
  );
};
