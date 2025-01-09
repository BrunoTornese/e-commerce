"use client";

import { signOut } from "next-auth/react";
import { useUiStore } from "@/store";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoMdPersonAdd } from "react-icons/io";
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoShirtOutline,
  IoTicketOutline,
} from "react-icons/io5";
import { motion } from "framer-motion";
import { FaChartLine } from "react-icons/fa";

interface SidebarItemProps {
  href?: string;
  icon: React.ComponentType<{ size: number }>;
  label: string;
  onClick?: () => void;
  isButton?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  href,
  icon: Icon,
  label,
  onClick,
  isButton = false,
}) => {
  if (isButton) {
    return (
      <button
        onClick={onClick}
        className="flex w-full items-center mt-10 p-2 hover:bg-gray-300 rounded transition-all"
      >
        <Icon size={30} />
        <span className="ml-3 text-xl">{label}</span>
      </button>
    );
  }

  return (
    <Link
      href={href || "#"}
      onClick={onClick}
      className="flex items-center mt-10 p-2 hover:bg-gray-300 rounded transition-all"
    >
      <Icon size={30} />
      <span className="ml-3 text-xl">{label}</span>
    </Link>
  );
};

export const Sidebar = () => {
  const isSideMenuOpen = useUiStore((state) => state.isSidebarOpen);
  const closeMenu = useUiStore((state) => state.closeSideMenu);
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  const roleUser = session?.user?.role;
  const router = useRouter();

  return (
    <div>
      {isSideMenuOpen && (
        <div
          className="fixed top-0 left-0 w-screen h-screen z-10 bg-black bg-opacity-30 backdrop-blur-sm"
          onClick={closeMenu}
          role="presentation"
        />
      )}

      <motion.nav
        initial={{ x: "100%" }}
        animate={{ x: isSideMenuOpen ? "0%" : "100%" }}
        transition={{ duration: 0.3 }}
        className="fixed p-5 right-0 top-0 h-screen bg-white z-20 shadow-2xl w-80 md:w-96"
      >
        <button
          aria-label="Close menu"
          className="absolute top-5 right-5 cursor-pointer"
          onClick={closeMenu}
        >
          <IoCloseOutline size={30} />
        </button>

        {isAuthenticated ? (
          <>
            <SidebarItem
              href="/profile"
              icon={IoPersonOutline}
              label="Your Profile"
              onClick={closeMenu}
            />
            <SidebarItem
              href="/orders"
              icon={IoTicketOutline}
              label="Your Orders"
              onClick={closeMenu}
            />
            <SidebarItem
              isButton
              onClick={async () => {
                await signOut({ redirect: false });
                closeMenu();
                router.push("/");
              }}
              icon={IoLogOutOutline}
              label="Logout"
            />
          </>
        ) : (
          <>
            <SidebarItem
              href="/auth/new-account"
              icon={IoMdPersonAdd}
              label="Create Account"
              onClick={closeMenu}
            />
            <SidebarItem
              href="/auth/login"
              icon={IoLogInOutline}
              label="Login"
              onClick={closeMenu}
            />
          </>
        )}

        <div className="w-full h-px bg-gray-600 my-10" />

        {roleUser === "admin" && (
          <>
            <SidebarItem
              href="/admin/products"
              icon={IoShirtOutline}
              label="Products"
              onClick={closeMenu}
            />
            <SidebarItem
              href="/admin/orders"
              icon={IoTicketOutline}
              label="Orders System"
              onClick={closeMenu}
            />
            <SidebarItem
              href="/admin/financials"
              icon={FaChartLine} 
              label="Financials"
              onClick={closeMenu}
            />
          </>
        )}
      </motion.nav>
    </div>
  );
};
