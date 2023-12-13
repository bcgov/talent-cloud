import { useKeycloak } from '@react-keycloak/web';
import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import store from 'store';
import ApplicationRoutes from '../routes/constants';

const KeycloakPage = () => {
  const { keycloak } = useKeycloak();

  useEffect(() => {
    if (keycloak.authenticated) {
      store.set('TOKEN', keycloak.token);
    }
  }, [keycloak.authenticated, keycloak.token]);

  if (keycloak.authenticated) {
    return <Navigate to={store.get('REDIRECT')} />;
  } else if (keycloak.loginRequired) {
    return <Navigate to={ApplicationRoutes.Login} />;
  }
  return <Outlet />;
};
export default KeycloakPage;
