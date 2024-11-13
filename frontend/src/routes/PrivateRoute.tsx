import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import { Layout } from '@/components';
import { RoleProvider } from '@/providers';
import { createCustomLoginUrl } from '@/utils/keycloak';

const PrivateRoute = () => {
  const { keycloak } = useKeycloak();
  const location = useLocation();

  const login = () => {
    window.location.replace(createCustomLoginUrl(keycloak, location.pathname, ''));
  };

  if (!keycloak.authenticated) {
    login();
  }

  return (
    <RoleProvider>
      <Layout>
        <Outlet />
      </Layout>   
      </RoleProvider> 
  );
};
export default PrivateRoute