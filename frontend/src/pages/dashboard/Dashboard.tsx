import { Loading, Table } from '@/components';
import {
  dashboardToggle,
  dashboardColumns,
  dashboardFilterFields,
} from './constants';
import { v4 as uuidv4 } from 'uuid';
import { Filters } from './DashboardFilters';
import useTable from '@/hooks/useTable';

const Dashboard = () => {
  const title = 'Search Results';
  const subtitle = 'Results Found';
  const columns = dashboardColumns.map((itm: string) => ({
    name: itm,
    key: uuidv4(),
  }));
  const {
    filterValues,
    pageParams,
    tableData,
    onChange,

    handleClose,
    handleCloseMultiple,
    handlePageParams,
    onClear,
  } = useTable();

  return (
    <div className="mx-auto max-w-[1388px]  pt-32 pb-24">
      <h2 className="text-left">Personnel</h2>
      <Filters
        fields={dashboardFilterFields}
        onChange={onChange}
        handleClose={handleClose}
        handleCloseMultiple={handleCloseMultiple}
        onClear={onClear}
        filterValues={filterValues}
      />

      {!tableData ? (
        <Loading />
      ) : (
        <Table
          title={title}
          subtitle={subtitle}
          toggle={dashboardToggle}
          columns={columns}
          tableData={tableData}
          pageParams={pageParams}
          handlePageParams={handlePageParams}
        />
      )}
    </div>
  );
};

export default Dashboard;
