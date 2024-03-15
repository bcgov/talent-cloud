import { Loading } from '@/components';
import { getKeycloakInfo } from '@/services';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import Keycloak from 'keycloak-js';
import type { ReactElement } from 'react';
import { useEffect, useState } from 'react';

export const AuthProvider = ({ children }: { children: ReactElement }) => {
  const [keycloakInfo, setKeycloakInfo] = useState<Keycloak>();
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
        // TODO: Need to handle this better if the auth provider is the 'root' component
        // handleError({ status: 500, message: 'Error getting keycloak info' });
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
          LoadingComponent={<Loading />}
        >
          {children}
        </ReactKeycloakProvider>
      )}
    </>
  );
};
