import { useKeycloak, ReactKeycloakProvider } from '@react-keycloak/web';
import Keycloak from 'keycloak-js';
import { Suspense } from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import store from 'store';
import ApplicationRoutes from './constants';

import {
  AppHealth,
  Dashboard,
  Login,
  KeycloakPage,
  NotFound,
  LandingPage,
  Profile,
} from '../pages';
import { Loading, PrivateLayout, PublicLayout } from '@/components';

const PrivateRoute = () => {
  const { keycloak } = useKeycloak();
  if (!keycloak.authenticated) {
    return <Navigate to="/login" replace />;
  }
  return (
    <PrivateLayout>
      <Outlet />
    </PrivateLayout>
  );
};

const PublicRoute = () => {
  return (
    <PublicLayout>
      <Outlet />
    </PublicLayout>
  );
};

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
