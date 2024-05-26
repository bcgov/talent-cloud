import { Table } from '@/components';
import { DashboardFilters } from './DashboardFilters';
import { useRole } from '@/hooks';

const Dashboard = () => {
  const { route, role } = useRole();

  return (
    <div className="mx-auto max-w-[1388px]  pt-32 pb-24">
      <h1 className="text-left font-bold">Personnel</h1>
      <DashboardFilters route={route} />
      <Table role={role} route={route} />
    </div>
  );
};

export default Dashboard;
