import type { ReactElement } from 'react';
import { Header } from '../header';
import { APP_NAME } from '../../common';
import { footerLinks } from '../../routes/links';
import { Footer } from '.';

export const Layout = ({
  children,
  authenticated,
  username,
}: {
  children: ReactElement;
  authenticated?: boolean | undefined;
  username?: string;
}) => {
  return (
    <div className=" h-screen relative">
      <Header
        appName={APP_NAME}
        username={username ?? ''}
        authenticated={authenticated}
      />
      <div
        className={['w-full', authenticated ? 'bg-white' : 'bg-primaryBlue'].join(
          ', ',
        )}
      >
        {children}
      </div>

      <Footer links={footerLinks} />
    </div>
  );
};
