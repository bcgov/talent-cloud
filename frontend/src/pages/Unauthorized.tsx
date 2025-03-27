import { Role } from '@/common';
import UnauthMessage from '@/components/layout/UnauthMessage';
import { useRoleContext } from '@/providers';
import { Routes } from '@/routes';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

const Unauthorized = () => {
  const { roles } = useRoleContext();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (roles?.includes(Role.MEMBER)) {
      return navigate(Routes.MemberProfile);
    }
  },[])
  return <UnauthMessage />;
};

export default Unauthorized;
