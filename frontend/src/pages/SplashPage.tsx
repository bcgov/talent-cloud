import { Layout } from '@/components';
import { Routes } from '@/routes';
import { useKeycloak } from '@react-keycloak/web';
import { useEffect } from 'react';

const SplashPage = () => {
  const { keycloak } = useKeycloak();
  useEffect(() => {
    if (keycloak.authenticated) {
      window.location.replace(Routes.Dashboard);
    } else {
      //TODO remove this once we have a splash page
      window.location.replace(Routes.Login);
    }
  }, []);

  return (
    <Layout>
      <h1>Splash Page</h1>
    </Layout>
  );
};

export default SplashPage;
