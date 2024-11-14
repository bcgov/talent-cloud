import type { ReactElement } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { Footer } from './Footer';
import { Header } from './Header';

export const Layout = ({ children }: { children: ReactElement }) => {

  return (
    <div className="min-h-screen flex flex-col">
      <Header  />
      <div className="w-full  mt-12 bg-white">{children}</div>
      <Footer />
    </div>
  );
};
