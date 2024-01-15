export const truncatePageRange = (
  totalPages: number,
  currentPage: number,
  pageRange: number[],
) => {
  if (totalPages <= 5) {
    return pageRange.slice(0, totalPages - 1);
  } else if (currentPage < 3) {
    return [1, 2, 3];
  } else if (currentPage > totalPages - 2) {
    return [totalPages - 2, totalPages - 1];
  } else {
    return pageRange.slice(currentPage - 2, currentPage + 1);
  }
};
