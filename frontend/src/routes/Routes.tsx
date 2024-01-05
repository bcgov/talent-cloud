import { ReactKeycloakProvider } from '@react-keycloak/web';
import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import store from 'store';
import ApplicationRoutes from './constants';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { Loading } from '../components';
import { Dashboard, Login, NotFound, Profile } from '../pages';
import { _kc } from '../services/keycloak';

export default () => {
  return (
    <ReactKeycloakProvider
      authClient={_kc}
      autoRefreshToken={true}
      initOptions={{ pkceMethod: 'S256', checkLoginIframe: false }}
      onTokens={(tokens) => store.set('TOKENS', tokens)}
      LoadingComponent={<Loading />}
    >
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route element={<PublicRoute />}>
              <Route path={ApplicationRoutes.Login} element={<Login />} />
              <Route path={ApplicationRoutes.NotFound} element={<NotFound />} />
            </Route>
            <Route element={<PrivateRoute />} path="/">
              <Route path={ApplicationRoutes.Dashboard} element={<Dashboard />} />
              <Route path={ApplicationRoutes.Profile} element={<Profile />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ReactKeycloakProvider>
  );
};
