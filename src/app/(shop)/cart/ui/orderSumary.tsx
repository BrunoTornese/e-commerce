"use client";

import { useCartStore } from "@/store";
import { CurrencyFormat } from "@/utils";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export const OrderSumary = () => {
  const [loaded, setloaded] = useState(false);
  const { itemsInCart, subTotal, tax, total } = useCartStore((state) =>
    state.getSumaryInformation()
  );

  useEffect(() => {
    if (itemsInCart === 0 && loaded) {
      redirect("/empty");
    }
    setloaded(true);
  }, [itemsInCart, loaded]);

  if (!loaded) {
    return (
      <div className="animate-pulse">
        <div className="grid grid-cols-2 gap-y-2">
          <div className="h-4 bg-gray-500 rounded col-span-1"></div>
          <div className="h-4 bg-gray-500 rounded col-span-1"></div>
          <div className="h-4 bg-gray-500 rounded col-span-1"></div>
          <div className="h-4 bg-gray-500 rounded col-span-1"></div>
          <div className="h-4 bg-gray-500 rounded col-span-1"></div>
          <div className="h-4 bg-gray-500 rounded col-span-1"></div>
          <div className="h-6 bg-gray-500 rounded col-span-2 mt-5"></div>
          <div className="h-6 bg-gray-500 rounded col-span-2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2">
      <span>Number of items</span>
      <span className="text-right">
        {itemsInCart === 1 ? "1 Item" : ` ${itemsInCart} Items `}
      </span>

      <span>Subtotal</span>
      <span className="text-right">{CurrencyFormat(subTotal)}</span>

      <span>Taxes (15%)</span>
      <span className="text-right">{CurrencyFormat(tax)}</span>

      <span className="mt-5 text-xl md:text-2xl font-semibold ">
        Total Price:
      </span>

      <span className="mt-5 text-xl md:text-2xl font-semibold text-right">
        {CurrencyFormat(total)}
      </span>
    </div>
  );
};
