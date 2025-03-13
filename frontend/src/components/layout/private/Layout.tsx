import type { ReactElement } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';

export const Layout = ({ children }: { children: ReactElement }) => {
  return (
    <div className="h-screen overflow-y-hidden flex flex-col justify-between">
      <Header />
      <div className="w-full h-full  pt-20 bg-white overflow-y-auto relative flex flex-col justify-between">
        <div>{children}</div>
        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
};
