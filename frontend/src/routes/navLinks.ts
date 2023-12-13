import { LinkProps } from '../components';
import Routes from '../routes/constants';

export const navLinks: LinkProps[] = [
  { href: Routes.AppHealth, label: 'Home' },
  { href: Routes.Dashboard, label: 'Dashboard' },
  { href: Routes.Profile, label: 'Profile' },
];
