"use client";

import clsx from "clsx";
import Link from "next/link";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { generatePagination } from "@/utils";

interface Props {
  totalPages: number;
}

export const Pagination = ({ totalPages }: Props) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Math.max(1, Number(searchParams.get("page")) || 1);

  if (currentPage > totalPages) {
    redirect(pathName);
  }

  const allPages = generatePagination(currentPage, totalPages);

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);

    if (pageNumber === "...") {
      return `${pathName}?${params.toString()}`;
    }

    if (+pageNumber === 0 || +pageNumber > totalPages) {
      return `${pathName}`;
    }

    params.set("page", pageNumber.toString());
    return `${pathName}?${params.toString()}`;
  };

  return (
    <div className="flex text-center justify-center mt-10 mb-32">
      <nav aria-label="Page navigation">
        <ul className="flex list-style-none">
          <li className="page-item">
            <Link
              aria-disabled={currentPage === 1}
              className={clsx(
                "page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded",
                {
                  "text-gray-400 pointer-events-none": currentPage === 1,
                  "text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none":
                    currentPage !== 1,
                }
              )}
              href={createPageUrl(currentPage - 1)}
            >
              <IoChevronBackOutline size={30} />
            </Link>
          </li>

          {allPages.map((page) => (
            <li key={page} className="page-item">
              <Link
                aria-label={`Go to page ${page}`}
                className={clsx(
                  "page-link relative block py-1.5 px-3 border-2 outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-400 focus:shadow-none",
                  {
                    "bg-gray-600 shadow-sm text-white hover:text-white hover:bg-gray-700":
                      page === currentPage,
                  }
                )}
                href={createPageUrl(page)}
              >
                {page}
              </Link>
            </li>
          ))}

          <li className="page-item">
            <Link
              aria-disabled={currentPage === totalPages}
              className={clsx(
                "page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded",
                {
                  "text-gray-400 pointer-events-none":
                    currentPage === totalPages,
                  "text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none":
                    currentPage !== totalPages,
                }
              )}
              href={createPageUrl(currentPage + 1)}
            >
              <IoChevronForwardOutline size={30} />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
