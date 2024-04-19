import { Navigate, Outlet } from 'react-router-dom';
import Routes from './constants';
import { useKeycloak } from '@react-keycloak/web';
import { Layout } from '@/components';

export const PrivateRoute = () => {
  const { keycloak } = useKeycloak();

  if (!keycloak.authenticated) {
    return <Navigate to={Routes.Home} />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};
