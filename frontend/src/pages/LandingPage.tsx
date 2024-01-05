import React from 'react';
import { ReactComponent as ReactLogo } from '../assets/images/logoBlue.svg';
import { ButtonTypes } from '../common';
import { Button } from '../components';

const LandingPage = () => {
  const login = () => window.location.assign('/login');

  return (
    <div className="w-full md:w-1/2 lg:w-1/4">
      <div className="card-pf">
        <div className="flex flex-col justify-between items-center text-center">
          <div className="py-6">
            <ReactLogo />
          </div>
          <h1 className="kc-page-title">Authenticate With:</h1>
          <div className="py-4 w-full">
            <Button type={ButtonTypes.PRIMARY} text="IDIR" onClick={login} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default LandingPage;
