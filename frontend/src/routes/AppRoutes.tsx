import { ReactKeycloakProvider } from '@react-keycloak/web';
import Keycloak from 'keycloak-js';
import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppRoutes from './constants';
import store from 'store';

import { Dashboard, Login, NotFound, Profile } from '../pages';
import { Loading } from '@/components';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

export default () => {
  return (
    <ReactKeycloakProvider
      authClient={
        new Keycloak({
          realm: import.meta.env.VITE_KEYCLOAK_REALM,
          url: import.meta.env.VITE_KEYCLOAK_AUTH_URL,
          clientId: import.meta.env.VITE_KEYCLOAK_CLIENT,
        })
      }
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
  );
};
