import { Navigate, Outlet } from 'react-router-dom';
import Routes from './constants';
import { Role } from '@/common';
import { useRoleContext } from '@/providers';


const RoleProtectedRoute = ({requiredRoles}:{requiredRoles?: Role[]}) => {
    const { role } = useRoleContext()
    
    if(!role || !requiredRoles?.some(r => role.includes(r))){
        return <Navigate to={Routes.Unauthorized} />;
    }
    
        return <Outlet/>    
};

export default RoleProtectedRoute;
