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
import { DashboardColumns } from '@/pages/dashboard';

const renderName = (name: string) => {
  if (name === DashboardColumns.SUPERVISOR_APPROVAL) {
    return (
      <td>
        {name.split(' ')[0]}
        <br />
        {name.split(' ')[1]}
      </td>
    );
  }
  if (name === DashboardColumns.TRAVEL) {
    return (
      <td>
        {name.split(' ')[0]}
        <br />
        <span className="text-nowrap">
          {' '}
          {name.split(' ')[1] + ' ' + name.split(' ')[2]}
        </span>
      </td>
    );
  }
  if (name === DashboardColumns.REMOTE) {
    return (
      <td>
        <span>
          {name.split(' ')[0]}
          <br />
          {name.split(' ')[1]}
        </span>
      </td>
    );
  }
  if (name === DashboardColumns.UNION_MEMBERSHIP) {
    return (
      <td>
        <span>
          {name.split(' ')[0]}
          <br />
          {name.split(' ')[1]}
        </span>
      </td>
    );
  }
  if (name === DashboardColumns.FUNCTION) {
    return (
      <td className="flex flex-col">
        <span className="block">
          {name.split(' ')[0]} {name.split(' ')[1]}
        </span>
        <span className="block">{name.split(' ')[2]}</span>
      </td>
    );
  }
  if (name === DashboardColumns.RESPECTFUL) {
    return (
      <td className="flex flex-row  flex-nowrap text-nowrap ">
        {name.split(' ')[0]} <br />
        {name.split(' ')[1]} {name.split(' ')[2]}
      </td>
    )
  }
    if (name === DashboardColumns.WILLINGNESS) {
      return (
        <td className="flex flex-row  flex-nowrap text-nowrap ">
          {name.split(' ')[0]} <br />
          {name.split(' ')[1]}
        </td>
      );
  } else return <td className="flex flex-row  flex-nowrap text-nowrap ">{name}</td>;
};
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
    <table className="table-auto overflow-x-scroll w-auto border-separate border border-slate-100 z-40">
      <thead>
        <tr>
          <th
            colSpan={columns.length}
            className="mt-2 align-left sticky   top-[80px] bg-white w-full h-[80px]"
          >
            <div className="w-full text-left py-8  caption-top bg-white">
              <h4 className="font-bold px-4">Search Results</h4>
            </div>
          </th>
        </tr>

        {role === Role.COORDINATOR && (
          <tr>
            <th
              colSpan={columns.length}
              className="bg-white border-b border-b-separate border-b-slate-100 align-left w-full sticky top-[180px] h-[45px]"
            >
              <Tabs
                onChangeTab={onChangeTab}
                tabs={tabs}
                selectedTab={selectedTab}
                counts={counts}
              />
            </th>
          </tr>
        )}
        <tr>
          <th
            className={`sticky h-[10px] bg-white top-[226px] border-b-1 border-slate-100`}
            colSpan={columns.length}
          ></th>
        </tr>
        <tr
          className={`sticky px-6  bg-white  h-[48px] shadow-blue-gray-900 ${role === Role.COORDINATOR ? ' top-[225px]' : ' top-40'}`}
        >
          {columns.map((name: DashboardColumns) => (
            <th
              key={name}
              scope="col"
              className={` px-6  text-dark text-left  whitespace-wrap w-auto overflow-x-hidden`}
            >
              {renderName(name)}
            </th>
          ))}
        </tr>
        <tr>
          <th
            className={`sticky ${role === Role.COORDINATOR ? ' top-[280px]' : ' top-[210px]'} border-b-2 border-primaryBlue`}
            colSpan={columns.length}
          ></th>
        </tr>
      </thead>

      <tbody>
        {rows.map((row: Row) => (
          <tr key={row.key} id={row.key} className="border border-slate-500">
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
  );
};
