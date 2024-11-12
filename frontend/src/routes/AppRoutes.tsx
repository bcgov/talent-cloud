import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppRoutes from './constants';
import { Loading } from '@/components';
import { Role } from '@/common';
import { AuthProvider, RoleProvider } from '@/providers';

const PrivateRoute = lazy(() => import('../routes/PrivateRoute'));
const RoleProtectedRoute = lazy(() => import('../routes/RoleProtectedRoute'));
const SupervisorDashboard = lazy(() => import('../pages/supervisor/SupervisorDashboard'));
const Profile = lazy(() => import('../pages/profile/Profile'));
const MemberProfile = lazy(() => import('../pages/profile/MemberProfile'));
const Dashboard = lazy(() => import('../pages/dashboard/Dashboard'));
const NotFound = lazy(() => import('../pages/NotFound'));
const SplashPage = lazy(() => import('../pages/SplashPage'));
const Unauthorized = lazy(() => import('../pages/Unauthorized'));

export default () => {
  return (
    <AuthProvider>
      <RoleProvider>
        <BrowserRouter >
        
          <Suspense fallback={<Loading />}>
            <Routes>
            <Route path={AppRoutes.Home} element={<SplashPage />} />      
              <Route path={AppRoutes.NotFound} element={<NotFound />} />
              <Route path={AppRoutes.Unauthorized} element={<Unauthorized />} />
              
              <Route element={<PrivateRoute />}>
                <Route path={AppRoutes.Root} element={
                  <RoleProtectedRoute requiredRoles={[Role.COORDINATOR, Role.LOGISTICS]}>
                    <Dashboard />
                  </RoleProtectedRoute>} />
                <Route path={AppRoutes.Profile} element={<RoleProtectedRoute requiredRoles={[Role.COORDINATOR, Role.LOGISTICS]}><Profile /></RoleProtectedRoute>} />
                <Route path={AppRoutes.SupervisorDashboard} element={<RoleProtectedRoute requiredRoles={[Role.SUPERVISOR]}><SupervisorDashboard /></RoleProtectedRoute>} />
                <Route path={AppRoutes.MemberProfile} element={<RoleProtectedRoute requiredRoles={[Role.COORDINATOR, Role.LOGISTICS, Role.SUPERVISOR, Role.MEMBER]}><MemberProfile /></RoleProtectedRoute>} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </RoleProvider>
    </AuthProvider>
  );
};
