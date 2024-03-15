import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppRoutes from './constants';
import { Layout, Loading } from '@/components';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { AuthProvider, ErrorProvider, RoleProvider } from '@/providers';
const Dashboard = lazy(() => import('../pages/dashboard/Dashboard'));
const NotFound = lazy(() => import('../pages/NotFound'));
const Profile = lazy(() => import('../pages/profile/Profile'));
const SplashPage = lazy(() => import('../pages/splash/SplashPage'));

export default () => {
  return (
    <AuthProvider>
      <Suspense fallback={<Loading />}>
        <ErrorProvider>
          <RoleProvider>
            <BrowserRouter>
              <Layout>
                <Routes>
                  <Route element={<PublicRoute />}>
                    <Route path={AppRoutes.Home} element={<SplashPage />} />
                    <Route path={AppRoutes.NotFound} element={<NotFound />} />
                  </Route>
                  <Route element={<PrivateRoute />}>
                    <Route path={AppRoutes.Dashboard} element={<Dashboard />} />
                    <Route path={AppRoutes.Profile}>
                      <Route path=":personnelId" element={<Profile />} />
                    </Route>
                  </Route>
                </Routes>
              </Layout>
            </BrowserRouter>
          </RoleProvider>
        </ErrorProvider>
      </Suspense>
    </AuthProvider>
  );
};
