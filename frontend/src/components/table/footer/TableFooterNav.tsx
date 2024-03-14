import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/solid';
import { TableFooterNavButton } from './TableFooterNavButton';
import type { PageParams, TableData } from '../interface';

export const TableFooterNav = ({
  pageParams,
  onChange,
  tableData,
}: {
  pageParams: PageParams;
  onChange: (pageParams: Partial<PageParams>) => void;
  tableData: TableData;
}) => {
  const iconButtonClass = 'text-dark h-4 w-4';
  const { pageRange, totalPages } = tableData;
  const { currentPage } = pageParams;

  return (
    <nav
      className="isolate inline-flex -space-x-px rounded-md shadow-sm"
      aria-label="Pagination"
    >
      <TableFooterNavButton
        ariaLabel="navigate to first page"
        disabled={currentPage === 1}
        onClick={() => onChange({ currentPage: 1 })}
        icon={<ChevronDoubleLeftIcon className={iconButtonClass} />}
      />
      <TableFooterNavButton
        ariaLabel="navigate to previous page"
        disabled={currentPage === 1}
        onClick={() => onChange({ currentPage: currentPage - 1 })}
        icon={<ChevronLeftIcon className={iconButtonClass} />}
      />

      {currentPage > 3 && totalPages > 5 && (
        <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ">
          ...
        </span>
      )}
      {pageRange.map((itm) => (
        <button
          aria-label={`navigate to page ${itm}`}
          key={itm}
          onClick={() => onChange({ currentPage: itm })}
          className={
            currentPage === itm
              ? 'relative z-10 inline-flex items-center bg-primaryBlue px-4 py-2 text-sm font-semibold text-white'
              : 'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 '
          }
        >
          {itm}
        </button>
      ))}

      {currentPage < totalPages - 2 && totalPages > 5 && (
        <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ">
          ...
        </span>
      )}
      <button
        aria-label={`navigate to last page`}
        disabled={currentPage === totalPages}
        key={pageRange.length - 1}
        onClick={() => onChange({ currentPage: totalPages })}
        className={
          currentPage === totalPages
            ? 'relative z-10 inline-flex items-center bg-primaryBlue px-4 py-2 text-sm font-semibold text-white'
            : 'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 '
        }
      >
        {totalPages}
      </button>
      <TableFooterNavButton
        ariaLabel="navigate to next page"
        disabled={currentPage === totalPages}
        onClick={() =>
          onChange({
            currentPage: currentPage + 1,
          })
        }
        icon={<ChevronRightIcon className={iconButtonClass} />}
      />
      <TableFooterNavButton
        ariaLabel="navigate to last page"
        disabled={currentPage === totalPages}
        onClick={() =>
          onChange({
            currentPage: totalPages,
          })
        }
        icon={<ChevronDoubleRightIcon className={iconButtonClass} />}
      />
    </nav>
  );
};
