import { useKeycloak } from '@react-keycloak/web';
import { useEffect } from 'react';
import { APP_URL } from '../common';
import { Loading } from '../components';

export const Login = () => {
  const { keycloak } = useKeycloak();

  useEffect(() => {
    const url = keycloak.createLoginUrl({
      redirectUri: `${APP_URL}/`,
    });
    window.location.assign(url);
  }, [keycloak]);

  return <Loading />;
};
