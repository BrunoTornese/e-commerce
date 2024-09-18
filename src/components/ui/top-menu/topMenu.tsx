"use client";

import { titleFont } from "@/config/fonts";
import { useUiStore } from "@/store";
import Link from "next/link";
import { IoCartOutline, IoSearchOutline, IoMenu } from "react-icons/io5";
import { useState } from "react";

export const TopMenu = () => {
  const openMenu = useUiStore((state) => state.openSideMenu);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);

  const toggleCategoryMenu = () => setIsCategoryMenuOpen(!isCategoryMenuOpen);

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
        <div className="hidden sm:flex space-x-4">
          <Link
            href="/gender/men"
            className="p-2 rounded-md transition-all hover:bg-gray-100"
            aria-label="Men's section"
          >
            Mens
          </Link>
          <Link
            href="/gender/women"
            className="p-2 rounded-md transition-all hover:bg-gray-100"
            aria-label="Women's section"
          >
            Womens
          </Link>
          <Link
            href="/gender/kid"
            className="p-2 rounded-md transition-all hover:bg-gray-100"
            aria-label="Kids' section"
          >
            Kids
          </Link>
        </div>
        <div className="flex items-center space-x-2">
          <Link href="/search" aria-label="Search">
            <IoSearchOutline className="w-5 h-5" />
          </Link>
          <Link href="/cart" aria-label="Cart">
            <div className="relative">
              <span className="absolute text-xs px-1 rounded-full font-bold -top-2 -right-2 bg-blue-700 text-white">
                3
              </span>
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
          <button
            onClick={toggleCategoryMenu}
            className="p-2 rounded-md transition-all hover:bg-gray-100 sm:hidden"
            aria-label="Open categories menu"
          >
            <IoMenu className="w-5 h-5" />
          </button>
        </div>
      </nav>
      {isCategoryMenuOpen && (
        <div className="sm:hidden flex flex-col space-y-4 px-5 py-2 bg-white shadow-md">
          <Link
            href="/gender/men"
            className="p-2 rounded-md transition-all hover:bg-gray-100"
            aria-label="Men's section"
          >
            Mens
          </Link>
          <Link
            href="/gender/women"
            className="p-2 rounded-md transition-all hover:bg-gray-100"
            aria-label="Women's section"
          >
            Womens
          </Link>
          <Link
            href="/gender/kid"
            className="p-2 rounded-md transition-all hover:bg-gray-100"
            aria-label="Kids' section"
          >
            Kids
          </Link>
        </div>
      )}
    </header>
  );
};
