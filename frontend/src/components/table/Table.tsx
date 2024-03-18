import { DashboardColumns } from '@/pages/dashboard';
import type { Column, PageParams, TableData } from '.';
import { TableFooter, TableBody, TableHeader } from '.';
import { Toggle } from '../toggle/Toggle';
import { Loading } from '../ui';

export const Table = ({
  title,
  subtitle,
  columns,
  tableData,
  pageParams,
  showToggle,
  handlePageParams,
  showFunctionColumn,
  loading,
}: {
  title: string;
  subtitle: string;
  columns: Column[];
  tableData: TableData;
  pageParams: PageParams;
  showToggle: boolean;
  handlePageParams: (params: Partial<PageParams>) => void;
  showFunctionColumn: boolean;
  loading: boolean;
}) => {
  return (
    <div className="shadow-lg rounded-md w-full bg-white border border-gray  overflow-x-scroll">
      <div className="flex flex-col md:flex-row items-center justify-between mx-8">
        <div className="flex flex-col py-6">
          <h2 className="text-black font-bold">{title}</h2>
          <p>{`${tableData.totalRows} ${subtitle}`}</p>
        </div>

        {showToggle && (
          <div className="flex flex-row justify-start md:items-center md:mr-12">
            <Toggle
              value={pageParams.showInactive}
              handleToggle={(checked: boolean) =>
                handlePageParams({ currentPage: 1, showInactive: checked })
              }
              label="Show Inactive"
            />
          </div>
        )}
      </div>
      {/* table-auto will auto resize columns - table fixed looks more consistent */}
      <table className="table-auto w-full">
        <TableHeader
          columns={
            showFunctionColumn
              ? columns
              : columns.filter((itm) => itm.name !== DashboardColumns.FUNCTION)
          }
        />
        {!loading && (
          <TableBody
            rows={
              showFunctionColumn
                ? tableData.rows
                : tableData.rows.map((itm) => ({
                    ...itm,
                    cells: itm.cells.filter(
                      (cell) => cell.columnName !== DashboardColumns.FUNCTION,
                    ),
                  }))
            }
          />
        )}
      </table>
      {loading && (
        <div className="w-full py-64">
          <Loading height="[1/4]" />
        </div>
      )}
      <TableFooter
        pageParams={pageParams}
        tableData={tableData}
        onChange={handlePageParams}
      />
    </div>
  );
};
