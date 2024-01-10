import { TableBody } from './TableBody';
import { TableFooter } from './TableFooter';
import { TableHeader } from './TableHeader';
import { Loading } from '../ui/Loading';
import type { SearchParams } from '@/common/interface';
import type { TableData } from './interface';

export const Table = ({
  pageRange,
  tableData,
  searchParams,
  totalRows,
  handleParamsChange,
}: {
  pageRange: number[];
  tableData: TableData;
  searchParams: URLSearchParams;
  totalRows: number;
  handleParamsChange: (params: SearchParams) => void;
}) => {
  const title = 'Search Results';
  const subtitle = `${totalRows} found`;

  return (
    <>
      {!tableData ? (
        <Loading />
      ) : (
        <div className="shadow-lg rounded-md mx-auto my-12 w-auto bg-white">
          <div className="flex flex-col space-y-4 p-6">
            <h4 className="text-black">{title}</h4>
            <p className="text-black">{subtitle}</p>
          </div>

          <table className="table-fixed">
            <TableHeader columns={tableData.columns} />
            <TableBody rows={tableData.rows} />
          </table>
          <TableFooter
            searchParams={searchParams}
            handleParamsChange={handleParamsChange}
            pageRange={pageRange}
            totalRows={totalRows}
          />
        </div>
      )}
    </>
  );
};
