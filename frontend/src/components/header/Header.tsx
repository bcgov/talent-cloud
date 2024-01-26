import { Link } from 'react-router-dom';
import { UserMenu } from './UserMenu';
import { CloudIcon, EmcrLogoHorizontalDark } from '../images';
import { LINKS } from '@/common';

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
      <div className="w-full flex justify-center lg:justify-between items-center fixed top-0 mt-0 bg-white h-20 border-b border-primaryYellow shadow-md">
        <div className="hidden col-span-0 lg:col-span-1 lg:block lg:-mt-4">
          <a href={LINKS.EMCR}>
            <EmcrLogoHorizontalDark />
          </a>
        </div>

        <div className="col-span-1 text-center flex flex-row items-center justify-center space-x-2 px-8">
          <CloudIcon />
          <Link to="/" className="hover:underline">
            <h4>{appName.toUpperCase()}</h4>
          </Link>
        </div>
        {authenticated && (
          <div className="relative col-span-1 text-center flex flex-row items-center justify-end space-x-2 px-8">
            <UserMenu username={username} />
          </div>
        )}
      </div>
    </header>
  );
};
