import { Navigate, Outlet } from 'react-router-dom';
import Routes from './constants';
import { Role } from '@/common';
import { ReactElement } from 'react';
import { Loading } from '@/components';
import { useRoleContext } from '@/providers';


const RoleProtectedRoute = ({requiredRoles}:{requiredRoles: Role[]}) => {
    const { role, loading } = useRoleContext()

    console.log(role, "ROLE")
    console.log(requiredRoles, "REQUIRED ROLES")
    console.log(loading, "LOADING")
    

    if(loading){
        return <Loading />
    }  
    
    if(!role || !requiredRoles.includes(role)){
        return <Navigate to={Routes.MemberProfile} />;
    }

    return <Outlet/>
};

export default RoleProtectedRoute;
