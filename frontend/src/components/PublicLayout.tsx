import { ReactElement } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';
import { APP_NAME } from '../common';
import { footerLinks } from '../routes';

export const PublicLayout = ({ children }: { children: ReactElement }) => {
  return (
    <div className="bg-secondary flex flex-col justify-between pt-32 h-screen">
      <Header header={APP_NAME} />
      <div className="w-full flex flex-col items-center justify-center">
        {children}
      </div>
      <Footer links={footerLinks} />
    </div>
  );
};
