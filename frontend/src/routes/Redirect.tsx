import { Role } from '@/common';
import { useRoleContext } from '@/providers';
import { Navigate } from 'react-router-dom';
import { Routes } from '.';
import { Loading } from '@/components';

const Redirect = () => {
  const { roles, loading } = useRoleContext();
  if (loading) {
    return <Loading />;
  }
  if (
    (roles && roles?.includes(Role.COORDINATOR)) ||
    roles?.includes(Role.LOGISTICS)
  ) {
    return <Navigate to={Routes.Dashboard} />;
  }
  if (roles && roles?.includes(Role.SUPERVISOR)) {
    return <Navigate to={Routes.SupervisorDashboard} />;
  }
  if (roles && roles?.includes(Role.MEMBER)) {
    return <Navigate to={Routes.MemberProfile} />;
  }
};

export default Redirect;
