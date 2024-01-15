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
        disabled={currentPage === 1}
        onClick={() => onChange({ currentPage: 1 })}
        icon={<ChevronDoubleLeftIcon className={iconButtonClass} />}
      />
      <TableFooterNavButton
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
        disabled={currentPage === totalPages}
        onClick={() =>
          onChange({
            currentPage: currentPage + 1,
          })
        }
        icon={<ChevronRightIcon className={iconButtonClass} />}
      />
      <TableFooterNavButton
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
