import { Routes } from '@/routes';
import { useKeycloak } from '@react-keycloak/web';
import { useEffect } from 'react';
import { main, landAcknowledgement, footer } from './constants';
import { SplashFooter } from './SplashFooter';
import { SplashMain } from './SplashMain';
import { SplashBanner } from './SplashBanner';

const SplashPage = () => {
  const { keycloak } = useKeycloak();
  useEffect(() => {
    if (keycloak.authenticated) {
      window.location.replace(Routes.Dashboard);
    }
  }, []);

  return (
    <div className="bg-white h-screen pt-2">
      <SplashMain content={main} />
      <SplashBanner content={landAcknowledgement} />
      <SplashFooter content={footer} />
    </div>
  );
};

export default SplashPage;
