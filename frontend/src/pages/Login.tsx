import { useKeycloak } from '@react-keycloak/web';
import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import store from 'store';
import Routes from '../routes/constants';
import { createCustomLoginUrl } from '../utils/custom-login-url';

export default () => {
  const { keycloak } = useKeycloak();
  const { state } = useLocation();

  useEffect(() => {
    const redirect = state ? state.redirectOnLogin : Routes.Dashboard;
    store.set('REDIRECT', redirect);
    window.location.replace(createCustomLoginUrl(keycloak, Routes.Keycloak, ''));
  }, [keycloak, state]);

  return <div>Redirecting...</div>;
};
