import { Navigate, Outlet } from 'react-router-dom';
import Routes from './constants';
import type { Role } from '@/common';
import { useRoleContext } from '@/providers';
import { useKeycloak } from '@react-keycloak/web';
import { Loading } from '@/components';

const RoleProtectedRoute = ({ allowedRoles }: { allowedRoles?: Role[] }) => {
  const { roles, loading } = useRoleContext();
  const { keycloak } = useKeycloak();

  if (loading) {
    return <Loading />;
  }

  if (!keycloak.authenticated) {
    return <Navigate to={Routes.Unauthenticated} />;
  }

  if (roles && !roles.find((role) => allowedRoles?.includes(role))) {
    return <Navigate to={Routes.Unauthorized} />;
  }
  return <Outlet />;
};

export default RoleProtectedRoute;
