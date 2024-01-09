import { ReactElement } from 'react';
import React from 'react';
import { Footer } from './Footer';
import { Header } from './Header';
import { Navigation } from './Navigation';
import { APP_NAME } from '../../common';
import { footerLinks } from '../../routes/links';

type Link = {
  href: string;
  label: string;
};

export const Layout = ({
  children,
  navLinks,
}: {
  children: ReactElement;
  navLinks?: Link[];
}) => {
  return (
    <div
      className={[
        navLinks ? 'bg-primary ' : 'bg-blue ',
        ' flex flex-col justify-between pt-32 h-screen ',
      ].join(',')}
    >
      <Header header={APP_NAME} />
      {navLinks && <Navigation links={navLinks} header={APP_NAME} />}
      <div className="w-full flex flex-col items-center justify-center">
        {children}
      </div>
      <Footer links={footerLinks} />
    </div>
  );
};
