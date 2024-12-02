"use client";

import { addressStore, useCartStore } from "@/store";
import { CurrencyFormat } from "@/utils";
import clsx from "clsx";
import Link from "next/link";
import { useState, useEffect } from "react";
import { placeOrder } from "@/app/actions";

export const PlaceOrder = () => {
  const [loaded, setloaded] = useState(false);
  const [isPlacingOrder, setPlacingOrder] = useState(false);

  const address = addressStore((state) => state.address);

  const { itemsInCart, subTotal, tax, total } = useCartStore((state) =>
    state.getSumaryInformation()
  );
  const cart = useCartStore((state) => state.cart);

  useEffect(() => {
    setloaded(true);
  }, []);

  const onPlaceOrder = async () => {
    setPlacingOrder(true);

    const productsToOrder = cart.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
      size: item.size,
    }));

    const resp = await placeOrder(productsToOrder, address);

    setPlacingOrder(false);
  };

  if (!loaded) {
    return (
      <div className="bg-white rounded-xl shadow-xl p-7 animate-pulse">
        <div className="h-8 bg-gray-600 rounded w-1/3 mb-4"></div>

        <div className="h-6 bg-gray-600 rounded w-1/4 mb-6"></div>

        <div className="space-y-3 mb-10">
          <div className="h-4 bg-gray-600 rounded w-1/2"></div>
          <div className="h-4 bg-gray-600 rounded w-1/3"></div>
          <div className="h-4 bg-gray-600 rounded w-1/4"></div>
          <div className="h-4 bg-gray-600 rounded w-3/4"></div>
        </div>

        <div className="w-full h-0.5 rounded bg-gray-600 mb-10"></div>

        <div className="space-y-4">
          <div className="flex justify-between">
            <div className="h-4 bg-gray-600 rounded w-1/4"></div>
            <div className="h-4 bg-gray-600 rounded w-1/6"></div>
          </div>
          <div className="flex justify-between">
            <div className="h-4 bg-gray-600 rounded w-1/3"></div>
            <div className="h-4 bg-gray-600 rounded w-1/5"></div>
          </div>
          <div className="flex justify-between">
            <div className="h-4 bg-gray-600 rounded w-1/3"></div>
            <div className="h-4 bg-gray-600 rounded w-1/5"></div>
          </div>
        </div>

        <div className="flex justify-between mt-5">
          <div className="h-6 bg-gray-600 rounded w-1/4"></div>
          <div className="h-6 bg-gray-600 rounded w-1/6"></div>
        </div>

        <div className="mt-5">
          <div className="h-4 bg-gray-600 rounded w-full mb-5"></div>
          <div className="h-10 bg-gray-600 rounded w-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-7">
      <h2 className="text-2xl mb-2">Delivery address</h2>
      <h3 className="font-bold mb-2">Check your data</h3>

      <div className="mb-10">
        <p className="text-xl">
          {address.firstName} {address.lastName}
        </p>
        <p className="text-lg">{address.address}</p>
        <p className="text-lg">{address.address2}</p>
        <p className="text-lg">{address.postalCode}</p>
        <p className="text-lg">
          {address.city}, {address.country}
        </p>
        <p className="text-lg">{address.phone}</p>
      </div>
      <div className="w-full h-0.5 rounded bg-gray-300 mb-10" />
      <div className="flex justify-between">
        <span>No products</span>
        <span className="text-right">
          {itemsInCart === 1 ? "1 Item" : `${itemsInCart} Items`}
        </span>
      </div>

      <div className="flex justify-between">
        <span>Subtotal price</span>
        <span className="text-right">{CurrencyFormat(subTotal)}</span>
      </div>

      <div className="flex justify-between">
        <span>Taxes (15%)</span>
        <span className="text-right">{CurrencyFormat(tax)}</span>
      </div>

      <div className="flex justify-between mt-5">
        <span className="text-2xl">Total:</span>
        <span className="text-right text-2xl mt-1.5">
          {CurrencyFormat(total)}
        </span>
      </div>

      <div className="mt-5 mb-2 w-full">
        <p className="mb-5">
          <span className="text-xs">
            By clicking &quot;Finalize Order&quot;, you agree to our{" "}
            <Link href="/termsAndServices" className="underline">
              terms and conditions
            </Link>{" "}
            and{" "}
            <Link href="/termsAndServices" className="underline">
              privacy policies
            </Link>
            .
          </span>
        </p>
        <button
          onClick={onPlaceOrder}
          className={clsx({
            "btn-primary": !isPlacingOrder,
            "btn-disabled": isPlacingOrder,
          })}
          aria-busy={isPlacingOrder}
          disabled={isPlacingOrder}
        >
          {isPlacingOrder ? "Placing Order..." : "Finalize Order"}
        </button>
      </div>
    </div>
  );
};
