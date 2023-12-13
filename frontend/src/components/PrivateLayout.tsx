import { ReactElement } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';
import { Navigation } from './Navigation';
import { APP_NAME } from '../common';
import { privateNavLinks, footerLinks } from '../routes';

export const PrivateLayout = ({ children }: { children: ReactElement }) => {
  return (
    <div className="bg-primary flex flex-col justify-between pt-32 h-screen">
      <Header header={APP_NAME} />
      <Navigation links={privateNavLinks} header={APP_NAME} />
      <div className="w-full flex flex-col items-center justify-center">
        {children}
      </div>
      <Footer links={footerLinks} />
    </div>
  );
};
