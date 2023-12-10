import React from 'react';
import { Footer } from './Footer';
import { Loading } from './Loading';
import { Navigation } from './Navigation';
import { footerLinks, navLinks } from '../routes';

type LayoutProps = {
  children: React.ReactElement;
  isLoading: boolean;
};

const Layout = ({ children, isLoading }: LayoutProps) => {
  return (
    <div className="bg-primary flex flex-col justify-between pt-32 h-screen">
      <Navigation links={navLinks} header="Teams Resource Management" />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          {children}
        </div>
      )}
      <Footer links={footerLinks} />
    </div>
  );
};
export default Layout;
