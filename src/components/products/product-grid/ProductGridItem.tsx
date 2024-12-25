"use client";

import { Product } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface Props {
  product: Product;
}

export const ProductGridItem = ({ product }: Props) => {
  const [displayImage, setDisplayImage] = useState(product.images ? product.images[0] : '');

  return (
    <div className="rounder-md overflow-hidden fade-in">
      <Link href={`/products/${displayImage}`}>
        <Image
          src={`/products/${displayImage}`}
          alt={product.title}
          className="w-full object-cover rounded"
          width={500}
          height={500}
          onMouseEnter={() => product.images && setDisplayImage(product.images[1])}
           onMouseLeave={() => product.images && setDisplayImage(product.images[0])}
        />
      </Link>

      <div className="p-4 flex flex-col">
        <Link className="hover:text-blue-700" href={`/product/${product.slug}`}>
          {product.title}
        </Link>
        <span className="font-bold"> {product.price} $</span>
      </div>
    </div>
  );
};
