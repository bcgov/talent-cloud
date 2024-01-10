import { Loading } from '../components';
import { Table } from '../components/table/Table';
import useTable from '../hooks/useTable';

const Dashboard = () => {
  const { pageRange, tableData, totalRows, searchParams, handleParamsChange } =
    useTable();

  return (
    <>
      {tableData && totalRows ? (
        <Table
          pageRange={pageRange}
          tableData={tableData}
          totalRows={totalRows}
          searchParams={searchParams}
          handleParamsChange={handleParamsChange}
        />
      ) : (
        <Loading />
      )}
    </>
  );
};
export default Dashboard;
