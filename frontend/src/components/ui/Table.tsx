import { Role } from '@/common';
import type {
  Cell,
  PageParams,
  Row,
  TabCount,
  TabData,
  TableData,
} from '@/components';
import {
  TableBodyCell,
  TableFooterNav,
  TableFooterPageSelect,
  Tabs,
} from '@/components';
import type { DashboardFilters } from '@/pages/dashboard';
import type { DashboardColumns } from '@/pages/dashboard';
import { renderName } from './helpers';

export const Table = ({
  pageParams,
  handlePageParams,
  handleChangeRowsPerPage,
  tableData,
  columns,
  onChangeTab,
  tabs,
  selectedTab,
  counts,
  role,
}: {
  pageParams: PageParams;
  handlePageParams: (data: Partial<DashboardFilters>) => void;
  handleChangeRowsPerPage: (data: Partial<DashboardFilters>) => void;
  tableData: TableData;
  columns: DashboardColumns[];
  onChangeTab: (index: number) => void;
  tabs: TabData[];
  selectedTab: number;
  counts: TabCount;
  role?: Role;
}) => {
  const { rows, totalRows } = tableData;

  return (
    <div className="mx-auto max-w-[1388px]">
      <table className="table-auto w-full max-w-[1388px] overflow-x-hidden border-separate border border-slate-500">
        <thead>
          <th
            colSpan={columns.length + 1}
            className="mt-2 sticky   top-[80px] bg-white w-full  border-2 border-slate-500"
          >
            <div className="text-left py-8  caption-top bg-white">
              <h4 className="font-bold px-4">Search Results</h4>
            </div>
            {role === Role.COORDINATOR && (
              <Tabs
                onChangeTab={onChangeTab}
                tabs={tabs}
                selectedTab={selectedTab}
                counts={counts}
              />
            )}
          </th>
        </thead>
        <thead>
          <tr>
            <th className="hidden"></th>
            {columns.map((name: DashboardColumns) => (
              <th
                key={name}
                scope="col"
                className={`sticky px-6  bg-white  h-[48px] ${role === Role.COORDINATOR ? ' top-[225px]' : ' top-40'} px-6  text-dark text-left  `}
              >
                {renderName(name)}
              </th>
            ))}
          </tr>
          <tr>
            <th
              className={`sticky ${role === Role.COORDINATOR ? ' top-[280px]' : ' top-[210px]'} border-b-2 border-primaryBlue`}
              colSpan={columns.length + 1}
            ></th>
          </tr>
        </thead>
        <tbody>
          <th className="hidden"></th>
          {rows.map((row: Row) => (
            <tr
              key={row.key}
              id={row.key}
              className="divide divide-y-2 h-[58px] max-w-[1388px]"
            >
              {row.cells.map((itm: Cell) => (
                <>
                  <td scope="row" className="py-2 text-nowrap">
                    <TableBodyCell
                      key={itm.key}
                      cell={itm}
                      id={row.key}
                      status={row.status}
                    />
                  </td>
                </>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot className="py-4 px-8 ">
          <tr>
            <th colSpan={columns.length - 2} scope="row" className="px-8 h-[80px]">
              <TableFooterPageSelect
                totalRows={totalRows}
                onChange={handleChangeRowsPerPage}
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
    </div>
  );
};
