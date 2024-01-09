import type { ButtonTypes } from './constants';

export type LinkProps = {
  href: string;
  label: string;
  active?: boolean;
};

export type FooterProps = {
  links: LinkProps[];
};

export type ButtonProps = {
  type: ButtonTypes;
  text: string;
  onClick: () => any;
  disabled?: boolean;
};

export type NavProps = {
  header: string;
  links: LinkProps[];
};
