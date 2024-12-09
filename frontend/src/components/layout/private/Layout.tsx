import type { ReactElement } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';

export const Layout = ({ children }: { children: ReactElement }) => {
  return (
    <div className="h-screen overflow-y-hidden">
      <Header />
      <div className="pt-8 md:pt-32 lg:pt-16 w-full  h-full  bg-white overflow-y-auto">
        {children}
      </div>
      <Footer />
    </div>
  );
};
