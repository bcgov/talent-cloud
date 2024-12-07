import { DashboardFilters } from './DashboardFilters';
import { useTable } from '@/hooks';
import { useRoleContext } from '@/providers';
import type { Status } from '@/common';
import { Role } from '@/common';
import { useFilters } from '@/hooks/useFilters';
import { Table, TableFooterNav, TableFooterPageSelect, Tabs } from '@/components';
import { RecommitmentDashBanner } from '@/components/profile/banners/RecommitmentDashBanner';
import { useRecommitmentCycle } from '@/hooks/useRecommitment';

const Dashboard = () => {
  const { recommitmentCycle, isRecommitmentCycleOpen } = useRecommitmentCycle();

  const { program, roles } = useRoleContext();
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
  } = useTable(searchParamsUrl, program);

  return (
    <div className="xl:px-32 xl:pt-8 pb-24">
      {recommitmentCycle && (
        <RecommitmentDashBanner
          recommitment={recommitmentCycle}
          isRecommitmentCycleOpen={isRecommitmentCycleOpen ?? false}
        />
      )}
      <h1 className="pt-16 text-left font-bold">Personnel</h1>
      <DashboardFilters program={program} />
      <div className="overflow-x-scroll border border-slate-500 rounded-md">
        <div className="mt-2  bg-white w-full">
          <div className="text-left py-8  caption-top bg-white">
            <h4 className="font-bold px-4">Search Results</h4>
          </div>

          {roles && roles.includes(Role.COORDINATOR) && (
            <Tabs
              tabs={tabs}
              changeTab={(value: unknown) => {
                handleChangeOne('status', value as Status);
                !loading && setLoading(true);
              }}
            />
          )}
          <Table rows={rows} columns={columns} loading={loading} auto={true} />

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
