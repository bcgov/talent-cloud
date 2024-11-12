import { Navigate } from 'react-router-dom';
import Routes from './constants';
import { Role } from '@/common';
import { ReactElement } from 'react';
import { Loading } from '@/components';
import { useRoleContext } from '@/providers';


const RoleProtectedRoute = ({ requiredRoles, children }: { requiredRoles: Role[], children: ReactElement }) => {
    const { role, loading } = useRoleContext()

    console.log(role, "ROLE")
    console.log(requiredRoles, "REQUIRED ROLES")
    console.log(loading, "LOADING")
    

    if(loading){
        return <Loading />
    }  
    if(role && requiredRoles.includes(role)){
        return (
            <> {children}</>
    );
    }
    if(!role){
        return <Navigate to={Routes.Unauthorized} />;
    }
    if(role && role===Role.MEMBER){
        return <Navigate to={Routes.MemberProfile} />;
    }
};

export default RoleProtectedRoute;
