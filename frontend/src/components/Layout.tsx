import { ReactElement } from 'react';
import { Footer } from './Footer';
import { Navigation } from './Navigation';
import { navLinks, footerLinks } from '../routes';

export const Layout = ({ children }: { children: ReactElement }) => {
  return (
    <div className="bg-primary flex flex-col justify-between pt-32 h-screen">
      <Navigation links={navLinks} header="Teams Resource Management" />
      <div className="w-full flex flex-col items-center justify-center">
        {children}
      </div>
      <Footer links={footerLinks} />
    </div>
  );
};
