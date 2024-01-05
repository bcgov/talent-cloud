import { ReactElement } from 'react';
import React from 'react';
import { APP_NAME } from '../../common';
import { footerLinks } from '../../routes/links';
import { Footer, Header } from '.';

type Link = {
  href: string;
  label: string;
};

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
    <div
      className={[
        authenticated ? 'bg-primary ' : 'bg-blue ',
        ' flex flex-col justify-between pt-32 h-screen ',
      ].join(',')}
    >
      <Header
        appName={APP_NAME}
        username={username ?? ''}
        authenticated={authenticated}
      />
      <div className="w-full flex flex-col items-center justify-center">
        {children}
      </div>
      <Footer links={footerLinks} />
    </div>
  );
};
