import { Table } from '@/components';
import { Filters } from './DashboardFilters';
import { Role } from '@/common';
import { useRole, useTable } from '@/hooks';

const Dashboard = () => {
  const title = 'Search Results';
  const subtitle = 'members found';

  const {
    filterValues,
    tableData,
    handleMultiSelect,
    handleSingleSelect,
    handleSearch,
    handlePageParams,
    onClear,
    dashboardColumns,
    showFunctionColumn,
    handleClose,
    handleCloseMany,
    handleSetDates,
    resetType,
  } = useTable();
  const { role } = useRole();

  return (
    <div className="mx-auto max-w-[1388px]  pt-32 pb-24">
      <h2 className="text-left font-bold">Personnel</h2>
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

      <Table
        title={title}
        subtitle={subtitle}
        showToggle={role === Role.COORDINATOR}
        columns={dashboardColumns}
        tableData={tableData}
        pageParams={filterValues}
        handlePageParams={handlePageParams}
        showFunctionColumn={showFunctionColumn}
      />
    </div>
  );
};

export default Dashboard;
