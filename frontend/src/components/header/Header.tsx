import React from 'react';
import { Link } from 'react-router-dom';
import { UserMenu } from './UserMenu';
import cloud from '../../assets/images/cloud-icon.svg';
import logo2 from '../../assets/images/emcr-no-bg.png';

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
    <header>
      <div className="grid grid-cols-1 md:grid-cols-3 mr-10 w-full bg-white">
        <div className="hidden md:flex col-span-0 md:col-span-1">
          <a href="https://gov.bc.ca">
            <img src={logo2} alt="navigate to BC Gov website" />
          </a>
        </div>

        {authenticated && (
          <>
            <div className="col-span-1 text-center flex flex-row items-center justify-center space-x-2">
              <img src={cloud} alt="cloud" />
              <Link to="/dashboard" className="hover:text-black">
                <h4>{appName.toUpperCase()}</h4>
              </Link>
            </div>
            <div className="relative col-span-1 text-center flex flex-row items-center justify-center space-x-2">
              <UserMenu username={username} />
            </div>
          </>
        )}
      </div>
    </header>
  );
};
