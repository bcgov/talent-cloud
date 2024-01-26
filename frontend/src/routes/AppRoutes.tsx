import { ReactKeycloakProvider } from '@react-keycloak/web';
import Keycloak from 'keycloak-js';
import { Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppRoutes from './constants';
import store from 'store';
import { Dashboard, Login, NotFound, Profile } from '../pages';
import { Layout, Loading } from '@/components';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { getKeycloakInfo } from '@/services';

export default () => {
  const [keycloakInfo, setKeycloakInfo] = useState<Keycloak>();
  
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await getKeycloakInfo();
        setKeycloakInfo(
          new Keycloak({
            realm: data.realm,
            url: data.authUrl,
            clientId: data.client,
          }),
        );
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  
  if (loading) return <Loading />;
  return keycloakInfo ? (
    <ReactKeycloakProvider
      authClient={keycloakInfo}
      autoRefreshToken={true}
      initOptions={{ pkceMethod: 'S256', checkLoginIframe: false }}
      onTokens={(tokens) => store.set('TOKENS', tokens)}
      LoadingComponent={<Loading />}
    >
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route element={<PublicRoute />}>
              <Route path={AppRoutes.Login} element={<Login />} />
              <Route path={AppRoutes.NotFound} element={<NotFound />} />
            </Route>
            <Route path="/" element={<PrivateRoute />}>
              <Route path={AppRoutes.Dashboard} element={<Dashboard />} />
              <Route path={AppRoutes.Profile} element={<Profile />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ReactKeycloakProvider>
  ) : (
    <Layout>
      <h1>Unable to access authentication server</h1>
    </Layout>
  );
};
