import { Role } from '@/common';
import { useRoleContext } from '@/providers';
import { Navigate, Outlet } from 'react-router';
import { Routes } from '.';
import { useKeycloak } from '@react-keycloak/web';
import { Loading } from '@/components';

const Redirect = () => {
  const { role, loading } = useRoleContext();
  const { keycloak } = useKeycloak();

  if (!keycloak.authenticated) {
    return <Navigate to={Routes.Home} />;
  }
  if (loading) {
    return <Loading />;
  }
  if (role === Role.COORDINATOR || role === Role.LOGISTICS) {
    return <Navigate to={Routes.Dashboard} />;
  } else if (role === Role.SUPERVISOR) {
    return <Navigate to={Routes.SupervisorDashboard} />;
  } else if (role === Role.MEMBER) {
    return <Navigate to={Routes.MemberProfile} />;
  }
  return <Outlet />;
};

export default Redirect;
