import { DashboardColumns } from '@/pages/dashboard';
import type { Column, PageParams, TableData } from '.';
import { TableFooter, TableBody, TableHeader } from '.';
import { Toggle } from '../toggle/Toggle';

export const Table = ({
  title,
  subtitle,
  columns,
  tableData,
  pageParams,
  showToggle,
  handlePageParams,
  showFunctionColumn,
}: {
  title: string;
  subtitle: string;
  columns: Column[];
  tableData: TableData;
  pageParams: PageParams;
  showToggle: boolean;
  handlePageParams: (params: Partial<PageParams>) => void;
  showFunctionColumn: boolean;
}) => {
  return (
    <div className="shadow-lg rounded-md w-full bg-white border border-gray  overflow-x-scroll">
      <div className="flex flex-col md:flex-row items-center justify-between mx-8">
        <div className="flex flex-col py-6">
          <h4 className="text-black font-bold">{title}</h4>
          <p>{`${tableData.totalRows} ${subtitle}`}</p>
        </div>

        {showToggle && (
          <Toggle
            value={pageParams.showInactive}
            handleToggle={(checked: boolean) =>
              handlePageParams({ showInactive: checked })
            }
          />
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
      </table>
      <TableFooter
        pageParams={pageParams}
        tableData={tableData}
        onChange={handlePageParams}
      />
    </div>
  );
};
