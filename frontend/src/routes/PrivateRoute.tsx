import { Navigate, Outlet } from 'react-router-dom';
import { Layout } from '@/components';
import { useRole } from '@/hooks';
import { useKeycloak } from '@react-keycloak/web';
import { Routes } from '.';
import { RoleProvider } from '@/providers/Role';

export const PrivateRoute = () => {
  const { role, route } = useRole();
  const { keycloak } = useKeycloak();

  if (!keycloak.authenticated) {
    return <Navigate to={Routes.Home} replace />;
  } else if (!role && !route) {
    return <Navigate to={Routes.Unauthorized} replace />;
  } else {
    return (
      <RoleProvider>
        <Layout>
          <Outlet />
        </Layout>
      </RoleProvider>
    );
  }
};
