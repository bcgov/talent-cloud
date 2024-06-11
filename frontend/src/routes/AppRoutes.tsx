import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppRoutes from './constants';
import { Loading } from '@/components';
import { PrivateRoute } from './PrivateRoute';
import { AuthProvider } from '@/providers';
const Dashboard = lazy(() => import('../pages/dashboard/Dashboard'));
const NotFound = lazy(() => import('../pages/NotFound'));
const Profile = lazy(() => import('../pages/profile/Profile'));
const SplashPage = lazy(() => import('../pages/SplashPage'));
const Unauthorized = lazy(() => import('../pages/Unauthorized'));

export default () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path={AppRoutes.Home} element={<SplashPage />} />
            <Route path={AppRoutes.NotFound} element={<NotFound />} />
            <Route element={<PrivateRoute />}>
              <Route path={AppRoutes.Dashboard} element={<Dashboard />} />
              <Route path={AppRoutes.Profile}>
                <Route path=":personnelId" element={<Profile />} />
              </Route>
            </Route>
            <Route path={AppRoutes.Unauthorized} element={<Unauthorized />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
};
