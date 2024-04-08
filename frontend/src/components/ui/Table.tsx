import type { Cell, Column, PageParams, Row, TableData } from '@/components';
import {
  TableBodyCell,
  TableFooterNav,
  TableFooterPageSelect,
  TableHeader,
} from '@/components';
import type { DashboardFilters } from '@/pages/dashboard';

export const Table = ({
  pageParams,
  handlePageParams,
  tableData,
  columns,
}: {
  pageParams: PageParams;
  handlePageParams: (data: Partial<DashboardFilters>) => void;
  tableData: TableData;
  columns: Column[];
}) => {
  const { rows, totalRows } = tableData;
  console.log(tableData.rows.length);

  return (
    <table className="border border-separate border-spacing-0 order-slate-400 shadow-lg rounded-md w-full bg-white ">
      <TableHeader columns={columns} />

      <tbody>
        {rows.map((row: Row) => (
          <tr key={row.key}>
            {row.cells.map((itm: Cell) => (
              <TableBodyCell
                key={itm.key}
                cell={itm}
                id={row.key}
                status={row.status}
              />
            ))}
          </tr>
        ))}
      </tbody>

      <tfoot className="py-4 px-8 border border-t-2 border-gray-600">
        <tr>
          <th colSpan={columns.length - 2} scope="row" className="px-8 h-[80px]">
            <TableFooterPageSelect
              totalRows={totalRows}
              onChange={handlePageParams}
            />
          </th>
          <td colSpan={2} className="align-right">
            <TableFooterNav
              pageParams={pageParams}
              onChange={handlePageParams}
              tableData={tableData}
            />
          </td>
        </tr>
      </tfoot>
    </table>
  );
};
