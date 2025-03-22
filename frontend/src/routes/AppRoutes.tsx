import { StrictMode, Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppRoutes from './constants';
import { Loading } from '@/components';
import { Role } from '@/common';
import { AuthProvider, RoleProvider } from '@/providers';
import RoleProtectedRoute from './RoleProtectedRoute';
import PrivateRoute from './PrivateRoute';
import Redirect from './Redirect';

const SupervisorDashboard = lazy(
  () => import('../pages/supervisor/SupervisorDashboard'),
);
const Profile = lazy(() => import('../pages/profile/Profile'));
const MemberProfile = lazy(() => import('../pages/profile/MemberProfile'));
const Dashboard = lazy(() => import('../pages/dashboard/Dashboard'));
const NotFound = lazy(() => import('../pages/NotFound'));
const SplashPage = lazy(() => import('../pages/SplashPage'));
const Unauthorized = lazy(() => import('../pages/Unauthorized'));
const Unauthenticated = lazy(() => import('../pages/Unauthenticated'));
const IntakeForm = lazy(() => import('../pages/intake-form/FormWrapper'));

export default () => {
  return (
    <AuthProvider>
      <StrictMode>
        <RoleProvider>
          <BrowserRouter>
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path={AppRoutes.Root} element={<SplashPage />} />

                <Route path={AppRoutes.NotFound} element={<NotFound />} />
                <Route
                  path={AppRoutes.Unauthenticated}
                  element={<Unauthenticated />}
                />

                <Route element={<PrivateRoute />}>
                  <Route path={AppRoutes.Redirect} element={<Redirect />} />
                  <Route path={AppRoutes.IntakeForm} element={<IntakeForm />} />
                  <Route
                    element={
                      <RoleProtectedRoute
                        allowedRoles={[Role.COORDINATOR, Role.LOGISTICS]}
                      />
                    }
                  >
                    <Route element={<Dashboard />} path={AppRoutes.Dashboard} />
                    <Route element={<Profile />} path={AppRoutes.Profile} />
                  </Route>
                  <Route
                    element={
                      <RoleProtectedRoute
                        allowedRoles={[
                          Role.COORDINATOR,
                          Role.LOGISTICS,
                          Role.SUPERVISOR,
                          Role.MEMBER,
                        ]}
                      />
                    }
                  >
                    <Route
                      element={<MemberProfile />}
                      path={AppRoutes.MemberProfile}
                    />
                  </Route>

                  <Route
                    element={
                      <RoleProtectedRoute
                        allowedRoles={[
                          Role.COORDINATOR,
                          Role.LOGISTICS,
                          Role.SUPERVISOR,
                        ]}
                      />
                    }
                  >
                    <Route
                      element={<SupervisorDashboard />}
                      path={AppRoutes.SupervisorDashboard}
                    />
                  </Route>

                  <Route path={AppRoutes.Unauthorized} element={<Unauthorized />} />
                </Route>
              </Routes>
            </Suspense>
          </BrowserRouter>
        </RoleProvider>
      </StrictMode>
    </AuthProvider>
  );
};
