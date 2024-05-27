import { useMemo } from 'react';

type PaginationProps = {
  rowsPerPage: number;
  totalRows: number;
  currentPage: number;
};

export const usePagination = ({
  totalRows,
  rowsPerPage,
  currentPage,
}: PaginationProps) => {
  const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
  };

  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalRows / rowsPerPage);
    const totalPageNumbers = 1 + 5;

    if (totalPageCount < 2) {
      return;
    }
    if (totalPageNumbers >= totalPageCount) {
      return range(2, totalPageCount - 1);
    }

    const leftPageIndex = Math.max(currentPage - 1, 1);
    const rightPageIndex = Math.min(currentPage + 1, totalPageCount);
    const truncateLeft = leftPageIndex > 2;
    const truncateRight = rightPageIndex < totalPageCount - 2;

    if (!truncateLeft && truncateRight) {
      const leftRange = range(2, 5);

      return [...leftRange];
    }

    if (truncateLeft && !truncateRight) {
      const rightRange = range(totalPageCount - 6, totalPageCount - 1);
      return [...rightRange];
    }

    if (truncateLeft && truncateRight) {
      const middleRange = range(leftPageIndex, rightPageIndex);
      return [...middleRange];
    }
  }, [totalRows, rowsPerPage, currentPage]);

  return paginationRange;
};
