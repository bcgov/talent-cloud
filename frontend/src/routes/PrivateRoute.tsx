import { useKeycloak } from '@react-keycloak/web';
import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import store from 'store';
import Routes from './constants';
import { Layout } from '../components';
import { useRole } from '@/hooks';

export const PrivateRoute = () => {
  const { username } = useRole();

  const { keycloak } = useKeycloak();
  const authenticated = keycloak.authenticated;

  useEffect(() => {
    if (keycloak.authenticated) {
      store.set('TOKEN', keycloak.token);
    }
  }, [keycloak.authenticated, keycloak.token]);

  if (!keycloak.authenticated) {
    return <Navigate to={Routes.Home} />;
  }

  return (
    <Layout authenticated={authenticated} username={username}>
      <Outlet />
    </Layout>
  );
};
