import { Table } from '@/components';
import { dashboardFields, dashboardToggle, dashboardColumns } from './constants';
import { v4 as uuidv4 } from 'uuid';

const Dashboard = () => {
  const title = 'Search Results';
  const subtitle = 'Results Found';
  const columns = dashboardColumns.map((itm: string) => ({
    name: itm,
    key: uuidv4(),
  }));

  return (
    <div className="mx-auto max-w-[1388px]  pt-32 pb-24">
      <h2 className="text-left">Personnel</h2>
      <Table
        title={title}
        subtitle={subtitle}
        toggle={dashboardToggle}
        fields={dashboardFields}
        columns={columns}
      />
    </div>
  );
};

export default Dashboard;
