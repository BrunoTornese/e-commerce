"use client";

import { getStockBySlug } from "@/app/actions/products/getStockBySlug";
import { titleFont } from "@/config/fonts";
import { useEffect, useState, useCallback } from "react";

interface Props {
  slug: string;
}

export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const getStock = useCallback(async () => {
    const inStock = await getStockBySlug(slug);
    setStock(inStock);
    setIsLoading(false);
  }, [slug]);

  useEffect(() => {
    getStock();
  }, [getStock]);

  return (
    <>
      {isLoading ? (
        <h1
          className={` ${titleFont.className} antialiased font-bold text-md animate-pulse bg-gray-400`}
        >
          {" "}
          Loading Stock &nbsp;
        </h1>
      ) : (
        <h1 className={` ${titleFont.className} antialiased font-bold text-md`}>
          Stock: {stock}
        </h1>
      )}
    </>
  );
};
