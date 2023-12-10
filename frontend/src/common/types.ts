import { ButtonTypes, LinkTypes } from './constants';

export type LinkProps = {
  href: string;
  label: string;
  type?: LinkTypes;
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
