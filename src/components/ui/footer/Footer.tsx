import { titleFont } from "@/config/fonts";
import Link from "next/link";

export const Footer = () => {
  return (
    <div
      className={`${titleFont.className} antialiased font-bold flex flex-col sm:flex-row sm:justify-between items-center w-full py-6 px-4 bg-gray-800 text-white mt-12`}
    >
      <div className="flex justify-center space-x-4 mb-4 sm:mb-0">
        <Link href="/" className="text-xs sm:text-sm md:text-base">
          <span>Teslo </span>
          <span>| Shop</span>
          <span>© {new Date().getFullYear()}</span>
        </Link>
      </div>

      <div className="flex justify-center space-x-3">
        <Link
          href="/termsAndServices"
          className="text-xs sm:text-sm md:text-base hover:underline"
        >
          Privacy & Legal
        </Link>
        <Link
          href="https://github.com/BrunoTornese"
          target="_blank"
          className="text-xs sm:text-sm md:text-base hover:underline"
        >
          Locations
        </Link>
      </div>
    </div>
  );
};
