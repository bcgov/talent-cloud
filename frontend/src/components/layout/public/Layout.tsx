import type { ReactElement } from 'react';
import { Banner } from './Banner';
import { Footer } from './Footer';
import { Header } from './Header';
import { footer, landAcknowledgement } from '../constants';

export const PublicLayout = ({ children }: { children: ReactElement }) => {
  return (
    <div className="bg-white h-screen">
      <Header />
      {children}
      <Banner content={landAcknowledgement} />
      <Footer content={footer} />
    </div>
  );
};
