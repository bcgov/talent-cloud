import { Loading, Table } from '@/components';
import { Filters } from './DashboardFilters';
import { useRole, useTable } from '@/hooks';

const Dashboard = () => {
  const { route, role } = useRole();

  const {
    columns,
    tableData,
    filterValues,
    loading,
    counts,
    tabs,
    rows,
    selectedTab,
    changeHandlers,
  } = useTable(route);
  return (
    <div className="mx-auto max-w-[1388px]  pt-32 pb-24">
      <h1 className="text-left font-bold">Personnel</h1>
      <Filters
        route={route}
        changeHandlers={changeHandlers}
        filterValues={filterValues}
      />

      <Table
        tableData={tableData}
        pageParams={filterValues}
        handlePageParams={changeHandlers.handlePageParams}
        handleChangeRowsPerPage={changeHandlers.handleChangeRowsPerPage}
        columns={columns}
        rows={rows}
        onChangeTab={changeHandlers.onChangeTab}
        tabs={tabs}
        selectedTab={selectedTab}
        counts={counts}
        role={role}
        route={route}
      />

      {loading && (
        <div className="w-full py-64">
          <Loading height="[1/4]" />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
