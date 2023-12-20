import { dashboardColumns } from './const';
import { Loading } from '../components';
import { Table } from '../components/Table';
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
