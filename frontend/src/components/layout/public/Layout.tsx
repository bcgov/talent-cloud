import type { ReactElement } from 'react';
import { Banner } from './Banner';
import { Footer } from './Footer';
import { Header } from './Header';
import { footer, landAcknowledgement } from '../constants';

export const PublicLayout = ({ children }: { children: ReactElement }) => {
  return (
    <div className="bg-white h-screen overflow-y-hidden">
      <Header />
      <div className="h-full overflow-y-auto">
        <div className="h-auto lg:min-h-[1200px] min-h-[1000px]">{children}</div>

        <Banner content={landAcknowledgement} />
        <Footer content={footer} />
      </div>
    </div>
  );
};
