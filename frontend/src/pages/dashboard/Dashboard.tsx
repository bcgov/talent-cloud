import { DashboardFilters } from './DashboardFilters';
import { useRole, useTable } from '@/hooks';
import type { Status } from '@/common';
import { Role } from '@/common';
import { useFilters } from '@/hooks/useFilters';
import { Table, TableFooterNav, TableFooterPageSelect, Tabs } from '@/components';

const Dashboard = () => {
  const { route, role } = useRole();
  const { searchParamsUrl, handleChangeOne } = useFilters();
  const {
    totalRows,
    rowsPerPage,
    currentPage,
    tabs,
    rows,
    columns,
    loading,
    setLoading,
  } = useTable(searchParamsUrl, route);

  return (
    <div className="mx-auto md:px-12 xl:px-32  2xl:px-64   pt-32 pb-24">
      <h1 className="text-left font-bold">Personnel</h1>
      <DashboardFilters route={route} />
      <div className="overflow-x-scroll border border-slate-500 rounded-md">
        <div className="mt-2  bg-white w-full">
          <div className="text-left py-8  caption-top bg-white">
            <h4 className="font-bold px-4">Search Results</h4>
          </div>

          {role === Role.COORDINATOR && (
            <Tabs
              tabs={tabs}
              changeTab={(value: unknown) => {
                handleChangeOne('status', value as Status);
                !loading && setLoading(true);
              }}
            />
          )}
          <Table rows={rows} columns={columns} loading={loading} />

          <div className="flex flex-row justify-between p-4">
            <TableFooterPageSelect
              totalRows={totalRows}
              rowsPerPage={rowsPerPage}
              handleChangeNumRows={(e: React.ChangeEvent<any>) =>
                handleChangeOne('rows', e.target.value)
              }
            />

            <TableFooterNav
              totalRows={totalRows}
              rowsPerPage={rowsPerPage}
              currentPage={currentPage}
              handleChangePage={(page: number) =>
                handleChangeOne('page', page.toString())
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
