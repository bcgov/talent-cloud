import { Role } from '@/common';
import { useRoleContext } from '@/providers';
import { Navigate, Outlet } from 'react-router-dom';
import { Routes } from '.';
import { useKeycloak } from '@react-keycloak/web';
import { Loading } from '@/components';

const Redirect = () => {
  const { roles, loading } = useRoleContext();
  const { keycloak } = useKeycloak();

  if (!keycloak.authenticated) {
    return <Navigate to={Routes.Home} />;
  }
  if (loading) {
    return <Loading />;
  }
  if (roles?.includes(Role.COORDINATOR) || roles?.includes(Role.LOGISTICS)) {
    return <Navigate to={Routes.Dashboard} />;
  }
  if (roles?.includes(Role.SUPERVISOR)) {
    return <Navigate to={Routes.SupervisorDashboard} />;
  }
  if (roles?.includes(Role.MEMBER)) {
    return <Navigate to={Routes.MemberProfile} />;
  }
  return <Outlet />;
};

export default Redirect;
