import { Role } from '@/common';
import { useRoleContext } from '@/providers';
import { Navigate } from 'react-router-dom';
import { Routes } from '.';
import { Loading } from '@/components';

const Redirect = () => {
  const { roles, loading } = useRoleContext();

  if (!roles || loading) {
    return <Loading />;
  }

  const member = roles?.includes(Role.MEMBER);
  const supervisor = roles?.includes(Role.SUPERVISOR);
  const coordinator = roles?.includes(Role.COORDINATOR);
  const logistics = roles?.includes(Role.LOGISTICS);
  const unauthorized = !member && !supervisor && !coordinator && !logistics;

  if (logistics || coordinator) {
    return <Navigate to={Routes.Dashboard} />;
  }
  if (supervisor) {
    return <Navigate to={Routes.SupervisorDashboard} />;
  }
  if (member) {
    return <Navigate to={Routes.MemberProfile} />;
  }
  if (unauthorized) {
    return <Navigate to={Routes.Unauthorized} />;
  }
};

export default Redirect;
