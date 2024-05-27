import { Role, Status } from '@/common';
import {
  TableBody,
  TableFooterNav,
  TableFooterPageSelect,
  Tabs,
} from '@/components';
import type { DashboardColumns } from '@/pages/dashboard';
import { renderName } from './helpers';
import type { Route } from '@/providers';
import { useTable } from '@/hooks/useTable';
import { useFilters } from '@/hooks/useFilters';

export const Table = ({ role, route }: { role?: Role; route?: Route }) => {
  const { searchParamsUrl, handleChange } = useFilters();

  const {
    loading,

    rows,
    columns,

    tabs,
    selectedTab,
    changeTab,

    currentPage,
    rowsPerPage,
    totalRows,
  } = useTable(searchParamsUrl, route);

  return (
    <div className="mx-auto max-w-[1388px] overflow-x-scroll">
      <table className="table-auto w-full max-w-[1388px] border-collapse border border-slate-500">
        <thead>
          <tr>
            <th colSpan={columns?.length} className="mt-2  bg-white w-full">
              <div className="text-left py-8  caption-top bg-white">
                <h4 className="font-bold px-4">Search Results</h4>
              </div>
            </th>
          </tr>
          <tr>
            <th colSpan={columns?.length} className="mt-2  bg-white w-full">
              {role === Role.COORDINATOR && (
                <Tabs
                  onChangeTab={(index) => {
                    changeTab(index);
                    tabs[index].value &&
                      handleChange(
                        'status',
                        Status[tabs[index].value as keyof typeof Status],
                      );
                  }}
                  tabs={tabs}
                  selectedTab={selectedTab}
                />
              )}
            </th>
          </tr>
          <tr>
            {columns?.map((name: DashboardColumns) => (
              <th
                key={name}
                scope="col"
                className={`px-4 bg-white  border-t-2 border-t-slate-500 text-nowrap  text-dark text-left  py-2 border-b-2 border-b-primaryBlue`}
              >
                {renderName(name)}
              </th>
            ))}
          </tr>
        </thead>

        <TableBody rows={rows} columns={columns} loading={loading} />

        <tfoot className="py-4 px-8 ">
          <tr>
            <td
              className={`border-b-2 border-slate-500`}
              colSpan={columns?.length}
            ></td>
          </tr>
          <tr>
            <th
              colSpan={columns && columns?.length - 2}
              scope="row"
              className="px-8 h-[80px]"
            >
              <TableFooterPageSelect
                totalRows={totalRows ?? 0}
                rowsPerPage={rowsPerPage}
                handleChangeNumRows={(e) => handleChange('rows', e.target.value)}
              />
            </th>
            <td colSpan={2} className="align-right">
              <TableFooterNav
                pageParams={{
                  totalRows: totalRows ?? 0,
                  rowsPerPage: rowsPerPage,
                  currentPage: currentPage,
                }}
                handleChangePage={(page) => handleChange('page', page.toString())}
              />
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
