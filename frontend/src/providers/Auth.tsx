import {  Loading } from '@/components';
import { useError } from '@/hooks';
import { getKeycloakInfo } from '@/services';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import Keycloak from 'keycloak-js';
import { ReactElement, createContext, useEffect, useState } from 'react';
import store from 'store';

export const AuthContext = createContext<unknown>({});
export const AuthProvider = ({ children }: { children: ReactElement }) => {
  const [keycloakInfo, setKeycloakInfo] = useState<Keycloak>();
  const { handleError } = useError();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getKeycloakInfo();
        setKeycloakInfo(
          new Keycloak({
            url: data.authUrl,
            realm: data.realm,
            clientId: data.client,
          }),
        );
      } catch (e: unknown) {
        handleError({ status: 500, message: 'Error getting keycloak info' });
      }
    })();
  }, []);

  return (
    <>
      {keycloakInfo && (
        <ReactKeycloakProvider
          authClient={keycloakInfo}
          autoRefreshToken={true}
          initOptions={{ pkceMethod: 'S256', checkLoginIframe: false }}
          onTokens={(tokens) => store.set('TOKENS', tokens)}
          LoadingComponent={<Loading />}
        >
          {children}
        </ReactKeycloakProvider>
      )}
    </>
  );
};
