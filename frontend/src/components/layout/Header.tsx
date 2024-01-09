import React from 'react';
import { Link } from 'react-router-dom';
import cloud from '../../assets/images/cloud-icon.svg';
import logo2 from '../../assets/images/emcr-no-bg.png';

export const Header = ({ header }: { header: string }) => {
  return (
    <header>
      <div className="grid grid-cols-1 md:grid-cols-3 mr-10 w-full bg-white">
        <div className="hidden md:flex col-span-0 md:col-span-1">
          <a href="https://gov.bc.ca">
            <img src={logo2} alt="navigate to BC Gov website" />
          </a>
        </div>

        <div className="col-span-1 text-center flex flex-row items-center justify-center space-x-2">
          <img src={cloud} alt="cloud" />
          <Link to="/dashboard" className="hover:text-black">
            <h4>{header.toUpperCase()}</h4>
          </Link>
        </div>
        {/* TODO */}
        {/* <div className="col-span-1 text-center flex flex-row items-center justify-center space-x-2">
          <h6>{username}</h6>
          <img src={userIcon} alt="userIcon" />
        </div> */}
      </div>
    </header>
  );
};
