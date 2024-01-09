import { useKeycloak } from '@react-keycloak/web';
import React from 'react';
import { ReactComponent as Logo } from '../assets/images/logoBlue.svg';
import { ButtonTypes } from '../common';
import { Button } from '../components';
import Routes from '../routes/constants';
import { createCustomLoginUrl } from '../utils/custom-login-url';

export default () => {
  const { keycloak } = useKeycloak();
  const login = () =>
    window.location.replace(createCustomLoginUrl(keycloak, Routes.Dashboard, ''));

  return (
    <div className="w-full md:w-1/2 lg:w-1/4">
      <div className="card-pf">
        <div className="flex flex-col justify-between items-center text-center">
          <div className="py-6">
            <Logo />
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
