import { Navigate, Outlet } from 'react-router-dom';
import Routes from './constants';
import { Role } from '@/common';
import { useRoleContext } from '@/providers';
import { useKeycloak } from '@react-keycloak/web';


const RoleProtectedRoute = ({ allowedRoles }: { allowedRoles?: Role[] }) => {
    const { role } = useRoleContext()
    const { keycloak } = useKeycloak()
    if (!keycloak.authenticated) {
        return <Navigate to={Routes.Unauthenticated} />
    }
    if (!role || !allowedRoles?.includes(role)) {
        return <Navigate to={Routes.Unauthorized} />
    }
    return <Outlet />
};

export default RoleProtectedRoute;
