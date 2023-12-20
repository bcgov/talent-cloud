import { ChangeEvent } from 'react';

import { Loading } from './Loading';
import { MinistryAcronymName, StatusName } from '../common';
import { Row, SearchParams } from '../common/interface';
import { icons } from '../styles';


export const Table = ({
  pageRange,
  pageData,
  searchParams,
  totalRows,
  handleParamsChange,
  columns,
}: {
  pageRange: number[];
  pageData: Row[];
  searchParams: URLSearchParams;
  totalRows: number;
  handleParamsChange: (params: SearchParams) => void;
  columns: string[];
}) => {
  const tdStyle = (itm: string) => {
    if (Object.keys(StatusName).includes(itm)) {
      return '';
    } else if (Object.keys(MinistryAcronymName).includes(itm)) {
      return 'text-ministry px-6 py-4 whitespace-nowrap';
    } else {
      return 'text-dark px-6 py-4 whitespace-nowrap';
    }
  };

  const title = 'Search Results';
  const subtitle = `${totalRows} found`;
  const rows = parseInt(searchParams.get('rows') ?? '0');
  const search = searchParams.get('search') ?? '';
  const page = parseInt(searchParams.get('page') ?? '1');

  return (
    <>
      {!pageData ? (
        <Loading />
      ) : (
        <div className="shadow-lg rounded-md mx-auto my-12 w-auto bg-white">
          <div className="flex flex-col space-y-4 p-6">
            <h4 className="text-black">{title}</h4>
            <p className="text-black">{subtitle}</p>
          </div>
          <div className="overflow-x-auto">
            <table className="table-auto">
              <thead className="bg-header border-b border-bgNav">
                <tr>
                  {columns.map((itm: string, index: number) => (
                    <th
                      key={`${itm + index.toString}`}
                      scope="col"
                      className="px-6 py-4 text-dark text-left"
                    >
                      {itm}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="h-full">
                {pageData?.map((itm: Row, index: number) => (
                  <tr
                    key={`${itm.name + index.toString}`}
                    className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                  >
                    {Object.values(itm).map((itm: string, index: number) => (
                      <td key={`${itm + index.toString()}`} className={tdStyle(itm)}>
                        {Object.keys(StatusName).includes(itm) ? (
                          <div
                            className={[
                              'rounded-full border  py-2 my-2 px-4 text-center text-sm font-semibold ',
                              itm === StatusName.Active
                                ? 'border-active bg-active text-active'
                                : 'border-inactive bg-inactive text-inactive',
                            ].join(',')}
                          >
                            {itm}
                          </div>
                        ) : (
                          itm
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
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
                    {icons.DoubleArrowLeft}
                  </button>
                  <button
                    onClick={() =>
                      handleParamsChange({ page: page - 1, rows, search })
                    }
                    className={
                      'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900  hover:bg-gray-50 focus:z-20 '
                    }
                  >
                    {icons.ArrowLeft}
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
                    onClick={() =>
                      handleParamsChange({ page: page + 1, rows, search })
                    }
                    className={
                      'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900  hover:bg-gray-50 focus:z-20 '
                    }
                  >
                    {icons.ArrowRight}
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
                    {icons.DoubleArrowRight}
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
