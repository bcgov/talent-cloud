import { Outlet, useLocation } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import { Layout } from '@/components';
import { createCustomLoginUrl } from '@/utils/keycloak';

const PrivateRoute = () => {
  const { keycloak } = useKeycloak();
  const location = useLocation();
  /**
   * Redirects to login page if user is not authenticated, and then logs in to the current page
   */
  const login = () => {
    window.location.replace(createCustomLoginUrl(keycloak, location.pathname, ''));
  };

  if (keycloak && !keycloak.authenticated) {
    login();
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};
export default PrivateRoute;
