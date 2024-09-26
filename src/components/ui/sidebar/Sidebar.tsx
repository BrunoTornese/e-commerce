"use client";

import { logout } from "@/app/actions";
import { useUiStore } from "@/store";
import clsx from "clsx";
import Link from "next/link";
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from "react-icons/io5";

export const Sidebar = () => {
  const isSideMenuOpen = useUiStore((state) => state.isSidebarOpen);
  const closeMenu = useUiStore((state) => state.closeSideMenu);

  return (
    <div>
      {isSideMenuOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" />
      )}

      {isSideMenuOpen && (
        <div className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm" />
      )}

      <nav
        className={clsx(
          "fixed p-5 right-0 top-0 h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
          {
            "translate-x-full": !isSideMenuOpen,
            "w-80": isSideMenuOpen, // Ancho del sidebar en móviles cuando está abierto
            "md:w-96": isSideMenuOpen, // Ancho del sidebar en pantallas medianas y mayores cuando está abierto
            "w-64": !isSideMenuOpen, // Ancho del sidebar en móviles cuando está cerrado
            "md:w-72": !isSideMenuOpen, // Ancho del sidebar en pantallas medianas y mayores cuando está cerrado
          }
        )}
      >
        <IoCloseOutline
          size={30}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => closeMenu()}
        />

        <div className="relative mt-14">
          <IoSearchOutline size={20} className="absolute top-2 left-2" />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-gray-50 pl-10 py-1 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-700"
          />
        </div>

        <Link
          href={"/profile"}
          onClick={() => closeMenu()}
          className="flex items-center mt-10 p-2 hover:bg-gray-300 rounded transition-all"
        >
          <IoPersonOutline size={30} />
          <span className="ml-3 text-xl">Profile</span>
        </Link>

        <Link
          href={"/"}
          className="flex items-center mt-10 p-2 hover:bg-gray-300 rounded transition-all"
        >
          <IoTicketOutline size={30} />
          <span className="ml-3 text-xl">Orders</span>
        </Link>

        <Link
          href={"/auth/login"}
          className="flex items-center mt-10 p-2 hover:bg-gray-300 rounded transition-all"
          onClick={() => closeMenu()}
        >
          <IoLogInOutline size={30} />
          <span className="ml-3 text-xl">Login</span>
        </Link>

        <button
          onClick={() => logout()}
          className="flex w-full items-center mt-10 p-2 hover:bg-gray-300 rounded transition-all"
        >
          <IoLogOutOutline size={30} />
          <span className="ml-3 text-xl">Logout</span>
        </button>

        <div className="w-full h-px bg-gray-400 my-10" />

        <Link
          href={"/"}
          className="flex items-center mt-10 p-2 hover:bg-gray-300 rounded transition-all"
        >
          <IoShirtOutline size={30} />
          <span className="ml-3 text-xl">Products</span>
        </Link>

        <Link
          href={"/"}
          className="flex items-center mt-10 p-2 hover:bg-gray-300 rounded transition-all"
        >
          <IoTicketOutline size={30} />
          <span className="ml-3 text-xl">Orders System</span>
        </Link>

        <Link
          href={"/"}
          className="flex items-center mt-10 p-2 hover:bg-gray-300 rounded transition-all"
        >
          <IoPeopleOutline size={30} />
          <span className="ml-3 text-xl">Users</span>
        </Link>
      </nav>
    </div>
  );
};
