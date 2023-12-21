import { TableBody } from './TableBody';
import { TableFooter } from './TableFooter';
import { TableHeader } from './TableHeader';
import { Loading } from '../Loading';
import { Row, SearchParams } from '../../common/interface';

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
            <div className="overflow-x-auto">
              <TableHeader columns={columns} />
              <TableBody pageData={pageData} />
            </div>
            <TableFooter
              searchParams={searchParams}
              handleParamsChange={handleParamsChange}
              pageRange={pageRange}
              totalRows={totalRows}
            />
          </table>
        </div>
      )}
    </>
  );
};
