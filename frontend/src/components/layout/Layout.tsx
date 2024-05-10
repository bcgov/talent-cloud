import type { ReactElement } from 'react';
import { Header } from '../header';
import { APP_NAME } from '../../common';
import { Footer } from '.';
import { useKeycloak } from '@react-keycloak/web';

export const Layout = ({ children }: { children: ReactElement }) => {
  const { keycloak } = useKeycloak();

  return (
    <div className="min-h-screen flex flex-col">
      <Header appName={APP_NAME} authenticated={keycloak.authenticated} />
      <div
        className={[
          'w-full  mt-12 ',
          keycloak.authenticated ? ' bg-white' : ' bg-primaryBlue',
        ].join(', ')}
      >
        {children}
      </div>
      {keycloak.authenticated && <Footer />}
    </div>
  );
};
