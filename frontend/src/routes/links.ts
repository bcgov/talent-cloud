import Routes from './constants';
import { LinkProps } from '../common';

export const footerLinks: LinkProps[] = [
  { href: './Home', label: 'Home' },
  { href: './Disclaimer', label: 'Disclaimer' },
  { href: './Privacy', label: 'Privacy' },
  { href: './Accessibility', label: 'Accessibility' },
  { href: './Copyright', label: 'Copyright' },
  { href: './Us', label: 'Us' },
];

export const coordinatorNavLinks: LinkProps[] = [
  { href: Routes.AppHealth, label: 'Home' },
  { href: Routes.Dashboard, label: 'Dashboard' },
  { href: Routes.Profile, label: 'Profile' },
];

export const navLinks: LinkProps[] = [{ href: Routes.LandingPage, label: 'Home' }];
