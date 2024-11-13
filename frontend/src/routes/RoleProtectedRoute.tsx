import { Navigate, Outlet } from 'react-router-dom';
import Routes from './constants';
import { Role } from '@/common';
import { useRoleContext } from '@/providers';


const RoleProtectedRoute = ({ allowedRoles }: { allowedRoles?: Role[] }) => {
    const { role } = useRoleContext()

    if (!role || !allowedRoles?.includes(role)) {
        return <Navigate to={Routes.Unauthorized} />
    }
    return <Outlet />
};

export default RoleProtectedRoute;
