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
    <div className="mx-auto max-w-[1388px] overflow-x-scroll">
      <table className="table-auto w-full max-w-[1388px] border-collapse border border-slate-500">
        <thead>
          <th colSpan={columns.length} className="mt-2  bg-white w-full">
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
                className={`px-4 bg-white  border-t-2 border-t-slate-500 text-nowrap  text-dark text-left  py-2 border-b-2 border-b-primaryBlue`}
              >
                <td>{renderName(name)}</td>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row: Row, index: number) => (
            <>
              <th className="hidden"></th>
              {index !== 0 && (
                <tr>
                  <td
                    className={`border-b-2 border-slate-500`}
                    colSpan={columns.length}
                  ></td>
                </tr>
              )}
              <tr key={row.key} id={row.key}>
                {row.cells.map((itm: Cell) => (
                  <>
                    <td
                      scope="row"
                      className="py-4 px-4 text-nowrap truncate max-w-[250px]"
                    >
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
            </>
          ))}
        </tbody>
        <tfoot className="py-4 px-8 ">
          <tr>
            <td
              className={`border-b-2 border-slate-500`}
              colSpan={columns.length}
            ></td>
          </tr>
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
