import { useKeycloak, ReactKeycloakProvider } from '@react-keycloak/web';
import React, { Suspense } from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import store from 'store';
import ApplicationRoutes from './constants';
import { coordinatorNavLinks, navLinks } from './links';
import { Layout, Loading } from '../components';
import {
  AppHealth,
  Dashboard,
  Login,
  KeycloakPage,
  NotFound,
  LandingPage,
  Profile,
} from '../pages';

import { _kc } from '../services/keycloak';

const PrivateRoute = () => {
  const { keycloak } = useKeycloak();
  if (!keycloak.authenticated) {
    return <Navigate to="/login" replace />;
  }
  //TODO set dynamically
  const isCoordinator = true;
  return (
    <Layout navLinks={isCoordinator ? coordinatorNavLinks : navLinks}>
      <Outlet />
    </Layout>
  );
};

const PublicRoute = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

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
              <Route
                path={ApplicationRoutes.LandingPage}
                element={<LandingPage />}
              />
              <Route path={ApplicationRoutes.Keycloak} element={<KeycloakPage />} />
              <Route path={ApplicationRoutes.Login} element={<Login />} />
              <Route path={ApplicationRoutes.NotFound} element={<NotFound />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path={ApplicationRoutes.AppHealth} element={<AppHealth />} />
              <Route path={ApplicationRoutes.Dashboard} element={<Dashboard />} />
              <Route path={ApplicationRoutes.Profile} element={<Profile />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ReactKeycloakProvider>
  );
};
