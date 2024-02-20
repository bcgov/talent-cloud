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
  username?: string;
  authenticated?: boolean;
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header
        appName={APP_NAME}
        username={username ?? ''}
        authenticated={authenticated}
      />
      <div
        className={[
          'w-full  mt-12 ',
          authenticated ? ' bg-white' : ' bg-primaryBlue',
        ].join(', ')}
      >
        {children}
      </div>
      {authenticated && <Footer links={footerLinks} />}
    </div>
  );
};
