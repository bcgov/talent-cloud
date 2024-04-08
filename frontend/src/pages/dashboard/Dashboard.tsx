import { Loading, Table, Tabs } from '@/components';
import { Filters } from './DashboardFilters';
import { useTable } from '@/hooks';

const Dashboard = () => {
  const {
    filterValues,
    tableData,
    handleMultiSelect,
    handleSingleSelect,
    handleSearch,
    onClear,
    handlePageParams,
    dashboardColumns,
    tabs,
    onChangeTab,
    handleClose,
    handleCloseMany,
    handleSetDates,
    resetType,
    loading,
  } = useTable();

  return (
    <div className="mx-auto max-w-[1388px]  pt-32 pb-24">
      <h1 className="text-left font-bold">Personnel</h1>
      <Filters
        handleSetDates={handleSetDates}
        handleMultiSelect={handleMultiSelect}
        handleSingleSelect={handleSingleSelect}
        onClear={onClear}
        filterValues={filterValues}
        handleSearch={handleSearch}
        handleClose={handleClose}
        handleCloseMany={handleCloseMany}
        resetType={resetType}
      />

      <div className="w-full text-left py-8  sticky top-0 caption-top bg-white">
        <h2 className="font-bold px-4">Search Results</h2>
      </div>
      <Tabs onChangeTab={onChangeTab} data={tabs}>
        <Table
          tableData={tableData}
          columns={dashboardColumns}
          pageParams={filterValues}
          handlePageParams={handlePageParams}
        />
      </Tabs>
      {loading && (
        <div className="w-full py-64">
          <Loading height="[1/4]" />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
