import { LinkProps } from '../components';
import Routes from '../routes/constants';

export const privateNavLinks: LinkProps[] = [
  { href: Routes.AppHealth, label: 'Home' },
  { href: Routes.Dashboard, label: 'Dashboard' },
  { href: Routes.Profile, label: 'Profile' },
];

export const publicNavLinks: LinkProps[] = [
  { href: Routes.LandingPage, label: 'Home' },
];
