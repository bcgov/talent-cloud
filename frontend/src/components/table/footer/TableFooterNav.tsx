import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/solid';
import { TableFooterNavButton } from './TableFooterNavButton';
import { usePagination } from '@/hooks/usePagination';

export const TableFooterNav = ({
  totalRows,
  rowsPerPage,
  currentPage,
  handleChangePage,
}: {
  totalRows: number;
  rowsPerPage: number;
  currentPage: number;
  handleChangePage: (page: number) => void;
}) => {
  const iconButtonClass = 'text-dark h-4 w-4';

  const pageRange = usePagination({ currentPage, totalRows, rowsPerPage });

  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const lastPage = totalPages;

  const truncateLeft = currentPage > 3;
  const truncateRight = currentPage < lastPage - 2;
  return (
    <nav
      className="isolate inline-flex -space-x-px rounded-md shadow-sm"
      aria-label="Pagination"
    >
      <TableFooterNavButton
        ariaLabel="navigate to first page"
        disabled={currentPage === 1}
        onClick={() => handleChangePage(1)}
        icon={<ChevronDoubleLeftIcon className={iconButtonClass} />}
      />
      <TableFooterNavButton
        ariaLabel="navigate to previous page"
        disabled={currentPage === 1}
        onClick={() => handleChangePage(currentPage - 1)}
        icon={<ChevronLeftIcon className={iconButtonClass} />}
      />
      <button
        aria-label={`navigate to page 1`}
        disabled={currentPage === 1}
        onClick={() => handleChangePage(1)}
        className={
          currentPage === 1
            ? 'relative z-10 inline-flex items-center bg-primaryBlue px-4 py-2 text-sm font-semibold text-white'
            : 'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 '
        }
      >
        1
      </button>
      {truncateLeft && <span>...</span>}

      {pageRange?.map((itm) => {
        return (
          <button
            aria-label={`navigate to page ${itm}`}
            key={itm}
            disabled={currentPage === itm}
            onClick={() => handleChangePage(itm)}
            className={
              currentPage === itm
                ? 'relative z-10 inline-flex items-center bg-primaryBlue px-4 py-2 text-sm font-semibold text-white'
                : 'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 '
            }
          >
            {itm}
          </button>
        );
      })}

      {truncateRight && <span>...</span>}
      {lastPage !== 1 && (
        <button
          aria-label={`navigate to page ${lastPage}`}
          disabled={currentPage === lastPage}
          onClick={() => handleChangePage(lastPage)}
          className={
            currentPage === lastPage
              ? 'relative z-10 inline-flex items-center bg-primaryBlue px-4 py-2 text-sm font-semibold text-white'
              : 'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 '
          }
        >
          {lastPage}
        </button>
      )}
      <TableFooterNavButton
        ariaLabel="navigate to next page"
        disabled={currentPage === lastPage}
        onClick={() => handleChangePage(currentPage + 1)}
        icon={<ChevronRightIcon className={iconButtonClass} />}
      />
      <TableFooterNavButton
        ariaLabel="navigate to last page"
        disabled={currentPage === lastPage}
        onClick={() => handleChangePage(lastPage)}
        icon={<ChevronDoubleRightIcon className={iconButtonClass} />}
      />
    </nav>
  );
};
