import type { MouseEvent, ReactElement } from 'react';

import type { ButtonTypes } from './enums';

export type LinkProps = {
  href: string;
  label: string;
  active?: boolean;
};

export type FooterProps = {
  links: LinkProps[];
};

export type ButtonProps = {
  variant: ButtonTypes;
  text: string;
  onClick?: (e: MouseEvent<HTMLElement>) => any;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  id?: string;
  loading?: boolean;
  textIcon?: ReactElement;
};

export type NavProps = {
  header: string;
  links: LinkProps[];
};
