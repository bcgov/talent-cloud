import { Loading, PublicLayout } from '@/components';
import { getKeycloakInfo } from '@/services';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import Keycloak from 'keycloak-js';
import type { ReactElement } from 'react';
import { useEffect, useState } from 'react';

export const AuthProvider = ({ children }: { children: ReactElement }) => {
  const [keycloakInfo, setKeycloakInfo] = useState<Keycloak>();
  
  const [error, setError] = useState(false);  

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
        setError(true);
      } 
    })();
  }, []);

  

  if(error ) {
    return <PublicLayout><div className="h-3/4 pt-40 lg:pt-16  sm:px-8 md:px-12  lg:px-0 2xl:px-64">
    <div className="flex gap-12 flex-col items-center justify-center text-center lg:py-24 lg:px-16 2xl:px-64">
      <h2>Error:</h2><p>We are currently experiencing technical difficulties.</p></div></div></PublicLayout>  
  }

  return (
    <>
      
      {keycloakInfo &&  <ReactKeycloakProvider
          authClient={keycloakInfo}
          autoRefreshToken={true}
          initOptions={{ pkceMethod: 'S256', checkLoginIframe: false }}
          LoadingComponent={<Loading />}
        >
          {children}
        </ReactKeycloakProvider>}
      
    </>
  );
};
