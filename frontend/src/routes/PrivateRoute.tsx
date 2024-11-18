import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import { Layout } from '@/components';
import { RoleProvider } from '@/providers';
import { createCustomLoginUrl } from '@/utils/keycloak';
import { Routes } from '.';

const PrivateRoute = () => {
  const { keycloak } = useKeycloak();
  const location = useLocation();
  const { pathname } = location;
  if (pathname === Routes.Root && !keycloak.authenticated) {
    return <Navigate to ={Routes.Home} />
  }
  /**
   * Redirects to login page if user is not authenticated, and then logs in to the current page
   */
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