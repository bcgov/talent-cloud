import { Link } from 'react-router-dom';
import { UserMenu } from './UserMenu';
import { CloudIcon, EmcrLogoHorizontalDark } from '../images';
import { LINKS } from '@/common';
import { Routes } from '@/routes';

export const Header = ({
  appName,
  username,
  authenticated,
}: {
  appName: string;
  username: string;
  authenticated: boolean | undefined;
}) => {
  return (
    <header className="relative w-full border-b z-20">
      <div className="w-full flex justify-center lg:justify-between items-center fixed top-0 mt-0 bg-white h-20 border-b border-[#D9D9D9]shadow-md lg:px-24 ">
        <div className="hidden lg:flex">
          <a href={LINKS.EMCR}>
            <EmcrLogoHorizontalDark />
          </a>
        </div>

        <div className="text-center flex flex-row items-center justify-center space-x-2">
          <CloudIcon />
          <Link to={Routes.Dashboard} className="hover:underline">
            <h4>{appName.toUpperCase()}</h4>
          </Link>
        </div>
        {authenticated && (
          <div className="hidden md:flex text-center  md:flex-row items-center justify-end space-x-2 px-8">
            <UserMenu username={username} />
          </div>
        )}
      </div>
    </header>
  );
};
