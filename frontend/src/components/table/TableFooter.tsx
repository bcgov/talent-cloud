import type { ChangeEvent } from 'react';
import type { SearchParams } from '../../common/interface';
import {
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
} from '@heroicons/react/24/solid';

export const TableFooter = ({
  searchParams,
  handleParamsChange,
  totalRows,
  pageRange,
}: {
  searchParams: URLSearchParams;
  handleParamsChange: (params: SearchParams) => void;
  totalRows: number;
  pageRange: number[];
}) => {
  const rows = parseInt(searchParams.get('rows') ?? '0');
  const search = searchParams.get('search') ?? '';
  const page = parseInt(searchParams.get('page') ?? '1');

  return (
    <div className="w-full flex flex-row  items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div className="flex flex-row items-center space-x-4">
          <select
            className="form-select px-6 py-1"
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              handleParamsChange({
                rows: parseInt(e.target.value),
                page,
                search,
              })
            }
            name="rows"
          >
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <p className="text-black">{totalRows} total rows</p>
        </div>
      </div>

      <div>
        <nav
          className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <button
            onClick={() => handleParamsChange({ page: 1, rows, search })}
            className={
              'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900  hover:bg-gray-50 focus:z-20 '
            }
          >
            <ChevronDoubleLeftIcon />
          </button>
          <button
            onClick={() => handleParamsChange({ page: page - 1, rows, search })}
            className={
              'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900  hover:bg-gray-50 focus:z-20 '
            }
          >
            <ChevronLeftIcon />
          </button>

          {pageRange.map((itm) => (
            <button
              key={itm}
              onClick={() => handleParamsChange({ page: itm, rows, search })}
              className={
                page === itm
                  ? 'relative z-10 inline-flex items-center bg-primaryBlue px-4 py-2 text-sm font-semibold text-white'
                  : 'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 '
              }
            >
              {itm}
            </button>
          ))}

          <button
            onClick={() => handleParamsChange({ page: page + 1, rows, search })}
            className={
              'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900  hover:bg-gray-50 focus:z-20 '
            }
          >
            <ChevronRightIcon />
          </button>
          <button
            onClick={() =>
              handleParamsChange({
                page: pageRange.length - 1,
                rows,
                search,
              })
            }
            className={
              'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900  hover:bg-gray-50 focus:z-20 '
            }
          >
            <ChevronDoubleRightIcon />
          </button>
        </nav>
      </div>
    </div>
  );
};
