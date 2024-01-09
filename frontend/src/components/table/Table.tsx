import { TableBody } from './TableBody';
import { TableFooter } from './TableFooter';
import { TableHeader } from './TableHeader';
import { Loading } from '../ui/Loading';
import type { DashboardRow, SearchParams } from '../../common/interface';

export const Table = ({
  pageRange,
  pageData,
  searchParams,
  totalRows,
  handleParamsChange,
  columns,
}: {
  pageRange: number[];
  pageData: DashboardRow[];
  searchParams: URLSearchParams;
  totalRows: number;
  handleParamsChange: (params: SearchParams) => void;
  columns: string[];
}) => {
  const title = 'Search Results';
  const subtitle = `${totalRows} found`;

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

          <table className="table-fixed">
            <TableHeader columns={columns} />
            <TableBody pageData={pageData} />
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
