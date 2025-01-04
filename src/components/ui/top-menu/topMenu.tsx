"use client";

import { titleFont } from "@/config/fonts";
import { useCartStore, useUiStore } from "@/store";
import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";
import { useEffect, useState } from "react";

export const TopMenu = () => {
  const openMenu = useUiStore((state) => state.openSideMenu);
  const totalItemsInCart = useCartStore((state) => state.getTotalItems());
  const [loaded, setLoaded] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (totalItemsInCart > 0) {
      setShowAnimation(true);
      const timer = setTimeout(() => {
        setShowAnimation(false);
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [totalItemsInCart]);

  return (
    <header className="bg-white shadow-md">
      <nav className="flex px-5 justify-between items-center w-full">
        <div>
          <Link href="/" aria-label="Home">
            <span className={`${titleFont.className} antialiased font-bold`}>
              Teslo
            </span>
            <span> | Shop</span>
          </Link>
        </div>
        <div className="flex items-center space-x-2">
          <Link href={"/cart"} aria-label="Cart">
            <div className="relative">
              {loaded && totalItemsInCart > 0 && (
                <span
                  className={`absolute text-xs px-1 rounded-full font-bold -top-2 -right-2 bg-blue-700 text-white ${
                    showAnimation ? "animate-bounce" : ""
                  }`}
                >
                  {totalItemsInCart}
                </span>
              )}

              <IoCartOutline className="w-5 h-5" />
            </div>
          </Link>

          <button
            onClick={() => openMenu()}
            className="p-2 rounded-md transition-all hover:bg-gray-100"
            aria-label="Open menu"
          >
            Menu
          </button>
        </div>
      </nav>
    </header>
  );
};
