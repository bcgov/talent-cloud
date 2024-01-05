import { useKeycloak } from '@react-keycloak/web';
import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import store from 'store';
import Routes from './constants';
import { Layout } from '../components';
import { useGetUserInfo } from '../hooks';
export const PrivateRoute = () => {
  const { username, roles } = useGetUserInfo();

  const { keycloak } = useKeycloak();
  const authenticated = keycloak.authenticated;
  useEffect(() => {
    if (keycloak.authenticated) {
      store.set('TOKEN', keycloak.token);
    }
  }, [keycloak.authenticated, keycloak.token]);

  if (!keycloak.authenticated) {
    return <Navigate to={Routes.Login} />;
  }
  if (keycloak.authenticated && !roles.includes('coordinator')) {
    return (
      <Layout authenticated={authenticated} username={username}>
        <Forbidden />
      </Layout>
    );
  } else {
    return (
      <Layout authenticated={authenticated} username={username}>
        <Outlet />
      </Layout>
    );
  }
};

const Forbidden = () => {
  return <div>Forbidden</div>;
};
