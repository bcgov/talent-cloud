import { useKeycloak } from '@react-keycloak/web';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const ProtectedRoutes = () => {
  const location = useLocation();
  const { keycloak } = useKeycloak();
  if (!keycloak.authenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return <Outlet />;
};
