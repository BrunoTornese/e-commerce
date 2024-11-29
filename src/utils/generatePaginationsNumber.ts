export const generatePagination = (currentPage: number, totalPages: number) => {
  // if the number of pages is 7 or less, show all pages without ellipses

  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3, show the first 3, ellipsis, and the last 2

  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // If the current page is within the last 3, show the first 2, ellipsis, and the last 3

  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // if the current page is somewhere else, show the first page, ellipsis, and the current and nearby pages

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};
