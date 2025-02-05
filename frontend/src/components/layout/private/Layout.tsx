import type { ReactElement } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';

export const Layout = ({ children }: { children: ReactElement }) => {
  return (
    <div className="h-screen overflow-y-hidden">
      <Header />

      <div className="pt-8 md:pt-32 lg:pt-16 w-full  h-full  bg-white overflow-y-auto">
        <div className="h-auto lg:min-h-[1200px] min-h-[1000px]">{children}</div>
        <Footer />
      </div>
    </div>
  );
};
