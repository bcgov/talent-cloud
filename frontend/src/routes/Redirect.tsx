import { Role } from '@/common';
import { useRoleContext } from '@/providers';
import { Navigate } from 'react-router-dom';
import { Routes } from '.';
import { Loading } from '@/components';
import { useKeycloak } from '@react-keycloak/web';

const Redirect = () => {
  const { roles, loading } = useRoleContext();
  const { keycloak } = useKeycloak();

  if (loading) {
    return <Loading />;
  }
  if (!keycloak.authenticated) {
    return <Navigate to={Routes.Home} />;
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
  if (!roles) {
    return <Navigate to={Routes.Unauthenticated} />;
  }
};

export default Redirect;
