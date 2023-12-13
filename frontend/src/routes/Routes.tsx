import { useKeycloak, ReactKeycloakProvider } from '@react-keycloak/web';
import { Suspense } from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import store from 'store';
import ApplicationRoutes from './constants';
import { Layout, Loading } from '../components';
import { AppHealth, Dashboard, Login, NotFound, Profile } from '../pages';
import KeycloakPage from '../pages/Keycloak';
import { _kc } from '../services/keycloak';

const PrivateRoute = () => {
  const { keycloak } = useKeycloak();
  if (!keycloak.authenticated) {
    return <Navigate to="/login" replace />;
  }
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default () => {
  const handleTokens = (tokens: any) => {
    store.set('TOKEN', tokens.token);
  };

  return (
    <ReactKeycloakProvider
      authClient={_kc}
      autoRefreshToken={true}
      initOptions={{ pkceMethod: 'S256', checkLoginIframe: false }}
      onTokens={handleTokens}
      LoadingComponent={<Loading />}
    >
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path={ApplicationRoutes.AppHealth} element={<AppHealth />} />
              <Route path={ApplicationRoutes.Dashboard} element={<Dashboard />} />
              <Route path={ApplicationRoutes.Profile} element={<Profile />} />
            </Route>
            <Route path={ApplicationRoutes.Keycloak} element={<KeycloakPage />} />
            <Route path={ApplicationRoutes.Login} element={<Login />} />
            <Route path={ApplicationRoutes.NotFound} element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ReactKeycloakProvider>
  );
};
