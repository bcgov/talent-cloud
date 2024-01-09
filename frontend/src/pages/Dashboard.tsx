import { Loading } from '../components';
import { dashboardColumns } from '../components/table/columns';
import { Table } from '../components/table/Table';
import useTable from '../hooks/useTable';

const Dashboard = () => {
  const { pageRange, pageData, totalRows, searchParams, handleParamsChange } =
    useTable();

  return (
    <>
      {pageData && totalRows ? (
        <Table
          pageRange={pageRange}
          pageData={pageData}
          totalRows={totalRows}
          searchParams={searchParams}
          handleParamsChange={handleParamsChange}
          columns={dashboardColumns}
        />
      ) : (
        <Loading />
      )}
    </>
  );
};
export default Dashboard;
